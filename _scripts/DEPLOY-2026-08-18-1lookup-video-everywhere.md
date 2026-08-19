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

## Batch 12 — ten product-specific videos, deployed to all five channels

Creative, prompts and QA: [`1lookup/2026-08-18-product-videos/README.md`](../1lookup/2026-08-18-product-videos/README.md).

| Channel | What | State |
|---|---|---|
| YouTube | 10 public Shorts on the 1Lookup channel | **LIVE** |
| TikTok (organic) | 10 posts, one per day 2026-08-24 to 09-02, 17:00 UTC | `QUEUE` |
| Google Ads | 10 Demand Gen video ads added to the live ad group `200234876098` | **PAUSED** |
| Meta | campaign `52572524214321` "1L \| Product Videos B12 (Claude) 2026-08", $25/day CBO, ad set `52572524226321`, 10 video ads | **campaign PAUSED** |
| Reddit | 10 video ads added to the live ad group `2559001032421657878` | **ads PAUSED** |

### The ten, by ID

| Clip | Product | YouTube | Google ad | Meta ad | Reddit post / ad |
|---|---|---|---|---|---|
| c8 Dead Numbers | Phone Validation | [`XqhKQUTom6E`](https://www.youtube.com/watch?v=XqhKQUTom6E) | 821304891766 | 52572524256921 | t3_1vrp9vm / 2571336563060898396 |
| c9 The First Call | Phone Scrub (DNC) | [`uJdQ5gMTT5I`](https://www.youtube.com/watch?v=uJdQ5gMTT5I) | 821304892222 | 52572524261521 | t3_1vrp9ye / 2571336604354781465 |
| c10 The Ghost Owner | Skip Trace | [`5oQrRdGpSZ8`](https://www.youtube.com/watch?v=5oQrRdGpSZ8) | 821261737908 | 52572524270321 | t3_1vrpa0s / 2571336642353574545 |
| c11 The Front Desk Knows | Reverse Phone Lookup | [`dvHEd7ZjtQQ`](https://www.youtube.com/watch?v=dvHEd7ZjtQQ) | 821261738070 | 52572524283521 | t3_1vrpa3c / 2571336681453126216 |
| c12 Flagged | Phone Spam Check | [`CuGaN7VfgmQ`](https://www.youtube.com/watch?v=CuGaN7VfgmQ) | 821264742465 | 52572528847921 | t3_1vrq1xv / 2571351730874432039 |
| c13 Four Thousand Landlines | Carrier Lookup | [`l9UZZxCILl0`](https://www.youtube.com/watch?v=l9UZZxCILl0) | 821378180531 | 52572524305721 | t3_1vrpa7y / 2571336752099400371 |
| c14 Best Month Ever | Fraud Detection | [`6xEH0dVAZLQ`](https://www.youtube.com/watch?v=6xEH0dVAZLQ) | 821262100248 | 52572524310721 | t3_1vrpaak / 2571336790943549620 |
| c15 The List Sommelier | Email Validation | [`EfVO6U1W6cM`](https://www.youtube.com/watch?v=EfVO6U1W6cM) | 821304960442 | 52572524330321 | t3_1vrpacr / 2571336828087656781 |
| c16 The Rolodex | Mobile Finder | [`5Dt-ouaA0H4`](https://www.youtube.com/watch?v=5Dt-ouaA0H4) | 821378307974 | 52572524339321 | t3_1vrpaet / 2571336863796092076 |
| c17 Established 1987 | Business Verify | [`M2bcqibvPT4`](https://www.youtube.com/watch?v=M2bcqibvPT4) | 821378139026 | 52572524341521 | t3_1vrpagt / 2571336904997196372 |

Every YouTube ID was confirmed through oEmbed against the 1Lookup channel before it was
attached to a Google asset, so none of these is a guessed or mismatched id. The IDs were
recovered by diffing the channel's public uploads playlist before and after the upload
(14 videos to 24), which is the path that works for Shorts.

TikTok order alternates UGC selfies with sketches so the feed never sees the same register
two days running, and holds the 30-second mockumentary for last.

## What to flip, when Robby wants it live

Nothing from this run is spending. Three switches, each independent:

1. **Meta:** set campaigns `52572509095721` (the 5 originals) and `52572524214321` (the 10
   new) to ACTIVE. Ad sets and ads underneath are already ACTIVE, so one flip each launches
   them. $25/day each, so both is +$50/day on an account currently at $0 delivery.
2. **Google:** set the 10 `1L B12 ...` ads in ad group `200234876098` to ENABLED. The
   campaign and ad group are already serving with the 5 originals, so this adds creative to
   a live $25/day budget rather than adding spend.
3. **Reddit:** set the 15 `1lookup video ...` ads to ACTIVE. The ad group is already live at
   $25/day with 6 banner ads, so again this adds creative to existing spend, and the videos
   will take share from the banners.

## c12 was rebuilt after publishing, for a burned-in caption typo

The caption pass mis-heard "spam" and burned **SPAMCH** into three frames of c12. It was
caught by reading the burned pixels off all ten finished files, which the transcript cannot
do: the audio transcript for the same clip read "spam" correctly. `seedance-captions.mjs`
now carries a `WORD_FIXES` map so a single misheard word can be corrected (it previously
only repaired two-word brand splits), and the clip was re-captioned and re-carded.

Everything downstream was rebuilt on the corrected file. The superseded entities are all
parked, not serving:

| Platform | Superseded | Replacement |
|---|---|---|
| YouTube | `_i_se9JvuI4` (still public) | `CuGaN7VfgmQ` |
| Google | ad 821378144063, **REMOVED** | ad 821264742465, video asset 409550975532 |
| Meta | ad 52572524301921, PAUSED + renamed `ZZ SUPERSEDED...` | ad 52572528847921 |
| Reddit | ad 2571336717430940166, PAUSED + renamed `ZZ SUPERSEDED...` | post t3_1vrq1xv / ad 2571351730874432039 |
| TikTok | post `cmsyp1f8w008tp70ygwtlvrm6`, still queued 08-26 | post `cmsyq78s2009tp70y46v0cwmv`, same slot |

**Two of those need a human, because neither API can delete:** the old YouTube video
`_i_se9JvuI4` has to be deleted in YouTube Studio, and the old TikTok post
`cmsyp1f8w008tp70ygwtlvrm6` has to be deleted in Postiz, or 26 August publishes the flawed
copy alongside the corrected one. Reddit's superseded post `t3_1vrpa5n` stays on the profile
permanently (the API has no DELETE), but its ad is paused so it never delivers.

**Rule this establishes:** read the burned-in captions off every finished file before
publishing anywhere, not just off the clip that speaks the brand name. The batch-9 rule
already said this; this run applied it to one clip and then published the other nine on the
strength of a transcript.

## Two account problems found while doing this, neither fixed here

1. **The 5 live Google video ads carry a stale claim.** Their copy says "34 Data Products,
   One API" and "34 data products on one API key"; the site now says **41**. The batch-12
   ads use 41. Worth correcting the older five, which is a text-asset edit, not a rebuild.
2. **Meta's ad account rate-limited** (`code 17, Ad Account Has Too Many API Calls`) after
   this run's ~45 writes, so the final read-back of the two campaigns' ad lists could not be
   completed. Each ad returned an ID at creation, which Meta only does on success, and the
   campaign list read cleanly before the limit hit. Re-verify with a plain listing once the
   limit clears if you want belt and braces.

## Notes for the next run

- A Graph API GET must carry `access_token`/`appsecret_proof` in the URL query; passing
  them as multipart form fields on a GET silently drops them and returns
  `(#200) Provide valid app ID`, which reads like a token problem and is not.
- **A Demand Gen video ad requires `long_headlines`**, and omitting it fails with
  `collectionSizeError: TOO_FEW` pointing at `demand_gen_video_responsive_ad` as a whole,
  which does not name the missing field. Reading an existing ad in the same ad group with
  GAQL is what identified it; that is the copy-the-account's-own-template rule paying out.
- Postiz `uploadFromUrlTool` accepts raw GitHub URLs on a feature branch; TikTok needs the
  `uploads.postiz.com` path in attachments, exactly as the VoiceDrop deploy recorded.
- Reddit media was fetched from the feature branch at job time (`--ref` flag); the
  committed script defaults to `main` so re-runs after merge keep working.
- `reddit-launch-1lookup-video.mjs` is idempotent by ad name and by post headline: the
  second run reused all five ads from the first run and created only the ten new ones.

## Notes for the next run

- A Graph API GET must carry `access_token`/`appsecret_proof` in the URL query; passing
  them as multipart form fields on a GET silently drops them and returns
  `(#200) Provide valid app ID`, which reads like a token problem and is not.
- Postiz `uploadFromUrlTool` accepts raw GitHub URLs on a feature branch; TikTok needs the
  `uploads.postiz.com` path in attachments, exactly as the VoiceDrop deploy recorded.
- Reddit media was fetched from the feature branch at job time (`--ref` flag); the
  committed script defaults to `main` so re-runs after merge keep working.
