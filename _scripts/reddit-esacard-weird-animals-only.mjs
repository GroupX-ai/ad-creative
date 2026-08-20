#!/usr/bin/env node
// Robby, 2026-08-20: "Reddit - put all the budget on the weird animals campaign, turn off
// anything else."
//
//   node _scripts/reddit-esacard-weird-animals-only.mjs           # dry run, prints the plan
//   node _scripts/reddit-esacard-weird-animals-only.mjs --live     # pause everything else
//
// Budget on Reddit lives on the AD GROUP, not the ad, and all 77 ads sit in one group. So
// "all the budget on weird animals" is not a budget edit at all: it is pausing the other 60
// ads inside `ESA | Pet + Housing | Purchase`, after which the whole $30.00/day is contested
// only by the 17 weird-animal ads. No budget field is touched.
//
// The keep-list is the exact 17 names the launcher created, not a `w` prefix match. A prefix
// would be one careless rename away from pausing a winner, and nothing on Reddit can be
// deleted or un-archived cheaply.
//
// Nothing is archived, only paused, so any of the 60 can be brought back in one call.

import { execFileSync } from "node:child_process";

const ACCOUNT = "a2_ji9rrnreyf0d";
const AD_GROUP = "2570690648253263407";
const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";
const LIVE = process.argv.includes("--live");
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

const KEEP = new Set([
  "ESA IMG w1-turtle-square", "ESA IMG w2-alligator-square", "ESA IMG w3-raven-square",
  "ESA IMG w4-snake-square", "ESA IMG w5-pig-square", "ESA IMG w6-egg-square",
  "ESA IMG w7-hedgehog-square", "ESA IMG w8-chicken-square", "ESA IMG w9-axolotl-square",
  "ESA IMG w10-cockatoo-square",
  "ESA VID w1-turtle", "ESA VID w2-alligator", "ESA VID w3-hedgehog", "ESA VID w4-chicken",
  "ESA VID w5-raven", "ESA VID w6-snake", "ESA VID w7-dog-and-human",
]);

const curl = (args) => execFileSync("curl", ["-sS", "-A", UA, ...args], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });

const TOKEN = JSON.parse(curl([
  "-X", "POST", "https://www.reddit.com/api/v1/access_token",
  "-u", `${process.env.REDDIT_ADS_APP_ID}:${process.env.REDDIT_ADS_APP_SECRET}`,
  "-d", `grant_type=refresh_token&refresh_token=${process.env.REDDIT_ADS_REFRESH_TOKEN}`,
])).access_token;
if (!TOKEN) throw new Error("no access_token");
const auth = ["-H", `Authorization: Bearer ${TOKEN}`, "-H", "Content-Type: application/json"];
const get = (p) => JSON.parse(curl([...auth, p.startsWith("http") ? p : API + p]));
const patch = (p, b) => JSON.parse(curl([...auth, "-X", "PATCH", API + p, "-d", JSON.stringify({ data: b })]));

// List endpoints cap at 50 and hand back pagination.next_url. Follow it, or a page-1-only
// sweep silently leaves half the incumbents running and reports success.
const rows = [];
let url = API + `/ad_accounts/${ACCOUNT}/ads?page.size=50`;
for (let i = 0; i < 20 && url; i++) {
  const page = get(url);
  rows.push(...(page.data ?? []));
  url = page.pagination?.next_url ?? null;
}

const inGroup = rows.filter((a) => a.ad_group_id === AD_GROUP);
const keep = inGroup.filter((a) => KEEP.has(a.name));
const kill = inGroup.filter((a) => !KEEP.has(a.name) && a.configured_status === "ACTIVE");
const alreadyOff = inGroup.length - keep.length - kill.length;

log(`ad group holds ${inGroup.length} ads`);
log(`keeping ${keep.length} weird-animal ads active`);
log(`pausing ${kill.length} others (${alreadyOff} already not active)`);

if (keep.length !== KEEP.size) {
  throw new Error(`expected ${KEEP.size} weird-animal ads, found ${keep.length}. Refusing to pause anything.`);
}

for (const a of kill) {
  if (!LIVE) { log(`DRY  would pause ${a.name}`); continue; }
  const r = patch(`/ads/${a.id}`, { configured_status: "PAUSED" });
  log(`  paused ${a.name} -> ${r.data?.configured_status ?? JSON.stringify(r).slice(0, 120)}`);
}

log(LIVE ? `done. $30.00/day now contested by ${keep.length} weird-animal ads only.` : "dry run only, re-run with --live");
