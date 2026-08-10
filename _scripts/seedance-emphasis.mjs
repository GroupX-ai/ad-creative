// Which words get emphasised in the one-word captions, per ad.
//
// Three tiers on screen:
//   normal    white, base size
//   emphasis  brand colour, larger  (numbers and the words below)
//   brand     brand colour, largest (the company name)
//
// Numbers are emphasised automatically everywhere, since the money and scale
// words are what the eye should catch. The lists below add the punchline words
// for each specific ad: the turn, the reveal, or the claim.

export const BRAND = {
  voicedrop: { hex: "#FFD874", ass: "&H0074D8FF" }, // CTA gold, reads on dark footage
  emailchaser: { hex: "#1179FC", ass: "&H00FC7911" }, // brand blue
  "1lookup": { hex: "#22D3EE", ass: "&H00EED322" }, // brand cyan
};

// Anything containing a digit, plus spelled-out numbers, is emphasised.
export const NUMBER_WORDS = new Set([
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "twenty", "thirty", "forty", "fifty", "hundred", "thousand",
  "million", "billion", "ninth", "third", "half",
]);

export const EMPHASIS = {
  // ── batch 1 ──
  "voicedrop-c39-cold-callers-anonymous": ["fax", "machine", "stopped", "me", "obsolete"],
  "emailchaser-c11-missing": ["none", "promotions", "tab", "primary", "whole", "time"],
  "1lookup-c3-ghost-leads": ["dead", "haunted", "validate", "bad", "data"],

  // ── batch 2, VoiceDrop ──
  "voicedrop-c40-nature-documentary": ["tuesday", "gone", "obsolete", "chasing"],
  "voicedrop-c41-recording-booth": ["voice", "point", "another"],
  "voicedrop-c42-callback-avalanche": ["calling", "me", "now", "chasing"],
  "voicedrop-c43-museum": ["strangers", "no", "obsolete", "chasing"],
  "voicedrop-c44-warehouse": ["million", "afternoon", "either"],

  // ── batch 2, Emailchaser ──
  "emailchaser-c12-safety-demo": ["not", "read", "promotions", "career", "primary"],
  "emailchaser-c13-infomercial": ["better", "way", "once", "automatic"],
  "emailchaser-c14-twin-study": ["replied", "minutes", "split", "test"],
  "emailchaser-c15-buffet": ["price", "unlimited", "fixed", "cost"],
  "emailchaser-c16-commentary": ["single", "phone", "call", "gone"],

  // ── batch 2, 1Lookup ──
  "1lookup-c4-appraisal": ["disconnected", "bad", "data", "online"],
  "1lookup-c5-security-scanner": ["disconnected", "real", "mailbox", "instantly"],
  "1lookup-c6-quality-control": ["seconds", "each"],
  "1lookup-c7-one-key": ["doors", "sets", "api"],
};

// Resolve an ad id from a file path, tolerating the -fixed / -trimmed / -1080p suffixes.
export function adIdFromPath(p) {
  const base = p.split("/").pop().replace(/\.mp4$/, "");
  return base
    .replace(/-(480p|1080p)(-fixed|-trimmed)*(-captioned)?$/, "")
    .replace(/-(fixed|trimmed|captioned)$/, "");
}

export function companyFromPath(p) {
  return p.split("/")[0];
}
