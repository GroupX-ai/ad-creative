// Render the heart-tug batch (scripts 11-15) on Seedance 2.5.
//
//   node esacard/2026-08-18-heart-tug/generate.mjs [id ...]
//
// 15s, 9:16, 720p, native audio. Saves <id>-720p.mp4 so seedance-pro-upscale.mjs can write the
// sibling <id>-1080p.mp4 that the caption tooling derives its ad id from. Skips any clip whose
// master is already on disk, so a re-run after a partial failure never pays twice.

import { VIDEOS } from "../prompts-heart-tug.mjs";
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");
const OUT = new URL("./", import.meta.url).pathname;
const only = process.argv.slice(2);
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

async function run(payload, label) {
  const sub = await fetch("https://queue.fal.run/bytedance/seedance-2.5/text-to-video", {
    method: "POST",
    headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const q = await sub.json();
  if (!q.request_id) throw new Error("submit " + JSON.stringify(q).slice(0, 200));
  log(`${label} queued ${q.request_id}`);
  for (let i = 0; i < 250; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    const s = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "COMPLETED") {
      return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    }
    if (s.status === "FAILED" || s.status === "ERROR") {
      throw new Error(`${label} failed: ${JSON.stringify(s).slice(0, 300)}`);
    }
  }
  throw new Error(`${label} timed out`);
}

const todo = VIDEOS.filter((v) => (!only.length || only.includes(v.id)) && !existsSync(OUT + v.id + "-720p.mp4"));

// Same gate as the shared generator: no market named in the prompt, no render.
const { scanPrompt } = await import("../../_scripts/seedance-locale.mjs");
const bad = todo.filter((v) => { const r = scanPrompt(v.prompt); return !r.hasLocale || r.hard.length; });
if (bad.length) {
  console.error(`Refusing to spend: ${bad.map((v) => v.id).join(", ")} have no CAST AND LOCALE block or carry wrong-market vocabulary.`);
  process.exit(1);
}

log(`${todo.length} clip(s) to render, ~$6.94 each`);

await Promise.all(
  todo.map(async (v) => {
    try {
      const d = await run(
        { prompt: v.prompt, aspect_ratio: "9:16", resolution: "720p", duration: 15, generate_audio: true },
        v.id,
      );
      const url = d.video?.url || d.videos?.[0]?.url;
      if (!url) throw new Error("no url in " + JSON.stringify(d).slice(0, 200));
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      await writeFile(OUT + v.id + "-720p.mp4", buf);
      log(`OK   ${v.id} ${(buf.length / 1e6).toFixed(1)}MB seed ${d.seed ?? "?"}`);
    } catch (e) {
      log(`FAIL ${v.id} ${String(e).slice(0, 200)}`);
    }
  }),
);
