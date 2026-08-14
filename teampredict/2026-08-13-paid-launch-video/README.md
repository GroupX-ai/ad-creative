# TeamPredict video ads — 2026-08-13/14, batch 9

Six 15-second vertical ads. Robby approved three angles from the batch-8 script doc with one
note: *"even those are a bit Meh. It needs to be much more interesting, maybe funny or
ironic."* So the three approved angles are rebuilt as actual comedy, and three new ones join
them.

Full write-up: [`_scripts/BATCH-2026-08-14-b9-teampredict-launch.md`](../../_scripts/BATCH-2026-08-14-b9-teampredict-launch.md).
Prompts: [`_scripts/seedance-prompts-b9-teampredict.mjs`](../../_scripts/seedance-prompts-b9-teampredict.mjs).

## The deliverables

`*-1080p-captioned.mp4` is the file that ships: 1080x1918 vertical, one-word centre captions
with indigo emphasis, branded end card appended. Everything is live on Reddit.

| | Concept | File | Len | Speaks the brand |
|---|---|---|---|---|
| v1 | Keep Scrolling | `teampredict-v1-keep-scrolling-1080p-captioned.mp4` | 17.3s | yes |
| v2 | Two Weeks | `teampredict-v2-two-weeks-1080p-captioned.mp4` | 17.3s | no, end card only |
| v3 | Open To Work | `teampredict-v3-open-to-work-1080p-trimmed-captioned.mp4` | 16.6s | yes |
| v4 | Pizza Party | `teampredict-v4-pizza-party-1080p-captioned.mp4` | 17.3s | no, end card only |
| v5 | The Psychic | `teampredict-v5-psychic-1080p-captioned.mp4` | 17.3s | yes |
| v6 | I Use It On My Competitors | `teampredict-v6-my-competitors-1080p-captioned.mp4` | 17.3s | yes |

`*-720p.mp4` are the generation masters, kept because they are cheap and every intermediate
is re-derivable from them. `thumbnails/` are frame grabs at 1.0s: Reddit video creatives need
a hosted thumbnail and will not generate one.

The uncaptioned 1080p upscales and the v3 trim intermediate are gitignored (94 MB of
duplicates). Re-derive one with:

```
node _scripts/seedance-generate.mjs --prompts seedance-prompts-b9-teampredict.mjs \
  --batch 2026-08-13-paid-launch-video --duration 15 --resolution 720p --only <id>
```

## The end card

`_work/endcard.png`, built by `_work/build-endcard.py` from the marketing repo's own
`public/logo.svg` plus Plus Jakarta Sans ExtraBold. Never a described or invented mark.

It carries the site's verbatim final-CTA headline, its real CTA label, and the trust line
**"No charge today · Cancel anytime"** — deliberately not "no credit card required", which
is false for this product and already sits in one older banner set in this repo.

## Claim safety

Every spoken line traces to live teampredict.ai copy. Never used anywhere: an accuracy
percentage, a lead-time window other than the site's own "weeks", and "no credit card
required".

**No product screens at all**, which is this brand's hardest guardrail: an invented risk
score or employee row is precisely the claim TeamPredict does not make. Every prompt states
exhaustively what IS visible rather than banning what is not. Two clips (v2, v3) do carry
switched-on monitors in the deep background, blurred past legibility with no readable
content.

No LinkedIn or Slack logo, glyph or icon anywhere. Naming them aloud is site copy and safe;
the marks are third-party and banned.
