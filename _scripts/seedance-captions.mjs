#!/usr/bin/env node
// Burn TikTok-style one-word-at-a-time captions into a finished ad.
// One word, centred, held until the next word starts.
//
//   node _scripts/seedance-captions.mjs <video.mp4> <audio.mp3> [--out name.mp4]
//
// Word timings come from fal `elevenlabs/speech-to-text/scribe-v2` (~$0.008 per
// audio minute), which returns per-word start/end. Rendered with libass, so the
// captions are real subtitles burned to pixels, not model-generated text.

import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");

const FF = execFileSync("python3", ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"])
  .toString().trim();
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
  } else {
    words.push(raw[i]);
  }
}
console.log(`${path.basename(video)}: ${words.length} words`);

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
const esc = (t) => t.replace(/[{}\\]/g, "").replace(/[,.]+$/, "").toUpperCase();

const lines = words.map((w, i) => {
  const next = words[i + 1];
  // Hold the word until the next one starts, but never longer than 0.6s past
  // its own end, so a pause does not leave a word stranded on screen.
  const end = Math.min(next ? next.start : w.end + 0.4, w.end + 0.6);
  const pop = "{\\fscx86\\fscy86\\t(0,90,\\fscx100\\fscy100)}";
  return `Dialogue: 0,${ts(w.start)},${ts(Math.max(end, w.start + 0.08))},Word,,0,0,0,,${pop}${esc(w.text)}`;
});

const fontSize = Math.round(W * 0.115); // ~124px on a 1080-wide frame
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

const assPath = path.join(path.dirname(video), "_qa", `${path.basename(video, ".mp4")}.ass`);
await writeFile(assPath, ass);

// ---- 3. burn ---------------------------------------------------------------
execFileSync(FF, [
  "-hide_banner", "-loglevel", "error", "-y", "-i", video,
  "-vf", `subtitles=${assPath.replace(/([:'\\])/g, "\\$1")}:fontsdir=/usr/share/fonts`,
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
  "-c:a", "copy", "-movflags", "+faststart", out,
], { stdio: "inherit" });

console.log(`burned -> ${out}`);
