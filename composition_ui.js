import { FORMS,CADENCES,MODULATIONS,NOTES,RHYTHMS,buildComposition,rhythmEvents } from './composition.js';
import { mountCompositionScore } from './composition_score.js';
const el=(tag,cls='',text='')=>{const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
function select(label,items,value) {
  const wrap=el('label','compose-field'), input=el('select');
  input.setAttribute('aria-label',label);
  wrap.append(el('span','',label));
  Object.entries(items).forEach(([key,name])=>{const o=el('option','',Array.isArray(name)?name[0]:name);o.value=key;input.append(o);});
  input.value=value;wrap.append(input);return {wrap,input};
}
const button=(text,action,cls='')=>{const b=el('button',cls,text);b.type='button';b.onclick=action;return b;};
const keyOptions=Object.fromEntries(NOTES.map(n=>[n,n]));
function saveFile(name,body,type='application/json') {
  const url=URL.createObjectURL(new Blob([body],{type}));const a=el('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function transport(host,audio,getData,paint=()=>{}) {
  const row=el('div','compose-transport');
  const label=el('label','','速度 ♩ BPM'),tempo=el('input');tempo.type='number';tempo.min='40';tempo.max='240';tempo.value='96';label.append(tempo);
  const status=el('span','compose-play-status','就绪');status.setAttribute('role','status');
  let finish=null;
  const stop=()=>{audio.stop();clearTimeout(finish);paint(-1);status.textContent='已停止';};
  const play=(data=getData())=>{
    stop(); const bpm=Math.max(40,Math.min(240,Number(tempo.value)||96));tempo.value=bpm;
    if(!data.events.length){status.textContent='当前全部休止';return;}
    audio.play(data.events,bpm,data.duration,(event)=>paint(event.bar ?? event.step));
    status.textContent='播放中';finish=setTimeout(()=>{status.textContent='播放完成';paint(-1);},data.duration*60000/bpm+150);
  };
  row.append(label,button('播放',()=>play(),'compose-primary'),button('停止',stop),status);host.append(row);
  host.addEventListener('toolbox-stop',stop);
  tempo.onchange=stop;
  stop.playData=play;return stop;
}
export function mountComposition(host,audio) {
  const cfg={form:'ternary',key:'C',mode:'major',meter:'4/4',bars:8,bass:'alternating',cadence:'k64',modulation:'pivot',phrase:'period',sequence:false,intro:false,coda:false,harmonicRhythm:1,sections:{}};
  const toolbar=el('div','compose-controls');
  host.append(toolbar);
  const choices=[['form','曲式',FORMS],['key','主调',keyOptions],['mode','调式',{major:'大调',minor:'小调'}],['meter','拍号',{'4/4':'4/4','3/4':'3/4'}],['bars','每段小节数',{8:'8 小节',16:'16 小节'}],['bass','低音伴奏',{parallel:'同步低音',alternating:'交替低音'}],['modulation','调性处理',MODULATIONS],['cadence','主段终止',CADENCES],['phrase','乐句组织',{period:'平行乐段 先开放 后收束',sentence:'乐句 2 + 2 + 4'}],['harmonicRhythm','和声节奏',{1:'每小节一个和弦',2:'每小节两个和弦'}]];
  let stop=()=>{},model,scoreCleanups=[];
  choices.forEach(([key,label,items])=>{
    const field=select(label,items,cfg[key]);toolbar.append(field.wrap);
    field.input.onchange=()=>{cfg[key]=field.input.value;if(['form','key','mode','modulation','cadence'].includes(key)) cfg.sections={};render();};
  });
  const toggles=el('div','compose-toggles');
  [['sequence','加入五度模进'],['intro','引子'],['coda','尾声']].forEach(([key,text])=>{
    const label=el('label'),input=el('input');input.type='checkbox';label.append(input,document.createTextNode(text));toggles.append(label);input.onchange=()=>{cfg[key]=input.checked;cfg.sections={};render();};
  });
  toolbar.append(toggles);
  const result=el('div','compose-result');
  const tracks={melody:true,harmony:true,bass:true};
  stop=transport(host,audio,()=>({...model,events:model.events.filter(e=>tracks[e.track])}),bar=>{result.querySelectorAll('[data-bar]').forEach(n=>n.classList.toggle('is-playing',Number(n.dataset.bar)===bar));});
  const trackControls=el('div','compose-toggles compose-tracks');
  [['melody','琶音旋律'],['harmony','和声'],['bass','低音']].forEach(([key,text])=>{
    const label=el('label'),check=el('input');check.type='checkbox';check.checked=true;label.append(check,document.createTextNode(text));trackControls.append(label);check.onchange=()=>{stop();tracks[key]=check.checked;};
  });host.append(trackControls);
  host.append(result);
  const exportRow=el('div','compose-export');
  exportRow.append(button('导出样例 JSON',()=>saveFile('form-study.json',JSON.stringify(model,null,2))));host.append(exportRow);
  const notes=el('details','compose-guide');notes.append(el('summary','','曲式与分析提示'));
  const terms=[
    ['A / A\' / B / C','A 是主要材料 A\' 保留身份并改变配置 B 和 C 使用对比和声与琶音方向'],
    ['乐段与复乐段','A 示例分为前后两句 A A\' 是两个相关乐段的教学布局 字母本身不能单独证明乐段结构'],
    ['二部与三部','A B 建立两个区域 A B A 强调再现 A B A\' 在再现中变化'],
    ['回旋与变奏','回旋反复返回 A 变奏持续改写 A 两者有不同的材料组织方式'],
    ['终止与淡出','PAC 需要根位属到主 且旋律落主音 IAC 本例落三音 Fade Out 是音量处理 不等同于和声终止'],
    ['离调与转调','副属短暂强调另一和弦 转调需要新调的建立 共同和弦标注前后两种功能'],
    ['调式交替','借用同主音调式的和弦 不自动构成转调 关系大小调则改变主音中心'],
    ['模进与连接','五度模进推进和声 引子可建立属功能 尾声强化结束 重新出现的 A 回到主调'],
    ['进一步分析','可比较乐句长度 对称性 重复与变化 调性闭合 和声节奏 织体 密度 高潮位置 与再现后的终止强度'],
    ['样例边界','这里生成结构与伴奏示意 琶音代替完整旋律 不将自动模板视为作品的唯一曲式分析']
  ];
  terms.forEach(([title,body])=>{const p=el('p');p.append(el('strong','',title+'  '),document.createTextNode(body));notes.append(p);});
  const sources=el('p');sources.append(document.createTextNode('理论参考 '));
  [['Open Music Theory','https://openmusictheory.github.io/Modulation.html'],['乐句与终止','https://www.musictheory.net/lessons/55']].forEach(([name,url])=>{const a=el('a','',name);a.href=url;a.target='_blank';a.rel='noreferrer';sources.append(a,document.createTextNode('  '));});notes.append(sources);host.append(notes);
  function render() {
    stop();scoreCleanups.forEach(fn=>fn());scoreCleanups=[];model=buildComposition(cfg);result.replaceChildren();
    const heading=el('div','compose-summary');heading.append(el('strong','',model.sections.map(s=>s.label).join(' → ')),el('span','',`${model.bars.length} 小节 / ${cfg.meter} / ${cfg.key} ${cfg.mode==='major'?'大调':'小调'}`));result.append(heading);
    result.append(el('p','compose-score-help','点击任意小节试听旋律与伴奏 / 和弦名称与功能位于谱表上方'));
    model.warnings.forEach(w=>result.append(el('p','compose-warning',w)));
    const playRange=(start,length)=>stop.playData({duration:length*model.beats,events:model.events.filter(e=>e.bar>=start&&e.bar<start+length&&tracks[e.track]).map(e=>({...e,beat:e.beat-start*model.beats}))});
    for(const section of model.sections) {
      const card=el('section','compose-section');card.dataset.section=section.id;
      const title=el('div','compose-section-title');title.append(el('strong','compose-letter',section.label),el('span','',`${section.start}–${section.start+section.length-1} 小节 / ${section.key} ${section.mode==='major'?'大调':'小调'} / ${section.contrast?'对比乐段':section.varied?'变化再现':'主要材料'}`),button('试听本段',()=>playRange(section.start-1,section.length)));card.append(title);
      const settings=el('details','compose-section-settings');settings.append(el('summary','','调整本段调性与结尾'));
      const controls=el('div','compose-section-controls');
      for(const [key,label,items] of [['key','本段调性',keyOptions],['mode','本段调式',{major:'大调',minor:'小调'}],['cadence','本段结尾',CADENCES]]) {
        const field=select(label,items,section[key]);field.input.setAttribute('aria-label',`${section.label} 第 ${section.id+1} 段 ${label}`);controls.append(field.wrap);
        field.input.onchange=()=>{cfg.sections[section.id]={...cfg.sections[section.id],[key]:field.input.value};render();};
      }
      settings.append(controls);card.append(settings,el('p','compose-section-note',`${section.transition} / ${CADENCES[section.cadence][1]}`));
      const score=el('div','compose-score-host');card.append(score);result.append(card);
      scoreCleanups.push(mountCompositionScore(score,model,section,index=>playRange(index,1)));
      const annotations=model.bars.filter(b=>b.section===section.id).flatMap(b=>b.chords.filter(c=>c.tag).map(c=>`${b.number} ${c.tag}`));
      card.append(el('p','compose-section-note',[...new Set(annotations)].join(' / ')));
    }
  }
  render();return stop;
}

export function mountRhythm(host,audio) {
  let current={...RHYTHMS[0],cells:[...RHYTHMS[0].cells]},swing=0,loops=4;
  const controls=el('div','compose-controls');
  const meter=select('拍号筛选',{all:'所有拍号',...Object.fromEntries([...new Set(RHYTHMS.map(p=>p.meter))].map(m=>[m,m]))},'all');
  const groove=select('时值摆动',{0:'直拍',0.33:'Swing 约 2:1',0.5:'重 Swing 3:1'},'0');
  const repeat=select('循环次数',{1:'1',2:'2',4:'4',8:'8',16:'16'},4);
  controls.append(meter.wrap,groove.wrap,repeat.wrap);host.append(controls);
  const editor=el('section','rhythm-editor');host.append(editor);
  let stop=()=>{};
  stop=transport(host,audio,()=>{
    const one=rhythmEvents(current.cells,current.subdivision,swing),duration=current.cells.length*4/current.subdivision;
    return {duration:duration*loops,events:Array.from({length:loops},(_,i)=>one.map(e=>({...e,beat:e.beat+i*duration}))).flat()};
  },step=>editor.querySelectorAll('[data-step]').forEach(n=>n.classList.toggle('is-playing',Number(n.dataset.step)===step)));
  groove.input.onchange=()=>{stop();swing=Number(groove.input.value);};repeat.input.onchange=()=>{stop();loops=Number(repeat.input.value);};
  const custom=el('div','rhythm-custom');
  const customMeter=select('沙盒拍号',{'2/4':'2/4','3/4':'3/4','4/4':'4/4','5/4':'5/4','6/4':'6/4','3/8':'3/8','5/8':'5/8','6/8':'6/8','7/8':'7/8','9/8':'9/8','11/8':'11/8','12/8':'12/8'},'7/8');
  const subdivision=select('每格时值',{8:'1/8',16:'1/16'},8);
  custom.append(customMeter.wrap,subdivision.wrap,button('新建空白节奏',()=>{
    stop();const [n,d]=customMeter.input.value.split('/').map(Number),sub=Number(subdivision.input.value);
    current={id:'custom',name:'自定义沙盒',meter:customMeter.input.value,subdivision:sub,groups:[n*sub/d],cells:Array(n*sub/d).fill('0'),description:'点击任意格子开始'};renderEditor();renderPresets();
  }),button('清空格子',()=>{stop();current.cells.fill('0');renderEditor();}),button('导出节奏 JSON',()=>saveFile('rhythm-pattern.json',JSON.stringify({...current,swing,loops},null,2))));host.append(custom);
  const grid=el('div','rhythm-library');host.append(grid);
  meter.input.onchange=renderPresets;
  function renderEditor() {
    editor.replaceChildren();
    const heading=el('div','rhythm-heading');heading.append(el('div','',`${current.meter} ${current.name}`),el('span','',`每格 1/${current.subdivision}`));editor.append(heading);
    editor.append(el('p','',current.description||'按分组边界感受不对称节拍'));
    const steps=el('div','rhythm-grid');steps.style.setProperty('--steps',current.cells.length);
    const boundaries=new Set([0]);let sum=0;current.groups.forEach(n=>{sum+=n;boundaries.add(sum);});
    current.cells.forEach((value,i)=>{
      const b=button('',()=>{stop();const symbols=['0','x','X','-'];current.cells[i]=symbols[(symbols.indexOf(current.cells[i])+1)%4];renderEditor();editor.querySelector(`[data-step="${i}"]`)?.focus();});
      b.className=`rhythm-cell ${boundaries.has(i)?'group-start':''}`;b.dataset.step=i;b.dataset.value=value;
      b.setAttribute('aria-label',`第 ${i+1} 格 ${value==='X'?'重音':value==='x'?'起音':value==='-'?'延音':'休止'}`);
      const [numerator,denominator]=current.meter.split('/').map(Number),beat=i*denominator/current.subdivision;
      b.append(el('small','',Number.isInteger(beat)?String(beat%numerator+1):current.subdivision/denominator===2?'&':['e','&','a'][i%4-1]),el('strong','',value));steps.append(b);
    });editor.append(steps);
    const orphan=current.cells.some((c,i)=>c==='-' && (i===0 || current.cells[i-1]==='0'));
    editor.append(el('p','rhythm-legend','X 重音 / x 起音 / - 延续前音 / 0 休止 / 点击循环切换'));
    if(orphan) editor.append(el('p','compose-warning','休止后或首格的延音没有前音可连接 播放时作为休止'));
  }
  function renderPresets() {
    grid.replaceChildren();
    RHYTHMS.filter(p=>meter.input.value==='all'||p.meter===meter.input.value).forEach(p=>{
      const card=button('',()=>{stop();current={...p,cells:[...p.cells],groups:[...p.groups]};renderEditor();renderPresets();},'rhythm-preset');
      card.setAttribute('aria-pressed',String(current.id===p.id));card.append(el('small','',`${p.meter} / 1/${p.subdivision}`),el('strong','',p.name),el('code','',p.cells.join(' ')));grid.append(card);
    });
  }
  renderEditor();renderPresets();return stop;
}
