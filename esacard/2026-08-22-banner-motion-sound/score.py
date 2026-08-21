#!/usr/bin/env python3
"""Score every clip on one question: did anything appear ABOVE the animal that should not?

The first version of this measured every row that carried type, which on these banners is most
of the upper two thirds, and the animal legitimately lives in some of those rows. It scored
normal breathing as a fault and flagged 30 of 32.

The zone that actually matters is the strip above the animal's head in the source banner. In a
good clip that strip holds nothing but flat background and the frozen headline for all 15
seconds. Two different faults both light it up, and both are fatal:
  - camera drift slides the video's own copy of the headline out from under the frozen copy,
    leaving two overlapping headlines (w2-alligator);
  - the animal grows or rises until it crowds the words (w3-raven, which has no camera drift).
"""
import os, subprocess
import numpy as np
from PIL import Image
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
W, H = 1080, 1920
PHOTO = {"p1-carry-vertical", "p12-no-subscription-vertical"}
# For the two photographic banners there is no derivable animal silhouette, so the strip is the
# headline block, which is measured directly from the mask rectangle.
PHOTO_TOP = {"p1-carry-vertical": 580, "p12-no-subscription-vertical": 780}

def frames(path, want):
    dec = subprocess.Popen([FF, "-loglevel", "error", "-i", path, "-vf", f"scale={W}:{H}",
                            "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    fsz = W * H * 3; i = 0; out = {}
    while True:
        b = dec.stdout.read(fsz)
        if len(b) < fsz: break
        if want is None or i in want:
            out[i] = np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(int)
        i += 1
    dec.wait(); return out, i

names = sorted(n[:-4] for n in os.listdir(os.path.join(D, "all", "upload")) if n.endswith(".mp4"))
rows = []
for n in names:
    src = np.asarray(Image.open(os.path.join(D, "all", "src", n + ".jpg")).convert("RGB").resize((W, H))).astype(int)
    mask = np.asarray(Image.open(os.path.join(D, "all", "mask", n + ".png")).convert("L").resize((W, H)))
    bg = src[6, 6]
    ink = np.abs(src - bg).sum(axis=2) > 42
    if n in PHOTO:
        top = PHOTO_TOP[n]
    else:
        animal = ink & (mask < 60)           # source ink that is not frozen type = the animal
        r = np.where(animal.sum(axis=1) > 8)[0]
        top = int(r.min()) if len(r) else H
    zone = np.zeros((H, W), bool)
    zone[:max(0, top - 25)] = True
    zone &= (mask < 60) & ~ink                # background only: not type, not anything else
    if zone.sum() < 5000:
        rows.append((n, 0.0)); continue
    _, total = frames(os.path.join(D, "all", "upload", n + ".mp4"), set())
    picks = {0, total // 4, total // 2, (3 * total) // 4, total - 2}
    fr, _ = frames(os.path.join(D, "all", "upload", n + ".mp4"), picks)
    base = fr[0]
    worst = max(np.abs(f - base).mean(axis=2)[zone].mean() for k, f in fr.items() if k != 0)
    rows.append((n, worst))

rows.sort(key=lambda r: -r[1])
print(f"{'clip':34s} {'disturbance above animal':>26s}")
bad = []
for n, v in rows:
    flag = ""
    if v > 4.0: flag = "  <-- REDO"; bad.append(n)
    elif v > 2.0: flag = "  (marginal)"
    print(f"{n:34s} {v:26.2f}{flag}")
open(os.path.join(D, "all", "redo.txt"), "w").write("\n".join(bad))
print("\nneeds re-render:", len(bad))
