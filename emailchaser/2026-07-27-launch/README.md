# Emailchaser paid ads launch batch (2026-07-27)

Assets generated for the $10K/month Google + Meta launch (built 2026-07-27, campaigns created paused in both platforms). Generated with fal `openai/gpt-image-2` (quality high, ~$0.20/image) per the recipe and guardrails in the www repo's `AD_CREATIVE_PLAYBOOK.md`. All copy is from the approved copy bank (claims that literally appear on emailchaser.com): no invented stats, no warmup claims. The two logo files are rasterized from the site's real `public/images/emailchaser.svg` via headless Chromium, not AI-generated.

## Files

| File | Size | Use |
|---|---|---|
| emailchaser-c1-vertical.png | 1080x1920 | Meta Stories/Reels, concept 1 "Cold Email That Lands in Primary" (generated 1088x1920, center-cropped) |
| emailchaser-c2-vertical.png | 1080x1920 | Meta Stories/Reels, concept 2 "Start Cold Emailing for $1" |
| emailchaser-c3-square.png | 1024x1024 | Meta feed + Google display, concept 3 "Send Thousands of Emails Each Day" / "Without going to spam." |
| emailchaser-c3-landscape.png | 1200x628 | Meta link ads + Google display, concept 3 (generated 1200x624, resized) |
| emailchaser-c4-square.png | 1024x1024 | Meta feed, concept 4 "Consistently Book More Meetings" / "Use AI to personalize emails." |
| emailchaser-c4-landscape.png | 1200x628 | Meta link ads + Google display, concept 4 |
| emailchaser-logo-512.png | 512x512 | Square logo (1:1), from the site SVG |
| emailchaser-logo-512x128.png | 512x128 | Landscape logo (4:1), badge + wordmark, required by Google responsive display |

## Where they were uploaded

- **Meta ad account 1431808552119912** image library hashes: c1-vertical `cf07f62ac5de1d3a740d6f52807b3872`, c2-vertical `1b74f7c7e68f6726f092428ccc981cc5`, c3-square `1abb4936fa499d59d9df0e9a40eb74af`, c3-landscape `a8cb2c00accceeaaa00e29cb5ed2d327`, c4-square `db8c605cad8bc7727f5c6f38d034959b`, c4-landscape `05d6734d9e3e33919c6c156840423bca`. (The 2026-07-20 banner batch c1/c2 square+landscape was also uploaded: `d6263b41...`, `a9463a89...`, `283b4a96...`, `26085596...`.)
- **Google Ads account 193-108-3050** image assets: c1-landscape `assets/399436561295`, c3-landscape `assets/399436562558`, c1-square `assets/399436569365`, c3-square `assets/399538081861`, logo 4:1 `assets/399538424866`, logo 1:1 `assets/399436434371` (unused: Google's responsive display `logo_images` field requires 4:1).

## Prompts

New concepts (c3, c4) and verticals reuse the c1/c2 prompt templates from `2026-07-20-banners/README.md` and the www playbook, with these headline/subline/CTA substitutions and the standard no-extra-text constraint:

- **c3**: headline "Send Thousands of Emails Each Day" ("Thousands" in #1179FC), subline "Without going to spam.", CTA "START FOR FREE", white background, rising flow of blue envelope icons.
- **c4**: headline "Consistently Book More Meetings" ("Meetings" in #1179FC), subline "Use AI to personalize emails.", CTA "START YOUR 7-DAY FREE TRIAL", night navy background (#030711 to #010D39), minimal calendar UI card with three filled time slots, lime #AEFF49 dot.
- **verticals (c1, c2)**: same text as the square versions, "tall vertical 9:16" composition, headline top third, visual middle, button lower third, story-safe margins. Generated at 1088x1920 (multiples of 16), delivered center-cropped to 1080x1920.

QA: every render reviewed at full size on 2026-07-27; exact spelling, no feature chips, no invented numbers.
