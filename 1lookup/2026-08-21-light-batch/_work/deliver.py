# Emit delivery files. No compositing this batch: every concept renders the wordmark
# inside the scene (printed on the card, written on the whiteboard, in the app header),
# which is what the rulebook asks for and what the account's best-performing static does.
# Landscape renders at 1200x624 because both dimensions must be multiples of 16, and
# delivers at 1200x628 (Meta's 1.91:1), so the resize is mandatory, not cosmetic.
import json, os
from PIL import Image

WORK = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(WORK)
concepts = json.load(open(os.path.join(WORK, "concepts.json")))

made, missing = [], []
for c in concepts:
    for shape, size in (("square", (1024, 1024)), ("landscape", (1200, 628))):
        src = os.path.join(WORK, f"1lookup-{c['id']}-{shape}-raw.png")
        if not os.path.exists(src):
            missing.append(os.path.basename(src)); continue
        im = Image.open(src).convert("RGB")
        if im.size != size:
            im = im.resize(size, Image.LANCZOS)
        dst = os.path.join(OUT, f"1lookup-{c['id']}-{shape}.png")
        im.save(dst)
        assert Image.open(dst).size == size, dst
        made.append((os.path.basename(dst), f"{size[0]}x{size[1]}"))

print(f"wrote {len(made)} delivery files, {len(missing)} missing")
for n, s in made: print(f"  {n:52} {s}")
if missing: print("MISSING:", missing)
