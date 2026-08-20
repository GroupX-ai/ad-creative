#!/usr/bin/env node
// Read every live ad on Meta, Google and Reddit and check it against NAMING.md.
//
//   node _scripts/naming-check.mjs                     # 1Lookup, all three platforms
//   node _scripts/naming-check.mjs --company 1lookup --platform meta
//   node _scripts/naming-check.mjs --files             # also check the repo's own filenames
//   node _scripts/naming-check.mjs --json
//
// READ ONLY. It never writes to an ad account.
//
// Why this exists: the 1Lookup account reached 200 ads across 8 campaigns under three
// different naming schemes, none of which named the product being sold, so no report could
// be grouped by product and no row could be traced to the file that made it. A convention
// only holds if something checks it, so this runs after every build.
//
// Exit 1 if anything is off-standard, so it can gate a deploy.

import { execFileSync } from "node:child_process";
import { readdir } from "node:fs/promises";
import { createHmac } from "node:crypto";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const has = (n) => argv.includes(`--${n}`);

const COMPANY = flag("company", "1lookup");
const PLATFORM = flag("platform", "all");
const JSON_OUT = has("json");

// Accounts per company. Add a row when a company gets an account, not a new script.
const ACCOUNTS = {
  "1lookup": {
    co: "1L",
    meta: "act_2333276243857483",
    google: "8715389296",
    reddit: "a2_jdktuzsu7mws",
  },
};

const acct = ACCOUNTS[COMPANY];
if (!acct) throw new Error(`no account row for "${COMPANY}" — add one to ACCOUNTS`);

// ---------------------------------------------------------------- the standard
// Ad:       <CO> | <product-slug> | <assetid> <concept-slug> | <shape>
// Ad set:   <CO> | <product-slug> | <audience> | <placement>
// Campaign: <CO> | <PLATFORM> | <STAGE> | <theme> | <money event>
const SHAPES = "square|landscape|vertical|wide|rsa";
const AD = new RegExp(`^[A-Z0-9]{2,4} \\| [a-z0-9-]+ \\| b\\d+[cv]\\d{2} [a-z0-9-]+ \\| (${SHAPES})$`);
const ADSET = /^[A-Z0-9]{2,4} \| [a-z0-9-]+ \| [A-Za-z0-9 %+-]+ \| [A-Za-z]+$/;
const CAMPAIGN = /^[A-Z0-9]{2,4} \| (META|GOOG|REDDIT|TIKTOK) \| (COLD|RETARGET|BRAND|COMP) \| [A-Za-z0-9 ]+ \| [A-Za-z]+$/;

const ASSET_ID = /\bb\d+[cv]\d{2}\b/;

const problems = [];
const seenAssetIds = new Set();
const note = (platform, level, id, name, why) => problems.push({ platform, level, id, name, why });

function check(platform, level, id, name) {
  const re = level === "ad" ? AD : level === "adset" ? ADSET : CAMPAIGN;
  if (!re.test(name)) {
    note(platform, level, id, name, `does not match the ${level} pattern in NAMING.md`);
    return;
  }
  if (level === "ad") {
    const m = name.match(ASSET_ID);
    if (m) seenAssetIds.add(m[0]);
  }
}

// ---------------------------------------------------------------- meta
function metaGet(pathname, params) {
  const tok = process.env.META_SYSTEM_USER_TOKEN;
  const proof = createHmac("sha256", process.env.META_APP_SECRET).update(tok).digest("hex");
  // Both must be in the QUERY STRING. Passed as form fields on a GET they are silently
  // dropped and Graph answers "(#200) Provide valid app ID", which reads like a token
  // problem and is not.
  const qs = new URLSearchParams({ ...params, access_token: tok, appsecret_proof: proof });
  const out = execFileSync("curl", ["-s", "--max-time", "120", `https://graph.facebook.com/v25.0/${pathname}?${qs}`],
    { encoding: "utf8", maxBuffer: 1 << 26 });
  const j = JSON.parse(out);
  if (j.error) throw new Error(`meta ${pathname}: ${j.error.message}`);
  return j;
}

async function checkMeta() {
  for (const [edge, level] of [["campaigns", "campaign"], ["adsets", "adset"], ["ads", "ad"]]) {
    let after = null;
    do {
      const page = metaGet(`${acct.meta}/${edge}`, {
        fields: "id,name,effective_status",
        limit: "200",
        ...(after ? { after } : {}),
      });
      for (const e of page.data ?? []) {
        // Archived and superseded entities are deliberately renamed `ZZ SUPERSEDED ...`
        // and are not the standard's business.
        if (/^ZZ /.test(e.name) || e.effective_status === "DELETED" || e.effective_status === "ARCHIVED") continue;
        check("meta", level, e.id, e.name);
      }
      after = page.paging?.cursors?.after && page.paging?.next ? page.paging.cursors.after : null;
    } while (after);
  }
}

// ---------------------------------------------------------------- google
async function checkGoogle() {
  const lib = await import("/home/user/second-brain/scripts/google-ads-lib.mjs");
  const creds = await lib.loadCreds();
  const rows = await lib.gaSearch(creds, acct.google, `
    SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
           ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.status
    FROM ad_group_ad
    WHERE ad_group_ad.status != 'REMOVED'
  `);
  const seen = new Set();
  for (const r of rows) {
    const c = r.campaign, g = r.adGroup, a = r.adGroupAd?.ad;
    if (c && !seen.has(`c${c.id}`)) { seen.add(`c${c.id}`); check("google", "campaign", c.id, c.name ?? ""); }
    if (g && !seen.has(`g${g.id}`)) { seen.add(`g${g.id}`); check("google", "adset", g.id, g.name ?? ""); }
    // Google RSAs often carry no ad.name at all, which is itself the finding: an unnamed ad
    // cannot be traced to a creative file.
    if (a) check("google", "ad", a.id, a.name ?? "");
  }
}

// ---------------------------------------------------------------- reddit
function redditToken() {
  const out = execFileSync("curl", [
    "-s", "-X", "POST", "https://www.reddit.com/api/v1/access_token",
    "-A", "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)",
    "-u", `${process.env.REDDIT_ADS_APP_ID}:${process.env.REDDIT_ADS_APP_SECRET}`,
    "-d", `grant_type=refresh_token&refresh_token=${process.env.REDDIT_ADS_REFRESH_TOKEN}`,
  ], { encoding: "utf8", maxBuffer: 1 << 24 });
  const t = JSON.parse(out).access_token;
  if (!t) throw new Error(`reddit token mint failed: ${out.slice(0, 200)}`);
  return t;
}

async function checkReddit() {
  const token = redditToken();
  const get = (p) => {
    const raw = execFileSync("curl", [
      "-s", "--max-time", "180", `https://ads-api.reddit.com/api/v3${p}`,
      "-H", `Authorization: Bearer ${token}`,
      "-A", "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)",
    ], { encoding: "utf8", maxBuffer: 1 << 26 });
    return JSON.parse(raw);
  };
  for (const [edge, level] of [["campaigns", "campaign"], ["ad_groups", "adset"], ["ads", "ad"]]) {
    let after = null;
    do {
      const page = get(`/ad_accounts/${acct.reddit}/${edge}?page.size=200${after ? `&page.token=${after}` : ""}`);
      for (const e of page.data ?? []) {
        if (/^ZZ /.test(e.name ?? "")) continue;
        check("reddit", level, e.id, e.name ?? "");
      }
      after = page.pagination?.next_url ? new URL(page.pagination.next_url).searchParams.get("page.token") : null;
    } while (after);
  }
}

// ---------------------------------------------------------------- repo files
const FILE_STATIC = new RegExp(`^[a-z0-9]+-[a-z0-9-]+-b\\d+c\\d{2}-(${SHAPES})\\.png$`);
const FILE_VIDEO = /^[a-z0-9]+-[a-z0-9-]+-b\d+v\d{2}-[a-z0-9-]+\.mp4$/;

async function checkFiles() {
  const base = path.join(ROOT, COMPANY);
  for (const batch of await readdir(base, { withFileTypes: true })) {
    if (!batch.isDirectory() || batch.name.startsWith("_")) continue;
    // Only batches that adopted the standard are checked. Older folders predate it and are
    // left alone rather than rewritten: renaming a file that a live ad points at breaks the ad.
    if (!/^2026-08-19|^2026-09|^202[7-9]/.test(batch.name)) continue;
    for (const f of await readdir(path.join(base, batch.name))) {
      if (f.endsWith(".png") && !FILE_STATIC.test(f)) note("repo", "file", batch.name, f, "filename does not match NAMING.md");
      if (f.endsWith(".mp4") && !FILE_VIDEO.test(f)) note("repo", "file", batch.name, f, "filename does not match NAMING.md");
    }
  }
}

// ---------------------------------------------------------------- run
const want = (p) => PLATFORM === "all" || PLATFORM === p;
const ran = [];
for (const [name, fn] of [["meta", checkMeta], ["google", checkGoogle], ["reddit", checkReddit]]) {
  if (!want(name)) continue;
  try { await fn(); ran.push(name); }
  catch (e) { note(name, "-", "-", "-", `could not read the account: ${e.message.slice(0, 200)}`); }
}
if (has("files")) { try { await checkFiles(); ran.push("repo"); } catch (e) { note("repo", "-", "-", "-", e.message.slice(0, 200)); } }

if (JSON_OUT) {
  console.log(JSON.stringify({ company: COMPANY, checked: ran, assetIds: [...seenAssetIds].sort(), problems }, null, 2));
} else {
  console.log(`Checked ${ran.join(", ")} for ${COMPANY}. ${seenAssetIds.size} distinct asset id(s) live.\n`);
  if (!problems.length) console.log("Everything matches NAMING.md.");
  const byPlatform = {};
  for (const p of problems) (byPlatform[p.platform] ??= []).push(p);
  for (const [pl, list] of Object.entries(byPlatform)) {
    console.log(`\n${pl.toUpperCase()} — ${list.length} off-standard`);
    for (const p of list.slice(0, 60)) console.log(`  ${p.level.padEnd(8)} ${String(p.id).padEnd(20)} ${JSON.stringify(p.name)}  ${p.why}`);
    if (list.length > 60) console.log(`  ... and ${list.length - 60} more`);
  }
}

if (problems.length) process.exitCode = 1;
