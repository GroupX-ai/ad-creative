// ESA Card | the heart-tug batch | 2026-08-18
// Scripts 11-15 from `_scripts-for-approval-2026-08-17-heart-tug.md`, approved by Robby
// ("All of these are great, you can create with Seedance 2.5"). Five clips, 15s, 9:16, 720p.
//
// Built on the approved slice-of-life formula (d/e set) with the two constraints that batch
// hardened:
//   1. The OWNER says the brand phrase, never a second character. Second characters garbled it
//      into "ham card" and "elbow card" at $6.94 a roll.
//   2. The card is never the answer to a permission question. The keys, the welcome or the
//      signed paperwork always land BEFORE the card appears, so the card reads as photo
//      identification for a file, never as the thing a gatekeeper rules on.
//
// New this batch: the card prop is described inside every transaction beat, because a script
// that never describes the card gets an invented printed card from the model.
//
// One deviation from the approved script doc: Script 13's night-shift wardrobe was written as
// medical scrubs. Scrubs collide with our own BAN block (no medical imagery) and drag an
// emotional-support product toward a healthcare read, which is the association `policy.md`
// keeps us out of. Same story, generic shift-work fleece instead.

// The four clips already shipped were rendered BEFORE this block existed, with British casts
// and British streets for a US-only campaign (Robby, 2026-08-18: "Why do most ads have a
// British accent if we are literally targeting USA only?"). The beats below are now written in
// American English; re-rendering the clips against them is a separate call, and the generators
// refuse to run any prompt that lacks this block.
import { US_CAST } from "../_scripts/seedance-locale.mjs";

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
  "it. This matters because the first word of the phrase is the one that gets swallowed.";

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
  "service-dog vest, no labeled harness, no uniformed official, no signage, no readable paper anywhere. " +
  US_CAST;

const WHOLESOME =
  "TONE: wholesome, warm and ordinary. Everyone in shot is kind to everyone else. The animal is the visual star of the " +
  "clip and is unmistakably adorable in every frame: soft, expressive, doing small endearing things without being " +
  "made to perform. Nothing ironic, nothing sad, nothing tense.";

export const VIDEOS = [
  { id: "h1-old-bones", title: "Old Bones",
    prompt:
      "A fifteen-second vertical video about a woman moving her elderly dog into a ground-floor apartment with a yard. " +
      "OPTICS: phone camera, handheld, bright natural daylight, warm natural color, real lens softness. " +
      "ANIMAL: a fourteen-year-old yellow labrador with a fully gray muzzle and gray eyebrows, soft dark eyes, stiff " +
      "in the hips but endlessly happy, tail wagging in slow heavy sweeps. " +
      "BEATS. 0.0-3.5s the open tail of a small moving truck at the curb, the old labrador standing on the sidewalk " +
      "watching her, tail wagging. WOMAN: \"Fourteen years old. Stairs are done, so we found a place on the ground floor.\" " +
      "3.5-8.0s a friendly building manager waits at a yard gate and holds out a set of keys, which the woman takes " +
      "first. AGENT: \"You must be Murphy. We've been expecting you.\" The woman then holds out a plain matte white " +
      "card with a small photograph of the dog in its upper left corner. WOMAN: \"And this one is for your file. " +
      "Emotional support animal card.\" The agent tucks the card into a folder and crouches down to greet the dog. " +
      "8.0-11.5s inside, the woman crosses an empty room to an open patio door and steps aside. WOMAN: \"Go see.\" " +
      "11.5-15.0s NOBODY SPEAKS. The old labrador breaks into a short creaky trot out across the grass, the first run " +
      "in a long time, then stops, turns, and looks back at her in the doorway. She stays there watching him. " +
      WHOLESOME + " AUDIO: diegetic only, a van door, birds, the dog's collar tag, feet on grass. No music. " +
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id: "h2-visiting-nana", title: "Visiting Nana",
    prompt:
      "A fifteen-second vertical video about a woman taking her small dog to visit her grandmother. " +
      "OPTICS: phone camera, handheld, soft indoor daylight, warm natural color, real lens softness. " +
      "ANIMAL: a miniature dachshund in a small soft harness, glossy and comically low to the ground, enormous brown " +
      "eyes, ears flapping when he walks. " +
      "BEATS. 0.0-3.5s at an open trunk she clips a leash onto the dachshund, who is already vibrating with " +
      "excitement. WOMAN: \"Sunday. You know where we're going.\" " +
      "3.5-8.0s a plain front desk in a quiet building. A warm receptionist in her fifties leans over to look at the " +
      "dog. DESK: \"Here for Mrs. Adler? And who's this?\" The woman holds out a plain matte white card with a small " +
      "photograph of the dog in its upper left corner. WOMAN: \"This is him. Emotional support animal card, right " +
      "here.\" The receptionist smiles at the dog. DESK: \"She's been talking about him all week.\" " +
      "8.0-11.5s in a quiet corridor the dachshund pulls hard toward one particular door, which opens. " +
      "WOMAN: \"Go on then, find her.\" " +
      "11.5-15.0s NOBODY SPEAKS. The dog crosses a bright room to an older woman sitting in an armchair and rests his " +
      "chin on her knee. Her hand settles on his head and stays there. " +
      WHOLESOME + " AUDIO: diegetic only, a trunk closing, quiet room tone, claws on floor, a leash clip. No music. " +
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id: "h3-night-shift", title: "Night Shift",
    prompt:
      "A fifteen-second vertical video about a woman leaving for a long work shift and coming home to her dog. " +
      "OPTICS: phone camera, handheld, cold blue dawn light at the start and warm golden evening light at the end, " +
      "natural color, real lens softness. " +
      "ANIMAL: a staffordshire bull terrier with a wide smiling mouth and a glossy brindle coat, leaning his whole " +
      "body weight against her leg, tail going constantly. " +
      "BEATS. 0.0-3.5s a front door in cold blue dawn light, the woman in a plain work fleece with a lanyard tucked " +
      "in, the dog pressed against her leg. WOMAN: \"Twelve hours. He hates it more than I do.\" " +
      "3.5-8.0s a cheerful dog walker arrives on the step with a ring of keys. WALKER: \"First morning. Anything I " +
      "should know?\" The woman holds out a plain matte white card with a small photograph of the dog in its upper " +
      "left corner. WOMAN: \"Emotional support animal card. And he naps at nine.\" The walker crouches and " +
      "rubs the dog's chest with both hands. WALKER: \"We will be fine, won't we.\" " +
      "8.0-11.5s one shot from inside: the dog watches from the front window, the walker beside him, as her car pulls " +
      "away down the street. " +
      "11.5-15.0s NOBODY SPEAKS. The same front door opens in warm golden evening light, the woman still in the same " +
      "fleece. The dog does a full spin on the spot, and she drops to her knees into him and holds on. " +
      WHOLESOME + " AUDIO: diegetic only, a quiet American street at dawn, keys, claws on hardwood, an evening door. " +
      "No music. " +
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id: "h4-pick-up-day", title: "Pick-Up Day",
    prompt:
      "A fifteen-second vertical video about a woman collecting her dog after a week away. " +
      "OPTICS: phone camera, handheld, bright natural daylight then soft interior light, warm natural color. " +
      "ANIMAL: an english springer spaniel with long freckled ears, a docked wiggling backside and a permanently " +
      "delighted face. " +
      "BEATS. 0.0-3.5s she walks fast across a car park toward a low building, phone held out in front of her. " +
      "WOMAN: \"Seven days. The longest we have ever been apart, and I felt every one.\" " +
      "3.5-8.0s she leans on a plain reception desk. STAFF: \"You must be here for Alfie?\" The woman holds out a " +
      "plain matte white card with a small photograph of the dog in its upper left corner. WOMAN: \"That's him. " +
      "Emotional support animal card.\" " +
      "8.0-11.5s a door opens at the far end of a corridor. STAFF: \"He never stopped watching the door.\" " +
      "WOMAN: \"Alfie.\" " +
      "11.5-15.0s NOBODY SPEAKS. The springer comes down the corridor at full speed in a full-body wiggle and throws " +
      "himself at her; she goes down onto her knees on the floor and catches him with both arms. The staff member " +
      "stays soft-focus behind them. " +
      WHOLESOME + " AUDIO: diegetic only, car park wind, a desk bell, claws skidding on a corridor floor, snuffling. " +
      "No music. " +
      CARD_RULE + " " + SPEECH + " " + BAN },

  { id: "h5-half-day", title: "Half Day",
    prompt:
      "A fifteen-second vertical video about a woman collecting her puppy early from daycare. " +
      "OPTICS: phone camera, handheld, bright midday interior light, warm natural color, real lens softness. " +
      "ANIMAL: a small apricot cockapoo puppy, a mass of soft curls with a black button nose, bouncing rather than " +
      "walking. " +
      "BEATS. 0.0-3.5s she arrives at a plain front desk with her keys still in her hand, speaking quietly to the " +
      "phone. WOMAN: \"Half day today. Don't tell him.\" " +
      "3.5-8.0s a cheerful staff member looks up. STAFF: \"Early pickup. And you are?\" The woman holds out a plain " +
      "matte white card with a small photograph of the puppy in its upper left corner. WOMAN: \"His mom. Here's his " +
      "emotional support animal card.\" The staff member laughs. STAFF: \"Ah. The famous Biscuit, is it.\" " +
      "8.0-11.5s a door opens on a bright play room where the cockapoo is mid-game with one other dog. " +
      "WOMAN: \"Biscuit. Come on, buddy. Time to go home.\" He ignores her completely and keeps playing. " +
      "11.5-15.0s NOBODY SPEAKS. The puppy does one last gleeful lap of the room, then gallops over and skids into " +
      "her legs. She laughs and scoops him up. " +
      WHOLESOME + " AUDIO: diegetic only, room tone, a door, claws on a smooth floor, two dogs playing. No music. " +
      CARD_RULE + " " + SPEECH + " " + BAN },
];
