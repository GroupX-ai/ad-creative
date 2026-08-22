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
import argparse, hashlib, json, pathlib, shutil, sys
from PIL import Image, ImageStat, ImageFilter

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

# b14b is twenty-three concepts, so placement comes from the family rather than a hand-written
# row each. A set frame reserves a band and takes the mark bare; a photograph takes a small mark
# on a plate in a corner, because banner rule 7 says a top-centre wordmark on a photo reads as an
# advert instantly. Either way the measured fallback below still has the last word.
FAMILY_DEFAULT = {
    "loud direct-response": {"variant": "white", "where": "bottom-center", "width": 0.30, "plate": False},
    "native/organic": {"variant": "white", "where": "bottom-right", "width": 0.26, "plate": True},
}
# Per-frame overrides for renders that did not honour the empty band their prompt reserved.
# c07's mega-type headline runs into the top eighth the prompt assigned as empty, so every
# measured candidate either clips a letter or crowds the button. Bottom-centre under the button,
# small, on a plate, is the one clean spot and it is faster to say so than to keep tuning a
# scorer against a single frame.
HAND_PLACED = {
    "1capture-platform-b14c07": {"variant": "white", "where": "bottom-center", "width": 0.20, "plate": True},
}

_manifest = WORK / "banner-manifest-b14b.json"
if _manifest.exists():
    import json as _json
    for _id, _meta in _json.loads(_manifest.read_text()).items():
        PLACEMENT.setdefault(_id, HAND_PLACED.get(_id) or FAMILY_DEFAULT[_meta["family"]])

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


_EDGES = {}


def _edge_map(im):
    """Cache one edge map per image: type is high-frequency, flat color and soft photo
    backgrounds are not.

    2026-08-22: this cached on `id(im)` alone and held no reference to the image. CPython reuses
    an id as soon as the object behind it is collected, and this runs one freshly-opened Image
    per file in a loop, so a later banner could collide with a freed earlier one and be scored
    against SOMEBODY ELSE'S edge map. It did: c05's box over "the payment failed" scored 0.00,
    and the wordmark was placed on the subheadline. Nothing about that looked like a failure,
    because a wrong number and a right number are the same shape.

    The entry now keeps the image itself, which both pins the id so it cannot be reused while
    cached and lets the lookup verify it got the right one. That is the third lookup in this
    batch keyed on a proxy rather than on the thing itself, after the naming gate's date regex
    and the nologo existence check."""
    key = id(im)
    entry = _EDGES.get(key)
    if entry is None or entry[0] is not im:
        entry = (im, im.convert("L").filter(ImageFilter.FIND_EDGES))
        _EDGES[key] = entry
    return entry[1]


def band_score(im, box):
    """How much TYPE is in a region, as a percentage of its pixels that sit on a hard edge.

    This was standard deviation, and standard deviation is the wrong test. It scores a flat
    violet field between two lines of white type as quiet, so the mark landed on a letter; and
    it scores a hazard-stripe band as busy even though a plate over decoration is fine. Edge
    density measures the thing that actually matters: a box over flat color or a soft photo
    background reads near zero, a box touching any lettering does not."""
    crop = _edge_map(im).crop(box)
    hist = crop.histogram()
    hard = sum(hist[60:])
    return 100.0 * hard / max(1, crop.size[0] * crop.size[1])


# Above this, the configured band has copy in it and pasting there would sit the mark on top of
# words. Wave 1 did exactly that on both 1200x628 landscapes: the reserved band survives on the
# square and the vertical, where there is room, and does not on the landscape, where the same
# copy is packed into 628px of height. Rather than pay for another roll and hope, measure the
# frame and fall back to the quietest corner, on a plate so it is legible over anything.
# Percent of pixels in the box sitting on a hard edge. Anything above this has lettering in it,
# and the mark shrinks and looks again.
#
# 2026-08-22: tightening this to 0.08 was tried and reverted. It did stop c07 clipping "STOP
# LETTING", but on eight frames nothing then scored under the threshold, the search fell through
# to "no clear space anywhere", and the fallback put the mark somewhere worse: on c05's
# subheadline, on c25's handwriting, over c07's own button. A threshold that rejects everything
# does not choose well, it just chooses last. 0.35 is the tuned value that places 30 of 32
# frames correctly; the two it cannot place are handled by naming their band explicitly, which
# is honest about being a per-frame judgement rather than dressing it up as a measurement.
BUSY = 0.35


def quietest_spot(im, bw, bh, pad):
    """The quietest place along the frame's edges for a box of exactly the size that will be
    drawn. Wave 1 scored the WORDMARK and then drew a larger plate around it, so a plate that
    scored clean still clipped the line above it: score the plate, not the mark. Candidates run
    along all four edges rather than only the four corners, because on a 1200x628 landscape the
    only clear space can sit between two centred elements."""
    w, h = im.size
    cands = []
    steps = 9
    # A side candidate may only sit in the top or bottom fifth of the frame.
    #
    # 2026-08-22: left@ and right@ used to slide the full height, so the scorer was free to put
    # the wordmark at mid-height beside the headline. On the round-4 mega-type layouts it did
    # exactly that twice: c07 tucked the mark into the gap right of "IN." and c08 dropped it into
    # the hollow of "Again.". Both scored clean, because a flat violet hole inside a headline
    # genuinely has no edges in it, and both read as part of the headline to a human eye. Edge
    # density measures whether a box is empty; it cannot measure whether a box is INSIDE
    # something. Keeping side candidates out of the vertical middle is the cheap structural fix.
    side_limit = h * 0.20
    for i in range(steps):
        t = i / (steps - 1)
        x_edge = round(pad + t * (w - bw - 2 * pad))
        y_edge = round(pad + t * (h - bh - 2 * pad))
        cands.append((f"bottom@{i}", (x_edge, h - bh - pad)))
        cands.append((f"top@{i}", (x_edge, pad)))
        if y_edge <= side_limit or y_edge + bh >= h - side_limit:
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


def sha(p):
    return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()[:12]


# What the generator recorded for each delivered file, keyed by basename. A file still hashing
# to its logged value has not been composited yet.
def _rendered():
    log = ROOT / "_scripts" / "banner-run-log-2026-08-21-b14-relaunch.json"
    if not log.exists():
        return {}
    return {pathlib.Path(o["file"]).name: o["sha256"] for o in json.loads(log.read_text()).get("ok", [])}


RENDERED = _rendered()


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

        # Keep the clean render before anything is pasted onto it, and composite FROM that copy
        # so re-running is idempotent.
        #
        # 2026-08-22: this used to be `if not raw.exists(): copy`, which silently destroyed a
        # whole re-render. Round 4 re-rendered all 32 banners with new copy; nologo/ still held
        # the round-2 renders from git, so the guard skipped the refresh, the composite read the
        # STALE copy, and every new render was overwritten with old artwork. $6.40 of generation
        # was lost and nearly shipped as the fix for the exact copy Robby had rejected.
        #
        # The run log is the authority on what a pristine render looks like. If the delivered
        # file still hashes to what the generator recorded, it IS a fresh render and nologo/ is
        # refreshed from it. If it does not match, this file has already been composited before,
        # and nologo/ holds the correct raw for it.
        raw = nologo / f.name
        if not raw.exists() or sha(f) == RENDERED.get(f.name):
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

        # Find a home for the mark. Everything is measured on the box that is actually DRAWN,
        # mark plus plate margin, so nothing is scored clean and then clipped. If the configured
        # band has lettering in it, try the quietest edge; and if the frame is so full that
        # nowhere is clean at full size, SHRINK the mark and look again. A smaller mark finds a
        # gap a larger one cannot, and a small legible wordmark beats a big one sitting on a word.
        base_w = target
        placed = None
        for scale in (1.0, 0.72, 0.52):
            lw = max(60, int(base_w * scale))
            lg = Image.open(LOGO_WHITE if cfg["variant"] == "white" else LOGO_INK).convert("RGBA")
            lg = lg.resize((lw, max(1, round(lg.height * lw / lg.width))), Image.LANCZOS)
            m = int(lg.height * 0.55)
            plate = cfg["plate"]
            where = cfg["where"]
            x, y = place(canvas, lg, where, pad)
            bw, bh = (lg.width + 2 * m, lg.height + 2 * m) if plate else (lg.width, lg.height)
            bx, by = (x - m, y - m) if plate else (x, y)
            score = band_score(im, (bx, by, bx + bw, by + bh))
            if score <= BUSY:
                placed = (lg, m, x, y, where, plate, score, scale)
                break
            pbw, pbh = lg.width + 2 * m, lg.height + 2 * m
            alt_score, alt_name, (ax, ay) = quietest_spot(im, pbw, pbh, pad)
            if alt_score < score:
                score, where, plate, x, y = alt_score, alt_name, True, ax + m, ay + m
            else:
                plate = True
            if score <= BUSY or scale == 0.52:
                placed = (lg, m, x, y, where, plate, score, scale)
                if score <= BUSY:
                    break
        logo, m, x, y, where, plate, score, scale = placed
        note = "" if scale == 1.0 else f", shrunk to {int(scale * 100)}%"
        if score > BUSY:
            print(f"  {f.name}: no clear space anywhere (best {score:.2f}){note}; on a plate at {where}")
        elif scale != 1.0 or where != cfg["where"]:
            print(f"  {f.name}: moved to {where} ({score:.2f}){note}")

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
