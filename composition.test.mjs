import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreTrack} from './composition_score.js';
import {buildComposition,FORMS,CADENCES,MODULATIONS,RHYTHMS,rhythmEvents,NOTES,findPivot,chordAt,arpeggioMidi} from './composition.js';
test('3/4 arpeggios repeat 135 twice and notation uses the same six notes',()=>{
  const m=buildComposition({meter:'3/4',form:'single'});
  const notes=m.events.filter(e=>e.bar===0&&e.track==='melody').map(e=>e.midi);
  assert.deepEqual(notes,[72,76,79,72,76,79]);
  assert.deepEqual(scoreTrack(m.events,0,'melody',3).flatMap(g=>g.notes),notes);
  const four=buildComposition({meter:'4/4',form:'single'});
  assert.deepEqual(four.events.filter(e=>e.bar===0&&e.track==='melody').map(e=>e.midi),[72,76,79,76,72,76,79,76]);
  for(const form of ['rondo','variedTernary']) {
    const example=buildComposition({meter:'3/4',form});
    for(const section of example.sections) {
      const phrase=example.events.filter(e=>e.bar===section.start-1&&e.track==='melody').map(e=>e.midi);
      assert.equal(phrase.length,6);
      assert.deepEqual(phrase.slice(0,3),phrase.slice(3));
    }
  }
});
test('arpeggio follows the chord inversion in both playback and score events',()=>{
  const root=chordAt('C','major',0,0);
  const first=chordAt('C','major',0,1);
  const second=chordAt('C','major',0,2);
  assert.deepEqual(arpeggioMidi(root,[0,1,2,0,1,2]),[72,76,79,72,76,79]);
  assert.deepEqual(arpeggioMidi(first,[0,1,2,0,1,2]),[76,79,84,76,79,84]);
  assert.deepEqual(arpeggioMidi(second,[0,1,2,0,1,2]),[67,72,76,67,72,76]);
  const model=buildComposition({meter:'3/4',form:'single',cadence:'k64'});
  const k64=model.bars.find(b=>b.chords[0].roman==='K64');
  const notes=model.events.filter(e=>e.bar===k64.number-1&&e.track==='melody').map(e=>e.midi);
  assert.deepEqual(notes,[67,72,76,67,72,76]);
  assert.deepEqual(scoreTrack(model.events,k64.number-1,'melody',3).flatMap(g=>g.notes),notes);
});
test('all templates meters keys and cadences stay within the score timeline',()=>{
  for(const form of Object.keys(FORMS)) for(const meter of ['3/4','4/4']) for(const key of NOTES) for(const cadence of Object.keys(CADENCES)) {
    const m=buildComposition({form,meter,key,cadence});
    assert.equal(m.sections.length,FORMS[form][1].length);
    assert.ok(m.events.every(e=>Number.isFinite(e.midi)&&e.midi>=24&&e.midi<=108&&e.beat>=0&&e.duration>0&&e.beat+e.duration<=m.duration));
    assert.ok(m.bars.every(b=>b.chords.reduce((sum,c)=>sum+c.duration,0)===m.beats));
    assert.ok(m.bars.every(b=>b.chords.every(c=>c.midiVoicing.slice(1).every(n=>n>c.midiVoicing[0]))));
  }
});
test('authentic cadence melody and bass distinguish PAC and IAC',()=>{
  for(const mode of ['major','minor']) for(const key of NOTES) for(const type of ['pac','iac','k64']) {
    const m=buildComposition({form:'single',key,mode,cadence:type});
    const end=m.bars.at(-1),chord=end.chords[0];
    const melody=m.events.filter(e=>e.bar===end.number-1&&e.track==='melody');
    assert.equal(melody.length,1);
    assert.equal(melody[0].midi%12,type==='iac'?chord.pitches[1]:chord.rootPc);
    assert.equal(chord.bassPc,chord.rootPc);
  }
});
test('modulation returns to tonic and real pivot has both harmonic identities',()=>{
  for(const method of Object.keys(MODULATIONS)) {
    const m=buildComposition({modulation:method});
    assert.equal(m.sections.at(-1).key,'C');
    assert.equal(m.sections.at(-1).mode,'major');
  }
  const p=findPivot({key:'C',mode:'major'},{key:'G',mode:'major'});
  assert.deepEqual(p.pitches,[9,0,4]);
});
test('alternating bass uses chord tones and shifts accompaniment to offbeat',()=>{
  const a=buildComposition({bass:'alternating',form:'single'}),b=buildComposition({bass:'parallel',form:'single'});
  assert.equal(a.events.find(e=>e.track==='harmony').beat,.5);
  assert.equal(b.events.find(e=>e.track==='harmony').beat,0);
  for(const event of a.events.filter(e=>e.track==='bass')) assert.ok(a.bars[event.bar].chords[0].pitches.includes(event.midi%12));
});
test('fade lowers actual note velocity and adds loop repetitions',()=>{
  const m=buildComposition({form:'single',cadence:'fade'});
  assert.equal(m.bars.length,16);
  const levels=m.bars.slice(4).map(b=>b.fade);
  assert.ok(levels.every((v,i)=>i===0||v<levels[i-1]));
  assert.ok(m.events.at(-1).velocity<.05);
});
test('presets fill whole bars and ties become sustained notes',()=>{
  for(const p of RHYTHMS) {
    const [n,d]=p.meter.split('/').map(Number);
    assert.equal((p.cells.length*4/p.subdivision)%(n*4/d),0,p.id);
    assert.equal(p.groups.reduce((a,b)=>a+b,0),p.cells.length,p.id);
    const events=rhythmEvents(p.cells,p.subdivision,.33);
    assert.ok(events.every(e=>e.beat+e.duration<=p.cells.length*4/p.subdivision));
  }
  assert.equal(rhythmEvents(['X','-','-','0']).length,1);
  assert.equal(rhythmEvents(['X','-','-','0'])[0].duration,1.475);
  assert.equal(rhythmEvents(['-','0','-']).length,0);
});
test('minor K64 has both suspensions resolve into dominant chord tones',()=>{
  const m=buildComposition({form:'single',mode:'minor',bass:'parallel'});
  const upper=bar=>m.events.filter(e=>e.bar===bar&&e.track==='harmony'&&Number.isInteger(e.beat)&&e.beat===bar*4).map(e=>e.midi);
  assert.deepEqual(upper(5),[55,60,63]);
  assert.deepEqual(upper(6),[55,59,62]);
});
test('rondo A returns unchanged while C contrasts with B',()=>{
  const m=buildComposition({form:'rondo'});
  const names=id=>m.bars.filter(b=>b.section===id).map(b=>b.chords.map(c=>c.name));
  assert.deepEqual(names(0),names(2));assert.deepEqual(names(0),names(4));assert.notDeepEqual(names(1),names(3));
});
test('minor and split harmonic rhythm preserve chord tone membership through modulation',()=>{
  for(const modulation of Object.keys(MODULATIONS)) for(const meter of ['3/4','4/4']) {
    const m=buildComposition({modulation,meter,mode:'minor',harmonicRhythm:2,intro:true,coda:true,sequence:true});
    assert.ok(m.bars.every(b=>b.chords.every(c=>c.midiVoicing.slice(1).every(n=>n>c.midiVoicing[0]))));
    for(const e of m.events) {
      const b=m.bars[e.bar],localBeat=e.beat-e.bar*m.beats;
      const c=b.chords.find(c=>localBeat>=c.beat && localBeat<c.beat+c.duration);
      assert.ok(c.pitches.includes(e.midi%12),`${modulation} ${b.number} ${c.name} ${e.midi}`);
    }
  }
});

test('a progression imported from the library replaces the main sections only', async () => {
  const { buildComposition } = await import('./composition.js');
  const custom = { key: 'C', mode: 'major', chords: [
    { pitches: [0, 4, 7], rootPc: 0, bassPc: 0, rootDeg: 0, bassDeg: 0, suffix: '', roman: 'I' }, { pitches: [7, 11, 2], rootPc: 7, bassPc: 11, rootDeg: 4, bassDeg: 6, suffix: '', roman: 'V/3' },
    { pitches: [9, 0, 4], rootPc: 9, bassPc: 9, rootDeg: 5, bassDeg: 5, suffix: 'm', roman: 'vi' }, { pitches: [5, 9, 0], rootPc: 5, bassPc: 5, rootDeg: 3, bassDeg: 3, suffix: '', roman: 'IV' }] };
  const model = buildComposition({ form: 'ternary', key: 'D', custom });
  const names = (id) => model.bars.filter((b) => b.section === id).map((b) => b.chords.map((c) => c.name).join('+'));
  assert.deepEqual(names(0), ['D', 'A/C#', 'Bm', 'G', 'D', 'A/C#', 'Bm', 'G'], 'transposed to the section key, spelled by letter and repeated to 8 bars');
  assert.equal(model.sections[0].cadence, 'custom');
  assert.notDeepEqual(names(1), names(0), 'the contrasting section is still generated');
  const first = model.bars[1].chords[0];
  assert.equal(first.pitches[first.inversion], first.bassPc, 'the slash bass is a real inversion');
  const long = buildComposition({ form: 'single', custom: { ...custom, chords: Array(12).fill(custom.chords[0]) } });
  assert.equal(long.bars.length, 12, 'a 12-chord progression is not cut to 8 bars');
  const withCadence = buildComposition({ form: 'single', custom, sections: { 0: { cadence: 'pac' } } });
  assert.equal(withCadence.bars.at(-1).chords[0].name, 'C', 'a section cadence override is still applied at the end');
  const sharp = buildComposition({ form: 'single', key: 'A', mode: 'major', cadence: 'pac' });
  assert.ok(sharp.bars.every((b) => b.chords.every((c) => !/b/.test(c.name.replace(/m7b5|b9|b13/g, '')))), 'A major chords use sharps (F#m, not Gbm)');
});
