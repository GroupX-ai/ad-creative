#!/usr/bin/env python3
"""
Composite the REAL TeamPredict logo onto the generated banners.

Why this exists: the 2026-08-03 Reddit audit found nearly every generated
banner in this repo carrying an invented brand mark, and three live ads were
paused for it. The cause was handing the image model a text description of the
logo. The fix, proven end to end on BitPredict batches 6 and 7, is to forbid
brand marks in the prompt and paste the real mark afterwards.

Source of truth: TeamPredict-Marketing/public/logo.svg (indigo rounded-square
tile, white radar rings, one amber flagged blip) plus the wordmark
"TeamPredict" set in Plus Jakarta Sans ExtraBold, which is the site's heading
font.

Direct-response frames get the lockup centred in the clean band the prompt
reserved at the top. Native/organic frames get a small mark bottom-right on a
translucent plate: a top-centre wordmark on a photograph reads as an advert
instantly and undoes the illusion the family depends on. Clean no-logo copies
are kept for Reddit, where the post is already branded with the author handle.
"""
import io
import os
import re
import sys

import cairosvg
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(BASE, "raw")
OUT = os.path.join(os.path.dirname(BASE), "banners")
OUT_CLEAN = os.path.join(os.path.dirname(BASE), "banners-nologo")
LOGO_SVG = "/home/user/TeamPredict-Marketing/public/logo.svg"
FONT = os.path.join(BASE, "fonts", "PlusJakartaSans-ExtraBold.ttf")

INK = (13, 1, 32)          # #0D0120
WHITE = (255, 255, 255)

# Per-concept: which half of the palette the wordmark has to survive on, and
# whether the frame is a photograph (native family) or a poster (direct).
TONE = {
    "t1": "dark",  "t2": "light", "t3": "dark",  "t4": "light",
    "t5": "light", "t6": "light", "t7": "dark",  "t8": "light",
    "t9": "light", "t10": "dark", "t11": "light", "t12": "light",
    "t13": "dark", "t14": "light", "t15": "light", "t16": "dark",
    "t17": "native", "t18": "native", "t19": "native", "t20": "native",
}

# Concepts whose ground IS the brand indigo. The logo tile is an indigo rounded
# square, so on those it dissolves into the background and only the rings show.
# Same problem batch 7 solved for BitPredict's inverted white banner, same fix:
# an inverted variant of the real logo file, never a different mark. Swapping
# indigo and white throughout keeps every shape and the amber blip identical.
INVERT_TILE = {"t3", "t10"}


def logo_tile(px: int, invert: bool = False) -> Image.Image:
    """The rounded-square radar tile, rendered from the real SVG at `px`."""
    if invert:
        svg = open(LOGO_SVG, encoding="utf-8").read()
        svg = svg.replace("#4B56FF", "@@").replace("#ffffff", "#4B56FF").replace("@@", "#ffffff")
        png = cairosvg.svg2png(bytestring=svg.encode(), output_width=px, output_height=px)
    else:
        png = cairosvg.svg2png(url=LOGO_SVG, output_width=px, output_height=px)
    return Image.open(io.BytesIO(png)).convert("RGBA")


def lockup(tile_px: int, color, invert: bool = False) -> Image.Image:
    """Tile + 'TeamPredict' wordmark on a transparent canvas, tight-cropped."""
    tile = logo_tile(tile_px, invert)
    font = ImageFont.truetype(FONT, int(tile_px * 0.70))
    gap = int(tile_px * 0.30)

    probe = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    box = probe.textbbox((0, 0), "TeamPredict", font=font)
    text_w, text_h = box[2] - box[0], box[3] - box[1]

    canvas = Image.new("RGBA", (tile_px + gap + text_w + 4, tile_px), (0, 0, 0, 0))
    canvas.alpha_composite(tile, (0, 0))
    ImageDraw.Draw(canvas).text(
        (tile_px + gap - box[0], (tile_px - text_h) // 2 - box[1]),
        "TeamPredict",
        font=font,
        fill=color,
    )
    return canvas


def place_poster(img: Image.Image, tone: str, invert: bool) -> Image.Image:
    """Centre the lockup inside the clean top band the prompt reserved."""
    w, h = img.size
    tile_px = max(34, int(min(w, h) * 0.052))
    mark = lockup(tile_px, WHITE if tone == "dark" else INK, invert)
    if mark.width > w * 0.42:  # never let the lockup dominate a wide frame
        scale = (w * 0.42) / mark.width
        mark = mark.resize(
            (int(mark.width * scale), int(mark.height * scale)), Image.LANCZOS
        )
    out = img.convert("RGBA")
    out.alpha_composite(mark, ((w - mark.width) // 2, int(h * 0.045)))
    return out


def place_native(img: Image.Image) -> Image.Image:
    """Small mark bottom-right on a dark translucent plate."""
    w, h = img.size
    tile_px = max(28, int(min(w, h) * 0.042))
    mark = lockup(tile_px, WHITE)

    pad = int(tile_px * 0.55)
    plate = Image.new(
        "RGBA", (mark.width + pad * 2, mark.height + pad * 2), (0, 0, 0, 0)
    )
    ImageDraw.Draw(plate).rounded_rectangle(
        [0, 0, plate.width - 1, plate.height - 1],
        radius=int(tile_px * 0.42),
        fill=(13, 1, 32, 212),
    )
    plate.alpha_composite(mark, (pad, pad))

    margin = int(min(w, h) * 0.035)
    out = img.convert("RGBA")
    out.alpha_composite(plate, (w - plate.width - margin, h - plate.height - margin))
    return out


def main() -> int:
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(OUT_CLEAN, exist_ok=True)

    files = sorted(f for f in os.listdir(RAW) if f.endswith(".png"))
    if not files:
        print("no renders in raw/", file=sys.stderr)
        return 1

    for name in files:
        cid = re.match(r"teampredict-(t\d+)-", name)
        if not cid:
            print(f"skip (unparsed name): {name}")
            continue
        concept = cid.group(1)
        tone = TONE.get(concept)
        if tone is None:
            print(f"skip (no tone mapping): {name}")
            continue

        img = Image.open(os.path.join(RAW, name)).convert("RGBA")
        img.convert("RGB").save(os.path.join(OUT_CLEAN, name), "PNG")

        stamped = (
            place_native(img)
            if tone == "native"
            else place_poster(img, tone, concept in INVERT_TILE)
        )
        stamped.convert("RGB").save(os.path.join(OUT, name), "PNG")
        print(f"ok  {name}  ({tone})")

    print(f"\n{len(files)} frames written to banners/ and banners-nologo/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
