# ESA Card · weird animals round 2 · 2026-08-20

Sixteen more animals on the two banners that are selling. Robby, after round 1 returned three
sales at $5.44 each against a $37.57 break-even:

> Also looks like the banner ads are working amazing - can you add more weird animals?
> Should be the EXACT same banners, just more weird animals.

**Nothing here defines a layout.** `prompts.mjs` imports `offer` and `forever` from
`../2026-08-19-weird-animals/prompts.mjs`, so the cream `#faf7f1`, the indigo `#2b2a5c`, the
marigold `#f2a93b`, the type hierarchy, the button label, the corner wordmark, the RULES block
and every word of copy are byte-identical to the batch that sold. They cannot drift, because
they are not copied. **The animal is the only variable.**

## What is here

| # | File | Layout | Animal | Why it is on the list |
| --- | --- | --- | --- | --- |
| 1 | `x1-bearded-dragon-square.png` | A · "$39. One time." | bearded dragon | most-kept pet lizard in the US, sits still like it is posing |
| 2 | `x2-ferret-square.png` | A | ferret | absurdly long body, large owner community |
| 3 | `x3-leopard-gecko-square.png` | A | leopard gecko | permanent smile, fits in a palm |
| 4 | `x4-rat-square.png` | A | fancy rat | holds food in both hands, and r/RATS is already in the Reddit targeting |
| 5 | `x5-tortoise-square.png` | A | sulcata tortoise | the turtle's family at absurd scale |
| 6 | `x6-pygmy-goat-square.png` | A | pygmy goat | farm animal indoors, the lane the pig won |
| 7 | `x7-donkey-square.png` | A | miniature donkey | the pig's joke, bigger |
| 8 | `x8-runner-duck-square.png` | A | Indian runner duck | stands bolt upright like a skittle |
| 9 | `x9-capybara-square.png` | A | capybara | the internet's calmest animal |
| 10 | `x10-opossum-square.png` | A | opossum | beloved online, looks nothing like a pet |
| 11 | `x11-corn-snake-square.png` | B · "$39. Once. Forever." | corn snake | closest thing to the ball python that sold |
| 12 | `x12-sphynx-cat-square.png` | B | sphynx cat | unarguably a pet, visually alien |
| 13 | `x13-sugar-glider-square.png` | B | sugar glider | enormous eyes |
| 14 | `x14-highland-cow-square.png` | B | Highland cow calf | shaggy fringe, huge internet affection |
| 15 | `x15-alpaca-square.png` | B | alpaca | very expressive face |
| 16 | `x16-tarantula-square.png` | B | tarantula | strongest scroll-stop, and the biggest risk in the batch |

Square only, same as round 1: Facebook Feed serves square, and the vertical cuts of these two
designs sold nothing.

## The hypothesis this batch tests

Round 1's three sales were the ball python, the baby alligator and the pot-bellied pig. Its
highest-spend banner was the raven ($7.63, 455 impressions, 15 clicks) and it sold nothing. The
raven is the one animal in round 1 that reads **wild** rather than **owned**.

So: *the animals that sell may be the ones a real person plausibly keeps.* That is a hypothesis
with one negative data point behind it, not a finding. This batch is weighted to genuinely-kept
exotic pets (1-5, 11-13) so the hypothesis gets a real test, with four deliberate counterexamples
(capybara, opossum, Highland cow, tarantula) that would falsify it if they win.

## Layout split, and why it is not all Layout A

All three of round 1's sales are Layout A. Layout B is **not** a proven loser: its five banners
took $1.71 and 81 impressions between them, which is a delivery difference and not a test.

This batch runs **10 A and 6 B**, and the six B animals are drawn from across the strength
ranking rather than being the leftovers. Putting the two riskiest animals in B would have
confounded the layout read a second time, which is the specific mistake this split exists to
avoid.

## QA

- **All 16 verified non-blank**, 1024x1024, luminance spread 67.8 to 82.4 (a blank render is
  near zero).
- **Copy correct on all 16** and no invented text: no feature chips, no badges, no seals, no
  percentages. Ten read "$39. One time." / "Emotional support animal certificate and ID card." /
  "No renewal fees, ever."; six read "$39. Once. Forever." / "Emotional support animal
  registration. No renewal fees." All carry the `esacard.com` wordmark and the
  "Register My Emotional Support Animal" button.
- **No cropped letter.** An automated edge scan flags ink inside the outer 8px on `x1`, `x13`
  and `x15`; all three were cropped and inspected, and all three are the animal bleeding off the
  frame, not type. Round 1 has the same property on 3 of its 10 (`w1-turtle`, `w9-axolotl`,
  `w10-cockatoo`), so it is the design, not a defect.
- **Claim safety inherited with the copy.** Every rendered line is on the green list in
  `esacard.com/docs/ads/policy.md` §7. No line says what the product is not (§0). Nothing about
  housing, landlords, access, travel, therapists, evaluations or legal standing, in either
  direction.
- `banner-prompt-lint.mjs`: **0 errors.** The 16 warnings are the per-product `product` field,
  which applies to multi-product batches; ESA Card sells one thing, and round 1 has the same
  shape.

## The bug this batch found, and the fix

The blank-frame check shells out to Pillow, and Pillow was not installed in this environment. The
check sat **inside the paid retry loop**, so `ModuleNotFoundError` was caught by the same handler
that catches a bad render, and all 16 banners were re-submitted. The run was killed during the
second pass; **roughly 16 to 32 renders were paid for instead of 16**, about $3 to $6 rather than
$3.20. Exact count is not recoverable from the log.

`spread()` now returns `null` when the checker itself cannot run, prints a WARN, and only fails a
render on a real low-spread result. **A broken verifier must never be indistinguishable from a
broken image**, especially when the retry costs money. The same shape exists in
`../2026-08-19-weird-animals/gen-banners.mjs` and in any future copy of it.

## Cost

About $3 to $6 of fal spend at roughly $0.20 per banner, inflated by the retry bug above.

## Status

**Rendered and QA'd. Not live anywhere.** Robby asked to see them before they ship.
