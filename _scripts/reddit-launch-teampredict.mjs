#!/usr/bin/env node
/**
 * Launch the TeamPredict Reddit campaign: ad group, posts, ads.
 *
 *   node _scripts/reddit-launch-teampredict.mjs            # dry run, prints the plan
 *   node _scripts/reddit-launch-teampredict.mjs --live     # creates, PAUSED
 *   node _scripts/reddit-launch-teampredict.mjs --live --activate
 *
 * IDEMPOTENT BY NAME, and that is not a nicety: the Reddit v3 API has no DELETE
 * for campaigns, ad groups or ads. A mistaken create can only be paused and
 * renamed, so every step looks up an existing entity by name and reuses it.
 * Re-running after a partial failure is safe and is the intended recovery path.
 *
 * Every write goes through `curl`. Node's built-in fetch ignores HTTPS_PROXY in
 * this environment, opens a direct socket and gets a 403 from the egress policy
 * whose body reads "Blocked by egress policy" — which looks exactly like a
 * Reddit permission error and is not one.
 */

import { execFileSync } from "node:child_process";

const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";
const ACCOUNT = "a2_jdimqxjqurs0";
const PROFILE = "t2_2ixy8ck0v2"; // "TeamPredict" brand profile
const CAMPAIGN = "2557856076616171750"; // "Reddit Conversions - Free Trial (Claude) 2026-07"
const PIXEL = ACCOUNT; // Reddit self-serve: pixel id === ad account id
const AD_GROUP_NAME = "TP | US | HR + Founders | SignUp v1";

// $8.00/day ≈ $243/month, inside the campaign's existing $300/month shell and
// inside the $1,000/month pool shared with Meta and Google.
const DAILY_MICROS = 8_000_000;

const LANDING = "https://www.teampredict.ai/";
const utm = (content) =>
  `${LANDING}?utm_source=reddit&utm_medium=cpc&utm_campaign=tp-launch-2026-08&utm_content=${content}`;

// Buyer-side communities only. r/antiwork, r/recruitinghell and the other
// worker-side subs are deliberately absent: a Reddit ad carries a public comment
// thread, and "software that reads whether your staff are job hunting" gets
// taken apart in a room full of employees. Every ad in this set also makes the
// MANAGER the butt of the joke rather than the employee, which is the same
// defence applied to the creative.
const COMMUNITIES = [
  "humanresources",
  "AskHR",
  "managers",
  "askmanagers",
  "Entrepreneur",
  "smallbusiness",
  "startups",
  "SaaS",
  "EntrepreneurRideAlong",
  "business",
  "consulting",
];

// Pinned to `main`, never to a feature branch. Reddit fetches each URL itself at
// post-creation time, which can be days after the code is written, and a merged
// branch gets deleted: a branch URL is a launch that breaks silently later.
// Anything referenced here must be on main before the script is run.
//
// (The 2026-08-14 launch ran against the feature branch out of necessity, since
// the assets were not merged yet. Those ads are unaffected either way: Reddit
// rehosts the media on i.redd.it at post creation, so the source URL is only
// ever read once.)
const RAW = "https://raw.githubusercontent.com/GroupX-ai/ad-creative/main";
const B8 = `${RAW}/teampredict/2026-08-13-paid-launch`;
const V9 = `${RAW}/teampredict/2026-08-13-paid-launch-video`;
const V10 = `${RAW}/teampredict/2026-08-18-office-skits`;

// ---------------------------------------------------------------------------
// Reporting note, learned the expensive way on 2026-08-14.
//
// Report field names are UPPER_CASE in the REQUEST and lowercase in the
// RESPONSE. You ask for ["SPEND","IMPRESSIONS","CLICKS"] and rows come back as
// {ad_id, spend, impressions, clicks}. Reading the response by the name you
// requested returns undefined on every field, which sums to a confident zero
// rather than erroring, and that zero is indistinguishable from a dead campaign.
// It produced two false "not delivering" reports before a control query against
// a known-spending account caught it.
//
// Before believing a zero, run the same query against an account you KNOW is
// spending. If that also reads zero, the instrument is broken, not the campaign.
// Also: ends_at must be hourly granularity (YYYY-MM-DDTHH:00:00Z) or it 400s.
// ---------------------------------------------------------------------------

const LIVE = process.argv.includes("--live");
const ACTIVATE = process.argv.includes("--activate");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let TOKEN = "";
function mintToken() {
  const out = execFileSync(
    "curl",
    [
      "-s", "-X", "POST", "https://www.reddit.com/api/v1/access_token",
      "-A", UA,
      "-u", `${process.env.REDDIT_ADS_APP_ID}:${process.env.REDDIT_ADS_APP_SECRET}`,
      "-d", `grant_type=refresh_token&refresh_token=${process.env.REDDIT_ADS_REFRESH_TOKEN}`,
    ],
    { encoding: "utf8", maxBuffer: 1 << 24 },
  );
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
    // Every write body must be wrapped in {"data": {...}}. A flat body returns
    // 400 "Additional fields not permitted" on every field, which reads like a
    // schema mismatch and is really a missing wrapper.
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
    throw new Error(
      `${method} ${path} -> ${parsed.error.code} ${parsed.error.message}${fields ? ` [${fields}]` : ""}`,
    );
  }
  return parsed.data;
}

// ---------------------------------------------------------------- creatives --
// `headline` is what a redditor reads in the feed above the media. It is NOT the
// banner's own burned-in headline: repeating that wastes the only line of copy
// the post gets. Every line traces to the live teampredict.ai copy bank.
//
// Never used: any accuracy figure, any lead-time window other than the site's
// own "weeks", and "no credit card required" (a card IS taken at signup).
const BANNERS = [
  ["t1", "keep-scrolling", "square",
   "Every resignation looks obvious afterwards. This one tells you before."],
  ["t5", "open-to-work", "square",
   "Recruiters see the badge the moment it goes on. Their manager never does."],
  ["t13", "competitor-radar", "square",
   "Point the same radar at your competitors and get poaching alerts."],
  ["t18", "whiteboard", "square",
   "People go quiet before they resign. Weekly Slack message counts, never content."],
  ["t19", "office-notice", "square",
   "The exit interview is not an early warning system."],
  ["t20", "napkin", "square",
   "$5 per tracked employee. 100 tracked free for 30 days."],
];

const VIDEOS = [
  ["v1", "keep-scrolling", "1080p-captioned",
   "Not worried about anyone on your team quitting? Keep scrolling."],
  ["v2", "two-weeks", "1080p-captioned",
   "By the time you're offering a standing desk, the decision was made weeks ago."],
  ["v3", "open-to-work", "1080p-trimmed-captioned",
   "Here we observe the manager in his natural habitat."],
  ["v4", "pizza-party", "1080p-captioned",
   "A pizza party is not a retention strategy."],
  ["v5", "psychic", "1080p-captioned",
   "You don't need a crystal ball. The signals are already public."],
  ["v6", "my-competitors", "1080p-captioned",
   "Everyone uses this on their own team. I use it on my competitors."],
];

// Batch-10 mockumentary skits, added 2026-08-18 on Robby's "use all of these in
// the paid ads". Same VIDEO creative shape, different source directory.
const SKITS = [
  ["w1", "farewell-party", "1080p-captioned",
   "He planned the farewell party before the resignation. The signals were that obvious."],
  ["w2", "exit-interview", "1080p-captioned",
   "The exit interview is where you learn everything. Too late."],
  ["w3", "gone-quiet", "1080p-captioned",
   "Forty memes a day, then one thumbs up. People go quiet before they resign."],
];

// Reddit gets the clean no-logo renders throughout. The post is already branded
// with the author handle, and a pasted wordmark on top of that reads as an
// advert twice over, which is the fastest way to lose the comment thread.
function bannerCreative([id, slug, shape, headline]) {
  return {
    type: "IMAGE",
    headline,
    image: { media: { type: "URL", url: `${B8}/banners-nologo/teampredict-${id}-${slug}-${shape}.png` } },
    destination: { type: "URL", url: utm(`${id}-${slug}`), call_to_action: "Sign Up" },
  };
}

function videoCreative([id, slug, suffix, headline], dir = V9) {
  return {
    type: "VIDEO",
    headline,
    video: { media: { type: "URL", url: `${dir}/teampredict-${id}-${slug}-${suffix}.mp4` } },
    thumbnail: { media: { type: "URL", url: `${dir}/thumbnails/teampredict-${id}-${slug}-thumb.png` } },
    destination: { type: "URL", url: utm(`${id}-${slug}`), call_to_action: "Sign Up" },
  };
}

const ASSETS = [
  ...BANNERS.map((b) => ({
    slug: `${b[0]}-${b[1]}`,
    name: `TP ${b[0].toUpperCase()} ${b[1]}`,
    creative: bannerCreative(b),
  })),
  ...VIDEOS.map((v) => ({
    slug: `${v[0]}-${v[1]}`,
    name: `TP ${v[0].toUpperCase()} ${v[1]}`,
    creative: videoCreative(v),
  })),
  ...SKITS.map((v) => ({
    slug: `${v[0]}-${v[1]}`,
    name: `TP ${v[0].toUpperCase()} ${v[1]}`,
    creative: videoCreative(v, V10),
  })),
];

// ---------------------------------------------------------------------- run --
mintToken();

console.log(`${LIVE ? "LIVE" : "DRY RUN"} · ${ASSETS.length} assets · $${DAILY_MICROS / 1e6}/day\n`);

// Preflight: the two gates that blocked this account for a fortnight.
const funding = api("GET", `/ad_accounts/${ACCOUNT}/funding_instruments`);
const servable = funding.some((f) => f.is_servable);
const fired = api("GET", `/pixels/${PIXEL}/last_fired_at`);
console.log(`funding servable : ${servable}`);
console.log(`pixel sign_up    : ${fired.sign_up ?? "NEVER"}`);
if (!servable) throw new Error("account is not servable: add an approved payment card first");
if (!fired.sign_up) {
  throw new Error("pixel has never recorded a sign_up, so Reddit will refuse a conversion ad group");
}

if (!LIVE) {
  console.log("\nWould create:");
  console.log(`  ad group "${AD_GROUP_NAME}" SIGN_UP $${DAILY_MICROS / 1e6}/day US FEED+COMMENTS`);
  console.log(`  communities: ${COMMUNITIES.join(", ")}`);
  for (const a of ASSETS) console.log(`  post+ad  ${a.name.padEnd(30)} ${a.creative.type}`);
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
    // communities takes subreddit NAMES, not the t5_ ids the targeting lookup
    // itself returns. Passing ids fails with "invalid communities".
    targeting: {
      geolocations: ["US"],
      locations: ["FEED", "COMMENTS_PAGE"],
      communities: COMMUNITIES,
    },
  });
  console.log(`\nad group created ${group.id}`);
}

// 2. One post per asset, then one ad pointing at it.
const existingAds = api("GET", `/ad_accounts/${ACCOUNT}/ads`);

// Posts are as undeletable as ads, and the first run of this script created
// twelve of them and then failed at the ad step, leaving them orphaned. So
// posts are matched and reused too, keyed on the utm_content slug baked into
// each destination URL, which is unique per asset. Without this a retry silently
// doubles the brand profile's post history.
const existingPosts = api("GET", `/profiles/${PROFILE}/structured_posts`);
const postForSlug = (slug) =>
  existingPosts.find((p) => (p.creative?.destination?.url ?? "").includes(`utm_content=${slug}`));

const results = [];
const failures = [];

for (const asset of ASSETS) {
  const already = existingAds.find((a) => a.name === asset.name);
  if (already) {
    console.log(`  reused   ${asset.name.padEnd(30)} ad ${already.id}`);
    results.push({ ...asset, adId: already.id, postId: already.post_id });
    continue;
  }

  try {
    const reusablePost = postForSlug(asset.slug);
    if (reusablePost) {
      const ad = api("POST", `/ad_accounts/${ACCOUNT}/ads`, {
        ad_group_id: group.id,
        name: asset.name,
        post_id: reusablePost.id,
        configured_status: "PAUSED",
        type: "UNSPECIFIED",
      });
      console.log(`  wired    ${asset.name.padEnd(30)} post ${reusablePost.id} ad ${ad.id}`);
      results.push({ ...asset, adId: ad.id, postId: reusablePost.id });
      continue;
    }

    // Structured-post job: `POST /profiles/{id}/posts` rejects any external
    // media_url outright. The job endpoint downloads the file and rehosts it on
    // i.redd.it, so it has to be polled rather than assumed instant.
    const job = api("POST", `/profiles/${PROFILE}/structured_posts/jobs`, {
      profile_id: PROFILE,
      allow_comments: true,
      creative: asset.creative,
    });
    const jobId = job.id ?? job.job_id;
    let postId = null;
    for (let i = 0; i < 80; i++) {
      await sleep(3000);
      const st = api("GET", `/structured_posts/jobs/${jobId}`);
      const state = st.status ?? st.state;
      if (state === "SUCCESS" || state === "COMPLETED") {
        postId = st.post_id ?? st.post?.id;
        break;
      }
      if (state === "FAILED" || state === "ERROR") {
        throw new Error(`post job failed: ${JSON.stringify(st).slice(0, 300)}`);
      }
    }
    if (!postId) throw new Error("post job timed out");

    const ad = api("POST", `/ad_accounts/${ACCOUNT}/ads`, {
      ad_group_id: group.id,
      name: asset.name,
      post_id: postId,
      configured_status: "PAUSED",
      // The ad `type` enum now accepts exactly one value. "PROMOTED_USER_POST",
      // which the BitPredict launch used on 2026-08-13, is rejected with
      // "data/type: 'UNSPECIFIED' was expected".
      type: "UNSPECIFIED",
    });
    console.log(`  created  ${asset.name.padEnd(30)} post ${postId} ad ${ad.id}`);
    results.push({ ...asset, adId: ad.id, postId });
  } catch (e) {
    console.error(`  FAILED   ${asset.name.padEnd(30)} ${e.message.slice(0, 220)}`);
    failures.push(`${asset.name}: ${e.message.slice(0, 220)}`);
  }
}

// 3. Activate children first, so nothing can deliver before its creative is on.
if (ACTIVATE && results.length) {
  // PATCH lives at the TOP LEVEL, not nested under the ad account: the nested
  // shape returns a bare "Not Found" body, which reads like a missing entity and
  // is really a wrong URL. Creates ARE nested; updates are not.
  console.log("\nactivating");
  for (const r of results) {
    api("PATCH", `/ads/${r.adId}`, { configured_status: "ACTIVE" });
  }
  api("PATCH", `/ad_groups/${group.id}`, { configured_status: "ACTIVE" });
  api("PATCH", `/campaigns/${CAMPAIGN}`, { configured_status: "ACTIVE" });
  console.log("  campaign, ad group and all ads set ACTIVE");
}

console.log(`\ndone: ${results.length} ads · ${failures.length} failed · ad group ${group.id}`);
for (const f of failures) console.log(`  ! ${f}`);
