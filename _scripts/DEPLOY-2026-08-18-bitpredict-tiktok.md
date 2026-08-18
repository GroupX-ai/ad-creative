# Deploy 2026-08-18 — the BitPredict ad library to TikTok

Robby connected a new BitPredict TikTok profile to Postiz and asked for two weeks of
posts scheduled on it, drawn from the ads already built. Nine posts are queued from 19
August to 1 September: five video ads and four photo posts made from the banner library.

This is the second organic TikTok home for this repo's creative, after
[VoiceDrop on 2026-08-17](DEPLOY-2026-08-17-voicedrop-tiktok.md), and the first time
BitPredict creative has run anywhere. Both prior BitPredict batches were built for Reddit
and have never launched, because the Reddit ad account is still blocked on three things
(no approved card, the `sign_up` pixel, and the site's USDT prize copy). None of those
block an organic TikTok post, so the creative is no longer sitting idle.

## Where it went

| | |
|---|---|
| Account | `BitPredict`, Postiz integration `cmsxwwoci08ehmt0y422p2qqa`, platform `tiktok-business` |
| Posts | 9, all `QUEUE`, 2026-08-19 to 2026-09-01 at 17:00 UTC (1pm ET / 10am PT) |
| Posting method | `DIRECT_POST` on all nine, so Postiz publishes them |
| AI disclosure | `video_made_with_ai: true` on all five videos. **Not available for photo posts**, see below |
| Branded content | `brand_organic_toggle: true` (own brand), `brand_content_toggle: false` (no paid partnership) |
| Interaction | comments on everywhere; duet and stitch on for video (TikTok has no such setting for photos) |
| Music | none on video, the clips carry dialogue and burned captions. Photo posts get a chosen commercial-library track rather than `autoAddMusic`, which attaches a random one |

## The schedule

Video and photo alternate, so the feed never sees two of the same format running. All
five videos are 1080x1920 with burned one-word captions.

| Date (UTC) | Type | Title | Source |
|---|---|---|---|
| 08-19 | video | I Made All My Crypto Calls Public. Worst Idea Ever. | `c4-worst-idea-ever-loud` (b7) |
| 08-21 | photo | Everyone Called The Top. Nobody Has The Receipt. | `r6-whiteboard` |
| 08-22 | video | I Just Locked A Crypto Call I'm Going To Regret | `c7-just-locked-it` (b7) |
| 08-24 | photo x3 | You Say You Called It. Prove It. | `b1-prove-it`, `r1-screenshot`, `b8-office-notice` |
| 08-25 | video | I Genuinely Thought I Was Good At Crypto | `c6-humbling` (b7) |
| 08-27 | photo | I Called It. Sure You Did. | `b7-cardboard-sign` |
| 08-28 | video | Three Weeks Of Public Crypto Calls. I'm Getting Destroyed. | `c5-three-weeks-in` (b7) |
| 08-30 | photo x3 | Up Or Down. 24 Hours. That's The Game. | `b5-up-or-down`, `b3-whats-your-rank`, `b2-be-wrong-lose-nothing` |
| 09-01 | video | My Crypto Calls Are All Public Now | `c3-worst-idea-ever` (b6) |

`c4` opens the run because it is Robby's own script, the one he pulled out of batch 6 as
the only good one, rebuilt at the energy he asked for. `c3` is that same premise in its
original batch-6 take and closes the run, thirteen days later, so the two never sit near
each other.

## What was deliberately left out

- **`c1-that-group-chat` and `c2-screenshot-or-it-didnt-happen`.** Robby's verdict on
  batch 6 was "the third video ad is the only decent one". Those are the other two. A new
  brand account is the wrong place for creative its owner has already passed on. That is
  also why the run is nine posts and not fourteen: the usable library is five clips, not
  seven.
- **`r8-legal-pad`.** It reads "My crypto calls are ~~public~~ public / this was a
  mistake": the struck-out word and its replacement are the same word, so the joke lands
  as a typo. The batch-6 QA recorded all eleven banners as passing, which was wrong on this
  one. Not scheduled, and worth a re-roll before it runs anywhere.
- **The seven remaining banners.** Nine posts is the right density for a cold account; the
  rest are held for the next run rather than spent filling days.

## Two production fixes shipped with this

Both are in the commit that precedes this doc.

1. **`c3` had no captions.** Robby's round-3 instruction ("add subtitles, 1 word, centre")
   landed after batch 6 shipped, so `c3` was the last BitPredict ad without them. Burned
   with the same `seedance-captions.mjs` pipeline and the same three emphasis tiers, so it
   matches the batch-7 four. 40 words, 7 emphasised, brand word on the top tier.

2. **All four batch-7 captioned clips were burning a caption over their own end card.** The
   final word of each ("FREE", "ONE", "FREE", "STAKE") was held past the end of speech and
   landed on top of the BitPredict wordmark for roughly the first half-second of the 2.2s
   end card. The end card exists *because* the model cannot be trusted to pronounce
   "BitPredict", so covering the wordmark defeats its only purpose. Repaired at $0 by
   splicing the clean end card from the uncaptioned master (cut at 15.1s, where the scene
   change is) back over the captioned video. Captions before that point are untouched,
   audio is unchanged, verified frame by frame on all four.

   **Root cause for the next batch:** `seedance-captions.mjs` holds each word until the next
   one starts, capped at `w.end + 0.6`, with no knowledge of where the end card begins. Any
   clip whose last word lands within 0.6s of the end-card cut will do this again. The
   durable fix is to clamp caption end times to the end-card start; this run did not change
   the shared script because the splice was lower risk mid-deploy.

## Claim safety

BitPredict's hard rule bans every promise or implication of financial gain, **including the
site's own USDT, prize and payout copy**. Nothing in the nine captions mentions money,
prizes, winnings, payouts, returns or an accuracy percentage.

Every claim was re-verified against the live `BitPredict-Marketing` source on 2026-08-18,
per the playbook's own warning that the copy bank has already drifted once:

- "No trading. No gambling. Just verifiable skill." — `AboutHeading.tsx`
- "Every call locks a time-stamped receipt at its own public link. No edits after lock." — `cultureCardsData.tsx`
- "nothing to deposit, stake, or wager" — `NotGamblingStrip.tsx`
- 24-hour window — `stepsData.ts`, `faqData.ts`
- "Make a Prediction" / "Check Leaderboard" — `MakeCallCard.tsx`, `LeaderboardButton.tsx`

The site's prize copy has spread further since batch 7 (there is now a whole `/rewards`
page with a payout countdown). It stays out of the creative regardless.

## Four things left open

1. **Video privacy cannot be set through the API.** Same as VoiceDrop: the TikTok Business
   API has no privacy field for video posts, so the `privacy_level` Postiz sends is
   discarded and each video publishes at the account's own default. **Confirm the BitPredict
   account default is public in the TikTok app before 19 August**, or the first post lands
   private. Photo posts do honour `privacy_level`, so those are set to public explicitly.

2. **TikTok has no AI-content label for photo posts.** `video_made_with_ai` is video-only,
   and all eight banners were generated with GPT Image 2. The five videos declare it; the
   four photo posts cannot through the API, and would have to be labelled by hand in the
   app. This is the same class of gap as YouTube's on the VoiceDrop run.

3. **The banners are square, not vertical.** They were built 1024x1024 for Reddit, so TikTok
   will letterbox them in a 9:16 frame rather than filling it. Acceptable and normal for a
   photo post, but a 1080x1920 re-render of the winners would be the better asset. About
   $0.20 per image on GPT Image 2.

4. **The account is cold.** No posting history, and nine posts over fourteen days is inside
   TikTok's 1-to-4-per-day guidance, but the first few will read as a cold start.

## Notes for the next run

- **TikTok pulls media from its own verified domain**, so every file goes through
  `uploadFromUrlTool` first. Raw GitHub URLs work against this public repo; use the **commit
  SHA** rather than the branch name in the path, because this branch name contains a slash
  and would otherwise be ambiguous with the file path.
- All nine were scheduled in one `integrationSchedulePostTool` call and verified afterwards
  with `postsListTool`. Postiz reports state but never a provider permalink, so TikTok video
  IDs have to be recovered from the platform side.
- `seedance-captions.mjs` needs `Pillow` and `imageio-ffmpeg` installed in the session, and
  fails with an unhelpful `ModuleNotFoundError` buffer dump if either is missing.
