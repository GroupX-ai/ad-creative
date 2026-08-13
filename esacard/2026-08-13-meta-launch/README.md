# ESA Card | Meta launch | 2026-08-13

Eight banners (four concepts, feed square + vertical) and three 15-second Seedance 2.5
UGC video ads, for Meta ad account `3530109303824417` ("ESA Card", Prymatica business).

Spend: about **$23.4** of fal (13 billed banner renders at ~$0.20, three 15s 720p Seedance
clips at ~$6.94). Running total across the Reddit and Meta batches is about **$25**.

## What drove the scripts

Built from `_scripts/RESEARCH-2026-08-12-b2b-scripts-synthesis.md` and the batch-4 verdict,
adapted from B2B to B2C:

- **UGC talking-head is the workhorse** and batch 4 had zero of them. All three videos are
  phone-shot selfie or handheld, no studio.
- **Hook lands in frame one**, never an establishing shot. Batch 4's fault was opening all
  17 clips on scene-setting.
- **Performances are allowed energy.** The batch-4 "nobody is enjoying themselves" block is
  deliberately absent; it guaranteed a flat register across a whole batch.
- **15s, not 30s.** Batch 4's payoff at second 25 was a bad bet on cold traffic, and 15s at
  720p costs less than 30s at 480p while looking better.
- **Brand name never before the final third.** Word budgets 34-39.
- **Phonetic rule with a rhyme anchor**, because the plain rule still produced "Email Chaper"
  in batch 5. "E-S-A" is an initialism and the likely failure is "eesa", so the prompt spells
  the letters and rhymes A with day.
- **Exhaustive CARD RULE.** Batch 5 learned that stating only what is *banned* on a prop
  inverts the mechanic (c49 rendered a caller label reading "Voicedrop"). The card here is
  described positively and completely: white rectangle, one small dog photo, three grey lines,
  nothing else.

## Meta-specific claim constraint

On top of the usual rules, Meta's personal-attributes policy forbids implying knowledge of a
viewer's health, disability or mental state. **No second-person health language appears
anywhere.** Health is kept out of the scripts entirely; the subject is the paperwork, not the
person. Speakers describe only their own situation.

## The three videos

| id | format | hook | close |
| --- | --- | --- | --- |
| `v1-front-desk` | UGC selfie, car | "My leasing office wanted paperwork for my dog." | Three minutes. Thirty-nine dollars. |
| `v2-talk-you-out` | founder to camera | "I sell E-S-A cards. Here's what mine can't do." | We make the card. Thirty-nine dollars, once. |
| `v3-wallet` | handheld, doorstep | "Front desk asked what he is." | Took three minutes. |

`v2` is the strongest angle and the riskiest-sounding one: a founder opening by naming what
the product cannot do. It is exactly the site's own positioning, and in a category full of
sites implying legal force, it is the only available differentiator.

## QA

- All three transcribed against script on **two independent engines** (ElevenLabs scribe-v2
  and Whisper). Copy matches. Both render the brand as the letter form "ESA card", never
  "Esa" or "eesa". Transcription is phonetic, so this is strong evidence rather than proof of
  syllable count.
- Two harmless drifts, both left alone: v1 says "a therapist letter" for "a therapist's
  letter", v3 says "show him this" for "show them this".
- Contact sheets checked frame by frame (`qa/*-sheet.png`). The card renders clean in all
  three: no seal, crest, badge, barcode or readable text on any frame. No stray on-screen
  text anywhere.
- **`v3` is the weakest of the three:** the handheld framing crops the top of the speaker's
  head in several frames. It reads as authentic phone footage rather than an error, but if
  only two ship, drop this one.

## The four banners

| id | headline | sub |
| --- | --- | --- |
| `m1-carry` | Legitimacy you can carry. | $39, one time. |
| `m2-three-minutes` | About three minutes. | Certificate and card, sent instantly. |
| `m3-offer` | $39. One time. | No renewal fees, ever. |
| `m4-honest` | We do not sell ESA letters. | We make the card that goes in your wallet. |

Every line is site copy: `SITE.tagline`, `CTA.microcopy`, the Digital Kit's listed features,
and the disclaimer's own heading. Checked all eight: no invented feature chips, badges,
percentages, seals or crests, no cropped letters, brand name correct on every one.

Five of the first eight banner renders returned a 22-byte body rather than an image and were
re-rendered; the retry succeeded on the first attempt for all five.

## Files

`prompts.mjs` holds every prompt. `generate.mjs` reproduces the batch, `regen.mjs` re-renders
any asset that came back short. `run-log.json` records the run. `qa/` holds the contact sheets
and extracted audio.
