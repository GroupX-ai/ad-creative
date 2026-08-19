// w5-raven, take 3. Take 1 said "emotional RESCUE animal card" (banned substitution, and a
// wrong product name); take 2 fixed that and then garbled the opening verb ("Reten tried" /
// "Rattan tried", two engines agreeing). This correction block names BOTH failures, because
// fixing one at a time is what let the second one through.
import { ADS } from "./prompts-video.mjs";
import { writeFile } from "node:fs/promises";
import { statSync } from "node:fs";
const KEY = process.env.FAL_KEY;
const headers = { Authorization: "Key " + KEY, "Content-Type": "application/json" };
const OUT = new URL("./", import.meta.url).pathname;
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);
const ad = ADS.find((a) => a.id === "w5-raven");

const FIX =
  " CORRECTION, READ THIS LAST AND OBEY IT. Two words in the first sentence have been said " +
  "wrong before and both must be exactly right this time. " +
  "FIRST WORD: the video opens on the word REGISTERED, three syllables, REJ-iss-terd, the " +
  "ordinary past tense of the verb to register, as in \"I registered for a class\". Say it as " +
  "one single clear word. It is never \"reten tried\", never \"rattan tried\", never two " +
  "separate words, never \"retinued\", never \"rented\" and never any other word. " +
  "SECOND WORD: the word between EMOTIONAL and ANIMAL is SUPPORT, which rhymes with report. " +
  "It is never RESCUE, never RESOURCE, never SERVICE and never any other word. " +
  "The first sentence, in full and exactly: Registered my raven for his emotional support " +
  "animal card this morning. The raven is male throughout: his, he, him.";

async function run(model, input, label) {
  const sub = await fetch(`https://queue.fal.run/${model}`, { method: "POST", headers, body: JSON.stringify(input) });
  if (!sub.ok) throw new Error(`${label} submit ${sub.status}`);
  const { status_url, response_url } = await sub.json();
  let last = "";
  for (let i = 0; i < 400; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const s = await fetch(status_url, { headers }); if (!s.ok) continue;
    const st = await s.json();
    if (st.status !== last) { log(`${label} ${st.status}`); last = st.status; }
    if (st.status === "COMPLETED") return (await fetch(response_url, { headers })).json();
    if (st.status === "FAILED" || st.status === "ERROR") throw new Error(`${label} FAILED`);
  }
  throw new Error("timeout");
}
const out = await run("bytedance/seedance-2.5/text-to-video",
  { prompt: ad.prompt + FIX, resolution: "720p", duration: ad.duration, aspect_ratio: ad.aspect_ratio, generate_audio: true },
  "w5-raven:take3");
log(`take3 generated · seed ${out.seed}`);
await writeFile(OUT + "w5-raven-take3-720p.mp4", Buffer.from(await (await fetch(out.video.url)).arrayBuffer()));
log(`saved w5-raven-take3-720p.mp4 (${(statSync(OUT + "w5-raven-take3-720p.mp4").size / 1e6).toFixed(1)} MB)`);
const up = await run("fal-ai/bytedance-upscaler/upscale/video",
  { video_url: out.video.url, target_resolution: "1080p", target_fps: "30fps", enhancement_tier: "standard" }, "w5-raven:take3:upscale");
if (up.video?.url) {
  await writeFile(OUT + "w5-raven-take3-1080p.mp4", Buffer.from(await (await fetch(up.video.url)).arrayBuffer()));
  log("saved w5-raven-take3-1080p.mp4");
}
log("take3 done");
