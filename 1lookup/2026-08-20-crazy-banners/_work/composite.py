# Composite the real 1lookup wordmark onto every *-raw.png and emit delivery files.
# Batch-6 rule: never let the model draw the logo; paste the real one afterwards.
# Landscape raws are 1200x624 and deliver at 1200x628 (aspect fix per the claims bank).
#
# Two corrections over the first version of this script:
#  1. Concepts whose artwork ALREADY carries a hand-made "1lookup" (the analog
#     surfaces) must NOT get a second pasted mark. They deliver clean only.
#  2. A fixed bottom-left paste collided with the CTA button on half the loud
#     concepts, so the corner is chosen per image: the flattest (emptiest) of the
#     four corners wins, measured by pixel standard deviation.
import json, os
from PIL import Image, ImageStat

WORK = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(WORK)
concepts = {c["id"]: c for c in json.load(open(os.path.join(WORK, "concepts.json")))}
wm = Image.open(os.path.join(WORK, "wordmark.png")).convert("RGBA")

# Artwork that already spells the brand on the surface itself.
BRAND_IN_ART = {"receipt", "notebook-todo", "missing-flyer", "sidewalk-chalkboard", "windshield-flyer"}

def place(im, corner_frac, margin_frac=0.038):
    w, h = im.size
    target_w = int(w * corner_frac)
    mark = wm.resize((target_w, int(wm.height * target_w / wm.width)), Image.LANCZOS)
    mx, my = int(w * margin_frac), int(h * margin_frac)
    cands = {
        "bl": (mx, h - mark.height - my),
        "br": (w - mark.width - mx, h - mark.height - my),
        "tl": (mx, my),
        "tr": (w - mark.width - mx, my),
    }
    pad = int(mark.height * 0.5)
    best, best_score = None, None
    for name, (x, y) in cands.items():
        box = (max(0, x - pad), max(0, y - pad),
               min(w, x + mark.width + pad), min(h, y + mark.height + pad))
        st = ImageStat.Stat(im.crop(box).convert("L"))
        score = st.stddev[0]
        if best_score is None or score < best_score:
            best, best_score = name, score
    im.alpha_composite(mark, cands[best])
    return im, best, round(best_score, 1)

made = []
for f in sorted(os.listdir(WORK)):
    if not f.endswith("-raw.png"):
        continue
    cid, shape = f.replace("1lookup-", "").replace("-raw.png", "").rsplit("-", 1)
    im = Image.open(os.path.join(WORK, f)).convert("RGBA")
    if shape == "landscape":
        im = im.resize((1200, 628), Image.LANCZOS)
    frac = 0.16 if shape == "landscape" else 0.20
    if cid in BRAND_IN_ART:
        out = os.path.join(OUT, f"1lookup-{cid}-{shape}.png")
        im.convert("RGB").save(out)
        made.append((os.path.basename(out), "brand already in artwork"))
        continue
    branded, corner, score = place(im.copy(), frac)
    out = os.path.join(OUT, f"1lookup-{cid}-{shape}.png")
    branded.convert("RGB").save(out)
    made.append((os.path.basename(out), f"wordmark {corner} (flatness {score})"))
    # Native-family frames also ship clean: on Reddit a pasted mark breaks the illusion.
    if concepts.get(cid, {}).get("family") == "native":
        outc = os.path.join(OUT, f"1lookup-{cid}-{shape}-clean.png")
        im.convert("RGB").save(outc)
        made.append((os.path.basename(outc), "clean, no mark"))

print(f"wrote {len(made)} delivery files")
for n, why in made:
    print(f"  {n:52} {why}")
