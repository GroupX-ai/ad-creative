#!/usr/bin/env node
// Generate the 2026-08-08 Seedance 2.5 video ads on fal, then upscale to 1080p.
//
//   node _scripts/seedance-generate.mjs            # generate 30s @ 480p, all three
//   node _scripts/seedance-generate.mjs --only 1lookup-c3-ghost-leads
//   node _scripts/seedance-generate.mjs --duration 30 --resolution 480p
//   node _scripts/seedance-generate.mjs --upscale-only
//
// Cost model (fal, 2026-08-08): $0.0214 per 1000 tokens, tokens = w*h*duration*24/1024.
//   480p 30s = $6.17   720p 30s = $13.87   1080p upscale = $0.0072/s = $0.22 per 30s.

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");

const T2V = "bytedance/seedance-2.5/text-to-video";
const UPSCALER = "fal-ai/bytedance-upscaler/upscale/video";
const ROOT = path.resolve(import.meta.dirname, "..");

const argv = process.argv.slice(2);
const flag = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i === -1 ? d : argv[i + 1];
};
const has = (n) => argv.includes(`--${n}`);

const DURATION = flag("duration", "30");
const RESOLUTION = flag("resolution", "480p");
const ONLY = flag("only", null);
const BATCH = flag("batch", "2026-08-08-seedance-video");
const CONCURRENCY = Number(flag("concurrency", "5"));
const { ADS } = await import(`./${flag("prompts", "seedance-prompts.mjs")}`);

const DIMS = { "480p": [480, 854], "720p": [720, 1280] };
const cost = (res, secs) => {
  const [w, h] = DIMS[res];
  return ((w * h * secs * 24) / 1024 / 1000) * 0.0214;
};

const headers = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

// Submit to the fal queue, poll to completion, return the payload.
async function run(model, input, label) {
  const submit = await fetch(`https://queue.fal.run/${model}`, {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });
  if (!submit.ok) throw new Error(`${label} submit ${submit.status}: ${await submit.text()}`);
  const { request_id, status_url, response_url } = await submit.json();
  log(`${label} queued  ${request_id}`);

  let last = "";
  for (let i = 0; i < 400; i++) {
    await sleep(5000);
    const s = await fetch(status_url, { headers });
    if (!s.ok) {
      log(`${label} status ${s.status}, retrying`);
      continue;
    }
    const st = await s.json();
    if (st.status !== last) {
      log(`${label} ${st.status}`);
      last = st.status;
    }
    if (st.status === "COMPLETED") {
      const r = await fetch(response_url, { headers });
      if (!r.ok) throw new Error(`${label} result ${r.status}: ${await r.text()}`);
      return r.json();
    }
    if (st.status === "FAILED" || st.status === "ERROR") {
      throw new Error(`${label} FAILED: ${JSON.stringify(st).slice(0, 800)}`);
    }
  }
  throw new Error(`${label} timed out after ~33 min`);
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download ${r.status} ${url}`);
  await writeFile(dest, Buffer.from(await r.arrayBuffer()));
  const mb = (await import("node:fs")).statSync(dest).size / 1e6;
  log(`saved ${path.relative(ROOT, dest)} (${mb.toFixed(1)} MB)`);
  return dest;
}

const ads = ADS.filter((a) => !ONLY || a.id === ONLY);
const secs = Number(DURATION);

log(
  `${ads.length} ad(s) · ${DURATION}s · ${RESOLUTION} · est generate $${(
    cost(RESOLUTION, secs) * ads.length
  ).toFixed(2)} + upscale $${(0.0072 * secs * ads.length).toFixed(2)}`,
);

// Run at most CONCURRENCY jobs at once: a 14-clip batch fired all at once risks
// throttling, and a rate-limit rejection after generation would waste real money.
async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        try { out[i] = { status: "fulfilled", value: await fn(items[i]) }; }
        catch (e) { out[i] = { status: "rejected", reason: e }; }
      }
    }),
  );
  return out;
}

const results = await pool(ads, CONCURRENCY, (async (ad) => {
    const dir = path.join(ROOT, ad.company, BATCH);
    await mkdir(dir, { recursive: true });
    const raw = path.join(dir, `${ad.id}-${RESOLUTION}.mp4`);
    const final = path.join(dir, `${ad.id}-1080p.mp4`);

    let sourceUrl;
    if (has("upscale-only") && existsSync(raw)) {
      throw new Error("--upscale-only needs the hosted url; re-run generation instead");
    }

    const out = await run(
      T2V,
      {
        prompt: ad.prompt,
        resolution: RESOLUTION,
        duration: ad.duration ?? DURATION,
        aspect_ratio: ad.aspect_ratio,
        generate_audio: true,
      },
      ad.id,
    );
    sourceUrl = out.video?.url;
    if (!sourceUrl) throw new Error(`${ad.id}: no video url in ${JSON.stringify(out).slice(0, 400)}`);
    log(`${ad.id} generated · seed ${out.seed}`);
    await download(sourceUrl, raw);

    // Upscale the master to 1080p so it is upload-ready for Reels/Stories.
    let upscaled = null;
    try {
      const up = await run(
        UPSCALER,
        {
          video_url: sourceUrl,
          target_resolution: "1080p",
          target_fps: "30fps",
          enhancement_tier: "standard", // 'pro' is 10x the cost
        },
        `${ad.id}:upscale`,
      );
      const u = up.video?.url;
      if (u) upscaled = await download(u, final);
    } catch (e) {
      log(`${ad.id} upscale failed (keeping ${RESOLUTION} master): ${e.message.slice(0, 200)}`);
    }

    return { id: ad.id, company: ad.company, seed: out.seed, sourceUrl, raw, upscaled };
}));

const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
const bad = results.filter((r) => r.status === "rejected");

await writeFile(
  path.join(ROOT, "_scripts", `seedance-run-log-${BATCH}.json`),
  JSON.stringify(
    {
      ranAt: new Date().toISOString(),
      model: T2V,
      duration: DURATION,
      resolution: RESOLUTION,
      estimatedSpendUsd: Number((cost(RESOLUTION, secs) * ads.length + 0.0072 * secs * ok.length).toFixed(2)),
      ok,
      failed: bad.map((b) => String(b.reason).slice(0, 500)),
    },
    null,
    2,
  ),
);

log(`done · ${ok.length} ok · ${bad.length} failed`);
for (const b of bad) console.error("FAILED:", String(b.reason).slice(0, 500));
