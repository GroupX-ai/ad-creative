#!/usr/bin/env node
/**
 * Add the 1Lookup Seedance video ads to the live Reddit conversion campaign.
 *
 *   node _scripts/reddit-launch-1lookup-video.mjs              # dry run
 *   node _scripts/reddit-launch-1lookup-video.mjs --live       # creates, PAUSED
 *   node _scripts/reddit-launch-1lookup-video.mjs --live --activate
 *   node _scripts/reddit-launch-1lookup-video.mjs --live --ref <branch>
 *
 * Reuses the campaign and ad group that already carry the six live banner ads
 * (campaign 2557856098062241615, ad group "US Broad - SignUp", $25/day,
 * SIGN_UP goal). Ads are created PAUSED: the ad group is live and spending,
 * so activating new creative is Robby's flip, not this script's.
 *
 * IDEMPOTENT BY NAME at both levels (no DELETE exists in the Reddit v3 API):
 * ads are matched by name, orphan structured posts by headline, exactly the
 * recovery path proven on the BitPredict and TeamPredict launches.
 *
 * Media URLs default to `main`. Reddit fetches and rehosts the files at
 * job-creation time, so a one-off run from a feature branch may pass --ref;
 * anything committed here must reference main so a re-run after merge works.
 */

import { execFileSync } from "node:child_process";

const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";
const ACCOUNT = "a2_jdktuzsu7mws";
const PROFILE = "t2_4xm4m1l9"; // RobbyFrank — the account's only ad profile (flagged open decision in the vault)
const CAMPAIGN = "2557856098062241615";
const AD_GROUP_ID = "2559001032421657878"; // "US Broad - SignUp", ACTIVE, $25/day
const PIXEL = ACCOUNT;
const LANDING = "https://www.1lookup.io/";

const argv = process.argv.slice(2);
const LIVE = argv.includes("--live");
const ACTIVATE = argv.includes("--activate");
const refIdx = argv.indexOf("--ref");
const REF = refIdx === -1 ? "main" : argv[refIdx + 1];
const RAW = `https://raw.githubusercontent.com/GroupX-ai/ad-creative/${REF}`;
const B1 = `${RAW}/1lookup/2026-08-08-seedance-video`;
const B2 = `${RAW}/1lookup/2026-08-09-seedance-video-b2`;
const B12 = `${RAW}/1lookup/2026-08-18-product-videos`;

// headline = what a redditor reads above the video. Never repeats the burned-in
// captions; every product claim traces to the live site copy (re-verified
// 2026-08-18: hero, proof strip, product pages).
const VIDEOS = [
  ["c3", "ghost-leads", "The list was haunted. Nine dead numbers in one night. Or you could just validate them.",
    `${B1}/1lookup-c3-ghost-leads-1080p-trimmed-captioned-endcard.mp4`,
    `${B1}/thumbnails/1lookup-c3-ghost-leads-thumb.png`],
  ["c4", "appraisal", "What is a bought lead list actually worth? Validate it. Stop paying for bad data.",
    `${B2}/1lookup-c4-appraisal-1080p-captioned.mp4`,
    `${B2}/thumbnails/1lookup-c4-appraisal-thumb.png`],
  ["c5", "security-scanner", "Airport security for your contact data. Validate any phone, email, or domain.",
    `${B2}/1lookup-c5-security-scanner-1080p-captioned.mp4`,
    `${B2}/thumbnails/1lookup-c5-security-scanner-thumb.png`],
  ["c6", "quality-control", "Quality control for contact data. Validation answers in under 0.3 seconds.",
    `${B2}/1lookup-c6-quality-control-1080p-trimmed-captioned-endcard.mp4`,
    `${B2}/thumbnails/1lookup-c6-quality-control-thumb.png`],
  ["c7", "one-key", "One API key, 41 data products: phone, email, domain, enrichment and more.",
    `${B2}/1lookup-c7-one-key-1080p-captioned.mp4`,
    `${B2}/thumbnails/1lookup-c7-one-key-thumb.png`],

  // Batch 12, one named product per clip. Headlines lead with the complaint the
  // target subreddit already has, not with the product name.
  ["c8", "dead-numbers", "A third of our call list was disconnected. Validate the numbers before your reps dial them.",
    `${B12}/1lookup-c8-dead-list-1080p-trimmed-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c8-dead-list-thumb.jpg`],
  ["c9", "first-call", "His first cold call of the day was to a lawyer. Check the DNC list before you dial.",
    `${B12}/1lookup-c9-first-call-1080p-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c9-first-call-thumb.jpg`],
  ["c10", "ghost-owner", "Owner hasn't lived there since 2019, mail comes back. Skip trace: name in, phone and address out.",
    `${B12}/1lookup-c10-ghost-owner-1080p-trimmed-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c10-ghost-owner-thumb.jpg`],
  ["c11", "front-desk", "A number keeps calling and hanging up. Reverse lookup gives you caller identity and risk.",
    `${B12}/1lookup-c11-front-desk-1080p-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c11-front-desk-thumb.jpg`],
  ["c12", "flagged", "800 dials, four pickups. Your numbers are flagged as spam. Check their spam scores daily.",
    `${B12}/1lookup-c12-flagged-1080p-trimmed-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c12-flagged-thumb.jpg`],
  ["c13", "landlines", "Ten thousand texts sent, half of them to landlines. Check line type before you send.",
    `${B12}/1lookup-c13-landlines-1080p-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c13-landlines-thumb.jpg`],
  ["c14", "best-month", "500 signups in a record month, all of them one guy. A 0-100 fraud score on every signup.",
    `${B12}/1lookup-c14-best-month-1080p-fixed-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c14-best-month-thumb.jpg`],
  ["c15", "sommelier", "Bought online, recently. Typos and disposable domains. Validate the list before it bounces.",
    `${B12}/1lookup-c15-list-sommelier-1080p-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c15-list-sommelier-thumb.jpg`],
  ["c16", "rolodex", "My boss thinks I know everyone. Paste a profile link, get a direct mobile number.",
    `${B12}/1lookup-c16-magic-rolodex-1080p-fixed-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c16-magic-rolodex-thumb.jpg`],
  ["c17", "established-1987", "In business since 1987. Domain registered Tuesday. Verify a business before you pay it.",
    `${B12}/1lookup-c17-established-1987-1080p-captioned.mp4`,
    `${B12}/thumbnails/1lookup-c17-established-1987-thumb.jpg`],
];

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

function creativeFor([id, slug, headline, video, thumb]) {
  return {
    type: "VIDEO",
    headline,
    video: { media: { type: "URL", url: video } },
    thumbnail: { media: { type: "URL", url: thumb } },
    destination: {
      type: "URL",
      url: `${LANDING}?utm_source=reddit&utm_medium=paid&utm_campaign=video-seedance-2026-08&utm_content=${slug}`,
      call_to_action: "Sign Up",
    },
  };
}

const ASSETS = VIDEOS.map((v) => ({ key: v[0], name: `1lookup video ${v[0]} ${v[1]} 2026-08-18`, creative: creativeFor(v) }));

mintToken();
console.log(`${LIVE ? "LIVE" : "DRY RUN"} · ${ASSETS.length} video ads · media ref ${REF}\n`);

const funding = api("GET", `/ad_accounts/${ACCOUNT}/funding_instruments`);
const servable = funding.some((f) => f.is_servable);
const fired = api("GET", `/pixels/${PIXEL}/last_fired_at`);
console.log(`funding servable : ${servable}`);
console.log(`pixel sign_up    : ${fired.sign_up ?? "NEVER"}`);
if (!servable) throw new Error("account is not servable");
if (!fired.sign_up) throw new Error("pixel has never recorded a sign_up");

if (!LIVE) {
  for (const a of ASSETS) console.log(`  would create  ${a.name.padEnd(44)} VIDEO (PAUSED)`);
  process.exit(0);
}

const existingAds = api("GET", `/ad_accounts/${ACCOUNT}/ads`);
const existingPosts = api("GET", `/profiles/${PROFILE}/structured_posts`);
const results = [];

for (const asset of ASSETS) {
  const already = existingAds.find((a) => a.name === asset.name);
  if (already) {
    console.log(`  reused   ${asset.name.padEnd(44)} ad ${already.id}`);
    results.push({ ...asset, adId: already.id, postId: already.post_id, reused: true });
    continue;
  }

  const orphan = existingPosts.find((p) => p.creative?.headline === asset.creative.headline);
  let postId = orphan?.id ?? null;
  if (postId) {
    console.log(`  adopting orphan post ${postId} for ${asset.key}`);
  } else {
    const job = api("POST", `/profiles/${PROFILE}/structured_posts/jobs`, {
      profile_id: PROFILE,
      allow_comments: true,
      creative: asset.creative,
    });
    const jobId = job.id ?? job.job_id;
    for (let i = 0; i < 80; i++) {
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
  }

  const ad = api("POST", `/ad_accounts/${ACCOUNT}/ads`, {
    ad_group_id: AD_GROUP_ID,
    name: asset.name,
    post_id: postId,
    configured_status: "PAUSED",
    type: "UNSPECIFIED",
  });
  console.log(`  created  ${asset.name.padEnd(44)} post ${postId} ad ${ad.id} (PAUSED)`);
  results.push({ ...asset, adId: ad.id, postId });
}

if (ACTIVATE) {
  for (const r of results) api("PATCH", `/ads/${r.adId}`, { configured_status: "ACTIVE" });
  console.log("\nall video ads set ACTIVE");
}

console.log(`\ndone: ${results.length} video ads in ad group ${AD_GROUP_ID} · campaign ${CAMPAIGN}`);
