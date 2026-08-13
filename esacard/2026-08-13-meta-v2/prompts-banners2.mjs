// ESA Card | banner wave 2 | 2026-08-13
// Robby approved b1-b4 plus m1-carry and m3-offer. Same formula throughout:
// warm real pet photography (or confident flat typography) + one benefit line
// from the marketing site + the real offer + the real button label.
import { BANNERS as WAVE1 } from "./prompts.mjs";

const NO_EXTRA_TEXT =
  "The ONLY text in the image is the brand name ESA Card, the headline, the subheadline and the button label. " +
  "No feature chips, no badges, no percentages, no seals, no crests, no legal or government symbols, no other words anywhere. " +
  "Every line of type must fit completely inside the frame with a clear margin on all four sides. " +
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. " +
  "Spell the brand exactly E-S-A space C-a-r-d.";

// The four approved concepts, re-rendered vertical for Stories and Reels.
export const VERTICALS = WAVE1;

export const NEW = [
  { id:"n1-cat-keeps-you-well", shape:"square_hd",
    prompt:"A warm emotional lifestyle photograph in soft afternoon light. A man in his forties lies on a sofa reading, "+
      "with a large fluffy grey cat curled asleep on his chest under his chin, both utterly content. A knitted throw, "+
      "a bookshelf behind. Upper left, dark indigo hex #2b2a5c type reads \"For the animal that keeps you well.\" "+
      "Beneath it, smaller, \"Certificate and wallet card. $39, one time.\" "+
      "Lower right, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-right. Photographic, natural light, no gradients. " + NO_EXTRA_TEXT },
  { id:"n2-no-appointments", shape:"square_hd",
    prompt:"A bright confident flat-design poster. Cream hex #faf7f1 background. Large dark indigo hex #2b2a5c serif "+
      "type reads \"No appointments. No waiting rooms.\" set on two lines in the upper half. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"Your certificate, issued instantly.\" "+
      "A cleanly cut-out photograph of a relaxed sitting greyhound occupies the lower right with no border. "+
      "Lower left, a dark indigo rounded button with cream text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Flat, typographic, generous space. " + NO_EXTRA_TEXT },
  { id:"n3-verifiable", shape:"square_hd",
    prompt:"A clean bright product photograph on a pale lavender hex #eceaf8 surface, shot from directly above. A hand "+
      "holds a credit-card sized white wallet ID card showing a small photograph of a black pug. The card carries no "+
      "readable body text at all. A phone lies beside it, its screen a plain solid pale grey rectangle with nothing on it. "+
      "Top, dark indigo hex #2b2a5c type reads \"Verifiable by anyone.\" Below it, smaller muted grey, "+
      "\"A number anyone can check.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Crisp overhead light, soft shadow. " + NO_EXTRA_TEXT },
  { id:"n4-wall-and-wallet", shape:"square_hd",
    prompt:"A warm interior photograph. A framed cream certificate hangs on a pale wall above a hallway console table, "+
      "and on the table sits an open brown leather wallet with a small white ID card tucked in it. The certificate and "+
      "the card carry no readable body text at all. A ginger cat sits on the table beside the wallet looking up. "+
      "Upper right, dark indigo hex #2b2a5c type reads \"One for the wall. One for your wallet.\" "+
      "Beneath it, smaller, \"$39, one time.\" "+
      "Lower left, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Natural window light, homely. " + NO_EXTRA_TEXT },
  { id:"n5-his-photo", shape:"square_hd",
    prompt:"A tight warm close-up photograph. A woman's hand holds a white credit-card sized ID card up beside the face "+
      "of a real chocolate labrador, so the small photograph on the card and the actual dog are side by side and "+
      "obviously the same dog. The card carries no readable body text at all. Softly blurred garden behind. "+
      "Top, dark indigo hex #2b2a5c type reads \"His photo. Your wallet.\" Below it, smaller, \"$39, one time.\" "+
      "Bottom, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-right. Golden natural light, shallow depth of field. " + NO_EXTRA_TEXT },
  { id:"n6-no-subscription", shape:"portrait_16_9",
    prompt:"A bold editorial poster. Deep indigo hex #2b2a5c background. Enormous cream hex #faf7f1 serif type reads "+
      "\"$39. No subscription.\" filling the upper half on two lines. "+
      "Beneath it, marigold-yellow hex #f2a93b type reads \"No renewal fees, ever.\" "+
      "A cleanly cut-out photograph of a happy sitting corgi occupies the lower left with no border. "+
      "Lower right, a marigold-yellow rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small cream wordmark \"ESA Card\" top-right. Flat, high contrast, confident. " + NO_EXTRA_TEXT },
  { id:"n7-instant-cat", shape:"portrait_16_9",
    prompt:"A bright cheerful lifestyle photograph. A young woman sits cross-legged on a bed holding a small tabby kitten "+
      "up to her face, both looking at the camera, sunlight through a window behind them. "+
      "Upper area, dark indigo hex #2b2a5c type reads \"An instant certificate for your emotional support animal.\" "+
      "Beneath it, smaller muted grey, \"No appointments. No waiting rooms.\" "+
      "Lower area, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small dark indigo wordmark \"ESA Card\" top-left. Warm, candid, natural light. " + NO_EXTRA_TEXT },
  { id:"n8-three-minutes-vert", shape:"portrait_16_9",
    prompt:"A joyful outdoor lifestyle photograph. A man crouches on a park path laughing as a wet springer spaniel "+
      "shakes itself beside him, autumn leaves on the ground, soft low sun. "+
      "Upper area, cream hex #faf7f1 type on a subtle dark scrim reads \"ESA certificate in 3 minutes.\" "+
      "Beneath it, smaller, \"Emailed the moment you finish.\" "+
      "Lower area, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". "+
      "Small cream wordmark \"ESA Card\" top-right. Candid, warm, natural light. " + NO_EXTRA_TEXT },
];
