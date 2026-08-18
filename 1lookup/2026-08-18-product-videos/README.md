# 1Lookup — batch 12, ten product-specific video ads (2026-08-18)

Robby's brief: *"please create more videos (UGC, viral, funny/parody, hooks, etc...) - make
sure they are all hyper engaging and focus on a specific product."*

Ten 9:16 clips at 720p, nine at 15 seconds and one 30-second mockumentary. **Every clip is
built on ONE named product from the 1Lookup catalogue**, never the generic platform pitch,
which is the part of the brief the previous eleven batches never did for this brand.

Prompts: [`_scripts/seedance-prompts-b12-1lookup-products.mjs`](../../_scripts/seedance-prompts-b12-1lookup-products.mjs).
Deployment across the five channels: [`_scripts/DEPLOY-2026-08-18-1lookup-video-everywhere.md`](../../_scripts/DEPLOY-2026-08-18-1lookup-video-everywhere.md).

## The ten

⭐ = zero defects found in QA. Every clip was watched frame by frame AND transcribed.

| | Product | Concept | Format | Ship file |
|---|---|---|---|---|
| c8 | Phone Validation | **Dead Numbers** — "Still paying reps to dial dead numbers?" | UGC selfie | `1lookup-c8-dead-list-1080p-trimmed-captioned.mp4` |
| c9 ⭐ | Phone Scrub (DNC) | **The First Call** — the rookie's ten-minute call was a litigator | sketch | `1lookup-c9-first-call-1080p-captioned.mp4` |
| c10 | Skip Trace | **The Ghost Owner** — wholesaler outside a vacant house | UGC selfie | `1lookup-c10-ghost-owner-1080p-trimmed-captioned.mp4` |
| c11 ⭐ | Reverse Phone Lookup | **The Front Desk Knows** — the receptionist already ran the number | sketch | `1lookup-c11-front-desk-1080p-captioned.mp4` |
| c12 | Phone Spam Check | **Flagged** — 800 dials, 4 pickups, every number flagged | UGC selfie | `1lookup-c12-flagged-1080p-trimmed-captioned.mp4` |
| c13 ⭐ | Carrier Lookup (line type) | **Four Thousand Landlines** — the SMS blast that hit landlines | sketch | `1lookup-c13-landlines-1080p-captioned.mp4` |
| c14 | Fraud Detection | **Best Month Ever** — 500 signups, all of them one man | 30s mockumentary | `1lookup-c14-best-month-1080p-fixed-captioned.mp4` |
| c15 ⭐ | Email Validation | **The List Sommelier** — a bought list, tasted like wine | format parody | `1lookup-c15-list-sommelier-1080p-captioned.mp4` |
| c16 | Mobile Finder | **The Rolodex** — "My boss thinks I know everyone" | UGC selfie | `1lookup-c16-magic-rolodex-1080p-fixed-captioned.mp4` |
| c17 ⭐ | Business Verify | **Established 1987** — the vendor whose domain was registered Tuesday | sketch | `1lookup-c17-established-1987-1080p-captioned.mp4` |

Every ship file carries one-word centre captions and a 2.2s branded end card (real
phone-and-fingerprint mark, "Start For Free", `1lookup.io`). Each clip also keeps its clean
uncaptioned 1080p and its 720p Seedance master; superseded takes are in `_rolls/`.

## Claim safety

**The claim bank was re-verified against the live site this batch, and it had drifted:** the
hero now reads **41 data products**, not the 34 recorded in
`1Lookup-Marketing/AD-CREATIVE-PLAYBOOK.md`. Anything written from that file's copy bank is
stale. (The playbook's own rule, from the 2026-08-03 batch, is to read the components rather
than trust the bank; it paid out again.)

Spoken product claims are limited to lines that literally appear on the site: "Stop paying
for bad data", validation in under a third of a second, the 7-day free trial, and each
product page's own mechanic (DNC list check, phones-and-addresses-by-name, caller identity
and risk, daily spam scores, line type, a 0-100 fraud score, disposable-domain detection,
profile-URL-to-mobile-number). **No accuracy percentage anywhere**, per this brand's
deliberate discipline. Numbers characters say about their own list or their own day are
in-scene fiction, never a product statistic.

**One script was factually wrong and the judge panel caught it before rendering.** c16
originally said "I type a name. I get a direct mobile number." The Mobile Finder page states
outright that it does **not** take a name; it takes a profile URL or a work email. The line
became "I paste their profile link." That is a claim the product could not support, caught
for free.

## Judged before rendering, again

Three lenses (hook, claim safety, render safety) over the ten scripts before a cent was
spent. It returned six blockers, all fixed in the prompts:

1. **c9's hook was 11 words inside 2 seconds**, physically unsayable, and its payoff sat in
   the final four seconds where this model is least reliable. Re-beaten to land at 10-12s
   with a silent, trimmable tail.
2. **c15's sommelier was a portrait of a famous imperious film editor** (silver bob, dark
   high collar, small dark-framed glasses, removing them for the verdict). fal now rejects
   OUTPUT that resembles a known property and keeps the money, so this was a live cost risk,
   not just a QA one. Recast completely.
3. **c14 and c13 each repeated a long word across two speakers** ("five hundred", "thousand"),
   the known second-instance drift case. Both rewritten.
4. **c16's mechanic was factually wrong** (above).
5. **Text-prone props** were individually neutralised: a wall calendar, an exit sign, a
   branded coffee cup, a mailbox, party bunting, a "branded-looking" polo.
6. **c15's tail stacked three events across two speakers.** Unstacked.

## QA, and every defect it caught

Nothing here was visible in the frames; **transcription caught all four audio defects, and
looking at the frames caught the one visual one.**

| Clip | Defect | Resolution |
|---|---|---|
| c8 | Brand spoken as **"One Lookout"** (confirmed on ElevenLabs + Whisper) | Trimmed at 11.5s in the speech gap. End card carries the brand. **$0** |
| c10 | Brand spoken as **"1Lookit" / "One look it"** (confirmed on two engines) | Trimmed at 12.1s, after the full mechanic line. **$0** |
| c12 | Brand spoken as **"One look"** (confirmed on two engines) | Trimmed at 12.6s. **$0** |
| c16 | Brand spoken as **"One leads"**, and a third-person cutaway broke the selfie premise | Muted 11.3-13.1s; re-roll attempted and rejected (below). **$0** for the audio |
| c9 | No audio defect. The rendered rookie was a **recognisable real actor's likeness** | Recast in the prompt (curly black hair, glasses); re-roll came back fully generic |
| c13 | "landlines" spoken as **"line lines"** (confirmed on two engines), mid-clip so untrimmable, plus a lit screen edge | Re-rolled with a per-syllable anchor on "landlines". Clean |
| c14 | "signup" spoken as **"Sarnly"/"certainly"**, mid-clip | Re-roll came back worse (below). Roll 1 kept, garbled word muted 15.63-16.09s, verified at **-91 dB** true silence |

**Two re-rolls came back worse than the take they replaced**, which is the playbook's
warning about re-rolls landing for real, twice in one batch:

- **c14 roll 2** garbled the same word AND the brand name ("every Starling... from One
  Look"), where roll 1 had said "One Lookup" correctly. Roll 1 restored and repaired with a
  mute instead.
- **c16 roll 2** fixed nothing: the brand still garbled ("One loose set"), the third-person
  cutaway persisted, and the framing degraded into a low webcam-under-chin look. Roll 1
  restored.

Both superseded takes are kept in `_rolls/` rather than deleted, so the comparison is
checkable. Every seed, including the discarded rolls, is in
[`_scripts/seedance-run-log-2026-08-18-product-videos.json`](../../_scripts/seedance-run-log-2026-08-18-product-videos.json).

**One small operational lesson from that:** the re-rolls were fired before the shipping take's
720p master had been backed up, so **c16's roll-1 720p master was overwritten by a re-roll
that was then discarded**. The deliverable is unaffected, but re-deriving that clip now needs
a fresh render from seed 505659186. Back up every artifact of a take before re-rolling it,
not just the upscale.

**The burned-in captions were read off the finished files, not inferred from the transcript**
(the batch-9 rule, which exists because a clip once captioned "TEAM PROTECT" over audio that
said "Team Predict"). c14 is the only clip with the brand as a caption and it burned
**1LOOKUP** correctly in brand cyan; the muted word produced no caption at all, so no
fabricated word reached the screen.

**Faces were checked at full size on every clip.** No likeness survived into the ship set.
c14's mockumentary set and cast were deliberately styled away from the canonical office
documentary (bright plant-filled startup office, Black woman manager in her thirties,
copper-bob analyst) and it rendered clean.

## Brand pronunciation: the anchor is not holding for this name

Five of the ten clips were written to speak "1Lookup" with the per-syllable anchor that
worked perfectly for TeamPredict in batches 9-11. **Four of the five garbled it anyway**:
"One Lookout", "1Lookit", "One look", "One leads". Only c14 said it correctly.

Batch 2 got all four right with the same technique, so this is a regression, not a new
finding, and the numeral-led name is the likely cause: "1" invites the model to re-parse the
whole word. **Recommendation for the next 1Lookup batch: stop speaking the brand name
entirely and let the composited end card carry it**, which is already what batches 9-11 did
for two of six TeamPredict clips and what all ten of these ended up doing in practice. The
trims cost nothing because the payoff was always written before the brand line.

## Spend

Computed from fal's pricing model (`tokens = w*h*duration*24/1024` at $0.0214/1000, upscale
$0.0072/s), not from a billing statement.

| Item | Cost |
|---|---|
| 10 clips (9x15s + 1x30s), 720p | $76.27 |
| 10 upscales to 1080p | $1.19 |
| 4 re-rolls (c9, c13, c16 at 15s; c14 at 30s) + upscales | $35.20 |
| Transcription (QA + caption timings, ~35 passes) | ~$0.20 |
| **Total** | **~$112.90** |

Two of the four re-rolls (~$21) bought nothing and were discarded. Generating at 720p rather
than 480p-plus-upscale follows Robby's own read that the cheap batch "look[ed] very low
quality".

## Re-render

```bash
node _scripts/seedance-generate.mjs \
  --prompts seedance-prompts-b12-1lookup-products.mjs \
  --batch 2026-08-18-product-videos --resolution 720p
# single clip: --only 1lookup-c11-front-desk
```
