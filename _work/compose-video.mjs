#!/usr/bin/env node
// Composite the real screen recording into each b14 Seedance master.
//
//   node _work/compose-video.mjs                 # all three
//   node _work/compose-video.mjs --only b14v01
//
// WHY THE SCREEN IS ADDED HERE AND NOT RENDERED. Batch 8's rule: for a brand whose whole
// discipline is honest claims, an invented product screen IS the banned claim, so the video
// prompts ban every display surface and the real capture of live 1capture.io goes on in post.
//
// WHY IT STARTS AT 5.0s. The captured browser chrome reads "app.1capture.io", which is a brand
// mention, and the approved-claims bank forbids any brand mention before second 5. Starting the
// insert exactly at 5.0s also puts the screen over the founder's face inside the 6-10s window
// the research says a bare talking head has to break by.
//
// WHICH SECONDS OF THE CAPTURE. Each clip's segments are declared next to its script in
// _scripts/seedance-prompts-b14-1capture.mjs, because which part of the flow to show is a
// creative decision about that ad's argument, not a rendering detail. The card check from
// 2.2s is where the live site tells the whole story in one run: a real card clears ("Real
// card verified. Trial started.", green, with the verified-trial toast), the next card comes
// in ($0 authorization running), and it is refused ("Same card, 4th trial. Blocked.", red,
// with the blocked counter ticking up). Nothing is staged: that is the site's own sequence.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const FF = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'])
  .toString().trim();
const ROOT = path.resolve(import.meta.dirname, '..');
const WORK = path.resolve(import.meta.dirname);

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };

const BATCH = flag('batch', '2026-08-21-b14-relaunch');
const ONLY = flag('only', null);
// The insert sits on the brand navy rather than on a near-white ground. On white the
// letterboxed capture read as dead space above and below; on navy it reads as a deliberate
// full-bleed screen card, and it matches the end card the clip lands on.
const GROUND = '0x0A2540'; // #0A2540, tailwind ink.DEFAULT / 1capture.dark

const { ADS } = await import(path.join(ROOT, '_scripts', 'seedance-prompts-b14-1capture.mjs'));

const probe = (f) => {
  let s = '';
  try { execFileSync(FF, ['-i', f], { stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { s = e.stderr?.toString() ?? ''; }
  return {
    dur: Number(/Duration: (\d+):(\d+):([\d.]+)/.exec(s)?.slice(1)
      .reduce((a, v, i) => a + Number(v) * [3600, 60, 1][i], 0) ?? 0),
    size: /, (\d+x\d+)[ ,\[]/.exec(s)?.[1] ?? '?',
  };
};

let done = 0;
for (const ad of ADS) {
  if (ONLY && !ad.id.includes(ONLY)) continue;
  const dir = path.join(ROOT, ad.company, BATCH);
  mkdirSync(dir, { recursive: true });

  // Prefer the 1080p upscale as the base; fall back to the 720p master.
  const base = ['-1080p.mp4', '-720p.mp4'].map((s) => path.join(dir, ad.id + s)).find(existsSync);
  if (!base) { console.log(`SKIP ${ad.id}: no master on disk yet`); continue; }

  const segs = ad.screenInsert.segments;
  const at = ad.screenInsert.start;
  const dur = Number(segs.reduce((a, x) => a + x.dur, 0).toFixed(3));
  const window = Number((ad.screenInsert.end - ad.screenInsert.start).toFixed(3));
  if (Math.abs(dur - window) > 0.05) {
    throw new Error(`${ad.id}: segments total ${dur}s but the declared window is ${window}s`);
  }
  for (const sg of segs) {
    const f = path.join(WORK, 'screencap', `${sg.source}.mp4`);
    if (!existsSync(f)) throw new Error(`missing screen capture: ${f}`);
  }

  const out = path.join(dir, `${ad.id}-1080p-screen.mp4`);
  const b = probe(base);

  // Each segment is scaled to the full 1080 width and centred on a navy 1080x1920 ground,
  // the segments are concatenated in order, and the result is overlaid for exactly its
  // window. setpts shifts the layer so its first frame lands at `at` rather than at t=0.
  const inputs = ['-i', base];
  segs.forEach((sg) => {
    inputs.push('-ss', String(sg.from), '-t', String(sg.dur),
                '-i', path.join(WORK, 'screencap', `${sg.source}.mp4`));
  });

  const parts = [
    `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1[base]`,
  ];
  segs.forEach((sg, i) => {
    parts.push(`color=c=${GROUND}:s=1080x1920:r=30:d=${sg.dur},setsar=1[g${i}]`);
    parts.push(`[${i + 1}:v]scale=1080:-2:flags=lanczos,fps=30,setsar=1[r${i}]`);
    parts.push(`[g${i}][r${i}]overlay=(W-w)/2:(H-h)/2:shortest=1[s${i}]`);
  });
  parts.push(`${segs.map((_, i) => `[s${i}]`).join('')}concat=n=${segs.length}:v=1:a=0[joined]`);
  parts.push(`[joined]setpts=PTS+${at}/TB[shifted]`);
  parts.push(`[base][shifted]overlay=0:0:eof_action=pass:enable='between(t,${at},${at + dur})'[v]`);

  execFileSync(FF, [
    '-y', '-loglevel', 'error',
    ...inputs,
    '-filter_complex', parts.join(';'),
    '-map', '[v]', '-map', '0:a?',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k',
    out,
  ]);

  const o = probe(out);
  const how = segs.map((sg) => `${sg.source}@${sg.from}s+${sg.dur}s`).join(' then ');
  console.log(`${path.basename(out)}  ${o.size}  ${o.dur.toFixed(2)}s  (base ${b.size} ${b.dur.toFixed(2)}s, insert ${at}s-${(at + dur).toFixed(1)}s = ${how})`);
  done += 1;
}
console.log(`\n${done} clip(s) composited`);
