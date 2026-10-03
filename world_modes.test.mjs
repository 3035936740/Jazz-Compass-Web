import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AJNAS, MAQAMAT, buildMaqam, maqamSteps, parseQuarterToneNote, quarterToneFrequency,
  THAATS, thaatSemitones, findThaat, thaatAltered,
  TURKISH_TONES, TURKISH_MAKAMS, komaSteps, komaCents, turkishKoma,
} from './world_modes.js';

const qtSteps = (tokens) => tokens.slice(1).map((token, i) => parseQuarterToneNote(token).qt - parseQuarterToneNote(tokens[i]).qt);

// ref:maqamworld-jins 每个 jins 的音程（MaqamWorld 记谱图下方标注的 1、¾、½、1½）
test('ajnas intervals match the MaqamWorld jins pages', () => {
  assert.deepEqual(AJNAS.rast.steps, [4, 3, 3, 4]);
  assert.deepEqual(AJNAS.nikriz.steps, [4, 2, 6, 2]);
  assert.deepEqual(AJNAS.sikah.steps, [3, 4]);
  assert.deepEqual(AJNAS.hijaz.steps, [2, 6, 2]);
  assert.deepEqual(AJNAS.ajam.steps, [4, 4, 2, 4]);
  assert.deepEqual(AJNAS.nahawand.steps, [4, 2, 4, 4]);
});

test('each maqam segment is a transposition of its jins', () => {
  Object.entries(MAQAMAT).forEach(([id, maqam]) => maqam.segments.forEach((segment) => segment.options.forEach((option) => {
    const jins = AJNAS[option.jins];
    if (!jins) return; // upper-rast / upper-ajam：上方音组（只取前四音）
    const steps = qtSteps(option.notes);
    assert.deepEqual(steps, jins.steps.slice(0, steps.length), `${id} ${option.jins}`);
    assert.equal(option.hz.length, option.notes.length, `${id} ${option.jins} hz`);
  })));
});

test('maqam scales transcribed from MaqamWorld', () => {
  const tokens = (id, choice) => buildMaqam(id, choice).map((note) => note.token);
  assert.deepEqual(tokens('rast'), ['C4', 'D4', 'Ehb4', 'F4', 'G4', 'A4', 'Bhb4', 'C5']);
  assert.deepEqual(tokens('rast', [0, 1]), ['C4', 'D4', 'Ehb4', 'F4', 'G4', 'A4', 'Bb4', 'C5']);
  // 维基百科 Arabic maqam 引 Touma：Bayati 音列 D E½♭ F G A B♭ C D  ref:wiki-arabic-maqam
  assert.deepEqual(tokens('bayati'), ['D4', 'Ehb4', 'F4', 'G4', 'A4', 'Bb4', 'C5', 'D5']);
  assert.deepEqual(tokens('saba'), ['D4', 'Ehb4', 'F4', 'Gb4', 'A4', 'Bb4', 'C5', 'D5']);
  assert.deepEqual(tokens('saba', [0, 0, 1]), ['D4', 'Ehb4', 'F4', 'Gb4', 'A4', 'Bb4', 'C5', 'Db5', 'E5', 'F5']);
  assert.deepEqual(tokens('sikah'), ['Ehb4', 'F4', 'G4', 'A4', 'Bhb4', 'C5', 'D5', 'Ehb5']);
  assert.deepEqual(tokens('nahawand'), ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'B4', 'C5']);
});

test('the joining note of consecutive segments keeps the same frequency', () => {
  Object.entries(MAQAMAT).forEach(([id, maqam]) => {
    maqam.segments.slice(1).forEach((segment, index) => {
      const previous = maqam.segments[index].options[0];
      const offset = segment.degree - maqam.segments[index].degree;
      segment.options.forEach((option) => {
        assert.equal(option.notes[0], previous.notes[offset], `${id} ${option.jins}`);
        assert.equal(option.hz[0], previous.hz[offset], `${id} ${option.jins} hz`);
      });
    });
  });
  // MaqamWorld 的播放频率并非固定音高：同一个 A♭ 在 Hijaz 中为 423 Hz，在 Kurd 中为 420 Hz
  const [hijaz, kurd] = MAQAMAT.nahawand.segments[1].options;
  assert.deepEqual([hijaz.hz[1], kurd.hz[1]], [423, 420]);
});

test('24-TET notation vs MaqamWorld pitches: the half-flat third of Rast', () => {
  assert.equal(Math.round(quarterToneFrequency('A4')), 440);
  const steps = maqamSteps(buildMaqam('rast'));
  assert.equal(steps[1].quarterTones, 3);
  // MaqamWorld 播放器的 E½♭ 比 24 平均的 350 音分略高
  const third = 1200 * Math.log2(320 / 260.74);
  assert.ok(third > 350 && third < 360, String(third));
});

// ref:wiki-thaat 表中各 thaat 在 C 上的西方音名
test('thaats match the Wikipedia table', () => {
  const names = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const inC = (id) => thaatSemitones(id).map((s) => names[s]).join(' ');
  assert.equal(inC('bilaval'), 'C D E F G A B');
  assert.equal(inC('bhairav'), 'C Db E F G Ab B');
  assert.equal(inC('poorvi'), 'C Db E F# G Ab B');
  assert.equal(inC('marva'), 'C Db E F# G A B');
  assert.equal(inC('todi'), 'C Db Eb F# G Ab B');
  assert.equal(Object.keys(THAATS).length, 10);
  assert.deepEqual(thaatAltered('todi'), ['r', 'g', "M'", 'd']);
});

test('32 combinations, ten of them named thaats', () => {
  let named = 0;
  for (let mask = 0; mask < 32; mask += 1) {
    const choices = [['r', 'R'], ['g', 'G'], ['M', "M'"], ['d', 'D'], ['n', 'N']].map((pair, i) => pair[(mask >> i) & 1]);
    if (findThaat(choices)) named += 1;
  }
  assert.equal(named, 10);
  assert.equal(findThaat(['R', 'g', 'M', 'D', 'n']), 'kafi');
});

// ref:wiki-turkish-makam koma 表与音阶
test('Turkish 53-koma tones and makams', () => {
  assert.equal(TURKISH_TONES.length, 25); // 24 个音 + 八度
  assert.equal(Math.round(komaCents(turkishKoma('Rast'))), 702);
  assert.equal(Math.round(komaCents(turkishKoma('Segâh'))), 1087);
  assert.deepEqual(komaSteps(TURKISH_MAKAMS.cargah.tones), [9, 9, 4, 9, 9, 9, 4]);
  assert.deepEqual(komaSteps(TURKISH_MAKAMS.rast.tones), [9, 8, 5, 9, 9, 8, 5]);
  // 下行时 Eviç 降 4 koma 为 Acem，上方变为 Bûselik 四音音列（T B T）
  assert.deepEqual(komaSteps([...TURKISH_MAKAMS.rast.descending].reverse()).slice(4), [9, 4, 9]);
  // Turkish Rast 的三度为纯大三度（约 386 音分）
  assert.ok(Math.abs(komaCents(17) - 1200 * Math.log2(5 / 4)) < 2);
  assert.deepEqual(komaSteps(TURKISH_MAKAMS.buselik.tones), [9, 4, 9, 9, 4, 9, 9]);
  assert.deepEqual(komaSteps(TURKISH_MAKAMS.buselik.variant).slice(4), [4, 13, 5]);
});
