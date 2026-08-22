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
| `b14v01` fake-credit-cards | "Fake credit cards. Every week." | 2-3x is typical |
| `b14v02` payment-failed | "Trial ended. Payment failed." | twice as many pay (bank claim 2) |
| `b14v03` verify-every-user | "I verify every user." | 100+ SaaS teams |

All three tell the same sequence and differ only in where they enter it: fake credit cards on
signups, the trial ends seven days later, every payment fails, that is free trial abuse, and now
every user is verified. The seven-day trial is the character's own product's, in-scene fiction;
1Capture itself is free forever under $10K MRR with no card.

**The .mp4 files in this folder are STALE as of round 4 (2026-08-22).** They were rendered from
the round-2 scripts, so b14v02 still names VoiceDrop and all three still close on "Start free.
Free under $10K MRR. No card." Robby cut both. The current scripts live in
`_scripts/seedance-prompts-b14-1capture.mjs` and are awaiting his approval before any re-render,
which is why the clips have not been rebuilt. Do not upload these files.

No clip speaks the brand name: five compound names have been mispronounced across seven
batches, and the composited end card carries it regardless. The screen recording is a real
capture of the live www.1capture.io, never a rendered screen, and it starts at exactly 5.0s in
every clip because the captured browser chrome reads `app.1capture.io` and the claims bank
forbids any brand mention before second 5.

## Banners (three shapes each)

Twenty-six concepts, all re-rendered in round 4 on new copy. `b14c01`-`c03` ship at three shapes
each; `b14c04`-`c26` are the wide "go wild" set at square, built by holding the copy fixed and
making visual style the only variable, so a winner tells you which treatment won.

**No banner in this set carries a price, a percentage or any figure at all.** Robby, on round 2:
*"They are talking about pricing or throwing numbers that nobody understands."* The offer lives
in the button ("Start free") and nowhere else, and the VoiceDrop proof number left with the name
when he cut it from the creative. Eight copy pairs, every line traced to live site copy; the
lines are recorded in `_scripts/banner-prompts-b14b-1capture.mjs`. **They are not all in the
approved claims bank yet**, which is an open item for Robby and blocks these from shipping.

Twelve loud direct-response: hazard tape, brutalist inversion, ransom note, mega-type, offer
poster, Ben-Day pop, blueprint, split-screen, sticker bomb, VHS glitch, liquid chrome, foil
letterpress. Fourteen native/organic: whiteboard x2, legal pad, sticky notes, napkin, torn
cardboard, corkboard, chalkboard, squared notebook, till receipt, kraft envelope, single sticky
note. Nothing polished-corporate.

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
