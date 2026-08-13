# bitpredict — Reddit banner batch 2026-08-13

Eleven banners for BitPredict's first Reddit campaign. Companion video batch:
`bitpredict/2026-08-13-reddit-video/`. Full write-up, QA and blockers:
[`_scripts/BATCH-2026-08-13-b6-bitpredict-reddit.md`](../../_scripts/BATCH-2026-08-13-b6-bitpredict-reddit.md).

Generated with fal `openai/gpt-image-2`, quality high, ~$0.20/image. Square 1024x1024;
landscape generated 1200x624 and delivered resized to 1200x628. Exact prompts:
[`_work/gen-banners.mjs`](_work/gen-banners.mjs).

Brand kit, approved claims and guardrails: `AD-CREATIVE-PLAYBOOK.md` in
`GroupX-ai/BitPredict-Marketing`. Re-read it against the live site before reusing anything
here; the hero copy had already drifted once by 2026-08-13.

## Two folders, pick per placement

| Folder | Use |
|---|---|
| `banners/` | the real logo composited in. Default for Meta, Google Display, TikTok. |
| `banners-nologo/` | the clean render. Better on Reddit, where the post already carries the brand as the author handle, and where a pasted wordmark undoes the native/organic effect on r6-r8. |

## The logo is real, not generated

Every prompt in this batch **forbids brand marks outright**. The mark is composited
afterwards by [`_work/composite-logo.py`](_work/composite-logo.py) from
`BitPredict-Marketing/src/assets/icons/common/Logo.tsx`, rendered to a transparent PNG with
cairosvg.

This is the fix for the defect the 2026-08-03 Reddit audit found across this whole repo:
nearly every earlier banner carries an invented brand mark, because the model was handed a
text description of the logo and drew its own. Three live ads were paused for it. Do not go
back to describing the logo in a prompt.

## Claim safety

BitPredict bans every promise or implication of financial gain in paid creative, **including
the site's own USDT, prize and payout copy**. Nothing here mentions money, prizes, winnings
or returns, and no accuracy percentage appears anywhere. Each line traces to live site copy
re-verified on 2026-08-13; the mapping is in the batch doc.

## Concepts

Loud direct-response (r1-r5) and native/organic (r6-r8). Nothing in the polished-corporate
middle, which has never been picked from this repo.

| ID | Shapes | On-image copy |
|---|---|---|
| `r1` screenshot-or-it-didnt-happen | square, landscape | "SCREENSHOT OR IT DIDN'T HAPPEN" / "Every call locks a time-stamped public receipt." / Make a Prediction |
| `r2` everyone-called-it | square, landscape | "EVERYONE CALLED IT. NOBODY LOGGED IT." / "No trading. No gambling. Just verifiable skill." / Make a Prediction |
| `r3` trust-me-bro | square, landscape | "SOURCE: TRUST ME BRO" struck through, "PUBLIC RECEIPT" / "No edits after lock." / Make a Prediction |
| `r4` no-trading-no-gambling | square | "NO TRADING. NO GAMBLING. JUST VERIFIABLE SKILL." / "Call BTC, ETH and SOL up or down over 24 hours." / Check Leaderboard |
| `r5` pay-to-be-right | square | "OTHER MARKETS MAKE YOU PAY TO BE RIGHT. THIS ONE IS FREE." / "Nothing to deposit. Nothing to stake." / Make a Prediction |
| `r6` whiteboard | square | hand-lettered: "everyone called the top." / "nobody has the receipt." |
| `r7` sticky-note | square | sticky note on a monitor bezel: "screenshot or it didn't happen" |
| `r8` legal-pad | square | ballpoint on a legal pad: "my crypto calls are public" / "this was a mistake" |

## Regenerating

```sh
node bitpredict/2026-08-13-reddit/_work/gen-banners.mjs   # writes _work/raw/
python3 bitpredict/2026-08-13-reddit/_work/composite-logo.py
```

Needs `FAL_KEY` in the environment, plus `pip install pillow cairosvg`.

`_work/raw/` is not committed: it is byte-identical to `banners-nologo/` apart from the
landscape resize, so keeping both would triple-store every image. `composite-logo.py` reads
from `_work/raw/`, so regenerate before re-running it.
