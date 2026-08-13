# Batch 6 — 2026-08-13 — BitPredict on Reddit (11 banners + 3 videos, ~$30)

Robby's brief: "Can we start running funny, engaging, and disruptive Reddit ads for
BitPredict? I want to start running ads on it (banners, videos)."

First creative built for **Reddit** rather than Meta, and the first BitPredict video ads.

Assets: `bitpredict/2026-08-13-reddit/` (banners) and
`bitpredict/2026-08-13-reddit-video/` (video).
Prompts: [`seedance-prompts-b6-bitpredict.mjs`](seedance-prompts-b6-bitpredict.mjs)
and `bitpredict/2026-08-13-reddit/_work/gen-banners.mjs`.

## The creative bet

Reddit's crypto communities run on one recurring argument: who actually called a move,
and who is claiming it afterwards. That argument **is** BitPredict's product mechanic, so
the joke and the pitch are the same sentence. It also means none of the creative needs the
money language the brand bans.

Two style families, the two that have ever been picked from this repo, and nothing in the
polished-corporate middle:

| | Concepts | Why |
|---|---|---|
| Loud direct-response | r1, r2, r3, r4, r5 | hazard tape, brutalist type, ransom-note collage |
| Native / organic | r6, r7, r8 | reads as a real photo, the family Robby called "best by far" on VoiceDrop |

Reddit sharpens the native bet further than Meta does: an ad is a post, the comments are
public and attached, and anything that looks like advertising gets taken apart in them.

## The banners

All square 1024x1024; r1-r3 also landscape 1200x628. `banners/` carries the composited
logo, `banners-nologo/` the clean render.

| File | Headline | Sub | CTA |
|---|---|---|---|
| `r1-screenshot-or-it-didnt-happen` | SCREENSHOT OR IT DIDN'T HAPPEN | Every call locks a time-stamped public receipt. | Make a Prediction |
| `r2-everyone-called-it` | EVERYONE CALLED IT. NOBODY LOGGED IT. | No trading. No gambling. Just verifiable skill. | Make a Prediction |
| `r3-trust-me-bro` | SOURCE: TRUST ME BRO (struck through) / PUBLIC RECEIPT | No edits after lock. | Make a Prediction |
| `r4-no-trading-no-gambling` | NO TRADING. NO GAMBLING. JUST VERIFIABLE SKILL. | Call BTC, ETH and SOL up or down over 24 hours. | Check Leaderboard |
| `r5-pay-to-be-right` | OTHER MARKETS MAKE YOU PAY TO BE RIGHT. THIS ONE IS FREE. | Nothing to deposit. Nothing to stake. | Make a Prediction |
| `r6-whiteboard` | everyone called the top. / nobody has the receipt. | hand-lettered, phone-shot | — |
| `r7-sticky-note` | screenshot or it didn't happen | sticky note on a monitor bezel | — |
| `r8-legal-pad` | my crypto calls are public / this was a mistake | ballpoint on a legal pad | — |

## The videos

15s, native 720p, upscaled to 1080p, 9:16, UGC selfie, brand held to the final third.

| File | Hook formula | Closing line |
|---|---|---|
| `c1-that-group-chat` | direct callout | "BitPredict. It's free and there's nothing to stake." |
| `c2-screenshot-or-it-didnt-happen` | myth-flip on a native Reddit phrase | "It's free. Go call one." + branded end card (17.3s, see QA) |
| `c3-worst-idea-ever` | confession (Motion-validated) | "BitPredict. No trading, no gambling, and it's free." |

## The fabricated-logo defect is fixed properly this time

The 2026-08-03 Reddit audit found that **nearly every generated banner in this repo carries
an invented brand mark**, and three live ads were paused for it. The cause was handing the
model a text description of the logo and letting it draw its own.

This batch does not describe the logo at all. Every prompt **forbids brand marks outright**,
and the real mark is composited afterwards from BitPredict-Marketing's own
`src/assets/icons/common/Logo.tsx`, rendered to PNG via cairosvg
(`_work/composite-logo.py`). Verified by eye on all 11: green geometric mark plus white
"BitPredict" wordmark, matching the source file.

Native/organic frames get the logo small and bottom-right on a dark plate; a top-centre
wordmark on a photograph reads as an advert instantly. `banners-nologo/` keeps the clean
versions, which is the better choice on Reddit where the post is already branded with the
author handle.

## Claim safety

BitPredict's hard rule bans every promise or implication of financial gain in paid creative,
**including the site's own USDT, prize, reward and payout copy**. Nothing in this batch
mentions money, prizes, winnings, payouts or returns. No accuracy percentage appears
anywhere, deliberately: no such figure is published, and a character's own hit rate would
read as one.

Everything used traces to live site copy, re-verified against the repo on 2026-08-13:

- "No trading. No gambling. Just verifiable skill." — `AboutHeading.tsx`
- "No edits after lock." — `About.tsx`
- "Every call locks a time-stamped receipt at its own public link." — `cultureCardsData.tsx`
- "nothing to deposit, stake, or wager" — `NotGamblingStrip.tsx`
- "the free, skill-based alternative" to Polymarket/Kalshi — `WhyBitPredict.tsx`
- 24-hour window — `stepsData.ts`, `faqData.ts`
- CTA labels "Make a Prediction" / "Check Leaderboard" — `MakeCallCard.tsx`, `LeaderboardButton.tsx`

**The hero subheadline has drifted since the playbook was written** and now ends "the most
accurate callers win real USDT prizes each week". That is squarely inside the ban, so the
approved-copy bank in `BitPredict-Marketing/AD-CREATIVE-PLAYBOOK.md` should be re-read
rather than trusted from memory. It also has a Reddit policy consequence, below.

## QA

Every clip watched as a 10-still contact sheet and transcribed. Every banner reviewed at
full size for spelling, invented text, invented badges and third-party logos.

- **All 11 banners passed.** Correct spelling throughout, no feature chips, no invented
  badges, no exchange logos, no fabricated brand marks. The r4 leaderboard renders medals
  and bars with no names or numbers, per the guardrail.
- **c1 and c3 transcribed word-perfect**, brand name correct, no improvised narration and no
  stage directions read aloud. c1 says "Mine locked now" for the scripted "Mine lock now",
  which still parses and was left alone.
- **c2 failed the brand name on both rolls, and was repaired for $0.** Roll 1 said
  **"BitProtect"**, roll 2 said **"Bitpropt"** even with the hardened rule. Each was
  confirmed across three independent engines (ElevenLabs scribe-v2, Whisper, Wizper) before
  being called a defect, per the proper-noun rule.

### c2: two failed rolls, then the $0 repair

A third re-roll would have been another ~$7 on a word that had already failed twice, so the
playbook's no-cost repairs were used instead. Word timings put the bad word at 11.60-12.14
with silence either side (10.30-11.60 and 12.14-12.78), so **muting 11.45-12.40 puts both
boundaries inside existing speech gaps and the edit is inaudible**. The clip now reads
"...somewhere I can't edit them. It's free. Go call one," verified by re-transcription.

That leaves c2 with no spoken brand, so it gets **a 2.2s branded end card** built from the
real logo SVG (`_work/endcard.png`, near-black ground, wordmark, neon green rule), appended
with ffmpeg. Final runtime 17.3s. This is the same resolution batch 2 prescribed for
`emailchaser-c16`, done rather than deferred.

The unrepaired takes were not kept, to save ~36 MB; the transcripts above are the record.
The visuals were never the problem on either roll: parked car, real overcast light, strong
pointing performance, no on-screen text and no invented graphics in any frame.

### The pronunciation rule needed hardening again

This is the fourth compound brand name to be mispronounced across six batches ("One look",
"Email Chacha", "Email Chaper", now "BitProtect"). The v1 rule for this batch already
carried a rhyme anchor and still failed, so the rule now anchors **each syllable to a
separate everyday word** rather than rhyming the whole word:

> "predict" ... the first syllable is "pre" as in the word **prepare**, and the second is
> "dict" as in the word **dictionary**, carrying the stress. Sound the letter t at the end.

Still positive-only, never naming the wrong version, per the banner lesson that negative
instructions produce the thing being forbidden. c1 and c3 rendered correctly under the
weaker v1 wording and were not re-rolled.

**But the hardened rule did not save c2 either**, so the honest conclusion is that prompt
wording alone does not reliably control this and **"BitPredict" should be treated as a
brand name the model cannot be trusted to say.** For the next batch, plan the brand into an
end card from the start and keep it out of the spoken script, which costs nothing and
removes the failure mode entirely. Two of three clips saying it correctly is a coin flip,
not a fix.

The scripted line was also changed from "after the fact" to "in hindsight", since the
former was heard as "after the effect" on every engine.

## Spend

| Item | Cost |
|---|---|
| 11 banners, GPT Image 2, quality high | ~$2.20 |
| 3 clips, 15s, native 720p | $20.80 |
| 3 upscales to 1080p | ~$0.32 |
| 1 re-roll (c2 brand name) + upscale | ~$7.04 |
| Transcription, 5 passes across 3 engines | ~$0.05 |
| **Total** | **~$30.4** |

## Nothing here can run yet: three blockers

Verified live against the Reddit Ads API and the ad account on 2026-08-13.

1. **No payment card.** Funding instrument `1935304` reads `is_servable: false` with
   `CREDIT_CARD_NOT_APPROVED` and `CREDIT_LINE_EXHAUSTED`. The campaign shell
   (`2557856106149115257`, $15/day, PAUSED) has existed since 2026-08-01 and cannot spend.
   Robby's action, nobody else can do it.

2. **The `sign_up` pixel has never fired**, so Reddit will refuse to create a
   conversion-optimised ad group at all (proved by controlled test on 2026-07-30, and
   `CLICKS` is not an allowed fallback under the standing conversion-campaign rule).
   `page_visit` fires fine, most recently 2026-08-13T13:27Z.

   **Root cause confirmed, not inferred.** Only the email/password form calls the
   conversion, and Mixpanel shows 40 signups in the 30 days to 2026-08-13 split **33
   google / 6 email / 1 wallet** — with every one of the 6 email signups landing on
   2026-07-24, before the pixel deployed on 07-31. So since the pixel went live, 100% of
   real signups have come through paths that never reported a conversion. Fixed in
   `GroupX-ai/BitPredict-App` on this branch: the Google and wallet signup branches now
   return `isNewAccount` and the browser fires Reddit, Meta and TikTok on it. Needs a
   deploy and one real Google signup before the ad group can be created.

3. **The landing page probably disqualifies BitPredict from Reddit's free-game exception.**
   Reddit's gambling policy triggers on "any game of skill or chance ... where money or
   other items of value are **exchanged** or at stake", and exempts "games that are free and
   where no money or other items of value are exchanged or at stake". BitPredict takes
   nothing from users, but it pays weekly USDT prizes, and USDT is an item of value being
   exchanged. Reddit reviews the landing page, not just the ad, and bitpredict.io promises
   prizes in the hero, the footer, the pricing section and the "not gambling" strip.

   Clean ad copy does not solve this on its own. Either the prize promise comes off the
   page, or BitPredict goes through a Reddit sales representative, which the restricted
   bucket requires. Unverified how Reddit's reviewers actually classify it; the
   discriminating test is submitting one ad and reading which policy a rejection cites.

Reddit's crypto policy itself is **not** a blocker: the restricted list covers products
where users transact (exchanges, wallets, staking, lending, NFTs), and general
"cryptocurrency related services" are explicitly exempt from the sales-rep requirement.

**All three videos and all eleven banners are equally usable on Meta and TikTok**, whose
pixels are already installed in the same app, so the creative is not stranded if Reddit
turns out to need a rep.
