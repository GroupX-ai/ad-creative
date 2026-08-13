# Deploy 2026-08-13 — the VoiceDrop video library to YouTube and Google Ads

Robby added the VoiceDrop YouTube channel to Postiz and asked for the video ads to be
uploaded and put into Google Ads. Every shippable VoiceDrop video ad in this repo (13 of
them, batches 1 to 5 plus the Interstellar parody) is now live on the channel and wired
into the live Google Ads cold campaign as **paused** ads.

This is the first time this repo's creative has run anywhere other than Meta.

## Where it went

| | |
|---|---|
| YouTube channel | `@voicedrop-ai` (`UCXS0_Mr8HQtZkO6Do9bW83w`), via the Postiz integration `cmss08czg035bqb0ysan4x6nb` |
| Google Ads account | VoiceDrop `7171404080` (MCC `3410674045`) |
| Campaign | `23147031812` "YouTube - Cold 1.2", DEMAND_GEN, MAXIMIZE_CONVERSIONS, **ENABLED**, $7.83/day |
| Ad group | `201727686390` "Cold: Business + Finance + Real Estate - 3.0", ENABLED |
| Ad status | **All 13 PAUSED**, per the standing "build paused, Robby flips live" rule |
| Destination | `https://www.voicedrop.ai/` |

No campaign was created and no budget was touched, so this deploy adds **$0/day** of new
spend until Robby enables the ads.

**Why Demand Gen and not a video campaign.** Google Ads API v23 can no longer create
VIDEO campaigns; YouTube video inventory now sits inside DEMAND_GEN. The account's only
other video home, `23832463843` "Video View Campaign" (TARGET_CPV, $27.24/day), has all
three of its VIDEO_RESPONSIVE ad groups paused, so it would have been a dead end.
"YouTube - Cold 1.2" is the live cold YouTube campaign and already carries ~34 Demand Gen
video ads, which makes these a like-for-like test rather than a new experiment.

## The 13 ads

Every file is the `-captioned.mp4` deliverable (one-word burned-in captions), 1080x1920
vertical. YouTube classified all 13 as **Shorts**, since every one is vertical and under
60 seconds.

| # | Concept | Source file | Len | YouTube | Video asset | Ad ID |
|---|---|---|---|---|---|---|
| 1 | UGC Vertical | `voicedrop/2026-07-20-banners/voicedrop-ugc-vertical.mp4` | 8s | [`KNO25fWElMc`](https://www.youtube.com/watch?v=KNO25fWElMc) | 407401405766 | 820851351811 |
| 2 | C39 Cold Callers Anonymous | `2026-08-08-seedance-video/` | 30s | [`HRTYPoPOV-c`](https://www.youtube.com/watch?v=HRTYPoPOV-c) | 407401421486 | 820809238284 |
| 3 | Interstellar Parody | `2026-08-09-interstellar-parody/voicedrop-interstellar-parody-vertical.mp4` | 59.6s | [`QHSm7hs2CsM`](https://www.youtube.com/watch?v=QHSm7hs2CsM) | 407401426991 | 820851376318 |
| 4 | C40 The Last Cold Caller | `2026-08-09-seedance-video-b2/` | 30s | [`6wm54g39vX0`](https://www.youtube.com/watch?v=6wm54g39vX0) | 407401438007 | 820851011935 |
| 5 | C41 One Take (recording booth) | `2026-08-09-seedance-video-b2/` | 30s | [`5wdgocdoU_A`](https://www.youtube.com/watch?v=5wdgocdoU_A) | 407576768082 | 820851382789 |
| 6 | C42 They Called Back | `2026-08-09-seedance-video-b2/` | 30s | [`4Lit32c4W2E`](https://www.youtube.com/watch?v=4Lit32c4W2E) | 407500187980 | 820851381757 |
| 7 | C43 Exhibit 4 (museum) | `2026-08-09-seedance-video-b2/` | 30s | [`nMZByWlwmiY`](https://www.youtube.com/watch?v=nMZByWlwmiY) | 407401499912 | 820923589898 |
| 8 | C44 One Hundred, Or A Million | `2026-08-09-seedance-video-b2/` | 30s | [`2yk7IK2EojM`](https://www.youtube.com/watch?v=2yk7IK2EojM) | 407401512800 | 820809279819 |
| 9 | C45 Watch This | `2026-08-09-seedance-ugc-b3/` | 15s | [`yanN0QtEWOk`](https://www.youtube.com/watch?v=yanN0QtEWOk) | 407401521560 | 820809288462 |
| 10 | C46 Before My Coffee | `2026-08-10-seedance-ugc-b4/` | 15s | [`Okt6pFXW55A`](https://www.youtube.com/watch?v=Okt6pFXW55A) | 407401522670 | 820924321334 |
| 11 | C47 They Hate Dialling | `2026-08-10-seedance-ugc-b4/` | 15s | [`bCaiaCAjER4`](https://www.youtube.com/watch?v=bCaiaCAjER4) | 407401554107 | 820924298300 |
| 12 | C48 I Dialed Zero | `2026-08-12-seedance-video/` | 15s | [`DiOtXRzSFlk`](https://www.youtube.com/watch?v=DiOtXRzSFlk) | 407500251478 | 820851392596 |
| 13 | C49 Another Callback | `2026-08-12-seedance-video/` | 15s | [`3n1INmbu1U4`](https://www.youtube.com/watch?v=3n1INmbu1U4) | 407500283224 | 820851335728 |

**Not uploaded, deliberately:** `voicedrop-interstellar-TEMP-TRACK-reference-DO-NOT-SHIP.mp4`.
It carries a commercially released recording with no sync licence on file. That was already
the rule for Meta, and YouTube is stricter: Content ID fingerprints that catalogue and a
match on a brand channel is a claim or a strike, not a quiet mute.

## On-ad copy (identical across all 13 unless noted)

Every line traces to the marketing site or the VoiceDrop `AD-CREATIVE-PLAYBOOK.md`
approved-copy bank.

- **Headlines:** "Stop Chasing Leads" / "Let Them Call You" / "Manual Cold Calling Is
  Obsolete" / "Ringless Voicemail at Any Volume" / "Get Free Access"
- **Long headlines:** "Stop Chasing Leads. Let Them Call You." / "Manual cold calling is
  obsolete. Send thousands of ringless voicemails instantly."
- **Descriptions:** "Send thousands of ringless voicemails instantly. Turn dialing into
  inbound calls." / "Clone your voice from a 30-second recording, then drop it to your
  whole list." / "$20 in free credits, about 200 voicemails. 7-day trial, cancel anytime."
- **Business name** VoiceDrop · **logo** asset 301509529591 · **CTA** asset 300179373581
  (START_NOW), all reused from the ad group's existing ads.

Two ads carry copy matched to their own video instead: **C41** leads on "Your Voice.
Thousands of Voicemails." and "Clone Your Voice in 30 Seconds"; **C44** leads on "Send 100
or 1,000,000 Drops". The **Interstellar** ad leads on "Stop Cold Calling" and "Record Once.
Send Thousands.", which is the film's own end card.

No callback rate, no SOC-2 claim, no lander-only figures (23%, 5 hours, $95/month). The
9%+ figure stays out because it is only usable with its Trustpilot attribution line, which
does not fit a Demand Gen headline.

**Copy conflict found in the account, not fixed here.** The three ads already live in this
ad group describe a "5-day free trial" ("Try it free for 5 days", "Start with your 5-day
free trial"). Site-wide copy is a **7-day trial with $20 in free credits** (`CtaBand.tsx`,
`SoftwareStepper.tsx`, every ad lander). The new ads use the site's 7-day wording, so the
ad group now contains both numbers. Worth correcting the older three.

## YouTube upload settings

- **Public**, matching the 35 ad Shorts already public on this channel (plus its long-form
  tutorials), and matching the three ads already running in this ad group. Unlisted was the
  first instinct, but Postiz cannot report back a published video's ID and unlisted videos
  are invisible to every read path, so an unlisted upload cannot be wired into Google Ads
  without someone pasting 13 links by hand.
- Not made for kids. Tags: ringless voicemail, voicemail drop, cold calling, sales
  automation, voicedrop (C41 swaps in "ai voice clone").
- Description is the approved hero pair plus `https://voicedrop.ai`.

## Two things left open

1. **The AI-content disclosure is not set.** All 13 are fully AI-generated video with
   realistic people, which YouTube's altered-or-synthetic-content policy expects to be
   disclosed at upload. Postiz's YouTube schema exposes only title, visibility,
   made-for-kids, thumbnail and tags, so the toggle could not be set through it. It has to
   be switched on per video in YouTube Studio. The Meta equivalent (`self_ai_disclosure:
   OPT_IN`) has been set on every one of these creatives since batch 3, so this is the
   same declaration, just on a platform the tooling cannot reach.
2. **One stray unlisted duplicate.** The first upload, "Another Callback", went up unlisted
   while the visibility question was still open, before the public copy (`3n1INmbu1U4`)
   replaced it. It is not wired to anything. Delete it in YouTube Studio.

## Notes for the next run

- **YouTube RSS and the channel Videos tab both miss Shorts entirely.** Neither showed any
  of the 13 uploads. The InnerTube browse endpoint against the Shorts tab
  (`params=EgZzaG9ydHPyBgUKA5oBAA%3D%3D`) returned all 13 with titles within a couple of
  minutes, and is how the video IDs were recovered. Any future vertical batch needs that
  path, not the feed.
- **Postiz publishes but does not report back.** `postsListTool` gives state, never the
  provider permalink, and `ask_postiz` confirms there is no tool for it. Plan on
  recovering IDs from the platform side.
- Raw GitHub URLs on this repo work as the upload source for Postiz exactly as they do for
  Meta, since the repo is public.
- Two Google Ads writes failed transiently (one `TRANSIENT_ERROR` on the logo asset, one
  60s timeout) and both succeeded on a plain retry. Verify the ad group's contents by
  listing before retrying, so a timeout does not become a duplicate ad.
