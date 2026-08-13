# Batch 8 — 2026-08-13 — TeamPredict paid launch (20 banners + 10 video scripts)

Robby's brief:

> We are ready to start marketing TeamPredict on all paid ad platforms (Meta, Google,
> Reddit). I understand that Reddit is waiting for a conversion to move forward (unless we
> choose a click-based conversion?). Either way, please use existing ads in `ad-creative`
> and create new ones. I want around ~20 disruptive, interesting, scroll stopping
> banners... Make these super viral and engaging while elegant and minimalistic. Leverage
> colors, visuals, etc... ALSO we need ~10 video ads around 15 seconds each. Come up with
> brilliant video ad concepts and send me some scripts.

Assets: `teampredict/2026-08-13-paid-launch/`. Prompts:
`teampredict/2026-08-13-paid-launch/_work/gen-banners.mjs`. Scripts (unrendered):
`teampredict/2026-08-13-paid-launch/VIDEO-SCRIPTS.md`.

First TeamPredict creative since 2026-07-27, and the first for this brand aimed at all
three platforms at once.

## The Reddit premise was out of date, and the answer is "no, don't go click-based"

Checked live against the Reddit Ads API on 2026-08-13, not read from the notes.

| Event on pixel `a2_jdimqxjqurs0` | Last fired |
|---|---|
| `page_visit` | 2026-08-13T22:15:44Z |
| **`sign_up`** | **2026-08-12T04:31:06Z** |
| `purchase` (card-on-file trial) | never |

`sign_up` firing is exactly the gate that was closed. Reddit refuses a conversion-optimised
ad group only against a pixel that has never received the event
(`reddit-ads-api-access.md`, proved by controlled test 2026-07-30), so **the conversion
route is open and a click-based campaign is unnecessary**. It is also banned: the standing
rule from 2026-07-20 is that every paid campaign optimises for the free-trial signup, never
traffic or link clicks, and `CLICKS` was only ever the fallback a dead pixel forced.

**The live blocker is funding, not tracking.** Funding instrument `1935303` reads
`is_servable: false` with `CREDIT_CARD_NOT_APPROVED` and `CREDIT_LINE_EXHAUSTED`. Campaign
shell `2557856076616171750` ($300/month, PAUSED) has existed since 2026-08-01 and cannot
spend. Robby's action, the same one that unblocked BitPredict the same week.

Not verified: that an ad group with `optimization_goal: SIGN_UP` is now accepted on this
account. The discriminating test is creating one, and Reddit has no DELETE for ad groups,
so it was left for the launch build rather than run as a probe.

## The creative bet: minimal is not the polished middle

The tension in the brief is real. The repo's evidence says Robby's picks land in loud
direct-response or native/organic and never in polished-corporate, and "elegant and
minimalistic" sounds like the third thing that has never been chosen.

It is not. **Polished-corporate is the stock SaaS gradient, the laptop mockup and the row
of feature chips.** Minimal is the opposite of that: one flat saturated colour field, one
idea, enormous type, nothing else. That is loud and restrained at once, and it is what
sixteen of the twenty are.

The other four are the native/organic family, kept because it is the only family in this
repo with a win attached (VoiceDrop whiteboard, "best by far"), and because Reddit is its
home ground.

Colour carries the disruption. TeamPredict owns a stronger palette than most HR tech:
indigo `#4B56FF`, near-black `#0D0120`, and a green/amber/red risk traffic light. Full-bleed
amber (`t5`) and full-bleed red (`t16`) are alarm states no competitor in this category is
using.

## Three angles the site now supports and no TeamPredict ad has ever used

The homepage grew three sections since the July playbook was written. That is the batch-6
"re-read the approved bank against the live site every batch" rule paying for itself
immediately:

1. **Competitor tracking** ("Point the Same Radar at Your Competitors.") — reaches founders
   and recruiters, a different buyer from HR, with the same product. Banners `t13`, `t14`,
   video `4`.
2. **Slack team health** ("People Go Quiet Before They Resign.") — arguably the best
   headline on the site. Banner `t6`, video `5`.
3. **LinkedIn page engagement** ("See Who Shows Up for Your LinkedIn Page.") — held back so
   the set does not sprawl. Available next batch.

The hero subheadline had also drifted: it now carries "plus weekly Slack message counts per
person if you switch that on." `TeamPredict-Marketing/AD-CREATIVE-PLAYBOOK.md` was rewritten
with the full re-verified bank.

## Two new guardrails written into the company playbook

Both come from defects other brands hit, applied here before they could happen:

1. **No product screens in generated creative, at all.** Batches 5 and 7 established that a
   screen only stays clean when the prompt states exhaustively what IS on it. For this brand
   the stakes are higher than a stray caller label: an invented risk score or employee row
   is precisely the claim TeamPredict does not make (the site calls the score "a
   prioritization signal, not a verdict" and publishes no accuracy figure). So the rule is
   absolute rather than careful. The three concepts with a data visual (`t6` bars, `t7`
   line, `t15` timeline) each specify no axes, no numbers and no labels.
2. **No LinkedIn or Slack logo, glyph or icon.** Both are third-party marks. Naming them in
   text is fine and on-brand; the site does it throughout.

## The logo, again composited rather than described

Every prompt forbids brand marks outright; the real mark comes from
`TeamPredict-Marketing/public/logo.svg` via cairosvg plus Pillow, with the wordmark set in
Plus Jakarta Sans ExtraBold, the site's own heading font (`_work/composite-logo.py`).

Poster frames get the lockup centred in the clean top band the prompt reserved. Native
frames get a small mark bottom-right on a dark plate, since a top-centre wordmark on a
photograph reads as an advert instantly. `banners-nologo/` keeps clean copies for Reddit.

## Video: scripts only, deliberately

Robby asked for scripts to approve or revise, so nothing was rendered. Ten concepts at
about $6.93 each is roughly $70, and batch 5's judge panel showed that reviewing scripts
before paying to render them cuts angle collisions and banned claims for free.

Two production calls are put back to him in the doc: who presents (BitPredict's "men only"
was field-specific; the buyer here is HR and People teams, so the cast was written mixed
with women in the majority), and the screen recording. The single best-performing B2B video
format is a raw screen recording of one workflow, and none of the ten uses one, because it
is the one asset that cannot be generated safely under the no-screens rule. Eight seconds
captured from the real app would improve the whole set.

## QA: every one of the 33 frames reviewed at full size

**Zero fabricated logos, zero invented badges, zero feature chips, zero fake percentages,
zero third-party marks.** The three concepts carrying a data visual (`t6` bars, `t7` line,
`t15` timeline) each rendered with no axes, no numbers and no labels, as specified. The
four native photographs kept their screens genuinely blank, which is the exhaustive-
statement rule working. Two defects, both fixed.

### `t2` square: a long word repeated twice gets garbled the second time

The square rendered its headline "RESIGNATION LETTER." correctly and then spelled the
subline "Spot rising **ressignation** risk early." **A re-roll produced the identical
typo**, so this is reproducible rather than a random fault, and the landscape version of
the same prompt spelled both instances correctly. The variable is the shape, but the
mechanism is the repetition: the model gets the first instance of a long word right and
drifts on the second.

Fixed by removing the repetition rather than paying for a third roll: the subline is now
the site's hero headline, "Know when an employee is about to leave." **General rule for
future prompts: do not use the same long word in both the headline and the subheadline of
one frame.** Cheaper than a re-roll and it removes the failure mode instead of retrying it.

### `t11`: near-black subline running across the indigo half

Wave 1 set the subheadline in one colour straight across a hard split-screen, so the words
sitting on the indigo half were barely legible. Fixed by giving each half the colour that
survives on it, which is the rule the headline in the same prompt already followed. Both
shapes re-rolled.

`t11` is still the weakest of the twenty: the split lands mid-word on the headline, so a
couple of letters change colour inside a word. Usable in a twenty-way test, but it is the
first one to cut.

## Operational note: parallelise the fal pool

The serial render loop every prior batch used takes about 90 seconds per image, which is
fine for 11 banners and most of an hour for 33. `gen-banners.mjs` now runs a **six-way
concurrency pool** and skips any render already on disk, so a batch is resumable and a
finished image is never paid for twice. Worth copying into future banner scripts.

## Spend

| Item | Cost |
|---|---|
| 33 renders (20 square, 9 landscape, 4 vertical), GPT Image 2, quality high | ~$6.60 |
| 4 re-rolls (`t2` square x2, `t11` square and landscape) | ~$0.80 |
| Video | $0 (scripts only, pending approval) |
| **Total** | **~$7.40** |

If all ten scripts are approved: ~$70 to render at 15s/720p, ~$1 upscaling, ~$0.10
transcription, plus one budgeted re-roll at ~$7.
