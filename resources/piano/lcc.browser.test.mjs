import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.JAZZ_COMPASS_PLAYWRIGHT;
const browserPath = process.env.JAZZ_COMPASS_BROWSER;

test('LCC parent explorer renders modes, colors and horizontal candidates', { skip: !playwrightPath || !browserPath, timeout: 30000 }, async () => {
  const { chromium } = require(playwrightPath);
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };
  const server = createServer(async (request, response) => {
    const name = request.url.split('?')[0];
    try {
      const bytes = await readFile(join(process.cwd(), name === '/' ? 'index.html' : name));
      response.setHeader('Content-Type', mime[extname(name === '/' ? 'index.html' : name)] || 'application/octet-stream');
      response.end(bytes);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, executablePath: browserPath });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.locator('.feature-btn[data-feature="lcc"]').click();
    await page.locator('.lcc-view-tabs button[data-lcc-view="chord"]').click();
    await page.locator('#lcc-input').fill('G7');
    await page.locator('#lcc-run').click();
    assert.match(await page.locator('.lcc-summary-tonic').innerText(), /^F$/);
    assert.match(await page.locator('.lcc-summary-meta').innerText(), /(?:调式|mode): 2/i);
    assert.match(await page.locator('.lcc-summary-meta').innerText(), /L\.T\.I\.: 大二度 \/ 小七度/);
    assert.equal(await page.locator('.lcc-order-chip').count(), 12);
    assert.equal(await page.locator('.lcc-color-card').count(), 7);
    assert.ok(await page.locator('.lcc-color-card.is-compatible').count() > 0);
    assert.ok(await page.locator('.lcc-preview:not(:disabled)').count() > 0);
    await page.locator('.lcc-preview:not(:disabled)').first().click();
    const initialCandidates = await page.locator('.lcc-parent-select option').count();
    await page.locator('.lcc-horizontal-toggle input').check();
    assert.ok(await page.locator('.lcc-parent-select option').count() > initialCandidates);
    assert.equal(await page.locator('.lcc-color-card').count(), 7);
    await page.locator('#lcc-input').fill('Am7');
    await page.locator('#lcc-run').click();
    assert.match(await page.locator('.lcc-summary-tonic').innerText(), /^C$/);
    assert.match(await page.locator('.lcc-summary-meta').innerText(), /(?:调式|mode): 6/i);
    await page.locator('#lcc-input').fill('Cmaj7');
    await page.locator('#lcc-run').click();
    assert.match(await page.locator('.lcc-color-card').nth(1).locator('.lcc-adaptation').innerText(), /G → G#/);
    await page.locator('.lcc-color-card').nth(1).locator('.lcc-preview').click();
    if (process.env.JAZZ_COMPASS_LCC_SCREENSHOT) await page.locator('#panel-lcc').screenshot({ path: process.env.JAZZ_COMPASS_LCC_SCREENSHOT });
    assert.equal(await page.locator('.lcc-progression-card').count(), 4);
    assert.deepEqual(await page.locator('.lcc-progression-parent').evaluateAll(nodes => nodes.map(node => node.value)), ['F', 'F', 'C', 'C']);
    await page.locator('.lcc-progression-color').selectOption('lydianDiminished');
    assert.match(await page.locator('.lcc-progression-card').nth(2).locator('.lcc-progression-change').innerText(), /E → Eb/);
    await page.locator('.lcc-progression-card').nth(2).locator('.lcc-preview').click();
    await page.locator('.lcc-progression-parent').nth(0).selectOption('C');
    assert.equal(await page.locator('.lcc-progression-parent').nth(0).inputValue(), 'C');
    await page.locator('.lcc-progression-input').fill('G7 | Cmaj7');
    await page.locator('.lcc-progression-run').click();
    assert.equal(await page.locator('.lcc-progression-card').count(), 2);
    assert.deepEqual(await page.locator('.lcc-progression-parent').evaluateAll(nodes => nodes.map(node => node.value)), ['F', 'C']);
    await page.locator('.lcc-progression-input').fill('G7 | ???');
    await page.locator('.lcc-progression-run').click();
    assert.equal(await page.locator('.lcc-progression-results .input-error').count(), 1);
    await page.locator('.lcc-progression-input').fill('G7 | Cmaj7');
    await page.locator('.lcc-progression-run').click();
    await page.locator('#lcc-input').fill('???');
    await page.locator('#lcc-run').click();
    assert.equal(await page.locator('#panel-lcc-body .input-error').count(), 1);
    await page.locator('#lcc-input').fill('G7');
    await page.locator('#lcc-run').click();
    await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
    assert.notEqual(await page.locator('.lcc-summary').evaluate(node => getComputedStyle(node).backgroundColor), 'rgba(0, 0, 0, 0)');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.locator('#panel-lcc-body').evaluate(node => node.scrollWidth <= node.clientWidth), true);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
