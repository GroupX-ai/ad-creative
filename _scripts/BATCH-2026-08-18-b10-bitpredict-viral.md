# Batch 10 — 2026-08-18 — BitPredict "crazy, funny, parody, UGC" (8 videos, ~$77)

Robby's brief:

> You can add more crazy, funny, parody, and UGC videos that will go viral 15-30 seconds
> long. Keep the one word caption thing. You can schedule them in TikTok and add to Reddit
> Ads as-well.

Assets: `bitpredict/2026-08-18-viral-b10/`.
Prompts: [`seedance-prompts-b10-bitpredict.mjs`](seedance-prompts-b10-bitpredict.mjs).

## The bet: parody is back, but loud

Batch 3's verdict is the thing this batch is built against. Seventeen genre parodies were
rejected outright with *"most of these are quite dry and not so good."* The pipeline worked
and the creative did not, because every prompt chased "documentary realism, deadpan,
unperformed" and all seventeen landed in one register: quiet, muted, slow, punchline at
second 25. **Fifteen different genres, one energy.** The shared block literally ended with
"Nobody is enjoying themselves."

So the format variable is wide open again and the energy variable is pinned: every ad here
opens at full volume on the first frame, the turn lands by second five, and the visual joke
sits in the middle third where this model actually renders it. Deadpan survives only as a
contrast beat inside a loud ad (the caster's two crashes, the polygraph examiner), never as
the house style.

Concepts came from a six-territory generation sweep, twenty written and eight shipped, each
screened for claim safety, Reddit gambling-policy risk, whether it is actually funny, and
Seedance render risk.

## The eight

| ID | Title | Territory | Len | The joke |
|---|---|---|---|---|
| `c8` | Two AM Whisper | UGC | 17.3s | Maximum excitement at whisper volume, because the house is asleep |
| `c9` | There Is A Link | UGC | 17.3s | A man physically overwhelmed that he can finally prove something |
| `c10` | Pulled Over | UGC | 22.3s | He left the road to beat a 24-hour window and knocked the horn doing it |
| `c11` | The Receipt That Won't Stop | Infomercial | 22.3s | Hard-sell hysteria and a till roll that never stops coming |
| `c12` | The Caster Waits | Esports booth | 22.3s | Grand-final hype, then a full day of nothing, twice |
| `c13` | The Needle | Polygraph | 17.3s | "Absolutely." The needle disagrees |
| `c14` | Prove It | Courtroom | 22.3s | Cross-examined on a call he made alone in his car |
| `c15` | The Evidence Wall | Detective corkboard | 22.3s | A red-string investigation that collapses off the wall |

Three UGC (the proven winner for this brand), five parody. All 9:16, 1080p, one-word
captions burned in.

`c14` is deliberate: banner **B1 "You say you called it. Prove it"** is the only BitPredict
ad that has ever earned clicks on Reddit (2 of the campaign's 3, at 0.60% CTR against a
0.15% account average). This is that exact proposition as a moving picture, so the batch
tests the winning line and not only new formats.

## Two real defects, both caught by QA, both fixed

### 1. A Red Bull can, legible through the middle of `c12`

The prompt's set dressing said "an energy drink can". The model filled that category with a
real, fully legible Red Bull can, wordmark and bulls and all, sitting in frame for most of
the clip. That is a third-party trademark in a paid ad, banned outright.

This is the **third time** prohibition alone has failed on this exact class of thing: the
fabricated brand mark (batch 6), the Ralph Lauren polo player on a presenter's chest (batch
7), and now a prop. The rule is now proven three ways: **naming an object category invites
a real brand to fill it, and only an exhaustive positive spec prevents it.** `c12` was
re-rolled at $9.38 with the can removed entirely and a PROP RULE listing every object on the
desk and stating that none of them carries printing, a label or a logo. The re-roll came
back clean.

### 2. Stage directions read aloud in `c8` and `c15`

Transcription caught what the contact sheets could not. `c15` spoke *"Slide loose, his manic
energy still trying to make its point"* and `c8` spoke *"His excitement surges"* — both
narrated versions of the action written in the beats, despite a SPEECH_RULE that forbids
exactly that.

Both repaired for **$0** by the playbook's method: mute a window with both boundaries inside
existing speech gaps, so the edit is inaudible.

| Clip | Muted | Preceding gap | Following gap |
|---|---|---|---|
| `c8` | 2.40-4.60s | 2.24-2.64s | 4.04-5.16s |
| `c15` | 5.10-9.50s | 4.46-5.72s | 8.32-12.58s |

Re-transcribed after: both now read exactly as scripted. `c15`'s muted window is the
board-collapse beat, which now plays on room sound alone, which is what it should have been.

**The honest read on SPEECH_RULE:** it held on six of eight. Two failures out of eight is
not a fixed problem, and both failures were on clips whose beats describe a lot of physical
action. The working theory, unverified, is that dense action prose is what the model reaches
into when it improvises. Next batch should try moving action description out of the spoken-beat
block entirely.

## What the new SILENCE_RULE bought

Two ads hold a deliberate dead-air beat, which is precisely where this model improvises word
salad. A new SILENCE_RULE states positively what fills the gap. Both held: `c12`'s five-second
sandwich beat transcribed as `[crunching]` and nothing else, and `c13`'s needle beat came back
clean. Worth keeping.

## Caption pipeline: two fixes shipped with this batch

Both in `seedance-captions.mjs`, both found by running this batch.

1. **Captions were rendering over the end card.** Found first on the batch-7 clips, where
   "FREE", "ONE" and "STAKE" were burned across the BitPredict wordmark. A word is held until
   the next one starts, capped at `end + 0.6s`, and the transcript has no idea a 2.2s end card
   was appended. Now `--endcard <seconds>`, or auto-detect. **All eight end cards in this batch
   verified clean.**
2. **Auto-detection missed dark clips.** `c12` (dark booth) and `c14` (dark courtroom) both
   end on a dark frame, so the cut to a near-black end card is a small pixel delta and the
   0.4 scene threshold never fired. Lowered to 0.22; the tail-window constraint, not the
   threshold, is what prevents a false positive. Both then detected correctly at 20.10s.

A third trap worth recording: `showinfo` writes to stderr and the command **succeeds**, so it
cannot use the catch-the-exception trick the plain `-i` probe in the same file relies on. The
first version of the fix silently detected nothing. It needs `spawnSync`.

## QA

Every clip watched as a contact sheet, every clip transcribed, every wardrobe and prop
checked at full resolution.

- **All eight pass on wardrobe.** Plain single-colour garments throughout, no motif, no
  emblem, no lettering. The positive WARDROBE spec is now a shared block rather than
  per-character prose.
- **All eight pass on props** after the `c12` re-roll. The blank-paper PROP RULE held on
  `c11`'s till roll, `c13`'s polygraph chart and `c15`'s index cards: no invented text,
  figures or logos on any of them.
- **No screens anywhere.** The SCREEN_RULE held; no invented UI, leaderboard or ticker
  rendered in any clip.
- **Brand name spoken correctly in all six that speak it.** `c12` and `c15` deliberately do
  not speak it and rely on the end card, which is the zero-cost way to remove the
  mispronunciation risk entirely.
- One cosmetic note, not fixed: `c10`'s grocery bag carries an invented, illegible
  supermarket graphic. It is set dressing, not a real mark, and reads as a generic paper bag.

## Claim safety

Swept programmatically across all 66 spoken lines: no money, prize, USDT, payout, reward,
profit, return, ROI or percentage language, and no disclaimer construction. Every ad speaks
the word "crypto", which is both a scroller cue and an emphasis-tier caption word.

Claims used, all re-verified against live `BitPredict-Marketing` source on 2026-08-18:
"No trading. No gambling. Just verifiable skill." (`AboutHeading.tsx`), "Every call locks a
time-stamped receipt at its own public link. No edits after lock." (`cultureCardsData.tsx`),
"nothing to deposit, stake, or wager" (`NotGamblingStrip.tsx`), the 24-hour window
(`stepsData.ts`), and the up-or-down leaderboard line (`HeroSubheading.tsx`).

## Spend

| Item | Cost |
|---|---|
| 8 clips, 145s total, native 720p | $67.02 |
| 8 upscales to 1080p | $1.04 |
| `c12` re-roll (Red Bull can) + upscale | $9.38 |
| Transcription and caption word timings | ~$0.06 |
| **Total** | **~$77.50** |

Running total across all three BitPredict batches: **~$160**.
