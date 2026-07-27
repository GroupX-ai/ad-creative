// Renders the TeamPredict Google Display banner set at exact IAB pixel sizes.
//
// Why HTML + Chromium instead of the fal image model the playbook describes: these
// are fixed-size display units where the text has to be exactly right and the
// dimensions exact to the pixel. An image model cannot hit 728x90 or guarantee
// spelling; a browser can do both, deterministically, and re-render for free.
//
// Every string below is traceable to approved TeamPredict site copy (see
// AD-CREATIVE-PLAYBOOK.md "Approved copy bank"). Nothing claims "no credit card
// required": the site says a card IS added at signup via Stripe.
//
// Two safety nets, because 29 units are too many to eyeball reliably:
//   1. AUTO-FIT - every text block is sized in calc(px * var(--s)); the page
//      shrinks --s until the content fits its box. No clipped wordmarks.
//   2. ASSERTIONS - after fitting, every text element's rect is checked against
//      the frame. Any overflow fails the build loudly instead of shipping.

import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

// Defaults to this batch directory. Override with OUT_DIR / FONT_DIR.
const OUT = process.env.OUT_DIR || new URL('.', import.meta.url).pathname;
const FONT_DIR = process.env.FONT_DIR || join(new URL('.', import.meta.url).pathname, 'fonts');

// ---------------------------------------------------------------- brand tokens
const BRAND = {
  indigo: '#4B56FF', ink: '#0D0120', tintBg: '#F0F2FF',
  green: '#22C55E', amber: '#FFB340', red: '#EF4444', blip: '#FDB022',
  gray: '#4A4A5A', grayLight: '#B8B6C8',
};

// ---------------------------------------------------------------- concepts
const CONCEPTS = {
  c1: {
    theme: 'light',
    headline: 'Know Weeks Before They Resign',
    // Faithful truncation for mobile units, no new claim introduced.
    headlineTiny: 'Weeks Before They Resign',
    sub: 'AI reads public LinkedIn signals. No surveys.',
    subShort: 'AI reads public LinkedIn signals.',
    trust: 'No charge today · Cancel anytime',
  },
  c2: {
    theme: 'dark',
    headline: 'Weeks of Lead Time on Every Exit',
    headlineTiny: 'Weeks of Lead Time',
    sub: '$5 per tracked employee. 5-minute setup.',
    subShort: '$5 per tracked employee.',
    trust: 'No charge today · Cancel anytime',
  },
};

const CTA_LONG = 'Start 30-Day Free Trial';
const CTA_SHORT = 'Start Free Trial';

// ---------------------------------------------------------------- size specs
// pad = horizontal inset; py = vertical inset (short bars need a tighter one).
// compact = logo tile only, no wordmark text (mobile/small units).
// radar: {mode:'bleed'|'right'|'flow'|'none', px|frac}
const SIZES = [
  { w: 300,  h: 250,  layout: 'stack', pad: 20, py: 20, hs: 29, ss: 13, cs: 14, ts: 0,  radar: { mode: 'bleed', frac: 0.66 } },
  { w: 336,  h: 280,  layout: 'stack', pad: 22, py: 22, hs: 31, ss: 14, cs: 15, ts: 10, radar: { mode: 'bleed', frac: 0.64 } },
  { w: 250,  h: 250,  layout: 'stack', pad: 18, py: 18, hs: 24, ss: 12, cs: 13, ts: 0,  radar: { mode: 'bleed', frac: 0.66 } },
  { w: 200,  h: 200,  layout: 'stack', pad: 14, py: 14, hs: 19, ss: 0,  cs: 11, ts: 0,  radar: { mode: 'bleed', frac: 0.62 }, cta: CTA_SHORT },
  { w: 728,  h: 90,   layout: 'bar',   pad: 18, py: 8,  hs: 22, ss: 12, cs: 13, ts: 0,  radar: { mode: 'flow', px: 52 }, cta: CTA_SHORT },
  { w: 468,  h: 60,   layout: 'bar',   pad: 12, py: 6,  hs: 16, ss: 0,  cs: 10, ts: 0,  radar: { mode: 'none' }, cta: CTA_SHORT, compact: true, nowrap: true },
  { w: 970,  h: 90,   layout: 'bar',   pad: 22, py: 8,  hs: 24, ss: 13, cs: 14, ts: 0,  radar: { mode: 'flow', px: 56 } },
  { w: 970,  h: 250,  layout: 'hero',  pad: 34, py: 30, hs: 34, ss: 16, cs: 16, ts: 11, radar: { mode: 'right', px: 178 } },
  { w: 300,  h: 600,  layout: 'tall',  pad: 24, py: 24, hs: 37, ss: 16, cs: 17, ts: 11, radar: { mode: 'flow', px: 152 } },
  { w: 160,  h: 600,  layout: 'tall',  pad: 13, py: 16, hs: 21, ss: 11, cs: 11, ts: 0,  radar: { mode: 'flow', px: 94 }, cta: CTA_SHORT },
  { w: 320,  h: 50,   layout: 'bar',   pad: 9,  py: 5,  hs: 13, ss: 0,  cs: 9,  ts: 0,  radar: { mode: 'none' }, cta: CTA_SHORT, compact: true, tiny: true, nowrap: true },
  { w: 320,  h: 100,  layout: 'bar',   pad: 12, py: 9,  hs: 20, ss: 0,  cs: 11, ts: 0,  radar: { mode: 'none' }, cta: CTA_SHORT, compact: true, tiny: true },
  // Responsive Display Ad marketing images
  { w: 1200, h: 628,  layout: 'hero',  pad: 64, py: 60, hs: 60, ss: 25, cs: 23, ts: 15, radar: { mode: 'right', px: 430 }, rda: 'landscape' },
  { w: 1200, h: 1200, layout: 'stack', pad: 90, py: 90, hs: 86, ss: 33, cs: 30, ts: 20, radar: { mode: 'bleed', frac: 0.56 }, rda: 'square' },
];

// ---------------------------------------------------------------- assets
const FONTS = [[400, '400'], [500, '400'], [600, '600'], [700, '700'], [800, '800']]
  .map(([w, f]) => `@font-face{font-family:'PJS';font-weight:${w};font-style:normal;` +
    `src:url('file://${join(FONT_DIR, `PlusJakartaSans-${f}.ttf`)}') format('truetype');}`)
  .join('\n');

// The product logo, verbatim from the marketing repo's public/logo.svg.
const LOGO_TILE = (px) => `
<svg width="${px}" height="${px}" viewBox="0 0 48 48" aria-hidden="true" style="display:block;flex:0 0 auto">
  <rect width="48" height="48" rx="12" fill="${BRAND.indigo}"/>
  <path d="M24 24 L41 24 A17 17 0 0 0 33.9 10.1 Z" fill="#ffffff" opacity="0.13"/>
  <circle cx="24" cy="24" r="13.5" fill="none" stroke="#fff" stroke-width="2" opacity="0.42"/>
  <circle cx="24" cy="24" r="7" fill="none" stroke="#fff" stroke-width="2" opacity="0.82"/>
  <circle cx="24" cy="24" r="2.6" fill="#fff"/>
  <circle cx="34.2" cy="14.4" r="4.3" fill="${BRAND.indigo}"/>
  <circle cx="34.2" cy="14.4" r="3.5" fill="${BRAND.blip}"/>
</svg>`;

// Radar instrument panel. Dots only, never labels: the playbook allows only
// High/Medium/Low Risk as radar text, so the zero-risk render carries none.
function radarSvg(px, theme) {
  const dark = theme === 'dark';
  const ringOp = dark ? 0.55 : 0.32;
  return `
<svg width="${px}" height="${px}" viewBox="0 0 200 200" aria-hidden="true" style="display:block">
  <defs>
    <radialGradient id="rg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BRAND.indigo}" stop-opacity="${dark ? 0.36 : 0.14}"/>
      <stop offset="100%" stop-color="${BRAND.indigo}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sw" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND.indigo}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${BRAND.indigo}" stop-opacity="${dark ? 0.34 : 0.18}"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="96" fill="url(#rg)"/>
  <path d="M100 100 L196 100 A96 96 0 0 0 132.1 9.4 Z" fill="url(#sw)"/>
  <circle cx="100" cy="100" r="94" fill="none" stroke="${BRAND.indigo}" stroke-opacity="${ringOp}" stroke-width="2"/>
  <circle cx="100" cy="100" r="66" fill="none" stroke="${BRAND.indigo}" stroke-opacity="${ringOp}" stroke-width="2"/>
  <circle cx="100" cy="100" r="38" fill="none" stroke="${BRAND.indigo}" stroke-opacity="${ringOp}" stroke-width="2"/>
  <line x1="100" y1="6" x2="100" y2="194" stroke="${BRAND.indigo}" stroke-opacity="${ringOp * 0.55}" stroke-width="1.5"/>
  <line x1="6" y1="100" x2="194" y2="100" stroke="${BRAND.indigo}" stroke-opacity="${ringOp * 0.55}" stroke-width="1.5"/>
  <circle cx="141" cy="60"  r="14"  fill="${BRAND.red}"   fill-opacity="0.17"/>
  <circle cx="141" cy="60"  r="7"   fill="${BRAND.red}"/>
  <circle cx="66"  cy="128" r="10"  fill="${BRAND.amber}" fill-opacity="0.20"/>
  <circle cx="66"  cy="128" r="5.5" fill="${BRAND.amber}"/>
  <circle cx="126" cy="141" r="9"   fill="${BRAND.green}" fill-opacity="0.20"/>
  <circle cx="126" cy="141" r="5"   fill="${BRAND.green}"/>
  <circle cx="58"  cy="72"  r="4"   fill="${BRAND.green}" fill-opacity="0.7"/>
  <circle cx="100" cy="100" r="4.5" fill="${BRAND.indigo}"/>
</svg>`;
}

// ---------------------------------------------------------------- page
function page(key, spec) {
  const c = CONCEPTS[key];
  const dark = c.theme === 'dark';
  const isBar = spec.layout === 'bar';
  const narrow = spec.w < 400 || spec.h < 110;

  const sub = spec.ss ? (narrow ? c.subShort : c.sub) : '';
  const cta = spec.cta || CTA_LONG;
  const trust = spec.ts ? c.trust : '';

  const fg = dark ? '#FFFFFF' : BRAND.ink;
  const subFg = dark ? BRAND.grayLight : BRAND.gray;
  const grid = Math.max(16, Math.round(Math.min(spec.w, spec.h) / 9));

  // Radar geometry, resolved here so it never participates in text layout.
  let rPx = 0, rCss = '';
  if (spec.radar.mode === 'bleed') {
    rPx = Math.round(spec.w * spec.radar.frac);
    rCss = `position:absolute;right:${-Math.round(rPx * 0.14)}px;bottom:${-Math.round(rPx * 0.16)}px;z-index:0;`;
  } else if (spec.radar.mode === 'right') {
    rPx = spec.radar.px || Math.min(spec.h - spec.py, Math.round(spec.w * 0.42));
    rCss = `position:absolute;right:${Math.round(spec.pad * 0.5)}px;top:50%;` +
           `transform:translateY(-50%);z-index:0;`;
  } else if (spec.radar.mode === 'flow') {
    rPx = spec.radar.px;
  }

  // Width the text column may occupy without colliding with the radar.
  const fitW = spec.radar.mode === 'right'
    ? spec.w - spec.pad * 2 - rPx - Math.round(spec.pad * 0.8)
    : spec.radar.mode === 'bleed'
      ? Math.round((spec.w - spec.pad * 2) * (spec.w >= 1000 ? 0.72 : 0.82))
      : spec.w - spec.pad * 2;

  const logoPx = Math.max(16, Math.round(spec.hs * 0.78));
  const wordPx = Math.max(11, Math.round(spec.hs * 0.52));

  const lockup = `<div class="lockup">${LOGO_TILE(logoPx)}` +
    `${spec.compact ? '' : '<span class="word">TeamPredict</span>'}</div>`;
  const headline = spec.tiny ? c.headlineTiny : c.headline;
  const textBlock = `<div class="text"><h1>${headline}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>`;
  const ctaBlock = `<div class="ctaWrap"><span class="cta">${cta}</span>` +
    `${trust ? `<span class="trust">${trust}</span>` : ''}</div>`;
  const flowRadar = spec.radar.mode === 'flow' ? `<div class="radarFlow">${radarSvg(rPx, c.theme)}</div>` : '';
  const absRadar = (spec.radar.mode === 'bleed' || spec.radar.mode === 'right')
    ? `<div class="radarAbs">${radarSvg(rPx, c.theme)}</div>` : '';

  const fit = isBar
    ? `<div class="fit bar">${lockup}${textBlock}<i class="sp"></i>${flowRadar}${ctaBlock}</div>`
    : spec.layout === 'tall'
      ? `<div class="fit tall">${lockup}${textBlock}${flowRadar}${ctaBlock}</div>`
      : `<div class="fit col">${lockup}${textBlock}${ctaBlock}</div>`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${spec.w}px;height:${spec.h}px;overflow:hidden}
body{font-family:'PJS',sans-serif;-webkit-font-smoothing:antialiased;
  ${dark ? `background:${BRAND.ink};`
        : `background:linear-gradient(160deg,#FFFFFF 0%,${BRAND.tintBg} 100%);`}}
.frame{--s:1;position:relative;width:${spec.w}px;height:${spec.h}px;padding:${spec.py}px ${spec.pad}px;
  overflow:hidden;display:flex;align-items:center;
  border:${spec.w > 700 ? 0 : 1}px solid ${dark ? 'rgba(75,86,255,.35)' : 'rgba(75,86,255,.18)'};
  ${dark
    ? `background-image:repeating-radial-gradient(circle at 76% 24%,rgba(75,86,255,.09) 0 1px,transparent 1px ${grid}px);`
    : `background-image:linear-gradient(to right,rgba(75,86,255,.075) 1px,transparent 1px),
       linear-gradient(to bottom,rgba(75,86,255,.075) 1px,transparent 1px);
       background-size:${grid}px ${grid}px;`}}
.radarAbs{${rCss}}
.radarFlow{flex:0 0 auto;align-self:center}

.fit{position:relative;z-index:1;max-width:${fitW}px}
.fit.col,.fit.tall{display:flex;flex-direction:column;align-items:flex-start;
  gap:calc(${Math.round(spec.hs * 0.42)}px * var(--s));width:100%}
.fit.tall{height:100%;justify-content:space-between;gap:calc(${Math.round(spec.hs * 0.3)}px * var(--s))}
.fit.bar{display:flex;align-items:center;width:100%;max-width:none;
  gap:calc(${Math.round(spec.pad * 0.85)}px * var(--s))}
.fit.bar .text{flex:0 1 auto;min-width:0}
.fit.bar .sp{flex:1 1 auto;min-width:${Math.round(spec.pad * 0.3)}px}

h1{font-weight:800;font-size:calc(${spec.hs}px * var(--s));line-height:1.05;
  letter-spacing:-.032em;color:${fg};text-wrap:balance;
  ${spec.nowrap ? 'white-space:nowrap;' : ''}}
.sub{font-weight:500;font-size:calc(${spec.ss || 12}px * var(--s));line-height:1.3;color:${subFg};
  margin-top:calc(${Math.round(spec.hs * 0.24)}px * var(--s));letter-spacing:-.008em}
.lockup{display:flex;align-items:center;gap:calc(${Math.round(logoPx * 0.34)}px * var(--s));flex:0 0 auto}
.lockup svg{width:calc(${logoPx}px * var(--s));height:calc(${logoPx}px * var(--s))}
.word{font-weight:800;font-size:calc(${wordPx}px * var(--s));letter-spacing:-.028em;color:${fg}}
.ctaWrap{flex:0 0 auto}
.cta{display:inline-block;background:${BRAND.indigo};color:#fff;font-weight:700;
  font-size:calc(${spec.cs}px * var(--s));letter-spacing:-.012em;white-space:nowrap;
  padding:calc(${Math.round(spec.cs * 0.7)}px * var(--s)) calc(${Math.round(spec.cs * 1.32)}px * var(--s));
  border-radius:999px;
  box-shadow:0 calc(${Math.round(spec.cs * 0.22)}px * var(--s)) calc(${Math.round(spec.cs * 0.85)}px * var(--s)) rgba(47,54,200,.28)}
.trust{display:block;font-weight:600;font-size:calc(${spec.ts || 10}px * var(--s));color:${subFg};
  margin-top:calc(${Math.round((spec.ts || 10) * 0.6)}px * var(--s));letter-spacing:-.004em;white-space:nowrap}
</style></head><body>
<div class="frame" id="frame">${absRadar}${fit}</div>
</body></html>`;
}

// Shrink --s until the text column fits its box. Runs in the page.
const AUTOFIT = ({ padX, padY }) => {
  const frame = document.getElementById('frame');
  const fit = frame.querySelector('.fit');
  const availW = frame.clientWidth - padX * 2;
  const availH = frame.clientHeight - padY * 2;
  let s = 1;
  // A nowrap headline inside a shrunken flex item keeps its element rect inside
  // the box while its TEXT spills and gets clipped, so box checks alone are not
  // enough: every text node's scroll size has to fit its own element too.
  const textFits = () => [...frame.querySelectorAll('h1,.sub,.word,.cta,.trust')]
    .every((el) => el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1);
  const fits = () => {
    const r = fit.getBoundingClientRect();
    return fit.scrollWidth <= Math.ceil(availW) + 1 &&
           Math.max(fit.scrollHeight, r.height) <= Math.ceil(availH) + 1 &&
           textFits();
  };
  while (!fits() && s > 0.5) {
    s = Math.round((s - 0.02) * 100) / 100;
    frame.style.setProperty('--s', String(s));
  }
  return s;
};

// Every text element must sit fully inside the frame.
const ASSERT = () => {
  const frame = document.getElementById('frame');
  const fr = frame.getBoundingClientRect();
  const bad = [];
  for (const el of frame.querySelectorAll('h1,.sub,.word,.cta,.trust')) {
    const r = el.getBoundingClientRect();
    const outOfFrame = r.top < fr.top - 0.6 || r.bottom > fr.bottom + 0.6 ||
                       r.left < fr.left - 0.6 || r.right > fr.right + 0.6;
    const clipped = el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
    if (outOfFrame || clipped) {
      bad.push({
        el: el.className || el.tagName,
        text: (el.textContent || '').slice(0, 34),
        reason: [outOfFrame && 'out-of-frame', clipped && 'text-clipped'].filter(Boolean).join('+'),
        scroll: `${el.scrollWidth}x${el.scrollHeight}`, client: `${el.clientWidth}x${el.clientHeight}`,
      });
    }
  }
  return bad;
};

// ---------------------------------------------------------------- render
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const manifest = [];
const failures = [];

for (const key of Object.keys(CONCEPTS)) {
  for (const spec of SIZES) {
    const ctx = await browser.newContext({
      viewport: { width: spec.w, height: spec.h }, deviceScaleFactor: 1,
    });
    const pg = await ctx.newPage();
    await pg.setContent(page(key, spec), { waitUntil: 'load' });
    await pg.evaluate(() => document.fonts.ready);
    const scale = await pg.evaluate(AUTOFIT, { padX: spec.pad, padY: spec.py });
    const bad = await pg.evaluate(ASSERT);

    const tag = spec.rda ? `RDA_${spec.rda}` : 'GDN';
    const file = `TP_${tag}_${spec.w}x${spec.h}_${key}_JUL26.png`;
    const path = join(OUT, file);
    await pg.screenshot({ path, clip: { x: 0, y: 0, width: spec.w, height: spec.h } });
    await ctx.close();

    if (bad.length) failures.push({ file, bad });
    manifest.push({
      file, w: spec.w, h: spec.h, concept: key, scale,
      kb: +(statSync(path).size / 1024).toFixed(1),
      limit150: !spec.rda,
    });
  }
}

// Square logo asset for the responsive display ad.
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.setContent(`<!doctype html><style>*{margin:0}html,body{width:1200px;height:1200px;
    background:#fff;display:flex;align-items:center;justify-content:center}</style>
    <body>${LOGO_TILE(1040)}</body>`);
  const file = 'TP_RDA_logo_1200x1200_JUL26.png';
  await pg.screenshot({ path: join(OUT, file), clip: { x: 0, y: 0, width: 1200, height: 1200 } });
  await ctx.close();
  manifest.push({ file, w: 1200, h: 1200, concept: 'logo', scale: 1,
    kb: +(statSync(join(OUT, file)).size / 1024).toFixed(1), limit150: false });
}

await browser.close();
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`\nRendered ${manifest.length} assets into ${OUT}\n`);
console.log('| File | Size | scale | KB | 150KB cap |');
console.log('| --- | --- | ---: | ---: | --- |');
for (const m of manifest) {
  const cap = m.limit150 ? (m.kb > 150 ? 'OVER' : 'ok') : 'n/a';
  console.log(`| ${m.file} | ${m.w}x${m.h} | ${m.scale} | ${m.kb} | ${cap} |`);
}

if (failures.length) {
  console.log(`\n✗ ${failures.length} LAYOUT FAILURES:`);
  for (const f of failures) console.log(`  ${f.file}: ${JSON.stringify(f.bad)}`);
  process.exit(1);
}
const over = manifest.filter((m) => m.limit150 && m.kb > 150);
if (over.length) {
  console.log(`\n✗ over Google's 150KB uploaded-display cap: ${over.map((m) => m.file).join(', ')}`);
  process.exit(1);
}
console.log('\n✓ All text inside frame on every unit. All uploaded sizes under 150KB.\n');
