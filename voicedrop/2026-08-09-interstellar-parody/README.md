# voicedrop — 2026-08-09-interstellar-parody

Parody of the Interstellar "make him stay, Murph" bookshelf scene, rebuilt for VoiceDrop.
One deliverable: `voicedrop-interstellar-parody-vertical.mp4`, 59.6s, 720x1280 (9:16), 24fps,
AAC 48kHz, -13.2 LUFS integrated, ~16 MB. Vertical because that is where the VoiceDrop Meta
spend runs (Reels/Stories/feed); a 16:9 pass is a re-render, not a re-shoot.

Generated with fal. Video: `bytedance/seedance-2.5/reference-to-video` (720p, native
synchronised dialogue audio, ~$0.4730/s). Stills: `openai/gpt-image-2` and
`fal-ai/nano-banana-pro/edit`. Score: `fal-ai/elevenlabs/music`. Dialogue verified with
`fal-ai/elevenlabs/speech-to-text/scribe-v2`. Cut, mixed and subtitled with ffmpeg.

**Spend: roughly $31.** Estimated from fal's posted per-second rates (63s of accepted 720p
video plus stills, score and transcription), not reconciled against a fal invoice.

## The idea

The original scene's hook is a man screaming at someone who cannot hear him. Here the man
behind the bookshelf is the *same salesman, further down the road*, trying to stop his past
self from leaving one more voicemail. That is what earns the "I used to do this too" line and
makes the reveal land instead of being a non-sequitur.

Structure, against the notes on the previous version:

- **17.1 seconds of pure pleading before a single product word.** Nothing about VoiceDrop
  happens until the hook has fully run.
- **VoiceDrop is first named at 46.2s**, 78% of the way in. The payoff is 12 seconds total.
- **Four time-passing beats**, not two: crisp morning shirt and two cups, loosened tie at
  dusk with seven, glassy at midnight with fifteen, then face-down at dawn under a pyramid
  of thirty. The room decays around him.
- **"Cold calling" and "telemarketing" both spoken**, plus the end card headline.
- **Music under every shot**, switching with whoever is on screen and crossfaded (0.55s), not
  cut. The two character beds are sliced *sequentially* from their own bed, so the ghost's
  organ keeps building across the whole ad even while present-day shots interrupt it.
- **Subtitles on every spoken line**, burned in, Poppins Bold, brand gold on "VoiceDrop".
- **The payoff resolves**: hands on the keyboard, one line recorded, the dashboard, the
  Launch Campaign click, then the phone going off over and over while he leans back laughing.

## Shot list

| # | Clip | Len | On screen | Music bed |
|---|---|---|---|---|
| 1 | `c1-ghost-open` | 6.0s | ghost | ghost |
| 2 | `c2-caller-oblivious` | 4.0s | caller | caller |
| 3 | `c3-ghost-dont` | 7.0s | ghost | ghost |
| 4 | `c4a-grind-day` | 6.0s | caller | caller |
| 5 | `c4b-grind-night` | 6.0s | caller | caller |
| 6 | `c5-ghost-usedto` | 6.0s | ghost | ghost |
| 7 | `c6-caller-hears` | 5.0s | caller | caller |
| 8 | `c7-ghost-punch` | 7.0s | ghost | ghost |
| 9 | `c8-payoff` | 9.0s | payoff | payoff |
| — | end card | 3.2s | brand | payoff |

## Script, as spoken in the cut

Verified against the rendered audio with Scribe v2, not assumed from the prompts.

```
0:01  They're not answering!
0:04  You're wasting your time!
      (silence: he cannot hear a word of it)
0:11  Don't do it.
0:12  Don't do it.
0:14  DON'T DO IT!
0:15  Don't leave another message!
0:18  Hey John, just following up!
0:21  Hey, just circling back on my last message.
0:24  Hey, me again, just checking in.
0:26  Hey John... following up again.
0:30  I used to do this too.
0:32  Cold calling all day.
0:34  Leaving voicemails nobody ever hears.
0:37  Wait... what was that?
0:40  Who ARE you?
0:40  That doesn't matter right now.
0:42  The point is, bro...
0:43  you're wasting your whole life telemarketing.
0:46  You need to use VoiceDrop.
0:50  Record your pitch once.
0:52  VoiceDrop sends it to thousands.
      END CARD: STOP COLD CALLING. / VoiceDrop / Get Free Access / voicedrop.ai
```

## Claim safety

No stats, no percentages, no testimonials, no third-party logos anywhere in the film or the
end card. "Sends it to thousands" tracks the site's own "send thousands of ringless
voicemails"; the CTA and domain are the site's. The 9%+ callback rate is deliberately absent
because it is only usable with the Trustpilot attribution, which does not fit here.

## Reference stills

Both characters are the same actor, so the face has to survive across nine separate
generations. The caller still was generated first, then the ghost was **edited from it** so
the identity carries; every clip then passes the relevant still as `@Image1`.

`refs/voicedrop-interstellar-ref-caller.png` — `openai/gpt-image-2`, portrait_16_9, quality high

```text
Cinematic photorealistic vertical film still. a 30-year-old man with short dark brown hair, light stubble, thick dark eyebrows, a straight nose and tired brown eyes, medium build, clean-shaven jawline, sitting at a cluttered desk in a cramped dim home office, wearing a wrinkled white dress shirt with the sleeves rolled up and a loosened thin dark tie, a black call-center headset with a boom microphone over his ear. He looks exhausted and defeated, slumped slightly forward. On the desk: a computer monitor turned away from camera, a corded desk phone, a legal pad covered in scribbled phone numbers, and four empty paper coffee cups. Directly behind him is a tall wooden bookshelf packed with binders and books, filling the whole back wall. Warm dim tungsten desk lamp light from the left, deep shadows, dust motes in the air, muted desaturated color grade, shallow depth of field, 35mm anamorphic film look, heavy film grain. The man's face is clearly lit and fully visible. No text anywhere in the image.
```

`refs/voicedrop-interstellar-ref-ghost.png` — `fal-ai/nano-banana-pro/edit`, 9:16, 2K, input = the caller still

```text
Keep this exact man's face, bone structure and hair identical, but change everything else. Cinematic photorealistic vertical film still: the same man is now standing in an infinite pitch-black void BEHIND a tall wooden bookshelf, seen from the void side. He wears a worn grey hoodie with the hood down, dusty. Both palms are pressed flat against the back panels of the bookshelf as if trying to push through it. His face is desperate and anguished, mouth open mid-shout, eyes wide, brows pulled together. Shafts of violet purple light #9746ff cut between the shelves and rake across his face. Dust and glowing particles hang in the air. Endless dark receding space behind him. Remove the headset, the tie, the shirt, the desk and the office. Cold violet key light, deep black shadows, 35mm anamorphic film look, heavy film grain. No text anywhere in the image.
```

`refs/voicedrop-interstellar-ref-screen.png` — `fal-ai/nano-banana-pro/edit`, 9:16, 2K, input = the caller still

```text
Photorealistic vertical film still, close on a computer monitor on a dark desk. The screen shows a clean modern dark SaaS dashboard: near-black dark purple background #090714, a glowing purple #9746ff audio waveform across the middle, and one large gold gradient #ffd874 to #ffb01f rounded button. The ONLY text anywhere on the screen is the word "VoiceDrop" as a small wordmark in the top left and the words "Launch Campaign" on the gold button. No other words, no numbers, no statistics, no menu labels, no charts, no badges, no percentages anywhere. Purple screen glow spilling onto the dark desk, shallow depth of field, cinematic film grain.
```

## Video prompts

All nine use `bytedance/seedance-2.5/reference-to-video` at `resolution: 720p`,
`aspect_ratio: 9:16`, `generate_audio: true`. Every prompt ends with this suffix, which is
what keeps the score out of the clips (so the beds can be mixed and shifted deliberately)
and keeps the model from burning in its own captions:

```text
 AUDIO: only the spoken English dialogue exactly as written plus quiet natural room tone. No background music, no score, no soundtrack, no singing. VISUAL: no on-screen text, no subtitles, no captions, no watermark, no logos anywhere in frame. Shot on 35mm anamorphic film, heavy grain, muted desaturated grade, deep shadows, handheld camera with a slow push in.
```

### 1. `c1-ghost-open` — 6s, `@Image1` = ghost

```text
@Image1 is the man. He is trapped in an infinite pitch-black void behind a tall wooden bookshelf, violet purple light raking between the shelves across his face. He hammers both fists against the back of the bookshelf and presses his face into the gap between two shelves, screaming through it at someone on the other side who cannot hear him. Wildly exaggerated desperation: eyes bulging, veins standing out on his neck, spit flying, hair shaking loose. He screams at the top of his lungs, voice cracking and raw: "They're not answering!" Then he slams the shelf with an open palm and roars even louder: "You're wasting your time!" Dust and glowing purple particles shake loose and swirl through the light shafts.
```

### 2. `c2-caller-oblivious` — 4s, `@Image1` = caller

The one shot with no dialogue. The contrast between the screaming and this dead room is the joke.

```text
@Image1 is the man. Slow push in over his shoulder in the cramped dim office. He wears the black call-center headset, slumped and hollow-eyed, completely oblivious. He lets out a long dead sigh, drags a hand down his face, then reaches out one finger and presses a key on the desk phone. The wooden bookshelf looms behind him. He does not speak at all, not one word, total silence from him. Only a ticking clock, the hum of the room and one single soft button beep.
```

### 3. `c3-ghost-dont` — 7s, `@Image1` = ghost (take 2)

Take 1 was a good performance but Seedance improvised a garbled extra utterance at 1.5s
between the first and second plea. Take 2 pins the dialogue to exactly four lines. The
"speaks exactly N lines and absolutely nothing else" clause is the fix worth reusing.

```text
@Image1 is the man, in the black void behind the bookshelf, violet light on his face. He claws at the shelves and shoves books off them one by one as he pleads, escalating from a strained whisper to an all-out scream. Enormously exaggerated theatrical performance, tears in his eyes, face contorted, both hands shaking. Books tumble, dust explodes through the purple light shafts. He speaks exactly four short lines and absolutely nothing else. Line one, a broken desperate whisper: "Don't do it." Line two, louder, teeth clenched: "Don't do it." Line three, a full-throated agonised scream, veins bulging: "Don't do it!" Line four, collapsing forward against the shelf, howling: "Don't leave another message!" He must not say any other word at any point. No muttering, no improvised lines, no extra sentences, no words between the four lines, only silence and heavy breathing between them.
```

### 4. `c4a-grind-day` — 6s, `@Image1` = caller

```text
@Image1 is the man at his cluttered desk wearing the black call-center headset, the wooden bookshelf behind him. Two moments on the same day, separated by a hard cut. First, in bright clean morning sunlight, his shirt is crisp and buttoned and only two paper coffee cups sit on the desk. He is wide awake and falsely cheerful, wearing a huge forced salesman grin, bouncing in his chair and drumming his fingers, and he says brightly and far too enthusiastically: "Hey John, just following up!" Hard cut to the same desk in dim orange evening light. His tie is yanked loose, his sleeves are shoved up, seven empty coffee cups now crowd the desk and stubble is coming through. He is flat and worn out, rubbing his eyes with one hand, and he drones the line without any energy left: "Hey, just circling back on my last message."
```

### 5. `c4b-grind-night` — 6s, `@Image1` = caller

```text
@Image1 is the man at the same cluttered desk wearing the headset, the wooden bookshelf behind him. Two moments much later, separated by a hard cut. The room decays between them. First, deep night, the only light a harsh desk lamp. Fifteen empty coffee cups are stacked in towers across the desk, his shirt is untucked and creased, heavy stubble, dark rings under his eyes. He is glassy and mechanical, staring through the monitor, and mumbles flatly: "Hey, me again, just checking in." Hard cut to cold blue pre-dawn light. The desk has vanished under a mountain of thirty coffee cups and crumpled paper. He is unshaven and grey, collar filthy, slumped forward with his cheek resting on the desk, barely conscious, and he rasps the words out in a dead broken whisper without lifting his head: "Hey John... following up again."
```

### 6. `c5-ghost-usedto` — 6s, `@Image1` = ghost

```text
@Image1 is the man in the black void behind the bookshelf. The fight has gone out of him. He slides slowly down the shelf until he is crouched, presses his forehead against the wood, and speaks quietly and sadly through the gap, exhausted and knowing, with big weary hand gestures. He says softly: "I used to do this too." Then, shaking his head with a bitter little laugh: "Cold calling all day." Then, staring into nothing, hollow: "Leaving voicemails nobody ever hears." The violet light dims and pulses slowly like a heartbeat. Dust drifts.
```

### 7. `c6-caller-hears` — 5s, `@Image1` = caller

```text
@Image1 is the man at the desk. His head snaps up sharply and he freezes mid-motion, enormously exaggerated startled double-take, eyes enormous, mouth hanging open, one hand frozen in the air. He pulls the headset off one ear and whispers, spooked: "Wait... what was that?" Then he spins his chair violently around to face the wooden bookshelf behind him, stumbles to his feet knocking a coffee cup over, and shouts at the shelf, terrified and furious at once: "Who ARE you?" Violet purple light begins to bleed out between the shelves and rake across his face. Dust swirls.
```

### 8. `c7-ghost-punch` — 7s, `@Image1` = ghost

```text
@Image1 is the man in the void behind the bookshelf, violet light hard across his face. He waves one hand dismissively at the question, a big comic brush-off shrug: "That doesn't matter right now." He leans in close to the gap between the shelves, points a finger straight through it at the camera and says, building: "The point is, bro..." Then he explodes, screaming with total conviction, both hands gripping the shelf, shaking it: "you're wasting your whole life telemarketing!" Then he drops to a low, hard, absolutely certain voice, staring dead into the lens: "You need to use VoiceDrop." The purple light surges brighter and steadier on the last line.
```

### 9. `c8-payoff` — 9s, `@Image1` = caller, `@Image2` = screen

```text
@Image1 is the man. @Image2 is the computer screen. Fast energetic sequence, the grade lifts from muted brown to clean and bright with violet accents. SHOT 1: extreme close up on his hands slamming down onto the keyboard, typing fast and hard, knuckles flying. CUT TO SHOT 2: he yanks the headset off, grabs a microphone, leans in and speaks one line into it confidently with a grin: "Record your pitch once." CUT TO SHOT 3: the screen from @Image2, the purple waveform snaps taut and his cursor slams the gold button. A calm confident male voice-over says over the action: "VoiceDrop sends it to thousands." CUT TO SHOT 4: his mobile phone on the desk erupts, buzzing and lighting up over and over with one incoming call after another after another, vibrating across the desk, the screen stacking up call after call. He leans back in his chair, throws both arms behind his head and laughs, delighted and vindicated. The coffee cups are gone.
```

## Music prompts

`fal-ai/elevenlabs/music`, `force_instrumental: true`.

**The score is original and cleared for commercial use.** The film's actual main theme is a
commercially released recording; putting it under a paid ad needs a sync licence from the
publisher and label, and Meta's Rights Manager fingerprints that catalogue, so an unlicensed
upload gets muted, blocked or taken down on the ad account. Instead the reference recording
was measured (**E minor, ~92 BPM**, `step9_analyse_ref.py`: chroma-to-Krumhansl key match plus
onset-autocorrelation tempo) and all three beds were written to that key and tempo, so the
cuts between them sound like one score and the ostinato carries the same relentless-build
character. If the real cue is ever wanted, the route is a sync licence, not a re-render.

**`bed-ghost`** (76s, under every ghost shot). Measured build: -12.1 LUFS at the top to
-9.3 LUFS by 70s.

```text
Original epic cinematic score in E minor at 92 BPM, in the tradition of minimalist space-film scoring. A huge church pipe organ plays a repeating arpeggiated ostinato figure in steady eighth notes, the same short cell cycling over and over without resolving, while low sustained strings hold underneath and a soft ticking pulse keeps time. It starts hushed and ominous on organ alone and adds a layer roughly every eight bars, growing relentlessly into an overwhelming wall of organ and strings. Patient, hypnotic, desperate, vast, awe-struck. Fully instrumental, no vocals, no drum kit, no snare, no cymbals, no melody line on top, no brass fanfare, no resolution.
```

**`bed-caller`** (52s, under every present-day shot). Deliberately flat at ~-20 LUFS throughout.

```text
Original sparse ambient underscore in E minor at 92 BPM. A single dry felt-piano note repeating slowly with long empty gaps between notes, a quiet ticking wall clock at the same tempo, and a faint low room drone. Flat, lonely, tedious, defeated: the sound of a man wasting his life in a beige office. Almost nothing happens and it never builds. Fully instrumental, no vocals, no drums, no swell, no climax, no melody.
```

**`bed-payoff`** (34s, the turn and the end card). Lifts -16.0 to -9.5 LUFS.

```text
Original triumphant cinematic score at 92 BPM that resolves from E minor into E major. The same church pipe organ ostinato from before finally lands on a bright major chord, then a confident driving synth pulse and punchy modern electronic drums enter and lift it into a clean euphoric finish with a big final organ and string chord. Victorious, released, expensive, modern. Fully instrumental, no vocals.
```

## End card

Drawn with Pillow rather than generated, so every word is exact and no glyph is invented:
`#090714` ground, purple `#9746ff` waveform, gold `#ffd874`→`#ffb01f` CTA pill, Poppins Bold.
Copy: **STOP COLD CALLING.** / **VoiceDrop** / **Get Free Access** / **voicedrop.ai**.

## Post

- Per-clip dialogue levelled to a common speech loudness before the cut (+0.6 to +6.0 dB;
  the quiet ghost monologue needed the most). The dialogue-free shot is only nudged so it
  stays near-silent.
- Music sits under the dialogue via a sidechain compressor keyed off the speech, so it is
  audible the whole way through and never fights a line.
- Master: loudnorm to -14 LUFS with a limiter; delivered at -13.2 LUFS integrated, 6.5 LU range.
- Subtitles: **one word at a time, dead centre** (`\an5\pos(360,640)`), Poppins Bold, heavy
  outline, each word popping in with a fast 78%→100% scale so a cut between words reads as a
  beat. 95 cues, all timed from Scribe v2 word timings on the rendered audio.
  Three emphasis tiers (`step7b_word_subs.py`):

  | Tier | Colour | Size | Words |
  |---|---|---|---|
  | brand | gold `#ffd874` | 126 | VoiceDrop, thousands, once |
  | shout | hot red | 118, forced caps | DON'T, IT, WASTING, TELEMARKETING, COLD, CALLING, ANSWERING, NOBODY, HEARS, MESSAGE, LIFE |
  | accent | brand purple `#9746ff` | 118 | voicemails, again, time |
  | base | white | 86 | everything else |

  Tiering is keyword-driven with a small per-clip override map, so a word like "it" only
  shouts inside "DON'T DO IT" and stays plain in ordinary speech.

## Notes for the next version

- Seedance's output-side copyright filter rejected two generations (a 10s three-beat grind
  shot, then one grind retry) with no usable reason. Both cleared on a reworded retry. Splitting
  a long multi-cut prompt into two shorter clips both dodged it and improved the beat.
- Seedance generates speech rather than reading a script, so it can improvise. Transcribing
  every clip before cutting is worth the few cents; it is what caught the c3 garble.
- The identity chain (generate the caller, then *edit* the ghost out of that same still) is
  what holds the face across nine generations. Generating the two characters independently
  from text would not have matched.
