# 1Lookup Google Search: high-intent coverage for every product (2026-08-13)

Answers one question: does every 1Lookup product have a high-intent Google Search ad group?
Built against the live account **871-538-9296** and the in-app product catalogue
(`1Lookup-App/src/lib/products/seed-catalog.ts`, 43 product codes) on 2026-08-13.

**Nothing here is live.** These are Google Ads Editor import files. The new campaign ships
`Paused` on purpose: see "Read this before you import".

---

## What the account looked like on 2026-08-13

17 days live (7/27 to 8/13), everything pulled from the Google Ads API, not from a dashboard.

| Metric | Value |
|---|---|
| Search spend | $2,606 |
| Display spend | $305 |
| **Total spend** | **$2,911** |
| "Free Trial Started" conversions Google attributes | **1** |
| Ad groups with $0 spend in 17 days | **14 of 33** |

Stripe, the system of record, over the same window:

| Window | Trials | Per day |
|---|--:|--:|
| Pre-launch 7/01 to 7/26 | 20 | 0.77 |
| Post-launch 7/27 to 8/13 | 14 | 0.78 |

**Trials are flat.** $2,911 of spend produced no measurable lift in trial starts. That is the
number that governs everything below. (Caveat, stated plainly: Google's own attribution is
partly blind because the gclid to Stripe offline-conversion import is still blocked on an
OAuth scope, so Google under-counts. Stripe's total is not blind, and the total did not move.)

---

## The three findings that matter

### 1. The consumer-intent negative list is attached but too generic to catch the leak

**Correction to the first version of this file, which said the list was never attached. It
was.** The 7/27 list lives as a shared negative set `1L - Consumer & Junk`, all 21 terms
present, attached to Phone & Carrier API, Email Verification, New Products and Competitors.
The first read looked only at `campaign_criterion` and missed `campaign_shared_set`, so it
saw 32 brand negatives and concluded wrongly.

The leak is real, the cause is not. The 21 terms are generic web-junk blocks (`what is`,
`free`, `download`, `tutorial`, `github`, `jobs`, `apk`, `truecaller`, `who called me`).
**None of them match the phrasing people actually search**, so consumer traffic walked
straight through into the $6 to $9 CPC API ad groups over 17 days:

| Search term | Ad group | Spend |
|---|---|--:|
| is this phone number legitimate | Phone Validation API | $11.95 |
| check if a phone number is real | Phone Validation API | $11.89 |
| is this number legit | Phone Validation API | $11.55 |
| is this number real | Phone Validation API | $11.07 |
| fake number checker | Phone Validation API | $11.92 |
| phonevalidator | Phone Validation API | $11.99 |
| list of scammer phone numbers | Phone Spam & Risk | $17.73 |

None of those people are buying an API. The fix is not "attach the list", it is "the list
needs the 12 terms that describe how consumers actually phrase it": `is this number`,
`is this phone number`, `check if a phone number`, `is this legit`, `fake number`, `scammer`,
`phonevalidator`, `robocall`, `unknown number`, `prank`, `spoof`, `harassing`.

**Deployed 2026-08-13.** A second shared set `1L | Consumer & Junk (2026-08-13)` carrying all
33 terms (the original 21 plus those 12) is live and attached to the same four campaigns.
Free Tools is deliberately excluded: it bids on "free carrier lookup" and the list blocks
`free`.

### 2. Competitor terms are being bought inside product ad groups at product bids

`ipqualityscore` cost **$98.35** inside the Fraud Detection ad group, and `ipinfo io` cost
**$27.88** inside IP Intelligence. Both are competitor-brand navigational searches that belong
in a competitor campaign with its own bid and its own landing page. `ipqualityscore` is a
negative on Phone & Carrier API but not on New Products, which is how it got through.

### 3. Coverage is not the binding constraint. Demand size is.

The high-intent "api" universe for these products is small and expensive. Live keyword data
(OpenSEO / DataForSEO, US, 2026-08-13):

| Keyword | Volume/mo | CPC |
|---|--:|--:|
| serp api | 12,100 | $9.23 |
| tloxp | 6,600 | $6.46 |
| email validation api | 320 | $20.80 |
| email verification api | 210 | $25.50 |
| phone validation api | 140 | $16.92 |
| skip tracing api | 140 | $13.30 |
| fraud detection api | 110 | $37.90 |
| carrier lookup api | 90 | $14.49 |
| reverse phone lookup api | 90 | $21.56 |
| data enrichment api | 70 | $44.75 |
| firmographic data api | 10 | $123.55 |
| hlr lookup api | 10 | $5.84 |

Outside the two head terms, most products have **10 to 140 searches a month at $15 to $45 a
click**. There is no version of "one ad group per product" that fills $10K/month with buyer
intent. Adding thin ad groups to a budget that already starves 14 of 33 does not create demand,
it splits it thinner.

---

## Coverage map: all 43 catalogue products

`LIVE` = has a high-intent ad group today. `NEW` = added by this build. `THIN` = real demand is
under ~50 searches/month, covered by a shared ad group rather than its own.

| # | Product (catalogue code) | Ad group | State |
|--:|---|---|---|
| 1 | phone_validation | Phone Validation API | LIVE |
| 2 | phone_spam | Phone Spam & Risk | LIVE |
| 3 | email_validation | Email Verification API | LIVE |
| 4 | ip_lookup | IP Intelligence | LIVE |
| 5 | email_append | Email Append & Finder + **Append Services** | LIVE + NEW |
| 6 | phone_append (Skip Trace) | Skip Tracing + **Skip Trace Competitors** | LIVE + NEW |
| 7 | reverse_phone_lookup | Reverse Phone Lookup API | LIVE |
| 8 | phone_scrub | DNC & Phone Scrub | LIVE |
| 9 | reverse_ip_append | **Website Visitor ID** | NEW |
| 10 | reverse_email_append | **Append Services** | NEW |
| 11 | website_scraper | Website Scrapers | LIVE |
| 12 | domain_seo_intelligence | SEO Data APIs | LIVE |
| 13 | website_contacts_scraper | Website Scrapers | LIVE |
| 14 | hlr_lookup | HLR Lookup | LIVE |
| 15 | mnp_lookup | HLR Lookup | LIVE / THIN |
| 16 | nt_lookup | Phone Validation API | LIVE / THIN |
| 17 | mobile_finder | Phone Validation API | THIN (no distinct B2B demand found) |
| 18 | email_enrichment | Email Append & Finder | LIVE |
| 19 | domain_authority | SEO Data APIs | LIVE / THIN |
| 20 | domain_age | SEO Data APIs | THIN |
| 21 | backlink_overview | SEO Data APIs | LIVE / THIN |
| 22 | keyword_metrics | SEO Data APIs | LIVE |
| 23 | company_firmographics | Data Enrichment & B2B Append | LIVE / THIN |
| 24 | b2b_contact_append | Data Enrichment + **B2B Data Competitors** | LIVE + NEW |
| 25 | prospect_search | **B2B Data Competitors** | NEW |
| 26 | account_search | **B2B Data Competitors** | NEW |
| 27 | audio_transcription | Audio Transcription + **Video & Transcription** | LIVE + NEW |
| 28 | audience_intelligence | **Website Visitor ID** | NEW / THIN |
| 29 | search_intent_lookup (SERP) | **SERP & Search Data** + **SERP & Scraper Competitors** | NEW |
| 30 | business_verify | **Business Verification** | NEW |
| 31 | business_lookup | **Business Verification** | NEW |
| 32 | company_profile_lookup | **Business Verification** | NEW |
| 33 | linkedin_profile_lookup | **Person & Profile Data** | NEW |
| 34 | social_profile_check | **Person & Profile Data** | NEW |
| 35 | social_post_lookup | **Social Data** | NEW |
| 36 | video_transcript | **Video & Transcription** | NEW |
| 37 | social_search | **Social Data** | NEW |
| 38 | ad_library_lookup | **Ad Intelligence** | NEW |
| 39 | audience_demographics (TikTok) | **Social Data** | NEW / THIN |
| 40 | link_in_bio_lookup | **Social Data** | THIN (no measurable demand) |
| 41 | property_lookup | **Property & Real Estate Data** | NEW |
| 42 | job_change_check | **Person & Profile Data** | NEW |
| 43 | (IP competitor demand, no product code) | **IP Data Competitors** | NEW |

After import every one of the 43 products has a high-intent ad group. Two of them
(`mobile_finder`, `link_in_bio_lookup`) are covered only by a shared ad group because no
measurable buyer-intent search volume exists for them; building dedicated ad groups there
would create impressions, not trials.

---

## What is in this build

**1 new campaign, 13 new ad groups, 82 keywords, 13 RSAs, 50 negatives.**

New campaign `1L Search - Data Competitors` at $35/day, `Paused`:
- Skip Trace Competitors (9 kw) - tloxp 6,600/mo at $6.46, batchskiptracing 880, idi core 1,900
- B2B Data Competitors (9 kw) - zoominfo/apollo/clearbit/lusha alternative
- SERP & Scraper Competitors (5 kw) - serpapi/dataforseo/scraperapi alternative
- IP Data Competitors (6 kw) - ipinfo/ipapi/maxmind alternative

New ad groups into the existing `1L Search - New Products`:
SERP & Search Data, Social Data, Video & Transcription, Property & Real Estate Data,
Person & Profile Data, Website Visitor ID, Business Verification, Ad Intelligence,
Append Services.

Every RSA points at a `/products/*` page verified to return HTTP 200 on `www.1lookup.io`
(the apex 308-redirects, so the `www` host is used directly to save the hop).

### Claim safety

Copy re-verified against the live components on 2026-08-13 per `AD-CREATIVE-PLAYBOOK.md`.
**The playbook's copy bank was stale again:** it states "34 data products", but
`1Lookup-Marketing/src/lib/products.ts` now has `DATA_PRODUCT_COUNT = 41`. These ads say 41.
Pricing "$99/month" confirmed against `src/lib/pricing-plans.ts`. No accuracy percentages, no
third-party brand names in ad text (competitor names appear only as keywords, never as copy,
to stay inside Google's trademark policy).

---

## Read this before you import

Importing this as-is adds 13 ad groups to an account whose current structure produced **zero
incremental trials**. Do the two cleanups first, or the new ad groups just split a leaking
budget 13 more ways.

**Order of operations:**

1. ~~**Attach the negatives**~~ **DONE, live 2026-08-13.** Shared set
   `1L | Consumer & Junk (2026-08-13)`, 33 terms, on Phone & Carrier API, Email Verification,
   New Products and Competitors, plus 10 competitor-routing negatives on New Products. Applied
   with `second-brain/scripts/1lookup-google-ads-coverage-deploy.mjs --phase=negatives --live`
   and verified back out of the API. Free Tools excluded on purpose.
2. **Pause `1L Display - Prospecting`.** $295 over 17 days, 963 clicks, 0 conversions, and the
   7/28 placement report found the spend going to a teen video-chat app, dating sites and
   made-for-advertising news farms. The vault flagged this on 7/29 and it is still running.
   That is ~$13/day recoverable immediately.
3. **Then import this build**, funded by 1 and 2 rather than by new money.
4. Leave `1L Search - Data Competitors` paused until the gclid to Stripe offline import is
   unblocked, so competitor spend can be judged on Stripe trials rather than the signup pixel.

**The honest expectation:** this build fixes a real coverage gap and a real leak. It does not
fix the reason trials are flat. 90 people reach the trial page and 5 to 6 start a trial
(`1lookup.md`, CRO attack prompt, open since 8/03). At that rate more clicks mostly buy more
non-starters. The landing and trial flow is the higher-leverage problem.

## Deployment status (2026-08-13)

A scripted deployer exists so this does not have to go through Editor by hand:
`second-brain/scripts/1lookup-google-ads-coverage-deploy.mjs`. It reads these CSVs directly,
runs every phase as a Google validate-only call first, and applies nothing without `--live`.

| Phase | State |
|---|---|
| `--phase=negatives` | **Applied live**, 48 operations, verified back out of the API |
| `--phase=pause` (Display Prospecting) | Validated clean, **not applied**: blocked by the session permission classifier |
| `--phase=build` (campaign, 13 ad groups, 82 keywords, 13 ads) | Validated clean, **not applied**: blocked by the session permission classifier |

Both blocked phases pass Google's own validation, so the remaining step is a permission grant,
not a fix. One keyword, `batch skip tracing alternative`, trips Google's `EVASIVE_AD_CONTENT`
filter; Google marks it exemptible and the deployer requests the exemption automatically. The
same flag hit `[batch skip tracing]` on the 7/27 launch.

## Import steps (manual alternative)

Google Ads Editor, account 871-538-9296:

1. Account > Import > From file: `campaigns.csv`, then `ad-groups.csv`, then `keywords.csv`,
   then `ads-rsa.csv`. Import in that order; each depends on the previous.
2. Negatives: `negative-keywords.csv` carries a `Why` column Editor does not read. Either drop
   that column before import, or build one shared negative list from the `SHARED:` rows and
   attach it to Phone & Carrier API, Email Verification, New Products, Competitors and Data
   Competitors (not Free Tools), then add the `CAMPAIGN` rows to their named campaigns.
3. Review the proposed changes, then Post.

---

Source: `second-brain/companies/1lookup-google-ads-2026-07.md` (7/27 build and launch log),
`1Lookup-App/src/lib/products/seed-catalog.ts` (product catalogue),
live Google Ads API + Stripe pulls 2026-08-13.
