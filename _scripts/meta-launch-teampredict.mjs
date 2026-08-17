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
const ADSET_NAME = "HR & People + Founders — US Broad-ish 1.0";

const LANDING = "https://www.teampredict.ai/";
const utm = (content) =>
  `${LANDING}?utm_source=facebook&utm_medium=cpc&utm_campaign=tp-launch-2026-08&utm_content=${content}`;

const BANNER_DIR = path.join(ROOT, "teampredict/2026-08-13-paid-launch/banners");
const VIDEO_DIR = path.join(ROOT, "teampredict/2026-08-13-paid-launch-video");

// ---------------------------------------------------------------------------
// curl wrapper
// ---------------------------------------------------------------------------
function curl(args) {
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
    file: "teampredict-v1-keep-scrolling-1080p.mp4",
    fallback: "teampredict-v1-keep-scrolling-720p.mp4",
    message:
      "Not worried about anyone on your team quitting? Keep scrolling.\n\n" +
      "New headshot, fresh skills, suddenly \"networking a lot\": those are public LinkedIn signals, and TeamPredict flags them early, often weeks before someone hands in their notice.\n\n" +
      "30-day free trial. No charge today, cancel anytime.",
    headline: "Know When an Employee Is About to Leave.",
    description: "$5 per tracked employee",
  },
  {
    slug: "v2-two-weeks",
    file: "teampredict-v2-two-weeks-1080p.mp4",
    fallback: "teampredict-v2-two-weeks-720p.mp4",
    message:
      "By the time you are negotiating, the decision was made weeks ago.\n\n" +
      "Don't wait for the resignation letter. TeamPredict spots rising resignation risk early, so you can fix the problem or plan ahead without the panic.\n\n" +
      "30-day free trial, 100 employees tracked free.",
    headline: "Don't Wait for the Resignation Letter.",
    description: "Get weeks of lead time",
  },
  {
    slug: "v3-open-to-work",
    file: "teampredict-v3-open-to-work-1080p.mp4",
    fallback: "teampredict-v3-open-to-work-720p.mp4",
    message:
      "Recruiters can see it. Their whole network can see it. You cannot.\n\n" +
      "TeamPredict checks every tracked profile daily for a new headline or title, an \"Open to Work\" badge, fresh skills or a profile refresh, and emails you when the risk rises.\n\n" +
      "$5 per tracked employee. 30-day free trial.",
    headline: "Tracked Profiles Are Checked Daily",
    description: "No surveys, no HRIS integration",
  },
  {
    slug: "v4-pizza-party",
    file: "teampredict-v4-pizza-party-1080p.mp4",
    fallback: "teampredict-v4-pizza-party-720p.mp4",
    message:
      "A pizza party is not a retention strategy.\n\n" +
      "When a key employee leaves unexpectedly, you lose months of productivity scrambling to replace them under pressure. TeamPredict flags rising resignation risk early, so you can address concerns and keep your people, or plan ahead without the panic.\n\n" +
      "$5 per tracked employee. That's the whole price.",
    headline: "Get Ahead of Resignation Chaos",
    description: "30-day free trial",
  },
  {
    slug: "v5-psychic",
    file: "teampredict-v5-psychic-1080p.mp4",
    fallback: "teampredict-v5-psychic-720p.mp4",
    message:
      "You do not need a crystal ball. The signals are already public.\n\n" +
      "TeamPredict reads the public LinkedIn signals your team already shares, plus weekly Slack message counts per person if you switch that on, and flags resignation risk early.\n\n" +
      "$5 per tracked employee. Setup only takes 5 minutes.",
    headline: "$5 per Tracked Employee.",
    description: "No surveys, no HRIS integration",
  },
  {
    slug: "v6-my-competitors",
    file: "teampredict-v6-my-competitors-1080p.mp4",
    fallback: "teampredict-v6-my-competitors-720p.mp4",
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
  log("Would create:");
  log(`  campaign  ${CAMPAIGN_NAME}`);
  log(`  ad set    ${ADSET_NAME}`);
  for (const a of BANNER_ADS) log(`  banner ad TP ${a.slug}  <- ${a.file}`);
  for (const a of VIDEO_ADS) log(`  video ad  TP ${a.slug}  <- ${a.file}`);
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

// --- ad set ----------------------------------------------------------------
// Conversion settings on a published ad set are immutable, even paused, so this
// payload has to be right the first time or the ad set has to be recreated.
let adset = findByName(
  get(`${campaign.id}/adsets`, "id,name,status,optimization_goal,promoted_object"),
  ADSET_NAME,
);
if (adset) {
  log(`ad set exists    ${adset.id}  (goal ${adset.optimization_goal})`);
} else {
  adset = post(`${ACT}/adsets`, {
    name: ADSET_NAME,
    campaign_id: campaign.id,
    status: "PAUSED",
    billing_event: "IMPRESSIONS",
    optimization_goal: "OFFSITE_CONVERSIONS",
    destination_type: "WEBSITE",
    // A custom conversion carries its own pixel, and sending pixel_id
    // alongside it is rejected outright with "invalid combination of
    // parameters" (code 100 / subcode 1885014). Custom conversion id ALONE.
    promoted_object: { custom_conversion_id: CUSTOM_CONVERSION_SIGNUP },
    targeting: {
      geo_locations: { countries: ["US"] },
      // No age_max: with Advantage Audience on, Meta treats age and interests
      // as suggestions and rejects an upper cap outright (100/1870189).
      age_min: 25,
      // Employers, not candidates. "Recruitment" (58M) was deliberately left
      // out: it is mostly job seekers, which is the wrong side of this market.
      flexible_spec: [
        {
          interests: [
            { id: "6003069499982", name: "Human resource management" },
            { id: "6003485146398", name: "Employee engagement" },
            { id: "6003508907986", name: "Professional in Human Resources" },
          ],
        },
      ],
      targeting_automation: { advantage_audience: 1 },
    },
  });
  log(`ad set created   ${adset.id}`);
}

// --- creatives and ads -----------------------------------------------------
const existingAds = get(`${adset.id}/ads`, "id,name,status");
const made = [];
const skipped = [];
const failed = [];

function ensureAd(spec, buildCreative) {
  const adName = `TP ${spec.slug}`;
  const already = findByName(existingAds, adName);
  if (already) {
    skipped.push(`${adName} (${already.id})`);
    return;
  }
  try {
    const creative = buildCreative(adName);
    const ad = post(`${ACT}/ads`, {
      name: adName,
      adset_id: adset.id,
      creative: { creative_id: creative.id },
      status: "PAUSED",
    });
    made.push(`${adName}  ad ${ad.id}  creative ${creative.id}`);
    log(`  + ${adName}  ad ${ad.id}`);
  } catch (e) {
    failed.push(`${adName}: ${e.message}`);
    console.error(`  ! ${adName}: ${e.message}`);
  }
}

// Banners
if (!VIDEOS_ONLY) {
  for (const spec of BANNER_ADS) {
    const file = path.join(BANNER_DIR, spec.file);
    if (!existsSync(file)) {
      failed.push(`TP ${spec.slug}: missing ${spec.file}`);
      continue;
    }
    ensureAd(spec, (adName) => {
      const up = curl([
        "-X",
        "POST",
        `${API}/${ACT}/adimages`,
        "-F",
        `filename=@${file}`,
        "-F",
        `access_token=${TOKEN}`,
      ]);
      const hash = Object.values(up.images)[0].hash;
      return post(`${ACT}/adcreatives`, {
        name: `${adName} creative`,
        object_story_spec: {
          page_id: PAGE_ID,
          link_data: {
            image_hash: hash,
            link: utm(spec.slug),
            message: spec.message,
            name: spec.headline,
            description: spec.description,
            call_to_action: { type: "SIGN_UP", value: { link: utm(spec.slug) } },
          },
        },
        // `standard_enhancements` is deprecated (100/3858504); features are set
        // individually now. text_optimizations is the one that matters here: it
        // lets Meta rewrite and reposition the copy, and every line in this
        // account has to trace to the approved bank, so it is opted out.
        degrees_of_freedom_spec: {
          creative_features_spec: {
            text_optimizations: { enroll_status: "OPT_OUT" },
            image_touchups: { enroll_status: "OPT_OUT" },
          },
        },
      });
    });
  }
}

// Videos. Uploading by file rather than URL: the mp4s are deliberately not
// committed (binaries stay out of the repo), so there is no raw link to hand
// Meta the way the banners have.
for (const spec of SKIP_VIDEOS ? [] : VIDEO_ADS) {
  let file = path.join(VIDEO_DIR, spec.file);
  if (!existsSync(file)) file = path.join(VIDEO_DIR, spec.fallback);
  if (!existsSync(file)) {
    failed.push(`TP ${spec.slug}: no video on disk yet`);
    continue;
  }
  ensureAd(spec, (adName) => {
    const up = curl([
      "-X",
      "POST",
      `${API}/${ACT}/advideos`,
      "-F",
      `source=@${file}`,
      "-F",
      `title=${adName}`,
      "-F",
      `access_token=${TOKEN}`,
    ]);
    // Meta needs a thumbnail; it generates them asynchronously, so poll briefly.
    let thumb = null;
    for (let i = 0; i < 30 && !thumb; i++) {
      execFileSync("sleep", ["4"]);
      try {
        const t = get(`${up.id}`, "thumbnails{uri,is_preferred},status");
        const list = t.thumbnails?.data ?? [];
        thumb = (list.find((x) => x.is_preferred) ?? list[0])?.uri ?? null;
      } catch {
        /* video still processing */
      }
    }
    if (!thumb) throw new Error("no thumbnail after ~2 min of processing");
    return post(`${ACT}/adcreatives`, {
      name: `${adName} creative`,
      object_story_spec: {
        page_id: PAGE_ID,
        video_data: {
          video_id: up.id,
          image_url: thumb,
          message: spec.message,
          title: spec.headline,
          link_description: spec.description,
          call_to_action: {
            type: "SIGN_UP",
            value: { link: utm(spec.slug) },
          },
        },
      },
      // Every clip is fully AI-generated video with realistic people. This is
      // the same declaration set on every generated creative since batch 3.
      authorization_category: "NONE",
      degrees_of_freedom_spec: {
        creative_features_spec: { text_optimizations: { enroll_status: "OPT_OUT" } },
      },
    });
  });
}

log("\n--- result ---");
log(`campaign ${campaign.id} · ad set ${adset.id}`);
log(`created ${made.length} · already there ${skipped.length} · failed ${failed.length}`);
for (const s of skipped) log(`  = ${s}`);
for (const f of failed) log(`  ! ${f}`);
