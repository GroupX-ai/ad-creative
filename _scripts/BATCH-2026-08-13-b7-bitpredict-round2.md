# Batch 7 — 2026-08-13 — BitPredict round 2 (4 videos + 8 banner angles, ~$37)

Robby's feedback on batch 6:

> The third video ad is the only decent one ("I made all my crypto calls public") - it's the
> best script. Needs to be much higher energy. Men only (it's a field dominated by Men).
> In-front of the computer is good also, selfie is good. Make it much more engaging.
>
> Banners are decent, but let's try other angles.

Assets: `bitpredict/2026-08-13-reddit-video-b7/` and `bitpredict/2026-08-13-reddit-b2/`.
Prompts: [`seedance-prompts-b7-bitpredict.mjs`](seedance-prompts-b7-bitpredict.mjs) and
`bitpredict/2026-08-13-reddit-b2/_work/gen-banners.mjs`.

## Video: one premise, four moments in the arc

Batch 6 hedged across four different angles and three of them missed. This batch does the
opposite: the confession premise Robby picked is fixed, and what varies is **where in the
story you catch him**, the setting, and where the energy peaks.

| Ad | The moment | Setting |
|---|---|---|
| `c4` Worst Idea Ever (louder) | day one, pure regret | home-office desk, swivel chair |
| `c5` Three Weeks In | getting beaten but improving | flat corner desk, cap backwards |
| `c6` The Humbling | admits he was never good | living room, pacing, no desk |
| `c7` Just Locked It | present tense, call is live now | bedroom desk at night |

`c4` is Robby's script verbatim. The other three keep the register and vary the beat so the
set is a real test rather than four takes of one ad.

### What "much higher energy" actually changed

The batch-6 block asked for "fast, animated and genuinely energised" and rendered as merely
brisk. The rewrite asks for a specific human register instead of an adjective: **a man telling
a friend something outrageous that just happened to him.** Grinning and laughing throughout,
voice raised and still rising, talking over his own sentence and doubling back, gestures
crossing in front of the lens, leaning right into the camera and back out.

`HOOK` was also sharpened from "full energy" to "maximum energy on the very first frame,
louder and faster than anything that follows," with the first syllable inside a quarter
second. `CTA` now demands a hard gear change: volume drops, motion stops, delivery slows.
**The contrast is what makes the close land**, and it is now stated as the point rather than
implied.

Still no music. Batch 3 already proved pace and performance carry a phone-shot ad without a
score, and a track would break the illusion these depend on.

### Men only, and at the computer

All four presenters are men, per Robby. Three of the four sit at a desk; `c6` paces a living
room so the set is not four identical framings.

**The monitor is always turned away from camera** so only its back panel and edge are visible.
That is deliberate: batch 5 established that a screen only stays clean when the prompt states
exhaustively what IS on it, and an on-screen leaderboard would invent usernames and numbers,
which this brand bans outright. A monitor with no visible display surface cannot be
hallucinated onto at all. It still reads unmistakably as "at the computer".

## QA

All four watched as contact sheets and transcribed.

- **All four transcripts are word-perfect against the script.** No improvised narration, no
  stage directions read aloud.
- **All four said "BitPredict" correctly**, against two of three in batch 6. The hardened
  per-syllable pronunciation rule plus "with a small pause before it" appears to have fixed
  it. `c6` transcribes as "Bit Predict", which is the transcriber spacing a correct
  pronunciation, not a defect.

### One real defect, found and re-rolled

**`c6` roll 1 put a red Ralph Lauren polo player on the presenter's chest**, clearly legible
across most frames. That is a third-party trademark in a paid ad, which the global guardrail
forbids outright, and the prompt's own ban list already said "no brand marks or product logos
on anything, including clothing". The ban did not hold.

The fix is the same lesson as the phone screen and the brand mark: **prohibition alone does
not work, the prompt has to state positively what IS there.** The wardrobe is now specified as
"a completely plain heather-grey crew-neck t-shirt in a single flat colour, blank across the
whole chest: no motif, no emblem, no crest, no embroidery, no printed design, no pocket and
no lettering anywhere on the garment." Re-rolled at $7.04.

**Add a wardrobe check to video QA.** Every prior batch reviewed frames for on-screen text and
invented UI; nobody was checking clothing, and a polo shirt is exactly where the model reaches
for a logo.

### End cards

Every clip gets a 2.2s end card built from the real logo SVG plus `bitpredict.io` set in a
tall condensed grotesque ([`seedance-endcard.mjs`](seedance-endcard.mjs)). Two jobs: the brand
is legible even when spoken delivery is unreliable, and it is the free repair if a future take
garbles the name (mute the word, the card still says it). Final runtime 17.2s per clip.

## Banners: eight new propositions, eight new visual territories

Batch 6 was narrower than it looked. Five of its eight concepts were the same idea, the
receipt, restyled. These are eight different propositions:

| ID | Proposition | Headline | Visual territory |
|---|---|---|---|
| `b1` | challenge | YOU SAY YOU CALLED IT. PROVE IT. | brutalist **inversion**, flat white |
| `b2` | risk-free | BE WRONG. LOSE NOTHING. | Ben-Day pop-art halftone |
| `b3` | status | WHAT'S YOUR RANK? | Y2K liquid chrome |
| `b4` | track record | ANYONE CAN BE RIGHT ONCE. TWICE IS A RECORD. | VHS glitch |
| `b5` | mechanic | UP OR DOWN. 24 HOURS. THAT'S THE GAME. | oversized flat graphic |
| `b6` | argument | SETTLE IT. | graffiti and sticker bomb |
| `b7` | native | "i called it" / "sure you did" | torn cardboard sign |
| `b8` | native | PLEASE STOP TELLING US YOU CALLED IT | printed office notice |

`b1` inverts the brand's own near-black to flat white, which is the disruptive move available
to a dark-mode brand and one the VoiceDrop batch found worked. Because a white wordmark would
vanish on it, `b1` gets a **dark-ink variant of the same logo file** rather than a different
mark; the green geometric mark is unchanged, so recognition holds.

`b8` is the most Reddit-native thing in either batch: a passive-aggressive office notice with
a second hand's biro reply underneath. It is a format the platform's users post constantly.

## Claim safety

Unchanged and unrelaxed. No money, prize, USDT, payout or accuracy-percentage language in any
of the twelve assets, even though the site itself now carries prize copy in the hero.

A character saying "my accuracy is actually going up" (`c5`) is his own trajectory with no
number attached, and accuracy is the product's core mechanic. No figure is stated anywhere,
deliberately: none is published, and an invented one would read as a product statistic.

Every banner line traces to live site copy re-verified 2026-08-13: the receipt line to
`cultureCardsData.tsx`, "nothing to deposit, stake or wager" to `NotGamblingStrip.tsx`, the
leaderboard-ranked-on-accuracy line to `HeroSubheading.tsx`, "public track record" to
`CoinArticleEn.tsx`, the 24-hour window to `stepsData.ts`, and "No trading. No gambling. Just
verifiable skill." to `AboutHeading.tsx`.

## Spend

| Item | Cost |
|---|---|
| 4 clips, 15s, native 720p | $27.73 |
| 4 upscales to 1080p | ~$0.43 |
| 1 re-roll (`c6` wardrobe logo) + upscale | ~$7.04 |
| 11 banners, GPT Image 2, quality high | ~$2.20 |
| Transcription | ~$0.05 |
| **Total** | **~$37.5** |

Running total across both BitPredict batches: **~$68**.

## The three launch blockers are unchanged

Nothing here alters them: the Reddit ad account still has no approved card, the `sign_up`
pixel fix still needs a deploy plus one real Google signup, and the site's weekly USDT prize
copy still probably costs BitPredict the free-game exception under Reddit's gambling policy.
See `BATCH-2026-08-13-b6-bitpredict-reddit.md` and the vault's `reddit-ads-api-access.md`.
