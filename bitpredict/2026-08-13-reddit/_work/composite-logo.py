"""
Composite the REAL BitPredict logo onto each generated banner.

Why this step exists. The 2026-08-03 Reddit audit found that nearly every
generated banner in this repo carries an invented brand mark: the image model was
handed the logo as a text description and drew its own. Three live ads were paused
for it. The vault's prescribed fix is to composite the real logo file rather than
describe it, so every prompt in this batch forbids brand marks outright and the
real mark is added here from BitPredict-Marketing's own Logo.tsx.

Two outputs per banner:
  banners/            logo composited, the upload-ready asset
  banners-nologo/     the clean render, kept for the native/organic concepts
                      where a pasted logo undercuts the "real photo" illusion and
                      Reddit brands the post with the author handle anyway.
"""

import os
import glob
from PIL import Image

WORK = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.dirname(WORK)
RAW = os.path.join(WORK, "raw")
OUT = os.path.join(BATCH, "banners")
OUT_CLEAN = os.path.join(BATCH, "banners-nologo")
LOGO_SVG = os.path.join(WORK, "bitpredict-logo.svg")

os.makedirs(OUT, exist_ok=True)
os.makedirs(OUT_CLEAN, exist_ok=True)

# Concepts whose logo sits bottom-right and small, because the frame is a
# photograph and a top-centre wordmark would read as an advert immediately.
NATIVE = {"r6", "r7", "r8"}

# Logo width as a fraction of banner width.
WIDTH_FRAC_DIRECT = 0.30
WIDTH_FRAC_NATIVE = 0.20
LOGO_ASPECT = 159 / 50  # from the source viewBox


def render_logo(target_w: int) -> Image.Image:
    import cairosvg

    h = max(1, round(target_w / LOGO_ASPECT))
    png = os.path.join(WORK, f".logo-{target_w}.png")
    cairosvg.svg2png(url=LOGO_SVG, write_to=png, output_width=target_w, output_height=h)
    return Image.open(png).convert("RGBA")


def place(banner: Image.Image, concept: str) -> Image.Image:
    W, H = banner.size
    native = concept in NATIVE
    frac = WIDTH_FRAC_NATIVE if native else WIDTH_FRAC_DIRECT
    logo = render_logo(round(W * frac))
    lw, lh = logo.size

    if native:
        # Bottom-right, inset by a clear margin.
        margin = round(W * 0.045)
        pos = (W - lw - margin, H - lh - margin)
        # A soft dark plate keeps the white wordmark legible over a bright photo.
        plate_pad = round(lh * 0.55)
        plate = Image.new(
            "RGBA",
            (lw + plate_pad * 2, lh + plate_pad * 2),
            (7, 7, 19, 200),
        )
        out = banner.convert("RGBA")
        out.alpha_composite(plate, (pos[0] - plate_pad, pos[1] - plate_pad))
        out.alpha_composite(logo, pos)
        return out

    # Direct-response frames reserve an empty band across the top.
    pos = ((W - lw) // 2, round(H * 0.055))
    out = banner.convert("RGBA")
    out.alpha_composite(logo, pos)
    return out


count = 0
for src in sorted(glob.glob(os.path.join(RAW, "*.png"))):
    name = os.path.basename(src)
    concept = name.split("-")[1]  # bitpredict-<concept>-<slug>-<shape>.png
    banner = Image.open(src)

    # Landscape renders are generated at 1200x624 and delivered at 1200x628, the
    # size the ad platforms actually want.
    if banner.size == (1200, 624):
        banner = banner.resize((1200, 628), Image.LANCZOS)

    banner.convert("RGB").save(os.path.join(OUT_CLEAN, name), "PNG")
    place(banner, concept).convert("RGB").save(os.path.join(OUT, name), "PNG")
    count += 1
    print(f"{name:62s} {banner.size[0]}x{banner.size[1]}  concept={concept}")

for tmp in glob.glob(os.path.join(WORK, ".logo-*.png")):
    os.remove(tmp)

print(f"\n{count} banners written to banners/ and banners-nologo/")
