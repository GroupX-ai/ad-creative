// Step 3: give every clip its animal's voice, synced.
//
// MMAudio reads the finished video and generates audio for it, so the noise tracks the mouth
// instead of being dropped on a timestamp someone guessed. The first batch guessed, and Robby's
// verdict was "the sounds they make are horrible and not synced with the visuals."
//
// Animals that are silent in real life (the cartoon egg, the tarantula) are skipped here and
// ship music-only. Inventing a noise for a spider is worse than leaving it quiet.
//
//   node esacard/2026-08-22-banner-motion-sound/audio-all.mjs
//   node esacard/2026-08-22-banner-motion-sound/audio-all.mjs --missing

import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import path from "node:path";
import { ANIMALS } from "./animals.mjs";

const KEY = process.env.FAL_KEY;
const DIR = path.dirname(new URL(import.meta.url).pathname);
const CONCURRENCY = 6;
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function upload(file, name) {
  const buf = await readFile(file);
  const init = await fetch("https://rest.alpha.fal.ai/storage/upload/initiate?storage_type=fal-cdn-v3", {
    method: "POST", headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ content_type: "video/mp4", file_name: name + ".mp4" }),
  });
  const j = await init.json();
  if (!j.upload_url) throw new Error("initiate " + init.status);
  const put = await fetch(j.upload_url, { method: "PUT", headers: { "Content-Type": "video/mp4" }, body: buf });
  if (!put.ok) throw new Error("put " + put.status);
  return j.file_url;
}

async function run(body) {
  const s = await fetch("https://queue.fal.run/fal-ai/mmaudio-v2", {
    method: "POST", headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const q = await s.json();
  if (!q.request_id) throw new Error("submit " + s.status + " " + JSON.stringify(q).slice(0, 150));
  for (let i = 0; i < 150; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const st = await (await fetch(q.status_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (st.status === "COMPLETED") return (await fetch(q.response_url, { headers: { Authorization: "Key " + KEY } })).json();
    if (st.status === "FAILED") throw new Error("failed");
  }
  throw new Error("timeout");
}

await mkdir(path.join(DIR, "all", "sfx"), { recursive: true });
let names = Object.keys(ANIMALS).filter((n) => ANIMALS[n].sound);
if (process.argv.includes("--missing")) {
  const keep = [];
  for (const n of names) if (!(await exists(path.join(DIR, "all", "sfx", n + ".mp4")))) keep.push(n);
  names = keep;
}
console.log(`generating sound for ${names.length} clips (${Object.keys(ANIMALS).length - names.length} are silent animals or already done)`);

const queue = [...names]; let done = 0; const failed = [];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const n = queue.shift();
    try {
      const url = await upload(path.join(DIR, "all", "silent", n + ".mp4"), n);
      const d = await run({
        video_url: url,
        prompt: `${ANIMALS[n].sound}, exactly when the mouth opens. Quiet room tone otherwise. One clean animal, no music, no people, no speech.`,
        negative_prompt: "music, speech, human voice, crowd, traffic, static, distortion",
        duration: 15, num_steps: 35, cfg_strength: 5.0,
      });
      const u = d.video?.url || d.audio?.url;
      if (!u) throw new Error("no url");
      await writeFile(path.join(DIR, "all", "sfx", n + ".mp4"), Buffer.from(await (await fetch(u)).arrayBuffer()));
      console.log(`  ok   ${++done}/${names.length}  ${n}`);
    } catch (e) { failed.push(n); console.log(`  FAIL       ${n}  ${String(e).slice(0, 120)}`); }
  }
}));
console.log(failed.length ? "FAILED: " + failed.join(", ") : "all sound generated");
