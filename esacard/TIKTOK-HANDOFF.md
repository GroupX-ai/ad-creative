# ESA Card on TikTok Ads: prompt for a fresh session

Paste the block below into a new conversation that has the **TikTok Ads connector**
attached, plus the `ad-creative` and `esacard.com` repos. Everything the session needs
is in the prompt; it does not depend on this one.

---

Launch TikTok Ads for ESA Card. Everything below is already built and verified, so do not
rebuild any of it. Read the two policy docs before you write a single line of ad copy.

**The product.** esacard.com sells one thing: a $39 one-time emotional support animal
registration kit, delivered as two print-ready PDFs (a wallet ID card with the animal's
photo, and a certificate) plus a registration number anyone can verify at
esacard.com/verify. No subscription, no renewal fees, 30-day money-back guarantee on the
product. There is no second product: a $69 printed kit exists in the codebase but is not
shipping, so it must never appear in ad copy.

**Read first, in this order.**
1. `docs/ads/policy.md` in the `esacard.com` repo. This is the binding claim-safety
   document. The rule of thumb is: the ad may describe *what the customer receives*, it
   may not describe *what the customer will be allowed to do*.
2. `docs/ads/meta-ads.md` in the same repo, section 3 and section 5. The optimisation-event
   reasoning and the five creative concepts both transfer to TikTok directly.
3. `esacard/DISTRIBUTION.md` in the `ad-creative` repo. The per-asset, per-platform ledger.
   Update it when TikTok ships so nothing gets uploaded twice.

**Hard copy rules, no exceptions.**
- Never abbreviate to the three-letter acronym. Write "emotional support animal" in full.
  Robby's note: *"My partner said nobody knows what an ESA card is. Use Emotional Support
  Animal, never ESA."* The only permitted appearance of those letters is inside the domain
  `esacard.com`.
- No claim about housing, landlords, airlines, public access, or legal force. Banned
  outright: "official registry", "government-approved", "landlords must accept",
  "avoid pet fees", "get your animal approved for housing", and anything pairing
  "guaranteed" with a housing, airline or legal outcome.
- No personal-attributes framing. Never address the reader as someone with a condition:
  no "struggling with anxiety", no "the support you need", no "do you need an emotional
  support animal". This is the single most common cause of disapproval in this category.
- Safe and already true of the site: "a registration number anyone can verify",
  "a convenience credential, not a legal document", "housing rights come from a letter
  written by a licensed mental health professional", "$39 once, no renewal fees ever",
  "registered in about three minutes, no appointments and no health questions".
- Never invent a testimonial, a customer count, or a star rating. The site launched with
  zero testimonials on purpose.

**What already exists.**

| | value |
| --- | --- |
| TikTok ad account | `7673589031742701586` |
| TikTok pixel | `esacard.com`, code `D9V1HSBC77UBUCS23800` |
| Pixel setup | manual / developer mode, first-party cookies ON, Automatic Advanced Matching OFF |
| Events API token | already set in Vercel as `TIKTOK_EVENTS_ACCESS_TOKEN`, production deployed |
| Billing | auction billing, funded, no blocker |

The site already fires TikTok events client-side through `src/lib/analytics.ts`:
`ViewContent` at the card preview step, `InitiateCheckout` at the Stripe handoff, and
`Purchase` on completion, each with a deduplication `event_id` shared with the server side.

**Do not create rule-based pixel events in TikTok Events Manager for this site.** The
events are instrumented in code. A rule-based duplicate would double-count. This is
written down in `docs/ads/README.md` and has already been decided.

**The creative, all approved and already live elsewhere.**

- **20 banners**: `esacard/2026-08-14-spelled-out/p*.png` in the `ad-creative` repo, square
  and vertical. Public raw URLs work and TikTok can fetch them:
  `https://raw.githubusercontent.com/GroupX-ai/ad-creative/main/esacard/2026-08-14-spelled-out/<name>.png`
- **10 videos**: `esacard/2026-08-14-approved/d*-captioned.mp4` and
  `esacard/2026-08-14-batch2/e*-captioned.mp4`. Vertical 9:16, 720x1280, 15 seconds, with
  burned one-word captions, which means they read correctly with the sound off. Same raw
  URL pattern. These are the highest-value assets you have for TikTok: they are
  slice-of-life phone-shot clips of real-looking people and genuinely cute animals, with
  no pitch beat and no end card.
- **5 reserve videos**: `esacard/2026-08-14-spelled-out/c*-captioned.mp4`. A different
  register (one person talking to a phone). Held back deliberately. Do not ship these
  without asking.

The ten videos are also published publicly on the ESA Card YouTube channel
(`UCMzoIiRibLPRtDoQjF3L9mw`), so do not re-render anything.

**Standing rule from Robby, which has already been broken once:**
*"Please never create video ads again without sending me the script first!"* If you decide
new creative is needed, write the scripts, send them, and wait. Do not render.

**What to build.**

One campaign, resist launching five.

```
Campaign: ESA Card | TikTok | US | Web Conversions
  Objective: Website conversions
  Budget: $30/day to start, campaign-level
  Ad group 1: US, 25-55, broad, no interest stack
  Ads: start with the 10 videos, then add the strongest banners
```

**The optimisation-event decision, which matters more than anything else here.**

Do not optimise for `Purchase` on day one. TikTok, like Meta, needs roughly 50 optimisation
events per week to leave the learning phase. Break-even cost per purchase is **$37.57** net
of payment processing, so 50 purchases a week is about $1,878 a week, which is far above
this budget. A Purchase-optimised ad group at $30/day will sit in learning indefinitely and
deliver badly.

Optimise for `InitiateCheckout` instead, which fires at the Stripe handoff and is already
instrumented. Step up to `Purchase` only when the account genuinely produces the volume.

**Measure `Purchase` the whole time regardless.** The optimisation target and the success
metric are different things. The success metric is cost per purchase against $37.57, and
**Stripe is the system of record**, not TikTok's reported conversions. Reconcile weekly and
expect a gap; that gap is attribution modelling, not a bug.

When you report results back, report the money event at its absolute level. Do not lead
with a week-over-week change, and never blend two different event types into one blended
cost per result.

**Tag the links** so Stripe metadata stays readable months from now:

```
utm_source=tiktok&utm_medium=paid_social&utm_campaign=<campaign>&utm_content=<ad>
```

**Two things to check before you spend anything.**
1. Domain verification for `esacard.com` in TikTok Business Center under Assets → Domains.
   Without it, web-conversion optimisation is degraded.
2. That the pixel is actually receiving `InitiateCheckout`, not just `PageView`. On Reddit
   this exact check failed: its pixel had only ever seen `page_visit`, which made every
   real conversion goal unavailable at the API level. Verify the same thing on TikTok
   before you build the ad group, because the optimisation goal cannot be changed after
   creation on some platforms and you do not want to find out late.

**Leave everything paused and show Robby the ad previews before activating.**
