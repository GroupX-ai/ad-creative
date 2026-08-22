#!/usr/bin/env python3
"""Turn 1Capture's real logo component into SVG + PNG for compositing.

The marketing repo ships its wordmark as a React component
(public/logos/1c-white-logo.jsx) whose body is a literal <svg>. That IS the
real vector asset, so the rule "composite the real mark, never describe it"
is satisfied by extracting it, not by drawing anything new.

Two variants come out of ONE source file, per the playbook's rule that a light
ground gets a dark-ink variant of the same mark rather than a different mark:
  white  - wordmark in white, for dark grounds
  ink    - the same paths in the brand navy #0A2540, for light grounds
The blurple gradient tile ("1C") is untouched in both: it is the brand colour.
"""
import re, sys, pathlib
import cairosvg

SRC = pathlib.Path("/home/user/1Capture-Marketing/public/logos/1c-white-logo.jsx")
OUT = pathlib.Path("/home/user/ad-creative/_work/logo")
OUT.mkdir(parents=True, exist_ok=True)
INK = "#0A2540"  # tailwind.config.js -> colors.ink.DEFAULT / 1capture.dark

src = SRC.read_text()
svg = src[src.index("<svg"): src.index("</svg>") + len("</svg>")]

# JSX -> XML: braced numbers become quoted, camelCase attrs become hyphenated,
# and the React-only spread disappears.
svg = svg.replace("{...props}", "")
svg = re.sub(r'=\{([\d.]+)\}', r'="\1"', svg)
for jsx, xml in [
    ("fillRule", "fill-rule"), ("clipRule", "clip-rule"), ("fillOpacity", "fill-opacity"),
    ("strokeWidth", "stroke-width"), ("strokeLinecap", "stroke-linecap"),
    ("strokeLinejoin", "stroke-linejoin"), ("stopColor", "stop-color"),
    ("stopOpacity", "stop-opacity"), ("gradientUnits", "gradientUnits"),
    ("clipPath", "clip-path"), ("xmlnsXlink", "xmlns:xlink"),
]:
    svg = svg.replace(jsx, xml)
svg = re.sub(r'\s+xmlns="http://www\.w3\.org/2000/svg"', '', svg, count=0)
svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"', 1)

variants = {"white": svg, "ink": svg.replace('fill="white"', f'fill="{INK}"')}
for name, body in variants.items():
    p = OUT / f"1capture-logo-{name}.svg"
    p.write_text(body)
    # 8x the intrinsic 147x32 so a composited mark stays crisp on a 1080-wide frame
    cairosvg.svg2png(url=str(p), write_to=str(OUT / f"1capture-logo-{name}.png"),
                     output_width=147 * 8, output_height=32 * 8)
    print(f"{p.name} -> {(OUT / f'1capture-logo-{name}.png').name}")

# The bare tile alone (the "1C" square), for a small corner mark on photos.
tile = re.sub(r'viewBox="0 0 147 32"', 'viewBox="0 0 43.8 30.3"', svg)
tile = re.sub(r'width="147"', 'width="43.8"', tile)
tile = re.sub(r'height="32"', 'height="30.3"', tile)
(OUT / "1capture-tile.svg").write_text(tile)
cairosvg.svg2png(url=str(OUT / "1capture-tile.svg"),
                 write_to=str(OUT / "1capture-tile.png"), output_width=440, output_height=304)
print("1capture-tile.svg -> 1capture-tile.png")
