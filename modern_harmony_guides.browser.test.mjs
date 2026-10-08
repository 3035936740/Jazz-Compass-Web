import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url), pw=process.env.JAZZ_COMPASS_PLAYWRIGHT, chrome=process.env.JAZZ_COMPASS_BROWSER;
const base=process.env.JAZZ_COMPASS_URL||'http://127.0.0.1:5501/';
const topics=['nonfunctional','polytonality','atonality','spectralharmony','microtonalharmony'];
const bIds=['B6-6','B6-7','B6-8','B6-9','B6-10'];
const version='20261008-b-workshop1';
async function open(page,id){await page.locator('#panel-learn-body').evaluate((host,id)=>host.openUnit(id),id);}

test('all new A guides and branches render progressively in three languages, allow replay and previous steps, and retain progress', {skip:!pw||!chrome,timeout:150000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try {
  for(const lang of ['zh','ja','en']) {
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
   page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(lang=>{localStorage.setItem('jc-lang',lang);localStorage.setItem('jc-learn-debug','1');},lang);
   await page.goto(base+'#learn');await page.waitForFunction(()=>typeof document.querySelector('#panel-learn-body')?.openUnit==='function');
   const root=page.locator('#panel-learn-body');
   for(const topic of topics) for(let branch=0;branch<=4;branch++) {
    const key=topic+(branch?':'+branch:'');await open(page,key);await root.locator('.learn-guide-count').waitFor();
    const count=await root.evaluate(host=>host.currentCard().steps.length);
    for(let i=0;i<count;i++) {
     assert.equal(await root.locator('.learn-step:visible').count(),1,lang+'/'+key+'/'+i);
     assert.equal(await root.locator('.learn-visual.lv-modern').count(),1);
     const shown=await root.locator('.lv-modern-scene:visible').count();assert.ok(shown>=1&&shown<=i+1);
     if(lang!=='en')assert.doesNotMatch(await root.locator('.learn-visual').innerText(),/same shape|low:|high:|overlap|pedal|cents|error:/i);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,lang+'/'+key);
     if(i+1<count)await root.locator('.learn-footer button.primary').click();
    }
    await root.locator('.learn-footer button.ghost').click();
    const shownStep=await root.locator('.learn-step:visible').innerText();
    await open(page,key);assert.equal(await root.locator('.learn-step:visible').innerText(),shownStep,'saved current step');
   }
   await open(page,'polytonality');await root.locator('.learn-card > button.ghost').click();
   await page.waitForFunction(()=>document.querySelector('.learn-demo-caption')?.textContent.includes(({zh:'正在播放',ja:'再生中',en:'Playing'})[window.__lang]));
   assert.ok(await root.locator('.lv-mark-text').count());
   await root.locator('.learn-footer button.primary').click();
   await page.waitForFunction(()=>document.querySelector('.learn-demo-caption')?.textContent.includes('F♯'));
   await root.locator('.learn-footer button.primary').click();
   assert.match(await root.locator('.learn-guide-count').innerText(),/3/);
   await root.locator('.learn-visual').scrollIntoViewIfNeeded();await page.screenshot({path:'.modern-guide-'+lang+'.png'});
   assert.deepEqual(errors,[]);await context.close();
  }
 } finally {await browser.close();}
});

test('B guides no longer render blank; every new ordinary and extension guide, experiment and challenge opens',{skip:!pw||!chrome,timeout:150000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try {
  for(const lang of ['zh','ja','en']) {
   const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
   page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(lang=>{localStorage.setItem('jc-lang',lang);localStorage.setItem('jc-learn-debug','1');},lang);
   await page.goto(base+'#learn');await page.waitForFunction(()=>typeof document.querySelector('#panel-learn-body')?.openUnit==='function');
   const root=page.locator('#panel-learn-body');
   const restore=async(id,section,node=0)=>page.evaluate(async({id,section,node,version})=>{
     const {levelById,extLevelById}=await import('./sideb_content.js?v='+version);
     const {createBSession,saveBResume}=await import('./sideb_engine.js?v=20261008-modern-tools1');
     const level=id.endsWith('x')?extLevelById(id):levelById(id),session=createBSession(level,{startSection:section});session.node=node;
     saveBResume({levelId:id,session});document.querySelector('#panel-learn-body').openUnit('b:'+id);
   },{id,section,node,version});
   for(const baseId of bIds) {
    for(const id of [baseId,baseId+'x']) for(const node of id.endsWith('x')?[0,2,4,6]:[0]) {
     await restore(id,1,node);await root.locator('.sideb-demo .sideb-step-count').waitFor();
     const steps=await page.evaluate(async({id,node,version})=>{const m=await import('./sideb_content.js?v='+version);const level=id.endsWith('x')?m.extLevelById(id):m.levelById(id);return level.sections.explain[node].steps.length;},{id,node,version});
     for(let i=0;i<steps;i++) {
      assert.equal(await root.locator('.sideb-demo .learn-visual.lv-modern').count(),1,lang+'/'+id+'/'+node);
      assert.ok((await root.locator('.sideb-demo .sideb-text').innerText()).length>30);
      assert.ok(await root.locator('.learn-demo-caption').count());
      if(i+1<steps)await root.locator('.sideb-footer button.primary').click();
     }
    }
    await restore(baseId,2);const toy=root.locator('.sideb-modern-toy .mh-tool');await toy.locator('.mh-actions button').first().waitFor();
    await root.locator('.mh-mission-board button').click();
    const field=async(name,value)=>{const input=toy.locator('[name='+name+']');await input.fill(value);await input.press('Tab');};
    const play=async(index)=>toy.locator('.mh-actions button').nth(index).click();
    if(baseId==='B6-6'){await play(0);await field('pedal','C3');await play(0);}
    if(baseId==='B6-7'){await play(2);await field('patternB','1:1 3:1 r:1 5:1 1:1');await play(2);}
    if(baseId==='B6-8'){await field('transpose','0');await toy.locator('[name=transform]').selectOption('R');await play(1);await toy.locator('[name=transform]').selectOption('I');await play(1);}
    if(baseId==='B6-9'){await play(0);await field('partials','4:1:0 5:0.8:25 6:0.7:0');await field('morph','100');await play(0);}
    if(baseId==='B6-10'){await field('edo','19');await play(2);await field('rootRatio','5/4');await field('ratiosB','1/1 6/5 8/5');await play(0);}
    assert.equal(await root.locator('.mh-mission-goal.is-complete').count(),2,lang+'/'+baseId);
    await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await root.locator('.mh-mission-board').scrollIntoViewIfNeeded();await page.screenshot({path:'.modern-studio-'+baseId+'-'+lang+'.png'});
    await page.setViewportSize({width:1280,height:900});
    await root.locator('.sideb-footer button.primary').click();
    assert.equal(await root.evaluate(host=>host.sideBSession().section),3);
    assert.ok(await root.locator('.sideb-options button').count());
   }
   await page.setViewportSize({width:390,height:844});await restore('B6-9',1);await root.locator('.lv-modern').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await page.screenshot({path:'.modern-b-guide-'+lang+'.png'});
   assert.deepEqual(errors,[]);await context.close();
  }
 } finally {await browser.close();}
});

test('free editors add, edit, reorder and audition sounds; spectral bars audition exact individual frequencies',{skip:!pw||!chrome,timeout:45000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try {
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(10000);
  await page.addInitScript(()=>{localStorage.setItem('jc-lang','en');window.__heard=[];const start=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){if(this.type==='sine')window.__heard.push(this.frequency.value);return start.apply(this,args);};});
  await page.goto(base+'#nonfunctional');let tool=page.locator('#panel-nonfunctional .mh-tool');await tool.locator('.mh-editor').waitFor();
  await tool.getByRole('button',{name:'Edit the current result freely',exact:true}).click();
  let rows=tool.locator('.mh-editor-row');assert.equal(await rows.count(),4);
  await rows.first().locator('input').fill('E3 G3 C4');await rows.first().locator('input').press('Enter');
  assert.equal(await tool.locator('.mh-chord-name').first().innerText(),'C/E');
  await rows.first().getByRole('button',{name:'Duplicate',exact:true}).click();assert.equal(await rows.count(),5);
  await rows.first().getByRole('button',{name:'Remove',exact:true}).click();assert.equal(await rows.count(),4);
  await tool.getByLabel('Generate notes from a chord symbol, e.g. Dm7 or C/E').fill('Dm7');await tool.getByRole('button',{name:'Add this chord',exact:true}).click();
  assert.equal(await tool.locator('.mh-chord-name').last().innerText(),'Dm7');await rows.last().getByRole('button',{name:'Audition',exact:true}).click();assert.ok(await tool.locator('.mh-chord.is-active').count());
  await page.goto(base+'#polytonality');tool=page.locator('#panel-polytonality .mh-tool');await tool.locator('.mh-editor-row').first().waitFor();
  await tool.locator('.mh-edit-pitch').first().fill('Eb3:3');await tool.locator('.mh-edit-pitch').first().press('Enter');assert.match(await tool.locator('[name=patternA]').inputValue(),/^D#3:3|^Eb3:3/);
  await tool.getByRole('button',{name:'Add · A',exact:true}).click();assert.equal((await tool.locator('[name=patternA]').inputValue()).split(' ').length,5);
  await page.goto(base+'#atonality');tool=page.locator('#panel-atonality .mh-tool');await tool.locator('.mh-edit-pitch').first().waitFor();
  await tool.locator('.mh-edit-pitch').first().fill('F4');await tool.locator('.mh-edit-pitch').first().press('Enter');assert.match(await tool.locator('[name=motif]').inputValue(),/^F4/);
  await tool.getByRole('button',{name:'Add',exact:true}).click();assert.equal(await tool.locator('.mh-editor-row').count(),5);await tool.locator('.mh-editor-row').first().getByRole('button',{name:'Audition',exact:true}).click();
  await page.goto(base+'#spectralharmony');tool=page.locator('#panel-spectralharmony .mh-tool');await tool.locator('[name=partials]').waitFor();
  await tool.locator('[name=fundamental]').fill('100');await tool.locator('[name=partials]').fill('4:1:0 5:0.8:0 7:0.5:0');
  await tool.locator('.mh-partial-hit').nth(1).click();assert.deepEqual(await page.evaluate(()=>window.__heard),[500]);assert.match(await tool.locator('.mh-status').innerText(),/500/);
  await tool.locator('.mh-partial-hit').nth(2).focus();await page.keyboard.press('Enter');assert.deepEqual(await page.evaluate(()=>window.__heard),[500,700]);
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.screenshot({path:'.modern-spectrum-audition.png'});assert.deepEqual(errors,[]);
 } finally {await browser.close();}
});
