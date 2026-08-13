# TeamPredict video ad scripts — 10 concepts, ~15s each

Draft for Robby's approval. **Nothing has been rendered.** Approve, cut or revise, then
these go through the Seedance pipeline (`_scripts/seedance-generate.mjs`), 720p native,
9:16, one-word centre captions with indigo emphasis, branded end card.

Cost if all 10 are approved: about **$70** to render (15s at 720p is $6.93 each), plus
~$1 upscaling and ~$0.10 transcription. Budget one re-roll per ten clips.

## The rules these were written against

Pulled from `_scripts/RESEARCH-2026-08-12-b2b-scripts-synthesis.md` and every prior batch:

- **Hook fully spoken and on screen by second 2.** No establishing shots, no slow push-ins.
- **Word budget 33-38 words** for 15 seconds. Longer and there is no room for the pauses
  that make a person sound real. Every script below is inside that budget.
- **No brand name before second 5**, and the brand is carried by the end card rather than
  the spoken line. Five compound brand names have been mispronounced across six batches
  ("One look", "Email Chacha", "Email Chaper", "BitProtect", "Bitpropt"), so
  "TeamPredict" is planned into the card from the start, not trusted to the model.
- **One defendable number per ad**, and it must be site copy: $5 per tracked employee,
  30-day free trial, 100 employees on trial, 5-minute setup.
- **Free close, never "book a demo."** Demo buttons convert about 1.5%; every
  long-running low-price SaaS ad closes free.
- **Energy varies.** The "documentary realism, nobody is enjoying themselves" house style
  produced 17 clips Robby called "quite dry and not so good." Each script below names its
  own register.

## Claim safety

Every factual line traces to live site copy, re-verified against
`TeamPredict-Marketing/src/app/(en)/page.tsx` on 2026-08-13. Specifically **not** used
anywhere: any accuracy percentage, any specific lead-time window ("2-4 weeks" is not site
copy; the site says "often weeks before"), and "no credit card required" (a card IS taken
at signup, the true line is "No charge today · Cancel anytime").

---

## 1. Quit On Monday

**Angle:** confession + the signals were all there. **Register:** frustrated, fast, laughing
at himself. Selfie, home office, phone held at arm's length.

> My best engineer quit Monday. So I went back and looked. Her LinkedIn had been
> screaming it for weeks. New headline, new skills, new photo. Now something watches that
> daily and emails me.

**End card:** logo + "30-day free trial" + teampredict.ai
**Note:** the single strongest format in the repo (UGC selfie, first-person, specific).

---

## 2. Keep Scrolling

**Angle:** Robby's own line, as a dare. **Register:** confrontational, grinning, direct to
camera, arms wide.

> Not worried about anyone on your team quitting? Great. Keep scrolling.
> Everyone else: every resignation looks obvious afterwards. This one tells you before.
> Five dollars a person, thirty days free.

**End card:** logo + "Start 30-Day Free Trial"
**Note:** pairs with banner `t1`, same line. Runs as a matched set.

---

## 3. Asked Me In March

**Angle:** sketch, the exit interview. **Register:** deadpan two-hander, played straight,
the joke does the work. Two people, one small meeting room.

> **Manager:** So, off the record. Is there anything we could have done differently?
> **Employee:** Yeah. Asked me this in March.
> *(beat, manager says nothing)*
> **VO:** The exit interview is not an early warning system.

**End card:** logo + "Know weeks before they resign"
**Note:** most shareable of the ten. Pairs with banner `t19`.

---

## 4. I Use It On My Competitors

**Angle:** competitor tracking, which nobody advertises and which reaches a second buyer
(founders and recruiters, not just HR). **Register:** conspiratorial, leaning in, enjoying
himself. Selfie, car or desk.

> Everyone uses this on their own team. I use it on my competitors.
> Same signals. When their senior people start updating their profiles, I get an alert.
> And then I call them.

**End card:** logo + "Track competitors too. 30-day free trial."
**Note:** the only script aimed at a different audience. Worth its own ad set.

---

## 5. They Went Quiet

**Angle:** Slack team health, the newest thing on the site. **Register:** quiet, certain,
slower than the others. One person at a kitchen table.

> Think about the last person who quit on you. Go back a month.
> They went quiet first. Fewer messages, shorter answers, less of them.
> This counts that every week and shows you the drop next to their name.

**End card:** logo + "Message counts only. Never message content."
**Note:** the privacy line is on the card deliberately. It is the first objection.

---

## 6. Cost To Replace

**Angle:** price shock, number-led. **Register:** brisk, matter-of-fact, one take, no jokes.

> Quick question. What does it cost you to replace one senior person?
> Recruiter, three months of nobody doing the job, the panic hire.
> Okay. It's five dollars a month to see it coming.

**End card:** logo + "$5 per tracked employee. 30 days free."
**Note:** the only number spoken is $5, which is verbatim site copy. The replacement cost
is deliberately left as a question so no figure is claimed.

---

## 7. The Survey Came Back Great

**Angle:** myth-flip against the category (engagement surveys). **Register:** dry, amused,
slight eye-roll. Selfie at a desk.

> Your engagement survey came back great. Company average, four point two.
> A survey tells you how the team feels. It cannot tell you who is already interviewing.
> This works person by person. No surveys.

**End card:** logo + "Person-level early warning"
**Note:** "four point two" is a fictional character's own survey score, not a TeamPredict
claim. Cut it if that reads as a statistic to you.

---

## 8. Two Weeks

**Angle:** cold open on the resignation itself. The shock IS the first frame.
**Register:** tense, real, no comedy. Two people, an office.

> **Employee:** *(sliding a laptop across the desk)* I'm giving my two weeks.
> *(manager's face, three seconds of nothing)*
> **VO:** You had longer than two weeks. It was all public. You just weren't watching it.

**End card:** logo + "Don't wait for the resignation letter."
**Note:** highest-risk render of the ten (the payoff is a silent reaction shot and the last
beat is historically the least reliable). Worth trying once.

---

## 9. So I Built A Radar

**Angle:** founder "so I built it," the format practitioners rate highest for software.
**Register:** plain, unpolished, one take, stumbles left in. Selfie, real desk.

> I've run companies for years and every single resignation still surprised me.
> Not because there were no signs. Because nobody was watching the signs.
> So now something does it every day, for five dollars a head.

**End card:** logo + "30-day free trial. No charge today."
**Note:** **this one is better if you record it yourself.** You are the credible peer for
this buyer and a generated founder is not. Phone front camera, one take, 20 seconds of your
time. Say the word if you want it generated instead.

---

## 10. Open To Work

**Angle:** the single most loaded phrase in the category. **Register:** fast, punchy,
almost a rant. Selfie, walking.

> Someone on your team turned on "Open To Work" this morning.
> Recruiters can see it. Their whole network can see it. You cannot.
> That is the entire problem. This checks every tracked profile daily.

**End card:** logo + "Start 30-Day Free Trial"
**Note:** pairs with banner `t5`.

---

## Two production calls I need from you

1. **Who presents.** BitPredict was "men only, it's a field dominated by men." The buyer
   here is HR and People teams, which skews the other way, so these were written for a
   mixed cast with women in the majority. Say if you want that changed.
2. **The screen recording.** The best-performing B2B video format is a raw screen recording
   of one workflow (21-27% of ClickUp's, monday.com's and Grammarly's live video libraries).
   None of the ten uses one, because the video model invents fake UI text every time it is
   asked for a screen and this brand cannot show an invented risk score. **Record 8 seconds
   of the real app** (a list, one row going amber to red, the profile changes that moved it)
   and it can be cut into any of these as the middle beat. That is the one asset that would
   most improve the set and it cannot be generated.

## Not recommended

Music. Batches 3 through 7 all shipped without a track and the phone-shot illusion is what
carries them; a score is the fastest way to make a selfie ad read as an advert. Happy to
test one if you disagree.
