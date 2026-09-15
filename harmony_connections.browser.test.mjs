import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.JAZZ_COMPASS_PLAYWRIGHT;
const browserPath = process.env.JAZZ_COMPASS_BROWSER;

test('harmonic connection panel contains nested neo views, wheel reference and colored all-view links',
  { skip: !playwrightPath || !browserPath, timeout: 60000 }, async () => {
    const { chromium } = require(playwrightPath);
    const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
    const server = createServer(async (request, response) => {
      try {
        const name = request.url.split('?')[0];
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
      const errors = []; page.on('pageerror', error => errors.push(error.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/`);
      await page.locator('.feature-btn[data-feature="neo"]').click();
      await page.locator('.neo-view-switch').waitFor();
      assert.equal(await page.locator('#nav_neo').innerText(), '和声连接论');
      assert.equal(await page.locator('.neo-view-group > span').innerText(), '新里曼理论');
      assert.equal(await page.locator('.neo-view-group button').count(), 2);
      assert.equal(await page.locator('.neo-view-switch button').count(), 4);
      await page.locator('.neo-view-switch button[data-view="harmony"]').click();
      assert.equal(await page.locator('.harmony-wheel-node').count(), 60);
      assert.equal(await page.locator('.harmony-wheel-reference img').evaluate(async img => {
        await img.decode(); return img.naturalWidth > 600;
      }), true);
      assert.match(await page.locator('.harmony-wheel-intro').innerText(), /五度环/);
      assert.match(await page.locator('.harmony-wheel-caveat').innerText(), /重叠箭头/);
      assert.equal(await page.locator('.harmony-wheel-edge').count(), 180);
      assert.match(await page.locator('.harmony-wheel-count').innerText(), /180 条连接/);
      const edgePairs = await page.locator('.harmony-wheel-edge title').allTextContents();
      for (const pair of ['G7 7th-upper° B°', 'E7 7th-fifth° B°', 'E° dim-third-cycle G#°']) {
        assert(edgePairs.includes(pair), pair);
      }
      if (process.env.JAZZ_COMPASS_CAPTURE) await page.screenshot({ path: process.env.JAZZ_COMPASS_CAPTURE, fullPage: true });
      if (process.env.JAZZ_COMPASS_CAPTURE) await page.locator('.harmony-wheel-interactive svg').screenshot({
        path: process.env.JAZZ_COMPASS_CAPTURE.replace(/\.png$/i, '-wheel.png'),
      });
      assert.equal(await page.locator('.harmony-wheel-node.is-selected').count(), 1);
      await page.locator('.harmony-wheel-node[data-chord="Am"]').first().click();
      assert.equal(await page.locator('#neo-input').inputValue(), 'Am');
      assert.equal(await page.locator('.neo-view-switch button[data-view="harmony"]').getAttribute('aria-pressed'), 'true');
      assert.ok(await page.locator('.harmony-wheel-edge.is-active').count() >= 3);
      await page.locator('.harmony-wheel-node[data-chord="Bdim"]').first().click();
      assert.equal(await page.locator('#neo-input').inputValue(), 'Bdim');
      assert.equal(await page.locator('.harmony-wheel-node.is-selected').count(), 1);
      await page.locator('.harmony-wheel-node[data-chord="E7"]').first().click();
      assert.equal(await page.locator('#neo-input').inputValue(), 'E7');
      assert.equal(await page.locator('.harmony-wheel-node.is-selected').count(), 2);
      assert.ok(await page.locator('.harmony-wheel-edge.is-active').count() >= 8);
      await page.locator('#neo-input').fill('Cmaj');
      await page.locator('#neo-run').click();
      await page.locator('.neo-view-switch button[data-view="all"]').click();
      await page.locator('#neo-canvas-container canvas').waitFor();
      assert.equal(await page.locator('.neo-graph-family').count(), 3);
      assert.equal(await page.locator('.neo-all-family').count(), 3);
      assert.equal(await page.locator('.neo-all-family.family-harmony .result-card').count() > 0, true);
      const colors = await page.locator('.neo-graph-family i').evaluateAll(elements =>
        elements.map(element => getComputedStyle(element).borderTopColor));
      assert.equal(new Set(colors).size, 3);
      if (process.env.JAZZ_COMPASS_CAPTURE) await page.screenshot({
        path: process.env.JAZZ_COMPASS_CAPTURE.replace(/\.png$/i, '-all.png'), fullPage: true,
      });
      await page.locator('#neo-input').fill('C7');
      await page.locator('#neo-run').click();
      assert.ok(await page.locator('.neo-all-family.family-octatonic .result-card').count() > 0);
      if (process.env.JAZZ_COMPASS_CAPTURE) await page.screenshot({
        path: process.env.JAZZ_COMPASS_CAPTURE.replace(/\.png$/i, '-all7.png'), fullPage: true,
      });
      await page.locator('.neo-view-switch button[data-view="octatonic"]').click();
      assert.equal(await page.locator('.neo-view-switch button[data-view="octatonic"]').getAttribute('aria-pressed'), 'true');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('.neo-view-switch button[data-view="harmony"]').click();
      assert.equal(await page.locator('#panel-neo').evaluate(el => el.scrollWidth <= el.clientWidth), true);
      assert.deepEqual(errors, []);
    } finally {
      await browser?.close();
      await new Promise(resolve => server.close(resolve));
    }
  });
