// Render the 2026-08-21 light batch batch from concepts.json (workflow output).
// Pattern copied from esacard/2026-08-19-weird-animals/gen-banners.mjs (proven pool:
// queue submit, poll, retry x4, blank-frame stddev check, skip files on disk).
// Square 1024x1024 and landscape 1200x624 (delivered 1200x628 by resize).
import { readFileSync, existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const KEY = process.env.FAL_KEY;
const OUT = new URL("./", import.meta.url).pathname;
const CONCEPTS = JSON.parse(readFileSync(OUT + "concepts.json", "utf8"));

async function run(payload) {
  const sub = await fetch("https://queue.fal.run/openai/gpt-image-2", { method: "POST",
    headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const q = await sub.json(); if (!q.request_id) throw new Error("submit " + JSON.stringify(q).slice(0, 200));
  for (let i = 0; i < 200; i++) {
    await new Promise(r => setTimeout(r, 4000));
    const s = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "COMPLETED") return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "FAILED") throw new Error("failed");
  }
  throw new Error("timeout");
}
const spread = (f) => Number(execFileSync("python3", ["-c",
  `from PIL import Image,ImageStat;print(sum(ImageStat.Stat(Image.open(${JSON.stringify(OUT + f)}).convert("L")).stddev))`]).toString().trim());

const SHAPES = [
  { name: "square", size: { width: 1024, height: 1024 }, key: "fal_prompt_square" },
  { name: "landscape", size: { width: 1200, height: 624 }, key: "fal_prompt_landscape" },
];
const jobs = CONCEPTS.flatMap(c => SHAPES.filter(s => c[s.key]).map(s => ({
  c, s, file: `1lookup-${c.id}-${s.name}-raw.png`,
}))).filter(j => !existsSync(OUT + j.file));
console.log("rendering", jobs.length, "banners");
await Promise.all(jobs.map(async j => {
  for (let a = 1; a <= 4; a++) {
    try {
      const d = await run({ prompt: j.c[j.s.key], image_size: j.s.size, quality: "high", output_format: "png", num_images: 1 });
      const url = d.images?.[0]?.url; if (!url) throw new Error("no url");
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      if (buf.length < 10000) throw new Error("short");
      await writeFile(OUT + j.file, buf);
      if (spread(j.file) < 8) throw new Error("blank frame");
      console.log("OK  ", j.file, (buf.length / 1024).toFixed(0) + "KB");
      return;
    } catch (e) { if (a === 4) console.log("FAIL", j.file, String(e).slice(0, 120)); }
  }
}));
console.log("renders done");
