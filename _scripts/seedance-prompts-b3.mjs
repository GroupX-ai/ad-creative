// Seedance 2.5 ad prompts — 2026-08-09 batch 3. The corrective batch.
//
// Robby's verdict on the first 17: "most of these are quite dry and not so good."
// Diagnosis in the vault playbook. These two invert every cause of that:
//
//   OLD                                  NEW
//   deadpan, "nobody is enjoying"   ->   animated, fast, genuinely energised
//   opens on an establishing shot   ->   opens ON the line, face already talking
//   punchline at 25s                ->   turn by second four
//   30s at 480p upscaled            ->   15s at native 720p
//   observational third person      ->   UGC selfie, straight down the lens
//   fifteen genre parodies          ->   the format that actually sells on Meta
//
// Both are phone-shot talking heads, which is the video cousin of the whiteboard
// photo Robby called "best by far" on the banner batches, and the one format the
// first 17 did not contain a single example of.
//
// Deliberately still no music: the first batch was inert because the performances
// were slow, not because a track was missing, and a score would break the phone-shot
// illusion these depend on. Energy comes from pace and performance.

const UGC_LOOK = `Shot on a modern phone's rear camera, vertical, held at arm's length or propped on a surface just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant small handheld drift and one or two natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores and stubble, no beauty smoothing, no colour grade. The subject's face fills a good third of the frame and they look directly into the lens the entire time.`;

const PERFORMANCE = `The performance is fast, animated and genuinely energised, like a real person who cannot wait to tell you something. Natural speech with contractions, a half-swallowed word, one small stumble, eyebrows and hands moving. Not polished, not read, not deadpan, and never a slow measured delivery. They talk at the speed of someone talking to a friend.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. Any screen visible in frame is blank, switched off or blown out, never showing readable text, an email client or a recognisable app. No brand marks or product logos on anything. No music score of any kind. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look. It must look exactly like a video someone shot on their own phone and posted.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, and none of the stage directions in this prompt are read aloud.`;

export const ADS = [
  {
    id: "voicedrop-c45-ugc-watch-this",
    company: "voicedrop",
    title: "Watch This",
    format: "UGC selfie video, phone-shot, high energy",
    angle: "Inbound proof, demonstrated live in the first four seconds.",
    approvedCopy: '"Stop chasing leads. Let them call you." (Hero.tsx headline, verbatim)',
    claimNotes:
      "No callback-rate number, no pricing, no SOC-2 claim. The ringing phone is the character's own moment, not a stated statistic. 'One voicemail, straight to their voicemail inbox' is the actual ringless-voicemail mechanic.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a real salesperson shot on his own phone and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. The driver's seat of an ordinary used car, parked. Daylight through the windscreen, a slightly dirty dashboard, a takeaway coffee cup in the holder, a lanyard hanging from the mirror, houses out of focus behind him.

PERSON. NICK, a man in his thirties in a plain untucked shirt with the collar open, a bit sweaty, clearly pleased with himself. He is holding his phone in one hand and a second phone in the other. ${PERFORMANCE}

${SPEECH_RULE}

BEATS. The video opens with him already mid-sentence. There is no establishing shot, no silence and no lead-in.
0-4s. Straight in, fast and energised, directly into the lens: "I stopped cold calling three weeks ago."
4-6s. He grins, lifts the second phone up next to his face and holds it there: "Watch."
6-8s. The second phone lights up and rings in his hand. He raises his eyebrows at the lens and tips his head at it, delighted.
8-12s. Talking faster, gesturing with the ringing phone: "That's them calling me. One voicemail, straight to their voicemail inbox, and they call back."
12-15s. He drops the phone into his lap, shrugs at the lens with both hands open, and says it plainly: "VoiceDrop. Stop chasing leads, let them call you."

AUDIO. Real car interior sound: the low hum of traffic outside, a creak of the seat, his voice close and slightly clipped by the phone mic, the ringtone of the second phone. Everything is a little loud and unbalanced the way phone audio is.

${BANS}`,
  },

  {
    id: "emailchaser-c17-ugc-promotions",
    company: "emailchaser",
    title: "Zero Replies",
    format: "UGC selfie video, phone-shot, fast and exasperated",
    angle: "The reveal that the emails were never seen, landed in four seconds.",
    approvedCopy: '"Cold email that lands in primary." + "Start for free."',
    claimNotes:
      "No deliverability percentage, per the Emailchaser hard rule. The four thousand sends and zero replies are her own numbers about her own campaign, not a product claim. 'Primary' and 'promotions' are the inbox vocabulary the approved copy already uses. Her laptop screen is never legible, so no fake interface is rendered.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a real founder shot on her own phone at her desk and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A cramped home-office corner. A cheap desk against a wall, an open laptop turned away from the lens so its screen is never readable, a mug with a teabag string hanging out, a phone charger tangled on the desk, a radiator and a bit of skirting board behind her.

PERSON. PRIYA, a woman in her thirties in a hoodie with her hair pushed back, no makeup, tired and genuinely exasperated in a funny way rather than an angry one. She is close to the lens and leaning in. ${PERFORMANCE}

${SPEECH_RULE}

BEATS. The video opens with her already talking, mid-thought, leaning into the lens. No establishing shot, no silence, no lead-in.
0-4s. Fast, flat with disbelief, straight down the lens, one hand up: "Four thousand emails. Zero replies. Zero."
4-7s. She turns the laptop towards the camera for exactly a second and the screen is a blown-out white rectangle, nothing legible, then turns it straight back: "So I went looking."
7-11s. She puts both hands on the desk and leans right into the lens, eyebrows up, talking over herself: "Every single one of them was sitting in promotions. Nobody ever saw them. Nobody."
11-15s. She sits back, exhales, and delivers it quickly and plainly with a small shrug: "Emailchaser lands in primary. Start for free."

AUDIO. Close, slightly boxy room sound off a phone mic. A radiator tick, a mug set down on the desk, her chair creaking as she leans in, a bit of breath on the mic when she gets close. No music.

${BANS}`,
  },
];
