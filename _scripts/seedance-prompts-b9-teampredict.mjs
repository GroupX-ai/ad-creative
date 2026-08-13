// Seedance 2.5 ad prompts — 2026-08-13 batch 9, TeamPredict paid launch video.
//
// Robby on the batch-8 script doc: "Approved video ad angles: Keep Scrolling,
// Two Weeks, Open To Work. But even those are a bit Meh. It needs to be much
// more interesting, maybe funny or ironic. Please create the approved videos +
// 2-3 high confidence videos."
//
// So: the three approved angles rebuilt as actual comedy, plus three new ones
// chosen for the same reason. Six clips, 15s, 9:16, 720p.
//
// WHERE THE JOKES COME FROM. Batch 6's rule: the funny angle is the customer's
// existing complaint, not a joke bolted onto a feature. Every premise here is an
// argument HR and managers are already having in public:
//   - the manager who lists resignation tells and hears none of them
//   - the counter-offer that arrives two weeks too late
//   - the "Open To Work" badge everyone can see except the person it concerns
//   - the pizza party as a retention strategy
//   - paying for information that was public the whole time
//   - the competitor angle nobody in this category advertises
//
// FIVE THINGS CHANGED FROM BATCH 8's DRAFTS:
//   1. Every script now has a TURN. Batch 8's three approved drafts stated the
//      problem in a serious voice and stopped, which is what "a bit Meh" means.
//      Each one below sets something up and then breaks it.
//   2. The joke lands in the MIDDLE, never the last three seconds. The tail is
//      the least reliable beat in this model (playbook, batch 1), so the payoff
//      sits at 3-11s and the close is deliberately trimmable.
//   3. Played completely straight. Nobody in any scene knows they are in a
//      comedy. Mugging is what makes generated comedy read as slop.
//   4. Register varies per clip rather than one house style, which is the fix
//      for the 17 clips Robby called "quite dry and not so good".
//   5. Two clips never speak the brand at all and let the composited end card
//      carry it. Five compound brand names have been mispronounced across seven
//      batches, so the safest handling of a risky name is sometimes not to
//      gamble a whole clip on it.
//
// CAST. Robby did not answer the "who presents" question, so the batch-8 call
// stands: mixed cast, women in the majority, because the buyer is HR and People
// teams. BitPredict's "men only" was field-specific and does not port.
//
// CLAIM SAFETY. Every factual line is site copy: $5 per tracked employee,
// 30-day free trial, daily profile checks, email alerts, competitor tracking,
// and the signal list ("a new headline or title, an 'Open to Work' badge, fresh
// skills, a profile refresh"). Never used: any accuracy figure, any lead-time
// window other than the site's own "weeks", and "no credit card required" (a
// card IS taken; the true line is "No charge today · Cancel anytime").
//
// NO SCREENS ANYWHERE, which is this brand's hardest guardrail: an invented risk
// score or employee row is precisely the claim TeamPredict does not make. Every
// prompt states exhaustively that no display surface is in shot, rather than
// merely banning the bad content on it (the batch-5 and batch-7 lesson).

// ---------------------------------------------------------------------------
// Shared blocks
// ---------------------------------------------------------------------------

const UGC_LOOK = `Shot on a modern phone's front camera, vertical, held at arm's length just below eye level, so the framing is slightly low and slightly off-centre the way real selfie video is. Constant handheld drift and two or three natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no colour grade. The face fills a good third of the frame, looking directly into the lens throughout.`;

// The sketches are shot as though someone in the room happened to be filming.
// A tripod-and-key-light look is what makes a generated sketch read as an
// advert, and an advert cannot land a deadpan joke.
const SKETCH_LOOK = `Shot on a phone held by an unseen third person standing a few feet away in the same room, vertical, at chest height. Constant small handheld drift, one natural reframe when someone speaks, imperfect focus that settles a beat late. Overhead office fluorescents and daylight from a window only. Real skin texture, no beauty smoothing, no colour grade, mild sensor noise in the shadows. It looks like a real moment someone filmed, not a scene that was lit.`;

// The single most important instruction in this batch. Generated comedy dies
// the moment a performer signals that a line is a joke.
const DEADPAN = `COMEDY RULE. Every line is played completely straight. Nobody in the scene knows they are in something funny: no mugging, no winking or glancing at the camera, no raised eyebrows to the lens, no smirking before a line, no comedy pause held for effect, no laughing at their own words. The performances are naturalistic and slightly awkward, exactly as ordinary people are on an ordinary bad day at work. The humour comes only from what is said and what happens, never from anyone performing that it is humour.`;

const HOOK = `HOOK. The first line is fully spoken inside the first two seconds. There is no establishing shot, no slow push-in, no lead-in, no title beat and no silence before the first word: the clip cuts in with the first syllable already landing and the scene already in motion, as though the viewer arrived a second late.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, no ad-libbed reactions, no background chatter with audible words, and none of the stage directions in this prompt are read aloud.`;

// Hardened per batch 6: a whole-word rhyme anchor was not enough for
// "BitPredict", so each syllable gets its own everyday anchor word. Positive
// only: naming the wrong version makes the model produce it.
const SAY_TEAMPREDICT = `BRAND PRONUNCIATION. The spoken brand name is two ordinary English words run together and delivered as one confident word. First "team", said exactly like the English word team meaning a group of people who work together, with a long clear ee in the middle. Immediately after it, "predict", the everyday English verb meaning to say in advance what is going to happen. Predict has exactly two syllables: the first is "pre" as in the word prepare, and the second is "dict" as in the word dictionary, carrying the stress. Sound the letter t at the very end. Together it is "TeamPredict", said clearly and unhurriedly with a small pause before it.`;

// Exhaustive rather than prohibitive. A monitor turned away has no display
// surface to hallucinate onto, which removes the invented-UI failure mode
// completely. For this brand an invented risk score would be the banned claim.
const NO_SCREENS = `SCREEN RULE. No display surface of any kind appears anywhere in this video at any point. Every computer monitor in shot is turned away from the camera so that only its plain back panel, its stand and its side edge are visible. Every laptop is closed with its lid down. No phone screen, tablet, television, projector or smartwatch face is visible or lit at any moment, at any angle, in the foreground or the background. There is no screen glow, no screen reflection in glass or spectacles, and no light spill from a screen onto anybody's face.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. No LinkedIn logo, glyph, icon or blue square anywhere, and no Slack logo, glyph or icon anywhere, including on clothing, laptop lids, mugs, lanyards, notebooks, posters and wall art. No brand marks or product logos on anything at all. No charts, no graphs, no dashboards, no spreadsheets, no scorecards and no lists of names anywhere in frame. No music score of any kind and no laugh track. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look.`;

export const ADS = [
  // -------------------------------------------------------------------------
  // APPROVED ANGLE 1 of 3
  // -------------------------------------------------------------------------
  {
    id: "teampredict-v1-keep-scrolling",
    company: "teampredict",
    title: "Keep Scrolling",
    format: "UGC selfie, smug-to-dawning-horror",
    approvedAngle: true,
    research:
      "Robby's own banner line, and the one he wrote the brief around. Batch 8 drafted it as a straight dare, which is what made it Meh: a dare has no turn. Rebuilt so the speaker takes the dare himself and loses it live on camera, which converts a slogan into a joke and teaches the signal list at the same time. UGC selfie is the house format on own-account evidence (EC C17 is Emailchaser's best CTR at volume).",
    approvedCopy:
      'Signal list verbatim from the FAQ: "a new headline or title, an \'Open to Work\' badge, fresh skills, a profile refresh, a spike in edit activity". Offer: "30-day free trial".',
    claimNotes:
      "Everything he lists is his own employee's behaviour in a fictional scene, not a product claim, and every item is on the site's own signal list. No number, no accuracy claim, no lead-time window. Pairs with banner t1, same line.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his forties shot on his own phone at his desk and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A small manager's office in the late afternoon, one window with the blind half down and a strip of grey daylight across the wall behind him. A cluttered desk edge: a coffee cup, a stack of printed paper, a dying plant, a coat over the back of the chair.

PERSON. GREG, a man in his mid forties in an unironed shirt with the collar open, tired around the eyes, a lanyard with a completely blank plain white card on it. He starts leaning back in his chair, relaxed and faintly smug, arms open, entirely certain of himself. As he speaks he slows down, and by the third beat he has stopped moving altogether and is staring past the lens with a very slight frown, working something out in real time. The change is small and physical, not performed.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

BEATS.
0-3s. Leaning back, relaxed, dismissive, one hand waving the camera away: "Not worried about anyone quitting? Great. Keep scrolling."
3-8s. Still relaxed, counting them off on his fingers as though they are reassuring: "Mine's fine. New headshot. New skills."
8-11s. His hand stops mid-count. He looks off past the lens. Quieter, slower, no longer smug at all: "Says he's been networking a lot."
11-15s. He is already standing up, chair rolling back out of frame, still looking away from the camera, flat and distracted: "TeamPredict. Thirty days free."

${SAY_TEAMPREDICT}

${NO_SCREENS}

AUDIO. Real small-office sound: the swivel chair creaking and then rolling back, paper shifting on the desk, a muffled corridor conversation with no audible words, an air-conditioning hum. His voice close on the phone mic, confident at the start and noticeably flatter by the end. No music.

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // APPROVED ANGLE 2 of 3
  // -------------------------------------------------------------------------
  {
    id: "teampredict-v2-two-weeks",
    company: "teampredict",
    title: "Two Weeks",
    format: "Two-hander sketch, the counter-offer arriving too late",
    approvedAngle: true,
    research:
      "Batch 8 drafted this as a tense straight scene ending on a silent reaction shot, which put the entire payoff in the least reliable beat of the render AND made it humourless. Rebuilt around the escalating counter-offer, which is the complaint the audience already makes: by the time you are negotiating, the decision was made weeks ago. The joke now sits at 3-11s and the tail is trimmable.",
    approvedCopy:
      'Final CTA h2 verbatim: "Don\'t Wait for the Resignation Letter." Carried on the composited end card rather than spoken.',
    claimNotes:
      "Nothing factual is stated aloud at all. The whole pitch is carried by the end card, so there is no claim in the audio to get wrong. Both characters are fictional and no employer or product is named.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a real moment in a small office, filmed on a phone by someone standing in the room. This is not an advertisement and must not look like one.

${SKETCH_LOOK}

PLACE. A cramped glass-walled meeting room inside an ordinary open-plan office, mid morning. A cheap round table with a ring-mark on it, four mismatched chairs, a whiteboard on the wall that has been wiped to a grey smear with nothing legible on it, a jug of water and two paper cups. Beyond the glass, the blurred shapes of other people at desks.

PEOPLE. PRIYA, a woman in her early thirties in a plain dark jumper, completely calm, hands folded, the decision already long made. MARTIN, her manager, a man in his fifties in a crumpled shirt, who does not react with shock so much as immediately start negotiating, as though this is a problem he can still solve with objects. He is earnest and slightly frantic and does not once acknowledge that anything he says is absurd.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

BEATS.
0-3s. Priya slides a single folded sheet of paper across the table to Martin, evenly, with no drama at all: "I'm giving my two weeks."
3-7s. Martin does not pause and does not look at the paper. He sits forward immediately, hopeful, reasonable, as though offering an obvious solution: "What if we got you a standing desk?"
7-11s. Priya says nothing. She looks at him steadily for a long moment. Martin's hope drains out of his face and he tries again, quieter, with much less conviction: "Two standing desks."
11-15s. Priya has gone. Martin is alone at the table holding the folded sheet, looking at the empty chair, and says it to nobody in the room, flat and genuinely bewildered: "I did not see that coming."

${NO_SCREENS}

AUDIO. Real office sound: the paper sliding on the table, a chair leg scraping, the water jug ticking as it settles, a printer running somewhere beyond the glass, muffled voices with no audible words. Both voices dry and close, no reverb. No music.

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // APPROVED ANGLE 3 of 3
  // -------------------------------------------------------------------------
  {
    id: "teampredict-v3-open-to-work",
    company: "teampredict",
    title: "Open To Work",
    format: "Nature documentary parody, whispered narration over an office",
    approvedAngle: true,
    research:
      "Batch 8 drafted this as a fast rant to camera, which is the same register as half the repo. A format parody gives the model a grammar to imitate and slop has no format (playbook, batch 1), and the wildlife-documentary voice is the single most recognisable narration register there is. It also solves the angle's real problem: the joke is that everyone can see the badge except the one person it concerns, and an observational format is literally about watching someone who does not know they are watched.",
    approvedCopy:
      'The "Open to Work" badge is named verbatim in the site FAQ\'s signal list. "Tracked profiles are checked daily so changes don\'t slip past you."',
    claimNotes:
      "Naming LinkedIn aloud is site copy and safe; the logo is banned and never appears. 'Three of his herd' describes a fictional office, not a rate or a statistic. No accuracy figure, no lead-time window.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video filmed on a phone from behind a partition in an open-plan office, as though the person filming is hiding and does not want to be seen. This is not an advertisement and must not look like one.

VISUAL STYLE. Handheld, vertical, shot from a low crouched position past the edge of a fabric desk partition and a dying pot plant, so the foreground is partly obstructed and slightly out of focus the way genuinely covert phone footage is. The camera creeps very slightly forward, wobbles, and adjusts twice. Ordinary overhead office fluorescent light and flat daylight from a distant window. Real fabric texture, real carpet, mild sensor noise, no colour grade, no studio lighting.

PLACE. An ordinary unglamorous open-plan office in the middle of a working afternoon: grey carpet tiles, low fabric partitions, a wheeled recycling bin, a coat on the back of a chair, a mug on a stack of paper. Every monitor on every desk is turned away from the camera so only the plain backs of the monitors are visible, and every laptop is closed.

PEOPLE. In the middle distance, DEREK, a man in his fifties in a short-sleeved shirt, is eating a sandwich at his desk with total unhurried contentment, entirely unaware he is being filmed. He does nothing but eat and look mildly pleased with his day. Beyond him, three younger colleagues are at their own desks, heads down, saying nothing.

NARRATION. The only voice is a woman narrating in a hushed, reverent, breathy wildlife-documentary whisper, very close to the microphone, as though she is lying in long grass. She is completely sincere. She never laughs, never breaks, and treats an office worker eating a sandwich with the gravity of a rare animal at a watering hole. She is not in shot at any point.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

BEATS.
0-3s. The camera creeps past the pot plant and finds Derek mid-sandwich. Whispered, awed: "Here we observe the manager in his natural habitat."
3-8s. The camera pans very slightly to take in the three colleagues behind him, then drifts back. Whispered, confiding: "Behind him, three of his herd have quietly switched on 'Open To Work'."
8-12s. Derek takes another bite, entirely at peace. Whispered, with real pity: "Recruiters can see it. His network can see it. He cannot."
12-15s. Derek finally glances up and looks straight down the lens, mildly puzzled, still chewing. The camera flinches back behind the partition. Whispered, flat, as though signing off: "TeamPredict. Thirty days free."

${SAY_TEAMPREDICT}

${NO_SCREENS}

AUDIO. Real office room tone: air conditioning, a distant printer, a phone ringing twice somewhere and stopping, keyboard noise, the crinkle of sandwich packaging, the narrator's breath very close on the mic and the fabric of the partition brushing the phone. Muffled far-off conversation with no audible words. No music.

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // NEW 1 of 3 — highest confidence of the new ones
  // -------------------------------------------------------------------------
  {
    id: "teampredict-v4-pizza-party",
    company: "teampredict",
    title: "Pizza Party",
    format: "Two-hander sketch, retention theatre meeting reality",
    approvedAngle: false,
    research:
      "The pizza party as a retention strategy is the single most-repeated joke among the people who buy this product, which is exactly the batch-6 test: find the argument the community is already having and make that the ad. It needs no setup, no explanation and no product knowledge to land, which is what makes it the most shareable of the six. The turn arrives at second 8 and the last beat is a trimmable button.",
    approvedCopy:
      'Final CTA h2 verbatim: "Don\'t Wait for the Resignation Letter." / "Spot rising resignation risk early, so you can fix the problem or plan ahead without the panic." Carried on the end card.',
    claimNotes:
      "Nothing factual is spoken. No product is named aloud, so there is no pronunciation risk and nothing in the audio to get wrong. The entire pitch is on the composited end card.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a real moment in an office kitchen, filmed on a phone by someone standing among the group. This is not an advertisement and must not look like one.

${SKETCH_LOOK}

PLACE. A tired office kitchen at lunchtime: a laminate counter, a kettle, a sink with two unwashed mugs in it, a fridge covered in nothing but a single blank magnet, a round table with four chairs. Strip lighting overhead. Four or five colleagues are standing about with paper plates, not talking.

PEOPLE. CLAIRE, a woman in her forties in a blazer over a plain top, the manager, who arrives carrying three stacked pizza boxes with completely genuine delight, as though she has solved something. DANIEL, a man in his thirties in a plain jumper, standing nearest the counter, calm and matter-of-fact and entirely without malice, who answers a rhetorical question literally because he assumes he is supposed to. The other colleagues say nothing at all and simply look at their plates.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

BEATS.
0-3s. Claire pushes the door open with her shoulder, boxes held high, beaming, genuinely pleased with herself: "Team! Pizza!"
3-8s. She sets the boxes down and opens the top one with a flourish, still beaming, entirely sincere: "Because you're all valued, and nobody is going anywhere."
8-12s. Daniel, holding an empty paper plate, answers plainly and without any edge at all, as though correcting a small factual error: "I accepted another offer this morning." Nobody else moves. Claire's smile stays on her face for a second too long.
12-15s. Claire looks down at the open box, then back up at him, still holding the lid, quiet and completely lost: "Do you still want pizza?"

${NO_SCREENS}

AUDIO. Real kitchen sound: the door swinging, the cardboard boxes landing on the counter, the box lid tearing open, a kettle finishing its boil and clicking off, a fridge hum, a paper plate flexing in someone's hand. A long unfilled silence after Daniel's line, with only the fridge. No music.

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // NEW 2 of 3
  // -------------------------------------------------------------------------
  {
    id: "teampredict-v5-psychic",
    company: "teampredict",
    title: "The Psychic",
    format: "Two-hander sketch, format parody, irony as the whole premise",
    approvedAngle: false,
    research:
      "The most purely ironic of the six: a manager pays a fortune teller to tell her something that was public the entire time, and the fortune teller is the one who points that out. The premise IS the pitch, so the ad explains the product without a single feature line. It is also the only one where the punchline is delivered by the sceptic, which is the register that survives a Reddit comment thread.",
    approvedCopy:
      'Signal list verbatim from the FAQ ("a new headline or title, an \'Open to Work\' badge, fresh skills, a profile refresh"). Pricing verbatim: "$5 per Tracked Employee. That\'s the Whole Price."',
    claimNotes:
      "$5 per tracked employee is verbatim site copy and is the only number spoken. Naming LinkedIn aloud is site copy; its logo is banned and never appears. The 'predictions' are the site's own signal list, deliberately, which is what makes the joke land.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a real moment in a small dim room, filmed on a phone propped on a shelf to one side. This is not an advertisement and must not look like one.

VISUAL STYLE. Vertical, locked off on a shelf at head height with a slight tilt, so the framing is a little wrong and neither person is centred. Very small drift as the phone settles once. Lit only by a beaded lamp with a red shade and a few candles on the table, so the light is warm, uneven and slightly too dim, with real grain in the shadows. No colour grade, no studio lighting, no professional camera look.

PLACE. A cramped back room got up as a fortune teller's parlour and not doing it very well: a small round table under a fringed cloth, a glass ball on a wooden stand, a beaded lamp, three candles, patterned fabric pinned over the walls, a radiator visible under the fabric at one edge, an ordinary domestic door behind.

PEOPLE. MADAME ELENA, a woman in her sixties in layered shawls and heavy rings, who performs the mystical part completely convincingly and then drops it flat, without any change of expression, the way a professional stops pretending when it stops being worth the effort. HELEN, a woman in her forties in office clothes that are badly out of place in this room, sitting bolt upright with her handbag still on her lap, entirely earnest, treating this as a legitimate business expense.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

BEATS.
0-3s. Helen leans forward across the table, deadly serious, sliding two folded notes towards Elena: "Will anyone on my team quit?"
3-8s. Elena closes her eyes and passes both ringed hands slowly over the glass ball, voice low and theatrical, drawing every word out: "I see a new profile photo. I see fresh skills."
8-12s. Elena's eyes open. Everything theatrical drops out of her at once. She sits back and speaks completely plainly, as one professional to another: "Have you tried just looking at their LinkedIn?"
12-15s. Helen does not move. Elena shrugs very slightly, entirely matter-of-fact, and adds it as an afterthought: "Or TeamPredict. Five dollars a person."

${SAY_TEAMPREDICT}

${NO_SCREENS}

AUDIO. Real small-room sound: the rings clicking against the glass ball, a candle guttering, the chair creaking as Elena sits back, the handbag clasp, a radiator ticking, muffled traffic outside. Both voices close and dry in a small soft-furnished room. No music.

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // NEW 3 of 3
  // -------------------------------------------------------------------------
  {
    id: "teampredict-v6-my-competitors",
    company: "teampredict",
    title: "I Use It On My Competitors",
    format: "UGC selfie, gleeful confession",
    approvedAngle: false,
    research:
      "The only script aimed at a different buyer: founders and recruiters rather than HR, using the same product. The competitor-tracking section is new on the homepage and no TeamPredict ad has ever used it, and nothing in the category advertises it at all. Confession is a Motion-validated hook tactic from the 550K-ad dataset, and delivered with glee rather than shame it becomes the ironic one: the same signals that frighten you about your own team delight you about theirs. Worth its own ad set.",
    approvedCopy:
      '"Point the Same Radar at Your Competitors." / "High signals at a competitor surface as poaching opportunities, with alerts" / "Profile History, Risk Scores, and Email Alerts." / "30-day free trial".',
    claimNotes:
      "Competitor tracking and email alerts are both verbatim site sections. No number is spoken except the offer. Nothing about accuracy or timing. He describes his own behaviour, not a product outcome.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his thirties shot on his own phone in a parked car and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. The driver's seat of an ordinary parked car in daylight, the phone propped against the steering wheel or held just above it. A car park and a low brick building blurred through the windscreen behind him, a takeaway coffee cup in the holder, a jacket on the passenger seat, a parking ticket tucked behind the wheel.

PERSON. SAM, a man in his mid thirties in an open collar with a jacket half off one shoulder, delighted with himself in the specific way of someone sharing something they probably should not. He leans right into the lens for the first line, drops his voice as though someone might overhear him in an empty car park, and keeps glancing at the windscreen as though checking. The glee is real and completely unashamed, but he never plays it to the camera as a joke.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

BEATS.
0-3s. Already leaning in close to the lens, quick and low, thoroughly enjoying himself: "Everyone uses this on their own team. I use it on my competitors."
3-8s. He sits back, one hand open, explaining it as though it is obvious: "Their senior people start polishing their profiles, I get an email."
8-12s. He glances once at the windscreen, then back to the lens, quieter and even more pleased: "And then I call them. Before they've told their boss."
12-15s. He settles, stops moving, looks straight down the lens and delivers it noticeably slower and clearer than everything before it: "TeamPredict. Thirty days free."

${SAY_TEAMPREDICT}

${NO_SCREENS}

AUDIO. Real parked-car sound: the seat creaking, his jacket against the upholstery, a car door closing somewhere across the car park, faint wind on the windscreen, the slightly boxy close acoustic of a car interior. His voice low and close on the phone mic. No music.

${BANS}`,
  },
];
