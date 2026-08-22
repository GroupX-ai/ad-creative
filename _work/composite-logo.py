#!/usr/bin/env python3
"""Composite the REAL 1Capture wordmark onto the b14 banner renders.

  python3 _work/composite-logo.py            # all shapes of all concepts
  python3 _work/composite-logo.py --probe    # just report the cleanest band per file

The 2026-08-03 audit found nearly every generated banner in this repo carrying an
invented brand mark and three live ads were paused for it. The fix, proven end to
end since batch 6: forbid brand marks in the prompt, then paste the real mark from
the brand's own SVG afterwards. The mark here comes from
1Capture-Marketing/public/logos/1c-white-logo.jsx via _work/logo-from-jsx.py, and a
light ground gets the dark-ink variant of that SAME file rather than a different mark.

The raw renders are kept in <batch>/nologo/ because a clean no-mark version is the
one that belongs on Reddit, where the post is already branded with the author handle
and a pasted wordmark undoes the native-post illusion.
"""
import argparse, pathlib, shutil, sys
from PIL import Image, ImageStat

ROOT = pathlib.Path("/home/user/ad-creative")
WORK = ROOT / "_work"
BATCH = ROOT / "1capture" / "2026-08-21-b14-relaunch"
LOGO_WHITE = WORK / "logo" / "1capture-logo-white.png"
LOGO_INK = WORK / "logo" / "1capture-logo-ink.png"

# Per concept: where the mark goes and which variant. c01 and c02 are poster-style, so the
# lockup takes a clean band; c03 is a photograph, where banner rule 7 says a small mark on a
# dark plate in a corner, because a top-centre wordmark on a photo reads as an advert instantly.
# Each concept RESERVES the band its mark lands in, by assigning that band's contents in the
# prompt. An unassigned area is one the image model fills with an invented tagline, which is
# the c17 failure; a reserved one is empty on purpose and the paste has somewhere clean to go.
#   c01  bottom eighth, flat navy, assigned empty        -> white mark, centred
#   c02  top eighth, flat violet, assigned empty         -> white mark, centred
#   c03  bottom-right of the board, assigned blank white -> white mark on a navy plate, because
#        banner rule 7: a top-centre wordmark on a photograph reads as an advert instantly
PLACEMENT = {
    "1capture-platform-b14c01": {"variant": "white", "where": "bottom-center", "width": 0.30, "plate": False},
    "1capture-platform-b14c02": {"variant": "white", "where": "top-center", "width": 0.30, "plate": False},
    "1capture-platform-b14c03": {"variant": "white", "where": "bottom-right", "width": 0.26, "plate": True},
}

# Vertical banners are much taller than they are wide, so a mark sized as a fraction of the
# width would tower; and wide leaderboards are the reverse. Scale the fraction per shape.
SHAPE_SCALE = {"square": 1.0, "landscape": 0.55, "vertical": 0.78, "wide": 0.62}

# 1200x628 is the one delivery size where the reserved band does not survive: the same copy that
# has room on a 1024 square is packed into 628px of height, so every candidate area has type in
# it. The mark therefore goes small, bottom-left, on a plate, which is clear of the centred
# button on all three concepts. Scoring alone cannot decide this, because standard deviation
# penalises the hazard stripes on c01 as heavily as it penalises a headline, and a plate over
# decoration is fine while a plate over a word is not.
LANDSCAPE_OVERRIDE = {"where": "bottom-left", "plate": True}


def band_score(im, box):
    """How quiet a region is. Low std dev over a crop means nothing is there to cover."""
    return ImageStat.Stat(im.convert("L").crop(box)).stddev[0]


# Above this, the configured band has copy in it and pasting there would sit the mark on top of
# words. Wave 1 did exactly that on both 1200x628 landscapes: the reserved band survives on the
# square and the vertical, where there is room, and does not on the landscape, where the same
# copy is packed into 628px of height. Rather than pay for another roll and hope, measure the
# frame and fall back to the quietest corner, on a plate so it is legible over anything.
BUSY = 12.0


def quietest_spot(im, bw, bh, pad):
    """The quietest place along the frame's edges for a box of exactly the size that will be
    drawn. Wave 1 scored the WORDMARK and then drew a larger plate around it, so a plate that
    scored clean still clipped the line above it: score the plate, not the mark. Candidates run
    along all four edges rather than only the four corners, because on a 1200x628 landscape the
    only clear space can sit between two centred elements."""
    w, h = im.size
    cands = []
    steps = 9
    for i in range(steps):
        t = i / (steps - 1)
        x_edge = round(pad + t * (w - bw - 2 * pad))
        y_edge = round(pad + t * (h - bh - 2 * pad))
        cands.append((f"bottom@{i}", (x_edge, h - bh - pad)))
        cands.append((f"top@{i}", (x_edge, pad)))
        cands.append((f"left@{i}", (pad, y_edge)))
        cands.append((f"right@{i}", (w - bw - pad, y_edge)))
    scored = [(band_score(im, (x, y, x + bw, y + bh)), name, (x, y)) for name, (x, y) in cands]
    scored.sort()
    return scored[0]


def probe(im):
    """Report the quietest of the candidate bands, to sanity-check a placement by eye."""
    w, h = im.size
    bh = int(h * 0.14)
    bands = {
        "top": (0, 0, w, bh),
        "bottom": (0, h - bh, w, h),
        "bottom-right": (int(w * 0.55), h - bh, w, h),
        "bottom-left": (0, h - bh, int(w * 0.45), h),
    }
    return {k: round(band_score(im, v), 1) for k, v in bands.items()}


def place(im, logo, where, pad):
    w, h = im.size
    lw, lh = logo.size
    if where == "bottom-center":
        return ((w - lw) // 2, h - lh - pad)
    if where == "bottom-right":
        return (w - lw - pad, h - lh - pad)
    if where == "bottom-left":
        return (pad, h - lh - pad)
    if where == "top-center":
        return ((w - lw) // 2, pad)
    raise SystemExit(f"unknown placement {where}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--probe", action="store_true")
    args = ap.parse_args()

    nologo = BATCH / "nologo"
    nologo.mkdir(parents=True, exist_ok=True)

    files = sorted(BATCH.glob("*.png"))
    if not files:
        sys.exit(f"no banner renders in {BATCH}")

    for f in files:
        stem = f.stem
        concept = stem.rsplit("-", 1)[0]
        shape = stem.rsplit("-", 1)[1]
        cfg = PLACEMENT.get(concept)
        if not cfg:
            print(f"skip {f.name}: no placement configured")
            continue
        if shape == "landscape":
            cfg = {**cfg, **LANDSCAPE_OVERRIDE}

        # Keep the clean render before anything is pasted onto it.
        raw = nologo / f.name
        if not raw.exists():
            shutil.copy2(f, raw)

        im = Image.open(raw).convert("RGBA")
        if args.probe:
            print(f"{f.name}: {probe(im)}")
            continue

        w, h = im.size
        target = int(w * cfg["width"] * SHAPE_SCALE.get(shape, 1.0))
        logo = Image.open(LOGO_WHITE if cfg["variant"] == "white" else LOGO_INK).convert("RGBA")
        logo = logo.resize((target, max(1, round(logo.height * target / logo.width))), Image.LANCZOS)
        pad = int(min(w, h) * 0.05)

        canvas = im.copy()
        x, y = place(canvas, logo, cfg["where"], pad)

        # Everything below is measured on the box that is actually DRAWN: the mark plus its
        # plate margin when there is a plate, so nothing is scored clean and then clipped.
        plate = cfg["plate"]
        where = cfg["where"]
        m = int(logo.height * 0.55)
        bw, bh = (logo.width + 2 * m, logo.height + 2 * m) if plate else (logo.width, logo.height)
        bx, by = (x - m, y - m) if plate else (x, y)
        score = band_score(im, (bx, by, bx + bw, by + bh))
        if score > BUSY:
            # A plate is going on regardless once we are hunting for space, so search at plate size.
            pbw, pbh = logo.width + 2 * m, logo.height + 2 * m
            alt_score, alt_name, (ax, ay) = quietest_spot(im, pbw, pbh, pad)
            print(f"  {f.name}: {where} is busy ({score:.1f}), using {alt_name} ({alt_score:.1f}) on a plate")
            x, y, where, plate = ax + m, ay + m, alt_name, True

        if plate:
            # A photograph needs a ground for the mark or it disappears into the image.
            m = int(logo.height * 0.55)
            plate = Image.new("RGBA", (logo.width + 2 * m, logo.height + 2 * m), (10, 37, 64, 235))
            canvas.alpha_composite(plate, (x - m, y - m))

        canvas.alpha_composite(logo, (x, y))
        canvas.convert("RGB").save(f)
        print(f"{f.name}  mark {logo.width}x{logo.height} {cfg['variant']} at {where}"
              f"{' on a plate' if plate else ''}")


if __name__ == "__main__":
    main()
