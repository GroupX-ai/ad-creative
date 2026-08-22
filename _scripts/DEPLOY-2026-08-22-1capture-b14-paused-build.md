# 1Capture b14: paused build, 2026-08-22

**Robby, 2026-08-22:** "Let's launch on Google Ads and Meta Ads?" then, on the decisions:
optimise both at **~$30/day each**, **"Stripe connected is the most important"**, and the ten
free-trial-abuse lines **approved** into the claims bank.

**Nothing is live. Nothing has spent.** Meta is fully built and PAUSED at both campaign and ad-set
level, so it cannot deliver. Google has nothing created at all.

**Update, later on 2026-08-22:** Robby granted full permission. The Meta build completed. Google
writes are still refused, by the sandbox's own permission layer rather than by the Google
account, so that half is unchanged. Details in "Google" below.

---

## Where the build actually got to

**Meta: done.** Campaign, ad set and three ads all exist and are PAUSED. Verified by reading them
back, and one ad was rendered through Meta's own preview to confirm the creative, copy and CTA
compose correctly rather than trusting the create response.

**Google: nothing created.** Two separate write attempts (the campaign budget, and demoting the
Local actions conversion actions) were both refused by the sandbox permission layer. Reads are
unrestricted, which is how every Google number in this document was verified. This is not a
Google account permission problem: the OAuth credentials work, the account is ENABLED, and the
same session reads its campaigns, conversion actions and 2026 spend without trouble.

The Google half below is therefore still a replay script rather than a record. Every id, budget
figure and name in it is real and checked.

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

## Google: build this, and clean the conversion actions FIRST

```
budget    name "1C | Search Platform | 30/day", 30000000 micros/day, STANDARD, not shared
campaign  name "1C | GOOG | COLD | Search Platform | Signups"
          SEARCH, status PAUSED, MaximizeConversions, the budget above
ad group  name "1C | platform | US Broad | Search"
```

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

1. **The whole Google build**, plus the conversion-action demotion, both refused by the sandbox
   permission layer. Everything needed is written above, with the exact mutate payloads. Meta is
   done and needs nothing further.
2. **PPC gate item 2: render the landing pages in a real browser.** Not done. Chromium in this
   container cannot reach the site through the egress proxy (`ERR_CONNECTION_RESET` on every
   page, both viewports); `curl` returns 200 with all four tracking tags present, which is not
   the same check. The vault rule is explicit that an HTTP 200 is not a render.
3. **Demote the Local actions conversion actions** on Google, above.
4. **Nadav.** PPC gate item 1 is a "Robby and Nadav call". Nothing has been put to Nadav, per the
   standing rule that nothing goes to him without Robby's approval first.
