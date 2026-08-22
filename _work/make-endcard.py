#!/usr/bin/env python3
"""Build the b14 end cards, 1080x1920, from the REAL 1Capture wordmark.

Never a generated image: the mark comes from the marketing repo's own SVG via
_work/logo-from-jsx.py. The card carries the offer as well as the brand, so a
garbled spoken close is always a free trim rather than a $6.93 re-roll (the
rule that has paid out in every batch since b6).

Needs Inter, which the live site uses and which is not committed here (876 KB):

    mkdir -p _work/fonts && curl -sSL -o _work/fonts/Inter-Variable.ttf \
      "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf"

One variant, as of round 4:
  default  logo, domain, and the close "Start free."

Robby, round 4: "Don't say 'Free under $10K' - just say start for free." So the
card closes on those two words and nothing else. The brief's original string was
"Start free. Free under $10K MRR. No card."; two judges had separately flagged
its tail as ambiguous on this brand anyway (every clip sells a card check on the
buyer's own signups and then closes on "No card"), so the instruction retires a
line that was already in question.

The proof variant is gone with it. It existed only to carry the "2-3x improvement
is the typical range" framing that the bank REQUIRES beside the 57% figure, and
Robby cut VoiceDrop from the creative: no clip quotes the figure any more, so
nothing owes the framing and there is no second card to build.
"""
import pathlib
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
INK = (10, 37, 64)        # #0A2540  tailwind ink.DEFAULT / 1capture.dark
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


def build(name):
    card = Image.new("RGBA", (W, H), INK + (255,))
    draw = ImageDraw.Draw(card)

    # The real wordmark, scaled to 620px wide on the 1080 frame.
    logo = Image.open(LOGO).convert("RGBA")
    lw = 620
    logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)

    # Lay the block out from a measured total height so it is optically centred
    # rather than centred on a guess.
    f_big, f_dom = font(104, "ExtraBold"), font(40, "Medium")
    gap_after_logo, gap_after_dom = 96, 78
    block = logo.height + gap_after_logo + 48 + gap_after_dom + 120
    top = (H - block) // 2

    card.alpha_composite(logo, ((W - lw) // 2, top))
    y = top + logo.height + gap_after_logo
    y += centered(draw, y, "1capture.io", f_dom, MUTED) + gap_after_dom
    centered(draw, y, "Start free.", f_big, WHITE)

    p = OUT / f"{name}.png"
    card.convert("RGB").save(p)
    print(f"{p.name}  {card.size[0]}x{card.size[1]}")


build("endcard-b14-default")
