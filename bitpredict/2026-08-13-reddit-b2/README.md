# bitpredict — Reddit banner batch 2, 2026-08-13

Eight new angles, after Robby's note on the first batch: *"Banners are decent, but let's try
other angles."*

Full write-up: [`_scripts/BATCH-2026-08-13-b7-bitpredict-round2.md`](../../_scripts/BATCH-2026-08-13-b7-bitpredict-round2.md).
Companion video batch: `bitpredict/2026-08-13-reddit-video-b7/`.

## Why these are actually different

The first batch looked like eight concepts but was closer to two. Five of its eight were the
same proposition, *you can't prove you called it*, in different clothes. These eight are eight
different reasons to sign up, and none of them repeat a visual style from batch 1.

| ID | Proposition | Headline | Visual territory |
|---|---|---|---|
| `b1` | challenge | YOU SAY YOU CALLED IT. PROVE IT. | brutalist inversion, flat white |
| `b2` | risk-free | BE WRONG. LOSE NOTHING. | Ben-Day pop-art halftone |
| `b3` | status | WHAT'S YOUR RANK? | Y2K liquid chrome |
| `b4` | track record | ANYONE CAN BE RIGHT ONCE. TWICE IS A RECORD. | VHS glitch |
| `b5` | mechanic | UP OR DOWN. 24 HOURS. THAT'S THE GAME. | oversized flat graphic |
| `b6` | argument | SETTLE IT. | graffiti and sticker bomb |
| `b7` | native | "i called it" / "sure you did" | torn cardboard sign |
| `b8` | native | PLEASE STOP TELLING US YOU CALLED IT | printed office notice |

`b1` inverts the brand's near-black to flat white. That is the disruptive move available to a
dark-mode brand, and it is why `b1` carries a **dark-ink variant of the real logo**: the
standard white wordmark would be invisible on it. The green geometric mark is unchanged.

`b8` is the most platform-native asset in either batch. A passive-aggressive printed notice
with someone else's biro reply added underneath is a format Reddit posts constantly.

## Two folders, pick per placement

| Folder | Use |
|---|---|
| `banners/` | real logo composited in. Default for Meta, Google Display, TikTok. |
| `banners-nologo/` | clean render. Better on Reddit, where the post already carries the brand as the author handle, and where a pasted wordmark undoes the effect on `b7` and `b8`. |

## The logo is real, not generated

Every prompt forbids brand marks outright; the mark is composited afterwards by
[`_work/composite-logo.py`](_work/composite-logo.py) from
`BitPredict-Marketing/src/assets/icons/common/Logo.tsx`. This is the standing fix for the
invented-brand-mark defect that paused three live ads on 2026-08-03. Do not go back to
describing the logo in a prompt.

The same script also builds `_work/endcard.png` used by the video batch.

## Claim safety

No money, prize, USDT, payout or accuracy-percentage language anywhere, per BitPredict's hard
rule, and no invented leaderboard names or numbers. Every line traces to live site copy
re-verified on 2026-08-13; the mapping is in the batch doc.

## Regenerating

```sh
node bitpredict/2026-08-13-reddit-b2/_work/gen-banners.mjs   # writes _work/raw/
python3 bitpredict/2026-08-13-reddit-b2/_work/composite-logo.py
```

Needs `FAL_KEY` in the environment, plus `pip install pillow cairosvg`. `_work/raw/` is not
committed; `banners-nologo/` holds the same renders.
