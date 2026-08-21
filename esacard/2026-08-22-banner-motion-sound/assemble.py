#!/usr/bin/env python3
"""Turn a 10s Kling banner clip into a 15s TikTok ad with the animal's own sound and music.

Four steps, in order:
 1. LOCK THE TEXT. Everything outside the animal's window is repainted from the source banner
    on every frame, so the headline, the price, the URL and the button cannot warp. Kling drifts
    slightly over 10 seconds (it turned "esacard.com" into "esacard.coni" on the duck), and this
    removes that risk rather than checking for it.
 2. REACH 15 SECONDS. Kling maxes out at 10s, so the clip runs forward then plays back in
    reverse. Reverse is seamless here because the motion is a blink and a breath: run backwards
    it is still a blink and a breath, and the join is on an identical frame.
 3. SYNC THE SOUND. The animal's sound lands on its biggest movement, found by measuring
    per-frame motion inside the window rather than guessing a timestamp. It fires twice: once
    on the forward pass, once on the reverse.
 4. MIX. Music sits well under the animal so the sound effect is the thing you notice.
"""
import os, subprocess, json
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1080, 1920, 24
TARGET = 15.0
FEATHER = 9
MUSIC_VOL = 0.13     # music sits under the animal, it is not the point
SFX_VOL = 1.0

WIN = {
    "alligator": [(0, 760, 495, 1300)],
    "duck":      [(95, 495, 285, 810), (95, 810, 470, 1280)],
    "cat":       [(0, 1060, 465, 1920)],
}

def sh(*a):
    subprocess.run(list(a), check=True)

def mask_for(boxes):
    m = Image.new("L", (W, H), 0)          # black = frozen banner
    d = ImageDraw.Draw(m)
    for b in boxes:
        d.rectangle(b, fill=255)           # white = video shows through
    return m.filter(ImageFilter.GaussianBlur(FEATHER))

for name, boxes in WIN.items():
    src = Image.open(os.path.join(D, f"src-{name}.jpg")).convert("RGB").resize((W, H))
    mask = mask_for(boxes)
    raw_dir = os.path.join(D, "_qa", "f-" + name)
    out_dir = os.path.join(D, "_qa", "c-" + name)
    os.makedirs(raw_dir, exist_ok=True); os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(raw_dir): os.remove(os.path.join(raw_dir, f))
    for f in os.listdir(out_dir): os.remove(os.path.join(out_dir, f))
    sh(FF, "-y", "-loglevel", "error", "-i", os.path.join(D, f"raw-{name}.mp4"),
       os.path.join(raw_dir, "f%04d.png"))
    names = sorted(os.listdir(raw_dir))

    # composite + measure motion inside the window
    energy, prev = [], None
    x0, y0, x1, y1 = boxes[0][0], min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes)
    for i, n in enumerate(names):
        v = Image.open(os.path.join(raw_dir, n)).convert("RGB").resize((W, H))
        Image.composite(v, src, mask).save(os.path.join(out_dir, n))
        cur = np.asarray(v.crop((x0, y0, x1, y1)).convert("L").resize((120, 200))).astype(int)
        energy.append(0 if prev is None else float(np.abs(cur - prev).mean()))
        prev = cur

    fwd = len(names)
    need = int(TARGET * FPS) - fwd
    order = list(range(fwd)) + list(range(fwd - 1, fwd - 1 - need, -1))

    seq = os.path.join(D, "_qa", "s-" + name)
    os.makedirs(seq, exist_ok=True)
    for f in os.listdir(seq): os.remove(os.path.join(seq, f))
    for j, idx in enumerate(order):
        os.link(os.path.join(out_dir, names[idx]), os.path.join(seq, "q%04d.png" % j))

    silent = os.path.join(D, "_qa", name + "-silent.mp4")
    sh(FF, "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(seq, "q%04d.png"),
       "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", silent)

    # Place each hit on the biggest movement inside a window, not on the global peak. The
    # global peak alone put both alligator hits at 9.6s and 10.1s and left the first nine
    # seconds silent, which is the opposite of what a scroll-stopper needs: the viewer has to
    # hear the animal almost immediately, and again late enough to carry the second half.
    energy_out = [energy[i] for i in order]

    def peak_between(lo_s, hi_s, fallback_s):
        lo, hi = int(lo_s * FPS), min(int(hi_s * FPS), len(energy_out))
        if hi <= lo:
            return fallback_s
        window = energy_out[lo:hi]
        return (lo + int(np.argmax(window))) / FPS

    t1 = max(0.5, peak_between(0.5, 3.5, 1.2) - 0.15)
    t2 = max(t1 + 4.0, peak_between(8.0, 13.0, 9.5) - 0.15)
    t2 = min(t2, TARGET - 1.4)

    out = os.path.join(D, "upload", name + "-15s.mp4")
    os.makedirs(os.path.join(D, "upload"), exist_ok=True)
    filt = (
        f"[1:a]atrim=0:{TARGET},asetpts=N/SR/TB,volume={MUSIC_VOL},"
        f"afade=t=in:d=1.2,afade=t=out:st={TARGET-2.0}:d=2.0[m];"
        f"[2:a]asplit=2[s1][s2];"
        f"[s1]volume={SFX_VOL},adelay={int(t1*1000)}|{int(t1*1000)}[d1];"
        f"[s2]volume={SFX_VOL},adelay={int(t2*1000)}|{int(t2*1000)}[d2];"
        f"[m][d1][d2]amix=inputs=3:duration=first:normalize=0,"
        f"alimiter=limit=0.95,atrim=0:{TARGET}[a]"
    )
    sh(FF, "-y", "-loglevel", "error", "-i", silent,
       "-i", os.path.join(D, "music.wav"), "-i", os.path.join(D, f"sfx-{name}.wav"),
       "-filter_complex", filt, "-map", "0:v", "-map", "[a]",
       "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", out)
    print(f"OK   {name:10s} {len(order)} frames  sound at {t1:.1f}s and {t2:.1f}s  "
          f"{os.path.getsize(out)/1024/1024:.1f}MB")
