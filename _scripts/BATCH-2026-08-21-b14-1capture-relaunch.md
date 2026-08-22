# Batch 14 — 1Capture, the brand's first paid creative

**Robby, 2026-08-21:** three videos and three static banners for the relaunched 1capture.io,
roughly $60-90 of generation. Founder-voice pain hook fully spoken and on screen by second 2,
a raw screen recording of the trial page and the card check, one defendable number right
before the CTA, end card "Start free. Free under $10K MRR. No card." No brand name spoken, no
logo before second 5.

Assets: `1capture/2026-08-21-b14-relaunch/`. Prompts: `_scripts/seedance-prompts-b14-1capture.mjs`
and `_scripts/banner-prompts-b14-1capture.mjs`. Run logs:
`_scripts/seedance-run-log-2026-08-21-b14-relaunch.json`, `_scripts/banner-run-log-2026-08-21-b14-relaunch.json`.

**Nothing here is live. No campaign was built and no ad budget was spent.** 1Capture is still
capped at $0 in the paid-acquisition playbook and the PPC relaunch plan's launch gate is
unfinished; this batch is creative only.

---

## What shipped

| id | concept | angle | the one number | landing page |
|---|---|---|---|---|
| b14v01 | Fourth Free Trial | serial trial abuse | 2-3x is typical (claim 6) | `/free-trial-abuse-prevention` |
| b14v02 | Ten Signups | the conversion math | VoiceDrop 12% to 57% (claim 5) | `/stripe-trial-conversion` |
| b14v03 | A Real Card | the card objection | 100+ SaaS teams (claim 7) | `/require-credit-card-for-free-trial` |
| b14c01 | Through The Door | the promise | none, offer only | `/free-trial-abuse-prevention` |
| b14c02 | 12% to 57% | the proof | VoiceDrop 12% to 57% (claim 5) | `/stripe-trial-conversion` |
| b14c03 | Verify A Real Card | the mechanic | none, offer only | `/require-credit-card-for-free-trial` |

Three videos, 15s, 9:16, 720p native then upscaled to 1080p, captioned, with a composited end
card. Three banners at three shapes each: square 1024x1024, landscape 1200x628, vertical
1080x1920. Each banner also exists clean in `nologo/` for Reddit, where a pasted wordmark
undoes the native-post illusion.

## Brand truth

Pulled from `1Capture-Marketing/tailwind.config.js` and confirmed against a browser render of
the live site on 2026-08-21, not from memory. **The old teal brand is retired**: `1capture.teal`
in the config is now `#635BFF`, the legacy utility name remapped onto the Stripe-style palette,
so nothing in this repo should ever emit teal for this brand again.

| role | hex |
|---|---|
| action / primary | `#635BFF` (hover `#5546FF`) |
| navy ink | `#0A2540` |
| body copy | `#425466` |
| success | `#0F9D76` |
| danger | `#DF1B41` |
| surface | `#FFFFFF` / `#F6F9FC` / `#F0F4F8` |
| hairline | `#E6EBF1` |

The wordmark is composited from the marketing repo's own SVG. It ships as a React component
(`public/logos/1c-white-logo.jsx`) whose body is a literal `<svg>`, so `_work/logo-from-jsx.py`
extracts it and renders two variants from that one file: white for dark grounds, and the same
paths in navy `#0A2540` for light ones. Nothing is generated or described in a prompt.

## The screen recording is real

`_work/capture-screen.mjs` records the live www.1capture.io in a real browser and
`_work/build-screencap.mjs` assembles it. Batch 8's rule: for a brand whose whole discipline is
honest claims, an invented product screen IS the banned claim, so the video prompts ban every
display surface and the capture goes on in post.

What the capture shows is the site's own sequence, unstaged: a real card clears ("Real card
verified. Trial started.", with the verified-trial toast), the next card runs its $0
authorization, and it is refused ("Same card, 4th trial. Blocked.", with the blocked counter
ticking 215 to 216). The emails on screen are the site's invented domains, which its own source
comments say are deliberately non-resolving; no customer data appears.

Three capture approaches were measured before one was chosen:

| approach | result |
|---|---|
| Playwright `recordVideo` | captures at CSS viewport size, so the card panel landed ~330px wide and too soft |
| `element.screenshot()` loop | crisp but 2.4 fps, a slideshow |
| CDP screencast, page zoom 1.43 | **931x787 at 9.5 fps, used** |

The screencast emits a frame per compositor paint, so its rate falls as the viewport grows:
652x551 at 19.8fps, 931x787 at 9.5fps, 1117x947 at 6.9fps, 1303x1102 at 5.2fps. 931px upscales
to the 1080 delivery frame by only 1.16x, and 9.5fps is fine for a dashboard whose state changes
every 1.7-2.1s. Page zoom rather than `deviceScaleFactor`, because CDP screencast caps output at
the CSS viewport size and `deviceScaleFactor: 2` still delivered 1400x1000 frames. Frame times
are recorded as wall clock and written into an ffmpeg concat list, so the insert plays at the
site's real speed rather than a nominal fps.

**The insert starts at exactly 5.0s in every clip.** The captured browser chrome reads
`app.1capture.io`, which is a brand mention, and the bank forbids any brand mention before
second 5. Starting there also puts the screen over the founder's face inside the 6-10s window
the research says a bare talking head has to break by.

## Claim safety

`AD-CREATIVE-PLAYBOOK.md` in the 1Capture-Marketing repo is the binding bank (APPROVED by Robby
2026-08-21). Per its own rule 7, every claim was re-verified against the **live** site on
2026-08-21 rather than trusted from the file: 20 of 21 probes resolved on the live site and all
eleven banned claims were absent.

**One drift found.** Bank claim 3's second sentence, "Trial abusers never get in", returns zero
hits anywhere in the marketing repo and is not on the live site. The live hero subheadline is
now "Only real customers get into your trial, so more of them become paying customers." That
wording is not spoken or burned anywhere in this batch, and the bank should be updated.

**One gap found, and it cost a concept.** b14c01 was originally "Same card. Fourth free trial."
/ "Blocked before the trial opened." Together those assert duplicate-card detection across
signups. 1Capture markets exactly that on the live site
(`/free-trial-abuse-prevention`: "Stop repeat signups, disposable emails, and virtual-card
abusers") but it is **not in the approved bank**, and the bank is binding, so the concept was
re-cut onto bank claim 1 instead. The video b14v01 still uses the abuse angle, because there the
fourth-trial story is the founder's own signup log (in-scene fiction, anchored with "I caught
it") and the only product claim it makes is bank claim 14. "opened" was also invented: the
site's verdict string is "blocked before the trial started".

Bank claim 5 (VoiceDrop 12% to 57%) is constrained: when the 57% figure is the headline claim,
the "2-3x improvement is the typical range" framing must be present. It is satisfied twice, both
times inside the artwork rather than depending on a landing page: b14c02 carries it as its
subheadline, and b14v02 lands on a proof end card that prints both lines.

## The judge panel paid for itself again

Fifteen agents before a cent was spent: three video scripts and three banner concepts, each
read by a hook lens, a claim-safety lens and a render-safety lens. **Five blockers and about
forty fixes, every one applied before rendering.** Against a batch that would have cost $20.79
to re-render in full, the panel cost nothing.

The five blockers:

1. **b14v02's hook could invert.** "Two of them ever paid" is one inserted nasal from "Two of
   them NEVER paid", and the negative is the more idiomatic sentence, so the model's own prior
   pushes it there. That flips the whole ad: the premise is that two of ten DID pay. Same class
   as batch 13's "searched it once" rendering as "searched at once". Re-cut to "Two paid", where
   nothing can flip.
2. **b14v02's number beat was unsayable and homophonic.** Eleven syllables in 2.8s on the one
   line the ad exists for, while the direction says she stops entirely; and "twelve TO
   fifty-seven" is an exact homophone of "twelve TWO fifty-seven".
3. **b14v01 told the actor to count.** "as he counts the thing off" sat inside a prompt whose own
   SPEECH RULE bans counting, next to a verbless three-fragment hook primed on the number four:
   the batch-9 setup that got a word list chanted aloud as dialogue.
4. **b14v03 claimed a 0/100 absolute.** "It killed the ones who'd never pay" asserts that none of
   the lost signups were buyers. The bank bans any 0/100 claim outright.
5. **b14v03's car shipped screens the rule never named.** NO_SCREENS enumerated indoor objects
   only, so a dashboard and an instrument cluster were never excluded from the one scene that
   ships them by default.

Two more findings worth recording because they change how prompts get written here:

- **b14v03 opened on a harm.** "They said a card would kill signups" is a proven myth-flip
  format, but the brief guarantees only the first line reaches a scroller, and what that
  guaranteed window delivered was a harm claim about our own mechanic. Ads sell, ads never
  disclaim. Re-cut to open on the mechanic, with the objection moved to line two, where it is
  allowed.
- **`{{COMPOSITION}}` was injecting an unassigned element.** `banner-generate.mjs` substitutes a
  per-shape default, and two of its three strings name a "visual element" that none of these
  concepts has. An unassigned area is one the model fills with an invented tagline. The token is
  gone from all three concepts, which now assign their own layout on every shape.

Swept across all six assets rather than fixed where found (three-times-in-one-batch made that a
process rule at batch 13): the spoken CTA dropped "MRR" in every clip (three unanchored letters
in the least reliable beat, against a closing rule demanding a slower delivery); every clip says
"card" out loud, so every SETTING now states that no payment card appears in frame, which the
old screen rule invited by contemplating a "card in shot"; every beat longer than its line now
says what fills the silence; and every hyphenated letter-string spelling instruction ("M-R-R",
"V-o-i-c-e-D-r-o-p") was rewritten, because the closing constraint says every word is spelled
exactly as written above and the hyphenated string IS written above.

## Defects found after rendering

Every clip was transcribed on **three independent engines** (ElevenLabs scribe-v2, Whisper,
Wizper) after every take, and no word was called a defect on one engine alone.

| asset | take | defect | how it was found | resolution |
|---|---|---|---|---|
| b14v01 | 1 | "signup" garbled: "startup" / "sarnup" / "sarnup" | three engines | added a per-syllable anchor for "signup", re-rolled |
| b14v01 | 2 | "signup" garbled again: "Sarnoff" / "Sarnalup" / "Sarnalup" | three engines | failed twice, so the word came out of the line: "Now every trial starts with a real card check." |
| b14v01 | 3 | none | three engines agree, word for word | **shipped** |
| b14v03 | 1 | "signup" garbled in the hook: "startup" / "startin' up" x2 | three engines | same anchor, plus a full stop splitting the hook |
| b14v03 | 2 | hook fixed, but the re-roll broke "SaaS" instead: "OS" / "SOES" x2 | three engines | the coin flip this repo has now recorded three times |
| b14v03 | 3 | none | three engines agree, word for word | **shipped** |
| b14v02 | 1 | none | three engines agree, word for word | **shipped**, never re-rolled |
| b14c03 | 1, 2 | hand-lettered "$10K" as "$IOK" (digit 1 as a serifed I, 0 as a letter O) | reading the render at full size | reproducible: identical on take 2 after the prompt dictated the strokes. **Reads correctly at feed size**, so it ships and is logged rather than rolled a third time |
| captions | - | emphasis list silently missed | the captions log's own "no emphasis list" line | `adIdFromPath()` did not strip the new `-screen` suffix; fixed in the shared script |
| b14c01/c02 landscape | - | composited wordmark landed on copy | looking at the finished 1200x628 files | the compositor now scores the box it actually draws, plate included, and falls back to the quietest edge |

**One drift was kept rather than fixed.** b14v03 take 3 spoke "A hundred plus SaaS teams trust
it" although that line had been cut back to "A hundred plus teams trust it": the clip still
carried the SaaS pronunciation block, which named a word no spoken line contained any more, and
the model read that as licence to say it. All three engines return "SaaS" correctly on that
take and the line with the word in it is bank claim 7's actual subject, so the drift is an
upgrade and the prompt was restored to match the delivered clip. The cross-check decides
whether a drift is a defect; taste decides whether it ships.

Two of those are worth generalising:

- **Cross-checking the proper noun rule now applies to ordinary words too.** "signup" is not a
  brand name, and it garbled in two of three clips. b14v02 said "signups" plural correctly in a
  slow beat, and b14v03 said "signups" correctly in its own second line, so the failure is the
  singular in a quick beat rather than the word. A per-syllable anchor is not just for compound
  brand names.
- **A lookup that degrades silently is worse than one that throws**, again. The captions pipeline
  logged "no emphasis list", burned every punchline word in plain white, and exited 0. This is
  the second batch to hit it with a new filename suffix.

## Pipeline additions

Written for this batch and reusable by any brand:

| file | what it does |
|---|---|
| `_work/logo-from-jsx.py` | extracts the real wordmark from the marketing repo's React component and renders white and dark-ink variants from that one source |
| `_work/capture-screen.mjs` | records the live site via CDP screencast with real frame timings |
| `_work/build-screencap.mjs` | crops and assembles the capture into a 1080-wide insert |
| `_work/compose-video.mjs` | composites the insert into each master over its declared window |
| `_work/make-endcard.py` | builds the end cards from the real logo, including the proof variant |
| `_work/finish-videos.mjs` | composite, end card, captions, in that order |
| `_work/composite-logo.py` | pastes the real wordmark onto the banners, measuring the frame first |
| `_work/merge-run-log.mjs` | rebuilds one run log after `--only` re-rolls overwrite it |

Changes to shared tooling, each because this batch broke something:

- `_scripts/naming-check.mjs` now has a `1capture` row (code `1C`), skips platforms with no
  account instead of failing on them, and **compares batch folder dates instead of matching one
  date with a regex.** The old gate read `^2026-08-19|^2026-09|...`, so a batch dated later in
  the same month was silently skipped: b14's own files were never checked until this was fixed.
- `_scripts/seedance-emphasis.mjs` gained the 1Capture brand colour (`#635BFF`, ASS
  `&H00FF5B63`), the three b14 emphasis lists, and `-screen` in `adIdFromPath()`.

## Cost

| item | qty | cost |
|---|---|---|
| video renders, 720p 15s 9:16 | 10 (round 1: 7 rolls over 3 clips; round 2: 3 clean first takes) | $69.30 |
| 1080p upscales | 10 | $1.10 |
| banner renders, GPT Image 2 high | 38 (round 1: 12; round 2: 23 squares + 3 contrast re-rolls) | $7.60 |
| transcription, 3 engines per take plus caption timings | ~35 passes | ~$0.45 |
| **total** | | **~$78.45** against a $60-90 budget |

The plan was to render once, QA hard, and spend the remainder only on defects QA actually found.
It found two, and both cost two extra rolls each because the first correction fixed the wrong
thing. **Four of the seven video renders were spent on one word.** The lesson is priced: an
anchor is worth trying once, and after a word fails twice the cheap move is to write the line
without it, which is what finally worked on b14v01 and cost $6.93 less than discovering it a
roll later would have.

## What to test first

1. **b14v02 is the strongest asset.** It carries the only proof number, it was word-perfect on
   take 1 on all three engines, and its end card satisfies the claim-5 constraint on its own.
2. **b14c03 (whiteboard) is the native/organic bet** and the only family in this repo with a win
   attached. It is also the right creative for Reddit; ship the `nologo/` copy there.
3. **b14c03-vertical is the weakest asset in the set and is the first to cut.** A landscape
   whiteboard in a 9:16 frame leaves large empty bands above and below the board.
4. Per the PPC plan, Meta runs a maximum of six ads at once at $30/day, which is exactly this
   batch. Put b14c01 and b14c02 in different ad sets so their CTR is separable.
5. Read nothing before ~5K impressions; kill hooks under 18% hook rate; 25%+ passes.

## Open items for Robby

1. **The claims bank has a gap.** The live site markets duplicate-signup detection ("Stop repeat
   signups, disposable emails, and virtual-card abusers", `/free-trial-abuse-prevention`) and the
   bank does not contain it. That cost b14c01 its original concept. Worth adding verbatim.
2. **Bank claim 3 is stale.** "Trial abusers never get in" is not on the live site and returns
   zero hits in the repo. The live line is "Only real customers get into your trial, so more of
   them become paying customers."
3. **"No card" on the end card is ambiguous on this brand,** and the string is brief-mandated so
   it was not changed. Every clip sells a card check on the buyer's own signups and then closes
   on "No card", which means no card to sign up for 1Capture. Two judges flagged it
   independently. The one-word repair is "No card to sign up." Your call.
4. **b14v01 points at `/free-trial-abuse-prevention`, which does not carry the 2-3x line** that
   the ad says out loud. Claim 6 is safe standalone so no lander support is required, but the
   message-match is imperfect: either add the line to that page or repoint the ad at
   `/stripe-trial-conversion`.

---

# Round 2, 2026-08-21: the script re-cut and the wide banner set

**Robby, on round 1:** *"The style is really good but the script is really bad. Needs to be more
clear: Free trial abuse / Fake **Credit** card on signups / Payments failed when the 7-day trial
was done / Users were abusing the free trial / Now I verify every user. Also we need really
solid, varied, best practice, disruptive, scroll stopping banners - lots of them."*

## What was wrong with round 1's scripts

They were clever instead of clear. Every one of them made the viewer assemble the story: "Same
card, fourth trial" implies duplicate signups without saying what happened; "My last ten
signups. Two paid." is arithmetic, not an event; "A real card. Every signup." is a mechanic with
no problem attached. The judge panel had graded them on hook strength, claim safety and render
safety, and they passed all three, because **none of those lenses asks whether a stranger who
has never heard of the product understands what happened.**

The fix was to say the actual sequence out loud, in order, in the founder's own words. All
three clips now tell it; they differ only in where they enter:

| clip | enters on | the sequence |
|---|---|---|
| b14v01 | the fake cards | "Fake credit cards. Every week." / "Seven days later, every payment failed." / "They were abusing the free trial. Now I verify every user." |
| b14v02 | the failed payment | "Trial ended. Payment failed." / "Over and over. Fake cards on my signups." / "Now every card gets verified before the free trial starts." |
| b14v03 | the fix | "I verify every user." / "Fake credit cards were killing my trials." / "Seven days later, every payment failed. That is abuse." |

The seven-day trial is the **character's own** product's trial, in-scene fiction, not a 1Capture
claim: 1Capture is free forever under $10K MRR with no card. "Free trial abuse", "virtual
credit cards" and "serial trial abusers" are all live site copy on `/free-trial-abuse-prevention`.
The number beat and the close are unchanged, so every defendable claim is still the same bank
claim it was.

**All three came back word-perfect on all three engines on the first take**, against seven rolls
for the same three clips in round 1. The difference is not luck: round 1's rolls were all spent
on "signup", a word round 2's scripts happen to use only once, in the plural, in a slow beat.

One process note, because it is the same mistake twice. The re-cut moved "signup" out of two
clips, and both still carried its pronunciation block. That is exactly the contradiction that
made round 1's v03 speak a word that had been cut from its script. It was caught by an assertion
before rendering this time rather than after: each clip is now checked to confirm every
pronunciation block it carries names a word its beats actually contain.

## The wide banner set

`_scripts/banner-prompts-b14b-1capture.mjs`: twenty-three more concepts, built the way the
2026-08-03 VoiceDrop "go wild" run was, which is the only method in this repo with a recorded
win. **Hold the copy fixed, make visual style the only variable.** Eight approved copy pairs
across twenty-three visual territories, so when one wins you know it was the treatment.

Twelve loud direct-response: hazard tape, brutalist inversion, ransom note, mega-numeral, offer
poster, Ben-Day pop, blueprint, split-screen, sticker bomb, VHS glitch, liquid chrome, foil
letterpress. Eleven native/organic: whiteboard, legal pad, sticky notes, napkin, torn cardboard,
corkboard, chalkboard, squared notebook, till receipt, kraft envelope, single sticky note.
Nothing in the polished-corporate middle, which has never once been picked from this repo.

The set is built from a template function taking the copy as its one variable, so the discipline
is structural rather than remembered, and the prompt file is 23 concepts in roughly the space
3 used to take.

**Three failed review and were re-rolled**, all for the same reason: a treatment applied to the
headline that cost it legibility at feed size. The blueprint set its headline in thin white
outline with no fill; the letterpress blind-debossed it in the paper's own colour; the receipt
sat small in the frame. In each case the treatment stayed and moved off the headline. That is a
rule worth keeping: **on a scroll-stopping brief, any styling that touches the headline has to
survive a thumbnail, and outline, deboss and small-in-frame are the three that do not.**

## The logo compositor now measures type, not variance

Placing a wordmark on twenty-six frames surfaced that the placement test was measuring the wrong
thing. It scored standard deviation over the candidate area, which:

- reads a flat violet field **between two lines of white type** as quiet, so the mark landed on
  a letter on four frames; and
- reads a hazard-stripe band as busy, even though a plate over decoration is fine.

It now scores **edge density**, the percentage of pixels in the box sitting on a hard edge, which
is what actually distinguishes lettering from a flat field or a soft photo background. Two more
fixes came with it: the fallback only moves the mark if the alternative is genuinely cleaner
(it was previously capable of moving it somewhere worse), and if nowhere is clean at full size
the mark **shrinks** to 72% and then 52% and looks again, because a small legible wordmark beats
a large one sitting on a word.
