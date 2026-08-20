// ESA Card | weird-animal variants of u6-rabbit | 2026-08-19
//
// Robby: "Exact same video ad script and exact banner style and text - but replace them with
// weird animals: Turtle, Baby alligator, Pet egg, A dog/cat talking with a pet human, Raven,
// Hedgehog, Snake, Chicken."
//
// u6-rabbit is the account's best landing-page-to-checkout rate (5 checkouts at $0.97) and
// carries one sale. So its script is held FIXED and the animal is the only variable:
//   beat 1  "Registered my <animal> for <pronoun> emotional support animal card this morning."
//   beat 2  "Took three minutes. My coffee was still hot."          <- identical in every clip
//   beat 3  "Now <pronoun> has better ID than half the people I know. <one-line tag>"
//   beat 4  NOBODY SPEAKS. The animal does one delightful thing and the clip ends mid-moment.
// Same kitchen table, same propped front camera, same morning light, same 15 seconds.
//
// The hardened blocks below (SPEECH_UGC, CARD_RULE, BAN, UGC_TONE, SHARP) are copied verbatim
// from `../prompts-ugc-examples.mjs`. They encode eight batches of paid-for lessons and are
// not to be edited per clip.
//
// The pet egg is deliberately NOT here. It is a banner only: a spoken line registering an egg
// would be a claim that needs a footnote to be true, and the rule is to delete the line rather
// than add the footnote (docs/ads/policy.md §0). On a banner the egg is a picture next to copy
// that promises only the card, the price and the absence of renewals, all of which stay true.
//
// w7 is the one structural departure Robby asked for by name ("a dog/cat talking with a pet
// human"). The dog speaks the same script about its own card, so the product claim is
// unchanged: the animal is the one that gets registered.

import { US_CAST } from "../../_scripts/seedance-locale.mjs";

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

const SHARP =
  "SHARPNESS: the image is crisply focused throughout, with fine crisp detail in fur, whiskers, eyes and skin. " +
  "Handheld but never blurry: no soft focus, no haze, no smearing, no low-resolution look.";

// Every clip is the u6-rabbit frame: same table, same propped camera, same light, same beats.
// `animal` describes the co-star, `subject`/`pron` carry the swap through the fixed lines,
// `tag` is the one clause that is allowed to change, and `payoff` is the wordless final beat.
const clip = ({ animal, subject, pron, poss, tag, payoff, audio, speaker = "WOMAN", who =
  "a woman at her kitchen table" }) =>
  "A fifteen-second vertical selfie video of " + who + " with " + animal.short + " on the table. " +
  "OPTICS: phone front camera propped against a fruit bowl, bright morning kitchen light, natural colour. " + SHARP + " " +
  "ANIMAL: " + animal.full + " " +
  "BEATS. 0.0-2.5s she looks into the lens, " + animal.idle + " beside her mug. The room is quiet while she speaks. " +
  speaker + ": \"Registered my " + subject + " for " + poss + " emotional support animal card this morning.\" " +
  "2.5-7.0s " + animal.idle2 + ". " +
  speaker + ": \"Took three minutes. My coffee was still hot.\" " +
  "7.0-11.5s she holds the small white card beside " + animal.short + ", the tiny photo next to the real " + subject + ". " +
  speaker + ": \"Now " + pron + " has better ID than half the people I know. " + tag + "\" " +
  "11.5-15.0s NOBODY SPEAKS. " + payoff + " The clip ends mid-moment. " +
  UGC_TONE + " AUDIO: diegetic only, quiet kitchen, " + audio + ". No music. " +
  CARD_RULE + " " + SPEECH_UGC + " " + BAN;

export const ADS = [
  { id: "w1-turtle", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt: clip({
      animal: {
        short: "a small pet turtle",
        full: "a small pet turtle with a glossy olive-green domed shell and bright alert eyes, walking very slowly across the table.",
        idle: "the turtle inching along",
        idle2: "the turtle keeps inching forward, one deliberate leg at a time",
      },
      subject: "turtle", pron: "he", poss: "his",
      tag: "Look at that little face.",
      payoff: "The turtle walks slowly onto the card, stops dead in the middle of it, and settles there like " +
        "it was always his. Her mouth falls open in silent delight.",
      audio: "faint claws ticking on wood",
    }) },

  { id: "w2-alligator", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt: clip({
      animal: {
        short: "a baby American alligator",
        full: "a baby American alligator about a foot long, dark and glossy with pale yellow bands, sitting " +
          "perfectly still on the table like a very calm handbag.",
        idle: "the little alligator completely motionless",
        idle2: "the alligator does not move a single muscle",
      },
      subject: "alligator", pron: "he", poss: "his",
      tag: "Look at that smile.",
      payoff: "The alligator opens his mouth in one enormous unhurried yawn, then lays his chin flat on the " +
        "table right beside the card and closes his eyes. Her mouth falls open in silent delight.",
      audio: "one soft jaw clop in the final beat",
    }) },

  { id: "w3-hedgehog", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt: clip({
      animal: {
        short: "a small hedgehog",
        full: "a small hedgehog with a pale pink nose and tiny front paws, snuffling busily around a saucer on the table.",
        idle: "the hedgehog snuffling",
        idle2: "the hedgehog keeps snuffling in tight circles, spines flattening and lifting",
      },
      subject: "hedgehog", pron: "she", poss: "her",
      tag: "Look at that nose.",
      payoff: "The hedgehog sniffs the card twice, then curls into one tight perfect ball pressed against the " +
        "edge of it. Her mouth falls open in silent delight.",
      audio: "faint snuffling",
    }) },

  { id: "w4-chicken", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt: clip({
      animal: {
        short: "a plump speckled hen",
        full: "a plump speckled grey-and-white hen with a bright red comb, standing on the kitchen table with " +
          "total confidence, head jerking in small precise movements.",
        idle: "the hen surveying the table",
        idle2: "the hen tilts her head hard to one side and stares at the lens with one eye",
      },
      subject: "chicken", pron: "she", poss: "her",
      tag: "Look at that face.",
      payoff: "The hen steps onto the card, lowers herself onto it in one slow settle exactly as if it were an " +
        "egg, and fluffs up. Her mouth falls open in silent delight.",
      audio: "one low contented cluck in the final beat",
    }) },

  { id: "w5-raven", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt: clip({
      animal: {
        short: "a glossy black raven",
        full: "a large glossy iridescent black raven standing on the table, entirely at ease, turning its head " +
          "in sharp intelligent movements.",
        idle: "the raven watching her sideways",
        idle2: "the raven hops one neat step closer and studies her hand",
      },
      subject: "raven", pron: "he", poss: "his",
      tag: "Look at him.",
      payoff: "The raven takes the card in his beak, hops two decisive steps sideways down the table and turns " +
        "his back with it. She reaches after it and stops. Her mouth falls open in silent outrage and delight.",
      audio: "claws on wood and one low croak in the final beat",
    }) },

  { id: "w6-snake", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt: clip({
      animal: {
        short: "a ball python",
        full: "a ball python patterned in tan and dark brown, loosely coiled on the table and moving in slow " +
          "unhurried curves, calm and completely unbothered.",
        idle: "the python coiled loosely",
        idle2: "the python pours herself slowly a few inches across the wood",
      },
      subject: "snake", pron: "she", poss: "her",
      tag: "Look at that face.",
      payoff: "The python flows smoothly over the card and gathers herself into one neat coil directly on top " +
        "of it, head resting on the topmost loop. Her mouth falls open in silent delight.",
      audio: "faint dry scales sliding on wood",
    }) },

  // ── The one structural swap: the dog talks, the human is the pet. ──
  { id: "w7-dog-and-human", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video, filmed as a pet's own social video: a corgi sits upright in a " +
      "chair at a kitchen table talking straight into a propped phone, and a grown man is the household pet in " +
      "the background. " +
      "OPTICS: phone front camera propped against a fruit bowl on the table, bright morning kitchen light, " +
      "natural colour. " + SHARP + " " +
      "CHARACTERS: a corgi with enormous ears sitting upright in a kitchen chair, front paws resting on the " +
      "table edge, facing the lens and speaking with clearly synchronised mouth movement in a flat, calm, " +
      "matter-of-fact adult American voice. Behind him, softly out of focus, an ordinary man in his thirties " +
      "in a plain t-shirt sits cross-legged on the kitchen floor beside a large pet bowl, holding a tennis " +
      "ball in both hands and watching the dog with cheerful uncomplicated devotion. The man is the pet in " +
      "this house and is completely happy about it. " +
      "BEATS. 0.0-2.5s the corgi looks into the lens; the man on the floor waits behind him. The room is " +
      "quiet while the dog speaks. " +
      "DOG: \"Registered myself for my emotional support animal card this morning.\" " +
      "2.5-7.0s the man on the floor shuffles half a step closer on his knees, still holding the ball. " +
      "DOG: \"Took three minutes. My human's coffee was still hot.\" " +
      "7.0-11.5s the corgi nudges a small white card forward on the table with one paw, the tiny photo on it " +
      "next to his own real face. " +
      "DOG: \"Now I have better ID than half the people I know. Including him.\" " +
      "11.5-15.0s NOBODY SPEAKS. The man hopefully rolls the tennis ball onto the table. The corgi does not " +
      "look at it, does not look at him, and keeps holding eye contact with the lens. The clip ends mid-look. " +
      "TONE: filmed exactly like an ordinary person's phone video, deadpan-playful, never salesy, never " +
      "presenting. Real fur texture, real skin texture, imperfect framing, slight handheld wobble. " +
      "COMEDY RULE: played completely straight. Nobody in the scene knows they are in something funny. The " +
      "dog never mugs, never winks at the lens and never laughs at his own line. The man never speaks, never " +
      "reacts to the camera and is never humiliated or sad: he is delighted throughout. " +
      "AUDIO: diegetic only, quiet kitchen, the tennis ball rolling on wood in the final beat. No music. " +
      "SPEECH RULE: the only words spoken in the entire video are the three lines written inside quotation " +
      "marks above, and every one of them is spoken by the corgi, with his mouth moving in sync, facing the " +
      "phone's front camera. The man never speaks, never whispers and never makes a sound. Everything not " +
      "inside quotation marks is stage direction describing what happens on camera and must never be read " +
      "aloud, narrated, whispered or spoken by anyone under any circumstances. No narration, no voice-over, " +
      "no counting, no muttering, no improvised lines, no unwritten filler, no barking over the dialogue. " +
      "Where a beat says NOBODY SPEAKS, nobody speaks at all and the moment plays with room sound only. " +
      "PHRASE RULE, the single most important instruction in this prompt: the four words \"emotional support " +
      "animal card\" are said slowly, clearly and completely separately, as four distinct words with a small " +
      "gap between each one. Say EMOTIONAL, which rhymes with devotional and has four syllables, " +
      "ee-mo-shun-al. Then SUPPORT, which rhymes with report. Then ANIMAL, which has three syllables, " +
      "an-i-mal, and means a creature such as a dog or a cat. Then CARD, which rhymes with hard. The word " +
      "after SUPPORT is always ANIMAL. It is never rabbit, never agent, never compass, never abandon, never " +
      "any other word. Do not blend the four words together, do not slur them, do not abbreviate them to " +
      "letters, never say \"E S A\", never say \"eesa\", and never shorten the phrase. The speaker slows " +
      "down slightly for these four words. " +
      CARD_RULE + " " + BAN },
];
