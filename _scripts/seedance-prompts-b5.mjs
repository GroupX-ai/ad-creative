// Seedance 2.5 ad prompts — 2026-08-12 batch 5.
// Five 15-second UGC ads at native 720p, written from the B2B ad-script research
// sweep (see RESEARCH-2026-08-12-b2b-scripts-synthesis.md): hooks are named,
// evidence-backed formulas (status-flex, diegetic callback interrupt, myth-flip,
// confession, ICP callout), and the two Emailchaser angles sit on the verified
// competitor gap that no active cold-email advertiser claims the primary inbox.
//
// Nine candidates were scored by a three-judge panel (hook strength, claim
// safety, render safety); these are the five survivors with every judge fix
// applied: no phone-flip beats, phone face-up from frame one, no staccato word
// lists, closes trimmed to clear the unreliable final seconds, "I dialed zero"
// reversal, "eight thousand" to break the echo with the live "Ten thousand
// voicemails" ad, and no monitors anywhere in the Emailchaser scenes.

const UGC_LOOK = `Shot on a modern phone's rear camera, vertical, held at arm's length or propped just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant small handheld drift and one or two natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no colour grade. The subject's face fills a good third of the frame and they look directly into the lens throughout.`;

const PERFORMANCE = `The performance is fast, animated and genuinely energised, like a real person who cannot wait to tell you something. Natural speech with contractions, a half-swallowed word, one small stumble, eyebrows and hands moving. Not polished, not read, not deadpan, never a slow measured delivery.`;

const HOOK = `HOOK. The video is at full energy on the very first frame. There is no lead-in, no breath before the first word, no establishing beat and no silence: the first syllable lands inside the first half second and the subject is already mid-gesture, leaning into the lens. Cut in as though the viewer arrived two seconds late to something already in progress.`;

const CTA = `CLOSING CALL TO ACTION. The final three seconds change gear on purpose. The subject stops moving, settles, locks eye contact straight down the lens, and delivers the closing line noticeably slower and more clearly than everything before it, landing every word, with one single pointing gesture at the lens on the last few words. Everything before this is fast; this is direct. The contrast is what makes it land.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, and none of the stage directions in this prompt are read aloud.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. Any screen visible in frame is blank, switched off or blown out, never showing readable text, an email client or a recognisable app. No brand marks or product logos on anything. No music score of any kind. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look. It must look exactly like a video someone shot on their own phone and posted.`;

const PHONE_RULE = `PHONE SCREEN RULE. If a phone screen is visible at any point it shows only a plain incoming-call screen: a green answer circle and a red decline circle on a dark background, with no caller name, no number, no label and no text of any kind anywhere on the screen.`;

const SAY_EMAILCHASER = `The spoken brand name is pronounced as the two ordinary English words "email" and "chaser" run together, with the middle said exactly like the English word "chase" and a clear "ser" ending.`;

export const ADS = [
  {
    id: "voicedrop-c48-never-dialed-once",
    company: "voicedrop",
    title: "I Dialed Zero",
    format: "UGC selfie, status-flex hook with live proof",
    research:
      "Status-flex hook (ClickUp's live 'My CEO thinks I'm an expert project manager' UGC ad) + the Motion rule that a bold claim and its proof must be one unit on screen. Highest hook score of the judged batch (9/10).",
    approvedCopy: '"$20 In Free Credits" (homepage) + spoken URL close',
    claimNotes:
      "Five hundred is the character's own send inside the approved 'Send 100 or 1,000,000' range. No callback rate is stated; the buzzing phone shows a single incoming call, which is the correct prospect-calls-back mechanic. Phone screen carries no text per the phone rule.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a young sales rep shot on his own phone in a quiet office stairwell and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A plain concrete office stairwell, grey steps and a painted steel handrail, cool daylight from a wired-glass window, an echo to the room sound. Nobody else anywhere in shot.

PERSON. JONES, a man in his late twenties in a wrinkled button-up with the sleeves pushed up, hair a bit messy, half-whispering with a conspiratorial grin like he is getting away with something. A second phone lies face up on the flat top of the handrail beside him, screen toward the ceiling, and it is already buzzing with an incoming call on the very first frame. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE}

BEATS.
0-3s. Already leaning into the lens, thumb jerked back over his shoulder, half-whispering fast: "My boss thinks I called five hundred people today. I dialed zero."
3-7s. Both eyebrows up, counting nothing on his fingers, still fast: "I dropped five hundred voicemails. No ringing. No rejection."
7-11s. The phone on the handrail buzzes again. He glances down at it, laughs once, looks back at the lens: "And they just keep calling me back."
11-15s. He goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "Twenty dollars in free credits. VoiceDrop dot A I." He points once at the lens on the last words.

${CTA}

${PHONE_RULE}

AUDIO. Real stairwell sound: his half-whisper slightly echoey, the phone buzzing against metal, a distant door somewhere below. No music.

${BANS}`,
  },

  {
    id: "voicedrop-c49-another-callback",
    company: "voicedrop",
    title: "Another Callback",
    format: "UGC selfie, diegetic callback interrupt",
    research:
      "Diegetic pattern interrupt (phone lighting up with an inbound call as frame one) aimed at the verified empty auction: ringless voicemail has essentially no Meta advertisers running category-education video. Highest render-safety score of the judged batch (9/10).",
    approvedCopy: '"$20 In Free Credits" (homepage) + spoken URL close',
    claimNotes:
      "The banned callback-rate hook ('third callback this hour') was replaced with a single event, 'Another callback', per the claim judge. Her own voicemail sending is inside the approved range and no rate or count of callbacks is stated. Phone screen carries no text per the phone rule.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a young founder shot on her own phone at her kitchen table and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A small bright kitchen in the morning. A wooden table with a cereal bowl pushed aside, a stove and hanging pans behind her, daylight from one window. Her phone lies face up flat on the table in the lower part of the frame, screen toward the ceiling, and it is buzzing with an incoming call on the very first frame.

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
    id: "emailchaser-c19-invisible",
    company: "emailchaser",
    title: "Invisible",
    format: "UGC selfie, myth-flip hook",
    research:
      "Myth-flip construction (a cold-email advertiser is running 'Cold email isn't dead. You're just doing it wrong.' live right now), reworded to 'It's invisible' to dodge the echo, aimed at the verified unclaimed 'primary inbox, not promotions' angle. 10/10 on claim safety.",
    approvedCopy: '"Cold email that lands in primary." + "Start for free."',
    claimNotes:
      "No deliverability percentage per the Emailchaser hard rule. 'Nobody opens the coupons' is hyperbole about reader behaviour, not a statistic. No screens anywhere in the scene, so no fake inbox is rendered.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a woman shot on her own phone standing in her home office and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A corner of a home office with a plain painted wall and one shelf of plants and books with unreadable spines behind her. No computer, no monitor, no screen of any kind and no readable text anywhere in the background.

PERSON. LEA, a woman in her thirties in a dark t-shirt, sharp and blunt, holding a pen she uses to jab at the lens exactly once on the opening line and then keeps still. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE} ${SAY_EMAILCHASER}

BEATS.
0-3s. Already mid-gesture, one pen jab at the lens on the first words: "Your cold email isn't dead. It's invisible."
3-8s. She flicks the pen sideways like she is filing something in the bin: "It's sitting in the promotions tab. With the coupons. Nobody opens the coupons."
8-11s. Leaning in, voice dropping like it is obvious: "Get into the primary inbox and suddenly people reply."
11-15s. She goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "Emailchaser. Start for free." She points once at the lens on the last words.

${CTA}

AUDIO. Quiet room tone, her voice close and dry, the pen clicking once. No music.

${BANS}`,
  },

  {
    id: "emailchaser-c20-eight-thousand-emails",
    company: "emailchaser",
    title: "Eight Thousand Emails",
    format: "UGC selfie, confession hook",
    research:
      "Confession hook (a Motion-validated tactic from their large Meta creative dataset: 'I sent 10,000 cold emails to spam before I figured this out'). The number is eight thousand, not ten, to break the echo with the live 'Ten thousand voicemails. Before my coffee.' VoiceDrop ad.",
    approvedCopy: '"Start for free." + primary-inbox positioning',
    claimNotes:
      "Eight thousand is the character's own send count, clearly personal confession. No deliverability percentage. The close was trimmed to four words so the brand name clears the unreliable final seconds.",
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

  {
    id: "emailchaser-c21-agency-callout",
    company: "emailchaser",
    title: "Five Grand A Month",
    format: "UGC selfie, ICP callout hook (agencies)",
    research:
      "Direct-callout hook qualifying the viewer by role in line one (published pattern: 'If your Shopify store gets traffic but no sales, keep watching'), aimed at agency owners, the only Emailchaser ICP with a money number available in the first two seconds.",
    approvedCopy: '"Start for free." + primary-inbox positioning',
    claimNotes:
      "'Five grand a month' describes the viewer's own agency pricing, not the product or its results, and passed the claim judge as written. 'Printing replies' is qualitative. Monitors were removed from the scene entirely per the render judge, so no screen exists to garble.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that an agency owner shot on her own phone at her desk and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A tidy desk against a plain painted wall with a framed abstract print hung slightly crooked and a small plant. No computer, no monitor, no screen of any kind and no readable text anywhere in the shot.

PERSON. NOOR, a woman in her thirties in a blazer over a t-shirt, incredulous on behalf of her whole industry, hands already up mid-gesture on the first frame. ${PERFORMANCE}

${HOOK}

${SPEECH_RULE} ${SAY_EMAILCHASER}

BEATS.
0-3s. Already talking, palms out at the lens: "You charge clients five grand a month. And nobody sees the emails."
3-7s. She counts it off on two fingers, disbelieving: "They're landing in promotions, so your clients pay for outreach nobody reads."
7-11s. She leans in, flipping her hand over like revealing the answer: "Land in primary and those same campaigns start printing replies."
11-15s. She goes still, settles, and looks straight down the lens. Slower and much clearer than everything before: "Emailchaser. Start for free." She points once at the lens on the last words.

${CTA}

AUDIO. Quiet office room tone: a chair creak, her rings tapping the desk once, her voice close. No music.

${BANS}`,
  },
];
