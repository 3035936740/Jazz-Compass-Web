import { MICRO_PRESETS, parseRatio, ratioLabel, ratioBetween, centsFromRatio, octavePosition, foldRatioToOctave, extendedJustRatios, quantizeRatio, frequencyForRatio, harmonicSeries, syntonicComma, centsToKeyboardPercent, keyboardPercentToCents, piano88Notes, midiNoteLabel, midiPositionFrequency, decodeMidiMessage, syncPianoVoices } from "./microtonal.js?v=20260915-2";

const COPY = {
  zh: {
    preset: "和声构型", edo: "平均律 · 1–93", quick: "快捷选择", method: "量化方式", root: "基准音 Hz", ratios: "频率比（空格或逗号分隔）",
    generator: "生成元", direct: "逐音就近", major: "纯律大三和弦 · Ah–Chy–Ly", minor: "纯律小三和弦",
    septimal: "7 倍音构型 · Ah–Chy–My", undecimal: "11 倍音构型 · Ah–Chy–Fuzi", majorScale: "纯律大调音阶", custom: "自定义频率比",
    ji: "纯律", tempered: "平均律", playJi: "播放纯律", playEdo: "播放平均律", playNote: "试听", ratio: "频率比", cents: "纯律音分", step: "步数", error: "偏差", hz: "频率",
    compareTitle: "音程与量化", compareHelp: "细点为整数比位置，实点为平均律位置；横轴为一个八度。正偏差表示平均律偏高。",
    relationTitle: "和声内部关系", relationHelp: "逐对比较当前构型中的音。平均律音程按各音量化后的步数相减，因此保留当前构型的内部关系。", fromTo: "音对", interval: "纯律音程",
    harmonicTitle: "倍音与比率键盘", harmonicHelp: "扩展视图包含倍音、逆比及复合频率比；点标记会同时播放 1/1 与所选比率。所有比率折回同一八度，便于和钢琴对照。", harmonic: "倍音", normalized: "八度内频率比",
    pianoSet: "显示频率", setCompact: "扩展比率 · 精选", setFull: "扩展比率 · 全部", setH16: "倍音 1–16", setH64: "倍音 1–64", pianoCount: "个可点位置", pianoRule: "扩展比率由 3、5、7、11、13 的奇数乘积与逆比生成，按复杂度筛选；不是对图片逐字转录。", etShortcuts: "12 平均律快捷键", etNote: "12 平均律",
    pianoHint: "点比率标记，或直接点钢琴任意位置（包括键缝）试听。← / → 每次移动 10¢，Shift 为 1¢。", pianoReadout: "当前音高", pianoRelative: "相对最近 12 平均律", pianoAnchor: "键盘按 C–C 排列；改变基准 Hz 只改变试听频率。", pianoRatio: "频率比",
    fullPianoTitle: "88 键钢琴卷帘", fullPianoHelp: "A0–C8 全音域。左右拖动或滚轮横移，Ctrl/⌘ + 滚轮缩放；琴缝是相邻音中间的 +50¢。全部输入使用钢琴音色。", zoom: "缩放", midiOffset: "MIDI 音分偏移", midiConnect: "连接 MIDI 键盘", midiWaiting: "MIDI 未连接", midiConnecting: "正在请求 MIDI…", midiReady: "MIDI 已连接", midiUnavailable: "浏览器不支持 Web MIDI", midiDenied: "MIDI 连接失败", midiPitchBend: "弯音", chordLatch: "和声保持", clearChord: "清除和声", chordNotes: "和声音",
    commaTitle: "音差观察 · 81/80", commaText: "句法逗号约 21.51 音分。12 EDO 将它合并为 0 步，41 EDO 的生成元映射保留为 1 步。",
    sourceTitle: "理论边界与资料", sourceText: "这里是频率比、平均律和基础和声的实验台，不是沙沙夫式音乐理论的完整实现。3D / 4D / 5D 只标注示例构型；不自动推断功能式、和音名或和音图。11/6 是 11/3 折回一个八度的同音类。",
    sourceAuthor: "LΛMPLIGHT · Chalaxata", sourceAnswer: "LΛMPLIGHT · 两种量化方式的说明", sourceEditor: "GitHub · 和音图编辑器", sourceSequencer: "GitHub · Nafchanaphata 音序器", sourceNotes: "GitHub · 理论笔记（第三方）",
    rootNote: "基准音使用 12 EDO 的 C4≈261.63 Hz 作为默认值；它只锚定绝对音高，纯律音程仍由整数比决定。",
    fallback: "含 13 以外质因数的比值会自动用逐音就近方式。", inputError: "请输入 1–24 个有效频率比，格式如 1/1 5/4 3/2。",
  },
  ja: {
    preset: "和声の構成", edo: "平均律 · 1–93", quick: "クイック選択", method: "量子化方式", root: "基準音 Hz", ratios: "周波数比（空白・カンマ区切り）",
    generator: "生成元", direct: "各音を最近傍へ", major: "純正長三和音 · Ah–Chy–Ly", minor: "純正短三和音",
    septimal: "7 倍音 · Ah–Chy–My", undecimal: "11 倍音 · Ah–Chy–Fuzi", majorScale: "純正長音階", custom: "カスタム比率",
    ji: "純正律", tempered: "平均律", playJi: "純正律を再生", playEdo: "平均律を再生", playNote: "試聴", ratio: "周波数比", cents: "純正セント", step: "ステップ", error: "誤差", hz: "周波数",
    compareTitle: "音程と量子化", compareHelp: "細い点は整数比、塗りつぶし点は平均律。横軸は1オクターブ。正の誤差は平均律が高いことを示します。",
    relationTitle: "和声内の関係", relationHelp: "現在の構成音をペアで比較します。平均律の音程は量子化済みステップの差です。", fromTo: "音のペア", interval: "純正音程",
    harmonicTitle: "倍音と比率の鍵盤", harmonicHelp: "拡張表示には倍音・逆比・複合比を含みます。印をクリックすると 1/1 と選択比率を同時に再生します。すべて1オクターブに折りたたんで比較します。", harmonic: "倍音", normalized: "オクターブ内比率",
    pianoSet: "表示する比率", setCompact: "拡張比率 · 抜粋", setFull: "拡張比率 · すべて", setH16: "倍音 1–16", setH64: "倍音 1–64", pianoCount: "か所をクリック可能", pianoRule: "拡張比率は 3・5・7・11・13 の奇数積と逆比から複雑度で選別。画像の逐語的な転写ではありません。", etShortcuts: "12 平均律ショートカット", etNote: "12 平均律",
    pianoHint: "比率の印、または鍵盤のどこでも（鍵の隙間も）クリックして試聴。← / → は 10¢、Shift は 1¢ 移動。", pianoReadout: "現在の音高", pianoRelative: "最も近い 12 平均律から", pianoAnchor: "鍵盤は C–C 配列。基準 Hz の変更は再生周波数のみ変えます。", pianoRatio: "周波数比",
    fullPianoTitle: "88鍵ピアノロール", fullPianoHelp: "A0–C8。ドラッグまたはホイールで横移動、Ctrl/⌘ + ホイールでズーム。鍵間は隣接音の +50¢、すべてピアノ音色です。", zoom: "ズーム", midiOffset: "MIDI セントオフセット", midiConnect: "MIDI キーボードを接続", midiWaiting: "MIDI 未接続", midiConnecting: "MIDI を要求中…", midiReady: "MIDI 接続済み", midiUnavailable: "Web MIDI 非対応", midiDenied: "MIDI 接続に失敗", midiPitchBend: "ピッチベンド", chordLatch: "和音保持", clearChord: "和音を消去", chordNotes: "和音",
    commaTitle: "コンマ · 81/80", commaText: "シントニック・コンマは約 21.51 セント。12 EDO では 0 ステップ、41 EDO の生成元写像では 1 ステップ。",
    sourceTitle: "理論上の範囲と資料", sourceText: "これは周波数比・平均律・基本和声の実験台であり、シャサフ式音楽理論の完全な実装ではありません。3D / 4D / 5D は例示のみで、機能式・和音名・和音図を自動推定しません。11/6 は 11/3 のオクターブ同値です。",
    sourceAuthor: "LΛMPLIGHT · Chalaxata", sourceAnswer: "LΛMPLIGHT · 量子化方式の説明", sourceEditor: "GitHub · 和音図エディター", sourceSequencer: "GitHub · Nafchanaphata", sourceNotes: "GitHub · 理論メモ（第三者）",
    rootNote: "基準音の初期値は 12 EDO の C4≈261.63 Hz。絶対音高の基点だけで、純正音程は整数比から決まります。",
    fallback: "13より大きい素因数を含む比率は最近傍方式に切り替えます。", inputError: "1～24個の比率を入力してください（例: 1/1 5/4 3/2）。",
  },
  en: {
    preset: "Harmony shape", edo: "Equal temperament · 1–93", quick: "Quick picks", method: "Quantization", root: "Reference Hz", ratios: "Ratios (space or comma separated)",
    generator: "Generator mapping", direct: "Nearest pitch", major: "Just major · Ah–Chy–Ly", minor: "Just minor",
    septimal: "7-limit · Ah–Chy–My", undecimal: "11-limit · Ah–Chy–Fuzi", majorScale: "Just major scale", custom: "Custom ratios",
    ji: "Just intonation", tempered: "Equal temperament", playJi: "Play just intonation", playEdo: "Play equal temperament", playNote: "Hear", ratio: "Ratio", cents: "JI cents", step: "Steps", error: "Error", hz: "Frequency",
    compareTitle: "Intervals & quantization", compareHelp: "Open dots mark integer ratios; filled dots mark EDO pitches. The axis spans one octave. Positive error means EDO is sharp.",
    relationTitle: "Internal harmony", relationHelp: "Compare every pair in the current shape. EDO intervals subtract the mapped steps of each pitch, preserving the shape's internal mapping.", fromTo: "Pair", interval: "Just interval",
    harmonicTitle: "Harmonics & ratio keyboard", harmonicHelp: "Extended views include harmonics, reciprocal ratios and compounds. A marker plays 1/1 and the selected ratio together. All ratios are folded into one octave for comparison with the piano.", harmonic: "Harmonic", normalized: "Octave-folded ratio",
    pianoSet: "Frequency set", setCompact: "Extended ratios · selected", setFull: "Extended ratios · all", setH16: "Harmonics 1–16", setH64: "Harmonics 1–64", pianoCount: "clickable pitches", pianoRule: "Extended ratios are generated from odd products of 3, 5, 7, 11 and 13 and their reciprocals, filtered by complexity; this is not a literal transcription of the image.", etShortcuts: "12 EDO shortcuts", etNote: "12 EDO",
    pianoHint: "Click a ratio marker or anywhere on the keyboard—even between keys—to hear it. ← / → move 10¢, or 1¢ with Shift.", pianoReadout: "Current pitch", pianoRelative: "From nearest 12 EDO", pianoAnchor: "The keyboard is laid out C–C; changing reference Hz changes playback pitch only.", pianoRatio: "Frequency ratio",
    fullPianoTitle: "88-key piano roll", fullPianoHelp: "Full A0–C8 range. Drag or wheel to pan, Ctrl/⌘ + wheel to zoom. Key seams play the +50¢ midpoint; every input uses the piano timbre.", zoom: "Zoom", midiOffset: "MIDI cent offset", midiConnect: "Connect MIDI keyboard", midiWaiting: "MIDI not connected", midiConnecting: "Requesting MIDI…", midiReady: "MIDI connected", midiUnavailable: "Web MIDI is unavailable", midiDenied: "MIDI connection failed", midiPitchBend: "Pitch bend", chordLatch: "Chord latch", clearChord: "Clear chord", chordNotes: "Chord tones",
    commaTitle: "Syntonic comma · 81/80", commaText: "The syntonic comma is about 21.51 cents. 12 EDO maps it to 0 steps; 41 EDO generator mapping preserves 1 step.",
    sourceTitle: "Scope & sources", sourceText: "This is a lab for ratios, EDOs and basic harmony—not a complete implementation of Shasavistic music theory. 3D / 4D / 5D label example shapes only; it does not infer functoglyphs, harmononyms or chord diagrams. 11/6 is the octave-equivalent of 11/3.",
    sourceAuthor: "LΛMPLIGHT · Chalaxata", sourceAnswer: "LΛMPLIGHT · on quantization methods", sourceEditor: "GitHub · chord diagram editor", sourceSequencer: "GitHub · Nafchanaphata sequencer", sourceNotes: "GitHub · theory notes (third party)",
    rootNote: "The default reference is C4≈261.63 Hz in 12 EDO. It anchors absolute pitch only; JI intervals still come from integer ratios.",
    fallback: "Ratios with prime factors above 13 fall back to nearest-pitch mapping.", inputError: "Enter 1–24 valid ratios, e.g. 1/1 5/4 3/2.",
  },
};

const SOURCE_LINKS = [
  ["sourceAuthor", "https://lamplight0.sakura.ne.jp/en/a/music/chalaxata.php?mode=%E5%B9%B3%E5%9D%87%E5%BE%8B"],
  ["sourceAnswer", "https://lamplight0.sakura.ne.jp/a/requests.php"],
  ["sourceEditor", "https://github.com/MrZ626/shasavistic-chord-diagram-editor"],
  ["sourceSequencer", "https://github.com/Rtt398/nafchanaphata"],
  ["sourceNotes", "https://gist.github.com/HaleyHalcyon/9507005979ce6bbd4e93bdd298cb5d5e"],
];

function languageCopy() { return COPY[window.__lang] || COPY.en; }
function signed(number) { return `${number >= 0 ? "+" : ""}${number.toFixed(2)}`; }
function classForRatio(label) {
  const ratio = parseRatio(label);
  const values = [ratio.numerator, ratio.denominator];
  if (values.some(value => value % 13 === 0)) return "micro-d6";
  if (values.some(value => value % 11 === 0)) return "micro-d5";
  if (values.some(value => value % 7 === 0)) return "micro-d4";
  if (values.some(value => value % 5 === 0)) return "micro-d3";
  if (values.some(value => value % 3 === 0)) return "micro-d2";
  return "micro-d1";
}

export function mountMicrotonal(playChord, createHeldPianoVoice) {
  const panel = document.getElementById("panel-micro");
  if (!panel) return;
  const preset = panel.querySelector("#micro-preset");
  const edoInput = panel.querySelector("#micro-edo");
  const methodInput = panel.querySelector("#micro-method");
  const rootInput = panel.querySelector("#micro-root");
  const ratiosInput = panel.querySelector("#micro-ratios");
  const body = panel.querySelector("#panel-micro-body");
  const copy = languageCopy();
  let pianoSet = "compact";
  let rollZoom = 100;
  let midiCentsOffset = 0;
  let midiPitchBendCents = 0;
  let midiAccess = null;
  let midiStatus = "waiting";
  const activeMidiNotes = new Set();
  const latchedRollNotes = new Set();
  const rollVoices = new Map();
  let rollChordLatch = true;
  let rollNoteOn = () => {};
  let rollNoteOff = () => {};
  let refreshRollHarmony = () => {};

  function midiStatusText() {
    return copy[`midi${midiStatus[0].toUpperCase()}${midiStatus.slice(1)}`] || copy.midiWaiting;
  }

  function updateMidiStatus() {
    const status = body.querySelector(".micro-midi-status");
    const connect = body.querySelector("#micro-midi-connect");
    if (status) {
      status.textContent = midiStatusText();
      status.classList.toggle("is-ready", midiStatus === "ready");
    }
    if (connect) {
      connect.textContent = midiStatus === "ready" ? copy.midiReady : copy.midiConnect;
      connect.classList.toggle("active", midiStatus === "ready");
      connect.disabled = midiStatus === "connecting";
    }
  }

  function handleMidiMessage(event) {
    const message = decodeMidiMessage(event.data);
    if (!message) return;
    if (message.type === "noteOn") rollNoteOn(message.note, message.velocity);
    else if (message.type === "noteOff") rollNoteOff(message.note);
    else if (message.type === "pitchBend") {
      midiPitchBendCents = message.cents;
      const bend = body.querySelector(".micro-midi-bend");
      if (bend) bend.textContent = `${copy.midiPitchBend} ${signed(midiPitchBendCents)}¢`;
      refreshRollHarmony();
    }
  }

  function attachMidiInputs() {
    if (!midiAccess) return;
    for (const input of midiAccess.inputs.values()) input.onmidimessage = handleMidiMessage;
    midiStatus = midiAccess.inputs.size ? "ready" : "waiting";
    if (!midiAccess.inputs.size && activeMidiNotes.size) {
      for (const note of [...activeMidiNotes]) rollNoteOff(note);
    }
    updateMidiStatus();
  }

  async function connectMidi() {
    if (!navigator.requestMIDIAccess) {
      midiStatus = "unavailable";
      updateMidiStatus();
      return;
    }
    midiStatus = "connecting";
    updateMidiStatus();
    try {
      midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      midiAccess.onstatechange = attachMidiInputs;
      attachMidiInputs();
    } catch {
      midiStatus = "denied";
      updateMidiStatus();
    }
  }
  for (const [id, key] of [["micro-preset-label", "preset"], ["micro-edo-label", "edo"], ["micro-method-label", "method"], ["micro-root-label", "root"], ["micro-ratios-label", "ratios"]]) {
    panel.querySelector(`#${id}`).textContent = copy[key];
  }
  for (const option of preset.options) option.textContent = copy[option.value];
  for (const option of methodInput.options) option.textContent = copy[option.value];
  panel.querySelector("#micro-edo-quick-label").textContent = copy.quick;

  function getRatios() {
    const tokens = ratiosInput.value.trim().split(/[\s,，;；]+/).filter(Boolean);
    if (!tokens.length || tokens.length > 24) throw new Error(copy.inputError);
    return tokens.map(parseRatio);
  }

  function render() {
    try {
      const ratios = getRatios();
      const edo = Number(edoInput.value);
      if (!Number.isInteger(edo) || edo < 1 || edo > 93) throw new Error("EDO must be 1–93.");
      const method = methodInput.value;
      const rootHz = Number(rootInput.value);
      if (!Number.isFinite(rootHz) || rootHz < 20 || rootHz > 2000) throw new Error(copy.rootNote);
      ratiosInput.removeAttribute("aria-invalid");
      rootInput.removeAttribute("aria-invalid");
      const rows = ratios.map((ratio, index) => {
        const label = ratioLabel(ratio);
        const result = quantizeRatio(ratio, edo, method);
        const justHz = frequencyForRatio(rootHz, ratio);
        const edoHz = frequencyForRatio(rootHz, ratio, edo, method);
        const justPosition = octavePosition(ratio);
        const edoPosition = ((result.temperedCents % 1200) + 1200) % 1200;
        const jiX = result.exactCents > 0 && Math.abs(Math.log2(justPosition.position)) < 1e-9 ? 100 : Math.min(100, Math.max(0, Math.log2(justPosition.position) * 100));
        const edoX = result.temperedCents > 0 && edoPosition < 1e-9 ? 100 : Math.min(100, Math.max(0, edoPosition / 12));
        return `<tr><td><span class="micro-ratio ${classForRatio(label)}">${label}</span></td><td>${result.exactCents.toFixed(2)}¢</td><td>${result.steps}</td><td class="micro-error">${signed(result.errorCents)}¢</td><td>${justHz.toFixed(2)} / ${edoHz.toFixed(2)}</td><td><button type="button" class="micro-note-play" data-note="${index}" aria-label="${copy.playNote} ${label}">▶</button></td></tr>
          <tr class="micro-visual-row"><td colspan="6"><div class="micro-axis" aria-label="${label}: ${copy.ji} ${result.exactCents.toFixed(2)} ${copy.cents}; ${edo} EDO ${result.temperedCents.toFixed(2)} ${copy.cents}"><span class="micro-axis-dot micro-axis-ji" style="left:${jiX}%"></span><span class="micro-axis-dot micro-axis-edo" style="left:${edoX}%"></span></div></td></tr>`;
      }).join("");
      const relations = [];
      for (let from = 0; from < ratios.length; from++) {
        for (let to = from + 1; to < ratios.length; to++) {
          const between = ratioBetween(ratios[from], ratios[to]);
          const steps = quantizeRatio(ratios[to], edo, method).steps - quantizeRatio(ratios[from], edo, method).steps;
          const intervalCents = centsFromRatio(between);
          relations.push(`<tr><td>${ratioLabel(ratios[from])} → ${ratioLabel(ratios[to])}</td><td>${ratioLabel(between)}</td><td>${intervalCents.toFixed(2)}¢</td><td>${steps}</td><td class="micro-error">${signed(steps * 1200 / edo - intervalCents)}¢</td></tr>`);
        }
      }
      const harmonicNotes = harmonicSeries(pianoSet === "harmonics64" ? 64 : 16);
      const markerGroups = new Map();
      if (pianoSet === "compact" || pianoSet === "full") {
        for (const sourceRatio of extendedJustRatios(pianoSet === "full" ? 255 : 63)) {
          const folded = foldRatioToOctave(sourceRatio).ratio;
          markerGroups.set(ratioLabel(folded), { ratio: folded, sourceLabel: ratioLabel(sourceRatio), harmonics: [], custom: false });
        }
      } else {
        for (const note of harmonicNotes) {
          const label = ratioLabel(note.ratio);
          if (!markerGroups.has(label)) markerGroups.set(label, { ratio: note.ratio, sourceLabel: label, harmonics: [], custom: false });
          markerGroups.get(label).harmonics.push(note.harmonic);
        }
      }
      // The current chord/custom ratio input is always represented on the keyboard.
      for (const sourceRatio of ratios) {
        const folded = foldRatioToOctave(sourceRatio).ratio;
        const label = ratioLabel(folded);
        if (!markerGroups.has(label)) markerGroups.set(label, { ratio: folded, sourceLabel: ratioLabel(sourceRatio), harmonics: [], custom: true });
        else {
          const marker = markerGroups.get(label);
          marker.custom = true;
          marker.sourceLabel = ratioLabel(sourceRatio);
        }
      }
      const pianoMarkers = [...markerGroups.values()].sort((a, b) => centsFromRatio(a.ratio) - centsFromRatio(b.ratio));
      const surfaceWidth = pianoSet === "full" ? 1600 : pianoSet === "compact" ? 850 : pianoSet === "harmonics64" ? 1100 : 700;
      const minGap = pianoSet === "full" ? 4 : pianoSet === "compact" ? 7.4 : pianoSet === "harmonics64" ? 5.9 : 9.2;
      const laneEnds = [];
      const laidOutMarkers = pianoMarkers.map(marker => {
        const cents = centsFromRatio(marker.ratio);
        const x = centsToKeyboardPercent(cents);
        let lane = laneEnds.findIndex(lastX => x - lastX >= minGap);
        if (lane < 0) lane = laneEnds.length;
        laneEnds[lane] = x;
        return { ...marker, cents, x, lane };
      });
      const markerAreaHeight = Math.max(112, laneEnds.length * 35 + 13);
      const markerHtml = laidOutMarkers.map((marker, index) => {
        const foldedLabel = ratioLabel(marker.ratio);
        const subLabel = marker.harmonics.length ? `H${marker.harmonics.join("·")}` : marker.sourceLabel === foldedLabel ? "JI" : `↦ ${foldedLabel}`;
        return `<button type="button" class="micro-piano-marker ${classForRatio(marker.sourceLabel)}${marker.custom ? " is-chord-tone" : ""}" data-piano-marker="${index}" style="left:${marker.x}%;top:${marker.lane * 35}px;--lane-top:${marker.lane * 35}px;--marker-area-height:${markerAreaHeight}px" aria-label="${copy.pianoRatio} ${marker.sourceLabel}, ${foldedLabel}, ${marker.cents.toFixed(2)}¢"><span class="micro-marker-ratio">${marker.sourceLabel}</span><span class="micro-marker-numbers">${marker.custom ? "★ " : ""}${subLabel}</span></button>`;
      }).join("");
      const etNoteNames = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C⁵"];
      const etKeys = etNoteNames.map((name, step) => `<button type="button" class="micro-et-key" data-et-step="${step}" style="left:${centsToKeyboardPercent(step * 100)}%" aria-label="${copy.etNote} ${name}, ${step * 100}¢">${name}</button>`).join("");
      const whiteKeys = ["C", "D", "E", "F", "G", "A", "B", "C"].map((note, index) => `<span class="micro-piano-white-key"><span>${note}${index === 7 ? "⁵" : "⁴"}</span></span>`).join("");
      const blackKeys = [100, 300, 600, 800, 1000].map((cents, index) => `<span class="micro-piano-black-key" style="left:${centsToKeyboardPercent(cents)}%"><span>${["C♯", "D♯", "F♯", "G♯", "A♯"][index]}</span></span>`).join("");
      const rollNotes = piano88Notes();
      let rollWhiteIndex = 0;
      const rollWhiteKeys = [];
      const rollBlackKeys = [];
      const rollKeyPositions = [];
      for (const note of rollNotes) {
        const keyClass = note.midi === 60 ? " is-middle-c" : "";
        if (note.black) {
          rollBlackKeys.push(`<button type="button" class="micro-roll-key micro-roll-black${keyClass}" data-roll-midi="${note.midi}" style="--white-index:${rollWhiteIndex}" aria-label="${note.label}"><span>${note.label}</span></button>`);
          rollKeyPositions.push({ ...note, x: rollWhiteIndex });
        } else {
          const showLabel = note.midi === 21 || note.midi === 108 || note.midi % 12 === 0;
          rollWhiteKeys.push(`<button type="button" class="micro-roll-key micro-roll-white${keyClass}" data-roll-midi="${note.midi}" style="--white-index:${rollWhiteIndex}" aria-label="${note.label}">${showLabel ? `<span>${note.label}</span>` : ""}</button>`);
          rollKeyPositions.push({ ...note, x: rollWhiteIndex + 0.5 });
          rollWhiteIndex++;
        }
      }
      const rollSeams = rollKeyPositions.slice(0, -1).map((note, index) => {
        const next = rollKeyPositions[index + 1];
        const x = (note.x + next.x) / 2;
        return `<button type="button" class="micro-roll-seam" data-roll-position="${note.midi + 0.5}" style="--seam-x:${x}" aria-label="${note.label} → ${next.label}, +50¢"></button>`;
      }).join("");
      const rollWhiteWidth = 42 * rollZoom / 100;
      const harmonics = harmonicNotes.map(({ harmonic, ratio }) => {
        const label = ratioLabel(ratio);
        const q = quantizeRatio(ratio, edo, method);
        return `<tr data-harmonic-ratio="${label}"><td>${harmonic}</td><td><span class="micro-ratio ${classForRatio(label)}">${label}</span></td><td>${centsFromRatio(ratio).toFixed(2)}¢</td><td>${q.steps}</td><td>${signed(q.errorCents)}¢</td><td><button type="button" class="micro-harmonic-play" data-harmonic="${harmonic}" aria-label="${copy.playNote} ${harmonic}">▶</button></td></tr>`;
      }).join("");
      const comma = syntonicComma();
      const comma12 = quantizeRatio(comma, 12).steps;
      const comma41 = quantizeRatio(comma, 41).steps;
      const fallback = ratios.some(ratio => quantizeRatio(ratio, edo, method).appliedMethod !== method && method === "generator");
      body.innerHTML = `
        <div class="micro-summary"><div><span class="micro-kicker">RATIO LAB / ${MICRO_PRESETS[preset.value]?.dimension || "JI"}</span><h3>${copy.compareTitle}</h3><p>${copy.compareHelp}</p></div><div class="micro-play-actions"><button type="button" id="micro-play-ji">▶ ${copy.playJi}</button><button type="button" id="micro-play-edo">▶ ${copy.playEdo}</button></div></div>
        <div class="micro-legend"><span><i class="micro-legend-ji"></i>${copy.ji}</span><span><i class="micro-legend-edo"></i>${edo} EDO</span></div>
        <div class="micro-table-scroll"><table class="micro-table"><thead><tr><th>${copy.ratio}</th><th>${copy.cents}</th><th>${edo} EDO ${copy.step}</th><th>${copy.error}</th><th>${copy.hz} · JI / EDO</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
        <p class="micro-footnote">${copy.rootNote}${fallback ? ` ${copy.fallback}` : ""}</p>
        ${relations.length ? `<div class="micro-section"><h3>${copy.relationTitle}</h3><p>${copy.relationHelp}</p><div class="micro-table-scroll"><table class="micro-table"><thead><tr><th>${copy.fromTo}</th><th>${copy.interval}</th><th>${copy.cents}</th><th>${edo} EDO ${copy.step}</th><th>${copy.error}</th></tr></thead><tbody>${relations.join("")}</tbody></table></div></div>` : ""}
        <div class="micro-section"><h3>${copy.harmonicTitle}</h3><p>${copy.harmonicHelp}</p>
          <div class="micro-piano-toolbar"><span>${copy.pianoSet}</span><button type="button" data-piano-set="compact" class="${pianoSet === "compact" ? "active" : ""}">${copy.setCompact}</button><button type="button" data-piano-set="full" class="${pianoSet === "full" ? "active" : ""}">${copy.setFull}</button><button type="button" data-piano-set="harmonics16" class="${pianoSet === "harmonics16" ? "active" : ""}">${copy.setH16}</button><button type="button" data-piano-set="harmonics64" class="${pianoSet === "harmonics64" ? "active" : ""}">${copy.setH64}</button><strong>${pianoMarkers.length} ${copy.pianoCount}</strong></div>
          <p class="micro-piano-rule">${copy.pianoRule}</p>
          <div class="micro-piano-scroll"><div class="micro-piano-surface" style="width:${surfaceWidth}px"><div class="micro-piano-markers" style="height:${markerAreaHeight}px">${markerHtml}</div><div class="micro-et-shortcuts"><span class="micro-et-title">${copy.etShortcuts}</span>${etKeys}</div><div class="micro-piano-keyboard" role="slider" tabindex="0" aria-label="${copy.pianoHint}" aria-valuemin="0" aria-valuemax="1200" aria-valuenow="0" aria-valuetext="C 0¢">${whiteKeys}${blackKeys}<span class="micro-piano-cursor" style="left:${centsToKeyboardPercent(0)}%"></span></div><div class="micro-piano-readout" aria-live="polite"></div></div></div>
          <p class="micro-piano-help">${copy.pianoHint} ${copy.pianoAnchor}</p>
          <div class="micro-full-piano"><div class="micro-full-piano-head"><div><h3>${copy.fullPianoTitle}</h3><p>${copy.fullPianoHelp}</p></div><div class="micro-roll-controls"><label>${copy.zoom}<span><button type="button" data-roll-zoom="-10" aria-label="${copy.zoom} −">−</button><input id="micro-roll-zoom" type="range" min="40" max="200" step="5" value="${rollZoom}"><button type="button" data-roll-zoom="10" aria-label="${copy.zoom} +">+</button><output id="micro-roll-zoom-value">${rollZoom}%</output></span></label><label>${copy.midiOffset}<span><input id="micro-midi-offset" type="number" min="-1200" max="1200" step="1" value="${midiCentsOffset}"><b>¢</b></span></label><button type="button" id="micro-chord-latch" class="${rollChordLatch ? "active" : ""}" aria-pressed="${rollChordLatch}">${copy.chordLatch}</button><button type="button" id="micro-chord-clear">${copy.clearChord}</button><button type="button" id="micro-midi-connect">${copy.midiConnect}</button></div></div><div class="micro-midi-line"><span class="micro-midi-status" aria-live="polite">${midiStatusText()}</span><span class="micro-midi-bend">${copy.midiPitchBend} ${signed(midiPitchBendCents)}¢</span></div><div class="micro-roll-scroll" tabindex="0" role="region" aria-label="${copy.fullPianoTitle}"><div class="micro-roll-surface" style="--white-width:${rollWhiteWidth}px;width:${52 * rollWhiteWidth}px">${rollWhiteKeys.join("")}${rollBlackKeys.join("")}${rollSeams}</div></div><div class="micro-roll-readout" aria-live="polite">A0–C8 · 88 keys</div></div>
          <div class="micro-table-scroll"><table class="micro-table micro-harmonic-table"><thead><tr><th>${copy.harmonic}</th><th>${copy.normalized}</th><th>${copy.cents}</th><th>${edo} EDO ${copy.step}</th><th>${copy.error}</th><th></th></tr></thead><tbody>${harmonics}</tbody></table></div></div>
        <div class="micro-section micro-comma"><h3>${copy.commaTitle}</h3><p>${copy.commaText}</p><div class="micro-comma-stats"><span>81/80</span><span>${centsFromRatio(comma).toFixed(2)}¢</span><span>12 EDO → ${comma12}</span><span>41 EDO → ${comma41}</span></div></div>
        <div class="micro-section micro-sources"><h3>${copy.sourceTitle}</h3><p>${copy.sourceText}</p><div class="micro-source-links">${SOURCE_LINKS.map(([key, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${copy[key]} ↗</a>`).join("")}</div></div>`;
      body.querySelector("#micro-play-ji").addEventListener("click", () => playChord(ratios.map(ratio => frequencyForRatio(rootHz, ratio)), 1.5));
      body.querySelector("#micro-play-edo").addEventListener("click", () => playChord(ratios.map(ratio => frequencyForRatio(rootHz, ratio, edo, method)), 1.5));
      body.querySelectorAll(".micro-note-play").forEach(button => button.addEventListener("click", () => playChord([frequencyForRatio(rootHz, ratios[Number(button.dataset.note)])], 0.8)));
      body.querySelectorAll(".micro-harmonic-play").forEach(button => {
        button.addEventListener("click", () => {
          const harmonic = harmonicNotes[Number(button.dataset.harmonic) - 1];
          playChord([frequencyForRatio(rootHz, harmonic.ratio)], 0.8);
        });
      });
      const keyboard = body.querySelector(".micro-piano-keyboard");
      const cursor = body.querySelector(".micro-piano-cursor");
      const readout = body.querySelector(".micro-piano-readout");
      const noteNames = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C"];
      let selectedCents = 0;
      function hearPianoPosition(cents, ratioText = "", withRoot = false) {
        selectedCents = Math.min(1200, Math.max(0, cents));
        const nearest = Math.round(selectedCents / 100);
        const deviation = selectedCents - nearest * 100;
        const frequency = rootHz * 2 ** (selectedCents / 1200);
        cursor.style.left = `${centsToKeyboardPercent(selectedCents)}%`;
        keyboard.setAttribute("aria-valuenow", String(Math.round(selectedCents)));
        keyboard.setAttribute("aria-valuetext", `${noteNames[nearest]} ${signed(deviation)} cents`);
        readout.textContent = `${copy.pianoReadout}: ${frequency.toFixed(2)} Hz · ${copy.pianoRelative} ${noteNames[nearest]} ${signed(deviation)}¢${ratioText ? ` · ${ratioText}` : ""}`;
        body.querySelectorAll(".micro-piano-marker").forEach(button => button.classList.toggle("is-selected", button.dataset.ratio === ratioText));
        body.querySelectorAll("[data-et-step]").forEach(button => button.classList.toggle("is-selected", Number(button.dataset.etStep) * 100 === selectedCents));
        body.querySelectorAll("[data-harmonic-ratio]").forEach(row => row.classList.toggle("is-selected", row.dataset.harmonicRatio === ratioText));
        playChord(withRoot && selectedCents > 0.001 ? [rootHz, frequency] : [frequency], 0.8);
      }
      keyboard.addEventListener("click", event => {
        const rect = keyboard.getBoundingClientRect();
        hearPianoPosition(keyboardPercentToCents((event.clientX - rect.left) * 100 / rect.width));
      });
      keyboard.addEventListener("keydown", event => {
        const amount = event.shiftKey ? 1 : 10;
        let next = selectedCents;
        if (event.key === "ArrowLeft") next -= amount;
        else if (event.key === "ArrowRight") next += amount;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = 1200;
        else if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        hearPianoPosition(next);
      });
      body.querySelectorAll("[data-piano-marker]").forEach(button => {
        const note = laidOutMarkers[Number(button.dataset.pianoMarker)];
        button.dataset.ratio = note.sourceLabel;
        button.addEventListener("click", () => hearPianoPosition(note.cents, note.sourceLabel, true));
      });
      body.querySelectorAll("[data-et-step]").forEach(button => button.addEventListener("click", () => {
        const step = Number(button.dataset.etStep);
        hearPianoPosition(step * 100, `${copy.etNote} ${etNoteNames[step]}`);
      }));
      body.querySelectorAll("[data-piano-set]").forEach(button => button.addEventListener("click", () => {
        pianoSet = button.dataset.pianoSet;
        render();
      }));
      const rollScroll = body.querySelector(".micro-roll-scroll");
      const rollSurface = body.querySelector(".micro-roll-surface");
      const rollReadout = body.querySelector(".micro-roll-readout");
      const zoomInput = body.querySelector("#micro-roll-zoom");
      const zoomOutput = body.querySelector("#micro-roll-zoom-value");
      const offsetInput = body.querySelector("#micro-midi-offset");

      function setRollPositionActive(position) {
        const selector = Number.isInteger(position) ? `[data-roll-midi="${position}"]` : `[data-roll-position="${position}"]`;
        body.querySelector(selector)?.classList.toggle("is-active", latchedRollNotes.has(position) || activeMidiNotes.has(position));
      }

      function effectiveMidiOffset() {
        return Math.max(-1200, Math.min(1200, midiCentsOffset + midiPitchBendCents));
      }

      function positionLabel(position) {
        return Number.isInteger(position) ? midiNoteLabel(position) : `${midiNoteLabel(Math.floor(position))} +50¢`;
      }

      function currentHarmony() {
        return [...new Set([...latchedRollNotes, ...activeMidiNotes])].sort((a, b) => a - b);
      }

      function syncRollHarmony(velocity = 100) {
        const positions = currentHarmony();
        const cents = effectiveMidiOffset();
        syncPianoVoices(rollVoices, positions, position => midiPositionFrequency(position, rootHz, cents), createHeldPianoVoice, velocity);
        if (!positions.length) {
          rollReadout.textContent = `A0–C8 · 88 keys`;
          return;
        }
        rollReadout.textContent = `${copy.chordNotes}: ${positions.map(positionLabel).join(" · ")} · ${signed(cents)}¢`;
      }
      refreshRollHarmony = () => syncRollHarmony();

      function playSinglePosition(position, element) {
        const cents = effectiveMidiOffset();
        const frequency = midiPositionFrequency(position, rootHz, cents);
        const voice = createHeldPianoVoice(frequency);
        element.classList.add("is-active");
        rollReadout.textContent = `${positionLabel(position)} · ${frequency.toFixed(2)} Hz · ${signed(cents)}¢`;
        window.setTimeout(() => {
          voice.stop();
          element.classList.remove("is-active");
        }, 650);
      }

      rollNoteOn = (midi, velocity = 100, reveal = true) => {
        if (!Number.isInteger(midi) || midi < 0 || midi > 127) return;
        activeMidiNotes.add(midi);
        setRollPositionActive(midi);
        const key = body.querySelector(`[data-roll-midi="${midi}"]`);
        if (reveal && key) key.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        syncRollHarmony(velocity);
      };
      rollNoteOff = midi => {
        activeMidiNotes.delete(midi);
        setRollPositionActive(midi);
        syncRollHarmony();
      };
      for (const position of currentHarmony()) setRollPositionActive(position);
      syncRollHarmony();

      body.querySelectorAll("[data-roll-midi]").forEach(key => key.addEventListener("click", () => {
        const position = Number(key.dataset.rollMidi);
        if (rollChordLatch) {
          if (latchedRollNotes.has(position)) latchedRollNotes.delete(position);
          else latchedRollNotes.add(position);
          setRollPositionActive(position);
          syncRollHarmony();
        } else {
          playSinglePosition(position, key);
        }
      }));
      body.querySelectorAll("[data-roll-position]").forEach(seam => seam.addEventListener("click", () => {
        const position = Number(seam.dataset.rollPosition);
        if (rollChordLatch) {
          if (latchedRollNotes.has(position)) latchedRollNotes.delete(position);
          else latchedRollNotes.add(position);
          setRollPositionActive(position);
          syncRollHarmony();
        } else {
          playSinglePosition(position, seam);
        }
      }));

      function applyRollZoom(value, pointerRatio = 0.5) {
        const oldWidth = rollSurface.getBoundingClientRect().width;
        const focus = oldWidth ? (rollScroll.scrollLeft + rollScroll.clientWidth * pointerRatio) / oldWidth : 0.5;
        rollZoom = Math.max(40, Math.min(200, Math.round(value / 5) * 5));
        const whiteWidth = 42 * rollZoom / 100;
        rollSurface.style.setProperty("--white-width", `${whiteWidth}px`);
        rollSurface.style.width = `${52 * whiteWidth}px`;
        zoomInput.value = String(rollZoom);
        zoomOutput.value = `${rollZoom}%`;
        zoomOutput.textContent = `${rollZoom}%`;
        const newWidth = 52 * whiteWidth;
        rollScroll.scrollLeft = focus * newWidth - rollScroll.clientWidth * pointerRatio;
      }
      zoomInput.addEventListener("input", () => applyRollZoom(Number(zoomInput.value)));
      body.querySelectorAll("[data-roll-zoom]").forEach(button => button.addEventListener("click", () => applyRollZoom(rollZoom + Number(button.dataset.rollZoom))));
      offsetInput.addEventListener("input", () => {
        if (offsetInput.value === "") return;
        const value = Number(offsetInput.value);
        if (!Number.isFinite(value)) return;
        midiCentsOffset = Math.max(-1200, Math.min(1200, value));
        offsetInput.value = String(midiCentsOffset);
        rollReadout.textContent = `${copy.midiOffset}: ${signed(midiCentsOffset)}¢`;
        if (currentHarmony().length) syncRollHarmony();
      });
      const latchButton = body.querySelector("#micro-chord-latch");
      latchButton.addEventListener("click", () => {
        rollChordLatch = !rollChordLatch;
        latchButton.classList.toggle("active", rollChordLatch);
        latchButton.setAttribute("aria-pressed", String(rollChordLatch));
        if (!rollChordLatch) {
          const previous = [...latchedRollNotes];
          latchedRollNotes.clear();
          previous.forEach(setRollPositionActive);
          syncRollHarmony();
        }
      });
      body.querySelector("#micro-chord-clear").addEventListener("click", () => {
        const previous = [...latchedRollNotes];
        latchedRollNotes.clear();
        previous.forEach(setRollPositionActive);
        syncRollHarmony();
      });
      body.querySelector("#micro-midi-connect").addEventListener("click", connectMidi);

      let dragStart = null;
      let dragged = false;
      rollScroll.addEventListener("pointerdown", event => {
        if (event.button !== 0) return;
        dragStart = { x: event.clientX, scrollLeft: rollScroll.scrollLeft };
        dragged = false;
      });
      rollScroll.addEventListener("pointermove", event => {
        if (!dragStart) return;
        const delta = event.clientX - dragStart.x;
        if (Math.abs(delta) > 4 && !dragged) {
          dragged = true;
          rollScroll.setPointerCapture(event.pointerId);
          rollScroll.classList.add("is-dragging");
        }
        if (dragged) rollScroll.scrollLeft = dragStart.scrollLeft - delta;
      });
      const finishDrag = event => {
        if (!dragStart) return;
        if (rollScroll.hasPointerCapture(event.pointerId)) rollScroll.releasePointerCapture(event.pointerId);
        dragStart = null;
        rollScroll.classList.remove("is-dragging");
      };
      rollScroll.addEventListener("pointerup", finishDrag);
      rollScroll.addEventListener("pointercancel", finishDrag);
      rollScroll.addEventListener("click", event => {
        if (!dragged) return;
        event.preventDefault();
        event.stopPropagation();
        dragged = false;
      }, true);
      rollScroll.addEventListener("wheel", event => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          const rect = rollScroll.getBoundingClientRect();
          applyRollZoom(rollZoom + (event.deltaY < 0 ? 10 : -10), (event.clientX - rect.left) / rect.width);
        } else if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
          event.preventDefault();
          rollScroll.scrollLeft += event.deltaY;
        }
      }, { passive: false });
      if (midiAccess) attachMidiInputs();
      else updateMidiStatus();
      readout.textContent = `${copy.pianoReadout}: ${rootHz.toFixed(2)} Hz · C 0.00¢`;
    } catch (error) {
      ratiosInput.setAttribute("aria-invalid", "true");
      body.textContent = error.message || copy.inputError;
      body.classList.add("micro-input-error");
      return;
    }
    body.classList.remove("micro-input-error");
  }

  preset.addEventListener("change", () => {
    if (MICRO_PRESETS[preset.value]) ratiosInput.value = MICRO_PRESETS[preset.value].ratios.join(" ");
    render();
  });
  ratiosInput.addEventListener("input", () => {
    if (preset.value !== "custom") preset.value = "custom";
    render();
  });
  for (const input of [edoInput, methodInput, rootInput]) input.addEventListener("change", render);
  edoInput.addEventListener("input", render);
  panel.querySelectorAll("[data-edo]").forEach(button => button.addEventListener("click", () => {
    edoInput.value = button.dataset.edo;
    render();
  }));
  render();
}
