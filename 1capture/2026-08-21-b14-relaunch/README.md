# 1Capture — batch 14, 2026-08-21

1Capture's first paid ad creative, for the site relaunched the same day. Full write-up,
including the judge panel and every defect found: `_scripts/BATCH-2026-08-21-b14-1capture-relaunch.md`.

**Nothing here is live.** No campaign was built and no ad budget was spent.

## Videos (15s, 9:16, 720p native, upscaled to 1080p)

Four files per clip, all kept:

```
<id>-720p.mp4                              native master, the thing that was paid for
<id>-1080p.mp4                             clean upscale: no screen, no card, no captions
<id>-1080p-screen.mp4                      real screen recording composited in
<id>-1080p-screen-endcard-captioned.mp4    THE deliverable that gets uploaded
```

| id | hook | the one number |
|---|---|---|
| `b14v01` fourth-free-trial | "Same card, fourth trial. Same guy." | 2-3x is typical |
| `b14v02` ten-signups | "My last ten signups. Two paid." | VoiceDrop 12% to 57% |
| `b14v03` a-real-card | "A real card. Every signup." | 100+ SaaS teams |

No clip speaks the brand name: five compound names have been mispronounced across seven
batches, and the composited end card carries it regardless. The screen recording is a real
capture of the live www.1capture.io, never a rendered screen, and it starts at exactly 5.0s in
every clip because the captured browser chrome reads `app.1capture.io` and the claims bank
forbids any brand mention before second 5.

## Banners (three shapes each)

| id | concept | family |
|---|---|---|
| `b14c01` | "Only let real customers through the door." | loud direct-response, hazard label |
| `b14c02` | "12% to 57%" | loud direct-response, mega-numeral |
| `b14c03` | "Verify a real payment method before anyone enters your free trial." | native/organic, whiteboard photo |

`nologo/` holds the same nine renders without the composited wordmark. **Use those on Reddit:**
the post is already branded with the author handle, and a pasted wordmark undoes the
native-post illusion. The wordmark on the others is composited from the marketing repo's own
SVG, never generated.

## Reproducing

```
node _work/capture-screen.mjs                 # record the live site
node _work/build-screencap.mjs                # assemble the inserts
python3 _work/logo-from-jsx.py                # extract the real wordmark
mkdir -p _work/fonts && curl -sSL -o _work/fonts/Inter-Variable.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf"
python3 _work/make-endcard.py                 # build the end cards (needs Inter, above)
node _scripts/banner-generate.mjs --prompts banner-prompts-b14-1capture.mjs
python3 _work/composite-logo.py
node _scripts/seedance-generate.mjs --prompts seedance-prompts-b14-1capture.mjs \
  --batch 2026-08-21-b14-relaunch --resolution 720p --duration 15
node _work/finish-videos.mjs
node _scripts/naming-check.mjs --company 1capture --files
```
