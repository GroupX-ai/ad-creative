// Seedance 2.5 ad prompts — 2026-08-18 batch 11, mockumentary skits round 2.
//
// Robby, after batch 10: "Love it. You can create a few more... Try to make it
// a bit more on the nose like the signs were there when they changed their
// LinkedIn profile."
//
// "On the nose" is taken literally: in this batch the LinkedIn signals ARE the
// dialogue. Batch 10 implied them; these name them. A manager compliments the
// new headshot to the person's face without connecting it to anything. A
// manager builds a conspiracy board out of a public profile. A manager is the
// last person in the building to hear about the green ring. The signals named
// aloud (new headshot, new headline, new skills, the "Open to Work" ring) are
// the site's own list, spoken as fictional colleagues' visible behaviour.
//
// BATCH-10 LESSON APPLIED FROM THE START: genre pulls in the genre's famous
// faces. Every named character in this file carries a concrete, deliberately
// generic physiognomy AND the shared FACES block. Batch 10 paid a $13.87
// re-roll to learn this; this batch should not.
//
// Everything else carries over: mockumentary as genre never imitation, no show
// names, 40-55 words per 30s (counted below, not asserted), hook by second 2,
// turn in the middle, one flat held look to the lens, no spoken brand (the end
// card carries it), NO_SCREENS everywhere, no third-party logos.

const DOC_LOOK = `Shot by an unseen two-person documentary crew on a shoulder-mounted broadcast camera, vertical 9:16 framing. Constant slight handheld sway, quick zoom punch-ins onto faces when someone says something notable, a brief hunt for focus after each whip pan, imperfect reframing. Flat overhead fluorescent office light, slightly drab colour, mid-2000s workplace-documentary texture. The characters know the crew is there and mostly pretend not to notice it. It must look like an episode of an observational workplace documentary series, not an advertisement.`;

const FACES = `FACES. Every person in this video has an entirely generic, unremarkable, previously-unseen face, and must not resemble any real actor, comedian, television presenter or public figure, living or dead, even faintly. Cast them as complete unknowns.`;

const GLANCE = `THE LOOK. Exactly one deliberate look into the lens is allowed, where marked in the beats: the character turns their eyes to the camera and holds a completely flat, tired, knowing look for a full beat. No smile, no wink, no raised eyebrow, no head tilt, no performance of any kind. It is a private moment of communion with the documentary crew, and its entire power is that the face does not move.`;

const DEADPAN = `COMEDY RULE. Every line is played completely straight. Nobody in the scene knows they are in something funny: no mugging, no smirking before a line, no comedy pauses held for effect, no laughing at their own words. The performances are naturalistic and slightly awkward, exactly as ordinary people are on an ordinary day at work being filmed for a documentary. Apart from the single permitted look described in THE LOOK block, nobody acknowledges the camera as an audience.`;

const HOOK = `HOOK. The first line is fully spoken inside the first two seconds. No establishing shot, no slow push-in, no titles, no silence before the first word: the scene is already in motion when the clip begins, as though the viewer arrived a moment late.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no interviewer voice, no counting, no muttering, no improvised commentary, no background chatter with audible words, and none of the stage directions in this prompt are read aloud.`;

const NO_SCREENS = `SCREEN RULE. No display surface of any kind appears anywhere in this video at any point. Every computer monitor in shot is turned away from the camera so only its plain back panel and stand are visible. Every laptop is closed with its lid down. No phone screen, tablet, television or projector is visible or lit at any moment, in the foreground or the background. No screen glow, no screen reflection in glass or spectacles.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no name cards, no logos, no wordmarks, no watermarks, no graphics, no end card. No real company's logo or brand mark on anything, including mugs, walls, lanyards, laptops and clothing. No charts, no dashboards, no whiteboards with readable writing, no documents or cards with legible text. No music score of any kind and no laugh track: room tone and diegetic sound only. No slow motion, no drone shots, no gliding dolly, no lens flares, no teal-and-orange grade, no studio lighting, no advertising gloss, no stock-footage look.`;

export const ADS = [
  {
    id: "teampredict-w4-new-headshot",
    company: "teampredict",
    title: "The New Headshot",
    format: "Mockumentary cubicle scene: the signal complimented to its owner's face",
    research:
      "The most on-the-nose framing possible: the manager SEES the signal and praises it, which is funnier and sadder than missing it. 'Whatever it's for' is the entire product thesis said by a man who will never connect it. The suit/weddings exchange makes the signal impossible to miss for the viewer while the manager misses it in the same breath.",
    approvedCopy:
      "A new headshot / profile photo is on the site's own signal list (FAQ: 'a profile refresh'). End card carries the sell.",
    claimNotes:
      "A fictional manager compliments a fictional colleague's new profile photo. Nothing about the product is claimed aloud; the brand is never spoken.",
    aspect_ratio: "9:16",
    duration: "30",
    prompt: `A thirty-second scene from an observational workplace documentary series. This is not an advertisement and must not look like one.

${DOC_LOOK}

${FACES}

PLACE. A cubicle row in an ordinary open-plan office, mid-morning: low fabric partitions, a desk with a CLOSED laptop, stacked folders, a mug of pens, a small cactus. The camera stands in the aisle. Nothing legible on any surface.

PEOPLE. GREG, the manager: wiry, mid-fifties, a long thin face, neatly side-parted grey hair, a tucked-in checked shirt, reading glasses pushed up on his head. Warm, loud, completely oblivious. KEVIN, at the desk: late twenties, a soft round face, short dark curly hair, a sweater vest over a shirt, a man who freezes when praised. DEV, one cubicle over: thirties, heavy dark-rimmed glasses, a cardigan, the office's designated truth-teller, never looks up from the closed folder he is annotating.

${HOOK}

${DEADPAN}

${GLANCE}

${SPEECH_RULE}

BEATS.
0-2s. GREG, leaning over Kevin's partition, delighted, mid-conversation already: "Kevin! The new headshot. On the profile."
2-7s. GREG, warmer still: "I love it. Very, very professional." KEVIN freezes with a pen in his hand. A long beat. Carefully, not turning round: "...Thanks."
7-13s. GREG, warming up, gesturing at the air: "And the suit. Kevin. When do you ever wear a suit?"
13-18s. KEVIN, after a pause, very quietly: "Weddings." GREG, delighted: "Ha! Weddings."
18-23s. GREG, patting the partition twice, starting down the aisle toward DEV, expansive: "It's a great photo. Very forward-looking. Whatever it's for."
23-27s. GREG, reaching DEV, in a low proud aside: "Great kid. Going places." DEV, flat, without looking up: "He is, Greg." (This aside is trimmable garnish; the scene stands without it.)
27-30s. The camera, planted in the aisle the whole time, whip-pans back to KEVIN at his desk. No more dialogue. KEVIN turns a flat, held look into the lens and holds it to the end of the clip.

${NO_SCREENS}

AUDIO. Real open-plan sound: the partition being patted, a pen clicked twice, keyboards elsewhere, the HVAC, Greg's footsteps receding on carpet. No music.

${BANS}`,
  },

  {
    id: "teampredict-w5-conspiracy-board",
    company: "teampredict",
    title: "The Conspiracy Board",
    format: "Mockumentary meeting room: public information treated as a mystery",
    approvedAngle: false,
    research:
      "The signals named one by one, in order, out loud, on a corkboard with red string: maximum on-the-nose. The joke is that a manager has rediscovered public information and thinks it is a conspiracy, which is the product pitch inverted: the signals were never hidden. 'It's bigger than that, Tom' against 'It's really not' is the whole argument.",
    approvedCopy:
      "New headline, new skills, new photo: the site's own FAQ signal list, spoken in sequence. End card carries the sell.",
    claimNotes:
      "A fictional manager lists a fictional colleague's visible profile changes. The endorsement line is fictional colleague behaviour, not a product capability claim; the product is never named or described.",
    aspect_ratio: "9:16",
    duration: "30",
    prompt: `A thirty-second scene from an observational workplace documentary series. This is not an advertisement and must not look like one.

${DOC_LOOK}

${FACES}

PLACE. A small windowless meeting room. On the wall, a corkboard covered in COMPLETELY BLANK white index cards connected by red string, with one plain dark-grey card at the centre that is completely featureless: no silhouette of a person, no face, no facial features of any kind, drawn or photographed, and no app-style or profile-page framing. Every card is blank on both sides: no writing, no letters, no photographs of faces, nothing legible anywhere on the board or in the room. A laminate table, two chairs, a jug of water.

PEOPLE. DIANE, the manager: late fifties, tall and angular, silver hair in a tight bun, reading glasses on a chain, a blazer with a brooch. She has the calm intensity of someone certain she has uncovered something, and no awareness that her evidence is public. TOM, seated: forties, a gentle heavy man with a beard and a plain crew-neck jumper, holding his coffee with both hands, the only adult in the room.

${HOOK}

${DEADPAN}

${GLANCE}

${SPEECH_RULE}

BEATS.
0-2s. DIANE, already at the board, tapping a blank card with one finger: "It started Monday. New headline."
2-10s. She follows the red string from blank card to blank card as she speaks; every card she touches is blank, precise and quiet: "Wednesday, four new skills. Thursday, a professional photo. And on Friday he endorsed their founder. For 'vision'."
10-16s. TOM, gently, over his coffee: "Maybe just... ask Steve how he's doing?"
16-23s. DIANE does not turn round. She stares at the blank centre card. Quietly: "It's bigger than that, Tom. It goes all the way up."
23-26s. TOM, flat, without a pause: "It's really not."
26-30s. No more dialogue. Zoom punch-in on TOM as he turns a flat, held look into the lens and holds it. The string trembles slightly in the air-conditioning.

${NO_SCREENS}

AUDIO. Real small-room sound: the fingernail tap on cork, the string's faint twang, the HVAC, Tom's coffee cup set down once, a chair creak. No music.

${BANS}`,
  },

  {
    id: "teampredict-w6-green-ring",
    company: "teampredict",
    title: "The Green Ring",
    format: "Mockumentary bullpen: the manager is the last to know",
    approvedAngle: false,
    research:
      "The 'Open to Work' ring is the most recognisable job-hunt signal on earth, and the joke is the information asymmetry the product exists to fix: recruiters, colleagues and the man's dentist all know before the manager. 'It's public, Martin' / 'Everything. That's the point.' is the pitch spoken as exasperation, which is the batch-6 rule (the ad is the argument the audience is already having).",
    approvedCopy:
      "The 'Open to Work' badge is named on the site's FAQ signal list; 'the green ring' describes it without any third-party mark. End card carries the sell.",
    claimNotes:
      "No logo, no phone, no profile shown: the ring exists only in dialogue. Fictional colleagues discussing a fictional colleague's public badge. The brand is never spoken.",
    aspect_ratio: "9:16",
    duration: "30",
    prompt: `A thirty-second scene from an observational workplace documentary series. This is not an advertisement and must not look like one.

${DOC_LOOK}

${FACES}

PLACE. A corner of an ordinary open-plan office, mid-afternoon: low fabric partitions, desks with monitors all turned away from camera and one closed laptop, a wheeled office plant, a wall clock with plain hands. The camera stands in the aisle like a crew that has been there all week. No green ring, badge or circle graphic and no printed photograph, profile picture or image of any person appears anywhere in this video: the ring Sandra has put on her photo exists only in the dialogue and is never shown, drawn or suggested visually.

PEOPLE. MARTIN, the manager: short and stocky, late fifties, bald on top with a neat monk's fringe of brown hair, a short-sleeved shirt with a lanyard and a completely blank white card. Wounded rather than angry, holding a mug he never drinks from. ROSA, at the nearest desk: a broad, open, unremarkable face, mid-forties, hair in a loose ponytail, a denim shirt, annotating a paper form, does not stop working at any point. SAM, one desk over: thirties, a long narrow face, headphones around his neck, a flat unhurried voice.

${HOOK}

${DEADPAN}

${GLANCE}

${SPEECH_RULE}

BEATS.
0-2s. MARTIN, over the partition, wounded, mid-complaint already: "Sandra has the green ring. On her photo."
2-6s. ROSA, not looking up from her form: "Since Monday. Everyone knows."
6-9s. MARTIN, staring at her: "Monday? It's Thursday."
9-15s. MARTIN, to the room, hurt gathering: "My dentist told me. My dentist, Rosa. This morning."
15-20s. SAM, flat, like a weather report: "It's public, Martin. It has been public."
20-23s. MARTIN, quieter, a genuine question, looking into the middle distance: "What else is public?"
23-26s. SAM: "Everything, Martin. Everything. That's the point."
26-30s. A beat of silence. No more dialogue. ROSA turns a flat, held look into the lens without stopping her annotating, and holds it to the end of the clip.

${NO_SCREENS}

AUDIO. Real open-plan sound: Rosa's pen on paper, the clock's tick faintly, the HVAC, Martin's mug set down on the partition ledge, a distant printer. No music.

${BANS}`,
  },
];
