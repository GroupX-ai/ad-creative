#!/usr/bin/env node
// Append a branded end card to a finished clip, in place.
//
//   node _scripts/seedance-endcard.mjs <endcard.png> <clip.mp4> [...]
//
// Why every BitPredict clip gets one. The model says "BitPredict" correctly only
// about two times in three (batch 6 produced "BitProtect" and then "Bitpropt" on
// two rolls of the same clip, each confirmed on three transcription engines). A
// card built from the real logo SVG makes the brand legible regardless, and it
// is also the free repair when a take garbles the spoken name: mute the word,
// and the card still says it.
//
// The card is encoded to match the clip's own stream parameters before concat,
// because a mismatch in resolution, frame rate or audio layout makes the concat
// demuxer drop or desync the tail.

import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const FF = execFileSync("python3", [
  "-c",
  "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())",
])
  .toString()
  .trim();

const [card, ...clips] = process.argv.slice(2);
if (!card || !clips.length) {
  throw new Error("usage: seedance-endcard.mjs <endcard.png> <clip.mp4> ...");
}
if (!existsSync(card)) throw new Error(`missing end card: ${card}`);

const DURATION = "2.2";
const ff = (args) => execFileSync(FF, args, { stdio: ["ignore", "pipe", "pipe"] });

for (const clip of clips) {
  if (!existsSync(clip)) {
    console.log(`MISSING ${clip}`);
    continue;
  }
  const base = path.basename(clip, ".mp4");
  const tmp = os.tmpdir();
  const cardMp4 = path.join(tmp, `${base}-card.mp4`);
  const listFile = path.join(tmp, `${base}-concat.txt`);
  const outFile = path.join(tmp, `${base}-out.mp4`);

  // Read the clip's real dimensions instead of assuming 1080x1920. Seedance
  // upscales come back 1080x1918, and encoding the card at a different size
  // makes the concat demuxer drop the tail: the card silently never plays.
  let dims = "1080:1920";
  try {
    execFileSync(FF, ["-i", clip], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    const m = /, (\d+)x(\d+)[ ,\[]/.exec(e.stderr?.toString() ?? "");
    if (m) dims = `${m[1]}:${m[2]}`;
  }

  ff([
    "-y", "-loglevel", "error",
    "-loop", "1", "-i", card,
    "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
    "-t", DURATION,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30",
    "-vf", `scale=${dims}`,
    "-c:a", "aac", "-b:a", "192k", "-shortest",
    cardMp4,
  ]);

  writeFileSync(listFile, `file '${path.resolve(clip)}'\nfile '${cardMp4}'\n`);
  ff([
    "-y", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", listFile,
    "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k",
    outFile,
  ]);

  execFileSync("cp", [outFile, clip]);
  for (const f of [cardMp4, listFile, outFile]) {
    try {
      unlinkSync(f);
    } catch {
      // temp cleanup only
    }
  }

  // `ffmpeg -i` with no output always exits non-zero ("At least one output file
  // must be specified") even though it has already printed the stream info to
  // stderr, so the throw has to be swallowed or it kills the whole run.
  let dur = "?";
  try {
    execFileSync(FF, ["-i", clip], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    dur = /Duration: (\S+),/.exec(e.stderr?.toString() ?? "")?.[1] ?? "?";
  }
  console.log(`ok  ${base}  -> ${dur}`);
}
