# Emailchaser — Seedance 2.5 video ad (2026-08-08)

**One 30-second vertical video ad, generated from a single text prompt.** Part of the
cross-portfolio 2026-08-08 Seedance batch ([VoiceDrop](../../voicedrop/2026-08-08-seedance-video/),
Emailchaser, [1Lookup](../../1lookup/2026-08-08-seedance-video/)). Robby asked for creative,
disruptive video that is explicitly **not AI slop**, with a $20 experiment budget.

## The asset

| File | Spec | Use |
|---|---|---|
| `emailchaser-c11-missing-1080p.mp4` | 1080x1920, 30.0s, 30fps, AAC audio | **Upload this one.** Reels / Stories / TikTok 9:16 |
| `emailchaser-c11-missing-480p.mp4` | 480x854, 30.0s, 24fps, AAC audio | Seedance master, kept for reference and re-upscaling |

Model `bytedance/seedance-2.5/text-to-video`, 480p, 30s, 9:16, audio on, **seed 1710683338**.
Upscaled to 1080p with `fal-ai/bytedance-upscaler/upscale/video` (standard tier).

## Concept: "Missing"

A late-night true-crime documentary parody, played completely straight and never winking.
Marcus sits in an interview chair in a wood-panelled home office and says they sent four
thousand emails on a Tuesday and none of them came back. A detective at a corkboard strung
with red string says they found them: Promotions tab, page three. Marcus, close on his face:
"They were right there the whole time."

- **Angle:** pain-led (sent cold email never reaches the inbox), with the reveal as the punchline.
- **Approved copy, spoken not printed:** *"Cold email that lands in primary."* — verbatim from
  the approved copy bank, same line as the `ec-c5` PRIMARY and `ec-c6` morgue banners.
- **Why this format:** it extends the batch's strongest existing territory. `ec-c6`
  "Where Cold Email Goes To Die" already treats lost email as a crime scene; this is that idea
  with a runtime, a cast and a reveal.

## Claim safety

- **No deliverability percentage anywhere.** The playbook's Emailchaser hard rule holds.
- The four thousand sends are the character's own volume, not a product claim.
- "Primary" and "Promotions tab" are the same inbox vocabulary the approved copy already uses.
  No Gmail logo or interface appears: every monitor in frame is blank or blown out by design.
- No third-party logos, no on-screen text, no invented statistics.

## QA — actually watched, not assumed

The 2026-07-29 batch shipped two Emailchaser videos nobody could watch, because this
environment's bundled ffmpeg is a stripped Playwright build with no H.264 decode. Fixed here:
`pip install imageio-ffmpeg` provides a full static ffmpeg 7.0.2. Both QA steps are scripted.

1. **Frames.** `node _scripts/seedance-qa.mjs <file>` builds a 10-still contact sheet. Reviewed:
   correct interview grammar (long lens, single soft key, deep shadow), correct location
   (wood panelling, ring binders, dead plant, printer, vertical blinds), the degraded
   re-enactment insert reads as different footage, the corkboard-and-red-string beat lands,
   faces stay consistent for the full 30 seconds, **zero on-screen text**, and every monitor
   is blank exactly as instructed.
2. **Dialogue.** `node _scripts/seedance-transcribe.mjs <audio>` transcribes the spoken track
   (~$0.008/min). Result, verbatim:

   > "We sent four thousand of them on a Tuesday." / "None of them came back." /
   > "We found them, all four thousand." / "Promotions tab, page three." /
   > "They were right there the whole time." / **"Emailchaser. Cold email that lands in primary."**

   Every line landed as written and the brand name is pronounced correctly.

**This is the strongest of the three.** Nothing in it needs fixing before it runs.

## Before it runs

- **Add captions in post.** The ad is dialogue-driven and Meta autoplays muted. Captions were
  deliberately kept out of the render because video models garble burned-in type. Use Meta's
  auto-captions or burn your own.
- **Add an end card in post** if you want the wordmark and CTA on screen. The brand is spoken only.
- The tone is bleak on purpose. If it runs on Reddit, where ads take comments by default, the
  same comment-sentiment watch that applies to `ec-c6` applies here.

## Prompt

The exact string passed to Seedance is in [`_scripts/seedance-prompts.mjs`](../../_scripts/seedance-prompts.mjs)
under id `emailchaser-c11-missing`. Re-render with:

```bash
node _scripts/seedance-generate.mjs --only emailchaser-c11-missing
# add --resolution 720p to re-render a winner at full quality (~$13.87 for 30s)
```

The prompt structure is the anti-slop recipe: declare the genre and state it is not an
advertisement, specify real optics and practical light, name a mundane location and its props,
give the characters wardrobe and demeanour, write beat-by-beat timecodes with verbatim dialogue,
design the audio as diegetic only with one restrained cello note and no score, then close with a
hard ban list (no on-screen text, no logos, no slow motion, no drone or crane moves, no lens
flares, no glowing particles, no holograms, no teal-and-orange grade, no montage, no smiling
models, no glass-walled office), plus an explicit rule that every screen stays blank.
