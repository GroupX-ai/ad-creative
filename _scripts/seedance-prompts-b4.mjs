// Seedance 2.5 ad prompts — 2026-08-10 batch 4.
// Three more 15-second UGC ads at native 720p. Robby: "make sure the hooks and
// ending CTA is a bit stronger."
//
// Batch 3 proved the UGC format. This batch sharpens the two ends of it:
//
//   HOOK  — batch 3 opened mid-sentence, which was already right. This goes
//           further: the first line is a fragment, not a sentence, it carries a
//           number or a command, and the subject is mid-gesture on frame one.
//   CTA   — batch 3 shrugged the closing line off at the same pace as the rest.
//           Here the last three seconds deliberately change gear: motion stops,
//           delivery slows, eye contact locks, and the offer is named out loud.
//
// Also fixes the c22/c45 recurrence: any phone screen shown carries no caller
// name at all, because "VoiceDrop calling" is the wrong product mechanic (the
// prospect calls back; VoiceDrop never calls the user).

const UGC_LOOK = `Shot on a modern phone's rear camera, vertical, held at arm's length or propped just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant small handheld drift and one or two natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no colour grade. The subject's face fills a good third of the frame and they look directly into the lens throughout.`;

const PERFORMANCE = `The performance is fast, animated and genuinely energised, like a real person who cannot wait to tell you something. Natural speech with contractions, a half-swallowed word, one small stumble, eyebrows and hands moving. Not polished, not read, not deadpan, never a slow measured delivery.`;

// The two ends of the ad, which is what this batch exists to sharpen.
const HOOK = `HOOK. The video is at full energy on the very first frame. There is no lead-in, no breath before the first word, no establishing beat and no silence: the first syllable lands inside the first half second and the subject is already mid-gesture, leaning into the lens. Cut in as though the viewer arrived two seconds late to something already in progress.`;

const CTA = `CLOSING CALL TO ACTION. The final three seconds change gear on purpose. The subject stops moving, settles, locks eye contact straight down the lens, and delivers the closing line noticeably slower and more clearly than everything before it, landing every word, with one single pointing gesture at the lens on the last few words. Everything before this is fast; this is direct. The contrast is what makes it land.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, and none of the stage directions in this prompt are read aloud.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. Any screen visible in frame is blank, switched off or blown out, never showing readable text, an email client or a recognisable app. No brand marks or product logos on anything. No music score of any kind. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look. It must look exactly like a video someone shot on their own phone and posted.`;

// Learned from c22 (banner) and c45 (video): a phone showing "VoiceDrop calling"
// inverts the product. Never let a caller label render.
const PHONE_RULE = `PHONE SCREEN RULE. If a phone screen is visible at any point it shows only a plain incoming-call screen: a green answer circle and a red decline circle on a dark background, with no caller name, no number, no label and no text of any kind anywhere on the screen.`;


// Emailchaser has now been mispronounced twice ("Chacha" in c16, "Chaper" in c18),
// so it gets the same phonetic treatment that fixed 1Lookup in batch 2.
const SAY_EMAILCHASER = `The spoken brand name is pronounced as the two ordinary English words "email" and "chaser" run together, with the middle said exactly like the English word "chase" and a clear "ser" ending.`;

export const ADS = [
  {
    id: "voicedrop-c46-before-my-coffee",
    company: "voicedrop",
    title: "Before My Coffee",
    format: "UGC selfie, number-fragment hook",
    angle: "Scale and speed, proved live, closed on the free-credits offer.",
    approvedCopy: '"$20 In Free Credits" (homepage) + "Get Free Access" (real CTA label)',
    claimNotes:
      "No callback rate, no SOC-2, no pricing beyond the approved free-credits offer. Ten thousand sits inside the approved 'Send 100 or 1,000,000' range and is the character's own send. The phone screen carries no caller label.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a real salesperson shot on his own phone and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A cluttered home-office desk in the morning. A half-drunk mug, an open notebook, a tangle of charger cables, a window with grey daylight behind him, a radiator.

PERSON. WES, a man in his late twenties in a crumpled t-shirt, hair not done, clearly just started his day and slightly giddy about something. He holds a second phone face down on the desk under one hand. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-2s. Already talking, already leaning in, one hand up with fingers spread: "Ten thousand voicemails. Before my coffee."
2-6s. He picks up the mug, gestures with it, talking fast: "No dialling. No ringing. Straight into their voicemail inbox."
6-10s. The second phone buzzes and lights up under his hand. He looks down at it, then back to the lens, eyebrows up, and turns it briefly towards the camera: "And that's them. Calling me."
10-15s. He puts the phone down, stops moving entirely, settles, and looks straight down the lens. Slower and much clearer than everything before: "Twenty dollars in free credits. Get free access at VoiceDrop dot A I." He points once at the lens on the last three words.

${CTA}

${PHONE_RULE}

AUDIO. Close phone-mic sound in a small room: a mug on a desk, a phone buzzing on wood, a radiator tick, his voice a little clipped and too loud. No music.

${BANS}`,
  },

  {
    id: "voicedrop-c47-they-hate-dialling",
    company: "voicedrop",
    title: "Everyone Hates This",
    format: "UGC selfie, double problem-statement hook",
    angle: "Both sides of cold calling are miserable, so stop doing it.",
    approvedCopy: '"Stop chasing leads. Let them call you." + "$20 In Free Credits"',
    claimNotes:
      "No callback rate, no SOC-2, no headcount or productivity claim. 'Your reps hate dialling' is an opinion about the activity, not a statistic. No phone screen appears in this one at all.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a real sales manager shot on her own phone between meetings and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A drab office kitchen. A laminate counter, a kettle, a wall of mismatched mugs on hooks, a fridge with nothing on it, a strip light overhead. People pass behind her once, out of focus.

PERSON. TASH, a woman in her forties in a plain knit top with a lanyard, holding a mug, blunt and a bit fed up in an entertaining way rather than an angry one. She talks with the mug hand. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already mid-gesture, jabbing the mug towards the lens on each half: "Your reps hate dialling. Your prospects hate answering."
3-7s. She shrugs hard, almost spilling the mug: "So stop. One voicemail lands in their inbox. No ring. No rejection."
7-11s. She leans back against the counter, calmer, still direct: "They call you back when they're ready."
11-15s. She sets the mug down out of frame, stops moving completely, and looks straight down the lens. Slower and much clearer than everything before: "Stop chasing leads. Get free access at VoiceDrop dot A I, twenty dollars of credits free." She points once at the lens on the final words.

${CTA}

AUDIO. Office kitchen room tone: a kettle finishing, a mug on laminate, a door somewhere, faint voices passing. Her voice is close and slightly boomy off the hard surfaces. No music.

${BANS}`,
  },

  {
    id: "emailchaser-c18-check-your-promotions",
    company: "emailchaser",
    title: "Check It Right Now",
    format: "UGC selfie, direct-command hook",
    angle: "Make the viewer look at their own promotions tab, then land the fix.",
    approvedCopy: '"Cold email that lands in primary." + "Start for free."',
    claimNotes:
      "No deliverability percentage, per the Emailchaser hard rule. 'Nobody scrolls to promotions' is a statement about reader behaviour, not a measured deliverability claim. His laptop screen is never legible so no fake inbox is rendered.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a real founder shot on his own phone on the sofa in the evening and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A living room after dark. A worn sofa, a laptop open on his knees and angled away so the screen is never readable, a lamp off to one side as the only light, a mug on the arm of the sofa, a radiator behind.

PERSON. OMAR, a man in his thirties in a zip hoodie, glasses pushed up on his head, incredulous and slightly wired, like he has just worked something out. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE} ${SAY_EMAILCHASER}

BEATS.
0-3s. Already talking, already pointing straight at the lens, no lead-in at all: "Check your promotions tab. Right now. I'll wait."
3-7s. He tips the laptop screen briefly towards the lens and it is a blown-out white rectangle with nothing legible, then away again: "That's where your cold email went. All of it."
7-11s. He takes his glasses off his head and drops them on the sofa, leaning in: "Nobody scrolls to promotions. Nobody."
11-15s. He goes still, sits back, and looks straight down the lens. Slower and much clearer than everything before: "Emailchaser. Cold email that lands in primary. Start for free." He points once at the lens on the last two words.

${CTA}

AUDIO. Quiet living room at night: a laptop fan, a mug on a hard arm, his voice close and a bit boxy, the odd creak of the sofa. No music, no television.

${BANS}`,
  },
];
