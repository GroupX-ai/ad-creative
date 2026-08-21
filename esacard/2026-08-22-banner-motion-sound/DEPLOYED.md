# Where the 32 animated banners are running (2026-08-22)

Robby: *"Please deploy all of these on TikTok ads at $100 / day, US audience (same as before).
Please also deploy all of these on Meta Ads as a new campaign - same exact audience as the Weird
Animals one, but a separate campaign with these videos (I want to test them against the weird
animal banners and videos) - also $100 / day"*.

Both are **live**. This adds **$200/day**, taking ESA Card paid to **$314/day**: Meta $84 on the
existing four campaigns, Meta $100 on this new one, TikTok $100 on this new one, Reddit $30. The
old TikTok campaign stays off.

## TikTok

| | |
| --- | --- |
| Campaign | `ESA Card | TikTok | US | Animated Banners | Purchase` `1874171439614978` |
| Ad group | `ESA | US | 25-55 | Broad | Purchase | Animated Banners` `1874171301204001` |
| Budget | **$100/day** |
| Audience | United States, 25-54, all genders, TikTok placement only. Identical to the old US ad group. |
| Optimisation | Purchase (`CONVERT` / `SHOPPING`) on pixel `7673594860187762706` |
| Ads | **32**, all ENABLE, in TikTok review (`AD_STATUS_AUDIT`) at creation |
| Identity | `@esacard` |

The old campaign `ESA Card | TikTok | US | Web Conversions` `1873787435137170` remains **DISABLE**
from 2026-08-21. It spent $134.35 for zero sales. Nothing about it was reused.

## Meta

| | |
| --- | --- |
| Campaign | `ESA Card | Meta | US | Weird Animals | ANIMATED VIDEO` `120247971648290605` |
| Ad set | `ESA | US | Weird Animals | ANIMATED VIDEO` `120247971648670605` |
| Budget | **$100/day**, campaign-level (CBO), highest volume |
| Audience | **Copied field for field** off `ESA | US | Weird Animals | InitiateCheckout` `120247924771890605` |
| Optimisation | `OFFSITE_CONVERSIONS` on `INITIATED_CHECKOUT`, same pixel, same as the source |
| Ads | **32**, all ACTIVE |

The point of this campaign is that the creative is the only variable against the Weird Animals
banners. So the audience is copied rather than retyped, and the copy, headline, CTA and landing
page are the ones its banners already run:

- Primary text: "$39 once. That is the whole price. / The registration never expires and the
  verification listing stays live for good. / A wallet card with your animal's photo and a
  certificate for the wall, both print-ready, both in your inbox in about three minutes."
- Headline: "$39 once. Never again." · CTA: Get offer
- Thumbnail: the padded source banner, which is frame one of each clip, so the still frame is
  the static banner it is being tested against.

## Reading the test

Both campaigns tag every click, so Stripe can settle it without trusting either platform:
`utm_campaign=esa-card-tiktok-animated-banners` and `esa-card-meta-animated-banners`, with
`utm_content` naming the animal. Compare against `utm_campaign` on the Weird Animals banners.

## Gotchas hit while deploying, for next time

- **Meta will not take a video ad without a thumbnail.** It does not fall back to frame one:
  subcode 1443226, "Your ad needs a video thumbnail". Upload the still to `/adimages` first and
  pass `image_hash`.
- **TikTok will not either**, and its error is much blunter: `40002 You must upload an image`.
  Covers go through `/file/image/ad/upload/` and the id goes in `image_ids`.
- **TikTok has no scripted path here**, so 32 videos, 32 covers and 32 ads are individual tool
  calls; Meta has a system-user token, so its whole side is one script (`deploy-meta.mjs`).
- **One TikTok upload failed with `vids doesn't exist in our records`** and succeeded on a plain
  retry. Transient; check the count before creating ads.
- Both platforms ingest by public URL, so the clips and covers go to the fal CDN first
  (`all/video-urls.json`, `all/cover-urls.json`).
