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

Seven more queued 2026-08-19, the UGC talking-head batch (first publish attempt on
2026-08-18 errored, see the batch section below):

| clip | title |
| --- | --- |
| `u1-better-id` | My dog has better ID than I do |
| `u2-wallet-ranked` | Everything in my wallet, ranked, worst to best |
| `u4-roommate` | My roommate contributes nothing and screams at the mailman |
| `u5-photoshoot` | Forty-seven takes for one card photo |
| `u6-rabbit` | Registered my rabbit before my coffee went cold |
| `u8-drama` | The most dramatic animal alive. One flawless take. |
| `u9-supervisor` | She supervises everything I do |

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

**ACTIVATED 2026-08-17 on Robby's decision: "$300/month for TikTok Ads."** TikTok's hard
floor is $20/day per ad group, so $300/month runs as a **15-day burst**: schedule
2026-08-18 00:00 → 2026-09-02 00:00 UTC at $20/day = $300, then it stops by itself and the
next month's shape gets decided on the results. Campaign, ad group and all 10 ads flipped
ENABLE 2026-08-17 (ads pass through TikTok review first). Ad group renamed
`ESA | US | 25-55 | Broad | Purchase | $300 Aug burst`. Nothing else was cut, so total
committed run rate while the burst runs is ~$1,300/month across the five platforms.

*(Original build state below, kept for the record.)*

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

### TikTok organic (@esacard via Postiz, scheduled 2026-08-17 on Robby's ask)

All ten clips scheduled as organic posts on the ESA Card TikTok account (Postiz integration
`cmsxtwzga07nymt0y4bnw8g8g`, `tiktok-business`), two per day, 16:00 and 22:00 UTC (noon and
6pm Eastern), direct-publish, public, comments on, labelled AI-generated per TikTok's
synthetic-media rule, `brand_organic_toggle` on. Captions: the clip's opening line, the
offer (wallet card with the pet's photo, certificate, $39 once, no renewal fees,
esacard.com), three hashtags, acronym spelled out.

| date (UTC) | 16:00 | 22:00 |
| --- | --- | --- |
| 2026-08-18 | d1-viewing | d5-hotel |
| 2026-08-19 | e1-first-day | e2-keys |
| 2026-08-20 | d2-lobby | e3-back-sunday |
| 2026-08-21 | d4-section-four | e4-cottage |
| 2026-08-22 | d3-bench | e5-haircut |

Robby's two picks lead the run. Media rehosted via the fal URLs into Postiz uploads (TikTok
pulls from the Postiz media domain). Postiz post ids `cmsxu2a5s01fgqi0yf6qp4oht` …
`cmsxu2b2501fpqi0ym2e674kb`.

## UGC talking-head batch, shipped 2026-08-18 (u-clips)

Robby: "You can create 5-10 of these", "add 1-word subtitles to all of them and use
font-size/color to emphasize words", "schedule all of these to be published in our TikTok
account over the next few weeks", "These can also be added to YouTube ads and Meta Ads."

- **9 scripted, 7 shipped.** `u3` and `u7` were killed after three rolls each: the spoken
  phrase "emotional support animal card" garbled every take (confirmed by the two-engine
  transcription gate, ElevenLabs scribe-v2 cross-checked with Whisper). The lesson, kept for
  the next batch: possessive chains right before the phrase are the failure mode; reword the
  line, don't re-roll the same text.
- **Sharpness:** Seedance renders at 720p max. The earlier previews used the standard
  upscale tier ($0.11/clip) and read soft; all seven finals were re-upscaled with the PRO
  tier (`enhancement_tier: "pro"`, ~$1.08/clip, `_scripts/seedance-pro-upscale.mjs`) after
  Robby flagged it. One-word captions burned in, three size/colour tiers (white, marigold
  emphasis, brand largest).
- Files: `esacard/2026-08-17-ugc-examples/<id>-1080p-captioned.mp4` for u1-better-id,
  u2-wallet-ranked, u4-roommate, u5-photoshoot, u6-rabbit, u8-drama, u9-supervisor.

Where all seven went:

| channel | detail |
| --- | --- |
| TikTok Ads | 7 ads ENABLED in ad group `1873787389986961` (inside the $300 Aug burst, no budget change), in TikTok review. Ad ids `1873853579899330`, `1873853579907426`, `1873853579915586`, `1873853609550177`, `1873853609559361`, `1873853609567521`, `1873853609576769`. |
| Meta | 7 video ads ACTIVE in the Purchase ad set `120247870160610605`. Ad ids `120247887769790605`, `120247887770690605`, `120247887771830605`, `120247887773130605`, `120247887774150605`, `120247887775530605`, `120247887777190605`. Creatives: GET_OFFER, AI-disclosure opt-in, `utm_content=UGC <id>`. |
| TikTok organic | 7 posts, one every two days at 16:00 UTC, 2026-08-23 → 2026-09-04, picking up where the d/e run ends (2026-08-22). Same settings as that run: direct-post, public, comments on, AI-generated label, `brand_organic_toggle` on. Postiz ids `cmsyivxl002aoqi0y0r4vkbv1` … `cmsyivy8i02auqi0yb7ue9mir`. |
| YouTube | **Not live yet.** All 7 publish attempts on 2026-08-18 (plus a lone retry) errored instantly in Postiz; TikTok on the same account worked, so it is YouTube-specific, most likely the shared YouTube API quota or an expired connection (unverified, Postiz hides the error payload). Rescheduled for 2026-08-19 07:30-08:30 UTC, ten minutes apart, right after YouTube's quota reset (Postiz ids `cmsyj4oeg0000p70yh6e0pezv` … `cmsyj4p0e0006p70ymngvoybk`). If they error again, the Postiz YouTube connection needs a manual reconnect. Demand Gen wiring follows once the videos are live. |

Order of clips in the id lists above: u1, u2, u4, u5, u6, u8, u9.
## Update 2026-08-18 (evening): Meta location fix, two-ad-set test, $30/day

What changed after the sections above, all verified by API read-back:

- **Meta broke, then got fixed.** The paused InitiateCheckout ad set blocked on Meta error
  #1870194: Meta removed the legacy `location_types` values platform-wide (see the location
  note in the US-targeting section). Fixed 2026-08-18: `location_types` stripped from both
  ad sets and the InitiateCheckout ad set reactivated on Robby's instruction.
- **Both ad sets now compete with the same 50 ads.** The 13 `o-c*` ads and the 7 UGC
  `u*` ads (which had landed only in the Purchase ad set) were mirrored into the
  InitiateCheckout ad set: InitiateCheckout (25-65) vs Purchase (18-65), same campaign,
  identical creative. New mirrors re-enter Meta review, expected.
- **Meta budget doubled to $30.00/day** on Robby's instruction, set at campaign level
  (`120247770766350605`), so the two ad sets compete for one budget.
- **Google's MISCONFIGURED / "missing a goal" state is cleared.** Cause was the PURCHASE
  conversion goal sitting `biddable: false`; fixed 2026-08-14 via
  `campaignConversionGoals:mutate` + `customerConversionGoals:mutate`. Read-back
  2026-08-18: Search `primary_status: LIMITED` (`BIDDING_STRATEGY_LEARNING`), Demand Gen
  `LEARNING`. Both normal for new Maximize Conversions campaigns.
- **Current daily spend while the TikTok burst runs: Meta $30 + Google Search $9 +
  Demand Gen $5 + Reddit $5 + TikTok $20 = $69.00/day (~$2,098/month).**


## Heart-tug batch, shipped 2026-08-18 (h-clips and banners N1/N2)

Robby approved scripts 11-15 and both banner concepts off
`_scripts-for-approval-2026-08-17-heart-tug.md`: "All of these are great, you can create with
Seedance 2.5 and publish to YouTube / TikTok + add to the ads in Google, YouTube, and Reddit."

**Four of five clips shipped.** `h4-pick-up-day` was killed after garbling the brand phrase on
two rolls ("emotional service bird", "a lomenonial support Vamigal card", both engines
agreeing). It was written as the alternate to `h3-night-shift`, which came back clean, so
nothing was lost by dropping it rather than paying for a third roll.

**The prompt rule that fixed the batch, worth carrying forward.** Four of the first five rolls
garbled the four brand words. Re-rolling the same text is not the fix; the fix is the ONSET
rule now in `prompts-heart-tug.mjs`: the phrase begins its own sentence, the speaker pauses and
starts EMOTIONAL cleanly from silence rather than running "here's his" into it. Three of the
four came back clean on the next roll with that plus a reworded line.

Assets: `esacard/2026-08-18-heart-tug/`. Clips are 720p masters, pro-tier 1080p upscales, and
`-1080p-captioned.mp4` deliverables. Banners in square, landscape and portrait, plus the exact
Demand Gen sizes.

| channel | detail |
| --- | --- |
| Reddit | 4 video + 2 image ads ACTIVE in the live Purchase ad group `2570690648253263407`, in Reddit review. Ad ids `2571341033016883369` (h1), `2571341086910863434` (h2), `2571341140584553476` (h3), `2571341193466165454` (h5), `2571341247352569182` (n1), `2571341299998206939` (n2). Posts `t3_1vrpi0r`, `t3_1vrpi4i`, `t3_1vrpi84`, `t3_1vrpibh`, `t3_1vrpifn`, `t3_1vrpijs`. |
| Google Demand Gen | Banners live as a **second ad type**: `DEMAND_GEN_MULTI_ASSET_AD` `821379915095`, ENABLED, in review, in ad group `197002640617`. Six image assets uploaded (`409546803732`, `409369701677`, `409369719545`, `409546761474`, `409546798242`, `409546782066`). Same five headlines and three descriptions as the four live video ads. |
| Google Demand Gen (video) | **Pending.** Demand Gen takes video only as a `YOUTUBE_VIDEO` asset, so the four clips must be public on the channel first. Wire with `node _scripts/google-demandgen-esacard-heart-tug.mjs --video <id>,<id>,<id>,<id> --live` once the 2026-08-20 uploads land. |
| TikTok organic | 4 posts scheduled every two days at 16:00 UTC, 2026-09-06 → 2026-09-12, picking up where the u-batch run ends. Postiz ids `cmsyp22ni008wp70ymzebkw3e` … `cmsyp22z6008zp70y4ibx5qdq`. |
| YouTube | 4 scheduled 2026-08-20 07:30-08:30 UTC, twenty minutes apart, deliberately on the day AFTER the seven u-clip retries so one day's uploads stay inside YouTube's quota. Postiz ids `cmsyp2it30095p70yuoyyemft` … `cmsyp2j5w0098p70yuwm08k1g`. |

**Two things that need a decision, not assumptions:**

1. **Budget dilution is now real on both new channels.** Reddit is 36 ads on the $5.00/day
   platform floor, about $0.14/ad/day. Demand Gen is 5 ads on $5.00/day, and the two ads added
   on 2026-08-17 have taken 7 and 8 impressions in five days against 2,579 for the two
   originals. Neither channel can produce a readable read on the new creative at these
   budgets; the choice is to raise the budget or pause weak incumbents.
2. **`h5-half-day` breaks its own hold.** The approval doc marked script 15 "runs when
   e1-first-day fatigues, not beside it", and `ESA VID e1-first-day` is live in the same Reddit
   ad group right now. Both daycare clips are running side by side.

### Re-shot for the US market, 2026-08-18 (h-clips v2)

Robby: *"Why do most ads have a British accent if we are literally targeting USA only?"* then
*"You can reshoot them and we can test these out as-well."* Cause and the permanent fix are in
`_scripts/seedance-locale.mjs` and the playbook; what changed here:

- **All four clips re-rendered against American prompts.** `h1-old-bones` now opens on a US
  suburban street with a pickup tailgate, a privacy fence and a sliding patio door, where v1
  had British terraced houses. `h2` and `h5` were locale-neutral in both cuts.
- **Two rolls needed a second pass on the brand phrase** (h1 "Emotionate support", h5
  "emotional support aisle", both engines agreeing). h5's line still carried the possessive
  chain "Here's his" that the ONSET rule exists to remove; rewording it fixed it. Same failure,
  same fix, second batch running: the possessive chain is the failure mode, not the phrase.
- **`h4-pick-up-day` killed a second time, for a different reason.** Its audio came back clean,
  so the onset rule did rescue the clip that garbled twice before. But the setting rendered as
  a British car park with a UK number plate in shot and the lead's jacket carried an invented
  apparel logo, which the playbook bans outright.
- Spend on the re-shoot: 7 rolls at $6.94, 5 pro upscales at $1.08, about $54.

| channel | detail |
| --- | --- |
| Reddit | Straight swap, no extra dilution. Four US ads ACTIVE (`2571401156392734824` h1, `2571401212571559302` h2, `2571401263854445692` h3, `2571401315950134696` h5), posts `t3_1vrspao`, `t3_1vrspdx`, `t3_1vrspic`, `t3_1vrspli`. The four British ads are PAUSED, not deleted, and had no delivery data to lose. Ad names carry a ` US` suffix and `utm_content=<id>-us` so the two cuts never merge in a report. |
| Meta | Four ads ACTIVE in the Purchase ad set `120247870160610605`: `120247896216090605`, `120247896216560605`, `120247896217120605`, `120247896217720605`. This is the batch's first appearance on Meta, chosen because it carries $30/day and the only booked sales. |
| TikTok organic | Four posts, 2026-09-07 → 09-13, 16:00 UTC, interleaved with the v1 slots. Postiz ids `cmsyu502w00elp70yuprzywot` … `cmsyu50gz00eop70ybl3qggkp`. |
| YouTube | Four scheduled 2026-08-21 07:30-08:30 UTC, the day after the v1 batch. Postiz ids `cmsyu5ydo00epp70y4653glch` … `cmsyu5yrk00esp70yjn59vatb`. |
| Google Demand Gen | Still pending the YouTube uploads, same as v1. Wire with `--video <id>,...` once they are public. |
| TikTok Ads | **Added 2026-08-19** when Robby asked for all four ad accounts. Four ads ENABLED in ad group `1873787389986961`: `1873935414737185` (h1), `1873935414744257` (h2), `1873935415390369` (h3), `1873935415398657` (h5). `need_audit: false`, so they entered delivery immediately. Was skipped on 08-18 for budget dilution; that concern stands (21 ads now share $20/day) but Robby's instruction overrides it. |

**Eight scheduled Postiz posts still carry the British cut and cannot be deleted through the
API** (Postiz exposes no delete). They need deleting by hand in the Postiz app: YouTube
`cmsyp2it30095p70yuoyyemft` … `cmsyp2j5w0098p70yuwm08k1g` (fire 2026-08-20) and TikTok
`cmsyp22ni008wp70ymzebkw3e` … `cmsyp22z6008zp70y4ibx5qdq` (fire 2026-09-06 → 09-12).

**One trap worth keeping: `raw.githubusercontent.com` served a stale cached copy of a file for
several minutes after the merge.** A `curl` of the merged h1 returned the old British blob's
byte count while `git cat-file` on `origin/main` returned the new one. Reddit and Meta both
fetch the URL themselves, so a CDN cache would have silently re-shipped the version we just
replaced. Both launches used fal-hosted URLs instead, which are content-addressed per upload.

### Google disapproved the WHOLE account, 2026-08-19: ENABLING_DISHONEST_BEHAVIOR

Found while verifying the re-shoot. **All 10 ads across all 4 Google campaigns are DISAPPROVED**
under `ENABLING_DISHONEST_BEHAVIOR`, type `PROHIBITED`, review status `REVIEWED`:

| campaign | ads | state |
| --- | --- | --- |
| `24128254302` Search US Core | 3 RSAs | all DISAPPROVED, campaign `HAS_ADS_LIMITED_BY_POLICY` |
| `24134740046` Demand Gen US YouTube | 5 (4 video + the new banner ad `821379915095`) | all DISAPPROVED |
| `24145157187` Display US Retargeting | 1 | DISAPPROVED |
| `24155823820` Search Intl EN Core | 1 | DISAPPROVED |

The four video ads read APPROVED earlier the same day, so this was a sweep, not a creation-time
rejection. Delivery stopped dead: $0.00 and zero impressions on 2026-08-19 against $12.78 the
day before.

**What it cost to learn:** $74.65 across 2026-08-13 to 08-18, 3,043 impressions, 37 clicks,
**0 conversions**. Google has never produced a sale for this product.

**Why this is not a copy problem.** `ENABLING_DISHONEST_BEHAVIOR` is Google's fake-documents and
academic-cheating policy, not misrepresentation. It is a judgement about what the product IS, so
no headline rewrite addresses it, and every ad in the account tripped the same topic at once
including three Search RSAs whose copy carries the honesty headlines. The API returns
`evidences: []`, so the specific triggering element (ad, landing page, or product category) is
only visible in the Ads UI.

**What NOT to do**, from `docs/ads/policy.md` section 8: do not resubmit or mass-appeal
unchanged creative (repeated appeals on unchanged ads is itself what escalates to account
review), and never open a second Google account.

### Three Reddit API facts this batch established

- **The structured-post job status enum is `QUEUED | PROCESSING | SUCCESS | CLIENT_ERROR |
  SERVER_ERROR`.** `FAILED`, `ERROR` and `COMPLETED` do not exist, so both older launch
  scripts spin their whole poll window on a genuine failure and report a timeout instead of
  the reason, which sits in `error_message`.
- **List endpoints cap at 50 and return `pagination.next_url`.** The account holds 71 ads, so
  a page-1-only idempotency check would not find an existing ad and would create a duplicate.
  Nothing on Reddit can be deleted.
- **`raw.githubusercontent.com` works for Reddit** (it downloads and rehosts on `i.redd.it`),
  unlike TikTok, which rejects it for serving `application/octet-stream`.

## Two API facts worth keeping

- **Reddit ad `type` is `UNSPECIFIED`, not `PROMOTED_USER_POST`.** The value was wrong in
  `_scripts/reddit-launch-bitpredict.mjs`; that script never reached its own activation step,
  so it was never caught. All 30 posts were created before the ads failed. **Fixed in
  `c64ed7c` (2026-08-16), so this note's "that script is still wrong" claim is stale as of
  2026-08-18; the rule itself stands.**
- **Reddit updates are `PATCH /ad_groups/{id}`**, with no `/ad_accounts/{id}` prefix. The
  prefixed path 404s. Same script, same fix in `c64ed7c`.
- **Google removed `VIDEO_ACTION` campaigns in API v25.** Video-for-conversions is now
  Demand Gen (`advertising_channel_type: DEMAND_GEN`), whose targeting lives on the ad group,
  not the campaign, and which requires `contains_eu_political_advertising`.


## Update 2026-08-18 (late): retargeting built, Google now counts sales from Stripe

### Google conversions come from Stripe now, not the browser

The browser tag was the only thing telling Google Ads a click had turned into money, and it
was losing them. Against $70.39 of Google spend, the tag had booked **one** purchase into
"All conversions" and **zero** into the "Conversions" column, which is the one Smart Bidding
actually optimises against. Both campaigns run Maximize Conversions, so they were bidding
on a number that read zero.

Stripe already had the answer: the checkout writes `gclid` (and `gbraid`/`wbraid`) into the
charge metadata, so every paid registration can be matched back to the click that produced it.

- New conversion action **"ESA Purchase (Stripe import)"** `7725254582`, type `UPLOAD_CLICKS`,
  category `PURCHASE`, `MANY_PER_CLICK`, primary and counting into "Conversions". Its origin
  reads back as `WEBSITE`, which matters: the campaigns' biddable goal is `PURCHASE/WEBSITE`,
  so an action landing on any other origin would have been ignored by bidding.
- Uploader lives in the vault repo: `scripts/esacard-google-offline-conversions.mjs`.
  Dry run by default, `--live` to apply, matching `google-ads-manage.mjs`.
- First live upload 2026-08-18: 2 conversions, $78, both real Stripe sales.

### Three traps found doing it

- **`ConversionUploadService.UploadClickConversions` is closed to new accounts.** It returns
  `CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE` and points at the **Data Manager API**
  (`datamanager.googleapis.com/v1/events:ingest`). Data Manager takes **no** `developer-token`
  and **no** `login-customer-id`: headers on an ingest call are ignored outright, and the
  account path goes in the `destinations[].operatingAccount` object instead. Its
  `productDestinationId` is the conversion action id.
- **`include_in_conversions_metric` is immutable on create.** It is derived from
  `primary_for_goal`; sending it explicitly fails with `IMMUTABLE_FIELD`.
- **Every v25 campaign create now requires `contains_eu_political_advertising`**, and
  `start_date` is gone from the campaign create payload entirely.

### The two "Google sales" were one person

Worth recording, because the platform number and the Stripe number disagreed and the
reconciliation changed the answer. Stripe showed two $39 charges attributed to Google. They
carry the **same `gclid`, the same click timestamp, the same landing page**, and emails one
character apart (`…@aol.com` and `…@aol.co`). That is one visitor, one click, who paid twice
after mistyping their email. Google counting it once was correct behaviour, not a tracking
gap. Any "cost per sale" for Google that treats those as two customers is wrong.

### Google Display retargeting: live, dormant on purpose

Campaign `24145157187`, **$8.00/day**, US only, Maximize Conversions, Display network only.
Ad group `199028378869` targets the "All visitors (AdWords)" list and **excludes** "All
Converters". One responsive display ad: the two 1200x628 ESA Card banners already in the
account, the four best-performing squares from `2026-08-14-spelled-out/` uploaded as assets,
the logo, and headline/description copy lifted verbatim from the live Search RSAs so no new
claim ships.

**It will not serve yet.** Google needs 100 people in a list before Display remarketing
delivers; the list holds 32. Nothing to fix, it simply starts spending when the list fills.

A responsive display ad **requires** a 1.91:1 landscape image. Our ESA creative is only
square (1:1) and vertical (0.56:1), and all of it is text-heavy, so cropping would cut the
headline. The two 1200x628 banners already in the Google account are what unblocked this.
**If a future Display batch is wanted, it needs landscape masters made on purpose.**

### Meta retargeting: blocked before it starts

The ad account has **never accepted Meta's Custom Audience terms of service**, so
`POST /act_3530109303824417/customaudiences` fails every time with
`(#2663) Terms of service has not been accepted`. No custom audience of any kind can be
created until someone with account access accepts at
`facebook.com/customaudiences/app/tos/?act=3530109303824417`. This blocks retargeting
entirely; it is not a code problem and no API call works around it.

Two other things to know before that unblocks:

- **`subtype` is no longer accepted on customaudiences in v25.** It errors with
  "The parameter 'subtype' is not supported in the current API version"; the audience type is
  inferred from the rule.
- **Pixel volume is below Meta's floor.** 765 PageViews, 36 ViewContent, 24 InitiateCheckout
  and 12 Purchase in the last 30 days, against a 1,000-person minimum for a website audience.
  Website audiences do backfill from pixel history on creation, so accepting the terms today
  still starts the clock sooner than waiting.

### Creative to use when Meta retargeting unblocks

From lifetime Meta insights, purchases are the only ranking that matters here:

| Ad | Spend | Clicks | CTR | Checkouts | Purchases |
| --- | --- | --- | --- | --- | --- |
| IMG p2-offer-square | $29.53 | 59 | 5.99% | 8 | 3 |
| IMG p6-forever-square | $6.78 | 23 | 12.23% | 2 | 2 |
| IMG p1-carry-vertical | $40.17 | 105 | 7.30% | 6 | 0 |

`p2-offer-square` and `p6-forever-square` are the two that have actually produced sales, and
both lead with the offer rather than the story. They are the retargeting set.


## Update 2026-08-18 (late): Nadav's tier-A country and US metro tests

Nadav asked for two tests, both at a secondary budget below the US: tier-A countries for
native English speakers, and an audience aimed at dense, affluent US metros. Live on Meta
and Google. **TikTok versions are not built**: TikTok is reachable only through its
connector, which was not attached to the session that did this work.

### The country list changed before anything was spent

Nadav named Germany, France, Netherlands and Canada. Google Keyword Planner, queried per
country with English language targeting, says the demand sits elsewhere. Total monthly
searches across all ESA-related keywords:

| Country | Monthly English ESA searches | On Nadav's list |
| --- | --- | --- |
| United States | 2,033,020 | (the control) |
| **United Kingdom** | **92,740** | no |
| **Canada** | **56,140** | yes |
| **Australia** | **33,650** | no |
| Germany | 19,840 | yes |
| Netherlands | 10,130 | yes |
| France | 9,240 | yes |
| Ireland | 9,020 | no |

UK and Australia were not asked for and are the two largest English markets outside the US:
the UK alone is nearly five times Germany and ten times France. All seven countries run in
**one campaign per platform** rather than seven, so the budget flows to whatever converts
instead of being pre-split by a guess. **Read the result by country, never in aggregate**,
or the UK will hide whatever France did or did not do.

Worth stating plainly: an emotional support animal has **no legal standing anywhere**, the
US included, and the site says so. So this is not a test of whether the product travels
legally. It is a test of whether the same $39 novelty kit sells to English speakers who are
searching for it outside the US, and the search volumes above say those searches exist.

### What is live

| Platform | Campaign | Budget | Targeting |
| --- | --- | --- | --- |
| Meta | `ESA Card \| Meta \| Intl EN \| Cold \| Sales` (`120247894000470605`) | $12.00/day | GB, CA, AU, IE, DE, NL, FR · locale English (All) · 25-65 |
| Meta | `ESA Card \| Meta \| US Metro \| Cold \| Sales` (`120247894001750605`) | $12.00/day | 9 metros at 25mi · top 25% of ZIP codes by household income · 25-65 |
| Google | `ESA Card \| Search \| Intl EN \| Core` (`24155823820`) | $6.00/day | same 7 countries · English language · 20 phrase/exact keywords |

Metros: Miami, New York, Los Angeles, Chicago, San Francisco, Boston, Seattle, Dallas,
Atlanta. Income segments stacked as one OR group: top 5% (`6107813079183`), top 10%
(`6107813551783`), top 10-25% (`6107813553183`).

**No US metro campaign on Google Search.** A second US search campaign bidding the same
keywords would only split data with the existing one, because Google lets a single account
into any given auction once. Metro targeting is an audience idea, and it belongs where
audiences are bought.

### Creative: the same eight ads in both, on purpose

Both Meta campaigns carry the identical eight ads, reusing the existing creative ids rather
than new uploads, so the **only** variable between US broad, international and metro is the
audience: `p2-offer-square`, `p6-forever-square`, `p1-carry-vertical`, `p2-offer-vertical`,
`p6-forever-vertical`, `p5-three-minutes-vertical`, `o-c2-wallet-short`, `e4-cottage`. The
first two are the only ads in the account that have produced a purchase.

Google's international ad reuses headline and description copy **verbatim** from the three
live US RSAs, so no claim ships that has not already run.

### Spend after these tests

Meta $74 (US $50, Intl $12, Metro $12) + Google $28 (US Search $9, Demand Gen $5, Display
retargeting $8, Intl Search $6) + Reddit $5 + TikTok $20 = **$127.00/day (~$3,860/month)**,
up from $97.

### Two more API facts

- **Meta targeting for household income is `flexible_spec[].income`**, and the segments are
  ZIP-code percentiles, not stated salary: top 5%, top 10%, top 10-25%, top 25-50% of US ZIP
  codes. US only.
- **Any ad set touching an EU country requires `dsa_beneficiary` and `dsa_payor`.** Without
  them the create fails outright. Both are set to "ESA Card".
- **Google Ads display paths cap at 15 characters.** `path1: 'emotional-support'` is 17 and
  fails with `TOO_LONG`.


## Update 2026-08-18 (late): Meta retargeting live, terms blocker cleared

Robby accepted Meta's Custom Audience terms, which had been blocking **every** custom
audience in the account. Worth recording how that failure presented, because it was
misleading: with `subtype` still in the payload the call failed on `subtype`, and the
engagement-audience calls failed with **"Invalid Event Name for Custom Audience"**. Both
were the terms block wearing a different error. The moment the terms cleared, the exact same
event names (`ig_business_profile_all`, `page_engaged`) succeeded unchanged. **Do not chase
an event-name error on this endpoint before checking the terms.**

### Six audiences

| Audience | Rule | Window |
| --- | --- | --- |
| `ESA \| RTG \| Site visitors 30d` | pixel `PageView` | 30d |
| `ESA \| RTG \| Viewed content 30d` | pixel `ViewContent` | 30d |
| `ESA \| RTG \| Checkout started 30d` | pixel `InitiateCheckout` | 30d |
| `ESA \| RTG \| Purchasers 180d` | pixel `Purchase` | 180d, **exclusion only** |
| `ESA \| RTG \| IG engagers 365d` | `ig_business` / `ig_business_profile_all` | 365d |
| `ESA \| RTG \| Page engagers 365d` | `page` / `page_engaged` | 365d |

Website audiences were created with `prefill: true`, so they backfill from pixel history
already collected rather than starting empty.

### The campaign

`ESA Card | Meta | US | Retargeting | Sales` (`120247894676000605`), **$10.00/day**, US,
25-65, purchase-optimised. Ad set `ESA | US | Retargeting | Purchase` includes site
visitors, content viewers and checkout starters, and **excludes purchasers**. Same eight
winning ads as the other campaigns, reusing creative ids.

**It will not spend $10/day for a while.** Both engagement audiences report "Audience is too
small to be used in campaign creation" on creation, and the pixel has 765 PageViews in 30
days against Meta's 1,000-person floor. They are left out of the ad set until they size up.
The budget is a ceiling, not a forecast.

Purchase optimisation was kept rather than dropping to landing page views, because Robby's
2026-08-14 decision to optimise everything around purchases stands. A small warm pool
spending slowly on the right event beats a bigger pool spending fast on the wrong one.

### Spend now

Meta $84 (US $50, Intl $12, Metro $12, Retargeting $10) + Google $28 + Reddit $5 +
TikTok $20 = **$137.00/day (~$4,165/month)**.


## Update 2026-08-19: TikTok tests built (paused), Facebook Page seeded

### TikTok: both of Nadav's tests exist, both paused

The TikTok connector became available, so the two tests are now built there as well, inside
the existing campaign `1873787435137170`:

| Ad group | id | Targeting |
| --- | --- | --- |
| `ESA \| Intl EN \| 25-55 \| Broad \| Purchase` | `1873936511498562` | GB, CA, AU, IE, DE, NL, FR |
| `ESA \| US Metro \| 25-55 \| Broad \| Purchase` | `1873936560213265` | Miami, New York, Los Angeles, Chicago, San Francisco, Boston, Seattle, Dallas, Atlanta |

Five shared video ads each (`h1-old-bones`, `h2-visiting-nana`, `h3-night-shift`,
`h5-half-day`, `u9-supervisor`), reusing the existing `video_id`s and the BC identity, with
`utm_campaign` set to `esa-card-tiktok-intl-en` and `esa-card-tiktok-us-metro` so the two
read separately in Stripe.

**Both are PAUSED and that is a decision, not an oversight.** TikTok's minimum ad group
budget is **$20.00/day**, exactly what the US ad group runs. There is no way to run these
"at a secondary budget below the US" the way Nadav asked, so switching both on adds $40/day
and takes total spend from $137 to $177. That is Robby's call.

One more asymmetry worth stating: **TikTok has no household-income targeting.** Meta's metro
test narrows to the top 25% of ZIP codes by income; TikTok's can only target the cities. The
two metro tests are therefore not the same test, and should not be compared to each other.

**The British-cast accident is now an asset.** The fourteen heart-tug clips shipped with
British casts and streets against a US-only campaign, which is what prompted the
name-the-market lint rule. Those same clips are the right creative for the UK, the largest
English market outside the US at 92,740 monthly searches.

### TikTok API facts

- **`identity_type: BC_AUTH_TT` requires `identity_authorized_bc_id`** on every creative.
  Without it, `ad_create` fails with `"Identity_type" and "Identity_bc_ID" don't match.`
- **`BID_TYPE_NO_BID` requires `pacing: PACING_MODE_SMOOTH`.** Omitting pacing fails with
  "Accelerated delivery under No-Bid strategy is not supported for this objective."
- **Location ids are GeoNames ids** and countries and US cities both work, confirmed by
  read-back. US is `6252001`; UK `2635167`, Canada `6251999`, Australia `2077456`, Ireland
  `2963597`, Germany `2921044`, Netherlands `2750405`, France `3017382`.
- **`bc_asset_get` has no `DOMAIN` asset type**, so TikTok domain verification cannot be
  checked through the API at all. Allowed values are ADVERTISER, CATALOG, LEAD,
  MANAGED_BUSINESS_ACCOUNT, PIXEL, STOREFRONT, TIKTOK_SHOP, TT_ACCOUNT.

### Facebook Page seeded

The "0 fans and no content" note was **stale**: the Page already had its logo and cover, 5
followers, an about line and the Animals & Pets category. What it lacked was posts, its only
two being the profile and cover uploads from 2026-08-13.

Four posts scheduled through Postiz (integration `cmsryk3c402k9ml0ymlzb9pjz`) at 15:00 UTC
on 08-19, 08-21, 08-23 and 08-25, each pairing an approved square with copy taken only from
the approved claims bank: `p5-three-minutes-square` (three minutes), `p2-offer-square` ($39
once), `p9-verifiable-square` (the number anyone can check), `p6-forever-square` (no
renewals). No new claim, no disclaimer, no acronym outside the domain.

### One thing found and not acted on

**Meta's pixel has Automatic Advanced Matching switched off** (`enable_automatic_matching:
false` on pixel `4305407809789395`). Turning it on would raise Meta's match rate by letting
the browser pixel hash form fields it already sees, which is directly relevant given how
much of this week went into attribution. Left alone deliberately: it changes what customer
data flows to Meta, and that is a call to make on purpose rather than in passing.


## Update 2026-08-19: Reddit brought up to full creative parity

Robby raised Reddit to **$15.00/day** and asked whether all the ads were there. They were not:
the live Purchase ad group held **40 ads against Meta's 54 creatives**. Two whole batches had
never been pushed to Reddit.

**Added, 20 ads:**

- **The 7 UGC clips** (`u1-better-id`, `u2-wallet-ranked`, `u4-roommate`, `u5-photoshoot`,
  `u6-rabbit`, `u8-drama`, `u9-supervisor`)
- **The 13 organic-cute clips** (`o-c1-reveal-long/short`, `o-c2-wallet-short`,
  `o-c3-catpapers-short`, `o-c4-birthday-long/short`, `o-c5-photobattle-short`,
  `o-c6-giftmom-long/short`, `o-c7-committee-short`, `o-c8-golden-short`, `o-c9-wall-short`,
  `o-c10-3min-short`)

Every headline is the clip's **approved Meta title, reused verbatim**, so no new claim shipped.

**Live group now holds 60 ads:** 56 running (36 ACTIVE, 16 PROCESSING, 4 PENDING_APPROVAL)
and 4 deliberately paused. A diff against Meta now comes back clean: Reddit carries
everything Meta carries, plus `n1-grey-muzzle-square` and `n2-moving-box-square`, which are
Reddit-only.

The 4 paused ones are **not** a gap. They are the older `h1/h2/h3/h5` heart-tug ads,
superseded by the `… US` re-cuts, already correctly paused by the earlier session.

### How to add a Reddit ad when the source file is not in this repo

The organic-cute clips exist nowhere in this repo, only as uploaded Meta videos, and the UGC
clips have no thumbnails committed. Both were solved the same way, and it is the pattern to
reuse:

**Meta is a usable CDN for this.** `GET /act_<id>/advideos?fields=source,thumbnails{uri,is_preferred,width,height}`
returns a publicly fetchable `source` URL for the video and a `thumbnails` list for the
poster frame. Reddit's `structured_posts/jobs` takes both as `{"type":"URL","url":…}` and
fetches them itself, so nothing has to be re-uploaded or re-encoded. Verified end to end on
all 20.

The name mapping is not obvious: an ad called `VID o-c2-wallet-short` on Meta is a video
titled **`organic-esa-c2-wallet-short`**, and `UGC u1-better-id` is **`UGC u1-better-id captioned`**.

**`thumbnail` is a required property on a Reddit VIDEO creative.** Omitting it fails with
`'thumbnail' is a required property`, so a video with no poster frame cannot be posted at all.
There is no ffmpeg in the agent environment, which is exactly why the Meta thumbnail route
matters.

### The real problem is now dilution, not coverage

**56 running ads against $15.00/day is about $0.27 per ad per day.** The heart-tug section
above already flagged this at 36 ads on $5/day; more creative has made it worse, not better.
Reddit cannot produce a readable read on any single creative at this budget: the question
"which ad works on Reddit" is unanswerable until either the budget rises a lot or the ad
count is cut to the handful worth testing. Coverage is now complete, and that is a different
thing from useful.

## Update 2026-08-19: weird-animals duplicate campaign built (paused)

Robby, after the three ads carrying the account's sales were identified:

> Please create a duplicate our `ESA Card | Meta | US | Cold | Checkouts` campaign with
> entirely new ads based on these best performing ones: IMG p2-offer-square, IMG
> p6-forever-square, UGC u6-rabbit. Exact same video ad script and exact banner style and text
> - but replace them with weird animals.

Assets and prompts: `2026-08-19-weird-animals/`. This is a controlled test, not a new
direction: layout, hexes, headline, subheadline, button label, corner wordmark, the three
spoken lines, the kitchen table and the fifteen-second beat sheet are all held fixed. **The
animal is the only variable.**

| | |
| --- | --- |
| Campaign | `ESA Card \| Meta \| US \| Cold \| Weird Animals \| Checkouts` `120247924736580605`, OUTCOME_SALES, CBO $50.00/day, highest volume, **PAUSED** |
| Ad set | `ESA \| US \| Weird Animals \| InitiateCheckout` `120247924771890605`, OFFSITE_CONVERSIONS → `INITIATED_CHECKOUT` on pixel `4305407809789395`, US, 25-65 as an Advantage+ suggestion, frequently_in + home, 7-day click / 1-day view, Advantage+ placements, **PAUSED** |
| Ads | 10 image ads, all PAUSED: `120247924820550605` w1-turtle, `120247924821340605` w2-alligator, `120247924822210605` w3-raven, `120247924822640605` w4-snake, `120247924823100605` w5-pig, `120247924825740605` w6-egg, `120247924827120605` w7-hedgehog, `120247924828500605` w8-chicken, `120247924837160605` w9-axolotl, `120247924846540605` w10-cockatoo |
| Copy (all 10) | Concept 5 verbatim: "$39 once. That is the whole price." / headline "$39 once. Never again." / description "No subscription, ever" / GET_OFFER / `@esa_card` IG identity / AI disclosure opt-in |
| Links | `https://www.esacard.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=ESA%20Card%20%7C%20Meta%20%7C%20US%20%7C%20Cold%20%7C%20Weird%20Animals%20%7C%20Checkouts&utm_content=IMG%20<id>` |

**Square only, deliberately.** `p2-offer-square` and `p6-forever-square` carry 5 of the
account's 6 sales. A `platform_position` breakdown of the source campaign puts Facebook Feed at
4 of those 6 sales on $111.27, Facebook Reels at 1 on $44.35, and Instagram Reels at **0
checkouts on 23 landing page views**. Feed converts landing page views to checkouts at 18.8%,
so 23 views should have produced about 4; getting 0 is roughly a 0.8% chance by luck. Square is
what Feed serves, and the vertical cuts of these same two designs sold nothing, so no vertical
cuts were made.

### The seven video ads: blocked on one connector, shipped through another

`ads_creative_upload_video` and `ads_creative_upload_image` both return **"This tool is new and
is being gradually rolled out across ad accounts"** for `act_3530109303824417`, on every attempt.
Images route around it, because `ads_create_creative` takes a public `image_url` and needs no
upload; that is how all 10 banners went in from raw GitHub links. Video has no such field: a
video creative requires a `video_id` that only an upload produces.

**The route that worked was a different connector entirely.** Porter Metrics carries
`facebook_ads.video_upload`, which takes a public URL and returns a `video_id`, against the same
ad account. Robby authorized Porter's Facebook connection on 2026-08-19 and all seven uploaded
first try. The creatives were then built with the Meta connector as usual, so they carry the
`@esa_card` Instagram identity, the AI-disclosure opt-in and the GET_OFFER button exactly like
the banners; only the upload step went through Porter.

| | |
| --- | --- |
| Video ads | 7, all PAUSED, in ad set `120247924771890605`: `120247925337160605` w1-turtle, `120247925337670605` w2-alligator, `120247925337880605` w3-hedgehog, `120247925338100605` w4-chicken, `120247925339020605` w5-raven, `120247925339360605` w6-snake, `120247925339650605` w7-dog-and-human |
| Video ids | `1101739619464658`, `2116266675942666`, `1624194779225097`, `1599995124820806`, `2693003377836170`, `1094615333225879`, `1428542502557022` — all `video_status: ready` |
| Assets | the `*-1080p-captioned.mp4` cuts, one-word captions burned in, marigold `#f2a93b` emphasis |
| Copy (all 7) | the u-clip block verbatim: "A wallet card with your pet's photo..." / headline "Registered in about three minutes" / GET_OFFER |
| Thumbnails | frame at 0.30s from each captioned clip, before the first caption word, committed as `*-thumb.jpg` |

The ad set now holds **17 ads: 10 banners and 7 videos**, all PAUSED, campaign PAUSED.

### Two API facts worth keeping

**`custom_event_type` for InitiateCheckout is `INITIATED_CHECKOUT`, not `INITIATE_CHECKOUT`.**
The pixel event is named `InitiateCheckout`, so the wrong enum is the natural guess. It does
not fail as a validation error naming the field: it returns a generic
`{"error_category":"INTERNAL","is_retryable":true}`, which reads like a transient Meta fault and
invites blind retries. Four ad-set creates were burned before the enum was the suspect. **Treat
a retryable INTERNAL on a create as a possible bad enum, not just bad luck.**

**A gated MCP upload tool is not the same as a gated capability.** The image half of this build
shipped anyway because `ads_create_creative` accepts `image_url`. Check for a field that takes
the asset directly before reporting a platform as blocked.

## Update 2026-08-20: weird animals is live on Meta and selling; Reddit built, TikTok blocked

Robby: *"Can you make sure we also run the weird animals campaign in Reddit and TikTok? It seems
to be working very well."*

**It is working, and this is the verified version of that claim.** The campaign was PAUSED in the
section above; it is now ACTIVE at $100.00/day CBO and it is the best cost per purchase in the
account.

| campaign | spend | impressions | clicks | purchases | cost per purchase |
| --- | --- | --- | --- | --- | --- |
| `Weird Animals \| Checkouts` | $16.33 | 904 | 42 | **3** | **$5.44** |
| `US \| Cold \| Checkouts` (the source) | $237.87 | 8,765 | 598 | 8 | $29.73 |
| `US \| Cold \| Sales` | $34.50 | 796 | 43 | 2 | $17.25 |
| `US \| Retargeting \| Sales` | $26.02 | 449 | 30 | 0 | n/a |
| `US Metro \| Cold \| Sales` | $28.79 | 584 | 47 | 0 | n/a |
| `Intl EN \| Cold \| Sales` | $25.75 | 993 | 80 | 0 | n/a |

Break-even is $37.57, so $5.44 is 6.9x better than break-even. **Reconciled to Stripe, not read
off Meta**: three $39 PaymentIntents on 2026-08-20 carry
`utm_campaign=ESA Card | Meta | US | Cold | Weird Animals | Checkouts`, at 01:38, 01:45 and 03:01
UTC, with `utm_content` of `IMG w5-pig-square`, `IMG w2-alligator-square` and
`IMG w4-snake-square`. Meta's 3 and Stripe's 3 are the same three sales.

**Sample size is the honest caveat.** Three purchases on $16.33 is a real money event, not a
platform-reported proxy, but it is three. The 95% interval on a 3-sale count is roughly 0.6 to 8.8
sales, so the true cost per purchase could be anywhere from about $2 to $27. It beats the source
campaign on every plausible reading of that interval; it is not yet a measured 6.9x.

### All three sales are banners, and all three are the same layout

| ad | spend | impr | clicks | LPV | checkouts | purchases |
| --- | --- | --- | --- | --- | --- | --- |
| `IMG w4-snake-square` | $1.26 | 67 | 10 | 8 | 1 | **1** |
| `IMG w2-alligator-square` | $4.26 | 235 | 11 | 9 | 3 | **1** |
| `IMG w5-pig-square` | $0.72 | 36 | 3 | 2 | 1 | **1** |
| `IMG w3-raven-square` | $7.63 | 455 | 15 | 9 | 1 | 0 |
| `IMG w1-turtle-square` | $0.66 | 25 | 1 | 0 | 0 | 0 |
| `IMG w10-cockatoo-square` | $0.45 | 30 | 1 | 0 | 0 | 0 |
| `IMG w8-chicken-square` | $0.20 | 20 | 0 | 0 | 0 | 0 |
| `IMG w6-egg-square` | $1.05 | 28 | 1 | 0 | 0 | 0 |
| `IMG w7-hedgehog-square` | $0.00 | 2 | 0 | 0 | 0 | 0 |
| `IMG w9-axolotl-square` | $0.01 | 1 | 0 | 0 | 0 | 0 |
| 7 × `UGC w*` video | $0.09 | 5 | 0 | 0 | 0 | 0 |

Two facts worth carrying into the next batch, and one non-fact.

**Fact: the banners are carrying this, the videos are not in it yet.** The seven video ads have
taken 5 impressions and $0.09 between them. They have not lost; they have not run.

**Fact: snake, alligator and pig are all Layout A (`p2-offer`, "$39. One time.").** Layout A took
$14.53 of the $16.24 banner spend and produced all three sales.

**Non-fact: Layout B did not lose.** The five `p6-forever` banners have $1.71 of spend and 81
impressions between them. That is not a fair test of a layout, it is a delivery difference. Do not
retire Layout B on this evidence, and do not report it as a layout win for A.

### Reddit: 17 ads built, launch pending one permission

`_scripts/reddit-launch-esacard-weird-animals.mjs`. Dry run passes against the live account; the
`--live` pass is not run yet because the session's permission classifier blocked the write. One
command each way:

```
node _scripts/reddit-launch-esacard-weird-animals.mjs --live      # 17 posts + 17 ads, PAUSED
node _scripts/reddit-launch-esacard-weird-animals.mjs --activate  # flip them ACTIVE
```

| | |
| --- | --- |
| Target | the live ad group `ESA \| Pet + Housing \| Purchase` `2570690648253263407`, PURCHASE goal, **$30.00/day** (raised from the $5.00 floor recorded above), 63 communities, US only |
| Ads | 10 banners + 7 videos, mirroring the Meta names exactly (`ESA IMG w1-turtle-square` … `ESA VID w7-dog-and-human`) |
| Media | fal URLs, not `raw.githubusercontent.com`. Reddit fetches the URL itself and GitHub's CDN served a stale blob for minutes after a merge on 2026-08-18 |
| Links | `utm_source=reddit&utm_medium=paid_social&utm_campaign=esa-card-reddit-weird-animals&utm_content=<id>` |
| ids | prefixed `img-`/`vid-`, because `w3` is the raven as a banner and the hedgehog as a video. Bare w-numbers would merge two animals into one report row |
| Titles | videos use the clip's own opening line verbatim, the pattern the live d/e/h ads use. Banners get one line each, all inside the approved bank: the card, the photo on it, three minutes, $39 once, no subscription. No disclaimer anywhere (`docs/ads/policy.md` §0) |

**Reddit's record before this batch, which is the reason to read it carefully:**

| ad group | spend | impressions | clicks | purchases |
| --- | --- | --- | --- | --- |
| `Purchase` `2570690648253263407` (live, 60 ads) | $49.01 | 3,483 | 29 | **0** |
| `PageVisit` `2567956092694490967` (archived, 35 ads) | $16.93 | 1,632 | 45 | **0** |

**$65.94 spent on Reddit to date and zero purchases.** "Working very well" is a Meta fact and not
yet a Reddit fact. Adding 17 ads takes the live group to 77 ads on $30.00/day, about $0.39 per ad
per day, against a $37.57 break-even: an individual ad would need roughly three months of that
share to fund one sale. The batch goes in anyway because it is the best creative in the account
and Reddit's problem is not creative allocation, but the read will not be clean until either the
budget rises or the weakest incumbents are paused. That is a decision for Robby, not an assumption.

### TikTok: blocked, needs the connector

The TikTok Ads connector is **not attached to this session** and there are no TikTok credentials in
the environment (`REDDIT_ADS_*`, `META_*`, `GOOGLE_ADS_*` and `FAL_KEY` are all present; nothing
TikTok). Every prior TikTok build in this ledger went through the MCP connector, so there is no
script to fall back on and none was invented.

What a session with the connector attached needs to do, so nothing is re-derived:

| | |
| --- | --- |
| Campaign | `ESA Card \| TikTok \| US \| Web Conversions` `1873787435137170` |
| Ad group | `ESA \| US \| 25-55 \| Broad \| Purchase \| $300 Aug burst` `1873787389986961`, $20/day, burst ends 2026-09-02 00:00 UTC |
| Add | the 7 `UGC w*` clips as video ads, plus the 10 banners if image ads are wanted (the 20 originals were deliberately never uploaded: videos first, best banners after) |
| Media | use the fal URLs in `_scripts/reddit-launch-esacard-weird-animals.mjs`. TikTok's `UPLOAD_BY_URL` refuses `raw.githubusercontent.com` with error 40914 |
| Covers | required on non-Spark video ads; TikTok's own `video_cover_url` re-uploaded via `/file/image/ad/upload/` works |
| Identity | `ESA Card` (@esacard) via Business Center `7581306495212617745` |
| Links | `utm_source=tiktok&utm_medium=paid_social&utm_campaign=esa-card-tiktok-weird-animals&utm_content=<id>` |

**Budget warning, unchanged from 2026-08-19:** the burst ad group already carries 21 ads on
$20.00/day. Seventeen more makes 38 ads, about $0.53 per ad per day. Adding them without raising
the budget buys presence, not a readable test.

**TikTok organic was deliberately not scheduled.** The @esacard queue is already booked to
2026-09-13 with the u-clip and h-clip runs, so weird animals would start around 2026-09-27 at the
established every-two-days cadence, which is too late to inform anything. Postiz also exposes no
delete, so a scheduled post cannot be pulled back through the API. Say the word and it goes in.
