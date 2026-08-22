#!/usr/bin/env node
// Raw screen recording of the LIVE 1capture.io trial flow, for compositing into
// the b14 video ads.
//
//   node _work/capture-screen.mjs
//
// WHY A REAL CAPTURE AND NOT A GENERATED SCREEN. Batch 8 established the rule
// (paid-ads-creative-playbook.md): for a brand whose discipline is not claiming
// precision, an invented product screen IS the banned claim. Every number, email
// and verdict in these frames is what the live site renders. Nothing is drawn.
//
// WHY THIS SHAPE OF CAPTURE. Three approaches were measured on 2026-08-21:
//   playwright recordVideo   1000px CSS wide, 25fps  -> card panel only ~330px, too soft
//   element.screenshot loop  crisp, 2.4fps           -> a slideshow
//   CDP screencast           see table below
// The screencast emits a frame per compositor paint, so its rate falls as the
// viewport grows. Measured element size vs rate:
//   1400x1000 zoom 1     652x551   19.8 fps
//   2000x1430 zoom 1.43  931x787    9.5 fps   <- used
//   2400x1715 zoom 1.72 1117x947    6.9 fps
//   2800x2000 zoom 2    1303x1102   5.2 fps
// 931px wide upscales to the 1080 delivery frame by only 1.16x, and 9.5fps is
// fine for a dashboard whose state changes every 1.7-2.1s. Page zoom rather than
// deviceScaleFactor because CDP screencast caps output at the CSS viewport size:
// deviceScaleFactor 2 still delivered 1400x1000 frames.
//
// Frame times are recorded as wall clock and written into an ffmpeg concat list,
// so the assembled clip runs at the site's real speed rather than a nominal fps.

import { chromium } from 'playwright';
import { mkdirSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, 'screencap');
const SECONDS = Number(process.env.SECONDS ?? 26);
const VIEWPORT = { width: 2000, height: 1430 };
const ZOOM = 1.43;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-proxy-server', '--hide-scrollbars'],
});

async function capture(name, url, locate, seconds) {
  const dir = path.join(OUT, name);
  mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate((z) => { document.documentElement.style.zoom = String(z); }, ZOOM);
  await page.addStyleTag({ content: '*{scrollbar-width:none!important}::-webkit-scrollbar{display:none!important}' });
  await page.waitForTimeout(1500);

  const box = await locate(page);
  writeFileSync(path.join(dir, 'box.json'), JSON.stringify(box));

  const cdp = await ctx.newCDPSession(page);
  const times = [];
  let n = 0;
  const t0 = Date.now();
  cdp.on('Page.screencastFrame', async (f) => {
    const t = Date.now() - t0;
    if (t <= seconds * 1000) {
      writeFileSync(path.join(dir, `f${String(n).padStart(4, '0')}.jpg`), Buffer.from(f.data, 'base64'));
      times.push(t); n += 1;
    }
    try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch { /* frame raced the stop */ }
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, everyNthFrame: 1 });
  await page.waitForTimeout(seconds * 1000 + 400);
  await cdp.send('Page.stopScreencast').catch(() => {});

  // Per-frame durations from the real capture clock, so playback is real time.
  const frames = readdirSync(dir).filter((f) => f.endsWith('.jpg')).sort();
  const lines = frames.map((f, i) => {
    const d = Math.max(((times[i + 1] ?? times[i] + 50) - times[i]) / 1000, 0.01);
    return `file '${f}'\nduration ${d.toFixed(4)}`;
  });
  lines.push(`file '${frames.at(-1)}'`);
  writeFileSync(path.join(dir, 'concat.txt'), lines.join('\n') + '\n');
  writeFileSync(path.join(dir, 'times.json'), JSON.stringify(times));
  console.log(`${name}: ${n} frames / ${seconds}s (${(n / seconds).toFixed(1)} fps), element ` +
              `${Math.round(box.width)}x${Math.round(box.height)}`);
  await ctx.close();
}

// The card check on the live homepage: browser chrome on app.1capture.io, the
// live trial-to-paid number, and real cards being verified or blocked at signup.
await capture('cardcheck', 'https://www.1capture.io/', async (page) => {
  const label = page.getByText('Card verification', { exact: false }).first();
  await label.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -40));
  await page.waitForTimeout(700);
  return label.locator('xpath=ancestor::div[contains(@class,"hero-rise")][1]').boundingBox();
}, SECONDS);

// The trial signup page itself. A static page emits exactly one screencast frame
// (the compositor only paints on change), so the capture drives a real slow scroll
// rather than faking motion afterwards from a still.
await capture('trialpage', 'https://www.1capture.io/trial', async (page) => {
  await page.waitForTimeout(400);
  page.evaluate(async () => {
    for (let i = 0; i < 180; i += 1) {
      window.scrollBy(0, 9);
      await new Promise((r) => setTimeout(r, 45));
    }
  }).catch(() => {});
  return { x: 380, y: 0, width: 1240, height: VIEWPORT.height };
}, 9);

await browser.close();
