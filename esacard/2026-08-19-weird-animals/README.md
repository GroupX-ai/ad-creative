# ESA Card · weird animals · 2026-08-19

A duplicate of `ESA Card | Meta | US | Cold | Checkouts` in which the only thing that changed
is the animal.

Robby, after seeing that `IMG p2-offer-square`, `IMG p6-forever-square` and `UGC u6-rabbit`
were the three ads carrying the account's sales:

> Please create a duplicate our `ESA Card | Meta | US | Cold | Checkouts` campaign with
> entirely new ads based on these best performing ones. Exact same video ad script and exact
> banner style and text - but replace them with weird animals: Turtle, Baby alligator, Pet egg
> (egg with hands and legs), A dog/cat talking with a pet human, Raven, Hedgehog, Snake,
> Chicken, Any other cute or pattern breaking animal you can think of.

So this batch is a controlled test and not a new creative direction. Every headline, every
subheadline, every hex, the button label, the corner wordmark, the three spoken lines, the
kitchen table, the propped front camera and the fifteen-second beat sheet are lifted verbatim
from the three winners. **The animal is the only variable.** If a weird animal wins, the win is
the animal.

## What is here

| # | File | Layout / script | Animal |
| --- | --- | --- | --- |
| 1 | `w1-turtle-square.png` | p2-offer · "$39. One time." | small pet turtle |
| 2 | `w2-alligator-square.png` | p2-offer | baby American alligator |
| 3 | `w3-raven-square.png` | p2-offer | raven |
| 4 | `w4-snake-square.png` | p2-offer | ball python |
| 5 | `w5-pig-square.png` | p2-offer | pot-bellied pig |
| 6 | `w6-egg-square.png` | p6-forever · "$39. Once. Forever." | egg with hands and legs |
| 7 | `w7-hedgehog-square.png` | p6-forever | hedgehog |
| 8 | `w8-chicken-square.png` | p6-forever | speckled hen |
| 9 | `w9-axolotl-square.png` | p6-forever | axolotl |
| 10 | `w10-cockatoo-square.png` | p6-forever | sulphur-crested cockatoo |
| 11 | `w1-turtle-1080p.mp4` | u6-rabbit script | turtle |
| 12 | `w2-alligator-1080p.mp4` | u6-rabbit script | baby alligator |
| 13 | `w3-hedgehog-1080p.mp4` | u6-rabbit script | hedgehog |
| 14 | `w4-chicken-1080p.mp4` | u6-rabbit script | hen |
| 15 | `w5-raven-1080p.mp4` | u6-rabbit script | raven |
| 16 | `w6-snake-1080p.mp4` | u6-rabbit script | ball python |
| 17 | `w7-dog-and-human-1080p.mp4` | u6-rabbit script, inverted | corgi speaks, human is the pet |

Prompts: `prompts.mjs` (banners), `prompts-video.mjs` (video). Generators: `gen-banners.mjs`,
`gen-video.mjs`. Render log: `run-log.json`. QA: `qa-contact-sheet.png`, `qa-text-zoom.png`.

## The three decisions worth recording

**Square only, no vertical cuts.** `p2-offer-square` and `p6-forever-square` carry 5 of the
account's 6 sales. A placement breakdown of the source campaign shows Facebook Feed carrying 4
of those 6 on $111.27, Facebook Reels 1 on $44.35, and Instagram Reels **0 checkouts on 23
landing page views** (Feed converts landing page views to checkouts at 18.8%, so 23 views
should have produced about 4; getting 0 is roughly a 0.8% chance by luck). Square is what Feed
serves. The vertical cuts of these same two designs sold nothing, so none were made.

**The video script is frozen, not adapted.** `u6-rabbit` has the best landing-page-to-checkout
rate in the account (5 checkouts at $0.97) and one sale. Its second line, "Took three minutes.
My coffee was still hot.", is identical in all seven clips; only the animal noun, the pronoun
and the one closing tag clause move. The hardened `SPEECH_UGC`, `CARD_RULE`, `BAN`, `UGC_TONE`
and `SHARP` blocks are copied verbatim from `../prompts-ugc-examples.mjs` and were not edited.

**The pet egg is a banner and never a video.** A spoken line registering an egg would be a
claim that needs a footnote to be true, and the rule is to delete the line rather than add the
footnote (`docs/ads/policy.md` §0). On a banner the egg is a picture sitting beside copy that
promises only the card, the certificate, the price and the absence of renewals, every word of
which stays true. Nothing in this batch, on either format, tells the reader what the product
is not.

`w7-dog-and-human` is the one structural change Robby asked for by name. The corgi speaks the
same script about **its own** card, so the product claim is unchanged: the animal is still the
one being registered. The man on the floor never speaks and is never humiliated, he is
delighted throughout, which is what keeps it a joke rather than a mean one.

## Claim safety

Every animal here is honest subject matter for this product: the site's own registration funnel
offers "Rabbits, birds, reptiles. Companions come in all shapes." as its third species option,
and the certification page says "rabbits, birds, and other household animals are welcome too."

The copy across all 17 assets promises exactly: the card, the certificate, the photo on it,
about three minutes, $39 once, and no renewal fees. Nothing about housing, landlords, access,
travel, therapists, evaluations or legal standing appears in either direction.

## QA, and what it caught

Every clip was watched as a contact sheet and transcribed, and every suspect line was
cross-checked on a second engine (ElevenLabs Scribe v2 and Whisper) before being called a
defect. Four of the seven first takes had audio faults and **all four were confirmed by both
engines**, so none was a transcription artifact.

| clip | first-take fault | fix | cost |
| --- | --- | --- | --- |
| w1-turtle | opening verb was a non-word ("Repegged" / "Repeditated") | re-roll, take 2 | $6.93 |
| w2-alligator | "emotional support **amble** card" | re-roll, take 2 | $6.93 |
| w4-chicken | said the four-word phrase twice, then the script | **muted 3.30-5.15s** | **$0** |
| w5-raven | "emotional **rescue** animal card" | re-rolls, take 3 | $13.86 |
| w3, w6, w7 | none | shipped as rendered | $0 |

Three things worth carrying forward.

**The $0 mute repair works on an improvised repetition, not just a garbled tail.** The chicken
said "emotional support animal card" a second time between beats 1 and 2. Both boundaries of
the stray line sat inside existing silence gaps (3.13-3.49s and 4.95-5.38s), so muting
3.30-5.15s removed it inaudibly. It re-transcribes clean on both the 720p and the 1080p, and
saved a $6.93 re-roll that was not guaranteed to be better.

**A re-roll is still a coin flip, and this batch called it.** The raven's take 2 fixed the
banned "rescue" substitution and then broke the opening verb instead ("Reten tried" / "Rattan
tried", two engines agreeing). Fixing one named failure at a time is what let the second one
through; take 3 named **both** words in one correction block and came back exact on both
engines. Take 2 was discarded. Every superseded take is in `_takes/take1/` (gitignored).

**Take 1 was the better picture twice, and lost anyway.** The turtle's first take had a warmer
payoff and the alligator's first take had a much stronger composition, with the animal's head
right beside the speaker's face. Both were discarded, because a garbled product name in the
hook is not a thing taste can outvote.

No clip contains on-screen text, a recognisable real person, a readable card, or a spoken claim
outside the bank. All seven are 15.07s, 720x1280, 24fps, with audio.

## Cost

$79.44 of fal spend: $2.00 for ten banners, $48.51 for seven 15s clips at 720p, $27.72 for four
re-rolls, $1.19 for eleven 1080p upscales, about $0.02 of transcription.
