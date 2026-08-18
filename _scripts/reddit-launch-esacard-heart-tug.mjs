#!/usr/bin/env node
// Add the heart-tug batch to the live ESA Card Reddit ad group.
//
//   node _scripts/reddit-launch-esacard-heart-tug.mjs          # dry run, prints the plan
//   node _scripts/reddit-launch-esacard-heart-tug.mjs --live    # create posts + ads (PAUSED)
//   node _scripts/reddit-launch-esacard-heart-tug.mjs --activate # flip the new ads ACTIVE
//
// Four things this script does differently from the bitpredict/teampredict launchers, each
// one a bug those two still carry:
//
//   1. It reuses the existing ad group. The optimisation goal is immutable, so creating a new
//      group would reset Purchase learning four days after the last reset.
//   2. It polls the real job enum: SUCCESS / CLIENT_ERROR / SERVER_ERROR. The older scripts
//      wait for FAILED/ERROR/COMPLETED, none of which exist, so a genuinely failed job spins
//      the whole poll window and reports a timeout instead of the reason.
//   3. It follows pagination.next_url. The account holds 65 ads and list endpoints cap at 50,
//      so a page-1-only idempotency check would not find an existing ad and would create a
//      duplicate. Nothing on Reddit can be deleted.
//   4. Every post carries a utm_content, which is both the attribution fix and the stable
//      idempotency key. The 30 live posts have no UTMs at all.
//
// Node's fetch cannot reach reddit from this environment (undici ignores HTTPS_PROXY and the
// egress policy answers 403), so every call shells out to curl.

import { execFileSync } from "node:child_process";

const ACCOUNT = "a2_ji9rrnreyf0d";
const PROFILE = "t2_2kl3hjgu1c";
const AD_GROUP = "2570690648253263407"; // ESA | Pet + Housing | Purchase, live, $5/day
const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";
const RAW = "https://raw.githubusercontent.com/GroupX-ai/ad-creative/main/esacard/2026-08-18-heart-tug";

const LIVE = process.argv.includes("--live");
const ACTIVATE = process.argv.includes("--activate");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

const utm = (id) =>
  "https://www.esacard.com/?utm_source=reddit&utm_medium=paid_social" +
  `&utm_campaign=esa-card-reddit-pet-housing&utm_content=${id}`;

// The headline IS the Reddit post title, read in the feed above the media. Each one is the
// clip's own opening line, which is what makes it read as a post rather than an ad.
const CREATIVES = [
  { id: "h1-old-bones", name: "ESA VID h1-old-bones", type: "VIDEO",
    headline: "Fourteen years old. Stairs are done, so we found a garden flat.",
    media: `${RAW}/h1-old-bones-1080p-captioned.mp4`, thumb: `${RAW}/thumbnails/h1-old-bones-thumb.png` },
  { id: "h2-visiting-nana", name: "ESA VID h2-visiting-nana", type: "VIDEO",
    headline: "Sunday. He knows exactly where we are going.",
    media: `${RAW}/h2-visiting-nana-1080p-captioned.mp4`, thumb: `${RAW}/thumbnails/h2-visiting-nana-thumb.png` },
  { id: "h3-night-shift", name: "ESA VID h3-night-shift", type: "VIDEO",
    headline: "Twelve hours. He hates it more than I do.",
    media: `${RAW}/h3-night-shift-1080p-captioned.mp4`, thumb: `${RAW}/thumbnails/h3-night-shift-thumb.png` },
  { id: "h5-half-day", name: "ESA VID h5-half-day", type: "VIDEO",
    headline: "Half day today. Don't tell him.",
    media: `${RAW}/h5-half-day-1080p-captioned.mp4`, thumb: `${RAW}/thumbnails/h5-half-day-thumb.png` },
  { id: "n1-grey-muzzle", name: "ESA IMG n1-grey-muzzle-square", type: "IMAGE",
    headline: "Twelve years of him, and now he has a card with his photo on it.",
    media: `${RAW}/n1-grey-muzzle-square.png` },
  { id: "n2-moving-box", name: "ESA IMG n2-moving-box-square", type: "IMAGE",
    headline: "Home is wherever she is.",
    media: `${RAW}/n2-moving-box-square.png` },
];

function curl(args) {
  return execFileSync("curl", ["-sS", "-A", UA, ...args], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
}

function token() {
  const out = curl([
    "-X", "POST", "https://www.reddit.com/api/v1/access_token",
    "-u", `${process.env.REDDIT_ADS_APP_ID}:${process.env.REDDIT_ADS_APP_SECRET}`,
    "-d", `grant_type=refresh_token&refresh_token=${process.env.REDDIT_ADS_REFRESH_TOKEN}`,
  ]);
  const t = JSON.parse(out).access_token;
  if (!t) throw new Error(`no access_token: ${out.slice(0, 200)}`);
  return t;
}

const TOKEN = token();
const auth = ["-H", `Authorization: Bearer ${TOKEN}`, "-H", "Content-Type: application/json"];

function get(path) {
  return JSON.parse(curl([...auth, path.startsWith("http") ? path : API + path]));
}
function post(path, body) {
  return JSON.parse(curl([...auth, "-X", "POST", API + path, "-d", JSON.stringify({ data: body })]));
}
function patch(path, body) {
  return JSON.parse(curl([...auth, "-X", "PATCH", API + path, "-d", JSON.stringify({ data: body })]));
}

// List endpoints cap at 50 rows and hand back pagination.next_url. Follow it or the
// idempotency check below silently misses everything past the first page.
function getAll(path) {
  const rows = [];
  let url = API + path;
  for (let i = 0; i < 20 && url; i++) {
    const page = get(url);
    rows.push(...(page.data ?? []));
    url = page.pagination?.next_url ?? null;
  }
  return rows;
}

async function waitJob(jobId, label) {
  for (let i = 0; i < 60; i++) {
    await sleep(5000);
    const j = get(`/structured_posts/jobs/${jobId}`).data ?? {};
    if (j.status === "SUCCESS") return j.post_id ?? j.post?.id;
    if (j.status === "CLIENT_ERROR" || j.status === "SERVER_ERROR") {
      throw new Error(`${label} job ${j.status}: ${j.error_message ?? JSON.stringify(j).slice(0, 300)}`);
    }
  }
  throw new Error(`${label} job still ${"QUEUED/PROCESSING"} after 5 min`);
}

const existingAds = getAll(`/ad_accounts/${ACCOUNT}/ads`);
const existingPosts = getAll(`/profiles/${PROFILE}/structured_posts`);
log(`account has ${existingAds.length} ads and ${existingPosts.length} posts`);

if (ACTIVATE) {
  const mine = existingAds.filter((a) => CREATIVES.some((c) => c.name === a.name));
  log(`activating ${mine.length} ads`);
  for (const a of mine) {
    if (a.configured_status === "ACTIVE") { log(`  already active ${a.name}`); continue; }
    const r = patch(`/ads/${a.id}`, { configured_status: "ACTIVE" });
    log(`  ${a.name} -> ${r.data?.configured_status ?? JSON.stringify(r).slice(0, 160)}`);
  }
  process.exit(0);
}

for (const c of CREATIVES) {
  const already = existingAds.find((a) => a.name === c.name);
  if (already) { log(`skip ${c.name}, ad ${already.id} exists`); continue; }
  if (!LIVE) { log(`DRY  would create ${c.type} post + ad "${c.name}"`); continue; }

  // A post created by an earlier failed run is undeletable, so match on the utm_content
  // baked into the destination before creating another one.
  let postId = existingPosts.find((p) =>
    JSON.stringify(p).includes(`utm_content=${c.id}`))?.id;

  if (postId) {
    log(`reusing post ${postId} for ${c.name}`);
  } else {
    const creative = {
      type: c.type,
      headline: c.headline,
      destination: { type: "URL", url: utm(c.id), call_to_action: "Shop Now" },
    };
    if (c.type === "VIDEO") {
      creative.video = { media: { type: "URL", url: c.media } };
      creative.thumbnail = { media: { type: "URL", url: c.thumb } };
    } else {
      creative.image = { media: { type: "URL", url: c.media } };
    }
    const job = post(`/profiles/${PROFILE}/structured_posts/jobs`, { allow_comments: true, creative });
    const jobId = job.data?.id ?? job.data?.job_id;
    if (!jobId) throw new Error(`${c.name} job submit: ${JSON.stringify(job).slice(0, 400)}`);
    log(`${c.name} job ${jobId}`);
    postId = await waitJob(jobId, c.name);
    log(`${c.name} post ${postId}`);
  }

  const ad = post(`/ad_accounts/${ACCOUNT}/ads`, {
    ad_group_id: AD_GROUP,
    name: c.name,
    post_id: postId,
    configured_status: "PAUSED",
    type: "UNSPECIFIED",
  });
  const adId = ad.data?.id;
  if (!adId) throw new Error(`${c.name} ad create: ${JSON.stringify(ad).slice(0, 400)}`);
  log(`${c.name} ad ${adId} PAUSED`);
}

log(LIVE ? "done, re-run with --activate to go live" : "dry run only, re-run with --live");
