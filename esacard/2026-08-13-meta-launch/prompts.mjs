// ESA Card | Meta launch | 2026-08-13
// Brand truth from esacard.com globals.css + lib/site.ts. Every spoken and printed line
// below is site copy verbatim or a direct restatement of it.
//
// Meta-specific claim constraint on top of the usual ones: Meta's personal-attributes
// policy forbids implying knowledge of the viewer's health, disability or mental state.
// So no second-person health language anywhere ("your anxiety", "your condition"). The
// speaker may describe their own situation; the viewer is never characterised. Health is
// kept out of the scripts entirely and the subject is the paperwork, not the person.

export const BRAND = { midnight:"#2b2a5c", ink:"#1c1b3a", marigold:"#f2a93b",
                       cream:"#faf7f1", lavender:"#eceaf8" };

const NO_EXTRA_TEXT =
  "The ONLY text in the image is the brand name ESA Card, the headline, the subheadline and the button label. " +
  "No feature chips, no badges, no percentages, no seals, no crests, no legal or government symbols, no other words anywhere. " +
  "Every line of type must fit completely inside the frame with a clear margin on all four sides. " +
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. " +
  "Spell the brand exactly E-S-A space C-a-r-d.";

export const BANNERS = [
  { id:"m1-carry", headline:"Legitimacy you can carry.", sub:"$39, one time.", cta:"Register My ESA",
    prompt:"A warm lifestyle photograph in soft window light. A person's hands hold an open brown leather wallet "+
      "with a credit-card sized ID card tucked in the card slot, a small photograph of a dog visible on the card. "+
      "A scruffy terrier sits blurred in the background. The card carries no readable body text of any kind. "+
      "Upper area, dark indigo hex #2b2a5c type reads \"Legitimacy you can carry.\" Below it, smaller, \"$39, one time.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Natural shadow, no glow, no gradients. " + NO_EXTRA_TEXT },
  { id:"m2-three-minutes", headline:"About three minutes.", sub:"Certificate and card, sent instantly.", cta:"Register My ESA",
    prompt:"A clean flat-design graphic on cream hex #faf7f1. Three simple numbered marigold-yellow hex #f2a93b circles "+
      "in a row, containing only the numerals 1, 2 and 3, with no words beside them. "+
      "Above them, large dark indigo hex #2b2a5c type reads \"About three minutes.\" "+
      "Below the circles, smaller muted grey type reads \"Certificate and card, sent instantly.\" "+
      "Bottom, a dark indigo rounded button with cream text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-right. Minimal, generous white space, no illustration, no icons. " + NO_EXTRA_TEXT },
  { id:"m3-offer", headline:"$39. One time.", sub:"No renewal fees, ever.", cta:"Register My ESA",
    prompt:"A bold editorial poster. Cream hex #faf7f1 background with an enormous dark indigo hex #2b2a5c serif "+
      "numeral treatment reading \"$39. One time.\" occupying the upper two thirds. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"No renewal fees, ever.\" "+
      "A small photograph of a tabby cat sits in the lower left corner, cleanly cut out, no border. "+
      "Bottom right, a dark indigo rounded button with cream text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Flat, typographic, high contrast. " + NO_EXTRA_TEXT },
  { id:"m4-honest", headline:"We do not sell ESA letters.", sub:"We make the card that goes in your wallet.", cta:"Register My ESA",
    prompt:"A stark typographic public-notice poster. Deep indigo hex #2b2a5c background. "+
      "Large cream hex #faf7f1 serif type reads \"We do not sell ESA letters.\" "+
      "Beneath it, smaller marigold-yellow hex #f2a93b type reads \"We make the card that goes in your wallet.\" "+
      "A thin marigold-yellow rule separates the two lines. "+
      "Bottom, a marigold-yellow rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small cream wordmark \"ESA Card\" top-right. Purely typographic, calm, no imagery, no icons, no illustration. " + NO_EXTRA_TEXT },
];

// ---------------------------------------------------------------------------
// Video. Seedance 2.5, 15s, 720p, 9:16. Recipe and ban list from the vault playbook,
// with the batch-5 hardening applied:
//   - hook lands in the first second, never an establishing shot
//   - word budget 33-38 for 15s
//   - brand name never before the final third
//   - phonetic rule WITH a rhyme anchor (batch 5: the plain phonetic rule still
//     produced "Email Chaper" once). "E-S-A" is an initialism and the likeliest
//     failure is the model saying "eesa", so it is spelled out and rhymed.
//   - anything held or shown is described exhaustively, stating what IS on it, not
//     just what is banned (the inverted-mechanic failure that killed c49 roll 1)
//   - performances are allowed energy; the batch-4 "nobody is enjoying themselves"
//     block is deliberately absent
// ---------------------------------------------------------------------------

const BRAND_SAY =
  "SPEECH RULE: the only words spoken in the entire video are the lines quoted in the beats below. " +
  "No narration, no voice-over, no counting, no muttering, no reading of stage directions, no improvised lines, " +
  "no filler words that are not written. " +
  "PRONUNCIATION: the brand is said as four clear syllables, \"ee ess ay card\", spelling out the three letters " +
  "E, S, A one at a time and then the word card. The letter A rhymes exactly with day. " +
  "Never say it as a single word \"eesa\" and never say \"esa\".";

const CARD_RULE =
  "CARD RULE: any ID card visible in shot is a plain matte white credit-card-sized rectangle with a single small " +
  "square photograph of a dog in its upper left corner and three short featureless grey lines beside that photograph. " +
  "That is the complete and exhaustive contents of the card. There is no logo, no seal, no crest, no badge, no shield, " +
  "no barcode, no QR code, no flag, no readable writing and no numbers anywhere on it.";

const BAN =
  "BAN LIST: no on-screen text of any kind, no captions, no subtitles, no lower thirds, no logos, no watermarks, " +
  "no UI overlays, no end card, no slow motion, no drone or crane moves, no gliding dolly, no lens flares, " +
  "no glowing particles, no holograms, no floating screens, no teal-and-orange grade, no montage, no stock-footage look, " +
  "no glass-walled office, no medical imagery, no clinic, no hospital, no pill bottles, no therapy couch.";

export const VIDEOS = [
  {
    id:"v1-front-desk", words:38,
    prompt:
      "A fifteen-second vertical selfie video, shot on a phone front camera by the woman speaking. It is a real person " +
      "talking to her own camera, not an advertisement and not a commercial. "+
      "OPTICS: phone front camera, slightly wide and soft, natural daylight through a car windscreen, mild handheld drift, " +
      "visible sensor noise in the shadows, focus imperfect. "+
      "PLACE: the driver's seat of an ordinary older car parked outside an apartment block. A cardboard coffee cup in the " +
      "holder, a crumpled receipt on the passenger seat, a dog lead looped over the gear stick. A calm beagle sits in the " +
      "passenger seat and looks at her once. "+
      "CHARACTER: a woman in her early thirties in a plain grey hoodie, hair up, no makeup, real skin texture, animated and " +
      "a little exasperated, talking quickly the way someone does when venting to a friend. "+
      "BEATS. 0.0-2.0s she is already mid-sentence at the top of frame one, holding a plain white card up beside her face, " +
      "and says \"My leasing office wanted paperwork for my dog.\" "+
      "2.0-6.5s she lowers the card and says \"A therapist's letter is the actual law. This card is not that.\" "+
      "6.5-11.0s she shrugs and says \"It's what I hand the front desk so the conversation stays short.\" "+
      "11.0-15.0s she holds the card up again and says \"Three minutes. Thirty-nine dollars. E-S-A Card.\" "+
      "AUDIO: diegetic only, the hum of the car, a distant road, the beagle shifting on the seat. No music. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
  {
    id:"v2-talk-you-out", words:36,
    prompt:
      "A fifteen-second vertical selfie video of a man talking straight to his own phone camera at a cluttered home desk. " +
      "It is a founder speaking plainly to camera, not an advertisement and not a commercial. "+
      "OPTICS: phone front camera propped slightly too low, natural light from a window to the left, mild handheld wobble, " +
      "shallow imperfect focus, sensor noise in the corners. "+
      "PLACE: a cramped home office, a mug ringed with coffee stains, a tangle of charger cables, a dying pot plant, a " +
      "stack of unopened post. A large mixed-breed dog is asleep on a bed behind him. "+
      "CHARACTER: a man in his late thirties in a washed-out navy t-shirt, unshaven, direct and slightly amused at himself, " +
      "leaning in toward the lens. "+
      "BEATS. 0.0-3.0s frame one is his face already close to the lens, and he says \"I sell E-S-A cards. Here's what " +
      "mine can't do.\" "+
      "3.0-8.0s he leans back and says \"It can't get a dog into housing. Only a therapist's letter does that.\" "+
      "8.0-11.5s flatly, with a small shrug, \"We don't sell those. We never will.\" "+
      "11.5-15.0s he picks a plain white card off the desk, holds it up and says \"We make the card. Thirty-nine dollars, once.\" "+
      "AUDIO: diegetic only, a keyboard somewhere, the dog's breathing, faint street noise. No music. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
  {
    id:"v3-wallet", words:34,
    prompt:
      "A fifteen-second vertical video, shot handheld on a phone by a friend, of a young man on a apartment building " +
      "doorstep with a small scruffy terrier. It reads as a real clip someone filmed, not an advertisement. "+
      "OPTICS: phone rear camera, handheld, overcast afternoon daylight, slight motion blur as he moves, natural contrast, " +
      "no colour grading. "+
      "PLACE: the concrete steps of a plain brick apartment building, a row of dented metal postboxes, a bicycle chained to " +
      "a railing, litter in the gutter. "+
      "CHARACTER: a man in his twenties in a green work jacket, cheerful and quick, crouching to scratch the terrier's ears " +
      "between lines. "+
      "BEATS. 0.0-2.5s frame one is him already pulling a plain white card out of his back pocket, and he says \"Front desk " +
      "asked what he is.\" "+
      "2.5-7.0s he flicks the card once with a finger and says \"So now I just show them this instead of explaining.\" "+
      "7.0-11.0s he crouches to the terrier and says, half to the dog, \"It's not a legal document. It's a card.\" "+
      "11.0-15.0s standing, straight to camera, \"Took three minutes. E-S-A Card.\" "+
      "AUDIO: diegetic only, traffic, the terrier's collar tags, footsteps on concrete. No music. "+
      CARD_RULE + " " + BRAND_SAY + " " + BAN },
];
