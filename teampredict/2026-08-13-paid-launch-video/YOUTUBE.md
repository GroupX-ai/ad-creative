# TeamPredict video ads on YouTube — published 2026-08-18

All six batch-9 clips are live and public on the TeamPredict channel, posted through the
Postiz integration `cmsxwhih909k5t90yifeh7a8l`.

**Channel:** https://www.youtube.com/channel/UCTgTZag9aozWRhh7sRreiBg

| | Concept | Link |
|---|---|---|
| v1 | Not Worried About Anyone Quitting? Keep Scrolling. | https://www.youtube.com/watch?v=1GUZuJSjumA |
| v2 | What If We Got You A Standing Desk? | https://www.youtube.com/watch?v=6xwcJ9Gp1PQ |
| v3 | Here We Observe The Manager In His Natural Habitat | https://www.youtube.com/watch?v=egw6k35srDY |
| v4 | A Pizza Party Is Not A Retention Strategy | https://www.youtube.com/watch?v=Jf-9HxBj8mY |
| v5 | Will Anyone On My Team Quit? | https://www.youtube.com/watch?v=1IhtAxgimPY |
| v6 | Everyone Uses This On Their Own Team. I Use It On My Competitors. | https://www.youtube.com/watch?v=QkY-g0GLeSo |

Every upload is the `*-1080p-captioned.mp4` deliverable, so all six carry the burned-in
one-word captions with size and colour emphasis. Public, not made for kids, tagged, with the
approved copy bank in each description.

## Finding the channel took longer than posting to it

**Postiz publishes but never reports back the permalink**, which the VoiceDrop deploy on
2026-08-13 already recorded. `postsListTool` gives state (`PUBLISHED`) and nothing else, so
"did it work" has to be answered from YouTube's side.

Two traps on that side, both hit here:

1. **`youtube.com/@teampredict` is somebody else's channel.** It resolves 200, it is titled
   "TeamPREDiCT", and it carries unrelated videos. Guessing a handle from the brand name is
   not identification. Anything published to a guessed handle would have been reported as
   ours on no evidence at all.
2. **A brand-new upload is not in YouTube search yet**, so searching the exact title returns
   nothing for a while and reads exactly like a failed publish.

What worked: YouTube's **channel-filtered search** (`&sp=EgIQAg%3D%3D`) returns ~20 channels
matching "TeamPredict", and fetching each one's `/videos` page and grepping for a title we
published identifies ours in one pass. The real channel is `UCTgTZag9aozWRhh7sRreiBg`. Video
ids then come off that page and resolve through the public oEmbed endpoint, which also proves
each video is genuinely public rather than merely uploaded.

**The InnerTube Shorts-tab endpoint that recovered the VoiceDrop ids returned nothing here**,
even though these clips are vertical and under 60 seconds. They currently sit on the Videos
tab. Do not treat an empty Shorts tab as "nothing published".

## Two things left open

1. **The AI-content disclosure is not set.** All six are fully AI-generated video with
   realistic people, which YouTube's altered-or-synthetic-content policy expects to be
   disclosed at upload. Postiz's YouTube schema exposes only title, visibility,
   made-for-kids, thumbnail and tags, so the toggle cannot be set through it. It has to be
   switched on per video in YouTube Studio. The Meta equivalent is already declared on every
   one of these creatives.
2. **Google Ads video is now unblocked.** Demand Gen needs a YouTube video id, which is why
   the batch-9 launch skipped Google video entirely. Six ids now exist. Whether to spend
   there is a separate question: Google has taken $366 in 30 days for 0 signups, and the
   Mixpanel funnel says the loss is the signup form rather than the ads (21 people clicked
   the trial button site-wide in 30 days, all 21 reached the signup page, 1 finished).
