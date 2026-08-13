"""
Composite the REAL BitPredict logo onto each batch-2 banner, and build the video
end card.

Same reasoning as batch 1: the image model is never told what the logo looks
like, because when it was, it drew its own, and three live ads were paused for
it on 2026-08-03. The mark here comes from BitPredict-Marketing's Logo.tsx.

New in this batch: `b1` is a brutalist inversion on a flat white ground, where
the standard white wordmark would be invisible, so it gets a dark-ink variant of
the same file rather than a different mark.
"""

import glob
import os
import re

import cairosvg
from PIL import Image, ImageDraw, ImageFont

WORK = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.dirname(WORK)
RAW = os.path.join(WORK, "raw")
OUT = os.path.join(BATCH, "banners")
OUT_CLEAN = os.path.join(BATCH, "banners-nologo")
LOGO_SVG = os.path.join(WORK, "bitpredict-logo.svg")

os.makedirs(OUT, exist_ok=True)
os.makedirs(OUT_CLEAN, exist_ok=True)

NATIVE = {"b7", "b8"}
DARK_LOGO = {"b1"}          # flat white ground
LOGO_ASPECT = 159 / 50
INK = "#070713"

with open(LOGO_SVG, encoding="utf-8") as fh:
    LOGO_SRC = fh.read()

# The wordmark paths are the only ones filled #fff; the geometric mark stays
# green in both variants so brand recognition does not change.
LOGO_DARK_SRC = re.sub(r'fill="#fff"', f'fill="{INK}"', LOGO_SRC)


def render_logo(target_w: int, dark: bool) -> Image.Image:
    h = max(1, round(target_w / LOGO_ASPECT))
    png = os.path.join(WORK, f".logo-{'d' if dark else 'l'}-{target_w}.png")
    cairosvg.svg2png(
        bytestring=(LOGO_DARK_SRC if dark else LOGO_SRC).encode(),
        write_to=png,
        output_width=target_w,
        output_height=h,
    )
    return Image.open(png).convert("RGBA")


def place(banner: Image.Image, concept: str) -> Image.Image:
    W, H = banner.size
    native = concept in NATIVE
    dark = concept in DARK_LOGO
    logo = render_logo(round(W * (0.20 if native else 0.30)), dark)
    lw, lh = logo.size
    out = banner.convert("RGBA")

    if native:
        margin = round(W * 0.045)
        pos = (W - lw - margin, H - lh - margin)
        pad = round(lh * 0.55)
        plate = Image.new("RGBA", (lw + pad * 2, lh + pad * 2), (7, 7, 19, 200))
        out.alpha_composite(plate, (pos[0] - pad, pos[1] - pad))
        out.alpha_composite(logo, pos)
        return out

    out.alpha_composite(logo, ((W - lw) // 2, round(H * 0.055)))
    return out


count = 0
for src in sorted(glob.glob(os.path.join(RAW, "*.png"))):
    name = os.path.basename(src)
    concept = name.split("-")[1]
    banner = Image.open(src)
    if banner.size == (1200, 624):
        banner = banner.resize((1200, 628), Image.LANCZOS)
    banner.convert("RGB").save(os.path.join(OUT_CLEAN, name), "PNG")
    place(banner, concept).convert("RGB").save(os.path.join(OUT, name), "PNG")
    count += 1
    print(f"{name:56s} {banner.size[0]}x{banner.size[1]}  {concept}")


# ---------------------------------------------------------------- end card ----
# Appended to every batch-7 video. Two jobs: it brands clips whose spoken brand
# name the model gets right only about two times in three, and it is the free
# repair when a take garbles it (mute the word, the card still says it).
FONT_DIR = "/mnt/skills/examples/canvas-design/canvas-fonts"
CARD_W, CARD_H = 1080, 1920
card = Image.new("RGBA", (CARD_W, CARD_H), (7, 7, 19, 255))

lw = int(CARD_W * 0.64)
logo = render_logo(lw, dark=False)
lh = logo.size[1]
top = (CARD_H - lh) // 2 - 90
card.alpha_composite(logo, ((CARD_W - lw) // 2, top))

d = ImageDraw.Draw(card)
bar_w, bar_h = int(CARD_W * 0.26), 8
bx = (CARD_W - bar_w) // 2
by = top + lh + 64
d.rounded_rectangle([bx, by, bx + bar_w, by + bar_h], radius=4, fill=(1, 221, 130, 255))

# BigShoulders is a tall condensed grotesque, the closest available match to the
# brand's Darker Grotesque display face.
try:
    font = ImageFont.truetype(os.path.join(FONT_DIR, "BigShoulders-Bold.ttf"), 92)
except OSError:
    font = ImageFont.load_default()

url = "bitpredict.io"
box = d.textbbox((0, 0), url, font=font)
d.text(
    ((CARD_W - (box[2] - box[0])) // 2, by + 78),
    url,
    font=font,
    fill=(250, 250, 250, 255),
)

card.convert("RGB").save(os.path.join(WORK, "endcard.png"))
print("\nend card written")

for tmp in glob.glob(os.path.join(WORK, ".logo-*.png")):
    os.remove(tmp)
print(f"{count} banners written to banners/ and banners-nologo/")
