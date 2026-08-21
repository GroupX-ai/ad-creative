# ESA Card | banner motion for TikTok (2026-08-21)

Robby's idea, in his words: *"In Meta Ads - most of the sales come from our banner ads. What
if we take these banner ads and animate them (very lighly, just the animal) and then post
these as TikTok ads?"*

## Why this batch exists

TikTok has spent **$134.35 on 38 video ads since 2026-08-17 and produced zero sales**, zero
checkouts, and 2 registration starts off 622 landing page views. Meta over the same week did
27 sales. So the problem is not the channel's plumbing (the tracking is verified working) and
not the price: it is that none of the creative TikTok has ever seen is creative that sells.

The banners are creative that sells. Checked at ad level on Meta over the last 14 days:
**7 of the 8 Meta ads with a recorded purchase are static banners, not videos.** The two
picked here are the two best:

| banner | Meta result |
| --- | --- |
| `p2-offer-vertical` (the $39 cat) | 5 purchases and 17 checkouts started across its ad instances, best checkout cost $3.30 |
| `p1-carry-vertical` (the wallet dog) | 1 purchase, 10 checkouts started at $5.69 |

## What was made

Three concepts, each on both banners, all 1080x1920 and 5-6 seconds, in `upload/`.

| concept | file | what it is |
| --- | --- | --- |
| A · Kling 2.5 Turbo Pro | `cat-kling`, `dog-kling` | Whole banner handed to the model with a heavy hold-still prompt. **The best of the three.** |
| B · Veo 3.1 | `cat-veo`, `dog-veo` | Same idea, slower and more cinematic, 6s. Slight push-in the prompt did not fully suppress. |
| C · locked-text composite | `cat-locked-text`, `dog-locked-text` | Kling's animal motion with the text regions painted back from the original PNG every frame. Text physically cannot warp. |

## What was learned, so nobody re-runs the failures

**Model choice is the whole game here, and two of the four models tested are unusable on a
text-heavy banner.** Measured as mean pixel drift in the headline area between the first and
last frame (under ~3 means the type effectively did not move):

| model | cat | dog | verdict |
| --- | --- | --- | --- |
| Kling 2.5 Turbo Pro | 2.67 | 5.73 | **Use this.** Text held on both, no camera drift. |
| Veo 3.1 | 1.05 | 7.10 | Usable. Sharpest type of any model, but adds a push-in on the photographic banner. |
| Seedance v1 Pro | 12.99 | 23.69 | **Reject.** Rewrote the dog subheadline into "Enemom g nve.le. t raient gcl" and the button into gibberish, and invented blue credit cards in the wallet. Has a `camera_fixed` flag; it did not save it. |
| Hailuo 02 | 55.38 | 12.17 | **Reject on the cat.** Zoomed hard enough to crop the type at the frame edge and turned the cat away from camera. |

- **Seedance 2.5 refuses these images outright** (`"may contain likenesses of real people or
  other private information"`), on the cat banner as well as the dog one. The repo's house
  text-to-video model cannot do this job at all; v1 Pro can be called but should not be.
- **The prompt is 80% a list of things that must not move.** Naming the camera lock, the
  framing, and every text element individually is what bought Kling's result. See
  `HOLD_STILL` in `generate.mjs`.
- **Veo defaults to 8s and 4s is below TikTok's 5s in-feed minimum**, so it is pinned to 6s.
- **All six clips are silent.** TikTok punishes silent ads; add a track before spending.

## Claim safety

No copy was written, changed or added. Both banners already carry approved claims, and the
models are instructed not to alter any text, so there is nothing new to claim and nothing to
sweep. Concept C guarantees it at the pixel level. `docs/ads/policy.md` §0 (ads never
disclaim) is satisfied by construction: no disclaimer can appear in a frame that is a copy of
an already-approved banner.

## Re-deriving

```
node esacard/2026-08-21-banner-motion/generate.mjs            # all 8 model renders, ~$4 on fal
node esacard/2026-08-21-banner-motion/generate.mjs --only cat-kling,dog-kling
python3 esacard/2026-08-21-banner-motion/composite.py         # concept C, free, no API
```

The per-model master mp4s are gitignored (48 MB, re-derivable by the command above). The
`upload/` clips are the deliverable and are committed.
