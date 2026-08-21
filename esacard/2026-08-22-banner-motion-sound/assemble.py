#!/usr/bin/env python3
"""Turn a 10s Kling banner clip into a 15s TikTok ad with the animal's own sound and music.

THE MASK IS THE WHOLE LESSON HERE. The first version let video through inside a rectangle drawn
around the animal and froze everything outside it. That clips: the alligator opened its jaws
past the right edge of its box and the frame sliced the jaw off in a hard vertical line, with a
ghost of the closed mouth showing through from the frozen banner behind. Robby: "videos look
super weird with the animals coming out of their frame."

So the logic is inverted. Video now plays EVERYWHERE by default and only the actual glyphs and
the button are frozen, detected from the source banner as "not the flat cream background"
inside zones known to contain type, then thickened. The animal can move anywhere it likes,
including into the empty cream between the lines of text, and nothing can ever cut it. If it
does reach a letter, the letter is painted over it, so the animal passes behind the type and
the copy stays legible. Backgrounds match because they are flat cream on both sides.

    python3 esacard/2026-08-22-banner-motion-sound/assemble.py
"""
import os, subprocess
from PIL import Image, ImageChops, ImageFilter
import numpy as np
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1080, 1920, 24
TARGET = 15.0
DILATE = 17          # thickens each glyph so anti-aliased edges are covered too
EDGE_BLUR = 2.5      # just enough to hide the seam, not enough to halo the type
INK = 42             # "this pixel is not background" threshold

# Rectangles that contain type and NOTHING else. Everything outside them is always video.
TEXT_ZONES = {
    "alligator": [(0, 0, W, 775), (480, 985, 1040, 1195)],
    "duck":      [(0, 0, W, 320), (320, 540, W, 855), (480, 995, 1040, 1190)],
    "cat":       [(0, 0, W, 1050), (470, 1055, W, 1165), (570, 1470, 1070, 1710)],
}

def sh(*a): subprocess.run(list(a), check=True)

def freeze_mask(src, zones):
    """White = frozen banner (type), black = video. Built from the banner's own ink."""
    bg = Image.new("RGB", src.size, src.getpixel((6, 6)))
    ink = ImageChops.difference(src, bg).convert("L").point(lambda v: 255 if v > INK else 0)
    a = np.asarray(ink)
    keep = np.zeros_like(a)
    for (x0, y0, x1, y1) in zones:
        keep[y0:y1, x0:x1] = a[y0:y1, x0:x1]
    m = Image.fromarray(keep, "L").filter(ImageFilter.MaxFilter(DILATE))
    return m.filter(ImageFilter.GaussianBlur(EDGE_BLUR))

for name, zones in TEXT_ZONES.items():
    src = Image.open(os.path.join(D, f"src-{name}.jpg")).convert("RGB").resize((W, H))
    mask = freeze_mask(src, zones)
    mask.save(os.path.join(D, "_qa", f"mask-{name}.png"))

    raw = os.path.join(D, "_qa", "f-" + name); comp = os.path.join(D, "_qa", "c-" + name)
    for p in (raw, comp):
        os.makedirs(p, exist_ok=True)
        for f in os.listdir(p): os.remove(os.path.join(p, f))
    sh(FF, "-y", "-loglevel", "error", "-i", os.path.join(D, f"raw-{name}.mp4"),
       os.path.join(raw, "f%04d.png"))
    names = sorted(os.listdir(raw))
    for n in names:
        v = Image.open(os.path.join(raw, n)).convert("RGB").resize((W, H))
        # mask white = take the frozen banner, black = take the video
        Image.composite(src, v, mask).save(os.path.join(comp, n))

    fwd = len(names)
    order = list(range(fwd)) + list(range(fwd - 1, fwd - 1 - (int(TARGET * FPS) - fwd), -1))
    seq = os.path.join(D, "_qa", "s-" + name)
    os.makedirs(seq, exist_ok=True)
    for f in os.listdir(seq): os.remove(os.path.join(seq, f))
    for j, idx in enumerate(order):
        os.link(os.path.join(comp, names[idx]), os.path.join(seq, "q%04d.png" % j))

    out = os.path.join(D, "_qa", name + "-silent.mp4")
    sh(FF, "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(seq, "q%04d.png"),
       "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", out)
    print(f"OK   {name:10s} {len(order)} frames, {len(order)/FPS:.2f}s silent")
