#!/usr/bin/env python3
"""Measure how far Kling drifted the framing on each clip.

The prompt says the camera is locked off. Some clips obey and some slowly zoom in, and a zoom
is fatal here: the video carries its own rendering of the banner's text, so when the frame
grows, that text grows with it and ends up beside the frozen copy painted on top. Two headlines,
slightly offset. That is the ghosting on w2-alligator and w3-raven.

Estimates one similarity transform (uniform scale + translation) for the last frame of the
forward pass against the source still, by brute force on a small grayscale copy.
"""
import os, subprocess, sys
import numpy as np
from PIL import Image
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
SW, SH = 135, 240        # search on a tiny copy; drift is a global transform, detail is noise

def gray_small(a):
    return np.asarray(Image.fromarray(a).convert("L").resize((SW, SH), Image.BILINEAR)).astype(np.float32)

def warp(img, s, dx, dy):
    """Scale about the centre then translate, on the small grid."""
    h, w = img.shape
    nw, nh = max(2, int(round(w * s))), max(2, int(round(h * s)))
    r = np.asarray(Image.fromarray(img).resize((nw, nh), Image.BILINEAR))
    out = np.full((h, w), img.mean(), np.float32)
    ox, oy = (w - nw) // 2 + dx, (h - nh) // 2 + dy
    xs0, ys0 = max(0, ox), max(0, oy)
    xs1, ys1 = min(w, ox + nw), min(h, oy + nh)
    if xs1 <= xs0 or ys1 <= ys0: return out
    out[ys0:ys1, xs0:xs1] = r[ys0 - oy:ys1 - oy, xs0 - ox:xs1 - ox]
    return out

def estimate(ref, mov):
    best = (1e18, 1.0, 0, 0)
    for s in np.arange(0.90, 1.121, 0.01):
        for dy in range(-16, 17, 2):
            for dx in range(-16, 17, 2):
                d = np.abs(warp(mov, 1 / s, 0, 0) if False else warp(mov, s, dx, dy) - ref).mean()
                if d < best[0]: best = (d, s, dx, dy)
    return best

def last_forward_frame(path, n_forward):
    dec = subprocess.Popen([FF, "-loglevel", "error", "-i", path, "-vf", "scale=1080:1920",
                            "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    fsz = 1080 * 1920 * 3; i = 0; last = None
    while True:
        b = dec.stdout.read(fsz)
        if len(b) < fsz: break
        last = np.frombuffer(b, np.uint8).reshape(1920, 1080, 3)
        i += 1
    dec.wait(); return last

names = sorted(n[:-4] for n in os.listdir(os.path.join(D, "all", "raw")) if n.endswith(".mp4"))
print(f"{'clip':34s} {'scale':>7s} {'dx':>5s} {'dy':>5s}   drift")
bad = []
for n in names:
    src = gray_small(np.asarray(Image.open(os.path.join(D, "all", "src", n + ".jpg")).convert("RGB").resize((1080, 1920))))
    lf = gray_small(last_forward_frame(os.path.join(D, "all", "raw", n + ".mp4"), None))
    _, s, dx, dy = estimate(src, lf)
    px = abs(s - 1) * 1920 / 2 + abs(dx) * 8 + abs(dy) * 8
    flag = ""
    if abs(s - 1) > 0.012 or abs(dx) > 2 or abs(dy) > 2:
        flag = "  <-- drifts"; bad.append(n)
    print(f"{n:34s} {s:7.3f} {dx:5d} {dy:5d}  ~{px:5.0f}px{flag}")
print("\ndrifting clips:", len(bad))
open(os.path.join(D, "all", "drift.txt"), "w").write("\n".join(bad))
