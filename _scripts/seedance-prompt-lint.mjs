#!/usr/bin/env node
// Refuse to render a prompt that has not said where it is set.
//
//   node _scripts/seedance-prompt-lint.mjs esacard/prompts-heart-tug.mjs
//   node _scripts/seedance-prompt-lint.mjs --all
//
// Exit 1 on any error, so a generator can gate a paid render on it. Errors are:
//   - a prompt with no CAST AND LOCALE block
//   - a prompt carrying unambiguous wrong-market vocabulary ("kerb", "mum", "car boot")
// Soft hits ("flat", "boot", "lift") only warn, because they are legitimate in other senses:
// a cat has a flat face, a card is flat matte white, a dog lies flat.
//
// Added 2026-08-18, after fourteen clips shipped with British casts and British streets for a
// US-only campaign because not one prompt named a market. A rule nobody can forget is a rule
// the tooling enforces, so this runs inside the generators rather than sitting in a document.
//
// The second rule, added 2026-08-19: a two-person scene must say how the two people stack in
// the tall frame. Batch 13's b13v12 rendered the whole scene LANDSCAPE and rotated it 90
// degrees into the 1080x1920 frame, both actors lying on their side. The prompt said
// "vertical" three times; that was not enough, because the BLOCKING was horizontal (a man at
// a desk, a woman standing beside it) and the model composes what it reads, then turns the
// canvas to fit. The render judge caught exactly this on b13v10 before rendering and the fix
// was applied only to that one script. Warn, not error: a one-person selfie needs no blocking
// note, and this cannot tell the two apart reliably.

import { readdir } from "node:fs/promises";
import path from "node:path";
import { scanPrompt } from "./seedance-locale.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const argv = process.argv.slice(2);

async function promptFiles() {
  if (!argv.includes("--all")) return argv.filter((a) => !a.startsWith("--"));
  const out = [];
  for (const dir of await readdir(ROOT, { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name.startsWith("_") || dir.name.startsWith(".")) continue;
    for (const f of await readdir(path.join(ROOT, dir.name))) {
      if (/^prompts.*\.mjs$/.test(f)) out.push(path.join(dir.name, f));
    }
  }
  for (const f of await readdir(path.join(ROOT, "_scripts"))) {
    if (/^seedance-prompts.*\.mjs$/.test(f)) out.push(path.join("_scripts", f));
  }
  return out;
}

// A prompt is "multi-person" when its CHARACTERS block describes more than one person, and
// it is safe when it says, in words, how they occupy a frame that is taller than it is wide.
// Deliberately loose on both sides: a false positive costs one sentence in a prompt, and a
// false negative costs $6.93 and a re-roll.
const STACK_PHRASES = [
  "tall frame", "taller than it is wide", "top and bottom", "one above the other",
  "upper third", "lower part of the frame", "stack",
];
export function scanVerticalBlocking(prompt) {
  const chars = prompt.match(/CHARACTERS\.([\s\S]*?)(\n\n|$)/)?.[1] ?? "";
  const people = (chars.match(/\b(a|an|the)\s+(man|woman|guy|girl|boy|kid|person|worker|driver|receptionist|colleague|coworker)\b/gi) ?? []).length;
  const lower = prompt.toLowerCase();
  return {
    multiPerson: people >= 2,
    saysStacking: STACK_PHRASES.some((k) => lower.includes(k)),
  };
}

let errors = 0;
let warnings = 0;

for (const rel of await promptFiles()) {
  const mod = await import(path.join(ROOT, rel));
  const ads = mod.VIDEOS ?? mod.ADS ?? mod.ALL_ADS ?? [];
  if (!ads.length) { console.log(`- ${rel}: no prompt array exported, skipped`); continue; }

  for (const ad of ads) {
    const r = scanPrompt(ad.prompt ?? "");
    const label = `${rel} ${ad.id}`;
    if (!r.hasLocale) {
      console.error(`ERROR ${label}: no "CAST AND LOCALE" block. The model will pick a market for you, and it will not pick yours.`);
      errors++;
    }
    if (r.hard.length) {
      console.error(`ERROR ${label}: wrong-market vocabulary: ${r.hard.join(", ")}`);
      errors++;
    }
    if (r.soft.length) {
      console.warn(`warn  ${label}: check in context: ${r.soft.join(", ")}`);
      warnings++;
    }
    if (r.spelling.length) {
      console.warn(`warn  ${label}: British spelling: ${r.spelling.join(", ")}`);
      warnings++;
    }
    const v = scanVerticalBlocking(ad.prompt ?? "");
    if (v.multiPerson && !v.saysStacking) {
      console.warn(
        `warn  ${label}: two or more people on camera and nothing says how they sit in the ` +
        `TALL frame. Say it explicitly ("so the two of them stack top and bottom of the tall ` +
        `frame rather than side by side") or the model composes it wide and rotates the canvas.`,
      );
      warnings++;
    }
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
if (errors) {
  console.error("Refusing to render. Fix the prompts, or pass --force to the generator if you really mean it.");
  process.exit(1);
}
