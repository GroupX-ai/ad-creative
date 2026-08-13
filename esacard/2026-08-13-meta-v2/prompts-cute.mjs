// ESA Card | cute / viral video batch | 2026-08-13
// Robby: "come up with the cutest, most viral videos you can think of".
// Same discipline as w1-w3, which he approved: sell the feeling, no disclaimers in
// the copy, claim safety enforced by the prop rules and the ban list instead.

const BRAND_SAY =
  "SPEECH RULE: the only words spoken in the entire video are the lines quoted in the beats below. No narration, " +
  "no voice-over, no counting, no muttering, no reading of stage directions, no improvised lines, no unwritten filler. " +
  "PRONUNCIATION: the brand is said as four clear syllables, \"ee ess ay card\", spelling out the letters E, S and A " +
  "one at a time and then the word card. The letter A rhymes exactly with day. Never say it as one word \"eesa\".";

const CARD_RULE =
  "CARD RULE: any ID card visible in shot is a plain matte white credit-card-sized rectangle with a single small square " +
  "photograph of the animal in its upper left corner and three short featureless grey lines beside that photograph. " +
  "That is the complete and exhaustive contents of the card. No logo, no seal, no crest, no badge, no shield, no barcode, " +
  "no QR code, no flag, no readable writing and no numbers anywhere on it. " +
  "Any certificate visible in shot is cream paper with a plain thin border and four short featureless grey lines in the " +
  "centre, and nothing else on it at all. Any phone screen visible in shot is a plain solid pale grey rectangle with " +
  "nothing on it at all.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no lower thirds, no logos, no watermarks, no UI " +
  "overlays, no end card, no slow motion, no drone or crane moves, no lens flares, no glowing particles, no holograms, " +
  "no teal-and-orange grade, no stock-footage look, no medical imagery, no clinic, no pill bottles, no therapy couch, " +
  "no bus, no train, no aeroplane, no airport, no public transport of any kind, no service-dog vest, no harness labelled " +
  "with writing, no uniformed official, no shop interior, no restaurant interior.";

export const VIDEOS = [
  { id:"x1-cat-photo", angle:"relatable comedy: the registration photo",
    prompt:"A fifteen-second vertical selfie video, funny and fast, of a woman trying and failing to photograph her cat. "+
      "OPTICS: phone front camera then handheld, bright kitchen daylight, natural colour, slight motion blur as she moves. "+
      "PLACE: a small sunny kitchen, a cluttered worktop, a fruit bowl, a mug. A very large indignant fluffy grey cat. "+
      "CHARACTER: a woman in her late twenties in a striped jumper, hair falling out of a clip, laughing and exasperated. "+
      "BEATS. 0.0-3.0s frame one is the cat's rear end filling the lens as it turns away mid-photo, and she says, "+
      "laughing \"She needed one photo. One.\" "+
      "3.0-7.5s quick handheld shots of the cat turning away again, yawning, and putting a paw on the lens, while she says "+
      "\"She gave me forty of these.\" "+
      "7.5-11.5s she holds the cat up under its front legs, face to face with the camera, and the cat finally stares "+
      "dead ahead, and she whispers \"There she is.\" "+
      "11.5-15.0s she holds a plain white card beside the cat's face, both looking at the lens, and says \"E-S-A Card. "+
      "Thirty-nine dollars, no renewals.\" "+
      "AUDIO: diegetic kitchen sounds, the cat chirping, plus a light playful ukulele bed under the dialogue. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"x2-interview", angle:"comedy concept: the dog interviews for the role",
    prompt:"A fifteen-second vertical video, deadpan comedy played completely straight, of a man conducting a formal job "+
      "interview with a dog. "+
      "OPTICS: phone on a tripod, locked off, ordinary indoor daylight, natural colour, no camera movement. "+
      "PLACE: a small dining room used as an office. A dining table, two chairs facing each other, a glass of water, a "+
      "cream certificate face down on the table, a pot plant. "+
      "CHARACTER: a man in his thirties wearing a shirt and tie above pyjama bottoms, entirely serious. Opposite him, "+
      "sitting upright on the chair with perfect posture, a beagle in a small bow tie, staring at him. "+
      "BEATS. 0.0-3.0s frame one is the beagle already seated at the table staring at him, and the man says flatly "+
      "\"So. Tell me why you want this job.\" "+
      "3.0-7.0s the beagle tilts its head slowly. The man nods slowly as if deeply impressed and says \"That is exactly "+
      "what I was hoping you'd say.\" "+
      "7.0-11.0s he slides the cream certificate across the table toward the dog and says \"You start immediately.\" "+
      "11.0-15.0s the beagle puts one paw flat on the certificate. The man looks at the camera and says \"E-S-A Card. "+
      "Thirty-nine dollars.\" "+
      "AUDIO: diegetic room tone, a chair creak, the dog's collar tags, plus a dry plucked-string comedy bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"x3-jealous", angle:"comedy: the second pet wants one too",
    prompt:"A fifteen-second vertical video, warm and funny, about a second dog noticing the first one got something. "+
      "OPTICS: handheld phone, living-room daylight, natural colour, small sway. "+
      "PLACE: a lived-in living room, a sofa with a throw, a basket of dog toys, a low coffee table. "+
      "CHARACTER: a woman in her thirties in a hoodie, amused. Two dogs: a smug dachshund on the sofa and a large "+
      "soulful bernese mountain dog on the floor staring directly at the camera. "+
      "BEATS. 0.0-3.0s frame one is the dachshund sitting proudly beside a plain white card on the sofa cushion, and the "+
      "woman says \"So I did his first.\" "+
      "3.0-7.5s the camera pans to the bernese, who is staring, unblinking, deeply betrayed. She says \"And then there "+
      "was this face.\" "+
      "7.5-11.5s a second plain white card lands on the floor in front of the bernese, who immediately lies down on top "+
      "of it. She laughs and says \"Fine. Both of them.\" "+
      "11.5-15.0s both dogs beside her, she looks at the camera and says \"E-S-A Card. Thirty-nine dollars each.\" "+
      "AUDIO: diegetic living-room sound, dog tags, a sofa creak, plus a bouncy light acoustic bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"x4-paw-print", angle:"peak cute: the dog signs it",
    prompt:"A fifteen-second vertical video, sweet and quiet, of a woman helping her puppy press a paw onto a certificate. "+
      "OPTICS: handheld phone, close and low to the floor, soft window light, warm natural colour, shallow focus. "+
      "PLACE: a wooden living-room floor, a rug, a saucer of water, a chewed rope toy. "+
      "CHARACTER: a woman in her twenties, cross-legged on the floor, gentle and delighted. A fat golden retriever puppy "+
      "climbing over her lap. "+
      "BEATS. 0.0-3.0s frame one is the puppy's paw landing squarely in the middle of the cream certificate, and she "+
      "gasps and laughs \"Okay, you sign it then.\" "+
      "3.0-7.5s she lifts the paw gently and there is a small dusty paw mark on the paper. She says \"That is going on "+
      "the wall.\" "+
      "7.5-11.5s the puppy immediately flops onto its back across the certificate. She says, laughing \"Every time.\" "+
      "11.5-15.0s she holds the certificate up beside the puppy's face and says \"E-S-A Card. Thirty-nine dollars.\" "+
      "AUDIO: diegetic, puppy snuffling, paper rustle, a clock, plus a soft warm piano bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"x5-senior", angle:"emotional: the old dog finally gets his",
    prompt:"A fifteen-second vertical video, tender and warm, of an older man and his very old dog on a sofa. "+
      "OPTICS: handheld phone, soft lamp-lit evening interior, warm natural colour, gentle grain. "+
      "PLACE: a small sitting room, a patterned armchair, a lamp, a folded newspaper, a worn dog bed in the corner. "+
      "CHARACTER: a man in his sixties in a cardigan, soft-spoken and fond. A grey-faced old spaniel asleep with its "+
      "head on his knee. "+
      "BEATS. 0.0-3.0s frame one is the spaniel's grey face lifting sleepily into the light, and the man says quietly "+
      "\"Fourteen years, this one.\" "+
      "3.0-7.5s he strokes the dog's ear and says \"Been getting me out of that chair every morning.\" "+
      "7.5-11.5s he lifts a cream certificate onto the arm of the sofa beside the dog and says \"Took me long enough to "+
      "put his name on something.\" "+
      "11.5-15.0s the dog rests its head back on his knee. He looks at the camera and says \"E-S-A Card. Thirty-nine "+
      "dollars.\" "+
      "AUDIO: diegetic, a ticking clock, the dog's slow breathing, plus a very soft piano bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"x6-wallet-reveal", angle:"relatable punchline: what's actually in the wallet",
    prompt:"A fifteen-second vertical selfie video, quick and funny, of a man showing what he keeps in his wallet. "+
      "OPTICS: phone front camera held at arm's length, bright outdoor daylight in a park, natural colour, handheld sway. "+
      "PLACE: a park path, trees, a bench, a bin. A muddy border collie circling his legs on a lead. "+
      "CHARACTER: a man in his thirties in a rain jacket, cheerful, talking quickly. "+
      "BEATS. 0.0-3.0s frame one is him already flipping a brown leather wallet open toward the lens, and he says "+
      "\"People ask what's in here.\" "+
      "3.0-7.0s he thumbs past a couple of plain cards and says \"Bank card. Gym card I never use.\" "+
      "7.0-11.5s he pulls out a plain white card with a small photo of the collie on it, holds it beside the actual dog, "+
      "and says \"And this. This is the one I show people.\" "+
      "11.5-15.0s the collie jumps up at him and he laughs and says \"E-S-A Card. Thirty-nine dollars.\" "+
      "AUDIO: diegetic park sound, wind on the mic, the dog panting, plus a bright light acoustic bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },

  { id:"x7-puppy-first", angle:"cute: first-day-of-school energy",
    prompt:"A fifteen-second vertical video, joyful, of a woman making a fuss of a tiny puppy on a doorstep as though it "+
      "were the first day of school. "+
      "OPTICS: handheld phone, crisp morning daylight, natural colour, small sway, slightly low angle. "+
      "PLACE: the front doorstep of a small house, a doormat, a pot of geraniums, a coat hook visible inside. "+
      "CHARACTER: a woman in her thirties in a dressing gown, thrilled and slightly silly about it. A tiny dachshund "+
      "puppy sitting on the doormat with enormous ears. "+
      "BEATS. 0.0-3.0s frame one is the puppy sitting on the mat blinking at the camera, and she says brightly "+
      "\"Big day for a very small dog.\" "+
      "3.0-7.5s she crouches and holds a plain white card up beside the puppy's face, comparing the tiny photo to the "+
      "tiny dog, and says \"That is the smallest photo I have ever taken.\" "+
      "7.5-11.5s the puppy immediately falls over sideways off the mat. She laughs and says \"He is thrilled.\" "+
      "11.5-15.0s she scoops the puppy up against her shoulder and says to the camera \"E-S-A Card. Thirty-nine dollars.\" "+
      "AUDIO: diegetic, birdsong, a door creak, puppy squeaks, plus a bright playful acoustic bed. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
];
