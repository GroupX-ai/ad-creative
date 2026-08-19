// ESA Card | heart-tug banners N1 and N2 | 2026-08-18
// The two survivors of the six-concept banner panel, approved by Robby with scripts 11-15.
// Brand kit as used by every prior ESA Card banner: cream #faf7f1, dark indigo #2b2a5c,
// marigold #f2a93b, real button label "Register My ESA".
//
// Two prop rules carried from the earlier waves, both learned from real failures:
//   - the collar carries NO tag (a tag spawns invented engraving)
//   - cardboard carries no writing and no printed tape (the model letters it otherwise)

const NO_EXTRA_TEXT =
  "The ONLY text in the image is the brand name ESA Card, the headline, the subheadline and the button label. " +
  "No feature chips, no badges, no percentages, no seals, no crests, no legal or government symbols, no other words anywhere. " +
  "Every line of type must fit completely inside the frame with a clear margin on all four sides. " +
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. " +
  "Spell the brand exactly E-S-A space C-a-r-d.";

export const BANNERS = [
  { id: "n1-grey-muzzle",
    prompt:
      "A tender close portrait photograph of a senior dog in soft window light: a labrador with a fully grey muzzle " +
      "and grey eyebrows, deep dark eyes looking straight into the lens, head resting on a worn sofa arm. The collar " +
      "is a plain flat fabric band with no tag, no buckle detail and nothing hanging from it. Warm domestic " +
      "background thrown gently out of focus. " +
      "Upper left, dark indigo hex #2b2a5c type reads \"Twelve years of him.\" " +
      "Beneath it, smaller, \"An emotional support animal ID card with his photo. $39 once.\" " +
      "Lower right, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". " +
      "Small dark indigo wordmark \"ESA Card\" top-right. Photographic, natural light, no gradients, no vignette. " +
      NO_EXTRA_TEXT },

  { id: "n2-moving-box",
    prompt:
      "A warm domestic photograph of a small tabby kitten fast asleep curled inside a plain cardboard moving box on a " +
      "wooden floor, paws tucked under its chin. Every piece of cardboard in the frame is completely blank: no " +
      "writing, no printed tape, no labels, no arrows, no symbols on any box. Two more plain boxes sit softly out of " +
      "focus behind it in late afternoon light. " +
      "Upper right, dark indigo hex #2b2a5c type reads \"Home is wherever she is.\" " +
      "Beneath it, smaller, \"Registered in about three minutes. $39 once.\" " +
      "Lower left, a marigold-yellow hex #f2a93b rounded button with dark indigo text reading \"Register My ESA\". " +
      "Small dark indigo wordmark \"ESA Card\" top-left. Photographic, natural light, no gradients, no vignette. " +
      NO_EXTRA_TEXT },
];
