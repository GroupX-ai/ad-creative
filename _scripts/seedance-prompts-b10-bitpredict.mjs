// Seedance 2.5 ad prompts — 2026-08-18 batch 10, BitPredict "crazy, funny, parody, UGC".
//
// Robby: "You can add more crazy, funny, parody, and UGC videos that will go viral
// 15-30 seconds long. Keep the one word caption thing. You can schedule them in TikTok
// and add to Reddit Ads as-well."
//
// Concepts came out of a six-territory generation sweep, adversarially screened for claim
// safety, Reddit gambling-policy risk, whether they are actually funny, and Seedance
// render risk. Twenty were written, eight ship.
//
// ── The one lesson this batch is built around ───────────────────────────────────────
// A previous 17-ad run of genre parodies was rejected outright by Robby: "most of these
// are quite dry and not so good." The pipeline worked and the creative did not. Cause:
// every prompt chased "documentary realism, deadpan, unperformed," so all seventeen landed
// in ONE register (quiet, muted, slow, punchline at 25 seconds). Format was varied across
// fifteen parodies; ENERGY never was. The shared block literally ended with "Nobody is
// enjoying themselves."
//
// So parody is back, but LOUD. Every ad here opens at full volume on the first frame, the
// turn lands by second five, and the visual joke sits in the middle where the model
// actually renders it. Deadpan survives only as a deliberate contrast beat inside an
// otherwise loud ad (the caster's two crashes, the polygraph examiner), never as the house style.
//
// ── What else changed from batch 7 ──────────────────────────────────────────────────
//  1. MUSIC is allowed now. Banning all music was an over-correction against slop and it
//     made clips feel inert. The parody formats get a diegetic or bed track where the genre
//     implies one; the UGC selfies stay dry, because a score breaks the phone-shot illusion.
//  2. SILENCE_RULE is new. Two ads hold a deliberate dead-air beat (the caster eating, the
//     polygraph needle) and dead air is exactly where this model improvises word salad.
//     The rule states positively what fills the silence.
//  3. WARDROBE is specified positively on every character after a render put a Ralph Lauren
//     polo player on a presenter's chest, despite a ban list that already forbade it.
//  4. The brand name is spoken in only some ads. Where the joke does not need it, it is left
//     entirely to the composited end card, which removes the mispronunciation failure mode
//     at zero cost. Where it IS spoken it carries the hardened per-syllable anchor.
//
// Claim safety is unchanged and unrelaxed: no money, prize, USDT, payout or
// accuracy-percentage language anywhere, even though the site itself now carries prize copy
// across the hero, the footer and a whole /rewards page.

// ── Shared blocks ───────────────────────────────────────────────────────────────────

// The phone-camera look, for the UGC selfies only.
export const UGC_LOOK = `Shot on a modern phone's rear camera, vertical, held at arm's length or propped just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant handheld drift and two or three natural reframes as he moves. Available light only. Mild lens distortion up close, real skin texture, visible pores and stubble, no beauty smoothing, no colour grade. His face fills a good third of the frame and he looks directly into the lens throughout.`;

// The look for the parody formats. Still handheld and real, never a polished commercial.
export const SET_LOOK = `Shot handheld on a real camera with a short zoom, vertical, with visible operator drift and a couple of quick reframes as the action moves. Practical light only: the fluorescent tubes, the desk lamp, the window that is actually in the room. Real sensor noise in the shadows, imperfect focus that has to hunt once, real skin texture on every face, no beauty smoothing and no colour grade. It looks like a real camera in a real room, never like a commercial.`;

// Rewritten in batch 7 from an adjective ("energised", which rendered as merely brisk) to a
// specific human register. Kept verbatim here because all four batch-7 clips landed it.
export const PERFORMANCE = `The performance is loud, fast and genuinely hyped, the way a man talks when he is telling a friend something outrageous that just happened to him. He is grinning and laughing at himself throughout, voice raised and rising further as he goes, occasionally talking over his own sentence and doubling back. Big open-handed gestures that cross in front of the lens, a real laugh, leaning right into the camera and back out again, head shaking in disbelief. Not read, not measured, not deadpan, never calm. He is enjoying this enormously.`;

export const HOOK = `HOOK. The video is at maximum energy on the very first frame, louder and faster than anything that follows. There is no lead-in, no breath before the first word, no establishing beat and no silence: the first syllable lands inside the first quarter second, already at volume, and he is already mid-gesture and leaning into the lens. Cut in as though the viewer arrived three seconds late to a scene already in full flow.`;

export const CTA = `CLOSING CALL TO ACTION. The final three seconds change gear hard. He stops moving, drops the volume, settles, locks eye contact straight down the lens and delivers the closing line noticeably slower and more clearly than everything before it, landing every single word, with one deliberate point at the lens on the last few words. Everything before this is loud and fast; this is quiet and direct. The contrast is the whole point and it must be obvious.`;

export const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks in the beats below are ever spoken, by the character each line is assigned to. Nothing else is said by anyone at any point: no extra narration, no counting, no muttering, no improvised commentary, no ad-libbed reactions, no background chatter, and none of the stage directions in this prompt are read aloud.`;

// New in batch 10. Three ads hold a deliberate beat with no dialogue, and dead air is where
// this model improvises. Stating positively what fills the gap removes the temptation.
export const SILENCE_RULE = `SILENCE RULE. Where a beat below says nobody speaks, nobody speaks. That beat is carried entirely by the action and the room sound described for it, and it plays in full at its stated length. No character says anything during it, no voice is added over it, nobody hums, sighs a word, or mouths anything, and no narrator appears.`;

// Hardened in batch 6 after a whole-word rhyme anchor still produced "BitProtect", then
// confirmed in batch 7 when all four clips said it correctly. Anchors each syllable to its
// own everyday word. Positive only: naming the wrong version makes the model produce it.
export const SAY_BITPREDICT = `BRAND PRONUNCIATION. The spoken brand name is two ordinary English words run together and delivered as one confident word. First "bit", said exactly like the English word bit meaning a small piece. Immediately after it, "predict", the everyday English verb meaning to say in advance what is going to happen. Predict has exactly two syllables: the first is "pre" as in the word prepare, and the second is "dict" as in the word dictionary, carrying the stress. Sound the letter t at the very end. Together it is "BitPredict". He says it clearly and unhurriedly, with a small pause before it.`;

// Exhaustive, not prohibitive. A monitor turned away has no display surface to hallucinate
// onto, which removes the invented-UI and invented-leaderboard failure modes completely.
export const SCREEN_RULE = `SCREEN RULE. Any computer monitor, television or phone in shot is turned away from the camera or held with its screen facing away, so only the plain back panel, the stand and the side edge are ever visible. No part of any display surface appears in shot at any point, at any angle, and there is no glow, no reflection of a screen and no light spill from one onto anyone's face.`;

// Added in batch 10 as a shared block. Batch 7 proved a ban list does not hold: the prompt
// already said "no brand marks or product logos on anything, including clothing" and a
// render still put a red polo player on the presenter's chest, costing a $7 re-roll. The fix
// is to state positively and exhaustively what the garment IS.
export const WARDROBE = `WARDROBE. Every garment worn by anyone in shot is a single flat colour and completely blank: no motif, no emblem, no crest, no embroidery, no printed design, no stripe, no pocket logo and no lettering anywhere on any item of clothing at any point. Plain fabric only, on every character, front and back.`;

export const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. No charts, no candlestick graphs, no price tickers, no trading interfaces and no leaderboards anywhere in frame. No brand marks or product logos on anything, including clothing, mugs, hardware and signage. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look.`;

export const ADS = [
  {
    id: "bitpredict-c8-two-am-whisper",
    company: "bitpredict",
    title: "Two AM Whisper",
    format: "UGC selfie, whisper-shout meltdown in a dark kitchen",
    research:
      "The confession premise Robby picked out of batch 6, pushed into a register the brand has never shot: volume constrained by circumstance. A man at maximum excitement who physically cannot raise his voice is funnier and more watchable than a man simply shouting, and it forces the performance into the face and hands, which is where a phone camera is strongest.",
    approvedCopy:
      '"Every call locks a time-stamped receipt at its own public link. No edits after lock." (cultureCardsData.tsx)',
    claimNotes:
      "No money, prize or payout language. 'I was right' is one man's single call with no figure attached and no rate implied. No screens in shot.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his early thirties shot on his own phone in his kitchen in the middle of the night and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A small suburban kitchen at two in the morning, lit only by the bulb over the cooker hood and, later, by the inside of the fridge. Worktop clutter: a draining rack of dishes, a kettle, a fruit bowl with two bananas, a tea towel over the oven handle, a child's drawing stuck to a cupboard door. A dark hallway leads off behind him and he keeps glancing at it.

PERSON. DAN, a man in his early thirties, hair flattened on one side, barefoot. ${WARDROBE} He is wearing a plain heather-grey crew-neck t-shirt and plain navy pyjama bottoms. His whole body is at maximum excitement while his voice is clamped down to a whisper-shout, and the contained energy keeps escaping into his hands and shoulders.

PERFORMANCE. He is whisper-screaming: the volume of a whisper with the intensity of a shout, hoarse and cracking, eyes enormous, face inches from the lens. He keeps checking the dark hallway and dropping even quieter, then surging back. Big silent gestures, gripping the worktop, bouncing on the balls of his feet. He is thrilled and completely unable to express it at normal volume, and that is the joke.

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already whisper-screaming on the first frame, face close to the lens, eyes wide, one hand flat on the worktop, snatching a glance at the dark hallway: "It's two AM and I was right about crypto."
3-7s. He grips the edge of the worktop with both hands and shakes it silently in triumph, then turns and screams into a tea towel, and comes back up to the lens grinning: "Nobody ever believes me."
7-11s. He pulls the fridge door open so the interior light throws across his face, and whisper-shouts into it, jabbing a finger down onto the worktop on each of the last three words: "Now every call I make is public. Timestamped. Locked."
11-15s. He pushes the fridge shut with his hip and the room goes dim again. He stops dead, drops to a normal quiet speaking voice and looks straight down the lens, slower and much clearer than everything before, pointing once at the lens on the last three words: "BitPredict. Free. Go call one."

${CTA}

${SAY_BITPREDICT}

${SCREEN_RULE}

AUDIO. Night-quiet house sound: the fridge hum rising when the door opens, his bare feet on lino, a dish shifting in the rack, his own hoarse breathing very close to the microphone. His voice stays quiet throughout and the microphone is close enough to catch the strain in it. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c9-there-is-a-link",
    company: "bitpredict",
    title: "There Is A Link",
    format: "UGC selfie, hyperventilating with joy on a staircase",
    research:
      "Every BitPredict ad so far resolves downward: the man is humiliated, destroyed, or humbled. This one resolves upward and is the only genuinely joyful clip in the library, which matters because the batch-3 finding was that the account's register never varied. Vindication is also the emotion the product actually sells.",
    approvedCopy:
      '"Every call locks a time-stamped receipt at its own public link. No edits after lock." (cultureCardsData.tsx)',
    claimNotes:
      "'I have never been able to prove anything' is a joke about the man, not a product claim. No number, no rate, no money language anywhere.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his late twenties shot on his own phone in his hallway and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. The bottom of a narrow carpeted staircase in a rented flat, mid-morning, lit by frosted glass in the front door behind him. A pile of unopened post on the second step, a pair of trainers kicked off, a coat hook overloaded with jackets, scuffed magnolia paint.

PERSON. SAM, a man in his late twenties, unshaven, hair not done. ${WARDROBE} He is wearing a plain forest-green crew-neck t-shirt and plain black joggers. He is so pleased he cannot physically hold still or finish a sentence cleanly.

PERFORMANCE. He is breathless and laughing throughout, too excited to get the words out in order, wheezing, fanning his own face, legs going weak under him. Loud, fast, delighted with himself, talking over his own laugh and doubling back. This is a man who has waited his entire life to be able to prove something and it has finally happened.

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already breathless and laughing on the first frame, both hands shaking beside his face, barely able to get it out: "I was right about crypto and there is a link."
3-7s. His legs go and he sits down hard on the third stair mid-sentence, fanning his face with one hand, wheezing with laughter: "A public link. Timestamped."
7-11s. He shoots back up onto his feet, paces two steps out of frame and comes straight back in, both arms wide, shouting through a grin: "I have never been able to prove anything."
11-15s. He sits back down on the stair, goes completely still, drops the volume and looks straight down the lens, slower and much clearer than everything before, pointing once at the lens on the last three words: "BitPredict. Free. Go call one."

${CTA}

${SAY_BITPREDICT}

${SCREEN_RULE}

AUDIO. Hallway sound: his feet on carpet then on the hard floor, the creak of the stair when he drops onto it, post sliding off the step, his own laughing and breathing right on the microphone. Faint traffic through the front door. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c10-pulled-over",
    company: "bitpredict",
    title: "Pulled Over",
    format: "UGC selfie filmed in a parked car, panic-relief",
    research:
      "The parked-car selfie is the single most native format on the platform and batch 6 already proved this model renders car interiors cleanly. The premise makes the 24-hour window the antagonist, which is the one product mechanic none of the previous ads dramatised.",
    approvedCopy:
      '24-hour call window (stepsData.ts, faqData.ts) + "nothing to deposit, stake, or wager" (NotGamblingStrip.tsx)',
    claimNotes:
      "'Nothing to stake' is verbatim approved positioning. No money, prize or payout language. Phone is never shown screen-on.",
    aspect_ratio: "9:16",
    duration: "20",
    prompt: `A vertical selfie video that a man in his thirties shot on his own phone in his parked car and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. The driver's seat of an ordinary older hatchback, parked at the edge of a supermarket car park on an overcast afternoon, engine off, hazard lights ticking. A tipped-over paper grocery bag in the passenger footwell with a loaf and two apples spilled out of it. A parking ticket wedged in the sun visor, a phone mount with no phone in it, crumbs on the seat. Grey daylight through the windscreen, no sun.

PERSON. MARCUS, a man in his thirties, seatbelt still fastened, slightly out of breath. ${WARDROBE} He is wearing a plain charcoal zip-up hoodie over a plain white crew-neck t-shirt. He fills the left of the frame with the driver's window behind him.

${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already shouting on the first frame, seatbelt still on, breathing hard, both hands off the wheel and up beside his head: "I pulled off the road to make a crypto call."
3-8s. He throws both hands up and one of them lands on the horn by accident. The horn blares once and he jumps, then keeps going louder through a laugh, pointing at the wheel as though it betrayed him: "Twenty four hours, up or down, and I almost missed it."
8-14s. He twists round to look at the tipped-over grocery bag in the passenger footwell, comes back to the lens and gestures at the whole car with both palms, delighted with himself: "Nothing to stake. That's what makes this insane."
14-20s. He sags back into the headrest, goes completely still, drops the volume right down and looks straight down the lens, slower and much clearer than everything before, pointing once at the lens on the last word: "It's locked. It's public. BitPredict. Free."

${CTA}

${SAY_BITPREDICT}

${SCREEN_RULE}

AUDIO. Parked-car sound: the hazard-light relay ticking steadily throughout, the single accidental horn blare, his seatbelt creaking, his breathing close on the microphone, muffled car-park noise outside the glass. No music, no engine running, no radio.

${BANS}`,
  },

  {
    id: "bitpredict-c11-receipt-roll",
    company: "bitpredict",
    title: "The Receipt That Won't Stop",
    format: "Late-night infomercial parody, single pitchman, oversized physical prop",
    research:
      "The loud direct-response family is one of only two that Robby has ever picked from this repo. An infomercial pitchman is that family taken to its logical extreme, and the till-roll gag makes the product mechanic physically visible without a screen, a chart or a leaderboard, all of which are banned in frame. The prop gag sits at 4-11s, squarely in the middle, because the last four seconds are the least reliable thing this model renders.",
    approvedCopy:
      '"Every call locks a time-stamped receipt at its own public link. No edits after lock." (cultureCardsData.tsx) + "No trading. No gambling. Just verifiable skill." (AboutHeading.tsx)',
    claimNotes:
      "The receipt roll is blank cream paper with nothing printed on it, so no invented text, figures or usernames can render on it. No money, prize or payout language.",
    aspect_ratio: "9:16",
    duration: "20",
    prompt: `A vertical late-night infomercial parody, played completely straight and at maximum volume. It is shot like a real cheap television commercial from the nineties, not like a modern advertisement.

${SET_LOOK}

PLACE. A cheap infomercial set: a white laminate counter against a flat sky-blue backdrop, lit hard and evenly from the front so there are no interesting shadows at all. The set is bare except for the counter. The flatness is deliberate and correct for the genre.

PERSON. The PITCHMAN, a man in his forties with a big television voice, sleeves rolled to the elbow. ${WARDROBE} He is wearing a plain mid-blue button-down shirt, completely blank across the whole chest and back, and plain dark trousers. He is enormously, sincerely excited about a free product.

PERFORMANCE. Full hard-sell hysteria from the first frame: shouting, voice cracking on the peaks, slamming both palms on the counter, jabbing a finger straight down the lens, eyes wide, leaning right into the camera and back out. He never once drops the conviction. He is selling this like it costs a thousand pounds.

${HOOK}

${SPEECH_RULE}

BEATS.
0-2s. Opens already at full volume mid-shout, both palms slamming the counter, leaning into the lens: "Stop telling people you called that crypto move."
2-4s. He jabs a finger straight down the lens, eyes wide, voice cracking: "Prove it!"
4-11s. He grabs a fat roll of blank cream till paper from under the counter and yanks the loose end. It unspools fast across the counter, over the edge and onto the floor and keeps coming and coming while he shouts over the top of it, gathering armfuls: "Every crypto call locks a time-stamped receipt. No edits. Ever."
11-15s. The paper is now looped around his forearm and pooling around his shoes. He lifts a double handful of it above his head and lets it drop over himself, laughing and shouting: "It just keeps going!"
15-17s. He kicks the heap of paper aside, plants both fists on the counter and roars straight into the lens: "No trading. No gambling. Just verifiable skill."
17-20s. Hard gear change. He stops dead, straightens up, drops to a normal quiet speaking voice and looks straight down the lens, slower and much clearer than everything before, with a small pause before the name: "It's free. BitPredict."

${CTA}

${SAY_BITPREDICT}

PROP RULE. The till roll is completely blank cream paper. Nothing is printed on it at any point: no words, no numbers, no lines, no logos, no barcodes, no marks of any kind. It is plain unmarked paper for its entire length.

AUDIO. Hard flat television-studio sound with almost no room reverb. His voice loud and close and slightly clipping on the peaks, palms hitting laminate, the till roll rattling off its spool and paper crumpling underfoot. A short bright brassy commercial sting hits under the first two seconds and stops. No music after that.

${BANS}`,
  },

  {
    id: "bitpredict-c12-caster-waits",
    company: "bitpredict",
    title: "The Caster Waits",
    format: "Esports caster parody, solo commentary booth, hype-to-nothing crash",
    research:
      "BitPredict is a leaderboard and a competition, so calling a crypto prediction like a grand final is directly on-mechanic rather than a borrowed joke. The structure is a double crash, which puts both laughs before second thirteen. The dead-air beat in the middle is the whole gag and is governed by the new SILENCE_RULE, because unscripted gaps are exactly where this model improvises word salad.",
    approvedCopy:
      '"Every call locks a time-stamped receipt at its own public link. No edits after lock." (cultureCardsData.tsx)',
    claimNotes:
      "'He was wrong' is one character's outcome, carries no figure and implies no rate. Monitors turned away so no leaderboard, chart or username can render. No money language.",
    aspect_ratio: "9:16",
    duration: "20",
    prompt: `A vertical esports commentary-booth parody, played completely straight. Shot like a real broadcast booth camera, not like an advertisement.

${SET_LOOK}

PLACE. A cramped commentary booth: a desk against a dark curtain, a microphone on a boom arm, a monitor turned away from the camera so only its back panel and stand are visible, a tangle of cable, and a lanyard hanging off the monitor arm. Lit by one hard practical light overhead and the faint edge of a corridor light behind the curtain.

PERSON. The CASTER, a man in his thirties with a headset around his ears, sitting in a wheeled office chair. ${WARDROBE} He is wearing a plain black crew-neck t-shirt, completely blank across the whole chest and back. He is alone in the booth.

PERFORMANCE. Full arena-caster hype on the peaks: out of the chair, screaming, hands clamped on his own head, leaning into the microphone. Then a total collapse of energy, twice, where he becomes completely flat and still. The gap between the two registers is the joke and both extremes must be fully committed.

${HOOK}

${SPEECH_RULE}

${SILENCE_RULE}

BEATS.
0-2s. Already screaming on the very first frame, up out of the chair, both hands clamped on top of his own head: "He is calling crypto! He is going up!"
2-3.5s. Both palms flat on the desk, leaning right into the microphone, still at full volume: "Locked! He cannot edit it!"
3.5-7s. The energy vanishes mid-breath. He drops straight down into the chair, pulls the headset off one ear and says it completely flat, staring ahead: "And now we wait twenty-four hours."
7-12s. Nobody speaks for this entire beat. He unwraps a sandwich and eats it slowly with the headset around his neck, staring dead ahead at nothing. He checks his watch, slumps further down in the chair, and the chair turns slightly under him. The beat plays in full with only room sound.
12-16s. He explodes back up onto his feet without warning, the chair rolling away behind him and hitting the desk, both arms wide, screaming again: "Twenty-four hours later! The receipt is still there!"
16-20s. He sits back down heavily, exhausted, drops the volume completely and says it quietly with a small shrug, looking straight down the lens, slower and much clearer than everything before: "He was wrong. Everybody can see it."

${CTA}

${SCREEN_RULE}

PROP RULE. Every object on the desk is plain and completely unmarked. The only items on it are the microphone on its boom arm, loose cable, a lanyard, and a sandwich wrapped in clear plain plastic film. There is no can, no bottle, no cup and no packaging of any kind anywhere in the room, and no object in shot carries any printing, label, lettering, colour block or logo on any surface at any point.

AUDIO. Booth sound: the chair casters rolling and knocking the desk, the sandwich wrapper, his headset creaking, a faint distant crowd murmur bleeding through the curtain that never becomes cheering. On the quiet beat, only room tone and the wrapper. His voice loud and close and clipping on the screamed peaks. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c13-the-needle",
    company: "bitpredict",
    title: "The Needle",
    format: "Lie-detector parody, two characters, one physical gag",
    research:
      "The lowest spoken-word count in the batch, so almost all of it is carried by one visual: the needle. It is the shortest route to the product's core argument, which is that saying you called it and being able to prove it are different things. The examiner's flat delivery is a deliberate contrast beat inside a loud ad, not the batch's register.",
    approvedCopy:
      '"No trading. No gambling. Just verifiable skill." (AboutHeading.tsx)',
    claimNotes:
      "The polygraph chart paper is blank with only an ink trace on it, so no invented text or figures can render. 'Feelings aren't receipts' is a joke about the character and carries no claim. No money language.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical lie-detector-test parody, played completely straight. Shot like a real camera in a real room, not like an advertisement.

${SET_LOOK}

PLACE. A bare grey examination room: a scuffed desk, a stacking chair, a wall-mounted clock, a venetian blind half closed over a window with nothing but flat sky behind it. On the desk sits a polygraph machine, an old boxy unit with a rolling paper drum and a single ink needle. Lit by one overhead fluorescent tube with a faint flicker.

PEOPLE. The EXAMINER, a bored man in his fifties sitting sideways to the desk, holding a pen he never uses. The SUBJECT, a man in his thirties sitting upright in the stacking chair with sensor straps across his chest and wires running to the machine. ${WARDROBE} The examiner wears a plain pale-grey button-down shirt, blank across the whole chest and back. The subject wears a plain white crew-neck t-shirt, blank across the whole chest and back.

PERFORMANCE. The examiner is loud, bored and completely uninterested, the volume of a man who has asked this a hundred times. The subject starts absolutely certain and chin-up, then breaks fast and loudly into a squeaking panic. Neither of them is calm or restrained.

${HOOK}

${SPEECH_RULE}

${SILENCE_RULE}

BEATS.
0-2s. Already talking as the frame opens, sitting sideways, loud enough to fill the room, not looking at the subject: "Did you call the crypto top?"
2-4s. The SUBJECT lifts his chin, entirely certain, straps taut across his chest: "Absolutely."
4-7s. Nobody speaks for this entire beat. The ink needle whips into a violent scribble, the paper unspools fast off the drum and heaps onto the floor beside the desk, and the examiner watches the pile grow and then looks slowly back at the subject without changing his expression at all.
7-10s. The SUBJECT breaks completely, both hands up against the straps, voice climbing into a squeak, saying it twice: "It was a feeling! It was a feeling!"
10-15s. The EXAMINER turns and looks straight down the lens, dry and flat, still holding the unused pen, and delivers it slowly and much more clearly than anything before it, with a small pause before the name: "Feelings aren't receipts. No gambling. Just verifiable skill. BitPredict."

${SAY_BITPREDICT}

${SCREEN_RULE}

PROP RULE. The polygraph paper is blank white chart paper carrying only the wavering ink trace drawn by the needle. Nothing else is printed on it at any point: no words, no numbers, no grid labels, no logos.

AUDIO. Hard small-room sound: the fluorescent tube's faint hum, the needle scratching and then whipping across the paper, the drum turning, paper heaping onto lino, the stacking chair creaking as the subject strains against the straps. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c14-prove-it",
    company: "bitpredict",
    title: "Prove It",
    format: "Courtroom cross-examination parody, two characters, loud and theatrical",
    research:
      "Built directly on the only BitPredict ad that has earned clicks on Reddit: banner B1 'You say you called it. Prove it' took 2 of the campaign's 3 clicks at 0.60% CTR against a 0.15% account average. This is that exact line as a moving picture, which makes the batch a real test of the proposition rather than only of the format.",
    approvedCopy:
      '"Every call locks a time-stamped receipt at its own public link. No edits after lock." (cultureCardsData.tsx)',
    claimNotes:
      "No money, prize or payout language. No figures. The gallery is empty so no invented signage, seals or documents are needed anywhere in frame.",
    aspect_ratio: "9:16",
    duration: "20",
    prompt: `A vertical courtroom cross-examination parody, played completely straight and loud. Shot like a real handheld camera in a real room, not like an advertisement.

${SET_LOOK}

PLACE. A small plain courtroom with dark wood panelling, a witness box with a worn brass rail, and an empty public gallery of six wooden benches behind. Daylight through a tall window on one side. The room is bare: no signage, no crest, no seal, no notices and no papers anywhere in frame.

PEOPLE. The PROSECUTOR, a man in his forties, jacket unbuttoned, completely certain of himself. The WITNESS, a man in his thirties in the box, sweating. ${WARDROBE} The prosecutor wears a plain dark-navy suit jacket over a plain white shirt, blank throughout. The witness wears a plain light-blue button-down shirt, blank across the whole chest and back.

PERFORMANCE. The prosecutor is loud and theatrical from the first frame, striding, slamming the rail, throwing his arms wide, roaring with delighted disbelief. The witness is shrinking, cracking, hands up, voice going thin. The prosecutor drops his volume once, deliberately, in the fourth beat, and that drop is the turn.

${HOOK}

${SPEECH_RULE}

BEATS.
0-2s. The PROSECUTOR is already mid-stride and shouting as the frame opens. He slams both palms on the witness-box rail and puts his face inches from the witness: "You say you called the crypto top. Prove it."
2-5s. The WITNESS shrinks back, both hands up, sweating, voice cracking as he tries to sound certain: "I said it out loud. In my car."
5-9s. The PROSECUTOR spins away from him and throws both arms wide at the empty gallery, roaring with delighted disbelief, then wheels back and jabs a finger at the witness's chest: "Alone! He called it alone!"
9-14s. The PROSECUTOR walks a slow half-circle around the box, dropping his volume right down for the first time, and taps the brass rail twice with one knuckle on the last two words: "Every call locks a time-stamped receipt. No edits."
14-20s. The PROSECUTOR stops, straightens his jacket, turns and looks directly down the lens. He goes completely still and delivers this much slower and clearer than anything before it, with a small pause before the name: "BitPredict. It's free. Go call one."

${CTA}

${SAY_BITPREDICT}

${SCREEN_RULE}

AUDIO. Hard-surfaced room sound with real slap-back off the panelling: his shoes on wood, both palms hitting the rail, a knuckle tapping brass, the witness's chair creaking. His voice loud and echoing on the shouted beats and very close and quiet on the last one. No music.

${BANS}`,
  },

  {
    id: "bitpredict-c15-evidence-wall",
    company: "bitpredict",
    title: "The Evidence Wall",
    format: "Obsessive-detective corkboard parody, one man, physical collapse gag",
    research:
      "The purest statement of the product's argument in the batch: a man who has done enormous work to prove something and still cannot, because none of it was locked at the time. The board coming off the wall lands at 5-11s, in the middle third, which is where this model reliably renders a physical event. The brand name is left entirely to the composited end card here, removing the mispronunciation risk at zero cost.",
    approvedCopy:
      '24-hour call window (stepsData.ts) + "Predict whether BTC, ETH and SOL go up or down" (HeroSubheading.tsx)',
    claimNotes:
      "The corkboard carries only blank paper, plain photographs of the room and red string, so no invented text, chart, ticker or figure can render on it. Brand name is not spoken at all. No money language.",
    aspect_ratio: "9:16",
    duration: "20",
    prompt: `A vertical parody of the obsessive-detective evidence wall, played completely straight. Shot like a real handheld camera in a real room, not like an advertisement.

${SET_LOOK}

PLACE. A cramped spare room with woodchip wallpaper and one bare bulb. A large corkboard is fixed to the wall, covered in blank index cards, plain unmarked photographs and red string running pin to pin. Empty mugs on the floor, a kitchen chair pulled up to the wall, curtains still shut in the middle of the day.

PERSON. GARETH, a man in his thirties, wild-eyed, unshaven, hair pushed up on one side, clearly awake all night. ${WARDROBE} He is wearing a plain oatmeal crew-neck t-shirt, completely blank across the whole chest and back, and plain grey joggers.

PERFORMANCE. He starts at full volume, absolutely convinced, talking faster and louder as he builds his case, slapping the board, dragging the string. Then the whole thing physically collapses on him and he keeps going anyway, gradually running out of steam mid-argument until he stops and admits it. Committed and manic at the start, deflated and quiet at the end.

${HOOK}

${SPEECH_RULE}

BEATS.
0-2s. He bursts into frame from the left already talking, wild-eyed, and jabs both hands back at the corkboard behind him: "I did call that crypto move. Look."
2-5s. He slaps the board hard with an open palm, grabs a length of red string in his fist and drags it across to a photograph, talking faster and louder as he goes: "Right here. Last Tuesday. I said it."
5-11s. The string goes tight and rips the top corner of the board clean off the wall. Pins fly, photographs come loose and slide, and the whole board swings down and lands across his shoulder. He does not stop. He holds it up with one hand, still nodding at it, still trying to make his case, gradually running out of steam as the last photographs slide off onto the floor.
11-15s. He stands there holding the wreckage, looks at it properly for the first time, and says it much quieter, half to himself: "I don't actually have proof."
15-20s. He drops the board, wipes both hands down his shirt, and looks straight down the lens, calm and clear and much slower than everything before it: "Call it up or down. Twenty-four hours. It's on the record."

${CTA}

${SCREEN_RULE}

PROP RULE. Everything pinned to the corkboard is blank: plain unmarked white index cards, plain photographs showing only ordinary rooms and streets, and red string. Nothing on the board carries any text, number, chart, graph, ticker, date or logo at any point.

AUDIO. Small-room sound: the slap of his palm on cork, pins pinging off the wall, the board tearing free and clattering down, paper sliding onto a hard floor, his breathing getting heavier. No music.

${BANS}`,
  },
];
