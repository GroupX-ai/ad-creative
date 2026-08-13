# bitpredict — Reddit video batch 2026-08-13

BitPredict's first video ads. Three 15s UGC selfie clips, native 720p, upscaled to 1080p,
9:16. Companion banner batch: `bitpredict/2026-08-13-reddit/`. Full write-up, QA and
blockers: [`_scripts/BATCH-2026-08-13-b6-bitpredict-reddit.md`](../../_scripts/BATCH-2026-08-13-b6-bitpredict-reddit.md).

Model `bytedance/seedance-2.5/text-to-video`, then `fal-ai/bytedance-upscaler`. Prompts:
[`_scripts/seedance-prompts-b6-bitpredict.mjs`](../../_scripts/seedance-prompts-b6-bitpredict.mjs).
Seeds: `_scripts/seedance-run-log-2026-08-13-reddit-video.json`.

## The clips

| File | Hook | Spoken close |
|---|---|---|
| `bitpredict-c1-that-group-chat-1080p.mp4` | "You didn't call it. I was in that group chat." | "BitPredict. It's free and there's nothing to stake." |
| `bitpredict-c2-screenshot-or-it-didnt-happen-1080p.mp4` | "Screenshot or it didn't happen. That's the rule." | "It's free. Go call one." + branded end card |
| `bitpredict-c3-worst-idea-ever-1080p.mp4` | "I made all my crypto calls public. Worst idea ever." | "BitPredict. No trading, no gambling, and it's free." |

Native 720p masters are kept alongside each 1080p file.

## QA status

Every clip was watched as a contact sheet and transcribed. **c1 and c3 are word-perfect**
with the brand name correct.

**c2 is a repaired clip and runs 17.3s, not 15s.** Both of its rolls mispronounced the brand
("BitProtect", then "Bitpropt", each confirmed on three transcription engines). Rather than
pay for a third roll, the word was muted at 11.45-12.40 with both boundaries inside existing
speech gaps, and a 2.2s end card carrying the real logo was appended. The unrepaired takes
were not kept; the three transcripts in the batch doc are the record.

**Treat "BitPredict" as a name the model cannot reliably say.** Two of three getting it right
is a coin flip, not a solved problem. Put the brand on an end card and keep it out of the
spoken script next time.

## Before these run

- No captions are burned in. The `seedance-captions.mjs` pipeline from batches 3-5 can add
  the one-word emphasis captions if wanted.
- Declare AI-generated media on upload (`self_ai_disclosure: OPT_IN` on Meta) as with every
  batch since 2026-08-09. These are fully generated clips featuring people.
- All three are equally usable on Meta and TikTok, whose pixels are already installed in the
  BitPredict app. They are not stranded if Reddit needs a sales rep.
