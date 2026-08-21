#!/usr/bin/env python3
"""Step 4: mix the generated animal sound with the music bed and write the deliverables.

The highpass and gate on the animal track strip MMAudio's noise floor, which is the usual
reason its output reads as hiss rather than as an animal. Music sits well under it so the
animal is the thing you notice, and clips whose animal is silent in real life get the music
alone at a higher level.
"""
import os, subprocess, re
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
SIL = os.path.join(D, "all", "silent")
SFX = os.path.join(D, "all", "sfx")
OUT = os.path.join(D, "all", "upload")
os.makedirs(OUT, exist_ok=True)

MUSIC = os.path.join(D, "music.wav")
names = sorted(n[:-4] for n in os.listdir(SIL) if n.endswith(".mp4"))

for n in names:
    sfx = os.path.join(SFX, n + ".mp4")
    out = os.path.join(OUT, n + ".mp4")
    if os.path.exists(sfx):
        filt = ("[1:a]highpass=f=90,agate=threshold=0.035:ratio=6:attack=8:release=220,"
                "volume=3.0,alimiter=limit=0.92[an];"
                "[2:a]atrim=0:15,asetpts=N/SR/TB,volume=0.10,afade=t=in:d=1.2,"
                "afade=t=out:st=13:d=2[mu];"
                "[an][mu]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95,atrim=0:15[a]")
        cmd = [FF, "-y", "-loglevel", "error", "-i", os.path.join(SIL, n + ".mp4"),
               "-i", sfx, "-i", MUSIC, "-filter_complex", filt]
    else:
        filt = ("[1:a]atrim=0:15,asetpts=N/SR/TB,volume=0.55,afade=t=in:d=1.2,"
                "afade=t=out:st=13:d=2,alimiter=limit=0.95[a]")
        cmd = [FF, "-y", "-loglevel", "error", "-i", os.path.join(SIL, n + ".mp4"),
               "-i", MUSIC, "-filter_complex", filt]
    cmd += ["-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", out]
    subprocess.run(cmd, check=True)
    info = subprocess.run([FF, "-i", out], capture_output=True, text=True).stderr
    dur = re.search(r"Duration: (\d+:\d+:\d+\.\d+)", info).group(1)
    res = re.search(r"(\d{3,}x\d{3,})", info).group(1)
    aud = "audio" if "Audio:" in info else "NO AUDIO"
    tag = "sound" if os.path.exists(sfx) else "music-only"
    print(f"  {n:32s} {dur} {res} {aud} {tag} {os.path.getsize(out)/1024/1024:.1f}MB")
