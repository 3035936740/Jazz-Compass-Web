// Independent SATB search informed by Huaishu61/Sposobin engine.py and rules.py
// https://github.com/Huaishu61/Sposobin  retrieved 2026-09-21  ref:sposobin
// Voice arrays use B T A S order and absolute MIDI pitches throughout playback
const pc = n => ((n % 12) + 12) % 12;
const range = (lo, hi, pcs) => Array.from({length: hi-lo+1}, (_, i) => lo+i).filter(n => pcs.includes(pc(n)));
const cache = new Map();
export const midiName = n => `${['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'][pc(n)]}${Math.floor(n/12)-1}`;
export function voicingCandidates(entry) {
  const pcs = entry.pitchClasses;
  if (!pcs?.length || pcs.length > 4) return [];
  const signature = JSON.stringify([pcs,entry.bassPc,entry.maxCounts,entry.sopranoPc,entry.sopranoMidi,entry.bassMidi]);
  if (cache.has(signature)) return cache.get(signature);
  const result = [];
  // 音域按 OMT：男低 F2–D4、男高 C3–G4、女中 G3–D5、女高 C4–G5（ref:omt2e-roman-numerals）
  for (const b of (entry.bassMidi != null ? [entry.bassMidi] : range(41,62,[entry.bassPc])))
    for (const t of range(Math.max(48,b+1),67,pcs))
      for (const a of range(Math.max(55,t),Math.min(74,t+12),pcs))
        for (const s of range(Math.max(60,a),Math.min(79,a+12),pcs)) {
          const v = [b,t,a,s], counts = {};
          v.forEach(n => counts[pc(n)] = (counts[pc(n)] || 0)+1);
          if (pcs.some(n => !counts[n]) || Object.entries(entry.maxCounts || {}).some(([n,max]) => (counts[n] || 0)>max)) continue;
          if (entry.sopranoPc != null && pc(s)!==entry.sopranoPc) continue;
          if (entry.sopranoMidi != null && s!==entry.sopranoMidi) continue;
          result.push(v);
        }
  result.sort((a,b)=>initialCost(a)-initialCost(b));
  cache.set(signature,result);
  return result;
}
const initialCost = v => Math.abs(v[0]-43)*.25 + Math.abs(v[1]-55)*.4 + Math.abs(v[2]-62)*.4 + Math.abs(v[3]-69)*.5 + (v[1]===v[2]?6:0)+(v[2]===v[3]?6:0);
export function transitionIssues(a,b,from={},to={}) {
  const issues = [];
  const d = b.map((n,i)=>n-a[i]);
  if (!(b[0]<b[1] && b[1]<=b[2] && b[2]<=b[3]) || b[2]-b[1]>12 || b[3]-b[2]>12) issues.push('声部交叉或间距过大');
  for(let i=0;i<3;i++) if(b[i]>a[i+1] || b[i+1]<a[i]) issues.push('声部超越');
  for(let i=0;i<4;i++) for(let j=i+1;j<4;j++) {
    const old=pc(a[j]-a[i]), next=pc(b[j]-b[i]);
    if(d[i] && d[j] && old===next && (old===0 || old===7)) issues.push(old===0?'连续八度或同度':'连续五度');
  }
  if(d[0]*d[3]>0 && Math.abs(d[3])>2 && [0,7].includes(pc(b[3]-b[0]))) issues.push('外声部隐伏五八度');
  if(Math.abs(d[0])>12 || [10,11].includes(Math.abs(d[0])) || d[0]===6) issues.push('低音跳进过大');
  if(d.slice(1).some(n=>Math.abs(n)>7 || Math.abs(n)===6)) issues.push('上声部不平稳跳进');
  const same = from.pitchClasses?.length===to.pitchClasses?.length && from.pitchClasses?.every(n=>to.pitchClasses.includes(n));
  if(!same && from.seventhPc!=null) for(let i=0;i<4;i++) if(pc(a[i])===from.seventhPc && ![-1,-2].includes(d[i])) issues.push('七音未下行级进解决');
  if(!same && from.leadingPc!=null && to.pitchClasses?.includes(pc(from.leadingPc+1))) {
    for(let i=0;i<4;i++) if(pc(a[i])===from.leadingPc && d[i]!==1 && !(i>0 && i<3 && d[i]===-4)) issues.push('导音未解决');
  }
  if(from.symbol==='K₆₄') {
    if(b[0]!==a[0]) issues.push('终止四六低音未保持');
    for(let i=1;i<4;i++) if([from.tonicPc,pc(from.tonicPc+3),pc(from.tonicPc+4)].includes(pc(a[i])) && ![-1,-2].includes(d[i])) issues.push('终止四六倚音未下行解决');
  }
  if(/^[Ss]₆₄$/.test(from.symbol)||/^[Ss]₆₄$/.test(to.symbol)) if(d[0]!==0) issues.push('辅助四六低音未保持');
  if(/^[TDt]₆₄$/.test(from.symbol)||/^[TDt]₆₄$/.test(to.symbol)) if(![1,2].includes(Math.abs(d[0]))) issues.push('经过四六低音未级进');
  if(/^(It|Ger|Fr)/.test(from.symbol)) {
    for(let i=0;i<4;i++) {
      if(pc(a[i])===pc(from.tonicPc+8) && d[i]!==-1) issues.push('增六下方音未下行');
      if(pc(a[i])===pc(from.tonicPc+6) && d[i]!==1) issues.push('增六上方音未上行');
    }
  }
  if(from.symbol==='N₆') for(let i=0;i<4;i++) if(pc(a[i])===pc(from.tonicPc+1) && ![-1,-2].includes(d[i])) issues.push('那不勒斯降二级未下行');
  return [...new Set(issues)];
}
export function voiceCost(a,b,from,to) {
  if(transitionIssues(a,b,from,to).length) return Infinity;
  return b.reduce((sum,n,i)=>sum+Math.abs(n-a[i])*(i===0?.65:i===3?1.3:1.1),0)+initialCost(b)*.08;
}
/**
 * 找不到合法连接时的退路：每一步都选"违反规则最少、其次移动最小"的配置，保证仍能按顺序播放、送入五线谱。
 * 某个和弦连音域 / 重复音规则都满足不了时，用一个简单的密集排列（低音 + 三个上方声部依次往上叠）
 */
function looseCandidates(entry) {
  const strict = voicingCandidates(entry);
  if (strict.length) return strict;
  const pcs = entry.pitchClasses || [];
  if (!pcs.length) return [];
  const bass = range(41, 52, [entry.bassPc ?? pcs[0]])[0] ?? 48;
  const upper = [];
  let cur = 54;
  for (let i = 0; i < 3; i += 1) { const want = pcs[(i + 1) % pcs.length]; let n = cur + 1; while (pc(n) !== want) n += 1; upper.push(n); cur = n; }
  return [[bass, ...upper]];
}
function solveLoosely(entries) {
  let layer = looseCandidates(entries[0]).map((v) => ({ v, cost: initialCost(v), prev: null }));
  if (!layer.length) return null;
  for (let k = 1; k < entries.length; k += 1) {
    const next = [];
    for (const v of looseCandidates(entries[k])) {
      let best = null; let cost = Infinity;
      for (const state of layer) {
        const issues = transitionIssues(state.v, v, entries[k - 1], entries[k]).length;
        const value = state.cost + issues * 1000 + v.reduce((sum, n, i) => sum + Math.abs(n - state.v[i]), 0);
        if (value < cost) { cost = value; best = state; }
      }
      if (best) next.push({ v, cost, prev: best });
    }
    if (!next.length) return null;
    layer = next;
  }
  let state = layer.reduce((a, b) => (a.cost < b.cost ? a : b));
  const voices = [];
  while (state) { voices.unshift(state.v); state = state.prev; }
  const problems = voices.slice(1).map((v, i) => ({ index: i + 1, issues: transitionIssues(voices[i], v, entries[i], entries[i + 1]) })).filter((x) => x.issues.length);
  return { voices, problems };
}
export function solveVoicings(entries) {
  if(!entries.length) return {ok:true,voices:[],cost:0};
  const strict = solveStrict(entries);
  if (strict.ok) return strict;
  // 没有合法连接：仍然按顺序给出一种配置（ok 仍为 false，fallback = true），界面提示"这种写法不对"，但可以播放、可以送入五线谱
  const loose = solveLoosely(entries);
  return loose ? { ...strict, fallback: true, voices: loose.voices, problems: loose.problems } : strict;
}
function solveStrict(entries) {
  let layer=voicingCandidates(entries[0]).map(v=>({v,cost:initialCost(v),prev:null}));
  if(!layer.length) return {ok:false,index:0,reason:'该和弦没有符合音域与重复音规则的四部配置'};
  for(let k=1;k<entries.length;k++) {
    const next=[];
    for(const v of voicingCandidates(entries[k])) {
      let best=null,cost=Infinity;
      for(const state of layer) {
        const value=state.cost+voiceCost(state.v,v,entries[k-1],entries[k]);
        if(value<cost) {cost=value;best=state;}
      }
      if(best) next.push({v,cost,prev:best});
    }
    if(!next.length) return {ok:false,index:k,reason:`第 ${k+1} 个和弦 ${entries[k].symbol} 无合法声部连接 请更换转位或插入过渡和弦`};
    layer=next;
  }
  let state=layer.reduce((a,b)=>a.cost<b.cost?a:b), cost=state.cost;
  const voices=[];
  while(state) {voices.unshift(state.v);state=state.prev;}
  return {ok:true,voices,cost};
}
