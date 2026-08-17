# teampredict — 2026-08-13-paid-launch

Launch creative for TeamPredict across **Meta, Google and Reddit**: 20 banner concepts
plus 10 video scripts awaiting approval.

Robby's brief: *"~20 disruptive, interesting, scroll stopping banners... Make these super
viral and engaging while elegant and minimalistic. Leverage colors, visuals."* Plus *"~10
video ads around 15 seconds each... send me some scripts, I'll approve or revise."*

- Banners with the real logo: [`banners/`](banners/)
- Clean, no-logo versions: [`banners-nologo/`](banners-nologo/) — the better choice on
  Reddit, where the post is already branded with the author handle
- Video scripts: [`VIDEO-SCRIPTS.md`](VIDEO-SCRIPTS.md) — **nothing rendered yet**
- Prompts and tooling: [`_work/`](_work/)

Brand kit, approved claims and guardrails: `AD-CREATIVE-PLAYBOOK.md` in
`TeamPredict-Marketing` (its copy bank was re-verified and expanded as part of this batch).

## How "elegant and minimalistic" was reconciled with "disruptive"

The repo's own evidence says Robby's picks land in two families, loud direct-response and
native/organic, and never in the polished-corporate middle. Minimal is not that middle:
the middle is the stock SaaS gradient with a laptop mockup and a row of feature chips.

So minimal here means **one flat saturated colour field, one idea, enormous type, nothing
else** — restrained and loud at the same time. Sixteen of the twenty are that. The other
four are the native/organic family (a real-looking photograph of a whiteboard, a sticky
note, an office notice, a napkin), which is the only family in this repo with a win
attached: Robby called the VoiceDrop whiteboard "best by far."

Colour does the disrupting, since the brand owns an unusually strong palette for this:
indigo `#4B56FF`, near-black `#0D0120`, and a risk traffic-light of green `#22C55E`, amber
`#FFB340` and red `#EF4444`. Full-bleed amber and full-bleed red are used as alarm states,
which is a register no HR-tech competitor is in.

## The 20 concepts

Square 1024x1024 throughout; the strongest eight also render landscape 1200x624 (Meta link
ads, Google responsive display) and four render vertical 1080x1920 (Stories, Reels, Reddit
mobile).

### Family A — bold minimal typographic (16)

| ID | Headline | Ground | Shapes |
|---|---|---|---|
| `t1` keep-scrolling | NOT WORRIED ABOUT YOUR EMPLOYEES QUITTING? KEEP SCROLLING. | near-black | sq, ls, vt |
| `t2` resignation-letter | DON'T WAIT FOR THE RESIGNATION LETTER. | white | sq, ls |
| `t3` already-on-linkedin | YOUR NEXT RESIGNATION IS ALREADY ON LINKEDIN. | indigo | sq, ls |
| `t4` which-one | WHICH ONE IS ALREADY LOOKING? | pale indigo | sq, ls, vt |
| `t5` open-to-work | THEY TURNED ON OPEN TO WORK. WHEN DO YOU FIND OUT? | amber | sq |
| `t6` go-quiet | PEOPLE GO QUIET BEFORE THEY RESIGN. | white | sq, ls |
| `t7` obvious-in-hindsight | EVERY RESIGNATION IS OBVIOUS IN HINDSIGHT. | near-black | sq |
| `t8` two-weeks-notice | TWO WEEKS' NOTICE IS NOT AN EARLY WARNING SYSTEM. | white | sq, vt |
| `t9` five-dollars | $5 (cropped mega-numeral) | white | sq, ls |
| `t10` hundred-thirty-free | 100 EMPLOYEES. 30 DAYS. FREE. | indigo | sq, ls |
| `t11` surveys | SURVEYS TELL YOU HOW THE TEAM FEELS. NOT WHO IS LEAVING. | split | sq, ls |
| `t12` no-surveys-five-minutes | NO SURVEYS. NO HRIS. FIVE MINUTES. | pale indigo | sq |
| `t13` competitor-radar | POINT THE SAME RADAR AT YOUR COMPETITORS. | near-black | sq, ls |
| `t14` their-best-people | THEIR BEST PEOPLE SEND THE SAME SIGNALS. | pale indigo | sq |
| `t15` time-capsule | EVERY EDIT. EVERY SKILL. EVERY HEADLINE PIVOT. | white | sq |
| `t16` panic-hiring | PANIC HIRING STARTS THE DAY THEY QUIT. IT DOESN'T HAVE TO. | red | sq |

`t1` is Robby's own example line. `t2`, `t6` and `t13` are verbatim site headlines.

### Family B — native / organic (4)

| ID | What it is | Handwritten copy |
|---|---|---|
| `t17` sticky-note | yellow sticky note on a laptop bezel | "check linkedin before 1:1s" |
| `t18` whiteboard | scuffed office whiteboard, phone-shot | "who is leaving next quarter?" / "we always find out last" |
| `t19` office-notice | printed A4 taped crooked to a wall, biro reply | "REMINDER: THE EXIT INTERVIEW IS NOT AN EARLY WARNING SYSTEM" / "we know" |
| `t20` napkin | cafe napkin shot from above | "everyone said they were fine in the survey" / "then they quit" |

## Three angles here that have never been advertised

The homepage grew three whole sections since the July playbook was written, and none of
them has appeared in a TeamPredict ad:

1. **Competitor tracking** (`t13`, `t14`) — reaches a different buyer entirely (founders
   and recruiters, not HR) with the same product.
2. **Slack team health** (`t6`) — "People Go Quiet Before They Resign." is the best
   headline on the site and it is brand new.
3. **LinkedIn page engagement** — not used in this batch, held back so the set does not
   sprawl. Available for the next one.

## Claim safety

Every line traces to live site copy, re-verified against
`TeamPredict-Marketing/src/app/(en)/page.tsx` on 2026-08-13. Deliberately absent from all
twenty:

- **No accuracy percentage.** None is published, and the site calls the score "a
  prioritization signal, not a verdict."
- **No lead-time window.** "2-4 weeks" is not site copy. The site says "often weeks
  before", and `t7`'s subline uses the site's own "weeks of lead time".
- **No "no credit card required."** A card IS taken at signup. Every offer frame uses the
  site's true microcopy, "No charge today · Cancel anytime". The `2026-07-01-banners` v2
  set carries the false line and must not be reused.
- **No product screens, risk scores, employee names or leaderboards.** The model invents
  them, and an invented risk score is precisely the claim this brand does not make. The
  three concepts with a data visual (`t6` bars, `t7` line, `t15` timeline) specify
  no axes, no numbers and no labels.
- **No LinkedIn or Slack logo.** Naming them in text is on-brand and factual; the marks are
  third-party and forbidden.

## The logo is real, not described

Every prompt forbids brand marks outright and the real mark is composited afterwards by
[`_work/composite-logo.py`](_work/composite-logo.py) from
`TeamPredict-Marketing/public/logo.svg` (cairosvg to PNG, Pillow to place), with the
wordmark set in Plus Jakarta Sans ExtraBold, the site's own heading font.

This is the vault's prescribed fix for the fabricated-logo defect that paused three live
ads on 2026-08-03, and it is now the standing rule: **never describe the logo to the
model.** Poster frames get the lockup centred in the clean band the prompt reserved at the
top; native frames get a small mark bottom-right on a dark plate, because a top-centre
wordmark on a photograph reads as an advert instantly.

## Re-rendering

```bash
export FAL_KEY=...
node _work/gen-banners.mjs              # resumable; skips finished renders
node _work/gen-banners.mjs --only t4,t9 # re-roll specific concepts
python3 _work/composite-logo.py         # writes banners/ and banners-nologo/
```

Fonts are fetched from Google Fonts into `_work/fonts/` and are not committed.
