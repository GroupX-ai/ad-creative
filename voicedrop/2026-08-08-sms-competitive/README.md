# VoiceDrop 2026-08-08 SMS competitive batch

**6 concepts, 9 assets. The first SMS-angle creative this account has ever had.** Every prior VoiceDrop banner sells ringless voicemail (callbacks, cold calling, voice cloning). The `SMS - Banner Ads` campaign, the account's demo engine at $300/day, has been running RVM-era creative and one fatigued ad against an SMS promise.

Generated with fal `openai/gpt-image-2`, quality high, ~$0.20/render (11 renders including 2 re-rolls, ~$2.20). Square 1024x1024 (Meta feed 1:1 — this campaign is ~96% mobile FB/IG feed), vertical 1080x1920 (Stories/Reels 9:16).

**Destination for every asset in this batch: `/bulk-sms-marketing/`.** That page's hero is the source of the c39 headline verbatim, and its subhead is the source of c40. Do not point these at the homepage: the claims-match breaks.

## Why this batch exists

Two things converged.

1. **Ad-13 does everything and is fatiguing.** Per the 2026-08-03 paid-acquisition audit: SMS - Banner Ads sits at $255.97/demo over 7d and $303.78/demo over 90d, but Ad-13 alone carries it ($180.76/demo on 8 demos in 14d) at CPM $135 and frequency 2.7. The standing note in `second-brain/companies/voicedrop/bulk-sms-landing-page.md` says it plainly: *"Fresh creative behind Ad-13 is still the most likely lever for demo volume; the page itself is no longer the weak link."*
2. **A direct competitor is now buying the same feed.** Sent.dm is running Meta ads on SMS/messaging with a hard price hook.

## The competitive read (Sent.dm), and the rule it produces

Four Sent.dm ads reviewed 2026-08-08. Their positioning:

| Their angle | Their execution |
| --- | --- |
| "Cut your Twilio SMS bill in half" | Per-country price table: USA `$0.012` → `$0.0024/message`, plus GBR, FRA, ISR, UAE, IDN |
| "SMS Compliance, handled" | 10DLC registration, templates, opt-in, regional rules |
| "Same-Day 10DLC Approval For Your Customers" | `curl` request bodies, `POST /v3/profiles/{profileId}/campaigns` |
| "75+ Carrier Direct Integrations / 100% Deliverability" | Dark dev-tool aesthetic, terminal screenshots |

**The rule: do not fight Sent.dm on a published per-message price.** VoiceDrop's cheapest *published* self-serve rate is `$0.0145` per segment at the $995/month commitment (`lib/pricing.ts`, `smsSliderSteps`), and the entry rate is `$0.0222`. Sent.dm advertises `$0.0024` for USA. Putting a VoiceDrop cents-per-message figure on a banner loses that comparison roughly 6x, and VoiceDrop's actual competitive rate is the wholesale number quoted on the call, which is deliberately not published. So this batch uses the approved **"cut your SMS bill in about half"** framing and the **"Wholesale Pricing"** promise, and puts no per-message number on any asset.

Three more separations worth holding, because they are structural rather than positional:

- **Different buyer.** Sent.dm sells to developers and platforms ("Messaging API for Platforms", 10DLC *for your customers*). VoiceDrop sells to teams sending 100K+/month themselves: CSV upload, unified inbox, rep assignment. c44 is the qualifier ad that filters for that buyer on the impression.
- **Sent.dm has no voice channel.** The voicemail-then-text one-two punch (c42) is the one thing they structurally cannot answer.
- **Their "100% Deliverability" is not a credible number.** VoiceDrop's `99.8%` is on-site and defensible. Do not match them upward.

## Style basis

Held to the two treatments this account's own data and Robby's 2026-08-03 review already picked: the **organic/photographic family** (c21 whiteboard was *"the best by far"*) and **loud typographic pattern-interrupt** (c10 hazard tape was a pick). No product shots, no dashboard screenshots, and deliberately not Sent.dm's terminal aesthetic: the Banner Test that used product imagery was killed with every ad under 2% CTR, while Billboard Ads runs 3.9-4.0% CTR at $0.93-1.05 CPC.

## Concepts

| # | Angle | Style | Assets | Copy source |
| --- | --- | --- | --- | --- |
| `c39` | 100K+ Sends. 99.8% Deliverability. Wholesale Pricing. | Whiteboard photo | square, vertical | `/bulk-sms-marketing` h1, verbatim |
| `c40` | Cut Your SMS Bill in About Half | Loud gold/black poster | square, vertical | `/bulk-sms-marketing` hero subhead |
| `c41` | Your Texts Are Dying in the Filter | Hazard warning label | square, vertical | `/sms` problem section h2, verbatim |
| `c42` | They hear your voice, then they get your text | Sticky notes on a monitor | square | `/sms` one-two-punch card h3 |
| `c43` | Every text from THEIR local area code | Yellow legal pad, ballpoint | square | `/sms` product bullet + FAQ |
| `c44` | Built for teams sending 100K+ SMS a month | Torn cardboard held to a wall | square | `/bulk-sms-marketing` qualifier list |

`c39` is the direct Ad-13 relief variant: same promise, a style the account has evidence for. `c40` and `c41` are the two most different-looking things in the set and are the real CTR test. `c42`-`c44` are single-format probes; render the other shapes only if one earns it.

## Claim-safety notes

- **No per-message price appears anywhere in this batch, on purpose.** See the rule above. If a future asset needs a price, it needs Robby's sign-off on which number and against which competitor.
- **`99.8%` is the correct deliverability figure** (`/bulk-sms-marketing` hero and its qualifier list). The page comment block still quotes an older "99% Deliverability" line as the ad promise; the rendered h1 says 99.8% and that is what shipped here.
- **"about half" keeps the word "about."** Site copy is *"Teams switching from retail pricing typically cut their SMS bill in about half."* Dropping "about" turns a typical-case claim into a guarantee.
- **`c43`'s "not a random 1-800"** is a plain-language restatement of the site's local-area-code mechanic, not a claim about any competitor's numbering.
- **No third-party logos, no invented stats, no fake badges** in any asset. Verified at full size, all nine.
- **The wordmark is AI-approximated in the hand-lettered assets** (c39, c42, c43, c44). That is the point of the style, but composite `public/uploads/2024/01/VoiceDrop-Logo-Light.webp` if any of these graduates to a big-spend placement.

## Re-rolls (what full-size review caught)

| Asset | What wave 1 got wrong |
| --- | --- |
| `voicedrop-c39-square.png` | A branded "EXPO" marker sat in the whiteboard tray: a real third-party brand in frame, against the no-third-party-logos guardrail. Fixed by requiring an empty tray and banning brand names on any object in the scene. |
| `voicedrop-c42-square.png` | Framing was too wide. The sticky notes occupied a small band of a mostly-empty monitor and the handwriting would not have survived a mobile feed thumbnail. Fixed by forcing a close-up where the notes fill the frame. |

Both wave-1 versions rendered their copy correctly; these were composition and guardrail failures, not spelling failures.

## Exact prompts (final versions)

Shared constraint blocks appended to the prompts below, from `AD-CREATIVE-PLAYBOOK.md`:

- **NO_EXTRA:** `The ONLY text in the image is the brand name VoiceDrop, the headline and the subheadline. No feature chips, no badges, no statistics, no icons with captions, no brand names or logos on any object in the scene, no other words anywhere.`
- **MARGIN:** `Every line of text must fit completely inside the frame with a clear margin on all four sides. No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole.`
- **ORGANIC:** `Deliberately unpolished and organic so it reads as a real photo someone snapped in a social feed rather than an advertisement. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting.`

### `voicedrop-c39-square.png` — wave-2 re-roll (final)

```text
A real photograph of a white office whiteboard, shot on a phone in natural window light, square framing, the whiteboard filling the entire frame edge to edge with no wall visible. Hand-written on the whiteboard in thick black dry-erase marker, in three stacked lines of confident block capitals, the writing large and filling the middle two thirds of the board: "100K+ SENDS" then "99.8% DELIVERABILITY" then "WHOLESALE PRICING". The words "WHOLESALE PRICING" are underlined twice in purple marker. In the lower right of the whiteboard, smaller and hand-lettered in purple marker, the single brand name spelled exactly V-o-i-c-e-D-r-o-p as one word: "VoiceDrop". A slight glare on the whiteboard surface. The whiteboard tray is empty: there is no pen, no marker, no eraser and no object of any kind resting on it. [ORGANIC] [MARGIN] [NO_EXTRA]
```

### `voicedrop-c39-vertical.png` — wave 1 (final)

```text
A real photograph of a white office whiteboard, shot on a phone in natural window light, vertical portrait framing, the whiteboard filling the frame top to bottom. Hand-written on the whiteboard in thick black dry-erase marker, in three stacked lines of confident block capitals: "100K+ SENDS" then "99.8% DELIVERABILITY" then "WHOLESALE PRICING". The words "WHOLESALE PRICING" are underlined twice in purple marker. In the lower right corner of the whiteboard, smaller and hand-lettered in purple marker, the single brand name spelled exactly V-o-i-c-e-D-r-o-p as one word: "VoiceDrop". A slight glare on the whiteboard surface and a marker resting on the tray. [ORGANIC] [MARGIN] [NO_EXTRA]
```

### `voicedrop-c40-square.png` / `voicedrop-c40-vertical.png` — wave 1 (final)

Swap `square poster` for `vertical 9:16 poster` in the first sentence.

```text
Bold loud square poster advertisement for VoiceDrop, a bulk SMS and ringless voicemail platform. Flat solid near-black dark purple background #090714 with one broad diagonal band of warm gold #ffb01f across the lower third. Enormous heavy geometric rounded sans-serif headline in white block capitals, tightly stacked on four lines, filling most of the frame: "CUT YOUR SMS BILL IN ABOUT HALF". The word "HALF" is rendered in warm gold #ffd874 and is the largest word in the image. Underneath, in small clean light gray sans-serif: "Straight-to-carrier wholesale rates." At the very top in small white letters, the brand name as one word: "VoiceDrop". Typography-led billboard layout, no photography, no product screenshots, no phone mockups, no illustration. [MARGIN] [NO_EXTRA]
```

### `voicedrop-c41-square.png` / `voicedrop-c41-vertical.png` — wave 1 (final)

Swap `square` for `vertical 9:16` in the first sentence.

```text
A stark high-contrast square warning-label style advertisement for VoiceDrop, a bulk SMS platform. Background is flat industrial charcoal. Running across the top edge and the bottom edge are two thick diagonal hazard-stripe bands in black and safety yellow. Between them, centred, an enormous condensed heavy sans-serif headline in safety-yellow block capitals on three stacked lines: "YOUR TEXTS ARE DYING IN THE FILTER". Directly beneath the headline, small clean white sans-serif text: "Wholesale SMS with deliverability built in." In the very bottom band, small black letters on the yellow, the brand name as one word: "VoiceDrop". Gritty printed-warning-sign texture, slight ink imperfection. No photography, no phone mockups, no product screenshots. [MARGIN] [NO_EXTRA]
```

### `voicedrop-c42-square.png` — wave-2 re-roll (final)

```text
A real close-up photograph taken on a phone, square framing, of three paper sticky notes stuck in a row on the dark bottom bezel of a computer monitor. The camera is close so the three sticky notes fill almost the whole frame and the handwriting is large and easy to read. Natural daylight from a window at the side. The first sticky note is yellow, hand-written in blue ballpoint capitals on two lines: "THEY HEAR" then "YOUR VOICE". The second sticky note is orange, hand-written in blue ballpoint capitals on two lines: "THEN THEY GET" then "YOUR TEXT". The third sticky note is purple, hand-lettered in black marker with only the brand name spelled exactly V-o-i-c-e-D-r-o-p as one word: "VoiceDrop". Handwriting is natural and slightly uneven but every letter is large, clearly legible and correctly spelled. Slightly blurred office background behind the monitor. [ORGANIC] [MARGIN] [NO_EXTRA]
```

### `voicedrop-c43-square.png` — wave 1 (final)

```text
A real photograph taken on a phone, looking down at a yellow ruled legal pad lying on a plain wooden desk, natural window light, a blue ballpoint pen resting on the page. Hand-written on the legal pad in blue ballpoint, in natural slightly uneven handwriting that is still completely legible, on three lines: "Every text from" then "THEIR local area code" then "not a random 1-800". The words "THEIR local area code" are circled in blue ballpoint. At the bottom right of the page, smaller, hand-written and underlined, the brand name spelled exactly V-o-i-c-e-D-r-o-p as one word: "VoiceDrop". [ORGANIC] [MARGIN] [NO_EXTRA]
```

### `voicedrop-c44-square.png` — wave 1 (final)

```text
A real photograph taken on a phone of a torn piece of brown corrugated cardboard held flat against a plain white painted wall by a person's hand at the edge of frame, natural indoor daylight, visible cardboard texture and a rough torn edge. Written on the cardboard in thick black marker in rough hand-lettered capitals on three lines: "BUILT FOR TEAMS SENDING" then "100K+ SMS" then "A MONTH". The line "100K+ SMS" is much larger than the other two lines. Below it, smaller and hand-lettered, the brand name spelled exactly V-o-i-c-e-D-r-o-p as one word: "VoiceDrop". Handwriting is rough but every letter is clearly legible and correctly spelled. [ORGANIC] [MARGIN] [NO_EXTRA]
```

## Where these are deployed

Meta ad account `1787214791795310` (VoiceDrop - #1), campaign **"VD SMS Competitive - Wholesale vs Sent (Claude) 2026-08"**, created **PAUSED** on 2026-08-08 alongside the existing `SMS - Banner Ads`. Kill rule inherited from the account's creative cadence: frequency >2.5 or CTR <2%.
