#!/usr/bin/env node
// QA a generated video: probe the container, build a contact sheet of frames, and
// split the audio out for transcription. Nothing ships from this repo unwatched.
//
//   node _scripts/seedance-qa.mjs <file.mp4> [...]
//
// Writes <name>-sheet.jpg (5x2 grid of stills) and <name>-audio.mp3 next to the
// source, into ../_qa/ which is gitignored — QA artifacts are not deliverables.

import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const FF = execFileSync("python3", ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"])
  .toString()
  .trim();

const files = process.argv.slice(2);
if (!files.length) throw new Error("usage: seedance-qa.mjs <file.mp4> ...");

const ff = (args) => execFileSync(FF, args, { stdio: ["ignore", "pipe", "pipe"] }).toString();

for (const f of files) {
  if (!existsSync(f)) {
    console.log(`MISSING ${f}`);
    continue;
  }
  const dir = path.join(path.dirname(f), "_qa");
  mkdirSync(dir, { recursive: true });
  const base = path.basename(f, ".mp4");

  // ffmpeg writes stream info to stderr; -hide_banner keeps it readable.
  let info = "";
  try {
    ff(["-hide_banner", "-i", f]);
  } catch (e) {
    info = (e.stderr || "").toString();
  }
  const video = info.match(/Stream #\d+:\d+.*Video:.*/)?.[0] ?? "no video stream";
  const audio = info.match(/Stream #\d+:\d+.*Audio:.*/)?.[0] ?? "NO AUDIO STREAM";
  const dur = info.match(/Duration: ([\d:.]+)/)?.[1] ?? "?";

  console.log(`\n=== ${base} ===`);
  console.log(`  duration ${dur}`);
  console.log(`  ${video.trim()}`);
  console.log(`  ${audio.trim()}`);

  // 10 stills evenly spaced across the clip, tiled 5x2, scaled for legibility.
  const secs = (() => {
    const [h, m, s] = dur.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  })();
  const every = Math.max(1, secs / 10);
  const sheet = path.join(dir, `${base}-sheet.jpg`);
  ff([
    "-hide_banner", "-y", "-i", f,
    "-vf", `fps=1/${every.toFixed(3)},scale=320:-1,tile=5x2:margin=6:padding=6:color=black`,
    "-frames:v", "1", "-q:v", "3", sheet,
  ]);
  console.log(`  sheet  ${path.relative(process.cwd(), sheet)} (10 stills, 1 per ~${every.toFixed(1)}s)`);

  if (!audio.startsWith("NO")) {
    const mp3 = path.join(dir, `${base}-audio.mp3`);
    ff(["-hide_banner", "-y", "-i", f, "-vn", "-ac", "1", "-ar", "16000", "-b:a", "64k", mp3]);
    console.log(`  audio  ${path.relative(process.cwd(), mp3)}`);
  }
}
