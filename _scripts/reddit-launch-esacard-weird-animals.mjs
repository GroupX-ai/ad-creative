#!/usr/bin/env node
// Add the weird-animals batch to the live ESA Card Reddit ad group.
//
//   node _scripts/reddit-launch-esacard-weird-animals.mjs             # dry run, prints the plan
//   node _scripts/reddit-launch-esacard-weird-animals.mjs --live      # create posts + ads (PAUSED)
//   node _scripts/reddit-launch-esacard-weird-animals.mjs --activate  # flip the new ads ACTIVE
//
// Same shape as reddit-launch-esacard-heart-tug.mjs, which is the corrected launcher: it reuses
// the live ad group (the optimisation goal is immutable, so a new group would reset Purchase
// learning), polls the real job enum, follows pagination.next_url, and keys idempotency off the
// utm_content baked into each post's destination.
//
// Two things specific to this batch:
//
//   1. Media is served from fal, never raw.githubusercontent.com. Reddit fetches the URL itself
//      and GitHub's CDN served a stale blob for several minutes after a merge on 2026-08-18,
//      which would silently ship the wrong cut. fal URLs are content-addressed per upload.
//   2. The ids are prefixed img-/vid- because w3 is the raven as a banner and the hedgehog as a
//      video. Bare w-numbers would collide in utm_content and merge two animals in one report row.
//
// Node's fetch cannot reach reddit from this environment (undici ignores HTTPS_PROXY and the
// egress policy answers 403), so every call shells out to curl.

import { execFileSync } from "node:child_process";

const ACCOUNT = "a2_ji9rrnreyf0d";
const PROFILE = "t2_2kl3hjgu1c";
const AD_GROUP = "2570690648253263407"; // ESA | Pet + Housing | Purchase, live, $30/day
const API = "https://ads-api.reddit.com/api/v3";
const UA = "server:momentum-labs-ads:v1.0.0 (by /u/SchemeFearless5307)";

const LIVE = process.argv.includes("--live");
const ACTIVATE = process.argv.includes("--activate");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

// Its own utm_campaign, not the pet-housing one the other 60 ads carry. Weird animals is a
// controlled test and has to be readable as its own row in Stripe metadata.
const utm = (id) =>
  "https://www.esacard.com/?utm_source=reddit&utm_medium=paid_social" +
  `&utm_campaign=esa-card-reddit-weird-animals&utm_content=${id}`;

// The headline IS the Reddit post title, read in the feed above the media.
//
// Videos use the clip's own opening line verbatim, which is the pattern the live d/e/h ads use.
// Banners get one line each, every one of them inside the approved bank: the card, the photo on
// it, about three minutes, $39 once, no subscription. Nothing about housing, landlords, access,
// travel, therapists or legal standing, and no disclaimer anywhere (docs/ads/policy.md §0).
const CREATIVES = [
  // ---- 10 banners, square, the p2-offer and p6-forever layouts ----
  { id: "img-w1-turtle-square", name: "ESA IMG w1-turtle-square", type: "IMAGE",
    headline: "He is a turtle and he has better ID than I do.",
    media: "https://v3b.fal.media/files/b/0aa715db/ueMvmMQb1G3DERCM5cdBy_w1-turtle-square.png" },
  { id: "img-w2-alligator-square", name: "ESA IMG w2-alligator-square", type: "IMAGE",
    headline: "Everyone asks about him. Now he has a card with his photo on it.",
    media: "https://v3b.fal.media/files/b/0aa715db/iUUNMTGnRXEIYvMk1n50d_w2-alligator-square.png" },
  { id: "img-w3-raven-square", name: "ESA IMG w3-raven-square", type: "IMAGE",
    headline: "The raven has a card with his photo on it. $39, once.",
    media: "https://v3b.fal.media/files/b/0aa715db/i_OEnI472l-RGzPz0CL1v_w3-raven-square.png" },
  { id: "img-w4-snake-square", name: "ESA IMG w4-snake-square", type: "IMAGE",
    headline: "She is a ball python. She has a card with her photo on it.",
    media: "https://v3b.fal.media/files/b/0aa715db/E_G06NDmrvIdTA57iSnxQ_w4-snake-square.png" },
  { id: "img-w5-pig-square", name: "ESA IMG w5-pig-square", type: "IMAGE",
    headline: "He is a pot-bellied pig and he has his own ID card.",
    media: "https://v3b.fal.media/files/b/0aa715db/yfPPoADk0rP7QkWTxrwuQ_w5-pig-square.png" },
  { id: "img-w6-egg-square", name: "ESA IMG w6-egg-square", type: "IMAGE",
    headline: "$39 once. No subscription, ever.",
    media: "https://v3b.fal.media/files/b/0aa715db/Lgkt0dVrWf-FlxQOV_i5q_w6-egg-square.png" },
  { id: "img-w7-hedgehog-square", name: "ESA IMG w7-hedgehog-square", type: "IMAGE",
    headline: "Three minutes, and the hedgehog has a card with her photo on it.",
    media: "https://v3b.fal.media/files/b/0aa715db/8YfDlHE8qZcef5uwhuhJ2_w7-hedgehog-square.png" },
  { id: "img-w8-chicken-square", name: "ESA IMG w8-chicken-square", type: "IMAGE",
    headline: "The hen has a card with her photo on it now.",
    media: "https://v3b.fal.media/files/b/0aa715ef/R-9Tt0rM15UmMaDaKuxcV_w8-chicken-square.png" },
  { id: "img-w9-axolotl-square", name: "ESA IMG w9-axolotl-square", type: "IMAGE",
    headline: "The axolotl has a card with his photo on it.",
    media: "https://v3b.fal.media/files/b/0aa715dc/dAOUZwjQ80tIXPrwQu3t0_w9-axolotl-square.png" },
  { id: "img-w10-cockatoo-square", name: "ESA IMG w10-cockatoo-square", type: "IMAGE",
    headline: "She screams at the mailman and she has better ID than I do.",
    media: "https://v3b.fal.media/files/b/0aa715dc/QKJr2UsYwLLbc23Lzftfa_w10-cockatoo-square.png" },

  // ---- 7 videos, the frozen u6-rabbit script with the animal swapped ----
  { id: "vid-w1-turtle", name: "ESA VID w1-turtle", type: "VIDEO",
    headline: "Registered my turtle for his emotional support animal card this morning.",
    media: "https://v3b.fal.media/files/b/0aa715dc/k98-Ljv1D9NS_ZxonDVF2_w1-turtle-1080p-captioned.mp4",
    thumb: "https://v3b.fal.media/files/b/0aa715dd/a2q0joSVDgnb408B-JnOd_w1-turtle-thumb.jpg" },
  { id: "vid-w2-alligator", name: "ESA VID w2-alligator", type: "VIDEO",
    headline: "Registered my alligator for his emotional support animal card this morning.",
    media: "https://v3b.fal.media/files/b/0aa715dd/YA5e9DiFFilKCNoEVlLyX_w2-alligator-1080p-captioned.mp4",
    thumb: "https://v3b.fal.media/files/b/0aa715de/d8sTq2lSrR9wso-fWtrui_w2-alligator-thumb.jpg" },
  { id: "vid-w3-hedgehog", name: "ESA VID w3-hedgehog", type: "VIDEO",
    headline: "Registered my hedgehog for her emotional support animal card this morning.",
    media: "https://v3b.fal.media/files/b/0aa715de/IhNW2NGTv0yxzwzQFIuhH_w3-hedgehog-1080p-captioned.mp4",
    thumb: "https://v3b.fal.media/files/b/0aa715f3/F2PUaT-vzWsslggGxRcMJ_w3-hedgehog-thumb.jpg" },
  { id: "vid-w4-chicken", name: "ESA VID w4-chicken", type: "VIDEO",
    headline: "Registered my chicken for her emotional support animal card this morning.",
    media: "https://v3b.fal.media/files/b/0aa715df/vzxmvG3L1rm1t_988Wyp7_w4-chicken-1080p-captioned.mp4",
    thumb: "https://v3b.fal.media/files/b/0aa715e0/H_myrog7pvUf5UYy8HQOO_w4-chicken-thumb.jpg" },
  { id: "vid-w5-raven", name: "ESA VID w5-raven", type: "VIDEO",
    headline: "Registered my raven for his emotional support animal card this morning.",
    media: "https://v3b.fal.media/files/b/0aa715e0/SKJJzd-d6Vht0zrX0mrJE_w5-raven-1080p-captioned.mp4",
    thumb: "https://v3b.fal.media/files/b/0aa715f5/3Mx93JVn0AoeyOyjcdFFk_w5-raven-thumb.jpg" },
  { id: "vid-w6-snake", name: "ESA VID w6-snake", type: "VIDEO",
    headline: "Registered my snake for her emotional support animal card this morning.",
    media: "https://v3b.fal.media/files/b/0aa715e1/sS0GB8fB37ymv5fESraOT_w6-snake-1080p-captioned.mp4",
    thumb: "https://v3b.fal.media/files/b/0aa715e2/Wy5Wz5_zwhbhOcNHp71LQ_w6-snake-thumb.jpg" },
  { id: "vid-w7-dog-and-human", name: "ESA VID w7-dog-and-human", type: "VIDEO",
    headline: "Registered myself for my emotional support animal card this morning.",
    media: "https://v3b.fal.media/files/b/0aa715e3/m8uPv6bwtd1FEtMphWtm7_w7-dog-and-human-1080p-captioned.mp4",
    thumb: "https://v3b.fal.media/files/b/0aa715e3/o3qyZ9W8_xFn7AV1aq1ma_w7-dog-and-human-thumb.jpg" },
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

const get = (path) => JSON.parse(curl([...auth, path.startsWith("http") ? path : API + path]));
const post = (path, body) => JSON.parse(curl([...auth, "-X", "POST", API + path, "-d", JSON.stringify({ data: body })]));
const patch = (path, body) => JSON.parse(curl([...auth, "-X", "PATCH", API + path, "-d", JSON.stringify({ data: body })]));

// List endpoints cap at 50 rows and hand back pagination.next_url. Follow it or the idempotency
// check below silently misses everything past the first page and creates duplicates. Nothing on
// Reddit can be deleted.
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
  throw new Error(`${label} job still queued/processing after 5 min`);
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

  // A post created by an earlier failed run is undeletable, so match on the utm_content baked
  // into the destination before creating another one.
  let postId = existingPosts.find((p) => JSON.stringify(p).includes(`utm_content=${c.id}`))?.id;

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
