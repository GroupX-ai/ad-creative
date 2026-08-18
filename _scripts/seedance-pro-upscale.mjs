#!/usr/bin/env node
// Re-upscale a 720p Seedance master with the PRO enhancement tier.
//
//   node _scripts/seedance-pro-upscale.mjs <id-720p.mp4> [...]
//
// The standard tier ($0.0072/s) is what every batch used by default and it reads
// soft on close faces; pro is 10x the cost ($0.072/s, ~$1.08 per 15s clip) and is
// used deliberately, per the playbook, when sharpness is the complaint. Output
// OVERWRITES the sibling <id>-1080p.mp4 so the caption tooling's id derivation
// (which strips only -480p/-1080p suffixes) keeps working.
//
// The upscaler needs a hosted URL, so each local master is first pushed to fal
// storage (same route the Postiz/TikTok uploads use).

import { readFile, writeFile } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");
const headers = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

async function hostOnFal(file) {
  const init = await fetch("https://rest.alpha.fal.ai/storage/upload/initiate", {
    method: "POST", headers,
    body: JSON.stringify({ content_type: "video/mp4", file_name: path.basename(file) }),
  });
  if (!init.ok) throw new Error(`initiate ${init.status}: ${await init.text()}`);
  const { file_url, upload_url } = await init.json();
  const put = await fetch(upload_url, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4" },
    body: await readFile(file),
  });
  if (!put.ok) throw new Error(`put ${put.status}`);
  return file_url;
}

async function run(input, label) {
  const submit = await fetch("https://queue.fal.run/fal-ai/bytedance-upscaler/upscale/video", {
    method: "POST", headers, body: JSON.stringify(input),
  });
  if (!submit.ok) throw new Error(`${label} submit ${submit.status}: ${await submit.text()}`);
  const { status_url, response_url } = await submit.json();
  for (let i = 0; i < 200; i++) {
    await sleep(5000);
    const st = await (await fetch(status_url, { headers })).json();
    if (st.status === "COMPLETED") return (await (await fetch(response_url, { headers })).json());
    if (st.status === "FAILED" || st.status === "ERROR") throw new Error(`${label} FAILED: ${JSON.stringify(st).slice(0, 400)}`);
  }
  throw new Error(`${label} timed out`);
}

for (const f of process.argv.slice(2)) {
  const out = f.replace(/-720p\.mp4$/, "-1080p.mp4");
  if (out === f) { console.error(`skip ${f}: expected a -720p.mp4 master`); continue; }
  log(`${path.basename(f)} -> hosting`);
  const url = await hostOnFal(f);
  const res = await run(
    { video_url: url, target_resolution: "1080p", target_fps: "30fps", enhancement_tier: "pro" },
    path.basename(f),
  );
  const outUrl = res.video?.url;
  if (!outUrl) throw new Error(`${f}: no video url in ${JSON.stringify(res).slice(0, 300)}`);
  const r = await fetch(outUrl);
  if (!r.ok) throw new Error(`download ${r.status}`);
  await writeFile(out, Buffer.from(await r.arrayBuffer()));
  log(`saved ${out} (${(statSync(out).size / 1e6).toFixed(1)} MB, pro tier)`);
}
