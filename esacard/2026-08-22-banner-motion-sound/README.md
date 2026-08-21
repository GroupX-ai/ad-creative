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
