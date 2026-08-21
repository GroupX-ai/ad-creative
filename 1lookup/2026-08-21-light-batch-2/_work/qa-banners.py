#!/usr/bin/env python3
"""Mechanical QA for a banner batch. Checks the things a human eye is bad at.

Not a substitute for looking at every frame: this catches the measurable failures
(too dark, too empty, unreadable at thumbnail, subject outside the safe zone) so
the eye can be spent on spelling, invented claims and duplicate buttons.

    python3 qa-banners.py <dir> [--min-bright 90] [--max-blank 0.80]
"""
import sys, os, glob, argparse
from PIL import Image, ImageStat, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument("dir")
ap.add_argument("--min-bright", type=float, default=90.0,
                help="mean luminance floor; the account's best static is 128/255")
ap.add_argument("--max-blank", type=float, default=0.80,
                help="Google Display IMAGE ASSETS only: blank space under 80%%. A flat "
                     "colour field is 100%% blank by this measure and is fine on Meta.")
a = ap.parse_args()


def blank_fraction(im):
    """Share of the frame that is flat: no local detail. Google's 80% rule."""
    g = im.convert("L")
    edges = g.filter(ImageFilter.FIND_EDGES)
    small = edges.resize((160, 160), Image.BILINEAR)
    px = list(small.getdata())
    return sum(1 for p in px if p < 8) / len(px)


def thumbnail_legible(im):
    """Proxy for 'can you read the headline at 150px'. Downscale to 150px wide,
    scale back up, and measure how much edge energy survived.

    KNOWN FALSE POSITIVE, measured on this batch: the metric counts ALL edge energy,
    so a frame with heavy surface texture (corrugated cardboard, laid paper, wood
    grain) loses most of its ratio to texture even when the headline is perfectly
    readable. kraft-fcc-carrier scored 0.30 and forty-one-itemised 0.44, and both
    headlines read cleanly in the real 150px export. A low score means go look at
    thumbtest-150px.png, never reject."""
    g = im.convert("L")
    w, h = g.size
    tiny = g.resize((150, max(1, int(150 * h / w))), Image.LANCZOS)
    back = tiny.resize((w, h), Image.NEAREST)
    a_ = ImageStat.Stat(g.filter(ImageFilter.FIND_EDGES)).mean[0]
    b_ = ImageStat.Stat(back.filter(ImageFilter.FIND_EDGES)).mean[0]
    return b_ / a_ if a_ else 0.0


def safe_zone_energy(im):
    """Share of total edge energy that sits inside the centre 80%.

    SAME CAVEAT: this measures where detail is, not where CRITICAL elements are. A
    full-bleed photograph spreads texture to every edge and scores ~65% while its
    headline, wordmark and CTA all sit well inside the safe zone. Only a designed
    layout with type near an edge is a true positive here."""
    g = im.convert("L").filter(ImageFilter.FIND_EDGES)
    w, h = g.size
    inner = g.crop((int(w * .1), int(h * .1), int(w * .9), int(h * .9)))
    tot = sum(g.getdata())
    return (sum(inner.getdata()) / tot) if tot else 0.0


files = sorted(f for f in glob.glob(os.path.join(a.dir, "*.png")) if "-raw" not in f)
if not files:
    sys.exit(f"no delivery PNGs in {a.dir}")

print(f"{'file':50} {'bright':>6} {'blank':>6} {'thumb':>6} {'safe':>5}  flags")
fails = 0
for f in files:
    im = Image.open(f).convert("RGB")
    b = ImageStat.Stat(im.convert("L")).mean[0]
    bl = blank_fraction(im)
    tl = thumbnail_legible(im)
    sz = safe_zone_energy(im)
    flags = []
    if b < a.min_bright:
        flags.append(f"DARK({b:.0f})")
    if bl > a.max_blank:
        flags.append(f"EMPTY({bl:.0%})")
    if tl < 0.45:
        flags.append(f"THUMB({tl:.2f})")
    if sz < 0.70:
        flags.append(f"EDGE({sz:.0%})")
    if flags:
        fails += 1
    print(f"{os.path.basename(f):50} {b:6.0f} {bl:6.1%} {tl:6.2f} {sz:5.0%}  {' '.join(flags) or 'ok'}")

print(f"\n{len(files) - fails}/{len(files)} clean, {fails} flagged")
print("Flags are prompts to look, not automatic rejections. A deliberately dark")
print("concept can pass on the eye; an unreadable thumbnail cannot.")
