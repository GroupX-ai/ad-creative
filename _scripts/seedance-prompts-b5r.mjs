// Batch 5 re-rolls (2026-08-12). Two of the five clips failed QA:
//   voicedrop-c49  — the phone rendered a caller label that plausibly reads
//                    "Voicedrop", the banned inverted mechanic (c22/c45 class).
//                    Phone rule hardened: the screen is two circles on empty
//                    black and nothing else, stated in PLACE and in the rule.
//   emailchaser-c20 — spoke "Email Chaper" (confirmed on two engines), the same
//                    defect c18 had. Phonetic rule hardened with a positive
//                    rhyme anchor ("chaser" rhymes with "racer").
// Same ids so the fixed clips replace the defective files.

const UGC_LOOK = `Shot on a modern phone's rear camera, vertical, held at arm's length or propped just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant small handheld drift and one or two natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no colour grade. The subject's face fills a good third of the frame and they look directly into the lens throughout.`;

const PERFORMANCE = `The performance is fast, animated and genuinely energised, like a real person who cannot wait to tell you something. Natural speech with contractions, a half-swallowed word, one small stumble, eyebrows and hands moving. Not polished, not read, not deadpan, never a slow measured delivery.`;

const HOOK = `HOOK. The video is at full energy on the very first frame. There is no lead-in, no breath before the first word, no establishing beat and no silence: the first syllable lands inside the first half second and the subject is already mid-gesture, leaning into the lens. Cut in as though the viewer arrived two seconds late to something already in progress.`;

const CTA = `CLOSING CALL TO ACTION. The final three seconds change gear on purpose. The subject stops moving, settles, locks eye contact straight down the lens, and delivers the closing line noticeably slower and more clearly than everything before it, landing every word, with one single pointing gesture at the lens on the last few words. Everything before this is fast; this is direct. The contrast is what makes it land.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, and none of the stage directions in this prompt are read aloud.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. Any screen visible in frame is blank, switched off or blown out, never showing readable text, an email client or a recognisable app. No brand marks or product logos on anything. No music score of any kind. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look. It must look exactly like a video someone shot on their own phone and posted.`;

// Hardened after the c49 failure: the first roll obeyed "no caller name" loosely
// and still drew a label. State what IS on the screen, exhaustively.
const PHONE_RULE = `PHONE SCREEN RULE. The phone's screen shows exactly two things and nothing else: one solid green circle and one solid red circle, side by side on the lower part of an otherwise completely empty pure-black screen. The upper two thirds of the screen are empty black. There are no words, no letters, no numerals, no names, no clock, no status bar, no icons and no symbols of any kind anywhere on the screen at any moment.`;

// Hardened after c20 spoke "Chaper": add a positive rhyme anchor.
const SAY_EMAILCHASER = `The spoken brand name is pronounced as the two ordinary English words "email" and "chaser" run together, with the middle said exactly like the English word "chase" and a clear "ser" ending, so the second word rhymes exactly with "racer".`;

export const ADS = [
  {
    id: "voicedrop-c49-another-callback",
    company: "voicedrop",
    title: "Another Callback",
    format: "UGC selfie, diegetic callback interrupt (re-roll)",
    approvedCopy: '"$20 In Free Credits" (homepage) + spoken URL close',
    claimNotes:
      "Single callback event, no rate. Phone screen is two circles on empty black, nothing else, per the hardened phone rule.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a young founder shot on her own phone at her kitchen table and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A small bright kitchen in the morning. A wooden table with a cereal bowl pushed aside, a stove and hanging pans behind her, daylight from one window. Her phone lies face up flat on the table in the lower part of the frame, buzzing with an incoming call on the very first frame. The phone's screen is completely black and empty except for one green circle and one red circle side by side near its lower edge: no name, no words, no numbers, no clock, nothing else on the screen at all.

PERSON. PRIYA, a woman in her late twenties in an oversized hoodie, hair in a loose bun, grinning and disbelieving, like this keeps happening and she still cannot quite believe it. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Her first syllable lands over the buzzing, eyes still on the phone, then up to the lens, grinning: "Another callback. I haven't called anyone in weeks."
3-8s. She spreads both hands, talking fast: "I just leave voicemails, straight to their inbox, without their phone ever ringing."
8-11s. She taps the table twice, leaning in: "They hear it. They call me."
11-15s. She goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "Twenty dollars in free credits. VoiceDrop dot A I." She points once at the lens on the last words.

${CTA}

${PHONE_RULE}

AUDIO. Kitchen room tone: the phone buzzing against wood through the opening, a spoon shifting in the bowl, a fridge hum. Her voice close and bright. No music.

${BANS}`,
  },

  {
    id: "emailchaser-c20-eight-thousand-emails",
    company: "emailchaser",
    title: "Eight Thousand Emails",
    format: "UGC selfie, confession hook (re-roll)",
    approvedCopy: '"Start for free." + primary-inbox positioning',
    claimNotes:
      "Eight thousand is the character's own send count. No deliverability percentage. Re-rolled only for brand pronunciation.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a young founder shot on his own phone on his apartment balcony and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A small apartment balcony in warm early-evening light. A metal railing, one folding chair, city rooftops soft in the background. No screens and no readable text anywhere.

PERSON. DEV, a man in his late twenties in a plain crewneck, animated and laughing at himself, telling the story of his own dumbest mistake with his hands already moving on the first frame. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE} ${SAY_EMAILCHASER}

BEATS.
0-3s. Already talking, one hand pressed to his chest like a confession: "I sent eight thousand cold emails before I checked where they landed."
3-7s. He throws both hands out, laughing at the absurdity: "They went to spam and promotions. Eight thousand emails nobody ever saw."
7-11s. He steadies, pointing a finger up like the lesson arrived: "The fix was landing in the primary inbox."
11-15s. He goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "Emailchaser. Start for free." He points once at the lens on the last words.

${CTA}

AUDIO. Open-air balcony sound: faint traffic below, a bird, his voice close with a touch of breeze on the mic. No music.

${BANS}`,
  },
];
