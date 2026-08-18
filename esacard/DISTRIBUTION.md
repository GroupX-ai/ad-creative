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

**Superseded 2026-08-18.** The table below is the launch-day split, kept for history.
Current state: Meta raised to $30.00/day on Robby's instruction, TikTok live at $20.00/day
(August burst, approved separately), so the combined total is **$69.00/day (~$2,098/month)**
across five platforms. Details in "Update 2026-08-18" below.

| platform | campaign | daily | monthly | optimising for | creative |
| --- | --- | --- | --- | --- | --- |
| Meta | `ESA Card \| Meta \| US \| Cold \| Sales` | $13.88 | $422 | InitiateCheckout | 20 images + 10 videos |
| Google Search | `ESA Card \| Search \| US \| Core` | $9.00 | $274 | Purchase (site tag) | 3 RSAs, ~70 keywords |
| Google Demand Gen | `ESA Card \| Demand Gen \| US \| YouTube` | $5.00 | $152 | Purchase (site tag) | 2 ads × 5 YouTube clips |
| Reddit | `ESA Card \| Reddit \| Pet + Housing \| Launch` | $5.00 | $152 | PageVisit | 20 images + 10 videos |

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

**Meta location_types is dead. Never write it again.** (Updated 2026-08-18.) At launch,
writing `location_types: ["home"]` read back as `["frequently_in", "home"]`. On 2026-08-17
Meta removed those legacy options platform-wide, and any ad set still carrying them blocks
on republish with error **#1870194** ("location targeting option that has been removed") -
which is exactly what hit the paused InitiateCheckout ad set. The fix, applied to both ESA
ad sets on 2026-08-18: send `geo_locations: {"countries": ["US"]}` with NO `location_types`
key; Meta then stamps its new canonical default `["frequently_in", "home", "recent"]`. All
of these mean physically in the United States; there is no stricter country-level setting.

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
| Meta pixel `4305407809789395` | live and firing, confirmed by `last_fired_time` |
| Meta Conversions API | token set in Vercel, not fired yet (no purchase since) |
| TikTok pixel `D9V1HSBC77UBUCS23800` | live, production only |
| TikTok Events API | token set in Vercel, not fired yet |
| Reddit pixel | only `page_visit` has ever fired |
| Google conversion | `ESA Purchase (site tag)`, `AW-18387903752 / Y4F_CN7rlOEcEIjKhMBE`, primary |

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

Live since 2026-08-17, launched by the handoff session from `esacard/TIKTOK-HANDOFF.md`.
Campaign `1873787435137170` "ESA Card | TikTok | US | Web Conversions", ad group
`1873787389986961` "ESA | US | 25-55 | Broad | Purchase | $300 Aug burst" at $20.00/day,
US only, TikTok placement only, optimising for Complete Payment (`SHOPPING`) on pixel
`7673594860187762706`. All 10 videos run as ads under the `@esacard` identity
(`BC_AUTH_TT`; the account is too new for custom identities), CTA Shop now, landing page
tagged `utm_source=tiktok`.

## Update 2026-08-18: Meta location fix, two-ad-set test, $30/day

What changed since launch, all verified by API read-back:

- **Meta broke, then got fixed.** The 2026-08-17 handoff session paused the
  InitiateCheckout ad set and created a Purchase ad set (`120247870160610605`) per Robby's
  optimise-for-purchases decision. The paused ad set then blocked on Meta error #1870194
  because Meta removed the legacy `location_types` values (see the location note above).
  Fixed 2026-08-18: `location_types` stripped from both ad sets, the InitiateCheckout ad
  set reactivated, and the 13 newer `o-c*` ads mirrored into it so **both ad sets run the
  same 43 ads** and compete: InitiateCheckout (25-65) vs Purchase (18-65), same campaign.
- **Meta budget doubled to $30.00/day** on Robby's instruction, set at campaign level
  (`120247770766350605`), so the two ad sets compete for one budget.
- **Google's MISCONFIGURED / "missing a goal" state is cleared.** Cause was the PURCHASE
  conversion goal sitting `biddable: false`; fixed 2026-08-14 via
  `campaignConversionGoals:mutate` + `customerConversionGoals:mutate`. Read-back
  2026-08-18: Search `primary_status: LIMITED` (`BIDDING_STRATEGY_LEARNING`), Demand Gen
  `LEARNING`. Both normal for new Maximize Conversions campaigns.
- **Reddit now optimises for Purchase.** The 2026-08-17 session archived the PageVisit
  bootstrap ad group and created `2570690648253263407` "ESA | Pet + Housing | Purchase",
  ACTIVE at $5.00/day (the goal is immutable, so this was the planned rebuild).
- **Current daily spend: Meta $30 + Google Search $9 + Demand Gen $5 + Reddit $5 +
  TikTok $20 = $69.00/day.**

## Two API facts worth keeping

- **Reddit ad `type` is `UNSPECIFIED`, not `PROMOTED_USER_POST`.** The value in
  `_scripts/reddit-launch-bitpredict.mjs` is wrong; that script never reached its own
  activation step, so it was never caught. All 30 posts were created before the ads failed.
- **Reddit updates are `PATCH /ad_groups/{id}`**, with no `/ad_accounts/{id}` prefix. The
  prefixed path 404s. Same script, same latent bug.
- **Google removed `VIDEO_ACTION` campaigns in API v25.** Video-for-conversions is now
  Demand Gen (`advertising_channel_type: DEMAND_GEN`), whose targeting lives on the ad group,
  not the campaign, and which requires `contains_eu_political_advertising`.
