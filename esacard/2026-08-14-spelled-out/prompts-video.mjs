// ESA Card | video rebuild, acronym spelled out | 2026-08-13
//
// Two instructions drive this batch:
//   1. "Use Emotional Support Animal, never ESA."  The closing line is now spoken in full.
//   2. Robby picked w1/w2/w3 as the cuter set, over the gag-led batch. So the register here
//      is theirs: a real person and their animal, one genuine warm moment, phone-shot,
//      light humour or real feeling. No comedy premises, no concept ads.

const BRAND_SAY =
  "SPEECH RULE: the only words spoken in the entire video are the lines quoted in the beats below. No narration, " +
  "no voice-over, no counting, no muttering, no reading of stage directions, no improvised lines, no unwritten filler. " +
  "BRAND RULE: the closing line says the words \"emotional support animal card\" in full, as five clear words. " +
  "Never abbreviate it to three letters, never say \"E S A\", never say \"eesa\". The speaker says the whole phrase.";

const CARD_RULE =
  "CARD RULE: any ID card visible in shot is a plain matte white credit-card-sized rectangle with a single small square " +
  "photograph of the animal in its upper left corner and three short featureless grey lines beside that photograph. " +
  "That is the complete and exhaustive contents of the card. No logo, no seal, no crest, no badge, no barcode, no QR " +
  "code, no readable writing and no numbers anywhere on it. Any certificate visible is cream paper with a plain thin " +
  "border and four short featureless grey lines, and nothing else. Any phone screen visible is a plain solid pale grey " +
  "rectangle with nothing on it at all.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no logos, no watermarks, no UI overlays, no end " +
  "card, no slow motion, no drone or crane moves, no lens flares, no glowing particles, no teal-and-orange grade, no " +
  "stock-footage look, no medical imagery, no clinic, no pill bottles, no therapy couch, no bus, no train, no aeroplane, " +
  "no airport, no public transport of any kind, no service-dog vest, no labelled harness, no uniformed official.";

export const VIDEOS = [
  { id:"c1-four-days", note:"w2 register: the emotional one",
    prompt:"A fifteen-second vertical video, handheld on a phone, tender, of a woman sitting on her living-room floor "+
      "with a shy rescue dog. "+
      "OPTICS: phone camera, handheld, low to the floor, soft grey daylight from a window, natural colour, gentle grain. "+
      "PLACE: a sparse living room, a folded blanket, a half-unpacked bag of dog food, a water bowl, a radiator. "+
      "CHARACTER: a woman in her thirties in a jumper and socks, sitting very still, speaking softly so as not to startle "+
      "the dog. A thin nervous lurcher watching her from across the room. "+
      "BEATS. 0.0-3.5s frame one is the lurcher standing at a distance staring at her, and she says quietly, barely "+
      "moving \"Four days he stayed over there.\" "+
      "3.5-8.0s the dog takes a few careful steps and then sits down right against her side. She exhales, laughing under "+
      "her breath, and says \"And then this morning he just sat next to me.\" "+
      "8.0-11.5s she puts one hand gently on the dog's back, and he leans into it. She says \"That is the whole thing. "+
      "That is it.\" "+
      "11.5-15.0s still stroking him, she looks at the camera and says warmly \"Emotional support animal card. "+
      "Thirty-nine dollars.\" "+
      "AUDIO: diegetic, a radiator tick, distant traffic, the dog settling, plus a very soft piano bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"c2-alarm-clock", note:"w3 register: light and funny",
    prompt:"A fifteen-second vertical video, funny and warm, of a man being woken up by his cat. "+
      "OPTICS: phone held at arm's length in bed, early soft morning light through curtains, natural colour, handheld. "+
      "PLACE: a rumpled bed, a duvet, a paperback face down on the side table, curtains half open. "+
      "CHARACTER: a man in his thirties, hair flattened on one side, entirely resigned and amused. A round ginger cat "+
      "standing directly on his chest, staring at him. "+
      "BEATS. 0.0-3.0s frame one is the cat's face filling the lens from inches away, and he says flatly from under it "+
      "\"This is my alarm clock.\" "+
      "3.0-7.5s the cat pats his cheek twice with a paw. He does not move, and says \"She does not have a snooze button.\" "+
      "7.5-11.5s he gives up, sits up, and the cat immediately flops into the warm patch he left. He laughs and says "+
      "\"And that was the plan the whole time.\" "+
      "11.5-15.0s he scratches the cat's chin, looks at the camera and says \"Emotional support animal card. Thirty-nine "+
      "dollars.\" "+
      "AUDIO: diegetic, birds outside, duvet rustle, a loud purr, plus a light playful acoustic bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"c3-window-wait", note:"w1 register: warm everyday moment",
    prompt:"A fifteen-second vertical video, joyful, of a man coming home to a dog who has been waiting at the window. "+
      "OPTICS: phone camera, handheld, late afternoon sun, warm natural colour, small sway as he walks. "+
      "PLACE: the path up to a small terraced house, a low wall, a wheelie bin, a bay window with a dog visible in it. "+
      "CHARACTER: a man in his forties in a work jacket carrying a bag, tired and then delighted. A springer spaniel with "+
      "its paws on the windowsill, then bursting out of the front door. "+
      "BEATS. 0.0-3.0s frame one is the spaniel's face pressed against the window glass, and the man says, laughing "+
      "\"Every single day. That window.\" "+
      "3.0-7.5s he opens the door and the dog explodes out at him, spinning around his legs. He says \"He does not do "+
      "this for anyone else.\" "+
      "7.5-11.5s he crouches and the dog shoves its whole head into his chest. He says \"Best part of my day, this.\" "+
      "11.5-15.0s still crouched with the dog, he looks up at the camera and says \"Emotional support animal card. "+
      "Thirty-nine dollars.\" "+
      "AUDIO: diegetic, a gate, keys, the dog's claws on the step, excited breathing, plus a bright warm acoustic bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"c4-first-night", note:"w1 register: aspirational and warm",
    prompt:"A fifteen-second vertical video, cosy and warm, of a young woman spending the first night in a new flat with "+
      "her dog, sitting on the floor. "+
      "OPTICS: phone propped on a box, warm lamp light in an otherwise dark room, natural colour, slight grain. "+
      "PLACE: a bare flat, unopened boxes, a single lamp on the floor, a takeaway carton, a duvet spread on floorboards. "+
      "CHARACTER: a woman in her late twenties in a hoodie, cross-legged on the duvet, happy and tired. A big soft "+
      "bernese mountain dog sprawled across most of the duvet. "+
      "BEATS. 0.0-3.0s frame one is the dog rolling over and taking up the entire duvet, and she says, laughing "+
      "\"First night. He has taken the bed.\" "+
      "3.0-7.5s she shuffles into the small corner left for her and says \"No furniture. No curtains. Do not care.\" "+
      "7.5-11.5s the dog puts its head in her lap and sighs. She goes quiet, strokes its ear and says softly \"We made it.\" "+
      "11.5-15.0s she looks at the camera, grinning, and says \"Emotional support animal card. Thirty-nine dollars.\" "+
      "AUDIO: diegetic, the hum of an empty room, a lamp click, the dog's heavy sigh, plus a soft warm acoustic bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"c5-kitchen-table", note:"w3 register: fast and practical",
    prompt:"A fifteen-second vertical selfie video, bright and quick, of a woman at her kitchen table with a dog who will "+
      "not sit still. "+
      "OPTICS: phone front camera propped against a mug so it tilts slightly, bright morning kitchen light, natural "+
      "colour, mild sensor noise. "+
      "PLACE: a cluttered kitchen table, a cereal bowl, a fruit bowl, a pile of post, a phone lying face up whose screen "+
      "is a plain solid pale grey rectangle with nothing on it. "+
      "CHARACTER: a woman in her thirties in a cardigan, quick and cheerful, talking with her hands. A wriggling "+
      "cockapoo repeatedly trying to climb onto the table. "+
      "BEATS. 0.0-3.0s frame one is the cockapoo's paws landing on the table right in front of the lens, and she says, "+
      "laughing \"Okay. Three minutes, she said.\" "+
      "3.0-7.5s she counts on her fingers while fending off the dog and says \"Name. Breed. Birthday. One photo.\" "+
      "7.5-11.5s she holds up a plain white card beside the dog's face and says \"And it was in my inbox before the "+
      "toast popped.\" "+
      "11.5-15.0s the dog licks her chin and she says through it \"Emotional support animal card. Thirty-nine dollars.\" "+
      "AUDIO: diegetic kitchen sounds, a toaster, the dog's tags, plus a bright light acoustic bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
];
