// Re-roll the three clips whose audio failed QA, with a targeted correction block appended.
//
// A re-roll is a coin flip (batch 12: two of four came back worse), so the prompt is hardened
// at the exact word that broke rather than resubmitted unchanged, and every original take is
// backed up in _takes/take1/ so a worse take can be discarded.
//
//   w1-turtle    "Registered" came back as a non-word ("Repegged" / "Repeditated", 2 engines)
//   w2-alligator "emotional support ANIMAL card" came back as "emotional support AMBLE card"
//   w5-raven     "emotional SUPPORT animal card" came back as "emotional RESCUE animal card"
import { ADS } from "./prompts-video.mjs";
import { writeFile } from "node:fs/promises";
import { statSync } from "node:fs";

const KEY = process.env.FAL_KEY;
const headers = { Authorization: "Key " + KEY, "Content-Type": "application/json" };
const OUT = new URL("./", import.meta.url).pathname;
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

const FIX = {
  "w1-turtle":
    " CORRECTION, READ THIS LAST AND OBEY IT: the very first word of the video is REGISTERED, " +
    "three syllables, REJ-iss-terd, the ordinary past tense of the verb to register, as in " +
    "\"I registered for a class\". Say it clearly and completely. It is never repegged, never " +
    "repeditated, never rehabilitated, never reintegrated and never any other word. The whole " +
    "first sentence is exactly: Registered my turtle for his emotional support animal card this morning.",
  "w2-alligator":
    " CORRECTION, READ THIS LAST AND OBEY IT: the word immediately after SUPPORT is ANIMAL, " +
    "AN-i-mal, three syllables, meaning a living creature such as a dog, a cat or an alligator. " +
    "It is never AMBLE, never AMPLE, never ANNUAL, never ANIMOL and never any other word. Say " +
    "the four words emotional support animal card slowly and completely separately every time.",
  "w5-raven":
    " CORRECTION, READ THIS LAST AND OBEY IT: the word between EMOTIONAL and ANIMAL is SUPPORT, " +
    "which rhymes with report. It is never RESCUE, never RESOURCE, never SERVICE and never any " +
    "other word. The exact four-word phrase is emotional support animal card. Also, the raven is " +
    "male throughout: say HIS emotional support animal card, and say \"Now HE HAS better ID\", " +
    "never \"her\" and never \"he have\".",
};

async function run(model, input, label) {
  const sub = await fetch(`https://queue.fal.run/${model}`, { method: "POST", headers, body: JSON.stringify(input) });
  if (!sub.ok) throw new Error(`${label} submit ${sub.status}: ${(await sub.text()).slice(0, 300)}`);
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
  throw new Error(`${label} timed out`);
}
async function download(url, dest) {
  const r = await fetch(url);
  await writeFile(dest, Buffer.from(await r.arrayBuffer()));
  log(`saved ${dest.split("/").pop()} (${(statSync(dest).size / 1e6).toFixed(1)} MB)`);
}

const targets = ADS.filter((a) => FIX[a.id]);
log(`re-rolling ${targets.length}: ${targets.map((a) => a.id).join(", ")} · est $${(6.93 * targets.length).toFixed(2)}`);
await Promise.all(targets.map(async (ad) => {
  try {
    const out = await run("bytedance/seedance-2.5/text-to-video",
      { prompt: ad.prompt + FIX[ad.id], resolution: "720p", duration: ad.duration,
        aspect_ratio: ad.aspect_ratio, generate_audio: true }, ad.id + ":take2");
    const url = out.video?.url; if (!url) throw new Error("no url");
    log(`${ad.id} take2 generated · seed ${out.seed}`);
    await download(url, OUT + ad.id + "-take2-720p.mp4");
    const up = await run("fal-ai/bytedance-upscaler/upscale/video",
      { video_url: url, target_resolution: "1080p", target_fps: "30fps", enhancement_tier: "standard" },
      ad.id + ":take2:upscale");
    if (up.video?.url) await download(up.video.url, OUT + ad.id + "-take2-1080p.mp4");
  } catch (e) { log(`${ad.id} take2 FAILED ${String(e).slice(0, 200)}`); }
}));
log("re-rolls done");
