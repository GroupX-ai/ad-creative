# ESA Card paid ads: prompt for a fresh session

Paste the block below into a new conversation that has the **TikTok Ads connector** and the
**Meta Ads connector** attached, plus the `ad-creative`, `esacard.com` and `second-brain`
repos. Google Ads, Reddit Ads and Stripe credentials are already in the agent environment.
Everything the session needs is in the prompt; it does not depend on this one.

Scope set by Robby on 2026-08-14: review the live campaigns, move optimisation to
purchases, launch TikTok, and pitch new heart-tugging creative.

---

You are picking up ESA Card paid acquisition. Four campaigns are already live (Google
Search, Google Demand Gen, Meta, Reddit) and there are already purchases. Five jobs, in
this order:

1. **Full review of the live campaigns.**
2. **Move optimisation to purchases.** Robby: "I think we can start optimizing around
   purchases - it's clearly converting." That decision is made; execute it, do not
   re-litigate it.
3. **Launch TikTok Ads.**
4. **Pitch new creative** (banners and videos): "really creative heart tugging angles."
   Pitch first, render nothing without approval.
5. **Build the self-report attribution question**, which Robby wants and which does not
   exist on the site yet (verified 2026-08-14, details in job 5).

**The product.** esacard.com sells one thing: a $39 one-time emotional support animal
registration kit, two print-ready PDFs (a wallet ID card with the animal's photo, and a
certificate) plus a registration number anyone can verify at esacard.com/verify. No
subscription, no renewal fees, 30-day money-back guarantee. Net per sale after payment
processing: **$37.57**. A $69 printed kit exists in the codebase but is not shipping and
must never appear in ad copy.

**Read before touching anything, in this order.**
1. `resources/paid-ads-creative-playbook.md` in `second-brain`. The master playbook; its
   claim-safety section is binding on every batch.
2. `docs/ads/policy.md` in `esacard.com`. What we may not claim.
3. `docs/ads/meta-ads.md` in `esacard.com`, sections 3 and 5. Section 5 opens with a
   blocking rule ("ads sell, they never disclaim") that overrides anything else you read.
4. `esacard/DISTRIBUTION.md` in `ad-creative`. The per-asset, per-platform ledger. Update
   it with everything you ship.

---

## Job 1: the review

Stripe is the system of record, not the ad platforms. `STRIPE_KEY_ESA_CARD` is in the
environment.

1. Pull Stripe day by day since 2026-08-13. Count real $39 purchases (ignore $0.50 card
   checks). Read each charge's metadata (`utm_*`, `fbclid`) to attribute purchases to a
   platform where possible.
2. Per platform, report at absolute level: spend, impressions, clicks, checkouts started,
   purchases, cost per purchase against **$37.57**. One row per event type, never blended.
   Lead with the level, not a trend.
3. Attribute with Stripe metadata first: every purchase's PaymentIntent carries
   first-touch click attribution written by `src/lib/attribution.ts` in `esacard.com`
   (gclid/gbraid/wbraid, fbclid, ttclid, utm_*, referrer host). PaymentIntent metadata is
   searchable. The SOURCE line in the Slack feeds is derived from exactly this data, so
   Slack and Stripe should agree.
4. Use Mixpanel for traffic and funnel conversion: project `4052772`. The funnel is
   Registration Started → Registration Step Completed → Checkout Started → Payment
   Succeeded → Kit Delivered, and the browser's distinct id is passed into checkout so the
   webhook-fired money events join the visitor. Read step-to-step conversion and where
   paid traffic drops. Reconcile Payment Succeeded to Stripe; when they disagree, Stripe
   wins.
5. Check delivery health: Meta ad review states, Reddit ad approval states, Google serving
   status and search terms (add negatives if junk queries are buying clicks), Demand Gen
   actually serving.
6. Verdict per platform: scale, hold, fix, or kill. Blunt.

## Job 2: move optimisation to purchases

Current state and what to do on each:

- **Google Search + Demand Gen: already optimise for Purchase, but verify the
  misconfiguration fix first.** The Search campaign sat `primary_status: MISCONFIGURED`
  at launch ("missing a goal" in the UI): the PURCHASE goal existed at campaign and
  account level with `biddable: false`, so Maximize Conversions had nothing to bid on,
  which is consistent with the campaign spending $0. Fixed 2026-08-14: `biddable: true`
  set on both campaigns' goals and the account default, confirmed by read-back. The
  status is computed asynchronously, so your first Google action is to check
  `campaign.primary_status` has left MISCONFIGURED; if it has not, read
  `campaign.primary_status_reasons` and fix what it names before judging Google on
  performance. Then verify conversions are recording against
  `AW-18387903752 / Y4F_CN7rlOEcEIjKhMBE`.
- **Meta: currently optimises for InitiateCheckout.** Update the ad set's promoted_object
  to `{"pixel_id":"4305407809789395","custom_event_type":"PURCHASE"}`. This resets the
  learning phase; that is accepted, Robby made the call.
- **Reddit: currently PageVisit, and the goal is immutable after creation.** First check
  `GET /pixels/a2_ji9rrnreyf0d/last_fired_at`. If `purchase` is non-null, build a NEW ad
  group with `optimization_goal: PURCHASE`, recreate the 30 ads against the same post ids
  (posts are reusable), then archive the old ad group. If `purchase` is still null, Reddit
  physically cannot do it yet; say so and leave it.
- **TikTok: build it purchase-optimised from day one** (job 3), provided its pixel has
  seen Purchase events; verify that first.

## Job 3: launch TikTok

What already exists. Do not rebuild any of it:

| | value |
| --- | --- |
| Ad account | `7673589031742701586` |
| Pixel | `esacard.com`, code `D9V1HSBC77UBUCS23800` |
| Pixel setup | manual/developer mode, first-party cookies ON, Automatic Advanced Matching OFF |
| Events API token | live in Vercel as `TIKTOK_EVENTS_ACCESS_TOKEN`, production deployed |
| Billing | auction billing, funded |

The site fires TikTok events client-side from `src/lib/analytics.ts`: `ViewContent`,
`InitiateCheckout`, `Purchase`, each with a dedup `event_id` shared with the server side.
**Do not create rule-based pixel events in TikTok Events Manager**; the events are
instrumented in code and a rule-based duplicate would double-count (decided, in
`docs/ads/README.md`).

Build one campaign, resist launching five:

```
Campaign: ESA Card | TikTok | US | Web Conversions
  Ad group: US only, 25-55, broad, no interest stack
  Optimise: Purchase (verify the pixel has seen it; else InitiateCheckout and say so)
  Ads: the 10 videos first, best banners after
```

Creative is ready and approved: 10 vertical videos (9:16, 720x1280, 15s, burned one-word
captions) at `esacard/2026-08-14-approved/d*-captioned.mp4` and
`esacard/2026-08-14-batch2/e*-captioned.mp4`, 20 banners at
`esacard/2026-08-14-spelled-out/p*.png`. TikTok can fetch the public raw URLs:
`https://raw.githubusercontent.com/GroupX-ai/ad-creative/main/esacard/<dir>/<file>`.
5 reserve videos (`c*-captioned.mp4`) are held back deliberately; do not ship without
asking.

Before spending: verify `esacard.com` domain in TikTok Business Center (Assets → Domains),
and confirm the pixel is receiving real events, not just PageView. On Reddit that exact
check failed and blocked every conversion goal.

**Budget: the standing cap is $1,000/month across ALL ad accounts**, currently fully
allocated (Meta $13.88/day, Google Search $9, Demand Gen $5, Reddit $5). Adding TikTok
breaks the cap unless something gives. Propose a rebalanced split to Robby and get his OK
before activating TikTok spend. Note the floors: Demand Gen and Reddit each refuse below
$5.00/day.

Tag links: `utm_source=tiktok&utm_medium=paid_social&utm_campaign=<campaign>&utm_content=<ad>`.

Build everything paused, show Robby previews, activate on his OK.

## Job 4: new creative, heart-tugging angles

Robby wants more banners and videos: "we just need really creative heart tugging angles."

- **Pitch before you produce.** Send Robby a numbered list of angles (one line each) and
  full scripts for any video. Standing rule, already broken once: *"Please never create
  video ads again without sending me the script first!"* Render only after his OK.
- The register that won, per Robby: `d1-viewing` and `d5-hotel`. "The most authentic
  feeling, and the animals are genuinely wholesome and cute... very authentic, wholesome,
  cute, interesting." Slice-of-life, phone-shot, one warm moment, the animal is the star,
  ends inside the moment. No pitch beat, no end card, no concept ads.
- Emotional beats that worked in batch 2: the daycare drop-off where she stays at the
  fence, the first flat with the puppy in the one patch of sun, forehead-to-forehead with
  the sitter. Aim there.
- Production mechanics live in the playbook: Seedance recipe, the phrase-in-the-main-
  speaker's-mouth finding, the ElevenLabs transcription gate (nothing ships unverified),
  caption tooling in `_scripts/` (the `esacard` brand kit is already in
  `seedance-emphasis.mjs`), banner QA including the luminance check.

## Job 5: build the self-report attribution question

Robby: "We also ask each user to self-report where they came from (beyond the pixel) - it
shows up in Slack and I'm sure we save it somewhere."

Checked against the code on 2026-08-14: **the site does not ask this today.** Nothing in
the funnel, the success page or the kit email asks where the buyer came from; the kit
email only asks "reply and tell us how it went". What shows up in Slack as SOURCE is the
automatic click attribution (gclid/fbclid/utm/referrer host), which IS saved to Stripe
metadata. The self-reported answer Robby wants is the missing piece, and it matters
because click attribution goes dark exactly where iOS privacy bites hardest.

Build it, small:

- One tap-to-answer question on `/register/success`, after payment so it cannot cost a
  sale: "Where did you find us?" with one-tap options (TikTok, Instagram or Facebook,
  Google, Reddit, YouTube, a friend, somewhere else) and a free-text fallback.
- Persist the answer onto the **PaymentIntent metadata** as its own key (for example
  `self_reported_source`). Stripe merges metadata on update and the codebase already
  updates PaymentIntent metadata in `recordRegistration` in `src/lib/registrations.ts`;
  follow that pattern. There is no database; Stripe is the system of record, so if it is
  not in Stripe metadata it does not exist.
- Echo it into the Slack activity feed next to the derived SOURCE line, labelled as
  self-reported so the two are never confused (`src/lib/slack.ts` builds those lines, and
  it deliberately quotes any value a stranger can type; keep that).
- Treat the answer as untrusted user input everywhere it renders.
- Open a PR on `esacard.com` and show Robby; do not push to main.

---

## Hard copy rules, no exceptions

- **ADS SELL. ADS NEVER DISCLAIM. Broken twice already.** On 2026-08-13 a live ad opened
  with "There is no official government registry for emotional support animals. Ours
  included." Robby: *"The ads should only talk about positives. They should not be used
  for disclaimers."* Earlier, on the first Meta batch: *"You're supposed to market this
  and get people interested, not waste my money on disclaimars."* Concretely:
  - Never open on what the product is not. No "there is no official registry", no "ours
    included", no "not a legal document", no "we do not sell letters".
  - Never sell against a competitor's behaviour. Say "$39 once" and stop.
  - Never append a closing honesty paragraph.
  - Say what the buyer gets, in the first line.
  - `policy.md` lists what you may not CLAIM. It is not a requirement to DISCLAIM.
  - Before shipping, grep your copy for
    `no official|not a legal|do not sell|legal weight|ours included|charge you every year`.
    Zero hits or it does not ship.
- **Never the three-letter acronym.** Write "emotional support animal" in full,
  everywhere. Robby: "Use Emotional Support Animal, never ESA." Only exception: the domain
  `esacard.com`.
- No claim about housing, landlords, airlines, public access or legal force. Banned:
  "official registry", "government-approved", "landlords must accept", "avoid pet fees",
  "guaranteed" near any housing/airline/legal outcome.
- No personal-attributes framing: never address the reader as someone with a condition.
  No "struggling with anxiety", no "the support you need".
- **Build copy from these, all true of the site:** a wallet card with your animal's photo,
  a certificate for the wall, a registration number anyone can verify, print-ready PDFs in
  about three minutes, $39 once, no renewal fees, no subscription, no appointments, 30-day
  money-back guarantee.
- No invented testimonials, customer counts or star ratings.

## Live account state (2026-08-14)

| platform | ids |
| --- | --- |
| Meta | account `3530109303824417`, campaign `120247770766350605`, ad set `120247770766910605`, page `1238464462686774`, Instagram `17841438094553997` (@esa_card), pixel `4305407809789395` |
| Google | customer `3800595805` under manager `3410674045`, Search campaign `24128254302`, Demand Gen `24134740046` |
| Reddit | account `a2_ji9rrnreyf0d`, campaign `2567783104065621570`, ad group `2567956092694490967` (PageVisit bootstrap), profile `t2_2kl3hjgu1c`, pixel id = account id |
| YouTube | channel `UCMzoIiRibLPRtDoQjF3L9mw`, the 10 clips are public there |

## API traps already hit once. Do not rediscover them

- Reddit ad `type` is `UNSPECIFIED`, not `PROMOTED_USER_POST`. Ads are backed by posts:
  `POST /profiles/{id}/structured_posts/jobs`, poll the job, create the ad on the returned
  `post_id`. Updates are `PATCH /ad_groups/{id}` with NO `/ad_accounts` prefix. There is
  no DELETE; pause and rename.
- Reddit only allows optimisation goals its pixel has actually fired. Check
  `last_fired_at` first.
- Meta: `connected_instagram_accounts` is not the readiness check;
  `/act_.../instagram_accounts` is. `instagram_user_id` cannot be patched onto a live
  creative. A refetched `video_data` carries both `image_url` and `image_hash` and Meta
  rejects specs with both; drop the url, keep the hash.
- Google removed `VIDEO_ACTION` in API v25; video conversions are Demand Gen, targeting on
  the ad group, `contains_eu_political_advertising` required.
- Everything is US-only. Google both campaigns `positive_geo_target_type: PRESENCE`; Meta
  reads back `["frequently_in","home"]` and will not go stricter at country level.

## Reporting discipline

Report the money event at its absolute level: purchases and cost per purchase against
$37.57, Stripe as the source. Never lead with a week-over-week change, never blend event
types into one cost per result, and label any guess as a guess.
