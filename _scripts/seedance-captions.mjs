#!/usr/bin/env node
// Burn TikTok-style one-word-at-a-time captions into a finished ad.
// One word, centred, held until the next word starts.
//
//   node _scripts/seedance-captions.mjs <video.mp4> <audio.mp3> [--out name.mp4]
//
// Word timings come from fal `elevenlabs/speech-to-text/scribe-v2` (~$0.008 per
// audio minute), which returns per-word start/end. Rendered with libass, so the
// captions are real subtitles burned to pixels, not model-generated text.

import { execFileSync, spawnSync } from "node:child_process";
import { BRAND, EMPHASIS, NUMBER_WORDS, adIdFromPath, companyFromPath } from "./seedance-emphasis.mjs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");

const FF = execFileSync("python3", ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"])
  .toString().trim();
const ROOT = path.resolve(import.meta.dirname, "..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const headers = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };

const [video, audio] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const outFlag = process.argv.indexOf("--out");
if (!video || !audio) throw new Error("usage: seedance-captions.mjs <video.mp4> <audio.mp3> [--out x.mp4]");
const out = outFlag !== -1 ? process.argv[outFlag + 1]
  : video.replace(/\.mp4$/, "-captioned.mp4");

// ---- 1. word timings -------------------------------------------------------
const uri = `data:audio/mpeg;base64,${(await readFile(audio)).toString("base64")}`;
const submit = await fetch("https://queue.fal.run/fal-ai/elevenlabs/speech-to-text/scribe-v2", {
  method: "POST", headers,
  body: JSON.stringify({ audio_url: uri, language_code: "eng" }),
});
if (!submit.ok) throw new Error(`transcribe submit ${submit.status}: ${await submit.text()}`);
const { status_url, response_url } = await submit.json();

let result = null;
for (let i = 0; i < 60; i++) {
  await sleep(3000);
  const st = await (await fetch(status_url, { headers })).json();
  if (st.status === "COMPLETED") { result = await (await fetch(response_url, { headers })).json(); break; }
  if (st.status === "FAILED" || st.status === "ERROR") throw new Error(`transcribe: ${JSON.stringify(st).slice(0, 300)}`);
}
if (!result) throw new Error("transcribe timed out");

const raw = (result.words ?? []).filter((w) => w.type === "word" && w.text.trim());
if (!raw.length) throw new Error("no words returned");

// Speech-to-text splits our one-word brand names in two ("Voice Drop",
// "Email Chaser"). A burned-in caption with the brand spelled wrong is worse
// than no caption, so rejoin the known pairs into a single correctly-cased word.
const BRAND_JOINS = [
  [["voice", "drop"], "VoiceDrop"],
  [["email", "chaser"], "Emailchaser"],
  [["one", "lookup"], "1Lookup"],
  [["one", "look"], "1Lookup"],
  [["esa", "card"], "ESA Card"],
  // scribe-v2 splits this one too: one batch-7 clip transcribed as "Bit Predict"
  // even though the spoken delivery was correct.
  [["bit", "predict"], "BitPredict"],
  // Same split on the batch-9 TeamPredict clips: the delivery was correct on all
  // four that speak it, scribe-v2 just writes it as two words.
  [["team", "predict"], "TeamPredict"],
  // "Protect" is scribe-v2 MIS-HEARING "Predict", not the actor saying it wrong:
  // batch 9's v6 captioned as "Team Protect" on one pass while four other passes
  // of the same audio returned "Team Predict". Batch 6 saw the identical slip on
  // "BitPredict". Joining it here makes a burned-in brand typo impossible
  // whichever way the fluke lands.
  //
  // This fixes the CAPTION only. It does not tell you the audio is right, so the
  // separate transcription cross-check still has to be run on every clip.
  [["team", "protect"], "TeamPredict"],
];
// SINGLE-WORD mishearings. BRAND_JOINS above only repairs a two-word split, so
// a word scribe-v2 simply hears wrong used to burn in verbatim. Batch 12 shipped
// "SPAMCH" over audio that says "spam", found by reading the pixels rather than
// the transcript, which is the same class of miss as batch 9's "TEAM PROTECT".
//
// Only put a word here when the SPOKEN audio is correct and the transcriber is
// wrong. If the actor genuinely said the wrong word, that is a trim, a mute or a
// re-roll, not a caption patch: this map would then paper over a real defect.
const WORD_FIXES = [
  [["spamch", "spampch", "spamsh"], "spam"],
];
const bare = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const words = [];
for (let i = 0; i < raw.length; i++) {
  const join = BRAND_JOINS.find(
    ([[a, b]]) => bare(raw[i].text) === a && raw[i + 1] && bare(raw[i + 1].text) === b,
  );
  if (join) {
    words.push({ text: join[1], start: raw[i].start, end: raw[i + 1].end });
    console.log(`  joined brand name -> ${join[1]}`);
    i++;
    continue;
  }
  const fix = WORD_FIXES.find(([variants]) => variants.includes(bare(raw[i].text)));
  if (fix) {
    // Keep any trailing punctuation the transcriber attached to the word.
    const tail = raw[i].text.match(/[?!]+$/)?.[0] ?? "";
    console.log(`  fixed misheard word ${raw[i].text} -> ${fix[1]}${tail}`);
    words.push({ ...raw[i], text: fix[1] + tail });
    continue;
  }
  words.push(raw[i]);
}
console.log(`${path.basename(video)}: ${words.length} words`);

// ---- 1b. keep captions off the end card ------------------------------------
// Every clip gets a 2.2s branded end card appended before captioning. A word is
// held until the next one starts (capped at end + 0.6s), and the transcript has
// no idea the end card exists, so the last spoken word bleeds over the wordmark.
// That shipped on all four batch-7 BitPredict clips: "FREE", "ONE" and "STAKE"
// were burned across the BitPredict logo for the first half-second of the card.
// The end card exists precisely because the model mispronounces the brand name,
// so covering the wordmark defeats its only job.
//
// Pass --endcard <seconds> with the card's start time, or let it auto-detect the
// cut. Auto-detection only looks at the last 5 seconds and only accepts a cut that
// leaves a plausible card-length tail, so a hard cut mid-clip cannot trigger it.
//
// The scene threshold is deliberately low (0.22, not 0.4). A clip that ends on a dark
// frame cuts to a near-black end card with only a small pixel delta: batch 10's caster
// booth and courtroom both ended dark and both went undetected at 0.4. The tail-window
// constraint, not the threshold, is what stops a false positive.
const endcardFlag = process.argv.indexOf("--endcard");
let cardStart = endcardFlag !== -1 ? Number(process.argv[endcardFlag + 1]) : null;
const clipEnd = words.length ? words[words.length - 1].end : 0;
if (cardStart === null) {
  try {
    execFileSync(FF, ["-hide_banner", "-i", video], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    const d = (e.stderr || "").toString().match(/Duration: (\d+):(\d+):([\d.]+)/);
    if (d) {
      const dur = Number(d[1]) * 3600 + Number(d[2]) * 60 + Number(d[3]);
      const from = Math.max(0, dur - 5);
      // showinfo writes to stderr and the command SUCCEEDS, so this cannot use the
      // catch-the-exception trick the plain `-i` probe above relies on.
      const scene = spawnSync(FF, ["-hide_banner", "-ss", String(from), "-i", video,
        "-vf", "select='gt(scene,0.22)',showinfo", "-f", "null", "-"],
        { encoding: "utf8" });
      const sceneOut = (scene.stderr || "") + (scene.stdout || "");
      const hits = [...sceneOut.matchAll(/pts_time:([\d.]+)/g)].map((m) => from + Number(m[1]));
      // Take the last cut that leaves a plausible end card (0.5s to 4s of tail).
      const cand = hits.filter((t) => dur - t > 0.5 && dur - t < 4).pop();
      if (cand !== undefined) {
        cardStart = cand;
        console.log(`  end card auto-detected at ${cardStart.toFixed(2)}s (clip ${dur.toFixed(2)}s)`);
      }
    }
  }
}
if (cardStart !== null && Number.isFinite(cardStart)) {
  const before = words.length;
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].start >= cardStart - 0.05) words.splice(i, 1);
    else if (words[i].end > cardStart) words[i].end = cardStart;
  }
  const dropped = before - words.length;
  if (dropped) console.log(`  dropped ${dropped} word(s) that fell on the end card`);
  console.log(`  captions clamped to ${cardStart.toFixed(2)}s so nothing covers the wordmark`);
} else if (clipEnd) {
  console.log(`  no end card detected, captions run to ${clipEnd.toFixed(2)}s`);
}

// ---- 2. ASS subtitle file --------------------------------------------------
// Probe the real frame size so PlayRes matches and the font scales correctly.
let dims = "1080x1918";
try { execFileSync(FF, ["-hide_banner", "-i", video], { stdio: ["ignore", "pipe", "pipe"] }); }
catch (e) { dims = (e.stderr || "").toString().match(/, (\d{2,5}x\d{2,5})[ ,]/)?.[1] ?? dims; }
const [W, H] = dims.split("x").map(Number);

const ts = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  const sec = (s % 60).toFixed(2).padStart(5, "0");
  return `${h}:${String(m).padStart(2, "0")}:${sec}`;
};
// Strip trailing commas and periods: in one-word-at-a-time captions they read as
// stray marks. Question and exclamation marks carry tone, so they stay.
// Colons and semicolons go too: scribe-v2 punctuates the brand name as
// "BitPredict:" when it introduces a list, and a burned-in "BITPREDICT:" hanging
// on the CTA payoff frame reads as a typo.
const esc = (t) => t.replace(/[{}\\]/g, "").replace(/[,.:;]+$/, "").toUpperCase();

// Three tiers: plain white, emphasised (numbers + this ad's punchline words) and
// the brand name itself. Emphasis is the brand colour and a step up in size, so
// the eye catches the number or the turn while scrolling with sound off.
const adId = adIdFromPath(video);
const company = companyFromPath(path.relative(ROOT, video));
const brand = BRAND[company] ?? { ass: "&H0000D7FF" };
const keywords = new Set((EMPHASIS[adId] ?? []).map((k) => k.toLowerCase()));
if (!EMPHASIS[adId]) console.log(`  note: no emphasis list for "${adId}", numbers and brand only`);

// Match by containment, not equality: speech-to-text returns the spoken URL as
// "voicedrop.ai", which bares to "voicedropai" and would otherwise render as a
// plain white word. That word is the CTA payoff and must carry the brand tier.
const BRAND_NAMES = ["voicedrop", "emailchaser", "1lookup", "esacard", "bitpredict", "teampredict"];
const tierOf = (text) => {
  const b = bare(text);
  if (BRAND_NAMES.some((n) => b.includes(n))) return "brand";
  if (/\d/.test(text) || NUMBER_WORDS.has(b) || keywords.has(b)) return "emph";
  return "plain";
};

const fontSize = Math.round(W * 0.115); // ~124px on a 1080-wide frame
const SIZE = { plain: fontSize, emph: Math.round(fontSize * 1.32), brand: Math.round(fontSize * 1.4) };

// Measure every word in the real font. Character-count estimates are not safe
// here: the per-character advance runs from 0.64 to 0.95 em depending on the
// letters, and "DISCONNECTED" at the emphasis size renders 1312px wide on a
// 1080px frame. Anything too wide is shrunk until it fits with a clear margin,
// so no caption is ever clipped by the frame edge.
const FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf";
const REF = 100;
const MAX_W = W - Math.round(W * 0.104); // ~56px of margin each side
const measured = JSON.parse(
  execFileSync("python3", ["-c", `
import json,sys
from PIL import ImageFont
f = ImageFont.truetype(${JSON.stringify(FONT)}, ${REF})
out = {}
for w in json.load(sys.stdin):
    b = f.getbbox(w)
    out[w] = b[2] - b[0]
print(json.dumps(out))
`], { input: JSON.stringify([...new Set(words.map((w) => esc(w.text)))]) }).toString(),
);
const fit = (text, size) => {
  const wRef = measured[text] || 0;
  if (!wRef) return size;
  const maxForWord = Math.floor((MAX_W * REF) / wRef);
  return Math.min(size, maxForWord);
};

const counts = { plain: 0, emph: 0, brand: 0 };
let shrunk = 0;
const lines = words.map((w, i) => {
  const next = words[i + 1];
  // Hold the word until the next one starts, but never longer than 0.6s past
  // its own end, so a pause does not leave a word stranded on screen.
  let end = Math.min(next ? next.start : w.end + 0.4, w.end + 0.6);
  if (cardStart !== null && Number.isFinite(cardStart)) end = Math.min(end, cardStart);
  const tier = tierOf(w.text);
  counts[tier]++;
  const text = esc(w.text);
  const size = fit(text, SIZE[tier]);
  if (size < SIZE[tier]) shrunk++;
  // Emphasised words punch in slightly harder than plain ones.
  const from = tier === "plain" ? 86 : 78;
  const override =
    `{\\fscx${from}\\fscy${from}\\t(0,90,\\fscx100\\fscy100)\\fs${size}` +
    (tier === "plain" ? "" : `\\c${brand.ass}&`) +
    "}";
  return `Dialogue: 0,${ts(w.start)},${ts(Math.max(end, w.start + 0.08))},Word,,0,0,0,,${override}${text}`;
});
console.log(`  ${counts.plain} plain · ${counts.emph} emphasised · ${counts.brand} brand · ${shrunk} shrunk to fit`);
const ass = `[Script Info]
ScriptType: v4.00+
PlayResX: ${W}
PlayResY: ${H}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Word,Liberation Sans,${fontSize},&H00FFFFFF,&H000000FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,${Math.round(fontSize * 0.075)},${Math.round(fontSize * 0.04)},5,40,40,40,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${lines.join("\n")}
`;

const assDir = path.join(path.dirname(video), "_qa");
await (await import("node:fs/promises")).mkdir(assDir, { recursive: true });
const assPath = path.join(assDir, `${path.basename(video, ".mp4")}.ass`);
await writeFile(assPath, ass);

// ---- 3. burn ---------------------------------------------------------------
execFileSync(FF, [
  "-hide_banner", "-loglevel", "error", "-y", "-i", video,
  "-vf", `subtitles=${assPath.replace(/([:'\\])/g, "\\$1")}:fontsdir=/usr/share/fonts`,
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
  "-c:a", "copy", "-movflags", "+faststart", out,
], { stdio: "inherit" });

console.log(`burned -> ${out}`);
