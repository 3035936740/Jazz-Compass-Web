import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),pw=process.env.JAZZ_COMPASS_PLAYWRIGHT,chrome=process.env.JAZZ_COMPASS_BROWSER;
const base=process.env.JAZZ_COMPASS_URL||'http://127.0.0.1:5501/';
test('Side-B debug reset clears regular, extension and exam progress plus auxiliary records, preserves Side-A, and respects cancellation',{skip:!pw||!chrome,timeout:60000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 const regular=['b:B1-1','b:B6-6','b:B6-10'],extensions=['bx:B1-1','bx:B6-6','bx:B6-10'],exams=['b:T-basics','b:TX-modern','b:FIN','b:FINX'];
 const keys=[...regular,...extensions,...exams],aux=['jc-sideb-labs','jc-sideb-skills','jc-sideb-breakthroughs','jc-sideb-resume'];
 try{for(const lang of ['zh','ja','en']){
  const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'}),page=await context.newPage();page.setDefaultTimeout(10000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const progress={units:{keys:{stars:2,done:true},'keys:1':{stars:3,done:true},'final-ex':{stars:3,done:true}},xp:200,streak:3,lastDay:'2026-10-08',unlockAll:false};
  for(const key of keys)progress.units[key]={best:1,done:true,grade:'A+',seen:['discover','explain','experiment']};
  await page.addInitScript(({lang,progress,aux})=>{
   localStorage.setItem('jc-lang',lang);localStorage.setItem('jc-learn-debug','1');localStorage.setItem('jc-learn-side',JSON.stringify('b'));
   localStorage.setItem('jc-learn-progress',JSON.stringify(progress));
   for(const key of aux)localStorage.setItem(key,JSON.stringify(key.endsWith('resume')?{levelId:'B6-10x',session:{levelId:'B6-10x',section:1,node:0}}:{sentinel:'extension-record'}));
   localStorage.setItem('jc-learn-review',JSON.stringify([{key:'keys',sentinel:'Side-A review'}]));
  },{lang,progress,aux});
  await page.goto(base+'#learn');const clear=page.locator('.sideb-debug').getByRole('button',{name:{zh:'清空 Side-B 记录',ja:'Side-B の記録を消去',en:'Erase Side-B records'}[lang],exact:true});await clear.waitFor();
  const snapshot=()=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith('jc-learn-')||k.startsWith('jc-sideb-')).map(k=>[k,localStorage.getItem(k)])));
  const before=await snapshot();page.once('dialog',dialog=>dialog.dismiss());await clear.click();assert.deepEqual(await snapshot(),before,'cancel preserves everything');
  page.once('dialog',dialog=>dialog.accept());await clear.click();
  const after=await snapshot(),remaining=JSON.parse(after['jc-learn-progress']);
  assert.deepEqual(remaining,{...progress,units:Object.fromEntries(Object.entries(progress.units).filter(([key])=>!keys.includes(key)))});
  for(const key of aux)assert.equal(after[key],undefined,key+' removed');
  assert.equal(after['jc-learn-review'],before['jc-learn-review']);
  assert.equal(await page.locator('.sideb-track.is-done, .sideb-tag.is-ext, .sideb-ribbon').count(),0,'map completion marks removed');
  assert.deepEqual(errors,[]);await context.close();
 }}finally{await browser.close();}
});
