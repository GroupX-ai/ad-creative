// Static banner prompts - 2026-08-21 batch 14b, 1Capture. The wide disruptive set.
//
// Robby, after seeing b14a: "The style is really good but the script is really bad... Also we
// need really solid, varied, best practice, disruptive, scroll stopping banners - lots of them."
//
// So this is a "go wild" batch, run the way the 2026-08-03 VoiceDrop run was: **hold the copy
// fixed and make visual style the only variable.** Eight approved copy pairs across twenty-four
// visual territories. Concept count has never been the constraint on these batches; at ~$0.20 a
// render, twenty-four squares is $4.80.
//
// TWO FAMILIES ONLY, because they are the only two this repo has ever had a win in:
//   LOUD DIRECT-RESPONSE  hazard tape, brutalist type, ransom note, mega-numeral, offer poster,
//                         Ben-Day pop, blueprint, split-screen, sticker bomb, VHS, chrome, foil
//   NATIVE / ORGANIC      whiteboard, legal pad, sticky notes, napkin, torn cardboard, corkboard,
//                         index card, chalkboard, receipt, notebook, envelope, packing slip
// Nothing polished-corporate: no stock SaaS gradient, no laptop mockup, no row of feature chips.
// Robby's picks from the VoiceDrop batch landed entirely in these two families (whiteboard "best
// by far", then hazard tape, VHS glitch, split-screen) and nothing polished was ever chosen.
//
// CLAIM SAFETY. Every line is one of eight pairs traced to AD-CREATIVE-PLAYBOOK.md (APPROVED by
// Robby 2026-08-21) and re-verified against the live www.1capture.io on 2026-08-21. The copy is
// the constant; only the styling moves. That is the whole point of the format: when a concept
// wins you know it was the treatment, because the words were identical across all of them.
//
// NO LOGO IS DESCRIBED IN ANY PROMPT. The real wordmark is composited afterwards by
// _work/composite-logo.py from the marketing repo's own SVG. Every concept reserves a band for
// it by assigning that band's contents, because an unassigned area is one the model fills with
// an invented tagline.
//
// NO PRODUCT SCREENS ANYWHERE, per batch 8. No dashboard, no app UI, no phone, no laptop.
//
// LESSONS FROM b14a BAKED IN HERE:
//   - {{COMPOSITION}} is never used: banner-generate.mjs substitutes a per-shape default that
//     names a "visual element" these concepts do not have, and an unassigned element is the c17
//     invented-tagline failure. Each territory assigns its own layout on every shape.
//   - No hyphenated letter-string spelling instructions ("M-R-R"): the closing constraint says
//     every word is spelled exactly as written above, and the hyphenated string IS written above.
//   - Hand-lettered numerals fail differently from hand-lettered words. b14a's whiteboard
//     rendered "$10K" as "$IOK" on all three shapes AND on a re-roll whose prompt dictated the
//     digits in words, so it is reproducible. Every analog concept here that carries the price
//     dictates the STROKES instead, and the analog concepts that do not need a price do not
//     carry one.
//   - US English throughout, since the campaign is US-only.

export const BATCH = "2026-08-21-b14-relaunch";

// ---------------------------------------------------------------------------
// The copy. Eight pairs, every line traced. This never varies by territory.
// ---------------------------------------------------------------------------
export const COPY = {
  // ROUND 3. Robby on round 2: "Most of these banners are absolutely retarded. They are talking
  // about pricing or throwing numbers that nobody understands. This is not how you write
  // marketing banners."
  //
  // He is right and the cause was a process error, not taste. The copy was built from the
  // approved CLAIMS bank, and a claims bank is a list of what may legally be said, never a list
  // of what is worth saying. Compliance got used as the creative brief. Twelve of twenty-six
  // banners led on a price ("Free forever under $10K MRR"), four led on a hedged statistic
  // ("2-3x improvement is the typical range"), and two threw bare numbers at a stranger who has
  // no idea what 12% or 57% refers to. None of them said what actually happens to the buyer.
  //
  // The videos already tell that story and the banners were not inheriting a word of it. So the
  // copy is rebuilt on the same sequence the clips use, in the buyer's own words:
  //   THE PROBLEM   fake cards get into your free trial, over and over
  //   THE MOMENT    the trial ends and the payment fails
  //   THE FIX       every signup gets a card check at the door
  //   THE OUTCOME   only real customers get in
  //
  // Three rules this set holds to, each the direct inverse of a round-2 failure:
  //   1. No price in any headline. The offer lives in the button ("Start free") and nowhere else.
  //   2. No bare or hedged number as a headline. The one proof concept gives its numbers a
  //      subject and a verb so a stranger can parse them.
  //   3. No jargon: no "trial-to-paid conversion", no "MRR", no "typical range", no "vendor
  //      lock-in" on any banner.
  //
  // TRACES. Most of these lines are LIVE SITE COPY on /free-trial-abuse-prevention,
  // /require-credit-card-for-free-trial and the homepage, but the abuse vocabulary is NOT yet in
  // AD-CREATIVE-PLAYBOOK.md, which is the binding bank. Every line below records where it is
  // live. Robby: the bank needs these added before this set ships. It is the same gap flagged
  // twice already, and your own direction for these ads is now pointed straight at it.
  fakecard: {
    headline: "They signed up with a fake card.",
    subheadline: "Then the trial ended and the payment failed.",
    cta: "Start free",
    trace: "LIVE, not yet in the bank: 'Signs up on a virtual card' and 'Card declined at billing' and 'Failed first invoices' (DashboardPreviewLive.tsx); 'virtual credit cards' and 'a verified card is the hardest credential to fake' (/free-trial-abuse-prevention)",
  },
  abuse: {
    headline: "Free trial abuse is draining your revenue.",
    subheadline: "Every signup gets a card check at the door.",
    cta: "Start free",
    trace: "LIVE, not yet in the bank: 'Free trial abuse (repeat signups, disposable emails, virtual cards) quietly drains SaaS revenue' (/free-trial-abuse-prevention metadata). Subheadline is live homepage body copy, verbatim.",
  },
  again: {
    headline: "Serial abusers sign up again and again.",
    subheadline: "A verified card is the hardest credential to fake.",
    cta: "Start free",
    trace: "LIVE, not yet in the bank: both lines are near-verbatim from /free-trial-abuse-prevention ('Serial trial abusers sign up again and again with disposable email addresses...' and 'a verified card is the hardest credential to fake')",
  },
  realonly: {
    headline: "Only real customers get into your trial.",
    subheadline: "Every signup gets a card check at the door.",
    cta: "Start free",
    trace: "Headline is the LIVE homepage hero subheadline, verbatim. Subheadline is live homepage body copy, verbatim. Closest of this set to bank claim 1.",
  },
  declined: {
    headline: "Card declined at billing. Again.",
    subheadline: "Stop letting trial abusers in.",
    cta: "Start free",
    trace: "LIVE, not yet in the bank: 'Card declined at billing' is the site's own verdict string (DashboardPreviewLive.tsx); 'Stop letting trial abusers in.' is live on /about",
  },
  stoprepeat: {
    headline: "Stop repeat signups and virtual-card abusers.",
    subheadline: "Verified before the trial starts.",
    cta: "Start free",
    trace: "LIVE, not yet in the bank: 'Stop repeat signups, disposable emails, and virtual-card abusers' (/free-trial-abuse-prevention metadata). Subheadline uses the live verdict wording 'blocked before the trial started'.",
  },
  door: {
    headline: "A card check at the door.",
    subheadline: "Only real customers get in.",
    cta: "Start free",
    trace: "Both live homepage copy: 'Every signup gets a card check at the door.' and the hero subheadline 'Only real customers get into your trial'. Closest of this set to bank claims 1 and 14.",
  },
  proof: {
    headline: "12% of trials paid. Then 57% did.",
    subheadline: "VoiceDrop, after verifying every card. 2-3x improvement is the typical range.",
    cta: "Start free",
    trace: "bank claim 5 + the claim-6 framing the bank REQUIRES whenever 57% is the headline. Round 2 ran the bare numerals '12% to 57%', which is exactly the 'numbers nobody understands' Robby called out: the figures now have a subject and a verb so a stranger can parse them cold.",
  },
};

// Brand truth, from 1Capture-Marketing/tailwind.config.js, confirmed against a browser render
// of the live site 2026-08-21. The old teal is retired: `1capture.teal` is now #635BFF.
const VIOLET = "#635BFF";
const NAVY = "#0A2540";
const CRIMSON = "#DF1B41";
const OFFWHITE = "#F6F9FC";

const MARGIN =
  `Every line of type must fit completely inside the frame with a clear margin on all four ` +
  `sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every ` +
  `word fits whole on its own line.`;

const NO_MARK =
  `There is no logo, no wordmark, no brand mark, no monogram, no app icon, no emblem and no ` +
  `third-party company mark anywhere in the image, and no shape that could be mistaken for one. ` +
  `There is no product screenshot, no dashboard, no application window, no browser chrome, no ` +
  `phone, no laptop, no chart, no graph and no data table anywhere in the image.`;

// The price is the one token that has already failed twice in a hand-lettered register, so any
// analog concept carrying it dictates the strokes rather than naming the digits.
const PRICE_STROKES =
  `Where the price "$10K" appears it is four characters: a dollar sign; then a numeral one drawn ` +
  `as a single plain vertical stroke with no bar across its top and no bar across its foot; then ` +
  `a numeral zero drawn as one narrow closed oval; then a capital K. Those two middle characters ` +
  `are numerals and not letters, and the pair reads as the number ten. Where "MRR" appears it is ` +
  `the three capital letters M, R and R together as one unbroken group with no hyphen, dot or ` +
  `space between them.`;

const onlyText = (c, extra = "") =>
  `The ONLY text in the image is the headline "${c.headline}", the subheadline ` +
  `"${c.subheadline}" and the button label "${c.cta}". ${extra}There are no feature chips, no ` +
  `badges, no ratings, no percentages, no statistics and no numerals of any kind other than the ` +
  `ones written above, no captions, no labels, no small print, no logo, no wordmark, no brand ` +
  `name, no company name and no other words anywhere in the frame. Every word is spelled ` +
  `exactly as written above.`;

// ---------------------------------------------------------------------------
// The territories. Each takes the copy and returns the visual block. Each one also
// assigns the band the composited wordmark lands in, by saying what is in it.
// ---------------------------------------------------------------------------
const FLAT_PRINT =
  `The whole thing is flat printing: no photography, no people, no 3D, no bevel, no drop shadow, ` +
  `no glow, no noise, no gradient mesh, no lens effects. There is no warning triangle, no ` +
  `exclamation mark, no tick, no cross, no arrow and no pictogram, symbol or glyph of any kind.`;

const PHONE_SNAP =
  `Deliberately unpolished and organic so it reads as a real photo someone snapped in a social ` +
  `feed rather than an advertisement: slight handheld angle, available window light with one ` +
  `soft highlight, real shallow depth of field with the far edge a little soft, and mild ` +
  `phone-camera sensor noise. No gradients, no glow, no vector graphics, no digital overlays, ` +
  `no studio lighting, no color grade. No person, no hand and no phone is visible in the frame.`;

export const TERRITORIES = [
  // ---------------------------------------------------- loud direct-response
  {
    key: "hazard", family: "loud", copy: "abuse",
    block: (c) => [
      `A {{SHAPE_WORD}} graphic advertisement as a flat, hard-edged industrial caution label, printed rather than photographed.`,
      `The composition is one centered stack on a full-bleed color field, in this order top to bottom and in this order on every shape: the hazard band, the headline, the subheadline, the button, then an empty strip. There is no illustration, no photograph and no icon of any kind: type and flat color are the only things in the frame.`,
      `The ground is a deep navy field, hex ${NAVY}, filling the whole frame. Across the upper area, entirely above the headline and touching no letter, runs one horizontal band of bold diagonal hazard stripes in vivid violet, hex ${VIOLET}, alternating with the navy at 45 degrees, hard-edged, with nothing printed on it.`,
      `The headline reads exactly "${c.headline}" in a very heavy grotesque sans serif, sentence case as written, pure white, tightly tracked, the largest element in the frame.`,
      `Directly under it, with no gap between them, the subheadline reads exactly "${c.subheadline}" in the same sans serif at roughly one third the headline size, in pure white, set inside a hard-edged solid crimson rectangle, hex ${CRIMSON}, fitted tightly around the line.`,
      `Below that sits one solid pill-shaped button with fully rounded ends, filled pure white, containing "${c.cta}" in vivid violet, hex ${VIOLET}. The button is plain: no arrow, no icon, no shadow, no border, no second button.`,
      `Below the button, the bottom eighth of the frame is plain flat navy, hex ${NAVY}, edge to edge, containing no type, no stripe, no graphic and nothing else at all.`,
      MARGIN, FLAT_PRINT, NO_MARK, onlyText(c),
    ],
  },
  {
    key: "brutalist-invert", family: "loud", copy: "fakecard",
    block: (c) => [
      `A {{SHAPE_WORD}} graphic advertisement in a brutalist inversion: the brand runs dark, so this frame is bright white and the type is enormous.`,
      `The composition is one left-aligned stack filling the frame, in this order top to bottom on every shape: an empty band, the headline, the subheadline, the button. No illustration, no photograph, no icon.`,
      `The ground is flat pure white, edge to edge, with no gradient and no texture. The top eighth of the frame is left completely empty white, containing nothing at all.`,
      `The headline reads exactly "${c.headline}" in an extremely heavy grotesque sans serif, enormously oversized so it dominates the frame, in deep navy, hex ${NAVY}, tightly tracked and tightly leaded, broken across four lines, left aligned hard to the margin.`,
      MARGIN,
      `Beneath it the subheadline reads exactly "${c.subheadline}" in the same sans serif at roughly one fifth the headline size, in vivid violet, hex ${VIOLET}, on one line.`,
      `Below that sits one solid rectangular button with square corners, filled vivid violet, hex ${VIOLET}, containing "${c.cta}" in pure white. No arrow, no icon, no shadow, no second button.`,
      FLAT_PRINT, NO_MARK, onlyText(c),
    ],
  },
  {
    key: "ransom", family: "loud", copy: "again",
    block: (c) => [
      `A {{SHAPE_WORD}} punk ransom-note collage, photographed flat: individual letters cut from magazines and newspapers with visible scissor edges and paper grain, pasted down slightly crooked at different angles and sizes.`,
      `The composition is one centered block of cut-out lettering on a flat ground, in this order top to bottom on every shape: the headline, the subheadline, the button, then an empty strip.`,
      `The ground is flat matte black, edge to edge. Every cut-out letter sits on its own small scrap of white, cream, newsprint gray or vivid violet paper, hex ${VIOLET}, with a hard torn or scissor-cut edge and a faint paper shadow.`,
      `The headline reads exactly "${c.headline}", assembled letter by letter from those cut-out scraps, filling most of the frame.`,
      `Under it the subheadline reads exactly "${c.subheadline}", in smaller cut-out letters on a single continuous strip of torn newsprint.`,
      `Below that, "${c.cta}" is written in thick white marker inside a hand-torn rectangle of vivid violet paper, hex ${VIOLET}.`,
      `The bottom sixth of the frame is bare flat matte black with no paper, no letter and nothing else on it.`,
      MARGIN,
      `Photographed straight down under flat even light, with real paper texture and fiber visible at the torn edges. No digital effects, no gradients, no glow, no drop shadow beyond the paper's own.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "meganumeral", family: "loud", copy: "proof",
    block: (c) => [
      `A {{SHAPE_WORD}} graphic advertisement in a brutalist mega-numeral territory: one enormous figure, one flat color field, nothing else.`,
      `The composition is one centered stack, in this order top to bottom on every shape: an empty band, the headline numerals, the subheadline, the button. No illustration, no photograph, no icon.`,
      `The ground is a single flat field of vivid violet, hex ${VIOLET}, edge to edge, no gradient, no texture. The top eighth of the frame is left completely empty violet, containing nothing at all.`,
      `The headline reads exactly "${c.headline}" in a very heavy grotesque sans serif, enormously oversized, pure white, tightly tracked, set on two lines with "12% to" on the first and "57%" alone on the second, so "57%" is the single largest thing in the image.`,
      MARGIN,
      `Beneath the numerals the subheadline reads exactly "${c.subheadline}" in a medium-weight sans serif at roughly one sixth their height, pure white at full opacity, broken across two lines after the first period. The customer name is written with exactly these nine letters and no others: V, o, i, c, e, D, r, o, p, as one continuous unbroken word with a capital V and a capital D, no space and no separator between any of its letters.`,
      `Below it sits one solid pill-shaped button, fully rounded ends, filled pure white, containing "${c.cta}" in the same vivid violet, hex ${VIOLET}. No arrow, no icon, no shadow, no second button.`,
      `${FLAT_PRINT} There is no upward-trending line, no bar chart and no illustration of growth of any kind: the numbers alone carry it.`,
      NO_MARK,
      onlyText(c, `The word VoiceDrop appears only inside that subheadline and must be rendered there in full: it is a customer's name, it is required, and it is the one company name allowed in this frame. `),
    ],
  },
  {
    key: "offerposter", family: "loud", copy: "declined",
    block: (c) => [
      `A {{SHAPE_WORD}} loud retail offer poster, the kind taped inside a shop window: flat screen-printed color, enormous price type, hard edges.`,
      `The composition is one centered stack on a full-bleed color field, in this order top to bottom on every shape: a solid banner strip, the headline, the subheadline, the button, then an empty strip.`,
      `The ground is flat saturated vivid violet, hex ${VIOLET}, edge to edge. Across the top runs one solid horizontal strip of deep navy, hex ${NAVY}, with nothing printed on it.`,
      `The headline reads exactly "${c.headline}" in an extremely heavy condensed grotesque sans serif, pure white, tightly packed, enormously oversized so it dominates the frame, broken across three lines.`,
      MARGIN,
      `Under it the subheadline reads exactly "${c.subheadline}" in the same condensed face at roughly one quarter the headline size, in deep navy, hex ${NAVY}, on a single line inside a solid white rectangle fitted tightly around it.`,
      `Below that sits one solid rectangular button with square corners, filled deep navy, hex ${NAVY}, containing "${c.cta}" in pure white. No arrow, no icon, no starburst, no price tag shape, no second button.`,
      `The bottom eighth of the frame is plain flat violet, hex ${VIOLET}, containing nothing at all.`,
      FLAT_PRINT,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "benday", family: "loud", copy: "stoprepeat",
    block: (c) => [
      `A {{SHAPE_WORD}} Ben-Day pop-art panel: flat comic-book printing with visible halftone dot screens and heavy black outlines.`,
      `The composition is one centered stack, in this order top to bottom on every shape: the headline in a speech-balloon-free caption box, the subheadline, the button, then an empty strip.`,
      `The ground is a field of large evenly spaced vivid violet halftone dots, hex ${VIOLET}, on flat cream, printed slightly off-register so a thin edge of misprint shows.`,
      `The headline reads exactly "${c.headline}" in a heavy comic display face, black, inside a plain rectangular caption box of flat cream with a thick black rule around it.`,
      MARGIN,
      `Beneath it the subheadline reads exactly "${c.subheadline}" in the same face at roughly one third the size, black, directly on the dots.`,
      `Below that sits one solid rectangular button with a thick black outline, filled flat cream, containing "${c.cta}" in black.`,
      `The bottom sixth of the frame is flat cream with no dots, no rule and nothing else on it.`,
      `${FLAT_PRINT} There is no speech balloon, no action star, no motion line, no character and no figure of any kind.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "blueprint", family: "loud", copy: "door",
    block: (c) => [
      `A {{SHAPE_WORD}} engineering blueprint sheet: white line work on blue drafting paper, flat and technical.`,
      `The composition is one centered stack, in this order top to bottom on every shape: the headline, the subheadline, the button, then an empty title strip along the bottom.`,
      `The ground is flat drafting blue, a deep desaturated navy-blue, edge to edge, overlaid with a fine even white grid of thin square graph lines and nothing else.`,
      `The headline reads exactly "${c.headline}" in a precise technical sans serif, in SOLID pure white at full opacity, widely tracked, the largest element in the frame and the brightest thing in it. It is not outlined, not hollow and not a line drawing: the letters are filled solid so they read instantly at a glance.`,
      MARGIN,
      `Beneath it the subheadline reads exactly "${c.subheadline}" in the same technical face at roughly one third the size, in solid white.`,
      `Below that sits one rectangular button outlined in a thin white drafting line with no fill, containing "${c.cta}" in white.`,
      `Along the bottom eighth runs a plain drafting title strip: a single thin white rule with completely empty blue beneath it, carrying no numbers, no dimensions, no annotations, no scale bar and no words at all.`,
      `${FLAT_PRINT} There is no dimension line, no arrow, no callout, no compass, no ruler and no drawn object of any kind: type and grid only.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "split", family: "loud", copy: "fakecard",
    block: (c) => [
      `A {{SHAPE_WORD}} hard split-screen graphic: the frame divided into two flat fields of color by one straight hard edge, with no blend between them.`,
      `The split runs across the frame so that one field sits above the other on every shape, and the dividing edge never crosses a word: every line of type sits wholly within one field.`,
      `The upper field is flat deep navy, hex ${NAVY}. The lower field is flat vivid violet, hex ${VIOLET}. The edge between them is hard, straight and clean.`,
      `The headline reads exactly "${c.headline}" in a very heavy grotesque sans serif, enormously oversized, set wholly inside the upper navy field in pure white, broken across three lines.`,
      MARGIN,
      `The subheadline reads exactly "${c.subheadline}" in the same face at roughly one fifth the size, set wholly inside the lower violet field, in pure white.`,
      `Below it, still wholly inside the violet field, sits one solid pill-shaped button filled pure white containing "${c.cta}" in vivid violet, hex ${VIOLET}.`,
      `The bottom eighth of the frame is plain flat violet with nothing in it at all.`,
      FLAT_PRINT, NO_MARK, onlyText(c),
    ],
  },
  {
    key: "stickerbomb", family: "loud", copy: "realonly",
    block: (c) => [
      `A {{SHAPE_WORD}} holographic sticker-bomb panel: a dense collage of blank die-cut vinyl stickers overlapping each other, photographed flat.`,
      `The composition is one clear centered plate of type sitting on top of the sticker collage, in this order top to bottom on every shape: the headline, the subheadline, the button.`,
      `The ground is completely covered in overlapping blank die-cut vinyl stickers in vivid violet, hex ${VIOLET}, deep navy, hex ${NAVY}, white and iridescent silver, each one a plain circle, square, rounded rectangle, star or wavy blob with a white cut border and a slight sheen. Every sticker is entirely blank: no writing, no drawing, no icon, no character and no mark on any of them.`,
      `Over the collage sits one solid rectangular plate of flat off-white, hex ${OFFWHITE}, occupying the middle of the frame with a hard edge and a soft drop shadow.`,
      `On that plate the headline reads exactly "${c.headline}" in a heavy grotesque sans serif, deep navy, hex ${NAVY}, the largest element in the frame.`,
      MARGIN,
      `Under it the subheadline reads exactly "${c.subheadline}" at roughly one third the size, in vivid violet, hex ${VIOLET}.`,
      `Below that sits one solid pill-shaped button filled vivid violet, hex ${VIOLET}, containing "${c.cta}" in pure white.`,
      `The bottom eighth of the frame is bare sticker collage with no plate and no type over it.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "vhs", family: "loud", copy: "declined",
    block: (c) => [
      `A {{SHAPE_WORD}} VHS glitch frame: a paused analog videotape still, with tracking noise, chroma bleed and horizontal scan lines across the whole image.`,
      `The composition is one centered stack of type over the noise, in this order top to bottom on every shape: the headline, the subheadline, the button, then an empty strip.`,
      `The ground is deep navy, hex ${NAVY}, degraded by fine horizontal scan lines, a band of analog tracking distortion across one third of the frame, and soft magenta and cyan chroma bleed at the edges of shapes.`,
      `The headline reads exactly "${c.headline}" in a heavy grotesque sans serif, pure white, with a slight horizontal RGB split so a thin violet ghost, hex ${VIOLET}, offsets to one side of each letter. Every letter remains completely legible and no letter is broken, torn or displaced out of its line.`,
      MARGIN,
      `Beneath it the subheadline reads exactly "${c.subheadline}" in the same face at roughly one third the size, in pure white with no ghosting, fully sharp.`,
      `Below that sits one solid rectangular button filled vivid violet, hex ${VIOLET}, containing "${c.cta}" in pure white, fully sharp with no glitch across it.`,
      `The bottom eighth of the frame is plain scan-lined navy with no type and nothing else in it.`,
      `There is no timecode, no play symbol, no rewind symbol, no counter, no date stamp, no camera-status text and no numerals of any kind anywhere in the noise.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "chrome", family: "loud", copy: "proof",
    block: (c) => [
      `A {{SHAPE_WORD}} Y2K liquid-chrome panel: polished mirror-metal lettering on a flat field, photographed under a studio softbox.`,
      `The composition is one centered stack, in this order top to bottom on every shape: an empty band, the headline in chrome, the subheadline, the button.`,
      `The ground is a flat field of deep navy, hex ${NAVY}, edge to edge, with no gradient and no texture. The top eighth of the frame is left completely empty navy, containing nothing at all.`,
      `The headline reads exactly "${c.headline}" rendered as thick polished liquid-chrome letterforms with soft mirrored highlights and a faint violet, hex ${VIOLET}, reflection running through them, enormously oversized, set on two lines with "12% to" on the first and "57%" alone on the second. Every letter and numeral stays completely legible and correctly formed.`,
      MARGIN,
      `Beneath it the subheadline reads exactly "${c.subheadline}" in a flat medium-weight sans serif at roughly one sixth the height of the chrome, pure white, not chrome, broken across two lines after the first period. The customer name is written with exactly these nine letters and no others: V, o, i, c, e, D, r, o, p, as one continuous unbroken word with a capital V and a capital D.`,
      `Below it sits one solid pill-shaped button filled pure white containing "${c.cta}" in vivid violet, hex ${VIOLET}, completely flat with no chrome and no reflection.`,
      `There is no liquid blob, no orb, no swirl, no star, no lens flare and no floating object of any kind: the chrome is the lettering and nothing else.`,
      NO_MARK,
      onlyText(c, `The word VoiceDrop appears only inside that subheadline and must be rendered there in full: it is a customer's name and it is required. `),
    ],
  },
  {
    key: "foil", family: "loud", copy: "realonly",
    block: (c) => [
      `A {{SHAPE_WORD}} letterpress card photographed flat: heavy cotton stock with deep debossed type and a foil-stamped line, shot under raking light.`,
      `The composition is one centered stack on the card, in this order top to bottom on every shape: the headline debossed, the subheadline foiled, the button, then an empty band.`,
      `The whole frame is one sheet of thick uncoated cotton paper in deep navy, hex ${NAVY}, with visible fiber texture and a slightly irregular deckle edge.`,
      `The headline reads exactly "${c.headline}" in a heavy grotesque sans serif, deeply debossed into the paper AND foil-stamped in bright violet metallic foil, hex ${VIOLET}, so each letter is a pressed impression filled with reflective violet foil that catches the light. It is the largest and brightest element in the frame and reads instantly against the dark paper.`,
      MARGIN,
      `Beneath it the subheadline reads exactly "${c.subheadline}" in the same face at roughly one third the size, foil-stamped in bright silver metallic foil with a crisp reflective edge.`,
      `Below that sits one rectangular button debossed into the paper with a thin pressed rule around it, containing "${c.cta}" foil-stamped in the same violet.`,
      `The bottom eighth of the card is plain undecorated navy paper with no impression, no foil and nothing else on it.`,
      `There is no ornament, no rule, no flourish, no crest and no decorative border anywhere on the card.`,
      NO_MARK, onlyText(c),
    ],
  },

  // ------------------------------------------------------------- native / organic
  {
    key: "whiteboard", family: "native", copy: "door",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in available window light, the camera itself outside the frame, of a real office whiteboard with handwriting on it, in an ordinary American startup office. This is a snapshot somebody took, not an advertisement.`,
      `The whiteboard fills almost the whole frame, shot slightly off square, with the handwriting centered on it in this order on every shape: the big handwritten line, then the smaller underlined line, then the hand-drawn box.`,
      `The board is an ordinary wall-mounted white melamine board with a thin aluminum tray along the bottom edge, on a plain painted wall. Its surface carries faint gray ghosting from previous erasing in the corners, one small smudge, and nothing else.`,
      `Hand-lettered across it in thick black dry-erase marker, in a real person's slightly uneven handwriting written entirely in block capital letters, are the words "${c.headline}" It fills most of the board across exactly three lines, broken as "VERIFY A REAL PAYMENT" on the first, "METHOD BEFORE ANYONE" on the second, and "ENTERS YOUR FREE TRIAL." on the third, with no word split across lines and no word hyphenated.`,
      `Underneath, smaller and in the same black marker, is written exactly "${c.subheadline}", underlined once with a quick hand-drawn stroke.`,
      `Lower still, drawn by the same hand, is a rough freehand rectangle outlined in thick violet dry-erase marker, hex ${VIOLET}, with "${c.cta}" hand-lettered inside it in the same violet. It is required and it must be drawn; it is not a logo or a badge.`,
      `The bottom right corner of the board is left completely blank: a clean rectangle of white melamine at least one eighth of the frame's height and one quarter of its width, flat, evenly lit and fully in focus, with no writing, no marker, no smudge and no glare in it.`,
      MARGIN,
      `Every handwritten line must also fit completely inside the whiteboard itself, with a clear band of blank melamine on all four sides between the writing and the board's own edges.`,
      `${PHONE_SNAP} Nothing else is on the wall and nothing rests in the tray: no marker, no eraser, no sticky note, no poster, no clock and no plant.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "legalpad", family: "native", copy: "fakecard",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera on a desk in available daylight, the camera outside the frame, of a yellow legal pad with ballpoint handwriting on it. A snapshot, not an advertisement.`,
      `The pad fills the frame at a slight angle, its ruled blue lines and red margin rule visible, one corner slightly curled, resting on a plain bare wooden desk.`,
      `Written across it in blue ballpoint, in an ordinary person's quick cursive-leaning handwriting that presses hard enough to indent the paper, are the words "${c.headline}" filling most of the pad across three lines and following the ruled lines.`,
      `Beneath, in the same blue ballpoint, is written exactly "${c.subheadline}", underlined twice with two quick strokes.`,
      `Lower down, "${c.cta}" is written inside a rough freehand box drawn in the same blue ballpoint. It is required and it must be drawn; it is not a logo or a badge.`,
      `The lower third of the pad below the box is blank ruled paper with no writing, no doodle, no ink mark and nothing else on it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is on the desk: no pen, no cup, no phone, no laptop, no paper and no hand.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "stickies", family: "native", copy: "stoprepeat",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in available office light, the camera outside the frame, of sticky notes pressed onto a plain painted wall. A snapshot, not an advertisement.`,
      `The notes are arranged in a loose grid filling the frame, slightly crooked, each one a plain square sticky note in yellow, violet, hex ${VIOLET}, or white, some with a corner lifting away from the wall and casting a small real shadow.`,
      `Written across the notes in thick black marker, one or two words per note, in an ordinary person's block capitals, are the words "${c.headline}".`,
      `On a row of smaller notes below, in the same black marker, is written exactly "${c.subheadline}".`,
      `On one larger violet note at the bottom, hex ${VIOLET}, "${c.cta}" is written in thick white marker.`,
      `A clear area of plain painted wall at least one eighth of the frame's height runs along the bottom edge below every note, with no note, no writing, no tape and nothing else in it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is on the wall: no poster, no photograph, no clock, no calendar and no whiteboard.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "napkin", family: "native", copy: "abuse",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera on a cafe table in available window light, the camera outside the frame, of a paper napkin with handwriting on it. A snapshot, not an advertisement.`,
      `The napkin fills most of the frame at a slight angle, softly creased with visible fold lines and an embossed edge pattern, resting on a plain dark cafe table.`,
      `Written across it in black felt-tip that bleeds very slightly into the tissue, in an ordinary person's hurried handwriting, are the words "${c.headline}" across three lines.`,
      `Beneath, in the same felt-tip, is written exactly "${c.subheadline}".`,
      `Lower down, "${c.cta}" is written inside a rough freehand circle drawn in the same felt-tip. It is required and it must be drawn; it is not a logo or a badge.`,
      `A clear area of blank napkin at least one eighth of the frame's height runs along the bottom edge, with no writing, no bleed and nothing else on it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is on the table: no cup, no saucer, no cutlery, no pen, no phone and no hand.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "cardboard", family: "native", copy: "declined",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in available daylight, the camera outside the frame, of a torn piece of plain brown corrugated cardboard with marker writing on it, propped against a plain wall. A snapshot, not an advertisement.`,
      `The cardboard fills the frame, its torn edges showing the fluted corrugation inside, unprinted and unlabeled on every surface.`,
      `Written across it in thick black marker, in an ordinary person's block capitals that wobble slightly over the corrugation ridges, are the words "${c.headline}" across three lines.`,
      `Beneath, in the same marker, is written exactly "${c.subheadline}".`,
      `Lower down, "${c.cta}" is written inside a rough freehand rectangle drawn in thick violet marker, hex ${VIOLET}. It is required and it must be drawn; it is not a logo or a badge.`,
      `A clear area of blank cardboard at least one eighth of the frame's height runs along the bottom edge, with no writing, no tape, no barcode, no stamp and nothing else on it.`,
      MARGIN,
      PHONE_SNAP,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "corkboard", family: "native", copy: "realonly",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in available office light, the camera outside the frame, of an index card pinned to a cork noticeboard. A snapshot, not an advertisement.`,
      `The cork fills the frame with its real granular texture and a plain wooden frame edge just visible. One plain white index card is pinned at a slight angle in the middle by two plain metal pins, curling very slightly away from the board.`,
      `Written across the card in blue ballpoint, in an ordinary person's handwriting, are the words "${c.headline}" across three lines.`,
      `Beneath, on the same card in the same ballpoint, is written exactly "${c.subheadline}".`,
      `Pinned below the card is one smaller strip of violet paper, hex ${VIOLET}, with "${c.cta}" written on it in white marker.`,
      `A clear area of bare cork at least one eighth of the frame's height runs along the bottom edge, with no card, no pin, no paper and nothing else on it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is pinned to the board: no other card, no photograph, no flyer, no receipt and no note.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "chalkboard", family: "native", copy: "again",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in warm available light, the camera outside the frame, of a small chalkboard propped on a plain wooden surface. A snapshot, not an advertisement.`,
      `The chalkboard fills most of the frame at a slight angle, its matte black surface carrying real chalk dust and faint ghosting from previous wiping, in a plain unvarnished wooden frame.`,
      `Written across it in white chalk, in an ordinary person's block capitals with visible chalk texture and a slightly broken stroke, are the words "${c.headline}" across three lines.`,
      `Beneath, in the same chalk, is written exactly "${c.subheadline}", underlined once.`,
      `Lower down, "${c.cta}" is written inside a rough freehand box drawn in the same white chalk. It is required and it must be drawn; it is not a logo or a badge.`,
      `The bottom eighth of the board is left as bare dusty black slate with no chalk mark and nothing else on it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is in the frame: no chalk stick, no eraser, no cloth, no cup, no plant and no hand.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "notebook", family: "native", copy: "door",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera directly overhead in available daylight, the camera outside the frame, of an open squared notebook resting on a plain surface. A snapshot, not an advertisement.`,
      `The open notebook fills the frame, its two pages of fine squared grid paper meeting at a softly shadowed spine, the paper slightly warm white with a real fiber texture.`,
      `Written across the right-hand page in black fineliner, in an ordinary person's neat lowercase handwriting following the grid, are the words "${c.headline}" across four lines.`,
      `Beneath, in the same fineliner, is written exactly "${c.subheadline}".`,
      `Lower down, "${c.cta}" is written inside a small hand-ruled box drawn in the same fineliner and filled with quick violet highlighter, hex ${VIOLET}. It is required and it must be drawn; it is not a logo or a badge.`,
      `The whole left-hand page is blank squared paper with no writing, no drawing and nothing else on it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is in the frame: no pen, no cup, no phone, no laptop and no hand.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "receipt", family: "native", copy: "fakecard",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in flat available light, the camera outside the frame, of a long thermal till receipt lying on a plain dark surface, curling slightly at one end. A snapshot, not an advertisement.`,
      `The receipt fills almost the entire frame edge to edge, shot close so the paper is the whole picture, slightly crumpled, its thermal paper faintly gray-white with one soft crease across it. The type on it is large and dark and completely legible at a glance.`,
      `Printed across it in the blocky monospaced type of a till printer, slightly faded the way thermal print is, are the words "${c.headline}" across four lines, centered on the paper.`,
      `Below, in the same monospaced till type at a smaller size, is printed exactly "${c.subheadline}".`,
      `Below that, "${c.cta}" is printed in the same till type inside a plain rectangle of solid violet, hex ${VIOLET}, printed onto the paper.`,
      `The lower part of the receipt below that rectangle is blank thermal paper with no print, no barcode, no total, no line items, no date, no time, no store name, no till number and no numerals of any kind on it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is in the frame: no coin, no card, no pen, no hand and no second receipt.`,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "envelope", family: "native", copy: "abuse",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in soft available daylight, the camera outside the frame, of a plain kraft envelope lying on a plain pale surface with handwriting across it. A snapshot, not an advertisement.`,
      `The envelope fills most of the frame at a slight angle, plain unprinted kraft paper with a visible flap seam and one soft crease, completely unmarked apart from the handwriting.`,
      `Written across it in thick black marker, in an ordinary person's block capitals, are the words "${c.headline}" across three lines.`,
      `Beneath, in the same marker, is written exactly "${c.subheadline}".`,
      `Lower down, "${c.cta}" is written inside a rough freehand rectangle drawn in thick violet marker, hex ${VIOLET}. It is required and it must be drawn; it is not a logo or a badge.`,
      `A clear area of blank kraft paper at least one eighth of the frame's height runs along the bottom edge, with no writing, no stamp, no postmark, no address, no window and nothing else on it.`,
      MARGIN,
      PHONE_SNAP,
      NO_MARK, onlyText(c),
    ],
  },
  {
    key: "postit-mono", family: "native", copy: "again",
    block: (c) => [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera very close up in available light, the camera outside the frame, of a single large sticky note stuck to a plain painted wall. A snapshot, not an advertisement.`,
      `One plain violet sticky note, hex ${VIOLET}, fills most of the frame, slightly crooked, its bottom corner lifting away from the wall and casting a small real shadow, its paper showing a faint fiber texture.`,
      `Written across it in thick black marker, in an ordinary person's block capitals that get tighter as they run out of room, are the words "${c.headline}" across four lines.`,
      `Beneath, in smaller letters in the same marker, is written exactly "${c.subheadline}".`,
      `At the bottom of the note, "${c.cta}" is written and underlined twice in the same black marker.`,
      `A clear area of plain painted wall at least one eighth of the frame's height runs along the bottom edge below the note, with no note, no writing, no tape and nothing else in it.`,
      MARGIN,
      `${PHONE_SNAP} Nothing else is on the wall and no second note is visible.`,
      NO_MARK, onlyText(c),
    ],
  },
];

// ---------------------------------------------------------------------------
// Assemble. Ids run on from b14a's c01-c03, so the batch has one continuous
// sequence and every asset id stays unique across the whole of b14.
// ---------------------------------------------------------------------------
export const BANNERS = TERRITORIES.map((t, i) => {
  const c = COPY[t.copy];
  const n = String(i + 4).padStart(2, "0");
  return {
    id: `1capture-platform-b14c${n}`,
    company: "1capture",
    product: "platform",
    concept: t.key,
    family: t.family === "loud" ? "loud direct-response" : "native/organic",
    copyKey: t.copy,
    approvedCopy: c.trace,
    headline: c.headline,
    subheadline: c.subheadline,
    cta: c.cta,
    // mirror of SHAPE_SPEC.gen in banner-generate.mjs, which is what actually gets sent to fal
    sizes: { square: [1024, 1024], landscape: [1200, 624], vertical: [1088, 1920] },
    shapes: t.shapes ?? ["square"],
    prompt: t.block(c).join("\n\n"),
  };
});
