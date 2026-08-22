#!/usr/bin/env python3
"""Build the b14 end cards, 1080x1920, from the REAL 1Capture wordmark.

Never a generated image: the mark comes from the marketing repo's own SVG via
_work/logo-from-jsx.py. The card carries the offer as well as the brand, so a
garbled spoken close is always a free trim rather than a $6.93 re-roll (the
rule that has paid out in every batch since b6).

Needs Inter, which the live site uses and which is not committed here (876 KB):

    mkdir -p _work/fonts && curl -sSL -o _work/fonts/Inter-Variable.ttf \
      "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf"

Two variants:
  default  logo, domain, and the close "Start free. Free under $10K MRR. No card."
  proof    the same plus the VoiceDrop attribution and the 2-3x framing, for
           b14v02. The approved-claims bank CONSTRAINS the 57% figure: when it is
           the headline claim, "2-3x improvement is the typical range" must be present. The
           15-second word budget cannot carry both spoken, so the card carries it.
"""
import pathlib
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
INK = (10, 37, 64)        # #0A2540  tailwind ink.DEFAULT / 1capture.dark
VIOLET = (122, 115, 255)  # #7A73FF  blurple.500, the lighter step so it holds on navy
WHITE = (255, 255, 255)
MUTED = (135, 146, 162)   # #8792A2  gray.400

HERE = pathlib.Path(__file__).resolve().parent
FONT = str(HERE / "fonts" / "Inter-Variable.ttf")
LOGO = HERE / "logo" / "1capture-logo-white.png"
OUT = HERE / "endcard"
OUT.mkdir(exist_ok=True)


def font(size, weight="Bold"):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_name(weight)
    return f


def centered(draw, y, text, f, fill):
    box = draw.textbbox((0, 0), text, font=f)
    draw.text(((W - (box[2] - box[0])) / 2 - box[0], y), text, font=f, fill=fill)
    return box[3] - box[1]


def build(name, proof=False):
    card = Image.new("RGBA", (W, H), INK + (255,))
    draw = ImageDraw.Draw(card)

    # The real wordmark, scaled to 620px wide on the 1080 frame.
    logo = Image.open(LOGO).convert("RGBA")
    lw = 620
    logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)

    # Lay the block out from a measured total height so it is optically centred
    # rather than centred on a guess.
    f_big, f_mid, f_dom, f_small = font(104, "ExtraBold"), font(58, "SemiBold"), font(40, "Medium"), font(42, "Medium")
    gap_after_logo, gap_after_dom, line_gap = 96, 78, 22
    block = logo.height + gap_after_logo + 48 + gap_after_dom + 120 + line_gap + 70
    if proof:
        block += 116
    top = (H - block) // 2

    card.alpha_composite(logo, ((W - lw) // 2, top))
    y = top + logo.height + gap_after_logo
    y += centered(draw, y, "1capture.io", f_dom, MUTED) + gap_after_dom
    y += centered(draw, y, "Start free.", f_big, WHITE) + line_gap + 34
    y += centered(draw, y, "Free under $10K MRR. No card.", f_mid, VIOLET) + line_gap

    if proof:
        y += 62
        # A hairline, then the attribution. Both lines are approved bank copy.
        draw.line([(W // 2 - 220, y), (W // 2 + 220, y)], fill=(28, 58, 91), width=2)
        y += 44
        y += centered(draw, y, "VoiceDrop trial-to-paid: 12% to 57%", f_small, WHITE) + 18
        centered(draw, y, "2-3x improvement is the typical range", f_small, WHITE)

    p = OUT / f"{name}.png"
    card.convert("RGB").save(p)
    print(f"{p.name}  {card.size[0]}x{card.size[1]}")


build("endcard-b14-default")
build("endcard-b14-proof", proof=True)
