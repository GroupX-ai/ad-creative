// ESA Card | "the turn" | 2026-08-21
//
// Nadav asked for the classic before/after: someone is refused entry to a restaurant or a
// train with their animal, they get an emotional support animal card, and now they are let in.
//
// That ad cannot be made. It is false (an emotional support animal card grants no public
// access anywhere), and it is banned three separate times by our own rules:
//   - docs/ads/policy.md §1.2  "Take your emotional support animal anywhere" is a red claim,
//                              and "the ad may describe what the customer receives, it may not
//                              describe what the customer will be allowed to do".
//   - docs/ads/policy.md §4    before-and-after narratives are the visual form of an outcome
//                              claim, and outcome claims about buildings, venues and airlines
//                              are prohibited by Meta.
//   - docs/ads/policy.md §6    state misrepresentation statutes: "never write copy that
//                              suggests the customer use the card to claim rights they do not
//                              have. Not 'show this card and walk right in', not 'for
//                              restaurants, shops and flights'."
// The BAN block below has forbidden trains, buses, airports and uniformed officials since the
// first batch, so a prompt of the literal ask could not even reach fal.
//
// What survives is the STRUCTURE, which is the good half of the idea and which this account
// has never run: something is missing or blocked, then it is resolved, then relief. The two
// scripts here keep that spine and move the obstacle off the doorway.
//   t1  the obstacle is the day she cleared for paperwork. It takes three minutes.
//   t2  the obstacle is that the animal is the only one in the house with nothing on the wall.
//
// The house rule this batch is built on, hardened in the heart-tug batch and now promoted into
// docs/ads/policy.md §6: THE CARD IS NEVER THE ANSWER TO A PERMISSION QUESTION. No gatekeeper
// ever rules on it. Nobody is refused anything on camera.
//
// Every shared block (SPEECH, SPEECH_UGC, CARD_RULE, BAN, UGC_TONE, WHOLESOME, SHARP) is the
// hardened version from ../prompts-heart-tug.mjs and ../prompts-ugc-examples.mjs, copied
// verbatim. They encode ten batches of paid-for lessons and are not edited per clip.

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
  "\"E S A\", never say \"eesa\", and never shorten the phrase. The speaker slows down slightly for these four words. " +
  "ONSET RULE: wherever the phrase appears it begins its own sentence. The speaker takes a short breath and a clear " +
  "pause immediately before EMOTIONAL, starts the word cleanly from silence, and does not run the previous words into " +
  "it. This matters because the first word of the phrase is the one that gets swallowed. " +
 "COLLISION RULE, added after a take that ran \"animal card. Certificate\" together and said \"emotional support Weeder Red\": no word beginning with a hard C or K sound may follow CARD. The speaker closes the word CARD cleanly, stops, and takes a clear pause before anything else is said.";

const SPEECH =
  "SPEECH RULE: the only words spoken in the entire video are the lines written inside quotation marks in the beats " +
  "below, spoken by the character named for each line. Everything in the beats that is NOT inside quotation marks is " +
  "stage direction describing what happens on camera, and must never be read aloud, narrated, whispered or spoken by " +
  "anyone under any circumstances. No narration, no voice-over, no counting, no muttering, no improvised lines, no " +
  "unwritten filler. Where a beat says NOBODY SPEAKS, nobody speaks at all and the moment plays with room sound only. " +
  "PHRASE RULE, the single most important instruction in this prompt: the four words \"emotional support animal card\" " +
  "are said slowly, clearly and completely separately, as four distinct words with a small gap between each one. " +
  "Say EMOTIONAL, which rhymes with devotional and has four syllables, ee-mo-shun-al. " +
  "Then SUPPORT, which rhymes with report. " +
  "Then ANIMAL, which has three syllables, an-i-mal, and means a creature such as a dog or a cat. " +
  "Then CARD, which rhymes with hard. " +
  "The word after SUPPORT is always ANIMAL. It is never rabbit, never agent, never compass, never abandon, never any " +
  "other word. Do not blend the four words together, do not slur them, do not abbreviate them to letters, never say " +
  "\"E S A\", never say \"eesa\", and never shorten the phrase. The speaker slows down slightly for these four words. " +
  "ONSET RULE: wherever the phrase appears it begins its own sentence. The speaker takes a short breath and a clear " +
  "pause immediately before EMOTIONAL, starts the word cleanly from silence, and does not run the previous words into " +
  "it. This matters because the first word of the phrase is the one that gets swallowed. " +
 "COLLISION RULE, added after a take that ran \"animal card. Certificate\" together and said \"emotional support Weeder Red\": no word beginning with a hard C or K sound may follow CARD. The speaker closes the word CARD cleanly, stops, and takes a clear pause before anything else is said.";

const CARD_RULE =
  "CARD RULE: the ID card is a plain matte white credit-card-sized rectangle with a single small square photograph of " +
  "the animal in its upper left corner and three short featureless gray lines beside that photograph. That is the " +
  "complete and exhaustive contents of the card. No logo, no seal, no crest, no badge, no barcode, no QR code, no flag, " +
  "no readable writing and no numbers anywhere on it. Any paperwork or screen otherwise visible is blank: forms are " +
  "cream paper with short featureless gray lines and nothing else, and any phone or laptop screen is a plain solid " +
  "pale gray rectangle with nothing on it at all.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no lower thirds, no logos, no watermarks, no UI " +
  "overlays, no end card, no product shot at the end, no slow motion, no drone or crane moves, no lens flares, no " +
  "glowing particles, no teal-and-orange grade, no stock-footage look, no medical imagery, no clinic, no scrubs, no " +
  "pill bottles, no therapy couch, no bus, no train, no airplane, no airport, no public transport of any kind, no " +
  "restaurant, no store, no venue, no doorway being guarded, no velvet rope, no waiting line, no reception desk, no service-dog vest, " +
  "no labeled harness, no uniformed official, no signage, no readable paper anywhere. Nobody in this video is refused " +
  "anything, turned away, blocked, stopped or judged by anyone, and nobody asks anyone for permission. " +
  "CAST RULE: every person on camera is a completely ordinary, unremarkable, generic-looking member of the public with " +
  "an everyday physiognomy, and is not and does not resemble any real, famous or recognizable person, actor or public " +
  "figure. " +
  US_CAST;

const UGC_TONE =
  "TONE: an ordinary, likeable, real-seeming person filming themselves on a phone, deadpan-playful, never salesy, " +
  "never presenting. Real skin texture, imperfect framing, slight handheld wobble, the honest look of a video someone " +
  "shot for their own account. The animal is unmistakably adorable and steals the clip. Nothing ironic-mean, nothing " +
  "sad, nothing tense. COMEDY RULE: played completely straight, no mugging, no winking at the lens, no laughing at " +
  "your own line.";

const WHOLESOME =
  "TONE: wholesome, warm and ordinary. Everyone in shot is kind to everyone else. The animal is the visual star of the " +
  "clip and is unmistakably adorable in every frame: soft, expressive, doing small endearing things without being " +
  "made to perform. Nothing ironic, nothing sad, nothing tense.";

const SHARP =
  "SHARPNESS: the image is crisply focused throughout, with fine crisp detail in fur, whiskers, eyes and skin. " +
  "Handheld but never blurry: no soft focus, no haze, no smearing, no low-resolution look.";

export const ADS = [
  // The obstacle is the whole day she set aside for it. 32 spoken words. Hook is 10 syllables.
  { id: "t1-whole-saturday", title: "Whole Saturday", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical selfie video of a woman at her kitchen table with a corgi sitting on the chair beside her. " +
      "OPTICS: phone front camera propped against a fruit bowl, bright late-morning kitchen light, natural color. " + SHARP + " " +
      "ANIMAL: a stout tricolor Pembroke corgi with enormous upright ears, short legs and a permanently pleased " +
      "expression, sitting up on the chair beside her with his chest against the edge of the table. " +
      "PROPS: an open empty cream folder squared up in front of her with a pen laid across it, a fresh yellow legal " +
      "pad and a mug beside it, all arranged like someone about to start a long job. The folder and the pad are blank " +
      "cream and yellow paper with no writing on them at all. " +
      "BEATS. 0.0-3.0s she looks straight into the lens with the folder open in front of her and the pen already in " +
      "her hand, braced for a long morning. The room is quiet while she speaks. " +
      "WOMAN: \"I blocked out my whole Saturday for this.\" " +
      "3.0-7.5s she puts the pen down on the pad and turns her phone face down on the table. The corgi watches the pen " +
      "land and then looks back up at her. " +
      "WOMAN: \"So I registered him. Emotional support animal card. Three minutes, start to finish.\" " +
      "7.5-11.5s she holds a plain matte white card up beside the corgi's face, the small photograph on the card right " +
      "next to the real dog, and looks between the two. " +
      "WOMAN: \"Thirty-nine dollars. One time. Look at the little face on it.\" " +
      "11.5-15.0s NOBODY SPEAKS. The corgi steps carefully off the chair onto the table, turns around once on the open " +
      "empty folder and lies down flat across it, filling it completely. She looks at the lens without moving. The clip " +
      "ends mid-look. " +
      UGC_TONE + " AUDIO: diegetic only, quiet kitchen room tone, a pen dropping on paper, claws on the table. No music. " +
      CARD_RULE + " " + SPEECH_UGC + " " + BAN },

  // The obstacle is being left off the wall. 30 spoken words. Hook is 11 syllables.
  { id: "t2-the-wall-v2", title: "The Wall", company: "esacard", aspect_ratio: "9:16", duration: "15",
    prompt:
      "A fifteen-second vertical video about a man adding his cat to the family photo wall in his hallway. " +
      "OPTICS: phone camera, handheld, soft indoor daylight from a window at the end of the hallway, warm natural " +
      "color, real lens softness. " + SHARP + " " +
      "ANIMAL: a large long-haired gray cat with round amber eyes and a heavy plume of a tail, sitting upright on a " +
      "narrow hallway table, watching him work with total seriousness. " +
      "PROPS: a tall vertical column of small framed family photographs running up the narrow hallway wall, one above " +
      "the other, with a single empty picture hook at the bottom of the column. He is holding a plain cream " +
      "certificate: one small square photograph of the cat in its upper area and four short featureless gray lines " +
      "below it, and nothing else at all. The rest of the certificate is empty cream paper. No writing of any kind, " +
      "no title line, no body text, no signature, no signature line, no printed name, no date, no seal, no crest, " +
      "no badge, no gold, no foil, no ribbon, no emblem, no decorative rule, no engraved border and no ornamental " +
      "frame line anywhere on it. It must not resemble a diploma, an award or any formal document. " +
      "BEATS. 0.0-3.0s he stands at the foot of the column of photographs holding the certificate, and looks into the " +
      "lens. The hallway is quiet while he speaks. " +
      "MAN: \"Everybody here has ID. Except her.\" " +
      "3.0-7.5s he slides the certificate into a simple plain frame, hangs it on the empty hook at the bottom of the " +
      "column and steps back to check it is straight. The cat's head tips back to follow the frame up the wall. " +
      "MAN: \"Took care of it this morning. Emotional support animal card.\" " +
      "7.5-11.5s he holds a plain matte white card up beside the cat's face on the hallway table, the small photograph " +
      "on the card right next to the real cat. " +
      "MAN: \"Thirty-nine dollars. One time. She has not stopped looking at it.\" " +
      "11.5-15.0s NOBODY SPEAKS. The cat steps down off the table, pads along the hallway to the wall and sits down " +
      "directly underneath her own frame, tail curled around her feet, looking up at it. He stays where he is and " +
      "watches her do it. The clip ends mid-moment. " +
      WHOLESOME + " AUDIO: diegetic only, quiet hallway room tone, a frame settling against the wall, soft paws on " +
      "wood. No music. " +
      CARD_RULE + " " + SPEECH + " " + BAN },
];
