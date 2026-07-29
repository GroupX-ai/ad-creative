# Emailchaser disruptive creative batch (2026-07-29)

Six new concepts built for the live $10K/month Google + Meta launch, after Robby asked for "more ads, really creative, disruptive." Generated with fal `openai/gpt-image-2` (quality high, ~$0.20/image) per the recipe and guardrails in the www repo's `AD_CREATIVE_PLAYBOOK.md`.

Concepts came from a four-lens creative panel (pattern-interrupt, native/unpolished, bold typographic, product-truth), then a claim-check and ranking pass that killed six of twelve. Every render was reviewed at full size on 2026-07-29: exact spelling, no feature chips, no invented numbers.

## What shipped

| File | Size | Concept | On-image copy |
|---|---|---|---|
| ec-c5-primary-square/landscape/vertical | 1024², 1200x628, 1080x1920 | **PRIMARY** (typographic poster, night stage) | "PRIMARY" / "Cold email that lands here." / START FOR FREE |
| ec-c6-morgue-square/landscape/vertical | 1024², 1200x628, 1080x1920 | **Where cold email goes to die** (cinematic archive-drawer frame, one envelope rising into blue light) | "Where Cold Email Goes To Die" / "Cold email that lands in primary." / START FOR FREE |
| ec-c7-followups-square | 1024² | **Automatic follow-ups** (product truth, light) | "Send Once. Follow-Ups Are Automatic." / "Private sequencer for agencies and sales teams." / START YOUR 7-DAY FREE TRIAL |
| ec-c8-splittest-square | 1024² | **Split test** (fanned variant cards, one winner lifted) | "Split Test Your Subject Lines" / "Compare reply rates for every variant." / START FOR FREE |
| ec-c9-receipt-square | 1024² | **A receipt for being ignored** (thermal receipt of dead sends, product-photo realism) | "A Receipt For Being Ignored" / "Unlimited senders, one fixed cost." / START FOR FREE |
| ec-c10-200m-square | 1024² | **200M verified leads** (typographic, night stage) | "200M VERIFIED LEADS" / "Access verified leads on LinkedIn." / START FOR FREE |

All six squares are live as Meta ads in ad account 1431808552119912 (ad set "EC | Broad | US-CA-GB-AU | Signup" `120248475957710032`), declared to Meta as AI-generated via `self_ai_disclosure: OPT_IN`. The c5 and c6 landscapes and squares are live in Google Ads 193-108-3050 as a second responsive display ad (ad group `193984509290`).

## Claim-safety notes

- Two concepts were killed outright for false claims, including a napkin-math idea asserting "1 Sender or 100. Still $47." Worth remembering: `www/src/pages/pricing/constants.js` sets A/B testing to Starter "Up to 5" and Professional "Up to 10", so **any ad selling the $1 first month must not promise 10 subject-line variants.** The same audit found that claim live in 11 Google search ads on 2026-07-29; all were corrected the same day.
- The `ec-c8` subline was rewritten from "Up to 10 variants per campaign." to "Compare reply rates for every variant." for exactly that reason.
- `ec-c6` carries a known, accepted risk: at a half-second glance "Where Cold Email Goes To Die" can read as "cold email is dead," the opposite of what we sell, and only the subline resolves it. That ambiguity is what buys the scroll-stop. Watch comment sentiment in week one and pull it if the misread shows up in replies.

## Video (NOT launched, needs a human to watch it first)

`emailchaser-c1-vertical-video.mp4` and `emailchaser-c2-vertical-video.mp4` are 5-second 9:16 animations of the already-approved 2026-07-27 vertical banners, made with `fal-ai/kling-video/v2.5-turbo/pro/image-to-video` (~$0.35 each) per the playbook's motion recipe. The prompts instruct the model to hold all text perfectly still and add no new text.

**They are unverified.** The session that made them could not decode H.264 to inspect frames (the bundled ffmpeg is a stripped Playwright build, and headless Chromium has no proprietary codec support), so nobody has actually watched them. Image-to-video models routinely warp lettering. Please watch both at full size before uploading either to Meta; if the text holds, they are the account's first video assets and fill the Reels/Stories gap.

## Prompts

Prompts follow the playbook template and end with the standard no-extra-text constraint. Full prompt text is in the generator script preserved with this batch's session notes; each concept's background and visual description is reproduced verbatim in the vault note [[emailchaser-ads-launch]].
