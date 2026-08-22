// Static banner prompts - 2026-08-21 batch 14, 1Capture. The brand's first paid creative.
//
// Three banners, three genuinely different propositions, three visual territories, each in the
// three shapes a Meta / Reddit / Display placement needs. Not one idea restyled: batch 6 looked
// broad and was not (five of eight concepts were the same idea in different clothes).
//
//   b14c01  "Only let real customers through the door."  the promise    loud, hazard label
//   b14c02  "12% to 57%"                                  the proof     loud, mega-numeral
//   b14c03  "Verify a real card before anyone starts..."  the mechanic  native, whiteboard photo
//
// TWO FAMILIES ONLY, because they are the only two this repo has ever had a win in: loud
// direct-response and native/organic. Nothing polished-corporate: no stock SaaS gradient, no
// laptop mockup, no row of feature chips. c03 is the native/organic one and it is the treatment
// Robby called "best by far" on VoiceDrop, moved onto this brand.
//
// BRAND TRUTH, pulled from 1Capture-Marketing/tailwind.config.js on 2026-08-21 and confirmed
// against a browser render of the live site, not from memory. The old teal brand is retired:
// `1capture.teal` in the config is now #635BFF, the legacy utility name remapped onto the
// Stripe-style action color.
//   action / primary   #635BFF   (hover #5546FF)
//   navy ink           #0A2540
//   body copy          #425466
//   success            #0F9D76
//   danger             #DF1B41
//   surface            #FFFFFF / #F6F9FC / #F0F4F8
//   hairline           #E6EBF1
//
// NO LOGO IS DESCRIBED IN ANY PROMPT. Every prompt forbids brand marks outright and the real
// wordmark is composited afterwards by _work/composite-logo.py from the marketing repo's own
// SVG (public/logos/1c-white-logo.jsx, whose body is a literal <svg>). The 2026-08-03 audit
// found nearly every banner in this repo carrying an invented mark and three live ads were
// paused for it. Each concept now RESERVES the band the mark lands in by assigning that band's
// contents, because an unassigned area is one the model fills with an invented tagline.
//
// NO PRODUCT SCREENS ANYWHERE, per batch 8. For a brand whose discipline is honest claims, an
// invented dashboard or a fabricated conversion figure IS the banned claim. The real screen
// recording lives in the video ads; the banners carry type and color only.
//
// CLAIM SAFETY. Every line traces to AD-CREATIVE-PLAYBOOK.md in the 1Capture-Marketing repo
// (APPROVED by Robby 2026-08-21) AND was re-verified against the live www.1capture.io on
// 2026-08-21, per that bank's own rule 7.
//
// JUDGED BEFORE RENDERING (2026-08-21, six agents: three concepts x claim safety / render
// safety). Five blockers, all fixed here before a cent was spent:
//   - c01 previously read "Same card. Fourth free trial." / "Blocked before the trial opened."
//     Together those assert duplicate-card detection across signups, which is a real product
//     capability the LIVE site markets ("Stop repeat signups, disposable emails, and
//     virtual-card abusers", /free-trial-abuse-prevention metadata) but which is NOT in the
//     approved bank. The bank is binding, so the concept was re-cut onto bank claim 1 instead.
//     ROBBY: the bank has a gap here worth closing, and that live line is the wording to close
//     it with. Until it is in the bank, no ad in this repo may claim repeat-signup detection.
//     "opened" was also invented; the site's verdict string is "blocked before the trial started".
//   - c02's closing constraint banned "no brand name, no company name" in the same sentence that
//     assigned a subheadline containing "VoiceDrop". The model resolves that by dropping the
//     attribution, which is the one word carrying the batch's biggest claim. Each concept now
//     has its own closing block instead of the shared helper.
//   - {{COMPOSITION}} is substituted by banner-generate.mjs from a global per-shape table, and
//     two of its three strings name a "visual element" that none of these concepts has. An
//     unassigned element is the c17 failure exactly. The token is gone; each concept assigns
//     its own layout, on every shape.
//   - c01's hazard band was told to run BEHIND the headline and to cross none of its letters,
//     which cannot both be true; the model would have set white type on 45-degree violet.
//   - c02 placed the edge-margin rule before the subheadline and the button were introduced, so
//     the two smallest blocks, one of which carries the mandatory claim-5 framing, sat outside
//     the rule that keeps type inside the frame.
// Contrast fixes worth naming: crimson #DF1B41 on navy #0A2540 is about 3.2:1 and violet
// #635BFF on navy about 2.6:1, so the payoff line and the button were the hardest things to read
// on a loud direct-response frame. Both are now white on a solid fill.

export const BATCH = "2026-08-21-b14-relaunch";

const NO_MARK =
  `There is no logo, no wordmark, no brand mark, no monogram, no app icon, no emblem and no ` +
  `third-party company mark anywhere in the image, and no shape that could be mistaken for one. ` +
  `There is no product screenshot, no dashboard, no application window, no browser chrome, no ` +
  `phone, no laptop, no chart, no graph and no data table anywhere in the image.`;

const MARGIN =
  `Every line of type must fit completely inside the frame with a clear margin on all four ` +
  `sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every ` +
  `word fits whole on its own line.`;

const FLAT =
  `The whole thing is flat vector printing: no photography, no people, no 3D, no bevel, no drop ` +
  `shadow, no glow, no noise, no paper texture, no gradient mesh, no lens effects. There is no ` +
  `warning triangle, no exclamation mark, no skull, no shield, no tick, no cross, no arrow and ` +
  `no pictogram, symbol or glyph of any kind anywhere in the image.`;

export const BANNERS = [
  // -------------------------------------------------------------------------
  {
    id: "1capture-platform-b14c01",
    company: "1capture",
    product: "platform",
    concept: "through-the-door",
    family: "loud direct-response",
    landingPage: "/free-trial-abuse-prevention",
    headline: "Only let real customers through the door.",
    subheadline: "Verified before the trial starts.",
    offer: "Free under $10K MRR",
    cta: "Start free",
    approvedCopy:
      "Headline is bank claim 1 verbatim ('Only let real customers through the door.', live in " +
      "the homepage metadata). Subheadline compresses bank claim 3 ('Verify a real payment " +
      "method before anyone enters your free trial', live on seven pages) and borrows the live " +
      "verdict wording 'before the trial started' (DashboardPreviewLive.tsx line 301). Offer is " +
      "bank claim 8, live on seven pages. Button label is the live site's own button.",
    claimNotes:
      "Carries no percentage and no statistic, so nothing here needs the claim-5 framing. The " +
      "earlier cut claimed duplicate-card detection, which is live site copy but outside the " +
      "approved bank; see the header note.",
    // mirror of SHAPE_SPEC.gen in banner-generate.mjs, which is what actually gets sent to fal;
    // edit both or neither.
    sizes: { square: [1024, 1024], landscape: [1200, 624], vertical: [1088, 1920] },
    shapes: ["square", "landscape", "vertical"],
    prompt: [
      `A {{SHAPE_WORD}} graphic advertisement in a loud hazard-warning territory: a flat, hard-edged industrial caution label, printed rather than photographed.`,
      `The composition is one centered stack of type on a full-bleed color field, in this order from top to bottom and in this order on every shape: the hazard band, then the headline, then the subheadline, then the button, then an empty strip. There is no illustration, no photograph, no icon and no visual element of any kind in this layout: type and flat color are the only things in the frame.`,
      `The ground is a deep navy field, hex #0A2540, filling the whole frame.`,
      `Across the upper area of the frame, entirely above the headline and touching no letter, is a single horizontal band of bold diagonal hazard stripes in vivid violet, hex #635BFF, alternating with the navy, at a 45 degree angle, hard-edged with no glow, no gradient and no texture. The band is a solid bar of stripes spanning the full width of the frame, and nothing is printed on it.`,
      `The headline reads exactly "Only let real customers through the door." set in a very heavy grotesque sans serif, in sentence case as written, in pure white, tightly tracked, the largest element in the frame, broken across three lines.`,
      `Directly under the headline, with no gap and no element between them, the subheadline reads exactly "Verified before the trial starts." in the same sans serif at roughly one third the headline size, in pure white, on its own single line, set inside a hard-edged solid crimson red rectangle, hex #DF1B41, fitted tightly around the line.`,
      `Below the subheadline sits a single solid pill-shaped button with fully rounded ends, filled pure white, containing the words "Start free" in vivid violet, hex #635BFF, in medium-weight sans serif. The button is plain: no arrow, no icon, no shadow, no border, no second button. Immediately under the button, on its own line in pure white medium-weight sans serif at the same size as the subheadline, is the line "Free under $10K MRR", with the price written as a dollar sign then the digits one and zero then a capital K, and the last word written as the three capital letters M, R and R together as one unbroken group with no hyphen, dot or space between them.`,
      `Below that line, the bottom eighth of the frame is left as plain flat navy, hex #0A2540, edge to edge: it contains no type, no stripe, no graphic, no mark and nothing else at all.`,
      MARGIN,
      FLAT,
      NO_MARK,
      `The ONLY text in the image is the headline "Only let real customers through the door.", the subheadline "Verified before the trial starts.", the button label "Start free" and the line "Free under $10K MRR". There are no feature chips, no badges, no ratings, no percentages, no statistics and no numerals of any kind other than the ones inside "Free under $10K MRR", no captions, no labels, no small print, no logo, no wordmark, no brand name, no company name and no other words anywhere in the frame. Every word is spelled exactly as written above.`,
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1capture-platform-b14c02",
    company: "1capture",
    product: "platform",
    concept: "twelve-to-fifty-seven",
    family: "loud direct-response",
    landingPage: "/stripe-trial-conversion",
    headline: "12% to 57%",
    subheadline: "VoiceDrop trial-to-paid. 2-3x improvement is the typical range.",
    cta: "Start free",
    approvedCopy:
      "Bank claim 5 ('VoiceDrop went from 12% to 57% trial-to-paid', live on nine pages) paired " +
      "with bank claim 6. The framing is the bank's exact wording, '2-3x improvement is the " +
      "typical range', which is live verbatim in 15 places in the marketing repo; the truncated " +
      "'2-3x is the typical range' appears nowhere on the site and is not used.",
    claimNotes:
      "The bank CONSTRAINS claim 5: when 57% is the headline claim the 2-3x framing must be " +
      "present. Here it is the subheadline, so the constraint is satisfied inside the artwork " +
      "and does not depend on which landing page the ad is pointed at. 'VoiceDrop' is a customer " +
      "name and must render; it is spelled out letter by letter in the prompt because it is a " +
      "nine-letter compound proper noun with an internal capital and it is the entire " +
      "attribution for the batch's biggest number.",
    // mirror of SHAPE_SPEC.gen in banner-generate.mjs, which is what actually gets sent to fal;
    // edit both or neither.
    sizes: { square: [1024, 1024], landscape: [1200, 624], vertical: [1088, 1920] },
    shapes: ["square", "landscape", "vertical"],
    prompt: [
      `A {{SHAPE_WORD}} graphic advertisement in a brutalist mega-numeral territory: one enormous figure, one flat color field, nothing else.`,
      `The composition is one centered stack on a full-bleed color field, in this order from top to bottom and in this order on every shape: an empty band, then the headline numerals, then the subheadline, then the button. There is no illustration, no photograph, no icon and no visual element of any kind in this layout: type and flat color are the only things in the frame.`,
      `The ground is a single flat field of vivid violet, hex #635BFF, edge to edge, with no gradient, no texture and no pattern of any kind. The top eighth of the frame is left completely empty: flat violet only, with no type, no mark, no shape and nothing in it at all. The stacked group of type begins below that empty band.`,
      `The headline reads exactly "12% to 57%" in a very heavy grotesque sans serif, enormously oversized so it dominates the frame, in pure white, tightly tracked, set on two lines with "12% to" on the first line and "57%" alone on the second. The final "57%" is the single largest thing in the image.`,
      `Beneath the numerals the subheadline reads exactly "VoiceDrop trial-to-paid. 2-3x improvement is the typical range." in a medium-weight sans serif at roughly one sixth the height of the numerals, in pure white at full opacity, broken across two lines after the first period, quiet and small against the figures. The customer name is written with exactly these nine letters and no others: V, o, i, c, e, D, r, o, p, as one continuous unbroken word with a capital V and a capital D. No hyphen, dot, space or separator appears between any of its letters.`,
      `Below the subheadline sits a single solid pill-shaped button with fully rounded ends, filled pure white, containing the words "Start free" in the same vivid violet, hex #635BFF, in medium-weight sans serif. The button is plain: no arrow, no icon, no shadow, no border, no second button.`,
      MARGIN,
      `${FLAT} There is no arrow graphic, no upward-trending line, no bar chart and no illustration of growth of any kind: the numbers alone carry it.`,
      NO_MARK,
      `The ONLY text in the image is the headline "12% to 57%", the subheadline "VoiceDrop trial-to-paid. 2-3x improvement is the typical range." and the button label "Start free". The word VoiceDrop appears only inside that subheadline and must be rendered there in full: it is a customer's name, it is required, and it is the one company name allowed in this frame. There are no feature chips, no badges, no ratings, no captions, no labels, no small print, no logo, no wordmark, no other brand or company name, no percentages, no multipliers and no averages other than those written above, and no other words anywhere in the frame. Every word is spelled exactly as written above.`,
    ].join("\n\n"),
  },

  // -------------------------------------------------------------------------
  {
    id: "1capture-platform-b14c03",
    company: "1capture",
    product: "platform",
    concept: "verify-a-real-card",
    family: "native/organic",
    landingPage: "/require-credit-card-for-free-trial",
    headline: "Verify a real payment method before anyone enters your free trial.",
    subheadline: "Free under $10K MRR",
    cta: "Start free",
    approvedCopy:
      "Headline is bank claim 3, first sentence, VERBATIM ('Verify a real payment method " +
      "before anyone enters your free trial'), live on seven pages. An earlier cut compressed " +
      "it to 'Verify a real card before anyone starts a free trial'; two judges flagged " +
      "compression as the way copy drifts out of an approved bank, so it is quoted whole. " +
      "Subheadline is bank claim 8, live on seven pages. Button label is the live site's own.",
    claimNotes:
      "No figure is claimed beyond the price, so no framing is required. Hand-lettered styles " +
      "have twice dropped words and twice misspelled long ones, so every risky token here is " +
      "spelled out character by character in the prompt: CUSTOMERS is gone from this cut, and " +
      "$10K and MRR are both dictated.",
    // mirror of SHAPE_SPEC.gen in banner-generate.mjs, which is what actually gets sent to fal;
    // edit both or neither.
    sizes: { square: [1024, 1024], landscape: [1200, 624], vertical: [1088, 1920] },
    shapes: ["square", "landscape", "vertical"],
    prompt: [
      `A {{SHAPE_WORD}} photograph taken with a handheld phone camera in available window light, the camera itself outside the frame, of a real office whiteboard with handwriting on it, in an ordinary American startup office in the United States. This is a snapshot somebody took, not an advertisement.`,
      `The composition is the whiteboard filling almost the whole frame, shot slightly off square, with the handwriting centered on it in the same order on every shape: the big handwritten line, then the smaller underlined line, then the hand-drawn box.`,
      `The whiteboard is an ordinary wall-mounted white melamine board with a thin aluminum tray along the bottom edge, mounted on a plain painted office wall. The board surface carries faint gray ghosting from previous erasing in the corners, one small smudge, and nothing else.`,
      `Hand-lettered across the board in thick black dry-erase marker, in a real person's slightly uneven handwriting written entirely in block capital letters, are the words "Verify a real payment method before anyone enters your free trial." Case is the only thing that differs from the quoted text: every word carries exactly the letters quoted, in that order, but all of them are capitals. It fills most of the board across exactly three lines, broken as "VERIFY A REAL PAYMENT" on the first line, "METHOD BEFORE ANYONE" on the second, and "ENTERS YOUR FREE TRIAL." on the third, with no word split across two lines and no word hyphenated. The lettering is confident, a little crooked, with visible marker texture and one letter slightly larger than its neighbors.`,
      `Underneath, smaller and in the same black marker, is written exactly "Free under $10K MRR". The price is four characters: a dollar sign; then a numeral one drawn as a single plain vertical stroke with no bar across its top and no bar across its foot; then a numeral zero drawn as one narrow closed oval; then a capital K. Those two middle characters are numerals and not letters, and the pair reads as the number ten. The last word is the three capital letters M, R and R together as one unbroken group with no hyphen, dot or space between them. The whole line is underlined once with a quick hand-drawn stroke.`,
      `Lower still on the board, drawn by the same hand, is a rough rectangle outlined in thick violet dry-erase marker with the words "Start free" hand-lettered inside it in the same violet. The violet is the vivid brand violet, hex #635BFF. The rectangle is drawn freehand and slightly wobbly.`,
      `The bottom right corner of the board is left completely blank: a clean rectangle of white melamine at least one eighth of the frame's height and one quarter of its width, sitting below and to the right of everything written on the board, flat, evenly lit and fully in focus, with no writing, no marker, no smudge, no glare and nothing else in it.`,
      MARGIN,
      `Every handwritten line must also fit completely inside the whiteboard itself, with a clear band of blank white melamine on all four sides between the writing and the board's own edges. No letter may touch, overlap or run past the edge of the board or its metal frame.`,
      `Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement: slight handheld angle so the board is not perfectly square to the camera, a soft highlight where the window light falls across the surface, real shallow depth of field with the far edge of the board a little soft, and mild phone-camera sensor noise. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no color grade.`,
      `There is nothing else on the wall and nothing resting in the tray: no marker, no eraser, no sticky notes, no poster, no clock, no plant, and no person or hand anywhere in the frame.`,
      NO_MARK,
      `The one exception is the hand-drawn violet rectangle described above. It is required and it must be drawn: it is a wobbly freehand marker outline around the words "Start free", drawn by the same hand as the rest of the board. It is not a logo, a badge or a brand mark.`,
      `The ONLY text in the image is the handwritten headline "Verify a real payment method before anyone enters your free trial.", the handwritten line "Free under $10K MRR" and the hand-lettered button label "Start free". There are no feature chips, no badges, no ratings, no percentages, no statistics and no numerals of any kind other than the ones inside "Free under $10K MRR", no captions, no labels, no small print, no logo, no wordmark, no brand name, no company name and no other words anywhere in the frame. Every word is spelled exactly as written above. The word FREE is rendered three times in this image, once inside "YOUR FREE TRIAL.", once inside "Free under $10K MRR" and once inside "Start free": all three are required and each is spelled F, R, E, E.`,
    ].join("\n\n"),
  },
];
