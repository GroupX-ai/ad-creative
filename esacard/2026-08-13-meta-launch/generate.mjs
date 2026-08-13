import { BANNERS, VIDEOS } from "./prompts.mjs";
import { writeFile } from "node:fs/promises";
const KEY = process.env.FAL_KEY;
const OUT = new URL("./", import.meta.url).pathname;

async function run(model, payload, pollMs = 5000, maxTries = 200) {
  const sub = await fetch(`https://queue.fal.run/${model}`, {
    method: "POST",
    headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const q = await sub.json();
  if (!q.request_id) throw new Error("submit: " + JSON.stringify(q).slice(0, 300));
  for (let i = 0; i < maxTries; i++) {
    await new Promise(r => setTimeout(r, pollMs));
    const s = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "COMPLETED")
      return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "FAILED") throw new Error("failed: " + JSON.stringify(s).slice(0, 300));
  }
  throw new Error("timeout");
}

const log = [];
async function save(url, file) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(OUT + file, buf);
  return buf.length;
}

// Banners: square (feed) + vertical (stories / reels)
const SHAPES = [["square", "square_hd"], ["vertical", "portrait_16_9"]];
await Promise.all(BANNERS.flatMap(b => SHAPES.map(async ([shape, size]) => {
  try {
    const d = await run("openai/gpt-image-2",
      { prompt: b.prompt, image_size: size, quality: "high", num_images: 1 }, 4000);
    const url = d.images?.[0]?.url;
    if (!url) throw new Error("no url");
    const file = `${b.id}-${shape}.png`;
    const bytes = await save(url, file);
    log.push({ kind: "banner", id: b.id, shape, file, bytes });
    console.log("OK  banner", file, (bytes / 1024).toFixed(0) + "KB");
  } catch (e) {
    log.push({ kind: "banner", id: b.id, shape, error: String(e).slice(0, 200) });
    console.log("FAIL banner", b.id, shape, String(e).slice(0, 150));
  }
})));

// Video: Seedance 2.5, 15s, 720p, 9:16
await Promise.all(VIDEOS.map(async v => {
  try {
    const d = await run("bytedance/seedance-2.5/text-to-video",
      { prompt: v.prompt, aspect_ratio: "9:16", resolution: "720p", duration: 15 }, 10000, 200);
    const url = d.video?.url || d.videos?.[0]?.url;
    if (!url) throw new Error("no url in " + JSON.stringify(d).slice(0, 250));
    const file = `${v.id}.mp4`;
    const bytes = await save(url, file);
    log.push({ kind: "video", id: v.id, file, bytes });
    console.log("OK  video ", file, (bytes / 1024 / 1024).toFixed(1) + "MB");
  } catch (e) {
    log.push({ kind: "video", id: v.id, error: String(e).slice(0, 250) });
    console.log("FAIL video ", v.id, String(e).slice(0, 200));
  }
}));

await writeFile(OUT + "run-log.json", JSON.stringify(log, null, 1));
console.log("\ndone:", log.filter(x => !x.error).length, "of", BANNERS.length * 2 + VIDEOS.length);
