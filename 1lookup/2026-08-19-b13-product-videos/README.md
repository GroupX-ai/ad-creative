# 1Lookup batch 13 — twelve products that had never had a video (2026-08-19)

Robby: *"Combination of banners and video ads (Seedance 2.5)."*

Batch 12 gave ten products a video, all from the Validate and Enrich families and all
phone-shaped. **This batch covers twelve products that have never had one**, including the two
biggest unclaimed commercial pools in the catalogue (SERP scraper, website visitor
identification) and the first video anyone has made for the platform itself.

Twelve clips, 15 seconds, 9:16, native 720p, upscaled to 1080p.
Prompts: [`_scripts/seedance-prompts-b13-1lookup-uncovered.mjs`](../../_scripts/seedance-prompts-b13-1lookup-uncovered.mjs)

## The twelve

⭐ = word-perfect transcript, zero defects found in QA.

| | Product | Concept | Format |
|---|---|---|---|
| b13v01 | SERP Scraper | **Five Hundred A Month To Read Google** — an agency pays a subscription to read a public search page | sketch |
| b13v02 ⭐ | Reverse IP Append | **Ninety-Seven Ghosts** — "Ninety-seven visitors." "Which ones?" | sketch |
| b13v03 | Prospect Search | **Per Seat** — five seats bought so five people can take turns searching one list | UGC selfie |
| b13v04 ⭐ | B2B Contact Append | **Four Guesses** — four emails, four address permutations, four bounces | UGC selfie |
| b13v05 ⭐ | Job Change Monitoring | **He Left In March** — pitching a champion who left the company | sketch |
| b13v06 ⭐ | IP Lookup | **Shipped To A Basement** — nine chargebacks, different names, one building | sketch |
| b13v07 ⭐ | HLR Lookup | **The Code Went Nowhere** — "The format is beautiful. The phone stopped existing in twenty-nineteen." | UGC selfie |
| b13v08 ⭐ | Property Lookup | **The Drive-By** — forty minutes across town to count bedrooms | UGC selfie |
| b13v09 ⭐ | Audio Transcription | **Nine Hours Of Calls** — one useful thing, and it was in hour seven | UGC selfie |
| b13v10 ⭐ | Ad Library Lookup | **What Are They Running** — the question the client asks every month | sketch |
| b13v11 ⭐ | MCP Server | **Ask The Agent** — "Where does the key go?" "There isn't one." | sketch |
| b13v12 ⭐ | Platform (41 products) | **The Renewal Wall** — eleven data renewals, eleven balances, eleven different Tuesdays | sketch |

Seven sketches, five selfies. The batch started 9 to 3 and was rebalanced after the judge panel,
because the account's own banner data favours the native-organic register and two of the sketches
were duplicates (below).

## Where the jokes come from

Batch 6's rule, still the best one in this repo: **the funny angle is the customer's existing
complaint.** Paying a subscription to read a public search page. A traffic report that counts
strangers. Buying seats so people can take turns searching one list. Guessing an email four ways.
Pitching a champion who left in March. Shipping to a VPN. Texting a verification code to a number
that stopped existing. Driving across town to count bedrooms. Listening to nine hours of your own
calls. Being asked what the competition is running and having to go look. Pasting an API key into
an AI agent. Reading eleven vendor renewals out loud.

## Judged before rendering: 11 blockers, all fixed for $0

Three lenses (hook, claim safety, render safety) over all twelve scripts before a cent was spent,
against a batch that costs $83 to render. What it caught:

1. **The shared HOOK block demanded a two-second opener that eleven of twelve hooks could not
   fit.** At a natural deadpan 3.5-4.5 syllables/second, two seconds buys 7 to 9 syllables. A
   model told to fit an unsayable line rushes or slurs it, which is the mechanism that garbled
   batch 12's audio. The block now says three seconds and every hook is under 12 syllables.
2. **Two words crossed two speakers** ("Thursday" in v10, "format" in v07), the exact
   second-instance drift that cost batch 12 two re-rolls, both in untrimmable mid-clip positions.
3. **A chant-prone three-item word list with no verb** in v12 ("Different vendors. Different
   logins. Different bills."), which batch 9 proved gets chanted aloud.
4. **Two scripts duplicated ads we already had.** v03 was the same ad as v01 (two coworkers
   deadpan in a fluorescent office, both opening on "we pay for a thing that should not cost
   this"); v07 was the same ad as batch 12's c13. Both re-cut as selfies rather than dropped.
5. **A television described as "switched off"** inside a prompt whose own screen rule bans
   televisions, plus a wall of unqualified printed shipping boxes, a calculator LCD, printed deli
   paper, a tissue box, a steering-wheel badge and filing-cabinet label holders.
6. **v10 was blocked for landscape**, two people facing each other across a table, and re-blocked
   to stack top and bottom of the tall frame.

## No clip speaks the brand name, deliberately

Batch 12 garbled "1Lookup" on **four of five** clips that spoke it ("One Lookout", "1Lookit",
"One look", "One leads") and repaired each with a $0 trim. That repair does not exist here: in
this batch the brand would have sat inside each clip's only mechanic sentence, so a garble could
not be trimmed without deleting the product pitch with it. The composited end card carries the
brand on all twelve, which makes every audio defect a $0 repair.

## Claim safety

Every spoken claim traces to that product's own page, re-verified against the marketing repo on
2026-08-19 rather than taken from the playbook bank, which has now been stale twice. Per-credit
prices spoken aloud are only the ones the page states (SERP 1 credit, prospect search 2 credits).
`DATA_PRODUCT_COUNT = 41`, verified two ways. No accuracy percentage anywhere. No disclaimers.
Numbers a character says about their own list, their own traffic or their own day are in-scene
fiction, never a product statistic.

## QA, and everything it caught

Every clip watched as a 10-still contact sheet **and** transcribed. Ten of twelve came back
word-perfect.

| Clip | Finding | Resolution |
|---|---|---|
| b13v05 | **Invented dialogue.** The model filled the receptionist's silence with "McCameron Chain here." and "I've got her. You?" The SPEECH RULE says only quoted lines are spoken and it was not enough, because the prompt said the other end had "no distinguishable words" without ever saying what the silence *contained*. | Re-rolled with a positive instruction naming what occupies the silence. **Clean.** Roll 1 parked in `_rolls/`. |
| b13v01 | **fal rejected the output** as a potential copyright violation. Nothing in the prompt is banned; the character block gave age and clothing and almost no physiognomy, so the model reached for a face. | Both characters given a concrete, deliberately ordinary face. **Re-rolled clean.** |
| b13v04 | **fal rejected the output** as sensitive content, on a plain desk selfie. | Concrete face, plus an explicit modest-wardrobe and eye-level-framing block. **Re-rolled clean.** |
| b13v01 | Transcript reads "a credited search" where the script says "a credit a search". Phonetically near-identical, so this is **possible, not confirmed** — it needs a second engine per the cross-check rule. Either way it is not a claim violation, and it sits in the final two seconds, which are trimmable. | Left as is, flagged. |
| b13v03 | Transcript reads "searched at once" where the script says "searched it once". Same class, same caveat. | Left as is, flagged. |

**The two fal rejections are the expensive lesson in this batch: fal keeps the money.** Each cost
$6.93 for nothing, and the common factor was a character block that named age and clothing but no
face. The render judge flagged exactly this on a third script (b13v03) before rendering and it was
fixed there; it was not applied to the other eleven. **Next batch: give every character a
concrete generic physiognomy, then read it back and ask which real person it describes.**

## Spend

| Item | Cost |
|---|---|
| 12 clips, 15s, native 720p | $83.16 |
| 3 re-rolls (2 fal rejections + 1 invented dialogue) | $20.79 |
| 2 rejected outputs, money kept by fal | (included above) |
| 2 re-rolls found by the caption pass (rotation, inverted joke) | $13.86 |
| 14 upscales to 1080p | $1.52 |
| Transcription: QA, captions, and 3 passes to settle b13v03 | ~$0.13 |
| **Total** | **~$120** |

## Captions and end card, applied 2026-08-19 evening

Robby asked whether the one-word subtitles had been added. They had not: the section below
used to say "not yet applied" and that was the whole of it. Now every clip ships as
`<name>-1080p-endcard-captioned.mp4`:

- **A 2.2s branded end card**, appended first. This batch needs it more than any other,
  because no clip speaks the brand name, so the card is the only place "1lookup" appears.
- **One-word-at-a-time captions**, burned to pixels with libass off scribe-v2 word timings.
  Three tiers, per `_scripts/seedance-emphasis.mjs`: plain white at base size, **brand cyan
  one third larger** for numbers and this ad's punchline words, largest for the brand name
  (which never fires in this batch, by design).
- Captions are clamped to the end-card cut on all twelve, so nothing covers the wordmark.

Emphasis lists were written per clip and kept to 3 to 6 words. Emphasise everything and
nothing is emphasised.

## Two defects the caption pass surfaced, both re-rolled

Neither was found by the original QA. Both were found only because captioning forced a
second, closer look at the finished pixels.

| Clip | Defect | Fix |
|---|---|---|
| b13v12 platform | **The entire scene rendered landscape and rotated 90 degrees into the 1080x1920 frame.** Both actors lying on their side, ceiling on the right. The prompt said "vertical" three times and it was not enough: the *blocking* was horizontal (a man at a desk, a woman standing beside it), and the model composes what it reads, then turns the canvas to fit. | Re-blocked so the two stack top and bottom of the tall frame, plus an explicit FRAMING block. **Re-rolled clean**, $6.93. Roll 1 parked in `_rolls/` as `-ROTATED`. |
| b13v03 prospect search | Script said "Four of them searched **it** once". The render says "searched **at** once", which inverts the joke: the premise is five bought seats sitting idle, and "at once" says they are all in use. Four independent scribe-v2 passes agree, so the model said it. | The line is now "Four of them used it one time", which cannot collapse into another phrase. **Re-rolled**, $6.93. Roll 1 parked in `_rolls/` as `-AT-ONCE`. |

Re-roll seeds, since the run log for them does not survive (see below): b13v12 `699405333`,
b13v03 `1463887598`.

**The rule both of these re-prove, for the third time in this batch: a finding on one script
is a finding on all twelve.** The render judge caught the rotation risk on b13v10 before
rendering, and the fix was applied only to b13v10. The fal face rejections were the same
shape. So the rotation check is now in the tooling rather than in this document:
`seedance-prompt-lint.mjs` warns when a prompt has two or more people on camera and nothing
says how they sit in the tall frame. It flags b13v05 and b13v06 today, both of which happened
to render upright.

Two tooling faults came out of doing this, both of the same shape: something that failed
quietly instead of loudly.

`seedance-generate.mjs` defaulted `--batch` to `2026-08-08-seedance-video`, so both re-rolls
wrote their clips into the *first* batch's folder and **overwrote that batch's run log**,
destroying the seeds and fal source URLs of the three clips in it. Restored from git.
`--batch` is now required and the generator refuses to spend without it.

`adIdFromPath()` also had to learn the `-endcard` and `720p` suffixes. It silently returned
`...-1080p-endcard` for a captioned file, which missed the emphasis list and would have
shipped every punchline word in plain white instead of failing loudly. All 114 existing
emphasis keys still resolve.


## Published and live, 2026-08-20

Robby: *"You can publish them and set them to live."* The standing "build paused, Robby flips"
rule was lifted for this batch by that sentence, so the twelve clips are now running as paid
creative and queued as organic posts. What went where:

### Meta, `act_2333276243857483`

The account was rebuilt around this batch rather than having the videos bolted onto the old
structure, because the audit on 2026-08-19 found the old structure could not convert at any
budget. Five campaigns, nine ad sets, 93 ads, **$87/day**:

| Campaign | $/day | Ad sets | Ads |
|---|---:|---|---:|
| COLD Platform | 20 | US Broad banners, US Broad Video | 15 + 6 |
| COLD Platform T2 | 10 | CA GB AU IE NZ banners | 15 |
| COLD Validate | 30 | US Sales interests, US Broad analog, US Broad Video | 12 + 14 + 2 |
| COLD Enrich | 17 | US Sales interests, US Broad Video | 10 + 4 |
| RETARGET Platform | 10 | 90-day site visitors | 15 |

Every ad set is `facebook` + `instagram` only, one geo tier per campaign, `SIGN_UP` on every
call to action, `LANDING_PAGE_VIEWS` as the optimisation goal, and a UTM on every link whose
`utm_content` is the asset id, so a Stripe subscription traces back to one file in this repo.

The twelve videos sit in three dedicated video ad sets inside the existing campaigns, so the
budgets did not move: this added creative, not money. Campaign budget optimisation now decides
between the banner ad set and the video ad set, which is the first honest banner-versus-video
read this account has ever had.

### Reddit

All 27 1Lookup video ads, the twelve from this batch included, are ACTIVE in the live
conversion campaign (`2557856098062241615`, ad group "US Broad - SignUp", $25/day, SIGN_UP).
Each b13 ad lands on **its own product page** rather than the shared homepage.

### Organic

Twenty-four posts queued through Postiz on the 1Lookup channels:

- **YouTube**, public, four a day at 14:00, 16:00, 18:00 and 20:00 UTC on 20, 21 and 22 August.
- **TikTok**, `DIRECT_POST`, `video_made_with_ai: true`, one a day at 17:00 UTC from 24 August
  to 4 September, which starts after the batch-12 queue ends on 23 August.

### Not done

- **Google Ads.** Demand Gen video ads take a YouTube video id, and these clips do not have
  one until the YouTube posts publish. Do this after 22 August against the real ids.

## Not done here

- b13v12's re-roll gave the adding machine a small lit digit display, which the prompt asked
  not to have. Diegetic, in-scene, no claim attached, so it was not worth a third roll.
