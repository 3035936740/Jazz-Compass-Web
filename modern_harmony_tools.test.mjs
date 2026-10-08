import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DEFAULTS, MODERN_TOOL_IDS, PRESETS, MODEL_OF, nonfunctionalModel, polytonalityModel, atonalityModel, spectralModel, microtonalModel, parseNotes, createToolPlayer } from './modern_harmony_tools.js';
import { TOOL_COPY } from './modern_harmony_tools_ui.js';
import { FEATURE_UNIT } from './learn_feature_unit.js';
import { TOPICS } from './modern_harmony_course.js';
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);

test('exact planing preserves intervals while diatonic planing changes quality and respects negative scale positions', () => {
  const exact = nonfunctionalModel({ ...DEFAULTS.nonfunctional, shifts: '0 2 -2' });
  assert.deepEqual(exact.rows[1].notes, [62, 66, 69]);
  assert.deepEqual(exact.rows[2].movement, [-4, -4, -4]);
  for (const row of exact.rows) assert.deepEqual(row.intervals, [0, 4, 7]);
  const diatonic = nonfunctionalModel({ ...DEFAULTS.nonfunctional, mode: 'diatonic', shifts: '0 1 -1', pedal: 'C3' });
  assert.deepEqual(diatonic.rows[1].notes, [62, 65, 69]);
  assert.deepEqual(diatonic.rows[2].notes, [59, 62, 65]);
  assert.equal(diatonic.events[2].frequencies[0], diatonic.events[0].frequencies[0]);
  assert.throws(() => nonfunctionalModel({ ...DEFAULTS.nonfunctional, mode: 'diatonic', voicing: 'C4 F#4 G4' }), /outsideScale/);
});

test('custom common tones distinguish pitch classes from actual register and avoid inventing a voice mapping', () => {
  const model = nonfunctionalModel({ ...DEFAULTS.nonfunctional, mode: 'manual', chords: 'C4 E4 G4 | C5 F4 A4 | F4 A4' });
  assert.deepEqual(model.rows[1].common, [0]);
  assert.deepEqual(model.rows[1].movement, [12, 1, 2]);
  assert.equal(model.rows[2].movement, null);
});

test('polytonal layers keep independent durations, rests, repeats and distinct scale spellings', () => {
  const model = polytonalityModel({ ...DEFAULTS.polytonality, patternA: '1:2 r:1 5:1', patternB: '1:1 3:1', repeats: 2 });
  assert.equal(model.a.length, 8); assert.equal(model.b.length, 4);
  assert.deepEqual(model.eventsA.map((event) => event.at), [0, 3, 4, 7]);
  assert.deepEqual(model.eventsB.map((event) => event.at), [0, 1, 2, 3]);
  assert.equal(model.events.filter((event) => event.at === 0).length, 2);
  assert.deepEqual(model.a.pcs, [0, 7]); assert.deepEqual(model.b.pcs, [2, 6]);
  assert.deepEqual(model.union, [0, 2, 6, 7]);
  assert.equal(polytonalityModel(PRESETS.polytonality[2]).sameCenter, true);
});

test('registered motif inversion uses a pitch axis; retrograde reverses time, not octave placement', () => {
  const input = { ...DEFAULTS.atonality, motif: 'C4 Db4 G4', pivot: 'E4', transpose: 0 };
  const inv = atonalityModel({ ...input, transform: 'I' });
  assert.deepEqual(inv.notes, [68, 67, 61]);
  assert.deepEqual(inv.gaps, [-1, -6]);
  assert.deepEqual(inv.info.vector, inv.sourceInfo.vector);
  assert.deepEqual(atonalityModel({ ...input, transform: 'R' }).notes, [67, 61, 60]);
  assert.deepEqual(atonalityModel({ ...input, transform: 'RI' }).notes, [61, 67, 68]);
  assert.deepEqual(atonalityModel({ ...input, transform: 'T', transpose: -12 }).notes, [48, 49, 55]);
});

test('spectral model retains exact upper partials, amplitudes and logarithmic morph offsets', () => {
  const model = spectralModel({ ...DEFAULTS.spectralharmony, fundamental: 100, partials: '5:0.8:0 7:0.5:0' });
  near(model.rows[0].frequency, 500); near(model.rows[1].frequency, 700);
  near(model.rows[1].cents, 1200 * Math.log2(7));
  assert.equal(model.rows[1].nearest.note, 'F5');
  near(model.rows[1].nearest.deviation, 1200 * Math.log2(700 / (440 * 2 ** (8 / 12))));
  near(spectralModel({ ...DEFAULTS.spectralharmony, partials: '7' }).rows[0].nearest.deviation, -31.174093530874);
  assert.deepEqual(model.chord[0].amplitudes, [.8, .5]);
  const morph = spectralModel({ ...DEFAULTS.spectralharmony, fundamental: 100, partials: '2:0.5:100', morph: 50 });
  near(morph.rows[0].frequency, 200 * 2 ** (50 / 1200));
  assert.equal(morph.rows[0].offset, 50);
});

test('two tuning chords share one EDO grid including the shifted B root and retain exact common Hz', () => {
  const model = microtonalModel(DEFAULTS.microtonalharmony);
  near(model.a[1].frequency, 275);
  near(model.a[1].error, 6 * 1200 / 19 - 1200 * Math.log2(5 / 4));
  assert.equal(model.b[0].step, 8);
  near(model.b[0].temperedHz, 220 * 2 ** (8 / 19));
  const common = microtonalModel({ ...DEFAULTS.microtonalharmony, ratiosA: '1/1 4/3 2/1', ratiosB: '1/1 3/2' });
  assert.deepEqual(common.commonHz, [220 * 4 / 3, 440]);
  const comma = microtonalModel(PRESETS.microtonalharmony[2]);
  near(comma.b[1].cents - comma.a[1].cents, 1200 * Math.log2(81 / 80));
  assert.equal(comma.a[1].step, comma.b[1].step);
});

test('invalid edits fail explicitly instead of silently wrapping, dropping pitches or producing NaN', () => {
  for (const input of ['C', '', 'C#9', 'NaN', 'C4 garbage', 'C-1']) assert.throws(() => parseNotes(input));
  assert.throws(() => spectralModel({ ...DEFAULTS.spectralharmony, partials: '32:1:600', fundamental: 1000 }));
  assert.deepEqual(spectralModel({ ...DEFAULTS.spectralharmony, partials: '4:0:0' }).events, []);
  assert.throws(() => spectralModel({ ...DEFAULTS.spectralharmony, partials: '5:2:0' }));
  assert.throws(() => microtonalModel({ ...DEFAULTS.microtonalharmony, ratiosA: '0/1' }), /ratio/);
  assert.throws(() => microtonalModel({ ...DEFAULTS.microtonalharmony, edo: 19.5 }));
  assert.throws(() => polytonalityModel({ ...DEFAULTS.polytonality, patternA: '1:0' }));
  assert.throws(() => nonfunctionalModel({ ...DEFAULTS.nonfunctional, shifts: '0 banana' }));
});

test('every preset produces audible valid events; course and navigation use the dedicated tools', () => {
  const html = readFileSync('index.html', 'utf8');
  for (const id of MODERN_TOOL_IDS) {
    assert.equal(FEATURE_UNIT[id], id);
    assert.equal(TOPICS.find((topic) => topic.id === id).feature, id);
    assert.ok(html.includes(`id="panel-${id}-body"`));
    assert.ok(html.includes(`id="nav_${id}"`));
    assert.ok(TOOL_COPY[id].refs.length);
    for (const field of ['title', 'intro', 'hint']) assert.ok(TOOL_COPY[id][field].every((s) => s.length));
    for (const preset of PRESETS[id]) {
      const result = MODEL_OF[id](preset);
      const events = result.events || result.just;
      assert.ok(events.length);
      for (const event of events) assert.ok(event.frequencies.every((frequency) => Number.isFinite(frequency) && frequency >= 20 && frequency <= 12000));
    }
  }
});

test('playback unlocks the first event synchronously, overlaps layers and cancels every old callback and sounding voice', () => {
  let seq = 0, silences = 0, voiceStops = 0, ends = 0;
  const timers = new Map(), played = [];
  const player = createToolPlayer({ sound: (event, seconds, first) => { played.push({ ...event, seconds, first }); return { stop: () => voiceStops++ }; }, silence: () => silences++, onEnd: () => ends++, setTimer: (fn, delay) => { const id = ++seq; timers.set(id, { fn, delay }); return id; }, clearTimer: (id) => timers.delete(id) });
  const model = polytonalityModel({ ...DEFAULTS.polytonality, repeats: 1 });
  player.play(model.events, 120);
  assert.equal(played.length, 2); assert.equal(played[0].first, true); assert.equal(played[1].first, false);
  assert.equal(played[0].seconds, model.events[0].duration * .5);
  const stale = [...timers.values()];
  player.stop();
  assert.equal(timers.size, 0); assert.equal(silences, 1); assert.equal(voiceStops, 2); assert.equal(player.active, false);
  stale.forEach((timer) => timer.fn()); assert.equal(played.length, 2);
  player.play([model.events[0]], 60);
  assert.equal(played.length, 3); assert.equal(player.active, true);
  [...timers.values()].forEach((timer) => timer.fn()); assert.equal(player.active, false); assert.equal(timers.size, 0);
  assert.ok(ends >= 4);
});

test('highlight release follows note duration and cannot leak after a new playback', () => {
  let id = 0;
  const timers = new Map(), releases = [], marked = [];
  const player = createToolPlayer({ sound() {}, onEvent: event => marked.push(event.index), onRelease: event => releases.push(event.index), setTimer: (fn, delay) => { timers.set(++id,{fn,delay}); return id; }, clearTimer: key => timers.delete(key) });
  const event = { frequencies:[440], at:0, duration:.5, index:4 };
  player.play([event],60);
  const release = [...timers.values()].find(timer => timer.delay === 500);
  release.fn(); assert.deepEqual(releases,[4]);
  player.play([{...event,index:7}],60);
  release.fn(); assert.deepEqual(releases,[4]);
  assert.deepEqual(marked,[4,7]); player.stop();
});

test('nonfunctional chord names label exact and diatonic planing, inversions, sevenths and preserved input spelling', () => {
  assert.deepEqual(nonfunctionalModel(DEFAULTS.nonfunctional).rows.map(row => row.chordNames[0]), ['C', 'D', 'E', 'C#']);
  assert.deepEqual(nonfunctionalModel(PRESETS.nonfunctional[1]).rows.map(row => row.chordNames[0]), ['C', 'Dm', 'Em', 'F']);
  const model = nonfunctionalModel({ ...DEFAULTS.nonfunctional, mode:'manual', chords:'E3 G3 C4 | G3 C4 E4 | B3 C4 E4 G4 | Db4 F4 Ab4' });
  assert.deepEqual(model.rows.map(row => row.chordNames[0]), ['C/E', 'C/G', 'Cmaj7/B', 'Db']);
  assert.deepEqual(nonfunctionalModel({ ...DEFAULTS.nonfunctional, mode:'manual', chords:'C4 E4 G4 | D4 F#4 A4', pedal:'C3' }).rows.map(row => row.chordNames[0]), ['C', 'D/C']);
  // Input order and doubling do not override the actual lowest sounding note.
  assert.equal(nonfunctionalModel({ ...DEFAULTS.nonfunctional, mode:'manual', chords:'E4 G4 C3 C5 | C4 E4 G4' }).rows[0].chordNames[0], 'C');
});

test('ambiguous chord-name readings are retained; arbitrary sonorities do not gain invented chord tones', () => {
  const model = nonfunctionalModel({ ...DEFAULTS.nonfunctional, mode:'manual', chords:'C4 E4 G4 A4 | C4 C#4 D4 | C4 E4 G#4' });
  assert.deepEqual(model.rows[0].chordNames, ['C6', 'Am7/C']);
  assert.deepEqual(model.rows[1].chordNames, []);
  assert.equal(model.rows[2].chordNames[0], 'Caug');
  assert.equal(model.rows[2].chordNames.length, 3);
});


test('spectral components accept exact fractions and decimals, validate candidates atomically, and retain old presets', async () => {
  const { addSpectralComponent } = await import('./modern_harmony_tools.js');
  const input = {...DEFAULTS.spectralharmony, fundamental:100, partials:'1:1:0 2:0.8:20', morph:50};
  const next = addSpectralComponent(input,{ratio:'3/2',amplitude:.6,offset:0});
  const model = spectralModel(next);
  assert.equal(input.partials,'1:1:0 2:0.8:20');
  assert.equal(model.rows[2].label,'3/2'); near(model.rows[2].frequency,150);
  near(model.rows[1].frequency,200*2**(10/1200));
  near(spectralModel({...next,partials:'1.5:0.6:0'}).rows[0].frequency,150);
  near(spectralModel({...next,partials:'1/2'}).rows[0].frequency,50);
  assert.equal(spectralModel({...next,partials:'1/2'}).rows[0].amplitude,1);
  for(const ratio of ['3/0','-3/2','3/2:1','NaN','33','1/33','1.5/2','']) assert.throws(()=>addSpectralComponent(input,{ratio}));
  assert.throws(()=>addSpectralComponent(input,{ratio:'3/2',amplitude:2}));
  assert.throws(()=>addSpectralComponent(input,{ratio:'3/2',offset:601}));
  const full={...input,partials:Array(16).fill('1:0.5:0').join(' ')};
  assert.throws(()=>addSpectralComponent(full,{ratio:'3/2'}),/count/);
  assert.equal(spectralModel(full).rows.length,16);
});


test('spectral arpeggiation includes added fractions and sorts actual morphed Hz while retaining visual row identities', async()=>{
 const {addSpectralComponent,removeSpectralComponent}=await import('./modern_harmony_tools.js');
 const input={...DEFAULTS.spectralharmony,fundamental:100,partials:'2:0.6:100 1:1:0 2:0.7:-100 4:0:0',morph:50};
 const added=addSpectralComponent(input,{ratio:'3/2',amplitude:.5});
 const model=spectralModel(added);
 assert.deepEqual(model.events.map(e=>e.index),[1,4,2,0]);
 assert.deepEqual(model.events.map(e=>e.at),[0,1,2,3]);
 assert.equal(model.events[1].frequencies[0],150);
 for(let i=1;i<model.events.length;i++)assert.ok(model.events[i].frequencies[0]>=model.events[i-1].frequencies[0]);
 const removed=removeSpectralComponent(added,2);
 assert.equal(input.partials,'2:0.6:100 1:1:0 2:0.7:-100 4:0:0');
 assert.equal(removed.partials,'2:0.6:100 1:1:0 4:0:0 3/2:0.5:0');
 assert.deepEqual(spectralModel(removed).events.map(e=>e.index),[1,3,0]);
 assert.throws(()=>removeSpectralComponent(added,100));
 const empty=removeSpectralComponent({...input,partials:'3/2:0.5:30'},0);
 assert.equal(empty.partials,'');assert.deepEqual(spectralModel(empty).rows,[]);assert.deepEqual(spectralModel(empty).chord,[]);
 assert.deepEqual(spectralModel({...input,partials:'1:0:0 2:0:0'}).approximation,[]);
 const restored=addSpectralComponent(empty,{ratio:'3/2'});assert.equal(restored.partials,'3/2:0.5:0');assert.equal(spectralModel(restored).events[0].frequencies[0],150);
});
