// Step 2 of the 15s-with-sound pipeline: animate each padded banner on Kling 2.5 Turbo Pro.
//
// The prompt here is deliberately NOT the one from the silent batch. That one spends most of
// its words forbidding movement so the typography survives, and the result was three animals
// with their mouths clamped shut, which is useless when the whole point is that you SEE the
// animal make the noise. assemble.py now repaints the text every frame, so text safety is no
// longer the prompt's job and the whole budget goes to the mouth.
//
//   node esacard/2026-08-22-banner-motion-sound/generate.mjs
//   node esacard/2026-08-22-banner-motion-sound/generate.mjs --only duck
//
// Reads src-<name>.jpg (already padded to 1080x1920), writes raw-<name>.mp4 (10s, silent).

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY missing");
const DIR = path.dirname(new URL(import.meta.url).pathname);
const onlyArg = process.argv.indexOf("--only");
const only = onlyArg > -1 ? process.argv[onlyArg + 1].split(",").map((s) => s.trim()) : null;

// LOCALE: United States. The cast is fixed by the source banner, but the market is named
// anyway, per the blocking rule in CLAUDE.md.
const HOLD =
  "The camera is locked off: no zoom, no push-in, no pan, no tilt, no drift. The animal stays " +
  "in exactly the same spot at exactly the same size and never walks out of, or across, the " +
  "frame. The flat cream background stays flat and empty. Add no text, no logo, no caption, " +
  "no watermark.";

export const PROMPTS = {
  alligator:
    "United States market advertisement. A small young alligator standing on a flat cream " +
    "background. THE HERO ACTION: he opens his jaws WIDE, twice, in a big unmistakable hiss, " +
    "the whole mouth parting to show the pale inside, holding open for a beat, then closing. " +
    "Between the two hisses he blinks his golden eye and his flank swells as he breathes. " +
    "Clear, obvious, deliberate mouth movement. " + HOLD,
  duck:
    "United States market advertisement. An Indian runner duck standing upright on a flat " +
    "cream background. THE HERO ACTION: he opens his orange beak WIDE, twice, in a big " +
    "unmistakable quack, head tipping back slightly with each one, beak parting clearly then " +
    "snapping shut. Between the quacks he blinks and his head bobs on his long neck. Clear, " +
    "obvious, deliberate beak movement, facing the camera throughout. " + HOLD,
  cat:
    "United States market advertisement. A brown tabby cat sitting upright on a flat cream " +
    "background. THE HERO ACTION: she opens her mouth WIDE, twice, in a big unmistakable meow, " +
    "jaw dropping clearly to show her mouth, held for a beat, then closing. Between the meows " +
    "she blinks slowly and her ears swivel. Clear, obvious, deliberate mouth movement, facing " +
    "the camera throughout. " + HOLD,
};

const NEG =
  "camera movement, zoom, pan, push in, parallax, text, letters, words, captions, watermark, " +
  "logo, flickering, cartoon, blur, low quality, animal walking or leaving frame, mouth " +
  "staying closed";

async function run(body) {
  const s = await fetch("https://queue.fal.run/fal-ai/kling-video/v2.5-turbo/pro/image-to-video", {
    method: "POST", headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const q = await s.json();
  if (!q.request_id) throw new Error("submit " + s.status + " " + JSON.stringify(q).slice(0, 200));
  for (let i = 0; i < 200; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    const st = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (st.status === "COMPLETED") return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (st.status === "FAILED") throw new Error("failed " + JSON.stringify(st).slice(0, 200));
  }
  throw new Error("timeout");
}

const picked = Object.entries(PROMPTS).filter(([k]) => !only || only.includes(k));
console.log("running: " + picked.map(([k]) => k).join(", "));

await Promise.all(picked.map(async ([k, prompt]) => {
  try {
    const img = "data:image/jpeg;base64," + (await readFile(path.join(DIR, `src-${k}.jpg`))).toString("base64");
    const d = await run({ prompt, image_url: img, duration: "10", cfg_scale: 0.5, negative_prompt: NEG });
    const u = d.video?.url || d.videos?.[0]?.url;
    if (!u) throw new Error("no url in " + JSON.stringify(d).slice(0, 200));
    await writeFile(path.join(DIR, `raw-${k}.mp4`), Buffer.from(await (await fetch(u)).arrayBuffer()));
    console.log("OK  ", k);
  } catch (e) { console.log("FAIL", k, String(e).slice(0, 180)); }
}));
