import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),pw=process.env.JAZZ_COMPASS_PLAYWRIGHT,chrome=process.env.JAZZ_COMPASS_BROWSER;
const base=process.env.JAZZ_COMPASS_URL||'http://127.0.0.1:5501/';
test('analysis label menus are styled and aligned in light/dark, work at 320px, support keyboard and preserve drafts',{skip:!pw||!chrome,timeout:60000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try{for(const lang of ['zh','ja','en']){
  const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(lang=>{localStorage.setItem('jc-lang',lang);localStorage.setItem('jc-learn-debug','1');},lang);
  await page.goto(base+'#learn');await page.waitForFunction(()=>typeof document.querySelector('#panel-learn-body')?.openUnit==='function');
  await page.evaluate(async()=>{
   const {levelById}=await import('./sideb_content.js?v=20261008-b-workshop1');
   const {createBSession,saveBResume}=await import('./sideb_engine.js?v=20261008-modern-tools1');
   const level=levelById('B6-6'),session=createBSession(level,{startSection:1});session.node=1;
   saveBResume({levelId:level.id,session});document.querySelector('#panel-learn-body').openUnit('b:'+level.id);
  });
  const root=page.locator('#panel-learn-body'),picker=root.locator('.sideb-label-picker').first(),trigger=picker.locator('.sideb-label-trigger'),menu=picker.locator('[role=listbox]');await trigger.waitFor();
  assert.equal(await root.locator('.sideb-analysis-row select').count(),0);
  await trigger.focus();await page.keyboard.press('ArrowDown');assert.equal(await trigger.getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await trigger.getAttribute('aria-expanded'),'false');assert.equal(await trigger.evaluate(n=>n===document.activeElement),true);
  await page.keyboard.press('ArrowDown');await page.keyboard.press('End');await page.keyboard.press('Enter');
  assert.equal(await picker.locator('[data-value=lost]').getAttribute('aria-selected'),'true');
  await trigger.press('ArrowDown');await page.keyboard.press('Home');await page.keyboard.press('Space');
  assert.equal(await picker.locator('[data-value=kept]').getAttribute('aria-selected'),'true');
  await trigger.press('ArrowDown');await page.keyboard.press('Tab');assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  await trigger.click();await root.locator('.sideb-node > p').first().click();assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  for(const [width,theme]of [[1280,'light'],[390,'light'],[320,'dark']]){
   await page.setViewportSize({width,height:900});await page.evaluate(theme=>document.documentElement.setAttribute('data-theme',theme),theme);
   await trigger.scrollIntoViewIfNeeded();await trigger.click();await menu.waitFor();
   const a=await trigger.boundingBox(),b=await menu.boundingBox();assert.ok(Math.abs(a.x-b.x)<1&&Math.abs(a.width-b.width)<1,lang+' aligned');
   assert.ok(b.x>=0&&b.x+b.width<=width+1&&b.y>=0&&b.y+b.height<=900+1,lang+' menu fits');
   const style=await menu.evaluate(n=>({bg:getComputedStyle(n).backgroundColor,radius:parseFloat(getComputedStyle(n).borderRadius),paper:getComputedStyle(n).getPropertyValue('--paper').trim()}));
   assert.ok(style.radius>=10&&style.bg!=='rgba(0, 0, 0, 0)');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await page.screenshot({path:'.sideb-label-'+lang+'-'+theme+'-'+width+'.png'});await page.keyboard.press('Escape');
  }
  await root.evaluate(host=>host.openUnit('b:B6-6'));await trigger.waitFor();assert.equal(await picker.locator('[data-value=kept]').getAttribute('aria-selected'),'true','draft restored');
  const second=root.locator('.sideb-label-picker').nth(1);await second.locator('.sideb-label-trigger').click();await second.locator('[data-value=kept]').click();
  await root.locator('.sideb-footer button.primary').click();await root.locator('.sideb-feedback.is-ok').waitFor();
  assert.equal(await root.locator('.sideb-label-trigger:disabled').count(),2);assert.deepEqual(errors,[]);await context.close();
 }}finally{await browser.close();}
});
