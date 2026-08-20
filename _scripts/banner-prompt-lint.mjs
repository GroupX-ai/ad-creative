#!/usr/bin/env node
// Refuse to render a banner prompt that breaks a rule we have already paid to learn.
//
//   node _scripts/banner-prompt-lint.mjs _scripts/banner-prompts-b13-1lookup.mjs
//   node _scripts/banner-prompt-lint.mjs --all
//
// Exit 1 on any error, so the generator can gate paid renders on it. This is the banner
// half of what `seedance-prompt-lint.mjs` does for video: the rules were all written down
// in `resources/paid-ads-creative-playbook.md` and in each brand's AD-CREATIVE-PLAYBOOK.md,
// and they still got broken, because a document nobody re-reads does not prevent anything.
//
// Errors (refuse to spend):
//   1. No no-other-text constraint at the end. The image model invents "feature chip" rows
//      with fabricated claims when a layout has an unassigned slot. This is the single most
//      expensive failure in the banner batches: a fake "99%+ Deliverability" badge is a
//      claim violation, not a typo.
//   2. No edge-margin rule when the prompt asks for big/full-bleed typography. Wave 1 of the
//      2026-08-03 brutalist square clipped a letter at the frame edge.
//   3. Disclaimer language. Ads sell, ads never disclaim (Robby, twice, 2026-08-13).
//   4. A third-party brand name in the rendered copy. The homepage's "integrates with"
//      framing does not travel to an ad, where the same marks read as endorsement.
//   5. An accuracy percentage on a 1Lookup prompt. Deliberate site discipline, PR #38.
//   6. A quoted headline longer than the shape's word cap.
//   7. A named-slot layout with no contents assigned (the c17 failure: the model invented
//      a company tagline to fill an empty strip).
//
// Warnings: soft-risk words worth a human look, and a generation size that is not a
// multiple of 16 (fal silently returns a different width, which ships the wrong aspect).

import { readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const argv = process.argv.slice(2);

// The constraint that stops fabricated feature chips. Any of these phrasings counts.
const NO_OTHER_TEXT = [
  /the only text in the image is/i,
  /no other words anywhere/i,
  /no feature chips/i,
];

const EDGE_MARGIN = [
  /clear margin on all four sides/i,
  /no letter may touch/i,
  /must fit completely inside the frame/i,
];

// Prompts that ask for oversized type need the margin rule or a letter gets cropped.
const BIG_TYPE = /full[- ]bleed|edge[- ]to[- ]edge|oversized|mega[- ]?numeral|fills the frame|giant|huge type|massive type/i;

// "A claim-safety document is a list of things you may not CLAIM. It is not a requirement
// to DISCLAIM." Two live campaigns shipped with the caveat in the ad before this was a rule.
const DISCLAIMER = [
  /no official/i,
  /not a legal/i,
  /we do not sell/i,
  /legal weight/i,
  /ours included/i,
  /charge you every year/i,
  /does not guarantee/i,
  /results may vary/i,
];

// Never rendered inside creative. Competitor names are legitimate as Google keywords and as
// research; they are never on the artwork.
const THIRD_PARTY = [
  "twilio", "hubspot", "shopify", "salesforce", "zoominfo", "apollo.io", "clearbit",
  "lusha", "ipqualityscore", "zerobounce", "neverbounce", "truecaller", "whitepages",
  "spokeo", "beenverified", "melissa", "telnyx", "numverify", "verizon", "at&t", "t-mobile",
  "binance", "trustpilot",
];

const ACCURACY = /\b\d{1,3}(\.\d+)?\s?%\s?(accurate|accuracy)|\baccuracy\s+(rate|guarantee)|\bhigh accuracy\b/i;

// Word caps, from the brand playbooks. The analog/hand-lettered register is allowed a
// sentence, because there the text IS the image.
const HEADLINE_WORDS = 7;
const HEADLINE_WORDS_ANALOG = 12;
const ANALOG = /hand[- ]lettered|chalk|marker on|whiteboard|sticky note|cardboard|shot on a phone|available light|legal pad|ballpoint|napkin|corkboard/i;

const SOFT = ["guarantee", "best", "#1", "number one", "award", "certified", "trusted by", "customers say", "testimonial"];

async function promptFiles() {
  if (!argv.includes("--all")) return argv.filter((a) => !a.startsWith("--"));
  const out = [];
  for (const f of await readdir(path.join(ROOT, "_scripts"))) {
    if (/^banner-prompts.*\.mjs$/.test(f)) out.push(path.join("_scripts", f));
  }
  return out;
}

// Every string the model is told to render, pulled out of the escaped quotes the brand
// playbooks require. Copy that is not in quotes is a description, not rendered text.
const quoted = (p) => [...p.matchAll(/"([^"]{2,120})"/g)].map((m) => m[1]);

let errors = 0;
let warnings = 0;
const err = (label, msg) => { console.error(`ERROR ${label}: ${msg}`); errors++; };
const warn = (label, msg) => { console.warn(`warn  ${label}: ${msg}`); warnings++; };

for (const rel of await promptFiles()) {
  const mod = await import(path.join(ROOT, rel));
  const banners = mod.BANNERS ?? mod.ADS ?? [];
  if (!banners.length) { console.log(`- ${rel}: no BANNERS array exported, skipped`); continue; }

  for (const b of banners) {
    const label = `${rel} ${b.id}`;
    const p = b.prompt ?? "";
    const isAnalog = ANALOG.test(p);

    if (!NO_OTHER_TEXT.some((r) => r.test(p))) {
      err(label, 'no no-other-text constraint. End the prompt with "The ONLY text in the image is ... No feature chips, no badges, no other words anywhere."');
    }
    if (BIG_TYPE.test(p) && !EDGE_MARGIN.some((r) => r.test(p))) {
      err(label, "oversized typography with no edge-margin rule. Add: every line must fit completely inside the frame with a clear margin on all four sides.");
    }
    for (const r of DISCLAIMER) {
      if (r.test(p)) err(label, `disclaimer language "${p.match(r)[0]}". Ads sell, ads never disclaim.`);
    }
    for (const brand of THIRD_PARTY) {
      if (quoted(p).some((q) => q.toLowerCase().includes(brand))) {
        err(label, `third-party brand "${brand}" in rendered copy.`);
      }
    }
    if ((b.company ?? "") === "1lookup" && ACCURACY.test(p)) {
      err(label, "accuracy percentage. 1Lookup deliberately makes no accuracy claim anywhere on the site.");
    }
    if (/\bslot\b/i.test(p) && !/slot (contains|reads|is exactly|carries)/i.test(p)) {
      err(label, "names a layout slot without assigning its exact contents. The model fills empty slots with invented taglines.");
    }

    const cap = isAnalog ? HEADLINE_WORDS_ANALOG : HEADLINE_WORDS;
    if (b.headline) {
      const n = b.headline.trim().split(/\s+/).length;
      if (n > cap) err(label, `headline is ${n} words, cap is ${cap}${isAnalog ? " (analog register)" : ""}: "${b.headline}"`);
      if (!p.includes(`"${b.headline}"`)) err(label, "headline is not present verbatim in escaped quotes inside the prompt.");
    }
    if (b.subheadline && !p.includes(`"${b.subheadline}"`)) {
      err(label, "subheadline is not present verbatim in escaped quotes inside the prompt.");
    }
    if (b.cta && !p.includes(`"${b.cta}"`)) {
      err(label, "CTA label is not present verbatim in escaped quotes inside the prompt.");
    }

    for (const [w, h] of Object.values(b.sizes ?? {})) {
      if (w % 16 || h % 16) warn(label, `generation size ${w}x${h} is not a multiple of 16; fal will quietly return something else.`);
    }
    for (const s of SOFT) {
      if (quoted(p).some((q) => q.toLowerCase().includes(s))) warn(label, `soft-risk word in rendered copy: "${s}"`);
    }
    if (!b.product) warn(label, "no product field. Per-product ads must name the product they sell so a report row traces to a page.");
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
if (errors) {
  console.error("Refusing to render. Fix the prompts, or pass --force to the generator if you really mean it.");
  process.exit(1);
}
