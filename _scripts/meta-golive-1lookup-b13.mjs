#!/usr/bin/env node
/**
 * Flip the batch-13 build from PAUSED to ACTIVE, and read the account back afterwards.
 *
 *   node _scripts/meta-golive-1lookup-b13.mjs               # dry run, prints what would flip
 *   node _scripts/meta-golive-1lookup-b13.mjs --live        # flips campaigns and ad sets
 *   node _scripts/meta-golive-1lookup-b13.mjs --audit       # read-only state of the account
 *
 * Robby, 2026-08-19: "You can publish them and set them to live."
 *
 * WHY A SEPARATE FLIP SCRIPT. Everything the rebuild creates is PAUSED at both the campaign
 * and the ad set level, so turning it on is two writes per campaign, and it is worth having
 * those two writes in one auditable place rather than typed into Ads Manager. It also means
 * the going-live step re-reads and prints the things that have burned this account before:
 * the placement list, the country list and the optimisation goal of every ad set that is
 * about to start spending.
 *
 * WHAT IT REFUSES TO TURN ON. Any ad set whose placements include `audience_network`, or
 * whose placement list is empty, which on Meta means all placements including that one. That
 * network took 70.7% of this account's lifetime clicks and 91.4% of its landing page views
 * for 19.7% of the spend, at a $0.015 CPC, and produced zero click-attributed trials. If it
 * ever reappears in a targeting spec, the flip stops rather than spends.
 */

import { createHmac } from "node:crypto";
import { execFileSync } from "node:child_process";

const API = "https://graph.facebook.com/v25.0";
const ACCOUNT = "act_2333276243857483";

const argv = process.argv.slice(2);
const LIVE = argv.includes("--live");
const AUDIT_ONLY = argv.includes("--audit");

const TOKEN = process.env.META_SYSTEM_USER_TOKEN;
const SECRET = process.env.META_APP_SECRET;
if (!TOKEN || !SECRET) throw new Error("META_SYSTEM_USER_TOKEN and META_APP_SECRET must be set");
const PROOF = createHmac("sha256", SECRET).update(TOKEN).digest("hex");

const log = (...a) => console.log(...a);

function api(method, edge, body) {
  const form = { ...(body || {}), access_token: TOKEN, appsecret_proof: PROOF };
  let args;
  if (method === "GET") {
    args = ["-s", "--max-time", "180", `${API}/${edge}?${new URLSearchParams(form)}`];
  } else {
    args = ["-s", "--max-time", "180", "-X", method, `${API}/${edge}`];
    for (const [k, v] of Object.entries(form)) args.push("-F", `${k}=${v}`);
  }
  const raw = execFileSync("curl", args, { encoding: "utf8", maxBuffer: 1 << 26 });
  let j;
  try { j = JSON.parse(raw); } catch { throw new Error(`non-JSON from ${edge}: ${raw.slice(0, 300)}`); }
  if (j.error) {
    const e = j.error;
    throw new Error(`${edge}: ${e.message} (code ${e.code}${e.error_subcode ? "/" + e.error_subcode : ""})` +
      `${e.error_user_msg ? " | " + e.error_user_msg : ""}`);
  }
  return j;
}

// The five campaigns the rebuild creates. Anything else in the account is left exactly as it
// is: this script turns on what it was told to turn on and touches nothing else.
const TARGETS = [
  "1L | META | COLD | Platform | Trials",
  "1L | META | COLD | Platform T2 | Trials",
  "1L | META | COLD | Validate | Trials",
  "1L | META | COLD | Enrich | Trials",
  "1L | META | RETARGET | Platform | Trials",
];

const campaigns = api("GET", `${ACCOUNT}/campaigns`, {
  fields: "id,name,status,effective_status,daily_budget",
  limit: 200,
}).data;

let flipped = 0;
let blocked = 0;
let dailyTotal = 0;

for (const name of TARGETS) {
  const c = campaigns.find((x) => x.name === name);
  if (!c) { log(`MISSING campaign: ${name}`); blocked++; continue; }

  const adSets = api("GET", `${c.id}/adsets`, {
    fields: "id,name,status,effective_status,optimization_goal,targeting",
    limit: 100,
  }).data;

  log(`\n${name}  $${(c.daily_budget / 100).toFixed(2)}/day  [${c.effective_status}]`);
  let campaignSafe = true;

  for (const s of adSets) {
    const t = s.targeting ?? {};
    const platforms = t.publisher_platforms ?? [];
    const countries = t.geo_locations?.countries ?? [];
    const ads = api("GET", `${s.id}/ads`, { fields: "id,name,status", limit: 200 }).data;
    const activeAds = ads.filter((a) => a.status === "ACTIVE").length;

    if (platforms.includes("audience_network") || platforms.length === 0) {
      log(`  BLOCKED ${s.name}: placements ${JSON.stringify(platforms)} include or default to audience_network`);
      campaignSafe = false;
      blocked++;
      continue;
    }
    // An ad set with no ads still holds its share of a campaign budget. This exact case
    // happened on 2026-08-20: a by-name idempotency check matched the platform banners in a
    // different campaign, so the T2 and retargeting ad sets came out empty and $20/day was
    // one command away from being switched on with nothing to serve.
    if (activeAds === 0) {
      log(`  BLOCKED ${s.name}: zero active ads, would hold budget and serve nothing`);
      campaignSafe = false;
      blocked++;
      continue;
    }
    log(`  ${s.effective_status.padEnd(10)} ${s.name}`);
    log(`      geo ${JSON.stringify(countries)}  placements ${JSON.stringify(platforms)}  goal ${s.optimization_goal}  ads ${activeAds}/${ads.length} active`);

    if (s.status !== "ACTIVE") {
      if (LIVE && !AUDIT_ONLY) { api("POST", s.id, { status: "ACTIVE" }); log("      -> ad set ACTIVE"); }
      else log("      -> would set ad set ACTIVE");
    }
  }

  if (!campaignSafe) { log("  campaign left PAUSED because an ad set failed the placement check"); continue; }

  if (c.status !== "ACTIVE") {
    if (LIVE && !AUDIT_ONLY) { api("POST", c.id, { status: "ACTIVE" }); log("  -> campaign ACTIVE"); }
    else log("  -> would set campaign ACTIVE");
  }
  flipped++;
  dailyTotal += Number(c.daily_budget);
}

log(`\n${LIVE && !AUDIT_ONLY ? "LIVE" : "DRY RUN"}: ${flipped} campaigns on, ${blocked} blocked.`);
log(`Daily budget now committed on these campaigns: $${(dailyTotal / 100).toFixed(2)}/day.`);

// Everything else in the account, so the operator sees the real total rather than this
// script's own slice of it.
const others = campaigns.filter((c) => !TARGETS.includes(c.name));
const otherActive = others.filter((c) => c.effective_status === "ACTIVE");
log(`\nOther campaigns in this account still ACTIVE: ${otherActive.length}`);
for (const c of otherActive) log(`  $${(c.daily_budget / 100).toFixed(2)}/day  ${c.name}`);
const grand = dailyTotal + otherActive.reduce((n, c) => n + Number(c.daily_budget || 0), 0);
log(`\nTOTAL Meta daily budget after this run: $${(grand / 100).toFixed(2)}/day.`);
