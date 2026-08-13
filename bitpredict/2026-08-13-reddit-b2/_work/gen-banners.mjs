/**
 * BitPredict Reddit banner batch 2, 2026-08-13.
 *
 * Robby on batch 1: "Banners are decent, but let's try other angles."
 *
 * Batch 1 leaned almost entirely on one idea, the receipt: five of eight concepts
 * were some version of "you can't prove you called it". These eight are different
 * propositions, not restyled versions of the same one:
 *
 *   b1  challenge      you say you called it, so prove it
 *   b2  risk-free      being wrong here costs nothing
 *   b3  status         where do you actually rank
 *   b4  track record   one good call is luck, a record is not
 *   b5  mechanic       what the product literally is, in five words
 *   b6  argument       settle the thing you keep arguing about
 *   b7  native         torn cardboard sign
 *   b8  native         printed notice taped to a wall
 *
 * Visual territories are also all new. Batch 1 was hazard tape, brutalist black,
 * ransom note, product panel and split screen; these are brutalist INVERSION
 * (white, which is the disruptive move for a dark-mode brand), pop-art halftone,
 * liquid chrome, VHS glitch, oversized graphic, graffiti, and two physical-media
 * photographs on surfaces batch 1 did not use.
 *
 * Brand marks are forbidden in every prompt; the real logo is composited after.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const OUT = "/home/user/ad-creative/bitpredict/2026-08-13-reddit-b2/_work/raw";
mkdirSync(OUT, { recursive: true });

const NO_EXTRA = [
  "Do NOT include any logo, brand mark, icon, symbol, monogram or wordmark of any kind anywhere in the image.",
  "Do NOT include any company or exchange logos.",
  "The ONLY text in the image is the headline, the subheadline and the button label listed above.",
  "No feature chips, no badges, no captions, no watermarks, no percentages, no statistics, no usernames, no other words or numbers anywhere.",
  "Every line of text must fit completely inside the frame with a clear margin on all four sides.",
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole.",
  "Exact spelling, crisp legible typography.",
].join(" ");

const LOGO_SPACE =
  "Leave a clean empty area of flat background across the very top of the image, about 12 percent of the height, containing nothing at all: no text, no graphics, no glow, no texture.";

const DARK = "Background near-black #070713. Neon green #01DD82 is the only bright accent, soft red #F87171 only where a downward move is shown.";

const concepts = [
  {
    id: "b1",
    name: "prove-it",
    family: "direct",
    darkLogo: true, // white ground: the standard white wordmark would vanish
    shapes: ["square", "landscape"],
    prompt:
      `Bold graphic advertising poster, brutalist inversion: a stark FLAT WHITE background, the opposite of the brand's usual near-black, with heavy black type. ` +
      `Very bold tall condensed grotesque headline in solid black on two lines, dominating the frame: "YOU SAY YOU CALLED IT." then, in neon green #01DD82, "PROVE IT." ` +
      `Smaller dark grey subheadline underneath: "Every call locks a time-stamped public receipt." ` +
      `A neon green #01DD82 rounded call-to-action button with black text: "Make a Prediction". ` +
      `A single thick black horizontal rule separating the headline from the subheadline. Enormous type, huge white space, no decoration, no gradient, no texture. ` +
      `${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "b2",
    name: "be-wrong-lose-nothing",
    family: "direct",
    shapes: ["square", "landscape"],
    prompt:
      `Bold graphic advertising poster in a Ben-Day dot pop-art comic style: heavy black outlines, visible halftone dot texture, flat blocks of colour, a comic panel feel. ${DARK} ` +
      `Very bold condensed headline in white with a thick black outline on two lines: "BE WRONG." then, in neon green #01DD82, "LOSE NOTHING." ` +
      `Smaller light grey subheadline underneath: "Nothing to deposit, stake or wager." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `A comic-style starburst shape behind the headline in halftone dots. Loud, graphic, printed-comic energy. ` +
      `${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "b3",
    name: "whats-your-rank",
    family: "direct",
    shapes: ["square"],
    prompt:
      `Bold graphic advertising poster in a Y2K liquid chrome style: glossy reflective chrome lettering with rainbow-edged highlights, set on a deep dark ground. ${DARK} ` +
      `Very bold tall condensed grotesque headline rendered as polished liquid chrome, on two lines, filling the frame: "WHAT'S YOUR RANK?" ` +
      `Smaller light grey subheadline underneath in plain flat type: "A public leaderboard ranked on accuracy." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Check Leaderboard". ` +
      `Behind the type, soft chrome blobs and a faint green glow. The chrome effect applies ONLY to the headline; the subheadline and button stay flat and perfectly legible. ` +
      `${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "b4",
    name: "right-once",
    family: "direct",
    shapes: ["square", "landscape"],
    prompt:
      `Bold graphic advertising poster styled as a degraded VHS video still: horizontal tracking distortion bands, chromatic aberration fringing, scanlines, analogue noise. ${DARK} ` +
      `Very bold condensed grotesque headline in white with slight red and cyan channel offset, on two lines: "ANYONE CAN BE RIGHT ONCE." then, in neon green #01DD82, "TWICE IS A RECORD." ` +
      `Smaller light grey subheadline underneath: "Build a public track record." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `The distortion must never make any word illegible: every letter stays sharp and readable despite the effect. ` +
      `${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "b5",
    name: "up-or-down-24-hours",
    family: "direct",
    shapes: ["square"],
    prompt:
      `Bold graphic advertising poster, oversized flat graphic design, no photography. ${DARK} ` +
      `Very bold tall condensed grotesque headline filling most of the frame on three lines, with "UP" in neon green #01DD82 and "DOWN" in soft red #F87171 and the rest in white: "UP OR DOWN. 24 HOURS. THAT'S THE GAME." ` +
      `Smaller light grey subheadline underneath: "Call BTC, ETH or SOL. No money at stake." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `A single thick green arrow pointing up and a single thick red arrow pointing down, flat and geometric, flanking the type. No chart, no candlesticks, no grid, no numbers. ` +
      `${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "b6",
    name: "settle-it",
    family: "direct",
    shapes: ["square"],
    prompt:
      `Bold graphic advertising poster styled as neon spray-paint graffiti on a dark concrete wall, with layered sticker-bomb scraps and drips. ${DARK} ` +
      `Very bold hand-sprayed graffiti headline in neon green #01DD82 with visible drips and overspray, dominating the frame: "SETTLE IT." ` +
      `Beneath it, in clean white stencil lettering: "No trading. No gambling. Just verifiable skill." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `Rough concrete texture, torn sticker edges and tape, deliberately scrappy and street. The stickers are blank: they carry no text, no logos and no symbols. ` +
      `${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "b7",
    name: "cardboard-sign",
    family: "native",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone, of a torn piece of brown corrugated cardboard propped against a scuffed skirting board on a wooden floor. ` +
      `Written across the cardboard in thick black marker, in ordinary uneven human handwriting: "i called it" ` +
      `and beneath that, smaller and in green marker, "sure you did". ` +
      `The cardboard is genuinely torn with a ragged edge and one corner bent. Ordinary indoor daylight from one side, a soft shadow behind it, visible dust on the floor. ` +
      `Slight phone-camera noise, imperfect focus, very slightly crooked framing. ` +
      `Deliberately unpolished and organic so it reads as a real photo someone snapped at home rather than an advertisement. ` +
      `No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no people. ${NO_EXTRA}`,
  },
  {
    id: "b8",
    name: "office-notice",
    family: "native",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone, of a plain white sheet of A4 paper taped to a beige office kitchen cupboard with two strips of masking tape. ` +
      `Printed on the paper in plain heavy black type, centred, in the style of a passive-aggressive office notice: "PLEASE STOP TELLING US YOU CALLED IT" ` +
      `and underneath, smaller and handwritten in green biro as if added later by someone else: "screenshots or it didn't happen". ` +
      `The paper is very slightly creased and hangs a little crooked. A kettle and a mug sit out of focus to one side. ` +
      `Flat overhead office strip lighting, slight phone-camera noise, imperfect focus. ` +
      `Deliberately unpolished and organic so it reads as a real photo someone snapped in an office kitchen rather than an advertisement. ` +
      `No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no people. ${NO_EXTRA}`,
  },
];

const SIZES = {
  square: { width: 1024, height: 1024 },
  landscape: { width: 1200, height: 624 },
};

const jobs = [];
for (const c of concepts) for (const shape of c.shapes) jobs.push({ c, shape });
console.log(`${jobs.length} renders queued (${concepts.length} concepts)`);

let ok = 0;
let fail = 0;
for (const { c, shape } of jobs) {
  const file = `${OUT}/bitpredict-${c.id}-${c.name}-${shape}.png`;
  const payloadFile = `${OUT}/.payload.json`;
  writeFileSync(
    payloadFile,
    JSON.stringify({
      prompt: c.prompt,
      quality: "high",
      image_size: SIZES[shape],
      output_format: "png",
    }),
  );
  try {
    const res = execFileSync(
      "curl",
      [
        "-s", "--max-time", "300",
        "-X", "POST", "https://fal.run/openai/gpt-image-2",
        "-H", `Authorization: Key ${process.env.FAL_KEY}`,
        "-H", "Content-Type: application/json",
        "--data-binary", `@${payloadFile}`,
      ],
      { encoding: "utf8", maxBuffer: 1024 * 1024 * 64 },
    );
    const url = JSON.parse(res)?.images?.[0]?.url;
    if (!url) {
      console.log(`FAIL ${c.id} ${shape}: ${res.slice(0, 250)}`);
      fail++;
      continue;
    }
    execFileSync("curl", ["-s", "--max-time", "180", "-o", file, url]);
    console.log(`ok   ${c.id} ${shape}`);
    ok++;
  } catch (e) {
    console.log(`ERR  ${c.id} ${shape}: ${String(e).slice(0, 250)}`);
    fail++;
  }
}
console.log(`\ndone: ${ok} ok, ${fail} failed, approx $${(ok * 0.2).toFixed(2)}`);
