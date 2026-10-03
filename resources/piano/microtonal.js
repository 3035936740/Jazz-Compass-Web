/** Ratio-first microtonal calculations. EDO is a quantization of JI, not JI itself. */
export const MICRO_PRESETS = Object.freeze({
  major: { ratios: ["1/1", "5/4", "3/2"], dimension: "3D" },
  minor: { ratios: ["1/1", "6/5", "3/2"], dimension: "3D" },
  septimal: { ratios: ["1/1", "3/2", "7/4"], dimension: "4D" },
  undecimal: { ratios: ["1/1", "3/2", "11/6"], dimension: "5D" },
  majorScale: { ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "5/3", "15/8", "2/1"], dimension: "3D" },
});

const PRIMES = [2, 3, 5, 7, 11, 13];

function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

export function parseRatio(value) {
  const match = String(value).trim().match(/^(\d{1,4})\s*[:/]\s*(\d{1,4})$/);
  if (!match) throw new Error("Ratio must be two positive integers, e.g. 3/2.");
  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  if (!numerator || !denominator || numerator > 999 || denominator > 999) {
    throw new Error("Ratio integers must be between 1 and 999.");
  }
  const divisor = gcd(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

export function ratioValue(ratio) {
  return ratio.numerator / ratio.denominator;
}

export function ratioBetween(from, to) {
  const numerator = to.numerator * from.denominator;
  const denominator = to.denominator * from.numerator;
  const divisor = gcd(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

export function ratioLabel(ratio) {
  return `${ratio.numerator}/${ratio.denominator}`;
}

export function centsFromRatio(ratio) {
  return 1200 * Math.log2(ratioValue(ratio));
}

export function octavePosition(ratio) {
  const octaves = Math.floor(Math.log2(ratioValue(ratio)));
  return { octaves, position: ratioValue(ratio) / 2 ** octaves };
}

/** Preserve the exact rational value while placing its pitch class in [1, 2). */
export function foldRatioToOctave(ratio) {
  let numerator = ratio.numerator;
  let denominator = ratio.denominator;
  let octaveShift = 0;
  while (numerator < denominator) { numerator *= 2; octaveShift++; }
  while (numerator >= 2 * denominator) { denominator *= 2; octaveShift--; }
  const divisor = gcd(numerator, denominator);
  return { ratio: { numerator: numerator / divisor, denominator: denominator / divisor }, octaveShift };
}

/** Reduced odd-ratio lattice at a stated complexity bound, not a transcription. */
export function extendedJustRatios(maxProduct = 63) {
  if (![63, 255].includes(maxProduct)) throw new Error("Unsupported ratio complexity.");
  const allowedPrimes = [3, 5, 7, 11, 13];
  const withinLimit = value => {
    for (const prime of allowedPrimes) while (value % prime === 0) value /= prime;
    return value === 1;
  };
  const ratios = [];
  for (let numerator = 1; numerator <= 63; numerator += 2) {
    if (!withinLimit(numerator)) continue;
    for (let denominator = 1; denominator <= 63; denominator += 2) {
      if (numerator * denominator > maxProduct || !withinLimit(denominator)) continue;
      if (gcd(numerator, denominator) !== 1) continue;
      ratios.push({ numerator, denominator });
    }
  }
  return ratios;
}

function primePowers(integer) {
  let remainder = integer;
  const powers = new Map();
  for (const prime of PRIMES) {
    let exponent = 0;
    while (remainder % prime === 0) {
      remainder /= prime;
      exponent++;
    }
    powers.set(prime, exponent);
  }
  return remainder === 1 ? powers : null;
}

/** Generator mode preserves compound 2/3/5/7/11/13-limit relationships. */
export function quantizeRatio(ratio, edo, method = "generator") {
  if (!Number.isInteger(edo) || edo < 1 || edo > 93) throw new Error("EDO must be 1–93.");
  const exactCents = centsFromRatio(ratio);
  const directSteps = Math.round(exactCents * edo / 1200);
  let steps = directSteps;
  let appliedMethod = "direct";
  if (method === "generator") {
    const numeratorPowers = primePowers(ratio.numerator);
    const denominatorPowers = primePowers(ratio.denominator);
    if (numeratorPowers && denominatorPowers) {
      steps = PRIMES.reduce((sum, prime) =>
        sum + (numeratorPowers.get(prime) - denominatorPowers.get(prime)) * Math.round(edo * Math.log2(prime)), 0);
      appliedMethod = "generator";
    }
  } else if (method !== "direct") {
    throw new Error("Unknown quantization method.");
  }
  const temperedCents = steps * 1200 / edo;
  return { steps, directSteps, exactCents, temperedCents, errorCents: temperedCents - exactCents, appliedMethod };
}

export function frequencyForRatio(rootHz, ratio, edo = null, method = "generator") {
  if (!Number.isFinite(rootHz) || rootHz < 20 || rootHz > 2000) throw new Error("Root frequency must be 20–2000 Hz.");
  return edo == null ? rootHz * ratioValue(ratio) : rootHz * 2 ** (quantizeRatio(ratio, edo, method).steps / edo);
}

export const PIANO_88_MIN_MIDI = 21;
export const PIANO_88_MAX_MIDI = 108;

export function midiNoteLabel(midiNote) {
  if (!Number.isInteger(midiNote) || midiNote < 0 || midiNote > 127) throw new Error("MIDI note must be an integer from 0 to 127.");
  const names = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  return `${names[midiNote % 12]}${Math.floor(midiNote / 12) - 1}`;
}

/** MIDI note frequency anchored to the same configurable C4 used by the ratio lab. */
export function midiNoteFrequency(midiNote, c4Hz = 261.63, centsOffset = 0) {
  if (!Number.isInteger(midiNote) || midiNote < 0 || midiNote > 127) throw new Error("MIDI note must be an integer from 0 to 127.");
  return midiPositionFrequency(midiNote, c4Hz, centsOffset);
}

export function midiPositionFrequency(midiPosition, c4Hz = 261.63, centsOffset = 0) {
  if (!Number.isFinite(midiPosition) || midiPosition < 0 || midiPosition > 127) throw new Error("MIDI position must be between 0 and 127.");
  if (!Number.isFinite(c4Hz) || c4Hz < 20 || c4Hz > 2000) throw new Error("C4 frequency must be 20–2000 Hz.");
  if (!Number.isFinite(centsOffset) || centsOffset < -1200 || centsOffset > 1200) throw new Error("Cent offset must be between -1200 and 1200.");
  return c4Hz * 2 ** ((midiPosition - 60) / 12 + centsOffset / 1200);
}

export function piano88Notes() {
  return Array.from({ length: PIANO_88_MAX_MIDI - PIANO_88_MIN_MIDI + 1 }, (_, index) => {
    const midi = PIANO_88_MIN_MIDI + index;
    return { midi, label: midiNoteLabel(midi), black: [1, 3, 6, 8, 10].includes(midi % 12) };
  });
}

export function decodeMidiMessage(data, bendRangeCents = 200) {
  if (!data || data.length < 2 || !Number.isFinite(bendRangeCents) || bendRangeCents <= 0) return null;
  const [statusByte, data1 = 0, data2 = 0] = data;
  const command = statusByte & 0xf0;
  const channel = (statusByte & 0x0f) + 1;
  if (command === 0x90 && data2 > 0) return { type: "noteOn", note: data1, velocity: data2, channel };
  if (command === 0x80 || (command === 0x90 && data2 === 0)) return { type: "noteOff", note: data1, velocity: data2, channel };
  if (command === 0xe0) {
    const value = (data2 << 7) | data1;
    const normalized = value >= 8192 ? (value - 8192) / 8191 : (value - 8192) / 8192;
    return { type: "pitchBend", value, cents: normalized * bendRangeCents, channel };
  }
  return null;
}

/** Keep held polyphonic piano voices independent across successive note events. */
export function syncPianoVoices(voices, positions, frequencyAt, createVoice, velocity = 100) {
  const needed = new Set([...positions].sort((a, b) => a - b).slice(0, 16));
  for (const [position, voice] of voices) {
    if (!needed.has(position)) {
      voice.stop();
      voices.delete(position);
    }
  }
  for (const position of needed) {
    const frequency = frequencyAt(position);
    if (!voices.has(position)) voices.set(position, createVoice(frequency, velocity));
    else voices.get(position).setFrequency(frequency);
  }
  return voices;
}

export function harmonicSeries(count = 16) {
  if (!Number.isInteger(count) || count < 1 || count > 64) throw new Error("Harmonic count must be 1–64.");
  return Array.from({ length: count }, (_, index) => {
    const harmonic = index + 1;
    const octave = Math.floor(Math.log2(harmonic));
    const ratio = parseRatio(`${harmonic}/${2 ** octave}`);
    return { harmonic, ratio, octave };
  });
}

export function syntonicComma() {
  return parseRatio("81/80");
}

// Physical-looking C–C keyboard: white-key centres are evenly spaced;
// black-key centres sit between them. Interpolation leaves microtonal gaps clickable.
const KEYBOARD_SEMITONE_X = [0.5, 1, 1.5, 2, 2.5, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7.5];

export function centsToKeyboardPercent(cents) {
  if (!Number.isFinite(cents)) throw new Error("Cents must be finite.");
  const semitones = Math.min(12, Math.max(0, cents / 100));
  const lower = Math.min(11, Math.floor(semitones));
  const fraction = semitones - lower;
  return (KEYBOARD_SEMITONE_X[lower] + fraction * (KEYBOARD_SEMITONE_X[lower + 1] - KEYBOARD_SEMITONE_X[lower])) * 100 / 8;
}

export function keyboardPercentToCents(percent) {
  if (!Number.isFinite(percent)) throw new Error("Keyboard position must be finite.");
  const x = Math.min(7.5, Math.max(0.5, percent * 8 / 100));
  const upper = KEYBOARD_SEMITONE_X.findIndex(anchor => anchor >= x);
  if (upper <= 0) return 0;
  const lower = upper - 1;
  return (lower + (x - KEYBOARD_SEMITONE_X[lower]) / (KEYBOARD_SEMITONE_X[upper] - KEYBOARD_SEMITONE_X[lower])) * 100;
}
