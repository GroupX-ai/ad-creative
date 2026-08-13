#!/usr/bin/env python3
"""Build the 1Lookup end card for the Seedance video ads.

Both c3 and c6 had their spoken brand line trimmed off to repair an audio
defect, so they carry no brand mention at all. This card is the required
replacement. Every element is either a real brand asset or verbatim approved
copy: no claims, no numbers, nothing the claim bank does not already contain.
"""

from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1918  # match the clips exactly, not 1080x1920

BG = (5, 6, 15)            # #05060F
BLUE = (59, 130, 246)      # #3B82F6
CYAN = (34, 211, 238)      # #22D3EE
WHITE = (248, 250, 252)    # #F8FAFC
MUTED = (148, 163, 184)

SG = "/tmp/SpaceGrotesk-Bold.ttf"
ICON = "/home/user/1Lookup-Marketing/public/icon-white.webp"
OUT = "/tmp/claude-0/-home-user/7ddecca2-8dd3-5d28-9f35-a287a0d387b4/scratchpad/1lookup-endcard.png"

card = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(card)

# Soft blue glow behind the mark, drawn as concentric translucent rings so the
# flat background does not read as dead space on a dark feed.
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
cx, cy = W // 2, int(H * 0.40)
for r, a in ((520, 10), (420, 12), (320, 14), (220, 16), (140, 18)):
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(59, 130, 246, a))
card = Image.alpha_composite(card.convert("RGBA"), glow).convert("RGB")
d = ImageDraw.Draw(card)

# Real icon from the marketing repo, never a described or invented mark.
icon = Image.open(ICON).convert("RGBA")
icon = icon.crop(icon.getchannel("A").getbbox())
ih = 300
icon = icon.resize((int(icon.width * ih / icon.height), ih), Image.LANCZOS)
card.paste(icon, (cx - icon.width // 2, cy - icon.height // 2 - 60), icon)

# Wordmark: blue "1", white "lookup", the site's own treatment.
f_mark = ImageFont.truetype(SG, 132)
one_w = d.textlength("1", font=f_mark)
rest_w = d.textlength("lookup", font=f_mark)
mark_y = cy + 190
x = cx - (one_w + rest_w) / 2
d.text((x, mark_y), "1", font=f_mark, fill=BLUE)
d.text((x + one_w, mark_y), "lookup", font=f_mark, fill=WHITE)

# Cyan hairline: the brand's "live signal" accent.
rule_y = mark_y + 210
d.rectangle([cx - 170, rule_y, cx + 170, rule_y + 4], fill=CYAN)

# CTA button. "Start For Free" is the verbatim hero CTA label.
f_cta = ImageFont.truetype(SG, 62)
label = "Start For Free"
tw = d.textlength(label, font=f_cta)
bw, bh = int(tw) + 150, 140
bx, by = cx - bw // 2, rule_y + 130
d.rounded_rectangle([bx, by, bx + bw, by + bh], radius=bh // 2, fill=BLUE)
d.text((cx - tw / 2, by + bh / 2 - 40), label, font=f_cta, fill=(255, 255, 255))

# Domain, small and quiet.
f_dom = ImageFont.truetype(SG, 46)
dw = d.textlength("1lookup.io", font=f_dom)
d.text((cx - dw / 2, by + bh + 70), "1lookup.io", font=f_dom, fill=MUTED)

card.save(OUT)
print("wrote", OUT, card.size)
