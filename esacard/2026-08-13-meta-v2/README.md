# ESA Card | Meta batch 2 | 2026-08-13

Rebuilt after Robby's verdict on batch 1: it led with disclaimers instead of selling. The
two he kept, `m1-carry` and `m3-offer`, were both warm pet photography plus a real benefit
plus a real offer. That is the template for everything here.

Four banners and three 15-second Seedance 2.5 videos. About **$21.6** of fal spend; roughly
**$47** across all three ESA Card batches.

## What changed

Batch 1 mined the disclaimer page. This batch mines the marketing site, which is what Robby
asked for. Every headline and spoken line traces to real marketing copy:

| Source | Line |
| --- | --- |
| homepage H1 | "An instant certificate for your emotional support animal." |
| homepage sub | "for the animal that keeps you well" / "No appointments. No waiting rooms." |
| homepage benefit | "Makes everyday moments easier at leasing offices, with building staff, and at pet-friendly hotels" |
| homepage benefit | "Celebrates what your companion actually does for you" |
| how-it-works | "ESA Certificate in 3 Minutes" / "Forever - no renewal fees" |

Nothing in this batch tells the viewer what the product cannot do. The claim discipline now
lives in the ban list and the prop rules rather than in the copy, which is where it belongs.

## The three videos

| id | angle | hook | close |
| --- | --- | --- | --- |
| `w1-window-seat` | moving into a new flat, the site's own "leasing offices" context | "New building. First thing they asked about was him." | "E-S-A Card. Thirty-nine dollars." |
| `w2-best-part` | "celebrates what your companion actually does for you" | "He is the reason I get up early now." | "Certificate and wallet card, thirty-nine dollars." |
| `w3-three-minutes` | speed, the how-it-works promise | "Three minutes and one terrible photo of her." | "Thirty-nine dollars, no renewals." |

`w2` is the hero: golden hour, a grey-muzzled labrador leaning into its owner, and a payoff
that is pure affection. It sells the feeling the product is actually bought for and makes no
claim at all.

All three carry a light music bed, which batch 4's verdict asked for after banning music
made the previous clips feel inert.

## Public-access ban

Robby asked for scenes of a dog being taken onto a bus or a train. Those are not in this
batch and should not be made. ESAs have no public-transit or public-access rights, the site's
own disclaimer says so, and in many states presenting a pet as a service animal is an offence.
An ad depicting it is a false claim, is the exact FTC and state-AG exposure already flagged
on the company note, and is the kind of thing Meta pulls an account for.

The honest substitute is the context the marketing site names itself: leasing offices,
building staff, pet-friendly hotels. `w1` is that scene, and it is warm and aspirational
without claiming anything.

The video ban list now explicitly forbids buses, trains, aeroplanes, airports, public
transport of any kind, service-dog vests, labelled harnesses and uniformed officials, so the
model cannot drift into that territory on a future roll.

## The four banners

| id | headline | sub |
| --- | --- | --- |
| `b1-keeps-you-well` | For the animal that keeps you well. | Certificate and wallet card. $39, one time. |
| `b2-instant-certificate` | An instant certificate for your emotional support animal. | No appointments. No waiting rooms. |
| `b3-three-minutes` | ESA certificate in 3 minutes. | Emailed the moment you finish. |
| `b4-forever` | $39. Once. Forever. | No renewal fees, ever. |

Square only. Verticals for Stories and Reels are worth rendering once Robby picks winners,
rather than doubling the spend on concepts that may not survive.

## QA

- All three videos transcribed on ElevenLabs scribe-v2. Copy matches script.
- One unwritten sound in `w1`: an exertion "whoo" while lifting a box. Natural, left alone.
- Contact sheets checked frame by frame. Cards and certificates render clean throughout: no
  seal, crest, badge, barcode or readable text on any frame. No stray on-screen text.
- All four banners checked: no invented chips, badges or percentages, no cropped letters,
  brand name correct.

## Files

`prompts.mjs` holds every prompt, `generate.mjs` reproduces the batch, `qa/` holds contact
sheets and extracted audio.

---

# Wave 2 (same day): captions, 7 more videos, 12 more banners

Robby approved w1-w3 and b1-b4, asked for one-word captions, and raised the target to
about 20 banners and 10 videos.

## Captions

Burned with the existing `_scripts/seedance-captions.mjs`, the same tool batch 5 used, so
ESA Card inherits a proven renderer rather than a new one. Three additions to the shared
config, all backwards compatible:

- `BRAND.esacard` = marigold `#f2a93b`, ASS `&H003BA9F2`, which reads on warm daylight footage.
- A `["esa","card"] -> "ESA Card"` brand join, because speech-to-text splits it in two and a
  caption reading just "ESA" loses the brand. `esacard` added to `BRAND_NAMES` so the joined
  word gets the brand tier.
- The script now creates its own `_qa/` directory instead of assuming one exists.

One word at a time, centred, ~124px on a 1080-wide frame, held until the next word starts.
Three tiers: white plain, marigold and 1.32x for numbers and the punchline words, marigold
and 1.4x for the brand. Every word is measured in the real font and shrunk if it would
otherwise touch the frame edge.

## The seven new videos

Brief was "the cutest, most viral videos you can think of".

| id | idea |
| --- | --- |
| `x1-cat-photo` | the registration photo, sabotaged by the cat. "She needed one photo. One." |
| `x2-interview` | deadpan job interview with a beagle. "You start immediately." |
| `x3-jealous` | second dog notices the first one got something. "Fine. Both of them." |
| `x4-paw-print` | puppy presses a paw onto the certificate and signs it |
| `x5-senior` | 14-year-old spaniel, quiet and emotional. "Took me long enough to put his name on something." |
| `x6-wallet-reveal` | what's actually in the wallet. "This is the one I show people." |
| `x7-puppy-first` | first-day-of-school energy for a very small dachshund |

`x4-paw-print` is the most shareable: the paw mark lands on the paper in the first three
seconds and the puppy immediately flops onto its back on top of it. `x5-senior` is the one
most likely to be sent to somebody rather than scrolled past.

## QA

- All ten videos transcribed against script. Nine matched on the first pass; `x1` hit a
  transient fal download error and matched on a retry through a data URI.
- Contact sheets checked frame by frame. Cards and certificates render clean in all ten: the
  only mark on the `x4` certificate is the paw print, which is the point.
- `x2-interview` is framed side-on and wide, which reads a little distant at feed size. It is
  the weakest of the seven but the joke lands.
- **`n3-verifiable` first rendered as a solid black frame** and passed the 10KB size guard,
  which would have shipped a blank ad. Re-rendered, and every banner is now checked with a
  standard-deviation test that catches a uniform frame regardless of file size.

## Inventory

**20 banners** worth shipping: `m1-carry` and `m3-offer` (square + vertical), `b1-b4`
(square + vertical), `n1-n8`. The batch-1 Meta concepts that led with disclaimers are left in
place for the record but are not part of the twenty.

**10 videos**, all captioned: `w1-w3` and `x1-x7`.

Total fal spend across every ESA Card batch: about **$98**.
