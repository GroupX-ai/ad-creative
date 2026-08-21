# ESA Card | banner motion with sound, for TikTok (2026-08-22)

Robby, after seeing the silent 5s versions: *"Videos should probably be 15 seconds if possible
and each animal should make its sound and maybe add some music. You can send me 2-3 videos to
test this out."*

Three test clips: `upload/alligator-15s.mp4`, `upload/duck-15s.mp4`, `upload/cat-15s.mp4`.
All 1080x1920, exactly 15.00s, 24fps, AAC stereo. Picked because all three convert on Meta
(alligator 4 checkouts at $2.06, duck 2, the $39 cat 5 purchases and 17 checkouts).

## How a 15s clip gets made

1. **Pad to 9:16.** The weird-animal banners are 1024x1024. They are scaled to 1080 wide and
   placed at y=200, not centred: TikTok covers roughly the bottom 480px with the caption and
   action buttons, so a centred square puts the button and the price under the UI. Padding
   uses the banner's own cream, sampled from its corner, so there are no letterbox bars.
2. **Animate on Kling 2.5 Turbo Pro, 10s**, its maximum.
3. **Lock the text** by repainting everything outside the animal's window from the source
   banner, every frame. See `assemble.py`.
4. **Reach 15s** by playing forward then backward. The motion is a blink and a breath, which
   reversed is still a blink and a breath, and the join is on an identical frame.
5. **Sync the sound** to the animal's biggest movement, measured frame by frame inside the
   window rather than guessed.
6. **Mix**: music bed at 0.13 gain under the animal sound at full.

## Two things Robby rejected on the first pass, and the fixes

**"Videos look super weird with the animals coming out of their frame."** The mask was
backwards. Video played inside a rectangle drawn round the animal and everything outside was
frozen, so when the alligator opened its jaws past the right edge of its box the frame sliced
the jaw off in a hard vertical line, with a ghost of the closed mouth showing through from the
banner behind. Now video plays EVERYWHERE and only the glyphs and the button are frozen,
detected as "not the flat cream background" inside zones known to hold type, then thickened.
The animal can move anywhere, including into the empty cream between lines, and nothing can cut
it. If it reaches a letter the letter paints over it, so it passes behind the type.

**"The sounds they make are horrible and not synced with the visuals."** Both true. The sounds
came from `cassetteai/sound-effects-generator` as standalone clips and were then dropped onto
timestamps picked from motion peaks, which is guesswork. Replaced with `fal-ai/mmaudio-v2`,
which takes the finished video and generates audio for it, so it tracks the mouth by
construction. A highpass and a gate strip its noise floor, which is the usual reason this model
reads as hiss. Peak alignment measured after the change: the duck's four loudest audio moments
land within 0.4s of its four biggest movements.

**A limit worth writing down: the agent cannot hear.** Sync can be verified numerically by
correlating the audio envelope against per-frame motion, and that was done. Whether the result
actually sounds good is not checkable here, which is exactly how the first batch shipped
"horrible" audio with a clean QA report. Every batch with sound needs a human listen before it
goes near a campaign, and a music-only cut should ship alongside so there is a fallback that
cannot sound wrong.

## What was learned

- **"Hold still" and "make its sound" fight each other.** The first pass reused the silent
  batch's prompt, which spends most of its words forbidding movement. Every animal's mouth
  stayed shut, so the sound played over a closed face. The fix was to stop asking the prompt to
  protect the text (step 3 already guarantees it) and spend that budget on the mouth instead:
  "opens his jaws WIDE, twice... holding open for a beat". Alligator and duck now open clearly.
- **The cat is the weak one.** Its mouth barely opens even on the second pass, so the meow
  reads as a sound over a still face. Worth a re-render before the cat ships.
- **Sound placement needs windows, not the global peak.** Placing both hits on the loudest
  motion frame put the alligator's two hisses at 9.6s and 10.1s and left the first nine seconds
  silent. Hits are now the best frame inside 0.5-3.5s and inside 8-13s.
- **ElevenLabs sound effects are not available on this fal key** (`Sound effect generation
  failed`). `cassetteai/sound-effects-generator` works and is what these use. Music is
  `fal-ai/lyria2`, one 32s bed reused across all three.
- **Some animals on the list have no sound at all**: the egg, the axolotl, the tortoise, the
  sugar glider, the tarantula. They need a movement or ambience cue, or no effect.

## Re-deriving

```
node esacard/2026-08-22-banner-motion-sound/generate.mjs              # 3 x Kling 10s, ~$2
python3 esacard/2026-08-22-banner-motion-sound/assemble.py         # composite + 15s + mix, free
```

The 10s masters (`raw-*.mp4`) are gitignored; `upload/` is the deliverable.

---

# The full batch (32 clips), 2026-08-22

Robby: *"You can generate all of them and send me here"*, scoped to *"the weird animal banners +
any banner that converted anything"*. That resolves to 35 banners: all 26 weird animals, plus 9
more that produced a checkout or a purchase on Meta. **32 shipped, 3 held.**

Everything is in `all/upload/`, 1080x1920, 15.00s, AAC. 30 carry the animal's own sound; the
cartoon egg and the tarantula are silent animals and ship music-only rather than with an
invented noise.

## Held back, and why

`p5-three-minutes-square`, `p5-three-minutes-vertical`, `p11-his-photo-square`. On these the type
sits directly ON the subject: both p5 banners run the headline across a man's head and a kitchen,
and p11 runs "An emotional support animal ID card, $39 one time." across the labrador's forehead.
Glyph detection needs a flat background they do not have, and no horizontal band separates the
words from the animal, so every mask that protects the copy also freezes part of the subject.
They need a different technique, not a wider rectangle.

## The pipeline

`prep.py` -> `render-all.mjs` -> `assemble-all.py` -> `audio-all.mjs` -> `mix-all.py`, with
`score.py` as the gate. `prep.py` and `score.py` cost nothing, so both run before and after the
paid steps.

## What this batch cost in rework, so the next one does not repeat it

- **Derive the mask, do not draw it.** 30 of the 35 banners are one cut-out animal on flat cream,
  so the freeze mask is computed: find every non-background pixel, group into blobs, call the
  largest non-navy blob the animal, freeze all the other ink. The navy test is what separates the
  button from the animal, and it holds even for a black raven and a dark alligator, which both sit
  near B-R = 0 while the button sits at +61. Hand-drawn rectangles were wrong on all five banners
  they were used for, because they were written in the original banner's coordinates and applied
  to the padded 1080x1920 frame.
- **A glyph-shaped mask cannot survive a moving frame.** It is thin, so when the video's own copy
  of the headline shifts even slightly it shows through the gaps between the frozen letters and
  you get two overlapping headlines. `p2-offer-vertical` and `w8-chicken-square` did this through
  three separate re-renders (10s, 10s with a containment clause, 5s). The fix was not a fourth
  render: on both, the animal sits well below all the type, so the type is frozen as one solid
  band that hides whatever the video does up there. **If a clip ghosts twice, stop re-rolling and
  change the mask.**
- **"Impossible to miss" is read as "come closer".** The first pass told the model the hero action
  must be impossible to miss, and eight clips dramatised it by walking the animal at the lens
  until it crowded the headline. The containment clause in `render-all.mjs` fixes the animal's
  footprint and distance and confines the motion to the head.
- **Measure the strip ABOVE the animal, nothing else.** The first version of `score.py` measured
  every row carrying type, which on these banners is most of the upper two thirds and includes
  rows the animal legitimately occupies. It scored normal breathing as a fault and flagged 30 of
  32. Scoped to the strip above the animal's head it flagged 8, which matched the eye.
- **The metric is a filter, not a verdict.** Even scoped, it kept flagging w3-raven, w2-alligator
  and x16-tarantula after they were visibly fine, and it scores 0.00 on the two photographic
  banners because the ink test is meaningless there. Every shipped clip was confirmed by looking
  at a contact sheet at mid-action (`all/ALL-32.png`). Trust the sheet over the number.
- **Stream frames, never write them.** 32 clips x 240 frames as PNGs is about 15 GB against a much
  smaller disk allowance. `assemble-all.py` pipes raw RGB from ffmpeg into numpy and back.
- **Still nobody here can hear the audio.** Sync is structural, because MMAudio generates from the
  finished video, but tone is unverified. A human listen before spend is still required.
