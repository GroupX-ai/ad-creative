#!/usr/bin/env python3
"""Step 2: composite the text back on, and stretch 10s to 15s. No API calls.

Frames are streamed through pipes rather than written to disk. 32 clips x 240 frames as PNGs is
about 15 GB and the session's disk allowance is a fraction of that, so raw RGB goes straight
from ffmpeg's stdout into numpy and back into ffmpeg's stdin.

Two things happen per frame:
  1. The freeze mask from prep.py repaints every glyph and the button from the source banner,
     so the type cannot warp and, because video plays everywhere else, the animal can open its
     mouth as wide as it likes without being clipped.
  2. The clip runs forward then backward to reach 15s, because Kling's ceiling is 10s. A mouth
     opening and closing reads the same run backwards, and the join is an identical frame.
"""
import os, subprocess, json
import numpy as np
from PIL import Image
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
W, H, FPS, TARGET = 1080, 1920, 24, 15.0

os.makedirs(os.path.join(D, "all", "silent"), exist_ok=True)
import sys
if len(sys.argv) > 1:
    names = sys.argv[1].split(",")
else:
    names = sorted(n[:-4] for n in os.listdir(os.path.join(D, "all", "raw")) if n.endswith(".mp4"))

for name in names:
    src = np.asarray(Image.open(os.path.join(D, "all", "src", name + ".jpg")).convert("RGB").resize((W, H))).astype(np.uint8)
    m = np.asarray(Image.open(os.path.join(D, "all", "mask", name + ".png")).convert("L").resize((W, H))).astype(np.float32) / 255.0
    m = m[:, :, None]

    dec = subprocess.Popen(
        [FF, "-loglevel", "error", "-i", os.path.join(D, "all", "raw", name + ".mp4"),
         "-vf", f"scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        stdout=subprocess.PIPE)
    fsz = W * H * 3
    frames = []
    while True:
        b = dec.stdout.read(fsz)
        if len(b) < fsz: break
        v = np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(np.float32)
        frames.append((v * (1 - m) + src * m).astype(np.uint8))
    dec.wait()

    # Ping-pong, tiled. A 10s source reaches 15s with one forward pass and a partial reverse.
    # The stubborn clips are re-rendered at 5s, because Kling drifts far less over 5 seconds
    # than over 10, and a 5s source needs the cycle repeated: forward, back, forward again.
    fwd = len(frames)
    cycle = list(range(fwd)) + list(range(fwd - 2, 0, -1))
    need = int(TARGET * FPS)
    order = (cycle * (need // len(cycle) + 2))[:need]
    out = os.path.join(D, "all", "silent", name + ".mp4")
    enc = subprocess.Popen(
        [FF, "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
         "-s", f"{W}x{H}", "-framerate", str(FPS), "-i", "-",
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", out],
        stdin=subprocess.PIPE)
    for i in order:
        enc.stdin.write(frames[i].tobytes())
    enc.stdin.close(); enc.wait()
    print(f"  {name:32s} {fwd} -> {len(order)} frames  {os.path.getsize(out)/1024/1024:.1f}MB")
