import { CONCEPTS } from "./prompts.mjs";
import { writeFile } from "node:fs/promises";
const KEY = process.env.FAL_KEY;
const OUT = new URL("./", import.meta.url).pathname;
const SHAPES = [["square","square_hd"],["landscape","landscape_4_3"]];

async function gen(prompt, size) {
  const sub = await fetch("https://queue.fal.run/openai/gpt-image-2", {
    method: "POST",
    headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, image_size: size, quality: "high", num_images: 1 }),
  });
  const q = await sub.json();
  if (!q.request_id) throw new Error("submit failed: " + JSON.stringify(q).slice(0,300));
  // Use the URLs fal returns; the model path and the requests path differ.
  for (let i = 0; i < 150; i++) {
    await new Promise(r => setTimeout(r, 4000));
    const s = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (s.status === "COMPLETED") {
      const d = await (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
      return d.images?.[0]?.url;
    }
    if (s.status === "FAILED") throw new Error("render failed: " + JSON.stringify(s).slice(0,300));
  }
  throw new Error("timeout");
}

const log = [];
await Promise.all(CONCEPTS.flatMap(c => SHAPES.map(async ([shape, size]) => {
  try {
    const url = await gen(c.prompt, size);
    if (!url) throw new Error("no url");
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    const file = `${c.id}-${shape}.png`;
    await writeFile(OUT + file, buf);
    log.push({ concept: c.id, family: c.family, shape, size, file, bytes: buf.length });
    console.log("OK  ", file, (buf.length/1024).toFixed(0) + "KB");
  } catch (e) {
    log.push({ concept: c.id, shape, error: String(e).slice(0,200) });
    console.log("FAIL", c.id, shape, String(e).slice(0,160));
  }
})));
await writeFile(OUT + "run-log.json", JSON.stringify(log, null, 1));
console.log("\nrendered:", log.filter(x=>!x.error).length, "of", CONCEPTS.length*SHAPES.length);
