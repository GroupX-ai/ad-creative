#!/usr/bin/env node
/**
 * Put the twelve batch-13 videos into the 1Lookup Meta account, PAUSED.
 *
 *   node _scripts/meta-video-ads-b13-1lookup.mjs           # dry run, prints the plan
 *   node _scripts/meta-video-ads-b13-1lookup.mjs --live    # uploads and builds
 *
 * WHY THIS IS A SEPARATE SCRIPT FROM THE BANNER REBUILD. A video ad is not a link ad with a
 * different file: it needs `advideos` rather than `adimages`, Meta processes the upload
 * asynchronously and refuses a creative until a thumbnail exists, and the creative uses
 * `video_data` instead of `link_data`. Bolting that onto meta-rebuild-1lookup-b13.mjs would
 * have meant one script that half-works for both.
 *
 * WHERE THE VIDEOS GO. Into the campaigns the rebuild already created, one video ad set per
 * campaign, so the campaign budgets do not move: this adds creative, not money. Campaign
 * budget optimisation then decides between the banner ad set and the video ad set, which is
 * the first honest banner-versus-video read this account has ever had.
 *
 *   Platform  ->  v12 platform, v11 MCP, v01 SERP, v08 property, v09 audio, v10 ad library
 *   Validate  ->  v06 IP lookup, v07 HLR
 *   Enrich    ->  v02 reverse IP append, v03 prospect search, v04 B2B append, v05 job change
 *
 * The six in Platform are the long tail of the catalogue, and a long tail IS the platform
 * pitch: no single one of those products carries a campaign, but "41 products on one key"
 * is exactly the sentence they all support.
 *
 * THE FILES ARE THE CAPTIONED, END-CARDED CUTS, never the raw upscale. Every deliverable is
 * `<id>-1080p-endcard-captioned.mp4`: one-word burned captions with the punchline words
 * enlarged in brand cyan, then the 2.2s brand card. No clip in this batch speaks the brand
 * name on purpose, so an ad built from the raw file would never name 1Lookup at all.
 *
 * COPY. Every headline and every body line traces to that product's own page or to the
 * approved bank in 1Lookup-Marketing/AD-CREATIVE-PLAYBOOK.md. No accuracy percentage
 * appears anywhere: the site deliberately makes no accuracy claim, and neither do these.
 */

import { createHmac } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const API = "https://graph.facebook.com/v25.0";
const ACCOUNT = "act_2333276243857483";
const PAGE_ID = "738050449402637";
const BATCH = "2026-08-19-b13-product-videos";

const argv = process.argv.slice(2);
const LIVE = argv.includes("--live");

const TOKEN = process.env.META_SYSTEM_USER_TOKEN;
const SECRET = process.env.META_APP_SECRET;
if (!TOKEN || !SECRET) throw new Error("META_SYSTEM_USER_TOKEN and META_APP_SECRET must be set");
const PROOF = createHmac("sha256", SECRET).update(TOKEN).digest("hex");

const log = (...a) => console.log(...a);
const sleep = (s) => execFileSync("sleep", [String(s)]);

function api(method, edge, body) {
  const url = `${API}/${edge}`;
  if (!LIVE && method === "POST") {
    log(`  DRY  POST ${edge}`);
    for (const [k, v] of Object.entries(body || {})) log(`         ${k}: ${String(v).slice(0, 160)}`);
    return { id: `dry_${Math.random().toString(36).slice(2, 8)}` };
  }
  const form = { ...(body || {}), access_token: TOKEN, appsecret_proof: PROOF };
  let args;
  if (method === "GET") {
    args = ["-s", "--max-time", "180", `${url}?${new URLSearchParams(form)}`];
  } else {
    args = ["-s", "--max-time", "300", "-X", method, url];
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

// Same find-or-create discipline as the banner rebuild: a re-run after a rate limit resumes,
// it does not build a second copy of everything.
const nameCache = new Map();
function existing(edge, key) {
  if (!nameCache.has(key)) {
    const rows = [];
    let after = null;
    do {
      const page = api("GET", edge, { fields: "id,name", limit: 200, ...(after ? { after } : {}) });
      rows.push(...(page.data ?? []));
      after = page.paging?.cursors?.after && page.data?.length ? page.paging.cursors.after : null;
    } while (after);
    nameCache.set(key, rows);
  }
  return nameCache.get(key);
}
function findByName(edge, key, name) {
  return existing(edge, key).find((r) => r.name === name) ?? null;
}

// ---------------------------------------------------------------- the plan
const CAMPAIGN_OF = {
  platform: "1L | META | COLD | Platform | Trials",
  validate: "1L | META | COLD | Validate | Trials",
  enrich: "1L | META | COLD | Enrich | Trials",
};
const ADSET_OF = {
  platform: "1L | platform | US Broad Video | Auto",
  validate: "1L | validate | US Broad Video | Auto",
  enrich: "1L | enrich | US Broad Video | Auto",
};

const VIDEOS = [
  {
    id: "b13v12", family: "platform", product: "platform",
    file: "1lookup-platform-b13v12-renewal-wall-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/",
    title: "41 Data Products, One API Key",
    message: "Eleven data vendors, eleven logins, eleven balances, eleven different renewal dates. 41 data products on one API key and one shared credit balance. 7-day free trial, nothing charged today.",
  },
  {
    id: "b13v11", family: "platform", product: "mcp",
    file: "1lookup-mcp-b13v11-ask-the-agent-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/mcp",
    title: "No API Key To Paste",
    message: "Add one URL to Claude or Cursor and the agent has the data. No API key to paste. Same credits as the API. 7-day free trial, cancel anytime.",
  },
  {
    id: "b13v01", family: "platform", product: "search-intent-lookup",
    file: "1lookup-search-intent-lookup-b13v01-read-google-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/search-intent-lookup",
    title: "One Credit A Search",
    message: "Reading a public search page should not cost a monthly subscription. 1 credit per lookup. 7-day free trial, cancel anytime.",
  },
  {
    id: "b13v08", family: "platform", product: "property-lookup",
    file: "1lookup-property-lookup-b13v08-drive-by-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/property-lookup",
    title: "Beds, Baths, Last Sale",
    message: "Forty minutes across town to count bedrooms. Beds, baths, square footage, year built, listing status and last sale, from an address. 7-day free trial.",
  },
  {
    id: "b13v09", family: "platform", product: "bulk-audio-transcription",
    file: "1lookup-bulk-audio-transcription-b13v09-nine-hours-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/bulk-audio-transcription",
    title: "Nine Hours Of Calls, Searchable",
    message: "Speaker labels, word-level timestamps and 95+ languages, so the useful minute in hour seven is a search and not an evening. 7-day free trial.",
  },
  {
    id: "b13v10", family: "platform", product: "ad-library-lookup",
    file: "1lookup-ad-library-lookup-b13v10-what-are-they-running-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/ad-library-lookup",
    title: "What Are They Running",
    message: "Meta, TikTok, LinkedIn and Google ad libraries with one API call. Answer the question without going to look. 7-day free trial, cancel anytime.",
  },
  {
    id: "b13v06", family: "validate", product: "ip-lookup",
    file: "1lookup-ip-lookup-b13v06-shipped-to-a-basement-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/ip-lookup",
    title: "Proxy And VPN Detection",
    message: "Nine chargebacks, nine names, one building. Proxy and VPN detection plus geolocation on any IP address. 7-day free trial, cancel anytime.",
  },
  {
    id: "b13v07", family: "validate", product: "hlr-lookup",
    file: "1lookup-hlr-lookup-b13v07-code-went-nowhere-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/hlr-lookup",
    title: "Live Subscriber Status",
    message: "A beautifully formatted number is not a working number. Reachability and live subscriber status before you send. 7-day free trial, cancel anytime.",
  },
  {
    id: "b13v02", family: "enrich", product: "reverse-ip-append",
    file: "1lookup-reverse-ip-append-b13v02-ninety-seven-ghosts-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/reverse-ip-append",
    title: "Turn The IP Into A Contact",
    message: "Ninety-seven visitors yesterday and not one name. Append contact and geolocation data from an IP address. 7-day free trial, cancel anytime.",
  },
  {
    id: "b13v03", family: "enrich", product: "prospect-search",
    file: "1lookup-prospect-search-b13v03-per-seat-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/prospect-search",
    title: "Two Credits A Search",
    message: "Stop buying seats so people can take turns searching one list. 2 credits per search, and only the contacts you want. 7-day free trial.",
  },
  {
    id: "b13v04", family: "enrich", product: "b2b-contact-append",
    file: "1lookup-b2b-contact-append-b13v04-four-guesses-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/b2b-contact-append",
    title: "Stop Guessing Work Emails",
    message: "Four permutations, four bounces. A verified work email, title and seniority, and you are only charged on a match. 7-day free trial.",
  },
  {
    id: "b13v05", family: "enrich", product: "job-change-monitoring",
    file: "1lookup-job-change-monitoring-b13v05-left-in-march-1080p-endcard-captioned.mp4",
    destination: "https://www.1lookup.io/products/job-change-monitoring",
    title: "He Left In March",
    message: "Pitching a champion who changed jobs is a wasted quarter. Get an event when someone changes company or title. 7-day free trial, cancel anytime.",
  },
];

// The account's own guardrail, enforced rather than remembered: 1Lookup never states an
// accuracy figure, and no ad may carry a percentage the site does not carry.
const BANNED = [/\b\d{2,3}(\.\d+)?%\s*(accurate|accuracy|deliverab)/i, /\bhigh(ly)? accurate\b/i, /\baccuracy\b/i];
for (const v of VIDEOS) {
  for (const re of BANNED) {
    if (re.test(v.title) || re.test(v.message)) throw new Error(`banned claim in ${v.id}: ${re}`);
  }
  if (v.title.length > 40) throw new Error(`${v.id} headline is ${v.title.length} chars, Meta truncates over 40`);
}

const utms = (campaignName, id, product) =>
  `utm_source=facebook&utm_medium=cpc&utm_campaign=${encodeURIComponent(campaignName.toLowerCase().replace(/[\s|]+/g, "-"))}` +
  `&utm_content=${id}-video&utm_term=${product}`;

function targetingSpec() {
  return JSON.stringify({
    geo_locations: { countries: ["US"] },
    age_min: 25,
    age_max: 65,
    publisher_platforms: ["facebook", "instagram"],
    facebook_positions: ["feed", "story", "instream_video", "facebook_reels"],
    instagram_positions: ["stream", "story", "reels", "explore"],
    device_platforms: ["mobile", "desktop"],
    targeting_automation: { advantage_audience: 1 },
  });
}

// ---------------------------------------------------------------- video upload
function uploadVideo(file, title) {
  const abs = path.join(ROOT, "1lookup", BATCH, file);
  if (!existsSync(abs)) throw new Error(`missing video: ${abs}`);
  if (!LIVE) return { id: `dry_vid_${file.slice(0, 12)}`, thumb: "https://example.invalid/dry.jpg" };
  const raw = execFileSync("curl", [
    "-s", "--max-time", "900", "-X", "POST", `${API}/${ACCOUNT}/advideos`,
    "-F", `source=@${abs}`, "-F", `title=${title}`,
    "-F", `access_token=${TOKEN}`, "-F", `appsecret_proof=${PROOF}`,
  ], { encoding: "utf8", maxBuffer: 1 << 26 });
  const j = JSON.parse(raw);
  if (j.error) throw new Error(`advideos ${file}: ${j.error.message}`);
  // Meta encodes and thumbnails asynchronously and rejects a creative built against a video
  // that is not ready yet, so this polls rather than assuming.
  let thumb = null;
  for (let i = 0; i < 60 && !thumb; i++) {
    sleep(5);
    try {
      const t = api("GET", j.id, { fields: "thumbnails{uri,is_preferred},status" });
      const list = t.thumbnails?.data ?? [];
      thumb = (list.find((x) => x.is_preferred) ?? list[0])?.uri ?? null;
    } catch { /* still processing */ }
  }
  if (!thumb) throw new Error(`${file}: no thumbnail after 5 minutes of processing`);
  log(`  uploaded ${file.slice(0, 46)}... -> ${j.id}`);
  return { id: j.id, thumb };
}

// ---------------------------------------------------------------- build
const created = { adSets: [], ads: [] };
const families = [...new Set(VIDEOS.map((v) => v.family))];

for (const family of families) {
  const campaignName = CAMPAIGN_OF[family];
  const campaign = findByName(`${ACCOUNT}/campaigns`, "campaigns", campaignName);
  if (!campaign) throw new Error(`campaign not found: ${campaignName}. Run meta-rebuild-1lookup-b13.mjs --live first.`);

  const adSetName = ADSET_OF[family];
  let adSet = findByName(`${ACCOUNT}/adsets`, "adsets", adSetName);
  if (adSet) {
    log(`\n=== ${adSetName}  reuse ${adSet.id}`);
  } else {
    log(`\n=== ${adSetName}  in ${campaignName}`);
    adSet = api("POST", `${ACCOUNT}/adsets`, {
      name: adSetName,
      campaign_id: campaign.id,
      status: "PAUSED",
      billing_event: "IMPRESSIONS",
      // Same reasoning as the banner rebuild: Stripe books about 0.6 card-saved trials a day
      // across every source, and Meta wants ~50 a week per ad set to leave learning. An ad
      // set optimising on that event never leaves learning and pays a $65-77 CPM for the
      // privilege, which is exactly what the two campaigns this replaces were doing.
      optimization_goal: "LANDING_PAGE_VIEWS",
      targeting: targetingSpec(),
    });
    log(`  ad set ${adSet.id}`);
  }
  created.adSets.push({ id: adSet.id, name: adSetName, campaign: campaignName });

  for (const v of VIDEOS.filter((x) => x.family === family)) {
    const adNameStr = `1L | ${v.product} | ${v.id} video | 9x16`;
    const link = `${v.destination}?${utms(campaignName, v.id, v.product)}`;
    const already = findByName(`${ACCOUNT}/ads`, "ads", adNameStr);
    if (already) { log(`  reuse ad ${already.id}  ${adNameStr}`); created.ads.push({ id: already.id, name: adNameStr, reused: true }); continue; }

    const video = uploadVideo(v.file, v.title);
    const creative = api("POST", `${ACCOUNT}/adcreatives`, {
      name: adNameStr,
      object_story_spec: JSON.stringify({
        page_id: PAGE_ID,
        video_data: {
          video_id: video.id,
          image_url: video.thumb,
          message: v.message,
          title: v.title,
          // SIGN_UP, never LEARN_MORE: 53 of the account's 60 historical creatives said Learn
          // More on a sales objective, which pre-selects browsers over buyers.
          call_to_action: { type: "SIGN_UP", value: { link } },
        },
      }),
      url_tags: utms(campaignName, v.id, v.product),
      // Only the four keys Graph v25.0 accepts. IG_VIDEO_NATIVE_SUBTITLE matters most here:
      // every clip already carries burned one-word captions, and Meta's own subtitle track
      // would render a second set of words on top of them.
      degrees_of_freedom_spec: JSON.stringify({
        creative_features_spec: {
          IG_VIDEO_NATIVE_SUBTITLE: { enroll_status: "OPT_OUT" },
          IMAGE_ANIMATION: { enroll_status: "OPT_OUT" },
          TEXT_OVERLAY_TRANSLATION: { enroll_status: "OPT_OUT" },
          PROFILE_CARD: { enroll_status: "OPT_OUT" },
        },
      }),
    });

    const ad = api("POST", `${ACCOUNT}/ads`, {
      name: adNameStr,
      adset_id: adSet.id,
      creative: JSON.stringify({ creative_id: creative.id }),
      status: "ACTIVE", // active inside a paused ad set, so one flip launches
    });
    created.ads.push({ id: ad.id, name: adNameStr, file: v.file, link });
    log(`  ad ${ad.id}  ${adNameStr}`);
  }
}

log(`\n${LIVE ? "CREATED" : "DRY RUN"}: ${created.adSets.length} video ad sets, ${created.ads.length} video ads.`);
log("Campaign budgets unchanged: this adds creative, not money.");
