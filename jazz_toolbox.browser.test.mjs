import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.JAZZ_COMPASS_PLAYWRIGHT;
const browserPath = process.env.JAZZ_COMPASS_BROWSER;

test('Jazz toolbox works across all five views, maps and small screens', { skip: !playwrightPath || !browserPath, timeout: 90000 }, async () => {
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
    await page.locator('.feature-btn[data-feature="cst"]').click();
    await page.locator('.jazz-head h3').waitFor();
    assert.equal(await page.locator('#nav_cst').innerText(), '爵士工具箱');
    assert.equal(await page.locator('.jazz-head h3').innerText(), '爵士工具箱');
    assert.equal(await page.locator('.jazz-tabs button').count(), 5);
    assert.ok(await page.locator('.jazz-mode-select option').count() > 0);
    await page.locator('.jazz-check input[type="checkbox"]').check();
    assert.equal(await page.locator('.jazz-mode-select option').count(), 27);
    await page.locator('.jazz-mode-select').selectOption('major-1');
    assert.match(await page.locator('.jazz-scale-info').innerText(), /F \(11\)/);
    await page.locator('.jazz-mode-select').selectOption('major-4');
    assert.match(await page.locator('.jazz-scale-info').innerText(), /F# \(♯11\)/);
    assert.deepEqual(await page.locator('.jazz-modal-chord strong').allInnerTexts(), ['Cm7', 'Dm7b5', 'Ebmaj7', 'Fm7', 'Gm7', 'Abmaj7', 'Bb7']);
    await page.locator('.jazz-modal-donor').selectOption('major-1');
    assert.equal(await page.locator('.jazz-modal-chord.borrowed').count(), 0);
    if (process.env.JAZZ_COMPASS_JAZZ_SCREENSHOT) await page.locator('#panel-cst').screenshot({ path: process.env.JAZZ_COMPASS_JAZZ_SCREENSHOT });
    await page.locator('.jazz-tabs button[data-jazz-tab="progressions"]').click();
    assert.deepEqual(await page.locator('.jazz-flow-chord strong').allInnerTexts(), ['Dm7', 'G7', 'Cmaj7']);
    await page.locator('.jazz-kind').selectOption('tritone');
    await page.locator('.jazz-progression-options input[type="checkbox"]').first().check();
    await page.locator('.jazz-progression-options input[type="checkbox"]').nth(1).check();
    await page.locator('.jazz-progression-options input[type="checkbox"]').nth(2).check();
    assert.deepEqual(await page.locator('.jazz-flow-chord strong').allInnerTexts(), ['Abm7', 'Db7', 'Gbmaj7']);
    await page.locator('.jazz-kind').selectOption('secondarySub');
    await page.locator('.jazz-progression-options input[type="checkbox"]').check();
    assert.deepEqual(await page.locator('.jazz-flow-chord strong').allInnerTexts(), ['Eb7', 'Dm7', 'G7', 'Cmaj7']);
    await page.locator('.jazz-tabs button[data-jazz-tab="voicings"]').click();
    assert.equal(await page.locator('.jazz-voicing-card').count(), 6);
    assert.match(await page.locator('.jazz-dominant-dial').innerText(), /G7/);
    assert.match(await page.locator('.jazz-dominant-tone-row').innerText(), /A\s*9/);
    await page.locator('.jazz-dominant-target').selectOption('minor');
    assert.match(await page.locator('.jazz-dominant-tone-row').innerText(), /Ab\s*♭9/);
    await page.locator('.jazz-tabs button[data-jazz-tab="chapters"]').click();
    assert.equal(await page.locator('.jazz-chapter-card').count(), 17);
    assert.equal(await page.locator('.jazz-chapter-card a').count(), 17);
    await page.locator('.jazz-chapter-search').fill('Coltrane');
    assert.equal(await page.locator('.jazz-chapter-card').count(), 1);
    await page.locator('.jazz-chapter-card button').click();
    assert.equal(await page.locator('#panel-cst-body').getAttribute('data-jazz-tab'), 'progressions');
    assert.equal(await page.locator('.jazz-kind').inputValue(), 'multiTonic');
    await page.locator('.jazz-tabs button[data-jazz-tab="maps"]').click();
    assert.equal(await page.locator('.jazz-map-credit a').getAttribute('href'), 'https://music-theory.aizcutei.com/');
    await page.locator('.jazz-map-image').evaluate(image => new Promise((resolve, reject) => {
      if (image.complete) return image.naturalWidth ? resolve() : reject(new Error('mode map failed to load'));
      image.onload = resolve; image.onerror = () => reject(new Error('mode map failed to load'));
    }));
    assert.equal(await page.locator('.jazz-map-image').evaluate(image => image.naturalWidth), 18000);
    await page.locator('.jazz-map-zoom').fill('150');
    assert.equal(await page.locator('.jazz-map-zoom').inputValue(), '150');
    assert.equal(await page.locator('.jazz-map-image').evaluate(image => image.style.width), '1500px');
    const mapBox = await page.locator('.jazz-map-viewport').boundingBox();
    await page.mouse.move(mapBox.x + 400, mapBox.y + 100);
    await page.mouse.down();
    await page.mouse.move(mapBox.x + 120, mapBox.y + 100, { steps: 5 });
    await page.mouse.up();
    assert.ok(await page.locator('.jazz-map-viewport').evaluate(view => view.scrollLeft) > 100);
    await page.locator('.jazz-map-switch button[data-map="tree"]').click();
    await page.locator('.jazz-map-image').evaluate(image => new Promise((resolve, reject) => {
      if (image.complete) return image.naturalWidth ? resolve() : reject(new Error('mode tree failed to load'));
      image.onload = resolve; image.onerror = () => reject(new Error('mode tree failed to load'));
    }));
    assert.equal(await page.locator('.jazz-map-image').evaluate(image => image.naturalWidth), 17500);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.locator('#panel-cst-body').evaluate(node => node.scrollWidth <= node.clientWidth), true);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
