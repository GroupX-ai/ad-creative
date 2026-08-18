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
  esacard: { hex: "#f2a93b", ass: "&H003BA9F2" }, // marigold, reads on warm daylight footage
  bitpredict: { hex: "#01DD82", ass: "&H0082DD01" }, // neon green, the brand's only accent
  teampredict: { hex: "#4B56FF", ass: "&H00FF564B" }, // brand indigo
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

  // ── batch 3, the UGC corrective batch ──
  "voicedrop-c45-ugc-watch-this": ["stopped", "watch", "me", "back", "chasing"],
  "emailchaser-c17-ugc-promotions": ["zero", "promotions", "nobody", "primary", "free"],

  // ── batch 4, stronger hooks and closes ──
  "voicedrop-c46-before-my-coffee": ["coffee", "dialling", "ringing", "me", "free", "credits"],
  "voicedrop-c47-they-hate-dialling": ["hate", "stop", "rejection", "back", "free", "credits"],
  "emailchaser-c18-check-your-promotions": ["now", "promotions", "nobody", "primary", "free"],

  // ── batch 5, research-driven hooks ──
  "voicedrop-c48-never-dialed-once": ["boss", "zero", "dialed", "rejection", "back", "free", "credits"],
  "voicedrop-c49-another-callback": ["callback", "weeks", "voicemails", "ringing", "me", "free", "credits"],
  "emailchaser-c19-invisible": ["invisible", "promotions", "coupons", "primary", "reply", "free"],
  "emailchaser-c20-eight-thousand-emails": ["spam", "promotions", "landed", "primary", "inbox", "free"],
  "emailchaser-c21-agency-callout": ["grand", "clients", "promotions", "primary", "replies", "free"],

  // ── ESA Card, the B2C batch. Emphasis is the warm turn, not a metric:
  //    these ads sell a feeling, so the punched words are the ones that land it.
  "w1-window-seat": ["building", "him", "card", "minute", "window"],
  "w2-best-part": ["reason", "early", "best", "part", "name", "certificate", "wallet"],
  "w3-three-minutes": ["terrible", "photo", "name", "breed", "birthday", "inbox", "kettle", "renewals"],
  "x1-cat-photo": ["photo", "worst", "model", "done", "renewals"],
  "x2-interview": ["job", "hired", "role", "started", "immediately"],
  "x3-jealous": ["both", "fair", "his", "hers", "two"],
  "x4-paw-print": ["signed", "paw", "official", "framed"],
  "x5-senior": ["fourteen", "years", "finally", "his", "name"],
  "x6-wallet-reveal": ["kids", "guess", "show", "everyone", "wallet"],
  "x7-puppy-first": ["first", "day", "grown", "photo", "tiny"],

  // ── the spelled-out rebuild. Robby: use "Emotional Support Animal", never the
  //    acronym. The four closing words are emphasised together so the full name
  //    lands in brand colour rather than flashing past in plain white.
  "c1-four-days": ["four", "days", "sat", "next", "me", "emotional", "support", "animal", "card"],
  "c2-alarm-clock": ["alarm", "clock", "snooze", "face", "emotional", "support", "animal", "card"],
  "c3-window-wait": ["window", "every", "day", "waiting", "emotional", "support", "animal", "card"],
  "c4-first-night": ["first", "night", "floor", "home", "emotional", "support", "animal", "card"],
  "c5-kitchen-table": ["minutes", "name", "breed", "birthday", "inbox", "emotional", "support", "animal", "card"],

  // ── the approved slice-of-life batch. No spoken pitch and no end card, so the
  //    emphasis carries the brand phrase where it falls naturally mid-clip.
  "d1-viewing": ["fourth", "emotional", "support", "animal", "card", "emails", "week", "waiting"],
  "d2-lobby": ["yours", "emotional", "support", "animal", "card", "ruined", "morning"],
  "d3-bench": ["ask", "allowed", "explaining", "emotional", "support", "animal", "card"],
  "d4-section-four": ["pets", "emotional", "support", "animal", "card", "week"],
  "d5-hotel": ["emotional", "support", "animal", "card", "bed", "every", "time"],

  // ── batch 2 of the slice-of-life set ──
  "e1-first-day": ["first", "day", "five", "emotional", "support", "animal", "card", "miss"],
  "e2-keys": ["two", "months", "forms", "emotional", "support", "animal", "card"],
  "e3-back-sunday": ["sunday", "emotional", "support", "animal", "card", "sofa", "told"],
  "e4-cottage": ["six", "hours", "emotional", "support", "animal", "card"],
  "e5-haircut": ["never", "haircut", "life", "emotional", "support", "animal", "card", "ridiculous"],

  // ── ESA Card UGC talking-head batch (2026-08-17) ──
  // The brand phrase is emphasised in every clip, same as the d/e slice-of-life
  // set; the extra words are each clip's hook and punchline.
  "u1-better-id": ["better", "id", "photo", "name", "emotional", "support", "animal", "card", "phone"],
  "u2-wallet-ranked": ["ranked", "boring", "tragic", "emotional", "support", "animal", "card", "best"],
  "u4-roommate": ["roommate", "nothing", "mailman", "emotional", "support", "animal", "card", "proud"],
  "u5-photoshoot": ["photo", "photoshoot", "takes", "emotional", "support", "animal", "card", "obviously"],
  "u6-rabbit": ["rabbit", "emotional", "support", "animal", "card", "coffee", "better", "id", "ears"],
  "u7-fourteen": ["fourteen", "best", "decision", "emotional", "support", "animal", "card", "distinguished"],
  "u8-drama": ["dramatic", "crisis", "emotional", "support", "animal", "card", "flawless", "take"],
  "u9-supervisor": ["supervises", "judgement", "emotional", "support", "animal", "card", "personality"],

  // ── batch 6, BitPredict on Reddit ──
  // "crypto" is emphasised in every BitPredict ad: it is the one word that tells a
  // scroller with the sound off what this is even about, and Robby asked for it in
  // all of them.
  "bitpredict-c1-that-group-chat": ["crypto", "didn't", "deleted", "timestamped", "public", "free", "stake"],
  "bitpredict-c2-screenshot-or-it-didnt-happen": ["crypto", "screenshot", "genius", "proof", "edit", "free"],
  "bitpredict-c3-worst-idea-ever": ["crypto", "public", "worst", "climbing", "record", "free"],

  // ── batch 7, round 2: higher energy, men, at the desk ──
  "bitpredict-c4-worst-idea-ever-loud": ["crypto", "public", "worst", "genius", "climbing", "record", "free"],
  "bitpredict-c5-three-weeks-in": ["crypto", "destroyed", "accuracy", "prove", "timestamped", "stake", "free"],
  "bitpredict-c6-humbling": ["crypto", "brutal", "humbling", "public", "timestamped", "better", "free"],
  "bitpredict-c7-just-locked-it": ["crypto", "locked", "regret", "edit", "record", "free", "stake"],

  // ── batch 9, TeamPredict paid launch. Every list punches the SIGNAL words
  //    (headshot, skills, networking, profile, "Open to Work"), because those
  //    are what tell a sound-off scroller what the product actually reads, and
  //    the turn word that makes each clip funny.
  "teampredict-v1-keep-scrolling": ["quitting", "scrolling", "headshot", "skills", "networking", "free"],
  "teampredict-v2-two-weeks": ["weeks", "standing", "desk", "desks", "coming"],
  "teampredict-v3-open-to-work": ["manager", "habitat", "herd", "open", "work", "recruiters", "cannot"],
  "teampredict-v4-pizza-party": ["pizza", "valued", "anywhere", "accepted", "offer"],
  "teampredict-v5-psychic": ["quit", "photo", "skills", "linkedin", "dollars", "person"],
  "teampredict-v6-my-competitors": ["competitors", "polishing", "email", "call", "boss", "free"],

  // ── batch 10, the mockumentary skits. Same logic as batch 9: punch the SIGNAL
  //    words a sound-off scroller needs, plus the turn word of each joke.
  "teampredict-w1-farewell-party": ["farewell", "party", "resigned", "headline", "skills", "headshot", "weeks", "cake", "marble"],
  "teampredict-w2-exit-interview": ["exit", "interviews", "everything", "coffee", "march", "sure", "question"],
  "teampredict-w3-gone-quiet": ["marcus", "memes", "thumbs", "quiet", "resign", "focused"],

  // ── batch 11, on-the-nose round: the LinkedIn signals ARE the dialogue, so
  //    the emphasised words are the signals themselves plus each turn word.
  "teampredict-w4-new-headshot": ["kevin", "headshot", "professional", "suit", "weddings", "photo", "going", "places"],
  "teampredict-w5-conspiracy-board": ["monday", "headline", "skills", "photo", "endorsed", "founder", "vision", "bigger", "steve"],
  "teampredict-w6-green-ring": ["sandra", "green", "ring", "dentist", "public", "everything", "point"],
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
