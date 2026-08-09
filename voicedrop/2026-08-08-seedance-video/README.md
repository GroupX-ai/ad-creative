# VoiceDrop — Seedance 2.5 video ad (2026-08-08)

**One 30-second vertical video ad, generated from a single text prompt.** Part of the
cross-portfolio 2026-08-08 Seedance batch (VoiceDrop, [Emailchaser](../../emailchaser/2026-08-08-seedance-video/),
[1Lookup](../../1lookup/2026-08-08-seedance-video/)). Robby asked for creative, disruptive video
that is explicitly **not AI slop**, with a $20 experiment budget.

## The asset

| File | Spec | Use |
|---|---|---|
| `voicedrop-c39-cold-callers-anonymous-1080p-captioned.mp4` | 1080x1918, 30.0s | **Upload this one.** One-word centre captions burned in |
| `voicedrop-c39-cold-callers-anonymous-1080p.mp4` | 1080x1918, 30.0s, 30fps, AAC audio | Clean 1080p, no captions |
| `voicedrop-c39-cold-callers-anonymous-480p.mp4` | 480x854, 30.0s, 24fps, AAC audio | Seedance master, kept for reference and re-upscaling |

Model `bytedance/seedance-2.5/text-to-video`, 480p, 30s, 9:16, audio on, **seed 1715835244**.
Upscaled to 1080p with `fal-ai/bytedance-upscaler/upscale/video` (standard tier).

## Concept: "Cold Callers Anonymous"

A support-group meeting in a church basement, played completely deadpan, shot like
fly-on-the-wall documentary footage. Dave stands up and admits he made 412 cold calls
yesterday and got two answers, one of which was a fax machine. Then a phone rings inside
the circle, a woman answers it calmly and says she stopped calling and now they call her.

- **Angle:** pain-led (manual cold calling is a grind), with the product truth as the turn.
- **Approved copy, spoken not printed:** *"Stop chasing leads. Let them call you."* — verbatim
  from the VoiceDrop `Hero.tsx` headline.
- **Why this format:** the account's own data says the feed punishes polished-corporate work.
  Robby's picks from the 2026-08-03 batch landed entirely in the loud pattern-interrupt and
  native/organic families ("the whiteboard is the best by far"). A documentary-realism comedy
  sketch is the video expression of that same native bet.

## Claim safety

- No callback-rate number, no pricing, no SOC-2 claim, no `$20 in free credits` offer. The
  only product claim in the ad is the approved homepage headline.
- Dave's "four hundred and twelve cold calls" is a character describing his own week. It is
  not a product claim and does not need a source.
- No third-party logos, no on-screen text, no invented statistics.

## QA — actually watched, not assumed

The 2026-07-29 Emailchaser batch shipped two videos nobody could watch, because this
environment's bundled ffmpeg is a stripped Playwright build with no H.264 decode. Fixed
here: `pip install imageio-ffmpeg` provides a full static ffmpeg 7.0.2. Both QA steps are
scripted and repeatable.

1. **Frames.** `node _scripts/seedance-qa.mjs <file>` builds a 10-still contact sheet. Reviewed:
   correct location (beige cinderblock, brown linoleum, folding chairs, steel coffee urn,
   styrofoam cups, corkboard), correct blocking (Dave stands, sits at the turn, the woman in
   the denim jacket takes the call), consistent faces across all 30 seconds, **zero on-screen
   text**, no logos, no AI gloss.
2. **Dialogue.** `node _scripts/seedance-transcribe.mjs <audio>` transcribes the spoken track
   (~$0.008/min) so the brand line can be checked word for word. Result, verbatim:

   > "Hi, I'm Dave. Yesterday, I made four hundred and twelve cold calls." / "Hi, Dave." /
   > "Two people picked up. One of them was a fax machine." / "And how did that make you feel?" /
   > "Like a fax machine." / "Hello?" / "I stopped calling them. Now they call me." /
   > **"VoiceDrop. Stop chasing leads. Let them call you."**

   Every line landed as written and the brand name is pronounced correctly.

**Known minor deviation:** Dave is bald in a plaid shirt rather than the thinning-hair-and-loose-tie
described in the prompt. It reads more real, not less. No action needed.

## Before it runs

- **Captions are already burned in** on the `-captioned.mp4` file: one word at a time, centred,
  Liberation Sans Bold with a heavy outline. Word timings come from a speech-to-text pass, and
  the brand name is rejoined into one word because the transcriber splits it. Rebuild with
  `node _scripts/seedance-captions.mjs <video.mp4> <audio.mp3>`. Use the clean 1080p file instead
  if you would rather caption it yourself.
- **Add an end card in post** if you want the wordmark and CTA on screen.

## Prompt

The exact string passed to Seedance is in [`_scripts/seedance-prompts.mjs`](../../_scripts/seedance-prompts.mjs)
under id `voicedrop-c39-cold-callers-anonymous`. Re-render with:

```bash
node _scripts/seedance-generate.mjs --only voicedrop-c39-cold-callers-anonymous
# add --resolution 720p to re-render a winner at full quality (~$13.87 for 30s)
```

The prompt structure is the anti-slop recipe: declare the genre and state it is not an
advertisement, specify real optics and practical light, name a mundane location and its props,
give the characters wardrobe and demeanour, write beat-by-beat timecodes with verbatim dialogue,
design the audio as diegetic only with no music, then close with a hard ban list (no on-screen
text, no logos, no slow motion, no drone or crane moves, no lens flares, no glowing particles,
no holograms, no teal-and-orange grade, no montage, no smiling models, no glass-walled office).
