# Emailchaser scroll-stopper batch (2026-08-10)

Twelve new concepts, 27 upload-ready assets, built after Robby asked to "go nuts... wild, disruptive, scroll stopping" and to test a lot at once. Generated with fal `openai/gpt-image-2` (quality high, ~$0.20/image) per the recipe and guardrails in the www repo's `AD_CREATIVE_PLAYBOOK.md`. Roughly $6.40 of renders including three re-rolls.

**Nothing here is live.** These are assets only: no campaign, ad set, or ad was created or edited for this batch. Picking winners and launching is a separate, deliberate step.

## What the batch is aimed at

Two things from the live account drove the concept selection, not taste:

1. **The winner so far is anti-ad creative.** C9 "A Receipt For Being Ignored" ran at 2.59-3.00% CTR against a pack sitting around 1.4%. It was the only photoreal physical object in the set. So half this batch is photoreal or deliberately unpolished (mailbox wall, velvet rope, parking meters, sticky note, server rack) rather than SaaS-banner styling.
2. **The account is buying the wrong people.** The 08-03 diagnosis in the vault: ad-driven signups convert at 0.7% against 15.1% organic, and incremental business-domain signups are flat. The lever is audience, not price. Creative can help by self-selecting: C11 names the buyer outright ("AGENCIES. SALES TEAMS. GTM."), C12 actively disqualifies everyone else ("If You Don't Send Cold Email, Scroll On."), and the batch avoids lead-finding and email-lookup angles entirely, since that is the exact consumer crowd the funnel cannot monetise at ads prices.

## What shipped

| Concept | Files | Lens | On-image copy |
|---|---|---|---|
| **C11 AGENCIES. SALES TEAMS. GTM.** | square, landscape, vertical | audience filter, typographic | "AGENCIES. SALES TEAMS. GTM." / "Private sequencer. Unlimited senders, one fixed cost." / START FOR FREE |
| **C12 Scroll On** | square, landscape, vertical | disqualifier, editorial | "If You Don't Send Cold Email, Scroll On." / "Cold email that lands in primary." / START FOR FREE |
| **C13 Price tag** | square, landscape, vertical | photoreal object | "Unlimited Senders. One Fixed Cost." / "Cold email that lands in primary." / START FOR FREE |
| **C14 One inbox** | square, landscape | product truth, split visual | "One Inbox Can't Carry Your Pipeline." / "Scale with unlimited accounts." / START FOR FREE |
| **C15 Velvet rope** | square, landscape, vertical | cinematic metaphor | "Most Cold Email Never Gets In." / "Cold email that lands in primary." / START FOR FREE |
| **C16 Sticky note** | square, vertical | native / unpolished | "STOP SENDING FROM ONE INBOX" (handwritten) / "Unlimited senders, one fixed cost." / START FOR FREE |
| **C17 RE:** | square, landscape, vertical | minimal typographic | "RE:" / "Cold email that lands in primary." / START FOR FREE |
| **C18 Radar** | square, landscape | scale / deliverability | "Thousands A Day. Not The Spam Folder." / "Send thousands of emails each day, without going to spam." / START FOR FREE |
| **C19 AI personalization** | square | product truth, photoreal | "Use AI To Personalize Emails." / "Private sequencer for agencies and sales teams." / START YOUR 7-DAY FREE TRIAL |
| **C20 Calendar** | square | outcome | "Consistently Book More Meetings." / "Cold email that lands in primary." / START FOR FREE |
| **C21 Parking meters** | square, landscape | pricing metaphor, photoreal | "Senders Go Up. The Bill Doesn't." / "Unlimited accounts, unlimited leads, unlimited emails." / START YOUR 7-DAY FREE TRIAL |
| **C22 Server rack** | square, landscape | deliverability mechanic | "Rotate Senders. Land In Primary." / "Unlimited senders, one fixed cost." / START FOR FREE |

Sizes follow the playbook: square 1024x1024 (Meta feed, Reddit), landscape 1200x628 (Meta link ads, Google responsive display), vertical 1080x1920 (Stories/Reels, still the account's biggest placement gap). Landscapes render at 1200x624 and verticals at 1088x1920 because gpt-image-2 requires multiples of 16; both are resized to spec on delivery.

## Claim safety

Every headline and subline is a verbatim line or verbatim fragment from the approved copy bank in `AD_CREATIVE_PLAYBOOK.md`. No invented stats, no deliverability percentages, no customer counts, no third-party logos, no testimonials.

Two guardrails from earlier batches were deliberately honoured:

- **No A/B testing claim anywhere in this batch.** The standing rule from 2026-07-29 is that the $1 offer lands on Starter, which is capped at 5 subject-line variants, so no ad selling that offer may promise 10. The simplest way not to trip it again was to leave subject-line variants out entirely.
- **No lead-count or email-finder angle.** "200M verified leads" already ships as C10; repeating it here would pull more of the consumer people-search traffic the 08-03 analysis identified as unmonetisable.

Two concepts carry a judgement call worth knowing about before launch:

- **C12 "If You Don't Send Cold Email, Scroll On."** deliberately tells most of the audience to leave. That is the point (it is an audience filter aimed at the 0.7%-conversion problem), but it will depress CTR by design. Judge it on cost per business-domain signup, not on click-through rate.
- **C15 "Most Cold Email Never Gets In."** has the same half-second misread risk already flagged on C6: skimmed, it can read as an argument against cold email, and only the subline resolves it. Same mitigation applies: watch comment sentiment in week one, especially on Reddit where ads take comments by default.

## Review notes (all 27 reviewed at full size)

Every render was inspected at full resolution for spelling, stray text, invented claims and brand colour. Twenty-four passed first time. Three failed and were re-rolled:

1. **C12 square** put a stray apostrophe after "Scroll". Fixed by specifying the exact punctuation count in the prompt ("exactly one apostrophe, in the word Don't, and exactly one comma, immediately after the word Email").
2. **C13 landscape and vertical** printed text on the blank price tag. The vertical rendered **"1179FC"**, which is the brand hex `#1179FC` leaking out of the prompt and onto the creative as visible content. The landscape stamped invented numbers on the mailbox doors, some of them garbled.
3. **C18 landscape** invented a logo glyph, a blue swoosh, next to the wordmark. Fabricated logos are a known defect here: the 2026-08-01 Reddit ad built from a render with a fabricated logo is still paused for exactly this.

**New guardrail, worth adding to the playbook.** Two sentences now close both failure modes and are carried in every prompt in `prompts.json`:

> Never render a hex colour code, a colour name or any stray digits as visible text in the image; hex codes are instructions to you, not content. The word "emailchaser" appears as plain lowercase text only, with no logo symbol, icon, badge, swoosh or glyph beside it.

Note that 22 of the 27 delivered renders were produced *before* those two sentences were added, and passed review on inspection rather than by construction. The prompts stored in `prompts.json` are the corrected final versions, so a re-render of any concept starts from the stronger constraint.

## Prompts

`prompts.json` holds, for every delivered file, the concept, lens, exact on-image copy, delivered size and the full generation prompt. Prompts vary between shapes only in the leading shape phrase ("square", "wide landscape", "tall vertical 9:16 full-screen") and the composition sentence.

## Suggested test order, if these go live

Not launched, and this is a recommendation rather than a decision:

1. **C11 and C12 first**, as the audience-filter pair. They are the only two concepts that attack the diagnosed targeting problem directly, and they are cheap to read: if cost per business-domain signup does not improve, creative is not the lever and the rebuild has to stay on targeting.
2. **C13, C15, C16, C21** next, as the photoreal/anti-ad block that follows the one real signal in the account (C9's 3% CTR).
3. **C17 RE:** as the thumbnail test. One enormous piece of type at feed scale, the same property that made C5 PRIMARY the best thumbnail of the last batch.
4. **The six verticals** unlock Stories and Reels, which the account has never run. That is a placement gap, not a creative test, and it should be judged separately.
