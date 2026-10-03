import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.JAZZ_COMPASS_PLAYWRIGHT;
const browserPath = process.env.JAZZ_COMPASS_BROWSER;

test('Blues toolbox explores form, scales, phrases and chord colors without a required chord', { skip: !playwrightPath || !browserPath, timeout: 55000 }, async () => {
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
    await page.locator('.feature-btn[data-feature="blues"]').click();
    await page.locator('.blues-head h3').waitFor();
    assert.equal(await page.locator('.blues-head h3').innerText(), '布鲁斯工具箱');
    assert.equal(await page.locator('.blues-tabs button').count(), 4);
    assert.equal(await page.locator('#panel-blues > .panel-header').isVisible(), false);
    assert.equal(await page.locator('.blues-bar').count(), 12);
    assert.deepEqual(await page.locator('.blues-bar-chord strong').allInnerTexts(), ['C7', 'C7', 'C7', 'C7', 'F7', 'F7', 'C7', 'C7', 'G7', 'F7', 'C7', 'G7']);
    await page.locator('.blues-form-variant').selectOption('quick');
    assert.equal(await page.locator('.blues-bar[data-bar="2"] strong').innerText(), 'F7');
    await page.locator('.blues-form-variant').selectOption('jazz');
    assert.deepEqual(await page.locator('.blues-bar[data-bar="4"] strong').allInnerTexts(), ['Gm7', 'C7']);
    assert.equal(await page.locator('.blues-bar[data-bar="6"] strong').innerText(), 'F#dim7');
    await page.locator('.blues-form-variant').selectOption('minor');
    assert.equal(await page.locator('.blues-bar[data-bar="9"] strong').innerText(), 'G7b9');
    await page.locator('.blues-form-turnaround').selectOption('iiV');
    assert.deepEqual(await page.locator('.blues-bar[data-bar="12"] strong').allInnerTexts(), ['Dm7b5', 'G7b9']);
    await page.locator('.blues-form-tempo').fill('170');
    await page.locator('.blues-form-groove').selectOption('straight');
    await page.locator('.blues-form .blues-primary').click();
    await page.locator('.blues-play-status').getByText(/小节 1/).waitFor();
    await page.locator('.blues-form .blues-outline').click();
    assert.equal(await page.locator('.blues-play-status').innerText(), '');
    await page.locator('.blues-tabs button[data-blues-tab="scales"]').click();
    assert.equal(await page.locator('.blues-scale-select option').count(), 6);
    assert.deepEqual(await page.locator('.blues-scale-card .blues-note-chip').allInnerTexts(), ['C\n1', 'Eb\n♭3', 'F\n4', 'F#\n♯4 / ♭5', 'G\n5', 'Bb\n♭7']);
    await page.locator('.blues-scale-select').selectOption('mixedBlues');
    assert.equal(await page.locator('.blues-scale-card .blues-note-chip').count(), 10);
    await page.locator('.blues-bend-cents').fill('-50');
    assert.match(await page.locator('.blues-bend-output').innerText(), /-50 ¢/);
    await page.locator('.blues-bend .blues-outline').first().click();
    await page.locator('.blues-bend .blues-outline').nth(1).click();
    await page.locator('.blues-tabs button[data-blues-tab="phrases"]').click();
    assert.equal(await page.locator('.blues-phrase-chip.is-rest').count(), 3);
    await page.locator('.blues-phrase-type').selectOption('blueFifth');
    assert.deepEqual(await page.locator('.blues-phrase-chip').allInnerTexts(), ['F', 'Gb', 'G', 'Bb', 'G', 'C']);
    await page.locator('.blues-phrases .blues-primary').click();
    await page.locator('.blues-phrases .blues-outline').click();
    await page.locator('.blues-tabs button[data-blues-tab="chord"]').click();
    assert.equal(await page.locator('#panel-blues > .panel-header').isVisible(), true);
    assert.ok(await page.locator('.blues-suggestion-card').count() > 0);
    await page.locator('.blues-suggestion-card button').first().click();
    await page.locator('#blues-input').fill('???');
    await page.locator('#blues-run').click();
    assert.equal(await page.locator('.blues-chord-colors .input-error').count(), 1);
    await page.locator('.blues-tabs button[data-blues-tab="form"]').click();
    assert.equal(await page.locator('#panel-blues > .panel-header').isVisible(), false);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.locator('#panel-blues-body').evaluate(node => node.scrollWidth <= node.clientWidth), true);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
