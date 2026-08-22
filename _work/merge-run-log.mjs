#!/usr/bin/env node
// Rebuild one complete run log for b14 from the take-1 run and the two --only re-rolls.
//
// WHY THIS EXISTS. seedance-generate.mjs writes seedance-run-log-<batch>.json at the end of
// every run, and a `--only` re-roll writes a log containing just that one clip. So a batch with
// re-rolls ends up with a log that describes one clip and silently loses the seeds and fal
// source URLs of the others. That is the same class of loss the generator's own --batch guard
// was added to prevent. This merges the snapshots back into one file that records BOTH takes of
// every clip and which take was adopted, so any delivered file traces to the exact prompt and
// seed that made it.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SNAP = process.argv[2];
if (!SNAP) throw new Error('usage: merge-run-log.mjs <dir holding the run-log snapshots>');

const read = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null);
const take1 = read(path.join(SNAP, 'run-log-take1.json'));
const rerolls = ['run-log-reroll-v01.json', 'run-log-reroll-v03.json',
                 'run-log-take3-v01.json', 'run-log-take3-v03.json']
  .map((f) => read(path.join(SNAP, f)))
  .filter(Boolean);
if (!take1) throw new Error('no take-1 snapshot');

const takes = {};
for (const o of take1.ok) takes[o.id] = [{ take: 1, ...o }];
for (const r of rerolls) {
  for (const o of r.ok) (takes[o.id] ??= []).push({ take: (takes[o.id]?.length ?? 0) + 1, ...o });
}

// The last take of a clip is the one on disk, so it is the adopted one.
const clips = Object.entries(takes).map(([id, list]) => ({
  id,
  takesRendered: list.length,
  adoptedTake: list.length,
  takes: list.map((t) => ({
    take: t.take, seed: t.seed, sourceUrl: t.sourceUrl,
    master: t.raw ? path.relative(ROOT, t.raw) : null,
    upscaled: t.upscaled ? path.relative(ROOT, t.upscaled) : null,
  })),
}));

const rendersBilled = clips.reduce((a, c) => a + c.takesRendered, 0);
const GEN = 6.93;
const UPSCALE = 0.11;

writeFileSync(path.join(ROOT, '_scripts', 'seedance-run-log-2026-08-21-b14-relaunch.json'),
  JSON.stringify({
    ranAt: take1.ranAt,
    mergedAt: rerolls.at(-1)?.ranAt ?? take1.ranAt,
    model: take1.model,
    duration: take1.duration,
    resolution: take1.resolution,
    note: 'Merged from the take-1 run and four --only re-rolls by _work/merge-run-log.mjs, ' +
          'because a --only run writes a log describing just that one clip and would otherwise ' +
          'lose the other clips\' seeds and fal source URLs. ' +
          'b14v01 and b14v03 each took three rolls. Take 1: both garbled "signup" on three ' +
          'transcription engines ("startup", "sarnup", "startin\' up"). Take 2: a per-syllable ' +
          'pronunciation anchor fixed v03\'s hook but not v01, and v03\'s re-roll broke "SaaS" ' +
          'instead ("OS", "SOES"), which is the documented re-roll coin flip. Take 3 removed the ' +
          'twice-failing word from v01\'s line entirely and both came back word-perfect on all ' +
          'three engines. b14v02 was word-perfect on take 1 and was never re-rolled.',
    rendersBilled,
    estimatedSpendUsd: Number((rendersBilled * GEN + rendersBilled * UPSCALE).toFixed(2)),
    clips,
  }, null, 2));

console.log(`merged: ${clips.length} clip(s), ${rendersBilled} render(s) billed, ` +
            `~$${(rendersBilled * (GEN + UPSCALE)).toFixed(2)}`);
for (const c of clips) console.log(`  ${c.id}  take ${c.adoptedTake} of ${c.takesRendered}  seeds ${c.takes.map(t => t.seed).join(', ')}`);
