# Batch 10 — 2026-08-18 — TeamPredict: three 30s mockumentary skits

Robby: *"You can also try creating a few 30 second skit ads in the style of The Office
show."*

Assets: `teampredict/2026-08-18-office-skits/`. Prompts:
`_scripts/seedance-prompts-b10-teampredict-office.mjs`.

## Style as genre, never as imitation

No character from any real show, no show name in any prompt, no NBC anything. What gets
borrowed is the observational-workplace-mockumentary grammar: a documentary crew the
characters know about and mostly ignore, zoom punch-ins on reactions, confessional
talking-head interviews, and the held flat look into the lens as the punchline delivery
mechanism. The batch-1 rule again: a format gives the model a grammar to imitate.

The look-to-camera needed its own carve-out from the batch-9 COMEDY RULE (which bans
glancing at the lens because it breaks a sketch): in mockumentary the look IS the format,
but only the flat, weary, held version. The GLANCE block permits exactly that and still
bans mugging.

## The three

| | Concept | Shape | The turn |
|---|---|---|---|
| w1 | **The Farewell Party** | conference-room cold open | manager plans the goodbye before the resignation; "The cake is ordered. It's marble." |
| w2 | **The Exit Interview** | single continuous confessional | total pride develops exactly one crack: "Would that have been useful back in March? ...Sure." |
| w3 | **Gone Quiet** | bullpen scene, silent background payoff | the site's own h2 spoken as office folk wisdom; Marcus puts his jacket on mid-afternoon |

None of the three speaks the brand; the composited end card carries it. Word budgets
counted, not asserted: 41 / 41 / 41 against the 40-55 rule for 30 seconds.

## The judge panel earned its keep

Nine agents (3 scripts x 3 lenses), per the batch-5 rule. Two real blockers before a cent
was spent:

1. **w2's pivotal line had no speaker.** "Would that have been useful back in March?" sat
   directly after a stage direction about the unheard interviewer, so the most natural
   reading had the model VOICING the interviewer. Doug now repeats the question back half
   to himself.
2. **w3's garnish raced its payoff.** The Marcus jacket beat and Priya's mandatory glance
   shared the final 8 seconds, with the camera drifting toward Marcus and no instruction to
   come back, which made the script's own "trimmable garnish" claim structurally false. The
   camera now holds, Marcus stays small and out of focus, and the final focus explicitly
   belongs to Priya. **The re-staged version rendered the garnish AND the payoff.**

Plus six smaller catches, including w2 being the only ad missing the NO_SCREENS block, and
the header asserting word counts that had never been counted (claimed 43-50, actual 36).

## THE lesson of this batch: genre pulls in the genre's famous faces

**w2's first render cast a character who was unmistakably a real, recognisable actor.**
Not "similar": recognisable at a glance, in a role adjacent to the ones that made him
famous. That is a likeness we have no right to use, so the clip could not ship regardless
of quality, and it cost the batch's only re-roll ($13.87).

The mechanism is worth stating precisely: a mockumentary prompt with a loosely described
character ("an HR manager in his fifties") collapses onto the actors who defined the
format. The genre grammar that makes the format render well is the same gravity that pulls
in its cast. **Every character in a genre-parody prompt needs a concrete, deliberately
generic physiognomy plus an explicit no-real-person constraint.** The recast Doug
(heavy-set, around sixty, grey moustache, rimless glasses) came back fully generic.

And the check that caught it is the existing rule, applied to faces: look at every frame
at full size. A transcript cannot catch a face.

## QA

- All three word-perfect against script on transcription, first roll (w2's re-roll included).
- **Accepted variance:** w2 says "exit conversations" for "exit interviews", confirmed on
  three transcription passes. Arguably more in character for a self-satisfied HR manager;
  the captions burn what was actually said.
- Every burned-in caption word read off filmstrips of all three finished files: clean.
- Recorded caveats, same class batch 9 shipped with: w1 has a dark switched-off TV in the
  background; w3 has distant lit monitors verified unreadable by full-resolution crops.
  Nothing readable, no invented UI, no third-party marks anywhere.

## Deployed

| Where | What |
|---|---|
| Meta, HR & People ad set `120251755786840233` | 3 ads ACTIVE: `120251758563040233`, `120251758571640233`, `120251758580120233` (all HR-process jokes, so none to the founders set per the no-overlap rule) |
| YouTube `UCTgTZag9aozWRhh7sRreiBg` | [The Cake Is Ordered. It's Marble.](https://www.youtube.com/watch?v=6khoqaPf6fQ) · [Would That Have Been Useful Back In March?](https://www.youtube.com/watch?v=NemrfSicBC4) · [Nobody Is That Focused](https://www.youtube.com/watch?v=2DUuX3n8lA8), verified live via oEmbed |
| Reddit | deliberately not: $5/day with a delivery problem under test |

The AI-content disclosure on the three YouTube uploads still needs the per-video toggle in
YouTube Studio, same as the six batch-9 uploads (Postiz cannot set it).

## Spend

| Item | Cost |
|---|---|
| 3 renders, Seedance 2.5, 30s @ 720p | $41.60 |
| 1 re-roll (w2, real-actor likeness) | $13.87 |
| 4 upscales to 1080p | ~$0.88 |
| Transcription and caption timing passes | ~$0.04 |
| **Total** | **~$56.40** |
