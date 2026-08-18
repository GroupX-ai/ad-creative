# Deploy 2026-08-18 — batch 10 to TikTok and Reddit

The eight new BitPredict videos ([batch 10](BATCH-2026-08-18-b10-bitpredict-viral.md)) went
to both surfaces the same day they were made: scheduled organically on TikTok, and loaded
into the live Reddit ad group but left paused.

## TikTok: eight posts, 20 Aug to 4 Sep

Account `BitPredict`, Postiz integration `cmsxwwoci08ehmt0y422p2qqa`, all `DIRECT_POST`,
`video_made_with_ai: true`, duet/stitch/comments on, no music (every clip carries dialogue
and burned captions), 17:00 UTC.

These **fill the gaps** in the nine posts scheduled earlier today rather than extending past
them, so the account posts once a day from 19 August to 4 September instead of every other
day. Register alternates: no two UGC selfies and no two parodies run back to back.

| Date (UTC) | Clip | Register | Postiz post |
|---|---|---|---|
| 08-20 | `c11` The Receipt That Won't Stop | infomercial | `cmsyjch7o000xp70yke2iwzru` |
| 08-23 | `c8` Two AM Whisper | UGC | `cmsyjchb4000yp70yz8dofxc0` |
| 08-26 | `c14` Prove It | courtroom | `cmsyjche4000zp70yxnxtzv1h` |
| 08-29 | `c9` There Is A Link | UGC | `cmsyjchhk0010p70ybwbqhmap` |
| 08-31 | `c13` The Needle | polygraph | `cmsyjchko0011p70ywl7o93a4` |
| 09-02 | `c10` Pulled Over | UGC | `cmsyjcho70012p70ylj9fk3gf` |
| 09-03 | `c12` The Caster Waits | esports booth | `cmsyjchrp0013p70yd2la2vrb` |
| 09-04 | `c15` The Evidence Wall | detective | `cmsyjchuz0014p70y5qas7y4k` |

Captions follow the house pattern: a hook lifted from the clip's own dialogue, one approved
product line, the CTA with `bitpredict.io`, four hashtags.

## Reddit: eight video ads, created PAUSED

Ad group `2569748569803060005` in campaign `2557856106149115257`, created by
[`reddit-launch-bitpredict-b10.mjs`](reddit-launch-bitpredict-b10.mjs).

| Ad | Post | Ad id |
|---|---|---|
| BP C8 two-am-whisper | `t3_1vrlnhs` | `2571253637131036366` |
| BP C9 there-is-a-link | `t3_1vrlnji` | `2571253670820345767` |
| BP C10 pulled-over | `t3_1vrlnl2` | `2571253723197038984` |
| BP C11 receipt-roll | `t3_1vrlnns` | `2571253760661474980` |
| BP C12 caster-waits | `t3_1vrlnpe` | `2571253795707037389` |
| BP C13 the-needle | `t3_1vrlnqv` | `2571253830452484557` |
| BP C14 prove-it | `t3_1vrlnsd` | `2571253882664412213` |
| BP C15 evidence-wall | `t3_1vrlnv2` | `2571253945407184860` |

**Activated 2026-08-18 ~11:50 UTC on Robby's approval ("you can launch the Reddit ads").**
All eight were flipped ACTIVE and moved to `effective_status: PENDING_APPROVAL`, so the next
gate is Reddit's review. Given the landing page's USDT prize copy took out 5 of the original
12 at review, expect some of these eight to be rejected on the same grounds regardless of
the creative.

The paragraph below records why they were built paused in the first place.

**They were paused on purpose.** The campaign is live and the ad group is ACTIVE, so
activating these is a one-line change, but the numbers say it is Robby's call and not an
automatic one. Verified against the Reddit reports API on 2026-08-18:

| 2026-08-15 to 08-17 | |
|---|---|
| Spend | $20.54 |
| Impressions | 1,996 |
| Clicks | 3 |
| CTR | 0.150% |
| **Signups** | **0** |
| Cost per click | $6.85 |

Delivery also fell off a cliff: 928 impressions on the 15th, 1,051 on the 16th, then **17 on
the 17th**. Cause unverified. Creative fatigue across seven surviving ads is the most likely
explanation, in which case eight fresh videos is exactly the right intervention; but a
frequency or bid problem would look the same from here, and the discriminating test is
whether delivery recovers after activation.

**Five of the original twelve ads are rejected** and still are: four `GAMBLING`, one
`FINANCE_AND_CRYPTO_RESTRICTED`. Those rejections do not correlate with ad copy (B3 "What's
your rank?" and B4 "Anyone can be right once" carry no money language at all), because
Reddit is reviewing the landing page, which promises weekly USDT prizes across the hero, the
footer, the pricing section and now a whole `/rewards` page. **Nothing in this batch can fix
that**, so expect a similar rejection rate on the eight regardless of how clean the creative
is. None had a verdict at creation time.

## Media hosting: pin to a commit SHA

The original launch script pins media at `main`, because Reddit fetches the URL itself at
post-creation time and a merged feature branch gets deleted, making a branch URL a launch
that breaks silently later.

This script pins to a **commit SHA** instead, which is strictly better: immutable, survives
the branch being deleted, and does not require the work to be merged before it can run. It
also sidesteps a smaller trap, which is that this branch name contains a slash and is
therefore ambiguous against the file path in a raw GitHub URL.

Reachability was checked with a real `curl` on every media URL before the live run, rather
than assumed.

## Notes for the next run

- Reddit assigns no review verdict at creation while the ad is paused. Whatever the eight
  get will only be visible after activation, so the rejection count has to be re-pulled then.
- The TikTok video-privacy gap is unchanged: the API has no privacy field for video posts, so
  every clip publishes at the account default. That still needs confirming as public in the
  TikTok app.
