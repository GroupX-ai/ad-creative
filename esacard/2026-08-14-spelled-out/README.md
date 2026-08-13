# ESA Card | banners with the acronym spelled out | 2026-08-13

Robby: *"My partner said nobody knows what an ESA card is. Use Emotional Support Animal,
never ESA."*

All 20 shippable banners re-rendered. About $4 of fal spend.

## What changed

1. **No headline or subheadline uses the acronym.** Every banner now carries the words
   "emotional support animal" in full, so a cold viewer knows what is being sold rather than
   having to decode three letters.
2. **The button is "Register My Emotional Support Animal"**, wrapping to two lines inside the
   button, replacing "Register My ESA".
3. **The corner lockup is the domain, `esacard.com`,** rather than an "ESA Card" wordmark.

On point 3: the letters are unavoidable in the domain itself, since that is the address people
have to type. As a URL it reads as an address rather than as an unexplained acronym, which is
the comprehension problem being fixed. If Robby wants the domain out of the creative too, the
banners work with no lockup at all, but then nothing tells the viewer where to go.

The prompts now carry an explicit rule: *"Never abbreviate emotional support animal to three
letters anywhere in the image."*

## The fourteen concepts

| id | headline | shapes |
| --- | --- | --- |
| `p1-carry` | Legitimacy you can carry. | square + vertical |
| `p2-offer` | $39. One time. | square + vertical |
| `p3-keeps-you-well` | For the animal that keeps you well. | square + vertical |
| `p4-instant-certificate` | An instant certificate for your emotional support animal. | square + vertical |
| `p5-three-minutes` | Register your emotional support animal in 3 minutes. | square + vertical |
| `p6-forever` | $39. Once. Forever. | square + vertical |
| `p7-cat-keeps-well` | For the animal that keeps you well. (cat) | square |
| `p8-no-appointments` | No appointments. No waiting rooms. | square |
| `p9-verifiable` | A number anyone can check. | square |
| `p10-wall-and-wallet` | One for the wall. One for your wallet. | square |
| `p11-his-photo` | His photo. Your wallet. | square |
| `p12-no-subscription` | $39. No subscription. | vertical |
| `p13-instant-cat` | An instant certificate for your emotional support animal. | vertical |
| `p14-park` | Register your emotional support animal in 3 minutes. | vertical |

## QA

All 20 rendered on the first wave. Each is checked both for file size and for luminance
spread, the second test added after a previous banner shipped as a solid black frame that
passed a size check. All 20 pass. Checked every image: the acronym appears nowhere except
inside the domain, the button label is correct and uncropped, and no invented badges, seals
or percentages.

## Still to do

The ten videos all close on the spoken line "E-S-A Card" and need re-rendering to match this
rule. That is the expensive half of the change, so it is not done here.

---

# Video rebuild (5 clips)

Robby picked `w1`/`w2`/`w3` as the cuter set over the gag-led batch, so the register here is
theirs: one real person and their animal, one genuine warm moment, phone-shot, light humour or
real feeling. No comedy premises, no concept ads.

Every clip closes on the words **"Emotional support animal card. Thirty-nine dollars."** spoken
in full. The prompt carries an explicit brand rule forbidding the three-letter form, and all
five were transcribed to confirm it.

| id | register | hook | the moment |
| --- | --- | --- | --- |
| `c1-four-days` | w2, emotional | "Four days he stayed over there." | the rescue lurcher finally sits against her |
| `c2-alarm-clock` | w3, light | "This is my alarm clock." | the cat takes his warm patch the second he moves |
| `c3-window-wait` | w1, warm | "Every single day. That window." | the spaniel explodes out of the front door |
| `c4-first-night` | w1, cosy | "First night. He has taken the bed." | "No furniture. No curtains. Do not care." |
| `c5-kitchen-table` | w3, fast | "Okay. Three minutes, she said." | in the inbox before the toast popped |

`c1-four-days` is the strongest. The arc is visible without sound: the dog watching from across
the room, crossing it, then pressed against her shoulder while she talks.

## Captions

Same renderer, with the four closing words `emotional`, `support`, `animal`, `card` added to the
emphasis list for each clip, so the full name lands in marigold at the end rather than flashing
past in plain white. The old `["esa","card"]` brand join no longer fires, by design.

## QA

All five transcribed on ElevenLabs scribe-v2 and matched to script. The closing phrase renders
as "Emotional support animal card" in every one, with the acronym appearing nowhere in any clip.
Contact sheets checked frame by frame: cards and certificates render clean, no stray on-screen
text.

Total fal spend across every ESA Card batch to date: about **$137**.
