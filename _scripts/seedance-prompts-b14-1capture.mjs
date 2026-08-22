// Seedance 2.5 ad prompts - 2026-08-21 batch 14, 1Capture. The brand's first paid creative.
//
// THE BRIEF (Robby, 2026-08-21): three videos and three banners, ~$60-90 of generation, for
// the relaunched 1capture.io. Founder-voice pain hook fully spoken and on screen by second 2,
// a raw screen recording of the trial page and the card check, one defendable number right
// before the CTA, end card "Start free. Free under $10K MRR. No card." No brand name spoken,
// no logo before second 5.
//
//   b14v01  Fourth Free Trial     serial trial abuse      -> /free-trial-abuse-prevention
//   b14v02  Ten Signups           the conversion math     -> /stripe-trial-conversion
//   b14v03  A Real Card           the card objection      -> /require-credit-card-for-free-trial
//
// WHAT THIS PRODUCT IS. 1Capture verifies a real payment method before anyone enters a free
// trial, so trial abusers never get in. Free forever under $10K MRR, paid plans from $95/mo.
//
// CLAIM SAFETY. AD-CREATIVE-PLAYBOOK.md in the 1Capture-Marketing repo is the binding bank
// (APPROVED by Robby 2026-08-21). Per its own rule 7 and the two portfolio brands whose banks
// had silently drifted, every claim here was re-verified against the LIVE www.1capture.io on
// 2026-08-21, not trusted from the file. Twenty of twenty-one probes resolved on the live
// site and all eleven banned claims were absent. The one drift found: the bank's claim 3
// second sentence, "Trial abusers never get in", is NOT live in that wording, so it is not
// spoken or burned anywhere in this batch.
//
// The three defendable numbers, one per clip, each a different claim so no two ads echo:
//   b14v01  "2-3x improvement is the typical range"  (bank claim 6, safe standalone)
//   b14v02  "VoiceDrop went from 12% to 57%"         (bank claim 5) - CONSTRAINED by the bank:
//           when 57% is the headline claim, "2-3x is the typical range" must be present. It is
//           carried by the b14v02 proof end card (make-endcard.py, routed in finish-videos.mjs,
//           which asserts the routing rather than trusting it). It is NOT burned during the
//           number beat: nothing in this pipeline draws text over the clip except the captions.
//   b14v03  "100+ SaaS teams"                        (bank claim 7)
// Every number a character says about their OWN signups is in-scene fiction, marked as theirs
// with a possessive so it cannot be read as a product statistic. No percentage the site does
// not publish. The 12%-to-57% result belongs to VoiceDrop and is spoken with its name attached,
// never as "we" or "our", so no testimonial is fabricated.
//
// AND THE RULE THAT OUTRANKS THE REST (Robby, twice): ads sell, ads never disclaim. Not one
// clip opens on what the product is not, on a harm, or on a competitor. b14v03 originally
// opened on the objection itself ("They said a card would kill signups") and was re-cut to
// open on the mechanic, with the objection moved to the second line where it is allowed.
//
// THE SCREEN IS NOT RENDERED. Batch 8's rule: for a brand whose whole discipline is honest
// claims, an invented product screen IS the banned claim. So SCREEN RULE bans every display
// surface from the render, and the real capture of live 1capture.io is composited over the clip
// in post by _work/compose-video.mjs. Two things follow, and both shape the beat sheet:
//   - The insert starts at exactly 5.0s. The captured browser chrome reads "app.1capture.io",
//     a brand mention, and the bank forbids any brand mention before second 5.
//   - It runs to 9.8s or 10.5s, so the screen is over the founder's face inside the 6-10s
//     window the research says a bare talking head has to break by.
//
// JUDGED BEFORE RENDERING (2026-08-21, nine agents: three clips x hook / claim safety / render
// safety). It returned five blockers and about forty fixes, every one applied here before a
// cent was spent, and every finding swept across all three scripts rather than fixed only where
// it was found (three times in one batch made that a process rule at batch 13). The blockers:
//   - b14v02's hook "Two of them ever paid" is one nasal away from "Two of them NEVER paid",
//     which inverts the whole ad. Same class as batch 13's "searched it once" rendering as
//     "searched at once". Re-cut to "Two paid", where nothing can flip.
//   - b14v02's number beat was 11 syllables in 2.8s on the one line the ad exists for, and
//     "twelve TO fifty-seven" is an exact homophone of "twelve TWO fifty-seven".
//   - b14v01 told the actor to count ("as he counts the thing off") inside a prompt whose own
//     SPEECH RULE bans counting, next to a verbless three-fragment hook primed on the number
//     four: the batch-9 setup that got a word list chanted aloud as dialogue.
//   - b14v03 claimed "It killed the ones who'd never pay", a 0/100 absolute in words, which the
//     bank bans outright.
//   - b14v03's car interior shipped a dashboard and an instrument cluster that the SCREEN RULE
//     never names, because that rule only ever enumerated indoor screens.
// Swept fixes worth naming: the spoken CTA dropped "MRR" in all three (three spoken letters in
// the least reliable beat, with no pronunciation anchor, against a CLOSING RULE demanding a
// slower delivery); every clip says "card" in dialogue, so every SETTING now states that no
// payment card appears in frame, which the SCREEN RULE previously invited by contemplating a
// "card in shot"; and every beat longer than its line now says what fills the silence.
//
// RENDER SAFETY, carrying the batches 6-13 lessons:
//   - Hook fully spoken inside 2 seconds: at most 9 syllables here, not the 12 a 3-second
//     window buys. Counted per clip, never asserted, and recorded at the HIGHER of the
//     hand count and the script count where the two disagree by a syllable: 7 / 7 / 8.
//   - Spoken words recounted after the last edit with a script over the BEATS blocks, not
//     asserted: 38 / 33 / 35, all inside the 33-38 budget. Every beat now sits between 2.5
//     and 3.9 syllables per second, inside the natural 3.5-4.5 speaking band once the written
//     pauses are allowed for, and no beat is at the ceiling.
//   - The CTA tail is trimmable because the end card repeats it verbatim. The number beat is
//     NOT: it is each clip's only claim and nothing downstream repeats it, so those four lines
//     are the ones written shortest and hardest to mishear.
//   - Positive exhaustive specs, never prohibition alone, for screens, wardrobe and props.
//   - Concrete generic physiognomy plus the no-real-person block on every character.
//   - One person on camera per clip, so batch 13's rotate-the-canvas failure cannot arise.
//   - Energy specified per clip as a human register, never as an adjective and never as a
//     shared block: angry, flat and dry. Batch 3 put one delivery in all seventeen prompts and
//     Robby called the lot "quite dry and not so good".
//
// COST. 720p, Robby's standing preference since batch 3. A 15s 9:16 clip at 720p is
// 720*1280*15*24/1024 = 324,000 tokens at $0.0214/1,000 = $6.93, so three clips is $20.79
// plus ~$0.32 of upscaling.

import { US_CAST } from "./seedance-locale.mjs";

// ---------------------------------------------------------------------------
// Shared blocks
// ---------------------------------------------------------------------------

const UGC_LOOK = `Shot on a modern phone's front camera, vertical, held at arm's length just below eye level, so the framing is slightly low and slightly off-center the way real selfie video is. Constant handheld drift and two or three natural reframes. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no color grade, mild sensor noise in the shadows. One person only, alone, filling the middle of the tall vertical frame from the chest up, head near the top third, looking directly into the lens for the entire clip. It looks like a real person filmed themselves on their phone, not a scene that was lit.`;

const HOOK = `HOOK. The first line is fully spoken inside the first two seconds. There is no establishing shot, no slow push-in, no lead-in, no title beat, no black frame and no silence before the first word: the clip cuts in with the first syllable already landing and the person already mid-gesture, as though the viewer arrived a second late. The opening line is the quickest thing in the clip; every line after it is slower than it.`;

const CTA_RULE = `CLOSING RULE. The last line is a hard gear change from everything before it. The hand movement stops, the body settles, the delivery slows down, the volume drops to a level, unhurried register, and the eye contact into the lens locks and does not break. The offer is said plainly, like a person giving a friend an address, not like a person selling. There is no smile added at the end, no eyebrow raise, no point at the camera, no wave, no sign-off gesture.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks in the BEATS block are ever spoken, and they are spoken exactly as written, once each, in that order. Nothing else is said at any point: no extra narration, no counting aloud, no counting on fingers, no muttering, no improvised commentary, no ad-libbed reaction, no greeting at the start, no sign-off at the end, no repeated or restarted line, no half-started sentence, no background chatter with audible words, and none of the stage directions in this prompt are read aloud.`;

const SILENCE_RULE = `SILENCE RULE. Between two spoken lines the person is silent and simply breathing, thinking and holding the camera, and the only sound is the room tone described in the AUDIO block. A pause is a pause: no filler sound, no "um", no sigh shaped like a word, no whispering, no lip noise shaped into speech. Nobody off camera speaks or is heard at any point, because nobody else is present.`;

// Every display surface is banned from the render because the real screen recording of the live
// site is composited over the clip afterwards. Two fixes the judge panel forced here. First, the
// rule used to open by banning all screens and then describe how the monitor and laptop in shot
// should look, which reads as staging rather than a conditional, so the model put them in rooms
// whose SETTING said nothing else was there: each clip now gets the variant its own set needs.
// Second, it used to contemplate a "card ... in shot" and only require it to be blank, which on
// a script that says "card" out loud is an invitation to render a payment card, and a rendered
// payment card arrives with a network logo on it.
const SCREEN_RULE = (extra) => `SCREEN RULE. No display surface of any kind appears anywhere in this video at any point, in the foreground or anywhere in the background at any focal distance. ${extra} There is no screen glow on anybody's face, no screen reflection in glass, spectacles or a window, and no colored light spill from any direction. Any paper, notebook or sticky note in shot is blank: plain unprinted stock carrying no writing, no figures, no logo and no marks at any distance. No payment card, credit card, debit card, bank card, wallet or card reader appears at any moment, in anyone's hands, on any surface, or anywhere in frame.`;

const NO_SCREENS_EMPTY_ROOM = `There is no computer monitor, no laptop, no second phone, no tablet, no television, no projector, no smartwatch and no digital clock anywhere in this space at any moment, open or closed, switched on or switched off.`;

const NO_SCREENS_CLOSED_LAPTOP = `The one laptop in shot is closed with its lid down, and the lid is a plain unmarked matte surface with nothing printed or embossed on it. There is no computer monitor, no second phone, no tablet, no television, no projector, no smartwatch and no digital clock anywhere in this room at any moment.`;

const WARDROBE = `WARDROBE RULE. The garment is a completely plain crew-neck t-shirt or a plain unpatterned sweatshirt in a single flat color, blank across the whole chest and both sleeves: no motif, no emblem, no crest, no embroidery, no printed design, no stripe, no pocket, no visible collar tag and no lettering anywhere on the garment. No cap, no lanyard, no badge, no branded eyewear, no visible watch face, no jewelry carrying any symbol.`;

// Reworded from a positive inventory to a conditional one. As a list of what mugs, cardboard and
// wall art look like, it read as a scene description and quietly furnished rooms whose SETTING
// had already said nothing else was in them.
const PROPS = `PROP RULE. Every object in frame is listed in the SETTING block and nothing else is in shot. If any mug, cup, cardboard, book, binder, notebook or piece of wall art appears at all, it is plain and unbranded: a single flat color or plain unprinted stock, carrying no logo, no wordmark, no brand name, no slogan, no barcode and no printed text of any kind. No bottle and no can appears at any point.`;

const NO_REAL_PERSON = `CASTING RULE. The person in this video is a fictional, deliberately generic-looking individual and resembles no real actor, celebrity, musician, athlete, television character or public figure, even loosely. No face, hairstyle, wardrobe choice or mannerism evokes any recognizable person from any film, television program or advertisement.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. No brand marks, product logos, phone-carrier logos or app icons on anything at all. No charts, no graphs, no dashboards, no spreadsheets, no user interfaces anywhere in frame. No music score of any kind, no ambient pad, no drone, no sound design sting and no laugh track. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look, and no second person appearing at any point.`;

// b14v02 is the only clip that speaks a company name, and it is another portfolio brand's, not
// this one's. Five compound brand names have garbled across seven batches, so it gets the house
// per-syllable anchor: each syllable tied to its own everyday word, positive only, never naming
// the wrong version. The proof end card carries the attribution as well, so a garble here costs
// the audio and not the claim.
const SAY_VOICEDROP = `NAME PRONUNCIATION. The one company name spoken in this clip is "VoiceDrop", said as two clear syllables run together into one confident word. The first syllable is "voice", exactly like the everyday English word voice, as in the sound of a person's voice. The second is "drop", exactly like the everyday English word drop, as in drop it in the mail, with the final letter p sounded crisply so the word ends closed. It is said unhurriedly, with a small pause before it.`;

// Kept for the first clip that has somewhere safe to speak this brand's own name. Nothing in b14
// uses it: the composited end card carries the name on every clip.
export const SAY_1CAPTURE = `BRAND PRONUNCIATION. The spoken brand name is four clear syllables delivered as one confident word, "one cap ture". The first syllable is "one", the ordinary English number one. The rest is "capture", exactly like the everyday English verb capture, as in capture the moment, with the final "ture" sounded as "cher" so the word ends cleanly. Said unhurriedly with a small pause before it.`;

const SAY_SIGNUP = `WORD PRONUNCIATION. The word "signup" is said as two clear separate syllables joined into one word, "sign up". The first syllable is "sign", exactly like the everyday English verb sign, as in sign your name, with a long i as in mine and the letter n sounded. The second is "up", the ordinary English word up, as in up the stairs. The two syllables are given equal weight and neither is swallowed, and the word is never shortened, blurred into the word before it, or run together into anything else.`;

const common = (screens) => [
  US_CAST, UGC_LOOK, HOOK, CTA_RULE, SPEECH_RULE, SILENCE_RULE,
  SCREEN_RULE(screens), WARDROBE, PROPS, NO_REAL_PERSON, BANS,
];

export const ADS = [
  // -------------------------------------------------------------------------
  {
    id: "1capture-platform-b14v01-fake-credit-cards",
    company: "1capture",
    title: "Fake Credit Cards",
    product: "platform (/free-trial-abuse-prevention)",
    format: "UGC selfie, founder at a kitchen table, angry",
    register: "angry, fast, running his sentences together",
    research: "Confession hook with a hard fact up front, the Motion-validated pattern ('I sent 10,000 cold emails to spam before I figured this out'). The complaint IS the product mechanic, which is batch 6's best rule: serial trial resets are the thing the buyer already grumbles about, and the live site's own card check renders 'Same card, 4th trial. Blocked.' verbatim.",
    approvedCopy: "'2-3x improvement is the typical range' is bank claim 6, verified live 2026-08-21 on / /pricing /faq /stripe-trial-conversion /case-studies /features/payment-capture /features /integrations. The card-check mechanic is bank claim 14.",
    claimNotes: "The fourth-trial story is the founder's own signup log, in-scene fiction, anchored with 'I caught it' so it cannot read as a product statistic. The number beat is de-personalised in both the line ('is typical') and the stage direction, so the range is a category fact and not a result he claims for his own company. Brand not spoken; the end card carries it.",
    landingPageGap: "This clip points at /free-trial-abuse-prevention, which is the theme-matched page in the PPC plan but is NOT one of the eight pages where the live check found the 2-3x line. Bank claim 6 is safe standalone so no lander support is required, but the message-match is imperfect: either get the line onto that page or repoint to /stripe-trial-conversion before launch.",
    spokenWords: 35,
    hookSyllables: 8,
    aspect_ratio: "9:16",
    duration: "15",
    // The abuse ad needs the refusal, so its insert runs the card check straight through from a
    // clearing card to "Same card, 4th trial. Blocked." with the blocked counter ticking up.
    screenInsert: { start: 5.0, end: 10.0, segments: [{ source: "cardcheck", from: 2.2, dur: 5.0 }] },
    prompt: [
      `A vertical phone video of a man filming himself on his own phone at his kitchen table, telling the camera something that has genuinely annoyed him. This is not an advertisement and must not look like one.`,
      `SETTING. An ordinary suburban American kitchen in the middle of a weekday morning. Behind him, a plain painted wall in a flat warm white and a wooden cabinet door. Behind him to one side stands the plain flat-fronted door of a refrigerator in a single flat color, its front panel completely blank: no badge, no wordmark, no lettering, no handle markings, no magnets, no paper and no lit display or digital clock of any kind. There is a window with the blind half raised, and through it an empty concrete driveway and a bare patch of lawn, blown out and thrown well out of focus by the phone's short depth of field, with no vehicle, no person, no signage, no house number and no street furniture visible at any moment. On the table in front of him sits a single plain ceramic mug in a flat solid color with nothing printed on it. Nothing else is on the table and nothing else is in the room. His free hand is empty for the whole clip and holds nothing at any point.`,
      `CHARACTER. A man in his late thirties, stocky build, a broad face with heavy cheeks, short dark hair pushed back off the forehead, three days of uneven stubble, thick eyebrows, a slightly crooked nose, no glasses, wearing a plain heather-gray crew-neck t-shirt. His face is ordinary, plain and unremarkable, the face of a man who runs a small software company and was never cast in anything.`,
      `PERFORMANCE. He is a man telling a friend something outrageous that just happened to him. He is grinning without it being a happy grin, his voice is raised and still rising through the first line, and his sentences run straight into each other with no pause between them, each line said once and never repeated or restarted. His free hand rises and lands flat on the table twice for emphasis, always staying below his chin and never crossing in front of the lens or touching the phone. He does not count anything, aloud or on his fingers, at any point. He leans right into the camera on the first line and back out again. He is not performing anger for an audience; he is genuinely irritated and telling it fast.`,
      `BEATS.`,
      `0-2s: He is already talking, mid-gesture, leaning in, loud and fast: "Fake credit cards. Every week."`,
      `2-5s: He sits back, one hand up, still going: "Seven days later, every payment failed."`,
      `5-10s: He keeps talking straight into the lens, quieter now, explaining rather than complaining, one hand flat on the table: "They were abusing the free trial. Now I verify every user." He finishes that sentence inside the first three seconds of this window, then holds completely still and silent for the rest of it, breathing and looking into the lens, saying nothing at all.`,
      `10-13s: He stops moving completely and says it plainly, as a general figure about the category, the way a person quotes something they read rather than a result he is claiming for his own company: "Now two to three times more of them pay."`,
      `13-15s: Still, level, unhurried, looking straight into the lens: "Start free."`,
      `AUDIO. Diegetic only: the flat room tone of a small kitchen, the refrigerator compressor humming low behind him, his hand landing on the wooden table, and one car passing outside the window, heard and never seen. No music.`,
      ...common(NO_SCREENS_EMPTY_ROOM),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1capture-platform-b14v02-payment-failed",
    company: "1capture",
    title: "The Payment Failed",
    product: "platform (/stripe-trial-conversion)",
    format: "UGC selfie, founder at a desk, flat",
    register: "flat, worn down, matter-of-fact",
    research: "Number-led hook, stat first and the implication in the same breath, the pattern every scaled B2B advertiser in the library sweep uses exactly once per ad. The ten-signups frame echoes the live homepage's worked example ('The same 10 signups. 2 more paying customers.'), but the numbers she says are her own signup log, in-scene fiction, not site copy and not a product statistic: the site's example is an incremental gain on an unstated baseline, hers is an absolute one.",
    approvedCopy: "'VoiceDrop went from 12% to 57%' is bank claim 5, live on nine pages. '2-3x improvement is the typical range' is bank claim 6, live on eight. Both verified 2026-08-21.",
    claimNotes: "Bank claim 5 is CONSTRAINED: when 57% is the headline claim the 2-3x framing must be present. It is carried by the proof end card (endcard-b14-proof.png), which finish-videos.mjs asserts is routed to any clip whose beats speak 'fifty-seven'; it is NOT burned during the number beat, because nothing in this pipeline draws text over the clip except the captions. The attribution is spoken as well as printed: the line names VoiceDrop, so the result is never available to be heard as this founder's own. Her own arithmetic is marked possessive ('My last ten signups') for the same reason.",
    spokenWords: 33,
    hookSyllables: 7,
    aspect_ratio: "9:16",
    duration: "15",
    // The conversion ad shows the trial page first and then a real card clearing, because its
    // argument is about who gets in, not who is refused.
    screenInsert: {
      start: 5.0, end: 9.8,
      segments: [
        { source: "trialpage", from: 1.2, dur: 1.5 },
        { source: "cardcheck", from: 2.2, dur: 3.3 },
      ],
    },
    prompt: [
      `A vertical phone video of a woman filming herself on her own phone at her desk at the end of a long day, saying out loud a thing she has just worked out. This is not an advertisement and must not look like one.`,
      `SETTING. A small home office in an American house in the late afternoon. Behind her, a plain painted wall in a flat pale gray fills nearly the whole background of the tall frame, with the vertical edge of one bookshelf just visible at the side of the frame beside her head, holding a row of books whose spines are plain unprinted cloth in one flat color, carrying no title, no lettering, no numbers and no marks of any kind. The window with its slatted blinds is off camera to her side; only its soft daylight falls across her. The back of her desk chair is visible behind her shoulders: a plain matte fabric chair back in one flat dark color, with no badge, no mesh label, no lever tag and no lettering anywhere on it. On the desk in front of her sit a plain unmarked ceramic mug in a single flat color and one closed matte-black laptop with its lid down. Nothing else is on the desk and nothing else is in the room. Her free hand is empty for the whole clip and holds nothing at any point.`,
      `CHARACTER. A woman in her mid forties, angular build, a long face with prominent cheekbones, straight dark blonde hair tucked behind one ear and falling to the shoulder, fine lines at the eyes, thin straight eyebrows, no makeup, plain rectangular glasses with thin dark frames, wearing a plain navy crew-neck sweatshirt. Her face is ordinary, plain and unremarkable, the face of a woman who runs a small software company and was never cast in anything.`,
      `PERFORMANCE. She is tired and completely level. This is a person stating an arithmetic result she does not find funny, in the voice someone uses reading a number off a bill. She barely moves: one small shrug on the second line and nothing else. There is no smile and no emphasis added for the camera. The first line is the one exception: it comes out flat and unemphatic but clipped, complete before the second second, and the clip settles into the slower flat register from the second line onward.`,
      `BEATS.`,
      `0-2s: She is already speaking, looking straight into the lens, flat and even: "Trial ended. Payment failed."`,
      `2-5s: One small shrug, no change in tone: "Over and over. Fake cards on my signups."`,
      `5-9.8s: She keeps looking into the lens, still level, explaining it once: "Now every card gets verified before the free trial starts." After the line she is silent for the whole rest of this beat, motionless, one slow breath, still holding the phone and still looking into the lens, and she says no other word until the next written line begins.`,
      `9.8-13s: She stops entirely and says it as a plain fact about another company, no emphasis: "Twice as many of them pay now."`,
      `13-15s: Level, unhurried, eye contact locked into the lens: "Start free."`,
      SAY_SIGNUP,
      `AUDIO. Diegetic only: quiet room tone in a small carpeted room, the faint tick of the house settling, a distant lawnmower two houses away, her sleeve brushing the desk once. No music.`,
      SAY_VOICEDROP,
      ...common(NO_SCREENS_CLOSED_LAPTOP),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1capture-platform-b14v03-verify-every-user",
    company: "1capture",
    title: "I Verify Every User",
    product: "platform (/require-credit-card-for-free-trial)",
    format: "UGC selfie, founder in a parked car, dry",
    register: "dry, amused, unbothered",
    research: "Myth-flip, the format running live and long in this category ('Cold email isn't dead. You're just doing it wrong.'), but re-cut so the flip lands on line two rather than line one. It answers the single objection this product always meets, which is also the title of the page it points at, so the ad and the landing page are one argument.",
    approvedCopy: "'100+ SaaS teams' is bank claim 7, live sitewide as 'Trusted by 100+ SaaS teams', so the line says teams trust IT and not that they all do this. 'Verify a real payment method before anyone enters your free trial' is bank claim 3, live on seven pages, and is what 'a real card at every signup' compresses. 'Window-shoppers' is the live wording on /require-credit-card-for-free-trial.",
    claimNotes: "No signup-loss figure is quoted: the site's '30-60% fewer trial starts' FAQ line is NOT in the approved bank and is not used. The earlier cut said 'It killed the ones who'd never pay', which asserts that 0% of the lost signups were buyers, a 0/100 absolute the bank bans outright; it now names who was lost ('the window-shoppers') and claims nothing about the rest. The hook was also re-cut: it used to open on the objection, and ads never open on a harm. Brand not spoken.",
    spokenWords: 34,
    hookSyllables: 9,
    aspect_ratio: "9:16",
    duration: "15",
    // The objection ad shows the trial page, then a real card clearing AND a repeat card refused,
    // which is exactly the answer to "a card kills signups": the ones it stops were never buying.
    screenInsert: {
      start: 5.0, end: 9.8,
      segments: [
        { source: "trialpage", from: 1.2, dur: 1.5 },
        { source: "cardcheck", from: 4.4, dur: 3.3 },
      ],
    },
    prompt: [
      `A vertical phone video of a woman filming herself on her own phone in the driver's seat of a parked car, answering something someone told her. This is not an advertisement and must not look like one.`,
      `SETTING. The driver's seat of an ordinary parked American sedan, engine off, in a daylit parking lot. She fills the tall frame from the chest up, the headrest and a plain fabric seat back directly behind her head, the side window over her shoulder rather than beside her, and only the top arc of the steering wheel entering the very bottom edge of the frame, so the shot is composed tall from the start. The steering wheel's center pad is a plain smooth surface with nothing on it. The dashboard is a plain matte dark surface across the bottom of the frame: the instrument cluster is a flat unlit dark panel with no dials, no needles, no numbers, no icons and no glow of any color, and the center of the dashboard is one smooth unbroken dark surface with no display, no touchscreen, no vents shaped like a grille and no buttons carrying symbols. Behind her through the side window, a row of parked cars thrown so far out of focus that they read as soft blocks of color only: no license plate, no manufacturer badge, no model lettering, no dealer sticker and no shape resembling a logo is legible on any of them at any moment. Beyond them, a bare tree. Nothing is held in her hands except the phone she is filming with, and nothing else is in the car.`,
      `CHARACTER. A woman in her early fifties, compact build, a round face with soft features, short salt-and-pepper hair cut close at the sides, deep smile lines, dark eyebrows, small dark eyes, no glasses, wearing a plain forest-green crew-neck sweatshirt. Her face is ordinary, plain and unremarkable, the face of a woman who runs a small software company and was never cast in anything.`,
      `LIGHT AND OCCUPANCY. Available light only: flat overcast daylight through the car's own windows and windshield. The car's interior dome light is switched off and dark, and no interior lamp, indicator or dashboard light is lit at any moment. She is alone in the car and no other person is visible or audible at any point.`,
      `PERFORMANCE. She is dry and quietly entertained, the way a person is when they have heard an objection so many times it has stopped bothering them. The first line is quick and light and matter-of-fact. The second line quotes somebody else, with a flick of the eyebrows, and then she drops straight back into her own unhurried register for everything after it. One small huff of amusement through the nose after the second line, no laugh. She is comfortable, not defensive, and she never argues.`,
      `WORD PRONUNCIATION. In the spoken lines, the word "SaaS" is a single syllable, sounded exactly like the everyday English word sass, rhyming with pass. It runs straight into the following word teams, and it is never spelled out letter by letter and never stretched into two syllables.`,
      `BEATS.`,
      `0-2s: She is already talking into the lens, quick and light: "I verify every user."`,
      `2-5s: A flick of the eyebrows, then a short huff through the nose: "Fake credit cards were killing my trials."`,
      `5-9.8s: Straight into the lens, plainly, in her own unhurried voice, explaining it once: "Seven days later, every payment failed. That is abuse." After the line she is silent for the rest of this beat, still, one slow breath, still looking into the lens, and she says no other word until the next written line begins.`,
      `9.8-13s: She stops and says it as a plain fact, no emphasis added: "A hundred plus SaaS teams trust it."`,
      `13-15s: Level, unhurried, eye contact locked into the lens: "Start free."`,
      `AUDIO. Diegetic only: the muffled close room tone of a car interior with the engine off, her clothing shifting against the seat, one distant car door closing somewhere across the parking lot. No music.`,
      ...common(NO_SCREENS_EMPTY_ROOM),
    ].join("\n\n"),
  },
];
