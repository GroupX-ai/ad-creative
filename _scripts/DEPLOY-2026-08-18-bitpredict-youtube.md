# Deploy 2026-08-18 — the BitPredict video library to YouTube

Robby connected a new BitPredict YouTube channel to Postiz and asked for lots of videos on
it. All 13 shippable BitPredict video ads are now queued: the five batch-6/7 confession
clips plus the eight batch-10 crazy/parody/UGC clips. Every file is the `-captioned.mp4`
deliverable, 1080x1920 vertical and under 60 seconds, so YouTube will classify all of them
as Shorts, the same as the VoiceDrop channel did.

This is the third surface for the BitPredict library in one day: TikTok (organic, daily),
Reddit (paid, loaded but paused), now YouTube (organic).

## Where it went

| | |
|---|---|
| Channel | `BitPredict`, Postiz integration `cmsyl098x00h5o00yubrfx17j`, platform `youtube` |
| Posts | 13, all `QUEUE`, all **public**, not made for kids |
| Seed | 5 today (2026-08-18), 14:00 to 15:00 UTC, 15 minutes apart, so the new channel is populated within the hour |
| Drip | 8 more, one per day at 16:30 UTC, 2026-08-19 to 2026-08-26 |
| Tags | crypto, bitcoin, crypto prediction, bitpredict, plus ethereum/solana alternating |
| Titles | identical to the TikTok titles, per the VoiceDrop convention: the same clip carries the same name everywhere |

The seed is the five older confession clips (c4, c5, c6, c7, c3); the daily drip is the
eight batch-10 clips in the same order as their TikTok run, so YouTube leads or matches
TikTok on each clip, matching the VoiceDrop precedent where YouTube went first.

Descriptions are the vetted TikTok caption copy without hashtags: the clip's own hook, one
approved claim, and `https://www.bitpredict.io`. No money, prize, USDT or percentage
language anywhere; nothing new was written for this deploy.

## The 13 posts

| Date (UTC) | Title | Postiz post |
|---|---|---|
| 08-18 14:00 | I Made All My Crypto Calls Public. Worst Idea Ever. | `cmsyl7kll002hp70yxqglj7ad` |
| 08-18 14:15 | Three Weeks Of Public Crypto Calls. I'm Getting Destroyed. | `cmsyl7kqs002ip70yzt7nnmee` |
| 08-18 14:30 | I Genuinely Thought I Was Good At Crypto | `cmsyl7kvs002jp70yzejtvfys` |
| 08-18 14:45 | I Just Locked A Crypto Call I'm Going To Regret | `cmsyl7kzw002kp70y1cryp6sk` |
| 08-18 15:00 | My Crypto Calls Are All Public Now | `cmsyl7l4i002lp70y2geavn7g` |
| 08-19 | Stop Telling People You Called That Crypto Move | `cmsyl7l8o002mp70yvxkeov3i` |
| 08-20 | It's 2AM And I Was Right About Crypto | `cmsyl7lde002np70yq59silsu` |
| 08-21 | You Say You Called The Crypto Top. Prove It. | `cmsyl7lhb002op70yr3puidvr` |
| 08-22 | I Was Right About Crypto And There Is A Link | `cmsyl7lu3002pp70yl2u4gecw` |
| 08-23 | Did You Call The Crypto Top? | `cmsyl7lyh002qp70y43xjxgq7` |
| 08-24 | I Pulled Off The Road To Make A Crypto Call | `cmsyl7m2g002rp70y7ybxw92x` |
| 08-25 | He Is Calling Crypto. He Is Going Up. | `cmsyl7m6a002sp70yc5ky2tm3` |
| 08-26 | I Did Call That Crypto Move. Look. | `cmsyl7ma5002tp70yx0b54vtp` |

## Two things left open

1. **The AI-content disclosure cannot be set through Postiz.** Same gap as the VoiceDrop
   YouTube deploy: the schema exposes only title, visibility, made-for-kids, thumbnail and
   tags, and all 13 are fully AI-generated video with realistic people. The toggle has to
   be switched on per video in YouTube Studio after each publishes. TikTok and Meta carry
   the declaration on this creative already; YouTube is the only surface where it is manual.
2. **Postiz never reports the published YouTube video IDs**, so if these are later wired
   into Google Ads (the VoiceDrop pattern), the IDs have to be read from the channel side.

## Notes for the next run

- The media was NOT re-uploaded: the same `uploads.postiz.com` attachments from today's
  TikTok scheduling were reused across integrations, which works and halves the upload step.
- Public, not unlisted, for the same reason as VoiceDrop: Postiz cannot read back an
  unlisted video's ID, so unlisted uploads cannot be wired into anything afterwards.
