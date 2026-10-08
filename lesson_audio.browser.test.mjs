import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),pw=process.env.JAZZ_COMPASS_PLAYWRIGHT,chrome=process.env.JAZZ_COMPASS_BROWSER;
const base=process.env.JAZZ_COMPASS_URL||'http://127.0.0.1:5501/';
test('partly loaded piano chords sound every note immediately and never introduce late voices after samples finish',{skip:!pw||!chrome,timeout:45000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});let release;
 const hold=new Promise(resolve=>release=resolve);
 try{
  const context=await browser.newContext(),page=await context.newPage();page.setDefaultTimeout(10000);
  await page.route('**/resources/piano/*.mp3',async route=>{if(!route.request().url().endsWith('/Fs3.mp3'))await hold;await route.continue().catch(()=>{});});
  await page.addInitScript(()=>{
   window.__osc=[];window.__samples=[];window.__decoded=0;
   const planned=new WeakMap(),setValue=AudioParam.prototype.setValueAtTime;AudioParam.prototype.setValueAtTime=function(value,...args){planned.set(this,value);return setValue.call(this,value,...args);};
   const osc=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){window.__osc.push(planned.get(this.frequency)??this.frequency.value);return osc.apply(this,args);};
   const sample=AudioBufferSourceNode.prototype.start;AudioBufferSourceNode.prototype.start=function(...args){if(this.buffer?.duration>.1)window.__samples.push(planned.get(this.playbackRate)??this.playbackRate.value);return sample.apply(this,args);};
   const decode=AudioContext.prototype.decodeAudioData;AudioContext.prototype.decodeAudioData=function(...args){const result=decode.apply(this,args);result?.then(()=>window.__decoded++).catch(()=>{});return result;};
  });
  await page.goto(base+'#learn');
  await page.evaluate(async()=>{window.__engine=await import('./audio_engine.js?v=20261009-audio1');window.__engine.getAudioContext();});
  await page.waitForFunction(()=>window.__decoded>0);
  await page.evaluate(()=>{window.__osc=[];window.__samples=[];window.__engine.playChord([53,57,60].map(n=>440*2**((n-69)/12)),1.6);});
  const played=await page.evaluate(()=>({osc:window.__osc,samples:window.__samples}));
  assert.equal(played.samples.length,1,'the cached F3 note uses its nearest sample');
  for(const n of [57,60])assert.ok(played.osc.some(f=>Math.abs(f-440*2**((n-69)/12))<.05),'missing uncached pitch '+n+' '+JSON.stringify(played));
  await page.evaluate(()=>{window.__held=window.__engine.createHeldPianoVoice(440*2**((64-69)/12));});
  const withHeld=await page.evaluate(()=>({osc:window.__osc,samples:window.__samples}));
  assert.ok(withHeld.osc.some(f=>Math.abs(f-440*2**((64-69)/12))<.05),'an uncached held note also starts immediately');
  await page.evaluate(()=>window.__held.stop());
  await page.waitForTimeout(1100);release();await page.waitForFunction(()=>window.__decoded>=3);await page.waitForTimeout(100);
  assert.deepEqual(await page.evaluate(()=>({osc:window.__osc,samples:window.__samples})),withHeld,'finishing sample loads must not replay cold notes');
  await context.close();
 }finally{release?.();await browser.close();}
});
test('A-side planing audition plays the three source pitches then the original chord in every language',{skip:!pw||!chrome,timeout:45000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try{for(const lang of ['zh','ja','en']){
  const context=await browser.newContext(),page=await context.newPage();page.setDefaultTimeout(10000);
  await page.addInitScript(lang=>{localStorage.setItem('jc-lang',lang);localStorage.setItem('jc-learn-debug','1');},lang);
  await page.goto(base+'#learn');
  await page.evaluate(async()=>{
   const {mountLearn}=await import('./learn_ui.js?v=20261009-audio1');
   window.__calls=[];const target=document.createElement('div');target.id='lesson-playback-test';document.body.append(target);
   mountLearn(target,{playChord:(freqs,duration,options)=>window.__calls.push({notes:freqs.map(f=>Math.round(69+12*Math.log2(f/440))),duration,options})});target.openUnit('nonfunctional');
  });
  const root=page.locator('#lesson-playback-test');
  for(let i=0;i<12;i++){if(await root.evaluate(n=>n.currentCard()?.audio))break;await root.locator('.learn-debug-bar .learn-debug-btn').first().click();}
  const card=await root.evaluate(n=>n.currentCard());assert.equal(card.audio.notes.length,3);assert.deepEqual(card.audio.chord,card.audio.notes);
  const prompt=typeof card.prompt==='string'?card.prompt:card.prompt[lang];
  const pitches=prompt.match(/[A-G][♯♭#b]?\d/g);assert.equal(pitches.length,3);assert.ok(card.audio.label[lang]);
  await root.locator('.learn-speaker').evaluate(button=>{window.__calls=[];button.click();});
  await page.waitForFunction(()=>window.__calls.length===4);
  assert.deepEqual(await page.evaluate(()=>window.__calls.map(c=>c.notes)),[...card.audio.notes.map(n=>[n]),card.audio.notes]);
  await context.close();
 }}finally{await browser.close();}
});
