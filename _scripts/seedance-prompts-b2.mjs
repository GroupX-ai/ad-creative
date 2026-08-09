// Seedance 2.5 ad prompts — 2026-08-09 batch 2.
// Fourteen more 30-second ads across the three funded paid programs:
// VoiceDrop (5), Emailchaser (5), 1Lookup (4).
//
// Same anti-slop scaffolding as batch 1 (see seedance-prompts.mjs): declare the
// genre and deny it is an advertisement, real optics and practical light, a
// mundane location with named props, deadpan characters, timecoded verbatim
// dialogue (~40-55 spoken words), diegetic audio, then a hard ban list.
//
// Every concept is a DIFFERENT recognisable format, and none repeats batch 1's
// three (support group, true-crime doc, ghost-hunting show). Holding the approved
// copy fixed while varying the format is the same bet that worked on the banner
// batches: style is the variable, claims never are.
//
// 1Lookup fix carried forward: batch 1 rendered "1Lookup" as "One look", so every
// 1Lookup prompt now spells the brand phonetically for the voice track.

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind anywhere in the video: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no user-interface overlays, no end card. Any screen or monitor visible in frame is switched off, blank, or blown out to white, never showing readable text. No brand marks or product logos on anything. Nobody looks into the lens except where the beats say so. No slow motion, no speed ramps, no drone shots, no crane shots, no gliding dolly moves, no orbiting camera, no rack-focus flourishes, no lens flares, no light leaks, no glowing particles, no holograms, no floating screens or floating icons, no teal-and-orange colour grade, no music score, no whooshes or impact stings, no montage of pretty cutaways, no models smiling at camera, no glass-walled modern office, no stock-footage look, no advertising gloss. Keep it plain, badly lit and ordinary, exactly as a real camera operator standing in that real room would capture it.`;

const REALISM = `Faces are ordinary and unglamorous, with real skin texture, tired eyes and imperfect teeth. Wardrobe is cheap and slightly ill-fitting. Performances are deadpan, underplayed and unperformed, with natural pauses, breaths and small hesitations, the way people actually talk. Nobody is enjoying themselves.`;

// Say the brand out loud correctly. "1Lookup" reads as three syllables.
const SAY_1LOOKUP = `The spoken brand name is pronounced as three clear syllables, "one look up", never shortened to "one look". The final syllable "up" must be clearly audible.`;

export const ADS = [
  // ─────────────────────────────── VoiceDrop ───────────────────────────────
  {
    id: "voicedrop-c40-nature-documentary",
    company: "voicedrop",
    title: "The Last Cold Caller",
    format: "Nature documentary parody",
    angle: "Manual cold calling is obsolete, observed as a dying species.",
    approvedCopy: '"Manual cold calling is obsolete." + "Stop chasing leads. Let them call you."',
    claimNotes: "No rate or price claims. The 300 calls are the narrator describing the character's day.",
    aspect_ratio: "9:16",
    prompt: `A parody of a prestige wildlife documentary, played completely straight. This is not an advertisement.

LOOK. Long-lens observational footage shot from behind a partition, as if the crew is hiding: the subject is slightly obscured by the edge of a cubicle wall in the foreground, focus occasionally hunting. Flat overhead office fluorescents, greenish and unflattering, visible grain in the shadows. No camera moves except a slow careful reframe, the way a wildlife operator tracks an animal.

PLACE. A beige corporate office, mostly empty, late afternoon. Rows of grey cubicles, one occupied. A dead spider plant, a wall clock, a motivational poster too far away to read, a stack of printed call sheets, a cold mug of coffee with a ring stain.

PEOPLE. GARY, a man in his fifties, short-sleeved shirt, wired telephone headset, reading glasses on a cord. He dials, waits, gets nothing, marks a sheet, dials again. He never speaks. ${REALISM}

BEATS.
0-6s. Long lens through the cubicle gap. Gary dials, listens, hangs up, draws a line on his call sheet. A hushed male documentary narrator, older, measured and reverent: "The North American cold caller."
6-12s. Gary dials again. Waits. Hangs up. Narrator: "Three hundred calls a day. He has not spoken to a human since Tuesday."
12-18s. Gary slowly eats a sandwich from a plastic bag, still holding the receiver to his ear. Narrator: "He does not know it yet, but his species is already gone."
18-24s. Push nothing, just hold. Gary hangs up one more time and stares at the sheet. Narrator, gently: "Manual cold calling is obsolete."
24-30s. Gary's desk phone rings on its own. He stares at it, genuinely confused, and does not pick up. Narrator: "VoiceDrop. Stop chasing leads. Let them call you."

AUDIO. Office room tone, a distant printer, the electrical buzz of a fluorescent tube, the clatter of a handset in its cradle, a dial tone. The narrator is hushed and unhurried, recorded close, the way a nature documentary voice sits over the picture. No music.

${BANS}`,
  },

  {
    id: "voicedrop-c41-recording-booth",
    company: "voicedrop",
    title: "One Take",
    format: "Recording-studio session, deadpan",
    angle: "Your voice, sent at scale.",
    approvedCopy: '"Your Voice. Thousands of Voicemails."',
    claimNotes: "Volume figure is spoken by the engineer as a session detail, not a product statistic. No callback rate, no price.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy scene shot like a fly-on-the-wall studio documentary. This is not an advertisement.

LOOK. Handheld, slightly too close, shot through the smudged glass of a recording booth for part of it so there is a real reflection and a little flare-free grime. Practical light only: a desk lamp in the booth and the glow of the mixing desk. Grain in the shadows, imperfect focus.

PLACE. A cramped, cheap voiceover booth in a converted office. Grey acoustic foam squares glued unevenly to the wall, one peeling at the corner. A pop filter, a mic on a boom, a swivel chair with a taped armrest. Outside the glass, a cluttered desk with a cold takeaway container.

PEOPLE. RAY, a man in his forties in a fleece, headphones on one ear, reading from a phone in his hand, self-conscious. The ENGINEER, a woman in her thirties, hoodie, entirely bored, speaking through the talkback. ${REALISM}

BEATS.
0-5s. Ray clears his throat, leans too close to the mic and reads, stiff and unnatural: "Hi, this is Ray, give me a call back."
5-9s. Silence. Through the talkback, flat: "Good. That's the one."
9-14s. Ray takes the headphones off, relieved: "Great. Who's that going to?"
14-19s. The engineer does not look up from the desk: "Forty thousand people."
19-23s. Ray freezes, halfway out of the chair. A long beat. He sits back down slowly.
23-26s. Ray, quieter, genuinely unsettled: "...Should I do another one?"
26-30s. The engineer, already packing up: "It's your voice. That's the point." Then, flat, to no one: "VoiceDrop. Your voice, thousands of voicemails."

AUDIO. The dead acoustics of a treated booth, headphone spill, a chair creak, the click of the talkback opening and closing. Ordinary flat American voices, unperformed. No music.

${BANS}`,
  },

  {
    id: "voicedrop-c42-callback-avalanche",
    company: "voicedrop",
    title: "They Called Back",
    format: "Deadpan workplace comedy, single locked-off shot",
    angle: "Inbound instead of outbound.",
    approvedCopy: '"Stop Chasing Leads. Let Them Call You."',
    claimNotes: "No callback-rate percentage anywhere. The comedy is the volume of ringing, not a stated number.",
    aspect_ratio: "9:16",
    prompt: `A deadpan single-shot comedy scene, filmed like real security-adjacent office footage. This is not an advertisement.

LOOK. One locked-off wide shot on a tripod at desk height, no camera movement at all for the entire runtime. Flat overhead fluorescent light, mildly ugly, slightly wide lens with real corner softness and visible grain.

PLACE. A small ordinary sales office. Two desks pushed together, a whiteboard with faint ghost marks, a water cooler, a wilting plant, a wall of cheap vertical blinds half open.

PEOPLE. DENISE, a woman in her thirties in a plain cardigan, sitting very still, staring at her desk. MARTIN, a man in his forties at the next desk, eating cereal from a mug, unbothered. On Denise's desk: one mobile phone, and then, over the scene, more phones. ${REALISM}

BEATS.
0-5s. Denise sits motionless. Her phone rings. She stares at it. She does not pick up.
5-10s. A second phone rings, somewhere off the desk. Then a third. Denise slowly turns her head. Martin keeps eating.
10-16s. The ringing multiplies until several phones are going at once across both desks, overlapping and out of sync. Denise puts both hands flat on the desk. Martin does not look up.
16-21s. Denise, quietly, to Martin: "They're calling me."
21-25s. Martin, chewing, still not looking up: "Yeah. That's what happens now."
25-30s. Denise looks at the camera for the first time, blankly, as the phones keep ringing. Martin says, evenly: "VoiceDrop. Stop chasing leads. Let them call you."

AUDIO. Room tone, a water cooler glug, a spoon in a mug, and a rising overlapping chorus of ordinary mobile ringtones, none of them synchronised, never becoming musical. No score.

${BANS}`,
  },

  {
    id: "voicedrop-c43-museum",
    company: "voicedrop",
    title: "Exhibit 4",
    format: "Museum tour parody",
    angle: "Cold calling as a historical artefact.",
    approvedCopy: '"Manual Cold Calling Is Obsolete."',
    claimNotes: "No product numbers. The museum framing is comic, not a factual claim about the industry.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy scene shot like an ordinary handheld visitor video on a school trip. This is not an advertisement.

LOOK. Handheld at chest height with real amateur wobble and one clumsy reframe, shot from within a small group so heads and shoulders drift into the bottom of the frame. Museum lighting only: a warm picture light over the case and dim ambient elsewhere. Reflections on the display glass are visible and unfixed.

PLACE. A quiet regional museum room. A glass display case on a plinth, a low velvet rope, a polished concrete floor, a fire exit sign glow, dark walls.

PEOPLE. A DOCENT in her sixties in a lanyard and sensible cardigan, hands clasped, speaking with total sincerity. FOUR TEENAGERS, bored, one on a phone, seen mostly as backs of heads. Inside the case: a beige corded desk telephone, a headset with a coiled wire, and a dog-eared paper script, arranged like precious artefacts. ${REALISM}

BEATS.
0-6s. Handheld drifts onto the case. The docent gestures at it: "This is a telephone script. Early twenty-twenties."
6-12s. Close, wobbly, on the objects behind glass. Docent: "Workers read from these. Out loud. To strangers."
12-17s. One teenager, flat and genuinely puzzled, off camera: "Did it work?"
17-22s. The docent considers this a moment too long, then answers honestly: "No."
22-26s. A beat. The teenagers say nothing. Someone shuffles. The docent looks back at the case fondly.
26-30s. Docent, to the group, matter-of-fact: "Manual cold calling is obsolete. VoiceDrop. Stop chasing leads, let them call you."

AUDIO. The big quiet room tone of a museum, distant footsteps on hard floor, a cough, the squeak of a trainer. Voices are unperformed and a little too quiet, as they are in museums. No music.

${BANS}`,
  },

  {
    id: "voicedrop-c44-warehouse",
    company: "voicedrop",
    title: "One Hundred, Or A Million",
    format: "Industrial site walkthrough, deadpan",
    angle: "Scale.",
    approvedCopy: '"Send 100 or 1,000,000 Voicemail Drops."',
    claimNotes: "The 100 and 1,000,000 figures are the approved headline verbatim. No delivery or callback claims.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy scene shot like a dull corporate facility walkthrough filmed on a phone. This is not an advertisement.

LOOK. Handheld, following behind someone at walking pace, the operator slightly out of breath. Harsh mixed lighting: high sodium and fluorescent bays overhead, deep shadow between racks. Wide-ish lens, real motion blur when the camera swings, grain in the darks.

PLACE. An enormous cold industrial warehouse, concrete floor, steel racking to the ceiling, a forklift parked in the distance, safety lines painted on the ground. On the racks, stretching away, plain cardboard trays of ordinary mobile phones.

PEOPLE. VAL, a woman in her fifties in a hi-vis vest over a fleece, holding a clipboard, walking and talking without stopping, completely matter-of-fact. The unseen OPERATOR follows. ${REALISM}

BEATS.
0-6s. Val walks briskly down an aisle, camera trailing her. She points at a low shelf without looking: "That's a hundred."
6-13s. She keeps walking. The camera swings up the racking to the ceiling and the racks keep going. Val, still walking: "Keep up."
13-20s. She stops at the end of the aisle and gestures at the whole warehouse behind her, a flat unimpressed sweep of the clipboard: "And that's a million."
20-25s. The operator turns the camera slowly across the space. Racks in every direction. Val waits, bored, checking her watch.
25-30s. Val, straight down the lens, deadpan: "Same afternoon either way. VoiceDrop. Send a hundred, or a million."

AUDIO. Big cold warehouse reverb, a distant forklift beeping, the hum of high bay lights, footsteps on concrete, the operator's breathing. No music.

${BANS}`,
  },

  // ────────────────────────────── Emailchaser ──────────────────────────────
  {
    id: "emailchaser-c12-safety-demo",
    company: "emailchaser",
    title: "In The Unlikely Event",
    format: "Airline safety demonstration parody",
    angle: "Where your email actually lands.",
    approvedCopy: '"Cold email that lands in primary."',
    claimNotes: "No deliverability percentage. 'Primary' and 'promotions' are the same inbox vocabulary the approved copy already uses. No airline is named or branded.",
    aspect_ratio: "9:16",
    prompt: `A parody of an in-flight safety demonstration, performed with total sincerity. This is not an advertisement.

LOOK. Locked-off shot from a seat row, slightly too low and off-centre, the way a passenger films it: a seat back and part of a headrest intrude at the frame edge. Harsh cabin lighting, flat and even, mild lens distortion, real handheld micro-drift.

PLACE. The narrow aisle of an ordinary older passenger aircraft cabin. Grey-blue seat fabric, worn plastic trim, overhead bins, a lit seatbelt sign, a small crumpled blanket on a seat.

PEOPLE. A FLIGHT ATTENDANT in her forties in a plain uniform and neckscarf, performing the demonstration with practised, hollow precision, holding a plain unmarked envelope instead of a life vest. A few PASSENGERS visible as shoulders and the tops of heads. ${REALISM}

BEATS.
0-6s. She holds the plain envelope up at shoulder height with both hands, palms flat underneath, the exact gesture of a safety card. A calm recorded female cabin announcement begins: "In the unlikely event that your email is not read..."
6-13s. She points with two flat fingers, slowly, to the left, then to the right, smiling at nothing. Announcement: "...it will be moved automatically to the promotions tab."
13-19s. She mimes tucking the envelope away into an overhead bin and closing it with a click. Announcement, unchanged in tone: "It will remain there for the duration of your career."
19-24s. She resumes the neutral hands-clasped pose, still smiling faintly at the middle distance. Nobody in the cabin is watching her.
24-30s. She lowers her hands. Announcement, same calm register: "Emailchaser. Cold email that lands in primary."

AUDIO. The constant low roar of cabin air, a seatbelt click, an overhead bin latch, a distant cough. The announcement is a flat, slightly compressed recorded voice on a cabin PA. No music.

${BANS}`,
  },

  {
    id: "emailchaser-c13-infomercial",
    company: "emailchaser",
    title: "There Has To Be A Better Way",
    format: "Late-90s direct-response infomercial parody",
    angle: "Follow-ups are automatic.",
    approvedCopy: '"Send Once. Follow-Ups Are Automatic."',
    claimNotes: "No pricing, no deliverability numbers, no invented testimonial. The struggle is physical comedy, not a claim.",
    aspect_ratio: "9:16",
    prompt: `A parody of a cheap late-1990s direct-response infomercial, played dead straight. This is not an advertisement in the modern sense and must not look like a modern one.

LOOK. Shot on period video: soft standard-definition texture, slightly blown highlights, a flat overlit three-point setup with a visible hard shadow on the back wall, mild chromatic smear, an unfashionable warm-yellow cast. Locked-off camera, one clumsy zoom in. Deliberately cheap.

PLACE. A fake domestic home office built as a set. A pine desk, a beige computer tower and a switched-off monitor, a wicker basket overflowing with plain envelopes, floral wallpaper, a fake window with a fake plant.

PEOPLE. A MAN in his forties in a tucked-in polo, hair neatly parted, performing enormous exasperation directly to camera in the flat overacted register of period infomercials. Everything he touches defeats him. ${REALISM.replace("Nobody is enjoying themselves.", "The performance is broad and stagey on purpose, in the style of a bad infomercial, but the room and the lighting stay convincingly real.")}

BEATS.
0-6s. Black and white. The man tries to stuff envelopes from the overflowing basket, drops a whole armful across the desk, and looks at camera in despair. He says, too loud: "There has to be a better way!"
6-12s. Still black and white, one clumsy zoom in on his face as he pushes the basket and it tips over completely. He puts his head in his hands.
12-17s. Hard cut to full colour, same set, now lit warm and clean. He is sitting calmly at the desk with his hands folded. The basket is upright and empty. He is completely still.
17-23s. He looks at the camera, entirely calm, and says plainly: "I sent it once."
23-27s. A beat. He shrugs, very slightly, and glances at the empty basket.
27-30s. He looks back to camera: "Emailchaser. Send once. Follow-ups are automatic."

AUDIO. Period infomercial room sound, a little boxy. Envelopes spilling, a basket knocking on wood. The black-and-white section has a thin unhappy tone under it; the colour section is quiet and clean. No modern music, no pop track.

${BANS}`,
  },

  {
    id: "emailchaser-c14-twin-study",
    company: "emailchaser",
    title: "Subject A, Subject B",
    format: "Clinical trial / laboratory observation parody",
    angle: "Split testing subject lines.",
    approvedCopy: '"Split Test Your Subject Lines." + "Compare reply rates for every variant."',
    claimNotes: "A/B testing is subject lines only, per the Emailchaser hard rule. No reply-rate number is stated, only that reply rates are compared.",
    aspect_ratio: "9:16",
    prompt: `A parody of a dry scientific observation film, played completely straight. This is not an advertisement.

LOOK. Locked-off camera behind observation glass, so there is a faint real reflection of the darkened observation room over the picture. Harsh flat white laboratory lighting on the far side, clinical and shadowless. Slightly clinical wide lens, fine grain, no camera movement.

PLACE. Two identical small observation rooms side by side, seen through one long window: white walls, a plain table and moulded plastic chair in each, a laptop closed on each table, nothing else. Everything is deliberately identical.

PEOPLE. TWO MEN in their thirties, dressed identically in plain grey t-shirts, one in each room, sitting in the same posture. A RESEARCHER in a white coat and glasses, seen only from behind in the dark foreground, holding a clipboard and speaking quietly and flatly. ${REALISM}

BEATS.
0-6s. Wide through the glass, both rooms visible, both men motionless and identical. The researcher, flat and quiet: "Subject A received the first subject line."
6-12s. The man on the left slowly opens his laptop, reads, and closes it again. Nothing happens on his face. Researcher: "Subject B received the second."
12-18s. The man on the right opens his laptop, reads, and immediately sits forward, alert, and starts typing fast.
18-23s. The researcher writes a single mark on the clipboard. Quietly: "Subject B replied in four minutes."
23-27s. Hold on the wide. Left man still motionless. Right man still typing.
27-30s. Researcher, without emotion: "Emailchaser. Split test your subject lines."

AUDIO. The dead flat acoustics of a sealed room, a faint air-handling hum, a pen on a clipboard, muffled typing through glass. Voices are quiet, close and unperformed. No music.

${BANS}`,
  },

  {
    id: "emailchaser-c15-buffet",
    company: "emailchaser",
    title: "All You Can Send",
    format: "Deadpan roadside buffet scene",
    angle: "Unlimited senders at one fixed cost.",
    approvedCopy: '"Unlimited senders, one fixed cost."',
    claimNotes: "No dollar figure is stated, since pricing is not in the approved bank for creative. 'Unlimited senders, one fixed cost' is verbatim approved copy.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy scene shot like a fly-on-the-wall documentary. This is not an advertisement.

LOOK. Handheld at standing height, slightly too close, following at a walking pace with real drift. Ugly practical light: heat lamps over the food, fluorescent tubes overhead, a warm-orange and green colour cast that nobody would choose. Visible grain, imperfect focus.

PLACE. A tired roadside all-you-can-eat buffet. A long steam table with sneeze guards, chafing dishes, a soft-serve machine, a laminated sign holder that is empty, brown patterned carpet, a stack of warm plates.

PEOPLE. A MAN in his forties in a work polo, holding a plate, moving down the line and simply not stopping. A BUFFET ATTENDANT in her fifties in a visor and apron, arms folded, watching him with total indifference. ${REALISM}

BEATS.
0-6s. The man adds food to his plate. Then more. The camera drifts down the line with him. He does not speak.
6-12s. His plate is absurdly overloaded and he keeps going, calm and methodical. He picks up a second plate without breaking stride.
12-18s. The attendant watches. He glances at her, slightly guilty, and pauses. She does not move.
18-23s. He asks, carefully: "Is this... okay?"
23-27s. The attendant, entirely flat, not moving her arms: "It's one price."
27-30s. He nods once, turns back to the steam table, and keeps loading. The attendant says, to no one: "Emailchaser. Unlimited senders, one fixed cost."

AUDIO. The hum of heat lamps, a serving spoon on a metal tray, a soft-serve machine cycling, distant cutlery and low restaurant chatter. Flat unperformed voices. No music.

${BANS}`,
  },

  {
    id: "emailchaser-c16-commentary",
    company: "emailchaser",
    title: "The Booth",
    format: "Sports commentary booth parody",
    angle: "Booking meetings.",
    approvedCopy: '"Consistently Book More Meetings."',
    claimNotes: "No meeting counts, reply rates or deliverability numbers. The commentary describes the character's morning, not product performance.",
    aspect_ratio: "9:16",
    prompt: `A parody of two sports commentators calling live play, applied to something utterly mundane, played completely straight. This is not an advertisement.

LOOK. Two setups cut together. The commentary booth: a locked-off two-shot, harsh flat broadcast lighting, slightly long lens, plain and cheap. The "action": ordinary handheld office footage, flatter and duller, shot from across the room like someone filming a colleague without asking.

PLACE. A cramped commentary booth: a desk, two chairs, headsets, a window looking out onto nothing in particular, foam on the walls. The action is a beige open-plan office, one man at a desk.

PEOPLE. TWO COMMENTATORS in their fifties, headsets and unfashionable blazers, leaning into desk microphones, using the exact hushed-then-excited cadence of live sport. RUSSELL, a very ordinary man at a desk in the office footage, drinking tea and clicking a mouse, entirely unaware. ${REALISM.replace("Nobody is enjoying themselves.", "The commentators are sincere and fully committed; Russell is oblivious and does nothing remarkable.")}

BEATS.
0-6s. Booth two-shot. Commentator one, hushed and tense: "He's opened the calendar."
6-11s. Cut to the office. Russell clicks a mouse and sips tea. Nothing visibly happens. Commentator two, off: "Tuesday's already gone."
11-17s. Back to the booth. Both men lean in closer to the mics. Commentator one, rising: "That's four this morning. Four."
17-22s. Cut to Russell, who yawns and scratches his neck, still clicking.
22-26s. Booth. Commentator two, quiet awe, shaking his head slowly: "He hasn't made a single phone call."
26-30s. Commentator one straightens up and delivers it flat, straight to the mic: "Emailchaser. Consistently book more meetings."

AUDIO. Booth: close mic voices, headphone spill, the small room tone of a padded booth. Office: flat room tone, a mouse click, a mug on a desk, a distant printer. No crowd noise, no music, no stings.

${BANS}`,
  },

  // ─────────────────────────────── 1Lookup ────────────────────────────────
  {
    id: "1lookup-c4-appraisal",
    company: "1lookup",
    title: "The Appraisal",
    format: "Antiques appraisal show parody",
    angle: "Your purchased list is worthless.",
    approvedCopy: '"Stop Paying for Bad Data."',
    claimNotes: "No accuracy percentage, per 1Lookup's site discipline. The $4,000 is what the character says he paid, not a product or market claim. No data vendor is named.",
    aspect_ratio: "9:16",
    prompt: `A parody of a daytime antiques appraisal show, played completely straight and gently. This is not an advertisement. ${SAY_1LOOKUP}

LOOK. Two-camera daytime television look on a locked-off tripod: even, slightly flat lighting, mid-length lens, a soft busy background of a hall with people milling out of focus. Ordinary, unglamorous, a bit dated.

PLACE. A community hall used for a valuation day. A folding trestle table with a green cloth, a numbered card stand, stacking chairs along the wall, high windows with grey daylight.

PEOPLE. The APPRAISER, a man in his sixties in a tweed jacket and half-moon glasses, kind, careful and completely honest. DARREN, a man in his thirties in a football shirt, hopeful, hands on the table. Between them on the green cloth: a thick stack of printed spreadsheet pages in a plastic wallet. ${REALISM}

BEATS.
0-6s. The appraiser turns the pages carefully, one at a time, with real reverence. Darren watches, hopeful.
6-12s. Appraiser, warm and unhurried: "And you bought this list where?"
12-16s. Darren, proud: "Online. Four thousand contacts."
16-22s. The appraiser sets the pages down gently, takes off his glasses, and takes a small breath before speaking, the way you do before bad news: "Mm. About a third of these numbers are disconnected."
22-26s. Darren's face does not move for a moment. Then, very quietly: "...And the rest?"
26-30s. The appraiser gives him a small, sympathetic shrug and pats the stack once. Then, evenly: "One look up. Stop paying for bad data."

AUDIO. The big flat echo of a community hall, distant chatter and chairs scraping, paper turning, a cough. Voices are warm, quiet and unperformed. No music.

${BANS}`,
  },

  {
    id: "1lookup-c5-security-scanner",
    company: "1lookup",
    title: "Step Aside, Sir",
    format: "Airport security screening parody",
    angle: "Instant validation, anything that fails gets pulled.",
    approvedCopy: '"Validate any phone, email, or IP instantly."',
    claimNotes: "No accuracy percentage. No airline, airport or carrier is named. The screen shows nothing readable so no fake data is rendered.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy scene shot like real observational documentary footage of a security checkpoint. This is not an advertisement. ${SAY_1LOOKUP}

LOOK. Handheld from behind the queue at shoulder height, people crossing in front of the lens, the operator adjusting to see past them. Flat cold overhead fluorescent light, a slightly wide lens, real grain and mild motion blur. Nothing is staged for the camera.

PLACE. An ordinary, tired security screening area. A conveyor belt with grey plastic trays, a scanner arch, a folding table, scuffed floor tape marking a queue, a plastic chair.

PEOPLE. A SCREENING OFFICER in her forties in a plain uniform shirt and blue gloves, utterly unbothered, working at speed. A QUEUE of ordinary people shuffling through. In the trays, instead of luggage: plain paper cards, each with a handwritten phone number, going along the belt one after another.

The card faces are turned away from camera or blurred by movement so no number is legible. ${REALISM}

BEATS.
0-6s. The belt runs. Cards go through the scanner in grey trays, one at a time, monotonously. The officer watches an unseen screen off camera, its glow on her face. The screen itself is never shown.
6-12s. She waves three trays through without looking up, flicking two gloved fingers. Then she stops, holds up a flat palm, and lifts one card out of a tray between two fingers.
12-17s. She holds it up, looks at it for exactly one second, and says, flat: "Disconnected."
17-21s. She drops it into a grey bin at her feet. The bin is already full of cards.
21-26s. Another tray. She pulls a second card out immediately, without breaking rhythm: "Not a real mailbox." It goes in the bin.
26-30s. She waves the queue on and says, to nobody, still not looking up: "One look up. Validate any phone, email, or IP instantly."

AUDIO. Conveyor belt motor, plastic trays knocking together, the flat beep of a scanner, background queue shuffle and murmur. The officer's voice is bored and clipped. No music.

${BANS}`,
  },

  {
    id: "1lookup-c6-quality-control",
    company: "1lookup",
    title: "Line Speed",
    format: "Factory quality-control line, deadpan",
    angle: "Speed of validation.",
    approvedCopy: '"Under 0.3 seconds per lookup."',
    claimNotes: "0.3 seconds is verbatim approved copy from the Google display set. No accuracy percentage. No third-party equipment brands.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy scene shot like a dull industrial process film. This is not an advertisement. ${SAY_1LOOKUP}

LOOK. Locked-off medium shot on a tripod, side-on to a moving line, then one handheld closer angle. Harsh overhead factory lighting, cold and even, with a slight green cast. Real grain, no camera moves except one small reframe.

PLACE. A small, unglamorous production line in a plain industrial unit. A stainless conveyor, a scuffed guard rail, a plastic reject chute leading to a bin, painted floor markings, a wall-mounted first aid box.

PEOPLE. TWO LINE WORKERS in white coats, hairnets and blue gloves, standing at the belt, working fast and silently with the flat efficiency of people who have done this for years. A SUPERVISOR in a different coloured coat stands slightly back with a clipboard.

On the belt, moving steadily: small plain white plastic tokens, unmarked. ${REALISM}

BEATS.
0-7s. The belt runs at a brisk, steady pace. The two workers pick tokens off almost faster than the eye follows, glance at each one and either let it pass or flick it into the reject chute. Nobody speaks. The chute rattles constantly.
7-13s. Closer handheld on the hands: pick, glance, flick, pick, glance, pass. The rhythm is relentless and even.
13-18s. The supervisor, watching the line, says flatly to the operator: "Point three seconds each."
18-23s. Wide again. The reject bin at the end of the chute is overflowing onto the floor. Nobody has stopped to deal with it.
23-27s. One worker, without looking up or slowing down, says: "It's mostly rejects."
27-30s. The supervisor makes one mark on the clipboard: "One look up. Under point three seconds per lookup."

AUDIO. Conveyor motor drone, plastic tokens rattling down a chute and into a bin, gloves on plastic, the hum of factory lighting. Voices are raised slightly over the machinery, flat and unperformed. No music.

${BANS}`,
  },

  {
    id: "1lookup-c7-one-key",
    company: "1lookup",
    title: "One Key",
    format: "Locksmith call-out, deadpan",
    angle: "One API instead of three vendors.",
    approvedCopy: '"One API for phone, email & IP."',
    claimNotes: "No accuracy percentage, no vendor names, no pricing. 'One API for phone, email and IP' is verbatim approved copy, spoken in plain language.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy scene shot like ordinary handheld footage of a tradesperson at work. This is not an advertisement. ${SAY_1LOOKUP}

LOOK. Handheld, close, at the height of someone standing in a narrow corridor, the operator shifting to see past a shoulder. Practical light only: a bare corridor bulb and a work torch. Slightly wide lens, real grain, imperfect focus.

PLACE. A cramped, windowless back corridor in an old office building. Scuffed magnolia walls, a worn carpet tile floor, an overloaded extension lead, and three plain identical grey doors in a row, each with a different, cheap-looking lock.

PEOPLE. A LOCKSMITH in her forties in a work fleece with a heavy key ring on her belt, calm and businesslike. A BUILDING MANAGER in his fifties in a creased shirt, holding three separate bunches of keys, one in each hand and one under his arm, clearly struggling. ${REALISM}

BEATS.
0-6s. The manager fumbles the first bunch, tries two keys in the first door, drops the second bunch on the carpet, and swears under his breath.
6-12s. He gets the first door open, then starts hunting through a different bunch for the second door. The locksmith watches, not helping.
12-17s. Manager, exasperated, to her: "Three doors. Three sets."
17-22s. The locksmith takes a single plain key off her belt, steps past him, and opens the second door with it, then the third, without hurrying.
22-26s. The manager stares at the three open doors, then at the one key in her hand. He says nothing.
26-30s. The locksmith holds the key up between two fingers, not smugly, just factually: "One look up. One API for phone, email and IP."

AUDIO. Corridor room tone, keys jangling heavily, a bunch of keys hitting carpet, three different locks turning, a door hinge. Flat unperformed voices, slightly echoey in the narrow space. No music.

${BANS}`,
  },
];
