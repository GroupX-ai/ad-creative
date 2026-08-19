// ESA Card | weird-animal variants of the two banners that produced sales | 2026-08-19
//
// Robby: "Please create a duplicate our `ESA Card | Meta | US | Cold | Checkouts` campaign
// with entirely new ads based on these best performing ones: IMG p2-offer-square,
// IMG p6-forever-square, UGC u6-rabbit. Exact same video ad script and exact banner style
// and text - but replace them with weird animals."
//
// So: the layout, the hexes, the type hierarchy, the button, the corner wordmark and every
// word of copy are lifted verbatim from `2026-08-14-spelled-out/prompts.mjs`. The ONLY
// variable is the cut-out animal. That is the whole point: if a weird animal wins, the win
// is the animal and not a new headline.
//
// Square only. `p2-offer-square` and `p6-forever-square` carry 5 of the account's 6 sales
// and Facebook Feed carries 4 of them on $111.27; the vertical cuts of the same two designs
// sold nothing. Square is what Feed serves, so square is what gets duplicated.
//
// Claim safety: no line here promises anything beyond the card, the certificate, the price
// and the absence of renewals, so nothing in it needs a footnote (docs/ads/policy.md §0).
// The site's own funnel offers "Rabbits, birds, reptiles. Companions come in all shapes.",
// which is what makes a turtle, a raven or a snake an honest subject for this creative.

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

// ── Layout A: the p2-offer poster, verbatim. Only `subject` changes. ──
const offer = (subject) =>
  "A bold editorial poster. Cream hex #faf7f1 background with enormous dark indigo hex #2b2a5c serif type " +
  "reading \"$39. One time.\" across the upper half. " +
  "Beneath it, marigold-yellow hex #f2a93b type reads \"Emotional support animal certificate and ID card.\" " +
  "Under that, smaller dark indigo type reads \"No renewal fees, ever.\" " +
  subject + " sits in the lower left corner with no border. " +
  "Lower right, a dark indigo rounded button with cream text. " + mark("dark indigo") +
  "Flat, typographic, high contrast. " + RULES;

// ── Layout B: the p6-forever poster, verbatim. Only `subject` changes. ──
const forever = (subject) =>
  "A bold editorial poster. Cream hex #faf7f1 background. Enormous dark indigo hex #2b2a5c serif type reads " +
  "\"$39. Once. Forever.\" on three tight lines in the upper two thirds. " +
  "Beneath it, marigold-yellow hex #f2a93b type reads \"Emotional support animal registration. No renewal fees.\" " +
  subject + " occupies the lower left with no border. " +
  "Lower right, a dark indigo rounded button with cream text. " + mark("dark indigo") +
  "Flat, typographic, confident. " + RULES;

export const BANNERS = [
  // ── Layout A · "$39. One time." (the p2-offer winner: $29.53, 8 checkouts, 3 sales) ──
  { id: "w1-turtle", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a small pet turtle with a glossy olive-green domed shell, " +
      "neck fully extended and head raised alert toward the lens") },
  { id: "w2-alligator", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a baby American alligator about a foot long, dark and " +
      "glossy with pale yellow bands, mouth closed, looking up toward the lens") },
  { id: "w3-raven", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a glossy iridescent black raven standing side-on with its " +
      "head turned toward the lens, one bright eye visible") },
  { id: "w4-snake", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a ball python coiled into a neat spiral, patterned tan and " +
      "dark brown, its head raised and resting calmly on the top coil") },
  { id: "w5-pig", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a small black-and-white pot-bellied pig standing side-on " +
      "with its snout raised and one ear flopped forward") },

  // ── Layout B · "$39. Once. Forever." (the p6-forever winner: $6.78, 2 checkouts, 2 sales) ──
  { id: "w6-egg", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out studio photograph of a plain smooth white chicken egg standing upright " +
      "on two tiny bare cartoon legs with two tiny bare cartoon arms held out at its sides, with two small " +
      "black dot eyes and a tiny content smile, photographed like a real physical vinyl toy with a soft " +
      "shadow under its feet") },
  { id: "w7-hedgehog", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a small hedgehog sitting up on its back legs with its " +
      "pale pink nose raised and its tiny front paws held together") },
  { id: "w8-chicken", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a plump speckled grey-and-white hen standing side-on " +
      "with a bright red comb, head turned toward the lens") },
  { id: "w9-axolotl", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a pale pink axolotl with feathery pink external gills " +
      "fanned out on both sides of its head and a wide permanent smile, seen side-on") },
  { id: "w10-cockatoo", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a white sulphur-crested cockatoo perched side-on with " +
      "its bright yellow crest fully raised and its head turned toward the lens") },
];
