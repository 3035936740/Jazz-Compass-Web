import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),pw=process.env.JAZZ_COMPASS_PLAYWRIGHT,chrome=process.env.JAZZ_COMPASS_BROWSER;
const base=process.env.JAZZ_COMPASS_URL||'http://127.0.0.1:5501/';
test('five Side-B studios render and grade their actual listening, spelling, analysis and repair challenges in all languages on mobile',{skip:!pw||!chrome,timeout:150000},async()=>{
 const {chromium}=require(pw),browser=await chromium.launch({headless:true,executablePath:chrome});
 try{for(const lang of ['zh','ja','en']){
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(lang=>{localStorage.setItem('jc-lang',lang);localStorage.setItem('jc-learn-debug','1');},lang);
  await page.goto(base+'#learn');await page.waitForFunction(()=>typeof document.querySelector('#panel-learn-body')?.openUnit==='function');
  const root=page.locator('#panel-learn-body');
  const restore=async(id,section,node)=>page.evaluate(async({id,section,node})=>{
   const {levelById,extLevelById}=await import('./sideb_content.js?v=20261008-b-workshop1');
   const {createBSession,saveBResume,levelForAttempt}=await import('./sideb_engine.js?v=20261008-modern-tools1');
   const level=id.endsWith('x')?extLevelById(id):levelById(id),session=createBSession(level,{startSection:section});session.node=node;
   saveBResume({levelId:id,session});document.querySelector('#panel-learn-body').openUnit('b:'+id);
   return levelForAttempt(level,session.attempt).sections[section===1?'explain':'challenge'][node];
  },{id,section,node});
  for(const id of ['B6-6','B6-7','B6-8','B6-9','B6-10']){
   for(const [level,section,indices]of [[id,1,[1]],[id,3,[0,1,2,3,4,5]],[id+'x',3,[0,1,2,3]]])for(const index of indices){
    const n=await restore(level,section,index);await root.locator('.sideb-node').waitFor();
    assert.ok((await root.locator('.sideb-node').innerText()).length>30,lang+'/'+level+'/'+index);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,lang+'/'+level+'/'+index);
    if(n.type==='analyze'){
     const pickers=root.locator('.sideb-label-picker');assert.equal(await pickers.count(),n.slots.length);
     for(let i=0;i<n.slots.length;i++){
      await pickers.nth(i).locator('.sideb-label-trigger').click();
      await pickers.nth(i).locator('[role=option][data-value="'+[].concat(n.slots[i].answer)[0]+'"]').click();
     }
     await root.locator('.sideb-footer button.primary').click();
    }else if(n.type==='spell'||n.type==='derive'){
     const answers=n.type==='spell'?n.answer:n.steps.map(s=>s.answer),inputs=root.locator('.sideb-node input');
     assert.equal(await inputs.count(),answers.length);
     for(let i=0;i<answers.length;i++)await inputs.nth(i).fill(String([].concat(answers[i])[0]));
     await root.locator('.sideb-footer button.primary').click();
    }else {const answer=n.options[n.answer];await root.locator('.sideb-options').getByRole('button',{name:typeof answer==='string'?answer:answer[lang],exact:true}).click();}
    try{await root.locator('.sideb-feedback.is-ok').waitFor();}catch(error){throw Error(lang+'/'+level+'/'+index+'/'+n.type+' '+JSON.stringify(n)+'\n'+await root.innerText()+'\n'+await root.evaluate(host=>JSON.stringify(host.sideBSession().nodeState)));}
    assert.equal(await root.evaluate(host=>host.sideBSession().nodeState.result.ok),true);
   }
  }
  await page.screenshot({path:'.modern-b-challenge-'+lang+'.png'});assert.deepEqual(errors,[]);await context.close();
 }}finally{await browser.close();}
});

