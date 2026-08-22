// Screenshot the wordmark HTML with a transparent background -> wordmark.png
// Launch pattern copied from second-brain/scripts/browser-smoke.mjs.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
const req = createRequire(import.meta.url);
function loadChromium() {
  let globalRoot = '';
  try { globalRoot = execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch {}
  for (const name of ['playwright', 'playwright-core']) {
    for (const spec of [name, globalRoot && join(globalRoot, name)].filter(Boolean)) {
      try { return req(spec).chromium; } catch {}
    }
  }
  throw new Error('no playwright');
}
const chromium = loadChromium();
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 900, height: 300 } });
await page.goto('file://' + process.cwd() + '/wordmark.html');
await page.waitForTimeout(2500); // let the Google font load
const el = page.locator('#logo');
await el.screenshot({ path: 'wordmark.png', omitBackground: true });
await browser.close();
console.log('wordmark.png written');
