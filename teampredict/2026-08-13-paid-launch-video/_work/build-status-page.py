#!/usr/bin/env python3
"""Build the launch-status artifact for Robby.

A dashboard, not a document: he scans it, sees what is live, sees the two things
only he can unblock, and can reply "kill v5" or "raise Reddit to $15". So state
is encoded in form as well as words (a coloured pill and a rail per platform),
the summary sits above the detail, and the two asks are the loudest block on the
page after the status strip.

Everything is inlined: the artifact CSP blocks every external host, so the brand
face and all six thumbnails become data URIs.
"""

import base64
import io
import os
from PIL import Image

ROOT = "/home/user/ad-creative"
FONTS = f"{ROOT}/teampredict/2026-08-13-paid-launch/_work/fonts"
THUMBS = f"{ROOT}/teampredict/2026-08-13-paid-launch-video/thumbnails"
OUT = f"{ROOT}/teampredict/2026-08-13-paid-launch-video/_work/status-page.html"


def font_uri(name):
    with open(f"{FONTS}/{name}", "rb") as fh:
        return f"data:font/ttf;base64,{base64.b64encode(fh.read()).decode()}"


def thumb_uri(slug):
    im = Image.open(f"{THUMBS}/teampredict-{slug}-thumb.png").convert("RGB")
    buf = io.BytesIO()
    im.resize((360, int(360 * im.height / im.width)), Image.LANCZOS).save(
        buf, "JPEG", quality=80, optimize=True
    )
    return f"data:image/jpeg;base64,{base64.b64encode(buf.getvalue()).decode()}"


# (slug, number, title, approved?, register, the spoken script, why it works)
ADS = [
    ("v1-keep-scrolling", "v1", "Keep Scrolling", True,
     "UGC selfie · smug to dawning horror",
     "Not worried about anyone quitting? Great. Keep scrolling. Mine's fine. New headshot. "
     "New skills. Says he's been networking a lot. …Networking a lot. "
     "I'm gonna go check something.",
     "Your own banner line, but he takes his own dare and loses it on camera. Every reason "
     "he is not worried is a red flag, so the ad teaches the signal list while being a joke."),
    ("v2-two-weeks", "v2", "Two Weeks", True,
     "office two-hander · earnest panic",
     "— I'm giving my two weeks.\n— What if we got you a standing desk?\n"
     "— …Two standing desks.\n— I did not see that coming.",
     "The manager does not react with shock, he starts negotiating with furniture. "
     "“I did not see that coming” is the whole pitch, said by the man who should have."),
    ("v3-open-to-work", "v3", "Open To Work", True,
     "nature documentary parody · whispered",
     "Here we observe the manager in his natural habitat. Behind him, three of his herd have "
     "quietly switched on ‘Open To Work’. Recruiters can see it. His network can see it. "
     "He cannot.",
     "The joke is that everyone can see the badge except the person it concerns, so the format "
     "is literally about watching someone who does not know he is watched. The model put him "
     "crouching on the office carpet, which I did not write."),
    ("v4-pizza-party", "v4", "Pizza Party", False,
     "office kitchen · cheerful, then nothing",
     "— Team! Pizza!\n— Because you're all valued, and nobody is going anywhere.\n"
     "— I accepted another offer this morning.\n— …Do you still want pizza?",
     "The most-repeated joke among the people who buy this. Needs no setup, no product "
     "knowledge and no explanation, which makes it the most shareable of the six."),
    ("v5-psychic", "v5", "The Psychic", False,
     "format parody · theatrical, then flat",
     "— Will anyone on my team quit?\n— I see a new profile photo. I see fresh skills.\n"
     "— Have you tried just looking at their LinkedIn? …Or TeamPredict. Five dollars a person.",
     "The premise is the pitch: she pays for information that was public the whole time, and "
     "the fortune teller is the one who points it out. The sceptic delivers the close."),
    ("v6-my-competitors", "v6", "I Use It On My Competitors", False,
     "UGC selfie in a car · gleeful",
     "Everyone uses this on their own team. I use it on my competitors. Their senior people "
     "start polishing their profiles, I get an email. And then I call them. Before they've "
     "told their boss.",
     "The only one aimed at a different buyer: founders and recruiters, not HR. Same signals "
     "that frighten you about your own team delight you about theirs. Nothing in the category "
     "advertises this."),
]

PLATFORMS = [
    ("Reddit", "live", "Live",
     "12 ads running: 6 banners, 6 videos. Optimising for the free-trial signup against the "
     "pixel, targeting 11 buyer-side subreddits. All 12 are in Reddit's ad review now, which "
     "is normal and usually clears within hours.",
     "$8.00/day", "~$243/mo"),
    ("Meta", "blocked", "Needs your card",
     "Campaign, ad set and 7 creatives are built and waiting. Meta refuses to create the ads "
     "themselves because the ad account's card is declined. Everything else is done: one "
     "re-run creates all 13 ads the moment billing clears.",
     "$13.00/day", "~$395/mo"),
    ("Google", "held", "No new campaign",
     "Two search campaigns already running; I cut their budgets into the pool. No new creative "
     "went up, on purpose — see below.",
     "$13.00/day cap", "~$226/mo actual"),
]

css = f"""
@font-face {{ font-family:'Jakarta'; src:url('{font_uri("PlusJakartaSans-Bold.ttf")}') format('truetype'); font-weight:700; font-display:swap; }}
@font-face {{ font-family:'Jakarta'; src:url('{font_uri("PlusJakartaSans-ExtraBold.ttf")}') format('truetype'); font-weight:800; font-display:swap; }}

:root {{
  --ink:#0D0120; --body:#3a3350; --muted:#6b647f;
  --bg:#f7f7fb; --card:#ffffff; --line:#e4e2ee;
  --indigo:#4B56FF; --indigo-soft:#ecedff;
  --live:#15803d; --live-bg:#e7f6ec;
  --blocked:#b45309; --blocked-bg:#fdf1e0;
  --held:#6b647f; --held-bg:#eeedf4;
}}
@media (prefers-color-scheme: dark) {{
  :root:not([data-theme="light"]) {{
    --ink:#f4f3f8; --body:#c3bed4; --muted:#8f88a5;
    --bg:#0b0117; --card:#150929; --line:#2a1d42;
    --indigo:#8f97ff; --indigo-soft:#1e1640;
    --live:#5fd08a; --live-bg:#0f2c1c;
    --blocked:#f3b562; --blocked-bg:#2f2110;
    --held:#8f88a5; --held-bg:#211735;
  }}
}}
:root[data-theme="dark"] {{
  --ink:#f4f3f8; --body:#c3bed4; --muted:#8f88a5;
  --bg:#0b0117; --card:#150929; --line:#2a1d42;
  --indigo:#8f97ff; --indigo-soft:#1e1640;
  --live:#5fd08a; --live-bg:#0f2c1c;
  --blocked:#f3b562; --blocked-bg:#2f2110;
  --held:#8f88a5; --held-bg:#211735;
}}

*{{box-sizing:border-box}}
body{{
  margin:0; background:var(--bg); color:var(--body);
  font-family:'Jakarta',system-ui,-apple-system,'Segoe UI',sans-serif;
  font-weight:700; line-height:1.55; -webkit-font-smoothing:antialiased;
}}
.wrap{{max-width:1000px;margin:0 auto;padding:44px 22px 80px}}
h1,h2,h3{{color:var(--ink);font-weight:800;text-wrap:balance;margin:0}}
h1{{font-size:clamp(30px,5vw,46px);letter-spacing:-.025em;line-height:1.08}}
h2{{font-size:22px;letter-spacing:-.015em;margin:52px 0 16px}}
h3{{font-size:17px;letter-spacing:-.01em}}
p{{margin:0 0 12px}}
.eyebrow{{
  font-size:12px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--indigo);margin:0 0 12px
}}
.lede{{font-size:17px;color:var(--body);max-width:62ch;margin-top:14px}}

/* status strip */
.strip{{display:grid;gap:14px;margin-top:30px}}
@media(min-width:760px){{.strip{{grid-template-columns:repeat(3,1fr)}}}}
.plat{{
  background:var(--card);border:1px solid var(--line);border-radius:14px;
  padding:18px 18px 16px;border-top:4px solid var(--rail)
}}
.plat.live{{--rail:var(--live)}}
.plat.blocked{{--rail:var(--blocked)}}
.plat.held{{--rail:var(--held)}}
.plat-top{{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}}
.pill{{
  font-size:11px;letter-spacing:.06em;text-transform:uppercase;
  padding:4px 10px;border-radius:999px;white-space:nowrap
}}
.live .pill{{background:var(--live-bg);color:var(--live)}}
.blocked .pill{{background:var(--blocked-bg);color:var(--blocked)}}
.held .pill{{background:var(--held-bg);color:var(--held)}}
.plat p{{font-size:14px;color:var(--body);margin:0}}
.spend{{
  margin-top:14px;padding-top:12px;border-top:1px solid var(--line);
  display:flex;justify-content:space-between;gap:8px;
  font-size:14px;color:var(--ink);font-variant-numeric:tabular-nums
}}
.spend span:last-child{{color:var(--muted)}}

/* asks */
.asks{{
  background:var(--indigo-soft);border:1px solid var(--line);
  border-radius:14px;padding:22px 24px;margin-top:34px
}}
.asks h2{{margin:0 0 6px;font-size:19px}}
.asks ol{{margin:14px 0 0;padding-left:20px}}
.asks li{{margin-bottom:12px;color:var(--body)}}
.asks li:last-child{{margin-bottom:0}}
.asks b{{color:var(--ink)}}

/* ads */
.ads{{display:grid;gap:18px}}
@media(min-width:700px){{.ads{{grid-template-columns:1fr 1fr}}}}
.ad{{
  background:var(--card);border:1px solid var(--line);border-radius:14px;
  overflow:hidden;display:flex;flex-direction:column
}}
.ad img{{width:100%;max-width:100%;display:block;aspect-ratio:9/16;object-fit:cover;object-position:center 28%}}
.ad-body{{padding:16px 18px 18px}}
.ad-top{{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin-bottom:3px}}
.num{{color:var(--indigo);font-size:13px;font-variant-numeric:tabular-nums}}
.tag{{
  font-size:10px;letter-spacing:.07em;text-transform:uppercase;
  padding:3px 8px;border-radius:999px;background:var(--indigo-soft);color:var(--indigo)
}}
.reg{{font-size:12px;color:var(--muted);margin:0 0 12px}}
.script{{
  font-size:14px;color:var(--ink);white-space:pre-line;
  padding:12px 14px;background:var(--bg);border-radius:9px;
  border-left:3px solid var(--indigo);margin:0 0 12px
}}
.why{{font-size:13.5px;color:var(--body);margin:0}}

/* notes */
.note{{
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;padding:20px 22px;margin-top:16px
}}
.note h3{{margin-bottom:8px}}
.note p{{font-size:14.5px;margin-bottom:0}}
.note p + p{{margin-top:10px}}
.tablewrap{{overflow-x:auto;-webkit-overflow-scrolling:touch}}
table{{border-collapse:collapse;width:100%;min-width:420px;font-size:14px}}
th,td{{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line)}}
th{{color:var(--muted);font-size:12px;letter-spacing:.06em;text-transform:uppercase}}
td{{color:var(--ink);font-variant-numeric:tabular-nums}}
td:first-child{{color:var(--body)}}
footer{{margin-top:56px;padding-top:20px;border-top:1px solid var(--line);
  font-size:13px;color:var(--muted)}}
"""

cards = "\n".join(
    f"""<div class="plat {k}">
      <div class="plat-top"><h3>{n}</h3><span class="pill">{lab}</span></div>
      <p>{d}</p>
      <div class="spend"><span>{b}</span><span>{m}</span></div>
    </div>"""
    for n, k, lab, d, b, m in PLATFORMS
)

ads_html = "\n".join(
    f"""<div class="ad">
      <img src="{thumb_uri(slug)}" alt="Still from {title}">
      <div class="ad-body">
        <div class="ad-top"><span class="num">{num}</span><h3>{title}</h3>
          <span class="tag">{"approved" if appr else "new"}</span></div>
        <p class="reg">{reg}</p>
        <p class="script">{script}</p>
        <p class="why">{why}</p>
      </div>
    </div>"""
    for slug, num, title, appr, reg, script, why in ADS
)

html = f"""<title>TeamPredict Launch Night</title>
<style>{css}</style>
<div class="wrap">
  <p class="eyebrow">TeamPredict &middot; paid launch &middot; 14 August</p>
  <h1>Reddit is live. Meta needs your card.</h1>
  <p class="lede">Six new video ads are made and QA'd, and 12 ads are running on Reddit right
  now. Meta is fully built but cannot create ads until the account's card works. Google got no
  new campaign on purpose.</p>

  <div class="strip">{cards}</div>

  <div class="asks">
    <h2>Two things only you can do</h2>
    <ol>
      <li><b>Fix the card on the Meta ad account</b> (TeamPredict, under the Prymatica business).
      Meta returns &ldquo;Update payment method&rdquo; on every ad create. I confirmed it is really
      billing and not a bad payload: a fake creative id gives a different error than a real one.
      Once it clears, 13 ads go up in one run.</li>
      <li><b>Decide whether TeamPredict gets a YouTube channel.</b> Google Ads video only runs
      through Demand Gen, which needs a YouTube video ID, so these six clips cannot reach Google
      at all until a channel exists. VoiceDrop and 1Lookup have one; TeamPredict does not.</li>
    </ol>
  </div>

  <h2>The six ads</h2>
  <p class="lede" style="margin-bottom:22px">You said the approved three were a bit Meh. Meh meant
  they had no turn: each one stated a problem in a serious voice and stopped. Every script below
  sets something up and then breaks it, and the joke lands in the middle rather than the last
  three seconds.</p>
  <div class="ads">{ads_html}</div>

  <h2>Money</h2>
  <div class="note">
    <div class="tablewrap">
      <table>
        <tr><th>Line</th><th>Per month</th><th>Note</th></tr>
        <tr><td>Meta</td><td>$395</td><td>not spending yet</td></tr>
        <tr><td>Google search</td><td>$226</td><td>actual; cap is $395</td></tr>
        <tr><td>Reddit</td><td>$243</td><td>live now</td></tr>
        <tr><td><b>Total, realistic</b></td><td><b>$865</b></td><td>against your $1,000</td></tr>
        <tr><td>Total if everything maxes out</td><td>$1,033</td><td>will not happen at once</td></tr>
      </table>
    </div>
    <p style="margin-top:14px">Making the six videos cost <b>$42.29</b>. Both defects I found were
    repaired for nothing instead of re-rolling. All 20 banners were <b>$7.40</b>, so the entire
    launch creative is under $50.</p>
  </div>

  <h2>Two things I did not do</h2>
  <div class="note">
    <h3>No new Google campaign</h3>
    <p>Beyond the missing YouTube channel, Google search has spent <b>$298 and produced zero
    signups</b>, and that zero is confirmed real in Mixpanel rather than a tracking fault. Nobody
    knows why yet. Putting more of a fixed pool into an unexplained zero, while Reddit and Meta
    have never been tried, is the wrong trade. I cut the two search budgets from $18 and $5 a day
    to $10 and $3, which is still well above what they actually spend, so nothing is throttled.</p>
    <p>The test that would settle it is one Mixpanel session replay of a paid visitor who reached
    the signup page and did not finish. Say the word and I will run it.</p>
    <h3 style="margin-top:18px">No worker-side subreddits</h3>
    <p>A Reddit ad carries a public comment thread. Software that reads whether your staff are job
    hunting gets taken apart in r/antiwork, so the 11 communities are all buyer-side: HR, managers,
    founders, small business. The creative is the other half of that defence, which is why every
    one of the six makes the manager the butt of the joke and never the employee.</p>
  </div>

  <footer>Reply with the ad numbers to kill or keep, or a new budget split, and I will apply it.
  Full write-up is in the ad-creative repo.</footer>
</div>
"""

with open(OUT, "w", encoding="utf-8") as fh:
    fh.write(html)
print("wrote", OUT, f"{os.path.getsize(OUT)/1024:.0f} KB")
