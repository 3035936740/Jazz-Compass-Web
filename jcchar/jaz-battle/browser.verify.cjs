const {chromium}=require('D:/Tools/Voicevox0.25.0/VOICEVOX/node_modules/.pnpm/playwright-core@1.56.1/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Users/Bing/AppData/Local/ms-playwright/chromium-1194/chrome-win/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
 const errors=[],failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.addInitScript(()=>{localStorage.setItem('jc-lang','zh');});
 await page.goto('http://127.0.0.1:8765/char/jcboss.html?revision=jrpg3');
 await page.locator('#intro').waitFor({state:'visible'});await page.screenshot({path:'jaz-battle/preview-intro.png',fullPage:true});
 await page.locator('#start').click();
 async function arrange(bass,notes,part='draft'){
  if(part==='draft')await page.locator('[data-command="arrange"]').click();
  while(await page.locator('select[data-part="'+part+'"][data-index]:not([data-index="bass"])').count()<notes.length)await page.locator('[data-add="'+part+'"]').click();
  while(await page.locator('select[data-part="'+part+'"][data-index]:not([data-index="bass"])').count()>notes.length)await page.locator('button[data-part="'+part+'"][data-remove]').last().click();
  await page.locator('select[data-part="'+part+'"][data-index="bass"]').selectOption(String(bass));
  for(let i=0;i<notes.length;i++)await page.locator('select[data-part="'+part+'"][data-index="'+i+'"]').selectOption(String(notes[i]));
 }
 async function commit(){await page.locator('#commit').click();await page.locator('#continue').waitFor({state:'visible'});}
 await arrange(48,[55,59,64]);
 await page.screenshot({path:'jaz-battle/preview-arrange.png',fullPage:true});
 await page.locator('#preview').click();assert.equal(await page.locator('#preview').isDisabled(),true);
 await page.locator('[data-command="analyze"]').click();await page.locator('[data-command="arrange"]').click();assert.equal(await page.locator('#preview').isDisabled(),true);
 await commit();assert.match(await page.locator('#result-panel').innerText(),/MUSIC VALID/);assert.match(await page.locator('#result-panel').innerText(),/JAZ PREDICTION SUCCESS/);assert.equal(await page.locator('#hp-number').innerText(),'100 / 100');assert.equal(await page.locator('#charge-number').innerText(),'2 / 3');assert.equal(await page.locator('#conviction-number').innerText(),'100%');
 await page.screenshot({path:'jaz-battle/preview-valid-predicted.png',fullPage:true});console.log('PASS exact demonstration: ordinary Cmaj7 valid, predicted, charge 1→2, no HP loss');
 await page.locator('#continue').click();await arrange(43,[59,65]);await commit();assert.match(await page.locator('#result-panel').innerText(),/TARGET COLOR NOT ACHIEVED/);assert.equal(await page.locator('#hp-number').innerText(),'75 / 100');await page.locator('#continue').click();assert.equal(await page.locator('#turn-label').innerText(),'回合 2 / 4');
 await arrange(43,[59,65,68]);await commit();await page.locator('#continue').click();
 await arrange(48,[59,64,66,74]);await page.screenshot({path:'jaz-battle/preview-purposeful-complexity.png',fullPage:true});await commit();await page.locator('#continue').click();assert.match(await page.locator('#turn-label').innerText(),/DEFENSE/);
 await page.locator('[data-command="analyze"]').click();await page.screenshot({path:'jaz-battle/preview-cannon-analysis.png',fullPage:true});await page.locator('[data-command="guard"]').click();
 const paths=[[65,72],[65,71],[64,71]];for(let c=0;c<3;c++)for(let r=0;r<2;r++)await page.locator('select[data-guard-col="'+c+'"][data-guard-row="'+r+'"]').selectOption(String(paths[c][r]));
 await page.screenshot({path:'jaz-battle/preview-guard.png',fullPage:true});await page.locator('#commit').click();await page.waitForTimeout(180);await page.screenshot({path:'jaz-battle/preview-cannon-impact.png',fullPage:true});await page.locator('#continue').waitFor({state:'visible'});assert.match(await page.locator('#result-panel').innerText(),/GUIDE TONE GUARD/);await page.locator('#continue').click();
 await page.locator('[data-command="hold"]').click();await commit();assert.match(await page.locator('#result-panel').innerText(),/MUSIC VALID/);await page.locator('#continue').click();assert.match(await page.locator('#turn-label').innerText(),/FINAL/);
 await arrange(48,[59,64,66,69]);await page.screenshot({path:'jaz-battle/preview-finale.png',fullPage:true});await commit();await page.locator('#continue').click();assert.match(await page.locator('#result-panel').innerText(),/EVERY NOTE NEEDS A REASON/);assert.equal(await page.locator('#conviction-number').innerText(),'0%');await page.screenshot({path:'jaz-battle/preview-victory.png',fullPage:true});
 console.log('PASS full slice: theory failure HP, complex colour, cannon guard, HOLD, final free voicing, victory');
 await page.locator('#restart').click();await page.locator('#start').click();await arrange(48,[59,64]);await commit();assert.equal(await page.locator('#conviction-number').innerText(),'90%');assert.equal(await page.locator('#charge-number').innerText(),'2 / 3');assert.equal(await page.locator('#hp-number').innerText(),'100 / 100');console.log('PASS tonic shell: both cannon charge and conviction damage');
 await page.locator('#restart').click();await page.locator('#start').click();await arrange(43,[59,65]);await page.locator('#toggle-continuation').click();await arrange(48,[59,64],'continuation');await commit();assert.match(await page.locator('#result-panel').innerText(),/JAZ PREDICTION FAILED/);assert.equal(await page.locator('#charge-number').innerText(),'1 / 3');console.log('PASS delayed resolution: valid musical direction evades prediction');
 await page.locator('#language').selectOption('en');assert.equal(await page.locator('#scenario-title').innerText(),'Cadence: habit or choice?');await page.locator('#language').selectOption('ja');assert.equal(await page.locator('#scenario-title').innerText(),'終止は習慣、それとも選択？');await page.locator('#language').selectOption('zh');console.log('PASS zh/en/ja localization without changing battle state');
 await page.locator('#restart').click();await page.locator('#start').click();await page.setViewportSize({width:390,height:844});
 for(const command of ['analyze','arrange','guard','hold']){await page.locator('[data-command="'+command+'"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,command+' overflow');await page.screenshot({path:'jaz-battle/preview-mobile-'+command+'.png',fullPage:true});}
 console.log('PASS mobile command/editor layouts at 390px');
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);console.log('PASS no runtime errors or missing local resources (including shared audio samples)');await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
