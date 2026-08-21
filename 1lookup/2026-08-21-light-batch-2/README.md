# 1Lookup light batch 2, 2026-08-21

Robby on batch 1: *"New ones are significantly better. Make more of these please (unique,
disruptive)."*

**10 concepts, 20 delivery files, ~$4.40 of fal spend** (20 first renders plus 2 re-rolls).
Square 1024x1024 and landscape 1200x628.

Weighted to **Printed Matter**, the borrowed-grammar system that produced `fight-card` and
`public-notice` in batch 1, because that is the system the "unique, disruptive" half of the brief
actually lives in. Six of ten are Printed Matter, three are Flat Field (cheapest to render, best
proven display economics), one is a third face.

Built against the rulebook in `../2026-08-21-light-batch/_work/RULEBOOK.json` rather than
re-derived. Batch 1 settled the direction; the remaining risk is per-concept craft.

## The batch

| # | id | system | lum | headline | claim |
|---|---|---|---|---|---|
| 1 | `phonebook-daily` | Printed Matter | 185 | UPDATED DAILY. (green rubber stamp on a phone book) | Daily FCC & Carrier Data Updates |
| 2 | `splitflap-board` | Printed Matter | 112 | PHONE / EMAIL / DOMAIN / IP, all VALID | Validate Any Phone, Email, or Domain. |
| 3 | `diner-menu` | Printed Matter | 165 | TODAY'S SPECIAL: 41 DATA PRODUCTS. ONE API KEY. | 41 data products on one API key |
| 4 | `ransom-note` | Printed Matter | 192 | VALIDATE ANYTHING (cut magazine letters) | approved CTA label, no factual claim |
| 5 | `paint-chips` | Printed Matter | 173 | VALID / RISKY / INVALID (paint fan deck) | 0-100 risk score |
| 6 | `punch-card` | Printed Matter | 120 | LIVE IN 5 MINUTES OR LESS. (five punched holes) | Live in 5 minutes or less; Start For Free |
| 7 | `flat-200-countries` | Flat Field | 110 | 200+ COUNTRIES. ONE API KEY. | 200+ Countries Covered |
| 8 | `flat-7-days` | Flat Field | 108 | 7 DAYS FREE. NO CONTRACTS. | 7-day free trial; No contracts |
| 9 | `flat-1000-rpm` | Flat Field | 107 | 1,000 REQUESTS A MINUTE. INCLUDED. | 1,000 Requests/min Included |
| 10 | `desk-lifecycle-send` | Desk Light | 156 | SEND TO THE LIVE ONES. | Validate Any Phone, Email, or Domain. |

Mean luminance **143/255**, minimum 107, against the rejected 2026-08-20 batch's median of 57.

Four files measure under 120. None is a violation: three are the Flat Field posters, whose
grounds are fully saturated cobalt, vermilion and green rather than dark (a saturated hue reads
as colour, not as darkness, and the rulebook's cap is on near-black), and `splitflap-board` is
the deep navy `#1E3A5F` the rulebook explicitly permits as the dark register, inside its cap of
two per batch. Zero files use `#05060F`.

## Why these ideas

Every concept borrows the grammar of a real printed or mechanical object, which is the mechanism
behind Liquid Death and KFC's "FCK": the frame reads as a thing before it reads as an ad.

- **`phonebook-daily`** is the strongest idea in the batch. A printed telephone directory is the
  most obsolete object in this category, and stamping UPDATED DAILY across it makes the argument
  with no copy at all.
- **`splitflap-board`** and **`paint-chips`** both carry the product's real three-state colour
  system (valid green, risky amber, invalid red) as their entire structure. That is the direct
  answer to there being no colour in the old frames beyond one blue button.
- **`ransom-note`** is the least corporate object available and the top-of-funnel attention slot.
  Two words, seventeen letters, no punctuation.
- **`punch-card`** answers the objection that actually blocks a self-serve API trial (setup time)
  with an object whose own shape is the payoff: five holes, five minutes.

## Claim safety

`DATA_PRODUCT_COUNT` re-read from `1Lookup-Marketing/src/lib/products.ts:138` and is **41**.

- Every factual line traces to the approved bank verbatim or by trivial rearrangement.
- No accuracy percentage, no percent sign, no currency symbol anywhere. The 41 never sits near a
  currency mark, because at thumbnail size that reads as a price against a $99 plan.
- No third-party brand or logo. The phone book carries no readable business names at all: the
  listings are specified as abstract grey rules with no letterforms, which also removes the
  batch's largest garble surface.
- The wordmark appears exactly once per frame, lowercase, inside the scene on all 10, so nothing
  is composited after the render.
- No blue CTA pill painted over artwork. The two in-scene CTAs are printed on the punch card and
  set in the scene's own ink.

## Defects found and fixed

1. **`splitflap-board` lost the L in EMAIL.** The square rendered "EMAIΣ" and the landscape
   rendered the letter as a blank rotating flap. Cause was my own prompt, which asked for "one
   flap caught mid-rotation" for realism and the model applied it to a letter that mattered. The
   instruction is removed and inverted: every flap is now specified as settled and at rest. Take 1
   is in `_work/take1-backup/`.

Everything else came back clean on the first roll, including the 17 individually cut ransom-note
letters and the five punched holes.

## Files

- Delivery PNGs in this folder: `1lookup-<id>-<square|landscape>.png`.
- `_work/build-concepts.py` generates `concepts.json`. The prompts are built from two shared
  templates (`photo()` for a real object in daylight, `flat()` for the colour-field posters) plus
  a per-concept subject, so the closing text-inventory constraint cannot be forgotten on one
  prompt: an unassigned layout slot always gets filled with invented copy.
- `_work/thumbtest-150px.png` is the real feed-scale legibility export.
- `_work/take1-backup/` holds the superseded split-flap renders.
