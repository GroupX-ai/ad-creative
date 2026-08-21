# 1Lookup account evidence, pulled live 2026-08-21

All numbers from the Meta Graph API against act_2333276243857483, and from PIL luminance
measurement of the delivery PNGs in the ad-creative repo. Not from a playbook file.

## 1. The only clean creative signal in the account

91% of this account's lifetime Meta "clicks" came from Audience Network at $0.85 CPM
(169,735 impressions, 25,664 of 28,057 link clicks, $144 spend). Those are junk taps: Meta
reported 17,634 landing page views over 90 days while site analytics saw 3,267 paid visitors
from all sources combined, a ~5x overstatement. Audience Network is already excluded on all
nine active ad sets, so this contaminates history only.

Filtering to Facebook + Instagram, last 30 days, >400 impressions:

| ad | CTR | CPM | mean image brightness |
|---|---|---|---|
| `b13c49 analog-skip-trace` square | 8.18% | $6.06 | 128/255 |
| `b13c03 hazard` square | 5.50% | $7.39 | 50/255 |
| `20260803 c7-vertical` | 6.15% | $47.26 | dark |
| `20260803 c11-square` (payphones) | **1.21%** | $65.85 | **41/255** |

Product-specific 9x16 videos (property-lookup, ip-lookup, reverse-ip-append) run 14-15% CTR
at $8-11 CPM, above every static.

**Caveat, stated plainly:** CPM varies 10x across these ads, so they sat in different auctions
and audiences. The skip-trace vs hazard comparison ($6.06 vs $7.39 CPM) is the only near-clean
pair. Three data points is a signal, not proof.

## 2. The winner and the loser, described

- **Winner, 8.18%:** daylight photo, suburban street, torn cardboard propped on a car bumper,
  handwritten in marker: "Half these addresses are wrong. Skip trace them. 1Lookup." Real
  setting, natural light, one specific job named.
- **Loser, 1.21%:** a row of dead payphones in a dark corridor with blue rim light,
  "Stop Paying for Bad Data." An object in a void.

## 3. Every 1Lookup banner ever made is dark

Mean luminance by batch, square deliveries:

| batch | n | mean brightness |
|---|---|---|
| 2026-07-20-banners | 2 | 28/255 |
| 2026-08-03-disruptive | 12 | 37/255 |
| 2026-08-03-analog-neg | 9 | 95/255 |
| 2026-08-20-crazy-banners (rejected) | 14 | 74/255 |

37 concepts, four batches, zero light-ground tests. The single best-performing static in the
account (128/255) is brighter than 11 of the 14 rejected concepts.

Root cause is in the playbook itself: `AD-CREATIVE-PLAYBOOK.md` sets the brand background to
`#05060F` and the tone to "dark developer terminal aesthetic", and every batch inherited it.
The site is dark, so the creative was made dark to match. That is a landing-page rule being
applied to a scroll-stopping problem.

## 4. Cross-portfolio comparison, same team, same API

Facebook + Instagram only, last 90 days:

| account | best ad | CTR | CPM | brightness |
|---|---|---|---|---|
| Emailchaser | C9 Receipt, white ground | 2.73% | $7.15 | 235/255 |
| Emailchaser | C3 Thousands, white ground | 1.49% | $4.69 | 229/255 |
| Emailchaser | C10 200M, navy ground | 2.00% | $53.98 | 59/255 |
| ESA Card | p2-offer, cream ground + cat | 3.75% | $24.49 | 196/255 |
| VoiceDrop | best of 40 ads | 1.32% | $43.32 | n/a |

The portfolio's best cost-per-click creative is a **receipt on pure white**. The rejected
1Lookup batch contains a receipt concept too, shot on a dark wooden desk at 116/255.
Same object, opposite treatment, and the light one is the portfolio benchmark.

## 5. What this does NOT say

1Lookup's static CTR on real placements (5.5-8.2%) already beats VoiceDrop (1.3%) and
Emailchaser (2.7%). Creative is not the binding constraint on trials; the acquisition audit
of 2026-08-20 established the ceiling at ~1.9/day from the CRO side. Better banners are worth
doing and will not by themselves reach 5 trials/day.

## 6. Claim bank re-verified this session

`DATA_PRODUCT_COUNT = 41` in `1Lookup-App/src/lib/products.ts:138`, re-read 2026-08-21.
Five live Google video ads still say 34; that is stale copy to correct, not a violation.
