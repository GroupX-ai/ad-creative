# ad-creative

Paid ad creative for the Momentum Labs portfolio: upload-ready assets plus the exact generation prompts, so any winner can be re-rendered or edited later.

## Layout

`<company>/<YYYY-MM-DD-batchname>/` holds the finished assets (PNG banners, MP4 videos) with a `README.md` listing every file's concept, angle, and exact generation prompt.

Companies: `voicedrop/`, `1lookup/`, `teampredict/`, `bitpredict/`, `emailchaser/` (more as needed).

## Conventions

- File naming: `<company>-c<N>-<square|landscape|vertical>.png` for banners; descriptive names for video.
- Sizes: square 1024x1024 (Meta feed 1:1), landscape 1200x628 (Meta link ads 1.91:1), vertical 1080x1920 (Stories/Reels 9:16).
- Every asset was reviewed before landing here: exact spelling, no invented claims or stats, no third-party logos, brand colors correct.
- Brand kits, approved-claims banks and guardrails live in each marketing repo as `AD-CREATIVE-PLAYBOOK.md` (the source of truth for making new creative). Cross-portfolio process: `resources/paid-ads-creative-playbook.md` in the second-brain vault.
- Generation: fal API. Banners `openai/gpt-image-2` (~$0.20/image, quality high). Video: `fal-ai/veo3.1/fast` (UGC/dialogue, ~$0.15/s) and `fal-ai/kling-video/v2.5-turbo/pro/image-to-video` (animate a banner, ~$0.35/5s).
