#!/usr/bin/env node
/**
 * Rebuild the 1Lookup Meta account around batch 13, PAUSED.
 *
 *   node _scripts/meta-rebuild-1lookup-b13.mjs                 # dry run, prints the plan
 *   node _scripts/meta-rebuild-1lookup-b13.mjs --live          # creates everything, campaigns PAUSED
 *   node _scripts/meta-rebuild-1lookup-b13.mjs --live --only platform
 *
 * WHY A REBUILD AND NOT A BUDGET RAISE. The audit on 2026-08-19 measured the account end to
 * end and found the existing structure cannot convert at any budget:
 *
 *   - $4,342.89 spent lifetime, 51,695 clicks, 25,998 landing page views, and TWO attributed
 *     trials, both view-through. Zero click-attributed trials, ever.
 *   - Audience Network took 70.7% of all clicks and 91.4% of all landing page views for
 *     19.7% of spend, at a 15-39% CTR and a $0.015 CPC. That is a click farm, not an audience,
 *     and it also teaches the optimiser to chase the click farm.
 *   - The "Global" ad sets sent 74% of all impressions to the United Arab Emirates, for a US
 *     B2B data API. $997.34, zero trials.
 *   - All 57 linked creatives point at https://www.1lookup.io/ and 60 of 60 carry no UTMs, so
 *     an ad about skip tracing lands on a generic homepage and nothing downstream can tell a
 *     Meta visitor from any other visitor.
 *   - 53 of 60 creatives use LEARN_MORE or SEE_DETAILS on a sales objective.
 *   - 200 ads have been built and 15 run at once on $50/day, about $3.30 per ad per day, so
 *     not one creative has ever earned a quality or conversion ranking. Nothing has been
 *     learned from any test to date.
 *
 * So this script fixes all six at once, in code, and refuses to reproduce any of them.
 *
 * WHAT IT BUILDS. Four campaigns, each PAUSED, each with a small number of ad sets carrying a
 * budget big enough to read:
 *
 *   1L | META | COLD | Platform | Trials       $30/day  the 41-products platform pitch
 *   1L | META | COLD | Validate | Trials       $30/day  phone, email, IP, DNC, fraud
 *   1L | META | COLD | Enrich | Trials         $17/day  skip trace, append, prospecting
 *   1L | META | RETARGET | Platform | Trials   $10/day  site visitors, 90 days
 *
 * $87/day total, which is the week-4 steady-state Meta share of the $10K/month plan. Week 1
 * is $25/day on the Platform campaign alone; the other three stay paused until the ramp gate
 * clears. Do not flip all four on day one.
 *
 * OPTIMISATION EVENT, and this is the part that matters most. Stripe records about 0.6
 * card-saved trials a day across ALL sources. Meta needs roughly 50 conversions per ad set per
 * week to leave the learning phase. Optimising a $60/day ad set on a 0.6/day event guarantees
 * it stays in learning forever, which is exactly why the two live ad sets show
 * learning_stage_info conversions: 0 and pay a $64-72 CPM instead of $10-15.
 *
 * So the cold ad sets optimise for LANDING_PAGE_VIEWS until a real upper-funnel event exists,
 * and every ad is judged on Stripe trials via its UTMs, never on Meta's reported number. The
 * moment the app fires a standard event with volume (signup completion is ~24/day), switch
 * OPTIMIZATION below to OFFSITE_CONVERSIONS on that event. That switch is one constant.
 *
 * Nothing here is a budget increase on its own: everything is created PAUSED and the flip is
 * Robby's.
 */

import { createHmac } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const API = "https://graph.facebook.com/v25.0";
const ACCOUNT = "act_2333276243857483";
const PAGE_ID = "738050449402637";
const PIXEL_ID = "1346353600874017";
const CUSTOM_CONV_TRIAL = "1556534182263768"; // "Free Trial Started"
const RETARGET_AUDIENCE = "6943239581717"; // "90 Days Website Visitors"

const argv = process.argv.slice(2);
const LIVE = argv.includes("--live");
const ONLY = (() => { const i = argv.indexOf("--only"); return i === -1 ? null : argv[i + 1]; })();

const TOKEN = process.env.META_SYSTEM_USER_TOKEN;
const SECRET = process.env.META_APP_SECRET;
if (!TOKEN || !SECRET) throw new Error("META_SYSTEM_USER_TOKEN and META_APP_SECRET must be set");
const PROOF = createHmac("sha256", SECRET).update(TOKEN).digest("hex");

// Until a high-volume standard event exists in the pixel, optimise on something that actually
// happens. See the header. Flip this to ["OFFSITE_CONVERSIONS", CUSTOM_CONV_TRIAL] the day the
// app fires a signup event with volume.
const OPTIMIZATION = { goal: "LANDING_PAGE_VIEWS", promoted: null };

const log = (...a) => console.log(...a);

function api(method, edge, body) {
  const url = `${API}/${edge}`;
  if (!LIVE && method === "POST") {
    log(`  DRY  ${method} ${edge}`);
    for (const [k, v] of Object.entries(body || {})) {
      log(`         ${k}: ${String(v).slice(0, 150)}`);
    }
    return { id: `dry_${Math.abs(hash(JSON.stringify(body))).toString(36)}` };
  }
  const args = ["-s", "--max-time", "180", "-X", method, url];
  const form = { ...(body || {}), access_token: TOKEN, appsecret_proof: PROOF };
  if (method === "GET") {
    const qs = new URLSearchParams(form);
    args[args.length - 1] = `${url}?${qs}`;
    args.splice(args.indexOf("-X"), 2);
  } else {
    for (const [k, v] of Object.entries(form)) args.push("-F", `${k}=${v}`);
  }
  const raw = execFileSync("curl", args, { encoding: "utf8", maxBuffer: 1 << 26 });
  let j;
  try { j = JSON.parse(raw); } catch { throw new Error(`non-JSON from ${edge}: ${raw.slice(0, 300)}`); }
  if (j.error) {
    const e = j.error;
    throw new Error(`${edge}: ${e.message} (code ${e.code}${e.error_subcode ? "/" + e.error_subcode : ""})` +
      `${e.error_user_title ? " | " + e.error_user_title : ""}${e.error_user_msg ? " | " + e.error_user_msg : ""}` +
      `${e.error_data ? " | " + JSON.stringify(e.error_data) : ""}`);
  }
  return j;
}

// Deterministic id for dry-run output so a dry run is diffable between invocations.
function hash(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

// ---------------------------------------------------------------- naming + utms
// NAMING.md: the ad name IS the creative file's basename, and utm_content is the asset id
// plus shape, so a Stripe subscription can be traced back to one PNG in this repo.
const adName = (product, assetId, concept, shape) => `1L | ${product} | ${assetId} ${concept} | ${shape}`;
const utms = (campaignName, assetId, shape, product) =>
  `utm_source=facebook&utm_medium=cpc&utm_campaign=${encodeURIComponent(campaignName.toLowerCase().replace(/[\s|]+/g, "-"))}` +
  `&utm_content=${assetId}-${shape}&utm_term=${product}`;

// ---------------------------------------------------------------- the plan
const { BANNERS } = await import("./banner-prompts-b13-1lookup.mjs");
const { BATCH } = await import("./banner-prompts-b13-1lookup.mjs");

const byProduct = (slugs) => BANNERS.filter((b) => slugs.includes(b.product) && b.family !== "analog");
const analogFor = (slugs) => BANNERS.filter((b) => slugs.includes(b.product) && b.family === "analog");

const VALIDATE = ["phone-validation", "email-validation", "ip-lookup", "phone-scrub", "fraud-detection", "phone-spam-check"];
const ENRICH = ["skip-trace", "b2b-contact-append", "prospect-search", "reverse-ip-append", "mobile-finder"];

// Geo tiers, weighted off Stripe card country on every succeeded charge since 2024-01-01
// (466 charges, $95,135 gross). Run `node _scripts/geo-vs-revenue.mjs` to re-derive.
//
//   T1  US                       57.5% of all revenue ever, 120 paying customers
//   T2  CA GB AU IE NZ           12.2%, 41 customers, English, same creative, no rework
//   T3  IL AE HK MX PL DE FR     22.5%, 53 customers, five languages, NOT built here
//
// One tier per campaign, never two tiers in one campaign. Campaign budget optimisation
// buys the cheapest impression that fits, and a T2 CPM is a fraction of a US CPM, so a
// mixed campaign spends nearly everything outside the US. That is the exact mechanism that
// put 81% of this account's last-90-day impressions into the UAE.
const GEO_TIERS = {
  t1: ["US"],
  t2: ["CA", "GB", "AU", "IE", "NZ"],
};

const CAMPAIGNS = [
  {
    key: "platform",
    name: "1L | META | COLD | Platform | Trials",
    dailyBudget: 2000,
    adSets: [
      { name: "1L | platform | US Broad | Auto", targeting: "broad", ads: BANNERS.filter((b) => b.product === "platform") },
    ],
  },
  {
    // Carved out of the platform campaign, not added on top: Meta's share of the ramp stays
    // $87/day. 11.5% of the Meta budget for 12.2% of the revenue, which is the whole point.
    key: "tier2",
    name: "1L | META | COLD | Platform T2 | Trials",
    dailyBudget: 1000,
    adSets: [
      { name: "1L | platform | T2 English Broad | Auto", targeting: "broad-t2", ads: BANNERS.filter((b) => b.product === "platform") },
    ],
  },
  {
    key: "validate",
    name: "1L | META | COLD | Validate | Trials",
    dailyBudget: 3000,
    adSets: [
      { name: "1L | validate | US Sales 25-54 | Auto", targeting: "sales", ads: byProduct(VALIDATE) },
      { name: "1L | analog | US Broad | Auto", targeting: "broad", ads: analogFor([...VALIDATE, ...ENRICH]) },
    ],
  },
  {
    key: "enrich",
    name: "1L | META | COLD | Enrich | Trials",
    dailyBudget: 1700,
    adSets: [
      { name: "1L | enrich | US Sales 25-54 | Auto", targeting: "sales", ads: byProduct(ENRICH) },
    ],
  },
  {
    key: "retarget",
    name: "1L | META | RETARGET | Platform | Trials",
    dailyBudget: 1000,
    adSets: [
      { name: "1L | platform | Retarget 90d | Auto", targeting: "retarget", ads: BANNERS.filter((b) => b.product === "platform") },
    ],
  },
];

// Placements are named explicitly, never automatic. Audience Network and Messenger are the
// two that produced 70.7% of the account's clicks and zero trials.
const PLACEMENTS = {
  publisher_platforms: JSON.stringify(["facebook", "instagram"]),
  // "video_feeds" was removed here on 2026-08-19: Graph v25.0 rejects the whole ad set with
  // "Facebook video feeds placement is deprecated for this API version".
  facebook_positions: JSON.stringify(["feed", "story", "instream_video", "facebook_reels"]),
  instagram_positions: JSON.stringify(["stream", "story", "reels", "explore"]),
  device_platforms: JSON.stringify(["mobile", "desktop"]),
};

// Geo comes off the tier table above, never a hand-typed country list here.
function targetingSpec(kind) {
  const base = {
    geo_locations: { countries: kind.endsWith("-t2") ? GEO_TIERS.t2 : GEO_TIERS.t1 },
    age_min: 25,
    age_max: 60,
    ...JSON.parse(JSON.stringify({})),
  };
  if (kind === "sales") {
    // Interest targeting kept deliberately small and named, so it is legible in a report.
    base.flexible_spec = [{ interests: [
      { id: "6003371567474", name: "Sales" },
      { id: "6003263791114", name: "Marketing" },
      { id: "6002867432822", name: "Small business" },
    ] }];
  }
  if (kind === "retarget") {
    base.custom_audiences = [{ id: RETARGET_AUDIENCE }];
    delete base.age_min;
    delete base.age_max;
  }
  // Graph v25.0 refuses an ad set that does not state this either way ("Advantage Audience
  // Flag Required"). On a broad ad set the whole point is to let Meta find the buyer, so it
  // is on; on the interest and retargeting ad sets it is off, because there the named
  // audience IS the test and an expansion would quietly erase it.
  base.targeting_automation = { advantage_audience: kind.startsWith("broad") ? 1 : 0 };
  // Advantage+ audience refuses any maximum age under 65, so the broad ad sets carry a
  // 25-65 band and the interest ad sets keep the tighter 25-60 working-age band.
  if (base.targeting_automation.advantage_audience === 1 && base.age_max) base.age_max = 65;
  const spec = { ...base, ...Object.fromEntries(Object.entries(PLACEMENTS).map(([k, v]) => [k, JSON.parse(v)])) };
  return JSON.stringify(spec);
}

// Meta deprecated the single `standard_enhancements` opt-out in v25.0 ("Including standard
// enhancements field in creative has been deprecated"), so every feature is now named one by
// one. This matters more here than convenience: 1Lookup's own guardrail bans invented numbers
// and third-party marks, and the text features rewrite the headline and the body copy while
// the image features restyle a rendered banner. An ad that ships an auto-written claim is a
// claim violation whoever typed it.
// Graph v25.0 accepts exactly seven keys here and rejects the whole creative on any other,
// naming the allowed set in the error: IG_VIDEO_NATIVE_SUBTITLE, IMAGE_ANIMATION,
// PRODUCT_BROWSING, PRODUCT_METADATA_AUTOMATION, PROFILE_CARD,
// STANDARD_ENHANCEMENTS_CATALOG, TEXT_OVERLAY_TRANSLATION. The four that can touch this
// account's creative are opted out below.
//
// WHAT THIS NO LONGER BUYS US, and somebody has to know it: the old blanket
// `standard_enhancements: OPT_OUT` also covered Meta's headline and body-copy rewriting, and
// v25.0 exposes no key for that here. 1Lookup's guardrail bans invented numbers and accuracy
// claims, and an auto-written headline is a claim violation whoever typed it. So the copy
// setting has to be checked in Ads Manager under the ad's "Advantage+ creative" toggles after
// a build, and that check is not something this script can do for you.
const OPT_OUT_FEATURES = [
  "IMAGE_ANIMATION",          // do not animate a rendered banner
  "IG_VIDEO_NATIVE_SUBTITLE", // every video ships burned one-word captions already
  "TEXT_OVERLAY_TRANSLATION", // do not translate burned-in English text
  "PROFILE_CARD",
];
const OPT_OUTS = Object.fromEntries(OPT_OUT_FEATURES.map((f) => [f, { enroll_status: "OPT_OUT" }]));

// ---------------------------------------------------------------- image upload
const uploaded = new Map();
function uploadImage(file) {
  if (uploaded.has(file)) return uploaded.get(file);
  const abs = path.join(ROOT, file);
  if (!existsSync(abs)) throw new Error(`missing creative file: ${file}`);
  if (!LIVE) { uploaded.set(file, `dry_hash_${path.basename(file)}`); return uploaded.get(file); }
  const raw = execFileSync("curl", [
    "-s", "--max-time", "300", "-X", "POST", `${API}/${ACCOUNT}/adimages`,
    "-F", `filename=@${abs}`,
    "-F", `access_token=${TOKEN}`, "-F", `appsecret_proof=${PROOF}`,
  ], { encoding: "utf8", maxBuffer: 1 << 26 });
  const j = JSON.parse(raw);
  if (j.error) throw new Error(`adimages ${file}: ${j.error.message}`);
  const hashKey = Object.keys(j.images || {})[0];
  const h = j.images[hashKey].hash;
  uploaded.set(file, h);
  log(`  uploaded ${path.basename(file)} -> ${h.slice(0, 12)}`);
  return h;
}

// ---------------------------------------------------------------- idempotency
// A half-finished run used to leave orphan campaigns behind and a re-run created a second
// copy of everything, which is how an ad account ends up with 200 ads nobody can read. Every
// object is now looked up by its exact name first, so re-running after a failure resumes
// instead of duplicating.
const nameCache = new Map();
function existing(edge, key) {
  if (!nameCache.has(key)) {
    const rows = [];
    let after = null;
    do {
      // api() appends its own query string, so the fields go in the body, never in the edge:
      // an edge that already carries a "?" produces a second one and Graph answers
      // "(#200) Provide valid app ID" because it never parses the token.
      const page = api("GET", edge, { fields: "id,name", limit: 200, ...(after ? { after } : {}) });
      rows.push(...(page.data ?? []));
      after = page.paging?.cursors?.after && page.data?.length ? page.paging.cursors.after : null;
    } while (after);
    nameCache.set(key, rows);
  }
  return nameCache.get(key);
}
function findOrCreate(edge, cacheKey, name, body, label) {
  const hit = existing(edge, cacheKey).find((r) => r.name === name);
  if (hit) { log(`  reuse ${label} ${hit.id}  ${name}`); return { id: hit.id, reused: true }; }
  const made = api("POST", edge, body);
  if (LIVE) existing(edge, cacheKey).push({ id: made.id, name });
  return made;
}

// ---------------------------------------------------------------- build
const created = { campaigns: [], adSets: [], ads: [] };

for (const c of CAMPAIGNS) {
  if (ONLY && c.key !== ONLY) continue;
  log(`\n=== ${c.name}  $${(c.dailyBudget / 100).toFixed(2)}/day  PAUSED`);

  const campaign = findOrCreate(`${ACCOUNT}/campaigns`, "campaigns", c.name, {
    name: c.name,
    objective: "OUTCOME_SALES",
    status: "PAUSED",
    special_ad_categories: JSON.stringify([]),
    // Campaign budget optimisation, so Meta moves money to the ad set that works rather than
    // splitting it evenly across creative nobody has read yet.
    daily_budget: String(c.dailyBudget),
    bid_strategy: "LOWEST_COST_WITHOUT_CAP",
  }, "campaign");
  created.campaigns.push({ id: campaign.id, name: c.name });
  log(`  campaign ${campaign.id}`);

  for (const s of c.adSets) {
    if (!s.ads.length) { log(`  (skip ${s.name}: no creative)`); continue; }
    const adSet = findOrCreate(`${ACCOUNT}/adsets`, "adsets", s.name, {
      name: s.name,
      campaign_id: campaign.id,
      status: "PAUSED",
      billing_event: "IMPRESSIONS",
      optimization_goal: OPTIMIZATION.goal,
      ...(OPTIMIZATION.promoted ? { promoted_object: JSON.stringify({ pixel_id: PIXEL_ID, custom_event_type: "OTHER", custom_conversion_id: CUSTOM_CONV_TRIAL }) } : {}),
      targeting: targetingSpec(s.targeting),
      // Weekends are 29% of the days and 16% of the trials (Stripe, 365 days). Meta only
      // honours a schedule on a lifetime budget, so this is left for the operator rather
      // than half-applied here; the finding is recorded in the batch README.
    }, "ad set");
    created.adSets.push({ id: adSet.id, name: s.name, campaign: c.name });
    log(`  ad set ${adSet.id}  ${s.name}  (${s.ads.length} concepts)`);

    for (const b of s.ads) {
      // One ad per shape, because the same concept performs differently at 1:1 and 9:16 and
      // an export cannot tell those rows apart unless the shape is in the name.
      for (const shape of b.shapes) {
        const file = `1lookup/${BATCH}/${b.id}-${shape}.png`;
        const assetId = b.id.match(/b\d+c\d{2}/)[0];
        const name = adName(b.product, assetId, b.concept, shape);
        const link = `${b.destination}?${utms(c.name, assetId, shape, b.product)}`;
        // Check the ad before uploading the image: an existing ad means the upload, the
        // creative and the ad were all already paid for on an earlier run.
        //
        // Scoped to THIS ad set, not the account. The platform banners appear in three
        // campaigns (US, T2 and retargeting) and adName() gives them the same name in all
        // three, so an account-wide check silently declared them already built and left the
        // T2 and retargeting ad sets holding zero ads on a live budget. Meta allows
        // duplicate ad names across ad sets; the ad set is the real uniqueness scope.
        const already = existing(`${adSet.id}/ads`, `ads:${adSet.id}`).find((r) => r.name === name);
        if (already) { log(`    reuse ad ${already.id}  ${name}`); created.ads.push({ id: already.id, name, file, link, reused: true }); continue; }
        const hashV = uploadImage(file);

        const creative = api("POST", `${ACCOUNT}/adcreatives`, {
          name,
          object_story_spec: JSON.stringify({
            page_id: PAGE_ID,
            link_data: {
              image_hash: hashV,
              link,
              message: b.subheadline ?? "",
              name: b.headline,
              // SIGN_UP, never LEARN_MORE. 53 of 60 historical creatives said Learn More on a
              // sales objective, which pre-selects browsers over buyers.
              call_to_action: { type: "SIGN_UP", value: { link } },
            },
          }),
          // Belt and braces: url_tags survive even if the link ever gets rewritten.
          url_tags: utms(c.name, assetId, shape, b.product),
          degrees_of_freedom_spec: JSON.stringify({ creative_features_spec: OPT_OUTS }),
        });

        const ad = api("POST", `${ACCOUNT}/ads`, {
          name,
          adset_id: adSet.id,
          creative: JSON.stringify({ creative_id: creative.id }),
          status: "ACTIVE", // active INSIDE a paused campaign, so one flip launches
        });
        created.ads.push({ id: ad.id, name, file, link });
        log(`    ad ${ad.id}  ${name}`);
      }
    }
  }
}

log(`\n${LIVE ? "CREATED" : "DRY RUN"}: ${created.campaigns.length} campaigns, ${created.adSets.length} ad sets, ${created.ads.length} ads.`);
log(`Total daily budget if every campaign is flipped ACTIVE: $${(CAMPAIGNS.filter((c) => !ONLY || c.key === ONLY).reduce((n, c) => n + c.dailyBudget, 0) / 100).toFixed(2)}/day`);
log(`Optimisation goal on every cold ad set: ${OPTIMIZATION.goal}. Judge these on Stripe trials via utm_content, never on Meta's own number.`);

if (LIVE) {
  const out = path.join(ROOT, "_scripts", `meta-build-log-${BATCH}.json`);
  execFileSync("bash", ["-c", `cat > ${JSON.stringify(out)}`], { input: JSON.stringify({ ranAt: new Date().toISOString(), account: ACCOUNT, ...created }, null, 2) });
  log(`build log: ${path.relative(ROOT, out)}`);
}
