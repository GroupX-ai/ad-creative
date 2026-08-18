#!/usr/bin/env node
/**
 * Add the batch-10 BitPredict videos to the live Reddit ad group.
 *
 *   node _scripts/reddit-launch-bitpredict-b10.mjs            # dry run, prints the plan
 *   node _scripts/reddit-launch-bitpredict-b10.mjs --live     # creates the ads, PAUSED
 *   node _scripts/reddit-launch-bitpredict-b10.mjs --live --activate
 *
 * This is the sibling of `reddit-launch-bitpredict.mjs`, which created the
 * campaign, the ad group and the original twelve assets on 2026-08-16. Everything
 * structural already exists, so this only adds eight VIDEO creatives to the same
 * ad group. All the hard-won API notes live in that file; the ones that bite here:
 *
 *   - Ad `type` is the literal string "UNSPECIFIED", not a placeholder to omit.
 *   - Updates are NOT nested under the ad account: PATCH /ads/{id}.
 *   - A failed ad create leaves an orphan post and there is no DELETE, so posts
 *     and ads are both matched and reused by name/headline before creating.
 *   - Every write goes through curl: Node's fetch ignores HTTPS_PROXY here and
 *     gets a 403 from the egress policy that reads like a Reddit permission error.
 *
 * MEDIA URLS ARE PINNED TO A COMMIT SHA, not to `main` and not to the branch.
 * The sibling script pins to `main` because a merged branch gets deleted and a
 * branch URL is a launch that breaks silently later. A commit SHA is stronger
 * than both: it is immutable, it survives the branch being deleted, and it does
 * not depend on this work having been merged first. The branch name also contains
 * a slash, which is ambiguous against the file path in a raw URL.
 *
 * DEFAULT IS PAUSED, DELIBERATELY. The campaign is already live and Robby parked
 * it on 2026-08-17 after two days bought 3 clicks and 0 signups for $20.54. These
 * ads are loaded and ready but do not deliver until someone passes --activate.
 */

import { execFileSync } from "node:child_process";

const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";
const ACCOUNT = "a2_jdio3ztnjrcd";
const PROFILE = "t2_2ixylt9bey"; // TryBitPredict
const CAMPAIGN = "2557856106149115257";
const AD_GROUP_NAME = "BP | US | Broad | SignUp v1";
const LANDING = "https://www.bitpredict.io/";

const SHA = "8fd38e7573f88b65326d84d5a8a3cf732f3f7e6a";
const B10 = `https://raw.githubusercontent.com/GroupX-ai/ad-creative/${SHA}/bitpredict/2026-08-18-viral-b10`;

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

// headline is the line a redditor reads above the media, not the clip's own
// closing line. Every one traces to live bitpredict.io copy and carries no money,
// prize, payout or accuracy claim. They must also each be UNIQUE against the
// twelve already on this profile, because orphaned posts are matched by headline.
const VIDEOS = [
  ["c8", "two-am-whisper", "1080p-fixed", "It's 2am and I was right about crypto. This time there's a receipt."],
  ["c9", "there-is-a-link", "1080p", "I was right about crypto and for once there is a public link."],
  ["c10", "pulled-over", "1080p", "Pulled off the road to make a crypto call. Nothing to stake."],
  ["c11", "receipt-roll", "1080p", "Stop telling people you called that crypto move. Prove it."],
  ["c12", "caster-waits", "1080p", "He locked his crypto call. Now everyone waits 24 hours."],
  ["c13", "the-needle", "1080p", "Feelings aren't receipts. No trading, no gambling, just verifiable skill."],
  ["c14", "prove-it", "1080p", "Cross-examined on a crypto call he made alone in his car."],
  ["c15", "evidence-wall", "1080p-fixed", "He built a whole evidence wall. He still had no proof."],
];

const ASSETS = VIDEOS.map(([id, slug, variant, headline]) => ({
  key: id,
  name: `BP ${id.toUpperCase()} ${slug}`,
  creative: {
    type: "VIDEO",
    headline,
    video: { media: { type: "URL", url: `${B10}/bitpredict-${id}-${slug}-${variant}-captioned.mp4` } },
    thumbnail: { media: { type: "URL", url: `${B10}/thumbnails/bitpredict-${id}-${slug}-thumb.png` } },
    destination: { type: "URL", url: LANDING, call_to_action: "Sign Up" },
  },
}));

mintToken();
console.log(`${LIVE ? "LIVE" : "DRY RUN"} · ${ASSETS.length} video ads -> "${AD_GROUP_NAME}"\n`);

const groups = api("GET", `/ad_accounts/${ACCOUNT}/ad_groups`);
const group = groups.find((g) => g.name === AD_GROUP_NAME);
if (!group) throw new Error(`ad group "${AD_GROUP_NAME}" not found; run reddit-launch-bitpredict.mjs first`);
console.log(`ad group ${group.id} (${group.configured_status}/${group.effective_status})`);

if (!LIVE) {
  for (const a of ASSETS) console.log(`  would create  ${a.name.padEnd(26)} ${a.creative.headline}`);
  process.exit(0);
}

const existingAds = api("GET", `/ad_accounts/${ACCOUNT}/ads`);
const existingPosts = api("GET", `/profiles/${PROFILE}/structured_posts`);
const results = [];

for (const asset of ASSETS) {
  const already = existingAds.find((a) => a.name === asset.name);
  if (already) {
    console.log(`  reused   ${asset.name.padEnd(26)} ad ${already.id}`);
    results.push({ ...asset, adId: already.id, postId: already.post_id, reused: true });
    continue;
  }

  const orphan = existingPosts.find((p) => p.creative?.headline === asset.creative.headline);
  let postId = orphan?.id ?? null;
  if (postId) {
    console.log(`  adopting orphan post ${postId} for ${asset.name}`);
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
      if (state === "SUCCESS" || state === "COMPLETED") { postId = st.post_id ?? st.post?.id; break; }
      if (state === "FAILED" || state === "ERROR") {
        throw new Error(`post job failed for ${asset.name}: ${JSON.stringify(st).slice(0, 400)}`);
      }
    }
    if (!postId) throw new Error(`post job timed out for ${asset.name}`);
  }

  const ad = api("POST", `/ad_accounts/${ACCOUNT}/ads`, {
    ad_group_id: group.id,
    name: asset.name,
    post_id: postId,
    configured_status: "PAUSED",
    type: "UNSPECIFIED",
  });
  console.log(`  created  ${asset.name.padEnd(26)} post ${postId} ad ${ad.id}`);
  results.push({ ...asset, adId: ad.id, postId });
}

if (ACTIVATE) {
  console.log("\nactivating the eight new ads");
  for (const r of results) api("PATCH", `/ads/${r.adId}`, { configured_status: "ACTIVE" });
  console.log("  done");
} else {
  console.log("\nall eight are PAUSED. Re-run with --activate to deliver them.");
}

console.log(`\ndone: ${results.length} ads · ad group ${group.id} · campaign ${CAMPAIGN}`);
