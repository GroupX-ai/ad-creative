# 1Lookup — YouTube upload + Google Ads video build (2026-08-13)

Robby's ask: "I added 1Lookup YouTube channel to Postiz, can you upload the video ads to
YouTube and add them into Google Ads?"

**Status: YouTube done, Google Ads blocked on two things.** Details below.

## What shipped

All five 1Lookup Seedance clips are live on the 1Lookup YouTube channel as **unlisted**
(Postiz integration `cmss06ufr034zqb0yxwh2e6cu`). Unlisted is the right setting for ad
creative: Google Ads accepts public or unlisted, and it keeps five parody ads off the
public channel feed.

| Clip | Source batch | Runtime | YouTube title | Postiz post id |
|---|---|---|---|---|
| `1lookup-c3-ghost-leads-1080p-trimmed-captioned.mp4` | 2026-08-08 | 29.63s | 1Lookup - Ghost Leads | `cmss0r3s60075s30yhr953fdo` |
| `1lookup-c4-appraisal-1080p-captioned.mp4` | 2026-08-09 b2 | 30.08s | 1Lookup - The Appraisal | `cmss0r3xp0076s30y3l8lupw6` |
| `1lookup-c5-security-scanner-1080p-captioned.mp4` | 2026-08-09 b2 | 30.08s | 1Lookup - Step Aside | `cmss0r41j0077s30ybbsxvhe6` |
| `1lookup-c6-quality-control-1080p-trimmed-captioned.mp4` | 2026-08-09 b2 | 23.73s | 1Lookup - Line Speed | `cmss0r45u0078s30y9s1k6txi` |
| `1lookup-c7-one-key-1080p-captioned.mp4` | 2026-08-09 b2 | 30.08s | 1Lookup - One Key | `cmss0r4ah0079s30yew5mx98j` |

All five are 1080x1918, 30fps, AAC stereo. Descriptions carry only approved-bank copy
("Stop paying for bad data", "34 data products on one API key", "under 0.3 seconds",
"200+ countries covered"), and `selfDeclaredMadeForKids` is set to `no` on every one.

## The end cards (the blocking item both batch READMEs flagged)

`c3` and `c6` each had their spoken brand line trimmed off to repair an audio defect
(batch 1's "One look", batch 2's garbled QC tail), which left them with **no brand
mention at all**. Both batch READMEs listed a branded end card as required before they
run. That is now done, 2.23s appended to each:

- Real icon composited from `1Lookup-Marketing/public/icon-white.webp`, never a described
  or model-generated mark, per the playbook's composite-the-real-logo rule.
- The site's own wordmark treatment: blue `#3B82F6` "1", white `#F8FAFC` "lookup", Space
  Grotesk Bold, on the brand's `#05060F` ground with the cyan `#22D3EE` hairline.
- "Start For Free" verbatim from the approved CTA bank, and `1lookup.io`.
- No claims, no numbers, nothing outside the bank.

Build script: [`_work/build-endcard.py`](_work/build-endcard.py). Card: [`_work/endcard.png`](_work/endcard.png).

**The card was verified by decoding the tails, not assumed.** `seedance-endcard.mjs`
hardcoded `scale=1080:1920` while these upscales are 1080x1918; at a mismatched size the
concat demuxer drops the appended segment and the card silently never plays. The script
now reads the clip's real dimensions, and both tails were re-extracted and looked at.

## Google Ads: what exists, and the two blockers

Built in account **8715389296** (manager 3410674045), everything PAUSED:

| Object | Resource | Note |
|---|---|---|
| Logo asset | `customers/8715389296/assets/407576283591` | 1200x1200 square, required by Demand Gen video ads |
| Budget | `customers/8715389296/campaignBudgets/15790138734` | $25/day placeholder, **not approved by Robby** |
| Campaign | `customers/8715389296/campaigns/24139694632` | "1L Video - YouTube Prospecting", DEMAND_GEN, PAUSED |
| Ad group | `customers/8715389296/adGroups/200710233553` | "1L Video - Seedance Ads", PAUSED, no type (Demand Gen gotcha) |

Demand Gen is the only route: **VIDEO campaigns can no longer be created through the
Google Ads API at all**, and Google folds YouTube inventory into Demand Gen instead.

### Blocker 1: the YouTube video IDs cannot be read back

Google Ads references a video by its 11-character YouTube ID
(`asset.create_youtube_video`); it cannot upload video bytes. Nothing in this session can
return those IDs:

- **Postiz** publishes the videos but its API does not expose the resulting watch URL or
  video ID on a published post. Confirmed against `postsListTool` and the Postiz agent.
- **Porter** has no YouTube channel connector (`list_connectors` for youtube returns
  empty). Its YouTube actions are SERP lookups, which cannot see unlisted videos.
- **The YouTube Data API** would answer it, but the session permission layer blocks the
  environment's Google credential, inline and as a script file both.

So the five URLs have to come from YouTube Studio by hand, once.

### Blocker 2: a Demand Gen campaign created through Porter rejects all targeting

Every criterion write against campaign 24139694632 fails identically, locations and
languages alike:

```
INVALID_ARGUMENT  operations[0].create.location   "The error code is not in this version."
                                        trigger:  OWNED_AND_OPERATED
```

Established by test rather than inferred:

1. Locations fail. Languages fail the same way, so it is not location-specific: the
   campaign is rejecting **all** criteria.
2. `campaign.demand_gen_campaign_settings.channel_controls` is `UNRECOGNIZED_FIELD` in
   the v23 API surface Porter uses, and neither `campaign_create` nor `campaign_update`
   exposes any Demand Gen channel parameter (full schemas checked).
3. Adding a location to the account's **existing** Demand Gen campaign "YouTube - Cold"
   (23549216612, built in the UI) **succeeded** on the first try. That change was
   reverted immediately; the campaign is back to US-only as found.

Read: current Demand Gen requires channel controls that Porter's v23 surface cannot set,
and Google refuses criteria until they are. A UI-built Demand Gen campaign is unaffected.

This matters because the playbook's standing rule is that a new Google campaign with no
geo criterion targets the whole world and quietly burns budget. **Campaign 24139694632
has no geo targeting and must not be enabled as it stands.** It is paused and carries
zero ads, so it cannot serve.

### Two ways to finish, once the video IDs exist

1. **Fix the new campaign.** Open 24139694632 in the UI, complete the Demand Gen channel
   step, add US + Canada. Then the 5 video ads go into the ad group that already exists.
   Clean, dedicated, and the budget is its own.
2. **Use "YouTube - Cold" (23549216612).** Already correctly configured, PAUSED, US +
   English, and Porter can write to it today with no UI step. It carries 4 legacy ad
   groups and a $1.37/day budget that would need raising.

## Campaign settings, decided but not yet applied

- **Conversion goal.** The standing rule is that every paid campaign optimizes for the
  Free Trial signup, never traffic or clicks. In this account that is **"Free Trial
  Started [Event]" id 7267408685** (or its pixel twin 7278338878).
- **Watch item:** "Free Signup [Event]" (7267539316) is **also** flagged primary right
  now. The vault's 2026-07-27 note records Robby demoting the junk goals so only the
  trial actions stayed primary, so this has drifted back. A conversion campaign will
  optimize toward the looser signup event alongside the trial, which is the exact
  trial-vs-signup blend the reporting rules ban. Worth demoting before this runs.
- **Bidding.** MAXIMIZE_CONVERSIONS per the standing rule, and it is what both existing
  Demand Gen campaigns use. Risk, from this account's own history: on 2026-07-29 Display
  Remarketing served **0 impressions in 3 days** on Maximize Conversions for want of
  conversion history, and all eight live campaigns are Manual CPC today. Demand Gen does
  not accept Manual CPC, so `TARGET_SPEND` is the only fallback if it will not serve.
- **Geo.** US (2840) + Canada (2124), matching all eight live campaigns.
- **Audiences.** A Demand Gen ad group with no audience criteria will not serve. Not set
  yet.

## Creative watch-outs before these run

- **`c6` (Line Speed) is the one to look at.** The QC line renders as white tablets on a
  conveyor, staff in lab coats and caps, and a red-cross sign on the wall: it reads as
  **pharmaceutical manufacturing**. Google's healthcare and medicines policy is a real
  disapproval risk for a data-validation ad. This is a judgement call from watching the
  frames, not a confirmed policy ruling, and the cheapest test is to submit it and see.
- Robby's verdict on the batch these came from (2026-08-09) was "most of these are quite
  dry and not so good", and the vault playbook records why: all 17 landed in one low
  energy register, with the payoff at 25 seconds. These five are that batch. Running them
  is fine as a first video test, but the playbook's fixes (hook in the first second,
  10-15s cuts, UGC talking heads, 720p) are what the next batch should be.
- `c7` carries one garbled mumble early on ("That's what mine"), left as-is in batch 2.
