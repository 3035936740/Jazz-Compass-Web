const { chromium }=require('D:/Tools/Voicevox0.25.0/VOICEVOX/node_modules/.pnpm/playwright-core@1.56.1/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Users/Bing/AppData/Local/ms-playwright/chromium-1194/chrome-win/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1080},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{const A=window.AudioContext;window.audioNodes=0;window.AudioContext=class extends A{createOscillator(){window.audioNodes++;return super.createOscillator();}};});
 const snap=()=>page.evaluate(()=>window.JCBossRPG.snapshot());
 const until=async test=>{for(let i=0;i<240;i++){const s=await snap();if(test(s))return s;await page.waitForTimeout(80);}throw new Error('Timed out: '+JSON.stringify(await snap()));};
 const clickWorld=async(x,y)=>{const s=await snap(),box=await page.locator('#battle').boundingBox();await page.mouse.click(box.x+x/s.width*box.width,box.y+y/s.height*box.height);};
 async function select(n){await page.keyboard.press('Digit'+(n+1));assert.equal((await snap()).tool,n);}
 async function hitTarget(find){let s=await snap();const t=s.targets.find(find);assert(t);await clickWorld(t.x,t.y);await page.waitForTimeout(450);}
 await page.goto('http://127.0.0.1:8765/char/jcboss.html?revision=rpg2');await page.locator('#sprite').evaluate(img=>img.decode());await page.screenshot({path:'jcboss-rpg-preview-intro.png',fullPage:true});
 await page.locator('#start').click();await until(s=>s.mode==='combat');
 const old=await snap();await page.keyboard.down('KeyA');await page.waitForTimeout(250);await page.keyboard.up('KeyA');const moved=await snap();assert(moved.player.x<old.player.x-35);await page.waitForTimeout(1050);assert((await snap()).bulletCount>0);
 await page.screenshot({path:'jcboss-rpg-preview-combat.png',fullPage:true});
 await page.keyboard.press('KeyP');const paused=await snap();await page.waitForTimeout(300);const paused2=await snap();assert.equal(paused2.skillTime,paused.skillTime);assert.equal(paused2.bulletCount,paused.bulletCount);await page.locator('#resume').click();
 await hitTarget(t=>!t.core);assert((await snap()).wrong>=1);assert.equal((await snap()).bossHp,420);
 for(let attempts=0;attempts<10;attempts++){
  const s=await until(s=>s.mode==='combat'||s.mode==='victory'||s.mode==='defeat');if(s.mode==='victory')break;assert.notEqual(s.mode,'defeat');
  const initialWins=s.wins;
  if(s.skillId===0){await select(0);await hitTarget(t=>t.core&&!t.collected);await hitTarget(t=>t.core&&!t.collected);}
  else if(s.skillId===1){await select(2);await hitTarget(t=>t.editable);}
  else if(s.skillId===2){await select(1);
   for(let j=0;j<45;j++){let s2=await snap();if(s2.mode!=='combat')break;const bullets=s2.bullets.filter(b=>!b.core&&b.x>s2.width*.28&&b.x<s2.width*.72);if(bullets.length>1){await page.keyboard.press('Tab');await page.keyboard.press('Space');}await page.waitForTimeout(450);}
  }else{await select(3);await until(s=>s.strongBeat);await hitTarget(t=>t.correct);}
  await page.waitForTimeout(160);const after=await snap();assert(after.wins>initialWins,'No skill success: '+JSON.stringify(after));
  if(after.phase===2&&after.mode==='transition')await page.screenshot({path:'jcboss-rpg-preview-break.png',fullPage:true});
  console.log('PASS skill',s.skillId,'round',s.round,'HP',after.bossHp,'player',after.hp,'bullets',after.bulletCount);
 }
 assert.equal((await snap()).mode,'victory');assert.equal((await snap()).bossHp,0);await page.locator('#result').waitFor({state:'visible'});await page.screenshot({path:'jcboss-rpg-preview-victory.png',fullPage:true});
 console.log('PASS full encounter: continuous skills, four tools, phase two, hitstop and automatic victory');
 assert((await page.evaluate(()=>window.audioNodes))>30);assert.deepEqual(errors,[]);
 // Damage and defeat must be real, not decorative HUD values.
 await page.locator('#retry').click();await until(s=>s.mode==='combat');
 for(let i=0;i<45;i++){const s=await snap();if(s.mode==='defeat')break;const b=s.bullets.find(b=>b.y>40&&b.y<s.height-30&&b.x>25&&b.x<s.width-25);if(b){await page.locator('#battle').dispatchEvent('pointerdown',{pointerType:'touch',clientX:(await page.locator('#battle').boundingBox()).x+s.player.x/s.width*(await page.locator('#battle').boundingBox()).width,clientY:(await page.locator('#battle').boundingBox()).y+s.player.y/s.height*(await page.locator('#battle').boundingBox()).height,pointerId:2});const box=await page.locator('#battle').boundingBox();await page.locator('#battle').dispatchEvent('pointermove',{pointerType:'touch',pointerId:2,clientX:box.x+b.x/s.width*box.width,clientY:box.y+b.y/s.height*box.height});await page.locator('#battle').dispatchEvent('pointerup',{pointerType:'touch',pointerId:2});}await page.waitForTimeout(1000);}
 const damaged=await snap();assert(damaged.hits>0);console.log('PASS live collision damage:',damaged.hits,'hits, HP',damaged.hp);
 await page.setViewportSize({width:390,height:844});await page.locator('#restart').click();await until(s=>s.mode==='combat');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'jcboss-rpg-preview-mobile.png',fullPage:true});
 const startMobile=await snap();await page.locator('[data-move="right"]').dispatchEvent('pointerdown',{pointerId:1});await page.waitForTimeout(200);await page.locator('[data-move="right"]').dispatchEvent('pointerup',{pointerId:1});assert((await snap()).player.x>startMobile.player.x);
 await page.locator('[data-tool="2"]').click();assert.equal((await snap()).tool,2);console.log('PASS mobile layout, movement and tool selection');
 assert.deepEqual(errors,[]);console.log('PASS no browser errors');await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
