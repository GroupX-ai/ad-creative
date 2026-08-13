// ESA Card | Reddit launch banners | 2026-08-13
// Brand truth pulled from esacard.com: globals.css tokens + lib/site.ts copy.
// Claim rule: every line below appears on the site verbatim or near-verbatim.
// "The letter is the law. The card is for your wallet." is SITE.mantra.
export const BRAND = {
  midnight: "#2b2a5c", ink: "#1c1b3a", marigold: "#f2a93b",
  cream: "#faf7f1", lavender: "#eceaf8",
};

const NO_EXTRA_TEXT =
  "The ONLY text in the image is the brand name ESA Card, the headline, the subheadline and the button label. " +
  "No feature chips, no badges, no percentages, no seals, no government crests, no legal symbols, no other words anywhere. " +
  "Every line of type must fit completely inside the frame with a clear margin on all four sides. " +
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. " +
  "Spell the brand exactly E-S-A space C-a-r-d.";

export const CONCEPTS = [
  {
    id: "c1-legalpad",
    family: "native-organic",
    headline: "The letter is the law.",
    sub: "The card is for your wallet.",
    cta: "Register My ESA",
    prompt:
      "A photograph, shot on a phone in natural window light, of a yellow legal pad lying on a scuffed wooden desk. " +
      "Hand-lettered in blue ballpoint on the pad, in ordinary imperfect handwriting, are the words " +
      "\"The letter is the law.\" on one line and \"The card is for your wallet.\" on the next. " +
      "Lower on the page, circled once in the same pen, the words \"Register My ESA\". " +
      "In the top corner of the pad, written smaller and underlined, the brand name \"ESA Card\". " +
      "A dog's paw rests at the edge of the frame. Deliberately unpolished and organic so it reads as a real photo " +
      "someone snapped, not an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting. " +
      NO_EXTRA_TEXT,
  },
  {
    id: "c2-offer-poster",
    family: "loud-direct-response",
    headline: "$39. One time.",
    sub: "No renewal fees, ever.",
    cta: "Register My ESA",
    prompt:
      "A bold flat-design direct-response poster. Deep indigo background hex #2b2a5c. " +
      "Enormous marigold-yellow hex #f2a93b condensed sans-serif type reading \"$39. One time.\" filling the upper half. " +
      "Below it in cream hex #faf7f1 the line \"No renewal fees, ever.\" " +
      "At the bottom a solid marigold-yellow rounded rectangle button with dark indigo text reading \"Register My ESA\". " +
      "Top-left corner, small cream wordmark reading \"ESA Card\". " +
      "Flat graphic design, high contrast, no photography, no illustration of animals. " +
      NO_EXTRA_TEXT,
  },
  {
    id: "c3-honest",
    family: "loud-direct-response",
    headline: "We do not sell ESA letters.",
    sub: "The card is for your wallet.",
    cta: "Register My ESA",
    prompt:
      "A stark honest-statement poster in the style of a public notice. Cream background hex #faf7f1 with a thick " +
      "marigold-yellow hex #f2a93b border stripe down the left edge. " +
      "Large dark indigo hex #2b2a5c serif type reading \"We do not sell ESA letters.\" " +
      "Beneath it, smaller and in muted grey, the line \"The card is for your wallet.\" " +
      "At the bottom a dark indigo rounded rectangle button with cream text reading \"Register My ESA\". " +
      "Top-right, a small dark indigo wordmark reading \"ESA Card\". " +
      "Plain, typographic, calm, no imagery, no icons, no illustration. " +
      NO_EXTRA_TEXT,
  },
  {
    id: "c4-product",
    family: "product-shot",
    headline: "Instant certificate and ID card.",
    sub: "$39, one time.",
    cta: "Register My ESA",
    prompt:
      "A clean product photograph on a soft lavender hex #eceaf8 surface. A credit-card sized wallet ID card lies at a " +
      "slight angle, showing a small photograph of a golden retriever, with a printed certificate partly visible behind it. " +
      "The card and certificate are blank of any readable body text. " +
      "Above the arrangement, dark indigo hex #2b2a5c type reads \"Instant certificate and ID card.\" " +
      "Below it, smaller, \"$39, one time.\" " +
      "At the bottom a marigold-yellow hex #f2a93b rounded rectangle button with dark indigo text reading \"Register My ESA\". " +
      "Small dark indigo wordmark \"ESA Card\" in the top-left. " +
      "Soft natural light, gentle shadow, no glow, no gradients. " +
      NO_EXTRA_TEXT,
  },
];
