// Market, cast and accent. Import this into every prompts file.
//
// WHY THIS EXISTS. On 2026-08-18 Robby asked: "Why do most ads have a British accent if we
// are literally targeting USA only?" He was right. Not one ESA Card prompt named a market, a
// nationality or an accent, and the scripts were written in British English ("garden flat",
// "car boot", "kerb", "pavement", "mum", "lift", "mate", "no bother", "kettle"). A video model
// reads that vocabulary as a casting note, so it cast British actors on British streets for a
// campaign targeting the United States only. Fourteen clips shipped that way.
//
// The lesson generalises past accents: the model fills in every attribute the prompt leaves
// blank, and it will not fill it in with your target market by accident. State the market.
//
// Enforced by _scripts/seedance-prompt-lint.mjs, which the generators call before they spend
// anything, so a prompt missing its locale block cannot reach fal.

export const LOCALE_MARKER = "CAST AND LOCALE";

// The block itself. Keep the marker string in it: the linter looks for exactly that.
export const US_CAST =
  "CAST AND LOCALE: this is for a United States audience. Every person on camera is American " +
  "and speaks in a neutral American accent, the everyday General American voice of an ordinary " +
  "US city or suburb. Nobody has a British, Irish, Australian or other accent, and nobody uses " +
  "British vocabulary. The setting is unmistakably American: American houses, American street " +
  "furniture, American cars, American interiors. Say apartment not flat, trunk not boot, " +
  "sidewalk not pavement, curb not kerb, mom not mum, elevator not lift, yard not garden, " +
  "vacation not holiday, line not queue, trash not rubbish, fall not autumn.";

export const UK_CAST =
  "CAST AND LOCALE: this is for a United Kingdom audience. Every person on camera is British " +
  "and speaks in an ordinary British accent. The setting is unmistakably British.";

// Words that mean the prompt is drifting to the wrong market. Split by confidence, because
// several of these are legitimate in other senses: a cat has a "flat face", a dog "lies flat",
// a card is "flat matte white".
export const BRITISH_HARD = [
  "kerb", "mum", "mummy", "nappy", "pram", "whilst", "amongst", "lorry", "petrol",
  "aubergine", "courgette", "jumper", "trainers", "wellies", "chemist's", "postbox",
  "no bother", "cheers mate", "fortnight", "bin lorry", "car boot", "boot of the car",
];

export const BRITISH_SOFT = [
  "flat", "flats", "lift", "mate", "boot", "pavement", "kettle", "queue", "rubbish",
  "holiday", "autumn", "torch", "trousers", "biscuit", "rota", "post code", "postcode",
  "council", "estate agent", "letting agent", "leasing agent", "tenner", "quid",
];

// American spellings the models sometimes flip to British in stage directions. Harmless on
// screen, but they nudge the casting, so the linter surfaces them too.
export const BRITISH_SPELLING = [
  "colour", "favourite", "neighbour", "realise", "recognise", "apologise", "travelling",
  "cancelled", "metre", "centre", "theatre", "grey",
];

export function scanPrompt(text) {
  // The cast block itself spells out the words it is banning ("curb not kerb, mom not mum"),
  // so strip it before looking for wrong-market vocabulary or it flags its own cure.
  const body = [US_CAST, UK_CAST].reduce((acc, block) => acc.split(block).join(" "), text);
  const lower = body.toLowerCase();
  const hit = (list) =>
    list.filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(lower));
  return {
    hasLocale: text.includes(LOCALE_MARKER),
    hard: hit(BRITISH_HARD),
    soft: hit(BRITISH_SOFT),
    spelling: hit(BRITISH_SPELLING),
  };
}
