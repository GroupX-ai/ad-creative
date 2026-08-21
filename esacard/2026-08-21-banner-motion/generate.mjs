// Animate the two best-selling ESA Card Meta banners for TikTok.
//
// Robby, 2026-08-21: "most of the sales come from our banner ads. What if we take these
// banner ads and animate them (very lighly, just the animal) and then post these as TikTok
// ads?" TikTok has produced 0 sales on 14 video ads, so this tests the creative that IS
// selling on Meta rather than more of the creative that is not selling anywhere.
//
// The whole trick is restraint. These are motion posters, not videos: the layout, the
// typography and the button must not move or warp at all, and the ONLY thing alive in the
// frame is the animal. Every prompt below therefore spends most of its words on what must
// stay still, because an image-to-video model will happily invent a camera push-in and
// smear the headline while it is at it.
//
// No copy is written, changed or added here. The banners already carry approved claims and
// the model is told explicitly not to alter the text, so `docs/ads/policy.md` and the
// playbook's claim-safety rules are satisfied by construction: there is nothing new to claim.
//
//   node esacard/2026-08-21-banner-motion/generate.mjs
//   node esacard/2026-08-21-banner-motion/generate.mjs --only cat-kling

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY missing");
const DIR = path.dirname(new URL(import.meta.url).pathname);
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;

// LOCALE: United States. Both source banners are US-market assets and the cast is fixed by
// the source image (an American living room, a domestic tabby), so there is no casting
// decision for the model to guess at. Named anyway, per the blocking rule in CLAUDE.md.
const LOCALE = "United States market advertisement.";

const HOLD_STILL =
  "This is a static advertising poster and it must stay a static advertising poster. " +
  "The camera is locked off: absolutely no zoom, no push-in, no pull-back, no pan, no tilt, " +
  "no handheld drift, no parallax, no rack focus. The framing, crop and scale are identical " +
  "in the last frame and the first. Every word of text stays pixel-identical, perfectly sharp " +
  "and fully legible for the entire clip: do not re-render, re-letter, warp, slide, fade, " +
  "reflow, re-colour or animate any text, and do not add any new text, logo, caption, " +
  "watermark or graphic anywhere in the frame. The background, the layout and the button stay " +
  "exactly as they are.";

const CAT =
  `${LOCALE} A vertical advertising poster on a flat cream background: large dark navy ` +
  `typography, an orange line of text, a dark navy rounded button, and a brown tabby cat ` +
  `sitting upright in the lower left corner. ` +
  "THE ONLY THING THAT MOVES IN THE ENTIRE FRAME IS THE CAT. She blinks slowly once or twice, " +
  "her ears swivel a fraction, her whiskers and chest shift very slightly as she breathes, and " +
  "the very tip of her tail flicks gently against the floor. She remains sitting in exactly the " +
  "same spot at exactly the same size, facing the camera the whole time. She does not stand, " +
  "walk, lean, turn away, grow, shrink or drift across the frame, and no part of her ever " +
  "overlaps the text. Calm, subtle, lifelike, tiny movements only. " + HOLD_STILL;

const DOG =
  `${LOCALE} A vertical advertising photograph shot in a bright American living room: dark navy ` +
  `headline type at the top, an orange rounded button at the bottom, a pair of hands holding an ` +
  `open brown leather wallet in the lower left, a house plant and a pale armchair behind, and a ` +
  `border terrier sitting on the rug at the right. ` +
  "THE ONLY THING THAT MOVES IN THE ENTIRE FRAME IS THE DOG. He blinks, breathes gently, tilts " +
  "his head a couple of degrees and his ears shift very slightly, as if listening to the person " +
  "holding the wallet. He stays sitting in exactly the same place at exactly the same size and " +
  "never stands, steps, lies down or leaves the frame. The hands, the wallet, the card inside the " +
  "wallet, the plant, the chair and the rug are all completely frozen and do not move at all. " +
  "Calm, subtle, lifelike, tiny movements only. " + HOLD_STILL;

const NEG =
  "camera movement, zoom, pan, push in, dolly, parallax, warping text, distorted text, " +
  "morphing letters, changing words, new text, subtitles, captions, watermark, logo, " +
  "flickering, cartoon, animation, blur, low quality, the animal walking or leaving frame";

const BANNERS = {
  cat: { file: "p2-offer-vertical.jpg", prompt: CAT },
  dog: { file: "p1-carry-vertical.jpg", prompt: DOG },
};

// Three models, deliberately different bets on the same instruction.
const MODELS = {
  kling: {
    endpoint: "fal-ai/kling-video/v2.5-turbo/pro/image-to-video",
    body: (p, img) => ({ prompt: p, image_url: img, duration: "5", cfg_scale: 0.5, negative_prompt: NEG }),
  },
  seedance: {
    endpoint: "bytedance/seedance-2.5/image-to-video",
    body: (p, img) => ({ prompt: p, image_url: img, duration: "5", resolution: "1080p",
                         aspect_ratio: "9:16", generate_audio: false, bitrate_mode: "high" }),
  },
  veo: {
    endpoint: "fal-ai/veo3.1/image-to-video",
    body: (p, img) => ({ prompt: p, image_url: img, duration: "6s", resolution: "1080p",
                         aspect_ratio: "9:16", generate_audio: false, negative_prompt: NEG }),
  },
  // Seedance v1 pro is the one model here with an explicit `camera_fixed` switch, which is
  // exactly the thing every other prompt above has to beg for in words. Seedance 2.5 refused
  // both banners outright ("may contain likenesses of real people"), so v1 is the stand-in.
  seedance1: {
    endpoint: "fal-ai/bytedance/seedance/v1/pro/image-to-video",
    body: (p, img) => ({ prompt: p, image_url: img, duration: "5", resolution: "1080p",
                         aspect_ratio: "9:16", camera_fixed: true }),
  },
  hailuo: {
    endpoint: "fal-ai/minimax/hailuo-02/standard/image-to-video",
    body: (p, img) => ({ prompt: p, image_url: img, duration: "6", resolution: "768P",
                         prompt_optimizer: false }),
  },
};

async function dataUri(file) {
  const buf = await readFile(path.join(DIR, file));
  return "data:image/jpeg;base64," + buf.toString("base64");
}

async function run(endpoint, body) {
  const sub = await fetch("https://queue.fal.run/" + endpoint, {
    method: "POST", headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const q = await sub.json();
  if (!q.request_id) throw new Error("submit " + sub.status + " " + JSON.stringify(q).slice(0, 220));
  for (let i = 0; i < 180; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    const s = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "COMPLETED") return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "FAILED" || s.status === "ERROR") throw new Error("failed " + JSON.stringify(s).slice(0, 220));
  }
  throw new Error("timeout");
}

const jobs = [];
for (const [b, banner] of Object.entries(BANNERS))
  for (const [m, model] of Object.entries(MODELS))
    jobs.push({ id: `${b}-${m}`, banner, model });

const wanted = only ? new Set(only.split(",").map((x) => x.trim())) : null;
const picked = wanted ? jobs.filter((j) => wanted.has(j.id)) : jobs;

if (process.argv.includes("--print")) {
  for (const j of picked) console.log("\n=== " + j.id + " ===\n" + j.banner.prompt + "\n");
  process.exit(0);
}

console.log("running " + picked.length + " jobs: " + picked.map((j) => j.id).join(", "));

await Promise.all(picked.map(async (j) => {
  const t0 = Date.now();
  try {
    const img = await dataUri(j.banner.file);
    const d = await run(j.model.endpoint, j.model.body(j.banner.prompt, img));
    const url = d.video?.url || d.videos?.[0]?.url;
    if (!url) throw new Error("no url in " + JSON.stringify(d).slice(0, 200));
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    await writeFile(path.join(DIR, j.id + ".mp4"), buf);
    console.log(`OK   ${j.id.padEnd(14)} ${(buf.length / 1024 / 1024).toFixed(1)}MB  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  } catch (e) {
    console.log(`FAIL ${j.id.padEnd(14)} ${String(e).slice(0, 200)}`);
  }
}));
