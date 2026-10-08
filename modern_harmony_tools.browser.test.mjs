import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const playwrightPath = process.env.JAZZ_COMPASS_PLAYWRIGHT;
const browserPath = process.env.JAZZ_COMPASS_BROWSER;
const base = process.env.JAZZ_COMPASS_URL || 'http://127.0.0.1:5501/';
const ids = ['nonfunctional', 'polytonality', 'atonality', 'spectralharmony', 'microtonalharmony'];
async function selectTool(page, id) {
  if (['spectralharmony','microtonalharmony'].includes(id)) {
    await page.locator('#tab-micro').click();
    await page.locator(`[data-micro-view="${id}"]`).click();
  } else { await page.locator('#tab-posttonal').click(); await page.locator(`[data-posttonal-view="${id}"]`).click(); }
}

test('all five real tools mount in three languages on desktop and mobile without page overflow', { skip: !playwrightPath || !browserPath, timeout: 120000 }, async () => {
  const { chromium } = require(playwrightPath);
  const browser = await chromium.launch({ headless: true, executablePath: browserPath });
  try {
    for (const lang of ['zh', 'ja', 'en']) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await context.newPage(), errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.addInitScript((lang) => { localStorage.setItem('jc-lang', lang); localStorage.setItem('jazz-compass-feature', 'nonfunctional'); }, lang);
      await page.goto(base + '#nonfunctional');
      for (const width of [1280, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        for (const id of ids) {
          await selectTool(page, id);
          const tool = page.locator(`#panel-${id} .mh-tool`);
          await tool.locator(id === 'polytonality' ? '.mh-timeline' : '.mh-output table').first().waitFor({ state: 'visible' });
          assert.equal(await tool.locator('.mh-error').count(), 0, `${lang}/${id}`);
          assert.equal(await tool.locator('.mh-actions button:disabled').count(), 0);
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
          assert.equal(overflow, false, `${lang}/${id}/${width} page overflow`);
          for (const box of await tool.locator('input:visible, select:visible').evaluateAll(nodes => nodes.map(node => ({ left: node.getBoundingClientRect().left, right: node.getBoundingClientRect().right })))) assert.ok(box.left >= 0 && box.right <= width + 1, `${id} input outside viewport`);
          await tool.locator('.mh-preset').selectOption('1');
          assert.equal(await tool.locator('.mh-error').count(), 0);
          assert.equal(await tool.locator('.mh-preset').inputValue(), '1');
        }
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
  } finally { await browser.close(); }
});

test('live edits stop audio, changing tools cancels queues, drafts and parameter links survive, and sine playback uses exact Hz', { skip: !playwrightPath || !browserPath, timeout: 45000 }, async () => {
  const { chromium } = require(playwrightPath);
  const browser = await chromium.launch({ headless: true, executablePath: browserPath });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      localStorage.setItem('jc-lang', 'en');
      window.__sineStarts = [];
      const original = OscillatorNode.prototype.start;
      OscillatorNode.prototype.start = function (...args) { if (this.type === 'sine') window.__sineStarts.push(this.frequency.value); return original.apply(this,args); };
    });
    await page.goto(base + '#spectralharmony');
    let tool = page.locator('#panel-spectralharmony .mh-tool');
    await tool.locator('[name=partials]').waitFor();
    await tool.locator('[name=fundamental]').fill('100');
    await tool.locator('[name=partials]').fill('5:0.8:0 7:0.5:0');
    await tool.getByRole('button', { name: 'Hear partials together', exact: true }).click();
    assert.equal(await tool.evaluate(node => node.classList.contains('is-playing')), true);
    assert.deepEqual(await page.evaluate(() => window.__sineStarts), [500, 700]);
    await tool.locator('[name=partials]').fill('5:0.8:30 7:0.5:0');
    assert.equal(await tool.evaluate(node => node.classList.contains('is-playing')), false);
    await tool.getByRole('button', { name: 'Hear partials separately', exact: true }).click();
    const count = await page.evaluate(() => window.__sineStarts.length);
    await selectTool(page,'polytonality');
    await page.waitForTimeout(1200);
    assert.equal(await page.evaluate(() => window.__sineStarts.length), count);
    await selectTool(page, 'spectralharmony');
    assert.equal(await tool.locator('[name=partials]').inputValue(), '5:0.8:30 7:0.5:0');
    await tool.locator('[name=partials]').fill('bad');
    assert.equal(await tool.locator('.mh-error').count(), 1);
    assert.equal(await tool.locator('.mh-actions button:disabled').count(), 3);
    await tool.getByRole('button', { name: 'Reset', exact: true }).click();
    assert.equal(await tool.locator('.mh-error').count(), 0);
    await tool.getByRole('button', { name: 'Hear partials separately', exact: true }).click();
    await page.keyboard.press('Escape');
    const stoppedCount = await page.evaluate(() => window.__sineStarts.length);
    await page.waitForTimeout(1200);
    assert.equal(await page.evaluate(() => window.__sineStarts.length), stoppedCount);
    assert.equal(await tool.evaluate(node => node.classList.contains('is-playing')), false);
    const settings = { fundamental: 200, partials: '1:1:0 3:0.5:0', morph: 50, bpm: 80 };
    await page.goto(base + '#spectralharmony?q=' + encodeURIComponent(JSON.stringify(settings)));
    tool = page.locator('#panel-spectralharmony .mh-tool');
    await tool.locator('[name=fundamental]').waitFor();
    await page.waitForFunction(() => document.querySelector('#panel-spectralharmony [name=fundamental]')?.value === '200');
    assert.equal(await tool.locator('[name=partials]').inputValue(), settings.partials);
    assert.match(await tool.locator('.mh-table').innerText(), /600\.000/);
    await page.reload();
    await tool.locator('[name=fundamental]').waitFor();
    assert.equal(await tool.locator('[name=fundamental]').inputValue(), '200');
    assert.equal(await tool.locator('.mh-actions button:disabled').count(), 0);
    await tool.getByRole('button', { name: 'Hear 12-EDO approximation', exact: true }).click();
    const nearest = await page.evaluate(() => window.__sineStarts.slice(-2));
    assert.ok(Math.abs(nearest[0] - 440 * 2 ** (-14/12)) < .001);
    assert.ok(Math.abs(nearest[1] - 440 * 2 ** (5/12)) < .001);
    assert.equal(await tool.locator('.mh-table tbody tr.is-active').count(), 2);
    await tool.getByRole('button', { name: 'Stop', exact: true }).click();
    assert.equal(await tool.locator('.mh-table tbody tr.is-active').count(), 0);
    await page.locator('#page-loading').waitFor({ state: 'hidden' });
    await tool.locator('.mh-output').scrollIntoViewIfNeeded();
    await page.screenshot({ path: '.modern-tools-desktop.png', fullPage: false });
    await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
    await page.screenshot({ path: '.modern-tools-dark.png', fullPage: false });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1), false);
    await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
    await page.setViewportSize({ width: 390, height: 844 });
    await selectTool(page,'polytonality');
    await page.locator('#panel-polytonality .mh-timeline').waitFor();
    await page.screenshot({ path: '.modern-tools-mobile.png', fullPage: true });
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
});

test('nonfunctional chord cards show names above pitches and update for inversions, pedals and custom sounds', { skip: !playwrightPath || !browserPath, timeout: 30000 }, async () => {
  const { chromium } = require(playwrightPath);
  const browser = await chromium.launch({ headless:true, executablePath:browserPath });
  try {
    const page = await browser.newPage({ viewport:{width:1280,height:900} });
    await page.addInitScript(() => localStorage.setItem('jc-lang','zh'));
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '#nonfunctional');
    const tool = page.locator('#panel-nonfunctional .mh-tool');
    await tool.locator('.mh-chord-name').first().waitFor();
    await tool.locator('.mh-preset').selectOption('1');
    assert.deepEqual(await tool.locator('.mh-chord-name').allTextContents(), ['C','Dm','Em','F']);
    assert.match(await tool.locator('.mh-chord-pitches').nth(1).innerText(), /D4 · F4 · A4/);
    assert.match(await tool.locator('.mh-table').innerText(), /和弦名/);
    await tool.locator('[name=mode]').selectOption('manual');
    await tool.locator('[name=chords]').fill('E3 G3 C4 | B3 C4 E4 G4 | C4 E4 G4 A4 | C4 C#4 D4');
    assert.deepEqual(await tool.locator('.mh-chord-name').allTextContents(), ['C/E','Cmaj7/B','C6','自定义音响']);
    assert.match(await tool.locator('.mh-chord-alternatives').first().innerText(), /Am7\/C/);
    await tool.locator('[name=chords]').fill('C4 E4 G4 | D4 F#4 A4');
    await tool.locator('[name=pedal]').fill('C3');
    assert.deepEqual(await tool.locator('.mh-chord-name').allTextContents(), ['C','D/C']);
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    await tool.locator('.mh-chords').scrollIntoViewIfNeeded();
    await page.locator('#page-loading').waitFor({state:'hidden'});
    await page.screenshot({path:'.nonfunctional-chord-names.png'});
    assert.deepEqual(errors,[]);
  } finally { await browser.close(); }
});

test('legacy harmony routes open nested microtonal views with settings, sharing and tutorial identities intact', { skip: !playwrightPath || !browserPath, timeout: 45000 }, async () => {
  const { chromium } = require(playwrightPath);
  const browser = await chromium.launch({headless:true,executablePath:browserPath});
  try {
    const context = await browser.newContext({viewport:{width:1280,height:900}});
    const page = await context.newPage(), errors=[];
    page.on('pageerror', error=>errors.push(error.message));
    await page.addInitScript(() => {
      localStorage.setItem('jc-lang','zh');
      window.__copiedToolLink = '';
      Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedToolLink=text;}}});
      const input={onmidimessage:null}; window.__microTestInput=input;
      Object.defineProperty(navigator,'requestMIDIAccess',{configurable:true,value:async()=>({inputs:new Map([['test',input]]),onstatechange:null})});
    });
    const settings={fundamental:123,partials:'1:1:0 5:0.8:0',morph:75,bpm:80};
    await page.goto(base+'#spectralharmony?q='+encodeURIComponent(JSON.stringify(settings)));
    await page.waitForFunction(()=>document.querySelector('#panel-spectralharmony [name=fundamental]')?.value==='123');
    assert.equal(await page.locator('#tab-micro').getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('[data-micro-view=spectralharmony]').getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#workspace-title').innerText(),'微分音工具箱');
    assert.equal(await page.locator('#tutorial-link').getAttribute('data-unit'),'spectralharmony');
    assert.equal(await page.locator('.feature-nav [data-feature=spectralharmony], .feature-nav [data-feature=microtonalharmony]').count(),0);
    assert.equal(await page.locator('#navgroup_modern').count(),0);
    assert.deepEqual(await page.locator('#navgroup_lab').locator('..').locator('.feature-btn').evaluateAll(nodes=>nodes.map(n=>n.dataset.feature)),['posttonal','chordsymbols','ref','other']);
    assert.equal(await page.locator('#panel-micro .micro-tool-view:visible').count(),1);
    await page.locator('#share-link').click();
    assert.match(await page.evaluate(()=>window.__copiedToolLink),/#spectralharmony$/);
    await page.locator('[data-micro-view=microtonalharmony]').click();
    await page.locator('#panel-microtonalharmony .mh-table').first().waitFor();
    assert.equal(await page.locator('#tutorial-link').getAttribute('data-unit'),'microtonalharmony');
    assert.equal(await page.locator('#tab-micro').getAttribute('aria-selected'),'true');
    await page.locator('#share-link').click();
    assert.match(await page.evaluate(()=>window.__copiedToolLink),/#microtonalharmony$/);
    await page.reload();
    await page.locator('#panel-microtonalharmony .mh-table').first().waitFor();
    assert.equal(await page.locator('[data-micro-view=microtonalharmony]').getAttribute('aria-selected'),'true');
    // Hash changes, rather than fresh page loads, also mount and deliver old settings links.
    await page.evaluate(hash=>{location.hash=hash;},'#spectralharmony?q='+encodeURIComponent(JSON.stringify({...settings,fundamental:246})));
    await page.waitForFunction(()=>document.querySelector('#panel-spectralharmony [name=fundamental]')?.value==='246');
    await page.locator('#panel-spectralharmony .mh-actions button').first().click();
    assert.equal(await page.locator('#panel-spectralharmony .mh-tool.is-playing').count(),1);
    await page.locator('[data-micro-view=micro]').click();
    await page.locator('.micro-roll-readout').waitFor();
    assert.equal(await page.locator('#panel-spectralharmony .mh-tool.is-playing').count(),0);
    await page.locator('[data-roll-midi="60"]').click();
    assert.equal(await page.locator('.micro-roll-key.is-active').count(),1);
    await page.locator('#micro-midi-connect').click();
    await page.evaluate(()=>window.__microTestInput.onmidimessage({data:[0x90,64,100]}));
    assert.equal(await page.locator('.micro-roll-key.is-active').count(),2);
    await page.locator('[data-micro-view=spectralharmony]').click();
    assert.equal(await page.locator('.micro-roll-key.is-active').count(),0);
    await page.evaluate(()=>window.__microTestInput.onmidimessage({data:[0x90,67,100]}));
    assert.equal(await page.locator('.micro-roll-key.is-active').count(),0);
    assert.equal(await page.locator('#panel-spectralharmony [name=fundamental]').inputValue(),'246');
    // Keyboard navigation selects one subview and keeps the primary microtonal entry active.
    await page.locator('[data-micro-view=spectralharmony]').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-micro-view=microtonalharmony]').getAttribute('aria-selected'),'true');
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1),false);
    await page.screenshot({path:'.micro-tool-views.png',fullPage:false});
    assert.deepEqual(errors,[]);
    await context.close();
  } finally {await browser.close();}
});


test('nonfunctional cards audition generated and custom voicings through click, Enter and Space, including the pedal', {skip:!playwrightPath||!browserPath,timeout:45000},async()=>{
 const {chromium}=require(playwrightPath),browser=await chromium.launch({headless:true,executablePath:browserPath});
 try{for(const lang of ['zh','ja','en']){
  const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(lang=>localStorage.setItem('jc-lang',lang),lang);
  await page.goto(base+'#nonfunctional');const tool=page.locator('#panel-nonfunctional .mh-tool');await tool.locator('button.mh-chord').first().waitFor();
  await tool.locator('button.mh-chord').nth(1).click();assert.equal(await tool.locator('button.mh-chord.is-active').count(),1);assert.match(await tool.locator('.mh-status').innerText(),/2.*D/);
  await tool.locator('button.mh-chord').nth(2).focus();await tool.locator('button.mh-chord').nth(2).press('Enter');assert.equal(await tool.locator('button.mh-chord').nth(1).evaluate(n=>n.classList.contains('is-active')),false);
  await tool.locator('button.mh-chord').nth(0).focus();await tool.locator('button.mh-chord').nth(0).press('Space');assert.match(await tool.locator('.mh-status').innerText(),/1.*C/);
  await tool.locator('[name=pedal]').fill('C3');assert.equal(await tool.locator('.is-active').count(),0);
  await tool.locator('button.mh-chord').nth(1).click();assert.ok((await tool.locator('.mh-status').innerText()).includes('D/C'));
  await page.setViewportSize({width:320,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  const box=await tool.locator('button.mh-chord').nth(1).boundingBox();assert.ok(box.width>100&&box.x+box.width<=321);
  await tool.locator('.mh-chords').screenshot({path:'.chord-audition-'+lang+'.png'});
  // Use the public mount API with a recorder to verify actual pitches and queue cancellation.
  await page.evaluate(async()=>{
   const {mountModernHarmony}=await import('./modern_harmony_tools_ui.js?v=20261008-chord-audition1');
   window.__chordCalls=[];window.__stops=0;window.__experiments=[];
   mountModernHarmony(document.querySelector('#panel-nonfunctional'),{topic:'nonfunctional',playChord:(notes)=>window.__chordCalls.push(notes),stopAudio:()=>window.__stops++,onExperiment:state=>window.__experiments.push(state)});
  });
  await tool.locator('[name=mode]').selectOption('manual');await tool.locator('[name=chords]').fill('E3 G3 C4 | D4 F#4 A4');await tool.locator('[name=pedal]').fill('C3');
  await tool.locator('button.mh-chord').nth(1).click();
  let calls=await page.evaluate(()=>window.__chordCalls);assert.equal(calls.length,1);
  const expected=[48,62,66,69].map(n=>440*2**((n-69)/12));calls[0].forEach((f,i)=>assert.ok(Math.abs(f-expected[i])<1e-8));
  await tool.locator('button.mh-chord').nth(0).focus();await tool.locator('button.mh-chord').nth(0).press('Enter');
  assert.equal(await page.evaluate(()=>window.__stops),1);assert.equal(await page.evaluate(()=>window.__experiments.length),2);
  await tool.locator('[name=chords]').fill('C4 Eb4 G4 | D4 F4 A4');assert.equal(await tool.locator('.is-active').count(),0);
  await page.waitForTimeout(1800);assert.equal(await page.evaluate(()=>window.__chordCalls.length),2,'previous playback cannot launch another chord');
  assert.deepEqual(errors,[]);await context.close();
 }}finally{await browser.close();}
});
