#!/usr/bin/env python3
"""Build the TeamPredict end card appended to every batch-9 video ad.

Two jobs. First, "TeamPredict" is a compound brand name and five of them have
been mispronounced across seven batches, so a card built from the real logo SVG
makes the brand legible whatever the audio does, and is also the free repair if
a take garbles the spoken name (mute the word, the card still says it).
Second, two of the six clips (Two Weeks, Pizza Party) never speak the brand at
all by design, so the card is the only branding they carry.

Every element is a real brand asset or verbatim approved copy: the mark comes
from TeamPredict-Marketing/public/logo.svg, the wordmark is set in the site's
own Plus Jakarta Sans ExtraBold, and both lines of text are on the approved
bank. No claims, no numbers the bank does not already contain, no invented mark.
"""

import cairosvg
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1918  # matches the Seedance 1080p upscale exactly, not 1080x1920

INK = (13, 1, 32)  # #0D0120 near-black, the brand's dark ground
INDIGO = (75, 86, 255)  # #4B56FF
WHITE = (255, 255, 255)
MUTED = (150, 150, 175)

FONTS = "/home/user/ad-creative/teampredict/2026-08-13-paid-launch/_work/fonts"
XBOLD = f"{FONTS}/PlusJakartaSans-ExtraBold.ttf"
BOLD = f"{FONTS}/PlusJakartaSans-Bold.ttf"
LOGO_SVG = "/home/user/TeamPredict-Marketing/public/logo.svg"
OUT = "/home/user/ad-creative/teampredict/2026-08-13-paid-launch-video/_work/endcard.png"

card = Image.new("RGB", (W, H), INK)
d = ImageDraw.Draw(card)
cx = W // 2

# Faint indigo radar rings behind the mark. The brand's own visual language, and
# it stops a flat dark card reading as dead space at the end of a feed video.
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
cy = int(H * 0.36)
for r, a in ((560, 16), (430, 20), (300, 26), (180, 34)):
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(75, 86, 255, a), width=3)
card = Image.alpha_composite(card.convert("RGBA"), glow).convert("RGB")
d = ImageDraw.Draw(card)

# The real mark, rasterised from the marketing repo's own SVG. Never described,
# never redrawn: describing the logo in a prompt is what produced three batches
# of fabricated marks across this repo.
tile_px = 240
tile = Image.open(
    __import__("io").BytesIO(
        cairosvg.svg2png(url=LOGO_SVG, output_width=tile_px, output_height=tile_px)
    )
).convert("RGBA")
card.paste(tile, (cx - tile_px // 2, cy - tile_px // 2), tile)

# Wordmark, in the site's heading face.
f_mark = ImageFont.truetype(XBOLD, 124)
mark = "TeamPredict"
mw = d.textlength(mark, font=f_mark)
mark_y = cy + tile_px // 2 + 70
d.text((cx - mw / 2, mark_y), mark, font=f_mark, fill=WHITE)

# Headline: verbatim final-CTA h2 from the homepage.
f_head = ImageFont.truetype(XBOLD, 64)
head = ["Don't Wait for the", "Resignation Letter."]
y = mark_y + 250
for line in head:
    lw = d.textlength(line, font=f_head)
    d.text((cx - lw / 2, y), line, font=f_head, fill=WHITE)
    y += 84

# CTA button: the site's verbatim primary CTA label.
f_cta = ImageFont.truetype(XBOLD, 58)
label = "Start 30-Day Free Trial"
tw = d.textlength(label, font=f_cta)
bw, bh = int(tw) + 130, 132
bx, by = cx - bw // 2, y + 110
d.rounded_rectangle([bx, by, bx + bw, by + bh], radius=bh // 2, fill=INDIGO)
d.text((cx - tw / 2, by + bh / 2 - 38), label, font=f_cta, fill=WHITE)

# The site's own trust microcopy. Deliberately NOT "no credit card required":
# a card IS taken at signup, and that false line is already in one older banner
# set in this repo.
f_sub = ImageFont.truetype(BOLD, 42)
sub = "No charge today · Cancel anytime"
sw = d.textlength(sub, font=f_sub)
d.text((cx - sw / 2, by + bh + 56), sub, font=f_sub, fill=MUTED)

f_dom = ImageFont.truetype(BOLD, 44)
dom = "teampredict.ai"
dw = d.textlength(dom, font=f_dom)
d.text((cx - dw / 2, by + bh + 140), dom, font=f_dom, fill=INDIGO)

card.save(OUT)
print("wrote", OUT, card.size)
