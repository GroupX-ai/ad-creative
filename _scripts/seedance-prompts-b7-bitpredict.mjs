// Seedance 2.5 ad prompts — 2026-08-13 batch 7, BitPredict round 2.
//
// Robby on batch 6: "The third video ad is the only decent one ('I made all my
// crypto calls public') - it's the best script. Needs to be much higher energy.
// Men only (it's a field dominated by Men). In-front of the computer is good
// also, selfie is good. Make it much more engaging."
//
// So this batch is four variations on ONE winning premise rather than four
// different angles. The confession register is fixed; what varies is the moment
// in the arc (day one, three weeks in, the humbling, the call being locked
// right now), the setting, and where the energy peaks.
//
// Four things changed from batch 6:
//   1. PERFORMANCE is rewritten from "energised" to genuinely loud and hyped.
//      Batch 3 already proved that pace and performance carry a phone-shot ad
//      without a music bed, so the fix is the acting, not a score.
//   2. Every presenter is male, per Robby.
//   3. Three of the four sit at a computer desk. The monitor is always angled so
//      no part of the display surface is in shot: batch 5 proved a screen only
//      stays safe when the prompt states exhaustively what IS visible, and an
//      on-screen leaderboard would invent usernames and numbers, which this
//      brand bans outright.
//   4. Every clip gets a composited end card, so the brand is legible even
//      though "BitPredict" is a name the model says correctly only about two
//      times in three (batch 6: "BitProtect", then "Bitpropt", on two rolls of
//      the same clip). The end card is also the free repair if a take garbles it.
//
// Claim safety is unchanged and unrelaxed: no money, prize, USDT, payout or
// accuracy-percentage language anywhere, even though the site itself now carries
// prize copy. A character may say his own accuracy is climbing, because that is
// the product's mechanic and carries no number; no figure is ever stated.

const UGC_LOOK = `Shot on a modern phone's rear camera, vertical, held at arm's length or propped just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant handheld drift and two or three natural reframes as he moves. Available light only. Mild lens distortion up close, real skin texture, visible pores and stubble, no beauty smoothing, no colour grade. His face fills a good third of the frame and he looks directly into the lens throughout.`;

// The batch-6 note said "energised". It rendered as merely brisk. This asks for
// the register of someone genuinely worked up, which is what Robby means by
// engaging, and it keeps the phone-shot illusion because loud is not the same
// as polished.
const PERFORMANCE = `The performance is loud, fast and genuinely hyped, the way a man talks when he is telling a friend something outrageous that just happened to him. He is grinning and laughing at himself throughout, voice raised and rising further as he goes, occasionally talking over his own sentence and doubling back. Big open-handed gestures that cross in front of the lens, a real laugh, leaning right into the camera and back out again, head shaking in disbelief. Not read, not measured, not deadpan, never calm. He is enjoying this enormously.`;

const HOOK = `HOOK. The video is at maximum energy on the very first frame, louder and faster than anything that follows. There is no lead-in, no breath before the first word, no establishing beat and no silence: the first syllable lands inside the first quarter second, already at volume, and he is already mid-gesture and leaning into the lens. Cut in as though the viewer arrived three seconds late to a story already in full flow.`;

const CTA = `CLOSING CALL TO ACTION. The final three seconds change gear hard. He stops moving, drops the volume, settles, locks eye contact straight down the lens and delivers the closing line noticeably slower and more clearly than everything before it, landing every single word, with one deliberate point at the lens on the last few words. Everything before this is loud and fast; this is quiet and direct. The contrast is the whole point and it must be obvious.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, no ad-libbed reactions, and none of the stage directions in this prompt are read aloud.`;

// Hardened in batch 6 after a whole-word rhyme anchor still produced
// "BitProtect". Anchors each syllable to its own everyday word. Positive only:
// naming the wrong version makes the model produce it.
const SAY_BITPREDICT = `BRAND PRONUNCIATION. The spoken brand name is two ordinary English words run together and delivered as one confident word. First "bit", said exactly like the English word bit meaning a small piece. Immediately after it, "predict", the everyday English verb meaning to say in advance what is going to happen. Predict has exactly two syllables: the first is "pre" as in the word prepare, and the second is "dict" as in the word dictionary, carrying the stress. Sound the letter t at the very end. Together it is "BitPredict". He says it clearly and unhurriedly, with a small pause before it.`;

// Exhaustive, not prohibitive. A monitor turned away has no display surface to
// hallucinate onto, which removes the invented-UI failure mode completely.
const DESK_RULE = `MONITOR RULE. A computer monitor stands on the desk but it is turned away from the camera, so only its plain back panel, its stand and its side edge are ever visible. No part of the display surface appears in shot at any point, at any angle, and there is no glow, no reflection of a screen and no light spill from it onto his face. No other screen, phone display, tablet or television is visible anywhere in the frame.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. No charts, no candlestick graphs, no price tickers, no trading interfaces and no leaderboards anywhere in frame. No brand marks or product logos on anything, including clothing, mugs and hardware. No music score of any kind. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look. It must look exactly like a video a man shot on his own phone and posted.`;

export const ADS = [
  {
    id: "bitpredict-c4-worst-idea-ever-loud",
    company: "bitpredict",
    title: "Worst Idea Ever (louder)",
    format: "UGC selfie at a desk, confession hook",
    research:
      "Robby picked this script out of batch 6 as the only good one. Same words, same confession beat order, rebuilt at the energy he asked for and moved to a desk. Confession is a Motion-validated hook tactic from the 550K-ad dataset.",
    approvedCopy:
      '"No trading. No gambling. Just verifiable skill." (AboutHeading.tsx)',
    claimNotes:
      "No money, prize or payout language. No accuracy figure. Monitor turned away, so no invented leaderboard or chart can render.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his early thirties shot on his own phone at his desk and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A cramped spare-room home office in the evening, lit by one warm desk lamp and the grey daylight from a window behind him. A cluttered desk: a keyboard shoved to one side, a tangle of cable, an empty mug, a stack of unopened post, a dying plant on the windowsill. Painted plasterboard wall, one crooked picture frame.

PERSON. RYAN, a man in his early thirties in a faded t-shirt, hair flattened on one side, unshaven. He is in a swivel chair and cannot sit still in it. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already loud and mid-gesture, both hands up beside his head, half-laughing: "I made all my crypto calls public. Worst idea ever."
3-8s. He drops his head into one hand, comes back up shouting through a laugh, other hand slapping the desk once: "Turns out I'm way less of a genius than I thought."
8-12s. He rocks back in the chair, both arms wide, delighted: "But it's climbing. And every call is on the record."
12-15s. He plants both feet, rolls the chair forward, goes still and quiet, and looks straight down the lens. Slower and much clearer than everything before: "BitPredict. No trading, no gambling, and it's free." He points once at the lens on the last words.

${CTA}

${SAY_BITPREDICT}

${DESK_RULE}

AUDIO. Real small-room sound: the swivel chair creaking and rolling, his palm hitting the desk, a mug knocked against wood, muffled traffic through the window. His voice loud and close, slightly clipping on the laugh. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c5-three-weeks-in",
    company: "bitpredict",
    title: "Three Weeks In",
    format: "UGC selfie at a desk, confession with a progress turn",
    research:
      "Same confession register, moved later in the arc so the ad carries a turn rather than only a joke: the humiliation is the setup and the improvement is the payoff. Gives the batch a variant that resolves upward, which is the version most likely to survive a Reddit comment thread that wants to dunk on it.",
    approvedCopy:
      '"Every call locks a time-stamped receipt at its own public link. No edits after lock." (cultureCardsData.tsx) + "nothing to deposit, stake, or wager" (NotGamblingStrip.tsx)',
    claimNotes:
      "'My accuracy is going up' is the character's own trajectory and carries no number; no published figure exists and none is implied. Monitor turned away.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his late twenties shot on his own phone at his desk and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A corner of a shared flat used as a workspace, late afternoon. A cheap desk against a wall of scuffed paint, a monitor turned away from the camera, a desk fan, an overflowing bin, a hoodie thrown over the back of the chair, takeaway containers stacked on the floor behind him.

PERSON. MARCUS, a man in his late twenties in a zip hoodie with the sleeves shoved up, cap on backwards. He gestures with both hands constantly and leans so far forward at one point that he fills the frame. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already at full volume, pointing both index fingers at the lens, laughing: "Three weeks of public crypto calls. I am getting destroyed."
3-8s. He throws both hands up, then jabs a finger down at the desk repeatedly, voice rising: "But my accuracy is actually going up. And I can prove it."
8-12s. He shakes his head, grinning, both palms open: "Every call timestamped. Nothing to delete. Nothing to stake."
12-15s. He sits back, goes still and quiet, and looks straight down the lens. Slower and much clearer than everything before: "BitPredict. It's free. Go call one." He points once at the lens on the last words.

${CTA}

${SAY_BITPREDICT}

${DESK_RULE}

AUDIO. Real room sound: the desk fan whirring, his hand hitting the desk, the chair creaking, a door closing somewhere else in the flat. His voice loud, close and a little hoarse. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c6-humbling",
    company: "bitpredict",
    title: "The Humbling",
    format: "UGC selfie standing, confession with the sharpest self-roast",
    research:
      "The purest form of the confession hook: the speaker concedes his own incompetence before anyone else can, which is the register that survives a Reddit comment section. Standing and pacing gives the batch a setting that is not a desk, per Robby's note that selfie also works.",
    approvedCopy:
      '"No trading. No gambling. Just verifiable skill." (AboutHeading.tsx)',
    claimNotes:
      "'Brutal' and 'humbling' describe the character's own experience, not a product outcome. No numbers anywhere. No screens in the scene at all.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his thirties shot on his own phone while pacing around his living room, and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. An ordinary lived-in living room in the early evening, one lamp on and curtains half drawn. A sofa with a crumpled throw, a coffee table with a plate still on it, a radiator, a bookshelf with things stacked at angles. He moves through the room as he talks, so the background swings behind him.

PERSON. TOM, a man in his mid thirties, thinning hair, a couple of days of stubble. He wears a completely plain heather-grey crew-neck t-shirt in a single flat colour, blank across the whole chest: no motif, no emblem, no crest, no embroidery, no printed design, no pocket and no lettering anywhere on the garment. He paces, turns on the spot, and at one point walks the phone right up to his own face. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already shouting through a laugh, walking straight at the lens: "I genuinely thought I was good at crypto. So I started logging every call."
3-8s. He stops dead, throws his head back, both hands on top of his head: "First week? Brutal. Absolutely humbling."
8-12s. He drops his hands, points at the lens, walking backwards now, delighted: "It's public, it's timestamped, and I actually got better."
12-15s. He stops walking, stands still, drops his voice, and looks straight down the lens. Slower and much clearer than everything before: "BitPredict. No trading, no gambling, and it's free." He points once at the lens on the last words.

${CTA}

${SAY_BITPREDICT}

AUDIO. Real living-room sound: his footsteps on carpet then a floorboard, his own laugh close on the mic, the phone brushing against his sleeve, a distant television in another room. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c7-just-locked-it",
    company: "bitpredict",
    title: "Just Locked It",
    format: "UGC selfie at a desk, confession in the present tense",
    research:
      "Confession moved into the present moment so the ad has stakes happening now rather than a story about the past. The mechanic (24 hours, no edits after lock) is delivered as the reason he is nervous, which explains the product without a single feature line.",
    approvedCopy:
      '"No edits after lock." (About.tsx) + 24-hour window (stepsData.ts, faqData.ts) + "nothing to deposit, stake, or wager" (NotGamblingStrip.tsx)',
    claimNotes:
      "24 hours is the site's only marketed window and is stated correctly. No money, prize or payout language. Monitor turned away, so the call itself is never shown on a screen.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his late twenties shot on his own phone at his desk, seconds after doing something, and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A narrow desk against a bedroom wall at night, one warm lamp and no other light. A monitor turned away from the camera, a mechanical keyboard, an energy drink can, headphones round his neck, a poster taped slightly crooked on the wall behind him with no readable text on it.

PERSON. DANNY, a man in his late twenties in a plain long-sleeved top, hair pushed back with one hand repeatedly. He is wired, half laughing, half genuinely anxious about what he has just done. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already loud, both hands raking back through his hair, laughing at himself: "I just locked a crypto call I am going to regret."
3-8s. He grabs the edge of the desk with both hands and shakes it slightly, voice climbing: "Twenty four hours, up or down, and I can't edit it."
8-12s. He lets go, sits back, both palms up, shaking his head and grinning: "That's the point. It's on my record either way."
12-15s. He leans in, goes still and quiet, and looks straight down the lens. Slower and much clearer than everything before: "BitPredict. Free, and nothing to stake." He points once at the lens on the last words.

${CTA}

${SAY_BITPREDICT}

${DESK_RULE}

AUDIO. Real bedroom-at-night sound: the desk shifting under his hands, the can rattling, headphone cable knocking the desk, the room otherwise very quiet. His voice loud and close in a small space. No music.

${BANS}`,
  },
];
