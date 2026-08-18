// ESA Card | UGC talking-head examples | 2026-08-17
// Robby asked for UGC-style clips with viral potential on TikTok and for examples in chat.
// One real-seeming person talking straight into a front camera, phone-shot, the animal as
// co-star, hook inside the first second. Same hard rules as the approved batch: the speaker
// says the full phrase, the card is featureless, no on-screen text, no claims about housing,
// access or outcomes. These are EXAMPLES for Robby to judge; nothing ships anywhere.

// CAST AND LOCALE added 2026-08-18. These clips were rendered before it existed and came
// back with British casts and British streets for a US-only campaign; the block rides on the
// end of BAN so every prompt here picks it up if it is ever re-rendered. The beats above it
// still carry some British vocabulary, which the linter flags as warnings.
import { US_CAST } from "../_scripts/seedance-locale.mjs";

const SPEECH_UGC =
  "SPEECH RULE: the only words spoken in the entire video are the lines written inside quotation marks in the beats " +
  "below, and every line is spoken by the one person on camera, talking directly into the phone's front camera. " +
  "Everything in the beats that is NOT inside quotation marks is stage direction describing what happens on camera, " +
  "and must never be read aloud, narrated, whispered or spoken by anyone under any circumstances. No narration, no " +
  "voice-over, no counting, no muttering, no improvised lines, no unwritten filler. Where a beat says NOBODY SPEAKS, " +
  "nobody speaks at all and the moment plays with room sound only. " +
  "PHRASE RULE, the single most important instruction in this prompt: the four words \"emotional support animal card\" " +
  "are said slowly, clearly and completely separately, as four distinct words with a small gap between each one. " +
  "Say EMOTIONAL, which rhymes with devotional and has four syllables, ee-mo-shun-al. " +
  "Then SUPPORT, which rhymes with report. " +
  "Then ANIMAL, which has three syllables, an-i-mal, and means a creature such as a dog or a cat. " +
  "Then CARD, which rhymes with hard. " +
  "The word after SUPPORT is always ANIMAL. It is never rabbit, never agent, never compass, never abandon, never any " +
  "other word. Do not blend the four words together, do not slur them, do not abbreviate them to letters, never say " +
  "\"E S A\", never say \"eesa\", and never shorten the phrase. The speaker slows down slightly for these four words.";

const CARD_RULE =
  "CARD RULE: the ID card is a plain matte white credit-card-sized rectangle with a single small square photograph of " +
  "the animal in its upper left corner and three short featureless grey lines beside that photograph. That is the " +
  "complete and exhaustive contents of the card. No logo, no seal, no crest, no badge, no barcode, no QR code, no flag, " +
  "no readable writing and no numbers anywhere on it. Any other card shown from a wallet is a plain solid single-colour " +
  "rectangle with no text, no logos, no chip and no numbers. Any paperwork or screen otherwise visible is blank.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no lower thirds, no logos, no watermarks, no UI " +
  "overlays, no end card, no product shot at the end, no slow motion, no drone or crane moves, no lens flares, no " +
  "glowing particles, no teal-and-orange grade, no stock-footage look, no medical imagery, no clinic, no pill bottles, " +
  "no therapy couch, no bus, no train, no aeroplane, no airport, no public transport of any kind, no service-dog vest, " +
  "no labelled harness, no uniformed official. " +
  US_CAST;

const UGC_TONE =
  "TONE: an ordinary, likeable, real-seeming person filming themselves on a phone, deadpan-playful, never salesy, " +
  "never presenting. Real skin texture, imperfect framing, slight handheld wobble, the honest look of a video someone " +
  "shot for their own account. The animal is unmistakably adorable and steals the clip. Nothing ironic-mean, nothing " +
  "sad, nothing tense. COMEDY RULE: played completely straight, no mugging, no winking at the lens, no laughing at " +
  "your own line.";

export const ADS = [
  { id: "u1-better-id", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a woman in her parked car with her golden retriever. " +
      "OPTICS: phone front camera held at arm's length, daytime, natural light through the windscreen, natural colour. " +
      "ANIMAL: a golden retriever with a huge soft face sitting in the passenger seat, fully attentive to her. " +
      "BEATS. 0.0-2.5s she looks into the lens, the retriever's head already pushing into frame. " +
      "WOMAN: \"My dog has better ID than I do. Look at this.\" " +
      "2.5-7.0s she holds a small white card up beside the dog's face, comparing the photo on it to the real dog. " +
      "WOMAN: \"His photo. His name. A number anyone can look up.\" " +
      "7.0-11.5s the dog sniffs the card and tries to lick it; she pulls it just out of reach without looking away " +
      "from the lens. WOMAN: \"His emotional support animal card. Three minutes on my phone.\" " +
      "11.5-15.0s NOBODY SPEAKS. The dog gives up on the card and rests his chin on her shoulder, looking into the " +
      "lens with her. She leans her head against his. The clip ends mid-moment. " +
      UGC_TONE + " AUDIO: diegetic only, car interior quiet, the dog's breathing and collar tag. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  { id: "u2-wallet-ranked", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a woman at her kitchen counter with her enormous fluffy grey cat. " +
      "OPTICS: phone front camera propped against something on the counter, bright kitchen daylight, natural colour. " +
      "ANIMAL: a huge long-haired grey cat with a flat judgemental face, sitting on the counter staring into the lens. " +
      "BEATS. 0.0-2.5s she holds up an open wallet. WOMAN: \"Everything in my wallet, ranked, worst to best.\" " +
      "2.5-7.0s she flips quickly through two plain featureless cards, dropping each on the counter. " +
      "WOMAN: \"Bank card. Boring. Coffee card. Two stamps. Tragic.\" " +
      "7.0-11.5s she holds the small white card up right beside the cat's face, the tiny photo next to the real cat. " +
      "WOMAN: \"And her emotional support animal card. Best thing I own.\" " +
      "11.5-15.0s NOBODY SPEAKS. The cat slowly reaches out one paw and drags the card down flat on the counter, then " +
      "sits on it. The woman looks at the lens. The clip ends mid-look. " +
      UGC_TONE + " AUDIO: diegetic only, kitchen room tone, a loud purr, cards on the counter. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  { id: "u3-contributes-nothing", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a man on his sofa with a huge sleepy english bulldog across his lap. " +
      "OPTICS: phone front camera held above them, warm evening living-room lamplight, natural colour. " +
      "ANIMAL: an enormous wrinkly english bulldog, fast asleep across the man's lap, snoring audibly. " +
      "BEATS. 0.0-2.5s he looks into the lens, pinned under the sleeping dog. The room is quiet while he speaks. " +
      "MAN: \"This guy contributes nothing. Eats my food. Owns my sofa.\" " +
      "2.5-7.0s the bulldog sleeps silently. The man looks down at him, then back at the lens and speaks clearly into quiet room air. " +
      "MAN: \"And this week, he got himself an emotional support animal card.\" " +
      "7.0-11.5s he holds the small white card next to the sleeping dog's face, comparing the photo to the real thing. " +
      "MAN: \"Great photo, to be fair. Much better than my passport photo.\" " +
      "11.5-15.0s NOBODY SPEAKS. The bulldog opens one eye, looks at the card, sighs enormously and goes back to " +
      "sleep. The man pats him twice and leaves his hand there. The clip ends mid-moment. " +
      UGC_TONE + " AUDIO: diegetic only, living-room quiet. The dog is silent whenever the man speaks; one soft snore and one big sigh happen only in the final wordless beat. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },
];
const SHARP =
  "SHARPNESS: the image is crisply focused throughout, with fine crisp detail in fur, whiskers, eyes and skin. " +
  "Handheld but never blurry: no soft focus, no haze, no smearing, no low-resolution look.";

export const ADS_B2 = [
  { id: "u4-roommate", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a woman on her sofa with a tiny chihuahua standing on her lap. " +
      "OPTICS: phone front camera at arm's length, bright afternoon living-room daylight, natural colour. " + SHARP + " " +
      "ANIMAL: a tiny smooth-coat chihuahua with enormous eyes and paper-thin ears, standing on her lap, staring into the lens with total intensity. " +
      "BEATS. 0.0-2.5s she looks into the lens; the chihuahua is already staring at it. The room is quiet while she speaks. " +
      "WOMAN: \"My roommate contributes nothing and screams at the mailman.\" " +
      "2.5-7.0s the chihuahua keeps staring, motionless and self-important. " +
      "WOMAN: \"Still got him his own emotional support animal card.\" " +
      "7.0-11.5s she holds the small white card beside his tiny face, the photo next to the real dog. " +
      "WOMAN: \"Look at that photo. He is so proud of it. Ten out of ten, little man.\" " +
      "11.5-15.0s NOBODY SPEAKS. The chihuahua sniffs the card once, gives it a single tiny lick, then sits up " +
      "extremely straight and proud. She nods slowly at the lens. The clip ends mid-nod. " +
      UGC_TONE + " AUDIO: diegetic only, quiet living room. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  { id: "u5-photoshoot", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a man at his desk with a chunky orange cat loafed beside his laptop. " +
      "OPTICS: phone front camera propped on the desk, soft bright window daylight, natural colour. " + SHARP + " " +
      "ANIMAL: a chunky orange tabby cat loafed in a perfect bread shape beside the laptop, eyes half closed, deeply content. The laptop screen is a plain solid pale grey rectangle with nothing on it. " +
      "BEATS. 0.0-2.5s he looks into the lens. The room is quiet while he speaks. " +
      "MAN: \"She needed a photo for her emotional support animal card.\" " +
      "2.5-7.0s the cat slow-blinks at the lens, supremely unbothered. " +
      "MAN: \"We did a whole photoshoot. Forty-seven takes.\" " +
      "7.0-11.5s he holds the small white card beside the loafed cat, the tiny photo next to the real thing. " +
      "MAN: \"This is the one we went with. She chose it herself. Obviously. Look at it.\" " +
      "11.5-15.0s NOBODY SPEAKS. The cat leans forward, presses her nose briefly against the card, then loafs " +
      "back down even tighter. He looks at the lens. The clip ends mid-look. " +
      UGC_TONE + " AUDIO: diegetic only, quiet room, one soft purr in the final beat. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  { id: "u6-rabbit", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a woman at her kitchen table with a lop-eared rabbit on the table. " +
      "OPTICS: phone front camera propped against a fruit bowl, bright morning kitchen light, natural colour. " + SHARP + " " +
      "ANIMAL: a soft fawn lop-eared rabbit with huge drooping ears, sitting on the table calmly nibbling a small green leaf. " +
      "BEATS. 0.0-2.5s she looks into the lens, the rabbit nibbling beside her mug. The room is quiet while she speaks. " +
      "WOMAN: \"Registered my rabbit for her emotional support animal card this morning.\" " +
      "2.5-7.0s the rabbit keeps nibbling, ears swaying slightly. " +
      "WOMAN: \"Took three minutes. My coffee was still hot.\" " +
      "7.0-11.5s she holds the small white card beside the rabbit, the tiny photo next to the real rabbit. " +
      "WOMAN: \"Now she has better ID than half the people I know. Look at those ears.\" " +
      "11.5-15.0s NOBODY SPEAKS. The rabbit noses the card once, then flops over onto its side in one sudden " +
      "contented motion. Her mouth falls open in silent delight. The clip ends mid-gasp. " +
      UGC_TONE + " AUDIO: diegetic only, quiet kitchen, faint nibbling. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  { id: "u7-fourteen", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a man on a porch step at golden hour with an old yellow labrador asleep against his leg. " +
      "OPTICS: phone front camera at arm's length, warm low golden-hour sunlight, natural colour, soft warm tones. " + SHARP + " " +
      "ANIMAL: a fourteen-year-old yellow labrador with a fully grey muzzle and grey eyebrows, deeply asleep against the man's leg, breathing slowly and silently. " +
      "BEATS. 0.0-2.5s he looks into the lens, one hand resting on the sleeping dog. The evening is quiet while he speaks. " +
      "MAN: \"He is fourteen years old now. Sleeps twenty hours a day.\" " +
      "2.5-7.0s he strokes one grey ear; the dog's tail thumps once without waking. " +
      "MAN: \"Still the single best decision I have ever made.\" " +
      "7.0-11.5s he holds the small white card beside the sleeping grey face, the photo next to the real dog. " +
      "MAN: \"His emotional support animal card came this week. That photo? Distinguished.\" " +
      "11.5-15.0s NOBODY SPEAKS. The old dog wakes gently, lifts his head, looks up at the man and rests his chin " +
      "on the man's knee. The man leaves his hand on the dog's head. The clip ends mid-moment. " +
      UGC_TONE + " AUDIO: diegetic only, quiet evening, distant birds, one slow dog sigh in the final beat. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  { id: "u8-drama", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a woman sitting on her living-room floor next to a husky lying flat on its side in maximum drama. " +
      "OPTICS: phone front camera at arm's length, bright natural daylight, natural colour. " + SHARP + " " +
      "ANIMAL: a black-and-white siberian husky with pale blue eyes, lying flat on its side on the rug in a theatrical sprawl, completely silent. " +
      "BEATS. 0.0-2.5s she looks into the lens; the husky lies sprawled beside her. The room is quiet while she speaks. " +
      "WOMAN: \"This is the most dramatic animal alive.\" " +
      "2.5-7.0s the husky rolls its head back theatrically, still completely silent. " +
      "WOMAN: \"The vacuum? Crisis. Dinner, two minutes late? Crisis.\" " +
      "7.0-11.5s she holds the small white card next to the husky's face; the husky side-eyes it without lifting its head. " +
      "WOMAN: \"But his emotional support animal card photo? Flawless. One take. He knows exactly what he is doing.\" " +
      "11.5-15.0s NOBODY SPEAKS. The husky lifts its nose to the ceiling and lets out one short, theatrical, " +
      "musical howl, then flops flat again. She closes her eyes with the patience of a saint. The clip ends there. " +
      UGC_TONE + " AUDIO: diegetic only, quiet room; the only loud sound is the single short howl in the final wordless beat. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  { id: "u9-supervisor", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a man at a home-office desk with a tuxedo cat sitting on his laptop keyboard. " +
      "OPTICS: phone front camera propped on the desk, bright neutral daylight, natural colour. " + SHARP + " " +
      "ANIMAL: a sleek black-and-white tuxedo cat with white paws sitting squarely on the laptop keyboard, staring into the lens with cold authority. The laptop screen is a plain solid pale grey rectangle with nothing on it. " +
      "BEATS. 0.0-2.5s he looks into the lens; the cat is already staring at it from the keyboard. The room is quiet while he speaks. " +
      "MAN: \"She supervises everything I do. Every email. Every call.\" " +
      "2.5-7.0s the cat does not move a muscle. " +
      "MAN: \"Zero feedback. Just judgement. So I ordered her an emotional support animal card.\" " +
      "7.0-11.5s he holds the small white card beside the cat, the tiny photo next to the real cat. " +
      "MAN: \"The photo captures the judgement perfectly. That is her whole personality.\" " +
      "11.5-15.0s NOBODY SPEAKS. The cat looks at the card, looks back at him, and slowly lies down across the " +
      "entire keyboard while holding eye contact with the lens. He exhales through his nose. The clip ends there. " +
      UGC_TONE + " AUDIO: diegetic only, quiet room. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },
];

export const ALL_ADS = [...ADS, ...ADS_B2];
