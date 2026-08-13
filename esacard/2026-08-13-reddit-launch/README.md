# ESA Card | Reddit launch creative | 2026-08-13

Eight banners, four concepts x two shapes, for the ESA Card Reddit ad account
`a2_ji9rrnreyf0d`. Generated with `openai/gpt-image-2` (quality `high`) for about
$1.60 of fal spend.

## Claim safety

Every line of copy in these images appears on esacard.com verbatim or near-verbatim.
Nothing here implies legal force, housing rights, travel access, or government
recognition, because the product has none of those and the site says so plainly.

- "The letter is the law. The card is for your wallet." is `SITE.mantra` in `lib/site.ts`.
- "We do not sell ESA letters." restates the disclaimer heading "The letter is the legal
  document. We do not sell it."
- "$39, one time" and "No renewal fees, ever" are the Digital Kit's own product features.
- "Instant certificate and ID card" is the trust-bar line "Instant ESA certificate & ID card".

The card and certificate in `c4-product` are deliberately blank of body text so the render
could not invent a registration number, a seal, or an official-looking authority line.

## Concepts

| id | family | headline | sub |
| --- | --- | --- | --- |
| `c1-legalpad` | native / organic | The letter is the law. | The card is for your wallet. |
| `c2-offer-poster` | loud direct response | $39. One time. | No renewal fees, ever. |
| `c3-honest` | loud direct response | We do not sell ESA letters. | The card is for your wallet. |
| `c4-product` | product shot | Instant certificate and ID card. | $39, one time. |

`c1-legalpad` is the native/organic family that Robby picked as "best by far" in the
VoiceDrop banner batch, and it is the one most likely to survive a Reddit feed, where an ad
that looks like an ad gets downvoted. `c3-honest` is the Reddit-specific bet: the audience
is cynical about ESA registration sites, and leading with what we do not sell is disarming
and true.

## Review notes

All eight rendered on the first wave, no re-rolls. Checked every image: no invented feature
chips, no fake badges or percentages, no government crests, no cropped letters, brand name
spelled correctly on all eight.

## Brand kit (from esacard.com `globals.css`)

midnight `#2b2a5c` · ink `#1c1b3a` · marigold `#f2a93b` · cream `#faf7f1` · lavender `#eceaf8`

## Files

`prompts.mjs` holds the exact prompts. `generate.mjs` reproduces the batch. `run-log.json`
records what rendered.
