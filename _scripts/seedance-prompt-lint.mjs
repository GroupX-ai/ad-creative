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
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
if (errors) {
  console.error("Refusing to render. Fix the prompts, or pass --force to the generator if you really mean it.");
  process.exit(1);
}
