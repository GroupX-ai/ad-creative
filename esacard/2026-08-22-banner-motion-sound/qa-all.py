#!/usr/bin/env python3
"""Check all 32 deliverables: is the type still pixel-locked, and does the mouth actually open?

Text check: compare the final frame against the source banner, but only where the freeze mask
says type lives. Anything above ~3 means the type moved and the clip should not ship. Small
non-zero values are h.264 re-encoding, not drift.

Mouth check: find the frame with the most motion and pull it, so the contact sheet shows each
animal at its loudest moment rather than at rest.
"""
import os, subprocess
import numpy as np
from PIL import Image, ImageDraw
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
UP = os.path.join(D, "all", "upload")
W, H = 1080, 1920
names = sorted(n[:-4] for n in os.listdir(UP) if n.endswith(".mp4"))
rows, bad = [], []

for n in names:
    dec = subprocess.Popen([FF, "-loglevel", "error", "-i", os.path.join(UP, n + ".mp4"),
                            "-vf", f"scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                           stdout=subprocess.PIPE)
    fsz = W * H * 3
    small, last = [], None
    prev = None; energy = []
    frames_kept = {}
    i = 0
    while True:
        b = dec.stdout.read(fsz)
        if len(b) < fsz: break
        a = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        last = a
        s = np.asarray(Image.fromarray(a).convert("L").resize((108, 192))).astype(int)
        energy.append(0 if prev is None else np.abs(s - prev).mean()); prev = s
        if i % 6 == 0: frames_kept[i] = a.copy()
        i += 1
    dec.wait()

    src = np.asarray(Image.open(os.path.join(D, "all", "src", n + ".jpg")).convert("RGB").resize((W, H))).astype(int)
    m = np.asarray(Image.open(os.path.join(D, "all", "mask", n + ".png")).convert("L").resize((W, H)))
    textpx = m > 200
    diff = np.abs(src - last.astype(int)).mean(axis=2)
    tdiff = diff[textpx].mean() if textpx.any() else 0.0
    peak = int(np.argmax(energy))
    key = min(frames_kept, key=lambda k: abs(k - peak))
    Image.fromarray(frames_kept[key]).save(os.path.join(D, "all", "_peak", n + ".png"))
    rows.append((n, tdiff, len(energy)))
    if tdiff > 3.0: bad.append(n)

print(f"{'clip':34s} {'text drift':>10s}  frames")
for n, t, f in rows:
    flag = "  <-- CHECK" if t > 3.0 else ""
    print(f"{n:34s} {t:10.2f}  {f}{flag}")
print("\nfailing text lock:", bad if bad else "none")
