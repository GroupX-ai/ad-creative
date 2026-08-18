// Render banners N1 and N2 in the three shapes the ad platforms want.
//
//   node esacard/2026-08-18-heart-tug/gen-banners.mjs
//
// square 1:1 and landscape 1.91:1 for Google Demand Gen, portrait 4:5-ish for Reddit and the
// vertical placements. GPT Image 2, quality high, about $0.20 an image. Skips what is on disk.

import { BANNERS } from "./prompts-banners.mjs";
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");
const OUT = new URL("./", import.meta.url).pathname;

async function run(payload) {
  const sub = await fetch("https://queue.fal.run/openai/gpt-image-2", {
    method: "POST",
    headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const q = await sub.json();
  if (!q.request_id) throw new Error("submit " + JSON.stringify(q).slice(0, 150));
  for (let i = 0; i < 200; i++) {
    await new Promise((r) => setTimeout(r, 4000));
    const s = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "COMPLETED") {
      return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    }
    if (s.status === "FAILED" || s.status === "ERROR") throw new Error("failed");
  }
  throw new Error("timeout");
}

async function make(prompt, size, file) {
  if (existsSync(OUT + file)) return console.log("skip", file);
  for (let a = 1; a <= 3; a++) {
    try {
      const d = await run({ prompt, image_size: size, quality: "high", num_images: 1 });
      const url = d.images?.[0]?.url;
      if (!url) throw new Error("no url");
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      if (buf.length < 10000) throw new Error("short " + buf.length);
      await writeFile(OUT + file, buf);
      return console.log("OK  ", file, (buf.length / 1024).toFixed(0) + "KB");
    } catch (e) {
      if (a === 3) console.log("FAIL", file, String(e).slice(0, 120));
    }
  }
}

const SHAPES = [
  ["square_hd", "square"],
  ["landscape_16_9", "landscape"],
  ["portrait_4_3", "portrait"],
];

const jobs = BANNERS.flatMap((b) => SHAPES.map(([size, label]) => ({ prompt: b.prompt, size, file: `${b.id}-${label}.png` })));
console.log("rendering", jobs.length, "banners");
await Promise.all(jobs.map((j) => make(j.prompt, j.size, j.file)));
console.log("banners complete");
