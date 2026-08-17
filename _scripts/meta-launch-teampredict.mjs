#!/usr/bin/env node
// TeamPredict Meta launch — 2026-08-13 batch 9.
//
//   node _scripts/meta-launch-teampredict.mjs            # dry run, prints the plan
//   node _scripts/meta-launch-teampredict.mjs --live     # create/update for real
//   node _scripts/meta-launch-teampredict.mjs --live --videos-only
//
// Idempotent by NAME at every level: campaign, ad set, creative and ad are all
// looked up before they are created, so a re-run after a partial failure adds
// only what is missing. Meta has no cheap undo for a duplicated ad set (its
// conversion settings are immutable once published, even paused), so name
// lookup is the safety net, not a nicety.
//
// Node's undici ignores HTTPS_PROXY in this environment and the egress layer
// answers 403, which reads exactly like an auth failure. Every call shells out
// to curl, which honours the proxy. This is the same lesson the Reddit write
// path learned on 2026-07-30.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const TOKEN = process.env.META_SYSTEM_USER_TOKEN;
if (!TOKEN) throw new Error("META_SYSTEM_USER_TOKEN is not set");

const API = "https://graph.facebook.com/v21.0";
const ROOT = path.resolve(import.meta.dirname, "..");
const LIVE = process.argv.includes("--live");
const VIDEOS_ONLY = process.argv.includes("--videos-only");
const SKIP_VIDEOS = process.argv.includes("--skip-videos");

// ---------------------------------------------------------------------------
// Account constants, all verified live on 2026-08-13 rather than assumed.
// ---------------------------------------------------------------------------
const ACT = "act_3055168734781162"; // "TeamPredict", Prymatica BM, USD
const PAGE_ID = "1283701074825630"; // "TeamPredict" Facebook page, published
const PIXEL_ID = "1985966148722482"; // "TeamPredict Pixel", last_fired 2026-08-13

// The free-trial signup, which is Robby's standing campaign-structure rule from
// 2026-07-20: every paid campaign optimises for the free-trial signup, never
// traffic or link clicks. The card-on-file trial (custom conversion
// 1627513902231509, START_TRIAL) is the MONEY event and is what gets reported,
// but it has never fired, and a brand-new pixel cannot optimise toward an event
// with zero history. So: bid on the signup, report on the trial.
const CUSTOM_CONVERSION_SIGNUP = "1386618896736601";

const DAILY_BUDGET_CENTS = 1300; // $13.00/day ≈ $395/month of the $1,000 pool

const CAMPAIGN_NAME = "TP | Meta | Free Trial Conversions (Claude) 2026-08";

// Superseded 2026-08-17. Robby: "I want one audience for founders and one for
// HR." The v1.0 ad set mixed both behind Advantage Audience, so the two buyers
// could never be told apart in reporting. It is paused, not deleted, so its
// ads stay comparable.
const LEGACY_ADSET_ID = "120251662616880233";

// TWO ad sets, one per buyer, and Advantage Audience is OFF in both. That is the
// whole point: with it on, Meta treats the interests and job titles as
// suggestions and quietly blends the two audiences back together, which would
// make the split decorative. Off costs some reach on $13/day and buys a real
// read on which buyer converts.
const AD_SETS = [
  {
    name: "HR & People — US 2.0",
    targeting: {
      geo_locations: { countries: ["US"] },
      age_min: 25,
      flexible_spec: [
        {
          interests: [
            { id: "6003069499982", name: "Human resource management" },
            { id: "6003485146398", name: "Employee engagement" },
            { id: "6003508907986", name: "Professional in Human Resources" },
          ],
          work_positions: [
            { id: "104033229633392", name: "Human resources" },
            { id: "105612759471878", name: "Human resource management" },
            { id: "776463239104506", name: "Human Resources Specialist" },
          ],
        },
      ],
      targeting_automation: { advantage_audience: 0 },
    },
    // The HR-process angles: the badge, the notice period, Slack team health,
    // the scramble after an exit.
    banners: ["t5-open-to-work", "t8-two-weeks", "t18-whiteboard", "t16-panic-hiring"],
    videos: ["v1-keep-scrolling", "v3-open-to-work", "v4-pizza-party", "v5-psychic"],
  },
  {
    name: "Founders & Owners — US 2.0",
    targeting: {
      geo_locations: { countries: ["US"] },
      age_min: 25,
      flexible_spec: [
        {
          interests: [
            { id: "6003325004380", name: "Startup company" },
            { id: "6003284619527", name: "Venture capital" },
          ],
          work_positions: [
            { id: "849873341726582", name: "Founder" },
            { id: "221853711359062", name: "CEO & Founder" },
            { id: "138050029568986", name: "Owner and Founder" },
          ],
          behaviors: [{ id: "6002714898572", name: "Small business owners" }],
        },
      ],
      targeting_automation: { advantage_audience: 0 },
    },
    // Competitor tracking is founder-only and nothing in the category runs it.
    // Price and the dare travel well to an owner who IS the HR department.
    banners: ["t1-keep-scrolling", "t9-five-dollars", "t13-competitor-radar"],
    videos: ["v2-two-weeks", "v6-my-competitors"],
  },
];

const LANDING = "https://www.teampredict.ai/";
const utm = (content) =>
  `${LANDING}?utm_source=facebook&utm_medium=cpc&utm_campaign=tp-launch-2026-08&utm_content=${content}`;

const BANNER_DIR = path.join(ROOT, "teampredict/2026-08-13-paid-launch/banners");
const VIDEO_DIR = path.join(ROOT, "teampredict/2026-08-13-paid-launch-video");

// ---------------------------------------------------------------------------
// curl wrapper
// ---------------------------------------------------------------------------
// Meta rate-limits per ad account, and a 13-ad build with video uploads hits it
// reliably (code 17 / subcode 2446079). It is a wait, not a failure, so back off
// and retry rather than dropping the run half-built.
function curl(args, attempt = 0) {
  const out = execFileSync("curl", ["-sS", ...args], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  let parsed;
  try {
    parsed = JSON.parse(out);
  } catch {
    throw new Error(`non-JSON response: ${out.slice(0, 500)}`);
  }
  if (parsed.error && (parsed.error.code === 17 || parsed.error.code === 4) && attempt < 8) {
    const wait = Math.min(300, 30 * 2 ** attempt);
    console.log(`  rate limited, waiting ${wait}s (attempt ${attempt + 1}/8)`);
    execFileSync("sleep", [String(wait)]);
    return curl(args, attempt + 1);
  }
  if (parsed.error) {
    throw new Error(
      `${parsed.error.type ?? "error"} ${parsed.error.code}/${parsed.error.error_subcode ?? "-"}: ${parsed.error.message}${parsed.error.error_user_msg ? ` | ${parsed.error.error_user_msg}` : ""}`,
    );
  }
  return parsed;
}

const get = (edge, fields, extra = []) =>
  curl([
    "-G",
    `${API}/${edge}`,
    "-d",
    `fields=${fields}`,
    "-d",
    "limit=200",
    ...extra.flatMap((e) => ["-d", e]),
    "-d",
    `access_token=${TOKEN}`,
  ]);

const post = (edge, fields) =>
  curl([
    "-X",
    "POST",
    `${API}/${edge}`,
    ...Object.entries(fields).flatMap(([k, v]) => [
      "--data-urlencode",
      `${k}=${typeof v === "string" ? v : JSON.stringify(v)}`,
    ]),
    "--data-urlencode",
    `access_token=${TOKEN}`,
  ]);

const log = (...a) => console.log(...a);
const findByName = (list, name) => (list.data ?? []).find((x) => x.name === name);

// ---------------------------------------------------------------------------
// Creative bank. Every line traces to TeamPredict-Marketing/AD-CREATIVE-PLAYBOOK.md,
// re-verified against the live homepage on 2026-08-13.
//
// Never used anywhere below: any accuracy percentage, any lead-time window other
// than the site's own "weeks", and "No credit card required" (a card IS taken at
// signup; the true line is "No charge today · Cancel anytime").
// ---------------------------------------------------------------------------
const BANNER_ADS = [
  {
    slug: "t1-keep-scrolling",
    file: "teampredict-t1-keep-scrolling-square.png",
    message:
      "Not worried about anyone on your team quitting? Keep scrolling.\n\n" +
      "Everyone else: TeamPredict reads the public LinkedIn signals your team already shares and flags resignation risk early, often weeks before someone hands in their notice.\n\n" +
      "$5 per tracked employee. 100 employees tracked free on trial.",
    headline: "Know When an Employee Is About to Leave.",
    description: "No surveys, no HRIS integration.",
  },
  {
    slug: "t5-open-to-work",
    file: "teampredict-t5-open-to-work-square.png",
    message:
      "Someone on your team turned on \"Open to Work\" this morning. Recruiters can see it. Their whole network can see it. You cannot.\n\n" +
      "TeamPredict checks every tracked profile daily: a new headline or title, an \"Open to Work\" badge, fresh skills, a profile refresh.\n\n" +
      "30-day free trial. No charge today, cancel anytime.",
    headline: "Tracked Profiles Are Checked Daily",
    description: "$5 per tracked employee",
  },
  {
    slug: "t8-two-weeks",
    file: "teampredict-t8-two-weeks-notice-square.png",
    message:
      "Two weeks is not enough time to replace a senior person.\n\n" +
      "Don't wait for the resignation letter. Spot rising resignation risk early, so you can fix the problem or plan ahead without the panic.\n\n" +
      "30-day free trial, 100 employees tracked free.",
    headline: "Get Weeks of Lead Time on Every Exit.",
    description: "Built for HR & People teams",
  },
  {
    slug: "t16-panic-hiring",
    file: "teampredict-t16-panic-hiring-square.png",
    message:
      "When a key employee leaves unexpectedly, you lose months of productivity scrambling to replace them under pressure.\n\n" +
      "TeamPredict flags rising resignation risk early, so you can groom a successor for a smooth transition, address concerns and keep your people, or find a replacement before a gap opens up. No panic hires.\n\n" +
      "$5 per tracked employee. That's the whole price.",
    headline: "Get Ahead of Resignation Chaos",
    description: "Setup only takes 5 minutes",
  },
  {
    slug: "t18-whiteboard",
    file: "teampredict-t18-whiteboard-square.png",
    message:
      "People go quiet before they resign.\n\n" +
      "Engagement decline is an early attrition signal, and it is the one remote work took away from you. TeamPredict counts each person's weekly Slack messages in the channels you select and shows the drop next to their name.\n\n" +
      "Message counts only: no message text, no DMs, no channel or time of day.",
    headline: "People Go Quiet Before They Resign.",
    description: "Counts only, never content",
  },
  {
    slug: "t9-five-dollars",
    file: "teampredict-t9-five-dollars-square.png",
    message:
      "$5 per tracked employee. That's the whole price.\n\n" +
      "See which team members are signaling an exit long before they say a word. 100 employees tracked free on trial, month-to-month with no long-term contract or lock-in.\n\n" +
      "No charge today, cancel anytime.",
    headline: "$5 per Tracked Employee.",
    description: "30-day free trial",
  },
  {
    slug: "t13-competitor-radar",
    file: "teampredict-t13-competitor-radar-square.png",
    message:
      "Point the same radar at your competitors.\n\n" +
      "TeamPredict scans for your competitors at signup and suggests them. High signals at a competitor surface as poaching opportunities, with alerts.\n\n" +
      "$5 per tracked employee. 30-day free trial.",
    headline: "Point the Same Radar at Your Competitors.",
    description: "Poaching alerts included",
  },
];

const VIDEO_ADS = [
  {
    slug: "v1-keep-scrolling",
    file: "teampredict-v1-keep-scrolling-1080p-captioned.mp4",
    message:
      "Not worried about anyone on your team quitting? Keep scrolling.\n\n" +
      "New headshot, fresh skills, suddenly \"networking a lot\": those are public LinkedIn signals, and TeamPredict flags them early, often weeks before someone hands in their notice.\n\n" +
      "30-day free trial. No charge today, cancel anytime.",
    headline: "Know When an Employee Is About to Leave.",
    description: "$5 per tracked employee",
  },
  {
    slug: "v2-two-weeks",
    file: "teampredict-v2-two-weeks-1080p-captioned.mp4",
    message:
      "By the time you are negotiating, the decision was made weeks ago.\n\n" +
      "Don't wait for the resignation letter. TeamPredict spots rising resignation risk early, so you can fix the problem or plan ahead without the panic.\n\n" +
      "30-day free trial, 100 employees tracked free.",
    headline: "Don't Wait for the Resignation Letter.",
    description: "Get weeks of lead time",
  },
  {
    slug: "v3-open-to-work",
    file: "teampredict-v3-open-to-work-1080p-trimmed-captioned.mp4",
    message:
      "Recruiters can see it. Their whole network can see it. You cannot.\n\n" +
      "TeamPredict checks every tracked profile daily for a new headline or title, an \"Open to Work\" badge, fresh skills or a profile refresh, and emails you when the risk rises.\n\n" +
      "$5 per tracked employee. 30-day free trial.",
    headline: "Tracked Profiles Are Checked Daily",
    description: "No surveys, no HRIS integration",
  },
  {
    slug: "v4-pizza-party",
    file: "teampredict-v4-pizza-party-1080p-captioned.mp4",
    message:
      "A pizza party is not a retention strategy.\n\n" +
      "When a key employee leaves unexpectedly, you lose months of productivity scrambling to replace them under pressure. TeamPredict flags rising resignation risk early, so you can address concerns and keep your people, or plan ahead without the panic.\n\n" +
      "$5 per tracked employee. That's the whole price.",
    headline: "Get Ahead of Resignation Chaos",
    description: "30-day free trial",
  },
  {
    slug: "v5-psychic",
    file: "teampredict-v5-psychic-1080p-captioned.mp4",
    message:
      "You do not need a crystal ball. The signals are already public.\n\n" +
      "TeamPredict reads the public LinkedIn signals your team already shares, plus weekly Slack message counts per person if you switch that on, and flags resignation risk early.\n\n" +
      "$5 per tracked employee. Setup only takes 5 minutes.",
    headline: "$5 per Tracked Employee.",
    description: "No surveys, no HRIS integration",
  },
  {
    slug: "v6-my-competitors",
    file: "teampredict-v6-my-competitors-1080p-captioned.mp4",
    message:
      "Everyone uses this on their own team. Point the same radar at your competitors.\n\n" +
      "TeamPredict scans for your competitors at signup and suggests them. High signals at a competitor surface as poaching opportunities, with alerts.\n\n" +
      "30-day free trial. No charge today, cancel anytime.",
    headline: "Point the Same Radar at Your Competitors.",
    description: "$5 per tracked employee",
  },
];

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
log(`TeamPredict Meta launch · ${LIVE ? "LIVE" : "DRY RUN"}`);
log(`  account   ${ACT}`);
log(`  page      ${PAGE_ID}`);
log(`  optimise  custom conversion ${CUSTOM_CONVERSION_SIGNUP} (free trial signup)`);
log(`  budget    $${(DAILY_BUDGET_CENTS / 100).toFixed(2)}/day\n`);

if (!LIVE) {
  const byBanner = Object.fromEntries(BANNER_ADS.map((b) => [b.slug, b]));
  const byVideo = Object.fromEntries(VIDEO_ADS.map((v) => [v.slug, v]));
  log("Would create:");
  log(`  campaign  ${CAMPAIGN_NAME}`);
  log(`  pause     legacy ad set ${LEGACY_ADSET_ID}`);
  for (const def of AD_SETS) {
    const prefix = def.name.startsWith("HR") ? "TP HR" : "TP FDR";
    log(`\n  ad set    ${def.name}  (advantage_audience ${def.targeting.targeting_automation.advantage_audience})`);
    for (const s of def.banners) log(`    banner  ${prefix} ${s}  <- ${byBanner[s]?.file ?? "MISSING"}`);
    for (const s of def.videos) log(`    video   ${prefix} ${s}  <- ${byVideo[s]?.file ?? "MISSING"}`);
  }
  process.exit(0);
}

// --- campaign --------------------------------------------------------------
let campaign = findByName(get(`${ACT}/campaigns`, "id,name,status"), CAMPAIGN_NAME);
if (campaign) {
  log(`campaign exists  ${campaign.id}`);
} else {
  campaign = post(`${ACT}/campaigns`, {
    name: CAMPAIGN_NAME,
    objective: "OUTCOME_LEADS",
    status: "PAUSED",
    special_ad_categories: [],
    daily_budget: String(DAILY_BUDGET_CENTS),
    bid_strategy: "LOWEST_COST_WITHOUT_CAP",
  });
  log(`campaign created ${campaign.id}`);
}

// --- retire the mixed v1.0 ad set ------------------------------------------
// Paused rather than deleted: its 13 ads carry the same creative and stay
// available for comparison. Its conversion settings are immutable anyway, so it
// could never have been re-targeted in place.
try {
  const legacy = get(LEGACY_ADSET_ID, "id,name,status");
  if (legacy.status !== "PAUSED") {
    post(LEGACY_ADSET_ID, { status: "PAUSED" });
    log(`legacy ad set ${LEGACY_ADSET_ID} paused (${legacy.name})`);
  } else {
    log(`legacy ad set ${LEGACY_ADSET_ID} already paused`);
  }
} catch (e) {
  log(`legacy ad set: ${e.message.slice(0, 120)}`);
}

// --- creative caches -------------------------------------------------------
// One upload per asset, shared across both ad sets. Meta dedupes identical image
// bytes by hash anyway, but a video re-upload is tens of megabytes, and both ad
// sets can legitimately want the same clip.
const bannerBySlug = Object.fromEntries(BANNER_ADS.map((b) => [b.slug, b]));
const videoBySlug = Object.fromEntries(VIDEO_ADS.map((v) => [v.slug, v]));
const imageHashes = new Map();
const videoIds = new Map();

function uploadImage(file) {
  if (imageHashes.has(file)) return imageHashes.get(file);
  const up = curl(["-X", "POST", `${API}/${ACT}/adimages`, "-F", `filename=@${file}`, "-F", `access_token=${TOKEN}`]);
  const hash = Object.values(up.images)[0].hash;
  imageHashes.set(file, hash);
  return hash;
}

function uploadVideo(file, label) {
  if (videoIds.has(file)) return videoIds.get(file);
  const up = curl(["-X", "POST", `${API}/${ACT}/advideos`, "-F", `source=@${file}`, "-F", `title=${label}`, "-F", `access_token=${TOKEN}`]);
  // Meta generates thumbnails asynchronously, so poll rather than assume.
  let thumb = null;
  for (let i = 0; i < 40 && !thumb; i++) {
    execFileSync("sleep", ["4"]);
    try {
      const t = get(`${up.id}`, "thumbnails{uri,is_preferred},status");
      const list = t.thumbnails?.data ?? [];
      thumb = (list.find((x) => x.is_preferred) ?? list[0])?.uri ?? null;
    } catch {
      /* still processing */
    }
  }
  if (!thumb) throw new Error("no thumbnail after ~2.5 min of processing");
  const rec = { id: up.id, thumb };
  videoIds.set(file, rec);
  return rec;
}

// --- build both ad sets ----------------------------------------------------
const made = [];
const skipped = [];
const failed = [];
const builtAdSets = [];

for (const def of AD_SETS) {
  let adset = findByName(get(`${campaign.id}/adsets`, "id,name,status,optimization_goal"), def.name);
  if (adset) {
    log(`\nad set exists    ${adset.id}  ${def.name}`);
  } else {
    adset = post(`${ACT}/adsets`, {
      name: def.name,
      campaign_id: campaign.id,
      status: "PAUSED",
      billing_event: "IMPRESSIONS",
      optimization_goal: "OFFSITE_CONVERSIONS",
      destination_type: "WEBSITE",
      // A custom conversion carries its own pixel; sending pixel_id alongside it
      // is rejected with "invalid combination of parameters" (100/1885014).
      promoted_object: { custom_conversion_id: CUSTOM_CONVERSION_SIGNUP },
      targeting: def.targeting,
    });
    log(`\nad set created   ${adset.id}  ${def.name}`);
  }
  builtAdSets.push({ id: adset.id, name: def.name });

  const existingAds = get(`${adset.id}/ads`, "id,name,status");
  // Ad names are prefixed per audience so the two sets never collide by name,
  // and so a glance at reporting says which buyer a row belongs to.
  const prefix = def.name.startsWith("HR") ? "TP HR" : "TP FDR";

  const specs = [
    ...(VIDEOS_ONLY ? [] : def.banners.map((s) => ({ kind: "image", spec: bannerBySlug[s], slug: s }))),
    ...(SKIP_VIDEOS ? [] : def.videos.map((s) => ({ kind: "video", spec: videoBySlug[s], slug: s }))),
  ];

  for (const { kind, spec, slug } of specs) {
    const adName = `${prefix} ${slug}`;
    if (!spec) {
      failed.push(`${adName}: no creative defined for slug "${slug}"`);
      continue;
    }
    const already = findByName(existingAds, adName);
    if (already) {
      skipped.push(`${adName} (${already.id})`);
      log(`  = ${adName}`);
      continue;
    }
    const dir = kind === "image" ? BANNER_DIR : VIDEO_DIR;
    const file = path.join(dir, spec.file);
    if (!existsSync(file)) {
      failed.push(`${adName}: missing ${spec.file}`);
      console.error(`  ! ${adName}: missing ${spec.file}`);
      continue;
    }
    try {
      let creative;
      if (kind === "image") {
        creative = post(`${ACT}/adcreatives`, {
          name: `${adName} creative`,
          object_story_spec: {
            page_id: PAGE_ID,
            link_data: {
              image_hash: uploadImage(file),
              link: utm(slug),
              message: spec.message,
              name: spec.headline,
              description: spec.description,
              call_to_action: { type: "SIGN_UP", value: { link: utm(slug) } },
            },
          },
          degrees_of_freedom_spec: {
            creative_features_spec: {
              text_optimizations: { enroll_status: "OPT_OUT" },
              image_touchups: { enroll_status: "OPT_OUT" },
            },
          },
        });
      } else {
        const v = uploadVideo(file, adName);
        creative = post(`${ACT}/adcreatives`, {
          name: `${adName} creative`,
          object_story_spec: {
            page_id: PAGE_ID,
            video_data: {
              video_id: v.id,
              image_url: v.thumb,
              message: spec.message,
              title: spec.headline,
              link_description: spec.description,
              call_to_action: { type: "SIGN_UP", value: { link: utm(slug) } },
            },
          },
          authorization_category: "NONE",
          degrees_of_freedom_spec: {
            creative_features_spec: { text_optimizations: { enroll_status: "OPT_OUT" } },
          },
        });
      }
      const ad = post(`${ACT}/ads`, {
        name: adName,
        adset_id: adset.id,
        creative: { creative_id: creative.id },
        status: "PAUSED",
      });
      made.push(`${adName}  ad ${ad.id}`);
      log(`  + ${adName}  ad ${ad.id}`);
    } catch (e) {
      failed.push(`${adName}: ${e.message}`);
      console.error(`  ! ${adName}: ${e.message.slice(0, 200)}`);
    }
  }
}

log("\n--- result ---");
log(`campaign ${campaign.id}`);
for (const a of builtAdSets) log(`  ad set ${a.id}  ${a.name}`);
log(`created ${made.length} · already there ${skipped.length} · failed ${failed.length}`);
for (const f of failed) log(`  ! ${f}`);
