#!/usr/bin/env node
// Take the b14 Seedance masters all the way to upload-ready deliverables.
//
//   node _work/finish-videos.mjs              # every clip that has a master on disk
//   node _work/finish-videos.mjs --only b14v01
//   node _work/finish-videos.mjs --skip-captions      # everything except the paid transcribe
//
// The chain, and why it is in this order:
//   1. compose-video.mjs   overlays the REAL screen recording (never a rendered screen)
//   2. seedance-endcard.mjs appends the 2.2s card built from the real logo SVG
//   3. seedance-captions.mjs burns one-word captions, with --endcard so no caption word is
//      held across the wordmark (batch 7 burned "FREE", "ONE" and "STAKE" over the card)
//
// A video batch is not finished until the captions are burned in and the end card is on.
// That is doubly true here, because no clip speaks the brand name: the card is the only
// place the brand appears at all.
//
// Deliverables per clip, all four kept:
//   <id>-720p.mp4                                native master, the thing that was paid for
//   <id>-1080p.mp4                               clean upscale, no screen, no card
//   <id>-1080p-screen.mp4                        screen composited, uncaptioned
//   <id>-1080p-screen-endcard-captioned.mp4      THE deliverable that gets uploaded

import { execFileSync } from 'node:child_process';
import { existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';

const FF = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'])
  .toString().trim();
const ROOT = path.resolve(import.meta.dirname, '..');
const WORK = path.resolve(import.meta.dirname);
const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const has = (n) => argv.includes(`--${n}`);

const BATCH = flag('batch', '2026-08-21-b14-relaunch');
const ONLY = flag('only', null);
const { ADS } = await import(path.join(ROOT, '_scripts', 'seedance-prompts-b14-1capture.mjs'));

const run = (cmd, args, cwd = ROOT) =>
  execFileSync(cmd, args, { cwd, stdio: ['ignore', 'inherit', 'inherit'] });

const durationOf = (f) => {
  let s = '';
  try { execFileSync(FF, ['-i', f], { stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { s = e.stderr?.toString() ?? ''; }
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(s);
  return m ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) : 0;
};

// 1. screen recording -------------------------------------------------------
console.log('\n== 1. compositing the real screen recording ==');
run('node', [path.join(WORK, 'compose-video.mjs'), ...(ONLY ? ['--only', ONLY] : []), '--batch', BATCH]);

for (const ad of ADS) {
  if (ONLY && !ad.id.includes(ONLY)) continue;
  const dir = path.join(ROOT, ad.company, BATCH);
  const screen = path.join(dir, `${ad.id}-1080p-screen.mp4`);
  if (!existsSync(screen)) { console.log(`SKIP ${ad.id}: nothing composited`); continue; }

  // 2. end card -------------------------------------------------------------
  // One card for every clip as of round 4. b14v02 used to take a second card carrying the
  // VoiceDrop attribution and the 2-3x framing, because the bank constrains the 57% figure and
  // the spoken budget could not carry both. Robby cut VoiceDrop from the creative, so no clip
  // quotes the figure, nothing owes the framing, and the proof card is gone.
  const card = path.join(WORK, 'endcard', 'endcard-b14-default.png');
  if (!existsSync(card)) throw new Error(`end card missing: ${card}. Run python3 _work/make-endcard.py`);
  const withCard = path.join(dir, `${ad.id}-1080p-screen-endcard.mp4`);
  copyFileSync(screen, withCard);
  const cardStart = durationOf(screen);
  console.log(`\n== 2. end card on ${path.basename(withCard)} (card starts at ${cardStart.toFixed(2)}s) ==`);
  run('node', [path.join(ROOT, '_scripts', 'seedance-endcard.mjs'), card, withCard]);

  if (has('skip-captions')) continue;

  // 3. captions -------------------------------------------------------------
  // The transcriber is given the audio from BEFORE the card was appended, so the silent
  // tail cannot invent words, and --endcard stops any word being held over the wordmark.
  const audio = path.join(dir, `${ad.id}.mp3`);
  execFileSync(FF, ['-y', '-loglevel', 'error', '-i', screen, '-vn', '-c:a', 'libmp3lame', '-b:a', '192k', audio]);
  const out = path.join(dir, `${ad.id}-1080p-screen-endcard-captioned.mp4`);
  console.log(`\n== 3. captions on ${path.basename(out)} ==`);
  run('node', [
    path.join(ROOT, '_scripts', 'seedance-captions.mjs'),
    path.relative(ROOT, withCard), path.relative(ROOT, audio),
    '--endcard', cardStart.toFixed(2), '--out', path.relative(ROOT, out),
  ]);
  console.log(`\n${path.basename(out)}  ${durationOf(out).toFixed(2)}s`);
}
