#!/usr/bin/env node
/**
 * Launch the BitPredict Reddit campaign: ad group, posts, ads.
 *
 *   node _scripts/reddit-launch-bitpredict.mjs            # dry run, prints the plan
 *   node _scripts/reddit-launch-bitpredict.mjs --live     # creates, PAUSED
 *   node _scripts/reddit-launch-bitpredict.mjs --live --activate
 *
 * IDEMPOTENT BY NAME, and that is not a nicety: the Reddit v3 API has no DELETE
 * for campaigns, ad groups or ads. A mistaken create can only be paused and
 * renamed, so every step looks up an existing entity by name and reuses it
 * rather than creating a second one. Re-running after a partial failure is
 * safe and is the intended recovery path.
 *
 * Every write goes through `curl`. Node's built-in fetch ignores HTTPS_PROXY in
 * this environment, opens a direct socket and gets a 403 from the egress policy
 * whose body reads "Blocked by egress policy" — which looks exactly like a
 * Reddit permission error and is not one.
 *
 * Media is pulled by Reddit from public raw.githubusercontent.com URLs on the
 * branch. `POST /profiles/{id}/posts` rejects external media outright; the
 * structured-post JOB endpoint is the only path that works, and it rehosts the
 * file on Reddit's CDN before returning a post id.
 */

import { execFileSync } from "node:child_process";

const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";
const ACCOUNT = "a2_jdio3ztnjrcd";
const PROFILE = "t2_2ixylt9bey"; // TryBitPredict
const CAMPAIGN = "2557856106149115257";
const PIXEL = ACCOUNT; // Reddit self-serve: pixel id === ad account id
const AD_GROUP_NAME = "BP | US | Broad | SignUp v1";
const DAILY_MICROS = 10_000_000; // $10.00/day
const LANDING = "https://www.bitpredict.io/";

// Pinned to `main`, not to the feature branch. Reddit fetches these URLs itself
// at post-creation time, which can be days after the code is written, and a
// merged branch gets deleted: a branch URL is a launch that breaks silently
// later. Anything referenced here must be on main before the script is run.
const RAW = "https://raw.githubusercontent.com/GroupX-ai/ad-creative/main";
const B2 = `${RAW}/bitpredict/2026-08-13-reddit-b2`;
const V7 = `${RAW}/bitpredict/2026-08-13-reddit-video-b7`;

const LIVE = process.argv.includes("--live");
const ACTIVATE = process.argv.includes("--activate");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let TOKEN = "";
function mintToken() {
  const out = execFileSync("curl", [
    "-s", "-X", "POST", "https://www.reddit.com/api/v1/access_token",
    "-A", UA,
    "-u", `${process.env.REDDIT_ADS_APP_ID}:${process.env.REDDIT_ADS_APP_SECRET}`,
    "-d", `grant_type=refresh_token&refresh_token=${process.env.REDDIT_ADS_REFRESH_TOKEN}`,
  ], { encoding: "utf8", maxBuffer: 1 << 24 });
  const t = JSON.parse(out).access_token;
  if (!t) throw new Error(`token mint failed: ${out.slice(0, 300)}`);
  TOKEN = t;
}

function api(method, path, body) {
  const args = [
    "-s", "--max-time", "180", "-X", method, `${API}${path}`,
    "-H", `Authorization: Bearer ${TOKEN}`, "-A", UA,
  ];
  if (body !== undefined) {
    args.push("-H", "Content-Type: application/json", "--data-binary", JSON.stringify({ data: body }));
  }
  const raw = execFileSync("curl", args, { encoding: "utf8", maxBuffer: 1 << 26 });
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`${method} ${path}: non-JSON response ${raw.slice(0, 300)}`);
  }
  if (parsed.error) {
    const fields = (parsed.error.fields ?? []).map((f) => `${f.field}: ${f.message}`).join("; ");
    throw new Error(`${method} ${path} -> ${parsed.error.code} ${parsed.error.message}${fields ? ` [${fields}]` : ""}`);
  }
  return parsed.data;
}

// ---------------------------------------------------------------- creatives --
// headline is what a redditor reads in the feed above the media. It is NOT the
// banner's own headline: repeating burned-in text wastes the only line of copy
// the post gets. Every line here traces to live bitpredict.io copy, and carries
// no money, prize, payout or accuracy claim.
const BANNERS = [
  ["b1", "prove-it", "You say you called it. Prove it, with a time-stamped public receipt."],
  ["b2", "be-wrong-lose-nothing", "Call BTC, ETH or SOL up or down. Nothing to deposit, stake or wager."],
  ["b3", "whats-your-rank", "A public leaderboard ranked on how accurately you call price moves."],
  ["b4", "right-once", "Anyone can be right once. Build a public track record instead."],
  ["b5", "up-or-down-24-hours", "Up or down over 24 hours. No trading, no deposits, no money at stake."],
  ["b6", "settle-it", "Settle it. No trading, no gambling, just verifiable skill."],
  ["b7", "cardboard-sign", "Everyone called it. Nobody logged it. Yours gets a public receipt."],
  ["b8", "office-notice", "Screenshots or it didn't happen. Every call locks a public receipt."],
];

const VIDEOS = [
  ["c4", "worst-idea-ever-loud", "I made all my crypto calls public. Worst idea ever."],
  ["c5", "three-weeks-in", "Three weeks of public crypto calls. Getting destroyed, but improving."],
  ["c6", "humbling", "I thought I was good at crypto. Then I started logging every call."],
  ["c7", "just-locked-it", "Locked a crypto call I'll regret. 24 hours, no edits."],
];

// The native pair are photographs of a physical object; the wordmark plate that
// the paid-social versions carry undoes the "real photo" effect, and on Reddit
// the post already shows the brand as its author handle.
const NATIVE = new Set(["b7", "b8"]);

function bannerCreative([id, slug, headline]) {
  const dir = NATIVE.has(id) ? "banners-nologo" : "banners";
  return {
    type: "IMAGE",
    headline,
    image: { media: { type: "URL", url: `${B2}/${dir}/bitpredict-${id}-${slug}-square.png` } },
    destination: { type: "URL", url: LANDING, call_to_action: "Sign Up" },
  };
}

function videoCreative([id, slug, headline]) {
  return {
    type: "VIDEO",
    headline,
    video: { media: { type: "URL", url: `${V7}/bitpredict-${id}-${slug}-1080p-captioned.mp4` } },
    thumbnail: { media: { type: "URL", url: `${V7}/thumbnails/bitpredict-${id}-${slug}-thumb.png` } },
    destination: { type: "URL", url: LANDING, call_to_action: "Sign Up" },
  };
}

const ASSETS = [
  ...BANNERS.map((b) => ({ key: b[0], name: `BP ${b[0].toUpperCase()} ${b[1]}`, creative: bannerCreative(b) })),
  ...VIDEOS.map((v) => ({ key: v[0], name: `BP ${v[0].toUpperCase()} ${v[1]}`, creative: videoCreative(v) })),
];

// ---------------------------------------------------------------------- run --
mintToken();

console.log(`${LIVE ? "LIVE" : "DRY RUN"} · ${ASSETS.length} assets · $${DAILY_MICROS / 1e6}/day\n`);

// Preflight: the two gates that have blocked this account all week.
const funding = api("GET", `/ad_accounts/${ACCOUNT}/funding_instruments`);
const servable = funding.some((f) => f.is_servable);
const fired = api("GET", `/pixels/${PIXEL}/last_fired_at`);
console.log(`funding servable : ${servable}`);
console.log(`pixel sign_up    : ${fired.sign_up ?? "NEVER"}`);
if (!servable) throw new Error("account is not servable: add an approved payment card first");
if (!fired.sign_up) {
  throw new Error(
    "pixel has never recorded a sign_up, so Reddit will refuse a conversion ad group. " +
    "Deploy the signup conversion fix and get one real signup first.",
  );
}

if (!LIVE) {
  console.log("\nWould create:");
  console.log(`  ad group "${AD_GROUP_NAME}" SIGN_UP $${DAILY_MICROS / 1e6}/day US FEED+COMMENTS`);
  for (const a of ASSETS) console.log(`  post+ad  ${a.name.padEnd(34)} ${a.creative.type}`);
  process.exit(0);
}

// 1. Ad group, reused if it already exists.
const groups = api("GET", `/ad_accounts/${ACCOUNT}/ad_groups`);
let group = groups.find((g) => g.name === AD_GROUP_NAME);
if (group) {
  console.log(`\nad group reused ${group.id}`);
} else {
  group = api("POST", `/ad_accounts/${ACCOUNT}/ad_groups`, {
    campaign_id: CAMPAIGN,
    name: AD_GROUP_NAME,
    configured_status: "PAUSED",
    bid_strategy: "BIDLESS",
    bid_type: "CPM",
    goal_type: "DAILY_SPEND",
    goal_value: DAILY_MICROS,
    optimization_goal: "SIGN_UP",
    conversion_pixel_id: PIXEL,
    view_through_conversion_type: "SEVEN_DAY_CLICKS_ONE_DAY_VIEW",
    start_time: new Date(Date.now() + 5 * 60_000).toISOString().replace(/\.\d+Z$/, "+00:00"),
    targeting: { geolocations: ["US"], locations: ["FEED", "COMMENTS_PAGE"] },
  });
  console.log(`\nad group created ${group.id}`);
}

// 2. One post per asset, then one ad pointing at it.
const existingAds = api("GET", `/ad_accounts/${ACCOUNT}/ads`);
const results = [];

for (const asset of ASSETS) {
  const already = existingAds.find((a) => a.name === asset.name);
  if (already) {
    console.log(`  reused   ${asset.name.padEnd(34)} ad ${already.id}`);
    results.push({ ...asset, adId: already.id, postId: already.post_id, reused: true });
    continue;
  }

  // Structured-post job: Reddit downloads the media and rehosts it, so the job
  // has to be polled rather than assumed to be instant.
  const job = api("POST", `/profiles/${PROFILE}/structured_posts/jobs`, {
    profile_id: PROFILE,
    allow_comments: true,
    creative: asset.creative,
  });
  const jobId = job.id ?? job.job_id;
  let postId = null;
  for (let i = 0; i < 60; i++) {
    await sleep(3000);
    const st = api("GET", `/structured_posts/jobs/${jobId}`);
    const state = st.status ?? st.state;
    if (state === "SUCCESS" || state === "COMPLETED") {
      postId = st.post_id ?? st.post?.id;
      break;
    }
    if (state === "FAILED" || state === "ERROR") {
      throw new Error(`post job failed for ${asset.name}: ${JSON.stringify(st).slice(0, 400)}`);
    }
  }
  if (!postId) throw new Error(`post job timed out for ${asset.name}`);

  const ad = api("POST", `/ad_accounts/${ACCOUNT}/ads`, {
    ad_group_id: group.id,
    name: asset.name,
    post_id: postId,
    configured_status: "PAUSED",
    type: "PROMOTED_USER_POST",
  });
  console.log(`  created  ${asset.name.padEnd(34)} post ${postId} ad ${ad.id}`);
  results.push({ ...asset, adId: ad.id, postId });
}

// 3. Activate, children first, so nothing can deliver before its creative is on.
if (ACTIVATE) {
  console.log("\nactivating");
  for (const r of results) {
    api("PATCH", `/ad_accounts/${ACCOUNT}/ads/${r.adId}`, { configured_status: "ACTIVE" });
  }
  api("PATCH", `/ad_accounts/${ACCOUNT}/ad_groups/${group.id}`, { configured_status: "ACTIVE" });
  api("PATCH", `/ad_accounts/${ACCOUNT}/campaigns/${CAMPAIGN}`, { configured_status: "ACTIVE" });
  console.log("  campaign, ad group and all ads set ACTIVE");
}

console.log(`\ndone: ${results.length} ads · ad group ${group.id} · campaign ${CAMPAIGN}`);
