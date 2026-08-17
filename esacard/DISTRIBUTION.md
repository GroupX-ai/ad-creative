# ESA Card | where each asset has been published

One row per asset per platform. Update this when anything ships, so nobody re-uploads a clip
that is already live or launches a duplicate ad.

## The shippable set

- **20 banners**, `2026-08-14-spelled-out/p*.png`. The acronym is spelled out in full
  everywhere except inside the domain.
- **10 videos**, `2026-08-14-approved/d*-captioned.mp4` and
  `2026-08-14-batch2/e*-captioned.mp4`. Vertical 9:16, 720p, 15 seconds, burned one-word
  captions.
- **5 extra videos**, `2026-08-14-spelled-out/c*-captioned.mp4`. A different register (one
  person talking to a phone) rather than the slice-of-life formula Robby approved. Held in
  reserve, not part of the ten.

## YouTube

Channel: **ESA Card**, connected through Postiz (integration `cmsrzf7y402wmqb0ybqllpkdl`).

All ten uploaded 2026-08-13, public, `selfDeclaredMadeForKids: no`. Uploaded as vertical
15-second clips, so they land as Shorts.

| clip | title |
| --- | --- |
| `d1-viewing` | Fourth viewing this month. It used to take a week. |
| `d2-lobby` | The lobby question I used to dread |
| `d3-bench` | I used to stand in the street explaining her |
| `d4-section-four` | Rental application, section four |
| `d5-hotel` | Checking in with the dog. No phone calls, no forms. |
| `e1-first-day` | His first day at daycare |
| `e2-keys` | Keys to our first flat |
| `e3-back-sunday` | Back Sunday. He has already stolen the sofa. |
| `e4-cottage` | Six hours in the car for this |
| `e5-haircut` | His first ever haircut |

Every description carries the same three blocks: the clip's own opening line, the offer
(certificate and ID card, verifiable registration number, $39 one time, no subscription), and
the honesty block required by `docs/ads/policy.md` in the `esacard.com` repo. No description
claims a housing, landlord, airline or access outcome.

**Why this matters beyond the channel:** a Google Ads video campaign can only run creative
that already lives on YouTube. These ten being public is the precondition for that campaign,
not just a content play.

### Uploading more later

Postiz only accepts media from a public URL, and these files are local. The route that works
is fal's storage API: `POST https://rest.alpha.fal.ai/storage/upload/initiate` with
`{content_type, file_name}` returns `{file_url, upload_url}`, then `PUT` the bytes to
`upload_url`. `file_url` is public and Postiz's `uploadFromUrlTool` accepts it.

## Launched 2026-08-13, rebalanced to $1,000/month

Four platforms live, **$32.88/day combined = $1,000/month**, which is the total Robby set
across every ad account.

| platform | campaign | daily | monthly | optimising for | creative |
| --- | --- | --- | --- | --- | --- |
| Meta | `ESA Card \| Meta \| US \| Cold \| Sales` | $13.88 | $422 | **Purchase** (since 2026-08-17, see below) | 20 images + 10 videos |
| Google Search | `ESA Card \| Search \| US \| Core` | $9.00 | $274 | Purchase (site tag) | 3 RSAs, ~70 keywords |
| Google Demand Gen | `ESA Card \| Demand Gen \| US \| YouTube` | $5.00 | $152 | Purchase (site tag) | 2 ads × 5 YouTube clips |
| Reddit | `ESA Card \| Reddit \| Pet + Housing \| Launch` | $5.00 | $152 | **Purchase** (since 2026-08-17, see below) | 20 images + 10 videos |

### Moved to Purchase optimisation, 2026-08-17 (Robby: "I think we can start optimizing around purchases - it's clearly converting")

- **Meta:** conversion settings are immutable on a published ad set, so the switch is a new ad
  set. New: `ESA | US | Broad | Purchase` `120247870160610605` (same targeting, same CBO
  budget, promoted_object `PURCHASE`), all 30 ads recreated against the same creative ids and
  ACTIVE (10 videos re-entered review, expected). Old:
  `ESA | US | Broad | InitiateCheckout` `120247770766910605` PAUSED and renamed. Learning
  phase reset accepted, Robby made the call.
- **Reddit:** the goal is immutable after creation, so the switch is a new ad group. The gate
  opened first: `GET /pixels/a2_ji9rrnreyf0d/last_fired_at` showed `purchase` fired
  2026-08-17T15:29Z. New: `ESA | Pet + Housing | Purchase` `2570690648253263407`
  (`optimization_goal: PURCHASE`, same 63-community targeting, $5/day), all 30 ads recreated
  against the same post ids, ACTIVE/PROCESSING (Reddit review). Old PageVisit bootstrap group
  `2567956092694490967` ARCHIVED.

### Why the split is shaped this way

**Two of the four are pinned at a platform floor, not chosen.** Google Demand Gen and Reddit
both reject any daily budget under **$5.00**:

- Demand Gen: `BUDGET_BELOW_PER_DAY_MINIMUM`, `minimumBudgetAmountMicros: 5000000`
- Reddit: `"Daily spend goals must be at least $5.00."`

That fixes $10/day. The remaining $22.88 splits between the two channels that can actually
convert, weighted to Meta because it carries all 30 creatives and now reaches Instagram
Reels, where the vertical videos were designed to run.

**Honest caveat.** `docs/ads/meta-ads.md` section 7 says a minimum honest Meta test is two
weeks at $50/day, and that below that you are paying for learning-phase delivery and reading
noise. At $13.88/day Meta is well under that line. Spread across four platforms, $1,000/month
funds presence on all of them rather than a readable test on any one. Concentrating the whole
$1,000 on Meta alone would come closer to a real read.

### US-only targeting, verified per platform

| platform | setting | verified |
| --- | --- | --- |
| Google Search | `positive_geo_target_type: PRESENCE` | yes, physical presence only, not interest |
| Google Demand Gen | `positive_geo_target_type: PRESENCE` | yes, set on the ad group (Demand Gen rejects campaign-level geo criteria) |
| Meta | `geo_locations.countries: ["US"]` | yes |
| Reddit | `geolocations: ["US"]`, no exclusions | yes |

Google defaults to PRESENCE now rather than the older "presence or interest", so no US-interested
foreign traffic is bought. Both campaigns were explicitly set anyway.

**Meta will not accept `location_types: ["home"]` alone at country level.** Writing it returns
`success: true` and reads back as `["frequently_in", "home"]`, with Advantage+ Audience on or
off. Both values mean physically in the United States, so there is no interest-based leakage;
Meta simply does not expose a stricter country-level setting.

### Why nothing optimises for Purchase except Google

Meta and Reddit both need roughly 50 optimisation events per week to leave the learning
phase. Break-even is **$37.57** per purchase, so 50 a week is about $1,878 a week, far above
this budget. A Purchase-optimised ad set would sit in learning indefinitely and deliver
badly. See `docs/ads/meta-ads.md` section 3 in the `esacard.com` repo.

`Purchase` is still **measured** everywhere, browser and server. Optimisation target and
success metric are different things: the success metric is always cost per purchase against
$37.57, reconciled against Stripe as the system of record.

Google Search is the exception and legitimately optimises for Purchase, because search
intent is narrow enough that the conversion action can carry the campaign.

### Reddit is a bootstrap, not a real conversion campaign

Reddit's API **refuses** `PURCHASE`, `ADD_TO_CART`, `VIEW_CONTENT` and `LANDING_PAGE_VISIT`
as optimisation goals on this account: "Conversion goal(optimization goal) is not valid for
Conversions Campaigns". Confirmed cause, not a guess. `GET /pixels/{id}/last_fired_at`
returns:

```
page_visit   2026-08-13T21:35:19Z
purchase     null
add_to_cart  null
view_content null
sign_up      null
```

Reddit will only let you optimise for an event its pixel has actually seen, and `page_visit`
is the only one. The ad group is therefore named as a bootstrap and must be **rebuilt on
Purchase once real events land** (the goal is immutable after creation, so it is a rebuild,
not an edit). The two earlier clicks-optimised ad groups are archived.

### Tracking state

| | state |
| --- | --- |
| Meta pixel `4305407809789395` | live and firing; `Purchase` seen on 2026-08-15 and 2026-08-17 (real sales, reconciled to Stripe) |
| Meta Conversions API | token set in Vercel; browser+server dedup keyed on registration number |
| TikTok pixel `D9V1HSBC77UBUCS23800` (id `7673594860187762706`) | ACTIVE, developer mode; `SHOPPING`, `INITIATE_ORDER`, `ON_WEB_DETAIL` configured in code; all four paid buyers to date carried the `_ttp` cookie in Stripe metadata, so the pixel demonstrably loads on real purchase paths |
| TikTok Events API | token set in Vercel, production deployed |
| Reddit pixel | `purchase` fired 2026-08-17T15:29Z, `add_to_cart` + `view_content` same day — the conversion gate that blocked launch is now open (and used: the Purchase ad group above) |
| Google conversion | `ESA Purchase (site tag)`, `AW-18387903752 / Y4F_CN7rlOEcEIjKhMBE`, primary; first recorded conversion 2026-08-16 (Search) |

### Known gaps at launch

1. ~~No Instagram identity on the Meta ads.~~ **Resolved 2026-08-13.** All 30 ads now run
   under the `@esa_card` Instagram identity (`17841438094553997`), confirmed by reading
   `creative{instagram_user_id}` back on all 30 and by rendering Instagram Feed and Reels
   previews.

   Worth keeping, because it cost a full failed pass. The account first appeared on
   `/act_.../connected_instagram_accounts` while still failing every creative create with
   `error_subcode 1815199`, "Ad Account Has No Access To Instagram Account".
   **`connected_instagram_accounts` is not the readiness check; `/act_.../instagram_accounts`
   is.** The latter stayed empty until the account was assigned to the ad account in Business
   Settings, and once it returned `{"id": "...", "username": "esa_card"}` every create
   succeeded. Test that edge before rebuilding creatives, not the connected one.

   Second trap on the same pass: `instagram_user_id` cannot be added to a live creative
   (`Failed to update the creative. Please specify name, status or associated adlabels`), so
   the creatives must be rebuilt and the ads repointed. When rebuilding from a fetched
   `object_story_spec`, Meta returns `video_data` carrying **both** `image_url` and
   `image_hash` and then rejects a spec containing both with `ObjectStorySpecRedundant`
   (subcode 1443051). Drop `image_url` and keep the hash. That is what failed the 10 video
   ads while all 20 image ads went through.

   Swapping creatives sends the ads back through review, which is expected.
2. **Domain verification for `esacard.com` is not done** on Meta (Business Settings → Brand
   Safety → Domains) or TikTok (Business Center → Assets → Domains).
3. **The ESA Card Facebook Page has 0 fans and no posts.** A page with no content is a
   review risk and hurts credibility on click-through.
4. **Special ad category is declared as none.** ESA Card sells a pet product, not a housing
   opportunity, so that is correct, but some creative depicts leasing offices and rental
   forms. If Meta disagrees, this is where a disapproval will come from.

## TikTok

**Built 2026-08-17, everything DISABLED at every level. Nothing can spend until Robby OKs a
budget split** (the $1,000/month cap is fully allocated and TikTok's ad-group floor is
$20/day, so activating it needs either a cap raise or cuts elsewhere).

| | value |
| --- | --- |
| Campaign | `ESA Card \| TikTok \| US \| Web Conversions` `1873787435137170`, WEB_CONVERSIONS, DISABLED |
| Ad group | `ESA \| US \| 25-55 \| Broad \| Purchase` `1873787389986961`, CONVERT → `SHOPPING` (Complete Payment) on pixel `7673594860187762706`, $20/day (TikTok's minimum), US only, 25-54 age bands, broad, TikTok placement only, 7-day click / 1-day view, DISABLED |
| Ads | 10 video ads, one per approved clip (d1-d5, e1-e5), all DISABLED. Identity: `ESA Card` (@esacard) via Business Center `7581306495212617745` (`BC_AUTH_TT`) — the account was created after TikTok's 2026-01-15 cutoff, so custom identities cannot run non-Spark ads on TikTok placement; the Business-Center-authorized identity is the working route |
| Links | `utm_source=tiktok&utm_medium=paid_social&utm_campaign=esa-card-tiktok-us-web-conversions&utm_content=vid-<clip>` |
| Ad text (all 10) | "A wallet card with your pet's photo and a certificate for the wall. $39 once, no renewal fees." |

**Age note:** TikTok's bands are 25-34 / 35-44 / 45-54, so "25-55" is targeted as those three
bands; 55 exactly is unreachable without adding the whole 55+ band.

**Upload trap, hit and solved:** TikTok's `UPLOAD_BY_URL` refuses
`raw.githubusercontent.com` (serves `application/octet-stream`; error 40914 "Failed to fetch
url data"). Same class as the Postiz limitation above, same fix: rehost the file through
fal's storage API (`content_type: video/mp4`) and upload from the fal URL. All 10 clips went
through on the first try that way. Video covers are required on non-Spark video ads
(`image_ids`); TikTok's own generated `video_cover_url` re-uploaded via
`/file/image/ad/upload/` works.

**Not verifiable by API:** domain verification for `esacard.com` (Business Center → Assets →
Domains) has no API surface in the tools used; check it in the UI before activating. The 20
banners are deliberately not uploaded yet: videos first, best banners after, per the plan.

## Two API facts worth keeping

- **Reddit ad `type` is `UNSPECIFIED`, not `PROMOTED_USER_POST`.** The value in
  `_scripts/reddit-launch-bitpredict.mjs` is wrong; that script never reached its own
  activation step, so it was never caught. All 30 posts were created before the ads failed.
- **Reddit updates are `PATCH /ad_groups/{id}`**, with no `/ad_accounts/{id}` prefix. The
  prefixed path 404s. Same script, same latent bug.
- **Google removed `VIDEO_ACTION` campaigns in API v25.** Video-for-conversions is now
  Demand Gen (`advertising_channel_type: DEMAND_GEN`), whose targeting lives on the ad group,
  not the campaign, and which requires `contains_eu_political_advertising`.
