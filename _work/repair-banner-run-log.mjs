#!/usr/bin/env node
// Repair the b14 banner run log after the 2026-08-22 PIL outage.
//
// WHY THIS EXISTS. banner-generate.mjs shells out to python3/PIL to resize each render to its
// delivery size and then ASSERT the delivered pixels, which is the check that stops a
// wrong-aspect file shipping. This container had no PIL installed, so that step threw on every
// image: fal had already been paid and the PNG had already been written to disk, but the
// generator logged the concept under `failed` and exited 1. Twenty of twenty-three squares in
// the round-4 re-render landed that way. Re-rendering them would have paid fal a second time
// for files that were already correct.
//
// It also repairs a SECOND loss with the same shape. banner-generate.mjs writes the run log at
// the end of each run, whole, so running it for b14a overwrites the b14b run's entries: the
// round-4 re-render left a log describing 9 of the 32 delivered files. This is the same class of
// loss `_work/merge-run-log.mjs` was written for on the video side.
//
// So this rebuilds the log for EVERY file on disk, and it re-runs the assertion that was
// skipped rather than assuming it would have passed: every file is opened, its real pixel size
// is compared against the shape's delivery size, and anything that does not match is left in
// `failed` where it belongs. Entries repaired this way are marked `verifiedPostHoc: true` so the
// log never claims the generator checked something it did not.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const LOG = path.join(ROOT, '_scripts', 'banner-run-log-2026-08-21-b14-relaunch.json');
const OUT = { square: [1024, 1024], landscape: [1200, 628], vertical: [1080, 1920], wide: [1200, 300] };

const log = JSON.parse(readFileSync(LOG, 'utf8'));
const mods = ['banner-prompts-b14-1capture.mjs', 'banner-prompts-b14b-1capture.mjs'];
const byId = new Map();
for (const m of mods) {
  const mod = await import(path.join(ROOT, '_scripts', m));
  for (const b of mod.BANNERS) byId.set(b.id, b);
}

const size = (f) => execFileSync('python3', ['-c',
  `from PIL import Image\nim=Image.open(${JSON.stringify(f)})\nprint(im.size[0],im.size[1])`],
  { encoding: 'utf8' }).trim().split(' ').map(Number);

// Every (concept, shape) the prompt modules declare, not just what this run happened to log.
const wanted = [];
for (const b of byId.values()) for (const shape of b.shapes ?? ['square']) wanted.push({ id: b.id, shape });

const logged = new Map();
for (const o of log.ok ?? []) logged.set(`${o.id}|${o.shape}`, o);

const ok = [];
const stillFailed = [];
for (const f of wanted) {
  const b = byId.get(f.id);
  const shape = f.shape;
  const prior = logged.get(`${f.id}|${shape}`);
  if (!b) { stillFailed.push(f); continue; }
  const rel = `1capture/2026-08-21-b14-relaunch/${f.id}-${shape}.png`;
  const abs = path.join(ROOT, rel);
  let got;
  try { got = size(abs); } catch (e) { stillFailed.push({ ...f, repairError: String(e.message).slice(0, 120) }); continue; }
  const want = OUT[shape];
  if (got[0] !== want[0] || got[1] !== want[1]) {
    stillFailed.push({ ...f, repairError: `delivered ${got.join('x')}, expected ${want.join('x')}` });
    continue;
  }
  ok.push({
    id: f.id, shape, product: b.product, concept: b.concept, file: rel,
    generated: (b.sizes?.[shape] ?? want).join('x'), delivered: got.join('x'),
    sha256: createHash('sha256').update(readFileSync(abs)).digest('hex').slice(0, 12),
    // Only entries this script reconstructed are marked. An entry the generator itself wrote
    // and verified keeps its own provenance.
    ...(prior ? {} : { verifiedPostHoc: true }),
    prompt: b.prompt,
  });
}

ok.sort((a, b) => (a.id + a.shape).localeCompare(b.id + b.shape));
writeFileSync(LOG, JSON.stringify({
  ...log,
  note: 'Round 4 re-render, 2026-08-22. Rebuilt by _work/repair-banner-run-log.mjs after a ' +
        'missing PIL marked 20 correct files failed, and after the b14a run overwrote the ' +
        "b14b run's entries. Every file below was opened and its delivered size asserted.",
  estimatedSpendUsd: Number((ok.length * 0.2).toFixed(2)),
  ok, failed: stillFailed,
}, null, 2) + '\n');
console.log(`ok ${ok.length}  still failed ${stillFailed.length}`);
for (const f of stillFailed) console.log('  FAILED', f.id, f.shape, f.repairError ?? '');
