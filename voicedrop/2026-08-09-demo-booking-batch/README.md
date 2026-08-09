# VoiceDrop demo-booking creative, 2026-08-09

**10 concepts, 18 assets.** The first VoiceDrop batch built for the **demo-booking** CTA rather than the free trial. Every previous asset in this repo (65 of 65) carries "Get Free Access"; none of them could run on a campaign optimizing for booked demos.

Product: **ringless voicemail (RVM)**, not SMS. Destination: `https://voicedrop.ai/demo/`.

Nothing uploaded, nothing launched. Assets only, awaiting Robby's picks.

## Why this batch exists

VoiceDrop's working demo engine on Meta ("SMS - Banner Ads") sells SMS. There is no RVM equivalent, and the creative library had no demo CTA at all, so an RVM demo campaign had nothing to run. This is the creative half of that gap.

Two caveats that sit outside creative, both open:

1. RVM and SMS demo bookings land on the same `/booking-success/` URL, so the Meta custom conversion "Scheduled Demo [Pixel]" (`1281635210314712`) cannot separate them. Until a product param is added to the redirect, an RVM demo campaign optimizes on a blended signal.
2. `/demo/` is a hero, four bullets and a calendar. It has no proof, testimonials, FAQ or offer, unlike the 691-line SMS lander. These ads will land on a thin page until that is fixed.

## Style

Built on the 2026-08-03 finding that Robby picked hand-made and loud pattern-interrupt over polished corporate, and called the whiteboard photo "the best by far." Six of the ten concepts are the native/anti-design family (whiteboard, legal pad, sticky notes, napkin, index card, cardboard); four are loud graphic (hazard tape, VHS glitch, split-screen, ransom note).

## Copy discipline

Every headline, subheadline and CTA below appears verbatim on voicedrop.ai. Sources: `app/demo/page.tsx` (H1, the four "what you'll see" bullets), `components/home/Hero.tsx`, `components/home/Metrics.tsx`, `components/home/WhyNumber1.tsx`, `components/marketing/adLandingShared.tsx` (the "Book a Demo" label). No invented claims, stats, customer counts or third-party logos. The 9%+ figure keeps its Trustpilot attribution in the same asset, per the playbook guardrail.

**Playbook gap this batch exposes:** `VoiceDrop-Marketing/AD-CREATIVE-PLAYBOOK.md` has no demo entry in its approved copy bank. It names exactly one CTA label, "Get Free Access", and every guardrail is written for trial creative. That file needs a demo section before the next batch.

## Spec

| Shape | Size | Notes |
|---|---|---|
| Square | 1024x1024 | Meta feed 1:1. All 10 concepts. |
| Landscape | 1200x628 | Meta link ads 1.91:1. Generated at 1200x624, resized on delivery per the playbook. 5 concepts. |
| Vertical | 1088x1920 | Stories/Reels 9:16. 3 concepts. Note: no Instagram account is linked to ad account `1787214791795310`, so these deliver on Facebook surfaces only. |

Every render was reviewed at full size: spelling exact, no invented badges or feature chips, no cropped letters, VoiceDrop wordmark present on all 18, and the split-screen phone cards left blank (the prospect calls back; VoiceDrop does not call the user).

Generation: fal `openai/gpt-image-2`, quality `high`, ~$4.20 total across 21 renders (3 re-runs after a concurrency limit).

## Concepts

### c39: Whiteboard - straight to voicemail

**Angle:** The mechanic, hand-drawn. Robby's best-performing style (c21) re-aimed at the demo CTA.

**Shapes:** square, landscape, vertical

**Files:** `voicedrop-c39-square.png` · `voicedrop-c39-landscape.png` · `voicedrop-c39-vertical.png`

<details>
<summary>Prompt, square</summary>

```text
Photograph of a real office whiteboard shot on a phone in natural window light, square. Thick black dry-erase marker hand-lettering, slightly uneven, in a person's real handwriting. Large hand-printed headline across the top: "STRAIGHT TO VOICEMAIL. NO RING." Below it a smaller hand-written line: "See a live ringless voicemail drop land." Below that a hand-drawn rounded rectangle button filled in with a yellow highlighter, with hand-printed dark text inside it: "Book a Demo". In the bottom corner, hand-lettered smaller in purple marker, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". A real whiteboard marker rests on the tray. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>

<details>
<summary>Prompt, landscape</summary>

```text
Photograph of a real office whiteboard shot on a phone in natural window light, wide landscape. Thick black dry-erase marker hand-lettering, slightly uneven, in a person's real handwriting. Large hand-printed headline across the top: "STRAIGHT TO VOICEMAIL. NO RING." Below it a smaller hand-written line: "See a live ringless voicemail drop land." Below that a hand-drawn rounded rectangle button filled in with a yellow highlighter, with hand-printed dark text inside it: "Book a Demo". In the bottom corner, hand-lettered smaller in purple marker, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". A real whiteboard marker rests on the tray. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>

<details>
<summary>Prompt, vertical</summary>

```text
Photograph of a real office whiteboard shot on a phone in natural window light, vertical. Thick black dry-erase marker hand-lettering, slightly uneven, in a person's real handwriting. Large hand-printed headline across the top: "STRAIGHT TO VOICEMAIL. NO RING." Below it a smaller hand-written line: "See a live ringless voicemail drop land." Below that a hand-drawn rounded rectangle button filled in with a yellow highlighter, with hand-printed dark text inside it: "Book a Demo". In the bottom corner, hand-lettered smaller in purple marker, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". A real whiteboard marker rests on the tray. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>


### c40: Legal pad - voice clone

**Angle:** Voice clone proof, on yellow legal paper. Tests the native family on the demo offer.

**Shapes:** square, landscape

**Files:** `voicedrop-c40-square.png` · `voicedrop-c40-landscape.png`

<details>
<summary>Prompt, square</summary>

```text
Overhead phone photograph of a yellow legal pad on a wooden desk, natural window light, square. Blue ballpoint hand-writing, real and slightly messy. Large hand-printed headline: "HEAR YOUR OWN AI VOICE CLONE." Underneath, smaller hand-written: "Read a script you pick." Beneath that a hand-drawn box outlined twice in ballpoint with hand-printed text inside: "Book a Demo". In the corner of the page, hand-lettered smaller, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". A real ballpoint pen and a coffee ring sit on the desk beside the pad. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>

<details>
<summary>Prompt, landscape</summary>

```text
Overhead phone photograph of a yellow legal pad on a wooden desk, natural window light, wide landscape. Blue ballpoint hand-writing, real and slightly messy. Large hand-printed headline: "HEAR YOUR OWN AI VOICE CLONE." Underneath, smaller hand-written: "Read a script you pick." Beneath that a hand-drawn box outlined twice in ballpoint with hand-printed text inside: "Book a Demo". In the corner of the page, hand-lettered smaller, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". A real ballpoint pen and a coffee ring sit on the desk beside the pad. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>


### c41: Sticky notes - stop chasing leads

**Angle:** The hero claim as a sticky-note wall. Pattern interrupt, zero polish.

**Shapes:** square, vertical

**Files:** `voicedrop-c41-square.png` · `voicedrop-c41-vertical.png`

<details>
<summary>Prompt, square</summary>

```text
Phone photograph of a cluster of real paper sticky notes pressed onto the bezel of a computer monitor in an office, natural light, square. Black marker hand-lettering on the notes. Across several yellow sticky notes, one phrase per note, the hand-printed headline reads: "STOP CHASING LEADS. LET THEM CALL YOU." On a single orange sticky note below, hand-printed: "Book a Demo". On one further small purple sticky note, hand-lettered, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". Slight curl at the corners of the notes, real adhesive shadow. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>

<details>
<summary>Prompt, vertical</summary>

```text
Phone photograph of a cluster of real paper sticky notes pressed onto the bezel of a computer monitor in an office, natural light, vertical. Black marker hand-lettering on the notes. Across several yellow sticky notes, one phrase per note, the hand-printed headline reads: "STOP CHASING LEADS. LET THEM CALL YOU." On a single orange sticky note below, hand-printed: "Book a Demo". On one further small purple sticky note, hand-lettered, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". Slight curl at the corners of the notes, real adhesive shadow. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>


### c42: Hazard tape - cold calling obsolete

**Angle:** Loud pattern interrupt (Robby picked c10 hazard tape) carrying the demo CTA.

**Shapes:** square, landscape

**Files:** `voicedrop-c42-square.png` · `voicedrop-c42-landscape.png`

<details>
<summary>Prompt, square</summary>

```text
Professional square display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Background: near-black dark purple #090714 crossed by two diagonal black-and-yellow hazard warning stripes, industrial caution-tape style. Bold condensed geometric sans-serif headline in white, stencilled: "MANUAL COLD CALLING IS OBSOLETE." Smaller light gray subheadline: "See a live ringless voicemail drop land." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Book a Demo". The brand name "VoiceDrop" small in white in the top left corner. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Clean advertising composition, crisp legible typography, exact spelling, generous margins, high detail.
```

</details>

<details>
<summary>Prompt, landscape</summary>

```text
Professional wide landscape display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Background: near-black dark purple #090714 crossed by two diagonal black-and-yellow hazard warning stripes, industrial caution-tape style. Bold condensed geometric sans-serif headline in white, stencilled: "MANUAL COLD CALLING IS OBSOLETE." Smaller light gray subheadline: "See a live ringless voicemail drop land." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Book a Demo". The brand name "VoiceDrop" small in white in the top left corner. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Clean advertising composition, crisp legible typography, exact spelling, generous margins, high detail.
```

</details>


### c43: VHS glitch - 9%+ callback rate

**Angle:** Robby picked the VHS treatment (c19). Only claim that carries its Trustpilot attribution.

**Shapes:** square, landscape

**Files:** `voicedrop-c43-square.png` · `voicedrop-c43-landscape.png`

<details>
<summary>Prompt, square</summary>

```text
Professional square display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Style: 1990s VHS videotape glitch, scanlines, chromatic aberration fringing, tracking distortion bars, analogue noise over a near-black dark purple #090714 field. Huge bold headline text with RGB channel split: "9%+ CALLBACK RATE" with "9%+" rendered extra large in warm gold. Smaller subheadline in white VHS caption lettering: "Reported in verified Trustpilot reviews." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Book a Demo". The brand name "VoiceDrop" small in the corner in the same VHS lettering. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Clean advertising composition, crisp legible typography, exact spelling, generous margins, high detail.
```

</details>

<details>
<summary>Prompt, landscape</summary>

```text
Professional wide landscape display ad banner for VoiceDrop, an AI ringless voicemail platform for sales teams. Style: 1990s VHS videotape glitch, scanlines, chromatic aberration fringing, tracking distortion bars, analogue noise over a near-black dark purple #090714 field. Huge bold headline text with RGB channel split: "9%+ CALLBACK RATE" with "9%+" rendered extra large in warm gold. Smaller subheadline in white VHS caption lettering: "Reported in verified Trustpilot reviews." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Book a Demo". The brand name "VoiceDrop" small in the corner in the same VHS lettering. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Clean advertising composition, crisp legible typography, exact spelling, generous margins, high detail.
```

</details>


### c44: Split screen - chasing vs calling

**Angle:** Hard before/after split (Robby picked c22), phones blank so the mechanic stays correct.

**Shapes:** square, landscape

**Files:** `voicedrop-c44-square.png` · `voicedrop-c44-landscape.png`

<details>
<summary>Prompt, square</summary>

```text
Professional square display ad banner for VoiceDrop, split hard down the middle into two halves with a sharp vertical dividing line. Left half: cold desaturated gray, a tired salesperson silhouette hunched over a desk phone, and bold white headline text on that side only: "STOP CHASING LEADS." Right half: near-black dark purple #090714 with a warm purple #9746ff glow, a smartphone face-up with three completely blank glowing notification rectangles carrying only a small phone-handset glyph and no writing of any kind, and bold gold headline text on that side only: "LET THEM CALL YOU." Centred across the bottom, a gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Book a Demo". The brand name "VoiceDrop" small in white in the top right corner. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Clean advertising composition, crisp legible typography, exact spelling, generous margins, high detail.
```

</details>

<details>
<summary>Prompt, landscape</summary>

```text
Professional wide landscape display ad banner for VoiceDrop, split hard down the middle into two halves with a sharp vertical dividing line. Left half: cold desaturated gray, a tired salesperson silhouette hunched over a desk phone, and bold white headline text on that side only: "STOP CHASING LEADS." Right half: near-black dark purple #090714 with a warm purple #9746ff glow, a smartphone face-up with three completely blank glowing notification rectangles carrying only a small phone-handset glyph and no writing of any kind, and bold gold headline text on that side only: "LET THEM CALL YOU." Centred across the bottom, a gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with dark text: "Book a Demo". The brand name "VoiceDrop" small in white in the top right corner. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Clean advertising composition, crisp legible typography, exact spelling, generous margins, high detail.
```

</details>


### c45: Napkin - see it in action

**Angle:** The demo page H1 itself, on a cafe napkin. Cheapest possible anti-ad.

**Shapes:** square

**Files:** `voicedrop-c45-square.png`

<details>
<summary>Prompt, square</summary>

```text
Phone photograph of a white paper cafe napkin on a dark wooden table beside an espresso cup, natural window light, square. Black felt-tip hand-writing bleeding very slightly into the napkin fibres, real and imperfect. Hand-printed headline: "SEE RINGLESS VOICEMAIL IN ACTION." Underneath, smaller hand-written: "Straight to voicemail, no ring." Beneath that, circled twice in felt tip, hand-printed: "Book a Demo". In the napkin corner, hand-lettered smaller, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>


### c46: Index card - TCPA and pricing

**Angle:** Objection-handling angle. The only concept that leads with compliance.

**Shapes:** square

**Files:** `voicedrop-c46-square.png`

<details>
<summary>Prompt, square</summary>

```text
Phone photograph of a white ruled index card pinned to a cork board with a red push pin, office wall behind, natural light, square. Black fineliner hand-writing, real handwriting, slightly slanted. Hand-printed headline: "STRAIGHT ANSWERS ON TCPA AND PRICING." Underneath, smaller hand-written: "Ask us live on the call." Beneath that a hand-drawn rectangle around hand-printed text: "Book a Demo". At the bottom of the card, hand-lettered smaller, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>


### c47: Ransom note - 100 or 1,000,000

**Angle:** Scale claim in punk collage. Loudest asset in the batch.

**Shapes:** square

**Files:** `voicedrop-c47-square.png`

<details>
<summary>Prompt, square</summary>

```text
Professional square display ad banner for VoiceDrop, an AI ringless voicemail platform. Style: punk ransom-note collage, headline built from mismatched magazine and newspaper letters cut out and pasted at slight angles onto a near-black dark purple #090714 background, visible torn paper edges and tape. Headline assembled from cut-out letters: "SEND 100 OR 1,000,000 VOICEMAIL DROPS." Smaller typewriter-style subheadline on a strip of torn newsprint: "Straight to voicemail, no ring." A gold gradient (#ffd874 to #ffb01f) rounded call-to-action button with clean dark text: "Book a Demo". The brand name "VoiceDrop" on its own small strip of cut-out letters in the corner. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Clean advertising composition, crisp legible typography, exact spelling, generous margins, high detail.
```

</details>


### c48: Cardboard - a live drop lands

**Angle:** Held-cardboard sign, the most human format in the family.

**Shapes:** square, vertical

**Files:** `voicedrop-c48-square.png` · `voicedrop-c48-vertical.png`

<details>
<summary>Prompt, square</summary>

```text
Phone photograph of a torn piece of brown corrugated cardboard held up against a plain white office wall by a person's hand, natural window light, square. Thick black marker hand-lettering, real and uneven, the marker bleeding into the cardboard. Hand-printed headline: "SEE A LIVE VOICEMAIL DROP LAND." Underneath, smaller hand-written: "On your own phone, during the call." Below that, boxed in marker, hand-printed: "Book a Demo". In the bottom corner, hand-lettered smaller, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". Visible cardboard flutes and torn edge. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>

<details>
<summary>Prompt, vertical</summary>

```text
Phone photograph of a torn piece of brown corrugated cardboard held up against a plain white office wall by a person's hand, natural window light, vertical. Thick black marker hand-lettering, real and uneven, the marker bleeding into the cardboard. Hand-printed headline: "SEE A LIVE VOICEMAIL DROP LAND." Underneath, smaller hand-written: "On your own phone, during the call." Below that, boxed in marker, hand-printed: "Book a Demo". In the bottom corner, hand-lettered smaller, the brand name spelled letter by letter V-o-i-c-e-D-r-o-p: "VoiceDrop". Visible cardboard flutes and torn edge. Every line of the headline must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole. The ONLY text in the image is the brand name VoiceDrop, the headline, the subheadline and the button label. No feature chips, no badges, no icons with captions, no other words anywhere. Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.
```

</details>

