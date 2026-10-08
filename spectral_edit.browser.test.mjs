import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),pw=process.env.JAZZ_COMPASS_PLAYWRIGHT,chrome=process.env.JAZZ_COMPASS_BROWSER;
const base=process.env.JAZZ_COMPASS_URL||'http://127.0.0.1:5501/';
test('spectrum adds through plot and exact-ratio controls, keeps audition separate, and persists valid settings in three languages', {skip:!pw||!chrome,timeout:90000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try{for(const lang of ['zh','ja','en']){
  const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(10000);
  await page.addInitScript(lang=>{localStorage.setItem('jc-lang',lang);window.__tones=[];const start=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){if(this.type==='sine')window.__tones.push(this.frequency.value);return start.apply(this,args);};},lang);
  await page.goto(base+'#spectralharmony');const tool=page.locator('#panel-spectralharmony .mh-tool');
  await tool.locator('[name=fundamental]').fill('100');await tool.locator('[name=partials]').fill('1:1:0 2:0.8:0');
  const clickAt=async(frequency,amplitude,min=90,max=220)=>{
   const pos=await tool.locator('.mh-spectrum svg').evaluate((svg,{frequency,amplitude,min,max})=>{
    const point=new DOMPoint(48+600*Math.log(frequency/min)/Math.log(max/min),210-amplitude*170).matrixTransform(svg.getScreenCTM());return{x:point.x,y:point.y};
   },{frequency,amplitude,min,max});await page.mouse.click(pos.x,pos.y);
  };
  await tool.locator('.mh-spectrum svg').scrollIntoViewIfNeeded();await clickAt(125,.65);
  assert.equal(await tool.locator('.mh-partial-hit').count(),3);
  const clicked=(await tool.locator('[name=partials]').inputValue()).split(' ').at(-1).split(':').map(Number);
  assert.ok(Math.abs(clicked[0]*100-125)<.5,'screen click resolves to the intended frequency within one pixel');assert.ok(Math.abs(clicked[1]-.65)<.01);
  await tool.locator('[name=spectrum-ratio]').fill('3/2');await tool.locator('[name=spectrum-amplitude]').fill('0.6');await tool.locator('[name=spectrum-ratio]').press('Enter');
  assert.equal(await tool.locator('.mh-partial-hit').count(),4);
  assert.match(await tool.locator('.mh-spectrum-feedback').innerText(),/3\/2.*150.000 Hz/);
  await tool.locator('.mh-partial-hit').nth(3).click();assert.equal(await tool.locator('.mh-partial-hit').count(),4);
  assert.deepEqual(await page.evaluate(()=>window.__tones),[150]);
  await tool.locator('.mh-partial-hit').nth(2).focus();await tool.locator('.mh-partial-hit').nth(2).press('Space');
  const tones=await page.evaluate(()=>window.__tones);assert.equal(tones[0],150);assert.ok(Math.abs(tones[1]-clicked[0]*100)<.0001);
  const valid=await tool.locator('[name=partials]').inputValue();
  await tool.locator('[name=spectrum-ratio]').fill('3/0');await tool.locator('.mh-spectrum-editor button').click();
  assert.equal(await tool.locator('[name=partials]').inputValue(),valid);assert.equal(await tool.locator('.mh-actions button:disabled').count(),0);
  assert.ok((await tool.locator('.mh-spectrum-feedback').innerText()).length);
  await page.reload();await tool.locator('.mh-partial-hit').nth(3).waitFor();assert.equal(await tool.locator('[name=partials]').inputValue(),valid);
  for(const width of [390,320]){
   await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await tool.locator('[name=spectrum-ratio]').fill('5/4');await tool.locator('.mh-spectrum-editor button').click();
   if(lang==='zh'&&width===390)await tool.locator('.mh-spectrum').screenshot({path:'.spectral-edit-mobile.png'});
   for(const b of await tool.locator('.mh-spectrum-editor input, .mh-spectrum-editor button').evaluateAll(nodes=>nodes.map(n=>({l:n.getBoundingClientRect().left,r:n.getBoundingClientRect().right}))))assert.ok(b.l>=0&&b.r<=width+1);
  }
  await tool.locator('[name=partials]').fill(Array(16).fill('1:0.5:0').join(' '));assert.equal(await tool.locator('.mh-spectrum-editor button').isDisabled(),true);
  assert.equal(await tool.locator('.mh-partial-hit').count(),16);assert.deepEqual(errors,[]);await context.close();
 }}finally{await browser.close();}
});

test('spectral mouse holds delete without release playback or addition, cancel on movement and repaint, support undo and empty plots, and arp uses every current tone', {skip:!pw||!chrome,timeout:45000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{localStorage.setItem('jc-lang','en');window.__tones=[];const start=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){if(this.type==='sine')window.__tones.push(this.frequency.value);return start.apply(this,args);};});
  await page.goto(base+'#spectralharmony');const tool=page.locator('#panel-spectralharmony .mh-tool');
  await tool.locator('[name=fundamental]').fill('100');await tool.locator('[name=partials]').fill('3:0.4:0 1:1:0 2:0.7:0');await tool.locator('[name=bpm]').fill('240');
  await tool.locator('[name=spectrum-ratio]').fill('3/2');await tool.locator('.mh-spectrum-editor button').click();
  await tool.getByRole('button',{name:'Hear partials separately',exact:true}).click();
  await page.waitForTimeout(1050);assert.deepEqual(await page.evaluate(()=>window.__tones),[100,150,200,300]);
  const start=async(i)=>{const h=tool.locator('.mh-partial-hit').nth(i);await h.scrollIntoViewIfNeeded();const b=await h.boundingBox();const x=b.x+b.width/2,y=b.y+b.height/2;await page.mouse.move(x,y);await page.mouse.down();return{x,y};};
  await start(3);await page.waitForTimeout(700);assert.equal(await tool.locator('.mh-partial-hit').count(),3);await page.mouse.up();await page.waitForTimeout(80);
  assert.equal(await tool.locator('.mh-partial-hit').count(),3);assert.deepEqual(await page.evaluate(()=>window.__tones),[100,150,200,300]);assert.ok(!(await tool.locator('[name=partials]').inputValue()).includes('3/2'));
  await tool.getByRole('button',{name:'Undo removal',exact:true}).click();assert.equal(await tool.locator('.mh-partial-hit').count(),4);
  const pos=await start(0);await page.mouse.move(pos.x,pos.y+20);await page.waitForTimeout(700);await page.mouse.up();assert.equal(await tool.locator('.mh-partial-hit').count(),4);
  await start(0);await tool.locator('[name=partials]').fill('1:1:0 2:0.5:0');await page.waitForTimeout(700);await page.mouse.up();assert.equal(await tool.locator('.mh-partial-hit').count(),2);
  await tool.locator('.mh-partial-hit').first().focus();await tool.locator('.mh-partial-hit').first().press('Delete');assert.equal(await tool.locator('[name=partials]').inputValue(),'2:0.5:0');
  await tool.locator('.mh-partial-hit').first().press('Backspace');assert.equal(await tool.locator('.mh-partial-hit').count(),0);assert.equal(await tool.locator('.mh-actions button:disabled').count(),3);assert.equal(await tool.locator('.mh-error').count(),0);
  await tool.locator('[name=spectrum-ratio]').fill('3/2');await tool.locator('.mh-spectrum-editor button').click();assert.equal(await tool.locator('[name=partials]').inputValue(),'3/2:0.5:0');
  await page.reload();await tool.locator('.mh-partial-hit').waitFor();assert.equal(await tool.locator('[name=partials]').inputValue(),'3/2:0.5:0');assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});

test('real mobile touch holds remove only their stem, a cancelled swipe scrolls without deletion, and short taps still audition', {skip:!pw||!chrome,timeout:30000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{localStorage.setItem('jc-lang','zh');window.__gestureLog=[];for(const type of ['pointerdown','pointermove','pointercancel','scroll','contextmenu'])document.addEventListener(type,e=>window.__gestureLog.push({type,primary:e.isPrimary,button:e.button,time:performance.now(),target:e.target?.getAttribute?.('class')}),true);});await page.goto(base+'#spectralharmony');const tool=page.locator('#panel-spectralharmony .mh-tool');
  await tool.locator('[name=fundamental]').fill('100');await tool.locator('[name=partials]').fill('1:1:0 3/2:0.6:0 2:0.8:0');
  const cdp=await context.newCDPSession(page);
  const pos=async(i)=>{const h=tool.locator('.mh-partial-hit').nth(i);await h.scrollIntoViewIfNeeded();const b=await h.boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2};};
  let point=await pos(1);await page.waitForTimeout(250);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});await page.waitForTimeout(720);assert.equal(await tool.locator('.mh-partial-hit').count(),2,JSON.stringify(await page.evaluate(()=>window.__gestureLog.slice(-12))));
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(120);assert.equal(await tool.locator('.mh-partial-hit').count(),2);assert.equal(await tool.locator('.mh-tool').count(),0);assert.ok(!(await tool.locator('.mh-status').innerText()).includes('正在播放'));
  assert.equal(await tool.locator('[name=partials]').inputValue(),'1:1:0 2:0.8:0');
  await tool.getByRole('button',{name:'撤销删除',exact:true}).click();
  point=await pos(1);await page.waitForTimeout(250);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...point,y:point.y-45}]});await page.waitForTimeout(720);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.equal(await tool.locator('.mh-partial-hit').count(),3);
  await tool.locator('.mh-partial-hit').nth(1).tap();assert.ok((await tool.locator('.mh-status').innerText()).includes('150.000 Hz'));assert.equal(await tool.locator('.mh-partial-hit').count(),3);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.deepEqual(errors,[]);await context.close();
 }finally{await browser.close();}
});
