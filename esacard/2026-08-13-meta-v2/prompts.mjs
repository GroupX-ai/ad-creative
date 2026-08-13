// ESA Card | Meta batch 2 | 2026-08-13
// Rebuilt after Robby's verdict on batch 1: it led with disclaimers instead of selling.
// Winners he kept were m1-carry and m3-offer, both warm pet photography + a real benefit
// + a real offer. That is the template here.
//
// Every line below is copy from the marketing site, not the disclaimer page:
//   hero H1     "An instant certificate for your emotional support animal."
//   hero sub    "...for the animal that keeps you well ... No appointments. No waiting
//                rooms. No renewal fees, ever."
//   benefit     "Makes everyday moments easier at leasing offices, with building staff,
//                and at pet-friendly hotels"
//   benefit     "Celebrates what your companion actually does for you"
//   how it works "ESA Certificate in 3 Minutes" / "Forever - no renewal fees"
//   card page   "A number anyone can check, and no one can misread"

const NO_EXTRA_TEXT =
  "The ONLY text in the image is the brand name ESA Card, the headline, the subheadline and the button label. " +
  "No feature chips, no badges, no percentages, no seals, no crests, no legal or government symbols, no other words anywhere. " +
  "Every line of type must fit completely inside the frame with a clear margin on all four sides. " +
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. " +
  "Spell the brand exactly E-S-A space C-a-r-d.";

export const BANNERS = [
  { id:"b1-keeps-you-well", headline:"For the animal that keeps you well.", sub:"Certificate and wallet card. $39, one time.",
    prompt:"A warm, emotional lifestyle photograph in golden late-afternoon light. A woman in her thirties sits on a "+
      "worn sofa with her arms around a large gentle golden retriever, her forehead resting against the dog's head, "+
      "both calm and content, eyes closed. Soft home clutter behind them, a knitted blanket, a lamp. "+
      "Upper left, dark indigo hex #2b2a5c type reads \"For the animal that keeps you well.\" "+
      "Beneath it, smaller, \"Certificate and wallet card. $39, one time.\" "+
      "Lower right, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-right. Photographic, natural light, no gradients, no glow. " + NO_EXTRA_TEXT },
  { id:"b2-instant-certificate", headline:"An instant certificate for your emotional support animal.", sub:"No appointments. No waiting rooms.",
    prompt:"A bright product-hero photograph on a pale lavender hex #eceaf8 surface. A printed certificate lies flat "+
      "with a credit-card sized wallet ID card resting on top at a slight angle, a small photograph of a happy corgi "+
      "visible on the card. Both the certificate and the card are blank of any readable body text. "+
      "A corgi sits just behind, slightly out of focus, ears up. "+
      "Top, dark indigo hex #2b2a5c type reads \"An instant certificate for your emotional support animal.\" "+
      "Below it, smaller muted grey type reads \"No appointments. No waiting rooms.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Clean, bright, soft shadow. " + NO_EXTRA_TEXT },
  { id:"b3-three-minutes", headline:"ESA certificate in 3 minutes.", sub:"Emailed the moment you finish.",
    prompt:"A cheerful lifestyle photograph. A young man sits at a sunlit kitchen table holding a phone, laughing, "+
      "while a scruffy jack russell stands on the table beside him looking straight at the lens. A coffee cup and a "+
      "fruit bowl on the table. The phone screen is a plain solid pale grey rectangle with nothing on it at all. "+
      "Upper area, dark indigo hex #2b2a5c type reads \"ESA certificate in 3 minutes.\" "+
      "Beneath it, smaller, \"Emailed the moment you finish.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-right. Warm, candid, natural light. " + NO_EXTRA_TEXT },
  { id:"b4-forever", headline:"$39. Once. Forever.", sub:"No renewal fees, ever.",
    prompt:"A bold editorial poster. Cream hex #faf7f1 background. Enormous dark indigo hex #2b2a5c serif type reads "+
      "\"$39. Once. Forever.\" filling the upper two thirds, set on three tight lines. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"No renewal fees, ever.\" "+
      "A cleanly cut-out photograph of a happy beagle sitting, tongue out, occupies the lower left corner with no border. "+
      "Lower right, a dark indigo rounded button with cream text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Flat, typographic, high contrast, confident. " + NO_EXTRA_TEXT },
];

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
  "centre, and nothing else on it at all.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no lower thirds, no logos, no watermarks, no UI " +
  "overlays, no end card, no slow motion, no drone or crane moves, no lens flares, no glowing particles, no holograms, " +
  "no teal-and-orange grade, no stock-footage look, no medical imagery, no clinic, no pill bottles, no therapy couch, " +
  "no bus, no train, no aeroplane, no airport, no public transport of any kind, no service-dog vest, no harness labelled " +
  "with writing, no uniformed official.";

export const VIDEOS = [
  {
    id:"w1-window-seat", angle:"leasing office, the site's own named context",
    prompt:
      "A fifteen-second vertical video, handheld on a phone, warm and upbeat, following a woman moving into a new flat "+
      "with her dog. "+
      "OPTICS: phone camera, handheld with natural sway, bright afternoon sun through bare windows, warm natural contrast, "+
      "real lens softness at the edges. "+
      "PLACE: an empty sunlit one-bedroom flat, cardboard boxes stacked by a wall, a rolled rug, bare floorboards, a set of "+
      "keys on the windowsill. "+
      "CHARACTER: a woman in her early thirties in dungarees and a t-shirt, sleeves pushed up, delighted and a bit "+
      "out of breath, smiling widely. A tan staffordshire terrier trots at her heels, tail going. "+
      "BEATS. 0.0-3.0s frame one is her carrying a box through the door with the dog rushing past her ankles, and she "+
      "says brightly to the camera \"New building. First thing they asked about was him.\" "+
      "3.0-7.5s she sets the box down, pulls a plain white card from her back pocket, holds it up and says \"Had his card "+
      "right here. Whole conversation took a minute.\" "+
      "7.5-11.5s the dog jumps onto the wide windowsill and settles into the sun, and she laughs and says \"And now he's "+
      "got the window.\" "+
      "11.5-15.0s she scratches the dog's chest, looks at the camera and says \"E-S-A Card. Thirty-nine dollars.\" "+
      "AUDIO: diegetic, plus a warm gentle acoustic guitar bed, low under the dialogue. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
  {
    id:"w2-best-part", angle:"'celebrates what your companion actually does for you'",
    prompt:
      "A fifteen-second vertical video, handheld on a phone, tender and warm, of a man on his back doorstep at golden "+
      "hour with an old dog. "+
      "OPTICS: phone camera, handheld, low golden sun flaring gently off the step, warm natural colour, soft focus falloff. "+
      "PLACE: a worn concrete back step of a small terraced house, an overgrown garden, a chewed tennis ball, a watering "+
      "can on its side. "+
      "CHARACTER: a man in his forties in a faded flannel shirt, unshaven, warm and open, sitting with his arm around a "+
      "grey-muzzled labrador who leans into him heavily. He speaks quietly and fondly, smiling. "+
      "BEATS. 0.0-3.0s frame one is the labrador shoving its head under his hand, and he says, laughing \"He is the reason "+
      "I get up early now.\" "+
      "3.0-7.5s he ruffles the dog's ears and says \"Two years, and he is still the best part of the day.\" "+
      "7.5-11.5s he reaches beside him and lifts a cream certificate onto his knee, showing it to the dog, and says "+
      "\"So I got him something with his name on it.\" "+
      "11.5-15.0s he looks at the camera, still smiling, and says \"E-S-A Card. Certificate and wallet card, thirty-nine "+
      "dollars.\" "+
      "AUDIO: diegetic garden birds and distant traffic, plus a soft warm piano bed low under the dialogue. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
  {
    id:"w3-three-minutes", angle:"speed, the how-it-works promise",
    prompt:
      "A fifteen-second vertical selfie video, bright and quick and funny, of a woman at her kitchen table with a cat. "+
      "OPTICS: phone front camera, propped against something so it tilts slightly, bright morning kitchen light, natural "+
      "colour, mild sensor noise. "+
      "PLACE: a cluttered small kitchen, a chipped mug, a cereal box, a pile of post, a fruit bowl. A large fluffy ginger "+
      "cat sits squarely in the middle of the table refusing to move. "+
      "CHARACTER: a woman in her late twenties in a oversized jumper, hair messy, quick and amused, talking fast with "+
      "her hands. "+
      "BEATS. 0.0-3.0s frame one is the cat stepping directly in front of the lens and being moved aside, and she says "+
      "laughing \"Three minutes and one terrible photo of her.\" "+
      "3.0-7.5s she counts on her fingers and says \"Name. Breed. Birthday. That was the whole thing.\" "+
      "7.5-11.5s she holds up a plain white card beside the cat's face, comparing them, and says \"And it was in my inbox "+
      "before the kettle boiled.\" "+
      "11.5-15.0s grinning at the camera \"E-S-A Card. Thirty-nine dollars, no renewals.\" "+
      "AUDIO: diegetic kitchen sounds, a kettle rising, the cat's purr, plus a light playful ukulele bed low under the "+
      "dialogue. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
];
