import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, 'thumbnails');
mkdirSync(out, { recursive: true });

const b64 = (p) => readFileSync(p).toString('base64');
const inter = b64(resolve(here, 'fonts/Inter.woff2'));
const archivo = b64(resolve(here, 'fonts/ArchivoBlack.woff2'));
const icon = b64('/home/user/VoiceDrop-NodeJS/public/icons/voicedrop-icon.png');

// Each variant: eyebrow, headline lines (a line may carry {hi: true} to invert it).
const VARIANTS = [
  {
    file: '01-start-to-finish',
    eyebrow: 'Ringless voicemail',
    lines: [
      { text: 'SETUP,' },
      { text: 'START TO' },
      { text: 'FINISH', hi: true },
    ],
    size: 132,
  },
  {
    file: '02-live-in-15',
    eyebrow: 'Your first campaign',
    lines: [
      { text: 'LIVE IN' },
      { text: '15 MINUTES', hi: true },
    ],
    size: 138,
  },
  {
    file: '03-pay-on-delivered',
    eyebrow: 'Ringless voicemail',
    lines: [
      { text: 'YOU ONLY' },
      { text: 'PAY ON' },
      { text: 'DELIVERY', hi: true },
    ],
    size: 132,
  },
];

const page = (v) => `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'InterVF';
    src: url(data:font/woff2;base64,${inter}) format('woff2');
    font-weight: 100 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'ArchivoBlack';
    src: url(data:font/woff2;base64,${archivo}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1280px; height: 720px; overflow: hidden; }
  .card {
    position: relative;
    width: 1280px;
    height: 720px;
    background:
      radial-gradient(120% 95% at 88% 42%, rgba(124,108,245,0.55) 0%, rgba(124,108,245,0.10) 42%, rgba(124,108,245,0) 68%),
      linear-gradient(155deg, #2B2069 0%, #1B1440 46%, #120E28 100%);
    overflow: hidden;
    font-family: 'InterVF', sans-serif;
  }
  /* faint concentric signal rings, echoing the logo's sound waves */
  .rings { position: absolute; right: -170px; top: 50%; transform: translateY(-50%); }
  .rings i {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgba(167,155,255,0.14);
    border-radius: 999px;
  }
  .rings i:nth-child(1) { width: 520px;  height: 520px;  }
  .rings i:nth-child(2) { width: 760px;  height: 760px;  }
  .rings i:nth-child(3) { width: 1010px; height: 1010px; border-color: rgba(167,155,255,0.08); }

  .glow {
    position: absolute;
    right: 40px; top: 50%;
    width: 470px; height: 470px;
    transform: translateY(-50%);
    background: radial-gradient(circle, rgba(150,134,255,0.42) 0%, rgba(150,134,255,0) 66%);
  }
  .mark {
    position: absolute;
    right: 74px; top: 50%;
    width: 372px; height: 372px;
    transform: translateY(-50%) rotate(-6deg);
    filter: brightness(1.55) saturate(0.7);
    opacity: 0.97;
  }

  .body {
    position: absolute;
    left: 76px; top: 0;
    height: 100%;
    width: 780px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 54px;
    gap: 26px;
  }

  .eyebrow {
    font-family: 'InterVF';
    font-weight: 700;
    font-size: 27px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #B8ADFF;
  }
  .eyebrow::before {
    content: '';
    display: inline-block;
    width: 44px; height: 5px;
    border-radius: 3px;
    background: #7C6CF5;
    vertical-align: middle;
    margin-right: 18px;
    margin-bottom: 4px;
  }

  .head {
    font-family: 'ArchivoBlack', sans-serif;
    font-size: ${v.size}px;
    line-height: 0.94;
    letter-spacing: -0.022em;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .head span { white-space: nowrap; }
  .head .hi {
    background: #FFFFFF;
    color: #1B1440;
    padding: 0.05em 0.13em 0.1em;
    border-radius: 10px;
    display: inline-block;
    margin-left: -0.13em;
  }

  .foot {
    position: absolute;
    left: 76px; bottom: 58px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .foot img { width: 40px; height: 40px; filter: brightness(1.6); }
  .wordmark {
    font-family: 'InterVF';
    font-weight: 800;
    font-size: 32px;
    letter-spacing: -0.015em;
    color: #FFFFFF;
  }
  .tag {
    font-family: 'InterVF';
    font-weight: 800;
    font-size: 20px;
    letter-spacing: 0.06em;
    color: #1B1440;
    background: #A79BFF;
    border-radius: 999px;
    padding: 5px 13px 6px;
  }
</style></head>
<body>
  <div class="card">
    <div class="rings"><i></i><i></i><i></i></div>
    <div class="glow"></div>
    <img class="mark" src="data:image/png;base64,${icon}" alt="" />

    <div class="body">
      <div class="eyebrow">${v.eyebrow}</div>
      <div class="head">
        ${v.lines.map((l) => `<span class="${l.hi ? 'hi' : ''}">${l.text}</span>`).join('\n        ')}
      </div>
    </div>

    <div class="foot">
      <img src="data:image/png;base64,${icon}" alt="" />
      <span class="wordmark">VoiceDrop</span>
      <span class="tag">2.0</span>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();

for (const v of VARIANTS) {
  const html = page(v);
  const tmp = resolve(out, `${v.file}.html`);
  writeFileSync(tmp, html);
  await p.goto(`file://${tmp}`);
  await p.evaluate(() => document.fonts.ready);
  // Shrink the headline until the widest line clears the brand mark on the right.
  const finalSize = await p.evaluate((maxWidth) => {
    const head = document.querySelector('.head');
    let size = parseFloat(getComputedStyle(head).fontSize);
    const widest = () => Math.max(...[...head.children].map((c) => c.getBoundingClientRect().width));
    while (widest() > maxWidth && size > 60) {
      size -= 2;
      head.style.fontSize = `${size}px`;
    }
    return size;
  }, 720);
  await p.screenshot({ path: resolve(out, `${v.file}.png`), type: 'png' });
  console.log('rendered', v.file, `headline ${finalSize}px`);
}

await browser.close();
