// ESA Card | slice-of-life batch 2 | 2026-08-13
// Built to what Robby singled out in d1-viewing and d5-hotel: authentic, wholesome, cute,
// and heart-tugging. The last of those is the one the first drafts of these scripts were
// weakest on, so every final beat here is written to land emotionally rather than just
// cutely: the payoff is something about the relationship, not just an adorable animal.
//
// Two constraints learned the expensive way on the previous batch, both binding here:
//   - the OWNER says the brand phrase, never a second character (four re-rolls to isolate;
//     secondary speakers produced "rabbit card", "ham card", "elbow card")
//   - one spoken exchange per transaction beat, because a crowded beat garbles

// CAST AND LOCALE added 2026-08-18. These clips were rendered before it existed and came
// back with British casts and British streets for a US-only campaign; the block rides on the
// end of BAN so every prompt here picks it up if it is ever re-rendered. The beats above it
// still carry some British vocabulary, which the linter flags as warnings.
import { US_CAST } from "../_scripts/seedance-locale.mjs";

const SPEECH =
  "SPEECH RULE: the only words spoken in the entire video are the lines written inside quotation marks in the beats " +
  "below, spoken by the character named for each line. Everything in the beats that is NOT inside quotation marks is " +
  "stage direction describing what happens on camera, and must never be read aloud, narrated, whispered or spoken by " +
  "anyone under any circumstances. No narration, no voice-over, no improvised lines, no unwritten filler. Where a beat " +
  "says NOBODY SPEAKS, nobody speaks at all and the moment plays with room sound only. " +
  "PHRASE RULE, the single most important instruction in this prompt: the four words \"emotional support animal card\" " +
  "are said slowly, clearly and completely separately, as four distinct words with a small gap between each one. " +
  "Say EMOTIONAL, which rhymes with devotional and has four syllables, ee-mo-shun-al. " +
  "Then SUPPORT, which rhymes with report. " +
  "Then ANIMAL, which has three syllables, an-i-mal, and means a creature such as a dog or a cat. " +
  "Then CARD, which rhymes with hard. " +
  "The word after SUPPORT is always ANIMAL. It is never rabbit, never agent, never compass, never ham, never elbow, " +
  "never any other word. Do not blend the four words, do not slur them, do not abbreviate them to letters, never say " +
  "\"E S A\", never say \"eesa\". The speaker slows down slightly for these four words.";

const CARD_RULE =
  "CARD RULE: the ID card is a plain matte white credit-card-sized rectangle with a single small square photograph of " +
  "the animal in its upper left corner and three short featureless grey lines beside that photograph. That is the " +
  "complete and exhaustive contents of the card. No logo, no seal, no crest, no badge, no barcode, no QR code, no " +
  "readable writing and no numbers anywhere on it. Any paperwork otherwise visible is cream paper with short " +
  "featureless grey lines and nothing else, and any phone or screen is a plain solid pale grey rectangle with nothing " +
  "on it at all.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no logos, no watermarks, no UI overlays, no end " +
  "card, no product shot at the end, no slow motion, no drone or crane moves, no lens flares, no glowing particles, no " +
  "teal-and-orange grade, no stock-footage look, no medical imagery, no clinic, no pill bottles, no bus, no train, no " +
  "aeroplane, no airport, no public transport of any kind, no shop interior, no cafe interior, no restaurant, no " +
  "service-dog vest, no labelled harness, no uniformed official. " +
  US_CAST;

const TONE =
  "TONE: wholesome, warm and completely ordinary. Everyone in shot is kind to everyone else. The animal is the visual " +
  "star and is unmistakably adorable in every frame: soft, expressive, doing small endearing things without being made " +
  "to perform. Nothing ironic, nothing sad, nothing tense. " +
  "THE FINAL BEAT IS THE POINT: it must land emotionally, not just cutely. It is the moment a viewer feels something " +
  "about the bond between this person and this animal. Hold on the two of them together, let it breathe, and end the " +
  "clip inside the moment rather than after it.";

export const VIDEOS = [
  { id:"e1-first-day", title:"First Day",
    prompt:
      "A fifteen-second vertical video about a woman dropping her puppy at doggy daycare for the first time. "+
      "OPTICS: phone camera, handheld, bright morning daylight, warm natural colour, real lens softness. "+
      "ANIMAL: a golden retriever puppy, all oversized paws and no coordination, bouncing sideways. "+
      "BEATS. 0.0-3.0s a car park outside a small daycare building, the puppy bouncing on the lead and tripping over "+
      "its own feet. WOMAN: \"First day. He's been awake since five.\" "+
      "3.0-8.0s a front desk. A staff member in a fleece crouches down to greet the puppy before looking at her at all. "+
      "STAFF: \"Has he been with us before?\" WOMAN: \"First time. Here's his emotional support animal card.\" "+
      "STAFF: \"Perfect. He's going to have a great day.\" "+
      "8.0-11.5s a gate opens onto a play yard and three friendly dogs come straight over to him. "+
      "WOMAN: \"He's not going to miss me at all, is he.\" "+
      "11.5-15.0s NOBODY SPEAKS. The puppy vanishes into a pile of wagging tails. She stays at the fence with her "+
      "fingers hooked through the wire, watching him, not leaving. Hold on her face. "+
      TONE + " AUDIO: diegetic only, car park, happy barking, a gate latch. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"e2-keys", title:"Keys",
    prompt:
      "A fifteen-second vertical video about a man collecting the keys to his first flat, with his puppy. "+
      "OPTICS: phone camera, handheld, bright hallway daylight then sun through bare windows, natural colour. "+
      "ANIMAL: a french bulldog puppy with enormous ears and a permanently baffled expression. "+
      "BEATS. 0.0-3.5s a flat door on a landing, a building manager holding a keyring, the puppy sitting neatly and "+
      "staring up at him. MAN: \"Two months of forms for this bit.\" "+
      "3.5-8.0s the manager checks a clipboard. MANAGER: \"And he's registered with you?\" "+
      "MAN: \"Here's his emotional support animal card.\" MANAGER: \"Lovely. Welcome in, both of you.\" "+
      "8.0-11.5s the door opens on a completely empty flat and the puppy skids in across the bare floorboards. "+
      "MAN: \"Go on then.\" "+
      "11.5-15.0s NOBODY SPEAKS. The puppy finds the single patch of sunlight on the boards and flops into it. The man "+
      "slides down the doorframe and sits on the floor of his empty flat next to him, keys still in his hand, and just "+
      "looks at him. Hold on the two of them. "+
      TONE + " AUDIO: diegetic only, an echoing empty room, keys, claws on wood. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"e3-back-sunday", title:"Back Sunday",
    prompt:
      "A fifteen-second vertical video about a woman leaving her puppy with a dog sitter for a weekend. "+
      "OPTICS: phone camera, handheld, soft doorway daylight, warm natural colour. "+
      "ANIMAL: a beagle puppy with ears far too big for its head. "+
      "BEATS. 0.0-3.5s a doorstep, a weekend bag on the ground, the puppy already wandering inside past a warm smiling "+
      "sitter. WOMAN: \"Right. Back Sunday.\" "+
      "3.5-8.0s she passes over a lead and a small white card. SITTER: \"Anything I should know?\" "+
      "WOMAN: \"Here's his emotional support animal card. He'll steal your sofa.\" "+
      "8.0-11.5s through the doorway, the puppy is already up on the sofa. WOMAN: \"Told you.\" "+
      "11.5-15.0s NOBODY SPEAKS. She crouches in the doorway and the puppy runs back to her. She holds his face in both "+
      "hands for a moment, forehead to forehead, then lets him go and he trots back inside. Hold on her in the doorway. "+
      TONE + " AUDIO: diegetic only, a doorstep, a distant street, the puppy's tags. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"e4-cottage", title:"The Cottage",
    prompt:
      "A fifteen-second vertical video about a woman arriving at a holiday cottage with her puppy. "+
      "OPTICS: phone camera, handheld, low afternoon sun, warm natural colour, slight grain. "+
      "ANIMAL: a springer spaniel puppy, permanently mid-air, ears flying. "+
      "BEATS. 0.0-3.5s a car on a gravel drive outside a small stone cottage, the puppy at the window fogging the glass "+
      "with its nose. WOMAN: \"Six hours in a car for this one.\" "+
      "3.5-8.0s the cottage owner meets them at a wooden gate with a key. HOST: \"And this must be him.\" "+
      "WOMAN: \"This is him. Here's his emotional support animal card.\" HOST: \"He's very welcome.\" "+
      "8.0-11.5s the gate opens onto a big open field behind the cottage. WOMAN: \"Go on.\" "+
      "11.5-15.0s NOBODY SPEAKS. The puppy tears off across the grass at full speed, then skids to a stop halfway and "+
      "turns right round to check she is following. She is walking towards him, laughing. Hold on him waiting for her. "+
      TONE + " AUDIO: diegetic only, gravel, a gate, wind in grass, distant birds. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id:"e5-haircut", title:"First Haircut",
    prompt:
      "A fifteen-second vertical video about a woman taking her puppy for its first ever haircut. "+
      "OPTICS: phone camera, handheld, bright salon daylight, clean natural colour. "+
      "ANIMAL: a very small pomeranian puppy that looks like a dandelion, then afterwards absurdly fluffy and perfectly "+
      "blow-dried. "+
      "BEATS. 0.0-3.5s a grooming salon reception counter with the tiny puppy standing on it looking enormous with fur. "+
      "WOMAN: \"He has never had a haircut in his life.\" "+
      "3.5-8.0s a groomer lifts him gently and looks him over. GROOMER: \"First time with us?\" "+
      "WOMAN: \"First time anywhere. Here's his emotional support animal card.\" GROOMER: \"We'll take good care of him.\" "+
      "8.0-11.5s later, the salon door opens and she stops dead in the doorway. WOMAN: \"Oh, that is ridiculous.\" "+
      "11.5-15.0s NOBODY SPEAKS. The absurdly fluffy puppy trots straight across the floor into her arms and she scoops "+
      "him up and buries her face in his fur, eyes shut, laughing. Hold on the two of them. "+
      TONE + " AUDIO: diegetic only, a salon, a dryer somewhere, small claws on the floor. No music. "+
      CARD_RULE + " " + SPEECH + " " + BAN },
];
