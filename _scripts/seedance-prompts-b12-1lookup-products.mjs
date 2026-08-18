// Seedance 2.5 ad prompts — 2026-08-18 batch 12, 1Lookup product-specific videos.
//
// Robby's brief: "please create more videos (UGC, viral, funny/parody, hooks,
// etc...) - make sure they are all hyper engaging and focus on a specific
// product."
//
// So: ten clips, each anchored on ONE named product from the 1Lookup catalog,
// never the generic platform pitch. Nine 15s + one 30s mockumentary, 9:16, 720p.
//
//   c8  Phone Validation      UGC selfie      "Dead Numbers"
//   c9  Phone Scrub (DNC)     sketch          "The First Call"
//   c10 Skip Trace            UGC selfie      "The Ghost Owner"
//   c11 Reverse Phone Lookup  sketch          "The Front Desk Knows"
//   c12 Phone Spam Check      UGC selfie      "Flagged"
//   c13 Carrier Lookup        sketch          "Four Thousand Landlines"
//   c14 Fraud Detection       30s mockumentary "Best Month Ever"
//   c15 Email Validation      format parody   "The List Sommelier"
//   c16 Mobile Finder         UGC selfie      "Magic Rolodex"
//   c17 Business Verify       sketch          "Established 1987"
//
// WHERE THE JOKES COME FROM (batch-6 rule: the funny angle is the customer's
// existing complaint): dead numbers, TCPA lawyers, ghost property owners,
// mystery callers, spam-flagged caller IDs, texting landlines, fake trial
// signups, bought lists that bounce, "who do you know" networking theatre, and
// vendors whose "since 1987" website went up on Tuesday.
//
// CLAIM SAFETY. Re-verified against the marketing repo THIS batch (the playbook
// rule). The hero now says "41 data products", not the 34 in the stale
// AD-CREATIVE-PLAYBOOK bank. Product claims spoken aloud are limited to:
//   - "Stop paying for bad data." (hero, verbatim)
//   - validation "in under a third of a second" (hero: "Validation answers in
//     under 0.3 seconds")
//   - "seven-day free trial" / "start free" (site trust chips + CTA)
//   - skip trace = phones & addresses by name (page title verbatim mechanic)
//   - reverse lookup = caller identity & risk (page title mechanic)
//   - spam score checked daily (phone-spam-check page: daily monitoring)
//   - carrier / line type (carrier-lookup page mechanic)
//   - fraud score "zero to one hundred" (site: "A 0-100 risk score on every
//     phone, email, and IP validation" + proof strip "Real-Time Fraud Scoring")
//   - NO accuracy percentages anywhere, per 1Lookup's deliberate discipline.
// Everything else characters say is fictional in-scene experience (their own
// list, their own dials), never a product statistic.
//
// RENDER SAFETY, carrying batches 9-11:
//   - Hook fully spoken inside 2 seconds; turn in the MIDDLE; tail trimmable.
//   - Comedy played dead straight (COMEDY RULE block).
//   - Per-syllable brand anchor on every spoken "1Lookup"; five of ten clips
//     (c9, c11, c13, c15, c17) never speak the brand and let the composited
//     end card carry it.
//   - No screens anywhere, exhaustively (an invented API response with a fake
//     carrier name is this brand's own recorded failure mode).
//   - Every character has a concrete but deliberately generic physiognomy plus
//     the no-real-person block, and each was read back against "which real
//     actor does this describe?" (batch-11 rule). The c14 mockumentary set and
//     cast are deliberately styled AWAY from the canonical office-doc show:
//     bright plant-filled startup office, female manager in her thirties.
//   - Action described in full sentences, never staccato word lists.
//   - No real carrier, network or company names spoken or shown anywhere.
//
// JUDGED BEFORE RENDERING (2026-08-18, three-lens panel: hook, claim safety,
// render safety). Fixes applied: c9 re-beat (11-word hook was unsayable in 2s,
// payoff was in the final window); c13 rhythm rotated to a silent-look + fax
// button and the cross-speaker "thousand" echo removed; c14 "five hundred"
// cross-character echo removed; c15 recast (the first cast read as a famous
// film critic, a fal output-rejection risk) and tail unstacked; c16 mechanic
// corrected against the site (Mobile Finder takes a profile URL or work email,
// NOT a name) and the lamp click moved off the brand line; text-prone props
// neutralized (calendar, exit sign, cup logo, mailbox, pennants, polo).

// ---------------------------------------------------------------------------
// Shared blocks (b9 lineage, 1Lookup-specific pronunciation)
// ---------------------------------------------------------------------------

// 1Lookup's Meta, Google and Reddit campaigns all target the US only, so every
// prompt names the market. Added after the repo-wide rule of 2026-08-18: the
// model fills in every attribute you leave blank and will not pick your market
// by accident. Enforced by _scripts/seedance-prompt-lint.mjs.
import { US_CAST } from "./seedance-locale.mjs";

const UGC_LOOK = `Shot on a modern phone's front camera, vertical, held at arm's length just below eye level, so the framing is slightly low and slightly off-center the way real selfie video is. Constant handheld drift and two or three natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no color grade. The face fills a good third of the frame, looking directly into the lens throughout.`;

const SKETCH_LOOK = `Shot on a phone held by an unseen third person standing a few feet away in the same room, vertical, at chest height. Constant small handheld drift, one natural reframe when someone speaks, imperfect focus that settles a beat late. Overhead office fluorescents and daylight from a window only. Real skin texture, no beauty smoothing, no color grade, mild sensor noise in the shadows. It looks like a real moment someone filmed, not a scene that was lit.`;

const DEADPAN = `COMEDY RULE. Every line is played completely straight. Nobody in the scene knows they are in something funny: no mugging, no winking or glancing at the camera, no raised eyebrows to the lens, no smirking before a line, no comedy pause held for effect, no laughing at their own words. The performances are naturalistic and slightly awkward, exactly as ordinary people are on an ordinary bad day at work. The humour comes only from what is said and what happens, never from anyone performing that it is humour.`;

const HOOK = `HOOK. The first line is fully spoken inside the first two seconds. There is no establishing shot, no slow push-in, no lead-in, no title beat and no silence before the first word: the clip cuts in with the first syllable already landing and the scene already in motion, as though the viewer arrived a second late.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks below are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, no ad-libbed reactions, no background chatter with audible words, and none of the stage directions in this prompt are read aloud.`;

// Per-syllable anchors, the hardened form. Batch 1 rendered the plain name as
// "One look"; batch 2's "three clear syllables, one look up" fixed it on all
// four clips. Each syllable gets its own everyday anchor and the final letter
// is sounded, per the batch-6 hardening. Positive only.
const SAY_1LOOKUP = `BRAND PRONUNCIATION. The spoken brand name is three clear syllables delivered as one confident word, "one look up". The first syllable is "one", the ordinary English number one. The second is "look", exactly like the everyday English verb look, as in look at this. The third is "up", the ordinary English word up, as in up the stairs, and the final letter p is sounded crisply so the word ends closed. Together it is "1Lookup", said unhurriedly as three clear syllables with a small pause before it.`;

const NO_SCREENS = `SCREEN RULE. No display surface of any kind appears anywhere in this video at any point. Every computer monitor in shot is turned away from the camera so that only its plain back panel, its stand and its side edge are visible. Every laptop is closed with its lid down. No phone screen, tablet, television, projector or smartwatch face is visible or lit at any moment, at any angle, in the foreground or the background; any phone in shot lies face down or is held to an ear with the screen against the head. There is no screen glow, no screen reflection in glass or spectacles, and no light spill from a screen onto anybody's face. Any paper, card, folder, binder, brochure, whiteboard or printout in shot carries no legible writing at any distance: pages read as plain blocks of gray texture, whiteboards are wiped to a smear.`;

const NO_REAL_PERSON = `CASTING RULE. Every person in this video is a fictional, deliberately generic-looking individual and resembles no real actor, celebrity, television character or public figure, even loosely. No face, hairstyle, wardrobe or mannerism evokes any recognisable person from any film or television programme.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. No brand marks, product logos, phone-carrier logos or app icons on anything at all, including clothing, laptop lids, mugs, lanyards, notebooks, posters and wall art. No charts, no graphs, no dashboards, no spreadsheets anywhere in frame. No music score of any kind and no laugh track. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look.`;

export const ADS = [
  // -------------------------------------------------------------------------
  // c8 — PHONE VALIDATION — UGC selfie
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c8-dead-list",
    company: "1lookup",
    title: "Dead Numbers",
    product: "Phone Validation (/products/phone-validation)",
    format: "UGC selfie, sales-ops confession",
    research:
      "UGC selfie + number-led pain hook is the house format on own-account evidence (EC C17, VoiceDrop winners). 'Still paying your SDRs to dial disconnected numbers?' is the 1Lookup port of the monday.com 'Still doing X?' opener from the research synthesis. Phone validation is the most-used product in the catalog (it led the churn dashboard), so the flagship gets the flagship format. Distinct from c3 Ghost Leads: no intercept voice, no speakerphone, no haunted-list premise; this is one person's flat morning-after report.",
    approvedCopy:
      '"Stop paying for bad data." carried by the end card. Spoken: validation before dialing (the product\'s own mechanic), "free for seven days" (site trust chip "7-day free trial").',
    claimNotes:
      "'A third was disconnected' is her own fictional list, in-scene experience, not a product statistic. No accuracy figure, no response-time figure spoken. Brand spoken once with the per-syllable anchor.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a woman in her late thirties shot on her own phone at her desk and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A small sales-floor corner desk in the early morning, before anyone else is in: flat gray daylight from a big window, empty desks with monitors turned away behind her, a wheeled whiteboard wiped to a smear, a cold takeaway coffee cup, a thick printout stack beside her keyboard with no legible writing on it.

PERSON. DANA, a woman in her late thirties with a round face, dark hair pulled into a short practical ponytail, a plain navy quarter-zip over a t-shirt, no makeup, tired but composed. She starts the video already annoyed in a calm, settled way, one forearm on the desk, and pats the printout stack once when she mentions the list. By the last line she is faintly, dryly pleased with herself. The changes are small and physical, never performed.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-2s. Straight into the lens, flat and direct: "Still paying reps to dial dead numbers?"
3-7s. She pats the printout stack once, not looking at it: "I checked our list. A third was disconnected."
8-11s. A small dry shrug, matter-of-fact: "Now every number gets validated before anyone dials."
12-15s. She reaches to end the recording, delivering it slower and clearer than everything before: "1Lookup. Free for seven days."

${SAY_1LOOKUP}

${NO_SCREENS}

AUDIO. Real empty-office morning sound: the air conditioning ticking on, a distant vacuum cleaner down the corridor, her sleeve on the desk, the paper stack shifting once under her hand. Her voice close and dry on the phone mic. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c9 — PHONE SCRUB (DNC) — sketch
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c9-first-call",
    company: "1lookup",
    title: "The First Call",
    product: "Phone Scrub / DNC list check (/products/phone-scrub)",
    format: "Two-hander sketch, the TCPA lawyer",
    research:
      "The community's own recurring horror story: the enthusiastic new rep who cold-calls a number on the Do Not Call registry and reaches a litigator. Batch-6 rule applied straight: the argument the audience is already having IS the ad. Panel re-beat: the payoff ('He's a lawyer, Kyle') lands at 10-12s and the final beat is a silent reaction, fully trimmable. Nothing factual is spoken, so there is no claim in the audio to get wrong; the composited end card carries the pitch.",
    approvedCopy:
      'End card only: "Start For Free" + 1lookup.io. Product mechanic (DNC list check before dialing) is the page title verbatim: "Phone Scrub API: DNC List Checker & Risk Flags".',
    claimNotes:
      "The Do Not Call registry is a real public thing named factually, not a product claim. No brand spoken, no numbers spoken except in-scene fiction. Kyle's ten minutes is his own fictional call.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a real moment on a small sales floor, filmed on a phone by someone at the next desk. This is not an advertisement and must not look like one.

${SKETCH_LOOK}

PLACE. A cramped, ordinary sales floor mid-morning: two rows of desks with fabric partitions, monitors all turned away from the camera showing only their backs, a droopy pot plant, a bare cork noticeboard with nothing pinned to it, paper cups, a desk phone on each desk with its handset down.

PEOPLE. KYLE, a man in his early twenties with short curly black hair, warm brown skin, round cheeks and rectangular black-framed glasses, in a too-big gray suit jacket over a polo shirt, wearing a wired headset around his neck, glowing with genuine first-day pride. MARGO, his manager, a woman in her late forties with a loose dark bun, half-moon reading glasses pushed up on her head and a mustard cardigan, seated at the next desk, marking a stack of blank-looking paper with a pen and radiating a deep, unhurried weariness. She does not once raise her voice.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-2s. Kyle spins his chair towards Margo, delighted, arms wide: "Ten minutes! My first call!"
3-6s. Margo, without looking up from her marking, perfectly even: "That number's on the Do Not Call registry."
7-9s. Kyle, still smiling, genuinely touched: "He was so interested in me."
10-12s. Margo finally looks up at him over her glasses, flat and kind at the same time: "He's a lawyer, Kyle."
12-15s. Nobody speaks. Kyle's smile stays on his face a second too long while it stops meaning anything, and Margo goes calmly back to her marking.

${NO_SCREENS}

AUDIO. Real small-office sound: a chair wheel squeaking on hard carpet, Margo's pen scratching, a desk phone ringing twice somewhere unanswered, the air-conditioning hum. Both voices dry and close. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c10 — SKIP TRACE — UGC selfie
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c10-ghost-owner",
    company: "1lookup",
    title: "The Ghost Owner",
    product: "Skip Trace (/products/skip-trace)",
    format: "UGC selfie, real-estate wholesaler in a parked car",
    research:
      "Skip tracing is the one product with a named, passionate niche audience (real-estate investors and wholesalers) who already use the term as a verb. The parked-car-outside-the-property selfie is that community's native content format, so the ad enters as a peer's tip, not an ad. Mechanic spoken is the page title verbatim (phones & addresses by name). Confession hook grammar per the research synthesis.",
    approvedCopy:
      'Spoken mechanic verbatim from the page title "Skip Tracing API: Phones & Addresses by Name": type the name, get the phone and address. "Start free" (site CTA "Start For Free").',
    claimNotes:
      "The vacant house and the returned mail are his own fictional deal, in-scene experience. No success-rate, coverage or accuracy figure. Brand spoken once with the anchor.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his early thirties shot on his own phone in a parked car and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. The driver's seat of an ordinary parked car in the middle of the day, phone held just above the wheel. Through the side window behind him, slightly out of focus, an overgrown front yard and a faded single-storey house with a sagging porch and a leaning mailbox with nothing written on it. A folder of papers on the passenger seat with nothing legible on it, a plain unmarked paper cup in the cup holder.

PERSON. MARCUS, a man in his early thirties with a neat short afro, a light stubble, a plain white tee under an open flannel shirt, energetic in the specific contained way of someone who has found something and wants to tell one friend, not the world. He glances once over his shoulder at the house when he mentions the owner, then comes back to the lens. Never salesy, never loud.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-2s. Close to the lens, low, like a secret: "The owner hasn't lived here since 2019."
3-7s. One glance back at the house, then back: "No number. No email. Mail comes back."
8-12s. A small flat shrug, laying the mechanic out plainly: "Skip trace. Type the name, get their phone and address."
12-15s. Settling back in the seat, slower and clearer than everything before: "1Lookup. Start free."

${SAY_1LOOKUP}

${NO_SCREENS}

AUDIO. Real parked-car sound: the seat creaking, his flannel sleeve on the wheel, a lawnmower far away, one car passing, the boxy close acoustic of a car interior. His voice low and close on the phone mic. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c11 — REVERSE PHONE LOOKUP — sketch
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c11-front-desk",
    company: "1lookup",
    title: "The Front Desk Knows",
    product: "Reverse Phone Lookup (/products/reverse-lookup)",
    format: "Two-hander sketch, the all-knowing receptionist",
    research:
      "The mystery caller is a universal complaint, and the all-knowing receptionist is a stock office archetype the audience already loves. The product mechanic (caller identity plus a risk read on an unknown number) is delivered as her superpower, played completely flat. Turn at second 6, button at 12, tail trimmable. No brand spoken; the end card carries it.",
    approvedCopy:
      'End card only: "Start For Free" + 1lookup.io. Mechanic is the page title verbatim: "Reverse Phone Lookup API - Caller Identity & Risk". "Low risk" echoes the site\'s risk-score language ("A 0-100 risk score").',
    claimNotes:
      "Gary and his roofing company are fictional. 'Ran it' and 'low risk' describe the product mechanic in scene, with no rate, coverage or accuracy figure attached.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a real moment at an office front desk, filmed on a phone by someone waiting in the lobby. This is not an advertisement and must not look like one.

${SKETCH_LOOK}

PLACE. A small, ordinary office reception mid-afternoon: a laminate front desk with a bell, a fanned stack of blank-looking visitor cards, a sad fern, two waiting chairs, a wall clock, a corridor behind. The receptionist's monitor is turned fully away so only its back is visible.

PEOPLE. TOM, a man in his late twenties with short dark curly hair, a lanyard with a blank white card, and a checked shirt buttoned to the top, hurrying up to the desk carrying an anxious energy he thinks he is hiding. EDNA, the receptionist, a woman in her early sixties with cropped silver hair, large round tortoiseshell glasses and a burgundy blouse, stamping a stack of papers with a rubber stamp, one page at a time, with the unhurried authority of someone who has worked here longer than the building. She never stops stamping until the last beat.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-3s. Tom arrives at the desk mid-stride, low and urgent: "A number keeps calling me and hanging up."
4-8s. Edna, still stamping, without looking up, perfectly even: "Ran it. Gary. Roofing company. Low risk."
9-11s. Tom, thrown, quieter: "Should I be worried?"
12-15s. Edna stops stamping, looks at him over the glasses, entirely serious: "About your gutters, maybe." She resumes stamping. Tom stays where he is.

${NO_SCREENS}

AUDIO. Real lobby sound: the rubber stamp thumping in a steady rhythm, a phone ringing once far down the corridor, the fern brushing the desk fan, a door closing somewhere. Both voices close and dry. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c12 — PHONE SPAM CHECK — UGC selfie
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c12-flagged",
    company: "1lookup",
    title: "Flagged",
    product: "Phone Spam Check (/products/phone-spam-check)",
    format: "UGC selfie, stairwell vent",
    research:
      "Outbound teams' quiet killer: their own caller IDs get flagged as spam and pickups collapse, and most teams never find out. The phone-spam-check page's own outbound use case plus its daily monitoring feature, delivered as one person's vent that resolves into the fix. Number-led pain hook in second one, per the synthesis. Stairwell venting is native UGC grammar for work complaints.",
    approvedCopy:
      'Spoken: numbers have a spam score (site: "spam_score" product field, "A 0-100 risk score"), checked daily (phone-spam-check page: "Automated Daily Monitoring"). Brand spoken once. End card: "Start For Free" + 1lookup.io.',
    claimNotes:
      "Eight hundred dials and four pickups are her own fictional day, in-scene. 'Numbers have spam scores' is the product's own mechanic, no rate or accuracy attached. No carrier named, no 'Scam Likely' wording (third-party branding).",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a woman in her late twenties shot on her own phone in an office stairwell and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A bare concrete office stairwell landing, mid-afternoon: painted handrail, a fire door with a push bar, a high frosted window throwing flat cold light, a bare emergency bulkhead light glowing above the door. She leans against the rail, half-turned to the lens.

PERSON. PRIYA, a woman in her late twenties with dark shoulder-length hair tucked behind one ear, a lanyard with a blank card flipped backwards, and a rumpled light-blue work shirt with the sleeves shoved up. She has clearly just stormed out of the sales floor and is venting at full volume, because the stairwell is the one place she can: heated, fast and articulate, talking with both hands. Over the four beats she cools from genuinely worked up to flatly resolved. Nothing about her is performed.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-2s. Straight in, loud and exasperated, hands wide: "Eight hundred dials. Four pickups."
3-7s. Both hands up, the revelation, still heated: "Our numbers are flagged as spam. All of them."
8-12s. Cooler now, flatly resolved, the fix stated as a habit: "Numbers have spam scores. I check ours daily now."
12-15s. She pushes off the rail to go back in, slower and clearer than everything before: "1Lookup. Free trial."

${SAY_1LOOKUP}

${NO_SCREENS}

AUDIO. Real stairwell sound: the hard concrete echo on her voice, the fire door clunking somewhere below, a muffled office beyond the door, her sleeve on the painted rail. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c13 — CARRIER LOOKUP — sketch
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c13-landlines",
    company: "1lookup",
    title: "Four Thousand Landlines",
    product: "Carrier Lookup / line type (/products/carrier-lookup)",
    format: "Two-hander sketch, the SMS blast that went to landlines",
    research:
      "Line type is the carrier-lookup page's own mechanic and the joke writes itself: an SMS campaign sent to landlines is money fired into the void, and the audience running SMS outreach knows the fear. Triumph punctured by one flat line, turn at second 6. A distant fax screech is the audio button. No brand spoken; end card carries it.",
    approvedCopy:
      'End card only: "Start For Free" + 1lookup.io. Mechanic is the carrier-lookup page verbatim: "the carrier, line type, and porting history behind any phone number".',
    claimNotes:
      "Ten thousand texts and four thousand landlines are the scene's own fictional numbers. 'Landline' is a line type, not a brand; no carrier or network is named anywhere.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a real moment in a small marketing office, filmed on a phone by someone leaning on a nearby desk. This is not an advertisement and must not look like one.

${SKETCH_LOOK}

PLACE. A small, ordinary marketing office late in the afternoon: two desks pushed together, monitors turned away showing only their backs, a whiteboard wiped to a gray smear, a string of tiny plain paper pennants with nothing printed on them sagging over one desk left over from some forgotten celebration, mugs, a beaten swivel chair.

PEOPLE. DEAN, a man in his mid-twenties, tall and lanky with gelled-up dark hair and a slightly too tight completely plain polo shirt, leaning back in the swivel chair with his hands behind his head, luxuriating in triumph. ROSA, a woman in her mid-forties with straight black hair in a low ponytail, a denim shirt and reading glasses, standing beside his desk holding a thick printout with nothing legible on it, unhurried and entirely unimpressed.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-3s. Dean, hands behind his head, announcing it to the room: "Ten thousand texts. Just sent. Boom."
4-8s. Rosa turns one page of the printout, level and unhurried: "Almost half of these numbers are landlines."
WORD PRONUNCIATION. The word "landlines" in Rosa's line is two ordinary English words said together as one: first "land", as in dry land, with the letter d sounded clearly, then "lines", as in telephone lines. She says it unhurriedly: "land-lines".
9-12s. Dean's hands come down slowly. A genuine, hopeful pause: "So they'll get it later?"
12-15s. Rosa says nothing at all. She looks at him over the glasses and holds it. From somewhere down the corridor, faintly, a fax machine screeches, and both of them turn their heads towards the door.

${NO_SCREENS}

AUDIO. Real office sound: the swivel chair creaking under Dean, the printout pages turning, the air-conditioning hum, and at the very end one distant muffled fax-machine screech from down the corridor. Both voices dry and close. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c14 — FRAUD DETECTION — 30s mockumentary
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c14-best-month",
    company: "1lookup",
    title: "Best Month Ever",
    product: "Fraud Detection (/products/fraud-detection)",
    format: "30s office mockumentary, signups that are all one guy",
    research:
      "The 30s mockumentary is the register Robby approved twice ('Love it', batches 10-11). Premise from the fraud-detection product's own job: fake signups pumping a growth chart. The doc-crew format lets the manager celebrate while a confessional quietly explains the product. Joke lands mid-clip (second 11), the serene closer is trimmable. Cast and set styled deliberately away from the canonical office-doc show per the batch-11 likeness rules: bright plant-filled startup office, female manager in her early thirties.",
    approvedCopy:
      'Spoken: fraud score "zero to one hundred" on every signup (site: "A 0-100 risk score on every phone, email, and IP validation"; proof strip: "Real-Time Fraud Scoring"). Brand spoken once in the confessional with the anchor. End card: "Start For Free" + 1lookup.io.',
    claimNotes:
      "Five hundred signups and Rick are fictional. The only product claim spoken is the 0-100 fraud score, which is site copy. Rick's ninety-eight is a fictional score inside the mechanic, not an accuracy figure. No third-party names.",
    aspect_ratio: "9:16",
    duration: "30",
    prompt: `A vertical mockumentary-style video filmed in a small startup office by a two-person documentary crew, with handheld observational shots and one seated interview. This is not an advertisement and must not look like one.

VISUAL STYLE. Handheld documentary camera, vertical. Observational shots drift and reframe with small punch-ins on reactions; the interview is a locked-off seated confessional against a plain wall with window light from one side. Natural light and office fluorescents only, real skin texture, no color grade, no studio lighting, mild sensor noise.

PLACE. A small, bright, modern startup office: white walls, blond-wood desks, many healthy green plants, a yellow sofa in one corner, monitors all turned away showing only their backs, a glass jar of markers, a whiteboard wiped clean to a faint smear. Nothing beige, nothing gray, nothing dim. The confessional corner is a plain white wall beside a tall plant.

PEOPLE. JUNE, the growth manager, a woman in her early thirties with box braids tied back, a mustard blazer over a white tee and small gold hoop earrings, glowing with sincere, unclouded pride. She addresses the unseen documentary crew directly and believes every word she says. OKSANA, an analyst, a woman in her late twenties with a blunt copper bob, a gray cardigan and no jewellery, who gives her interview seated, hands folded, with the calm of someone who has accepted the situation completely. Three background colleagues work silently at the turned-away desks.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-4s. Observational: June strides past the desks holding a mug, talking to the following camera, beaming: "Five hundred new signups this month. A record."
5-9s. She stops, turns to the lens, hand on heart, completely sincere: "We don't ask questions here. We celebrate."
10-15s. Cut to Oksana's seated confessional. Hands folded, perfectly flat: "It's all one man. Rick."
16-23s. Oksana, same flatness, a small breath: "So now every signup gets a fraud score from 1Lookup. Zero to one hundred." A beat. "Rick scored ninety-eight."
WORD PRONUNCIATION. The word "signup" in Oksana's line is two ordinary English words said together as one, unhurried: first "sign", as in to sign a form, then "up", as in up the stairs. She says it clearly: "sign-up".
24-27s. Observational: June at her desk, serene, raising her mug slightly towards the camera: "Rick is our best customer."
27-30s. The camera holds on June's contented face a moment too long. Somewhere off-screen a single party popper goes off, and nobody reacts.

${SAY_1LOOKUP}

${NO_SCREENS}

AUDIO. Real office room tone: keyboards, a printer, the mug set down on wood, the single party popper at the end, distant traffic through a window. Interview voice close and dry, observational lines a little roomier. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c15 — EMAIL VALIDATION — format parody
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c15-list-sommelier",
    company: "1lookup",
    title: "The List Sommelier",
    product: "Email Validation (/products/email-validation)",
    format: "Wine-tasting parody, a sommelier judges a bought email list",
    research:
      "Format parody out-commits description (playbook, batch 9): the sommelier tasting ritual is instantly recognisable grammar, and swapping the wine for a printed email list makes the product mechanic (typos, disposable domains, bounces) the tasting notes themselves. Pure genre comedy with zero factual claims spoken; the end card carries the pitch. 'Servable' is the wine pun that doubles as the verdict. Turn arrives by second 5.",
    approvedCopy:
      'End card only: "Start For Free" + 1lookup.io. "Disposable domains" echoes the email-validation page verbatim ("disposable email detection").',
    claimNotes:
      "Every line is a fictional tasting verdict on a fictional list. 'Forty percent of this will bounce' is the sommelier's in-scene judgement of one prop list, not a product or industry statistic. No accuracy figure, no deliverability percentage as a product claim.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a private tasting in a wine cellar, filmed on a phone by someone seated at the table. This is not an advertisement and must not look like one.

VISUAL STYLE. Handheld phone video, vertical, seated across the table so both people are in frame, small drift and one refocus. Lit by two candles on the table and one warm dim wall sconce, deep shadows, real grain, no color grade, no studio lighting.

PLACE. A small stone wine cellar got up for private tastings: a dark wooden table with a white runner, two candlesticks, an empty decanter, a spittoon, racked bottles along the walls with no legible labels anywhere. On a silver serving tray in the center of the table lies a thick printed document, face up, its pages reading only as blocks of gray texture with nothing legible.

PEOPLE. THE SOMMELIER, a man in his late thirties with deep brown skin, a short black beard and a shaved head, wearing a maroon waistcoat over a crisp white shirt and a long dark sommelier's apron, who performs the full tasting ritual on the printed list with absolute unsmiling professional gravity. THE CLIENT, a man in his late thirties in a crumpled business shirt with his tie loosened, perched anxiously on the front edge of his chair, who has clearly paid for this and is afraid of the answer.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-2s. The clip cuts in with the printed list already at the sommelier's nose, mid-inhale; on the exhale he pronounces, flatly: "Bought online. Recently."
3-7s. He fans the pages once beside his ear, listening, then holds a page up to the candlelight: "I'm getting... typos. Disposable domains."
7-10s. He sets the list down on the tray with terrible finality and looks at the client: "Forty percent of this list will bounce."
10-12s. The client, barely audible, hopeful: "Is it servable?"
12-14s. The sommelier, with quiet compassion: "It is not."
14-15s. Neither man moves. The candles gutter.

${NO_SCREENS}

AUDIO. Real cellar sound: pages fanning once, the candle flames guttering, the list set down on the silver tray, the client's chair creaking, a deep stone-room silence under everything. Both voices low, close and dry. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c16 — MOBILE FINDER — UGC selfie
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c16-magic-rolodex",
    company: "1lookup",
    title: "Magic Rolodex",
    product: "Mobile Finder (/products/mobile-finder)",
    format: "UGC selfie, status-flex confession",
    research:
      "Direct port of the ClickUp status-flex hook grammar ('My CEO thinks I'm an expert project manager but I literally just type one sentence'), the single most proven UGC opener in the research corpus. The flex-then-confession structure IS the turn. Mobile Finder's mechanic (a direct mobile number from a name) is the confession. Conspiratorial close instead of a hard CTA; brand spoken once.",
    approvedCopy:
      'Spoken mechanic: paste a profile link, get a direct mobile number. Verified against the Mobile Finder page: "Turn a LinkedIn profile URL or work email into a direct mobile number", headline "profile URL in, mobile out", title "Mobile Finder API: Get Direct Mobile Numbers". "Don\'t tell him" replaces a second CTA; the end card carries "Start For Free" + 1lookup.io.',
    claimNotes:
      "His reputation and his boss are fictional. No coverage, match-rate or accuracy figure. 'Profile link' stays generic: LinkedIn is a third-party mark and is not spoken. Brand spoken once with the anchor. The site says Mobile Finder does NOT take a name, so the mechanic line uses the profile link, not a name.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical selfie video that a man in his late twenties shot on his own phone at his desk after hours and posted. This is not an advertisement and must not look like one.

${UGC_LOOK}

PLACE. A dim office at the end of the day: his desk lamp is the main light, warm and low, the overheads are off, monitors behind him turned away and dark, a jacket over his chair, the window behind showing early evening blue. The desk surface is bare apart from a keyboard and a closed notebook: no food, no wrapper, no packaging and no takeaway container is anywhere in shot at any point.

SINGLE SHOT. The entire clip is one unbroken take from the phone in his own hand, held at arm's length in front of his face. The camera never leaves his hand, never cuts to another angle, and never shows him from behind, from the side of the room, or from any position he could not be holding the phone in. There is no second camera, no cutaway, no reverse angle and no third-person shot at any moment.

PERSON. ELI, a man in his late twenties with short tight dark curls, warm brown skin, a loosened knit tie over a pale shirt with the top button undone, leaning in towards the lens with the low conspiratorial energy of someone confessing something at the end of a good day. He checks over his shoulder once, theatrically unnecessary in an empty office, before the confession. He enjoys every second and never once plays it as a joke.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-2s. Leaning in, low, straight at the lens: "My boss thinks I know everyone."
3-6s. A beat. One glance over his shoulder at the empty office, then back, even lower: "I don't know anyone."
7-11s. The confession, laid out flat and simple, with a small two-finger tap-and-paste mime in the air: "I paste their profile link. I get a direct mobile number."
12-15s. He settles back and delivers it slower and clearer than everything before: "1Lookup. Don't tell him." A beat after the line has fully ended, he reaches over and clicks the lamp off.

${SAY_1LOOKUP}

${NO_SCREENS}

AUDIO. Real end-of-day office sound: the desk lamp's faint buzz and final click, his chair creaking as he leans, the sandwich wrapper crinkling once, distant traffic through the window. His voice low and close on the phone mic. No music.

${US_CAST}

${BANS}`,
  },

  // -------------------------------------------------------------------------
  // c17 — BUSINESS VERIFY — sketch
  // -------------------------------------------------------------------------
  {
    id: "1lookup-c17-established-1987",
    company: "1lookup",
    title: "Established 1987",
    product: "Business Verify (/products/business-verify)",
    format: "Two-hander sketch, the vendor whose history began on Tuesday",
    research:
      "B2B fraud angle nobody in the category runs as video: the too-good vendor whose 'established 1987' website went up this week. Business Verify's whole job ('is this contact or business real', the Validate family's own description) delivered as one flat line about domain age. Turn at second 6; the button is a payment deadline, which is the quiet real stake. No brand spoken; end card carries it.",
    approvedCopy:
      'End card only: "Start For Free" + 1lookup.io. Mechanic: business verification (product name verbatim: "Business Verify") with domain age as the tell (the catalog\'s own Domain Age product).',
    claimNotes:
      "The vendor, the brochure and the Tuesday domain are fictional. No fraud statistics, no third-party names, no invented industry figures.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: `A vertical video of a real moment in a small back office, filmed on a phone by someone in the doorway. This is not an advertisement and must not look like one.

${SKETCH_LOOK}

PLACE. A small, ordinary procurement back office: one shared desk stacked with ring binders, a metal filing cabinet with a dying plant on top, monitors turned away showing only their backs, a wall year-planner with no legible writing, a window with vertical blinds half open.

PEOPLE. CAROL, a woman in her mid-fifties with curly auburn hair, a bright patterned scarf over a cream blouse and reading glasses on a chain, holding a glossy tri-fold brochure with no legible printing on it, genuinely impressed by it. VICTOR, a man in his mid-thirties with a shaved head, wire-rimmed glasses and a plain dark sweater, seated at the desk with a stack of blank-looking printouts, calm to the point of stillness. He delivers facts the way other people deliver bad weather.

${HOOK}

${DEADPAN}

${SPEECH_RULE}

${NO_REAL_PERSON}

BEATS.
0-3s. Carol, holding the brochure up admiringly, warm, convinced and brisk, the whole line out in one breath: "They've been in business since nineteen eighty-seven."
4-8s. Victor, without looking up from his printouts, perfectly level: "Their domain was registered on Tuesday."
9-11s. Carol lowers the brochure a little. A genuine, generous pause: "People can change."
12-15s. Victor looks up at her for the first time, flat and unhurried: "The invoice is due Friday, Carol." Carol looks at the brochure again. The brochure has not changed.

${NO_SCREENS}

AUDIO. Real back-office sound: the brochure's glossy pages flexing, Victor's printouts shuffling, the filing cabinet ticking as it settles, the blinds clicking once in the draught, a phone ringing far away. Both voices dry and close. No music.

${US_CAST}

${BANS}`,
  },
];
