# Deploy 2026-08-17 — the VoiceDrop short library to TikTok

Robby connected the VoiceDrop TikTok account to Postiz and asked for all of our shorts to
be scheduled on it. The same 13 videos that went to YouTube on 2026-08-13 are now queued
on TikTok, one per day from 18 to 30 August, publishing organically to the brand account.

This is the third home for this repo's video library: Meta (paid), YouTube plus Google Ads
(paid), and now TikTok (organic).

## Where it went

| | |
|---|---|
| Account | `VoiceDrop.ai`, Postiz integration `cmsxvsp3d09fft90yr50tahnk`, platform `tiktok-business` |
| Posts | 13, all `QUEUE`, one per day 2026-08-18 to 2026-08-30 at 17:00 UTC (1pm ET / 10am PT) |
| Posting method | `DIRECT_POST`, so Postiz publishes them. Not `UPLOAD`, which only drops the file in the app inbox and silently discards every other setting |
| AI disclosure | `video_made_with_ai: true` on all 13 |
| Branded content | `brand_organic_toggle: true` (own brand), `brand_content_toggle: false` (no paid partnership) |
| Interaction | duet, stitch and comments all on |
| Music | none added. Every clip carries its own diegetic audio and a TikTok library track would fight the burned-in captions |

Nothing was generated for this. Every file is an existing `-captioned.mp4` deliverable,
1080x1920, already watched and transcribed in its own batch.

## The 13 posts

Order alternates the 15-second UGC ads with the 30-second genre parodies so the feed does
not see the same register two days running, and holds the two most distinctive (the 8s
original UGC clip and the 60s Interstellar parody) for the back of the run.

| Date (UTC) | Title | Source file | Len | Postiz post |
|---|---|---|---|---|
| 08-18 | I Dialed Zero Numbers This Month | `voicedrop/2026-08-12-seedance-video/voicedrop-c48-never-dialed-once-1080p-captioned.mp4` | 15s | `cmsxw6eum01iqqi0ykoz3jkoy` |
| 08-19 | Cold Callers Anonymous | `voicedrop/2026-08-08-seedance-video/voicedrop-c39-cold-callers-anonymous-1080p-captioned.mp4` | 30s | `cmsxw6exs01irqi0y5fchdio2` |
| 08-20 | Ten Thousand Voicemails Before My Coffee | `voicedrop/2026-08-10-seedance-ugc-b4/voicedrop-c46-before-my-coffee-1080p-captioned.mp4` | 15s | `cmsxw6f1801isqi0yo62l1dhb` |
| 08-21 | They Called Back | `voicedrop/2026-08-09-seedance-video-b2/voicedrop-c42-callback-avalanche-1080p-captioned.mp4` | 30s | `cmsxw6f5a01itqi0ym1d6lmmt` |
| 08-22 | I Stopped Cold Calling Three Weeks Ago | `voicedrop/2026-08-09-seedance-ugc-b3/voicedrop-c45-ugc-watch-this-1080p-captioned.mp4` | 15s | `cmsxw6f9101iuqi0ymzjfojgy` |
| 08-23 | The Last Cold Caller | `voicedrop/2026-08-09-seedance-video-b2/voicedrop-c40-nature-documentary-1080p-fixed-captioned.mp4` | 30s | `cmsxw6fcd01ivqi0y6whwgnx7` |
| 08-24 | Another Callback | `voicedrop/2026-08-12-seedance-video/voicedrop-c49-another-callback-1080p-captioned.mp4` | 15s | `cmsxw6fg201iwqi0ylk43jxmd` |
| 08-25 | Exhibit 4: The Cold Call | `voicedrop/2026-08-09-seedance-video-b2/voicedrop-c43-museum-1080p-captioned.mp4` | 30s | `cmsxw6fjj01ixqi0y7d5r9vvd` |
| 08-26 | Your Reps Hate Dialling. Your Prospects Hate Answering. | `voicedrop/2026-08-10-seedance-ugc-b4/voicedrop-c47-they-hate-dialling-1080p-captioned.mp4` | 15s | `cmsxw6fne01iyqi0yfmme0eth` |
| 08-27 | Send One Hundred, Or A Million | `voicedrop/2026-08-09-seedance-video-b2/voicedrop-c44-warehouse-1080p-captioned.mp4` | 30s | `cmsxw6fqw01izqi0yqjrnh3f2` |
| 08-28 | I Stopped Cold Calling. Now They Call Me. | `voicedrop/2026-07-20-banners/voicedrop-ugc-vertical.mp4` | 8s | `cmsxw6fub01j0qi0yvua19qlp` |
| 08-29 | One Take: Your Voice, Thousands of Voicemails | `voicedrop/2026-08-09-seedance-video-b2/voicedrop-c41-recording-booth-1080p-captioned.mp4` | 30s | `cmsxw6fxf01j1qi0yamjht9vu` |
| 08-30 | Don't Leave Another Voicemail | `voicedrop/2026-08-09-interstellar-parody/voicedrop-interstellar-parody-vertical.mp4` | 60s | `cmsxw6g1401j2qi0yxfeh51hk` |

Titles are the ones already used on YouTube, so the same clip carries the same name on
both platforms.

**Not scheduled, deliberately:** `voicedrop-interstellar-TEMP-TRACK-reference-DO-NOT-SHIP.mp4`.
Same call as Meta and YouTube. It carries a commercially released recording with no sync
licence on file. The cut that ships (`voicedrop-interstellar-parody-vertical.mp4`) has a
cleared original score.

## Caption copy

Three lines per post: a hook drawn from the clip's own dialogue, then an approved product
line, then the CTA and `voicedrop.ai`, then four hashtags.

Every product claim is from the approved bank already used on Meta, YouTube and the site:
"Stop chasing leads. Let them call you.", "Manual cold calling is obsolete.", "Send
thousands of ringless voicemails instantly.", "Turn dialing into inbound calls.", "Your
voice, thousands of voicemails.", "Clone your voice from a 30-second recording, then drop
it to your whole list.", "Ringless voicemail at any volume.", "Record once, send
thousands.", "$20 in free credits, about 200 voicemails. 7-day trial, cancel anytime."

The `$20 in free credits` line appears only on the four clips that say it out loud (C46,
C47, C48, C49), so caption and audio never disagree.

Hook lines are character dialogue, not product claims: "412 cold calls yesterday. Two
answers. One was a fax machine." is Dave describing his own week, the same reasoning
recorded in the C39 batch README.

**Kept out:** the 9%+ callback rate (only usable with its Trustpilot attribution, which does
not fit a caption), the SOC 2 claim, and the lander-only figures (23%, 5 hours, $95/month).
The 7-day trial wording matches the site, not the "5-day" wording still live on three older
Google ads.

## The AI-disclosure gap is closed here

The YouTube deploy left the AI-content disclosure unset, because Postiz's YouTube schema does
not expose the toggle and it has to be flipped per video in Studio. TikTok's schema does
expose it, so `video_made_with_ai: true` is set on all 13. Meta has carried
`self_ai_disclosure: OPT_IN` on this creative since batch 3. TikTok and Meta now declare it;
YouTube is still the only surface where it is outstanding.

## Two things left open

1. **Video privacy cannot be set through the API.** The TikTok Business API has no privacy
   field for video posts, so the `privacy_level` Postiz sends is discarded and each video
   publishes at the account's own default. Confirm the VoiceDrop.ai account default is
   public in the TikTok app before 18 August, or the first post lands private.
2. **The account has no posting history.** Standard practice on a cold TikTok account is a
   few days of warmup before the first post. 13 posts over 13 days at one a day is inside
   TikTok's own 1 to 4 per day guidance, but the first few may read as a cold start.

## Notes for the next run

- **TikTok pulls media from its own verified domain, so every file has to go through Postiz
  first.** `uploadFromUrlTool` against the raw GitHub URL on this repo (public, `main`
  branch) returns a `uploads.postiz.com` path, and that is what goes in `attachments`.
  Passing a raw GitHub URL straight into the post fails the upload-domain check.
- **`DIRECT_POST` versus `UPLOAD` is the whole ballgame.** `UPLOAD` does not publish, it
  drops the file into the app inbox for someone to finish by hand within 24 hours, and it
  silently discards the AI label, the branded-content toggles and the interaction settings.
- All 13 scheduled in one `integrationSchedulePostTool` call and verified afterwards with
  `postsListTool` over the window. As on YouTube, Postiz reports state but never a provider
  permalink, so TikTok video IDs have to be recovered from the platform side.
