# 1Lookup light batch, 2026-08-21

Robby's verdict on the 2026-08-20 batch, verbatim: *"These dark banners are mostly weird and
disgusting. Nothing here looks interesting or click-worthy. I want you to go out and do some
research on what proper banners should look like. Find disruptive ideas, stuff that worked."*

**12 concepts, 6 visually unrelated systems, 24 delivery files, ~$6.20 of fal spend** (24 first
renders plus 7 re-rolls). Square 1024x1024 and landscape 1200x628.

Mean luminance **171/255, minimum 132**, against the rejected batch's **median 57** and the
account's four-batch history of 28, 37, 95 and 74. Zero negative headlines against 14 of 14.

---

## What the research actually found

Six parallel research sweeps (published creative evidence, disruptive campaign teardowns, B2B
SaaS creative, a live Meta Ad Library sweep of the competitive set, our own creative history, and
AI-slop and banner-blindness anti-patterns), then a synthesis into a 20-rule rulebook and a
24-item banned list, then an adversarial post-mortem of all 14 rejected concepts. Everything is
in `_work/RULEBOOK.json`. Five findings changed what got made.

**1. The brief was aimed at the wrong problem.** A live Ads Library sweep found **zero active US
ads for phone number validation**. Nothing from ZeroBounce, NeverBounce, Bouncer, Emailable,
Kickbox, Clearout, Twilio, Telnyx, ZoomInfo, Lusha or Cognism. There is no crowded dark-tech
category to disrupt. "Crazy, disruptive" got translated into "dark and mean" when the actual job
is to be the clearest and most trustworthy thing in an empty auction.

**2. The one long-running competitor is relentlessly positive.** Melissa, the closest structural
competitor, has run the same creative for ~177 days and 9 of its 10 live headlines are short
positive imperatives: "Trust Starts Here", "Confirm Every Customer", "Fix Bad Addresses Fast".
A 177-day survivor in our exact category and country is the strongest observed signal available.

**3. Our own account already said this.** On Facebook and Instagram only (see the Audience
Network note below), the best static is the daylight cardboard skip-trace sign at **8.18% CTR,
$6.06 CPM, luminance 128/255**. The worst is the dark payphone corridor at **1.21% CTR**,
luminance 41/255. Across the portfolio, Emailchaser's best cost-per-click creative is a receipt
on **pure white**, luminance 235/255. We shipped a receipt too, on a dark desk at 116/255.

**4. The verified mechanism is not "dark loses", it is "objects in a void lose".** Reddit's 2026
study of ~150,000 in-feed ads found objects on solid or empty backgrounds are the worst-converting
image type, images carrying a logo converted 108% better, and plain descriptive image text cut
conversion ~13%. "Dark backgrounds underperform" has no controlled study behind it and is not
claimed here. What is claimed: 34 of our ~46 non-analog banner files measure under luminance 60
and none has produced an attributable trial.

**5. Fourteen concepts was one bet, not fourteen.** Motion's 550,000-ad dataset puts the winner
rate at 5-8%. Twelve of the fourteen rejected frames shared a ground, a light source and a layout
skeleton, so a single taste objection killed 100% of the batch instead of 20%.

## The root cause was a config file, not the concepting

`1Lookup-Marketing/AD-CREATIVE-PLAYBOOK.md` specified the ground as `#05060F`, the tone as "dark
developer terminal aesthetic, blue/cyan glow", and put a blue CTA pill inside the prompt template
itself. Every batch inherited all three. Across four batches and 37 concepts, **not one
light-ground banner was ever made for 1Lookup.** That file is fixed in
`GroupX-ai/1Lookup-Marketing@8f17edf`: the website palette and the ad palette are now separated,
dark is capped at 2 files per batch and redefined as `#1E3A5F`, and the prompt template is retired
and struck through with each phrase's failure mode named. The claim bank is unchanged and still
authoritative.

## The batch

| # | id | system | luminance | headline | claims |
|---|---|---|---|---|---|
| 1 | `forty-one-itemised` | 41 on Paper | 186 | **41** / data products on one API key. | 41 data products on one API key; six product names read verbatim from the catalog |
| 2 | `kraft-fcc-carrier` | Marker and Daylight | 144 | DAILY FCC AND CARRIER DATA. | Daily FCC & Carrier Data Updates |
| 3 | `flat-41-one-key` | Flat Field | 133 | ONE API KEY. 41 DATA PRODUCTS. | 41 data products on one API key |
| 4 | `desk-ops-dial` | Desk Light | 171 | KNOW BEFORE YOU DIAL. | Daily FCC & Carrier Data Updates |
| 5 | `whiteboard-every-contact` | Marker and Daylight | 183 | VALIDATE EVERY CONTACT. | Validate Any Phone, Email, or Domain.; Start For Free |
| 6 | `flat-under-03-sec` | Flat Field | 132 | VALIDATION ANSWERS IN UNDER 0.3 SECONDS. | verbatim bank line |
| 7 | `traffic-light-rows` | Validation Traffic Light | 239 | Green Means Go. | Validate Any Phone, Email, or Domain.; line_type, status |
| 8 | `docs-white-curl` | Validation Traffic Light | 237 | Live In 5 Minutes Or Less. | Live in 5 minutes or less; real `/v1/phone` endpoint |
| 9 | `legalpad-five-minutes` | Marker and Daylight | 176 | START FREE IN 5 MINUTES. | Start free in 5 minutes.; Try For Free |
| 10 | `desk-dev-onecall` | Desk Light | 149 | START WITH ONE LOOKUP. | 41 data products on one API key; real `/v1/phone` endpoint |
| 11 | `public-notice` | Printed Matter | 144 | 7-DAY FREE TRIAL. CANCEL ANYTIME. | 7-day free trial; Cancel anytime; Start Free Trial |
| 12 | `fight-card` | Printed Matter | 158 | 41 DATA PRODUCTS. ONE API KEY. | 41 data products on one API key; Start For Free |

Two of the six systems have never been tried here in any form: **Flat Field** (a flat saturated
colour field with typography and nothing else, the construction behind The Economist's display
campaign) and **Desk Light** (a human face, of which there were zero across 60-plus prior 1Lookup
banner files).

`fight-card` and `public-notice` were reinstated after the ranker dropped them without listing
them in its own cut list. Both had passed their audit with the two highest thumbnail scores in the
batch, and Printed Matter is the system that actually answers the "disruptive" half of the brief.

## Claim safety

`DATA_PRODUCT_COUNT` re-read this batch from `1Lookup-Marketing/src/lib/products.ts:138` and is
**41**. Five live Google video ads still say 34; that is stale copy to correct, not a violation.

- The six product names on `forty-one-itemised` (Phone Intelligence, Email Validation, Carrier
  Lookup, Skip Trace, Fraud Detection, IP Intelligence) were checked against all 43 labels in
  `PRODUCT_GROUPS` and match verbatim.
- Both code frames use `api.1lookup.io/v1/phone` with request field `phone_number`, matching
  `1Lookup-App/src/app/api/v1/phone/route.ts:18`. Every phone number shown is in the 555
  reserved range. Every carrier value is the generic `"Mobile Carrier"`.
- No accuracy percentage and no percent sign anywhere. No third-party brand or logo. No
  invented statistic, customer count, testimonial or star rating.
- No blue CTA pill is painted over any artwork. Where a CTA appears it is rendered in the
  scene's own material: marker on the whiteboard and the legal pad, print on the notice and the
  fight card.
- The wordmark appears exactly once per frame, lowercase `1lookup`, and on 12 of 12 it is
  inside the scene, so nothing is composited after the render.

## Defects found and fixed

1. **`public-notice` carried the identical headline to `flat-under-03-sec`.** A copy duplicate
   inside one batch, missed by both the per-system auditor (which only sees its own system) and
   the ranker (which had dropped the frame). Retargeted to the offer terms, which is what a
   public notice is actually for, and re-rolled in both shapes.
2. **`docs-white-curl` square rendered the `-d` argument with unbalanced quotes.** The landscape
   cut of the same prompt was correct, so it was a render defect rather than a prompt defect.
   Re-rolled with a character-for-character quote specification.
3. **`desk-dev-onecall` rendered a wrong endpoint, then a wrong field name.** Take 1 showed
   `api.1lookup.io/v1/validate/phone`, copied from the homepage hero demo
   (`1Lookup-Marketing/src/components/home/hero.tsx:405`). No such route exists in the app; the
   `/validate/:path*` entry in `next.config` is a dashboard UI route. Take 2 fixed the path but
   rendered the body key as `"phone"`. Take 3 is correct and now agrees with `docs-white-curl`.

**Worth a separate look, outside this batch:** the homepage hero demo advertises
`api.1lookup.io/v1/validate/phone`, which does not match any route under
`1Lookup-App/src/app/api/v1/`. Either the demo is stale or there is a gateway rewrite that is not
in this repo. It could not be probed from this session (egress blocked).

## QA

`_work/qa-banners.py` measures ground luminance, blank-space share, thumbnail edge survival and
safe-zone concentration. All 24 delivery files pass the luminance floor; the highest-flagging
frame sits at 132. Two caveats are annotated in the script itself because they were measured
here, not assumed:

- The thumbnail metric counts all edge energy, so heavy paper and cardboard texture drags the
  ratio down even when the headline is perfectly readable. `kraft-fcc-carrier` scored 0.30 and
  `forty-one-itemised` 0.44, and both read cleanly in the real 150px export.
- The safe-zone metric measures where detail is, not where critical elements are, so every
  full-bleed photograph scores around 65% while its type sits well inside the safe zone.

The real check is `_work/thumbtest-150px.png`, a true 150px export of all 12. Every headline is
readable at that size. Three frames intentionally lose their fine detail there and still work:
`traffic-light-rows` resolves as a green-and-amber pattern, `forty-one-itemised` as the numeral
41, and `docs-white-curl` as "this is code", which is the qualification signal it exists for.

## Files

- Delivery PNGs in this folder: `1lookup-<id>-<square|landscape>.png`.
- `_work/concepts.json` holds every prompt, the claims each concept traces to, predicted and
  measured luminance, per-concept render risk, the auditor's verdict, and a `qa_note` on each
  re-rolled frame.
- `_work/RULEBOOK.json` is the 20-rule rulebook, the 24-item banned list, the scoring rubric, the
  nine concept territories and the per-concept post-mortem of the rejected batch.
- `_work/ACCOUNT-EVIDENCE.md` is the live Meta and luminance data this batch was argued from.
- `_work/rendertest/` holds the two format tests that de-risked the flat field and the
  object-on-white recipes before the batch was committed.
- `_work/take1-backup/` holds every superseded render.

## Before trafficking

- **Google Display image assets need different files.** Google's policy forbids overlaid text,
  overlaid logos and drawn buttons on responsive display image assets, and caps blank space at
  80%. `flat-41-one-key`, `flat-under-03-sec`, `docs-white-curl` and `traffic-light-rows` all
  exceed the blank-space cap; the photographic frames are the ones to use there, and they would
  need clean cuts without the in-scene CTA.
- **CTR is not the metric on this account.** 91% of lifetime Meta clicks came from Audience
  Network at $0.85 CPM, and Meta reported 17,634 landing page views over 90 days while site
  analytics saw 3,267 paid visitors from all sources. Audience Network is already excluded on all
  nine active ad sets, so this contaminates history only, but read no historical creative
  comparison that includes it.
- **This does not fix acquisition.** 1Lookup's static CTR on real placements (5.5-8.2%) already
  beats VoiceDrop (1.3%) and Emailchaser (2.7%). The 2026-08-20 audit put the ceiling at ~1.9
  trials/day from the CRO side, against a 5/day goal. Better banners are worth running and will
  not close that gap on their own.
- **Untested.** Nothing here has delivery data. The ranking is a starting order, not a prediction.
