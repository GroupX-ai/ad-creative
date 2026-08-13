// Seedance 2.5 ad prompts — 2026-08-13 batch 6, BitPredict for Reddit.
//
// Three 15-second UGC ads at native 720p. First BitPredict video creative and
// the first batch aimed at Reddit rather than Meta.
//
// Why these three premises. Reddit's crypto communities run on one argument:
// who actually called a move, and who is claiming it after the fact. That
// argument is BitPredict's product mechanic, so the comedy and the pitch are the
// same thing, and none of it needs the money language the brand bans. Robby's
// own viral thesis for this product says the same ("a public accuracy score is
// an argument").
//
// Claim safety: BitPredict's hard rule bans every promise or implication of
// financial gain in paid creative, including the site's own USDT, prize, reward
// and payout copy. Nothing here mentions money, prizes, winnings or returns.
// "Free" and "nothing to stake" are approved: the site carries "Free forever",
// "the free, skill-based alternative" and "nothing to deposit, stake, or wager".
// No accuracy percentages are spoken, because no such figure is a published
// claim, and a character's own self-deprecating rate could be misread as one.
//
// Prompt blocks are inherited from batch 5 (`seedance-prompts-b5.mjs`) with one
// addition: SAY_BITPREDICT. Compound brand names have been mispronounced in
// every prior batch ("Email Chacha", "Email Chaper", "One look"), and the fix
// that finally worked was a positive-only rule with a rhyme or word anchor,
// never naming the wrong version.

const UGC_LOOK = `Shot on a modern phone's rear camera, vertical, held at arm's length or propped just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant small handheld drift and one or two natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no colour grade. The subject's face fills a good third of the frame and they look directly into the lens throughout.`;

const PERFORMANCE = `The performance is fast, animated and genuinely energised, like a real person who cannot wait to tell you something. Natural speech with contractions, a half-swallowed word, one small stumble, eyebrows and hands moving. Not polished, not read, not deadpan, never a slow measured delivery.`;

const HOOK = `HOOK. The video is at full energy on the very first frame. There is no lead-in, no breath before the first word, no establishing beat and no silence: the first syllable lands inside the first half second and the subject is already mid-gesture, leaning into the lens. Cut in as though the viewer arrived two seconds late to something already in progress.`;

const CTA = `CLOSING CALL TO ACTION. The final three seconds change gear on purpose. The subject stops moving, settles, locks eye contact straight down the lens, and delivers the closing line noticeably slower and more clearly than everything before it, landing every word, with one single pointing gesture at the lens on the last few words. Everything before this is fast; this is direct. The contrast is what makes it land.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, and none of the stage directions in this prompt are read aloud.`;

// Positive-only, with a word anchor for each half. Never names a wrong version:
// the banner batches found negative phrasing makes the model produce the thing
// being forbidden.
const SAY_BITPREDICT = `BRAND PRONUNCIATION. The spoken brand name is two ordinary English words run together and delivered as one confident word. First "bit", said exactly like the English word bit meaning a small piece. Immediately after it, "predict", the everyday English verb meaning to say in advance what is going to happen. Predict has exactly two syllables: the first is "pre" as in the word prepare, and the second is "dict" as in the word dictionary, carrying the stress. Sound the letter t at the very end. Together it is "BitPredict".`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. No charts, no candlestick graphs, no price tickers and no trading interfaces anywhere in frame. No brand marks or product logos on anything, including clothing and mugs. No music score of any kind. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look. It must look exactly like a video someone shot on their own phone and posted.`;

// Exhaustive rather than prohibitive. Batch 5 proved a screen only stays clean
// when the prompt states what IS on it; listing bans alone produced a caller
// label that read as the brand name.
const SCREEN_RULE = `SCREEN RULE. Any phone or computer screen visible at any point is switched fully off and completely black, an empty dark rectangle reflecting only the room, with nothing on it at all: no interface, no windows, no icons, no text, no numbers, no charts and no glow.`;

export const ADS = [
  {
    id: "bitpredict-c1-that-group-chat",
    company: "bitpredict",
    title: "I Was In That Group Chat",
    format: "UGC selfie, callout hook",
    research:
      "Direct callout / negative hook with blame-shift, both published verbatim archetypes in the 2026-08-12 research synthesis. Aimed at the single most recognisable dynamic in a crypto community: the person who claims a call after the fact. The accusation is the hook and the product is the punchline, so the pitch never has to be argued.",
    approvedCopy:
      '"No edits after lock." (About.tsx) + "nothing to deposit, stake, or wager" (NotGamblingStrip) + free framing (WhyBitPredict)',
    claimNotes:
      "No money, prize, USDT or payout language. No accuracy figure. No chart or trading interface in frame, so no invented price data can render.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a woman in her late twenties shot on her own phone on a city street and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A busy pavement outside a coffee shop in the late afternoon, parked cars and a bus shelter blurred behind her, low sun catching one side of her face. Real street noise and passers-by drifting through the background.

PERSON. MAYA, a woman in her late twenties in a plain zip-up hoodie, hair pulled back, holding a takeaway cup in her free hand. She is amused and exasperated at once, talking to the camera the way you talk about a friend who does this constantly. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already mid-gesture, cup raised, eyebrows up, talking fast straight down the lens: "You didn't call it. I was in that group chat."
3-8s. She counts it off with her free hand, getting funnier and more indignant: "You said down. It went up. You deleted the message."
8-11s. She shrugs, calmer, a small satisfied smile: "Mine lock now. Timestamped. Public."
11-15s. She goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "BitPredict. It's free, and there's nothing to stake." She points once at the lens on the last words.

${CTA}

${SAY_BITPREDICT}

${SCREEN_RULE}

AUDIO. Real street sound: traffic, a bus pulling away, footsteps and a snatch of someone else's conversation. Her voice close and clear over it. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c2-screenshot-or-it-didnt-happen",
    company: "bitpredict",
    title: "Screenshot Or It Didn't Happen",
    format: "UGC selfie, myth-flip on a native community phrase",
    research:
      "Myth-flip hook built on a phrase that already belongs to the platform being bought. 'Screenshot or it didn't happen' is native Reddit language, so the first line reads as a comment rather than a claim, which is the format vacuum the synthesis identified for vertical UGC.",
    approvedCopy:
      '"Every call locks a time-stamped receipt at its own public link. No edits after lock." (cultureCardsData) + free framing',
    claimNotes:
      "No money, prize or payout language. 'Genius' is a joke about people, not a product claim. No chart, screen or interface in frame.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his early thirties shot on his own phone in his parked car and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. The driver's seat of an ordinary older car, parked. A fabric headrest, a smeared windscreen, a supermarket car park visible and out of focus behind him, flat overcast daylight. A crumpled receipt and an empty cup sit in the door pocket.

PERSON. DEV, a man in his early thirties with stubble and a creased work polo shirt, one arm draped over the steering wheel. He is wry and quick, laughing at himself as much as anyone else. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already talking as the shot begins, pointing at the lens, half-laughing: "Screenshot or it didn't happen. That's the rule."
3-8s. He throws the free hand up, faster, enjoying it: "Everyone's a genius in hindsight. Nobody ever has the proof."
8-11s. He taps the steering wheel twice, leaning toward the lens: "So mine go somewhere I can't edit them."
11-15s. He goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "BitPredict. It's free. Go call one." He points once at the lens on the last words.

${CTA}

${SAY_BITPREDICT}

${SCREEN_RULE}

AUDIO. Real parked-car sound: muffled car park noise through glass, a distant trolley, the creak of the seat as he shifts. His voice close in the small space. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c3-worst-idea-ever",
    company: "bitpredict",
    title: "Worst Idea Ever",
    format: "UGC selfie, confession hook",
    research:
      "Confession hook, a Motion-validated tactic from the 550K-ad dataset. Self-deprecation is the register that survives a Reddit comment section, where an earnest claim gets taken apart; the joke concedes the weakness before anyone else can.",
    approvedCopy:
      '"No trading. No gambling. Just verifiable skill." (AboutHeading) + "There is nothing to deposit, stake, or wager" (NotGamblingStrip)',
    claimNotes:
      "No money, prize or payout language. Deliberately no accuracy number anywhere: a character's own hit rate could be misread as a published product statistic, and none exists.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his late twenties shot on his own phone at his kitchen table and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A small cluttered kitchen in the evening, one warm overhead bulb. A cereal bowl, a stack of unopened post and a dying potted plant on the table behind him, a fridge covered in magnets just in shot.

PERSON. SAM, a man in his late twenties in a washed-out t-shirt, hair flattened on one side, rubbing his face and grinning through it, like he is confessing something mildly humiliating and finding it funny. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already talking, both palms up, wincing and grinning at once: "I made all my crypto calls public. Worst idea ever."
3-8s. He drops his head into one hand, then back up, faster: "Turns out I am nowhere near as right as I thought."
8-12s. He shrugs, genuinely cheerful about it now: "But it's climbing. And every single one is on the record."
12-15s. He goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "BitPredict. No trading, no gambling, and it's free." He points once at the lens on the last words.

${CTA}

${SAY_BITPREDICT}

${SCREEN_RULE}

AUDIO. Real kitchen room tone: a fridge hum, a tap dripping once, a chair creaking as he leans back. His voice close and warm. No music.

${BANS}`,
  },
];
