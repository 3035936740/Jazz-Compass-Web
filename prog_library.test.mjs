import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseDigits, parseRoman, romanOf, realize, realizeAll, versionOf, OPERATIONS, voiceProgression, arpeggioOrder, playbackEvents,
  searchEntries, reverseLookup, prepareEntries, functionsOf, melodyCheck, KEYS, rotations, QUALITIES,
} from './prog_library.js';
import { ENTRIES, FEEL_TAGS, CATEGORIES, FAMILIES } from './prog_library_data.js';
import { REFERENCES } from './references.js';

const sym = (chords, key = 'C') => realizeAll(chords, key).map((r) => r.symbol).join(' ');
const R = (text) => text.split(' ').map(parseRoman);
const entries = prepareEntries(ENTRIES);
const byId = Object.fromEntries(entries.map((e) => [e.id, e]));

test('digits default to diatonic major triads; 7 is vii°, 3 is iii; marks change quality', () => {
  assert.equal(sym(parseDigits('1234567')), 'C Dm Em F G Am Bdim');
  assert.equal(sym(parseDigits('14736251')), 'C F Bdim Em Am Dm G C');
  assert.equal(sym(parseDigits('3m 3大 6大 4m b7 #5dim7')), 'Em E A Fm Bb G#dim7');
  assert.equal(parseDigits('4-3-6-1').map((c) => romanOf(c)).join(' '), 'IV iii vi I');
  assert.equal(parseDigits('hello'), null);
});

test('case-sensitive Roman numerals keep look-alike chords apart', () => {
  const tones = (r) => realize(parseRoman(r)).tones.map((t) => t.name).join(' ');
  assert.equal(tones('iv(maj7)'), 'F Ab C E', 'IVmΔ7 is F-Ab-C-E');
  assert.equal(tones('iv7'), 'F Ab C Eb', 'IVm7 is F-Ab-C-Eb');
  assert.equal(realize(parseRoman('viiø7')).symbol, 'Bm7b5');
  assert.equal(realize(parseRoman('vii°7')).symbol, 'Bdim7');
  assert.equal(realize(parseRoman('vii°')).symbol, 'Bdim');
  assert.equal(realize(parseRoman('VI7')).symbol, 'A7');
  assert.equal(realize(parseRoman('vi7')).symbol, 'Am7');
  assert.equal(realize(parseRoman('III')).symbol, 'E');
  assert.equal(realize(parseRoman('iii')).symbol, 'Em');
  assert.equal(realize(parseRoman('♭III')).symbol, 'Eb');
  assert.equal(tones('i(add6)'), 'C Eb G A', 'Cm6 is the pop added sixth');
  assert.equal(parseRoman('i6'), null, 'the classical figure i6 is not accepted — inversions use /3 /5 /7');
  assert.equal(realize(parseRoman('I/5')).symbol, 'C/G');
  assert.equal(realize(parseRoman('V/3')).root, 'G', 'G/B keeps G as its root');
  assert.equal(tones('♭II7'), 'Db F Ab Cb', 'Db7 is spelled with Cb');
});

test('the user’s five, image 1 (8), image 2 (8) and image 3 (13) are all present with originals kept', () => {
  const count = (source) => entries.filter((e) => e.source === source).length;
  assert.equal(count('user'), 5);
  assert.equal(count('img1'), 8);
  assert.equal(count('img2'), 8);
  assert.equal(count('img3'), 13);
  ['4361', '14736251', '62514736', '4536251', '15634145'].forEach((d) => assert.ok(entries.find((e) => e.source === 'user' && e.digits === d), d));
  assert.equal(byId['u-62514736'].romanText, 'vi–ii–V–I–IV–vii°–iii–vi');
  assert.equal(romanOf(byId['u-15634145'].chords.at(-1)), 'V', '15634145 keeps its final V');
  assert.equal(romanOf(byId['u-14736251'].chords[2]), 'vii°');
  entries.filter((e) => e.source === 'img1').forEach((e) => assert.ok(e.original?.text && e.original.feel && e.original.scene, e.id));
  entries.filter((e) => e.source === 'img2').forEach((e) => assert.ok(e.original?.text && e.original.feel, e.id));
  entries.filter((e) => e.source === 'img3' || e.source === 'user').forEach((e) => assert.ok(e.suggested && !e.original?.feel, `${e.id}: suggested feel only`));
  assert.equal(sym(byId['i2-IV-ivmM7-iii-vi'].chords), 'F Fm(maj7) Em Am');
  assert.equal(sym(byId['i2-IV-V-iiio7-VI7'].chords), 'F G Em7b5 A7');
  assert.equal(sym(byId['i2-IV-viio7-III-vi'].chords), 'F Bm7b5 E Am');
  assert.equal(sym(byId['i2-IV-V-#vo7-VI7'].chords), 'F G G#dim7 A7');
});

test('rotations of 1564 are all in the library and the minor reading stays separate', () => {
  const rot = rotations(parseDigits('1564')).map((c) => c.map((x) => romanOf(x)).join(' '));
  assert.deepEqual(rot, ['I V vi IV', 'V vi IV I', 'vi IV I V', 'IV I V vi']);
  rot.forEach((r) => assert.ok(entries.find((e) => e.chords.map((c) => romanOf(c)).join(' ') === r && e.mode === 'major'), r));
  assert.equal(sym(byId['i3-6415'].chords), 'Am F C G');
  assert.equal(sym(byId['m-i-bVI-bIII-bVII'].chords), 'Cm Ab Eb Bb');
  assert.notEqual(byId['i3-6415'].mode, byId['m-i-bVI-bIII-bVII'].mode);
});

test('entries are well formed: unique ids, known tags, registered references, parsable chords', () => {
  const ids = new Set();
  const refIds = new Set(REFERENCES.map((r) => r.id));
  entries.forEach((e) => {
    assert.ok(!ids.has(e.id), `duplicate ${e.id}`); ids.add(e.id);
    e.tags.forEach((tag) => assert.ok(FEEL_TAGS[tag], `${e.id}: tag ${tag}`));
    e.cats.forEach((c) => assert.ok(CATEGORIES[c], `${e.id}: category ${c}`));
    assert.ok(FAMILIES[e.family], `${e.id}: family ${e.family}`);
    assert.ok(e.refs.length, `${e.id}: needs a source`);
    e.refs.forEach((r) => assert.ok(refIds.has(r), `${e.id}: unknown ref ${r}`));
    assert.ok(e.theory.zh && e.theory.en, `${e.id}: theory text`);
    if (e.variantOf) assert.ok(byId[e.variantOf.id], `${e.id}: variant of unknown ${e.variantOf.id}`);
    assert.ok(['verified', 'example', 'ambiguous'].includes(e.status));
  });
  // 同一组和弦（同一调式参照）不重复收录
  const seen = new Map();
  entries.forEach((e) => { const k = `${e.mode}|${e.chords.map((c) => romanOf(c)).join(' ')}`; assert.ok(!seen.has(k), `${e.id} duplicates ${seen.get(k)}`); seen.set(k, e.id); });
});

test('seventh rules depend on context instead of adding 7 everywhere', () => {
  assert.equal(sym(versionOf(parseDigits('1234567'), 'seventh').chords), 'Cmaj7 Dm7 Em7 Fmaj7 G7 Am7 Bm7b5');
  assert.equal(sym(versionOf(R('II V I'), 'seventh').chords), 'D7 G7 Cmaj7', 'II as V/V becomes D7, not Dm7');
  const ivI = versionOf(R('IV iv I'), 'seventh');
  assert.equal(sym(ivI.chords), 'Fmaj7 Fm7 Cmaj7');
  assert.ok(ivI.notes[1].alts.some((a) => a.quality === 'mM7'), 'Fm(maj7) is offered as a different colour');
  const minor = versionOf(R('ii° V i'), 'seventh', { mode: 'minor' });
  assert.equal(sym(minor.chords), 'Dm7b5 G7 Cm7');
  assert.ok(minor.notes[2].alts.some((a) => a.quality === 'mM7'), 'Cm(maj7) offered for the minor tonic');
  assert.ok(realize({ ...minor.chords[1] }).tones.some((t) => t.name === 'B'), 'V7 keeps the B natural leading tone');
  const blues = versionOf(byId['bl-12'].chords, 'seventh', { style: 'blues' });
  assert.equal(sym(blues.chords), 'C7 C7 C7 C7 F7 F7 C7 C7 G7 F7 C7 G7', 'blues uses I7 IV7 V7');
  assert.ok(!sym(blues.chords).includes('maj7'));
  const triad = versionOf(R('IV viiø7 iv(maj7)'), 'triad');
  assert.equal(sym(triad.chords), 'F Bdim Fm');
  assert.ok(triad.notes.some((n) => n.note.zh.includes('半减七')) && triad.notes.some((n) => n.note.zh.includes('小大七')));
  assert.ok(byId['b-line-cliche'].noTriad, 'the line cliché does not collapse into four Cm chords');
});

test('the five required step-by-step examples', () => {
  const O = OPERATIONS;
  // 例一 1625
  let c = parseDigits('1625'); const loop = { loop: true };
  const s1 = O.sevenths.apply(c, loop).chords; const s2 = O.applied.apply(s1, loop, { at: 1 }).chords; const s3 = O.tritone.apply(s2, loop).chords;
  assert.equal(sym(s1), 'Cmaj7 Am7 Dm7 G7');
  assert.equal(sym(s2), 'Cmaj7 A7 Dm7 G7');
  assert.equal(sym(s3), 'Cmaj7 Eb7 Dm7 Db7');
  assert.deepEqual(realizeAll(s3).map((r) => r.bassName), ['C', 'Eb', 'D', 'Db'], 'the bass line becomes chromatic');
  // 例二 251：G7 的 B F 与 Db7 的 Cb F 是同一个三全音
  c = parseDigits('251');
  const t1 = O.sevenths.apply(c, {}).chords; const t2 = O.tritone.apply(t1, {}).chords;
  assert.equal(sym(t2), 'Dm7 Db7 Cmaj7');
  const g7 = realize(t1[1]).tones; const db7 = realize(t2[1]).tones;
  assert.deepEqual([g7[1].pc, g7[3].pc].sort(), [db7[1].pc, db7[3].pc].sort(), 'shared tritone');
  assert.deepEqual([g7[1].name, g7[3].name, db7[1].name, db7[3].name], ['B', 'F', 'F', 'Cb']);
  // 例三 4536：Em7 → E7 是引入 G# 的副属改变
  c = O.sevenths.apply(parseDigits('4536'), {}).chords;
  const e7 = O.requality.apply(c, {}, { at: 2 });
  assert.equal(sym(e7.chords), 'Fmaj7 G7 E7 Am7');
  assert.ok(realize(e7.chords[2]).tones.some((t) => t.name === 'G#'));
  assert.ok(!e7.changes[0].why.zh.startsWith('加七音'));
  // 例四 1564 → C G/B Am F，G/B 的最低音真的是 B
  const k = O.bassline.apply(parseDigits('1564'), { key: 'C' }).chords;
  assert.equal(sym(k), 'C G/B Am F');
  const v = voiceProgression(k, { key: 'C' }).voices;
  assert.deepEqual(v.map((x) => ((Math.min(...x.midi) % 12) + 12) % 12), [0, 11, 9, 5]);
  // 例五 IV-iv-I → Fmaj7 Fm7 Bb7 Cmaj7
  const b1 = O.sevenths.apply(R('IV iv I'), {}).chords; const b2 = O.backdoor.apply(b1, {});
  assert.equal(sym(b2.chords), 'Fmaj7 Fm7 Bb7 Cmaj7');
  assert.equal(realizeAll(b2.chords).slice(1).map((r) => r.roman).join('-'), 'iv7-♭VII7-Imaj7');
});

test('inversions really change the lowest MIDI note, in every entry and both voicing styles', () => {
  const c = voiceProgression(R('I'), {}).voices[0]; const cg = voiceProgression(R('I/5'), {}).voices[0];
  assert.notEqual(Math.min(...c.midi) % 12, Math.min(...cg.midi) % 12);
  entries.forEach((e) => ['smooth', 'classical'].forEach((style) => {
    const chords = versionOf(e.chords, 'original').chords;
    const voiced = voiceProgression(chords, { key: 'C', style });
    voiced.voices.forEach((x, i) => assert.equal(((Math.min(...x.midi) % 12) + 12) % 12, x.chord.bassPc, `${e.id} #${i} ${style}`));
  }));
});

test('arpeggios start from the real bass: 3/4 is 1-3-5-1-3-5, C/G is G-C-E-G-C-E, root mode is named separately', () => {
  const names = (ms) => ms.map((m) => ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'][m % 12]).join('-');
  const c = voiceProgression(R('I'), {}).voices[0];
  assert.equal(names(arpeggioOrder(c, { meter: 3 })), 'C-E-G-C-E-G');
  const cg = voiceProgression(R('I/5'), {}).voices[0];
  assert.equal(names(arpeggioOrder(cg, { meter: 3 })), 'G-C-E-G-C-E');
  assert.equal(names(arpeggioOrder(cg, { meter: 3, mode: 'root' })), 'C-E-G-C-E-G');
  const order = arpeggioOrder(c, { meter: 3 });
  assert.ok(order.every((m, i) => i === 0 || m > order[i - 1]), 'rises without turning back');
  const ev = playbackEvents([c], { meter: 3, beats: 3, texture: 'arpeggio' });
  assert.equal(ev.events.length, 6);
  assert.equal(playbackEvents([c], { part: 'bass' }).events[0].midi.length, 1, 'bass only');
});

test('transposition keeps intervals, qualities and letter spelling in every key', () => {
  const chords = R('IV iv(maj7) viiø7 ♯v°7 VI7 ♭VII7 i(add6)');
  const base = realizeAll(chords, 'C').map((r) => r.tones.map((t) => t.interval).join());
  [...KEYS.major, ...KEYS.minor].forEach((key) => {
    const real = realizeAll(chords, key);
    real.forEach((r, i) => {
      assert.equal(r.tones.map((t) => t.interval).join(), base[i], `${key} ${r.symbol}`);
      const letters = r.tones.map((t) => 'CDEFGAB'.indexOf(t.name[0]));
      letters.forEach((l, k) => assert.equal((l - letters[0] + 7) % 7, QUALITIES[r.quality].st[k] % 7, `${key} ${r.symbol}: letter spelling`));
    });
  });
});

test('search: digits, dashes, Roman numerals and chord names; chord names give several keys', () => {
  ['4361', '4-3-6-1', 'IV iii vi I', 'F Em Am C'].forEach((q) => assert.equal(searchEntries(entries, q).results[0].entry.id, 'u-4361', q));
  const keys = reverseLookup(['Am', 'F', 'C', 'G']);
  assert.ok(keys.length >= 2);
  assert.ok(keys.some((k) => k.tonic === 'C' && k.mode === 'major') && keys.some((k) => k.tonic === 'A' && k.mode === 'minor'));
  const rot = searchEntries(entries, '1564').results.map((r) => r.match);
  assert.ok(rot.includes('rotation'));
  assert.ok(searchEntries(entries, '王道').results.length);
});

test('functions keep possibilities open instead of announcing modulations', () => {
  const f = functionsOf(R('ii V iii VI'));
  assert.equal(f[3].label, '?', 'a final VI without its ii stays a possibility');
  assert.ok(f[3].alts[0].zh.includes('V/ii'));
  assert.equal(functionsOf(R('IV V III vi'))[2].label, 'V/vi');
  assert.equal(functionsOf(R('ii7 ♭II7 Imaj7'))[1].label, 'subV');
});

test('melody check marks chord tones, tensions and clashes', () => {
  const res = melodyCheck('A G F', R('IV V I'));
  assert.equal(res[0].role, 'chord');
  assert.equal(res[1].role, 'chord');
  assert.equal(res[2].role, 'clash', 'F over C major is a minor ninth above E');
  assert.equal(melodyCheck('Ab', R('V7'))[0].role, 'tension', 'b9 is usable on a dominant');
});

test('every entry and every generated note has Japanese text', async () => {
  const { FAMILIES: F } = await import('./prog_library_data.js');
  entries.forEach((e) => {
    assert.ok(e.theory.ja, `${e.id}: theory.ja`);
    if (e.limits) assert.ok(e.limits.ja, `${e.id}: limits.ja`);
    if (e.variantOf) assert.ok(e.variantOf.how.ja, `${e.id}: how.ja`);
    if (e.original?.note) assert.ok(e.original.note.ja, `${e.id}: note.ja`);
  });
  Object.entries(F).forEach(([k, v]) => assert.ok(v.ja, `family ${k}`));
  Object.values(OPERATIONS).forEach((op) => assert.ok(op.label.ja && op.label.ja !== op.label.en, `op ${op.label.en}`));
  const s = versionOf(R('IV iv I II V'), 'seventh');
  s.notes.forEach((n) => assert.ok(n.note.ja && n.note.ja !== n.note.en, n.note.en));
  assert.ok(melodyCheck('F', R('I'))[0].label.ja.includes('短 2 度'));
});
