// 音名 ↔ 频率换算与和弦排列（十二平均律，A4 = 440 Hz）；从 script.js 拆出
import { parsePitch } from './pitch_spelling.js';

// 保持原有的音符转频率函数
function noteToFrequency(noteName) {
  const noteMap = {
    C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4,
    F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9,
    "A#": 10, Bb: 10, B: 11,
  };

  const match = noteName.match(/^([A-G][#b]?)(\d)?$/);
  if (!match) return 440;

  const note = match[1];
  const octave = match[2] ? parseInt(match[2]) : 4;

  const semitone = noteMap[note];
  if (semitone === undefined) return 440;

  const midiNote = semitone + (octave + 1) * 12;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

/**
 * 将音符名转换为半音值（0-11）
 */
function noteToSemitoneValue(noteName) {
  const noteMap = {
    C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4,
    F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9,
    "A#": 10, Bb: 10, B: 11,
  };

  // 按音级拼写后会出现 Cb、E#、Fb、B#、重升重降等写法，交给通用解析
  return noteMap[noteName] ?? parsePitch(`${String(noteName).trim()}4`)?.pc;
}

/**
 * 根据半音值和八度直接计算频率
 * @param {number} semitone - 半音值 (0-11)
 * @param {number} octave - 八度，C4 的 MIDI 编号为 60
 * @returns {number} 频率
 */
function semitoneToFreq(semitone, octave) {
  // MIDI 编号：C0 = 12, C4 = 60
  const midiNote = semitone + (octave + 1) * 12;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function semitoneToMidi(semitone, octave) {
  return semitone + (octave + 1) * 12;
}

function resolveRootOctave(semitone, baseOctave, lastRootMidi, voiceLeading = "ascending") {
  if (lastRootMidi == null) return baseOctave;

  if (voiceLeading === "nearest") {
    const minMidi = semitoneToMidi(0, baseOctave);
    const maxMidi = semitoneToMidi(11, baseOctave);
    const candidates = [];

    for (let octave = baseOctave - 2; octave <= baseOctave + 2; octave++) {
      const midi = semitoneToMidi(semitone, octave);
      candidates.push({ octave, midi });
    }

    const rangedCandidates = candidates.filter(({ midi }) => midi >= minMidi && midi <= maxMidi);
    const availableCandidates = rangedCandidates.length ? rangedCandidates : candidates;
    let bestOctave = baseOctave;
    let bestDistance = Infinity;

    availableCandidates.forEach(({ octave, midi }) => {
      const distance = Math.abs(midi - lastRootMidi);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestOctave = octave;
      }
    });

    return bestOctave;
  }

  let octave = baseOctave;
  while (semitoneToMidi(semitone, octave) <= lastRootMidi) {
    octave += 1;
  }
  return octave;
}

/**
 * 和弦频率：以 i 级（表第一行）为基准八度，后续级根音 MIDI 严格高于前一级
 * @param {number|null} lastRootMidi - 上一行和弦根音 MIDI，首行传 null
 * @returns {{ freqs: number[], rootMidi: number|null }}
 */
function chordNotesToFrequencies(
  notes,
  baseOctave = 4,
  multiOctave = false,
  lastRootMidi = null,
  options = {},
) {
  const freqs = [];
  let prevSemitone = null;
  let octave = baseOctave;
  let rootMidi = null;

  notes.forEach((note, idx) => {
    const semitone = noteToSemitoneValue(note);
    if (semitone === undefined) return;

    if (idx === 0) {
      if (lastRootMidi != null) {
        octave = resolveRootOctave(semitone, baseOctave, lastRootMidi, options.voiceLeading);
      }
      rootMidi = semitoneToMidi(semitone, octave);
    } else if (prevSemitone !== null && semitone <= prevSemitone) {
      octave += 1;
    }

    freqs.push(semitoneToFreq(semitone, octave));

    if (multiOctave) {
      freqs.push(semitoneToFreq(semitone, octave - 1));
      freqs.push(semitoneToFreq(semitone, octave - 2));
      freqs.push(semitoneToFreq(semitone, octave + 1));
      freqs.push(semitoneToFreq(semitone, octave + 2));
    }

    prevSemitone = semitone;
  });

  return { freqs, rootMidi };
}

export { noteToFrequency, noteToSemitoneValue, semitoneToFreq, semitoneToMidi, resolveRootOctave, chordNotesToFrequencies };
