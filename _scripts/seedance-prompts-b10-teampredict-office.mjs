// Seedance 2.5 ad prompts — 2026-08-18 batch 10, TeamPredict mockumentary skits.
//
// Robby: "You can also try creating a few 30 second skit ads in the style of
// The Office show."
//
// The style is delivered as GENRE, never as imitation: no character from any
// real show, no show name in any prompt, no NBC anything. What gets borrowed is
// the observational-workplace-mockumentary grammar, which is exactly the
// batch-1 rule (a format gives the model a grammar to imitate; slop has no
// format): a documentary crew the characters know about and mostly ignore,
// zoom punch-ins on reactions, confessional talking-head interviews against an
// office wall, and the held, flat glance into the lens as the punchline
// delivery mechanism.
//
// That glance needs its own carve-out. The batch-9 COMEDY RULE bans looking at
// the camera because it breaks a sketch; in a mockumentary the look to camera
// IS the format, but only the flat, weary, held version. The GLANCE block
// below permits exactly that and still bans mugging.
//
// 30-SECOND RULES (playbook): 40-55 spoken words, hook fully spoken by second
// 2, the turn in the middle rather than the tail, diegetic audio only, no
// music score. Real counted dialogue: w1 = 41 words, w2 = 42, w3 = 41. The
// first draft of this header claimed 43-50 without counting, and the judge
// panel caught it: count the quoted words, never assert them.
//
// NONE OF THE THREE SPEAKS THE BRAND. The composited end card carries it, the
// batch-9 v2/v4 precedent: five compound brand names have been mispronounced
// across eight batches, and a skit is purer without a spoken sell anyway.
//
// CLAIM SAFETY: characters describe their own fictional colleagues' behaviour
// (a new headline, new skills, a fresh headshot, going quiet), which is the
// site's own signal list spoken as human observation, never as a product
// claim. "People go quiet before they resign" is a verbatim site h2. No
// accuracy figures, no lead-time windows beyond the site's own "weeks", no
// screens anywhere, no third-party logos.

const DOC_LOOK = `Shot by an unseen two-person documentary crew on a shoulder-mounted broadcast camera, vertical 9:16 framing. Constant slight handheld sway, quick zoom punch-ins onto faces when someone says something notable, a brief hunt for focus after each whip pan, imperfect reframing. Flat overhead fluorescent office light, slightly drab colour, mid-2000s workplace-documentary texture. The characters know the crew is there and mostly pretend not to notice it. It must look like an episode of an observational workplace documentary series, not an advertisement.`;

const GLANCE = `THE LOOK. Exactly one deliberate look into the lens is allowed, where marked in the beats: the character turns their eyes to the camera and holds a completely flat, tired, knowing look for a full beat. No smile, no wink, no raised eyebrow, no head tilt, no performance of any kind. It is a private moment of communion with the documentary crew, and its entire power is that the face does not move.`;

const DEADPAN = `COMEDY RULE. Every line is played completely straight. Nobody in the scene knows they are in something funny: no mugging, no smirking before a line, no comedy pauses held for effect, no laughing at their own words. The performances are naturalistic and slightly awkward, exactly as ordinary people are on an ordinary day at work being filmed for a documentary. Apart from the single permitted look described in THE LOOK block, nobody acknowledges the camera as an audience.`;

const HOOK = `HOOK. The first line is fully spoken inside the first two seconds. No establishing shot, no slow push-in, no titles, no silence before the first word: the scene is already in motion when the clip begins, as though the viewer arrived a moment late.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no interviewer voice, no counting, no muttering, no improvised commentary, no background chatter with audible words, and none of the stage directions in this prompt are read aloud.`;

const NO_SCREENS = `SCREEN RULE. No display surface of any kind appears anywhere in this video at any point. Every computer monitor in shot is turned away from the camera so only its plain back panel and stand are visible. Every laptop is closed with its lid down. No phone screen, tablet, television or projector is visible or lit at any moment, in the foreground or the background. No screen glow, no screen reflection in glass or spectacles.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no name cards, no logos, no wordmarks, no watermarks, no graphics, no end card. No real company's logo or brand mark on anything, including mugs, walls, lanyards, laptops and clothing. No charts, no dashboards, no whiteboards with readable writing, no documents with legible text. No music score of any kind and no laugh track: room tone and diegetic sound only. No slow motion, no drone shots, no gliding dolly, no lens flares, no teal-and-orange grade, no studio lighting, no advertising gloss, no stock-footage look.`;

export const ADS = [
  {
    id: "teampredict-w1-farewell-party",
    company: "teampredict",
    title: "The Farewell Party",
    format: "Mockumentary conference-room cold open",
    research:
      "The party-planning meeting is the most recognisable set piece in workplace mockumentary, and the premise inverts it: the manager is planning the farewell before the resignation, which makes him simultaneously absurd and RIGHT, which is the product thesis played as comedy. The signal list is spoken as his evidence.",
    approvedCopy:
      'Signals PARAPHRASED from the site FAQ list (a new headline or title, fresh skills, a profile refresh, a spike in edit activity); "his profile changed twice this week" is the edit-activity signal in plain words. "Weeks" is the site\'s own lead-time word, with no qualifier. End card carries the sell.',
    claimNotes:
      "No product exists in the scene. A fictional manager reads public signals off his own memory; no accuracy claim, no tool shown, no brand spoken.",
    aspect_ratio: "9:16",
    duration: "30",
    prompt: `A thirty-second scene from an observational workplace documentary series. This is not an advertisement and must not look like one.

${DOC_LOOK}

PLACE. A small windowless conference room under fluorescent light: a laminate table with a water jug and stacked paper cups, mismatched office chairs, a wheeled cabinet, a sad pot plant in the corner. Camera positioned at the end of the table like a crew squeezed into the room. Any monitor faces away; there is nothing legible on any wall.

PEOPLE. GREG, a manager in his late forties, tie slightly loose, running the meeting with the calm energy of a man who believes he is being extremely reasonable. JANET, mid-thirties, cardigan, a notebook she never writes in, the only person in the room willing to say the obvious thing. Two other colleagues sit between them and say nothing, looking at their paper cups.

${HOOK}

${DEADPAN}

${GLANCE}

${SPEECH_RULE}

BEATS.
0-2s. GREG, mid-meeting, brisk and warm, hands flat on the table: "Steve's farewell party. I'm thinking Friday."
2-7s. The camera whip-pans to JANET. A beat. Carefully: "Steve hasn't resigned."
7-15s. Back to GREG, patient, ticking items off with small hand gestures: "New headline. Four new skills. A professional headshot. His profile changed twice this week. He's 'networking', Janet. We have weeks."
15-19s. JANET, after a pause, gently: "Shouldn't we just... talk to him?"
19-24s. GREG goes still. A long beat. Quietly, with finality: "The cake is ordered." Another beat, softer: "It's marble."
24-30s. Zoom punch-in on JANET as she turns a flat, held look into the lens. Nobody speaks. The room hums.

${NO_SCREENS}

AUDIO. Real meeting-room sound: the HVAC hum, a chair creak, the water jug being nudged, paper cups, the camera operator's small breath on a whip pan. No music.

${BANS}`,
  },

  {
    id: "teampredict-w2-exit-interview",
    company: "teampredict",
    title: "The Exit Interview",
    format: "Mockumentary confessional interview, single continuous shot",
    research:
      "The confessional talking-head is the mockumentary's signature and the single most reliable thing this model renders: one seated character, one framing, thirty continuous seconds. The arc is pride decaying into doubt in real time, which is the t19 banner ('The exit interview is not an early warning system') performed instead of stated.",
    approvedCopy:
      'The t19 line shipped in batch 8 and runs live on Reddit as "The exit interview is not an early warning system." Here it is never even spoken: the character DEMONSTRATES it. End card carries the sell.',
    claimNotes:
      "Entirely a fictional HR manager describing his own process. No product, no brand, no numbers, no claims. The garnish detail (the manager, the commute, the coffee) is fictional colour, not data.",
    aspect_ratio: "9:16",
    duration: "30",
    prompt: `A thirty-second confessional interview from an observational workplace documentary series. This is not an advertisement and must not look like one.

VISUAL STYLE. A single continuous seated interview shot, vertical 9:16, framed slightly off-centre the way documentary interviews are. Shoulder-mounted camera on a loose tripod: micro-sway, one tiny reframe mid-way, one slow zoom punch-in near the end. Flat fluorescent light with weak daylight from a window off-frame. Mid-2000s broadcast-documentary texture. He is answering questions from an unheard interviewer sitting just to the left of the lens.

PLACE. A beige office corner dressed as an interview spot: a plain wall, the edge of a filing cabinet, a shelf with three ring binders and a small trophy with no readable engraving, a pot plant. Nothing legible anywhere.

PERSON. DOUG, an HR manager in his fifties, lanyard with a blank white card, short-sleeved shirt, a man deeply at peace with his own excellence. His confidence is total at the start and develops exactly one hairline crack, which he papers over and pretends never happened. ${DEADPAN}

${HOOK}

${GLANCE}

${SPEECH_RULE}

BEATS.
0-2s. DOUG, settled, hands folded, quietly proud, the first line landing immediately: "I give the best exit interviews."
2-6s. A small modest shrug: "People open up to me."
6-15s. He leans in, warming to it, a small generous gesture: "When Dana left, I learned everything. The manager. The commute. The coffee. Everything. We were in there two hours."
15-20s. A beat. The unheard interviewer has evidently asked something. DOUG's face flickers, and DOUG repeats the question back slowly, half to himself: "Would that have been useful back in March?"
20-26s. A long pause. He looks off to the side, and the pride drains out by one degree. Quietly: "...Sure."
26-30s. He looks back, recomposes completely, and says: "Next question." Then he turns the flat, held look into the lens and holds it in silence to the end of the clip.

${NO_SCREENS}

AUDIO. Real small-office room tone: the HVAC, a distant phone ringing twice, the chair's slow creak as he leans in, the tiny rustle of his shirt on the backrest. No music, no interviewer voice ever audible.

${BANS}`,
  },

  {
    id: "teampredict-w3-gone-quiet",
    company: "teampredict",
    title: "Gone Quiet",
    format: "Mockumentary bullpen scene with a silent background payoff",
    research:
      "'People Go Quiet Before They Resign.' is the best h2 on the site and folk wisdom every manager already believes, so a colleague can say it verbatim as advice rather than as ad copy. The silent background beat (Marcus putting his jacket on mid-afternoon) is deliberately trimmable garnish: if it renders it is the best joke in the batch, and if it fails the scene stands without it.",
    approvedCopy:
      '"People go quiet before they resign" is the verbatim site h2 for the Slack team-health section, spoken here as a colleague\'s observation about a fictional person. End card carries the sell.',
    claimNotes:
      "The memes/thumbs-up detail is one colleague describing another colleague's visible behaviour, which keeps the counts-not-content boundary trivially: no tool is present, nothing is read, no message content is ever quoted.",
    aspect_ratio: "9:16",
    duration: "30",
    prompt: `A thirty-second scene from an observational workplace documentary series. This is not an advertisement and must not look like one.

${DOC_LOOK}

PLACE. An ordinary open-plan office in the mid-afternoon: grey carpet tiles, low fabric partitions, desks with monitors all turned away from camera and two closed laptops, a coat rack, a wheeled recycling bin. In the far background one distant desk is occupied by MARCUS, a man in his thirties, visible but small, doing nothing remarkable. The camera stands in the aisle like a crew that has been there all week.

PEOPLE. GREG, the same species of manager every office has, holding a mug, leaning on a partition with forced casualness. PRIYA, at the nearest desk, early forties, does not stop what she is doing to talk to him, which he does not notice. DEV, one desk further, headphones around his neck, the office's designated truth-teller.

${HOOK}

${DEADPAN}

${GLANCE}

${SPEECH_RULE}

BEATS.
0-2s. GREG, over the partition, casually: "Has anyone heard from Marcus today?"
2-7s. PRIYA, not looking up: "He's around."
7-14s. GREG, into his mug, wounded: "He used to send me forty memes a day. Today I got a thumbs up." A hurt beat. "Good memes, too."
14-18s. Whip pan to DEV, who says it flat, like a weather report: "People go quiet before they resign, Greg."
18-22s. GREG: "He's probably just focused." DEV: "Nobody is that focused."
22-30s. In the far background, small, silent and out of focus, MARCUS stands and unhurriedly puts on his jacket in the middle of the afternoon. The camera does not move and does not refocus: focus stays on PRIYA in the foreground as she turns a flat, held look into the lens and holds it. Nobody speaks.

${NO_SCREENS}

AUDIO. Real open-plan room tone: keyboards, the HVAC, a printer finishing a job somewhere, Greg's mug set down on the partition ledge, the fabric brush of the camera strap on a whip pan. No music.

${BANS}`,
  },
];
