# teampredict — banner batch 2026-07-27-google-ads-banners

Google Ads launch creative for TeamPredict (AI early-warning tool that reads public
LinkedIn signals to flag employee resignation/exit risk weeks in advance).

Built for the paused $1,000/month Google Ads launch in account **721-190-1144**
(see `scripts/google-ads-teampredict-launch.mjs` in the second-brain repo).
Full brand kit, approved claims and guardrails: `AD-CREATIVE-PLAYBOOK.md` in the
company's marketing repo.

## What is different about this batch

These are **browser-rendered, not fal-generated**. The playbook's fal + `gpt-image-2`
recipe is the right tool for social creative at 1:1 / 1.91:1 / 9:16, but it cannot hit
the fixed IAB display sizes (728x90, 300x250, 160x600) and cannot guarantee spelling.
Google Display units are exact-pixel and text-critical, so this batch is rendered from
HTML with Chromium via `build-banners.mjs`: exact dimensions, exact brand hex values,
exact copy, and free to re-render after an edit.

Two checks run on every render and fail the build rather than shipping a bad unit:

1. **Auto-fit** — all type is sized in `calc(px * var(--s))` and the page shrinks `--s`
   until the content fits its box.
2. **Assertions** — every text element is checked against the frame for both
   out-of-frame position *and* clipped inner text (`scrollWidth > clientWidth`). The
   second check is what caught a truncated 320x50 headline reading "Know Weeks Before
   They Re".

All 24 fixed-size units are under Google's **150 KB** cap for uploaded display ads.
The five 1200px responsive-display assets are larger, which is fine: responsive display
images allow up to 5 MB.

### Re-rendering

```bash
mkdir -p fonts   # Plus Jakarta Sans 400/600/700/800 TTFs from Google Fonts
node build-banners.mjs
```
Fonts are not committed (they are Google Fonts, fetched at build time). The script reads
them from `./fonts` or `$FONT_DIR`.

## Copy (both concepts, verbatim from the approved bank)

| Element | c1 `light-radar` | c2 `dark-leadtime` |
|---|---|---|
| Headline | "Know Weeks Before They Resign" | "Weeks of Lead Time on Every Exit" |
| Headline (320x50, 320x100) | "Weeks Before They Resign" | "Weeks of Lead Time" |
| Subhead | "AI reads public LinkedIn signals. No surveys." | "$5 per tracked employee. 5-minute setup." |
| Subhead (narrow) | "AI reads public LinkedIn signals." | "$5 per tracked employee." |
| CTA | "Start 30-Day Free Trial" (short units: "Start Free Trial") | same |
| Trust line | "No charge today · Cancel anytime" | same |

**Claim note, important for reuse:** this batch deliberately does **not** carry the
"No credit card required" line that the `2026-07-01-banners` v2 set uses. The site and
the billing KB both say the opposite: *"Yes, a card is added at signup via Stripe - but
nothing is charged today."* The site's own microcopy, "No charge today · Cancel anytime,"
is the accurate version and is what these units say.

Also held to the company guardrails: no accuracy percentages, no invented lead-time
window (the site says "often weeks before", never "2-4 weeks"), and the radar carries
**no labels at all** — only green/amber/red dots — since the playbook allows only
High/Medium/Low Risk as radar text.

## Visual system

- **c1 light-radar** — white to pale indigo `#F0F2FF` gradient, faint indigo blueprint
  grid, near-black `#0D0120` headline, indigo `#4B56FF` CTA pill.
- **c2 dark-leadtime** — near-black `#0D0120` field with faint concentric indigo radar
  rings, white headline, same indigo CTA pill.
- Both: the `public/logo.svg` radar tile plus "TeamPredict" wordmark (logo tile only on
  the small mobile units), and a radar instrument panel with one red, one amber and two
  green blips drawn in the risk traffic-light palette.

## Files

### Fixed-size display units (upload as image ads, all under 150 KB)

| File | Size | Placement |
|---|---|---|
| `TP_GDN_300x250_<c>_JUL26.png` | 300x250 | Medium rectangle — highest-volume display slot |
| `TP_GDN_336x280_<c>_JUL26.png` | 336x280 | Large rectangle |
| `TP_GDN_250x250_<c>_JUL26.png` | 250x250 | Square |
| `TP_GDN_200x200_<c>_JUL26.png` | 200x200 | Small square |
| `TP_GDN_728x90_<c>_JUL26.png` | 728x90 | Leaderboard |
| `TP_GDN_970x90_<c>_JUL26.png` | 970x90 | Large leaderboard |
| `TP_GDN_970x250_<c>_JUL26.png` | 970x250 | Billboard |
| `TP_GDN_468x60_<c>_JUL26.png` | 468x60 | Banner |
| `TP_GDN_300x600_<c>_JUL26.png` | 300x600 | Half page |
| `TP_GDN_160x600_<c>_JUL26.png` | 160x600 | Wide skyscraper |
| `TP_GDN_320x50_<c>_JUL26.png` | 320x50 | Mobile banner |
| `TP_GDN_320x100_<c>_JUL26.png` | 320x100 | Large mobile banner |

`<c>` is `c1` (light) or `c2` (dark), so 24 files.

### Responsive display ad assets (live in the paused Display campaign)

| File | Size | Role |
|---|---|---|
| `TP_RDA_landscape_1200x628_c1_JUL26.png` | 1200x628 | Marketing image 1.91:1, light |
| `TP_RDA_landscape_1200x628_c2_JUL26.png` | 1200x628 | Marketing image 1.91:1, dark |
| `TP_RDA_square_1200x1200_c1_JUL26.png` | 1200x1200 | Square marketing image, light |
| `TP_RDA_square_1200x1200_c2_JUL26.png` | 1200x1200 | Square marketing image, dark |
| `TP_RDA_logo_1200x1200_JUL26.png` | 1200x1200 | Square logo |

These five are already uploaded to the account and attached to the responsive display ad
in `TP | Display | Prospecting (US)`. The 24 fixed sizes are held here for manual upload
if the display test earns more budget.

## Layout notes per shape

- **Squares and rectangles** — centred lockup / headline / subhead / CTA column with the
  radar bleeding off the bottom-right corner.
- **Leaderboards and banners** — single row: lockup, headline and subhead, small radar,
  CTA pinned right. The 468x60, 320x50 and 320x100 units drop the wordmark and keep only
  the logo tile.
- **Skyscrapers** — vertical stack, radar centred between the copy and the CTA.
- **Billboard and 1200x628** — copy left, large radar right.
- **1200x1200** — copy block left of centre, large radar bleeding bottom-right.
