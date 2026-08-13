# bitpredict — Reddit video batch 2, 2026-08-13

Four 15s UGC clips, built after Robby's note on the first video batch:

> The third video ad is the only decent one ("I made all my crypto calls public") - it's the
> best script. Needs to be much higher energy. Men only (it's a field dominated by Men).
> In-front of the computer is good also, selfie is good. Make it much more engaging.

Full write-up: [`_scripts/BATCH-2026-08-13-b7-bitpredict-round2.md`](../../_scripts/BATCH-2026-08-13-b7-bitpredict-round2.md).
Prompts: [`_scripts/seedance-prompts-b7-bitpredict.mjs`](../../_scripts/seedance-prompts-b7-bitpredict.mjs).
Seeds: `_scripts/seedance-run-log-2026-08-13-reddit-video-b7.json`.

## One premise, four moments

The confession script Robby picked is fixed. What varies is where in the story you catch him.

| File (`-1080p-captioned.mp4`) | The moment | Setting |
|---|---|---|
| `bitpredict-c4-worst-idea-ever-loud` | day one, pure regret. Robby's script verbatim | home-office desk, swivel chair |
| `bitpredict-c5-three-weeks-in` | getting beaten but improving | flat corner desk, cap backwards |
| `bitpredict-c6-humbling` | admits he was never good at crypto | living room, pacing, no desk |
| `bitpredict-c7-just-locked-it` | present tense, the call is live now | bedroom desk at night |

All 1080x1920, **17.3s** (15s clip plus a 2.2s branded end card). All four presenters are men;
three of four are at a computer. **Every clip says the word "crypto" in its opening line.**

**Ship the `-captioned.mp4` files.** They carry burned-in one-word captions, centred in the
middle of the frame, with "crypto", the numbers and each ad's punchline words in neon green at
a larger size, and "BitPredict" larger still. The clean uncaptioned 1080p and the native 720p
masters are kept alongside if you would rather caption them differently.

**The monitor is always turned away from camera** so no display surface is ever in shot. That
is deliberate rather than incidental: a visible screen would invent leaderboard names and
numbers, which this brand bans. It still reads unmistakably as "at the computer".

## QA

All four watched as contact sheets and transcribed.

- **All four transcripts are word-perfect** against the script, with no improvised narration.
- **All four said "BitPredict" correctly**, against two of three in the first batch. The
  hardened per-syllable pronunciation rule plus an instructed pause before the name is what
  changed.
- **`c6` roll 1 was rejected and re-rolled**: it put a red Ralph Lauren polo player on the
  presenter's chest, a third-party trademark the guardrails forbid. The prompt's existing ban
  on clothing logos did not hold; the fix was to state the garment positively as blank across
  the whole chest. **Check wardrobe on every future batch.**

## Before these run

- End cards are already burned in. No captions: the `seedance-captions.mjs` pipeline from
  batches 3-5 can add one-word emphasis captions if wanted.
- Declare AI-generated media on upload (`self_ai_disclosure: OPT_IN` on Meta), as with every
  batch since 2026-08-09.
- Usable on Meta and TikTok today; both pixels are already installed in the BitPredict app.
  The three Reddit launch blockers are unchanged and documented in the batch notes.
