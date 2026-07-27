# 1Lookup Google Ads rebuild — $10K/month (2026-07-27)

Full account rebuild for the $10K/month budget Robby approved on 2026-07-27 (up from ~$2.7K/mo). Goal: free trial signups. Everything here is import-ready: search campaigns as Google Ads Editor CSVs in `editor-import/`, display campaigns fully specced in `display/` with finished banners.

Grounding: keyword volumes and CPCs pulled from Ahrefs (US) on 2026-07-27. Copy uses only the approved claims bank in `AD-CREATIVE-PLAYBOOK.md` (1Lookup-Marketing repo): no accuracy percentages, no invented stats.

## Budget: how the $10K splits

$329/day total. Google bills daily budget x 30.4.

| # | Campaign | Daily | Monthly | What it targets |
|---|---|---|---|---|
| 1 | Search - Phone & Carrier API | $63 | ~$1,915 | phone validation api, carrier lookup api, HLR, reverse phone ($4.50-8 CPCs, highest intent) |
| 2 | Search - Email Verification | $53 | ~$1,611 | email verification api, bulk list cleaning ($5-9 CPCs, big competitor set) |
| 3 | Search - New Products | $59 | ~$1,794 | skip tracing (batch skip tracing: 1,100 searches/mo at ~$1.60), DNC scrub, fraud, IP, enrichment, scrapers, SEO data, transcription |
| 4 | Search - Competitors | $43 | ~$1,307 | numverify, twilio lookup, zerobounce, neverbounce, IPQS, melissa, telesign, kickbox, hlrlookup → /compare/* pages |
| 5 | Search - Free Tools | $26 | ~$790 | carrier lookup (9,900/mo), free carrier lookup (12,000/mo), email verifier (5,200/mo), reverse email lookup (9,500/mo) at ~$0.70-1.20 CPCs; feeds the remarketing pool cheaply |
| 6 | Search - Brand | $7 | ~$213 | 1lookup terms, protects the brand SERP |
| 7 | Display - Remarketing | $39 | ~$1,186 | site visitors + trial abandoners, 30 days |
| 8 | Display - Prospecting | $39 | ~$1,186 | custom segments built from competitor sites + in-market |
| | **Total** | **$329** | **~$10,002** | |

Why this shape: the high-intent "api" terms are low volume (150-700 searches/mo each), so they cannot absorb $10K alone. The cheap high-volume tool terms and display are what fill the budget while the API campaigns take every high-intent click available.

## Expected numbers (estimate, not verified)

~1,900 search clicks/mo (blended ~$4 CPC) + ~4,800 display clicks (~$0.50). At 4-6% search and 0.5-1% display trial conversion: **~100-165 trials/mo, $60-100 per trial**. At the historical 1-in-3 trial-to-paid rate that is $180-300 paid CAC, above the $150 gate; it only clears the gate if the July conversion fixes lift trial-to-paid. That is exactly what the CAC gate is for: prove it before scaling past $10K.

## Guardrails (from the 7/15 mastermind)

1. **Binding gate: $150 Stripe-verified paid CAC.** Measured on real Stripe subscriptions, not the pixel or trial count.
2. Kill rules: pause any ad group at $300 spend with 0 trials (campaigns 1-4); pause any campaign above $200/trial after 2 weeks; pause Free Tools if CPC creeps above $1 or it delivers less than 1 trial per $150.
3. Weekly: search-terms report review, move spend from losers to winners, mine negatives.

## Conversion tracking (must be live BEFORE spend starts)

1. **Primary conversion: Trial Started.** Best: capture `gclid` at signup, store it on the org record, and upload offline conversions daily via Google Ads API (Stripe webhook already fires Trial Started into Mixpanel, wired 7/8). Minimum viable: gtag conversion event on the trial-success page.
2. **Secondary: Paid Subscription** with first-invoice value attached, imported the same way. This is what the $150 CAC gate reads from.
3. **Micro (observe only): free tool lookup completed**, so display and Free Tools campaigns have an optimization signal.
4. Enhanced conversions (hashed email) as backup where gclid is missing.
5. Account-level final URL suffix: `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_adgroup={adgroupid}&utm_term={keyword}&utm_content={creative}` (Mixpanel already reads UTMs).

Dev ask (Afaq): store gclid + UTMs on signup, expose a daily conversions export keyed on gclid.

## Bidding plan

1. Weeks 1-2: Manual CPC using the max CPCs in `ad-groups.csv` (no conversion history at this volume yet).
2. Switch a campaign to Maximize Conversions once it has 15-20 recorded trials.
3. Set Target CPA ~$100 once a campaign passes 30 trials.
4. Display Remarketing starts on Maximize Conversions day one (small audience, let it learn); frequency cap 3/day.

## Settings that must be set manually after import

1. Search campaigns: Search Network only. Search partners OFF. Display Expansion OFF.
2. Location: United States + Canada, "Presence" only (not "Presence or interest").
3. Language: English.
4. Ad rotation: Optimize.
5. Attach the two shared negative lists in `negative-keywords.csv` (marked SHARED) to campaigns 1-4; campaign-specific negatives are listed per campaign.
6. **Audit the legacy campaigns currently spending ~$2.7K/mo: pause them once this build is live** so they do not double-serve. Do not delete (history is useful).
7. Competitor campaign: bidding on competitor brand keywords is allowed; using their trademark in ad text is not. The RSAs for campaign 4 contain no competitor names.

## Files

- `editor-import/campaigns.csv` — 6 search campaigns with budgets
- `editor-import/ad-groups.csv` — 31 ad groups with starting max CPCs
- `editor-import/keywords.csv` — ~150 keywords, exact + phrase
- `editor-import/negative-keywords.csv` — shared + campaign-level negatives
- `editor-import/ads-rsa.csv` — one responsive search ad per ad group (all headlines ≤30 chars, descriptions ≤90, validated)
- `editor-import/assets-extensions.csv` — sitelinks, callouts, structured snippets
- `display/README.md` — both display campaigns fully specced: audiences, assets, exclusions, plus generation prompts for the 4 new banners
- `display/1lookup-g1-*.png`, `display/1lookup-g2-*.png` — new Google-ratio banners (1200x628 + 1200x1200)

Import order in Google Ads Editor: campaigns → ad groups → keywords → negatives → ads → extensions. Review everything in Editor before posting.

## Landing pages used (all live on www.1lookup.io)

Products: /products/phone-validation, /products/carrier-lookup, /products/hlr-lookup, /products/reverse-lookup, /products/email-validation, /products/email-append, /products/skip-trace, /products/phone-scrub, /products/phone-spam-check, /products/fraud-detection, /products/ip-lookup, /products/b2b-contact-append, /products/website-scraper, /products/domain-seo-intelligence, /products/bulk-audio-transcription, /products/reverse-email-append.
Compare: /compare/numverify, /compare/twilio-lookup, /compare/telesign, /compare/zerobounce, /compare/neverbounce, /compare/kickbox, /compare/ipqualityscore, /compare/melissa, /compare/hlrlookup.
Free tools: /tools/carrier-lookup, /tools/email-verifier, /tools/phone-number-lookup.

## Keyword data snapshot (Ahrefs US, 2026-07-27)

| Keyword | Vol/mo | CPC |
|---|---|---|
| free carrier lookup | 12,000 | $1.20 |
| carrier lookup | 9,900 | $0.70 |
| reverse email lookup | 9,500 | $0.90 |
| email verifier | 5,200 | $1.00 |
| phone number validator | 2,800 | $1.00 |
| batch skip tracing | 1,100 | $1.60 |
| ip geolocation api | 1,000 | $3.00 |
| data enrichment api | 900 | $13.00 |
| email verification api | 700 | $7.00 |
| email validation api | 600 | $5.00 |
| backlink api | 600 | $7.00 |
| keyword research api | 500 | $8.00 |
| email list cleaning | 400 | $9.00 |
| hlr lookup | 400 | $0.70 |
| fraud detection api | 300 | $10.00 |
| phone validation api | 250 | $6.00 |
| skip tracing api | 150 | $4.50 |
| bulk phone number validation | 150 | $4.00 |
| zerobounce alternative | 70 | $12.00 |
| neverbounce alternative | 70 | $7.00 |
