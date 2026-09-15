import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.JAZZ_COMPASS_PLAYWRIGHT;
const browserPath = process.env.JAZZ_COMPASS_BROWSER;

test('88-key harmony, seams, and latch work in a browser', { skip: !playwrightPath || !browserPath, timeout: 30000 }, async () => {
  const { chromium } = require(playwrightPath);
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };
  const server = createServer(async (request, response) => {
    const name = request.url.split('?')[0];
    try {
      const file = join(process.cwd(), name === '/' ? 'index.html' : name);
      const bytes = await readFile(file);
      response.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
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
    await page.addInitScript(() => {
      const input = { onmidimessage: null };
      window.__testMidiInput = input;
      Object.defineProperty(navigator, 'requestMIDIAccess', {
        configurable: true,
        value: async () => ({ inputs: new Map([['test keyboard', input]]), onstatechange: null }),
      });
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.locator('#tab-micro').click();
    assert.equal(await page.locator('[data-roll-midi]').count(), 88);
    assert.equal(await page.locator('[data-roll-position]').count(), 87);
    for (const note of [60, 64, 67]) await page.locator(`[data-roll-midi="${note}"]`).click();
    assert.match(await page.locator('.micro-roll-readout').innerText(), /C4 · E4 · G4/);
    assert.equal(await page.locator('.micro-roll-key.is-active').count(), 3);
    await page.locator('#micro-chord-clear').click();
    assert.equal(await page.locator('.micro-roll-key.is-active').count(), 0);
    await page.locator('[data-roll-position="60.5"]').click();
    assert.match(await page.locator('.micro-roll-readout').innerText(), /C4 \+50¢/);
    assert.equal(await page.locator('.micro-roll-seam.is-active').count(), 1);
    await page.locator('#micro-chord-latch').click();
    assert.equal(await page.locator('.micro-roll-seam.is-active').count(), 0);
    assert.equal(await page.locator('#micro-chord-latch').getAttribute('aria-pressed'), 'false');
    await page.locator('#micro-midi-connect').click();
    assert.match(await page.locator('.micro-midi-status').innerText(), /MIDI 已连接/);
    await page.evaluate(() => {
      for (const note of [60, 64, 67]) window.__testMidiInput.onmidimessage({ data: [0x90, note, 100] });
    });
    assert.equal(await page.locator('.micro-roll-key.is-active').count(), 3);
    assert.match(await page.locator('.micro-roll-readout').innerText(), /C4 · E4 · G4/);
    await page.evaluate(() => window.__testMidiInput.onmidimessage({ data: [0x80, 64, 0] }));
    assert.equal(await page.locator('.micro-roll-key.is-active').count(), 2);
    assert.match(await page.locator('.micro-roll-readout').innerText(), /C4 · G4/);
    await page.evaluate(() => window.__testMidiInput.onmidimessage({ data: [0xe0, 127, 127] }));
    assert.match(await page.locator('.micro-midi-bend').innerText(), /\+200\.00¢/);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
