/**
 * TeamPredict paid-launch banner batch, 2026-08-13. Meta + Google + Reddit.
 *
 * Robby's brief: "~20 disruptive, interesting, scroll stopping banners...
 * super viral and engaging while elegant and minimalistic. Leverage colors,
 * visuals."
 *
 * Reading of that brief, against the vault playbook's evidence: the family
 * that has never once been picked is polished-corporate (stock SaaS gradient,
 * feature-chip rows, a laptop mockup). Minimal is NOT that. So "elegant and
 * minimalistic" is executed as flat saturated colour fields and enormous type
 * with exactly one idea per frame, which is loud and restrained at the same
 * time. The native/organic family Robby called "best by far" on VoiceDrop is
 * kept as four of the twenty, since it is the only family with a real win.
 *
 * Every prompt forbids ALL brand marks. The real logo is composited afterwards
 * from TeamPredict-Marketing/public/logo.svg by composite-logo.py, which is the
 * vault's prescribed fix for the fabricated-logo defect that paused three live
 * ads on 2026-08-03. Never describe the logo to the model.
 */
import { mkdirSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";

const OUT = "/home/user/ad-creative/teampredict/2026-08-13-paid-launch/_work/raw";
mkdirSync(OUT, { recursive: true });

const only = process.argv.includes("--only")
  ? process.argv[process.argv.indexOf("--only") + 1].split(",")
  : null;

// Ends every prompt. Order matters: the no-extra-text constraint only holds
// through heavy stylisation when it sits at the very end (vault, 2026-08-03).
const NO_EXTRA = [
  "Do NOT include any logo, brand mark, icon, symbol, monogram or wordmark of any kind anywhere in the image.",
  "Do NOT include any third-party company logos, and specifically no LinkedIn or Slack logo, glyph or icon.",
  "The ONLY text in the image is the headline, the subheadline and the button label listed above.",
  "No feature chips, no badges, no percentages, no statistics, no captions, no watermarks, no other words anywhere.",
  "Every line of text must fit completely inside the frame with a clear margin on all four sides.",
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole.",
  "Exact spelling, crisp legible typography.",
].join(" ");

// Reserved clean band for the composited logo. Stated positively (what IS
// there) because batch 7 proved prohibition alone does not hold.
const LOGO_TOP =
  "Leave a clean empty band across the very top of the image, about 13 percent of the height, containing nothing at all: flat background colour only, no text, no graphics, no glow, no texture.";

const TYPE =
  "Set in an extra-heavy geometric sans-serif with tight letter spacing.";

const MINIMAL =
  "Elegant, minimalist, gallery-poster composition: one single idea, enormous type, generous negative space, flat colour, no gradients, no drop shadows, no 3D, no stock photography, no user interface mockups, no laptops, no phones, no office scenes, no people.";

const NATIVE =
  "Deliberately unpolished and organic so it reads as a real photo someone snapped rather than an advertisement. Natural available light, slight phone-camera noise, imperfect focus, very slightly crooked framing. No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no people.";

const CTA = "Start 30-Day Free Trial";

const concepts = [
  // ================= FAMILY A: bold minimal typographic =================
  {
    id: "t1",
    family: "direct",
    name: "keep-scrolling",
    tone: "dark",
    shapes: ["square", "landscape", "vertical"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of very dark violet-black #0D0120, edge to edge, completely plain. ` +
      `Enormous white headline text filling most of the frame, stacked on four lines: "NOT WORRIED ABOUT YOUR EMPLOYEES QUITTING? KEEP SCROLLING." ` +
      `A small indigo #4B56FF downward arrow sits alone beneath the headline. ` +
      `Smaller light gray subheadline text under the arrow: "Everyone else, read on." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t2",
    family: "direct",
    name: "resignation-letter",
    tone: "light",
    shapes: ["square", "landscape"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of pure white, completely plain. ` +
      `Enormous near-black #0D0120 headline text on three lines: "DON'T WAIT FOR THE RESIGNATION LETTER." ` +
      `Beneath the headline, a single plain sealed white paper envelope lying flat and closed, photographed straight on, with one crisp indigo #4B56FF edge line. The envelope is completely blank with nothing written on it. ` +
      // Two rolls of the square both spelled the headline's "RESIGNATION"
      // correctly and then rendered the subline's second occurrence as
      // "ressignation". Reproducible, not a random fault: a long word repeated
      // twice in one frame gets garbled on the second instance. Fixed by
      // swapping in a subline that does not repeat it (the site's hero
      // headline) rather than by re-rolling a third time.
      `Smaller dark gray subheadline text: "Know when an employee is about to leave." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t3",
    family: "direct",
    name: "already-on-linkedin",
    tone: "dark",
    shapes: ["square", "landscape"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of saturated indigo #4B56FF, edge to edge, completely plain. ` +
      `Enormous white headline text filling the frame on three lines: "YOUR NEXT RESIGNATION IS ALREADY ON LINKEDIN." ` +
      `Smaller pale lavender subheadline text: "AI reads the public signals your team already shares." ` +
      `A white rounded pill call-to-action button with indigo #4B56FF text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t4",
    family: "direct",
    name: "which-one",
    tone: "light",
    shapes: ["square", "landscape", "vertical"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of very pale indigo #F0F2FF, completely plain. ` +
      `Three enormous perfectly flat circles sit in a row across the centre of the frame, evenly spaced, with no outlines and no labels: the first solid green #22C55E, the second solid amber #FFB340, the third solid red #EF4444. ` +
      `Above them, a bold near-black #0D0120 headline on one or two lines: "WHICH ONE IS ALREADY LOOKING?" ` +
      `Smaller dark gray subheadline text below the circles: "Every tracked employee gets a clear risk level." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `The circles carry no writing, no numbers, no faces and no icons of any kind. ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t5",
    family: "direct",
    name: "open-to-work",
    tone: "light",
    shapes: ["square"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of warm amber #FFB340, edge to edge, completely plain. ` +
      `Enormous near-black #0D0120 headline text filling the frame on three lines: "THEY TURNED ON OPEN TO WORK. WHEN DO YOU FIND OUT?" ` +
      `A single thin near-black open circle outline sits behind the type like a quiet ring. ` +
      `Smaller dark brown subheadline text: "Tracked profiles are checked daily." ` +
      `A near-black #0D0120 rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t6",
    family: "direct",
    name: "go-quiet",
    tone: "light",
    shapes: ["square", "landscape"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of pure white, completely plain. ` +
      `Enormous near-black #0D0120 headline text on two lines: "PEOPLE GO QUIET BEFORE THEY RESIGN." ` +
      `Beneath the headline, a single row of about twelve flat vertical indigo #4B56FF bars of even width, standing on a shared baseline. The bars are tall on the left and shrink steadily to the right until the last three are almost nothing. There are no axes, no gridlines, no numbers and no labels anywhere near the bars. ` +
      `Smaller dark gray subheadline text: "Weekly Slack message counts, never message content." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t7",
    family: "direct",
    name: "obvious-in-hindsight",
    tone: "dark",
    shapes: ["square"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of very dark violet-black #0D0120, completely plain. ` +
      `Enormous white headline text on three lines: "EVERY RESIGNATION IS OBVIOUS IN HINDSIGHT." ` +
      `Beneath the headline, one single thin flat indigo #4B56FF horizontal line runs almost the full width of the frame, perfectly level, then turns sharply upward in red #EF4444 at the very end. No axes, no gridlines, no numbers, no labels. ` +
      `Smaller light gray subheadline text: "Get weeks of lead time on every exit." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t8",
    family: "direct",
    name: "two-weeks-notice",
    tone: "light",
    shapes: ["square", "vertical"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of pure white, completely plain. ` +
      `Enormous headline text filling almost the entire frame on four lines, set in near-black #0D0120 except for the single word "NOT" which is solid red #EF4444: "TWO WEEKS' NOTICE IS NOT AN EARLY WARNING SYSTEM." ` +
      `Smaller dark gray subheadline text: "Know when an employee is about to leave." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t9",
    family: "direct",
    name: "five-dollars",
    tone: "light",
    shapes: ["square", "landscape"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of pure white, completely plain. ` +
      `A single colossal indigo #4B56FF numeral reading "$5" dominates the frame, cropped generously by the top and side of the composition so it feels oversized, but every stroke of both characters stays fully inside the frame. ` +
      `Smaller near-black #0D0120 subheadline text in the lower area: "per tracked employee. That's the whole price." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t10",
    family: "direct",
    name: "hundred-thirty-free",
    tone: "dark",
    shapes: ["square", "landscape"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of saturated indigo #4B56FF, completely plain. ` +
      `Enormous white headline text stacked on three lines, each line separated by a thin white hairline rule running the full width: "100 EMPLOYEES." then "30 DAYS." then "FREE." ` +
      `Smaller pale lavender subheadline text beneath: "No charge today. Cancel anytime." ` +
      `A white rounded pill call-to-action button with indigo #4B56FF text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t11",
    family: "direct",
    name: "surveys",
    tone: "light",
    shapes: ["square", "landscape"],
    prompt:
      `Minimalist advertising poster with a hard vertical split-screen composition and no blending between the halves. ` +
      `The left half is flat pale gray and contains one row of flat gray vertical bars of equal height, with no axes, no numbers and no labels. ` +
      `The right half is flat indigo #4B56FF and contains one single solid red #EF4444 dot, alone in the middle of the field. ` +
      `Across the top, a bold headline in near-black #0D0120 on the left half and white on the right half, on two lines: "SURVEYS TELL YOU HOW THE TEAM FEELS. NOT WHO IS LEAVING." ` +
      // Wave 1 ran the subline in near-black straight across both halves and the
      // words sitting on the indigo half were barely legible. Each half gets the
      // colour that survives on it, the same rule the headline already follows.
      `Smaller subheadline text at the bottom, set in near-black #0D0120 where it sits on the pale gray half and in white where it continues over the indigo half: "Person-level early warning. No surveys, no HRIS integration." ` +
      `A white rounded pill call-to-action button with indigo #4B56FF text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t12",
    family: "direct",
    name: "no-surveys-five-minutes",
    tone: "light",
    shapes: ["square"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of very pale indigo #F0F2FF, completely plain. ` +
      `Enormous headline text stacked on three lines, left aligned: the words "NO SURVEYS." and "NO HRIS." in light silver-gray, and beneath them "FIVE MINUTES." in saturated indigo #4B56FF. ` +
      `Smaller dark gray subheadline text: "Setup only takes 5 minutes." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t13",
    family: "direct",
    name: "competitor-radar",
    tone: "dark",
    shapes: ["square", "landscape"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of very dark violet-black #0D0120, completely plain. ` +
      `A large minimal radar diagram made of three perfectly plain concentric thin indigo #4B56FF circle outlines, with one single small solid amber #FFB340 dot resting on the outer ring. No sweep, no glow, no grid, no crosshairs, no numbers and no labels anywhere on it. ` +
      `Bold white headline text on two lines: "POINT THE SAME RADAR AT YOUR COMPETITORS." ` +
      `Smaller light gray subheadline text: "Their high signals surface as poaching opportunities." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t14",
    family: "direct",
    name: "their-best-people",
    tone: "light",
    shapes: ["square"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of very pale indigo #F0F2FF, completely plain. ` +
      `Two large plain thin-outlined circles in indigo #4B56FF overlap in the centre of the frame like a two-part diagram, and one single solid amber #FFB340 dot sits inside the overlapping area. The circles carry no writing of any kind. ` +
      `Bold near-black #0D0120 headline text on two lines: "THEIR BEST PEOPLE SEND THE SAME SIGNALS." ` +
      `Smaller dark gray subheadline text: "Track competitors as well as your own team." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t15",
    family: "direct",
    name: "time-capsule",
    tone: "light",
    shapes: ["square"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of pure white, completely plain. ` +
      `One single thin flat indigo #4B56FF horizontal line runs across the middle of the frame with seven small evenly spaced solid dots sitting on it: six indigo and the last one solid amber #FFB340, slightly larger. No tick marks, no dates, no numbers and no labels anywhere on the line. ` +
      `Bold near-black #0D0120 headline text above the line, on two lines: "EVERY EDIT. EVERY SKILL. EVERY HEADLINE PIVOT." ` +
      `Smaller dark gray subheadline text below the line: "A time capsule of every employee's LinkedIn." ` +
      `An indigo #4B56FF rounded pill call-to-action button with white text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },
  {
    id: "t16",
    family: "direct",
    name: "panic-hiring",
    tone: "dark",
    shapes: ["square"],
    prompt:
      `Minimalist typographic advertising poster. Background: one flat field of saturated red #EF4444, edge to edge, completely plain. ` +
      `Enormous white headline text filling the frame on four lines: "PANIC HIRING STARTS THE DAY THEY QUIT. IT DOESN'T HAVE TO." ` +
      `Smaller pale pink subheadline text: "Find a replacement before a gap opens up." ` +
      `A white rounded pill call-to-action button with near-black #0D0120 text: "${CTA}". ` +
      `${TYPE} ${MINIMAL} ${LOGO_TOP} ${NO_EXTRA}`,
  },

  // ================= FAMILY B: native / organic =================
  // The only family with a real win in this repo (Robby: "best by far",
  // VoiceDrop whiteboard). Also the right register for Reddit, where an ad is
  // a post with a public comment thread attached.
  {
    id: "t17",
    family: "native",
    name: "sticky-note",
    tone: "light",
    shapes: ["square", "vertical"],
    prompt:
      `A real photograph, shot on a phone, close up on the top bezel of a laptop screen in an ordinary cluttered office. ` +
      `A single yellow sticky note is pressed onto the bezel, handwritten in blue ballpoint in ordinary uneven handwriting: "check linkedin before 1:1s". ` +
      `The laptop screen below is switched off and completely black and empty, showing nothing at all: no interface, no windows, no icons, no text and no reflections of any screen content. ` +
      `A cold mug of coffee and a spiral notebook sit out of focus in the foreground. Ordinary indoor daylight, visible dust. ` +
      `${NATIVE} ${NO_EXTRA}`,
  },
  {
    id: "t18",
    family: "native",
    name: "whiteboard",
    tone: "light",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone, of a scuffed office whiteboard on a plain wall in ordinary indoor daylight. ` +
      `Handwritten across the board in thick black dry-erase marker, slightly uneven human handwriting, filling most of the board: "who is leaving next quarter?" ` +
      `Underneath, on a second line, written smaller in red dry-erase marker: "we always find out last" ` +
      `A faint ghost of previously erased marker is still visible on the board and the marker pen rests on the tray. Natural window light with a soft shadow. ` +
      `${NATIVE} ${NO_EXTRA}`,
  },
  {
    id: "t19",
    family: "native",
    name: "office-notice",
    tone: "light",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone, of a plain sheet of white A4 paper taped slightly crooked to a beige office wall beside a light switch. ` +
      `Printed on the sheet in large plain black capitals, centred: "REMINDER: THE EXIT INTERVIEW IS NOT AN EARLY WARNING SYSTEM" ` +
      `Underneath the printed text, someone has written a short reply by hand in blue biro in ordinary uneven handwriting: "we know" ` +
      `The tape is visibly wrinkled at two corners and the paper has a slight curl. Ordinary indoor strip lighting, visible wall texture. ` +
      `${NATIVE} ${NO_EXTRA}`,
  },
  {
    id: "t20",
    family: "native",
    name: "napkin",
    tone: "light",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone from directly above, of a crumpled white paper napkin lying on a dark cafe table next to a coffee cup and a chewed pen. ` +
      `Handwritten across the napkin in blue ballpoint, ordinary uneven human handwriting with the ink bleeding slightly into the paper fibres: "everyone said they were fine in the survey" ` +
      `and underneath, on the next line, pressed harder: "then they quit" ` +
      `A coffee ring stains one corner. Natural window light raking across the napkin texture, soft shadow. ` +
      `${NATIVE} ${NO_EXTRA}`,
  },
];

const SIZES = {
  square: { width: 1024, height: 1024 },
  landscape: { width: 1200, height: 624 },
  vertical: { width: 1080, height: 1920 },
};

const jobs = [];
for (const c of concepts) {
  if (only && !only.includes(c.id)) continue;
  for (const shape of c.shapes) {
    const file = `${OUT}/teampredict-${c.id}-${c.name}-${shape}.png`;
    // Resumable: a finished render is never paid for twice.
    if (existsSync(file) && !process.argv.includes("--force")) continue;
    jobs.push({ c, shape, file });
  }
}

// fal is queue-backed and a single render takes ~90s, so 33 of them serially is
// most of an hour of waiting. The pool is what makes a wide batch practical.
const CONCURRENCY = 6;

console.log(`${jobs.length} renders queued, ${CONCURRENCY} at a time`);

function render({ c, shape, file }) {
  const payload = JSON.stringify({
    prompt: c.prompt,
    quality: "high",
    image_size: SIZES[shape],
    output_format: "png",
  });
  return new Promise((resolve) => {
    // curl, not node fetch: undici ignores HTTPS_PROXY in this environment and
    // the egress layer answers 403, which misreads as an auth failure.
    const post = spawn("curl", [
      "-s", "--max-time", "600",
      "-X", "POST", "https://fal.run/openai/gpt-image-2",
      "-H", `Authorization: Key ${process.env.FAL_KEY}`,
      "-H", "Content-Type: application/json",
      "--data-binary", "@-",
    ]);
    let body = "";
    let err = "";
    post.stdout.on("data", (d) => (body += d));
    post.stderr.on("data", (d) => (err += d));
    post.on("close", () => {
      let url;
      try {
        url = JSON.parse(body)?.images?.[0]?.url;
      } catch {
        /* falls through to the failure branch below */
      }
      if (!url) {
        console.log(`FAIL ${c.id} ${shape}: ${(body || err).slice(0, 240)}`);
        return resolve(false);
      }
      const get = spawn("curl", ["-s", "--max-time", "300", "-o", file, url]);
      get.on("close", (code) => {
        if (code !== 0) {
          console.log(`FAIL ${c.id} ${shape}: download exit ${code}`);
          return resolve(false);
        }
        console.log(`ok   ${c.id} ${shape}`);
        resolve(true);
      });
    });
    post.stdin.end(payload);
  });
}

let ok = 0;
let fail = 0;
let next = 0;
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, jobs.length) }, async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      ((await render(job)) ? ok++ : fail++);
    }
  }),
);
console.log(`\ndone: ${ok} ok, ${fail} failed, approx $${(ok * 0.2).toFixed(2)}`);
