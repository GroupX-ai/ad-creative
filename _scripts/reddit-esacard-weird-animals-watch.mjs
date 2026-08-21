#!/usr/bin/env node
// Robby, 2026-08-21: "As long as we're only spending on the weird animals ads in Reddit - let's
// let it spend up to $100 on these, then make a decision."
//
//   node _scripts/reddit-esacard-weird-animals-watch.mjs              # report only (default)
//   node _scripts/reddit-esacard-weird-animals-watch.mjs --pause-at-cap  # also pause the 17 at $100
//
// READ ONLY unless --pause-at-cap is passed. The default cannot spend or stop money.
//
// Two things this watches, and the second is the one that matters:
//
//   1. Weird-animal spend against the $100 gate.
//   2. That NOTHING ELSE is spending. Robby's instruction was conditional ("as long as we're only
//      spending on the weird animals"), so a stray unpaused ad invalidates the test, not just the
//      number. If a non-weird ad spends a cent this exits non-zero and says so.
//
// Spend is measured from 2026-08-20T12:00:00Z, the first clean hour after the sweep: the other 60
// ads finished pausing at 11:36Z and the 17 weird ads were activated at 11:56Z. Anything earlier
// blends the incumbents' tail into the weird-animal total.
//
// THREE REDDIT REPORT-API TRAPS, all paid for on 2026-08-21. Do not "simplify" these away:
//
//   a. The AD_ID breakdown caps at 50 rows and hands back pagination.next_url. A page-1-only read
//      of a 20-day window returned $23.86 for an account that had actually spent far more, with
//      exactly 50 ads listed. That is what a silent truncation looks like: a plausible number.
//   b. That next_url 404s on GET, so the pagination cannot be followed the usual way. The fix is
//      not to need it: AD_GROUP_ID returns 4 rows and cannot paginate, and since only weird ads
//      are active in the Purchase group, the group total IS the weird-animal total. AD_ID is kept
//      only as the did-anything-else-spend check, where truncation would be caught by the
//      cross-check rather than believed.
//   c. starts_at/ends_at must be hour-aligned (YYYY-MM-DDTHH:00:00Z) or the API 400s.
//   d. ends_at is IGNORED. Every report runs starts_at -> now, whatever you pass. Four windows
//      ending 00:00, 06:00, 12:00 and 19:00 all returned the identical 31 rows ending at the
//      current hour. So a report can never be pinned to a past window, and any "as of" label has
//      to come from the row timestamps, not from the parameters. Combined with (a) this is nasty:
//      HOUR breakdown over a 67-hour window returned 50 rows ending 41 hours early and summed to
//      a number that looked like a total. Row count is per breakdown VALUE, so AD_GROUP_ID (1 row
//      here) never truncates and is the only safe basis for the running total.
//
// The account reports in America/Los_Angeles. Every window here is explicit UTC so the numbers do
// not shift under a dashboard that is on LA time; a "today" column in the UI is up to 7 hours
// behind a UTC "today" and will read ~$0 just after LA midnight.

import { execFileSync } from "node:child_process";

const ACCOUNT = "a2_ji9rrnreyf0d";
const AD_GROUP = "2570690648253263407"; // ESA | Pet + Housing | Purchase
const START = "2026-08-20T12:00:00Z";   // first clean hour after the sweep
const CAP_USD = 100;
const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";
const PAUSE_AT_CAP = process.argv.includes("--pause-at-cap");
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

const isWeird = (name) => /^ESA (IMG|VID) w\d/.test(name ?? "");
const usd = (micros) => micros / 1e6;
const hourFloor = (d) => d.toISOString().slice(0, 14) + "00:00Z";

const curl = (args) => execFileSync("curl", ["-sS", "-A", UA, ...args], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });

const TOKEN = JSON.parse(curl([
  "-X", "POST", "https://www.reddit.com/api/v1/access_token",
  "-u", `${process.env.REDDIT_ADS_APP_ID}:${process.env.REDDIT_ADS_APP_SECRET}`,
  "-d", `grant_type=refresh_token&refresh_token=${process.env.REDDIT_ADS_REFRESH_TOKEN}`,
])).access_token;
if (!TOKEN) throw new Error("no access_token: check REDDIT_ADS_APP_ID / _APP_SECRET / _REFRESH_TOKEN");
const auth = ["-H", `Authorization: Bearer ${TOKEN}`, "-H", "Content-Type: application/json"];

const get = (p) => JSON.parse(curl([...auth, p.startsWith("http") ? p : API + p]));
const patch = (p, b) => JSON.parse(curl([...auth, "-X", "PATCH", API + p, "-d", JSON.stringify({ data: b })]));
const listAll = (path) => {
  const rows = []; let url = API + path;
  for (let i = 0; i < 25 && url; i++) { const p = get(url); rows.push(...(p.data ?? [])); url = p.pagination?.next_url ?? null; }
  return rows;
};
const report = (starts, ends, breakdown) => {
  const p = JSON.parse(curl([...auth, "-X", "POST", `${API}/ad_accounts/${ACCOUNT}/reports`, "-d",
    JSON.stringify({ data: { breakdowns: [breakdown], fields: ["SPEND", "IMPRESSIONS", "CLICKS"], starts_at: starts, ends_at: ends, time_zone_id: "UTC" } })]));
  if (p.error) throw new Error(`report ${breakdown}: ${JSON.stringify(p.error).slice(0, 300)}`);
  return { rows: p.data?.metrics ?? [], truncated: !!p.pagination?.next_url };
};

// ends_at is ignored by the API (trap d); this is sent only to satisfy validation. The window is
// always START -> now, which is what the $100 running total wants anyway.
const NOW = hourFloor(new Date(Date.now() + 3600 * 1000));
const ads = listAll(`/ad_accounts/${ACCOUNT}/ads?page.size=50`);
const nameById = Object.fromEntries(ads.map((a) => [a.id, a.name]));

// 1. Authoritative total: the Purchase ad group. 4 rows, cannot paginate.
const byGroup = report(START, NOW, "AD_GROUP_ID");
const groupRow = byGroup.rows.find((r) => r.ad_group_id === AD_GROUP);
const weirdSpend = usd(groupRow?.spend ?? 0);
const impressions = groupRow?.impressions ?? 0;
const clicks = groupRow?.clicks ?? 0;

// 2. The condition check: did anything that is not a weird animal spend?
const byAd = report(START, NOW, "AD_ID");
const strays = byAd.rows
  .filter((r) => r.spend > 0 && !isWeird(nameById[r.ad_id]))
  .map((r) => ({ name: nameById[r.ad_id] ?? r.ad_id, spend: usd(r.spend) }));
const weirdFromAds = byAd.rows.filter((r) => isWeird(nameById[r.ad_id])).reduce((a, r) => a + usd(r.spend), 0);
const otherGroups = byGroup.rows.filter((r) => r.ad_group_id !== AD_GROUP && r.spend > 0);

log(`window ${START} -> now (ends_at is ignored by the API, see trap d)`);
log(`weird-animal spend $${weirdSpend.toFixed(2)} of $${CAP_USD}  (${((weirdSpend / CAP_USD) * 100).toFixed(0)}%)`);
log(`  impressions ${impressions}, clicks ${clicks}`);
log(`  cross-check, summing the weird ads individually: $${weirdFromAds.toFixed(2)} ` +
    `${Math.abs(weirdFromAds - weirdSpend) < 0.05 ? "MATCH" : "*** MISMATCH, do not trust these numbers ***"}`);
if (byAd.truncated || byAd.rows.length >= 50) log(`  NOTE: the AD_ID report hit the 50-row cap, so the stray check may be partial (traps a + d). The cross-check above is what to trust.`);

let bad = false;
if (strays.length) {
  bad = true;
  log(`CONDITION BROKEN: ${strays.length} non-weird ad(s) have spent inside the Purchase group:`);
  for (const s of strays) log(`   - ${s.name}  $${s.spend.toFixed(2)}`);
}
for (const g of otherGroups) { bad = true; log(`CONDITION BROKEN: ad group ${g.ad_group_id} spent $${usd(g.spend).toFixed(2)}`); }
if (!bad) log(`condition holds: $0.00 to anything that is not a weird animal.`);

// 3. Delivery health. configured_status is what you set, effective_status is what is happening.
const live = ads.filter((a) => a.ad_group_id === AD_GROUP && isWeird(a.name));
const eff = {};
for (const a of live) (eff[a.effective_status] ??= []).push(a.name);
log(`the 17: ${Object.entries(eff).map(([k, v]) => `${v.length} ${k}`).join(", ")}`);

const remaining = CAP_USD - weirdSpend;
if (remaining > 0) {
  const perDay = weirdSpend / Math.max(0.25, (Date.now() - Date.parse(START)) / 86400000);
  log(`$${remaining.toFixed(2)} left. At the observed $${perDay.toFixed(2)}/day that is ~${(remaining / Math.max(perDay, 0.01)).toFixed(1)} more days.`);
} else {
  log(`*** CAP REACHED: $${weirdSpend.toFixed(2)} >= $${CAP_USD}. Robby's decision point. ***`);
  if (PAUSE_AT_CAP) {
    for (const a of live.filter((x) => x.configured_status === "ACTIVE")) {
      const r = patch(`/ads/${a.id}`, { configured_status: "PAUSED" });
      log(`  paused ${a.name} -> ${r.data?.configured_status ?? JSON.stringify(r).slice(0, 120)}`);
    }
    log(`  paused, not archived, so any of them restarts in one call.`);
  } else {
    log(`  report-only mode, nothing was paused. Re-run with --pause-at-cap to stop delivery here.`);
  }
}
process.exit(bad ? 1 : 0);
