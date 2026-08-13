// ESA Card | full re-render with the acronym spelled out | 2026-08-13
// Robby: "My partner said nobody knows what an ESA card is. Use Emotional Support Animal,
// never ESA."
//
// Three consequences, applied to every asset here:
//   1. No headline or subheadline uses the acronym. Every banner now carries the words
//      "emotional support animal" in full, so a cold viewer knows what is being sold.
//   2. The button is "Register My Emotional Support Animal", not "Register My ESA".
//   3. The corner lockup is the domain, esacard.com, rather than an "ESA Card" wordmark.
//      The domain is the one place the letters are unavoidable, and as a URL it reads as
//      an address rather than as an unexplained acronym.

const CTA = "Register My Emotional Support Animal";

const RULES =
  "The ONLY text in the image is the domain esacard.com, the headline, the subheadline and the button label. " +
  "No feature chips, no badges, no percentages, no seals, no crests, no legal or government symbols, no other words anywhere. " +
  "The button label reads exactly \"" + CTA + "\" and may wrap onto two lines inside the button. " +
  "Never abbreviate emotional support animal to three letters anywhere in the image. " +
  "Every line of type must fit completely inside the frame with a clear margin on all four sides. " +
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole.";

const mark = (colour) =>
  `A small ${colour} lowercase wordmark reading exactly "esacard.com" sits in the top corner. `;

export const BANNERS = [
  // ── the two Robby kept from the first Meta wave ──
  { id:"p1-carry", shapes:["square_hd","portrait_16_9"],
    prompt:"A warm lifestyle photograph in soft window light. A person's hands hold an open brown leather wallet with a "+
      "credit-card sized ID card in the card slot, a small photograph of a border terrier visible on it. The card carries "+
      "no readable body text. The real terrier sits alert beside them. "+
      "Upper area, dark indigo hex #2b2a5c type reads \"Legitimacy you can carry.\" "+
      "Beneath it, smaller, \"An emotional support animal certificate and wallet card. $39, one time.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Natural light, no gradients, no glow. " + RULES },
  { id:"p2-offer", shapes:["square_hd","portrait_16_9"],
    prompt:"A bold editorial poster. Cream hex #faf7f1 background with enormous dark indigo hex #2b2a5c serif type "+
      "reading \"$39. One time.\" across the upper half. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"Emotional support animal certificate and ID card.\" "+
      "Under that, smaller dark indigo type reads \"No renewal fees, ever.\" "+
      "A cleanly cut-out photograph of a tabby cat sits in the lower left corner with no border. "+
      "Lower right, a dark indigo rounded button with cream text. " + mark("dark indigo") +
      "Flat, typographic, high contrast. " + RULES },
  // ── the four from wave 2 ──
  { id:"p3-keeps-you-well", shapes:["square_hd","portrait_16_9"],
    prompt:"A warm emotional lifestyle photograph in golden late-afternoon light. A woman in her thirties sits on a worn "+
      "sofa with her arms around a large gentle golden retriever, her forehead against the dog's head, both content. "+
      "Upper left, dark indigo hex #2b2a5c type reads \"For the animal that keeps you well.\" "+
      "Beneath it, smaller, \"Your emotional support animal certificate and wallet card. $39, one time.\" "+
      "Lower right, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Photographic, natural light. " + RULES },
  { id:"p4-instant-certificate", shapes:["square_hd","portrait_16_9"],
    prompt:"A bright product-hero photograph on pale lavender hex #eceaf8. A printed certificate lies flat with a "+
      "credit-card sized white ID card resting on it at an angle, a small photograph of a corgi on the card. Both carry "+
      "no readable body text. A corgi sits behind, slightly out of focus. "+
      "Top, dark indigo hex #2b2a5c type reads \"An instant certificate for your emotional support animal.\" "+
      "Below, smaller muted grey, \"No appointments. No waiting rooms.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Clean, bright, soft shadow. " + RULES },
  { id:"p5-three-minutes", shapes:["square_hd","portrait_16_9"],
    prompt:"A cheerful lifestyle photograph. A young man sits at a sunlit kitchen table holding a phone, laughing, while "+
      "a jack russell stands on the table looking at the lens. The phone screen is a plain solid pale grey rectangle "+
      "with nothing on it. "+
      "Upper area, dark indigo hex #2b2a5c type reads \"Register your emotional support animal in 3 minutes.\" "+
      "Beneath it, smaller, \"Certificate and ID card, emailed the moment you finish.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Warm, candid, natural light. " + RULES },
  { id:"p6-forever", shapes:["square_hd","portrait_16_9"],
    prompt:"A bold editorial poster. Cream hex #faf7f1 background. Enormous dark indigo hex #2b2a5c serif type reads "+
      "\"$39. Once. Forever.\" on three tight lines in the upper two thirds. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"Emotional support animal registration. No renewal fees.\" "+
      "A cleanly cut-out photograph of a sitting beagle, tongue out, occupies the lower left with no border. "+
      "Lower right, a dark indigo rounded button with cream text. " + mark("dark indigo") +
      "Flat, typographic, confident. " + RULES },
  // ── the eight from wave 3 ──
  { id:"p7-cat-keeps-well", shapes:["square_hd"],
    prompt:"A warm lifestyle photograph in soft afternoon light. A man in his forties lies on a sofa reading with a large "+
      "fluffy grey cat asleep on his chest under his chin. "+
      "Upper left, dark indigo hex #2b2a5c type reads \"For the animal that keeps you well.\" "+
      "Beneath it, smaller, \"Emotional support animal certificate and wallet card. $39, one time.\" "+
      "Lower right, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Photographic, natural light. " + RULES },
  { id:"p8-no-appointments", shapes:["square_hd"],
    prompt:"A bright flat-design poster. Cream hex #faf7f1 background. Large dark indigo hex #2b2a5c serif type reads "+
      "\"No appointments. No waiting rooms.\" on two lines in the upper half. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"Your emotional support animal certificate, issued instantly.\" "+
      "A cleanly cut-out photograph of a sitting greyhound occupies the lower right with no border. "+
      "Lower left, a dark indigo rounded button with cream text. " + mark("dark indigo") +
      "Flat, generous space. " + RULES },
  { id:"p9-verifiable", shapes:["square_hd"],
    prompt:"A clean bright overhead product photograph on pale lavender hex #eceaf8. A hand holds a credit-card sized "+
      "white ID card showing a small photograph of a black pug. The card carries no readable body text. A phone lies "+
      "beside it, its screen a plain solid pale grey rectangle with nothing on it. "+
      "Top, dark indigo hex #2b2a5c type reads \"A number anyone can check.\" "+
      "Below, smaller muted grey, \"Every emotional support animal registration is verifiable online.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Crisp overhead light. " + RULES },
  { id:"p10-wall-and-wallet", shapes:["square_hd"],
    prompt:"A warm interior photograph. A framed cream certificate hangs on a pale wall above a hallway table, and on the "+
      "table sits an open brown leather wallet with a small white ID card in it. Neither carries readable body text. "+
      "A ginger cat sits on the table looking up. "+
      "Upper right, dark indigo hex #2b2a5c type reads \"One for the wall. One for your wallet.\" "+
      "Beneath it, smaller, \"Emotional support animal certificate and ID card. $39.\" "+
      "Lower left, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Natural window light, homely. " + RULES },
  { id:"p11-his-photo", shapes:["square_hd"],
    prompt:"A tight warm close-up photograph. A woman's hand holds a white credit-card sized ID card beside the face of a "+
      "chocolate labrador, so the small photograph on the card and the real dog are side by side and obviously the same "+
      "dog. The card carries no readable body text. Softly blurred garden behind. "+
      "Top, dark indigo hex #2b2a5c type reads \"His photo. Your wallet.\" "+
      "Below, smaller, \"An emotional support animal ID card, $39 one time.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Golden light, shallow depth of field. " + RULES },
  { id:"p12-no-subscription", shapes:["portrait_16_9"],
    prompt:"A bold editorial poster. Deep indigo hex #2b2a5c background. Enormous cream hex #faf7f1 serif type reads "+
      "\"$39. No subscription.\" on two lines in the upper half. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"Emotional support animal registration, once and for good.\" "+
      "A cleanly cut-out photograph of a sitting corgi occupies the lower left with no border. "+
      "Lower right, a marigold-yellow rounded button with dark indigo text. " + mark("cream") +
      "Flat, high contrast. " + RULES },
  { id:"p13-instant-cat", shapes:["portrait_16_9"],
    prompt:"A bright cheerful lifestyle photograph. A young woman sits cross-legged on a bed holding a small tabby kitten "+
      "up to her face, both looking at the camera, sunlight behind them. "+
      "Upper area, dark indigo hex #2b2a5c type reads \"An instant certificate for your emotional support animal.\" "+
      "Beneath it, smaller muted grey, \"No appointments. No waiting rooms. $39, one time.\" "+
      "Lower area, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("dark indigo") +
      "Warm, candid. " + RULES },
  { id:"p14-park", shapes:["portrait_16_9"],
    prompt:"A joyful outdoor lifestyle photograph. A man crouches on a park path laughing as a wet springer spaniel shakes "+
      "itself beside him, autumn leaves, low sun. "+
      "Upper area, cream hex #faf7f1 type on a subtle dark scrim reads \"Register your emotional support animal in 3 minutes.\" "+
      "Beneath it, smaller, \"Certificate and ID card, emailed instantly.\" "+
      "Lower area, a marigold-yellow hex #f2a93b rounded button with dark indigo text. " + mark("cream") +
      "Candid, warm. " + RULES },
];
