# 1Lookup batch 13 — a named banner for every product (2026-08-19)

Robby's brief: *"We need to go way harder with our paid ads for 1Lookup. I want ads for each
product, properly named. Combination of banners and video ads (Seedance 2.5)."*

**56 concepts, 117 files, ~$23.40 of fal spend.** Every product in the catalogue now has its
own named banner, and the file name, the ad name on every platform, and the landing page all
carry the same product slug.

Prompts: [`_scripts/banner-prompts-b13-1lookup.mjs`](../../_scripts/banner-prompts-b13-1lookup.mjs)
Generator: [`_scripts/banner-generate.mjs`](../../_scripts/banner-generate.mjs) (new)
Claim gate: [`_scripts/banner-prompt-lint.mjs`](../../_scripts/banner-prompt-lint.mjs) (new)
Naming standard: [`NAMING.md`](../../NAMING.md) (new)
Run log with every prompt and sha: `_scripts/banner-run-log-2026-08-19-b13-product-banners.json`

## Three families, because the account has never run a readable creative test

The Meta audit on 2026-08-19 found 200 ads built and 15 running on $50/day, roughly $3.30 per
ad per day, and **not one creative in the account's history has enough delivery to have earned
a quality or conversion ranking.** So the point of this batch is not more creative, it is a
test that can actually be read: three families that are deliberately opposite bets, each
carrying the product slug so a report can be grouped by product and by family.

| Family | Count | What it is | Why |
|---|--:|---|---|
| **product-truth** | 43 concepts, 86 files | Dark developer-terminal card showing that product's real API response field names, values rendered as empty pills | The workhorse. It names the product, so it can run in a per-product ad set on any platform, and it is the only family that can carry 43 different pitches. |
| **analog** | 8 concepts, 16 files | A real physical surface someone wrote on, shot on a phone | The register Robby picked outright on VoiceDrop ("best by far") and which has never been tried on 1Lookup. Top 8 products only. |
| **direct-response** | 5 concepts, 15 files | Loud offer poster, hazard tape, brutalist inversion, cropped mega-numeral | Platform-level, leaning on 41 data products / one API key / one shared balance. |

The feed punishes the middle, so the loud family and the native family both run and the ad set
name carries the family. Nothing polished-corporate is in this batch: that family has never
once been picked, and the only two ads in the account with a quality score both came back
BELOW_AVERAGE or AVERAGE.

## Shapes

| Shape | Generated at | Delivered at | Used for |
|---|---|---|---|
| square | 1024x1024 | 1024x1024 | Meta feed 1:1, Reddit feed, Google Display square |
| landscape | 1200x624 | **1200x628** | Meta link ads 1.91:1, Google Display landscape |
| vertical | 1088x1920 | **1080x1920** | Stories, Reels, TikTok 9:16 |

**Neither non-square delivery size can be generated directly**: fal requires both dimensions to
be a multiple of 16, and neither 628 nor 1080 is. Landscape was the known case; vertical is the
one that bites silently, because fal accepts a width of 1080 and quietly returns 1072, which
ships a 0.5583 aspect where Stories wants 0.5625. The generator now generates at a legal size,
resizes to the delivery size and **asserts the delivered pixels**, so a wrong-sized file cannot
land. Every file in this folder was measured after writing.

## Claim safety

Every headline and subheadline was derived from **that product's own page**, read out of
`1Lookup-Marketing/src/app/(en)/products/<slug>/page.tsx` on 2026-08-19. Not from the
playbook's copy bank, which has now been stale twice. The full extracted copy bank is quoted
inside the prompts module, one line per product.

- `DATA_PRODUCT_COUNT = 41`, re-verified this batch two ways: the constant in
  `1Lookup-Marketing/src/lib/products.ts`, and independently by counting unique `code:` entries
  in `1Lookup-App/src/lib/products/seed-catalog.ts`, which returns exactly 41. (One research
  pass claimed it should be 42; it is not, and the site is correct.)
- **No accuracy percentage anywhere.** 1Lookup's deliberate discipline, PR #38 trust purge.
- **No third-party logos or brand names in rendered copy.** Platform names appear only where
  that product's own page states them as coverage (Claude and Cursor on MCP; four ad libraries
  on Ad Library Lookup), and always as words, never as marks.
- **No disclaimers.** Ads sell and never disclaim (Robby, twice, most recently 2026-08-13).
- **API response cards carry field names and empty pills, never values.** The 2026-07 batch
  proved the model writes plausible-but-wrong values into any field it is allowed to fill, and
  a wrong product mechanic is worse than an empty one.

`banner-prompt-lint.mjs` enforces all of the above and runs **inside** the generator, so a
prompt that would fabricate a feature chip, open on a disclaimer, quote an accuracy percentage
or name a competitor cannot spend money. It returned 0 errors and 1 warning on this batch. The
warning is `1lookup-fraud-detection-b13c56`, where a character's handwritten line says "Best
signup day ever. All one guy." That is in-scene fiction about their own week, the same ruling
batch 12 made for numbers characters say about their own list, and it is not a product claim.

## The 43 products

Ids are permanent. `b13c01` is the join key between this folder, the ad name on Meta, Google
and Reddit, the `utm_content` on the click, and the prompt in the run log.

| Family | Products |
|---|---|
| direct-response (platform) | b13c01 forty-one-keys · b13c02 vendor-graveyard · b13c03 hazard · b13c04 one-balance · b13c05 stop-paying |
| Validate | b13c06 phone-validation · b13c07 email-validation · b13c08 ip-lookup · b13c09 phone-spam-check · b13c10 hlr-lookup · b13c11 carrier-lookup · b13c12 phone-scrub · b13c13 fraud-detection · b13c14 business-verify |
| Enrich | b13c15 email-append · b13c16 reverse-email-append · b13c17 reverse-ip-append · b13c18 reverse-lookup · b13c19 skip-trace · b13c20 mobile-finder · b13c21 email-enrichment · b13c22 b2b-contact-append · b13c23 company-firmographics · b13c24 company-profile-lookup · b13c25 linkedin-profile-lookup · b13c26 business-lookup · b13c27 property-lookup |
| Social | b13c28 social-profile-check · b13c29 social-post-lookup · b13c30 video-transcript · b13c31 social-search · b13c32 ad-library-lookup · b13c33 tiktok-audience-demographics · b13c34 link-in-bio-lookup |
| Monitor | b13c35 job-change-monitoring |
| Intelligence | b13c36 search-intent-lookup · b13c37 keyword-metrics · b13c38 domain-authority · b13c39 domain-age · b13c40 backlink-overview · b13c41 domain-seo-intelligence · b13c42 audience-intelligence · b13c43 prospect-search · b13c44 account-search · b13c45 website-scraper · b13c46 website-contacts-scraper · b13c47 bulk-audio-transcription · b13c48 mcp |
| analog | b13c49 skip-trace · b13c50 phone-scrub · b13c51 email-validation · b13c52 phone-validation · b13c53 search-intent-lookup · b13c54 reverse-ip-append · b13c55 prospect-search · b13c56 fraud-detection |

## Where they go

Each banner's destination is its own product page, not the homepage. That is a change: all 57
linked creatives currently in the Meta account point at `https://www.1lookup.io/`, so an ad
about skip tracing lands a visitor on a generic homepage and asks them to re-find the promise.
Every destination in this batch carries UTMs built from `NAMING.md`, so a Stripe subscription
can be traced back to one file here.

Build script, everything PAUSED:
[`_scripts/meta-rebuild-1lookup-b13.mjs`](../../_scripts/meta-rebuild-1lookup-b13.mjs).

## Not done here

- **Nothing is live.** Standing rule: build paused, Robby flips.
- Wave 2 re-rolls have not been run. Review the contact sheet, list the failures, re-roll only
  those; the prompts are all in the run log.
- The eight analog concepts are the highest re-roll risk in the batch. Hand-lettering is where
  this model garbles, far more than clean type, and two prior batches dropped the brand name
  entirely from hand-lettered surfaces.
