import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.JAZZ_COMPASS_PLAYWRIGHT;
const browserPath = process.env.JAZZ_COMPASS_BROWSER;

test('LCC parent lab needs no chord and explores all eleven collections', { skip: !playwrightPath || !browserPath, timeout: 45000 }, async () => {
  const { chromium } = require(playwrightPath);
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };
  const server = createServer(async (request, response) => {
    const name = request.url.split('?')[0];
    try {
      const path = join(process.cwd(), name === '/' ? 'index.html' : name);
      response.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream');
      response.end(await readFile(path));
    } catch { response.writeHead(404); response.end('Not found'); }
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
    await page.locator('.lcc-lab-tonic').waitFor();
    assert.equal(await page.locator('#panel-lcc > .panel-header').isVisible(), false);
    assert.equal(await page.locator('.lcc-lab-scale option').count(), 11);
    assert.equal(await page.locator('.lcc-lab-order button').count(), 12);
    assert.equal(await page.locator('.lcc-lab-palette .lcc-color-card').count(), 7);
    assert.equal(await page.locator('.lcc-lab-horizontal .lcc-horizontal-row').count(), 4);
    assert.equal(await page.locator('.lcc-lab-station').count(), 7);
    assert.equal(await page.locator('.lcc-lab-station.tonic-station').count(), 2);
    assert.deepEqual(await page.locator('.lcc-lab-station.tonic-station strong').allInnerTexts(), ['C', 'A']);
    if (process.env.JAZZ_COMPASS_LCC_LAB_SCREENSHOT) await page.locator('#panel-lcc').screenshot({ path: process.env.JAZZ_COMPASS_LCC_LAB_SCREENSHOT });
    await page.locator('.lcc-lab-tonic').selectOption('F');
    assert.equal(await page.locator('.lcc-lab-summary .lcc-summary-tonic').innerText(), 'F');
    assert.deepEqual(await page.locator('.lcc-lab-order button').allInnerTexts(), ['F\n1', 'C\n2', 'G\n3', 'D\n4', 'A\n5', 'E\n6', 'B\n7', 'Db\n8', 'Ab\n9', 'Eb\n10', 'Bb\n11', 'Gb\n12']);
    await page.locator('.lcc-lab-child').selectOption('2');
    assert.match(await page.locator('.lcc-lab-child-detail').innerText(), /G.*2\/12.*3\/12/s);
    await page.locator('.lcc-lab-scale').selectOption('auxDiminished');
    assert.equal(await page.locator('.lcc-lab-child option').count(), 8);
    assert.equal(await page.locator('.lcc-lab-station').count(), 0);
    assert.match(await page.locator('.lcc-lab-stations').innerText(), /8 个音/);
    await page.locator('.lcc-lab-scale').selectOption('africanAmericanBlues');
    assert.equal(await page.locator('.lcc-lab-child option').count(), 10);
    assert.match(await page.locator('.lcc-lab-stations').innerText(), /10 个音/);
    await page.locator('.lcc-lab-scale').selectOption('lydian');
    await page.locator('.lcc-lab-palette .lcc-color-card').nth(2).locator('button').first().click();
    assert.equal(await page.locator('.lcc-lab-scale').inputValue(), 'lydianDiminished');
    await page.locator('.lcc-lab-primary-preview').click();
    await page.locator('.lcc-view-tabs button[data-lcc-view="chord"]').click();
    assert.equal(await page.locator('#panel-lcc > .panel-header').isVisible(), true);
    assert.ok(await page.locator('.lcc-summary').count() > 0);
    await page.locator('.lcc-view-tabs button[data-lcc-view="parent"]').click();
    assert.equal(await page.locator('.lcc-lab-scale').inputValue(), 'lydianDiminished');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.locator('#panel-lcc-body').evaluate(node => node.scrollWidth <= node.clientWidth), true);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
