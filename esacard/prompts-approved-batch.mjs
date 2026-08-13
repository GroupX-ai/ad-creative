// ESA Card | the approved slice-of-life batch | 2026-08-13
// Scripts signed off by Robby, with three notes applied:
//   1. the animal must be SUPER CUTE and is the visual star of every clip
//   2. wholesome throughout
//   3. no pitch beat at the end. Every clip now ends on a wordless warm moment,
//      mid-life, never on a summarising benefit line. No end card either: the price
//      and the CTA live in Meta's own headline and primary-text fields, so the
//      fifteen seconds stay authentic start to finish.
// The phrase "emotional support animal card" is spoken in all five, in four of them by
// the other person asking for it by name.

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
  "\"E S A\", never say \"eesa\", and never shorten the phrase. The speaker slows down slightly for these four words.";

const CARD_RULE =
  "CARD RULE: the ID card is a plain matte white credit-card-sized rectangle with a single small square photograph of " +
  "the animal in its upper left corner and three short featureless grey lines beside that photograph. That is the " +
  "complete and exhaustive contents of the card. No logo, no seal, no crest, no badge, no barcode, no QR code, no flag, " +
  "no readable writing and no numbers anywhere on it. Any paperwork or screen otherwise visible is blank: forms are " +
  "cream paper with short featureless grey lines and nothing else, and any phone or laptop screen is a plain solid " +
  "pale grey rectangle with nothing on it at all.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no lower thirds, no logos, no watermarks, no UI " +
  "overlays, no end card, no product shot at the end, no slow motion, no drone or crane moves, no lens flares, no " +
  "glowing particles, no teal-and-orange grade, no stock-footage look, no medical imagery, no clinic, no pill bottles, " +
  "no therapy couch, no bus, no train, no aeroplane, no airport, no public transport of any kind, no service-dog vest, " +
  "no labelled harness, no uniformed official.";

const WHOLESOME =
  "TONE: wholesome, warm and ordinary. Everyone in shot is kind to everyone else. The animal is the visual star of the " +
  "clip and is unmistakably adorable in every frame: soft, expressive, doing small endearing things without being " +
  "made to perform. Nothing ironic, nothing sad, nothing tense.";

export const VIDEOS = [
  { id:"d1-viewing", title:"Thirty Seconds",
    prompt:
      "A fifteen-second vertical video about a woman viewing a flat with her dog. "+
      "OPTICS: phone camera, handheld, bright natural daylight, warm natural colour, real lens softness. "+
      "ANIMAL: a cavalier king charles spaniel puppy with huge dark eyes and long silky ears, endlessly waggy. "+
      "BEATS. 0.0-3.0s parked car outside a block of flats, phone selfie, the spaniel sitting up in the passenger seat "+
      "with its ears blowing slightly. WOMAN: \"Fourth viewing this month. They always ask the same thing.\" "+
      "3.0-8.0s a leasing office desk, handheld over her shoulder. A friendly agent in her fifties looks up from a form. "+
      "AGENT: \"And is he registered with anyone?\" The woman is already sliding a small white card "+
      "across the desk. WOMAN: \"Here's his emotional support animal card.\" The agent looks at the puppy and smiles. AGENT: \"Oh, perfect. He's gorgeous.\" "+
      "8.0-12.0s back in the car, the spaniel climbing into her lap. WOMAN: \"That used to be three emails and a week "+
      "of waiting.\" "+
      "12.0-15.0s NOBODY SPEAKS. The puppy stretches up and licks her chin. She laughs, ducks away from it, and reaches "+
      "for the ignition, still laughing, as the clip ends mid-moment. "+
      WHOLESOME + " AUDIO: diegetic only, car interior, a distant road, the puppy's collar tag. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"d2-lobby", title:"I Used To Dread That",
    prompt:
      "A fifteen-second vertical video about a man walking his dog through his new apartment lobby. "+
      "OPTICS: phone camera, handheld from behind him then beside him, bright indoor daylight, natural colour. "+
      "ANIMAL: a fluffy corgi puppy with enormous ears and very short legs, trotting hard to keep up. "+
      "BEATS. 0.0-3.0s he walks in through glass doors with the corgi trotting beside him. A cheerful concierge behind a "+
      "desk looks over. CONCIERGE: \"Sorry, mate. Is he yours?\" "+
      "3.0-8.0s the man stops and takes a small white card from his wallet without really breaking stride. "+
      "MAN: \"He is. Here's his emotional support animal card.\" The concierge glances at it, then leans over the desk to "+
      "look at the puppy properly. CONCIERGE: \"Ah, no bother at all. He's gorgeous.\" "+
      "8.0-12.0s inside the lift, the doors closing, phone held low. The man speaks quietly, half to the dog. "+
      "MAN: \"Two weeks ago that would have ruined my morning.\" "+
      "12.0-15.0s NOBODY SPEAKS. The corgi leans its whole body against his shin. He crouches down and scratches its "+
      "chest with both hands as the lift doors close on them. "+
      WHOLESOME + " AUDIO: diegetic only, lobby echo, claws on tile, a lift chime. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"d3-bench", title:"Explaining",
    prompt:
      "A fifteen-second vertical video of an older woman on a park bench with her small dog. "+
      "OPTICS: phone camera, handheld, low golden late-afternoon sun, warm natural colour, soft grain. "+
      "ANIMAL: a tiny scruffy wire-haired terrier with a comically expressive face, curled on her lap looking up at her. "+
      "BEATS. 0.0-3.0s the woman, in her sixties in a wool coat, strokes the terrier on her lap. "+
      "WOMAN: \"People ask. All the time.\" "+
      "3.0-8.0s she keeps stroking him, not looking up, entirely unbothered. "+
      "WOMAN: \"What is he. Why have you got him. Is he allowed in here.\" "+
      "8.0-12.0s she looks down at the dog, who tilts his head at her. "+
      "WOMAN: \"Now I just show them his emotional support animal card.\" "+
      "12.0-15.0s NOBODY SPEAKS. She stands, sets him down, and he trots ahead of her along the path with his tail up. "+
      "She follows, and the clip ends on the two of them walking away, mid-walk. "+
      WHOLESOME + " AUDIO: diegetic only, birds, a distant park, the dog's tags. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"d4-section-four", title:"Section Four",
    prompt:
      "A fifteen-second vertical video of a man filling in a rental form at his kitchen table, obstructed by his cat. "+
      "OPTICS: phone propped against a mug so the frame tilts very slightly, bright morning kitchen light, natural colour. "+
      "ANIMAL: an enormously fluffy ginger cat with a round face, sitting squarely on the paperwork and refusing to move. "+
      "BEATS. 0.0-3.0s the kitchen table, a laptop, a stack of cream forms, and the cat sitting in the middle of them. "+
      "MAN: \"Right. Rental application. Section four.\" "+
      "3.0-7.0s he reads it out completely deadpan while the cat stares directly into the lens. "+
      "MAN: \"Do you have any pets.\" "+
      "7.0-11.0s he reaches past the cat, props a small white card against the laptop, and starts to type. "+
      "MAN: \"She's got an emotional support animal card, actually.\" "+
      "11.0-15.0s NOBODY SPEAKS. The cat stands up, walks across the keyboard and lies down on it. He gives up, takes "+
      "his hands off the laptop and scratches under her chin instead, smiling, as the clip ends. "+
      WHOLESOME + " AUDIO: diegetic only, a kettle somewhere, paper, a loud purr. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"d5-hotel", title:"The Weekend",
    prompt:
      "A fifteen-second vertical video of a woman checking into a small hotel with her puppy. "+
      "OPTICS: phone camera, handheld, bright afternoon daylight then warm interior light, natural colour. "+
      "ANIMAL: a cocker spaniel puppy with long wavy ears and enormous paws, tripping over its own feet. "+
      "BEATS. 0.0-3.0s an open car boot outside a small hotel, a bag coming out, the puppy jumping down and immediately "+
      "sitting on her foot. WOMAN: \"We didn't used to bother with this.\" "+
      "3.0-8.0s a small reception desk. A warm receptionist leans right over the counter to look at the puppy and smiles at it, and says nothing at all. The woman hands a small white card across the counter. WOMAN: \"Here's his emotional support animal card.\" The receptionist takes it and reaches for a key. "+
      "8.0-12.0s a hotel room door swings open and the puppy is up on the bed before she is through it. "+
      "WOMAN: \"Straight on the bed. Every single time.\" "+
      "12.0-15.0s NOBODY SPEAKS. She drops the bag, flops onto the bed beside him, and the puppy immediately climbs onto "+
      "her chest and settles there. The clip ends on the two of them. "+
      WHOLESOME + " AUDIO: diegetic only, a car boot, reception room tone, bedsprings, puppy snuffling. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },
];
