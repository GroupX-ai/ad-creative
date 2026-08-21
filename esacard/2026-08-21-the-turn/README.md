# ESA Card · "the turn" · 2026-08-21

Two example clips for Nadav, built from his brief with one part of it removed.

## The brief, and the part that cannot be made

> Nadav asked for a few examples of video ads with sad videos of people being rejected and not
> being able to enter places with their animals (restaurant, train, etc). Then they get an
> Emotional Support Animal card and now they are allowed entry.

**The second half is a false claim and we cannot run it.** An emotional support animal card
grants no public access to a restaurant, a train, a store or anywhere else; emotional support
animals are not service animals and carry no public-access right. Filming the card producing
entry does not merely bend a policy, it advertises something the product does not do.

Our own rules already forbid it in four places, written before this brief existed:

| Where | What it says |
| --- | --- |
| `docs/ads/policy.md` §1.2 | "Take your emotional support animal anywhere" is a red claim. "The ad may describe what the customer receives. It may not describe what the customer will be allowed to do." |
| `docs/ads/policy.md` §4 | Meta prohibits outcome claims about buildings, venues and airlines, and names before-and-after narratives as "the visual form of the same claim". |
| `docs/ads/policy.md` §6 | State misrepresentation statutes. "Never write copy that suggests the customer use the card to claim rights they do not have. Not 'show this card and walk right in', not 'for restaurants, shops and flights'." Copy that coaches a customer into a state-law offence is worse than a disapproved ad. |
| `prompts-video.mjs` BAN block | Has forbidden trains, buses, airports, uniformed officials and service-dog vests since the first ESA batch. A prompt of the literal ask cannot reach fal. |

There is also a live precedent. On 2026-08-19 Google disapproved **every ad in the ESA Card
account at once** under Enabling dishonest behavior, and said in writing on manual review that
the problem is that novelty credentials "are often used to mislead third parties (such as
landlords or businesses) into believing a pet has official legal status". An ad whose entire
plot is a business being misled into believing exactly that is the strongest possible version
of what already cost us the channel.

And the honest route to the outcome Nadav is picturing does not run through this product at
all: housing rights come from a letter written by a licensed mental health professional, and
ESA Card does not sell letters.

## What survives, and it is the good half

The **structure** is genuinely new for this account and worth testing. Every ESA Card video in
the library is a warm flex: the owner already has the card and is pleased about it. Nadav's
shape has a turn in it, something is wrong and then it is not, and the batch-9 lesson says a
script with no turn is what "Meh" means.

So both scripts keep the spine and move the obstacle off the doorway.

| # | File | The obstacle | The turn | Animal |
| --- | --- | --- | --- | --- |
| 1 | `t1-whole-saturday-1080p.mp4` | The entire Saturday she cleared to do the paperwork | It took three minutes | Pembroke corgi |
| 2 | `t2-the-wall-v2-1080p.mp4` | The animal is the only one in the house with nothing on the wall | The certificate goes up | long-haired gray cat |

Both are 15s, 9:16, 720p masters upscaled to 1080p. UGC selfie for t1 (the account's proven
format: `u6-rabbit` has the best landing-page-to-checkout rate at $0.97), wholesome
slice-of-life for t2 (the `d`/`e`/`h` register).

## The rule this batch is built on

**The card is never the answer to a permission question.** It was hardened in the heart-tug
batch, after three drafts died on it, and this batch promotes it into `docs/ads/policy.md` §6
so it is findable from the policy rather than from an approval doc:

> The keys, the welcome or the signed paperwork always land BEFORE the card appears, so the
> card reads as photo identification for a file, never as the thing a gatekeeper rules on.

These two scripts go further than that, because Nadav's brief points straight at the failure
mode: **there is no gatekeeper on camera at all.** Nobody is refused anything, nobody is
turned away, and nobody asks anyone for permission. That sentence is in the BAN block verbatim.

## Claim safety

Everything spoken across both clips: `$39`, one time, three minutes, the card, the certificate,
the photograph on it. Every one of those is on the green list in `docs/ads/policy.md` §7 and
needs no qualification, which is what makes the no-disclaimer rule (§0) safe to hold here.

Nothing about housing, landlords, access, venues, travel, therapists, evaluations or legal
standing appears in either script, in either direction. Neither clip tells the viewer what the
product is not.

Two prop details worth keeping for future scripts:

- **A certificate is where the model draws a gold seal**, and a seal, crest, eagle, shield or
  flag is the single biggest implied-government-affiliation risk on this account (§1.1). `t2`
  bans all of them by name inside the prop description rather than relying on the general card
  rule.
- **Blank paper has to be described as blank.** The folder, the legal pad and the certificate
  are each specified as carrying no writing, because the batch-13 rule is that a screen or a
  page stays clean only when the prompt states exhaustively what IS on it.

## QA, and what it caught

Both takes were watched as a contact sheet at full size, transcribed, and every suspect line
cross-checked on a second engine (ElevenLabs Scribe v2 and Whisper) before being called a defect.

| clip | take 1 | verdict |
| --- | --- | --- |
| `t1-whole-saturday` | every line verbatim, brand phrase clean, payoff rendered exactly as written | shipped as rendered |
| `t2-the-wall` | said **"Emotional support Weeder Red, less thing for the wall"** | re-rolled as `t2-the-wall-v2` |

**The cause of the t2 garble is a word collision, not bad luck.** The scripted line was
"Emotional support animal card. Certificate for the wall." Two hard-C words met across the
sentence boundary and the model ran `card` into `Certificate` and lost both. This is batch 8's
second-instance drift rule in a new place: it is not only the *same* long word twice that
breaks, it is two long words that *start the same way* in one breath.

Three fixes went into one correction block, per the batch-13 rule that fixing a single named
failure invites the model to break a different one:

1. `Certificate` is out of the spoken script entirely, so nothing follows `card` in that breath.
   The certificate is on screen; it did not need saying.
2. A COLLISION RULE is now in both SPEECH blocks: no word beginning with a hard C or K sound may
   follow CARD, and the speaker closes the word and pauses before anything else.
3. The certificate prop is hardened. Take 1 drew an ornamental double border, a garbled title,
   four lines of garbled body text and two signature lines with signatures on them, despite the
   prompt already banning ornamental borders. **A blank certificate is the hardest prop in this
   account**, because a formal document with signature lines is exactly the
   resembles-an-official-credential read that cost us Google. The prop block now bans the title
   line, the body text, the signature, the signature line, the printed name, the date, the
   engraved border and the ornamental frame line by name, and says it must not resemble a
   diploma or an award.

No seal, crest, eagle, shield or flag appeared on either take, which is the §1.1 risk that
matters most. No clip contains a recognisable real person, on-screen text, a readable card, or a
spoken claim outside the bank.

**Superseded takes are in `_takes/take1/` (gitignored), not deleted.** A re-roll is a coin flip
and this account has twice adopted a worse second take; the originals stay on disk so the two can
be compared.

## Not yet done

Captions and the composited end card are not on these. Both are post steps and both are cheap,
but a batch is not finished until they are applied, so these are examples for judgement rather
than upload-ready ads. They go on at approval, along with a square 1:1 cut: `p2-offer-square`
and `p6-forever-square` carry 5 of the account's 6 sales and square is what Facebook Feed
serves, while Instagram Reels has produced 0 checkouts on 23 landing page views.

## Cost

2 clips at 15s / 720p: `720*1280*15*24/1024 = 324,000` tokens at $0.0214/1000 = **$6.93 each**,
$13.86 total, plus about $0.22 of upscaling.
