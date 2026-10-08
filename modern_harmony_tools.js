// Original editable examples and calculations. References supply concepts, not scores or recordings.
// ref:rubin-nonfunctional ref:koozin-planing ref:arndt-tonality
// ref:omt2e-normal-order ref:omt2e-prime-form ref:omt2e-ic-vector
// ref:ircam-spectrum ref:ircam-spectral ref:gann-ji ref:gann-ji-reasons
// ref:omt2e-chord-symbols
import { QUALITIES, parseChordSymbol } from './chord_symbols.js';
import { parsePitch, simplestName, formatNote } from './pitch_spelling.js';
import { parseRatio, ratioValue, ratioLabel, centsFromRatio } from './microtonal.js';
import { setClassInfo } from './post_tonal.js';

export const MODERN_TOOL_IDS = ['nonfunctional', 'polytonality', 'atonality', 'spectralharmony', 'microtonalharmony'];
export const SCALES = { major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], whole: [0, 2, 4, 6, 8, 10] };
export const DEFAULTS = {
  nonfunctional: { mode: 'exact', voicing: 'C4 E4 G4', shifts: '0 2 4 1', root: 'C4', scale: 'major', chords: 'C4 E4 G4 | C4 Eb4 Ab4 | B3 E4 G4', pedal: '', bpm: 90 },
  polytonality: { rootA: 'C3', scaleA: 'major', patternA: '1:2 5:1 3:1 1:2', rootB: 'D5', scaleB: 'major', patternB: '1:1 3:1 5:1 4:1 2:1 1:1', repeats: 2, bpm: 100 },
  atonality: { motif: 'C4 Db4 G4 E4', transform: 'T', transpose: 3, pivot: 'C4', bpm: 100 },
  spectralharmony: { fundamental: 110, partials: '4:1:0 5:0.8:0 6:0.7:0 7:0.5:0 11:0.3:0', morph: 100, bpm: 60 },
  microtonalharmony: { fundamental: 220, ratiosA: '1/1 5/4 3/2', ratiosB: '1/1 5/4 3/2', rootRatio: '4/3', edo: 19, bpm: 60 },
};
export const PRESETS = {
  nonfunctional: [
    { ...DEFAULTS.nonfunctional },
    { ...DEFAULTS.nonfunctional, mode: 'diatonic', shifts: '0 1 2 3' },
    { ...DEFAULTS.nonfunctional, mode: 'manual', pedal: 'C3' },
  ],
  polytonality: [
    { ...DEFAULTS.polytonality },
    { ...DEFAULTS.polytonality, rootB: 'F#5' },
    { ...DEFAULTS.polytonality, rootB: 'C5', scaleB: 'minor' },
  ],
  atonality: [
    { ...DEFAULTS.atonality },
    { ...DEFAULTS.atonality, transform: 'I', pivot: 'E4' },
    { ...DEFAULTS.atonality, transform: 'RI', transpose: 0 },
  ],
  spectralharmony: [
    { ...DEFAULTS.spectralharmony },
    { ...DEFAULTS.spectralharmony, partials: '1:1:0 2:0.7:12 3:0.6:25 4:0.5:40 5:0.4:60' },
    { ...DEFAULTS.spectralharmony, partials: '7:1:0 9:0.8:0 11:0.6:0 13:0.5:0' },
  ],
  microtonalharmony: [
    { ...DEFAULTS.microtonalharmony },
    { ...DEFAULTS.microtonalharmony, ratiosA: '1/1 5/4 3/2 7/4', ratiosB: '1/1 5/4 3/2 7/4', edo: 31 },
    { ...DEFAULTS.microtonalharmony, rootRatio: '1/1', ratiosB: '1/1 81/64 3/2', edo: 12 },
  ],
};
export class ToolInputError extends Error {
  constructor(code, token = '') { super(code); this.code = code; this.token = String(token).slice(0, 36); }
}
export function numberIn(value, min, max, integer = false) {
  const n = typeof value === 'string' && !value.trim() ? NaN : Number(value);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) throw new ToolInputError('range', `${min}…${max}`);
  return n;
}
const tokens = (text, max = 32) => {
  const parts = String(text).trim().split(/[\s,，;；]+/).filter(Boolean);
  if (!parts.length || parts.length > max) throw new ToolInputError('count', `1…${max}`);
  return parts;
};
export const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
export const pc = (midi) => ((midi % 12) + 12) % 12;
export const noteLabel = (midi) => simplestName(pc(midi), false) + (Math.floor(midi / 12) - 1);
const checkMidi = (midi) => numberIn(midi, 12, 119, true);
export function pitchInput(text) {
  const p = parsePitch(text);
  if (!p || p.midi < 12 || p.midi > 119) throw new ToolInputError('pitch', text);
  return p.midi;
}
export const parseNotes = (text, max = 16) => tokens(text, max).map(pitchInput);
export function chordSymbolNotes(text) {
  const chord = parseChordSymbol(String(text));
  if (!chord || chord.realization) throw new ToolInputError('chordSymbol', text);
  return parseNotes(chord.pitches.join(' '));
}
const pcsOf = (notes) => [...new Set(notes.map(pc))].sort((a, b) => a - b);
const event = (notes, at, duration, index) => ({ frequencies: notes.map(hz), at, duration, index });
function scaleOf(root, name) {
  const scale = SCALES[name];
  if (!scale) throw new ToolInputError('scale', name);
  return { root: pitchInput(root), steps: scale };
}
function diatonicPosition(midi, root, steps) {
  const distance = midi - root, octave = Math.floor(distance / 12);
  const degree = steps.indexOf(pc(distance));
  if (degree < 0) throw new ToolInputError('outsideScale', noteLabel(midi));
  return octave * steps.length + degree;
}
function scalePitch(position, root, steps) {
  return checkMidi(root + 12 * Math.floor(position / steps.length) + steps[((position % steps.length) + steps.length) % steps.length]);
}
/** Exact pitch-class matches only: never invent missing thirds, fifths or roots. */
export function voicingChordNames(notes, { spelled = '', bass = Math.min(...notes) } = {}) {
  const pitches = pcsOf(notes), bassPc = pc(bass);
  const spellings = new Map();
  for (const text of String(spelled).trim().split(/[\s,，;；|]+/)) {
    const pitch = parsePitch(text);
    if (pitch && !spellings.has(pitch.pc)) spellings.set(pitch.pc, formatNote(pitch.step, pitch.accidental));
  }
  const preferFlats = /[b♭]/.test(spelled);
  const name = pitchClass => spellings.get(pitchClass) || simplestName(pitchClass, preferFlats);
  const roots = [...pitches].sort((a,b) => Number(b === bassPc) - Number(a === bassPc) || a-b);
  const names = [];
  for (const root of roots) {
    const offsets = pitches.map(n => pc(n-root)).sort((a,b)=>a-b);
    for (const quality of QUALITIES) {
      if (quality.random || quality.id === 'blk') continue;
      const expected = [...new Set(quality.tones.map(([,n])=>pc(n)))].sort((a,b)=>a-b);
      if (offsets.length === expected.length && offsets.every((n,i)=>n === expected[i])) {
        names.push(name(root) + quality.suffix + (bassPc === root ? '' : '/' + name(bassPc)));
      }
    }
  }
  return [...new Set(names)];
}
export function nonfunctionalModel(input) {
  let chords, spellingGroups;
  if (input.mode === 'manual') {
    const groups = String(input.chords).split('|');
    if (groups.length < 2 || groups.length > 16) throw new ToolInputError('count', '2…16');
    chords = groups.map((group) => parseNotes(group));
    spellingGroups = groups;
  } else {
    const base = parseNotes(input.voicing);
    spellingGroups = null;
    const shifts = tokens(input.shifts, 16).map((s) => numberIn(s, -24, 24, true));
    if (input.mode === 'exact') chords = shifts.map((shift) => base.map((n) => checkMidi(n + shift)));
    else if (input.mode === 'diatonic') {
      const { root, steps } = scaleOf(input.root, input.scale);
      const positions = base.map((n) => diatonicPosition(n, root, steps));
      chords = shifts.map((shift) => positions.map((p) => scalePitch(p + shift, root, steps)));
    } else throw new ToolInputError('mode');
  }
  const pedal = String(input.pedal).trim() ? pitchInput(input.pedal) : null;
  if (chords.some((notes) => new Set(pedal === null ? notes : [pedal, ...notes]).size > 16)) throw new ToolInputError('count', '1…16');
  const rows = chords.map((notes, index) => {
    const previous = chords[index - 1];
    const intervals = notes.map((n) => n - notes[0]);
    const common = previous ? pcsOf(notes).filter((n) => pcsOf(previous).includes(n)) : [];
    const movement = previous?.length === notes.length ? notes.map((n, i) => n - previous[i]) : null;
    const bass = Math.min(...notes, ...(pedal === null ? [] : [pedal]));
    const chordNames = voicingChordNames(notes, { bass, spelled: `${spellingGroups ? spellingGroups[index] : input.voicing} ${input.pedal || ''}` });
    return { notes, intervals, common, movement, index, chordNames };
  });
  return { rows, events: rows.map((row) => event(pedal === null ? row.notes : [pedal, ...row.notes], row.index * 2, 1.8, row.index)), pedal };
}
function pattern(text, root, steps, repeats) {
  let at = 0;
  const source = tokens(text, 32).map((s) => {
    const m = s.match(/^(r|\d{1,2}|[A-G][#b♯♭x]{0,2}[0-8])(?::(\d+(?:\.\d+)?))?$/i);
    if (!m) throw new ToolInputError('pattern', s);
    const duration = m[2] === undefined ? 1 : numberIn(m[2], .25, 4);
    const midi = m[1].toLowerCase() === 'r' ? null : /^[A-G]/i.test(m[1]) ? pitchInput(m[1]) : scalePitch(numberIn(m[1], 1, 15, true) - 1, root, steps);
    return { midi, duration };
  });
  const rows = [];
  for (let pass = 0; pass < repeats; pass++) for (const row of source) { rows.push({ ...row, at, index: rows.length }); at += row.duration; }
  return { rows, length: at, pcs: pcsOf(source.filter((row) => row.midi !== null).map((row) => row.midi)) };
}
export function polytonalityModel(input) {
  const repeats = numberIn(input.repeats, 1, 4, true);
  const aScale = scaleOf(input.rootA, input.scaleA), bScale = scaleOf(input.rootB, input.scaleB);
  const a = pattern(input.patternA, aScale.root, aScale.steps, repeats);
  const b = pattern(input.patternB, bScale.root, bScale.steps, repeats);
  const eventsFor = (layer, name) => layer.rows.filter((row) => row.midi !== null).map((row) => ({ ...event([row.midi], row.at, row.duration * .9, row.index), layer: name }));
  const eventsA = eventsFor(a, 'A'), eventsB = eventsFor(b, 'B');
  return { a, b, eventsA, eventsB, events: [...eventsA, ...eventsB].sort((x, y) => x.at - y.at), union: [...new Set([...a.pcs, ...b.pcs])].sort((x, y) => x - y), sameCenter: pc(aScale.root) === pc(bScale.root) };
}
export function atonalityModel(input) {
  const source = parseNotes(input.motif, 32);
  const shift = numberIn(input.transpose, -24, 24, true), pivot = pitchInput(input.pivot);
  let notes;
  switch (input.transform) {
    case 'T': notes = source.map((n) => n + shift); break;
    case 'I': notes = source.map((n) => 2 * pivot - n + shift); break;
    case 'R': notes = [...source].reverse().map((n) => n + shift); break;
    case 'RI': notes = [...source].reverse().map((n) => 2 * pivot - n + shift); break;
    default: throw new ToolInputError('mode');
  }
  notes.forEach(checkMidi);
  const gaps = (list) => list.slice(1).map((n, i) => n - list[i]);
  return { source, notes, gaps: gaps(notes), sourceGaps: gaps(source), info: setClassInfo(notes), sourceInfo: setClassInfo(source), events: notes.map((n, i) => event([n], i, .85, i)), original: source.map((n, i) => event([n], i, .85, i)) };
}
export function nearestTwelve(hertz) {
  const position = 69 + 12 * Math.log2(hertz / 440), midi = Math.round(position);
  return { midi, note: noteLabel(midi), deviation: (position - midi) * 100 };
}
function checkHz(value) { return numberIn(value, 20, 12000); }
export function spectralModel(input) {
  const fundamental = numberIn(input.fundamental, 20, 1000), morph = numberIn(input.morph, 0, 100) / 100;
  const rows = (String(input.partials).trim() ? tokens(input.partials, 16) : []).map((text, index) => {
    // The first field is a frequency multiplier, not necessarily an integer harmonic.
    const m = text.match(/^(\d+(?:\.\d+)?(?:\/\d+)?)(?::(\d+(?:\.\d+)?))?(?::([+-]?\d+(?:\.\d+)?))?$/);
    if (!m) throw new ToolInputError('partial', text);
    const [numerator, denominator = '1'] = m[1].split('/');
    const n = numberIn(Number(numerator) / numberIn(denominator, 1, 999), 1 / 32, 32);
    if (m[1].includes('/')) numberIn(numerator, 1, 999, true);
    const amplitude = m[2] === undefined ? Math.min(1, 1 / Math.sqrt(n)) : numberIn(m[2], 0, 1);
    const offset = m[3] === undefined ? 0 : numberIn(m[3], -600, 600);
    const ratio = n * 2 ** (offset * morph / 1200), frequency = checkHz(fundamental * ratio);
    return { n, label: m[1], amplitude, targetOffset: offset, offset: offset * morph, ratio, frequency, cents: 1200 * Math.log2(ratio), nearest: nearestTwelve(frequency), index };
  });
  const audible = rows.filter(row => row.amplitude > 0);
  const partialEvent = (row) => ({ frequencies: [row.frequency], amplitudes: [row.amplitude], at: row.index, duration: .9, index: row.index, timbre: 'sine' });
  return { rows, events: [...audible].sort((a,b) => a.frequency - b.frequency).map((row,order) => ({ ...partialEvent(row), at:order })), chord: audible.length ? [{ frequencies: rows.map((r) => r.frequency), amplitudes: rows.map((r) => r.amplitude), at: 0, duration: 3, index: 0, all: true, timbre: 'sine' }] : [], approximation: audible.length ? [{ frequencies: rows.map((r) => hz(r.nearest.midi)), amplitudes: rows.map((r) => r.amplitude), at: 0, duration: 3, index: 0, all: true, timbre: 'sine' }] : [] };
}
// Validate the whole candidate before replacing the current spectrum or its saved draft.
export function addSpectralComponent(input, { ratio, amplitude = .5, offset = 0 }) {
  const label = String(ratio).trim();
  if (!/^(\d+(?:\.\d+)?(?:\/\d+)?)$/.test(label)) throw new ToolInputError('partial', label);
  const token = label + ':' + numberIn(amplitude, 0, 1) + ':' + numberIn(offset, -600, 600);
  const next = { ...input, partials: [String(input.partials).trim(), token].filter(Boolean).join(' ') };
  spectralModel(next);
  return next;
}
export function removeSpectralComponent(input, index) {
  const current = spectralModel(input);
  const position = numberIn(index, 0, current.rows.length - 1, true);
  const next = { ...input, partials: tokens(input.partials, 16).filter((_,i) => i !== position).join(' ') };
  spectralModel(next);
  return next;
}
export function microtonalModel(input) {
  const fundamental = numberIn(input.fundamental, 20, 1000), edo = numberIn(input.edo, 5, 120, true);
  function getRatio(text) { try { return parseRatio(text); } catch { throw new ToolInputError('ratio', text); } }
  const rootRatio = ratioValue(getRatio(input.rootRatio));
  const build = (text, root, layer) => tokens(text, 16).map((token, index) => {
    const ratio = getRatio(token), frequency = checkHz(fundamental * root * ratioValue(ratio));
    const cents = 1200 * Math.log2(root) + centsFromRatio(ratio);
    const step = Math.round(cents * edo / 1200), temperedHz = checkHz(fundamental * 2 ** (step / edo));
    return { ratio: ratioLabel(ratio), cents, frequency, step, temperedHz, error: step * 1200 / edo - cents, layer, index };
  });
  const a = build(input.ratiosA, 1, 'A'), b = build(input.ratiosB, rootRatio, 'B');
  const commonHz = [...new Set(a.filter((x) => b.some((y) => Math.abs(Math.log2(x.frequency / y.frequency)) < 1e-10)).map((x) => x.frequency))];
  const commonSteps = [...new Set(a.filter((x) => b.some((y) => x.step === y.step)).map((x) => x.step))];
  const chord = (rows, tempered, at, index) => ({ frequencies: rows.map((row) => tempered ? row.temperedHz : row.frequency), timbre: 'sine', at, duration: 2, index });
  return { a, b, edo, commonHz, commonSteps, just: [chord(a, false, 0, 0), chord(b, false, 3, 1)], tempered: [chord(a, true, 0, 0), chord(b, true, 3, 1)] };
}
export const MODEL_OF = { nonfunctional: nonfunctionalModel, polytonality: polytonalityModel, atonality: atonalityModel, spectralharmony: spectralModel, microtonalharmony: microtonalModel };

/** One owner for queue, sounding voices and highlights. Editing, navigation and Esc call stop(). */
export function createToolPlayer({ sound, silence, onEvent = () => {}, onRelease = () => {}, onEnd = () => {}, setTimer = setTimeout, clearTimer = clearTimeout }) {
  let timers = [], generation = 0, voices = [], active = false;
  function stop() {
    generation++;
    timers.forEach(clearTimer); timers = [];
    voices.forEach((voice) => voice?.stop?.()); voices = [];
    if (active) silence?.();
    active = false;
    onEnd();
  }
  function play(events, bpm = 90) {
    const seconds = 60 / numberIn(bpm, 30, 240);
    stop();
    if (!events.length) return;
    active = true;
    const current = generation;
    const sorted = [...events].sort((a, b) => a.at - b.at);
    sorted.forEach((item, index) => {
      const trigger = () => {
        if (current !== generation) return;
        const voice = sound(item, item.duration * seconds, index === 0);
        if (voice) voices.push(voice);
        onEvent(item);
        timers.push(setTimer(() => { if (current === generation) onRelease(item); }, item.duration * seconds * 1000));
      };
      if (item.at === 0) trigger(); // AudioContext is unlocked by the user gesture.
      else timers.push(setTimer(trigger, item.at * seconds * 1000));
    });
    const end = Math.max(...sorted.map((item) => item.at + item.duration));
    timers.push(setTimer(() => { if (current === generation) stop(); }, end * seconds * 1000 + 100));
  }
  return { play, stop, get active() { return active; } };
}
