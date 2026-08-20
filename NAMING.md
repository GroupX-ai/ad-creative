# Ad naming standard

One scheme for every platform, so any row in any report traces back to a file in this repo.

Written 2026-08-19, because the 1Lookup account had 200 ads built across 8 campaigns and
nobody could answer "which creative is this row, and where is the file". Ad names in that
account included `1L 20260803 c11-square`, `Ad`, and `1L B12 c14 Best Month Ever`, which are
three different schemes, none of which names the product being sold.

## The rule in one line

**The ad's name is its creative file's basename, with the separators changed.** Nothing else
is allowed to be the ad name.

## The asset id

Every piece of creative gets one id, forever:

```
b<batch><type><nn>
```

| Part | Meaning | Example |
|---|---|---|
| `b<batch>` | the batch number in this repo, monotonic across the portfolio | `b13` |
| `<type>` | `c` = static banner, `v` = video | `c` |
| `<nn>` | two digits, unique inside the batch | `07` |

`b13c07`. It never changes, on any platform, in any size, after any re-cut. A re-roll that
replaces a take keeps the id; a genuinely different concept gets a new one.

## File names

```
<company>-<product-slug>-<assetid>-<shape>.png          static
<company>-<product-slug>-<assetid>-<concept-slug>-<variant>.mp4   video
```

- `<product-slug>` is the product's own route under `/products/` on the marketing site, so
  the file, the ad and the landing page all carry the same word. Platform-level creative that
  sells no single product uses `platform`.
- `<shape>` is one of `square` (1024x1024), `landscape` (1200x628), `vertical` (1080x1920),
  `wide` (1200x300).
- `<variant>` on video is the post chain: `720p`, `1080p`, `captioned`, `endcard`, `trimmed`.

```
1lookup-skip-trace-b13c07-square.png
1lookup-skip-trace-b13c07-vertical.png
1lookup-search-intent-lookup-b13v03-vacant-desk-1080p-captioned-endcard.mp4
1lookup-platform-b13c01-landscape.png
```

## Ad platform entities

Three levels, pipe-separated, same on Google, Meta and Reddit. Pipes because every platform's
UI and export keeps them, and none of them treat a pipe as a delimiter.

```
Campaign   <CO> | <PLATFORM> | <STAGE> | <THEME> | <MONEY EVENT>
Ad set     <CO> | <PRODUCT> | <AUDIENCE> | <PLACEMENT>
Ad         <CO> | <PRODUCT> | <ASSET ID> <CONCEPT> | <SHAPE>
```

| Field | Values |
|---|---|
| `<CO>` | `1L`, `1C`, `VD`, `EC`, `TP`, `BP`, `ESA` |
| `<PLATFORM>` | `META`, `GOOG`, `REDDIT`, `TIKTOK` |
| `<STAGE>` | `COLD`, `RETARGET`, `BRAND`, `COMP` (competitor conquest) |
| `<THEME>` | the product family or test name: `Validate`, `Enrich`, `Social`, `Intelligence`, `Platform`, `CreativeTest` |
| `<MONEY EVENT>` | what the campaign optimises for, spelled out: `Trials` |
| `<PRODUCT>` | the same `<product-slug>` as the file; `platform` for creative that sells no single product; or a **family slug** (`validate`, `enrich`, `social`, `monitor`, `intelligence`, `analog`) when one ad set deliberately holds several products so its budget stays readable |
| `<AUDIENCE>` | `US Broad`, `US Sales 25-54`, `US Realestate`, `Lookalike Trials 1%`, `Retarget 30d` |
| `<PLACEMENT>` | `Auto`, `Feed`, `Reels`, `Search`, `Display`, `YouTube` |

### Filled in

```
1L | META | COLD | Validate | Trials
1L | META | COLD | Intelligence | Trials
1L | META | RETARGET | Platform | Trials
1L | GOOG | COLD | Search Validate | Trials
1L | GOOG | COMP | Data Competitors | Trials
1L | REDDIT | COLD | Validate | Trials

1L | skip-trace | US Realestate | Auto
1L | email-validation | US Broad | Feed
1L | platform | Retarget 30d | Auto

1L | skip-trace | b13c07 ghost-owner | square
1L | skip-trace | b13v03 vacant-desk | vertical
1L | platform | b13c01 forty-one-keys | landscape
```

Google Ads has no ad-set level: the ad group takes the ad-set name, and RSAs take the ad name
with `rsa` as the shape.

## Why each field is there

- **Product in the ad set name, not just the ad**: cost per trial is only decidable per product,
  and an ad set is the smallest unit that owns a budget. A report grouped by ad set name is a
  report by product.
- **Asset id in the ad name**: it is the join key back to this repo and to
  `_scripts/banner-run-log-*.json` / `seedance-run-log-*.json`, which hold the exact prompt.
- **Shape in the ad name**: the same concept performs differently at 1:1 and 9:16, and without
  the shape those two rows are indistinguishable in an export.
- **Money event in the campaign name**: a campaign called `Trials` that is optimising for a free
  signup event is a lie you can see. That mismatch cost this account four figures.

## UTMs

Every destination URL carries the same five, and they are built from the names above, so a
Stripe subscription can be traced to one creative file:

```
utm_source   = facebook | google | reddit
utm_medium   = cpc
utm_campaign = <campaign name, lowercased, spaces and pipes to hyphens>
utm_content  = <asset id>-<shape>            e.g. b13c07-square
utm_term     = <product-slug>                e.g. skip-trace
```

Platform macros fill nothing here: these are written literally at build time, because Meta's
`{{ad.name}}` macro renders the whole pipe-separated name and Reddit has no macro at all.

## Checking it

`node _scripts/naming-check.mjs` reads every live ad on all three platforms and every file in
this repo, and prints the rows that do not match. Run it after any build.
