// ESA Card | UGC talking-head examples | 2026-08-17
// Robby asked for UGC-style clips with viral potential on TikTok and for examples in chat.
// One real-seeming person talking straight into a front camera, phone-shot, the animal as
// co-star, hook inside the first second. Same hard rules as the approved batch: the speaker
// says the full phrase, the card is featureless, no on-screen text, no claims about housing,
// access or outcomes. These are EXAMPLES for Robby to judge; nothing ships anywhere.

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
  "no labelled harness, no uniformed official.";

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
