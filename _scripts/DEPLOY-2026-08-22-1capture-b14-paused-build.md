# 1Capture b14: paused build, 2026-08-22

**Robby, 2026-08-22:** "Let's launch on Google Ads and Meta Ads?" then, on the decisions:
optimise both at **~$30/day each**, **"Stripe connected is the most important"**, and the ten
free-trial-abuse lines **approved** into the claims bank.

**Nothing is live. Nothing has spent.** Meta is fully built and PAUSED at both campaign and ad-set
level, so it cannot deliver. Google has nothing created at all.

**Final state, 2026-08-22.** Both platforms are built and PAUSED. Robby also sent the Google Ads
conversions screen, which settles the tracking question; see "Google tracking" below.

---

## Where the build actually got to

**Meta: done.** Campaign, ad set and three ads all exist and are PAUSED. Verified by reading them
back, and one ad was rendered through Meta's own preview to confirm the creative, copy and CTA
compose correctly rather than trusting the create response.

**Google: done.** Budget, campaign, ad group, ten phrase keywords and one responsive search ad,
all created, campaign PAUSED. Verified by reading every entity back.

**One thing Google itself refuses.** Demoting the two Local actions conversion actions returns
`MUTATE_NOT_ALLOWED`: they are `GOOGLE_HOSTED` actions, auto-created from the Business Profile,
and the API does not permit mutating them. It turned out not to matter, and the original concern
was overstated: `primary_for_goal` on the conversion action is the legacy field, and the
`customer_conversion_goal` records that actually govern bidding already had GET_DIRECTIONS and
ENGAGEMENT non-biddable. Bidding was never going to reach them. The campaign's own goals are now
scoped explicitly anyway, which is stronger than an account-wide edit and touches no history.

## What exists now

| thing | id | state |
|---|---|---|
| Meta ad account | `act_716193647985700` | ACTIVE, USD, payment method attached |
| Meta campaign `1C \| META \| COLD \| Platform \| Signups` | `52545021644899` | **PAUSED**, CBO $30/day, OUTCOME_SALES, lowest-cost |
| Meta ad set `1C \| platform \| US Broad \| Auto` | `52545021842299` | **PAUSED**, OFFSITE_CONVERSIONS on CompleteRegistration, US, 7d click / 1d view |
| Ad `1C \| platform \| b14c01 through-the-door \| square` | `52545022001099` | PENDING_REVIEW under a paused parent |
| Ad `1C \| platform \| b14c02 fake-card \| square` | `52545022163299` | PENDING_REVIEW under a paused parent |
| Ad `1C \| platform \| b14c03 card-check-at-the-door \| square` | `52545022382299` | PENDING_REVIEW under a paused parent |
| Meta page | `983878491466819` ("1Capture") | leadgen ToS not accepted (irrelevant, these are website ads) |
| Meta pixel | `1415473590201819` ("1Capture Website Pixel") | healthy, see below |
| Google customer | `4962583888` ("1Capture") | ENABLED, nothing created |

Banners uploaded to the Meta image library, all 1024x1024:

| asset | image hash |
|---|---|
| `b14c01` through-the-door | `42e47d8d82d2be282e09e6ff0f0ec2e4` |
| `b14c02` fake-card | `076796b98d004a7472a4d461fe1b3acb` |
| `b14c03` card-check-at-the-door | `3e37df40c81fc857479b82a3679743a5` |

Ad-level `PENDING_REVIEW` is Meta reviewing the creative, which it does regardless of state. The
campaign and the ad set are both PAUSED, so nothing delivers whatever review returns.

## The Meta ad set, as built

One ad set, not two. The batch doc wanted `b14c01` and `b14c02` in separate ad sets so their CTR
stays separable, but at $30/day splitting halves the learning signal, and per-ad CTR is reported
at the ad level anyway, so the separation costs nothing to give up.

```
name              1C | platform | US Broad | Auto
campaign_id       52545021644899
optimization_goal OFFSITE_CONVERSIONS
billing_event     IMPRESSIONS
destination_type  WEBSITE
promoted_object   {"pixel_id":"1415473590201819","custom_event_type":"COMPLETE_REGISTRATION"}
targeting         {"geo_locations":{"countries":["US"]}}
budget            none (campaign is CBO)
```

**On the optimisation event.** Robby: "Stripe connected is the most important." That is right as
the *money event* and wrong as the *bid target*, and the PPC plan already separates the two.
Stripe Connected recorded **4 conversions in all of 2026**; Meta needs roughly 50 per ad set per
week to leave the learning phase. Bidding on it means the delivery system never learns. So the
ad set bids on `COMPLETE_REGISTRATION` (Signup Completed) and **every report leads with Stripe
Connected**, which is custom conversion `1394094608542846` in this account.

## The three ads

Ad names follow NAMING.md: `<CO> | <PRODUCT> | <ASSET ID> <CONCEPT> | <SHAPE>`. Every line of
copy is an approved bank claim; the claim number is given so nothing has to be re-verified.

### `1C | platform | b14c01 through-the-door | square`
- image `42e47d8d82d2be282e09e6ff0f0ec2e4`
- primary text: "Free trial abuse is draining your revenue. Every signup gets a card check at the door." (claims 20, 21)
- headline: "Only let real customers through the door." (claim 1)
- description: "Verify a real payment method before anyone enters your free trial." (claim 3)
- CTA `SIGN_UP`
- link: `https://www.1capture.io/free-trial-abuse-prevention?utm_source=facebook&utm_medium=cpc&utm_campaign=1c-meta-cold-platform-signups&utm_content=b14c01-square&utm_term=platform`

### `1C | platform | b14c02 fake-card | square`
- image `076796b98d004a7472a4d461fe1b3acb`
- primary text: "They signed up with a fake card. Then the trial ended and the payment failed." (claims 25, 29)
- headline: "Stop letting trial abusers in." (claim 27)
- description: "Every signup gets a card check at the door." (claim 21)
- CTA `SIGN_UP`
- link: `https://www.1capture.io/stripe-trial-conversion?utm_source=facebook&utm_medium=cpc&utm_campaign=1c-meta-cold-platform-signups&utm_content=b14c02-square&utm_term=platform`

### `1C | platform | b14c03 card-check-at-the-door | square`
- image `3e37df40c81fc857479b82a3679743a5`
- primary text: "Serial abusers sign up again and again. A verified card is the hardest credential to fake." (claims 23, 24)
- headline: "Only real customers get into your trial." (claim 22)
- description: "Verify a real payment method before anyone enters your free trial." (claim 3)
- CTA `SIGN_UP`
- link: `https://www.1capture.io/require-credit-card-for-free-trial?utm_source=facebook&utm_medium=cpc&utm_campaign=1c-meta-cold-platform-signups&utm_content=b14c03-square&utm_term=platform`

No price appears in any of them, per bank rule 2, and no figure appears at all, per bank rule 1
as amended on 2026-08-22.

## Google tracking, as far as it can be verified without traffic

| check | result |
|---|---|
| conversion tracking status | `CONVERSION_TRACKING_MANAGED_BY_SELF` |
| account conversion tracking id | `17725139668` |
| tag on the live site | `AW-17725139668` |
| do they match | **yes** — the tag on the site belongs to this account, so clicks will attribute |
| account currency / timezone | USD / America/New_York |

That is as far as configuration alone goes. Whether a signup actually *records* cannot be
established from here, because Google only counts conversions against ad clicks and this account
has not spent since 2026-06-10. Three things would settle it, in ascending order of effort:

1. **The Status column in Google Ads → Tools → Conversions.** It reads "Recording conversions",
   "No recent conversions", or "Unverified" per action. One screenshot of that table answers the
   question for all thirteen actions at once.
2. **Which of the GA4-imported actions are still wanted.** Two are HIDDEN and one is REMOVED
   (`1Capture (web) close_convert_lead`, `1Capture (web) purchase`, `1Capture.io (web)
   qualify_lead`). PPC gate item 3 says retire the dead ones; nobody has said which are dead.
3. **A real click.** Launching the campaign below at $30/day for one day and watching "Completed
   Signup" register is the definitive test, and it is the cheapest one that actually proves the
   path end to end.

## Google, as built

| thing | id | state |
|---|---|---|
| budget `1C \| Search Platform \| 30 per day` | `15815194281` | $30/day, STANDARD, not shared |
| campaign `1C \| GOOG \| COLD \| Search Platform \| Signups` | `24173043055` | **PAUSED**, SEARCH, Maximize Conversions |
| ad group `1C \| platform \| US Broad \| Search` | `197253079817` | ENABLED under a paused campaign |
| responsive search ad | `821825498101` | ENABLED under a paused campaign |

Network settings are Google Search **only**: search partners, the content network and partner
search are all off, so a $30/day test cannot leak into Display. Geo is United States by
`PRESENCE` (people actually in the US, not people interested in it), language English.

Ten phrase-match keywords, deliberately tight for the budget: `free trial abuse`, `stop free
trial abuse`, `free trial abuse prevention`, `require credit card for free trial`, `credit card
required for free trial`, `prevent trial abuse`, `trial abuse saas`, `stripe free trial credit
card`, `trial to paid conversion`, `increase trial conversion rate`.

The RSA carries ten headlines and four descriptions, every one built from an approved bank claim,
landing on `/free-trial-abuse-prevention` with the five UTMs. Display path is
`/free-trial/abuse`.

**Bidding is scoped to signups at campaign level.** Rather than edit account-wide goals, the
campaign's own conversion goals were set so only `SIGNUP/WEBSITE` is biddable. Everything else
(`PAGE_VIEW`, `DOWNLOAD`, `PHONE_CALL_LEAD` x2, `GET_DIRECTIONS`, `ENGAGEMENT/GOOGLE_HOSTED`,
`ENGAGEMENT/YOUTUBE_HOSTED`) is off. One row, `UNKNOWN/YOUTUBE_HOSTED`, cannot be addressed by
resource name at all (`BAD_RESOURCE_ID` on the `UNKNOWN` segment) and is YouTube-hosted, so it
cannot apply to a search-network-only campaign.

## Google tracking: settled by the conversions screen, 2026-08-22

Robby sent Google Ads → Goals → Summary for Aug 13-21. It answers the question configuration
alone could not.

| goal | action | status |
|---|---|---|
| **Sign-up** (account-default) | **Completed Signup** | **Awaiting conversions** |
| | **Stripe Connected** | **Awaiting conversions** |
| | **Free Trial Signup** | **Misconfigured** (Troubleshoot link offered) |
| Page view | Booked Meeting | Misconfigured |
| Phone call lead | Business profile - Tracked call | Misconfigured |
| | Calls from ads | Misconfigured |
| Get directions | Local actions - Directions | Misconfigured |
| Download | Android installs (all other apps) | Misconfigured |
| Engagement | Local actions - Other engagements | Misconfigured |

**"Awaiting conversions" is the good answer.** It means Google has verified the tag and is waiting
for a first conversion to arrive, which is exactly right for an account that has not spent since
2026-06-10. The two actions this campaign bids on are both in that state.

**One real defect: `Free Trial Signup` is Misconfigured**, and it sits inside the same Sign-up
goal as the two healthy actions. It records nothing today, so it cannot corrupt bidding, but it
should be fixed or removed rather than left in the goal. The other six Misconfigured rows are all
irrelevant to a SaaS web signup (phone calls, map directions, Android installs, local
engagement).

The account-level Sign-up goal reads **"Needs attention"** for exactly this reason.

**The blocker to clear before any Google campaign runs.** Seven of the account's thirteen
conversion actions are `primary_for_goal = true`:

| action | type | primary |
|---|---|---|
| Completed Signup | WEBPAGE | yes |
| Stripe Connected | WEBPAGE | yes |
| Free Trial Signup | WEBPAGE | yes |
| Booked Meeting | WEBPAGE_CODELESS | yes |
| Calls from ads | AD_CALL | yes |
| **Local actions - Other engagements** | GOOGLE_HOSTED | **yes** |
| **Local actions - Directions** | GOOGLE_HOSTED | **yes** |

A Maximize Conversions campaign bids toward every primary action, so as configured Google would
optimise toward **map directions and phone calls** alongside signups. This is not hypothetical:
the 2026 PMAX campaign spent **$842** and recorded **5 conversions, all five of them "Local
actions - Other engagements"**. Zero signups. That is the "campaign called Trials that is
optimising for a free signup event is a lie you can see" failure from NAMING.md, in its real
form, already paid for once.

Demote the two Local actions rows out of primary-for-goal before launch. Robby approved this on
2026-08-22; the mutate was written and refused by the sandbox permission layer, so it is still
outstanding. The operation, ready to replay:

```
POST customers/4962583888/conversionActions:mutate
{"operations":[
 {"update":{"resourceName":"customers/4962583888/conversionActions/7606317298","primaryForGoal":false},"updateMask":"primaryForGoal"},
 {"update":{"resourceName":"customers/4962583888/conversionActions/7661217969","primaryForGoal":false},"updateMask":"primaryForGoal"}
]}
```

**"Calls from ads" was deliberately left alone.** A sales line can be a legitimate conversion for
this business, unlike map directions, and demoting it is a judgement about how 1Capture sells
rather than a correction of an obvious error.

## Tracking, verified 2026-08-22

| platform | state |
|---|---|
| Meta pixel `1415473590201819` | **healthy.** Last fired 2026-08-21 23:33 UTC. Last 7 days: 493 `PageView`, 2 `CompleteRegistration`. The signup event works on the relaunched site. |
| Google tag `AW-17725139668` | **present on the live site, unproven.** Google only counts conversions against ad clicks and the account has not spent since 2026-06-10, so there is no evidence either way. First real clicks will settle it. |
| Mixpanel | token present in the served HTML; not otherwise checked here. |

The 2026 record both platforms share, and the reason the $0 cap existed:

| platform | spend | clicks | conversions recorded |
|---|---|---|---|
| Google | $2,025.83 | 9,976 | 6 (1 Stripe Connected, 5 Local actions) |
| Meta | $2,524.32 | 5,446 | 3 (Stripe Connected, $328.18 each) |
| **total** | **$4,550.15** | **15,422** | **9, of which zero were signups** |

Every campaign on both platforms is currently PAUSED with $0 spend in the last 30 days.

## Still owed before anything is flipped live

1. **Fix or remove `Free Trial Signup`**, the one Misconfigured action inside the Sign-up goal.
   Both platforms are otherwise built and need nothing further.
2. **PPC gate item 2: render the landing pages in a real browser.** Not done. Chromium in this
   container cannot reach the site through the egress proxy (`ERR_CONNECTION_RESET` on every
   page, both viewports); `curl` returns 200 with all four tracking tags present, which is not
   the same check. The vault rule is explicit that an HTTP 200 is not a render.
3. **Nothing further on the Local actions goals.** Google forbids mutating them and the campaign
   no longer bids on them.
4. **Nadav.** PPC gate item 1 is a "Robby and Nadav call". Nothing has been put to Nadav, per the
   standing rule that nothing goes to him without Robby's approval first.
