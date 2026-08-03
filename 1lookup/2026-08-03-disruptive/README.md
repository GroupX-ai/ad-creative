# 1Lookup disruptive banner batch (2026-08-03)

19 upload-ready banners across 12 new concepts, built after Robby asked to "go nuts... go wild, disruptive, scroll stopping" and to test lots of things at once. Generated with fal `openai/gpt-image-2` (quality high, ~$0.20/image) per the recipe and guardrails in `AD-CREATIVE-PLAYBOOK.md` in the 1Lookup-Marketing repo.

Concepts came from a seven-lens creative panel (anti-ad pattern interrupt, bold typographic poster, product truth, photoreal physical object, absurd/surreal, data-as-art, native/unpolished). Each lens's output went through an adversarial claim-safety audit, then a portfolio ranking pass that cut 9 of 21 for message duplication or render risk. Every render was then inspected at full size against a concept-specific kill checklist.

## Claim bank refresh (important)

The playbook's approved-copy bank was stale: it carried the old hero headline "Validate Any Phone, Email, or IP Instantly". The live site now reads **"Validate Any Phone, Email, or Domain. Enrich Any Contact."** and exposes a claim that did not exist when the first two concepts were written: **34 data products on one API key and one shared credit balance** (`DATA_PRODUCT_COUNT = 34`, `src/lib/products.ts`). Five of the twelve concepts below are built on that number. The playbook has been corrected in the same branch.

## What shipped

| File | Size | Concept | Lens | On-image copy |
|---|---|---|---|---|
| `1lookup-c3-square.png` | 1024x1024 | **Not Delivered** | Anti-ad / pattern interrupt | "Find Out Before You Send." / "Line type, carrier and DNC in under 0.3 seconds." / Validate Anything |
| `1lookup-c3-vertical.png` | 1080x1920 | **Not Delivered** | Anti-ad / pattern interrupt | "Find Out Before You Send." / "Line type, carrier and DNC in under 0.3 seconds." / Validate Anything |
| `1lookup-c4-square.png` | 1024x1024 | **Declined** | Anti-ad / pattern interrupt | "Your Budget Just Got Declined." / "Stop paying for bad data." / Start For Free |
| `1lookup-c4-landscape.png` | 1200x628 | **Declined** | Anti-ad / pattern interrupt | "Your Budget Just Got Declined." / "Stop paying for bad data." / Start For Free |
| `1lookup-c5-square.png` | 1024x1024 | **Thirty-Four** | Bold typographic poster | "34 Data Products. One API Key." / "One shared credit balance. Live in 5 minutes." / Start For Free |
| `1lookup-c5-vertical.png` | 1080x1920 | **Thirty-Four** | Bold typographic poster | "34 Data Products. One API Key." / "One shared credit balance. Live in 5 minutes." / Start For Free |
| `1lookup-c6-square.png` | 1024x1024 | **0 to 100** | Product truth as a photographed object | "Risk, Scored 0 to 100." / "On every phone, email and IP validation." / Start Free Trial |
| `1lookup-c6-landscape.png` | 1200x628 | **0 to 100** | Product truth as a photographed object | "Risk, Scored 0 to 100." / "On every phone, email and IP validation." / Start Free Trial |
| `1lookup-c7-square.png` | 1024x1024 | **This Number Does Not Exist** | Absurd / Surreal | "This Number Does Not Exist" / "Validation answers in under 0.3 seconds." / Validate Anything |
| `1lookup-c7-vertical.png` | 1080x1920 | **This Number Does Not Exist** | Absurd / Surreal | "This Number Does Not Exist" / "Validation answers in under 0.3 seconds." / Validate Anything |
| `1lookup-c8-square.png` | 1024x1024 | **One Key, Every Door** | Absurd / Surreal | "One Key. Every Door." / "34 data products, one shared credit balance." / Start For Free |
| `1lookup-c8-landscape.png` | 1200x628 | **One Key, Every Door** | Absurd / Surreal | "One Key. Every Door." / "34 data products, one shared credit balance." / Start For Free |
| `1lookup-c9-square.png` | 1024x1024 | **The 300 Monolith** | Bold typographic poster | "Validation Answers In Under 300ms" / "Daily carrier data updates. 200+ countries." / Try For Free |
| `1lookup-c9-landscape.png` | 1200x628 | **The 300 Monolith** | Bold typographic poster | "Validation Answers In Under 300ms" / "Daily carrier data updates. 200+ countries." / Try For Free |
| `1lookup-c10-square.png` | 1024x1024 | **The .env Graveyard** | Native / unpolished | "34 Products. One API Key." / "One shared credit balance. Live in 5 minutes." / Read the API docs |
| `1lookup-c11-square.png` | 1024x1024 | **Dead Line** | The Photoreal Physical Object | "Stop Paying for Bad Data" / "Validate any phone, email, or domain." / Start For Free |
| `1lookup-c12-square.png` | 1024x1024 | **The Coverage Mandala** | Data as art | "200+ Countries. One API Key." / "Validate any phone, email, or domain." / Start For Free |
| `1lookup-c13-square.png` | 1024x1024 | **Shot Off The Monitor** | Native / unpolished | "1,000 Requests Per Minute. Included." / "Upload a CSV. Higher limits available." / Start For Free |
| `1lookup-c14-square.png` | 1024x1024 | **The Selected Line** | Bold typographic poster | "Validate Any Phone, Email, Or Domain." / "Then enrich any contact. Same API key." / Validate Anything |

## Render review

All 19 renders were inspected at full size on 2026-08-03 against a per-concept kill checklist (the exact failure each concept was most likely to produce: a status caption under the failed message, a currency symbol beside the 34, a cropped `300ms`, digits on the payphone keypads, numerals on the risk dial, invented stats in the terminal). No render needed a re-roll. Three carry notes:

- **`1lookup-c9-square.png`** — The 3D 300ms is near-black on black and may mud at 300px. The landscape cut states 300ms in flat white as well and is the safer buy for small placements.
- **`1lookup-c10-square.png`** — Renders commented-out placeholder env var names. No fabricated stat or third-party brand; the five categories map exactly to the approved "validation, enrichment, B2B prospecting, SEO and transcription" line.
- **`1lookup-c13-square.png`** — Renders a real API endpoint (api.1lookup.io/v1/validate/email/bulk), verified against src/components/home/live-ledger.tsx:202 and four live code samples. Deliberate exception to the no-other-text rule: it is the concept, and it is true.

The two text exceptions above are deliberate. The playbook's no-other-text rule exists to stop the model inventing feature chips with fabricated stats; real, verifiable product text that *is* the concept is a different thing. Both were checked against the repo before they were allowed to stay.

## Sizing gotcha worth remembering

fal requires both dimensions to be multiples of 16, and **neither delivery size is one**: 628 and 1080 both fail. So the delivery sizes cannot be generated directly. Generate landscape at 1200x624 and resize to 1200x628; generate vertical at 1080x1920 and expect 1072x1920 back, then resize to 1080x1920. Skipping the vertical resize ships a 0.5583 aspect where Stories wants 0.5625.

## Concepts, angles and watch-outs

### c3 — Not Delivered (Anti-ad / pattern interrupt)

**Copy:** "Find Out Before You Send." / "Line type, carrier and DNC in under 0.3 seconds." / button "Validate Anything"

**Why it was picked:** The single strongest interrupt in the whole set: a red failed-send badge is parsed pre-consciously as "my text failed" before it is parsed as an ad, and it is near-monochrome dark in a bright feed, so it buys a second beat on contrast alone. Claim is clean (PASS), copy makes no factual assertion beyond three approved API fields and the approved 0.3s number. Ranked first because it is the only concept that stops the thumb before the brain classifies the frame.

**Claims used, all traceable to the site:**
- "under 0.3 seconds" from the hero subhead "Validation answers in under 0.3 seconds."
- line_type, carrier and dnc_registered are all approved API response fields
- CTA "Validate Anything" is an approved CTA label
- Headline makes no factual claim; it is an instruction

**Watch-out:** Meta can read failed-interface mimicry as deceptive, so the thread must stay generically unbranded and every bubble blurred past legibility; keep the wordmark legible as the mitigation. Inspect every roll for a status caption under the red bubble, which is the model's default behaviour and a guardrail 6 kill. If the red glyph renders small or ambiguous the concept collapses into a plain dark banner: re-roll, do not ship. Small annoyance risk that a viewer briefly thinks their own message failed.

**Files:** `1lookup-c3-square.png`, `1lookup-c3-vertical.png`

### c4 — Declined (Anti-ad / pattern interrupt)

**Copy:** "Your Budget Just Got Declined." / "Stop paying for bad data." / button "Start For Free"

**Why it was picked:** No interface, no product shot, no SaaS layout, so it never trips ad-blindness: it reads as a photograph someone posted. Money dread is instant and physical, and it carries zero numbers so there is nothing to over-claim. It is also the pain concept with a genuinely new headline rather than the c1 reuse, so it tests a fresh message.

**Claims used, all traceable to the site:**
- "Stop paying for bad data." is approved verbatim site copy (cta.tsx:75 and hero subhead)
- CTA "Start For Free" is an approved CTA label
- Headline is a metaphor for wasted spend and asserts no fact about the product
- No numeric claim of any kind appears

**Watch-out:** Category confusion is the real risk: a payment terminal can read as a fintech product, so the subheadline carries the whole "this is about data" job and must be legible in the same glance. Inspect every roll for terminal branding and for digits on the keypad, both of which the model defaults to and both of which break a guardrail. Some networks disapprove decline imagery for inducing financial alarm.

**Files:** `1lookup-c4-square.png`, `1lookup-c4-landscape.png`

### c5 — Thirty-Four (Bold typographic poster)

**Copy:** "34 Data Products. One API Key." / "One shared credit balance. Live in 5 minutes." / button "Start For Free"

**Why it was picked:** A white numeral at billboard scale reads faster than any illustration, and "34 what?" is the cheapest curiosity gap available. It carries the newest and strongest product story (34 data products, one key), which the two live ads never touch. PASS on claims with every number traced to source.

**Claims used, all traceable to the site:**
- 34 data products (DATA_PRODUCT_COUNT = 34, src/lib/products.ts:116)
- "one API key and one shared credit balance" from the hero subhead
- "Live in 5 minutes or less" (cta.tsx:28)
- CTA "Start For Free" is an approved CTA label

**Watch-out:** At thumbnail a naked "34" next to a free CTA can be misread as $34, and the cheapest real plan is $99/month, so any render with a currency symbol near the numeral is an automatic kill. A percent sign would hit the accuracy guardrail: also an automatic kill. Image models mangle the counters of very large numerals, so budget re-rolls and reject anything where "34" is not instantly readable.

**Files:** `1lookup-c5-square.png`, `1lookup-c5-vertical.png`

### c6 — 0 to 100 (Product truth as a photographed object)

**Copy:** "Risk, Scored 0 to 100." / "On every phone, email and IP validation." / button "Start Free Trial"

**Why it was picked:** It does not look like software; it lands with the visual weight of a watch or camera ad, which is completely foreign to a validation-API feed. Cleanest claim in the batch: headline plus subheadline restate intelligence.tsx:45 verbatim in scope, and no score value is asserted. Native left-text / right-object split makes it the best landscape asset in the set.

**Claims used, all traceable to the site:**
- Headline plus subheadline restate the approved claim verbatim in scope: "A 0-100 risk score on every phone, email, and IP validation" (intelligence.tsx:45)
- "Real-Time Fraud Scoring" is the underlying approved product metric
- CTA "Start Free Trial" is an approved CTA label
- No score value stated: needle position only, arc endpoints 0 and 100 only

**Watch-out:** The live failure mode is the model printing a number on the dial face or adding a digital readout; any numeral other than the 0 and the 100 is a fabricated stat and a kill. A machined bezel also invites engraved words, which is a guardrail 6 breach. Arc corrected to green-amber-red to match 1Lookup's own risk display (comparison-features.tsx:138-143) so brand cyan does not mark maximum danger. Never run the headline without the subheadline or the gauge reads as a speedometer.

**Files:** `1lookup-c6-square.png`, `1lookup-c6-landscape.png`

### c7 — This Number Does Not Exist (Absurd / Surreal)

**Copy:** "This Number Does Not Exist" / "Validation answers in under 0.3 seconds." / button "Validate Anything"

**Why it was picked:** The most forwardable single image in the set: a museum-grade oil-painting telephone floating in a void is the last thing anyone expects in paid social, and the reversed shadow buys a second beat of hesitation. The Magritte negation is a joke format people already recognise, so the punchline lands without a caption. Post-fix subheadline restores the verbatim hero line, which also supplies the subject the headline withholds.

**Claims used, all traceable to the site:**
- "Validation answers in under 0.3 seconds." is the verbatim hero subhead tail (hero.tsx:723)
- CTA "Validate Anything" is an approved CTA label
- Headline makes no factual claim; it is a Magritte-style negation of the pictured object

**Watch-out:** Comprehension rests entirely on the subheadline and wordmark, so build the 9:16 with both fully inside the safe area and never crop them. The model will want to print digits or a caller ID on the handset: any digit anywhere is an automatic re-roll. Title echoes thispersondoesnotexist, so a viewer could invert it to "this vendor's data is synthetic"; log it and watch comment sentiment on the first flight.

**Files:** `1lookup-c7-square.png`, `1lookup-c7-vertical.png`

### c8 — One Key, Every Door (Absurd / Surreal)

**Copy:** "One Key. Every Door." / "34 data products, one shared credit balance." / button "Start For Free"

**Why it was picked:** Impossible architecture plus a scale joke that resolves in half a second, and it renders the five-vendor-stack problem as a place rather than a diagram. Tightest copy in the batch at four words. One-point perspective makes it a natural landscape asset.

**Claims used, all traceable to the site:**
- 34 data products (DATA_PRODUCT_COUNT = 34, src/lib/products.ts:116)
- "one API key and one shared credit balance" from the hero subhead (hero.tsx:723)
- CTA "Start For Free" is an approved CTA label

**Watch-out:** Hard shipping condition: no placement, crop or thumbnail may run without the subheadline visible, because "Every Door" is an unbounded coverage metaphor that only the literal 34 pins down. Deliberately excluded from vertical for that reason, since Stories crops are the riskiest. "One key opens every door" can read as unauthorised access in the consumer-data category, which is the likeliest reason Meta would reject it. Keep the door grid dense so no count is legible.

**Files:** `1lookup-c8-square.png`, `1lookup-c8-landscape.png`

### c9 — The 300 Monolith (Bold typographic poster)

**Copy:** "Validation Answers In Under 300ms" / "Daily carrier data updates. 200+ countries." / button "Try For Free"

**Why it was picked:** Type built as a physical object under one hard raking light reads as a photograph of something real, not a banner, so the thumb stops before the frame is classified as an ad. It is the only landscape-native shape in the batch: a wide horizontal slab. Post-fix subheadline drops FCC so the US-only regulator no longer sits next to a global coverage number.

**Claims used, all traceable to the site:**
- "under 300ms" / "Validation answers in under 0.3 seconds" (hero.tsx:723, proof-strip.tsx "<300ms")
- "Daily" FCC & Carrier Data Updates, with the regulator dropped so only the carrier-data claim remains
- "200+" Countries Covered (intelligence.tsx CountUp to={200} suffix="+")
- CTA "Try For Free" is an approved CTA label

**Watch-out:** Binding: the full "300ms" must sit uncropped inside the frame. A cropped render can produce "00ms" or "30ms", which puts an unapproved number and a false 10x speed claim into a live ad, and it is the only instruction here that can turn an approved number into an unapproved one. Lock lowercase "ms" and reject "MS" or "m/s". Never upgrade the speed claim to "always", "every lookup" or "guaranteed": the site's own label is Average Validation Response.

**Files:** `1lookup-c9-square.png`, `1lookup-c9-landscape.png`

### c10 — The .env Graveyard (Native / unpolished)

**Copy:** "34 Products. One API Key." / "One shared credit balance. Live in 5 minutes." / button "Read the API docs"

**Why it was picked:** Reads as a developer's own screenshot, so the thumb pauses to decode it before realising it is an ad, and five commented-out vendor keys against one live line is the only concept that shows the five-vendor-stack pain concretely rather than as metaphor. It is also the only docs-CTA in the portfolio, so it doubles as a CTA test on cold traffic.

**Claims used, all traceable to the site:**
- 34 data products (DATA_PRODUCT_COUNT = 34, src/lib/products.ts:116)
- "one API key and one shared credit balance" (hero.tsx:721-722)
- "Live in 5 minutes or less" (cta.tsx:28)
- Env var names map to real product categories: validation, enrichment, SEO, transcription
- CTA "Read the API docs" is an approved CTA label

**Watch-out:** Copy is near-identical to c5 (headline says "34 Products" not "34 data products", and the subheadline is word for word the same), so run these two as a paired visual and CTA test in one ad set, never as separate message tests. Note that the phrasing without "data" is looser than the approved "34 data products"; it passed the gate, but do not propagate it to new concepts. Six underscore-heavy strings is the largest garble surface in the batch: any misspelling is a mandatory re-roll. Soft docs CTA will likely under-convert on cold traffic.

**Files:** `1lookup-c10-square.png`

### c11 — Dead Line (The Photoreal Physical Object)

**Copy:** "Stop Paying for Bad Data" / "Validate any phone, email, or domain." / button "Start For Free"

**Why it was picked:** A dark, beautiful photograph of dangling dead handsets is the last thing expected between two SaaS ads, and "this number does not connect" lands before a single word is read. It is deliberately the one headline reuse in the batch, which turns it into a clean visual A/B against live c1: identical message, radically different register.

**Claims used, all traceable to the site:**
- "Stop Paying for Bad Data" verbatim (cta.tsx:75)
- "Validate Any Phone, Email, or Domain." verbatim hero H1 (hero.tsx:694)
- CTA "Start For Free" is an approved CTA label
- No numbers appear anywhere

**Watch-out:** Only ships because the visual is a completely different concept from c1's icon cards; if Robby wants zero headline overlap in this batch, this is the one to reword or cut. Payphones carry keypad digits, coin-slot plates and telecom badging by default, so the model will fight the blank-surface instruction: reject any render showing digits, plates or a carrier mark. Without the subheadline it reads as telecom nostalgia, so the subheadline must survive any crop.

**Files:** `1lookup-c11-square.png`

### c12 — The Coverage Mandala (Data as art)

**Copy:** "200+ Countries. One API Key." / "Validate any phone, email, or domain." / button "Start For Free"

**Why it was picked:** A woven ring of light reads as an object rather than a placement, so the "this is a banner, skip" pattern-match fails, and the dark void at its centre funnels the eye straight into the number. It is the only concept carrying the 200+ countries scale claim, which nothing else in the portfolio touches. Ranked below the photoreal work because a glowing ring is the closest thing here to a conventional data-viz banner.

**Claims used, all traceable to the site:**
- "200+" Countries Covered (intelligence.tsx CountUp to={200} suffix="+", label "Countries Covered")
- One API key (platform.tsx eyebrow "One API key"; hero subhead)
- "Validate Any Phone, Email, or Domain." (hero.tsx:694)
- CTA "Start For Free" is an approved CTA label

**Watch-out:** The generator's habit is turning tick marks into tiny numerals or letters around the rim: any legible character on the bezel is an automatic re-roll. Needs a squint test at 300px, because hairline arcs mud into a gray smear at Meta thumbnail size; bump arc contrast if it fails. Keep lavender as a fringe accent only or the mandala drifts occult or crypto-adjacent. Square only: the type-in-the-void composition is the concept and it does not survive a wide or tall reflow.

**Files:** `1lookup-c12-square.png`

### c13 — Shot Off The Monitor (Native / unpolished)

**Copy:** "1,000 Requests Per Minute. Included." / "Upload a CSV. Higher limits available." / button "Start For Free"

**Why it was picked:** Visible moire and a glass reflection are the strongest possible signal that something was not made by an agency, so it slips past ad-blindness entirely, and a job caught mid-run creates an open loop the eye wants to close. It is the only throughput and bulk message in the portfolio. Ranked low because the claim is the narrowest here and the post-fix subheadline is a qualifier rather than a hook.

**Claims used, all traceable to the site:**
- "1,000" Requests/min Included (intelligence.tsx:302-305), with the site's own qualifier "higher limits available" (intelligence.tsx:276) restored
- CSV upload for batch jobs (how-it-works.tsx:22)
- Bulk endpoint /v1/validate/email/bulk and api.1lookup.io, both 1Lookup's own
- CTA "Start For Free" is an approved CTA label

**Watch-out:** The fix that made this shippable was restoring "Higher limits available", which removes the free-tier promise the bare "Included." created against the FAQ (limits vary by plan). Do not drop that line. Progress bar must be blocks only: a rendered 67%, row count or elapsed time is an invented stat and a mandatory re-roll. Deliberately no timing number in frame, since under 300ms is only defensible as an average. If the domain garbles, fall back to "$ curl -X POST /v1/validate/email/bulk" rather than shipping a misspelled api.1lookup.io. Square only: a monitor photograph cannot be reflowed to 9:16.

**Files:** `1lookup-c13-square.png`

### c14 — The Selected Line (Bold typographic poster)

**Copy:** "Validate Any Phone, Email, Or Domain." / "Then enrich any contact. Same API key." / button "Validate Anything"

**Why it was picked:** The only frame in the feed with no picture in it at all, which is exactly why it gets looked at, and the blue selection block plus cursor is a gesture every developer recognises instantly. It is the only concept that elevates the site H1 to a headline, so it is the cleanest read on whether the core positioning line can carry an ad on its own. Ranked last because text-to-image is effectively 100 percent and Meta delivery will suffer.

**Claims used, all traceable to the site:**
- "Validate Any Phone, Email, or Domain." verbatim hero H1 (hero.tsx:695)
- "Enrich Any Contact." hero H1 alternate
- Same API key, from the hero subhead and the platform eyebrow "One API key"
- CTA "Validate Anything" is an approved CTA label
- No number appears at all

**Watch-out:** Explicitly a learning test, not a scale bet: expect weaker delivery than everything else in the batch and judge it in its own ad set. Highest extra-text risk in the batch, because stretching four lines of unequal length invites the model to invent filler words; the six-word lock has to be enforced at QA. Mandatory re-roll rule: if the words inside the blue block are not clearly legible it reads as a redaction bar, which inverts the meaning for a lookup API. Square only, the type wall does not survive a 9:16 stretch.

**Files:** `1lookup-c14-square.png`

## Prompts

Every prompt follows the playbook template and ends with the standard no-extra-text constraint, which is what stops the model inventing feature chips with fabricated stats.

### `1lookup-c3-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Find Out Before You Send.". Smaller subheadline text: "Line type, carrier and DNC in under 0.3 seconds.". A bright blue #3B82F6 rounded call-to-action button with white text: "Validate Anything". Vertical composition on a flat deep blue-black #05060F field, no gradient and no glow, unstyled like a raw screenshot. The upper two thirds is a generic unbranded dark chat thread: three stacked message bubbles in slate #111629 with squared-off corners and no tails, no app chrome, no avatars, no timestamps, no read receipts and no status caption of any kind; the contents of every bubble are soft blurred gray text-lines, never legible words or characters. The last bubble is right-aligned, outlined in alert red #EF4444 and visibly desaturated against the others, with one large solid red circle-and-exclamation glyph pinned tight to its lower-right corner, unmistakably prominent, and a faint red bloom bleeding a few pixels into the background. No bubble is iOS blue. Lighting is a single cold overhead phone-screen glow falling off hard into black at the frame edges, no rim light, no lens flare. The lower third drops to near-black negative space holding the headline in white geometric technical sans-serif, the subheadline in light gray #94A3B8 beneath it, and a bright blue #3B82F6 rounded button. The only two chromatic accents in the entire image are the red failure glyph and the blue button; everything else is monochrome slate. The 1lookup wordmark, blue "1" and white "lookup", sits top-left and must be clearly legible, not faint. No status text, label, caption, timestamp or read receipt under or beside any message bubble. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c3-vertical.png`

```text
Professional tall vertical 9:16 display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Find Out Before You Send.". Smaller subheadline text: "Line type, carrier and DNC in under 0.3 seconds.". A bright blue #3B82F6 rounded call-to-action button with white text: "Validate Anything". Vertical composition on a flat deep blue-black #05060F field, no gradient and no glow, unstyled like a raw screenshot. The upper two thirds is a generic unbranded dark chat thread: three stacked message bubbles in slate #111629 with squared-off corners and no tails, no app chrome, no avatars, no timestamps, no read receipts and no status caption of any kind; the contents of every bubble are soft blurred gray text-lines, never legible words or characters. The last bubble is right-aligned, outlined in alert red #EF4444 and visibly desaturated against the others, with one large solid red circle-and-exclamation glyph pinned tight to its lower-right corner, unmistakably prominent, and a faint red bloom bleeding a few pixels into the background. No bubble is iOS blue. Lighting is a single cold overhead phone-screen glow falling off hard into black at the frame edges, no rim light, no lens flare. The lower third drops to near-black negative space holding the headline in white geometric technical sans-serif, the subheadline in light gray #94A3B8 beneath it, and a bright blue #3B82F6 rounded button. The only two chromatic accents in the entire image are the red failure glyph and the blue button; everything else is monochrome slate. The 1lookup wordmark, blue "1" and white "lookup", sits top-left and must be clearly legible, not faint. No status text, label, caption, timestamp or read receipt under or beside any message bubble. Tall vertical 9:16 composition: the visual element fills the upper two thirds and the text block with the call-to-action button sits in the lower third. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c4-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Your Budget Just Got Declined.". Smaller subheadline text: "Stop paying for bad data.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". Photoreal, not a SaaS layout: a scuffed matte-black card payment terminal sits at a three-quarter angle on a wet dark countertop, shot close with shallow depth of field so the terminal's front edge is razor sharp and the background collapses into deep blue-black #05060F bokeh. The terminal chassis, bezel, screen surround and every surface of the device are completely unbranded: no maker marks, no payment-network marks, no logos and no lettering anywhere on the hardware. Its small screen glows hard alert red #EF4444 showing one thick red X glyph and absolutely nothing else, no words, no numbers, no icons beside it. The rubber keypad is pushed past the depth of field into soft blur with completely blank unmarked keys, so no digit or character is legible anywhere in the frame. That red light spills across the keypad, catches the raised edge of every key, and reflects in the damp countertop as a long smeared vertical streak toward the camera. A payment card lies half-ejected from the slot, face down and completely featureless: no logo, no chip, no embossed numbers, no magnetic stripe. Lighting is one cold blue rim light from the upper left grazing the terminal's top edge, plus the red screen as the only warm source; everything else falls into black. The headline is set in white geometric technical sans-serif across the upper-left negative space with the subheadline in light gray directly beneath it, set large enough to be read in the same glance as the headline, a bright blue #3B82F6 rounded button in the lower left, and the 1lookup wordmark, blue "1" and white "lookup", small at top-left and kept well away from the terminal screen. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c4-landscape.png`

```text
Professional wide landscape display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Your Budget Just Got Declined.". Smaller subheadline text: "Stop paying for bad data.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". Photoreal, not a SaaS layout: a scuffed matte-black card payment terminal sits at a three-quarter angle on a wet dark countertop, shot close with shallow depth of field so the terminal's front edge is razor sharp and the background collapses into deep blue-black #05060F bokeh. The terminal chassis, bezel, screen surround and every surface of the device are completely unbranded: no maker marks, no payment-network marks, no logos and no lettering anywhere on the hardware. Its small screen glows hard alert red #EF4444 showing one thick red X glyph and absolutely nothing else, no words, no numbers, no icons beside it. The rubber keypad is pushed past the depth of field into soft blur with completely blank unmarked keys, so no digit or character is legible anywhere in the frame. That red light spills across the keypad, catches the raised edge of every key, and reflects in the damp countertop as a long smeared vertical streak toward the camera. A payment card lies half-ejected from the slot, face down and completely featureless: no logo, no chip, no embossed numbers, no magnetic stripe. Lighting is one cold blue rim light from the upper left grazing the terminal's top edge, plus the red screen as the only warm source; everything else falls into black. The headline is set in white geometric technical sans-serif across the upper-left negative space with the subheadline in light gray directly beneath it, set large enough to be read in the same glance as the headline, a bright blue #3B82F6 rounded button in the lower left, and the 1lookup wordmark, blue "1" and white "lookup", small at top-left and kept well away from the terminal screen. Wide landscape composition: the text block sits on the left half and the visual element fills the right half, with the call-to-action button under the text. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c5-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "34 Data Products. One API Key.". Smaller subheadline text: "One shared credit balance. Live in 5 minutes.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". Flat deep blue-black #05060F ground, no mesh and no texture, treated as an empty night stage. The numeral "34" is set in heavy geometric technical sans-serif in white #F8FAFC at roughly 72 percent of the frame height, so large it dominates the frame, with only the very tips of both characters kissing the top edge; both glyphs stay completely unambiguous and instantly readable as three and four, never cropped enough to be misread as any other character. One hard-edged diagonal band of the signature gradient (#3B82F6 into #22D3EE into #818CF8) cuts across the lower third of the numerals and clips flush to their outer contours; it is the only colour in the frame. Lighting is a single floor-mounted source below and left of the numerals, throwing a narrow cone of blue haze up their faces and one long soft shadow upward into the void behind them. The remaining headline words sit small, tight and left-aligned in white on the baseline directly beneath the numeral, with a single one-pixel cyan #22D3EE hairline rule spanning the full frame width under them. Directly beneath that hairline rule sits exactly one line of light gray subheadline text and nothing else. The 1lookup wordmark, blue "1" and white "lookup", sits bottom left and a bright blue #3B82F6 rounded pill button bottom right, with generous black breathing room around that bottom band. No percent sign, no currency symbol, no plus sign, no stars, no rating marks, and no digits anywhere in the image other than the literal "34" and the "5" inside the subheadline. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c5-vertical.png`

```text
Professional tall vertical 9:16 display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "34 Data Products. One API Key.". Smaller subheadline text: "One shared credit balance. Live in 5 minutes.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". Flat deep blue-black #05060F ground, no mesh and no texture, treated as an empty night stage. The numeral "34" is set in heavy geometric technical sans-serif in white #F8FAFC at roughly 72 percent of the frame height, so large it dominates the frame, with only the very tips of both characters kissing the top edge; both glyphs stay completely unambiguous and instantly readable as three and four, never cropped enough to be misread as any other character. One hard-edged diagonal band of the signature gradient (#3B82F6 into #22D3EE into #818CF8) cuts across the lower third of the numerals and clips flush to their outer contours; it is the only colour in the frame. Lighting is a single floor-mounted source below and left of the numerals, throwing a narrow cone of blue haze up their faces and one long soft shadow upward into the void behind them. The remaining headline words sit small, tight and left-aligned in white on the baseline directly beneath the numeral, with a single one-pixel cyan #22D3EE hairline rule spanning the full frame width under them. Directly beneath that hairline rule sits exactly one line of light gray subheadline text and nothing else. The 1lookup wordmark, blue "1" and white "lookup", sits bottom left and a bright blue #3B82F6 rounded pill button bottom right, with generous black breathing room around that bottom band. No percent sign, no currency symbol, no plus sign, no stars, no rating marks, and no digits anywhere in the image other than the literal "34" and the "5" inside the subheadline. Tall vertical 9:16 composition: the visual element fills the upper two thirds and the text block with the call-to-action button sits in the lower third. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c6-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Risk, Scored 0 to 100.". Smaller subheadline text: "On every phone, email and IP validation.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start Free Trial". A seamless near-black #05060F studio sweep, floor and backdrop continuous, nothing else in the room. Filling roughly seventy percent of the frame and set right of centre, one precision instrument shot macro: a circular risk-score dial machined from dark anodized aluminium with a knurled milled bezel and anti-glare sapphire glass. Its arc runs from a small engraved "0" at the left end to a small engraved "100" at the right end in JetBrains Mono, and those two numerals are the only numerals anywhere in the entire image: no intermediate tick numbers, no 20 40 60 80, no digital readout, no numeric display of any kind. The bezel and every metal surface are completely free of engraved words: no RISK, no SCORE, no SCALE, no maker's mark, no lettering at all. The dial face is a real interface rather than an analog gauge: matte #0B0F1E, a thin arc track that grades from verification green #10B981 at the low end through amber into deep red at the high end, with one hairline live-signal cyan #22D3EE needle resting just past the midpoint and a soft cyan bloom where it crosses the glass; cyan is reserved for the needle alone and never appears in the arc itself. Lighting is a hard key from upper left throwing a long specular streak across the bezel, a cool blue rim light on the right edge, deep falloff into black, and shallow depth of field so the knurling is razor sharp while the sweep dissolves. Headline and subheadline sit to the left of the dial in white geometric technical sans-serif, subheadline in light gray, with the bright blue #3B82F6 rounded call-to-action button directly beneath them, and the 1lookup wordmark, blue "1" and white "lookup", small in the top-left. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c6-landscape.png`

```text
Professional wide landscape display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Risk, Scored 0 to 100.". Smaller subheadline text: "On every phone, email and IP validation.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start Free Trial". A seamless near-black #05060F studio sweep, floor and backdrop continuous, nothing else in the room. Filling roughly seventy percent of the frame and set right of centre, one precision instrument shot macro: a circular risk-score dial machined from dark anodized aluminium with a knurled milled bezel and anti-glare sapphire glass. Its arc runs from a small engraved "0" at the left end to a small engraved "100" at the right end in JetBrains Mono, and those two numerals are the only numerals anywhere in the entire image: no intermediate tick numbers, no 20 40 60 80, no digital readout, no numeric display of any kind. The bezel and every metal surface are completely free of engraved words: no RISK, no SCORE, no SCALE, no maker's mark, no lettering at all. The dial face is a real interface rather than an analog gauge: matte #0B0F1E, a thin arc track that grades from verification green #10B981 at the low end through amber into deep red at the high end, with one hairline live-signal cyan #22D3EE needle resting just past the midpoint and a soft cyan bloom where it crosses the glass; cyan is reserved for the needle alone and never appears in the arc itself. Lighting is a hard key from upper left throwing a long specular streak across the bezel, a cool blue rim light on the right edge, deep falloff into black, and shallow depth of field so the knurling is razor sharp while the sweep dissolves. Headline and subheadline sit to the left of the dial in white geometric technical sans-serif, subheadline in light gray, with the bright blue #3B82F6 rounded call-to-action button directly beneath them, and the 1lookup wordmark, blue "1" and white "lookup", small in the top-left. Wide landscape composition: the text block sits on the left half and the visual element fills the right half, with the call-to-action button under the text. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c7-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "This Number Does Not Exist". Smaller subheadline text: "Validation answers in under 0.3 seconds.". A bright blue #3B82F6 rounded call-to-action button with white text: "Validate Anything". Flat seamless deep blue-black #05060F filling the whole frame like a windless night sky, with one thin glowing cyan #22D3EE horizon line about a third up from the bottom suggesting a distant sea. Dead centre, one enormous photoreal mid-century black bakelite telephone handset floats unsupported in mid-air, painted in the cold hyper-clear academic realism of Rene Magritte: crisp bakelite highlights, no stylization, no motion. It is the handset only. There is no telephone base, no rotary dial, no numeral ring, no keypad, no caller-ID display and no digits or numerals of any kind anywhere in the image. Its coiled cord hangs down and, in its lower third, dissolves into a fine drift of cyan #22D3EE particles that scatter sideways as if the air had moved. The handset casts one hard-edged shadow onto an empty matte #0B0F1E ground plane, and the shadow points toward the light source instead of away from it. Lighting is a single cool key from the upper left; everything else falls off to blue-black, and the only saturated colours in the frame are the cyan accents and the blue #3B82F6 rounded call-to-action button. Headline in white geometric technical sans-serif across the upper third, light gray subheadline directly beneath it and clearly legible at small size, the 1lookup wordmark, blue "1" and white "lookup", small in a corner, generous margins, museum-still, zero clutter. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c7-vertical.png`

```text
Professional tall vertical 9:16 display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "This Number Does Not Exist". Smaller subheadline text: "Validation answers in under 0.3 seconds.". A bright blue #3B82F6 rounded call-to-action button with white text: "Validate Anything". Flat seamless deep blue-black #05060F filling the whole frame like a windless night sky, with one thin glowing cyan #22D3EE horizon line about a third up from the bottom suggesting a distant sea. Dead centre, one enormous photoreal mid-century black bakelite telephone handset floats unsupported in mid-air, painted in the cold hyper-clear academic realism of Rene Magritte: crisp bakelite highlights, no stylization, no motion. It is the handset only. There is no telephone base, no rotary dial, no numeral ring, no keypad, no caller-ID display and no digits or numerals of any kind anywhere in the image. Its coiled cord hangs down and, in its lower third, dissolves into a fine drift of cyan #22D3EE particles that scatter sideways as if the air had moved. The handset casts one hard-edged shadow onto an empty matte #0B0F1E ground plane, and the shadow points toward the light source instead of away from it. Lighting is a single cool key from the upper left; everything else falls off to blue-black, and the only saturated colours in the frame are the cyan accents and the blue #3B82F6 rounded call-to-action button. Headline in white geometric technical sans-serif across the upper third, light gray subheadline directly beneath it and clearly legible at small size, the 1lookup wordmark, blue "1" and white "lookup", small in a corner, generous margins, museum-still, zero clutter. Tall vertical 9:16 composition: the visual element fills the upper two thirds and the text block with the call-to-action button sits in the lower third. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c8-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "One Key. Every Door.". Smaller subheadline text: "34 data products, one shared credit balance.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". An infinite deep blue-black #05060F void reading as a vast interior, with a matte charcoal #0B0F1E floor plane meeting it at a low horizon. A dense, perfectly regular grid of identical tall plain matte dark-navy panel doors floats unsupported in mid-air, receding in strict one-point perspective toward the centre of the frame, so dense and so deep that no viewer could ever count them; each door is cracked open a few inches with cold cyan #22D3EE light spilling out in a hard blade across the floor. In the immediate foreground, hovering at eye level and comically small against the architecture, a single ordinary brass door key in sharp photoreal focus, plain and unbranded with no tag, no fob, no keyring and no lettering on it, while the doors behind it fall off softly into the dark. Every door, frame, hinge and wall surface is completely blank: no room numbers, no numerals, no letters, no placards, no signage, no exit signs, no keycard readers and no labels of any kind anywhere in the architecture. Lighting is one soft cool key from the upper right plus the cyan door-light; no people, no dust, no motion blur, absolute Magritte stillness. Headline in white geometric technical sans-serif stacked at the left with the light gray subheadline directly under it and fully legible, a blue #3B82F6 rounded call-to-action button below, the 1lookup wordmark, blue "1" and white "lookup", small in a corner, generous margins. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c8-landscape.png`

```text
Professional wide landscape display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "One Key. Every Door.". Smaller subheadline text: "34 data products, one shared credit balance.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". An infinite deep blue-black #05060F void reading as a vast interior, with a matte charcoal #0B0F1E floor plane meeting it at a low horizon. A dense, perfectly regular grid of identical tall plain matte dark-navy panel doors floats unsupported in mid-air, receding in strict one-point perspective toward the centre of the frame, so dense and so deep that no viewer could ever count them; each door is cracked open a few inches with cold cyan #22D3EE light spilling out in a hard blade across the floor. In the immediate foreground, hovering at eye level and comically small against the architecture, a single ordinary brass door key in sharp photoreal focus, plain and unbranded with no tag, no fob, no keyring and no lettering on it, while the doors behind it fall off softly into the dark. Every door, frame, hinge and wall surface is completely blank: no room numbers, no numerals, no letters, no placards, no signage, no exit signs, no keycard readers and no labels of any kind anywhere in the architecture. Lighting is one soft cool key from the upper right plus the cyan door-light; no people, no dust, no motion blur, absolute Magritte stillness. Headline in white geometric technical sans-serif stacked at the left with the light gray subheadline directly under it and fully legible, a blue #3B82F6 rounded call-to-action button below, the 1lookup wordmark, blue "1" and white "lookup", small in a corner, generous margins. Wide landscape composition: the text block sits on the left half and the visual element fills the right half, with the call-to-action button under the text. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c9-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Validation Answers In Under 300ms". Smaller subheadline text: "Daily carrier data updates. 200+ countries.". A bright blue #3B82F6 rounded call-to-action button with white text: "Try For Free". Deep blue-black #05060F void, completely empty except for one object. The exact string "300ms", with a lowercase m and a lowercase s, is built as thick extruded three-dimensional slabs in near-black #0B0F1E rising out of the floor like a monolith. The complete string sits entirely inside the frame with clear margin on both sides: no character is cropped, clipped or bled off any edge, and all five characters read unambiguously as three, zero, zero, m, s. The "ms" is about one third the height of the "300" and sits on the same baseline. A single hard raking key light enters from the far right at a very low angle: it rims every right-facing edge in hot cyan #22D3EE, leaves the front faces in deep shadow, and throws long hard-edged shadows from each character far across the floor to the left. The headline words "VALIDATION ANSWERS IN UNDER" are set small, white, uppercase and widely tracked in geometric technical sans-serif on one line directly above the monolith, so the eye reads the small line straight into the enormous number and the two together form the single headline. Below the monolith sits exactly one line of light gray subheadline text, then a bright blue #3B82F6 rounded pill button centred at the bottom; the 1lookup wordmark, blue "1" and white "lookup", sits top left. No gradient mesh, no particles, no glow anywhere beyond that single cyan rim light, and no caption, label or extra line of any kind at the base of the monolith. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c9-landscape.png`

```text
Professional wide landscape display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Validation Answers In Under 300ms". Smaller subheadline text: "Daily carrier data updates. 200+ countries.". A bright blue #3B82F6 rounded call-to-action button with white text: "Try For Free". Deep blue-black #05060F void, completely empty except for one object. The exact string "300ms", with a lowercase m and a lowercase s, is built as thick extruded three-dimensional slabs in near-black #0B0F1E rising out of the floor like a monolith. The complete string sits entirely inside the frame with clear margin on both sides: no character is cropped, clipped or bled off any edge, and all five characters read unambiguously as three, zero, zero, m, s. The "ms" is about one third the height of the "300" and sits on the same baseline. A single hard raking key light enters from the far right at a very low angle: it rims every right-facing edge in hot cyan #22D3EE, leaves the front faces in deep shadow, and throws long hard-edged shadows from each character far across the floor to the left. The headline words "VALIDATION ANSWERS IN UNDER" are set small, white, uppercase and widely tracked in geometric technical sans-serif on one line directly above the monolith, so the eye reads the small line straight into the enormous number and the two together form the single headline. Below the monolith sits exactly one line of light gray subheadline text, then a bright blue #3B82F6 rounded pill button centred at the bottom; the 1lookup wordmark, blue "1" and white "lookup", sits top left. No gradient mesh, no particles, no glow anywhere beyond that single cyan rim light, and no caption, label or extra line of any kind at the base of the monolith. Wide landscape composition: the text block sits on the left half and the visual element fills the right half, with the call-to-action button under the text. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c10-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "34 Products. One API Key.". Smaller subheadline text: "One shared credit balance. Live in 5 minutes.". A bright blue #3B82F6 rounded call-to-action button with white text: "Read the API docs". A cropped, slightly off-centre screenshot of a dark code editor filling the whole frame: background #05060F, editor surface #0B0F1E, gutter #111629 carrying pale gray line numbers. An open .env file in JetBrains Mono shows five dimmed gray commented lines reading exactly "# PHONE_VALIDATION_KEY=", "# EMAIL_VERIFY_KEY=", "# ENRICHMENT_KEY=", "# SEO_DATA_KEY=", "# TRANSCRIBE_KEY=", then one live bright-white line reading exactly "ONELOOKUP_API_KEY=" followed by six bullet dots, with a cyan #22D3EE text caret at the end and a thin #3B82F6 active-line highlight band behind it. Those six strings are spelled exactly as given, and no other code line, comment, string or key appears anywhere in the file; there is no "sk_live_" or any other vendor-style key prefix. Framing is deliberately imperfect: the editor's left sidebar is sliced off by the frame edge, the top window chrome is cropped mid-tab, and a faint vertical scrollbar sits flush against the right edge. Lighting is flat LCD emission only, no vignette, no drop shadows, no gradient background, with a soft cyan bloom around the caret. Headline in white geometric technical sans-serif sits low-left over a clear zone in the code, subheadline in light gray beneath, and a bright blue #3B82F6 rounded button sits bottom-left sized like a real UI button rather than a hero button. The 1lookup wordmark, blue "1" and white "lookup", sits small in the top-right corner. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline, the button label and those six exact monospace env-var strings. No feature chips, no badges with captions, no other words anywhere. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c11-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Stop Paying for Bad Data". Smaller subheadline text: "Validate any phone, email, or domain.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". Photoreal cinematic still life on a deep blue-black #05060F background: a wall of eight vintage stainless-steel payphones mounted in two rows down a dark, empty corridor, every handset hanging off its hook on a stretched armoured steel cord. Shot on a 50mm lens at f/1.8 from slightly low and angled, so the nearest payphone is razor sharp and the receding row falls into soft bokeh. Lighting is single-source and hard: one cold cyan #22D3EE strip light rakes from the left, rimming the chrome edges, the coiled cords and the dead grey handset speakers, with a faint blue #3B82F6 bounce on the back wall and deep unlit shadow swallowing the rest of the frame. Physical texture is the point: dust floating in the light beam, scratched brushed metal, a hairline crack in one chrome faceplate, one cord caught mid-sway. Every payphone is completely blank and unbranded: no keypad at all, no keypad digits, no numerals, no dial labels, no coin-slot instruction plates, no signage, no telecom or carrier branding, no stickers and no lettering anywhere on any surface in the frame. The upper third of the frame is clean shadow, holding the bold white geometric technical sans-serif headline with the smaller light-grey subheadline directly under it and fully legible, and a bright blue #3B82F6 rounded call-to-action button below that; the 1lookup wordmark, blue "1" and white "lookup", sits small in a corner. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c12-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "200+ Countries. One API Key.". Smaller subheadline text: "Validate any phone, email, or domain.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". Full-bleed deep blue-black #05060F background with a barely-there radial vignette, no gradient mesh, no grid. Centred, a perfect circle occupying about 78 percent of the frame: a chord diagram whose rim is a dense bezel of several hundred hair-thin white tick marks at varying lengths and 60 percent opacity. Those tick marks are plain unlabelled strokes only: no numerals, no letters, no degree markings, no compass points and no index characters of any kind anywhere on the rim. From that rim, several thousand hairline bezier arcs sweep across the interior in a gradient running #3B82F6 to #22D3EE to #818CF8, additively blended so every crossing blooms into a brighter cyan node; blue and cyan dominate and the #818CF8 lavender appears only as a faint fringe accent, never as the leading hue. The arcs are densest near the rim, are rendered at strong contrast against the black so they stay legible at small size rather than muddying into gray, and deliberately thin out toward the middle, opening a clean dark elliptical void at the centre. A few dozen arcs are thicker and brighter and terminate in a small verification-green #10B981 point of light on the rim. The whole ring throws a soft cool outer glow onto the black, like a lit object photographed in a dark room. The headline sits inside the central void in white geometric technical sans-serif, the subheadline in light gray directly beneath it, a bright blue #3B82F6 rounded call-to-action button at the bottom of the frame, and the 1lookup wordmark, blue "1" and white "lookup", small in the top-left. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c13-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "1,000 Requests Per Minute. Included.". Smaller subheadline text: "Upload a CSV. Higher limits available.". A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". A photograph of a real monitor shot slightly off-axis, rotated exactly 4 degrees and no more, filling the entire frame edge to edge with no banner border and no margin. The screen shows a full-bleed dark terminal on #05060F with faint moire banding across the mid-tones and a soft off-white reflection streak crossing the upper-left glass. In JetBrains Mono the top line is a single command reading exactly "$ curl -X POST https://api.1lookup.io/v1/validate/email/bulk", spelled exactly as given. Below it an ASCII progress bar drawn roughly two-thirds full as solid blocks in verification green #10B981 against a dim gray remainder: the bar is blocks only, with no percentage figure, no row count, no elapsed time, no records-per-second figure and no numeric label of any kind beside it or inside it. Under that sits a cyan #22D3EE block cursor and nothing else; no other terminal line, log line or output appears anywhere on the screen. The room is dim and cool and the monitor is the only light source, spilling a faint blue-cyan wash into the darkness at the frame corners. The headline in white geometric technical sans-serif is overlaid perfectly level across the lower third with no panel or box behind it, the subheadline in light gray directly under it, and a bright blue #3B82F6 rounded call-to-action button sits bottom-left. The 1lookup wordmark, blue "1" and white "lookup", sits small in the bottom-right; there is no other design chrome anywhere in the image. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline, the button label and that one exact curl command line. No feature chips, no badges with captions, no other words anywhere. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

### `1lookup-c14-square.png`

```text
Professional square display ad banner for 1Lookup, a phone, email, domain and IP validation and contact enrichment API. Bold geometric technical sans-serif headline text: "Validate Any Phone, Email, Or Domain.". Smaller subheadline text: "Then enrich any contact. Same API key.". A bright blue #3B82F6 rounded call-to-action button with white text: "Validate Anything". The frame is a solid wall of type on deep blue-black #05060F, edge to edge with zero margin. Exactly six words, "VALIDATE", "ANY", "PHONE,", "EMAIL,", "OR", "DOMAIN.", spelled exactly as given and with no other word anywhere in the image, are set in heavy geometric technical sans-serif and stacked on four lines in white #F8FAFC. Each line is individually tracked so it spans the full width of the frame using letter-spacing and stretching alone, never by adding, repeating or inventing any additional word or character; leading is so tight the lines almost touch, Swiss poster discipline. The words "OR DOMAIN." sit inside a solid primary blue #3B82F6 rectangle that reads as a developer's text-selection highlight, with those letters knocked out to the blue-black ground and completely, crisply legible inside the blue, so the block reads as a selection and never as a redaction bar. A small solid cyan #22D3EE terminal cursor block sits immediately after the final word: it is a plain filled rectangle containing no glyph, letter, digit or punctuation mark. Lighting is a single soft elliptical pool from directly overhead: the top lines are bright and the bottom lines fall off into near-black so the wall recedes into the dark. Over the darkest part of the wall at the bottom sit one small line of light gray subheadline text on a subtle dark scrim so it stays cleanly separated and fully legible against the type behind it, and a bright blue #3B82F6 rounded pill button, its glow spilling faintly onto the type behind it; the 1lookup wordmark, blue "1" and white "lookup", sits in the top left corner over the type. Crisp legible typography, exact spelling, generous margins, high detail. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere.
```

## Deployment status

**Nothing is live.** These are upload-ready files only. 1Lookup's Meta ad account (`2333276243857483`) is still Ads-MCP-gated ("gradually being rolled out"), same as the 2026-07-12 and 2026-07-16 checks, so ads cannot be created there programmatically; the account is ACTIVE with a payment method, so a human can upload in Ads Manager. Google Ads account 8715389296 is live at $329/day and can take the landscape and square cuts as additional responsive display assets.

