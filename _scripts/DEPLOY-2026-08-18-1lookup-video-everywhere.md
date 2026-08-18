# Deploy 2026-08-18 — the 1Lookup video library to TikTok, Meta and Reddit, plus batch 12

Robby added the 1Lookup YouTube and TikTok channels to Postiz and asked for three things:
every video ad published organically on both channels, every video ad present in the Meta,
Google and Reddit ad accounts, and a new batch of product-specific videos (UGC, viral,
funny/parody, hooks).

State before this run: the five existing Seedance videos (c3-c7) were live on YouTube and
serving in Google Demand Gen since 2026-08-13, and existed nowhere else. After this run the
library exists in all five homes, and batch 12 adds ten product-specific clips.

## The five existing videos (c3-c7)

### Already live, verified this run

- **YouTube**: all five public on the 1Lookup channel, confirmed via oEmbed
  (`HwrWKo-FfBs` Ghost Leads, `Xr1FsLxnGWM` The Appraisal, `cX6Zp9PG9oQ` Step Aside,
  `fnFMOPerli4` Line Speed, `WEJcr4Urq5g` One Key).
- **Google Ads**: all five ads in Demand Gen campaign `23549216612` "YouTube - Cold"
  (ad group `200234876098`), ENABLED, and now **APPROVED** (they were
  REVIEW_IN_PROGRESS when built on 8/13). Campaign ENABLED at $25/day.

### New this run

| Channel | What | State |
|---|---|---|
| TikTok (organic) | 5 posts on `1Lookup.io` (Postiz integration `cmsylavp600k9o00yiyncbxap`), one per day 2026-08-19 to 08-23 at 17:00 UTC | `QUEUE` |
| Meta | campaign `52572509095721` "1L \| Video Ads (Claude) 2026-08 \| Trial Signups", $25/day CBO, ad set `52572509100121`, 5 video ads | **campaign PAUSED**, one flip launches |
| Reddit | 5 video ads in the live campaign `2557856098062241615` / ad group `2559001032421657878` "US Broad - SignUp" ($25/day, SIGN_UP goal) | **ads PAUSED**, ad group live |

**The c3 and c6 files everywhere are the end-carded cuts** (both had their spoken brand
line trimmed off to repair audio defects, so the composited card is the only brand mention).
The end-carded deliverables existed only inside YouTube until now; this run rebuilt them
with `seedance-endcard.mjs` and committed them
(`1lookup-c3-ghost-leads-1080p-trimmed-captioned-endcard.mp4`,
`1lookup-c6-quality-control-1080p-trimmed-captioned-endcard.mp4`), so every platform ships
the same file.

#### TikTok posts

`DIRECT_POST`, `video_made_with_ai: true`, `brand_organic_toggle: true`, duet/stitch/
comments on, no music (diegetic audio + burned captions). Captions: one dialogue hook line,
one approved product line, CTA + 1lookup.io, four hashtags.

| Date (UTC) | Title | Postiz post |
|---|---|---|
| 08-19 17:00 | Ghost Leads | `cmsymnirl003up70yumlum38v` |
| 08-20 17:00 | Step Aside | `cmsymniva003vp70y75dgman8` |
| 08-21 17:00 | The Appraisal | `cmsymniz8003wp70yapgv0ukx` |
| 08-22 17:00 | One Key | `cmsymnj3p003xp70ysjylsdzo` |
| 08-23 17:00 | Line Speed | `cmsymnj7i003yp70yp02lmm3m` |

TikTok has no API privacy field for video posts, so each publishes at the account default:
confirm the `1Lookup.io` account default is Public in the app before 19 August (the same
open item the VoiceDrop TikTok deploy carried).

#### Meta build detail

Direct Graph API v25.0 with `META_SYSTEM_USER_TOKEN` (the account is still gated off the
Ads MCP connector). **These are the first writes ever made on the 1Lookup ad account over
the direct API**; all succeeded first try. Settings copied from the account's own Aug-2026
banner campaign: OUTCOME_SALES, offsite-conversion optimization on custom conversion
**1556534182263768 "Free Trial Started"**, US 18+, page `738050449402637`, CTA SIGN_UP,
all Advantage+ enhancements opted out, `self_ai_disclosure: OPT_IN` accepted on every
creative. Videos uploaded as account assets (c3 `1040424215637089`, c4 `2169709476940165`,
c5 `1448740420427364`, c6 `1569979454503307`, c7 `28408939418692544`).

Ads (ACTIVE inside the paused campaign, matching how the banner campaign is staged):
c3 `52572509154921` · c4 `52572509166521` · c5 `52572509173121` · c6 `52572509185321`
· c7 `52572509191121`.

Note: Meta conversion tracking for 1Lookup runs through the CAPI wiring built in
1Lookup-App PR #180 (2026-07-19); whether the Vercel credentials are set has not been
re-verified here. Check before judging cost-per-trial from this campaign.

#### Reddit build detail

`_scripts/reddit-launch-1lookup-video.mjs` (idempotent, same pattern as the BitPredict and
TeamPredict launchers). Structured posts on profile `t2_4xm4m1l9` (RobbyFrank — still the
account's only ad profile, the open decision flagged in the vault). Ads created PAUSED
because the ad group is live and spending on the six banner ads; activating new creative
is Robby's call.

| Clip | Post | Ad (PAUSED) |
|---|---|---|
| c3 Ghost Leads | `t3_1vrniyv` | `2571299602274252294` |
| c4 The Appraisal | `t3_1vrnj12` | `2571299665954113203` |
| c5 Step Aside | `t3_1vrnj5h` | `2571299700527520757` |
| c6 Line Speed | `t3_1vrnj7b` | `2571299735693233112` |
| c7 One Key | `t3_1vrnj9r` | `2571299801287045943` |

## Batch 12 — ten product-specific videos (see the batch README)

Prompts: `_scripts/seedance-prompts-b12-1lookup-products.mjs`. Assets and QA:
`1lookup/2026-08-18-product-videos/README.md`. Deployment of the ten to YouTube, TikTok,
Google, Meta and Reddit is recorded there.

## Notes for the next run

- A Graph API GET must carry `access_token`/`appsecret_proof` in the URL query; passing
  them as multipart form fields on a GET silently drops them and returns
  `(#200) Provide valid app ID`, which reads like a token problem and is not.
- Postiz `uploadFromUrlTool` accepts raw GitHub URLs on a feature branch; TikTok needs the
  `uploads.postiz.com` path in attachments, exactly as the VoiceDrop deploy recorded.
- Reddit media was fetched from the feature branch at job time (`--ref` flag); the
  committed script defaults to `main` so re-runs after merge keep working.
