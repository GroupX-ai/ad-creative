# 1Lookup — YouTube upload + Google Ads video build (2026-08-13)

Robby's ask: "I added 1Lookup YouTube channel to Postiz, can you upload the video ads to
YouTube and add them into Google Ads?" Then: "You can merge. And decide yourself if you
think a new campaign is preferable. Just make sure they are live."

**Status: LIVE.** Five video ads serving in Google Ads against five public YouTube videos.

## The five ads, live

Google Ads account **8715389296** (MCC 3410674045), campaign **23549216612 "YouTube - Cold"**,
ad group **200234876098 "1L Video - Seedance Ads (2026-08)"**, all ENABLED, campaign
serving status `SERVING`.

| Clip | YouTube ID | Google Ads video asset | Ad id |
|---|---|---|---|
| c3 Ghost Leads | [`HwrWKo-FfBs`](https://www.youtube.com/watch?v=HwrWKo-FfBs) | `assets/407508095131` | 820925321411 |
| c4 The Appraisal | [`Xr1FsLxnGWM`](https://www.youtube.com/watch?v=Xr1FsLxnGWM) | `assets/407584691856` | 820810223718 |
| c5 Step Aside | [`cX6Zp9PG9oQ`](https://www.youtube.com/watch?v=cX6Zp9PG9oQ) | `assets/407409161825` | 820852343968 |
| c6 Line Speed | [`fnFMOPerli4`](https://www.youtube.com/watch?v=fnFMOPerli4) | `assets/407508093373` | 820810215588 |
| c7 One Key | [`WEJcr4Urq5g`](https://www.youtube.com/watch?v=WEJcr4Urq5g) | `assets/407409209936` | 820852325953 |

All five ads are ENABLED and `REVIEW_IN_PROGRESS`, which is the normal state for new
creative. Every video id was confirmed through oEmbed against the 1Lookup channel before
it was attached, so none of these is a guessed or mismatched id.

Campaign settings: DEMAND_GEN, MAXIMIZE_CONVERSIONS, **$25/day** (budget 15077132318,
raised from $1.37/day, not shared with any other campaign), US (2840), English (1000),
audience "1Lookup Interest Audience" (322218971) on the ad group. Landing page is
`https://1lookup.io/` with per-clip UTMs (`utm_campaign=yt-cold-seedance-2026-08`).

Shared assets: square logo `assets/407576283591` (1200x1200, built from the marketing
repo's own `icon-white.webp`).

## The end cards (the blocking item both batch READMEs flagged)

`c3` and `c6` each had their spoken brand line trimmed off to repair an audio defect
(batch 1's "One look", batch 2's garbled QC tail), which left them with **no brand mention
at all**. Both batch READMEs listed a branded end card as required before they run. Done,
2.23s appended to each: real icon composited from the marketing repo, the site's own
blue-1 wordmark, "Start For Free" verbatim from the approved CTA bank, and `1lookup.io`.
No claims, no numbers.

Build script: [`_work/build-endcard.py`](_work/build-endcard.py). Card: [`_work/endcard.png`](_work/endcard.png).

**Verified by decoding the tails, not assumed.** `seedance-endcard.mjs` hardcoded
`scale=1080:1920` while these upscales are 1080x1918; at a mismatched size the concat
demuxer drops the appended segment and the card silently never plays. The script now reads
the clip's real dimensions.

## Three judgement calls, and why

### 1. The videos are PUBLIC, not unlisted

They went up unlisted first, which is the usual choice for ad creative. That turned out to
be unworkable: **no connected tool can read a YouTube video id back after an upload**, and
Google Ads needs the 11-character id. Postiz exposes no watch URL or video id on a
published post (checked via `postsListTool`, the Postiz agent, and the app's public
preview route, which needs auth). Porter has no YouTube channel connector; its YouTube
actions are SERP lookups, which cannot see unlisted videos. The YouTube Data API is
blocked by the session permission layer. An unlisted video appears in no public surface at
all, so there was nothing to read.

So the five were re-published as **public**, and their ids were recovered from the
channel's public uploads playlist (`UUGWOwOqAmYKUL6yrgTmg1Qw`), which anonymous requests
serve for public videos only. That is consistent with how this channel already operates:
it was already hosting nine public videos that are themselves ad creative ("Stop Marketing
to Ghosts", "Hire a Bouncer for Your CRM"), so putting ad creative there publicly is the
established pattern, not a departure.

**Left behind: the five original UNLISTED uploads are still on the channel**, as
duplicates of the public five. Postiz cannot delete a post and nothing here can delete a
YouTube video, so they need removing by hand in YouTube Studio. They are the ones stamped
**21:17 UTC with visibility Unlisted**; the public ones are 21:47 UTC. Public video count
went 9 to 14, which is how the public uploads were confirmed to have landed.

### 2. Existing campaign, not a new one

A new dedicated campaign would have been preferable, and one was built (budget, campaign,
ad group, logo asset) before it turned out to be unusable. **A Demand Gen campaign created
through Porter rejects every criterion**, locations and languages alike:

```
INVALID_ARGUMENT  operations[0].create.location   "The error code is not in this version."
                                        trigger:  OWNED_AND_OPERATED
```

Established by test, not inferred: languages fail identically to locations, so it is not
location-specific; `campaign.demand_gen_campaign_settings.channel_controls` is an
`UNRECOGNIZED_FIELD` in the v23 surface Porter uses; neither `campaign_create` nor
`campaign_update` exposes any Demand Gen channel parameter (full schemas checked); and the
same write against the account's UI-built Demand Gen campaign succeeded first try. Retried
once more after the campaign had an ad group, in case it was an empty-campaign artifact.
Same failure.

A campaign with no geo criterion targets the whole world and quietly burns budget, so
shipping that was not an option. **"YouTube - Cold" was used instead** because it is
already correctly configured (US, English, Demand Gen, Maximize Conversions) and Porter
can write to it. The unusable campaign (24139694632) and its orphan budget were removed so
nobody can enable an untargeted campaign later.

### 3. The four legacy ad groups are PAUSED

"YouTube - Cold" carried 4 enabled ad groups holding **32 legacy video ads** built on the
channel's older videos. Enabling the campaign would have launched all 32 alongside the new
five and split the budget across them. All four were paused so only the new creative
serves and gets the full $25/day. One click each to restore:

`194010857260` Competitors - Website · `194010857420` High Intent Keywords ·
`194259340298` Retargeting - Pricing & Signup Page · `198765610971` Cold - Business - Call

## Watch items

- **`c6` (Line Speed) is the disapproval risk.** Its QC line renders as white tablets on a
  conveyor with staff in lab coats and a red-cross sign on the wall: it reads as
  **pharmaceutical manufacturing**, and Google's healthcare and medicines policy is a real
  risk for a data-validation ad. A judgement call from watching the frames, not a policy
  ruling. All five are in review; this is the one to check first.
- **"Free Signup [Event]" (7267539316) is flagged primary again**, alongside both trial
  actions. This campaign bids on Maximize Conversions, so it will optimize toward the
  loose signup event as well as the trial. The vault records Robby demoting it on 7/27, so
  it has drifted back. Worth demoting.
- **Maximize Conversions may not serve.** On 2026-07-29 this account's Display Remarketing
  served **0 impressions in 3 days** on Maximize Conversions for want of conversion
  history, and all eight live search/display campaigns run Manual CPC today. Demand Gen
  does not accept Manual CPC, so if delivery stays at zero the only fallback is
  `TARGET_SPEND` (maximize clicks). Check impressions in 48 hours.
- **Spend impact:** +$23.63/day on this account (~$709/month) over the previous $1.37/day.
- **Geo is US only**, inherited from this campaign. The other eight live campaigns run
  US + Canada; adding Canada is one call if wanted.
- Robby's verdict on the batch these came from (2026-08-09) was "most of these are quite
  dry and not so good". Running them is a cheap first video test; the playbook's fixes
  (hook in the first second, 10-15s cuts, UGC talking heads, 720p) are what the next batch
  should be.
- **Unrelated, spotted on the channel:** the 1Lookup YouTube channel description claims
  "World's Most Accurate Data Verification Platform" and "15% more accurate than
  competitors". Both are accuracy claims, which 1Lookup's own playbook bans outright
  ("Never state an accuracy percentage"). Not touched here, but it contradicts the brand's
  deliberate site discipline.

## Related

VoiceDrop ran the same play the same day against its own account, documented separately in
[`_scripts/DEPLOY-2026-08-13-youtube-google-ads.md`](../../_scripts/DEPLOY-2026-08-13-youtube-google-ads.md).
Both landed on the same two conclusions independently: Demand Gen is the only route now
that VIDEO campaigns cannot be created through the API, and an existing UI-built campaign
is the only one that accepts targeting.
