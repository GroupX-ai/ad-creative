#!/usr/bin/env node
// Where the money comes from vs where the ad budget goes.
//
//   node _scripts/geo-vs-revenue.mjs                        # read-only audit
//   node _scripts/geo-vs-revenue.mjs --fix-meta-placements  # dry run of the fix
//   node _scripts/geo-vs-revenue.mjs --fix-meta-placements --live
//   node _scripts/geo-vs-revenue.mjs --fix-google-ca --live
//
// Why this exists: on 2026-08-19 Robby asked whether Meta's geo problem was fixed and
// said 90% of traffic should come from the countries the customers actually come from.
// Answering that needs three numbers side by side, and only one of them lives in an ad
// platform. Stripe is the system of record for "where a customer is": the card country on
// a succeeded charge. An ad platform's country is a guess about an IP.
//
// The failure this is built to catch is not "wrong country list". It is a right country
// list in ONE ad set. Meta and Google both buy the cheapest impression that fits the
// targeting, so a single ad set holding US ($30 CPM) next to AE or MX ($2 CPM) spends
// almost everything in the cheap market. That is exactly how this account delivered 81%
// of 90 days of impressions into the UAE while nominally targeting a sensible list.
// One tier per CPM band, one budget each, or the cheap tier eats the campaign.

import { execFileSync } from "node:child_process";
import { createHmac } from "node:crypto";

const argv = process.argv.slice(2);
const has = (n) => argv.includes(`--${n}`);
const LIVE = has("live");

const META_ACCOUNT = "act_2333276243857483";
const GOOGLE_CID = "8715389296";

// Placements that are allowed to serve. Audience Network is display inventory inside
// third-party mobile apps and games; it has never produced a Stripe trial on this account
// and it is where the $0.015 CPC click farm lived. Leaving publisher_platforms unset does
// NOT mean "Meta picks well", it means all of them including that one.
const ALLOWED_PLATFORMS = ["facebook", "instagram"];

// ---------------------------------------------------------------------- Stripe
function stripe(path, params = {}) {
  const key = process.env.STRIPE_KEY_1LOOKUP;
  if (!key) throw new Error("STRIPE_KEY_1LOOKUP missing");
  const qs = new URLSearchParams({ limit: "100", ...params });
  const j = JSON.parse(execFileSync("curl", ["-s", "--max-time", "120", "-u", `${key}:`,
    `https://api.stripe.com/v1/${path}?${qs}`], { encoding: "utf8", maxBuffer: 1 << 28 }));
  if (j.error) throw new Error(`stripe ${path}: ${j.error.message}`);
  return j;
}

function stripeAll(path, params = {}) {
  const rows = [];
  let startingAfter;
  for (;;) {
    const page = stripe(path, { ...params, ...(startingAfter ? { starting_after: startingAfter } : {}) });
    rows.push(...page.data);
    if (!page.has_more) break;
    startingAfter = page.data.at(-1).id;
  }
  return rows;
}

function revenueByCountry(sinceIso = "2024-01-01") {
  const charges = stripeAll("charges", { "created[gte]": String(Math.floor(Date.parse(sinceIso) / 1000)) })
    .filter((c) => c.paid && c.status === "succeeded" && !c.refunded);
  const by = new Map();
  const customers = new Map();
  for (const c of charges) {
    const cc = c.payment_method_details?.card?.country || c.billing_details?.address?.country || "??";
    by.set(cc, (by.get(cc) || 0) + c.amount);
    if (c.customer) {
      if (!customers.has(cc)) customers.set(cc, new Set());
      customers.get(cc).add(c.customer);
    }
  }
  const total = [...by.values()].reduce((a, b) => a + b, 0);
  return { by, customers, total, charges: charges.length };
}

// ------------------------------------------------------------------------ Meta
function metaGet(pathname, params) {
  const tok = process.env.META_SYSTEM_USER_TOKEN;
  const proof = createHmac("sha256", process.env.META_APP_SECRET).update(tok).digest("hex");
  // Both must be in the QUERY STRING. As form fields on a GET they are silently dropped
  // and Graph answers "(#200) Provide valid app ID", which reads like a token problem.
  const qs = new URLSearchParams({ ...params, access_token: tok, appsecret_proof: proof });
  const j = JSON.parse(execFileSync("curl", ["-s", "--max-time", "180",
    `https://graph.facebook.com/v25.0/${pathname}?${qs}`], { encoding: "utf8", maxBuffer: 1 << 26 }));
  if (j.error) throw new Error(`meta ${pathname}: ${j.error.message}`);
  return j;
}

function metaPost(pathname, body) {
  const tok = process.env.META_SYSTEM_USER_TOKEN;
  const proof = createHmac("sha256", process.env.META_APP_SECRET).update(tok).digest("hex");
  const form = new URLSearchParams({ ...body, access_token: tok, appsecret_proof: proof });
  const j = JSON.parse(execFileSync("curl", ["-s", "--max-time", "180", "-X", "POST",
    "-d", form.toString(), `https://graph.facebook.com/v25.0/${pathname}`],
    { encoding: "utf8", maxBuffer: 1 << 26 }));
  if (j.error) throw new Error(`meta POST ${pathname}: ${j.error.message}`);
  return j;
}

function metaPage(pathname, params) {
  const rows = [];
  let after;
  for (;;) {
    const p = metaGet(pathname, { limit: "100", ...params, ...(after ? { after } : {}) });
    rows.push(...(p.data ?? []));
    if (!p.paging?.next) break;
    after = p.paging.cursors.after;
  }
  return rows;
}

// ---------------------------------------------------------------------- Google
async function googleSpendByCountry() {
  const lib = await import("/home/user/second-brain/scripts/google-ads-lib.mjs");
  const creds = await lib.loadCreds();
  const rows = await lib.gaSearch(creds, GOOGLE_CID, `
    SELECT geographic_view.country_criterion_id, metrics.impressions, metrics.clicks, metrics.cost_micros
    FROM geographic_view WHERE segments.date DURING LAST_30_DAYS`);
  const agg = new Map();
  for (const r of rows) {
    const id = String(r.geographicView?.countryCriterionId ?? "?");
    agg.set(id, (agg.get(id) || 0) + Number(r.metrics?.costMicros || 0) / 1e6);
  }
  const ids = [...agg.keys()].filter((x) => x !== "?");
  const names = new Map();
  if (ids.length) {
    for (const r of await lib.gaSearch(creds, GOOGLE_CID,
      `SELECT geo_target_constant.id, geo_target_constant.country_code
       FROM geo_target_constant WHERE geo_target_constant.id IN (${ids.join(",")})`))
      names.set(String(r.geoTargetConstant.id), r.geoTargetConstant.countryCode);
  }
  const out = new Map();
  for (const [id, cost] of agg) out.set(names.get(id) || id, (out.get(names.get(id) || id) || 0) + cost);
  return { out, lib, creds };
}

// ----------------------------------------------------------------------- audit
const rev = revenueByCountry();
console.log(`\nSTRIPE, the system of record. ${rev.charges} succeeded non-refunded charges since 2024-01-01, $${(rev.total / 100).toFixed(2)} gross.\n`);

const metaIns = metaPage(`${META_ACCOUNT}/insights`,
  { level: "account", breakdowns: "country", date_preset: "last_30d", fields: "impressions,clicks,spend" });
const metaSpend = new Map(metaIns.map((r) => [r.country, Number(r.spend)]));
const metaTotal = [...metaSpend.values()].reduce((a, b) => a + b, 0);

const { out: googleSpend } = await googleSpendByCountry();
const googleTotal = [...googleSpend.values()].reduce((a, b) => a + b, 0);
const adTotal = metaTotal + googleTotal;

const codes = new Set([...rev.by.keys(), ...metaSpend.keys(), ...googleSpend.keys()]);
const table = [...codes].map((cc) => {
  const revPct = 100 * (rev.by.get(cc) || 0) / rev.total;
  const adSpend = (metaSpend.get(cc) || 0) + (googleSpend.get(cc) || 0);
  const adPct = adTotal ? 100 * adSpend / adTotal : 0;
  return { cc, revPct, adPct, adSpend, customers: rev.customers.get(cc)?.size ?? 0,
           meta: metaSpend.get(cc) || 0, google: googleSpend.get(cc) || 0 };
}).sort((a, b) => (b.revPct + b.adPct) - (a.revPct + a.adPct));

console.log("cc   customers   % revenue    % ad spend      meta 30d    google 30d   weighting");
let cumRev = 0, onTarget = 0;
for (const r of table) {
  if (r.revPct < 0.05 && r.adPct < 0.05) continue;
  cumRev += r.revPct;
  if (r.revPct >= 1) onTarget += r.adPct;
  const ratio = r.revPct > 0.05 && r.adPct > 0 ? (r.adPct / r.revPct) : null;
  const verdict = r.revPct < 0.5 && r.adPct > 2 ? "SPEND, NO CUSTOMERS"
    : r.revPct >= 0.5 && r.adPct === 0 ? "never advertised to"
    : ratio === null ? ""
    : ratio > 2 ? `${ratio.toFixed(1)}x over`
    : ratio < 0.4 ? `${(1 / ratio).toFixed(1)}x under`
    : "in band";
  console.log(
    `${r.cc.padEnd(4)} ${String(r.customers).padStart(6)} ${r.revPct.toFixed(1).padStart(11)}% ${r.adPct.toFixed(1).padStart(12)}%` +
    ` ${("$" + r.meta.toFixed(2)).padStart(13)} ${("$" + r.google.toFixed(2)).padStart(13)}   ${verdict}`);
}
console.log(`\nAd spend landing in a country worth >=1% of revenue: ${onTarget.toFixed(1)}%  (Robby's bar: 90%)`);
console.log(`Meta last 30d $${metaTotal.toFixed(2)} | Google last 30d $${googleTotal.toFixed(2)}`);

// Countries covering 90% of all revenue ever, in order. This is the target list, but it is
// only safe split across CPM tiers, never as one ad set.
let acc = 0;
const ninety = [];
for (const r of [...table].sort((a, b) => b.revPct - a.revPct)) {
  if (acc >= 90) break;
  ninety.push(r.cc); acc += r.revPct;
}
console.log(`\n90% of revenue = ${ninety.length} countries: ${ninety.join(", ")} (${acc.toFixed(1)}%)`);

// -------------------------------------------------------- Meta placement audit
console.log("\nACTIVE Meta ad sets, placement check:");
const adsets = metaPage(`${META_ACCOUNT}/adsets`,
  { fields: "id,name,effective_status,targeting{geo_locations,publisher_platforms}" })
  .filter((a) => a.effective_status === "ACTIVE");
const leaky = [];
for (const a of adsets) {
  const plats = a.targeting?.publisher_platforms;
  const bad = !plats || plats.some((p) => !ALLOWED_PLATFORMS.includes(p));
  if (bad) leaky.push(a);
  console.log(`  ${bad ? "LEAKY" : "ok   "}  ${a.id}  geo=${(a.targeting?.geo_locations?.countries || []).join(",") || "?"}  platforms=${plats?.join(",") || "(unset = ALL, includes audience_network)"}  ${a.name}`);
}

if (has("fix-meta-placements")) {
  console.log(`\n${LIVE ? "APPLYING" : "DRY RUN"}: pin ${leaky.length} ad set(s) to ${ALLOWED_PLATFORMS.join(" + ")}`);
  for (const a of leaky) {
    const targeting = { ...a.targeting, publisher_platforms: ALLOWED_PLATFORMS };
    delete targeting.id;
    if (!LIVE) { console.log(`  would POST ${a.id} targeting=${JSON.stringify(targeting)}`); continue; }
    metaPost(a.id, { targeting: JSON.stringify(targeting) });
    console.log(`  ${a.id} updated`);
  }
}

// ----------------------------------------------------- Google Canada bid weight
if (has("fix-google-ca")) {
  const ca = table.find((r) => r.cc === "CA");
  console.log(`\n${LIVE ? "APPLYING" : "DRY RUN"}: Canada bid modifier 0.5.`);
  console.log(`  Canada today: ${ca?.adPct.toFixed(1)}% of ad spend for ${ca?.revPct.toFixed(1)}% of revenue.`);
  const lib = await import("/home/user/second-brain/scripts/google-ads-lib.mjs");
  const creds = await lib.loadCreds();
  const crit = await lib.gaSearch(creds, GOOGLE_CID, `
    SELECT campaign.name, campaign_criterion.resource_name, campaign_criterion.bid_modifier,
           campaign_criterion.location.geo_target_constant
    FROM campaign_criterion
    WHERE campaign_criterion.type = 'LOCATION' AND campaign.status = 'ENABLED'`);
  const caRows = crit.filter((r) => r.campaignCriterion.location.geoTargetConstant.endsWith("/2124"));
  const ops = caRows.map((r) => ({
    updateMask: "bid_modifier",
    update: { resourceName: r.campaignCriterion.resourceName, bidModifier: 0.5 },
  }));
  const res = await lib.gaMutate(creds, GOOGLE_CID, "campaignCriteria", ops, { validateOnly: !LIVE });
  console.log(`  ${ops.length} campaign criteria ${LIVE ? "updated" : "validated (validateOnly)"}`);
  console.log(`  ${JSON.stringify(res).slice(0, 400)}`);
}
