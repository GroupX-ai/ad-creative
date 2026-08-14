# Batch 9 — 2026-08-13/14 — TeamPredict launch: 6 video ads, and the campaigns

Robby's brief, on the batch-8 script doc:

> Approved video ad angles: Keep Scrolling, Two Weeks, Open To Work. But even those are a
> bit Meh. It needs to be much more interesting, maybe funny or ironic. Please create the
> approved videos + 2-3 high confidence videos. You have full permission to create the ads
> in all paid ad platforms for TeamPredict ad accounts, and launch campaigns ($1,000 shared
> monthly budget). Please do it all the way.

Assets: `teampredict/2026-08-13-paid-launch-video/`. Prompts:
`_scripts/seedance-prompts-b9-teampredict.mjs`. Launch scripts:
`_scripts/reddit-launch-teampredict.mjs`, `_scripts/meta-launch-teampredict.mjs`.

## Where it ended up

| Platform | State | Budget |
|---|---|---|
| **Reddit** | **LIVE.** Campaign, ad group and 12 ads ACTIVE, ads in Reddit review | $8.00/day (~$243/mo) |
| **Meta** | Campaign, ad set and 7 creatives built. **Zero ads: the account's card is declined** | $13.00/day (~$395/mo) |
| Google | Two live search campaigns, budgets rebalanced into the pool. No new creative | $13.00/day cap (~$395/mo), actual ~$226/mo |

Realistic combined run rate is about **$865/month**; the absolute worst case if all three
max their caps simultaneously is $1,033. Google is the reason those diverge: its caps are
roughly twice its actual spend, because search volume, not budget, is what limits it.

## "A bit Meh" was a diagnosis, and it was right

The three approved batch-8 drafts stated a problem in a serious voice and stopped. That is
what Meh means: **no turn**. Three things changed and they are the whole batch.

1. **Every script now sets something up and breaks it.** Keep Scrolling went from a dare to
   a man taking his own dare and losing: he lists the reasons he is not worried and every
   reason is a red flag. Two Weeks went from a tense silence to a manager who does not react
   with shock at all, just starts negotiating with furniture.
2. **The joke lands in the middle, never the last three seconds.** The tail is the least
   reliable beat in this model (batch 1), so the payoff sits at 3-11s and the close is
   deliberately trimmable. This paid for itself immediately: v3's tail garbled and cost
   nothing to cut.
3. **Played completely straight.** A shared COMEDY RULE block forbids mugging, winking at
   the lens, comedy pauses and laughing at your own line. Generated comedy dies the moment a
   performer signals that a line is a joke.

**Where the premises come from is the batch-6 rule, not invention:** the funny angle is the
customer's existing complaint. The counter-offer that arrives two weeks too late, the pizza
party as a retention strategy, the "Open To Work" badge everyone can see except the person
it concerns, paying for information that was public the whole time. None of these needed a
joke bolted on, and none needs product knowledge to land.

## The six

| | Concept | Format | Register |
|---|---|---|---|
| v1 | **Keep Scrolling** (approved) | UGC selfie | smug to dawning horror |
| v2 | **Two Weeks** (approved) | office two-hander | earnest panic-negotiation |
| v3 | **Open To Work** (approved) | nature documentary parody | hushed, reverent, whispered |
| v4 | **Pizza Party** (new) | office kitchen two-hander | cheerful, then nothing |
| v5 | **The Psychic** (new) | format parody | theatrical, then flatly professional |
| v6 | **I Use It On My Competitors** (new) | UGC selfie in a car | gleeful, conspiratorial |

Two of the six (Two Weeks, Pizza Party) **never speak the brand at all**, by design. Five
compound brand names have been mispronounced across seven batches, and the composited end
card says it regardless, so not every clip has to gamble on the audio.

**v3 rendered better than it was written.** The prompt said Derek eats a sandwich at his
desk; the model took "observe the manager in his natural habitat" literally and has him
crouched on the carpet like an animal at a watering hole. That is the format parody working
as intended: give the model a grammar and it will out-commit you.

## QA: all six watched at full size and transcribed

**Zero screens, zero third-party logos, zero invented risk scores, zero employee rows, zero
fabricated marks.** That is this brand's hardest guardrail and the exhaustive SCREEN RULE
(state what IS visible, never just ban what is not) held across two office scenes, an open
plan floor and a kitchen full of people.

One caveat recorded honestly: in v2 and v3 the deep background carries monitors that are
switched on. They are blurred past legibility with no readable content, so nothing is
claimed, but they are not the "no display surface anywhere" the prompt asked for. A
background at focal distance is where the screen rule leaks.

### The brand name came through clean on all four clips that speak it

First clean sweep in eight batches, against "One look", "Email Chacha", "Email Chaper",
"BitProtect" and "Bitpropt". The per-syllable anchor ("pre" as in prepare, "dict" as in
dictionary, sound the final t) is now proven twice.

### Two defects, both repaired for $0

**v3's tail garbled.** The last word came out "from-" instead of "free", cut off mid-sound.
Word timings put the end of "TeamPredict" at 13.94s and the next word at 14.40s, so the clip
is cut at 14.15s, inside the silence gap. The end card carries "Start 30-Day Free Trial", so
nothing is lost from the message. A re-roll would have been $6.93 for no gain.

**v6 captioned as "TEAM PROTECT".** Caught by reading every burned-in word off a filmstrip,
not by watching. This is the batch-6 "BitProtect" slip again, and the rule about
cross-checking a proper noun on more than one engine is what settled it: **four separate
transcription passes of the same audio returned "Team Predict" and only the captioning pass
returned "Protect"**, so the actor was right and the transcriber was wrong. Repaired by
adding `["team","protect"] -> "TeamPredict"` to `BRAND_JOINS`, which makes a burned-in brand
typo impossible whichever way the fluke lands next time.

**General rule out of this:** a transcript is not a check on captions. The captions script
runs its own transcription pass, so the copy can verify clean and still burn in wrong.
Read the burned-in words off the finished file, every clip, every batch.

## Platform notes worth keeping

### Reddit: two API changes since the BitPredict launch the same week

Both cost a round trip and both are now in `reddit-launch-teampredict.mjs`.

1. **The ad `type` enum is now `UNSPECIFIED` and nothing else.**
   `PROMOTED_USER_POST`, which worked on 2026-08-13, is rejected with
   `data/type: 'UNSPECIFIED' was expected`. The OpenAPI spec at `/api/v3/openapi.json`
   answered this in one query where the docs did not, again.
2. **PATCH is top-level, CREATE is nested.** `PATCH /ad_accounts/{acct}/ads/{id}` returns a
   bare `Not Found`, which reads like a missing entity and is really a wrong URL. The right
   shapes are `PATCH /ads/{id}`, `PATCH /ad_groups/{id}`, `PATCH /campaigns/{id}`.

**And a real lesson about idempotency.** The first run created the ad group and all twelve
structured posts, then failed on every ad. Posts are as undeletable as ads, so a naive retry
would have left twenty-four posts on the brand profile. The script now matches existing
posts by the `utm_content` slug baked into each destination URL and wires ads to them.
**Idempotency has to cover every entity a run creates, not just the last one.**

Targeting is eleven buyer-side communities (r/humanresources, r/AskHR, r/managers,
r/askmanagers, r/Entrepreneur, r/smallbusiness, r/startups, r/SaaS, r/EntrepreneurRideAlong,
r/business, r/consulting). r/antiwork and r/recruitinghell are deliberately absent: a Reddit
ad carries a public comment thread, and "software that reads whether your staff are job
hunting" gets taken apart in a room full of employees. The creative is the other half of
that defence — **every one of the six makes the manager the butt of the joke, never the
employee.**

### Meta: the card is declined, and that blocks ads specifically

Campaign `120251662610270233`, ad set `120251662616880233` and seven image creatives exist.
Ad creation returns `100/1359188 "Update payment method"`.

**Confirmed rather than assumed**, because an account-level billing block looks identical to
a bad payload: posting an ad with a *bogus* creative id returns subcode `1487015` (invalid
creative), and the same call with a *real* creative id returns `1359188`. Validation passes;
billing is the gate. `account_status` is 1 (ACTIVE) and a funding source is attached, so
nothing in the account's own fields shows the problem.

Three payload gotchas fixed on the way:

1. `promoted_object` takes `custom_conversion_id` **alone**. Sending `pixel_id` alongside it
   is rejected with `100/1885014 "invalid combination of parameters"`.
2. `age_max` is refused when Advantage Audience is on (`100/1870189`): age and interests are
   suggestions in that mode, so an upper cap is not allowed.
3. `standard_enhancements` is deprecated (`100/3858504`); features are set individually now.
   `text_optimizations` is opted out deliberately, because it lets Meta rewrite the copy and
   every line in this account has to trace to the approved bank.

**The optimisation event is the free-trial signup**, custom conversion `1386618896736601`,
which is Robby's standing rule from 2026-07-20. The card-on-file trial
(`1627513902231509`) is the money event and is what gets reported, but it has never fired
and a pixel created yesterday cannot optimise toward an event with zero history. **Bid on
the signup, report on the trial.**

### Google: no new campaign tonight, deliberately

Two reasons, both worth stating rather than quietly skipping:

1. **There is no TeamPredict YouTube channel.** Google Ads video inventory lives in Demand
   Gen and Demand Gen video ads need a YouTube video id, so six vertical clips cannot reach
   Google at all until a channel exists. Postiz carries YouTube channels for ESA Card, Robby
   Frank, 1Lookup and VoiceDrop, and none for TeamPredict.
2. **Google search has spent $298 for zero signups and nobody knows why.** That zero is
   confirmed real, independently, in Mixpanel. Pushing more of a fixed pool into an
   unexplained zero is the wrong trade while Reddit and Meta have never been tried.

What did happen: the two live search budgets were cut from $18/day and $5/day to $10/day and
$3/day. Actual spend is about $7.44/day across both, so the new caps are still well above
delivery and nothing is throttled; the change bounds the downside so Google cannot quietly
eat the shared pool.

## Spend

| Item | Cost |
|---|---|
| 6 renders, Seedance 2.5, 15s @ 720p | $41.60 |
| 6 upscales to 1080p | $0.65 |
| Transcription: 6 clips, plus 4 cross-check passes on v6 and 2 on v3 | ~$0.02 |
| Captions (word timings, 7 passes) | ~$0.02 |
| Re-rolls | **$0** — both defects repaired by trimming and by a caption join |
| **Total** | **~$42.29** |

Batch 8's banners were ~$7.40, so the whole TeamPredict launch creative is under $50.
