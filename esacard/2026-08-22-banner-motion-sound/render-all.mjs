// Step 1 of the 32-banner batch: one 10s Kling clip per banner.
//
// Runs prep.py's padded src-all images through Kling 2.5 Turbo Pro. The prompt does NOT try to
// protect the typography: assemble-all.py repaints every glyph from the source banner on every
// frame, so the whole prompt budget goes to making the animal visibly make its noise. That
// swap is what took the first batch's animals from mouths-clamped-shut to actually opening.
//
//   node esacard/2026-08-22-banner-motion-sound/render-all.mjs
//   node esacard/2026-08-22-banner-motion-sound/render-all.mjs --only w3-raven-square
//   node esacard/2026-08-22-banner-motion-sound/render-all.mjs --missing     (retry failures)

import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { ANIMALS } from "./animals.mjs";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY missing");
const DIR = path.dirname(new URL(import.meta.url).pathname);
const argv = process.argv.slice(2);
const onlyIdx = argv.indexOf("--only");
const only = onlyIdx > -1 ? argv[onlyIdx + 1].split(",") : null;
const CONCURRENCY = 8;
const STRICT = argv.includes("--strict");
const DURATION = argv.includes("--5s") ? "5" : "10";

// LOCALE: United States. The cast is fixed by the source banner (these are US-market assets and
// the animal is already photographed), but the market is named anyway, per CLAUDE.md.
const HOLD =
  "United States market advertisement. The camera is locked off: no zoom, no push-in, no pan, " +
  "no tilt, no drift. The animal stays in exactly the same spot at exactly the same size and " +
  "never walks out of, or across, the frame. The background stays exactly as it is. Add no " +
  "text, no logo, no caption, no watermark.";

const NEG =
  "camera movement, zoom, pan, push in, parallax, text, letters, words, captions, watermark, " +
  "logo, flickering, cartoon, morphing, extra limbs, blur, low quality, animal walking or " +
  "leaving frame, mouth staying closed";

// Added after the first 32-clip pass. "THE HERO ACTION, impossible to miss" got the mouths
// open, but eight clips dramatised it by walking the animal toward the lens: it grew, rose up
// the frame and ended up behind the frozen headline, and on w2-alligator the camera itself
// crept in so the video's own copy of the type slid out from under the frozen copy and left two
// overlapping headlines. The action has to be confined to the head.
const CONTAIN =
  "CRITICAL: the animal must not approach the camera, must not get larger, must not rise up " +
  "the frame and must not lean forward out of its place. Its body, its feet and its distance " +
  "from the lens are fixed for the whole clip and it occupies exactly the same footprint in " +
  "the last frame as in the first. Only its head, mouth, eyes, ears and breathing move. It " +
  "never overlaps or touches the text above it.";

const prompt = (a, strict) =>
  `${HOLD} The subject is ${a.it}. THE HERO ACTION, clear and deliberate: it ${a.act}. ` +
  `Between the two, it breathes and blinks naturally. ${strict ? CONTAIN + " " : ""}` +
  `Lifelike, well lit, photographic.`;

async function run(body) {
  const s = await fetch("https://queue.fal.run/fal-ai/kling-video/v2.5-turbo/pro/image-to-video", {
    method: "POST", headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const q = await s.json();
  if (!q.request_id) throw new Error("submit " + s.status + " " + JSON.stringify(q).slice(0, 160));
  for (let i = 0; i < 220; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    const st = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (st.status === "COMPLETED") return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (st.status === "FAILED") throw new Error("failed " + JSON.stringify(st).slice(0, 160));
  }
  throw new Error("timeout");
}

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

let names = Object.keys(ANIMALS);
if (only) names = names.filter((n) => only.includes(n));
if (argv.includes("--missing")) {
  const keep = [];
  for (const n of names) if (!(await exists(path.join(DIR, "all", "raw", n + ".mp4")))) keep.push(n);
  names = keep;
}
console.log(`rendering ${names.length} clips, ${CONCURRENCY} at a time`);

let done = 0, failed = [];
const queue = [...names];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const n = queue.shift();
    try {
      const img = "data:image/jpeg;base64," + (await readFile(path.join(DIR, "all", "src", n + ".jpg"))).toString("base64");
      const d = await run({ prompt: prompt(ANIMALS[n], STRICT), image_url: img, duration: DURATION, cfg_scale: 0.5, negative_prompt: NEG });
      const u = d.video?.url || d.videos?.[0]?.url;
      if (!u) throw new Error("no url");
      await writeFile(path.join(DIR, "all", "raw", n + ".mp4"), Buffer.from(await (await fetch(u)).arrayBuffer()));
      console.log(`  ok   ${++done}/${names.length}  ${n}`);
    } catch (e) { failed.push(n); console.log(`  FAIL       ${n}  ${String(e).slice(0, 120)}`); }
  }
}));
console.log(failed.length ? "FAILED: " + failed.join(", ") : "all rendered");
