/**
 * BitPredict Reddit banner batch, 2026-08-13.
 *
 * Two style families, per the vault playbook's finding that Robby's picks land
 * either in loud direct-response or native/organic and never in the polished
 * middle. Reddit sharpens that: the feed punishes anything that reads as an ad,
 * and the comments are attached and public, so the creative has to survive being
 * roasted.
 *
 * Every prompt forbids ALL brand marks and wordmarks. The real logo is
 * composited afterwards from the repo SVG, which is the vault's prescribed fix
 * for the fabricated-logo defect that paused three ads on 2026-08-03.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const OUT = "/home/user/ad-creative/bitpredict/2026-08-13-reddit/_work/raw";
mkdirSync(OUT, { recursive: true });

// Ends every prompt. Order matters: the vault batch found the no-extra-text
// constraint only holds through heavy stylisation when it sits at the very end.
const NO_EXTRA = [
  "Do NOT include any logo, brand mark, icon, symbol, monogram or wordmark of any kind anywhere in the image.",
  "Do NOT include any company or exchange logos.",
  "The ONLY text in the image is the headline, the subheadline and the button label listed above.",
  "No feature chips, no badges, no captions, no watermarks, no other words anywhere.",
  "Every line of text must fit completely inside the frame with a clear margin on all four sides.",
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole.",
  "Exact spelling, crisp legible typography.",
].join(" ");

// Leaves room for the composited logo without the model drawing into it.
const LOGO_SPACE =
  "Leave a clean empty area of flat background across the very top of the image, about 12 percent of the height, containing nothing at all: no text, no graphics, no glow.";

const BRAND =
  "Background near-black #070713 with a subtle dark gradient. Neon green #01DD82 is the only bright accent. Soft red #F87171 only where a downward move is shown.";

const concepts = [
  // ---------- Family A: loud direct-response ----------
  {
    id: "r1",
    family: "direct",
    name: "screenshot-or-it-didnt-happen",
    shapes: ["square", "landscape"],
    prompt:
      `Bold graphic advertising poster. ${BRAND} ` +
      `Very bold tall condensed grotesque headline in white, stacked on three lines, dominating the frame: "SCREENSHOT OR IT DIDN'T HAPPEN". ` +
      `Smaller light gray subheadline underneath: "Every call locks a time-stamped public receipt." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `Diagonal black and neon green hazard warning stripes running across the top and bottom edges. ` +
      `Loud, high-contrast, direct-response poster design. ${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "r2",
    family: "direct",
    name: "everyone-called-it",
    shapes: ["square", "landscape"],
    prompt:
      `Bold graphic advertising poster. ${BRAND} ` +
      `Very bold tall condensed grotesque headline in white on two lines: "EVERYONE CALLED IT." then, in neon green #01DD82, "NOBODY LOGGED IT." ` +
      `Smaller light gray subheadline underneath: "No trading. No gambling. Just verifiable skill." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `Behind the type, a faint dark crypto price line chart splitting into one green line rising and one soft red #F87171 line falling. ` +
      `Stark brutalist poster composition, enormous type, minimal decoration. ${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "r3",
    family: "direct",
    name: "trust-me-bro",
    shapes: ["square", "landscape"],
    prompt:
      `Bold graphic advertising poster with a punk ransom-note collage feel, torn paper strips on a dark ground. ${BRAND} ` +
      `Very bold condensed headline in white with a thick soft red #F87171 strikethrough line drawn straight through it: "SOURCE: TRUST ME BRO". ` +
      `Directly beneath it, a second bold line in neon green #01DD82 with no strikethrough: "PUBLIC RECEIPT". ` +
      `Smaller light gray subheadline underneath: "No edits after lock." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `Raw, cut-and-paste, deliberately scrappy. ${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "r4",
    family: "direct",
    name: "no-trading-no-gambling",
    shapes: ["square"],
    prompt:
      `Bold graphic advertising poster. ${BRAND} ` +
      `Very bold tall condensed grotesque headline in white on two lines with "VERIFIABLE SKILL." in neon green #01DD82: "NO TRADING. NO GAMBLING. JUST VERIFIABLE SKILL." ` +
      `Smaller light gray subheadline underneath: "Call BTC, ETH and SOL up or down over 24 hours." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Check Leaderboard". ` +
      `To one side, a sleek dark leaderboard panel with three ranked rows showing gold, silver and bronze rank medals and neon green progress bars. ` +
      `The leaderboard rows contain medals and bars only, absolutely no words, no names and no numbers. ${LOGO_SPACE} ${NO_EXTRA}`,
  },
  {
    id: "r5",
    family: "direct",
    name: "pay-to-be-right",
    shapes: ["square"],
    prompt:
      `Bold graphic advertising poster, hard vertical split-screen composition. ${BRAND} ` +
      `Left half darker and colder, right half lit with a neon green #01DD82 glow. ` +
      `Very bold tall condensed grotesque headline in white spanning the frame on two lines, with "FREE" in neon green #01DD82: "OTHER MARKETS MAKE YOU PAY TO BE RIGHT. THIS ONE IS FREE." ` +
      `Smaller light gray subheadline underneath: "Nothing to deposit. Nothing to stake." ` +
      `A neon green #01DD82 rounded call-to-action button with dark green text: "Make a Prediction". ` +
      `Clean hard-edged split, no gradient blending between halves. ${LOGO_SPACE} ${NO_EXTRA}`,
  },

  // ---------- Family B: native / organic, reads as a real photo ----------
  {
    id: "r6",
    family: "native",
    name: "whiteboard",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone, of a scuffed office whiteboard on a plain wall in ordinary indoor daylight. ` +
      `Handwritten on the whiteboard in thick black dry-erase marker, slightly uneven human handwriting, filling most of the board: "everyone called the top." ` +
      `Underneath, on a second line, written in green dry-erase marker: "nobody has the receipt." ` +
      `A faint ghost of previously erased marker is still visible on the board. The marker pen rests on the tray. ` +
      `Natural window light with a soft shadow, slight phone-camera noise, imperfect focus, very slightly crooked framing. ` +
      `Deliberately unpolished and organic so it reads as a real photo someone snapped in an office rather than an advertisement. ` +
      `No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no people. ${NO_EXTRA}`,
  },
  {
    id: "r7",
    family: "native",
    name: "sticky-note",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone, close up on the bezel of a computer monitor in a cluttered home office. ` +
      `A single yellow sticky note is pressed onto the bezel, handwritten in blue ballpoint in ordinary uneven handwriting: "screenshot or it didn't happen". ` +
      `The monitor screen behind is switched off and completely black and empty, showing nothing at all: no interface, no windows, no icons, no text, no reflections of any screen content. ` +
      `A cold mug and a tangle of cable sit out of focus in the foreground. ` +
      `Ordinary indoor lamp light, visible dust, slight phone-camera noise, imperfect focus. ` +
      `Deliberately unpolished and organic so it reads as a real photo someone snapped at their desk rather than an advertisement. ` +
      `No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no people. ${NO_EXTRA}`,
  },
  {
    id: "r8",
    family: "native",
    name: "legal-pad",
    shapes: ["square"],
    prompt:
      `A real photograph, shot on a phone from directly above, of a yellow legal pad lying on a scratched wooden desk. ` +
      `Handwritten across the page in blue ballpoint, ordinary uneven human handwriting with one word crossed out and rewritten: "my crypto calls are public now" ` +
      `and underneath, on the next line, "this was a mistake". ` +
      `A chewed pen, a paper coffee cup ring and a scattering of crumbs sit around the pad. ` +
      `Natural window light raking across the paper texture, soft shadow, slight phone-camera noise. ` +
      `Deliberately unpolished and organic so it reads as a real photo someone snapped at their desk rather than an advertisement. ` +
      `No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no people. ${NO_EXTRA}`,
  },
];

const SIZES = {
  square: { width: 1024, height: 1024 },
  landscape: { width: 1200, height: 624 },
};

const jobs = [];
for (const c of concepts) {
  for (const shape of c.shapes) jobs.push({ c, shape });
}

console.log(`${jobs.length} renders queued (${concepts.length} concepts)`);

let ok = 0;
let fail = 0;
for (const { c, shape } of jobs) {
  const file = `${OUT}/bitpredict-${c.id}-${c.name}-${shape}.png`;
  const payload = JSON.stringify({
    prompt: c.prompt,
    quality: "high",
    image_size: SIZES[shape],
    output_format: "png",
  });
  const payloadFile = `${OUT}/.payload.json`;
  writeFileSync(payloadFile, payload);
  try {
    // curl, not node fetch: undici ignores HTTPS_PROXY in this environment and
    // the egress layer answers 403, which misreads as an auth failure.
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
    const json = JSON.parse(res);
    const url = json?.images?.[0]?.url;
    if (!url) {
      console.log(`FAIL ${c.id} ${shape}: ${res.slice(0, 300)}`);
      fail++;
      continue;
    }
    execFileSync("curl", ["-s", "--max-time", "180", "-o", file, url]);
    console.log(`ok   ${c.id} ${shape} -> ${file}`);
    ok++;
  } catch (e) {
    console.log(`ERR  ${c.id} ${shape}: ${String(e).slice(0, 300)}`);
    fail++;
  }
}
console.log(`\ndone: ${ok} ok, ${fail} failed, approx $${(ok * 0.2).toFixed(2)} spent`);
