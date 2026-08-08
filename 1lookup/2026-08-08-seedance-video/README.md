# 1Lookup — Seedance 2.5 video ad (2026-08-08)

**One 30-second vertical video ad, generated from a single text prompt.** Part of the
cross-portfolio 2026-08-08 Seedance batch ([VoiceDrop](../../voicedrop/2026-08-08-seedance-video/),
[Emailchaser](../../emailchaser/2026-08-08-seedance-video/), 1Lookup). Robby asked for creative,
disruptive video that is explicitly **not AI slop**, with a $20 experiment budget.

> ⚠️ **Do not upload the full 30s cut as-is.** The spoken brand name came out as
> **"One look"** instead of "1Lookup". Detail and fix options below.

## The assets

| File | Spec | Use |
|---|---|---|
| `1lookup-c3-ghost-leads-1080p-trimmed.mp4` | 1080x1918, 27.4s, AAC audio | **Use this one.** Brand mispronunciation cut off the end |
| `1lookup-c3-ghost-leads-1080p.mp4` | 1080x1920, 30.0s, 30fps, AAC audio | Full cut, carries the "One look" defect |
| `1lookup-c3-ghost-leads-480p.mp4` | 480x854, 30.0s, 24fps, AAC audio | Seedance master, kept for reference and re-upscaling |

Model `bytedance/seedance-2.5/text-to-video`, 480p, 30s, 9:16, audio on, **seed 701838878**.
Upscaled to 1080p with `fal-ai/bytedance-upscaler/upscale/video` (standard tier).

## Concept: "Ghost Leads"

A cheap late-night cable paranormal-investigation show parody, played dead straight. Two
investigators in black fleeces crouch between desks in a dark office, shot on a night-vision
camcorder with blown-out white eyes. They put a speakerphone on the carpet and dial a lead.
A disconnected-line intercept answers. "It's a dead number." / "That's the ninth one tonight."
/ "This whole list is haunted." Then the office lights bang on and a bored colleague with a
mug says, without looking up, "Or you could just validate them."

- **Angle:** pain-led (half the list is dead numbers), with validation as the anticlimax.
- **Approved copy, spoken not printed:** *"Stop paying for bad data."* — verbatim from the
  approved short-headline bank, same line as the `1lookup-c1` banners.
- **Why this format:** dead phone numbers are literally what HLR validation catches, so the
  premise is the product mechanic rather than a metaphor stuck on top of it.

## Claim safety

- **No accuracy percentage**, per 1Lookup's deliberate site discipline.
- "Validate" is the product's own verb, used on the site and in the approved headlines.
- The disconnected-line recording is a generic telephone intercept. No carrier is named, which
  matters because the `1lookup-g2` banner previously rendered a real carrier brand and had to
  be re-rolled.
- No third-party logos, no on-screen text, no invented statistics.

## QA — actually watched, not assumed

1. **Frames.** 10-still contact sheet reviewed. The night-vision look is the best-executed part
   of the whole batch: monochrome green, blown-out retinas, heavy video noise, hunting focus,
   two people crouched over a speakerphone on office carpet. **Zero on-screen text**, no logos.
2. **Dialogue.** Transcribed. Result, verbatim:

   > "I'm getting something. Row four hundred." / "The number you have dialed is no longer in
   > service." / "It's a dead number." / "That's the ninth one tonight." / "This whole list is
   > haunted." / "Or you could just validate them." / **"One look. Stop paying for bad data."**

### Defect 1: the brand name (blocking)

The closing line says **"One look"**, not "1Lookup". The `-up` is dropped.

This was checked properly rather than assumed, because a phonetic transcription of a brand name
is exactly the thing the vault's proper-noun rule says not to trust. The tail audio was isolated
and run through **three independent engines — ElevenLabs Scribe v2, Whisper (wizper) and Cohere —
and all three returned "One look."** That is a real mispronunciation, not a transcription artifact.

**Root cause, likely but not proven:** numeral-led brand names are the risk. "VoiceDrop" and
"Emailchaser" both came out perfect in the same batch. "1Lookup" has to be read as "one look-up",
and the model dropped the final syllable.

**Fix options, cheapest first:**
1. **Ship the trimmed cut** (`-trimmed.mp4`, provided). Cut at 27.4s, in a natural 0.9s speech
   gap, so it ends clean on "Or you could just validate them" and drops the brand line entirely,
   then takes a branded end card in post. **$0.** Re-transcribed after cutting to confirm
   "One look" is gone and the punchline is intact. This also removes defect 2 below, so it is
   the recommended path.
2. **Re-roll at $6.17** with the brand name spelled phonetically in the prompt, e.g. `says the
   words "one look up" as three clear syllables`. Unverified that this fixes it.

### Defect 2: the visual punchline is soft (non-blocking)

The written payoff was the lights snapping on to catch both investigators frozen mid-crouch on
the carpet. The render instead cuts to the colleague alone at a conference table, with a camera
tripod in the foreground, and the investigators are never seen in daylight. The line still works
but the reveal does not. Trimming per option 1 removes this weak tail as a side effect.

## Before it runs

- **Add captions in post.** Dialogue-driven, and Meta autoplays muted. Captions were deliberately
  kept out of the render because video models garble burned-in type.
- **Add an end card in post.** Required if you use the trimmed cut, since it has no brand mention
  at all once the last line is gone.

## Prompt

The exact string passed to Seedance is in [`_scripts/seedance-prompts.mjs`](../../_scripts/seedance-prompts.mjs)
under id `1lookup-c3-ghost-leads`. Re-render with:

```bash
node _scripts/seedance-generate.mjs --only 1lookup-c3-ghost-leads
# add --resolution 720p to re-render a winner at full quality (~$13.87 for 30s)
```
