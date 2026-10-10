const { chromium } = require('D:/Tools/Voicevox0.25.0/VOICEVOX/node_modules/.pnpm/playwright-core@1.56.1/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async()=>{
 const browser = await chromium.launch({executablePath:'C:/Users/Bing/AppData/Local/ms-playwright/chromium-1194/chrome-win/chrome.exe',headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1024},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{const Original=window.AudioContext;window.__tones=0;window.AudioContext=class extends Original{createOscillator(){window.__tones++;return super.createOscillator();}};});
 await page.goto('http://127.0.0.1:8765/char/jcboss-lab.html');
 await page.locator('#character').evaluate(img=>img.decode());
 await page.screenshot({path:'jcboss-preview-entry.png',fullPage:true});
 await page.locator('#start').click();
 await page.screenshot({path:'jcboss-preview-jaz.png',fullPage:true});
 // Delete and recover a core voice. This must actually count a counterattack.
 await page.locator('[data-core="0"]').click({force:true});
 assert.match(await page.locator('#dialogue').innerText(),/骨头/);
 assert.equal(await page.locator('[data-core="0"]').innerText(),'+\n3rd');
 await page.locator('[data-core="0"]').click({force:true});
 for(let round=0;round<6;round++){
  while(await page.locator('[data-extra]').count())await page.locator('[data-extra]').first().click({force:true});
  for(const note of await page.locator('[data-core].pending').all())await note.click({force:true});
  assert.match(await page.locator('#evidence-count').innerText(),new RegExp('0'+(round+1)+' / 06'));
  if(round===3)await page.screenshot({path:'jcboss-preview-phase2.png',fullPage:true});
  await page.locator('#continue').click();
 }
 await page.locator('#result').waitFor({state:'visible'});
 assert.equal(await page.locator('#conviction-value').innerText(),'0%');
 assert.equal(await page.locator('#stars').innerText(),'✦ ✦ ·');
 await page.screenshot({path:'jcboss-preview-ending.png',fullPage:true});
 console.log('PASS JAZ: core deletion/recovery, six rounds, phase 2, finisher, two-star ending');
 await page.locator('[data-select="mimi"]').click();await page.locator('#start').click();
 await page.locator('#focus').dispatchEvent('pointerdown',{pointerId:1});
 await page.locator('#focus').dispatchEvent('pointerup',{pointerId:1});
 for(let round=0;round<6;round++){
  const mismatches=await page.evaluate(()=>[...document.querySelectorAll('[data-note]')].map(b=>{const i=+b.dataset.note;const t=document.querySelectorAll('.staff-note.target')[i];const getY=el=>parseFloat(el.style.top.match(/[\d.]+/)[0]);return {i,dy:(getY(t)-getY(b))*document.querySelector('#arena').clientHeight/100};}).filter(x=>Math.abs(x.dy)>1));
  for(const {i,dy} of mismatches){const b=await page.locator('[data-note="'+i+'"]').boundingBox();await page.mouse.move(b.x+18,b.y+43);await page.mouse.down();await page.mouse.move(b.x+18,b.y+43+dy,{steps:5});await page.mouse.up();}
  const handles=await page.locator('.staff-note.short [data-duration]').all();
  for(const handle of handles){const b=await handle.boundingBox();await page.mouse.move(b.x+7,b.y+7);await page.mouse.down();await page.mouse.move(b.x+37,b.y+7,{steps:5});await page.mouse.up();}
  assert.match(await page.locator('#evidence-count').innerText(),new RegExp('0'+(round+1)+' / 06'));
  if(round===3)await page.screenshot({path:'jcboss-preview-mimi.png',fullPage:true});
  await page.locator('#continue').click();
 }
 await page.locator('#result').waitFor({state:'visible'});assert.equal(await page.locator('#stars').innerText(),'✦ ✦ ✦');
 console.log('PASS MIMI: direct pitch dragging, duration handles, six rounds, finisher, three-star ending');
 await page.locator('[data-select="zero"]').click();await page.locator('#start').click();
 await page.locator('#parry').click();assert.match(await page.locator('#dialogue').innerText(),/没有锁合/);
 const challenges=[{t:3},{i:true},{r:true},{t:5,i:true},{t:2,r:true},{t:7,i:true,r:true}];
 for(let round=0;round<6;round++){
  const c=challenges[round];if(c.i)await page.locator('#inversion').click();if(c.r)await page.locator('#retrograde').click();
  if(c.t)await page.locator('#transpose').evaluate((el,t)=>{el.value=t;el.dispatchEvent(new Event('input',{bubbles:true}));},c.t);
  if(round===4)await page.screenshot({path:'jcboss-preview-zero.png',fullPage:true});
  await page.locator('#parry').click();assert.match(await page.locator('#evidence-count').innerText(),new RegExp('0'+(round+1)+' / 06'));await page.locator('#continue').click();
 }
 await page.locator('#result').waitFor({state:'visible'});console.log('PASS ZERO: failed parry, I/R/T combination, six rounds, phase 2, finisher');
 assert((await page.evaluate(()=>window.__tones))>100);console.log('PASS Audio: oscillators created across all three music systems');
 await page.locator('#again').click();await page.locator('#play').click();assert.match(await page.locator('#transport-label').innerText(),/暂停/);await page.locator('#play').click();
 await page.locator('#help').click();assert.equal(await page.locator('#guide').evaluate(d=>d.open),true);await page.locator('#close-help-bottom').click();
 await page.setViewportSize({width:390,height:844});
 for(const boss of ['jaz','mimi','zero']){
  await page.locator('[data-select="'+boss+'"]').click();await page.locator('#start').click();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,boss+' mobile overflow');
  await page.locator('#character').evaluate(img=>img.decode());
  await page.screenshot({path:'jcboss-preview-mobile-'+boss+'.png',fullPage:true});
 }
 console.log('PASS Mobile: all three layouts at 390px; no horizontal overflow');
 assert.deepEqual(errors,[]);console.log('PASS no browser runtime errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
