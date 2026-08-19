// Seedance 2.5 ad prompts — 2026-08-19 batch 13, 1Lookup.
//
// Robby: "We need to go way harder with our paid ads for 1Lookup. I want ads for each
// product, properly named. Combination of banners and video ads (Seedance 2.5)."
//
// Batch 12 gave ten products a video, all of them from the Validate and Enrich families and
// all of them phone-shaped. This batch covers TWELVE products that have never had one, so
// every product with a plausible paid buyer now has both a named banner and, for the twelve
// with the sharpest pain, a named video.
//
//   b13v01 SERP Scraper           sketch        "Five Hundred A Month To Read Google"
//   b13v02 Reverse IP Append      sketch        "Ninety-Seven Ghosts"
//   b13v03 Prospect Search        UGC selfie    "Per Seat"
//   b13v04 B2B Contact Append     UGC selfie    "Four Guesses"
//   b13v05 Job Change Monitoring  sketch        "He Left In March"
//   b13v06 IP Lookup              sketch        "Shipped To A Basement"
//   b13v07 HLR Lookup             UGC selfie    "The Code Went Nowhere"
//   b13v08 Property Lookup        UGC selfie    "The Drive-By"
//   b13v09 Audio Transcription    UGC selfie    "Nine Hours Of Calls"
//   b13v10 Ad Library Lookup      sketch        "What Are They Running"
//   b13v11 MCP Server             sketch        "Ask The Agent"
//   b13v12 Platform (41 products) sketch        "The Renewal Wall"
//
// WHERE THE JOKES COME FROM (batch-6 rule, still the best rule in this repo: the funny angle
// is the customer's existing complaint). Paying a subscription to read a public search page.
// A traffic report that counts strangers. Buying seats so people can take turns searching one
// list. Guessing an email four ways. Pitching a champion who left in March. Shipping to a
// VPN. Texting a verification code to a number that stopped existing. Driving across town to
// count bedrooms. Listening to nine hours of your own calls. Being asked what the competition
// is running and having to go look. Pasting an API key into an AI agent. Reading eleven vendor
// renewals out loud.
//
// CLAIM SAFETY, re-verified against the marketing repo on 2026-08-19 rather than trusted from
// the playbook bank, which has been stale twice. DATA_PRODUCT_COUNT is 41
// (src/lib/products.ts). Spoken product claims are limited to each product page's own stated
// mechanic, plus these site-wide lines:
//   - "Stop paying for bad data." (hero, verbatim)
//   - the seven-day free trial (hero trust chip, /free-trial page)
//   - "41 data products on one API key" and "one shared credit balance" (hero subheadline)
//   - "nothing charged today" (/free-trial: "Yes, no charge today")
//   - per-credit prices only where the product page states them: SERP 1 credit,
//     prospect search 2 credits, job change 5 credits per contact per weekly recheck,
//     property lookup 15 credits, ad library 10 credits.
// NO accuracy percentage anywhere, per this brand's deliberate discipline (PR #38 trust purge).
// Numbers a character says about their OWN list, their OWN traffic or their OWN day are
// in-scene fiction, never a product statistic.
//
// AND THE RULE THAT OUTRANKS ALL OF THEM (Robby, 2026-08-13, second time of asking):
// ads sell, ads never disclaim. Not one clip opens on what the product is not.
//
// RENDER SAFETY, carrying every lesson from batches 9 to 12:
//   - Hook fully spoken inside 2 seconds. The turn lands in the MIDDLE, never in the final
//     four seconds, which is where this model is least reliable. Every tail is trimmable.
//   - Comedy played dead straight (DEADPAN block).
//   - NO clip speaks the brand name. Batch 12 garbled it on four of five clips that tried
//     ("One Lookout", "1Lookit", "One look", "One leads"), and in this batch the brand would
//     have sat inside each clip's only mechanic sentence, so a garble could not be trimmed
//     without deleting the product pitch with it. The composited end card carries the brand
//     on every clip, which makes every audio defect a $0 repair. SAY_1LOOKUP is kept below,
//     unused, for the next batch that has somewhere safe to put a spoken brand.
//   - No screens anywhere, exhaustively. An invented API response with a fake carrier name is
//     this brand's own recorded failure mode.
//   - No long word repeated across two speakers (the second-instance drift case that cost
//     batch 12 two re-rolls).
//   - Action written in full sentences, never a staccato word list, which batch 9 proved gets
//     chanted aloud as dialogue.
//   - Every character carries the no-real-person block.
//   - Spoken words per clip are counted, not asserted: 15 to 37 here, against the 21 to 35
//     that batch 12's ten 15-second clips actually used. A hook is at most 12 syllables,
//     which is what a 3-second window buys at a natural deadpan pace.
//
// JUDGED BEFORE RENDERING (2026-08-19, three lenses over all twelve: hook, claim safety,
// render safety). It returned eleven blockers, every one fixed here before a cent was spent:
// the shared HOOK block demanded a 2-second opener that eleven of twelve hooks could not fit;
// five hooks were re-written shorter; "Thursday" and "format" each crossed two speakers, the
// exact second-instance drift that cost batch 12 two re-rolls; b13v12 carried a chant-prone
// three-item word list; b13v03 was the same ad as b13v01 and b13v07 was the same ad as batch
// 12's c13, so both were re-cut as selfies; a television, a wall of printed shipping boxes, a
// calculator LCD, printed deli paper, a box of tissues, a steering-wheel badge and a set of
// filing-cabinet label holders were all neutralised; and every spoken brand name was removed.
//
// COST. 720p, not 480p: Robby's standing preference since batch 3 ("I prefer 720P"). A
// 15-second 9:16 clip at 720p is 720*1280*15*24/1024 = 324,000 tokens at $0.0214 per 1,000 =
// $6.93, so twelve clips is ~$83.16 plus ~$1.30 of upscaling. Budget accordingly: an
// avoidable defect costs $6.93 to re-roll, not $3.19.

import { US_CAST } from "./seedance-locale.mjs";

// ---------------------------------------------------------------------------
// Shared blocks (b9 lineage, 1Lookup-specific pronunciation)
// ---------------------------------------------------------------------------

const UGC_LOOK = `Shot on a modern phone's front camera, vertical, held at arm's length just below eye level, so the framing is slightly low and slightly off-center the way real selfie video is. Constant handheld drift and two or three natural reframes. Available light only. Mild lens distortion up close, real skin texture, visible pores, no beauty smoothing, no color grade. The face fills a good third of the frame, looking directly into the lens throughout.`;

const SKETCH_LOOK = `Shot on a phone held by an unseen third person standing a few feet away in the same room, vertical, at chest height. Constant small handheld drift, one natural reframe when someone speaks, imperfect focus that settles a beat late. Overhead office fluorescents and daylight from a window only. Real skin texture, no beauty smoothing, no color grade, mild sensor noise in the shadows. It looks like a real moment someone filmed, not a scene that was lit.`;

const DEADPAN = `COMEDY RULE. Every line is played completely straight. Nobody in the scene knows they are in something funny: no mugging, no winking or glancing at the camera, no raised eyebrows to the lens, no smirking before a line, no comedy pause held for effect, no laughing at their own words. The performances are naturalistic and slightly awkward, exactly as ordinary people are on an ordinary bad day at work. The humor comes only from what is said and what happens, never from anyone performing that it is humor.`;

const HOOK = `HOOK. The first line is fully spoken inside the first three seconds. There is no establishing shot, no slow push-in, no lead-in, no title beat and no silence before the first word: the clip cuts in with the first syllable already landing and the scene already in motion, as though the viewer arrived a second late.`;

const SPEECH_RULE = `SPEECH RULE. Only the lines written in quotation marks in the BEATS block are ever spoken. Nothing else is said at any point: no extra narration, no counting, no muttering, no improvised commentary, no ad-libbed reactions, no background chatter with audible words, and none of the stage directions in this prompt are read aloud.`;

const SAY_1LOOKUP = `BRAND PRONUNCIATION. The spoken brand name is three clear syllables delivered as one confident word, "one look up". The first syllable is "one", the ordinary English number one. The second is "look", exactly like the everyday English verb look, as in look at this. The third is "up", the ordinary English word up, as in up the stairs, and the final letter p is sounded crisply so the word ends closed. Together it is "1Lookup", said unhurriedly as three clear syllables with a small pause before it.`;

const NO_SCREENS = `SCREEN RULE. No display surface of any kind appears anywhere in this video at any point. Every computer monitor in shot is turned away from the camera so that only its plain back panel, its stand and its side edge are visible. Every laptop is closed with its lid down. No phone screen, tablet, television, projector or smartwatch face is visible or lit at any moment, at any angle, in the foreground or the background; any phone in shot lies face down or is held to an ear with the screen against the head. There is no screen glow, no screen reflection in glass or spectacles, and no light spill from a screen onto anybody's face. Any paper, card, folder, binder, brochure, whiteboard or printout in shot carries no legible writing at any distance: pages read as plain blocks of gray texture, whiteboards are wiped to a smear.`;

const NO_REAL_PERSON = `CASTING RULE. Every person in this video is a fictional, deliberately generic-looking individual and resembles no real actor, celebrity, television character or public figure, even loosely. No face, hairstyle, wardrobe or mannerism evokes any recognizable person from any film or television program.`;

const BANS = `HARD CONSTRAINTS. No on-screen text of any kind: no titles, no subtitles, no captions, no lower thirds, no logos, no wordmarks, no watermarks, no graphics, no interface overlays, no end card. No brand marks, product logos, phone-carrier logos or app icons on anything at all, including clothing, laptop lids, mugs, lanyards, notebooks, posters and wall art. No charts, no graphs, no dashboards, no spreadsheets anywhere in frame. No music score of any kind and no laugh track. No slow motion, no speed ramps, no drone or crane shots, no gliding dolly, no orbiting camera, no lens flares, no glowing particles, no holograms, no floating icons, no teal-and-orange grade, no montage of cutaways, no studio lighting, no professional camera look, no advertising gloss, no stock-footage look.`;

const common = (look) => [US_CAST, look, DEADPAN, HOOK, SPEECH_RULE, NO_SCREENS, NO_REAL_PERSON, BANS];

export const ADS = [
  // -------------------------------------------------------------------------
  {
    id: "1lookup-search-intent-lookup-b13v01-read-google",
    company: "1lookup",
    title: "Five Hundred A Month To Read Google",
    product: "SERP Scraper (/products/search-intent-lookup)",
    format: "sketch, two people at a desk",
    research: "'Still doing X?' opener (monday.com, years-long) crossed with the ROI-math native pattern (Motion's 542-day ad). SERP is the highest-volume term in the whole catalogue: 'serp api' is 12,100 US searches a month, and the buyer already pays a subscription, so the wedge is price per unit, not capability.",
    approvedCopy: "'One credit a search' is verbatim from the product page ('1 credit per lookup'). 'Seven-day free trial' is the site trust chip.",
    claimNotes: "The five-hundred-a-month figure is the character's own invoice, in-scene fiction. No competitor is named. Brand not spoken; the end card carries it.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical phone video of a real moment in a small marketing agency's back office. This is not an advertisement and must not look like one.`,
      `SETTING. A cramped windowless back office with a gray carpet tile floor, a beige wall, a water-stained ceiling tile, two mismatched desks pushed together, a dying spider plant, a stack of unopened plain brown cardboard boxes with no labels or writing on them, and a wire bin overflowing with paper. Fluorescent tube overhead, one of them flickering slightly.`,
      `CHARACTERS. A man in his early forties, thinning sandy hair receding at the temples, a long narrow face, a heavy brow, a wide flat nose, pale stubble along the jaw, deep lines at the mouth, a slightly-too-large blue button-down with the sleeves rolled unevenly, tired eyes, holding a mug with no printing on it in both hands. A woman in her late twenties, dark hair in a low ponytail, a round face with full cheeks, a short blunt nose, thick straight eyebrows, a small chin, no makeup, a plain loose gray crew-neck sweater buttoned to the collarbone, sitting sideways in a wheeled office chair with one foot on the base. Both faces are ordinary, plain and unremarkable, the faces of two people who work in an office and were never cast in anything.`,
      `BEATS.`,
      `0-3s: The man is mid-sentence, looking at a closed laptop lid, flat and unbothered: "We pay five hundred a month. To read search results."`,
      `3-6s: The woman does not look up. She turns the chair slightly. "It's a subscription. That's how it works."`,
      `6-10s: He sets the mug down carefully, thinks about it, and says it plainly, still not angry: "Search results are free. Everyone else reads them for free."`,
      `10-13s: She stops the chair, and says it like she has just heard it herself for the first time: "There's one that's a credit a search."`,
      `13-15s: He looks at her. She shrugs one shoulder. Neither of them says anything else. Hold on the two of them in the flickering light.`,
      `AUDIO. Diegetic only: the fluorescent tube's faint buzz, the caster wheels of the chair on carpet tile, the mug touching the desk, air handling hum. No music.`,
      ...common(SKETCH_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-reverse-ip-append-b13v02-ninety-seven-ghosts",
    company: "1lookup",
    title: "Ninety-Seven Ghosts",
    product: "Reverse IP Append (/products/reverse-ip-append)",
    format: "sketch, standing update to a founder",
    research: "Negative hook with blame-shift, the published pattern ('Your demos are not converting and it has nothing to do with your product'). Website-visitor identification is a category with real paid competition and no category-education video, so the ad explains the gap rather than the feature.",
    approvedCopy: "'Append contact and geolocation data from an IP address' is the product page's own sentence, compressed to 'turn the IP into a contact'.",
    claimNotes: "Ninety-seven visitors is the character's own traffic, in-scene fiction. Brand not spoken.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical phone video of a real two-minute update in a small company's open-plan office. This is not an advertisement and must not look like one.`,
      `SETTING. An ordinary open-plan office, low gray partition walls, a kitchenette counter with a coffee maker and a stack of paper cups just visible behind them, a whiteboard wiped to a gray smear, vertical blinds half open onto a parking lot. Daylight plus overhead fluorescents. The notebook's pages carry no legible writing at any distance and read as plain blocks of gray texture.`,
      `CHARACTERS. A woman in her early thirties in a plain olive sweater and jeans, hair clipped up, holding a closed notebook against her chest. A man in his late forties, short gray beard, untucked checked shirt, standing with his arms folded, the founder.`,
      `BEATS.`,
      `0-3s: He is already asking, genuinely pleased, arms folded: "Ninety-seven visitors. Which ones?"`,
      `3-5s: She starts to answer brightly and stops. She looks down at the closed notebook.`,
      `5-9s: She opens the notebook and looks back up. Long beat. "Ninety-seven people."`,
      `9-12s: He unfolds his arms slowly. "So we know a number."`,
      `12-15s: She nods once. "We know a number." The coffee maker behind them finishes its cycle with a gurgle and a hiss.`,
      `AUDIO. Diegetic only: the coffee maker gurgling and hissing, a distant printer, the notebook cover flexing, low office room tone. No music.`,
      ...common(SKETCH_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-prospect-search-b13v03-per-seat",
    company: "1lookup",
    title: "Per Seat",
    product: "Prospect Search (/products/prospect-search)",
    format: "UGC selfie, sales manager at her desk",
    research: "Us-vs-them on ONE narrow dimension, which the live library shows Smartlead re-cutting across three launch waves. The dimension is the pricing model, not the data, because per-seat pricing is the complaint the buyer already has. Cut as a selfie rather than a two-hander so it does not read as the same ad as b13v01, and because the account's own banner data favours the native-organic register.",
    approvedCopy: "'Two credits a search' is verbatim from the product page ('2 credits per search'). 'Only the contacts you want' compresses the page's own line.",
    claimNotes: "The five-seat contract is her own invoice, in-scene fiction. No competitor named. Brand never spoken; the end card carries it.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical selfie video that a woman in her mid-thirties shot on her own phone at her desk and posted. This is not an advertisement and must not look like one.`,
      `CHARACTER. Mid-thirties, straight black hair to the shoulder, wide round face, heavy eyebrows, no makeup, a plain navy blazer over a t-shirt. She is at a desk on a sales floor with a low gray partition behind her and a floor-standing fan turning somewhere off to one side.`,
      `BEATS.`,
      `0-3s: Straight into the lens, flat and faintly disbelieving: "We bought five seats. For one list."`,
      `3-6s: She holds up one hand and drops it again. "Four of them searched it once."`,
      `6-10s: "We are renting chairs. Nobody is sitting in them."`,
      `10-13s: More matter of fact, working it out for the viewer: "Or we pay two credits when we actually search."`,
      `13-15s: She raises her eyebrows once at the lens and reaches forward as if to stop the recording. The clip ends on the movement.`,
      `AUDIO. Diegetic only: the floor fan turning, distant muffled phone conversations with no distinguishable words, her chair creaking once. No music.`,
      ...common(UGC_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-b2b-contact-append-b13v04-four-guesses",
    company: "1lookup",
    title: "Four Guesses",
    product: "B2B Contact Append (/products/b2b-contact-append)",
    format: "UGC selfie, SDR confession",
    research: "Confession hook, one of Motion's validated tactics from the 550K-ad dataset. The specific behaviour (guessing address permutations) is universal among SDRs and nobody advertises against it.",
    approvedCopy: "'A verified work email, title and seniority' is the product page's own list. 'Only charged on a match' is the page's own billing sentence.",
    claimNotes: "The four bounced emails are her own week, in-scene fiction. Brand spoken once with the per-syllable anchor.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical selfie video that a woman in her late twenties shot on her own phone at her desk and posted. This is not an advertisement and must not look like one.`,
      `CHARACTER. Late twenties, curly dark hair pushed back off her face, a square jaw, a broad forehead, close-set brown eyes, a small mole on one cheek, no makeup, tired around the eyes. She wears a plain opaque maroon crew-neck sweater that covers her collarbones and shoulders completely, with long sleeves to the wrist, and a thin chain at the neck. She is seated upright at a plain desk against a beige wall, framed from the middle of the chest upward at eye level throughout, with a corner of a wall calendar visible behind her whose printing is too blurred to read. Her face is ordinary and unremarkable, the face of somebody who works in an office and was never cast in anything. The wardrobe is modest and entirely workplace-appropriate, the framing is a plain head-and-shoulders office selfie at eye level, and the tone is dry and professional throughout.`,
      `BEATS.`,
      `0-3s: Straight into the lens, flat and a little embarrassed: "I emailed this guy four times. All four bounced."`,
      `3-7s: She turns one hand over as she says it, in one unhurried continuous sentence: "I tried every combination of his name there is."`,
      `7-10s: She drops her hand. "He definitely works there."`,
      `10-13s: She leans in slightly, more matter of fact: "Send the name and the company. You get the real one back."`,
      `13-15s: A small shrug, then she reaches forward toward the phone as if to stop the recording. The clip ends on the movement.`,
      `AUDIO. Diegetic only: a distant open-plan office murmur with no distinguishable words, her chair creaking once, a keyboard somewhere off camera. No music.`,
      ...common(UGC_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-job-change-monitoring-b13v05-left-in-march",
    company: "1lookup",
    title: "He Left In March",
    product: "Job Change Monitoring (/products/job-change-monitoring)",
    format: "sketch, a phone call with a receptionist",
    research: "Diegetic pattern interrupt: open mid-action on a call already going wrong. The pain is the single most common wasted-cycle complaint in outbound and it has a clean product answer.",
    approvedCopy: "'An event when someone changes company or title' is the product page's own sentence.",
    claimNotes: "The named month is in-scene fiction about one fictional contact. Brand not spoken.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical phone video of a real call going wrong at a desk. This is not an advertisement and must not look like one.`,
      `SETTING. A desk in a plain office with a low partition behind it, a wire mesh pen cup, a half-eaten sandwich in a plain unprinted paper wrapper, a landline handset. Daylight from the left, overhead fluorescents.`,
      `CHARACTERS. A man in his early thirties, close-cropped hair, plain black quarter-zip, a wired headset with the boom arm pushed up out of the way, holding the landline handset to his ear with one shoulder. A woman in her fifties, glasses on a beaded chain, cardigan, standing behind him at a filing cabinet whose drawer label holders are empty, only half attending.`,
      `BEATS.`,
      `0-3s: Already on the call, warm and rehearsed: "Hi, is Dan around? We spoke in January."`,
      `3-6s: He listens. His expression does not change at all. He says, evenly: "March."`,
      `6-9s: He listens again, and then repeats it back for the room: "He left in March. Right."`,
      `9-12s: He puts the handset down. Without turning around, the woman at the filing cabinet says, "That's the third one this month."`,
      `12-15s: He picks up the sandwich, looks at it, and puts it down again. Hold.`,
      `AUDIO. Diegetic only: the handset settling into its cradle, a filing cabinet drawer rolling, room tone. No music.`,
      `THE OTHER END OF THE CALL IS SILENT. The person on the phone is never heard at all: no voice, no murmur, no tinny speech, no muffled words, not one syllable comes out of the handset at any point. In every gap between his lines there is only room tone, and the viewer understands the other side entirely from his face and from what he repeats back. Nobody except the two people described above ever speaks in this video, and neither of them says anything beyond the quoted lines: no name is given, no company is announced, no greeting is added, nothing is improvised into any pause.`,
      ...common(SKETCH_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-ip-lookup-b13v06-shipped-to-a-basement",
    company: "1lookup",
    title: "Shipped To A Basement",
    product: "IP Lookup (/products/ip-lookup)",
    format: "sketch, two people in a warehouse office",
    research: "Threshold self-diagnosis: the viewer qualifies themselves in the first second by recognising their own chargeback pattern. Distinct from batch 12's fraud clip, which was about signups, not shipments.",
    approvedCopy: "'Proxy and VPN detection' and 'geolocation' are the product page's own terms.",
    claimNotes: "The chargeback count is their own month, in-scene fiction. No card network or carrier named. Brand not spoken.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical phone video of a real conversation in the glassed-in office of a small warehouse. This is not an advertisement and must not look like one.`,
      `SETTING. A small office partitioned off inside a warehouse: a metal desk, a swivel chair with a cracked armrest, a wall of cardboard shipping boxes visible through the glass behind them, a roll of packing tape, a box cutter, a dead plant. Every cardboard box in shot, including the one the man is carrying, is plain unprinted brown corrugated card with no label, no shipping sticker, no barcode, no stamp, no writing and no logo on any face. The packing tape is plain clear tape with no printing on it, and the box cutter carries no branding. Harsh overhead strip lighting.`,
      `CHARACTERS. A woman in her forties, gray-streaked hair in a bun, fleece vest over a t-shirt, holding a clipboard whose paper carries no legible writing. A man in his mid-twenties, beanie, hoodie, standing in the doorway with a box under one arm.`,
      `BEATS.`,
      `0-3s: She is already talking, holding the clipboard down at her side: "Nine chargebacks. All the same week."`,
      `3-6s: He shifts the box. "Different names though. Different addresses."`,
      `6-10s: She looks up at him, completely level: "Same building. In a country we don't ship to."`,
      `10-13s: He thinks about that. "So the addresses were fine and the connection wasn't."`,
      `13-15s: She taps the clipboard once against her leg and looks past him at the boxes. Hold.`,
      `AUDIO. Diegetic only: a warehouse fan, a pallet truck somewhere far off, packing tape being pulled and stopping, the clipboard tapping. No music.`,
      ...common(SKETCH_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-hlr-lookup-b13v07-code-went-nowhere",
    company: "1lookup",
    title: "The Code Went Nowhere",
    product: "HLR Lookup (/products/hlr-lookup)",
    format: "UGC selfie, support lead on a late shift",
    research: "Confession hook, one of Motion's validated tactics. HLR is the one product whose mechanic (is this subscriber reachable right now) is genuinely different from plain validation, so the clip is built on 'right now'. Cut as a selfie so it does not repeat batch 12's c13, which was a deadpan office two-hander with the same underlying joke.",
    approvedCopy: "'Reachability' and 'live subscriber status' are the product page's own words.",
    claimNotes: "The forty tickets are her own queue, in-scene fiction. No carrier named anywhere. Brand never spoken; the end card carries it.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical selfie video that a woman in her early forties shot on her own phone at a support desk late in the day and posted. This is not an advertisement and must not look like one.`,
      `CHARACTER. Early forties, box-braided hair tied back, round wire-framed glasses, a plain black cardigan, a headset pushed down around her neck. Behind her is a mostly empty office with a low partition, the overhead lights off on the far side, and one window with the last of the daylight in it.`,
      `BEATS.`,
      `0-3s: Straight into the lens, worn down, not performing it: "Forty people say the code never came."`,
      `3-6s: "The numbers are valid. We check every digit."`,
      `6-10s: A small helpless gesture with one hand. "The format is beautiful. The phone stopped existing in twenty-nineteen."`,
      `10-13s: She pushes her glasses up. "We need to know it is alive. Not that it is tidy."`,
      `13-15s: She looks off to the side at the empty office, then back to the lens, and the clip ends.`,
      `AUDIO. Diegetic only: a very quiet office, an air handler, the headset cable tapping the desk once, a phone vibrating face down against a desk somewhere near, vibration only, no ringtone and no melody. No music.`,
      ...common(UGC_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-property-lookup-b13v08-drive-by",
    company: "1lookup",
    title: "The Drive-By",
    product: "Property Lookup (/products/property-lookup)",
    format: "UGC selfie, in a parked car",
    research: "Founder/operator selfie in the field, the format that beat polished talking heads 86 to 14 in Opascope's portfolio data. Real estate investors are a proven paid audience for this catalogue: skip trace already sells to them.",
    approvedCopy: "'Beds, baths, square footage, year built, listing status and last sale' is the product page's own field list, compressed.",
    claimNotes: "The drive time and the count of houses are his own day, in-scene fiction. Brand spoken once with the per-syllable anchor.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical selfie video that a man shot on his own phone in a parked car and posted. This is not an advertisement and must not look like one.`,
      `CHARACTER. A man in his late thirties, stubble, a plain navy ball cap with no logo or lettering on it at all, a gray hoodie, sunglasses pushed up on the cap. He is in the driver's seat of an ordinary American sedan, seatbelt off, one hand on the wheel. The steering wheel boss, the dashboard and the door trim carry no maker's badge, no lettering and no logo of any kind. Through the window behind him is a quiet American residential street with a single-story house, a mailbox on a post, a driveway and a lawn, all slightly out of focus.`,
      `BEATS.`,
      `0-3s: Straight into the lens, flat: "I drove forty minutes to count bedrooms."`,
      `3-7s: He tips his head back toward the window. "Three. It's three. Which is what the listing said in twenty-twenty-two."`,
      `7-10s: Back to the lens. "That's the whole trip. That's my morning."`,
      `10-13s: More matter of fact, half a smile that he suppresses: "You get the whole record off the address."`,
      `13-15s: He reaches up and pulls his sunglasses down off the cap. The clip ends as he does it.`,
      `AUDIO. Diegetic only: the faint tick of a cooling engine, one distant dog, a car passing on the street behind, the fabric of the hoodie against the seat. The car radio is off. No music.`,
      ...common(UGC_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-bulk-audio-transcription-b13v09-nine-hours",
    company: "1lookup",
    title: "Nine Hours Of Calls",
    product: "Bulk Audio Transcription (/products/bulk-audio-transcription)",
    format: "UGC selfie, late in the day",
    research: "Status-flex with a twist, the ClickUp live hook archetype, inverted: the flex is that she listened to everything, and the twist is what that cost her. Transcription reaches a different buyer than the phone products, which widens the account's audience pool rather than splitting it.",
    approvedCopy: "'Speaker labels, word-level timestamps and 95+ languages' is the product page's own list.",
    claimNotes: "Nine hours is her own day, in-scene fiction. Brand not spoken; the end card carries it.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical selfie video that a woman in her mid-thirties shot on her own phone in an empty office late in the day and posted. This is not an advertisement and must not look like one.`,
      `CHARACTER. Mid-thirties, straight brown hair tucked behind one ear, a plain white t-shirt, a lanyard with a blank unprinted card on it, no makeup, genuinely tired. Behind her the office is empty, chairs pushed in, the overhead lights off on that side, low warm daylight coming in sideways from a window.`,
      `BEATS.`,
      `0-3s: Straight to the lens, worn out, not performing it: "Nine hours of our own sales calls. Today."`,
      `3-7s: She holds up one finger. "One useful thing. One. It was in hour seven."`,
      `7-10s: She lets the hand drop. "Everyone went home. I'm still here."`,
      `10-13s: Slightly brighter, practical: "You can just transcribe all of it."`,
      `13-15s: She looks off to the side at the empty room, then back to the lens, and the clip ends.`,
      `AUDIO. Diegetic only: a very quiet empty office, an air handler, one distant door closing in a corridor, her chair creaking as she shifts, a laptop fan spinning up and settling, the lanyard card tapping her collarbone once. No music.`,
      ...common(UGC_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-ad-library-lookup-b13v10-what-are-they-running",
    company: "1lookup",
    title: "What Are They Running",
    product: "Ad Library Lookup (/products/ad-library-lookup)",
    format: "sketch, agency meeting room",
    research: "Direct callout / ICP qualify: the viewer is an agency owner and the first line is a question their client asks them every month. The four-library coverage is a genuine capability gap in the category.",
    approvedCopy: "'Meta, TikTok, LinkedIn and Google ad libraries with one API call' is the product page's own sentence, compressed to 'all four'.",
    claimNotes: "Named platforms appear as coverage, which the page states verbatim. No logos are shown and no competitor tool is named. Brand not spoken.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical phone video of a real moment in a small agency's meeting room. This is not an advertisement and must not look like one.`,
      `SETTING. A small meeting room with a laminate table, four mismatched chairs, a jug of water and two glasses, vertical blinds. Daylight plus one overhead panel light.`,
      `CHARACTERS. A man in his fifties, heavy build, silver hair combed flat, jowly face, well-pressed shirt with no tie, the client. He sits at the near end of the table, three-quarters turned away from the camera in the lower part of the frame, both hands flat on the table. A woman in her thirties, narrow face, dark hair in a bun, blazer over a plain top, the agency lead, sitting further down the table facing him with a closed notebook, so the two of them stack top and bottom of the tall frame rather than side by side.`,
      `BEATS.`,
      `0-3s: The client is already asking, pleasantly, the way he asks every month: "What are our competitors running right now?"`,
      `3-6s: She opens the notebook, and answers honestly: "I'll find out and send it over Thursday."`,
      `6-9s: He nods. "You said that last month too."`,
      `9-12s: She closes the notebook again. "It's four different libraries. Somebody has to go and look."`,
      `12-15s: He pours himself a glass of water and does not say anything. Hold on the two of them.`,
      `AUDIO. Diegetic only: water pouring into a glass, the notebook closing, a chair shifting, faint traffic through the blinds. No music.`,
      ...common(SKETCH_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-mcp-b13v11-ask-the-agent",
    company: "1lookup",
    title: "Ask The Agent",
    product: "MCP Server (/products/mcp)",
    format: "sketch, two developers",
    research: "Category-education video for a category with no advertising at all. The site's own framing, one URL and no API key to paste, is the entire wedge, and it is the newest thing on the site.",
    approvedCopy: "'Add one URL to Claude or Cursor' and 'no API key to paste' are the product page's own words. Five tools, same credits as the API.",
    claimNotes: "The named AI tools appear because the product page names them as what it connects to. No logos shown. Brand not spoken; the end card carries it.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical phone video of a real exchange between two developers at adjacent desks. This is not an advertisement and must not look like one.`,
      `SETTING. Two desks side by side in a plain office. Mechanical keyboards, a pair of over-ear headphones around a neck, an unbranded water bottle, a small unlabeled cardboard box being used as a monitor riser. He leans in from the next desk toward the camera so the two of them sit one behind the other in the tall frame, not side by side. Both monitors are turned fully away from camera so only their plain gray backs are visible. Overhead fluorescents.`,
      `CHARACTERS. A woman in her late twenties, short bleached hair, plain black t-shirt, sitting with her feet up on a drawer. A man in his early thirties, beard, plaid overshirt, leaning across from the next desk.`,
      `BEATS.`,
      `0-3s: He is already mid-question, holding a sticky note that carries no legible writing: "Where does the key go? I have it."`,
      `3-6s: She does not turn around. "There isn't one. You paste a URL into the agent."`,
      `6-9s: He looks at the sticky note in his hand. "I wrote this out by hand."`,
      `9-13s: She swivels around finally. "Then it just runs the lookups itself. You ask, it goes."`,
      `13-15s: He slowly crumples the sticky note into a ball. Hold on his hand.`,
      `AUDIO. Diegetic only: mechanical keyboard clacking, a chair swivelling, paper crumpling, low room tone. No music.`,
      ...common(SKETCH_LOOK),
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1lookup-platform-b13v12-renewal-wall",
    company: "1lookup",
    title: "The Renewal Wall",
    product: "Platform (41 data products, one API key)",
    format: "sketch, finance reading renewals aloud",
    research: "The dollar-denominated offer as the headline, Rippling-style, applied to the one claim in this catalogue no competitor can copy: 41 products on one key and one balance. Every prior 1Lookup video sells one product; none has ever sold the platform, which is the actual reason a buyer consolidates.",
    approvedCopy: "'41 data products on one API key' and 'one shared credit balance' are the hero subheadline verbatim. 'Seven-day free trial' and 'nothing charged today' are from /free-trial.",
    claimNotes: "The eleven renewals are the company's own invoices, in-scene fiction, and no vendor is ever named. The only product number spoken is 41, which is DATA_PRODUCT_COUNT. Brand spoken once with the per-syllable anchor.",
    aspect_ratio: "9:16",
    duration: "15",
    prompt: [
      `A vertical phone video of a real budget conversation in a small company's finance corner. This is not an advertisement and must not look like one.`,
      `SETTING. A corner desk with a wire tray of paper, an old mechanical adding machine with a plain metal body and no display, a stapler, a mug with no printing on it, and a metal filing cabinet whose drawer label holders are empty, with a plant on top of it that has gone brown at the tips. A closed laptop. Beige wall, one window with the blind at half mast. Overhead fluorescents.`,
      `CHARACTERS. A man in his fifties, reading glasses low on his nose, short-sleeved shirt, holding a sheet of paper that carries no legible writing. A woman in her early thirties, plain rust-colored sweater, standing beside the desk with her arms crossed loosely.`,
      `BEATS.`,
      `0-3s: He is already reading down the page, flat and unhurried: "Eleven renewals. All of them data."`,
      `3-6s: She answers without defending it: "They are all different vendors, with their own logins and their own bills."`,
      `6-10s: He takes the glasses off. "Eleven balances. Every one runs out on a different Tuesday."`,
      `10-13s: She uncrosses her arms. "One key. One balance. Forty-one of these products."`,
      `13-15s: He puts the paper down on the desk and leaves his hand flat on top of it. Hold.`,
      `AUDIO. Diegetic only: paper being set down on a desk, the adding machine's keys under an idle finger, a filing cabinet somewhere, room tone. No music.`,
      ...common(SKETCH_LOOK),
    ].join("\n\n"),
  },
];
