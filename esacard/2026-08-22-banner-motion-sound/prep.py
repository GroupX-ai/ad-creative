#!/usr/bin/env python3
"""Pad all 35 banners to 9:16 and build each one's freeze mask. No API calls, no spend.

The freeze mask is the part that must be right before anything is rendered: it decides which
pixels are repainted from the banner every frame. Get it wrong and you clip the animal, which
is exactly what happened on the first pass.

Two strategies, because the banners are not all the same kind of picture:

  FLAT (30 banners)  Cream background, one cut-out animal, type around it. The mask is derived:
                     find every pixel that is not the background, group them into blobs, decide
                     which blob is the animal, and freeze all the other ink. Deriving it beats
                     hand-drawing 30 rectangles and it cannot be off by a few pixels.

  PHOTO (5 banners)  A real photograph, or solid navy, behind the type: p1-carry, both
                     p5-three-minutes, p11-his-photo, p12-no-subscription. There is no flat
                     background to subtract, so the type is frozen by explicit rectangles.

Writes src-all/<name>.jpg and mask-all/<name>.png, plus a QA sheet with every mask painted red.
"""
import json, os
from PIL import Image, ImageFilter, ImageDraw
import numpy as np
from scipy import ndimage

D = os.path.dirname(os.path.abspath(__file__))
W, H = 1080, 1920
SQUARE_TOP = 200      # squares sit high: TikTok's caption and buttons cover the bottom ~480px
DILATE_TEXT = 17
DILATE_ANIMAL = 25
INK = 42
EDGE_BLUR = 2.5

# name -> list of rectangles covering type, for the photographic banners only.
# name -> rectangles covering type, for the photographic banners. Measured in the padded
# 1080x1920 frame, not the original banner, which is what made the first attempt land in the
# wrong place. Bands are full width where nothing but background sits beside the type.
PHOTO_ZONES = {
    "p1-carry-vertical":            [(0, 0, W, 580), (150, 1590, 940, 1815)],
    "p12-no-subscription-vertical": [(0, 0, W, 780), (620, 1520, 1060, 1800)],
}

# Held back, not animated. On these three the type sits directly ON the subject: both
# p5-three-minutes banners put the headline over a man's head and a kitchen, and
# p11-his-photo runs "An emotional support animal ID card, $39 one time." across the
# labrador's forehead. There is no horizontal band that separates type from animal, and glyph
# detection needs a flat background these do not have, so any mask that protects the words also
# freezes part of the animal. Animating them needs a different approach, not a wider rectangle.
HOLD = {"p5-three-minutes-square", "p5-three-minutes-vertical", "p11-his-photo-square"}

def pad(im):
    bg = im.getpixel((6, 6))
    s = min(W / im.width, H / im.height)
    r = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    c = Image.new("RGB", (W, H), bg)
    top = SQUARE_TOP if r.height < H - 100 else (H - r.height) // 2
    c.paste(r, ((W - r.width) // 2, top))
    return c

def flat_mask(src):
    """Freeze every bit of ink that is not part of the animal."""
    a = np.asarray(src).astype(int)
    bg = np.array(src.getpixel((6, 6)))
    ink = (np.abs(a - bg).sum(axis=2) > INK)
    lab, n = ndimage.label(ink)
    if n == 0:
        return Image.new("L", (W, H), 0)
    sizes = ndimage.sum(ink, lab, range(1, n + 1))
    animal = np.zeros_like(ink)
    # The button is the one large blob whose mean colour is brand navy: blue clearly ahead of
    # red. Animals are never that (a black raven and a dark alligator both sit near B-R = 0),
    # so this separates the button from the animal without hard-coding where the button is.
    for i in np.argsort(sizes)[::-1][:6]:
        idx = i + 1
        if sizes[i] < 4000:
            break
        sel = lab == idx
        mean = a[sel].mean(axis=0)
        navyish = (mean[2] - mean[0]) > 35
        if navyish:
            continue
        if not animal.any() or sizes[i] > 25000:
            animal |= sel
    animal = ndimage.binary_dilation(animal, iterations=DILATE_ANIMAL)
    freeze = ink & ~animal
    m = Image.fromarray((freeze * 255).astype(np.uint8), "L").filter(ImageFilter.MaxFilter(DILATE_TEXT))
    return m.filter(ImageFilter.GaussianBlur(EDGE_BLUR))

def photo_mask(zones):
    m = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(m)
    for b in zones:
        d.rectangle(b, fill=255)
    return m.filter(ImageFilter.GaussianBlur(6))

banners = json.load(open(os.path.join(D, "all", "banners.json")))
os.makedirs(os.path.join(D, "all", "src"), exist_ok=True)
os.makedirs(os.path.join(D, "all", "mask"), exist_ok=True)
tiles = []
for name, path in banners.items():
    if name in HOLD:
        print(f"  {name:32s} HELD  (type sits on the subject)"); continue
    src = pad(Image.open(path).convert("RGB"))
    src.save(os.path.join(D, "all", "src", name + ".jpg"), quality=95)
    mask = photo_mask(PHOTO_ZONES[name]) if name in PHOTO_ZONES else flat_mask(src)
    mask.save(os.path.join(D, "all", "mask", name + ".png"))
    red = Image.new("RGB", (W, H), (255, 0, 0))
    tiles.append((name, Image.composite(red, src, mask.point(lambda v: v // 2))))
    print(f"  {name:32s} {'PHOTO' if name in PHOTO_ZONES else 'flat'}  frozen {np.asarray(mask).mean()/255*100:5.1f}%")

TH, cols = 300, 7
sc = [(n, i.resize((int(i.width * TH / i.height), TH))) for n, i in tiles]
CW = max(i.width for _, i in sc)
rows = (len(sc) + cols - 1) // cols
sh = Image.new("RGB", (cols * (CW + 8) + 8, rows * (TH + 24) + 8), "white")
d = ImageDraw.Draw(sh)
for k, (n, i) in enumerate(sc):
    r, c = divmod(k, cols); x = 8 + c * (CW + 8); y = 8 + r * (TH + 24)
    sh.paste(i, (x, y + 18)); d.text((x + 2, y + 3), n[:34], fill="black")
sh.save(os.path.join(D, "all", "QA-MASKS.png"))
print("sheet:", sh.size)
