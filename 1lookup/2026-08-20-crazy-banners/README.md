# 1Lookup crazy-banner batch, 2026-08-20

Robby's brief, verbatim: *"we can come up with a lot of new ad ideas. Crazy banners, disruptive stuff."*

**14 concepts, 28 renders, ~$6 of fal spend.** Square 1024x1024 and landscape 1200x628.
Built by a six-lens creative panel (physical-object, big-numeral, negging, format-parody,
native/analog, loud-warning), then an adversarial claim-safety and duplication audit that
**cut 14 of the original 28 concepts** before a cent was spent.

## Why these, and what got cut

The account's own evidence says two families win and one always loses: **loud direct-response**
and **native/organic** (the whiteboard photo Robby called "best by far"), while
polished-corporate has never once been picked. The surviving 14 split **7 loud / 7 native**
with zero polished-corporate.

Cut for duplication or render risk: pole-poster, missing-poster, caution-tape, wet-floor-sign,
evidence-bag, boarding-pass-denied, text-that-landline, shredder, xray, splitflap,
taleofthetape, broadcast-test, fortune-cookie, lead-list-obituary.

## The batch

| id | family | lens | headline | claims used |
|---|---|---|---|---|
| `imessage-clean-list` | native | parody | how is your lead list suddenly this clean? | 41 data products on one API key, 5-minute setup, Start For Free |
| `courtesy-notice` | loud | negging | Please keep calling disconnected numbers. | Validate Any Phone, Email, or Domain., Start For Free |
| `shotclock` | loud | bignum | Blink And You Missed It. | Validation answers in under 0.3 seconds. (approved verbatim as the subheadline; the LED 0.3 is the same approved number), CTA label Try For Free (approved verbatim), Headline makes no factual claim, it is an idiom |
| `missing-flyer` | native | negging | MISSING | 7-day free trial |
| `gumball` | loud | object | Stop Paying for Bad Data | Stop Paying for Bad Data, Validate Any Phone, Email, or Domain., Start For Free |
| `windshield-flyer` | native | analog2 | THROW THIS FLYER AWAY. KEEP PAYING FOR BAD DATA. | 7-day free trial, Cancel anytime, Start For Free |
| `expired-stamp` | loud | object | Leads have a shelf life. | Daily FCC & Carrier Data Updates, Start Free Trial |
| `sidewalk-chalkboard` | native | negging | IGNORE THIS IF YOUR CRM IS SPOTLESS. | 7-day free trial |
| `detour-ahead` | loud | loudwarn | BAD DATA AHEAD | 41 data products on one API key |
| `receipt` | native | analog2 | TOTAL: 41 data products on one API key | 41 data products on one API key, phone validation, email validation |
| `error-dialog` | loud | parody | This number does not exist. | Daily FCC & Carrier Data Updates, Start For Free |
| `eyechart` | native | bignum | STOP PAYING FOR BAD DATA (as descending eye-chart lines) | Stop paying for bad data (approved verbatim, split across chart lines 1-3), Validate Any Phone, Email, or Domain. (approved verbatim, split across chart lines 4-5), 41 data products on one API key (src/lib/products.ts, verified live 2026-08-20, rendered as 41 PRODUCTS. ONE API KEY.) |
| `velvet-rope` | loud | negging | Not for people who like bounced emails. | 7-day free trial, Cancel anytime, Try For Free |
| `notebook-todo` | native | analog2 | MONDAY: find out which numbers are dead / check every doma | Start free in 5 minutes., DNC scrub (product territory, named as the DNC list), Start For Free |

## Claim safety

Every number and phrase traces to the live site. **`DATA_PRODUCT_COUNT` was re-read from
`src/lib/products.ts` this batch and is 41**, not the 34 still carried by five live Google
video ads. No accuracy percentage appears anywhere, per the standing 1Lookup rule. No
third-party logos or brand names. No disclaimers: every line sells something the buyer gets.

The negging concepts (`courtesy-notice`, `windshield-flyer`, `sidewalk-chalkboard`,
`velvet-rope`, `missing-flyer`) were each read with the wordmark attached, per the rule that
killed "Sleep well. Your numbers are probably fine." in the 2026-08-03 batch. None turns into
self-criticism of our own data.

## Defects found and fixed

1. **`error-dialog` rendered two identical "Start For Free" buttons.** The secondary button was
   a designed slot with nothing assigned to it, so the model filled it by duplicating the CTA:
   the same instinct as the invented feature chips, in a new place. Re-rolled with the slot
   named and a second button explicitly forbidden. Take 1 is kept in `_work/take1-backup/`.
2. **The first compositor pasted the wordmark bottom-left on everything**, which collided with
   the CTA on half the loud concepts and would have put a *second* brand mark on the five
   analog frames that already spell "1lookup" on the surface. `composite.py` now skips those
   five and picks the flattest of the four corners per image, measured by pixel deviation.

Everything else came back clean on the first roll: no garbled type (including the handwritten
`notebook-todo` and the six-line `receipt`), no invented badges, no third-party marks, no
model-drawn logos, and every US-market scene rendered American.

## Files

- Delivery PNGs in this folder: `1lookup-<id>-<square|landscape>.png`.
- Native-family concepts also ship `-clean.png` with **no** pasted wordmark: on Reddit the post
  already carries the author handle and a pasted mark undoes the illusion (batch-6 lesson).
- `_work/` holds the prompts (`concepts.json`), the generator, the compositor, the real
  wordmark shot from the site SVG, the raw renders, and the contact sheets.

## Watch-outs when trafficking

- `imessage-clean-list` and `eyechart` carry no CTA button in the artwork; the platform button
  carries "Start For Free".
- Meta's placement lesson from the ESA Card batch applies: pull a `platform_position`
  breakdown before concluding anything about square versus landscape, because vertical and
  square creative get pushed to different surfaces.
- These are untested. Nothing here has delivery data, so treat the ranking as a starting
  order, not a prediction.
