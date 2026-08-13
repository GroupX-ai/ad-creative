#!/usr/bin/env python3
"""
Build the single-page review board for the 2026-08-13 TeamPredict paid batch.

One job: Robby scans twenty banners and ten scripts and replies "run t1, t4 and
scripts 2 and 9." So every asset carries its real ID prominently, the images are
the page rather than an illustration of it, and the scripts are readable without
opening a repo.

Images are downscaled to JPEG and inlined as data URIs, because the Artifact CSP
blocks every external host.
"""
import base64
import io
import json
import os

from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
BANNERS = os.path.join(os.path.dirname(BASE), "banners")
FONTS = os.path.join(BASE, "fonts")
OUT = os.path.join(BASE, "review-page.html")

# id, slug, family, headline, sub, ground label
CONCEPTS = [
    ("t1", "keep-scrolling", "minimal", "Not worried about your employees quitting? Keep scrolling.", "Robby's own line.", "near-black"),
    ("t2", "resignation-letter", "minimal", "Don't wait for the resignation letter.", "Verbatim site headline.", "white"),
    ("t3", "already-on-linkedin", "minimal", "Your next resignation is already on LinkedIn.", "", "indigo"),
    ("t4", "which-one", "minimal", "Which one is already looking?", "The risk traffic light, doing the whole job.", "pale indigo"),
    ("t5", "open-to-work", "minimal", "They turned on Open To Work. When do you find out?", "", "amber"),
    ("t6", "go-quiet", "minimal", "People go quiet before they resign.", "Verbatim site headline. Slack team health, brand new.", "white"),
    ("t7", "obvious-in-hindsight", "minimal", "Every resignation is obvious in hindsight.", "", "near-black"),
    ("t8", "two-weeks-notice", "minimal", "Two weeks' notice is not an early warning system.", "", "white"),
    ("t9", "five-dollars", "minimal", "$5", "Price as the whole poster.", "white"),
    ("t10", "hundred-thirty-free", "minimal", "100 employees. 30 days. Free.", "The offer, stated flat.", "indigo"),
    ("t11", "surveys", "minimal", "Surveys tell you how the team feels. Not who is leaving.", "Weakest of the twenty: the split lands mid-word.", "split"),
    ("t12", "no-surveys-five-minutes", "minimal", "No surveys. No HRIS. Five minutes.", "", "pale indigo"),
    ("t13", "competitor-radar", "minimal", "Point the same radar at your competitors.", "Verbatim site headline. Reaches founders and recruiters, not HR.", "near-black"),
    ("t14", "their-best-people", "minimal", "Their best people send the same signals.", "", "pale indigo"),
    ("t15", "time-capsule", "minimal", "Every edit. Every skill. Every headline pivot.", "", "white"),
    ("t16", "panic-hiring", "minimal", "Panic hiring starts the day they quit. It doesn't have to.", "", "red"),
    ("t17", "sticky-note", "native", "check linkedin before 1:1s", "Sticky note on a laptop bezel.", "photo"),
    ("t18", "whiteboard", "native", "who is leaving next quarter? / we always find out last", "Office whiteboard.", "photo"),
    ("t19", "office-notice", "native", "Reminder: the exit interview is not an early warning system / we know", "Printed notice, handwritten reply.", "photo"),
    ("t20", "napkin", "native", "everyone said they were fine in the survey / then they quit", "Cafe napkin.", "photo"),
]

SCRIPTS = [
    ("1", "Quit On Monday", "confession", "frustrated, fast, laughing at himself. Selfie, home office.",
     ["My best engineer quit Monday. So I went back and looked. Her LinkedIn had been screaming it for weeks.",
      "New headline, new skills, new photo. Now something watches that daily and emails me."],
     "30-day free trial", "The strongest format in the repo: first-person, specific, unpolished."),
    ("2", "Keep Scrolling", "dare", "confrontational, grinning, direct to camera.",
     ["Not worried about anyone on your team quitting? Great. Keep scrolling.",
      "Everyone else: every resignation looks obvious afterwards. This one tells you before.",
      "Five dollars a person, thirty days free."],
     "Start 30-Day Free Trial", "Runs as a matched set with banner t1, same line."),
    ("3", "Asked Me In March", "sketch", "deadpan two-hander, played straight. One meeting room.",
     ["MANAGER: So, off the record. Is there anything we could have done differently?",
      "EMPLOYEE: Yeah. Asked me this in March.",
      "(beat, manager says nothing)",
      "VO: The exit interview is not an early warning system."],
     "Know weeks before they resign", "Most shareable of the ten. Pairs with banner t19."),
    ("4", "I Use It On My Competitors", "conspiratorial", "leaning in, enjoying himself. Selfie, car or desk.",
     ["Everyone uses this on their own team. I use it on my competitors.",
      "Same signals. When their senior people start updating their profiles, I get an alert.",
      "And then I call them."],
     "Track competitors too. 30-day free trial.", "The only script aimed at a different buyer. Worth its own ad set."),
    ("5", "They Went Quiet", "quiet, certain", "slower than the others. Kitchen table.",
     ["Think about the last person who quit on you. Go back a month.",
      "They went quiet first. Fewer messages, shorter answers, less of them.",
      "This counts that every week and shows you the drop next to their name."],
     "Message counts only. Never message content.", "The privacy line is on the card deliberately: it is the first objection."),
    ("6", "Cost To Replace", "brisk, matter-of-fact", "one take, no jokes.",
     ["Quick question. What does it cost you to replace one senior person?",
      "Recruiter, three months of nobody doing the job, the panic hire.",
      "Okay. It's five dollars a month to see it coming."],
     "$5 per tracked employee. 30 days free.", "Replacement cost stays a question, so no figure is claimed."),
    ("7", "The Survey Came Back Great", "dry, amused", "slight eye-roll. Selfie at a desk.",
     ["Your engagement survey came back great. Company average, four point two.",
      "A survey tells you how the team feels. It cannot tell you who is already interviewing.",
      "This works person by person. No surveys."],
     "Person-level early warning", "“Four point two” is the character's own score, not a TeamPredict claim. Cut it if it reads as a statistic."),
    ("8", "Two Weeks", "tense, real", "no comedy. Two people, an office.",
     ["EMPLOYEE (sliding a laptop across the desk): I'm giving my two weeks.",
      "(manager's face, three seconds of nothing)",
      "VO: You had longer than two weeks. It was all public. You just weren't watching it."],
     "Don't wait for the resignation letter.", "Highest-risk render of the ten: the payoff is a silent reaction shot."),
    ("9", "So I Built A Radar", "plain, unpolished", "one take, stumbles left in. Real desk.",
     ["I've run companies for years and every single resignation still surprised me.",
      "Not because there were no signs. Because nobody was watching the signs.",
      "So now something does it every day, for five dollars a head."],
     "30-day free trial. No charge today.", "Better if you record this one yourself. You are the credible peer here and a generated founder is not."),
    ("10", "Open To Work", "fast, punchy", "almost a rant. Selfie, walking.",
     ["Someone on your team turned on “Open To Work” this morning.",
      "Recruiters can see it. Their whole network can see it. You cannot.",
      "That is the entire problem. This checks every tracked profile daily."],
     "Start 30-Day Free Trial", "Pairs with banner t5."),
]

SHAPE_W = {"square": 760, "landscape": 900, "vertical": 430}


def data_uri(path: str, width: int, quality: int = 82) -> str:
    img = Image.open(path).convert("RGB")
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def font_uri(name: str) -> str:
    with open(os.path.join(FONTS, name), "rb") as fh:
        return "data:font/ttf;base64," + base64.b64encode(fh.read()).decode()


def build():
    frames = {}
    for cid, slug, *_ in CONCEPTS:
        for shape, w in SHAPE_W.items():
            p = os.path.join(BANNERS, f"teampredict-{cid}-{slug}-{shape}.png")
            if os.path.exists(p):
                frames.setdefault(cid, {})[shape] = data_uri(p, w)

    cards = []
    for cid, slug, family, headline, note, ground in CONCEPTS:
        shapes = frames.get(cid, {})
        if not shapes:
            continue
        order = [s for s in ("square", "landscape", "vertical") if s in shapes]
        figs = "".join(
            f'<figure class="frame frame--{s}" data-shape="{s}">'
            f'<img src="{shapes[s]}" alt="{cid} {slug}, {s}" loading="lazy" decoding="async">'
            f'<figcaption>{s}</figcaption></figure>'
            for s in order
        )
        cards.append(
            f'<article class="card" id="{cid}">'
            f'<header class="card__head">'
            f'<span class="chip chip--{family}">{cid}</span>'
            f'<h3>{headline}</h3>'
            f'<p class="ground">{ground}</p>'
            f'</header>'
            f'<div class="frames">{figs}</div>'
            + (f'<p class="note">{note}</p>' if note else "")
            + "</article>"
        )

    script_cards = []
    for num, title, angle, register, lines, endcard, note in SCRIPTS:
        body = "".join(f"<p>{l}</p>" for l in lines)
        script_cards.append(
            f'<article class="script" id="s{num}">'
            f'<header class="script__head">'
            f'<span class="chip chip--script">{num}</span>'
            f'<h3>{title}</h3>'
            f'<p class="meta"><b>{angle}</b> &middot; {register}</p>'
            f'</header>'
            f'<div class="lines">{body}</div>'
            f'<p class="endcard"><span>End card</span>{endcard}</p>'
            f'<p class="note">{note}</p>'
            "</article>"
        )

    html = TEMPLATE.format(
        jakarta_xb=font_uri("PlusJakartaSans-ExtraBold.ttf"),
        jakarta_b=font_uri("PlusJakartaSans-Bold.ttf"),
        serif_r=font_uri("SourceSerif4-Regular.ttf"),
        serif_sb=font_uri("SourceSerif4-SemiBold.ttf"),
        cards="".join(cards),
        scripts="".join(script_cards),
    )
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"{OUT}  {os.path.getsize(OUT)/1048576:.2f} MB")


TEMPLATE = """<title>TeamPredict Launch Creative</title>
<style>
@font-face{{font-family:"Jakarta";src:url({jakarta_xb}) format("truetype");font-weight:800;font-display:block}}
@font-face{{font-family:"Jakarta";src:url({jakarta_b}) format("truetype");font-weight:700;font-display:block}}
@font-face{{font-family:"SSerif";src:url({serif_r}) format("truetype");font-weight:400;font-display:swap}}
@font-face{{font-family:"SSerif";src:url({serif_sb}) format("truetype");font-weight:600;font-display:swap}}

:root{{
  --ink:#0D0120; --paper:#FBFAFD; --surface:#FFFFFF; --line:#E4E1EE;
  --text:#160A2B; --mute:#6B6480; --indigo:#4B56FF; --accent-on:#4B56FF;
  --green:#1EA85C; --amber:#B87200; --red:#D6392F;
  --chip-ink:#FFFFFF; --shadow:0 1px 2px rgba(13,1,32,.06),0 12px 32px -18px rgba(13,1,32,.28);
}}
@media (prefers-color-scheme:dark){{
  :root:not([data-theme="light"]){{
    --paper:#0A0117; --surface:#150A28; --line:#2A1D42; --text:#EDEAF6;
    --mute:#9A93AE; --accent-on:#A8AEFF;
    --green:#3DD07F; --amber:#FFB340; --red:#FF6B60;
    --shadow:0 1px 2px rgba(0,0,0,.5),0 16px 40px -20px rgba(0,0,0,.8);
  }}
}}
:root[data-theme="dark"]{{
  --paper:#0A0117; --surface:#150A28; --line:#2A1D42; --text:#EDEAF6;
  --mute:#9A93AE; --accent-on:#A8AEFF;
  --green:#3DD07F; --amber:#FFB340; --red:#FF6B60;
  --shadow:0 1px 2px rgba(0,0,0,.5),0 16px 40px -20px rgba(0,0,0,.8);
}}

*{{box-sizing:border-box}}
body{{
  margin:0;background:var(--paper);color:var(--text);
  font-family:"SSerif",Georgia,serif;font-size:17px;line-height:1.6;
  -webkit-font-smoothing:antialiased;
}}
.wrap{{max-width:1180px;margin:0 auto;padding:0 24px 96px}}
h1,h2,h3,.chip,.ground,figcaption,.meta,.endcard span,.stat b,.tabs button{{font-family:"Jakarta",system-ui,sans-serif}}

/* ---------- masthead ---------- */
header.top{{padding:64px 0 36px;border-bottom:1px solid var(--line)}}
.dots{{display:flex;gap:9px;margin-bottom:26px}}
.dots i{{width:13px;height:13px;border-radius:50%;display:block}}
.dots i:nth-child(1){{background:var(--green)}}
.dots i:nth-child(2){{background:var(--amber)}}
.dots i:nth-child(3){{background:var(--red)}}
h1{{font-weight:800;font-size:clamp(2.3rem,6vw,4rem);line-height:1.02;letter-spacing:-.03em;margin:0;text-wrap:balance}}
.dek{{max-width:62ch;margin:20px 0 0;color:var(--mute);font-size:1.12rem}}
.stats{{display:flex;flex-wrap:wrap;gap:14px;margin-top:32px}}
.stat{{border:1px solid var(--line);background:var(--surface);border-radius:2px;padding:12px 18px;min-width:150px}}
.stat b{{display:block;font-weight:800;font-size:1.5rem;letter-spacing:-.02em;font-variant-numeric:tabular-nums}}
.stat span{{display:block;color:var(--mute);font-size:.83rem;line-height:1.35;margin-top:3px}}

.flag{{margin-top:30px;border-left:3px solid var(--red);background:var(--surface);
  border-top:1px solid var(--line);border-right:1px solid var(--line);border-bottom:1px solid var(--line);
  padding:16px 20px}}
.flag b{{font-family:"Jakarta",sans-serif;font-weight:800}}

/* ---------- sections ---------- */
section{{padding-top:60px}}
.sec-head{{display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:8px}}
h2{{font-weight:800;font-size:clamp(1.5rem,3.4vw,2.1rem);letter-spacing:-.025em;margin:0}}
.sec-head p{{margin:0;color:var(--mute);font-size:.95rem}}
.sec-note{{color:var(--mute);max-width:66ch;margin:0 0 30px}}

/* ---------- banner cards ---------- */
.grid{{display:grid;gap:26px;grid-template-columns:repeat(auto-fill,minmax(330px,1fr))}}
.card{{background:var(--surface);border:1px solid var(--line);border-radius:2px;
  box-shadow:var(--shadow);padding:20px;display:flex;flex-direction:column;gap:14px;scroll-margin-top:20px}}
.card__head{{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;align-items:start}}
.chip{{grid-row:span 2;font-weight:800;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;
  color:var(--chip-ink);background:var(--indigo);padding:5px 10px;border-radius:2px;
  font-variant-numeric:tabular-nums;align-self:start}}
.chip--native{{background:var(--ink)}}
:root[data-theme="dark"] .chip--native{{background:#3B2A5C}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]) .chip--native{{background:#3B2A5C}}}}
.chip--script{{background:var(--indigo)}}
.card__head h3{{margin:0;font-size:1.02rem;font-weight:800;letter-spacing:-.015em;line-height:1.3;text-wrap:balance}}
.ground{{margin:0;grid-column:2;color:var(--mute);font-size:.76rem;text-transform:uppercase;letter-spacing:.08em}}
.frames{{display:flex;flex-direction:column;gap:12px}}
.frame{{margin:0}}
.frame img{{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:2px}}
.frame--vertical img{{max-width:210px}}
figcaption{{margin-top:5px;color:var(--mute);font-size:.7rem;text-transform:uppercase;letter-spacing:.1em}}
.note{{margin:0;color:var(--mute);font-size:.9rem;border-top:1px solid var(--line);padding-top:12px}}

/* ---------- scripts ---------- */
.scripts{{display:grid;gap:22px;grid-template-columns:repeat(auto-fill,minmax(380px,1fr))}}
.script{{background:var(--surface);border:1px solid var(--line);border-radius:2px;
  box-shadow:var(--shadow);padding:22px;display:flex;flex-direction:column;gap:14px;scroll-margin-top:20px}}
.script__head{{display:grid;grid-template-columns:auto 1fr;gap:5px 12px;align-items:start}}
.script__head h3{{margin:0;font-size:1.15rem;font-weight:800;letter-spacing:-.02em}}
.meta{{grid-column:2;margin:0;color:var(--mute);font-size:.78rem;text-transform:uppercase;letter-spacing:.05em}}
.meta b{{color:var(--accent-on);font-weight:700}}
.lines{{border-left:2px solid var(--indigo);padding-left:18px;display:flex;flex-direction:column;gap:10px}}
.lines p{{margin:0;font-size:1.06rem;line-height:1.55}}
.endcard{{margin:0;font-size:.95rem}}
.endcard span{{display:inline-block;font-size:.68rem;text-transform:uppercase;letter-spacing:.11em;
  color:var(--mute);margin-right:10px}}

/* ---------- asks ---------- */
.asks{{margin-top:24px;display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}}
.ask{{border:1px solid var(--line);border-left:3px solid var(--indigo);background:var(--surface);padding:18px 20px}}
.ask h3{{margin:0 0 6px;font-size:1rem;font-weight:800}}
.ask p{{margin:0;color:var(--mute);font-size:.95rem}}

footer{{margin-top:72px;padding-top:24px;border-top:1px solid var(--line);color:var(--mute);font-size:.87rem}}
a{{color:var(--accent-on)}}
:focus-visible{{outline:2px solid var(--indigo);outline-offset:3px}}
@media (prefers-reduced-motion:reduce){{*{{animation:none!important;transition:none!important}}}}
</style>

<div class="wrap">
  <header class="top">
    <div class="dots" aria-hidden="true"><i></i><i></i><i></i></div>
    <h1>Twenty banners, ten scripts.</h1>
    <p class="dek">TeamPredict launch creative for Meta, Google and Reddit. Every banner below is
      upload-ready. None of the scripts has been rendered yet: approve or revise them and they go
      into production. Reply by ID.</p>
    <div class="stats">
      <div class="stat"><b>20</b><span>banner concepts</span></div>
      <div class="stat"><b>33</b><span>frames, square / landscape / vertical</span></div>
      <div class="stat"><b>$7.40</b><span>spent on the whole banner set</span></div>
      <div class="stat"><b>10</b><span>scripts, ~15s, unrendered</span></div>
      <div class="stat"><b>$0</b><span>spent on video so far</span></div>
    </div>
    <p class="flag"><b>Reddit is not waiting for a conversion any more.</b> The
      <code>sign_up</code> pixel fired on 12 August, which was the exact gate. No click-based
      campaign needed. What is still blocking it is the payment card: the funding instrument reads
      <i>not servable</i>, so the $300/month campaign shell cannot spend.</p>
  </header>

  <section>
    <div class="sec-head"><h2>Banners</h2><p>t1&ndash;t16 bold minimal &middot; t17&ndash;t20 native</p></div>
    <p class="sec-note">Sixteen are one flat colour field and one idea, which is what
      &ldquo;elegant and minimalistic&rdquo; means when it still has to stop a scroll. Four are the
      native/organic family you called best by far on VoiceDrop.</p>
    <div class="grid">{cards}</div>
  </section>

  <section>
    <div class="sec-head"><h2>Video scripts</h2><p>~15 seconds each &middot; nothing rendered</p></div>
    <p class="sec-note">Roughly $70 to render all ten, $0 to read them first. Word budgets are held
      to 33&ndash;38 words so there is room for the pauses that make a person sound real. The brand
      name is carried by the end card rather than the spoken line, because five compound brand names
      have been mispronounced across six batches.</p>
    <div class="scripts">{scripts}</div>

    <div class="asks">
      <div class="ask">
        <h3>Who presents?</h3>
        <p>BitPredict was men only, because crypto is. The buyer here is HR and People teams, which
          skews the other way, so these were written for a mixed cast with women in the majority.
          Say if you want that changed.</p>
      </div>
      <div class="ask">
        <h3>Can you screen-record 8 seconds of the app?</h3>
        <p>A raw screen recording of one real workflow is the best-performing B2B video format there
          is. None of the ten uses one, because the model invents fake risk scores and employee names
          every time it is asked for a screen. It has to be captured by a human. It would slot into
          any of these as the middle beat.</p>
      </div>
    </div>
  </section>

  <footer>
    Claims re-verified against the live site on 13 August. No accuracy percentage, no invented
    lead-time window, no &ldquo;no credit card required&rdquo; (a card is taken at signup), no
    product screens, no LinkedIn or Slack logos. The brand mark is composited from the marketing
    repo&rsquo;s own logo file rather than drawn by the model.
  </footer>
</div>
"""

if __name__ == "__main__":
    build()
