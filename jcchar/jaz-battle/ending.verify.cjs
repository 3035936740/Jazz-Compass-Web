const {chromium}=require('D:/Tools/Voicevox0.25.0/VOICEVOX/node_modules/.pnpm/playwright-core@1.56.1/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Users/Bing/AppData/Local/ms-playwright/chromium-1194/chrome-win/chrome.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1100}});
 await page.addInitScript(()=>localStorage.setItem('jc-lang','zh'));
 await page.goto('http://127.0.0.1:8765/char/jcboss.html?revision=jrpg3');await page.locator('#start').click();
 async function arrange(bass,notes){await page.locator('[data-command="arrange"]').click();while(await page.locator('select[data-part="draft"]:not([data-index="bass"])').count()<notes.length)await page.locator('[data-add="draft"]').click();while(await page.locator('select[data-part="draft"]:not([data-index="bass"])').count()>notes.length)await page.locator('button[data-part="draft"][data-remove]').last().click();await page.locator('select[data-part="draft"][data-index="bass"]').selectOption(String(bass));for(let i=0;i<notes.length;i++)await page.locator('select[data-part="draft"][data-index="'+i+'"]').selectOption(String(notes[i]));}
 async function resolve(){await page.locator('#commit').click();await page.locator('#continue').waitFor({state:'visible'});await page.locator('#continue').click();}
 await arrange(48,[59,64]);await resolve();await arrange(43,[59,65,68]);await resolve();await arrange(48,[59,64,66,74]);await resolve();
 const paths=[[65,72],[65,71],[64,71]];for(let c=0;c<3;c++)for(let r=0;r<2;r++)await page.locator('select[data-guard-col="'+c+'"][data-guard-row="'+r+'"]').selectOption(String(paths[c][r]));await resolve();await page.locator('[data-command="hold"]').click();await resolve();await arrange(48,[59,64,66,69,74]);await resolve();
 assert.equal(await page.locator('.end-view .stars').innerText(),'✦ ✦ ✦');assert.equal(await page.locator('#hp-number').innerText(),'100 / 100');
 await page.waitForFunction(()=>document.querySelector('#jaz-sprite').src.includes('three_star'));
 assert.equal(await page.locator('#jaz-motion').evaluate(el=>getComputedStyle(el).animationName),'none');
 await page.screenshot({path:'jaz-battle/preview-three-star.png',fullPage:true});console.log('PASS perfect dense final voicing: three stars, 100 HP, standing three-star sprite, no idle animation');
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
