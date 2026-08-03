# VoiceDrop 2026-08-03 disruptive batch

**19 concepts, 31 assets, deliberately weird.** Robby asked to go wild for paid: this batch tests *style* as the variable while holding the claims constant. Every headline, subheadline and CTA is verbatim from the approved copy bank in `VoiceDrop-Marketing/AD-CREATIVE-PLAYBOOK.md` (or the site component named per concept). No invented stats, no third-party logos, no fake badges.

Generated with fal `openai/gpt-image-2`, quality high, ~$0.20/render (~$6.40 including one re-roll). Square 1024x1024 (Meta feed 1:1), vertical 1080x1920 (Stories/Reels 9:16 — an untested placement for this account), landscape 1200x624 (Google Display / Meta link ads 1.91:1).

## Why this batch looks nothing like the last one

The account's own data says billboard typography wins: **Billboard Ads runs 3.9-4.0% CTR at $0.93-1.05 CPC over 90 days**, while the product-shot Banner Test was killed 2026-08-03 with every ad under 2% CTR on $160.67. So the 2026-08-03 billboard batch (c6-c9) is the *control*, and this batch is the challenger set: same proven typography-first bones, but pushed into 19 visual territories the account has never run (hazard tape, punk collage, chrome, graffiti, VHS, whiteboard, sticker bomb, gold foil).

Two things here are genuinely new tests, not just new looks:

1. **Vertical 9:16 (7 assets).** Stories/Reels has never been tested with purpose-built creative in this account.
2. **Offer-led creative (c26).** "$20 In Free Credits" is homepage copy (`CtaBand.tsx`, `SoftwareStepper.tsx`), not lander-only as the playbook previously recorded. Every VoiceDrop ad to date has led with outcome or proof; none has led with the offer.

## Claim-safety notes

- **c27 and c28 are destination-locked.** "23% average callback rate" only exists on `/for-business-owners` and "callbacks start about 5 hours later" only on `/callbacks`. These two ads must point at those landers. Sending them to the homepage breaks the claims-match rule.
- **9%+ always ships with the Trustpilot attribution line** (c13, c25). Never mix 9%+ and 23% in one asset or one ad set.
- **c17 crops "1,000,000" off both frame edges on purpose** (scale device). The full, correctly punctuated figure is spelled out in the headline directly beneath it in every c17 asset.
- **c24 and c26 render an approximated VoiceDrop logo glyph.** The image model invents a mark; the real wordmark is `public/uploads/2024/01/VoiceDrop-Logo-Light.webp`. Composite the real file if either goes to a big-spend placement.
- **c11 square is a wave-2 re-roll.** Wave 1 clipped the "G" of "CHASING" on the right edge; the re-roll adds a hard no-letter-touches-any-edge rule. Its vertical and landscape are wave 1.
- **c11 landscape has tight edge margins.** Text is intact but close to the frame; prefer the square or vertical for that concept where a platform may crop.

## The assets

| File | Concept | Style | Headline | Destination |
| --- | --- | --- | --- | --- |
| `voicedrop-c10-square.png` | Hazard tape warning | Hazard-stripe warning label | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c10-vertical.png` | Hazard tape warning | Hazard-stripe warning label | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c11-square.png` | Brutalist inversion | Stark white brutalist typography | "Stop Chasing Leads. Let Them Call You." | Homepage / trial |
| `voicedrop-c11-vertical.png` | Brutalist inversion | Stark white brutalist typography | "Stop Chasing Leads. Let Them Call You." | Homepage / trial |
| `voicedrop-c11-landscape.png` | Brutalist inversion | Stark white brutalist typography | "Stop Chasing Leads. Let Them Call You." | Homepage / trial |
| `voicedrop-c12-square.png` | Ransom note zine | Punk cut-and-paste collage | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c13-square.png` | Chrome Y2K stat | Liquid chrome 3D type | "9%+ Callback Rate" | Homepage / trial |
| `voicedrop-c13-landscape.png` | Chrome Y2K stat | Liquid chrome 3D type | "9%+ Callback Rate" | Homepage / trial |
| `voicedrop-c14-square.png` | Phone overflow | Surreal maximalist product-in-chaos | "Let Them Call You." | Homepage / trial |
| `voicedrop-c14-vertical.png` | Phone overflow | Surreal maximalist product-in-chaos | "Let Them Call You." | Homepage / trial |
| `voicedrop-c15-square.png` | Ripped script reveal | Torn paper reveal | "Stop Chasing Leads." | Homepage / trial |
| `voicedrop-c16-square.png` | Pop art halftone | Comic book Ben-Day pop art | "Let Them Call You." | Homepage / trial |
| `voicedrop-c17-square.png` | Scale takeover | Cropped mega-numeral | "Send 100 or 1,000,000 Voicemail Drops" | Homepage / trial |
| `voicedrop-c17-vertical.png` | Scale takeover | Cropped mega-numeral | "Send 100 or 1,000,000 Voicemail Drops" | Homepage / trial |
| `voicedrop-c17-landscape.png` | Scale takeover | Cropped mega-numeral | "Send 100 or 1,000,000 Voicemail Drops" | Homepage / trial |
| `voicedrop-c18-square.png` | Neon graffiti wall | Street graffiti on concrete | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c18-vertical.png` | Neon graffiti wall | Street graffiti on concrete | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c19-square.png` | VHS glitch | 90s VHS / analog broadcast | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c20-square.png` | Gold foil trust card | Embossed gold foil on matte black | "The Only SOC-2 Type II Certified Ringless Voicemail" | Homepage / trial |
| `voicedrop-c20-landscape.png` | Gold foil trust card | Embossed gold foil on matte black | "The Only SOC-2 Type II Certified Ringless Voicemail" | Homepage / trial |
| `voicedrop-c21-square.png` | Whiteboard marker | Hand-drawn anti-design | "Stop Chasing Leads. Let Them Call You." | Homepage / trial |
| `voicedrop-c22-square.png` | Split screen before/after | Hard split contrast | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c22-vertical.png` | Split screen before/after | Hard split contrast | "Manual Cold Calling Is Obsolete." | Homepage / trial |
| `voicedrop-c23-square.png` | Waveform detonation | Particle explosion | "Your Voice. Thousands of Voicemails." | Homepage / trial |
| `voicedrop-c24-square.png` | Engineering blueprint | Technical schematic drafting | "Send 100 or 1,000,000 Voicemail Drops" | Homepage / trial |
| `voicedrop-c24-landscape.png` | Engineering blueprint | Technical schematic drafting | "Send 100 or 1,000,000 Voicemail Drops" | Homepage / trial |
| `voicedrop-c25-square.png` | Holographic sticker bomb | Holo sticker collage | "9%+ Callback Rate" | Homepage / trial |
| `voicedrop-c26-square.png` | Offer shock | Cash-drop offer poster | "$20 In Free Credits" | Homepage / trial |
| `voicedrop-c26-vertical.png` | Offer shock | Cash-drop offer poster | "$20 In Free Credits" | Homepage / trial |
| `voicedrop-c27-square.png` | Lander-locked 23% | Mega-numeral spotlight | "23% Average Callback Rate" | `/for-business-owners` only |
| `voicedrop-c28-square.png` | Lander-locked 5 hours | Clock-face urgency | "Callbacks Start About 5 Hours Later" | `/callbacks` only |

## Suggested test split

Kill rules from the creative engine still apply: frequency >2.5 or CTR <2% after ~1,000 impressions = paused; judge on CTR/CPC after 2-3 days; winners get duplicated into the core campaigns, never left in a test campaign.

1. **Billboard Ads (Targeted - Sales), squares:** c10 hazard, c18 graffiti, c12 ransom note, c19 VHS. The loudest pattern-interrupts against the format that already wins.
2. **Core Prospecting (Broad), squares:** c11 brutalist, c13 chrome, c17 scale, c22 split-screen. Broad audience, highest-contrast concepts.
3. **SMS - Banner Ads, squares:** c14 phone overflow, c26 offer, c25 sticker bomb. This campaign needs variants most (Ad-13 carries it at $135 CPM, frequency 2.7).
4. **New Stories/Reels ad set, verticals:** c10, c11, c14, c17, c18, c22, c26. Untested placement, so treat the whole ad set as one experiment.
5. **Google Display, landscapes:** c11, c13, c17, c20, c24.
6. **Lander-locked, separate ad sets:** c27 to `/for-business-owners`, c28 to `/callbacks`.

## Prompts

Exact strings passed to `openai/gpt-image-2`. Re-render any winner from these.

### c10 — Hazard tape warning

Angle: Pain: cold calling is obsolete. Copy source: Hero.tsx subheadline.

#### `voicedrop-c10-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Industrial hazard-warning aesthetic: thick diagonal caution stripes in warm gold (#ffb01f) and near-black (#090714) running across the top edge and the bottom edge, with a flat near-black panel between them. Enormous heavy condensed uppercase sans-serif headline stencilled across the black panel in white: "MANUAL COLD CALLING IS OBSOLETE." with the word "OBSOLETE." in warm gold. Beneath it a much smaller light gray subheadline: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Gritty stencilled paint texture, a hard drop shadow, no illustration or product imagery at all. High-contrast disruptive pattern-interrupt design that looks nothing like a normal software ad. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c10-vertical.png` (1080x1920)

```text
Vertical 9:16 full-screen Instagram Stories / Reels ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Industrial hazard-warning aesthetic: thick diagonal caution stripes in warm gold (#ffb01f) and near-black (#090714) running across the top edge and the bottom edge, with a flat near-black panel between them. Enormous heavy condensed uppercase sans-serif headline stencilled across the black panel in white: "MANUAL COLD CALLING IS OBSOLETE." with the word "OBSOLETE." in warm gold. Beneath it a much smaller light gray subheadline: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Gritty stencilled paint texture, a hard drop shadow, no illustration or product imagery at all. High-contrast disruptive pattern-interrupt design that looks nothing like a normal software ad. Tall vertical composition: headline in the upper two thirds, subheadline and button in the lower third, safe margins top and bottom so nothing is clipped by UI. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c11 — Brutalist inversion

Angle: Outcome: hero headline. Copy source: Hero.tsx.

#### `voicedrop-c11-square.png` (1024x1024, wave-2 re-roll)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Radical brutalist design that inverts the usual dark SaaS look: a stark flat pure white background with a huge black ultra-condensed grotesque uppercase headline stacked tightly line by line: "STOP CHASING LEADS. LET THEM CALL YOU." The words "CALL YOU." are set in vivid purple #9746ff. One thick diagonal purple slash cuts across the layout as the only graphic element, placed so it never overlaps the headline letters. A small black subheadline in plain type: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Swiss brutalist poster design, extreme scale contrast, tight leading, no gradients, no glow, no illustration, no photography. CRITICAL LAYOUT RULE: every line of the headline must fit completely inside the frame with a clear white margin on all four sides. No letter may touch, overlap or be cropped by any edge of the image. Shrink the type until every word fits whole. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c11-vertical.png` (1080x1920)

```text
Vertical 9:16 full-screen Instagram Stories / Reels ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Radical brutalist design that inverts the usual dark SaaS look: a stark flat pure white background with a huge black ultra-condensed grotesque uppercase headline stacked tightly line by line, filling almost the entire frame edge to edge: "STOP CHASING LEADS. LET THEM CALL YOU." The words "CALL YOU." are set in vivid purple #9746ff. One thick diagonal purple slash cuts across the layout as the only graphic element. A small black subheadline in plain type: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Swiss brutalist poster design, extreme scale contrast, tight leading, no gradients, no glow, no illustration, no photography. Tall vertical composition: headline in the upper two thirds, subheadline and button in the lower third, safe margins top and bottom so nothing is clipped by UI. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c11-landscape.png` (1200x624)

```text
Wide landscape 1.91:1 display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Radical brutalist design that inverts the usual dark SaaS look: a stark flat pure white background with a huge black ultra-condensed grotesque uppercase headline stacked tightly line by line, filling almost the entire frame edge to edge: "STOP CHASING LEADS. LET THEM CALL YOU." The words "CALL YOU." are set in vivid purple #9746ff. One thick diagonal purple slash cuts across the layout as the only graphic element. A small black subheadline in plain type: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Swiss brutalist poster design, extreme scale contrast, tight leading, no gradients, no glow, no illustration, no photography. Wide composition with the headline block on the left and the visual element on the right. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c12 — Ransom note zine

Angle: Pain: cold calling is obsolete. Copy source: Hero.tsx subheadline.

#### `voicedrop-c12-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Punk photocopied zine ransom-note collage on a near-black #090714 background: the headline "MANUAL COLD CALLING IS OBSOLETE." assembled from mismatched cut-out magazine and newspaper letters in different fonts, sizes and angles, taped and glued down, some letters printed on torn purple #9746ff paper and some on gold #ffb01f paper. Rough torn paper edges, halftone photocopy grain, visible strips of tape, staples and scuffs. A smaller typewritten subheadline on a strip of torn white paper: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Raw analog DIY texture, chaotic but readable, anti-corporate energy. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c13 — Chrome Y2K stat

Angle: Proof: 9%+ callback rate. Copy source: Metrics.tsx (attribution mandatory).

#### `voicedrop-c13-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Y2K liquid-chrome aesthetic on a deep near-black purple #090714 background with a purple #9746ff haze. The headline "9%+ Callback Rate" is rendered as enormous glossy 3D liquid mercury chrome lettering with iridescent purple and gold reflections, dripping and morphing like molten metal, occupying most of the frame with "9%+" scaled hugely. Beneath it a small clean light gray subheadline: "Reported in verified Trustpilot reviews." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Hyper-glossy metallic reflections, subtle lens flare, dark studio backdrop, futuristic and expensive. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c13-landscape.png` (1200x624)

```text
Wide landscape 1.91:1 display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Y2K liquid-chrome aesthetic on a deep near-black purple #090714 background with a purple #9746ff haze. The headline "9%+ Callback Rate" is rendered as enormous glossy 3D liquid mercury chrome lettering with iridescent purple and gold reflections, dripping and morphing like molten metal, occupying most of the frame with "9%+" scaled hugely. Beneath it a small clean light gray subheadline: "Reported in verified Trustpilot reviews." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Hyper-glossy metallic reflections, subtle lens flare, dark studio backdrop, futuristic and expensive. Wide composition with the headline block on the left and the visual element on the right. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c14 — Phone overflow

Angle: Outcome: they call you. Copy source: Hero.tsx.

#### `voicedrop-c14-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Surreal maximalist photographic scene on near-black #090714: a hand holds up a smartphone and hundreds of glowing purple #9746ff incoming-call notification cards physically erupt out of the screen and fly upward filling the whole frame like a geyser, casting purple light on the hand. The notification cards are blank glowing rectangles with only a small phone-handset glyph, no writing on them. Bold heavy sans-serif headline overlaid in white across the composition: "Let Them Call You." with "Call You." in warm gold. A smaller light gray subheadline: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Cinematic dark photography, dramatic purple rim light, motion energy, high contrast. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c14-vertical.png` (1080x1920)

```text
Vertical 9:16 full-screen Instagram Stories / Reels ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Surreal maximalist photographic scene on near-black #090714: a hand holds up a smartphone and hundreds of glowing purple #9746ff incoming-call notification cards physically erupt out of the screen and fly upward filling the whole frame like a geyser, casting purple light on the hand. The notification cards are blank glowing rectangles with only a small phone-handset glyph, no writing on them. Bold heavy sans-serif headline overlaid in white across the composition: "Let Them Call You." with "Call You." in warm gold. A smaller light gray subheadline: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Cinematic dark photography, dramatic purple rim light, motion energy, high contrast. Tall vertical composition: headline in the upper two thirds, subheadline and button in the lower third, safe margins top and bottom so nothing is clipped by UI. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c15 — Ripped script reveal

Angle: Pain to outcome. Copy source: Hero.tsx.

#### `voicedrop-c15-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. A crumpled off-white paper cold-call script sheet fills the frame and has been violently torn straight down the middle; through the ragged tear, brilliant purple #9746ff light and a near-black #090714 void blaze out. The paper is covered in illegible blurred handwriting-like scribbles with no readable words. Across the torn opening, a huge bold geometric rounded sans-serif headline in white: "Stop Chasing Leads." with "Chasing" in warm gold. A smaller light gray subheadline below: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Dramatic macro photography, real paper fibre texture at the tear, strong light spill, tactile and physical. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c16 — Pop art halftone

Angle: Outcome: they call you. Copy source: Hero.tsx.

#### `voicedrop-c16-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Retro 1960s pop-art comic book panel: bold black ink outlines, Ben-Day halftone dot shading, a flat purple #9746ff and gold #ffb01f limited palette on near-black. A stylised comic illustration of a ringing telephone handset bursting with radiating action lines. A giant jagged comic speech balloon dominates the frame containing the hand-lettered comic headline in heavy black uppercase: "LET THEM CALL YOU." Below the balloon a small rectangular caption box in flat gold with dark text: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Screen-printed vintage comic texture, slight ink misregistration, punchy and loud. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c17 — Scale takeover

Angle: Scale: any volume. Copy source: WhyNumber1.tsx.

#### `voicedrop-c17-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Extreme typographic scale takeover on near-black #090714: the numeral "1,000,000" is set in an enormous heavy geometric sans-serif in warm gold gradient (#ffd874 to #ffb01f) and cropped hard so it bleeds off both edges of the frame, absurdly oversized, with a purple #9746ff aurora glow burning behind it. Layered over it in crisp white, much smaller, the full headline: "Send 100 or 1,000,000 Voicemail Drops". Beneath, a small light gray subheadline: "Audio quality and deliverability at any volume." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Pure typography, no illustration, no product imagery, brutal scale contrast that reads instantly at thumbnail size. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c17-vertical.png` (1080x1920)

```text
Vertical 9:16 full-screen Instagram Stories / Reels ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Extreme typographic scale takeover on near-black #090714: the numeral "1,000,000" is set in an enormous heavy geometric sans-serif in warm gold gradient (#ffd874 to #ffb01f) and cropped hard so it bleeds off both edges of the frame, absurdly oversized, with a purple #9746ff aurora glow burning behind it. Layered over it in crisp white, much smaller, the full headline: "Send 100 or 1,000,000 Voicemail Drops". Beneath, a small light gray subheadline: "Audio quality and deliverability at any volume." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Pure typography, no illustration, no product imagery, brutal scale contrast that reads instantly at thumbnail size. Tall vertical composition: headline in the upper two thirds, subheadline and button in the lower third, safe margins top and bottom so nothing is clipped by UI. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c17-landscape.png` (1200x624)

```text
Wide landscape 1.91:1 display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Extreme typographic scale takeover on near-black #090714: the numeral "1,000,000" is set in an enormous heavy geometric sans-serif in warm gold gradient (#ffd874 to #ffb01f) and cropped hard so it bleeds off both edges of the frame, absurdly oversized, with a purple #9746ff aurora glow burning behind it. Layered over it in crisp white, much smaller, the full headline: "Send 100 or 1,000,000 Voicemail Drops". Beneath, a small light gray subheadline: "Audio quality and deliverability at any volume." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Pure typography, no illustration, no product imagery, brutal scale contrast that reads instantly at thumbnail size. Wide composition with the headline block on the left and the visual element on the right. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c18 — Neon graffiti wall

Angle: Pain: cold calling is obsolete. Copy source: Hero.tsx subheadline.

#### `voicedrop-c18-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Night-time photograph of a raw dark concrete wall in an alley, lit by purple #9746ff neon spill. Sprayed across the wall in massive dripping graffiti letters, purple and gold spray paint with visible overspray and runs, the headline: "MANUAL COLD CALLING IS OBSOLETE." Below it, stencilled neatly in small clean white spray-stencil letters: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Gritty urban street photography, wet asphalt reflections, real concrete pitting and paint texture, cinematic night lighting, zero corporate polish. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c18-vertical.png` (1080x1920)

```text
Vertical 9:16 full-screen Instagram Stories / Reels ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Night-time photograph of a raw dark concrete wall in an alley, lit by purple #9746ff neon spill. Sprayed across the wall in massive dripping graffiti letters, purple and gold spray paint with visible overspray and runs, the headline: "MANUAL COLD CALLING IS OBSOLETE." Below it, stencilled neatly in small clean white spray-stencil letters: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Gritty urban street photography, wet asphalt reflections, real concrete pitting and paint texture, cinematic night lighting, zero corporate polish. Tall vertical composition: headline in the upper two thirds, subheadline and button in the lower third, safe margins top and bottom so nothing is clipped by UI. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c19 — VHS glitch

Angle: Pain: cold calling is obsolete. Copy source: Hero.tsx subheadline.

#### `voicedrop-c19-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Degraded 1990s VHS videotape broadcast still: heavy horizontal scanlines, tracking distortion bars, chromatic aberration splitting into purple #9746ff and gold fringes, analog noise and tape warp over a near-black #090714 field. A beige 1990s corded desk telephone sits in the centre, half dissolving into static. Chunky retro broadcast headline text in white with a hard purple chromatic ghost: "MANUAL COLD CALLING IS OBSOLETE." A smaller subheadline in retro monospace: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Authentic analog tape artifacts, glow bleed, nostalgic and unsettling, deliberately low-fi against a polished feed. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c20 — Gold foil trust card

Angle: Trust: SOC-2 Type II. Copy source: WhyNumber1.tsx.

#### `voicedrop-c20-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Ultra-premium matte black #090714 surface with fine soft-touch texture, photographed as an embossed luxury black metal card. The headline is stamped in real reflective embossed gold foil with genuine metallic highlights and depth: "The Only SOC-2 Type II Certified Ringless Voicemail" with "SOC-2 Type II" largest. A single minimal embossed gold shield outline sits beside the type. A small subheadline debossed in soft gray: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Macro product photography of foil stamping, raking light catching the emboss, a faint purple #9746ff reflection along one edge, restrained and expensive. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c20-landscape.png` (1200x624)

```text
Wide landscape 1.91:1 display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Ultra-premium matte black #090714 surface with fine soft-touch texture, photographed as an embossed luxury black metal card. The headline is stamped in real reflective embossed gold foil with genuine metallic highlights and depth: "The Only SOC-2 Type II Certified Ringless Voicemail" with "SOC-2 Type II" largest. A single minimal embossed gold shield outline sits beside the type. A small subheadline debossed in soft gray: "Send thousands of ringless voicemails instantly." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Macro product photography of foil stamping, raking light catching the emboss, a faint purple #9746ff reflection along one edge, restrained and expensive. Wide composition with the headline block on the left and the visual element on the right. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c21 — Whiteboard marker

Angle: Outcome: hero headline. Copy source: Hero.tsx.

#### `voicedrop-c21-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Photograph of a real office whiteboard, slightly off-angle with visible marker ghosting and smudges, shot on a phone with natural window light and a soft glare. Written by hand in thick black and purple dry-erase marker, in confident messy handwriting: "Stop Chasing Leads. Let Them Call You." with "Let Them Call You." underlined twice in purple. Below it, smaller handwritten text: "Send thousands of ringless voicemails instantly." A rough hand-drawn arrow points down to A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Deliberately unpolished and organic so it reads as a real photo in a social feed rather than an advertisement, no gradients, no glow, no vector graphics. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c22 — Split screen before/after

Angle: Pain to outcome. Copy source: Hero.tsx subheadline.

#### `voicedrop-c22-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Hard vertical split-screen with a razor-sharp dividing line. Left half: desaturated cold gray, a weary salesman slumped at a cluttered desk with a corded phone pressed to his ear, drained fluorescent light. Right half: rich near-black #090714 saturated with purple #9746ff neon glow, the same man leaning back relaxed while a phone on the desk erupts with glowing incoming-call notifications. Bold heavy sans-serif headline spanning the full width in white: "Manual Cold Calling Is Obsolete." with "Obsolete." in warm gold. A smaller light gray subheadline: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Cinematic editorial photography, extreme color grading contrast between the halves, instantly readable story. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c22-vertical.png` (1080x1920)

```text
Vertical 9:16 full-screen Instagram Stories / Reels ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Hard vertical split-screen with a razor-sharp dividing line. Left half: desaturated cold gray, a weary salesman slumped at a cluttered desk with a corded phone pressed to his ear, drained fluorescent light. Right half: rich near-black #090714 saturated with purple #9746ff neon glow, the same man leaning back relaxed while a phone on the desk erupts with glowing incoming-call notifications. Bold heavy sans-serif headline spanning the full width in white: "Manual Cold Calling Is Obsolete." with "Obsolete." in warm gold. A smaller light gray subheadline: "Turn hours of dialing into a flood of warm inbound calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Cinematic editorial photography, extreme color grading contrast between the halves, instantly readable story. Tall vertical composition: headline in the upper two thirds, subheadline and button in the lower third, safe margins top and bottom so nothing is clipped by UI. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c23 — Waveform detonation

Angle: Voice clone scale. Copy source: HowItWorks.tsx.

#### `voicedrop-c23-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. On a near-black #090714 field, a single glowing purple #9746ff audio waveform runs across the frame and violently detonates at its centre into many thousands of tiny luminous particles that scatter outward and resolve into small glowing voicemail envelope glyphs, like a shockwave frozen mid-blast. Volumetric purple light, sparks and depth-of-field bokeh. Bold geometric rounded sans-serif headline in white: "Your Voice. Thousands of Voicemails." with "Thousands" in warm gold. A smaller light gray subheadline: "Clone your voice from a 30-second recording." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". High-energy 3D render, dramatic contrast, dark cinematic mood. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c24 — Engineering blueprint

Angle: Scale: any volume. Copy source: WhyNumber1.tsx.

#### `voicedrop-c24-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Technical engineering blueprint aesthetic: a very dark near-black purple #090714 drafting sheet with a fine faint purple grid, precise thin gold #ffb01f vector linework diagramming a global carrier routing network as nodes, arcs and connection paths radiating from a central point, with small unlabelled measurement ticks and crosshair registration marks. Clean technical drafting headline in white: "Send 100 or 1,000,000 Voicemail Drops" with "1,000,000" in warm gold. A smaller light gray subheadline: "Audio quality and deliverability at any volume." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Precise architectural drafting style, hairline strokes, no photography, no 3D, cold and technical. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c24-landscape.png` (1200x624)

```text
Wide landscape 1.91:1 display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Technical engineering blueprint aesthetic: a very dark near-black purple #090714 drafting sheet with a fine faint purple grid, precise thin gold #ffb01f vector linework diagramming a global carrier routing network as nodes, arcs and connection paths radiating from a central point, with small unlabelled measurement ticks and crosshair registration marks. Clean technical drafting headline in white: "Send 100 or 1,000,000 Voicemail Drops" with "1,000,000" in warm gold. A smaller light gray subheadline: "Audio quality and deliverability at any volume." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Precise architectural drafting style, hairline strokes, no photography, no 3D, cold and technical. Wide composition with the headline block on the left and the visual element on the right. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c25 — Holographic sticker bomb

Angle: Proof: 9%+ callback rate. Copy source: Metrics.tsx (attribution mandatory).

#### `voicedrop-c25-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Layered holographic sticker-bomb collage photographed at a slight angle on a near-black #090714 surface: dozens of overlapping blank die-cut vinyl stickers in iridescent holographic foil, purple #9746ff and gold chrome, with peeling corners, glossy highlights and rainbow diffraction. The largest sticker in the centre is a chunky die-cut badge carrying the headline in heavy uppercase: "9%+ CALLBACK RATE" with "9%+" oversized. A smaller clean white sticker strip beneath it reads: "Reported in verified Trustpilot reviews." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Tactile real-world sticker photography, rainbow holo shimmer, playful and chaotic, streetwear energy. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c26 — Offer shock

Angle: Offer: free trial credits. Copy source: CtaBand.tsx / SoftwareStepper.tsx (homepage).

#### `voicedrop-c26-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Bold offer-led poster on near-black #090714 with a hot purple #9746ff spotlight: the headline "$20 In Free Credits" is set enormous in heavy geometric sans-serif with a thick warm gold gradient (#ffd874 to #ffb01f) and a hard black outline, tilted slightly, dominating the frame. Glowing gold coins and purple voicemail envelope glyphs tumble and scatter through the air around the type with motion blur. Beneath, a smaller light gray subheadline: "About 200 voicemails. Cancel anytime." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Loud direct-response poster energy, deep shadows, dramatic spotlight, unapologetically promotional. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

#### `voicedrop-c26-vertical.png` (1080x1920)

```text
Vertical 9:16 full-screen Instagram Stories / Reels ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. Bold offer-led poster on near-black #090714 with a hot purple #9746ff spotlight: the headline "$20 In Free Credits" is set enormous in heavy geometric sans-serif with a thick warm gold gradient (#ffd874 to #ffb01f) and a hard black outline, tilted slightly, dominating the frame. Glowing gold coins and purple voicemail envelope glyphs tumble and scatter through the air around the type with motion blur. Beneath, a smaller light gray subheadline: "About 200 voicemails. Cancel anytime." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Loud direct-response poster energy, deep shadows, dramatic spotlight, unapologetically promotional. Tall vertical composition: headline in the upper two thirds, subheadline and button in the lower third, safe margins top and bottom so nothing is clipped by UI. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c27 — Lander-locked 23%

Angle: Proof: 23% callback (business owners lander ONLY). Copy source: BusinessOwnersLanding.tsx — destination-locked to /for-business-owners.

#### `voicedrop-c27-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. A single enormous numeral dominates: "23%" rendered gigantic in a heavy geometric sans-serif, warm gold gradient (#ffd874 to #ffb01f), lit by a hard purple #9746ff spotlight against a near-black #090714 void with deep falloff shadow. The rest of the headline "Average Callback Rate" sits directly beneath in crisp white at a fraction of the size. A smaller light gray subheadline: "Your voice does the prospecting; you take the warm calls." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Stark single-object spotlight composition, cinematic void, extreme scale hierarchy that reads at thumbnail size. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

### c28 — Lander-locked 5 hours

Angle: Speed to callback (callbacks lander ONLY). Copy source: CallbacksLanding.tsx — destination-locked to /callbacks.

#### `voicedrop-c28-square.png` (1024x1024)

```text
Square 1:1 social feed ad creative for VoiceDrop, an AI ringless voicemail platform for sales teams. A giant minimalist analog clock face rendered in glowing purple #9746ff neon tubing floats on a near-black #090714 field, its hands sweeping with a long luminous motion-blur arc, and where the trail passes it turns into small glowing gold incoming-call glyphs. The clock face carries no numbers or markings of any kind. Bold geometric rounded sans-serif headline in white: "Callbacks Start About 5 Hours Later" with "5 Hours" in warm gold. A smaller light gray subheadline: "Record one message, load your list, and hit send." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Get Free Access". Dark cinematic neon photography, long-exposure light trails, strong purple glow bloom. Balanced centered square composition, headline dominant. The ONLY text in the image is the brand name "VoiceDrop", the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no invented statistics, no third-party logos, no other words anywhere. Crisp perfectly legible typography, exact spelling, generous margins, high detail, no watermark.
```

