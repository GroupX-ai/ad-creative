// Render the weird-animal u6-rabbit variants. 720p per the playbook ("buy fewer, sharper"),
// 15s, 9:16, then upscale each master to 1080p. Gated on the locale linter, which is what
// stops a prompt that has not named its market from ever reaching fal.
import { ADS } from "./prompts-video.mjs";
import { scanPrompt } from "../../_scripts/seedance-locale.mjs";
import { writeFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");
const OUT = new URL("./", import.meta.url).pathname;
const T2V = "bytedance/seedance-2.5/text-to-video";
const UPSCALER = "fal-ai/bytedance-upscaler/upscale/video";
const headers = { Authorization: "Key " + KEY, "Content-Type": "application/json" };
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

const bad = ADS.filter((a) => { const r = scanPrompt(a.prompt); return !r.hasLocale || r.hard.length; });
if (bad.length) { console.error("Refusing to spend, no locale block:", bad.map((a) => a.id).join(", ")); process.exit(1); }

const secs = 15, [w, h] = [720, 1280];
log(`${ADS.length} clips · 15s · 720p · est $${(((w*h*secs*24)/1024/1000)*0.0214*ADS.length).toFixed(2)} + upscale $${(0.0072*secs*ADS.length).toFixed(2)}`);

async function run(model, input, label) {
  const sub = await fetch(`https://queue.fal.run/${model}`, { method: "POST", headers, body: JSON.stringify(input) });
  if (!sub.ok) throw new Error(`${label} submit ${sub.status}: ${(await sub.text()).slice(0, 300)}`);
  const { request_id, status_url, response_url } = await sub.json();
  log(`${label} queued ${request_id}`);
  let last = "";
  for (let i = 0; i < 400; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const s = await fetch(status_url, { headers });
    if (!s.ok) continue;
    const st = await s.json();
    if (st.status !== last) { log(`${label} ${st.status}`); last = st.status; }
    if (st.status === "COMPLETED") return (await fetch(response_url, { headers })).json();
    if (st.status === "FAILED" || st.status === "ERROR") throw new Error(`${label} FAILED ${JSON.stringify(st).slice(0, 400)}`);
  }
  throw new Error(`${label} timed out`);
}
async function download(url, dest) {
  const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
  await writeFile(dest, Buffer.from(await r.arrayBuffer()));
  log(`saved ${dest.split("/").pop()} (${(statSync(dest).size / 1e6).toFixed(1)} MB)`);
}
async function pool(items, limit, fn) {
  const out = new Array(items.length); let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) { const i = next++;
      try { out[i] = { ok: true, value: await fn(items[i]) }; }
      catch (e) { out[i] = { ok: false, id: items[i].id, reason: String(e).slice(0, 300) }; } }
  }));
  return out;
}

const results = await pool(ADS, 4, async (ad) => {
  const raw = OUT + ad.id + "-720p.mp4", final = OUT + ad.id + "-1080p.mp4";
  if (existsSync(final)) { log(`${ad.id} already on disk, skipping`); return { id: ad.id, skipped: true }; }
  const out = await run(T2V, { prompt: ad.prompt, resolution: "720p", duration: ad.duration,
    aspect_ratio: ad.aspect_ratio, generate_audio: true }, ad.id);
  const url = out.video?.url; if (!url) throw new Error("no video url");
  log(`${ad.id} generated · seed ${out.seed}`);
  await download(url, raw);
  try {
    const up = await run(UPSCALER, { video_url: url, target_resolution: "1080p", target_fps: "30fps",
      enhancement_tier: "standard" }, `${ad.id}:upscale`);
    if (up.video?.url) await download(up.video.url, final);
  } catch (e) { log(`${ad.id} upscale failed, keeping 720p master: ${String(e).slice(0, 160)}`); }
  return { id: ad.id, seed: out.seed, sourceUrl: url };
});

await writeFile(OUT + "run-log.json", JSON.stringify({ model: T2V, resolution: "720p", duration: 15, results }, null, 2));
log(`done · ${results.filter((r) => r.ok).length} ok · ${results.filter((r) => !r.ok).length} failed`);
for (const r of results.filter((x) => !x.ok)) console.error("FAILED:", r.id, r.reason);
