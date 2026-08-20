# Composite the real 1lookup wordmark onto every *-raw.png and emit delivery files.
# Batch-6 rule: never let the model draw the logo; paste the real one afterwards.
# Landscape raws are 1200x624 and deliver at 1200x628 (aspect fix per the claims bank).
# Analog/native concepts keep a clean no-logo delivery too (Reddit/native lesson).
import json, os, sys
from PIL import Image

WORK = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(WORK)  # batch folder
concepts = {c["id"]: c for c in json.load(open(os.path.join(WORK, "concepts.json")))}
wm = Image.open(os.path.join(WORK, "wordmark.png")).convert("RGBA")

def place(im, corner_frac=0.20, margin_frac=0.035):
    w, h = im.size
    target_w = int(w * corner_frac)
    scale = target_w / wm.width
    mark = wm.resize((target_w, int(wm.height * scale)), Image.LANCZOS)
    mx = int(w * margin_frac)
    my = int(h * margin_frac)
    im.alpha_composite(mark, (mx, h - mark.height - my))
    return im

made = []
for f in sorted(os.listdir(WORK)):
    if not f.endswith("-raw.png"):
        continue
    parts = f.replace("1lookup-", "").replace("-raw.png", "").rsplit("-", 1)
    cid, shape = parts[0], parts[1]
    im = Image.open(os.path.join(WORK, f)).convert("RGBA")
    if shape == "landscape":
        im = im.resize((1200, 628), Image.LANCZOS)
    native = concepts.get(cid, {}).get("lens") in ("analog2",) or concepts.get(cid, {}).get("family") == "native"
    frac = 0.16 if shape == "landscape" else 0.20
    out_branded = os.path.join(OUT, f"1lookup-{cid}-{shape}.png")
    place(im.copy(), frac).convert("RGB").save(out_branded)
    made.append(out_branded)
    if native:
        out_clean = os.path.join(OUT, f"1lookup-{cid}-{shape}-clean.png")
        im.convert("RGB").save(out_clean)
        made.append(out_clean)
print(f"wrote {len(made)} delivery files")
for m in made:
    print(" ", os.path.basename(m))
