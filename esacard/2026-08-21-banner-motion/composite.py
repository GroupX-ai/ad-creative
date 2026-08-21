#!/usr/bin/env python3
"""Concept C: the locked-text composite.

Concepts A and B hand the whole banner to an image-to-video model and ask it nicely not to
touch the typography. Kling obeyed. Seedance v1 did not: it rewrote the dog banner's
subheadline into "Enemom g nve.le. t raient gcl" and the button into gibberish, which is an
instant ad rejection and a wasted render.

This removes the ask. Every frame gets the original PNG's text regions painted back over it,
pixel for pixel, so the headline, price, URL and button are identical to the banner Meta is
already selling with. Only the animal's region is allowed to be video. Text warping stops
being something you check for and becomes something that cannot happen.

    python3 esacard/2026-08-21-banner-motion/composite.py

FREEZE regions are in source-banner pixels (608x1088): those areas always come from the PNG.
"""
import subprocess, sys, os
from PIL import Image, ImageFilter, ImageDraw
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
DIR = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(DIR, "..", "2026-08-14-spelled-out")
W, H = 608, 1088
FEATHER = 10

# Everything listed here is typography and is frozen. The gaps between them are where the
# animal lives and where video is allowed through.
JOBS = {
    "cat": dict(
        banner="p2-offer-vertical.png",
        # The cat sits bottom-left under all the type; only "No renewal fees, ever." reaches
        # down beside her head, so the freeze steps around her ears rather than across them.
        freeze=[(0, 0, W, 600), (228, 600, W, 690), (285, 690, W, H)],
    ),
    "dog": dict(
        banner="p1-carry-vertical.png",
        # Photographic scene: freeze the headline block at the top and the button at the
        # bottom, let the whole middle (dog, hands, wallet, room) breathe.
        freeze=[(0, 0, W, 345), (75, 900, 545, H)],
    ),
}
CLIPS = {"cat": "cat-kling.mp4", "dog": "dog-kling.mp4"}


def build_mask(freeze):
    """White = video shows through, black = frozen PNG."""
    m = Image.new("L", (W, H), 255)
    d = ImageDraw.Draw(m)
    for box in freeze:
        d.rectangle(box, fill=0)
    return m.filter(ImageFilter.GaussianBlur(FEATHER))


def frames_of(path, outdir):
    os.makedirs(outdir, exist_ok=True)
    subprocess.run([FF, "-y", "-loglevel", "error", "-i", path,
                    os.path.join(outdir, "f%04d.png")], check=True)
    return sorted(os.listdir(outdir))


for name, job in JOBS.items():
    banner = Image.open(os.path.join(SRC, job["banner"])).convert("RGB").resize((W, H))
    mask = build_mask(job["freeze"])
    raw = os.path.join(DIR, "_qa", "raw-" + name)
    comp = os.path.join(DIR, "_qa", "comp-" + name)
    os.makedirs(comp, exist_ok=True)
    names = frames_of(os.path.join(DIR, CLIPS[name]), raw)
    for n in names:
        v = Image.open(os.path.join(raw, n)).convert("RGB").resize((W, H))
        Image.composite(v, banner, mask).save(os.path.join(comp, n))
    out = os.path.join(DIR, name + "-locked-text.mp4")
    subprocess.run([FF, "-y", "-loglevel", "error", "-framerate", "24",
                    "-i", os.path.join(comp, "f%04d.png"),
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
                    "-vf", "scale=1080:-2:flags=lanczos", out], check=True)
    print("OK  ", os.path.basename(out), f"{os.path.getsize(out)/1024/1024:.1f}MB", f"{len(names)} frames")
