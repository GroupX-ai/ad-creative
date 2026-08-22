#!/usr/bin/env node
// Assemble the captured frames into the screen-recording inserts used by the b14
// video ads. Frame durations come from the capture clock, so the insert plays at
// the site's real speed; output is CFR 30 so it concatenates cleanly with the
// Seedance masters.
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const FF = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'])
  .toString().trim();
const HERE = path.resolve(import.meta.dirname, 'screencap');

// pad: the toast that announces each verdict sits above the element's own box,
// so the cardcheck crop is grown upward to keep it whole.
const JOBS = [
  { name: 'cardcheck', width: 1080, pad: { top: 54, left: 10, right: 10, bottom: 6 } },
  { name: 'trialpage', width: 1080, pad: { top: 0, left: 0, right: 0, bottom: 0 } },
];
const FRAME = { width: 2000, height: 1430 };

for (const j of JOBS) {
  const dir = path.join(HERE, j.name);
  if (!existsSync(path.join(dir, 'concat.txt'))) { console.log(`skip ${j.name}: no frames`); continue; }
  const box = JSON.parse(readFileSync(path.join(dir, 'box.json'), 'utf8'));
  // Crop to the captured element, then scale to the delivery width. Both crop
  // dimensions are forced even: libx264 with yuv420p rejects odd sizes.
  const pad = j.pad ?? { top: 0, left: 0, right: 0, bottom: 0 };
  const x0 = Math.max(0, Math.round(box.x) - pad.left);
  const y0 = Math.max(0, Math.round(box.y) - pad.top);
  const x1 = Math.min(FRAME.width, Math.round(box.x + box.width) + pad.right);
  const y1 = Math.min(FRAME.height, Math.round(box.y + box.height) + pad.bottom);
  const cw = Math.floor((x1 - x0) / 2) * 2;
  const ch = Math.floor((y1 - y0) / 2) * 2;
  const cx = x0;
  const cy = y0;
  const out = path.join(HERE, `${j.name}.mp4`);
  execFileSync(FF, [
    '-y', '-loglevel', 'error',
    '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'concat.txt'),
    '-vf', `crop=${cw}:${ch}:${cx}:${cy},scale=${j.width}:-2:flags=lanczos,fps=30`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p',
    out,
  ], { cwd: dir });

  let info = '';
  try { execFileSync(FF, ['-i', out], { stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { info = e.stderr?.toString() ?? ''; }
  const dur = /Duration: (\S+),/.exec(info)?.[1] ?? '?';
  const size = /, (\d+x\d+)[ ,\[]/.exec(info)?.[1] ?? '?';
  console.log(`${j.name}.mp4  ${size}  ${dur}`);
}
