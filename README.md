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
- Generation: fal API. Banners `openai/gpt-image-2` (~$0.20/image, quality high). Video: `fal-ai/veo3.1/fast` (UGC/dialogue, ~$0.15/s), `fal-ai/kling-video/v2.5-turbo/pro/image-to-video` (animate a banner, ~$0.35/5s), and `bytedance/seedance-2.5/text-to-video` for a full 30-second ad from one prompt with synced dialogue (~$6.17 at 480p, ~$13.87 at 720p; generate at 480p and upscale with `fal-ai/bytedance-upscaler/upscale/video` for ~$0.22). Scripts, prompts and the anti-slop recipe live in `_scripts/`; see `resources/paid-ads-creative-playbook.md` in the vault.
- One-word captions: `_scripts/seedance-captions.mjs <video.mp4> <audio.mp3>` burns TikTok-style single-word centre subtitles from speech-to-text word timings, rejoining split brand names ("Voice Drop" back to "VoiceDrop").
- Video QA is mandatory and scripted: `_scripts/seedance-qa.mjs` builds a contact sheet and splits the audio, `_scripts/seedance-transcribe.mjs` transcribes the dialogue so spoken claims and brand names can be checked word for word. Nothing ships from here unwatched.
- Delivered/agency batches: finished creative delivered from outside the fal pipeline (paid-social sets, OOH billboard mockups) keeps its original vendor filenames — `<CO>_<placement>_<WxH>_<version>_<month>.png` (e.g. `TP_FB_1080x1080_v1_JUL26.png`) — rather than the `<company>-c<N>-...` scheme, since it carries platform/size/version the three-format scheme can't. The batch `README.md` records the concept, angle and on-creative copy in place of a generation prompt.
