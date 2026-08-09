// Seedance 2.5 ad prompts — 2026-08-08 batch.
// Three 30-second single-prompt video ads, one per company.
//
// Anti-slop scaffolding used in every prompt, in this order:
//   1. Declare the genre/format explicitly, and say it is NOT an advertisement.
//   2. Camera and look: real optics, real imperfections, practical light only.
//   3. A specific mundane location, named props, wrong-colour walls, clutter.
//   4. Characters with wardrobe and demeanour, played deadpan.
//   5. Beat-by-beat timecodes with verbatim dialogue (~40-55 spoken words total,
//      which is ~18-24s of unhurried speech inside a 30s runtime).
//   6. Diegetic audio design, no music bed.
//   7. A hard ban list that kills the AI-video house style.
//
// No on-screen text anywhere: video models garble burned-in type, and a garbled
// headline is worse than no headline. Every brand line is SPOKEN instead.
// Captions and the end card get composited in post.

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind anywhere in the video: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no user-interface overlays, no end card. Any screen or monitor visible in frame is switched off, blank, or blown out to white, never showing readable text. No brand marks or product logos on anything. Nobody looks into the lens except where the beats say so. No slow motion, no speed ramps, no drone shots, no crane shots, no gliding dolly moves, no orbiting camera, no rack-focus flourishes, no lens flares, no light leaks, no glowing particles, no holograms, no floating screens or floating icons, no teal-and-orange colour grade, no music score, no whooshes or impact stings, no montage of pretty cutaways, no models smiling at camera, no glass-walled modern office, no stock-footage look, no advertising gloss. Keep it plain, badly lit and ordinary, exactly as a real camera operator standing in that real room would capture it.`;

const REALISM = `Faces are ordinary and unglamorous, with real skin texture, tired eyes and imperfect teeth. Wardrobe is cheap and slightly ill-fitting. Performances are deadpan, underplayed and unperformed, with natural pauses, breaths and small hesitations, the way people actually talk. Nobody is enjoying themselves.`;

export const ADS = [
  {
    id: "voicedrop-c39-cold-callers-anonymous",
    company: "voicedrop",
    title: "Cold Callers Anonymous",
    format: "Support-group scene, fly-on-the-wall documentary comedy",
    angle: "Pain: manual cold calling is a grind. Turn: she stopped calling and they call her.",
    approvedCopy: '"Stop chasing leads. Let them call you." (VoiceDrop Hero.tsx headline, verbatim)',
    claimNotes:
      "No callback-rate number, no pricing, no SOC-2 claim. Dave's 412 calls are a character's line about his own week, not a product claim.",
    aspect_ratio: "9:16",
    prompt: `A deadpan comedy sketch shot like a real fly-on-the-wall documentary. This is not an advertisement and must not look like one.

LOOK. Shot handheld on an ageing consumer camcorder held at seated height, slightly too wide a lens. The frame drifts and makes one small correcting reframe. Lit only by the overhead fluorescent tubes in the ceiling, one of them faintly flickering, so the colour is greenish and unflattering and the shadows are full of visible sensor noise. Focus is a little soft and never perfect. Flat, ugly and real.

PLACE. A church basement meeting room. Beige cinderblock walls, worn brown linoleum, a circle of grey metal folding chairs, a folding table at the back holding a steel coffee urn and a leaning stack of styrofoam cups, a corkboard with curling notices pinned to it.

PEOPLE. DAVE, a tired man in his forties, rumpled dress shirt with the collar open and a tie pulled loose, thinning hair, holding a styrofoam cup he never drinks from. The FACILITATOR, a calm woman in her fifties in a beige cardigan with a clipboard resting on her knee. A quiet WOMAN in her thirties in a denim jacket sitting across the circle. Two other members seen only as out-of-focus backs of heads and shoulders in the foreground. ${REALISM}

BEATS.
0-3s. Medium shot of Dave standing up inside the circle, the shoulders of other members soft in the foreground. He clears his throat.
3-8s. Dave, flat and defeated: "Hi. I'm Dave. Yesterday I made four hundred and twelve cold calls."
8-10s. The whole group answers together, tired and toneless: "Hi, Dave."
10-15s. Dave: "Two people picked up. One of them was a fax machine."
15-18s. The facilitator, gently, without looking up from her clipboard: "And how did that make you feel?"
18-21s. Dave, after a beat: "Like a fax machine." He sits back down.
21-24s. A mobile phone rings somewhere inside the circle. Every head turns. The quiet woman answers it calmly: "Hello?"
24-27s. She lowers the phone and looks straight at Dave: "I stopped calling them. Now they call me."
27-30s. Dave stares back at her, saying nothing. Hold on his face while the facilitator says quietly to the room: "VoiceDrop. Stop chasing leads. Let them call you."

AUDIO. Basement room tone, the electrical hum of fluorescent lights, a chair leg scraping linoleum, the coffee urn gurgling at the back. Ordinary flat American voices, conversational and unperformed. A cheap default mobile ringtone. Absolutely no music.

${BANS}`,
  },

  {
    id: "emailchaser-c11-missing",
    company: "emailchaser",
    title: "Missing",
    format: "Late-night true-crime documentary parody, played straight",
    angle: "Pain: sent cold email never reaches the inbox. Reveal: it was filed under Promotions.",
    approvedCopy: '"Cold email that lands in primary." (approved copy bank, verbatim)',
    claimNotes:
      "No deliverability percentage anywhere. The 4,000 sends are the character's own volume, not a product claim. 'Primary' and 'Promotions tab' are the same inbox vocabulary the approved copy already uses.",
    aspect_ratio: "9:16",
    prompt: `A parody of a late-night true-crime documentary, played completely straight and never winking. This is not an advertisement and must not look like one.

LOOK. Sit-down interview footage on a cinema camera with a long lens, shallow focus, a single soft key from a window to camera-left and deep unlit shadow filling the rest of the room. One insert is a deliberately degraded re-enactment: handheld, cooler in colour, slightly out of focus, much heavier grain, as if shot on different equipment years earlier. Restrained, no gloss, no beauty lighting.

PLACE. A cramped suburban home office at night. Dark wood-panelled wall, a shelf of ring binders and a dead plant, an inkjet printer with paper stacked on top of it, vertical blinds half shut over a black window. Later, a fluorescent-lit records room with a corkboard covered in pinned paper and red string.

PEOPLE. MARCUS, a man in his late thirties in a plain grey polo shirt, unshaven, sitting in a worn office chair angled slightly off-camera with his hands clasped between his knees. He is genuinely shaken and keeps swallowing. DETECTIVE REYES, a woman in her fifties in a plain button-down with the sleeves rolled, standing beside the corkboard, completely matter-of-fact and a little bored. ${REALISM}

BEATS.
0-4s. A very slow push in on Marcus in the interview chair. He looks off-camera at the interviewer and swallows.
4-9s. Marcus, quietly: "We sent four thousand of them. On a Tuesday."
9-12s. He looks down at his hands. "None of them came back."
12-15s. Cut to the grainy re-enactment: a hand clicking a mouse in a dark room, the glow of a blank switched-off monitor falling across a face. The screen shows nothing readable.
15-19s. Cut to Detective Reyes at the corkboard, flat and tired: "We found them. All four thousand."
19-23s. She taps the corkboard twice with two fingers: "Promotions tab. Page three."
23-27s. Back to Marcus in the interview chair, eyes wet, barely audible: "They were right there the whole time."
27-30s. Hold on Marcus as he looks away. A calm male documentary narrator says evenly, over the held shot: "Emailchaser. Cold email that lands in primary."

AUDIO. Very quiet room tone, a ticking wall clock, the hum of a monitor, a dog barking somewhere outside. One sparse sustained low cello note under the interview only, the restrained kind a true-crime documentary uses, never resolving and never triumphant. Natural unperformed American speech with real pauses and audible breath. No pop music, no whoosh, no sting.

${BANS}`,
  },

  {
    id: "1lookup-c3-ghost-leads",
    company: "1lookup",
    title: "Ghost Leads",
    format: "Cheap cable paranormal-investigation show parody",
    angle: "Pain: half the list is dead numbers. Fix: validate them.",
    approvedCopy: '"Stop paying for bad data." (approved short headline, verbatim)',
    claimNotes:
      "No accuracy percentage (1Lookup site discipline). 'Validate' is the product's own verb. The disconnected-line recording is a generic telephone intercept, not a named carrier.",
    aspect_ratio: "9:16",
    prompt: `A parody of a cheap late-night cable paranormal-investigation show, played dead straight by everyone in it. This is not an advertisement and must not look like one.

LOOK. Handheld night-vision camcorder footage: monochrome sickly green, blown-out white eyes, heavy video noise, the frame bobbing with the operator's steps and hunting for focus. Then at the end a hard cut to ordinary flat office daylight on a locked-off tripod, clean and boring by comparison, which is the joke.

PLACE. An open-plan office after hours with the lights off. Rows of empty desks, chairs pushed in at wrong angles, cables on the carpet, a printer's standby LED glowing, a whiteboard, venetian blinds letting a little orange street light in.

PEOPLE. TWO INVESTIGATORS in their thirties, one man and one woman, in black fleece jackets, crouched low between the desks, whispering with total sincerity. He holds a small handheld electronic meter, she holds a black speakerphone puck. Then, in the daylight shot, a bored COLLEAGUE in her twenties sitting at a desk with a mug, entirely unimpressed. ${REALISM}

BEATS.
0-4s. Night vision. The two investigators crouch behind a monitor, the frame hunting for focus on them. She whispers: "I'm getting something. Row four hundred."
4-8s. He slowly sets the speakerphone puck down on the carpet between them. It dials. Both of them stare at it without blinking.
8-13s. Three rising telephone intercept tones, then a flat recorded female voice: "The number you have dialed is no longer in service."
13-16s. The two investigators turn and look at each other. He whispers, awed: "It's a dead number."
16-20s. She whispers back: "That's the ninth one tonight."
20-23s. He turns and looks directly into the night-vision lens, deadly serious: "This whole list is haunted."
23-26s. Hard cut. The overhead office lights bang on. Flat ordinary daylight, both investigators frozen mid-crouch on the carpet, squinting up.
26-30s. The colleague at her desk does not look up from her mug: "Or you could just validate them." A beat. Then, still not looking up: "1Lookup. Stop paying for bad data."

AUDIO. Night: the operator's own breathing close on the mic, camcorder hiss, a distant air-conditioning hum, the plastic tap of the speakerphone on carpet, and the harsh three-tone telephone intercept. Day: the heavy clunk of fluorescent lights striking on, then plain room tone. Whispered, sincere, unperformed voices. No music, no stings, no whooshes.

${BANS}`,
  },
];
