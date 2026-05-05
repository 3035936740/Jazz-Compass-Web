import { EnhancedChordConverter, JazzBrain } from "./jazz_compass.js";
import * as lang from "./lang.js";

document.addEventListener("DOMContentLoaded", () => {

  let circleCurrentKey = null; // 当前选中的调性
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // 如果音频上下文被暂停，尝试恢复
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  /**
   * 钢琴风格的 ADSR 包络
   */
  function applyPianoEnvelope(gainNode, time, duration) {
    const now = time;
    // 确保 gainNode 是 AudioParam
    const gain = gainNode.gain;
    gain.setValueAtTime(0, now);
    // 快速起音（钢琴锤击弦）
    gain.linearRampToValueAtTime(1, now + 0.003);
    // 衰减到持续电平
    gain.linearRampToValueAtTime(0.4, now + 0.08);
    // 持续
    gain.setValueAtTime(0.35, now + 0.15);
    // 缓慢释放（模拟延音踏板）
    gain.exponentialRampToValueAtTime(0.001, now + duration * 1.5);
  }

  /**
   * 播放单个音符的钢琴音色
   */
  function createPianoTone(ctx, freq, time, duration) {
    const masterGain = ctx.createGain();

    // 钢琴谐波结构
    const harmonics = [
      { ratio: 1, amp: 0.25 },     // 基频
      { ratio: 2, amp: 0.15 },     // 八度
      { ratio: 3, amp: 0.10 },     // 十二度
      { ratio: 4, amp: 0.05 },     // 双八度
      { ratio: 5, amp: 0.03 },     // 十七度
      { ratio: 6, amp: 0.02 },     // 十九度
      { ratio: 7, amp: 0.01 },     // 弱七次谐波
      { ratio: 0.5, amp: 0.08 },   // 次谐波（增加厚度）
    ];

    harmonics.forEach(({ ratio, amp }) => {
      const osc = ctx.createOscillator();
      const harmonicGain = ctx.createGain();

      // 三角波模拟钢琴音色
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq * ratio, time);

      // 应用振幅和包络
      harmonicGain.gain.setValueAtTime(0, time);
      harmonicGain.gain.linearRampToValueAtTime(amp * 0.25, time + 0.003);
      harmonicGain.gain.linearRampToValueAtTime(amp * 0.1, time + 0.08);
      harmonicGain.gain.setValueAtTime(amp * 0.08, time + 0.15);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, time + duration * 1.5);

      osc.connect(harmonicGain);
      harmonicGain.connect(masterGain);

      osc.start(time);
      osc.stop(time + duration * 1.5);
    });

    // 添加轻微失真
    const waveshaper = ctx.createWaveShaper();
    const n = 256;
    const curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = Math.tanh(2 * x);
    }
    waveshaper.curve = curve;
    waveshaper.oversample = "2x";

    masterGain.connect(waveshaper);

    return waveshaper;
  }

  /**
   * 简单的混响效果
   */
  function createReverb(ctx, duration) {
    const convolver = ctx.createConvolver();

    // 创建脉冲响应
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * 1.5);
    const impulse = ctx.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) *
          Math.exp(-i / (sampleRate * 0.3)) *
          (1 - i / length);
      }
    }

    convolver.buffer = impulse;
    return convolver;
  }

  /**
   * 播放和弦声音 - 钢琴音色版本（多八度扩展）
   */
  function playChord(frequencies, duration = 1.8) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // 主输出（降低整体音量，因为多个八度叠加）
      const mainOut = ctx.createGain();
      mainOut.gain.setValueAtTime(0.4, now);

      // 混响
      const reverb = createReverb(ctx, duration);
      const dryGain = ctx.createGain();
      const wetGain = ctx.createGain();

      dryGain.gain.setValueAtTime(0.6, now);
      wetGain.gain.setValueAtTime(0.4, now);

      // 为每个频率创建钢琴音色
      frequencies.forEach((freq, index) => {
        // 音符轻微错开（模拟手指滚动）
        const staggerTime = index * 0.015;
        const noteTime = now + staggerTime;

        // 低八度和高八度的音量降低一些
        const tone = createPianoTone(ctx, freq, noteTime, duration);

        // 干声
        tone.connect(dryGain);

        // 湿声（混响）
        tone.connect(wetGain);
      });

      dryGain.connect(mainOut);
      wetGain.connect(reverb);
      reverb.connect(mainOut);
      mainOut.connect(ctx.destination);

    } catch (e) {
      console.warn("play scale failure:", e);
    }
  }

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

    return noteMap[noteName];
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

  /**
   * 获取和弦中所有音符的频率（扩展到多个八度）
   * @param {Array} notes - 音符名数组，如 ['C', 'E', 'G']
   * @param {number} baseOctave - 基准八度，默认 C3 开始
   * @returns {Array} 频率数组
   */
  function chordNotesToFrequencies(notes, baseOctave = 3) {
    const freqs = [];

    notes.forEach((note) => {
      const semitone = noteToSemitoneValue(note);
      if (semitone === undefined) return;

      // 基准八度
      freqs.push(semitoneToFreq(semitone, baseOctave));

      // 2个低八度
      freqs.push(semitoneToFreq(semitone, baseOctave - 1));
      freqs.push(semitoneToFreq(semitone, baseOctave - 2));

      // 2个高八度
      freqs.push(semitoneToFreq(semitone, baseOctave + 1));
      freqs.push(semitoneToFreq(semitone, baseOctave + 2));
    });

    return freqs;
  }

  let majorMode = "natural"; // "natural" | "harmonic"
  let minorMode = "natural"; // "natural" | "harmonic"
  const canvas = document.getElementById("circle-canvas");
  const container = document.getElementById("circle-canvas-container");
  const tableContainer = document.getElementById("circle-table-container");
  const resetBtn = document.getElementById("circle-reset");

  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = "true";

  // Canvas 尺寸适配
  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    const size = Math.min(rect.width, 520);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    return { size, ctx };
  }

  // 五度圈数据：按五度顺序排列（从 F 开始顺时针）
  const circleData = [
    { major: "C", minor: "Am", sharps: 0, flats: 0, enharmonic: null },
    { major: "G", minor: "Em", sharps: 1, flats: 0, enharmonic: null },
    { major: "D", minor: "Bm", sharps: 2, flats: 0, enharmonic: null },
    { major: "A", minor: "F#m", sharps: 3, flats: 0, enharmonic: null },
    { major: "E", minor: "C#m", sharps: 4, flats: 0, enharmonic: null },
    { major: "B", minor: "G#m", sharps: 5, flats: 0, enharmonic: "Cb" },
    { major: "Gb", minor: "Ebm", sharps: 6, flats: 6, enharmonic: "F#" },
    { major: "Db", minor: "Bbm", sharps: 0, flats: 5, enharmonic: "C#" },
    { major: "Ab", minor: "Fm", sharps: 0, flats: 4, enharmonic: null },
    { major: "Eb", minor: "Cm", sharps: 0, flats: 3, enharmonic: null },
    { major: "Bb", minor: "Gm", sharps: 0, flats: 2, enharmonic: null },
    { major: "F", minor: "Dm", sharps: 0, flats: 1, enharmonic: null },
  ];

  // 大调音级公式
  const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
  // 自然小调音级公式
  const minorScaleIntervals = [0, 2, 3, 5, 7, 8, 10];
  // 和声大调音级公式 (降6级)
  const harmonicMajorIntervals = [0, 2, 4, 5, 7, 8, 11];
  // 和声小调音级公式 (升7级)
  const harmonicMinorIntervals = [0, 2, 3, 5, 7, 8, 11];

  const majorChordTypes = ["maj", "m", "m", "maj", "maj", "m", "dim"];
  const minorChordTypes = ["m", "dim", "maj", "m", "m", "maj", "maj"];
  // 和声大调和弦类型 (降6级使 IV 变成小和弦, vi° 变成减和弦)
  const harmonicMajorChordTypes = [
    "maj",
    "dim",
    "m",
    "m",
    "maj",
    "aug",
    "dim",
  ];
  // 和声小调和弦类型 (升7级使 V 变成大和弦, vii° 变成减和弦)
  const harmonicMinorChordTypes = [
    "m",
    "dim",
    "aug",
    "m",
    "maj",
    "maj",
    "dim",
  ];

  const majorDegreeNums = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
  const minorDegreeNums = ["i", "ii°", "III", "iv", "v", "VI", "VII"];
  // 和声大调音级
  const harmonicMajorDegreeNums = [
    "I",
    "ii°",
    "iii",
    "iv",
    "V",
    "VI+",
    "vii°",
  ];
  // 和声小调音级
  const harmonicMinorDegreeNums = [
    "i",
    "ii°",
    "III+",
    "iv",
    "V",
    "VI",
    "vii°",
  ];

  // 音符标准化映射
  const noteNormalize = {
    "E#": "F",
    Fb: "E",
    "B#": "C",
    Cb: "B",
  };
  function normalizeNote(n) {
    return noteNormalize[n] || n;
  }

  // 扩展音符列表，支持所有常见等音名
  const allNotesExt = [
    "C",
    "C#",
    "Db",
    "D",
    "D#",
    "Eb",
    "E",
    "E#",
    "Fb",
    "F",
    "F#",
    "Gb",
    "G",
    "G#",
    "Ab",
    "A",
    "A#",
    "Bb",
    "B",
    "B#",
    "Cb",
  ];
  const semitoneMap = {
    C: 0,
    "B#": 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    Fb: 4,
    "E#": 5,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
    Cb: 11,
  };
  const noteNormalizeFull = {
    C: "C",
    "C#": "C#",
    Db: "Db",
    D: "D",
    "D#": "D#",
    Eb: "Eb",
    E: "E",
    "E#": "E#",
    Fb: "Fb",
    F: "F",
    "F#": "F#",
    Gb: "Gb",
    G: "G",
    "G#": "G#",
    Ab: "Ab",
    A: "A",
    "A#": "A#",
    Bb: "Bb",
    B: "B",
    "B#": "B#",
    Cb: "Cb",
    // 复合名映射到标准名
    Cbm: "Cb",
    "B#m": "B#",
  };

  // 核心：将任何输入音符标准化为 0-11 索引
  function noteToSemitone(note) {
    // 去掉后缀如 'm', 'dim', '°' 等
    let clean = note
      .replace(/m$/, "")
      .replace(/dim$/, "")
      .replace(/°$/, "")
      .trim();
    const normalized = noteNormalizeFull[clean] || clean;
    if (semitoneMap[normalized] !== undefined) {
      return semitoneMap[normalized];
    }
    console.warn("Unknown note for semitone conversion:", note);
    return undefined;
  }

  function semitoneToNote(idx, preferSharps = false) {
    const preferred = preferSharps
      ? ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
      : ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    return preferred[idx % 12];
  }

  // 覆盖原有的 allNotes/noteToIdx/idxToNote
  const allNotes = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];
  const noteToIdx = Object.fromEntries(allNotes.map((n, i) => [n, i]));
  const idxToNote = allNotes;

  // 获取音阶音符（使用半音索引，避免等音名匹配失败）
  function getScaleNotes(root, intervals) {
    const rootIdx = noteToSemitone(root);
    if (rootIdx === undefined) {
      console.error("Unknown root:", root);
      return intervals.map(() => "?");
    }
    const preferSharps = /[#♯]/.test(root);
    return intervals.map((i) => semitoneToNote((rootIdx + i) % 12, preferSharps));
  }

  const axisColorMap = {
    T: {
      major: "rgba(96,180,255,0.26)",
      minor: "rgba(96,180,255,0.18)",
      highlight: "rgba(96,180,255,0.42)",
    },
    D: {
      major: "rgba(255,178,92,0.26)",
      minor: "rgba(255,178,92,0.18)",
      highlight: "rgba(255,178,92,0.42)",
    },
    S: {
      major: "rgba(140,220,140,0.26)",
      minor: "rgba(140,220,140,0.18)",
      highlight: "rgba(140,220,140,0.42)",
    },
    default: {
      major: "rgba(255,255,255,0.06)",
      minor: "rgba(255,255,255,0.03)",
      highlight: "rgba(255,255,255,0.18)",
    },
  };

  function getAxisRoot(highlightMajor, highlightMinor) {
    if (highlightMajor) return highlightMajor;
    const found = circleData.find(
      (item) =>
        item.minor === highlightMinor ||
        item.major === highlightMinor ||
        item.enharmonic === highlightMinor,
    );
    return found ? found.major : null;
  }

  function getAxisGroup(itemMajor, axisRoot) {
    if (!axisRoot) return null;
    const rootIndex = circleData.findIndex(
      (item) =>
        item.major === axisRoot ||
        item.enharmonic === axisRoot ||
        item.minor === axisRoot,
    );
    const itemIndex = circleData.findIndex(
      (item) =>
        item.major === itemMajor ||
        item.enharmonic === itemMajor ||
        item.minor === itemMajor,
    );
    if (rootIndex < 0 || itemIndex < 0) return null;
    const offset = (itemIndex - rootIndex + 12) % 12;
    if (offset % 3 === 0) return "T";
    if (offset % 3 === 1) return "D";
    return "S";
  }

  // 绘制五度圈
  function drawCircle(highlightMajor, highlightMinor) {
    const { size, ctx } = resizeCanvas();
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.42;
    const innerR = size * 0.28;
    const centerR = size * 0.12;

    ctx.clearRect(0, 0, size, size);

    // 背景
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.beginPath();
    ctx.arc(cx, cy, outerR + 20, 0, Math.PI * 2);
    ctx.fill();

    const axisRoot = getAxisRoot(highlightMajor, highlightMinor);
    circleData.forEach((item, i) => {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const nextAngle = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2;
      const axisGroup = getAxisGroup(item.major, axisRoot);

      // 外环（大调）
      const isHighlightedOuter = highlightMajor === item.major;
      drawArcSegment(
        ctx,
        cx,
        cy,
        innerR,
        outerR,
        angle,
        nextAngle,
        item.major,
        item.sharps,
        item.flats,
        isHighlightedOuter,
        "major",
        axisGroup,
      );

      // 内环（小调）
      const isHighlightedInner = highlightMinor === item.minor;
      drawArcSegment(
        ctx,
        cx,
        cy,
        centerR,
        innerR,
        angle,
        nextAngle,
        item.minor,
        item.sharps,
        item.flats,
        isHighlightedInner,
        "minor",
        axisGroup,
      );

      // 扇区分隔线
      ctx.beginPath();
      ctx.moveTo(
        cx + Math.cos(angle) * centerR,
        cy + Math.sin(angle) * centerR,
      );
      ctx.lineTo(
        cx + Math.cos(angle) * outerR,
        cy + Math.sin(angle) * outerR,
      );
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 中心标签
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(window.__("nav_circle"), cx, cy - 6);
    ctx.font = "9px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("Circle of 5ths", cx, cy + 10);
  }

  function drawArcSegment(
    ctx,
    cx,
    cy,
    innerR,
    outerR,
    startAngle,
    endAngle,
    label,
    sharps,
    flats,
    isHighlighted,
    type,
    axisGroup,
  ) {
    const midAngle = (startAngle + endAngle) / 2;
    const midR = (innerR + outerR) / 2;

    // 填充
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, endAngle);
    ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
    ctx.closePath();

    const axisColor =
      axisGroup && axisColorMap[axisGroup]
        ? axisColorMap[axisGroup][type]
        : axisColorMap.default[type];
    const highlightColor =
      axisGroup && axisColorMap[axisGroup]
        ? axisColorMap[axisGroup].highlight
        : axisColorMap.default.highlight;
    if (isHighlighted) {
      const grad = ctx.createLinearGradient(
        cx + Math.cos(midAngle) * innerR,
        cy + Math.sin(midAngle) * innerR,
        cx + Math.cos(midAngle) * outerR,
        cy + Math.sin(midAngle) * outerR,
      );
      grad.addColorStop(0, highlightColor);
      grad.addColorStop(1, "rgba(255,255,255,0.15)");
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = axisColor;
    }
    ctx.fill();

    // 边框
    ctx.strokeStyle = isHighlighted
      ? type === "major"
        ? "rgba(100,180,255,0.8)"
        : "rgba(255,160,120,0.7)"
      : "rgba(255,255,255,0.15)";
    ctx.lineWidth = isHighlighted ? 2 : 1;
    ctx.stroke();

    // 标签
    const textX = cx + Math.cos(midAngle) * midR;
    const textY = cy + Math.sin(midAngle) * midR;

    ctx.fillStyle = isHighlighted ? "#fff" : "rgba(255,255,255,0.8)";
    ctx.font = isHighlighted ? "bold 13px sans-serif" : "12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, textX, textY);

    // 升号/降号数量小标
    if (sharps > 0 || flats > 0) {
      const subLabel = sharps > 0 ? `${sharps}♯` : `${flats}♭`;
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.font = "8px sans-serif";
      ctx.fillText(subLabel, textX, textY + (type === "major" ? 14 : -14));
    }
  }
  function createModeButton(label, isActive, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.padding = "6px 14px";
    btn.style.borderRadius = "6px";
    btn.style.border = isActive
      ? "2px solid var(--accent-2)"
      : "1px solid rgba(255,255,255,0.2)";
    btn.style.background = isActive
      ? "rgba(255,255,255,0.12)"
      : "transparent";
    btn.style.color = isActive ? "#fff" : "var(--muted)";
    btn.style.fontSize = "0.85em";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.2s";
    btn.addEventListener("mouseenter", () => {
      if (!isActive) {
        btn.style.background = "rgba(255,255,255,0.06)";
        btn.style.color = "#ddd";
      }
    });
    btn.addEventListener("mouseleave", () => {
      if (!isActive) {
        btn.style.background = "transparent";
        btn.style.color = "var(--muted)";
      }
    });
    btn.addEventListener("click", onClick);
    return btn;
  }

  // 生成调性对照表
  function renderKeyTable(majorKey, minorKey, primarySection = "major") {
    tableContainer.innerHTML = "";

    // --- 大调切换按钮 ---
    const majorToggleRow = document.createElement("div");
    majorToggleRow.style.display = "flex";
    majorToggleRow.style.gap = "8px";
    majorToggleRow.style.marginBottom = "12px";

    const naturalMajorLabel =
      window.__("circle_major_natural") || "Natural Major";
    const harmonicMajorLabel =
      window.__("circle_major_harmonic") || "Harmonic Major";

    const btnMajorNatural = createModeButton(
      `${naturalMajorLabel} (${majorKey})`,
      majorMode === "natural",
      () => {
        majorMode = "natural";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    const btnMajorHarmonic = createModeButton(
      `${harmonicMajorLabel} (${majorKey})`,
      majorMode === "harmonic",
      () => {
        majorMode = "harmonic";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    majorToggleRow.appendChild(btnMajorNatural);
    majorToggleRow.appendChild(btnMajorHarmonic);

    // --- 大调表 ---
    const majorSec = document.createElement("div");
    majorSec.style.marginBottom = "20px";

    const intervals =
      majorMode === "harmonic" ? harmonicMajorIntervals : majorScaleIntervals;
    const chordTypes =
      majorMode === "harmonic" ? harmonicMajorChordTypes : majorChordTypes;
    const degreeNums =
      majorMode === "harmonic" ? harmonicMajorDegreeNums : majorDegreeNums;
    const funcs =
      majorMode === "harmonic"
        ? buildHarmonicMajorFuncs()
        : buildMajorFuncs();
    const modeLabel =
      majorMode === "harmonic"
        ? window.__("circle_major_harmonic") || "Harmonic Major"
        : window.__("circle_major_natural") || "Natural Major";

    const majorNotes = getScaleNotes(majorKey, intervals);

    const majorTitle = document.createElement("h4");
    majorTitle.className = "section-title";
    majorTitle.style.margin = "0 0 10px 0";
    majorTitle.innerHTML = `<span style="color:var(--accent-2);">${majorKey} ${modeLabel}</span>`;
    majorSec.appendChild(majorTitle);
    majorSec.appendChild(
      buildDegreeTable(majorNotes, degreeNums, funcs, chordTypes, majorKey),
    );

    // --- 分隔线 ---
    const divider = document.createElement("hr");
    divider.style.border = "none";
    divider.style.borderTop = "1px solid rgba(255,255,255,0.1)";
    divider.style.margin = "16px 0";

    // --- 小调切换按钮 ---
    const minorToggleRow = document.createElement("div");
    minorToggleRow.style.display = "flex";
    minorToggleRow.style.gap = "8px";
    minorToggleRow.style.marginBottom = "12px";
    const naturalMinorLabel =
      window.__("circle_minor_natural") || "Natural Minor";
    const harmonicMinorLabel =
      window.__("circle_minor_harmonic") || "Harmonic Minor";

    const btnMinorNatural = createModeButton(
      `${naturalMinorLabel} (${minorKey})`,
      minorMode === "natural",
      () => {
        minorMode = "natural";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    const btnMinorHarmonic = createModeButton(
      `${harmonicMinorLabel} (${minorKey})`,
      minorMode === "harmonic",
      () => {
        minorMode = "harmonic";
        renderKeyTable(majorKey, minorKey, circleCurrentKey?.primary || "major");
      },
    );
    minorToggleRow.appendChild(btnMinorNatural);
    minorToggleRow.appendChild(btnMinorHarmonic);

    // --- 小调表 ---
    const minorSec = document.createElement("div");

    const mIntervals =
      minorMode === "harmonic" ? harmonicMinorIntervals : minorScaleIntervals;
    const mChordTypes =
      minorMode === "harmonic" ? harmonicMinorChordTypes : minorChordTypes;
    const mDegreeNums =
      minorMode === "harmonic" ? harmonicMinorDegreeNums : minorDegreeNums;
    const mFuncs =
      minorMode === "harmonic"
        ? buildHarmonicMinorFuncs()
        : buildMinorFuncs();
    const mModeLabel =
      minorMode === "harmonic"
        ? window.__("circle_minor_harmonic") || "Harmonic Minor"
        : window.__("circle_minor_natural") || "Natural Minor";

    const minorNotes = getScaleNotes(minorKey, mIntervals);

    const minorTitle = document.createElement("h4");
    minorTitle.className = "section-title";
    minorTitle.style.margin = "0 0 10px 0";
    minorTitle.innerHTML = `<span style="color:var(--accent-2);">${minorKey} ${mModeLabel}</span>`;
    minorSec.appendChild(minorTitle);
    minorSec.appendChild(
      buildDegreeTable(
        minorNotes,
        mDegreeNums,
        mFuncs,
        mChordTypes,
        minorKey,
      ),
    );

    if (primarySection === "major") {
      tableContainer.appendChild(majorToggleRow);
      tableContainer.appendChild(majorSec);
      tableContainer.appendChild(divider);
      tableContainer.appendChild(minorToggleRow);
      tableContainer.appendChild(minorSec);
    } else {
      tableContainer.appendChild(minorToggleRow);
      tableContainer.appendChild(minorSec);
      tableContainer.appendChild(divider);
      tableContainer.appendChild(majorToggleRow);
      tableContainer.appendChild(majorSec);
    }
  }

  function buildDegreeTable(notes, degreeNums, funcs, chordTypes, keyRoot) {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.fontSize = "0.9em";
    table.className = "degree-table clickable";

    // 表头
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    [
      window.__("circle_col_degree") || "Degree",
      window.__("circle_col_chord") || "Chord",
      window.__("circle_col_function") || "Function",
      window.__("circle_col_notes") || "Notes",
    ].forEach((h) => {
      const th = document.createElement("th");
      th.style.padding = "8px 6px";
      th.style.borderBottom = "1px solid rgba(255,255,255,0.15)";
      th.style.textAlign = "left";
      th.style.color = "var(--muted)";
      th.style.fontWeight = "500";
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 表体
    const tbody = document.createElement("tbody");
    const degreeColors = [
      "rgba(100,200,255,0.15)",
      "rgba(150,150,220,0.1)",
      "rgba(150,150,220,0.1)",
      "rgba(100,255,180,0.12)",
      "rgba(255,180,100,0.15)",
      "rgba(150,150,220,0.1)",
      "rgba(255,120,120,0.12)",
    ];
    const augColor = "rgba(255,200,80,0.2)";

    notes.forEach((note, i) => {
      const row = document.createElement("tr");
      const degStr = degreeNums[i] || "";
      const isAug = degStr.includes("+");
      const isDim = degStr.includes("°");
      row.style.background = isAug ? augColor : degreeColors[i];
      row.style.cursor = "pointer";
      row.style.transition = "all 0.2s ease";

      const degCell = document.createElement("td");
      degCell.style.padding = "8px 6px";
      degCell.style.fontWeight = "bold";
      degCell.textContent = degStr;
      row.appendChild(degCell);

      const chordCell = document.createElement("td");
      chordCell.style.padding = "8px 6px";
      chordCell.style.fontWeight = "600";
      const chordNameFull = formatChordNameFull(note, degStr);
      chordCell.textContent = chordNameFull;
      row.appendChild(chordCell);

      const funcCell = document.createElement("td");
      funcCell.style.padding = "8px 6px";
      funcCell.style.color = "var(--muted)";
      funcCell.style.fontSize = "0.85em";
      funcCell.textContent = funcs[i] || "";
      row.appendChild(funcCell);

      const notesCell = document.createElement("td");
      notesCell.style.padding = "8px 6px";
      notesCell.style.display = "flex";
      notesCell.style.gap = "3px";
      notesCell.style.flexWrap = "wrap";

      const chordType = chordTypes[i] || "maj";
      const chordIntervals = getIntervalsByType(chordType);
      const chordNoteNames = []; // 收集和弦音符
      chordIntervals.forEach((interval) => {
        const noteSemitone = noteToSemitone(note);
        if (noteSemitone === undefined) return;
        const idx = (noteSemitone + interval) % 12;
        const chordNote = semitoneToNote(idx);
        chordNoteNames.push(chordNote);
        const span = document.createElement("span");
        span.style.padding = "2px 6px";
        span.style.borderRadius = "3px";
        span.style.background = "rgba(255,255,255,0.08)";
        span.style.fontSize = "0.85em";
        span.textContent = chordNote;
        notesCell.appendChild(span);
      });
      row.appendChild(notesCell);

      // ============ 点击播放声音 ============
      const chordFreqs = chordNotesToFrequencies(chordNoteNames);

      const audioIndicator = document.createElement("span");
      audioIndicator.textContent = " 🔊";
      audioIndicator.style.opacity = "0";
      audioIndicator.style.transition = "opacity 0.2s";
      audioIndicator.style.fontSize = "0.8em";
      chordCell.appendChild(audioIndicator);

      row.addEventListener("mouseenter", () => {
        row.style.background = isAug
          ? "rgba(255,220,100,0.35)"
          : degreeColors[i].replace("0.1", "0.25").replace("0.12", "0.28").replace("0.15", "0.32");
        row.style.transform = "translateX(4px)";
        audioIndicator.style.opacity = "1";
      });

      row.addEventListener("mouseleave", () => {
        row.style.background = isAug ? augColor : degreeColors[i];
        row.style.transform = "translateX(0)";
        audioIndicator.style.opacity = "0";
      });

      row.addEventListener("click", () => {
        row.style.transform = "scale(0.98)";
        setTimeout(() => {
          row.style.transform = "translateX(4px)";
        }, 100);
        playChord(chordFreqs);
      });

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
  }

  function formatChordNameFull(root, degreeStr) {
    const cleanRoot = semitoneToNote(noteToSemitone(root) || 0);
    if (degreeStr.includes("°")) return cleanRoot + "°";
    if (degreeStr.includes("+")) return cleanRoot + "+";
    if (degreeStr === degreeStr.toLowerCase() && degreeStr.includes("m"))
      return cleanRoot + "m";
    // I, IV, V 等大写 = 大三和弦
    if (
      degreeStr === degreeStr.toUpperCase() &&
      !degreeStr.includes("°") &&
      !degreeStr.includes("+")
    )
      return cleanRoot;
    // ii, iii, vi 等小写 = 小和弦
    if (degreeStr === degreeStr.toLowerCase()) return cleanRoot + "m";
    return cleanRoot;
  }

  function getIntervalsByType(type) {
    switch (type) {
      case "maj":
        return [0, 4, 7];
      case "m":
        return [0, 3, 7];
      case "dim":
        return [0, 3, 6];
      case "aug":
        return [0, 4, 8];
      default:
        return [0, 4, 7];
    }
  }

  // Canvas 点击事件
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const size = rect.width;
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const cx = size / 2;
    const cy = size / 2;
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const outerR = size * 0.42;
    const innerR = size * 0.28;
    const centerR = size * 0.12;

    if (dist < centerR || dist > outerR) return;

    let angle = Math.atan2(y - cy, x - cx) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    const sectorIndex = Math.floor((angle / (Math.PI * 2)) * 12) % 12;
    const item = circleData[sectorIndex];

    if (dist >= innerR && dist <= outerR) {
      // 点击外环 — 大调
      circleCurrentKey = {
        major: item.major,
        minor: item.minor,
        primary: "major",
      };
      drawCircle(item.major, null);
      renderKeyTable(item.major, item.minor, "major");
    } else if (dist >= centerR && dist < innerR) {
      // 点击内环 — 小调
      circleCurrentKey = {
        major: item.major,
        minor: item.minor,
        primary: "minor",
      };
      drawCircle(null, item.minor);
      renderKeyTable(item.major, item.minor, "minor");
    }
  });

  // 重置按钮
  resetBtn.addEventListener("click", () => {
    circleCurrentKey = null;
    drawCircle(null, null);
    tableContainer.innerHTML = "";
  });

  // 窗口大小变化重绘
  window.addEventListener("resize", () => {
    if (document.getElementById("panel-circle").style.display !== "none") {
      if (circleCurrentKey) {
        drawCircle(
          circleCurrentKey.primary === "major"
            ? circleCurrentKey.major
            : null,
          circleCurrentKey.primary === "minor"
            ? circleCurrentKey.minor
            : null,
        );
        renderKeyTable(
          circleCurrentKey.major,
          circleCurrentKey.minor,
          circleCurrentKey.primary,
        );
      } else {
        drawCircle(null, null);
      }
    }
  });

  // 初始绘制
  drawCircle(null, null);


  const navButtons = Array.from(document.querySelectorAll(".feature-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  const conv = new EnhancedChordConverter();
  const brain = new JazzBrain();
  // state for "other" panel mode
  let currentOtherMode = "report";

  // 本地化负和声轴标签
  const axisLabelEl = document.getElementById("label_other_axis");
  if (axisLabelEl && window.__) {
    axisLabelEl.textContent = window.__("neg_axis") || "Axis";
  }

  function showOnlyFeature(feature) {
    navButtons.forEach((b) =>
      b.classList.toggle("active", b.dataset.feature === feature),
    );
    panels.forEach((p) => {
      const f = p.dataset.feature;
      if (f === feature) {
        p.style.display = "block";
        p.setAttribute("aria-hidden", "false");
      } else {
        p.style.display = "none";
        p.setAttribute("aria-hidden", "true");
      }
    });
    // special handling for about panel
    if (feature === "about") {
      showAbout();
    }
    if (feature === "circle") {
      drawCircle(null, null);
    }
    if (feature === "ref") {
      initRefPanel();
    }
  }

  function showAbout() {
    const aboutBody = document.getElementById("panel-about-body");
    if (!aboutBody) return;

    const html = `
      <h3>${window.__("about_title")}</h3>
      <p>${window.__("about_desc")}</p>
      
      <h4 style="margin-top:20px">${window.__("about_features")}</h4>
      <ul style="margin-left:20px">
        <li>${window.__("about_feature_chord")}</li>
        <li>${window.__("about_feature_blues")}</li>
        <li>${window.__("about_feature_lcc")}</li>
        <li>${window.__("about_feature_cst")}</li>
      </ul>
      
      <h4 style="margin-top:20px">${window.__("about_github")}</h4>
      <div style="margin: 12px 0;">
        <p>
          <a href="https://github.com/3035936740/Jazz-Compass-Web" target="_blank" style="color:#0066cc">
            ${window.__("about_github_web")}
          </a>
        </p>
        <p>
          <a href="https://github.com/3035936740/JazzCompassPy" target="_blank" style="color:#0066cc">
            ${window.__("about_github_py")}
          </a>
        </p>
      </div>
      
      <hr style="margin-top:30px">
      <p style="font-size:0.9em; color:#999">${window.__("about_footer")}</p>
    `;

    aboutBody.innerHTML = html;
  }

  function prettyChordRender(targetEl, inputValue) {
    const v = inputValue.trim();
    const data = conv._ensureNotesAndRoot(v, true);
    const notes = data.notes;
    const chord = data.chord;

    if (notes && Array.isArray(notes) && notes.length > 0) {
      const offsets = notes.map((n) => conv.noteToIdx[n]);
      // 美化输出：根 / 链接 和 列表 + 偏移 + 小键盘视图
      const root = notes[0];
      const isSlash = v.includes("/");
      const htmlParts = [];
      // 更紧凑的标题间距
      htmlParts.push(
        `<h2 style="margin: -4px 0 2px; font-size: 1.25rem;">${window.__f("chord_label")}: ${chord}</h2>`,
      );
      htmlParts.push(
        `<h3 style="margin: 0 0 8px; font-size: 1rem; font-weight: 500; color: var(--muted);">${window.__f(
          "chord_parse_heading",
          { input: v },
        )}</h3>`,
      );
      /*
      htmlParts.push(
        `<p><strong>${window.__("root_label")}：</strong>${root} <strong style="margin-left:12px">${window.__("slash_label")}：</strong>${isSlash}</p>`,
      );
    */
      htmlParts.push('<div class="note-grid">');
      for (let i = 0; i < notes.length; i++) {
        htmlParts.push(
          `<div class="note-cell"><div class="note">${notes[i]}</div></div>`,
        );
      }
      htmlParts.push("</div>");

      // 小键盘视觉（12键，仅标注选中）
      const keys = conv.idxToNote
        .map((n, idx) => {
          const active = offsets.includes(idx) ? "active-key" : "";
          return `<div class="key ${active}">${n}</div>`;
        })
        .join("");
      htmlParts.push(`<div class="mini-keyboard">${keys}</div>`);

      targetEl.innerHTML = htmlParts.join("");
      return;
    }

    // 退回到 parse（只显示 chord 与 notes，忽略 offsets）
    try {
      const data = conv.parseAndGetNotes(v);
      const display = {
        chord: data.chord,
        notes: data.notes,
        isSlash: data.isSlash,
      };
      targetEl.innerHTML = `<h3>${window.__f("chord_parse_heading", { input: v })}</h3><pre>${JSON.stringify(display, null, 2)}</pre>`;
    } catch (e) {
      targetEl.innerHTML = `<h3>${window.__("chord_parse_error")}</h3><pre>${e.message}</pre>`;
    }
  }

  // helper: create a card element for a scale suggestion (name,reason,notes)
  function createScaleCard(scale) {
    const card = document.createElement("div");
    card.className = "result-card";
    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = scale.name;
    card.appendChild(title);
    if (scale.reasonId != null) {
      const reason = document.createElement("div");
      reason.className = "small-muted";
      reason.textContent = window.__("reason_" + scale.reasonId);
      card.appendChild(reason);
    }
    if (scale.notes && scale.notes.length) {
      // grid view
      const noteRow = document.createElement("div");
      noteRow.className = "note-grid";
      scale.notes.forEach((n) => {
        const nc = document.createElement("div");
        nc.className = "note-cell";
        nc.innerHTML = `<div class="note">${n}</div>`;
        noteRow.appendChild(nc);
      });
      card.appendChild(noteRow);
    }
    return card;
  }

  // helper: render a full report object into nicely formatted HTML
  function renderReport(report) {
    if (!report) return document.createTextNode("");
    const cont = document.createElement("div");
    cont.className = "full-report";
    // chord name
    const h = document.createElement("h3");
    h.textContent = report.chordName || "";
    cont.appendChild(h);
    // notes grid
    if (report.notes && report.notes.length) {
      const notesDiv = document.createElement("div");
      notesDiv.className = "note-grid";
      report.notes.forEach((n) => {
        const nc = document.createElement("div");
        nc.className = "note-cell";
        nc.innerHTML = `<div class="note">${n}</div>`;
        notesDiv.appendChild(nc);
      });
      cont.appendChild(notesDiv);
    }
    // voicings
    if (report.voicings) {
      const vsec = document.createElement("div");
      vsec.className = "report-section";
      const vt = document.createElement("div");
      vt.className = "section-title";
      vt.textContent = window.__("voicings_label") || "Voicings";
      vsec.appendChild(vt);
      ["shell", "drop2"].forEach((k) => {
        if (report.voicings[k]) {
          const row = document.createElement("div");
          row.className = "note-grid";
          report.voicings[k].forEach((n) => {
            const nc = document.createElement("div");
            nc.className = "note-cell";
            nc.innerHTML = `<div class="note">${n}</div>`;
            row.appendChild(nc);
          });
          const label = document.createElement("div");
          label.className = "small-muted";
          label.textContent = window.__("voicings_" + k) || k;
          vsec.appendChild(label);
          vsec.appendChild(row);
        }
      });

      cont.appendChild(vsec);
    }
    // substitutions
    if (report.substitutions && report.substitutions.length) {
      const ssec = document.createElement("div");
      ssec.className = "report-section";
      const st = document.createElement("h3");
      st.className = "section-title";
      st.textContent = window.__("substitutions_label") || "Substitutions";
      ssec.appendChild(st);
      report.substitutions.forEach((sub) => {
        const card = createScaleCard({
          name: sub.name,
          reason: window.__("sub_type_name_" + sub.descriptionId) || sub.type,
          notes: [],
        });
        const desc = document.createElement("div");
        desc.className = "small-muted";
        desc.textContent =
          window.__("sub_type_desc_" + sub.descriptionId) || sub.description;
        card.appendChild(desc);
        ssec.appendChild(card);
      });
      cont.appendChild(ssec);
    }
    return cont;
  }

  function updateBlues(targetEl, inputValue) {
    const v = inputValue.trim();
    // render interactive UI: three action buttons + result area
    const container = document.createElement("div");
    container.className = "blues-panel";

    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "8px";

    const btnBasic = document.createElement("button");
    btnBasic.textContent = window.__("blues_basic");
    const btnAdv = document.createElement("button");
    btnAdv.textContent = window.__("blues_advanced");
    const btnFeel = document.createElement("button");
    btnFeel.textContent = window.__("blues_feel");

    [btnBasic, btnAdv, btnFeel].forEach((b) => {
      b.className = "panel-action";
      b.setAttribute("aria-pressed", "false");
      b.style.padding = "8px 12px";
      b.style.borderRadius = "8px";
      b.style.border = "none";
      b.style.cursor = "pointer";
      b.style.background =
        "linear-gradient(90deg,var(--accent),var(--accent-2))";
      b.style.color = "#fff";
    });

    // helper to show which action is active
    function setActiveAction(button) {
      [btnBasic, btnAdv, btnFeel].forEach((b) => {
        const active = b === button;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    btnRow.appendChild(btnBasic);
    btnRow.appendChild(btnAdv);
    btnRow.appendChild(btnFeel);

    const results = document.createElement("div");
    results.className = "blues-results";
    results.style.marginTop = "12px";

    container.appendChild(btnRow);
    container.appendChild(results);
    targetEl.innerHTML = "";
    targetEl.appendChild(container);

    // helper: parse chord notes
    function getNotesSafe(val) {
      try {
        return conv._ensureNotesAndRoot(val) || [];
      } catch (e) {
        return [];
      }
    }

    // Basic suggestions
    btnBasic.addEventListener("click", () => {
      setActiveAction(btnBasic);
      const notes = getNotesSafe(v);
      if (!notes || notes.length === 0) {
        results.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
        return;
      }
      // try library method first
      let suggestions = [];
      try {
        suggestions = brain.blt.suggestForChord(v);
      } catch (e) {
        console.error("Error getting basic suggestions:", e);
      }

      // normalize suggestions to array
      if (!Array.isArray(suggestions)) {
        if (suggestions == null) suggestions = [];
        else suggestions = [suggestions];
      }

      // render
      results.innerHTML = "";
      const header = document.createElement("div");
      header.className = "small-muted";
      header.textContent = window.__f("header_basic", {
        count: suggestions.length,
      });
      results.appendChild(header);
      suggestions.forEach((s) => {
        const card = document.createElement("div");
        card.className = "result-card";
        // spiciness-based soft gradient background for Improv Feel
        try {
          const sp = Number(feel.spiciness_level || 0);
          let hue = 200,
            sat = 20,
            top = 30,
            bot = 26;
          if (sp <= 1) {
            hue = 200;
            sat = 18;
            top = 30;
            bot = 26;
          } else if (sp <= 3) {
            hue = 38;
            sat = 20;
            top = 32;
            bot = 26;
          } else if (sp <= 5) {
            hue = 18;
            sat = 24;
            top = 34;
            bot = 28;
          } else {
            hue = 300;
            sat = 20;
            top = 34;
            bot = 26;
          }
          card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${top}%), hsl(${hue}, ${Math.max(sat - 4, 8)}%, ${bot}%))`;
        } catch (e) { }

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = s.name;
        const reason = document.createElement("div");
        reason.className = "small-muted";
        reason.textContent = window.__("reason_" + s.reasonId) || "";
        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        (s.notes || []).forEach((n) => {
          const nc = document.createElement("div");
          nc.className = "note-cell";
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });
        card.appendChild(title);
        card.appendChild(reason);
        card.appendChild(noteRow);
        results.appendChild(card);
      });
    });

    // Advanced suggestions
    btnAdv.addEventListener("click", () => {
      setActiveAction(btnAdv);
      const notes = getNotesSafe(v);
      if (!notes || notes.length === 0) {
        results.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
        return;
      }
      let adv = [];
      try {
        adv = brain.blt.suggestAdvanced(v);
      } catch (e) {
        console.error("Error getting advanced suggestions:", e);
      }

      if (!Array.isArray(adv)) {
        if (adv == null) adv = [];
        else adv = [adv];
      }

      results.innerHTML = "";
      const headerAdv = document.createElement("div");
      headerAdv.className = "small-muted";
      headerAdv.textContent = window.__f("header_advanced", {
        count: adv.length,
      });
      results.appendChild(headerAdv);
      adv.forEach((s) => {
        const card = createScaleCard(s);
        results.appendChild(card);
      });
    });

    // Improv Feel
    btnFeel.addEventListener("click", () => {
      setActiveAction(btnFeel);
      const chordNotes = getNotesSafe(v);
      if (!chordNotes || chordNotes.length === 0) {
        results.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
        return;
      }
      // candidate scales to analyze: Major Pentatonic, Minor Blues, Lydian Dominant
      const root = chordNotes[0];
      const candidates = Object.keys(brain.blt.scaleMetadata);
      results.innerHTML = "";
      const headerFeel = document.createElement("div");
      headerFeel.className = "small-muted";
      headerFeel.textContent = window.__f("header_improv", {
        count: candidates.length,
      });
      results.appendChild(headerFeel);
      candidates.forEach((name) => {
        const sNotes = brain.blt._calculateScaleNotes(root, name);
        const feel = brain.blt.analyzeImprovFeel(sNotes, chordNotes);
        const card = document.createElement("div");
        card.className = "result-card";
        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = `${root} ${name}`;
        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        const tensionSet = new Set(feel.tension_notes || []);
        (sNotes || []).forEach((n) => {
          const nc = document.createElement("div");
          const isTension = tensionSet.has(n);
          nc.className = "note-cell" + (isTension ? " tension-note" : "");
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });
        const body = document.createElement("div");
        body.className = "card-body";
        const descId =
          feel.description_id || feel.descriptionId || feel.descriptionId === 0
            ? feel.description_id || feel.descriptionId
            : null;
        const feelNameKey = descId ? `improv_feel_name_${descId}` : null;
        const feelDescKey = descId ? `improv_feel_desc_${descId}` : null;
        const feelName = feelNameKey
          ? window.__(feelNameKey)
          : feel.feeling || "";
        const feelDesc = feelDescKey
          ? window.__(feelDescKey)
          : feel.description || "";
        body.innerHTML = `<div><strong>${window.__("feel_label")} :</strong> ${feelName} (${window.__("spiciness_label")}: ${feel.spiciness_level})</div>
								  <div class="small-muted">${window.__("tensions_label")} : ${feelDesc}</div>
								  <div class="small-muted">${window.__("tension_source_label")}: ${JSON.stringify(feel.tension_notes)}</div>`;
        // add small spiciness badge to title
        const spiceBadge = document.createElement("span");
        spiceBadge.className = "spice-badge";
        spiceBadge.textContent = `${window.__("spiciness_label")}: ${feel.spiciness_level}`;
        try {
          const spVal = Number(feel.spiciness_level || 0);
          let hue = 200,
            sat = 18,
            light = 28;
          if (spVal <= 1) {
            hue = 200;
            sat = 16;
            light = 28;
          } else if (spVal <= 3) {
            hue = 38;
            sat = 20;
            light = 30;
          } else if (spVal <= 5) {
            hue = 18;
            sat = 22;
            light = 32;
          } else {
            hue = 300;
            sat = 20;
            light = 32;
          }
          spiceBadge.style.background = `hsl(${hue}, ${sat}%, ${light}%)`;
          spiceBadge.style.color = "#fff";
          spiceBadge.style.border = "1px solid rgba(255,255,255,0.06)";
        } catch (e) { }
        title.appendChild(spiceBadge);
        card.appendChild(title);
        card.appendChild(noteRow);
        card.appendChild(body);
        results.appendChild(card);
      });
    });
  }

  function updateCST(targetEl, inputValue) {
    const v = inputValue.trim();
    const notes = conv._ensureNotesAndRoot(v);
    if (!notes) {
      targetEl.innerHTML = `<p>${window.__("cannot_parse_chord")}</p>`;
      return;
    }
    const root = notes[0];
    const scaleMatches = brain.cst.analyzeCST(notes);
    targetEl.innerHTML = "";
    const headerCST = document.createElement("div");
    headerCST.className = "small-muted";
    headerCST.textContent = window.__f("header_cst", {
      count: scaleMatches.length,
    });
    targetEl.appendChild(headerCST);

    scaleMatches.forEach((scaleStr) => {
      // Parse "C Mixolydian" -> scaleName
      const parts = scaleStr.split(" ");
      const scaleRoot = parts[0];
      const scaleName = parts.slice(1).join(" ");

      try {
        const scaleNotes = brain.cst.scaleNotes(scaleStr);
        const brightness = brain.cst.calculateBrightness(scaleRoot, scaleNotes);
        const tensions = brain.cst.analyzeTensions(notes, scaleStr);

        // Create card with brightness-based background gradient
        const card = document.createElement("div");
        card.className = "result-card cst-card";

        // apply brightness-based background (low saturation, higher brightness for comfort)

        let hue = 0,
          sat = 0;
        if (Math.abs(brightness) > 0.1) {
          hue = brightness < 0 ? 210 : brightness > 0 ? 165 : 0; // 165是薄荷绿
          sat = Math.abs(brightness) > 2 ? 30 : 24; // 过于刺耳的亮度降低饱和度
        }
        const bright = 0 + Math.abs(brightness) * 1.5;
        card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${Math.min(bright, 40)}%), hsl(${hue}, ${sat}%, ${Math.max(bright - 4, 24)}%))`;

        const title = document.createElement("div");
        title.className = "card-title";
        title.innerHTML = `<span>${scaleRoot} ${scaleName}</span> <span class="brightness-label">${window.__("brightness_label")}: ${brightness}</span>`;

        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        const tensionSet = new Set(tensions.tensions || []);
        const avoidSet = new Set(tensions.avoid || []);

        [...scaleNotes].forEach((n) => {
          const nc = document.createElement("div");
          const classes = ["note-cell"];
          if (tensionSet.has(n)) classes.push("tension-note");
          else if (avoidSet.has(n)) classes.push("avoid-note");
          nc.className = classes.join(" ");
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });

        const infoDiv = document.createElement("div");
        infoDiv.className = "cst-info";
        infoDiv.innerHTML = `<div class="small-muted">${window.__("tensions_label")}: ${JSON.stringify(tensions.tensions || [])}</div>
                                      <div class="small-muted">${window.__("avoid_label")}: ${JSON.stringify(tensions.avoid || [])}</div>`;

        card.appendChild(title);
        card.appendChild(noteRow);
        card.appendChild(infoDiv);
        targetEl.appendChild(card);
      } catch (e) {
        // skip on error
      }
    });
  }

  function updateLCC(targetEl, inputValue) {
    const v = inputValue.trim();
    const notes = conv._ensureNotesAndRoot(v);
    if (!notes) {
      targetEl.innerHTML = `<p>${window.__("cannot_parse_chord")}</p>`;
      return;
    }
    const res = brain.lcc.analyzeLCC(notes);
    targetEl.innerHTML = "";
    const headerLCC = document.createElement("div");
    headerLCC.className = "small-muted";
    headerLCC.textContent = window.__f("header_lcc", { count: res.length });
    targetEl.appendChild(headerLCC);

    res.forEach((item) => {
      const { parent, scale, degree_from_parent, gravity } = item;

      try {
        const scaleNotes = brain.lcc.scaleNotes(parent, scale);

        // Create card with gravity-based background (越小越稳定蓝绿，越大越有张力橙红)
        const card = document.createElement("div");
        card.className = "result-card lcc-card";

        // gravity from 0-12, map to hue: 0=green/cyan(~180), 6=yellow(~60), 12=red(~0), low saturation
        const gravityHue = Math.max(0, 180 - gravity * 15);
        const gravitySat = 25 + gravity * 2;
        card.style.background = `linear-gradient(135deg, hsl(${gravityHue}, ${gravitySat}%, 12%), hsl(${gravityHue}, ${gravitySat}%, 5%))`;

        const title = document.createElement("div");
        title.className = "card-title";
        title.innerHTML = `<span>${window.__("lcc_parent_prefix")} ${parent} ${scale}</span><br><span class="lcc-meta">${window.__("lcc_position_prefix")} ${degree_from_parent} ${window.__("semitones_label")} | ${window.__("lcc_gravity_prefix")} ${gravity}</span>`;

        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        scaleNotes.forEach((n) => {
          const nc = document.createElement("div");
          nc.className = "note-cell";
          nc.innerHTML = `<div class="note">${n}</div>`;
          noteRow.appendChild(nc);
        });

        card.appendChild(title);
        card.appendChild(noteRow);
        targetEl.appendChild(card);
      } catch (e) {
        // skip on error
      }
    });
  }

  function updateRec(targetEl, inputValue) {
    const v = inputValue.trim();
    if (!v) {
      targetEl.innerHTML = `<div class="result-card">${window.__("cannot_parse_input") || "无法解析输入，请输入有效和弦（如 C7、Am9）"}</div>`;
      return;
    }

    // 调用 JazzBrain 的和弦推荐方法
    let recommendations = [];
    try {
      recommendations = brain.getChordRecommendations(v);
    } catch (e) {
      console.error("get chord scale failure:", e);
      targetEl.innerHTML = `<div class="result-card">${window.__("parse_error") || "解析失败："}${e.message}</div>`;
      return;
    }

    // 清空目标容器并渲染结果
    targetEl.innerHTML = "";

    // 结果头部统计
    const headerRec = document.createElement("div");
    headerRec.className = "small-muted";
    headerRec.textContent =
      window.__f("header_rec", {
        count: recommendations.length,
        input: v,
      }) ||
      window.__f("rec_count", {
        input1: v,
        input2: recommendations.length,
      });
    targetEl.appendChild(headerRec);

    // 遍历推荐结果渲染卡片
    recommendations.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "result-card rec-card";

      // 按评分线性渐变（从高分蓝绿 → 低分浅红，连续过渡）
      // 按评分线性渐变（高分：深青绿 → 低分：暗赤红，高级暗调风格）
      const scoreNorm = item.score / 15; // 归一化到 0-1

      // 1. 色相（Hue）线性过渡：175(深青绿) → 25(暗赤红)（更贴合参考界面的色调）
      const hueMin = 25; // 低分：暗赤红（替代原浅红，更暗更高级）
      const hueMax = 175; // 高分：深青绿（匹配参考界面的主色调）
      const hue = hueMin + (hueMax - hueMin) * scoreNorm;

      // 2. 饱和度（Saturation）：整体低饱和（高级感核心），高分略低、低分略高
      const satStartMin = 28; // 低分起始饱和度（低饱和）
      const satStartMax = 22; // 高分起始饱和度（更低饱和）
      const satStart = satStartMin + (satStartMax - satStartMin) * scoreNorm;

      const satEndMin = 18; // 低分结束饱和度
      const satEndMax = 12; // 高分结束饱和度
      const satEnd = satEndMin + (satEndMax - satEndMin) * scoreNorm;

      // 3. 亮度（Lightness）：极致暗调，整体下调到 15-22 区间（核心暗调调整）
      const lightStartMin = 10; // 低分起始亮度（暗）
      const lightStartMax = 6; // 高分起始亮度（更暗，匹配参考界面）
      const lightStart =
        lightStartMin + (lightStartMax - lightStartMin) * scoreNorm;

      const lightMidMin = 18; // 低分中间亮度
      const lightMidMax = 16; // 高分中间亮度
      const lightMid = lightMidMin + (lightMidMax - lightMidMin) * scoreNorm;

      const lightEndMin = 15; // 低分结束亮度（极暗）
      const lightEndMax = 13; // 高分结束亮度（极致暗）
      const lightEnd = lightEndMin + (lightEndMax - lightEndMin) * scoreNorm;
      // 多色阶线性渐变（从左上到右下，3个色阶过渡，渐变更自然）
      card.style.background = `linear-gradient(135deg, 
        hsl(${hue}, ${satStart}%, ${lightStart}%), 
        hsl(${hue + 5}, ${(satStart + satEnd) / 2}%, ${lightMid}%) 50%, 
        hsl(${hue + 8}, ${satEnd}%, ${lightEnd}%)
      )`;

      // 卡片标题（和弦名 + 综合评分）
      const title = document.createElement("div");
      title.className = "card-title";
      title.innerHTML = `${item.chord} 
        <span class="score-badge">${window.__("sort_score") || "Score"}: ${item.score}</span>`;
      card.appendChild(title);

      // 核心指标行
      const metricsRow = document.createElement("div");
      metricsRow.style.display = "flex";
      metricsRow.style.gap = "12px";
      metricsRow.style.margin = "8px 0";
      metricsRow.style.fontSize = "0.9em";

      // 稳定性
      const stabilitySpan = document.createElement("span");
      stabilitySpan.textContent = `${window.__("sort_stability") || "Stability"}: ${item.stability.toFixed(1)}`;
      // 紧张度
      const tensionSpan = document.createElement("span");
      tensionSpan.textContent = `${window.__("sort_tension") || "Tension"}: ${item.tension.toFixed(1)}`;
      // 明亮度
      const brightnessSpan = document.createElement("span");
      brightnessSpan.textContent = `${window.__("brightness_label") || "Brightness"}: ${item.brightness.toFixed(1)}`;

      metricsRow.appendChild(stabilitySpan);
      metricsRow.appendChild(tensionSpan);
      metricsRow.appendChild(brightnessSpan);
      card.appendChild(metricsRow);

      // 来源标注（Formula/Creative）
      const sourceSpan = document.createElement("div");
      sourceSpan.className = "small-muted";
      sourceSpan.textContent = `${window.__("source_label") || "来源"}: ${item.source}`;
      card.appendChild(sourceSpan);

      // 和弦音符网格（复用现有 note-grid 样式）
      const noteRow = document.createElement("div");
      noteRow.className = "note-grid";
      item.notes.forEach((n) => {
        const nc = document.createElement("div");
        nc.className = "note-cell";
        nc.innerHTML = `<div class="note">${n}</div>`;
        noteRow.appendChild(nc);
      });
      card.appendChild(noteRow);

      targetEl.appendChild(card);
    });
  }

  // generic processor for the other-panel actions
  function processOther(targetEl, inputValue) {
    const v = inputValue.trim();
    targetEl.innerHTML = "";
    try {
      switch (currentOtherMode) {
        case "key_center": {
          // 1. 获取输入并分析
          const arr = parseChordList(v);
          const results = brain.findKeyCenterPro(arr, true);

          if (Array.isArray(results) && results.length) {
            results.forEach(function (result, index) {
              // const result = results[0]; // 获取匹配度最高的调性
              const parts = result.name.split(" ");
              const root = parts[0];
              const sysName = parts.slice(1).join(" ").trim();

              let notes = [];
              try {
                notes = brain.cst.scaleNotes(root, sysName);
              } catch (e) {
                notes = [];
              }

              // 2. 创建卡片容器
              const card = document.createElement("div");
              card.className = "result-card";

              try {
                const sp = Number(feel.spiciness_level || 0);
                let hue = 200,
                  sat = 20,
                  top = 30,
                  bot = 26;
                if (sp <= 1) {
                  hue = 200;
                  sat = 18;
                  top = 30;
                  bot = 26;
                } else if (sp <= 3) {
                  hue = 38;
                  sat = 20;
                  top = 32;
                  bot = 26;
                } else if (sp <= 5) {
                  hue = 18;
                  sat = 24;
                  top = 34;
                  bot = 28;
                } else {
                  hue = 300;
                  sat = 20;
                  top = 34;
                  bot = 26;
                }
                card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${top}%), hsl(${hue}, ${Math.max(sat - 4, 8)}%, ${bot}%))`;
              } catch (e) { }

              // 4. 构建标题和评分
              const title = document.createElement("div");
              title.className = "card-title";
              title.innerHTML = `<span>${result.name}</span> <span class="spice-badge" style="margin-left:8px; font-size:0.8em; opacity:0.8;">${window.__("key_center_match_score") || "Score"}: ${Math.round(result.score)}</span>`;

              const noteRow = document.createElement("div");
              noteRow.className = "note-grid";
              (notes || []).forEach((n) => {
                const nc = document.createElement("div");
                nc.className = "note-cell";
                nc.innerHTML = `<div class="note">${n}</div>`;
                noteRow.appendChild(nc);
              });

              // 6. 组合元素
              card.appendChild(title);

              // 如果有原因/描述，也可以加上
              const reason = document.createElement("div");
              reason.className = "small-muted";
              reason.style.marginBottom = "8px";
              reason.textContent = `${window.__("key_center_detected") || "Detected Key Center"}`;
              card.appendChild(reason);

              card.appendChild(noteRow);

              // targetEl.innerHTML = "";
              targetEl.appendChild(card);
            });
          } else {
            targetEl.innerHTML = `<div class="small-muted">${window.__("no_key_recommended") || "no key recommended"}</div>`;
          }
          break;
        }
        case "report": {
          const card = document.createElement("div");
          card.className = "result-card";

          try {
            const sp = Number(feel.spiciness_level || 0);
            let hue = 200,
              sat = 20,
              top = 30,
              bot = 26;
            if (sp <= 1) {
              hue = 200;
              sat = 18;
              top = 30;
              bot = 26;
            } else if (sp <= 3) {
              hue = 38;
              sat = 20;
              top = 32;
              bot = 26;
            } else if (sp <= 5) {
              hue = 18;
              sat = 24;
              top = 34;
              bot = 28;
            } else {
              hue = 300;
              sat = 20;
              top = 34;
              bot = 26;
            }
            card.style.background = `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${top}%), hsl(${hue}, ${Math.max(sat - 4, 8)}%, ${bot}%))`;
          } catch (e) { }

          // 1. 获取完整的分析报告数据
          const report = brain.getFullReport(v);

          // 3. 添加标题
          const header = document.createElement("h3");
          header.textContent =
            window.__("other_report") || "Chord Analysis Report";
          card.appendChild(header);

          // 4. 调用你定义的 renderReport 函数进行美化渲染
          if (report) {
            const reportElement = renderReport(report);
            card.appendChild(reportElement);
          } else {
            const noData = document.createElement("div");
            noData.className = "small-muted";
            noData.textContent =
              window.__("no_data_available") || "No analysis data found.";
            card.appendChild(noData);
          }
          targetEl.appendChild(card);
          break;
        }
        case "progression": {
          const prog = parseChordList(v);
          const analysis = brain.analyzeProgression(prog); // 假设返回的是字符串数组

          targetEl.innerHTML = ""; // 清空容器
          const container = document.createElement("div");
          container.className = "progression-stepper";
          container.style.display = "flex";
          container.style.flexDirection = "column";
          container.style.gap = "12px";

          if (Array.isArray(analysis) && analysis.length > 0) {
            analysis.forEach((step, index) => {
              const row = document.createElement("div");
              row.className = "result-card";
              row.style.margin = "0";
              row.style.borderLeft = "4px solid var(--accent)"; // 左侧色条增加专业感

              // 提取 "Cmaj7 -> Fmaj7" 这种核心部分加粗
              const parts = step.split(":");
              const flow = parts[0] || "";
              const desc = parts[1] || "";

              row.innerHTML = `
						<div style="display:flex; align-items:center; gap:10px;">
							<div class="step-badge" style="background:var(--accent); color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">${index + 1}</div>
							<div style="font-weight:bold; color:var(--accent-2); font-size:1.1em;">${flow}</div>
						</div>
						<div class="small-muted" style="margin-top:8px; padding-left:34px;">${window.__("motion_dominant_label") || desc.trim()}</div>
					`;
              container.appendChild(row);
            });
            targetEl.appendChild(container);
          } else {
            targetEl.innerHTML = `<div class="small-muted">Could not analyze this progression.</div>`;
          }
          break;
        }
        case "negative": {
          // 负和声：使用两个输入框，一个是和弦 (other-input)，一个是轴 (other-axis-input)
          const chord = v;
          const axisInput = document.getElementById("other-axis-input");
          const axisRaw = axisInput ? axisInput.value : "";
          const axis = (axisRaw && axisRaw.trim()) || "C";

          // 1. 数据准备
          const chord_keys = brain.converter._ensureNotesAndRoot(chord);
          const negResult = brain.toNegative(chord, axis);
          // 注意：假设 negResult 返回的是 ['F', 'D', 'Bb', 'G'] 或包含 notes 属性的对象
          const neg_notes = Array.isArray(negResult)
            ? negResult
            : negResult.notes || [];
          const neg_name = negResult.negative || "Negative Chord";

          targetEl.innerHTML = "";

          // 2. 创建主卡片
          const card = document.createElement("div");
          card.className = "result-card";
          // 使用深蓝色到深紫色的渐变，营造一种“镜像”或“深夜”的乐理氛围
          card.style.background =
            "linear-gradient(135deg, hsl(230, 25%, 15%), hsl(260, 20%, 12%))";
          card.style.border = "1px solid rgba(255,255,255,0.1)";

          // 3. 头部信息
          const header = document.createElement("div");
          header.style.textAlign = "center";
          header.style.marginBottom = "20px";
          header.innerHTML = `
				<div class="small-muted" style="letter-spacing: 2px; text-transform: uppercase; font-size: 0.75rem;">${window.__("neg_harmony_title")}</div>
				<div style="font-size: 0.9rem; color: var(--accent-2); margin-top: 4px;">${window.__("neg_axis") || "Axis"}: <span style="font-weight: bold; color: #fff;">${axis} / ${brain.converter.idxToNote[(brain.converter.noteToIdx[axis] + 7) % 12]}</span></div>
			`;
          card.appendChild(header);

          // 4. 镜像对比区域
          const comparison = document.createElement("div");
          comparison.style.display = "flex";
          comparison.style.alignItems = "center";
          comparison.style.justifyContent = "space-between";
          comparison.style.gap = "10px";

          // 创建左右音符列的函数
          const createNoteColumn = (
            title,
            chordName,
            notes,
            isNegative = false,
          ) => {
            const col = document.createElement("div");
            col.style.flex = "1";
            col.style.textAlign = "center";

            const label = document.createElement("div");
            label.className = "small-muted";
            label.textContent = title;
            col.appendChild(label);

            const name = document.createElement("div");
            name.style.fontSize = "1.4rem";
            name.style.fontWeight = "bold";
            name.style.margin = "5px 0 15px 0";
            name.style.color = isNegative ? "var(--accent-2)" : "#fff";
            name.textContent = chordName;
            col.appendChild(name);

            const grid = document.createElement("div");
            grid.className = "note-grid";
            grid.style.justifyContent = "center";
            notes.forEach((n) => {
              const cell = document.createElement("div");
              cell.className = "note-cell";
              if (isNegative) cell.style.borderColor = "var(--accent-2)";
              cell.innerHTML = `<div class="note">${n}</div>`;
              grid.appendChild(cell);
            });
            col.appendChild(grid);
            return col;
          };

          // 原和声列
          comparison.appendChild(
            createNoteColumn(
              window.__("neg_original") || "Original",
              chord,
              chord_keys,
            ),
          );

          // 中间箭头
          const arrow = document.createElement("div");
          arrow.style.fontSize = "1.5rem";
          arrow.style.color = "var(--accent)";
          arrow.style.opacity = "0.6";
          arrow.innerHTML = "⇄";
          comparison.appendChild(arrow);

          // 负和声列
          comparison.appendChild(
            createNoteColumn(
              window.__("neg_negative") || "Negative",
              neg_name,
              neg_notes,
              true,
            ),
          );

          card.appendChild(comparison);
          targetEl.appendChild(card);
          break;
        }
        case "guide": {
          const prog = parseChordList(v);
          const path = brain.getGuideTonePath(prog); // 假设返回 [[3, 7], [3, 7]...]

          targetEl.innerHTML = "";
          const container = document.createElement("div");
          container.className = "guide-tone-path";
          container.style.display = "flex";
          container.style.flexDirection = "column";
          container.style.gap = "15px";
          container.style.padding = "10px";

          path.forEach((tones, index) => {
            const chordName = prog[index] || `Chord ${index + 1}`;
            const row = document.createElement("div");
            row.className = "result-card";
            row.style.margin = "0";
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.background = "linear-gradient(90deg, #1a1a2e, #16213e)";

            // 左侧：和弦名称
            const nameLabel = document.createElement("div");
            nameLabel.style.width = "80px";
            nameLabel.style.fontWeight = "bold";
            nameLabel.style.color = "var(--accent-2)";
            nameLabel.textContent = chordName;

            // 中间：导音对 (通常是 3音 和 7音)
            const tonesGrid = document.createElement("div");
            tonesGrid.style.display = "flex";
            tonesGrid.style.gap = "10px";
            tonesGrid.style.flex = "1";
            tonesGrid.style.justifyContent = "center";

            tones.forEach((note, i) => {
              const cell = document.createElement("div");
              cell.className = "note-cell";
              // 给 3音和 7音上点不同的色（假设顺序是 3, 7）
              if (i === 0) cell.style.borderColor = "var(--accent)";
              cell.innerHTML = `<div class="note">${note}</div><small style="font-size:9px; opacity:0.5; display:block; margin-top:2px;">${i === 0 ? "3rd" : "7th"}</small>`;
              tonesGrid.appendChild(cell);
            });

            row.appendChild(nameLabel);
            row.appendChild(tonesGrid);

            // 右侧：连接箭头 (除了最后一个)
            if (index < path.length - 1) {
              const arrow = document.createElement("div");
              arrow.style.textAlign = "center";
              arrow.style.color = "var(--accent)";
              arrow.style.padding = "5px";
              arrow.innerHTML = `↓ <span style="font-size:0.7em; opacity:0.6;">${window.__("voice_leading_label") || "Voice Leading"}</span>`;

              container.appendChild(row);
              container.appendChild(arrow);
            } else {
              container.appendChild(row);
            }
          });

          targetEl.appendChild(container);
          break;
        }
      }
    } catch (e) {
      targetEl.innerHTML = `<h3>${window.__("other_error")}</h3><pre>${e.message}</pre>`;
    }
  }

  // helper: parse comma-separated or JSON list of chords/objects
  function parseChordList(input) {
    const t = input.trim();
    if (t.startsWith("[")) {
      try {
        return JSON.parse(t);
      } catch (e) { }
    }
    return t
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s);
  }

  // helpers for key-center dynamic inputs
  function createKeyCenterEntry(value = "") {
    const div = document.createElement("div");
    div.className = "kc-chord-entry";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.marginBottom = "4px";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "kc-chord";
    input.value = value;
    input.style.flex = "1";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "-";
    btn.title = window.__("remove_chord") || "Remove Chord";
    btn.style.marginLeft = "6px";
    btn.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(input);
    div.appendChild(btn);
    return div;
  }

  function setKeyCenterChords(arr) {
    const container = document.getElementById("keycenter-inputs");
    // remove existing entries (but keep the add button as last child)
    Array.from(container.querySelectorAll(".kc-chord-entry")).forEach((e) =>
      e.remove(),
    );
    arr.forEach((v) => {
      const entry = createKeyCenterEntry(v);
      container.insertBefore(
        entry,
        document.getElementById("add-keycenter-chord"),
      );
    });
  }

  function getKeyCenterValue() {
    const container = document.getElementById("keycenter-inputs");
    const chords = Array.from(container.querySelectorAll(".kc-chord"))
      .map((i) => i.value.trim())
      .filter((s) => s);

    return chords.join(";");
  }

  // Navigation binding: show only selected feature
  navButtons.forEach((b) =>
    b.addEventListener("click", () => showOnlyFeature(b.dataset.feature)),
  );
  // initialize other panel mode buttons
  initOtherControls();

  // setup additional controls for "other" panel
  function initOtherControls() {
    const modes = ["key_center", "report", "progression", "negative", "guide"];
    const row = document.getElementById("other-action-row");
    const buttons = {};
    modes.forEach((mode) => {
      const btn = document.createElement("button");
      btn.className = "panel-action";
      btn.textContent = window.__(`other_mode_${mode}`);
      btn.addEventListener("click", () => setOtherMode(mode));
      row.appendChild(btn);
      buttons[mode] = btn;
    });

    // default examples for each mode
    const sampleInputs = {
      key_center: "Cmaj7,Ebdim7,Dm7,G7",
      report: "C7",
      progression: "Cmaj7,Fmaj7,G7,Cmaj7",
      // 负和声：和弦与轴拆成两个输入框，这里只保留和弦示例
      negative: "Dm7 add b13 omit 5/C",
      guide: "Dm7,G7,Cmaj7",
    };

    function setOtherMode(mode) {
      currentOtherMode = mode;
      modes.forEach((m) => buttons[m].classList.toggle("active", m === mode));
      const labelEl = document.getElementById("label_other_example");
      const newText =
        window.__(`label_other_example_${mode}`) ||
        window.__("label_other_example");
      labelEl.textContent = newText;

      const inputEl = document.getElementById("other-input");
      const kcContainer = document.getElementById("keycenter-inputs");
      const axisRow = document.getElementById("negative-axis-row");
      const axisInput = document.getElementById("other-axis-input");

      // key_center / progression / guide 三种模式用“可增删”的和弦列表排版
      const useChordList =
        mode === "key_center" || mode === "progression" || mode === "guide";

      // 负和声模式：使用两个输入框（和弦 + 轴）
      if (mode === "negative") {
        inputEl.style.display = "";
        kcContainer.style.display = "none";
        if (axisRow) axisRow.style.display = "block";
        if (sampleInputs[mode] !== undefined)
          inputEl.value = sampleInputs[mode];
        if (axisInput && !axisInput.value) axisInput.value = "C";
      } else {
        if (axisRow) axisRow.style.display = "none";
        if (useChordList) {
          // 显示可增删列表，隐藏单行输入
          inputEl.style.display = "none";
          kcContainer.style.display = "block";
          const example = sampleInputs[mode] || "";
          const arr = example
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s);
          setKeyCenterChords(arr);
        } else {
          inputEl.style.display = "";
          kcContainer.style.display = "none";
          if (sampleInputs[mode] !== undefined)
            inputEl.value = sampleInputs[mode];
        }
      }
    }

    setOtherMode(currentOtherMode);
  }

  // ===================== 新里曼面板渲染 =====================
// ===================== 新里曼面板渲染（树型布局 + 右键拖拽节点 + 节点大小调节）=====================
let neoCurrentDepth = 1;
let neoCurrentInput = "";
let neoLayerSpacing = 100;      // 层间垂直间距
let neoNodeSize = 22;           // 节点半径
let neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
let neoNodeOffsets = {};        // 手动偏移 { nodeId: {x, y} }

// 基本操作集
const PRIMARY_OPS = new Set(["P", "L", "R", "S", "N", "D1"]);

function updateNeo(targetEl, inputValue) {
  const v = inputValue.trim();
  if (!v) {
    targetEl.innerHTML = `<div class="result-card">${window.__("cannot_parse_input")}</div>`;
    return;
  }

  neoCurrentInput = v;
  neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
  neoNodeOffsets = {};

  let geometric;
  try {
    geometric = brain.nrt.getGeometricNeighbors(v);
  } catch (e) {
    targetEl.innerHTML = `<div class="result-card">${window.__("chord_parse_error")}: ${e.message}</div>`;
    return;
  }

  targetEl.innerHTML = "";

  // ---------- 可视化切换按钮 ----------
  const vizRow = document.createElement("div");
  vizRow.style.display = "flex";
  vizRow.style.gap = "8px";
  vizRow.style.marginBottom = "16px";

  const btnTonnetz = document.createElement("button");
  btnTonnetz.textContent = window.__("neo_triad_title") || "Tonnetz Graph";
  btnTonnetz.className = "panel-action active";
  btnTonnetz.style.padding = "8px 14px";
  btnTonnetz.style.borderRadius = "6px";
  btnTonnetz.style.border = "none";
  btnTonnetz.style.cursor = "pointer";
  btnTonnetz.style.background = "linear-gradient(90deg, var(--accent), var(--accent-2))";
  btnTonnetz.style.color = "#fff";

  const btnOcta = document.createElement("button");
  btnOcta.textContent = window.__("neo_octatonic_title") || "Octatonic Tower";
  btnOcta.className = "panel-action";
  btnOcta.style.padding = "8px 14px";
  btnOcta.style.borderRadius = "6px";
  btnOcta.style.border = "none";
  btnOcta.style.cursor = "pointer";
  btnOcta.style.background = "rgba(255,255,255,0.08)";
  btnOcta.style.color = "#ccc";

  vizRow.appendChild(btnTonnetz);
  vizRow.appendChild(btnOcta);

  // 可视化容器
  const canvasContainer = document.createElement("div");
  canvasContainer.id = "neo-canvas-container";
  canvasContainer.style.width = "100%";
  canvasContainer.style.minHeight = "500px";
  canvasContainer.style.position = "relative";
  canvasContainer.style.overflow = "hidden";
  canvasContainer.style.borderRadius = "12px";
  canvasContainer.style.background = "rgba(0,0,0,0.2)";
  canvasContainer.style.cursor = "grab";
  canvasContainer.style.userSelect = "none";
  targetEl.appendChild(canvasContainer);

  // 图例/详情区
  const detailArea = document.createElement("div");
  detailArea.id = "neo-detail-area";
  detailArea.style.marginTop = "16px";
  detailArea.className = "neo-detail-area";
  targetEl.appendChild(detailArea);

  // 绑定控件
  const depthInput = document.getElementById("neo-depth-input");
  const spacingInput = document.getElementById("neo-spacing-input");
  const nodeSizeInput = document.getElementById("neo-node-size-input");
  const nodeSizeVal = document.getElementById("neo-node-size-val");
  const applyBtn = document.getElementById("neo-depth-apply");

  if (depthInput) depthInput.value = neoCurrentDepth;
  if (spacingInput) spacingInput.value = neoLayerSpacing;
  if (nodeSizeInput) {
    nodeSizeInput.value = neoNodeSize;
    if (nodeSizeVal) nodeSizeVal.textContent = neoNodeSize;
    nodeSizeInput.addEventListener("input", () => {
      neoNodeSize = parseInt(nodeSizeInput.value) || 22;
      if (nodeSizeVal) nodeSizeVal.textContent = neoNodeSize;
      if (currentView === "tonnetz") renderTonnetzMulti();
      else renderOctatonicMulti();
    });
  }

  const applyDepthAndRender = () => {
    if (depthInput) {
      neoCurrentDepth = Math.max(1, Math.min(10, parseInt(depthInput.value) || 1));
      depthInput.value = neoCurrentDepth;
    }
    if (spacingInput) {
      neoLayerSpacing = Math.max(50, Math.min(250, parseInt(spacingInput.value) || 100));
      spacingInput.value = neoLayerSpacing;
    }
    neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
    neoNodeOffsets = {};
    if (currentView === "tonnetz") renderTonnetzMulti();
    else renderOctatonicMulti();
  };

  if (applyBtn) applyBtn.onclick = applyDepthAndRender;
  if (depthInput) depthInput.addEventListener("keydown", e => { if (e.key === "Enter") applyDepthAndRender(); });
  if (spacingInput) spacingInput.addEventListener("keydown", e => { if (e.key === "Enter") applyDepthAndRender(); });

  // 重置视图
  document.getElementById("neo-reset-view")?.addEventListener("click", () => {
    neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
    neoNodeOffsets = {};
    if (currentView === "tonnetz") renderTonnetzMulti();
    else renderOctatonicMulti();
  });

  // 重置节点位置
  document.getElementById("neo-reset-positions")?.addEventListener("click", () => {
    neoNodeOffsets = {};
    if (currentView === "tonnetz") renderTonnetzMulti();
    else renderOctatonicMulti();
  });

  // ---------- 渲染函数 ----------
  let currentView = "tonnetz";

  function renderTonnetzMulti() {
    canvasContainer.innerHTML = "";
    detailArea.innerHTML = "";

    const multiGraph = buildTreeGraph(v, neoCurrentDepth, "tonnetz");
    if (!multiGraph || !multiGraph.nodes.length) {
      canvasContainer.innerHTML = `<div class="small-muted" style="padding:20px;">${window.__("neo_no_transform")}</div>`;
      return;
    }

    drawTreeCanvas(canvasContainer, multiGraph, "tonnetz");

    const uniqueChords = [...new Set(multiGraph.nodes.map(n => n.chord))];
    const listTitle = document.createElement("h4");
    listTitle.className = "section-title";
    listTitle.textContent = `${window.__("neo_triad_title")} (${neoCurrentDepth}层, ${uniqueChords.length}个和弦)`;
    detailArea.appendChild(listTitle);
    detailArea.appendChild(createChordCard(v, true));

    const byDepth = {};
    multiGraph.nodes.forEach(n => {
      if (n.depth > 0) {
        if (!byDepth[n.depth]) byDepth[n.depth] = [];
        byDepth[n.depth].push(n);
      }
    });

    Object.keys(byDepth).sort((a, b) => a - b).forEach(depth => {
      const depthLabel = document.createElement("div");
      depthLabel.className = "small-muted";
      depthLabel.style.marginTop = "12px";
      depthLabel.style.fontWeight = "bold";
      depthLabel.textContent = `第 ${depth} 层`;
      detailArea.appendChild(depthLabel);

      const depthGrid = document.createElement("div");
      depthGrid.style.display = "flex";
      depthGrid.style.flexWrap = "wrap";
      depthGrid.style.gap = "8px";

      byDepth[depth].forEach(node => {
        const chordCard = createChordCard(node.chord, false);
        if (node.operation) {
          const opLabel = document.createElement("div");
          opLabel.className = "small-muted";
          opLabel.style.fontSize = "0.7em";
          const isPrimary = PRIMARY_OPS.has(node.operation);
          opLabel.style.color = isPrimary ? "hsl(145, 55%, 55%)" : "hsl(260, 50%, 70%)";
          opLabel.textContent = `← ${node.operation}${isPrimary ? '' : window.__("neo_extended")}`;
          chordCard.insertBefore(opLabel, chordCard.firstChild);
        }
        depthGrid.appendChild(chordCard);
      });
      detailArea.appendChild(depthGrid);
    });
  }

  function renderOctatonicMulti() {
    canvasContainer.innerHTML = "";
    detailArea.innerHTML = "";

    const multiGraph = buildTreeGraph(v, neoCurrentDepth, "octatonic");
    if (!multiGraph || !multiGraph.nodes || multiGraph.nodes.length === 0) {
      canvasContainer.innerHTML = `<div class="small-muted" style="padding:20px;">${window.__("neo_no_octatonic")}</div>`;
      return;
    }

    drawTreeCanvas(canvasContainer, multiGraph, "octatonic");

    const uniqueChords = [...new Set(multiGraph.nodes.map(n => n.chord))];
    const listTitle = document.createElement("h4");
    listTitle.className = "section-title";
    listTitle.style.marginTop = "8px";
    listTitle.textContent = `${window.__("neo_octatonic_neighbors")} (${window.__f("neo_chord_depth_heading", {
        depth: neoCurrentDepth,
        chords_count: uniqueChords.length
      })}`;
    detailArea.appendChild(listTitle);

    // ===== 添加原始和弦卡片（修复：八度音阶塔现在也显示原始和弦）=====
    const originalCard = createChordCard(v, true);
    detailArea.appendChild(originalCard);
    
    const byDepth = {};
    multiGraph.nodes.forEach(n => {
      if (n.depth > 0) {
        if (!byDepth[n.depth]) byDepth[n.depth] = [];
        byDepth[n.depth].push(n);
      }
    });

    Object.keys(byDepth).sort((a, b) => a - b).forEach(depth => {
      const depthLabel = document.createElement("div");
      depthLabel.className = "small-muted";
      depthLabel.style.marginTop = "12px";
      depthLabel.style.fontWeight = "bold";
      depthLabel.textContent = window.__f("neo_chord_depth_heading", {
        depth: depth
      }); 
      detailArea.appendChild(depthLabel);
      const depthGrid = document.createElement("div");
      depthGrid.style.display = "flex";
      depthGrid.style.flexWrap = "wrap";
      depthGrid.style.gap = "8px";
      byDepth[depth].forEach(node => depthGrid.appendChild(createChordCard(node.chord, false)));
      detailArea.appendChild(depthGrid);
    });
  }

  function createChordCard(chordName, isOriginal) {
    const card = document.createElement("div");
    card.className = "result-card";
    card.style.margin = "4px";
    card.style.padding = "10px";
    card.style.cursor = "pointer";
    card.style.transition = "all 0.2s";
    if (isOriginal) {
      card.style.border = "1px solid var(--accent-2)";
      card.style.background = "linear-gradient(135deg, hsl(200, 25%, 20%), hsl(200, 20%, 12%))";
    }
    card.addEventListener("mouseenter", () => { card.style.transform = "translateY(-2px)"; card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"; });
    card.addEventListener("mouseleave", () => { card.style.transform = "translateY(0)"; card.style.boxShadow = "none"; });
    card.addEventListener("click", () => {
      const neoInput = document.getElementById("neo-input");
      if (neoInput) neoInput.value = chordName;
      neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
      neoNodeOffsets = {};
      updateNeo(canvasContainer.parentElement, chordName);
    });
    const title = document.createElement("div");
    title.className = "card-title";
    title.style.fontSize = "0.9em";
    title.style.margin = "0";
    title.textContent = chordName;
    card.appendChild(title);
    try {
      const parsed = brain.converter._ensureNotesAndRoot(chordName, true);
      if (parsed?.notes?.length) {
        const noteRow = document.createElement("div");
        noteRow.className = "note-grid";
        noteRow.style.margin = "6px 0 0 0";
        noteRow.style.gap = "4px";
        parsed.notes.slice(0, 6).forEach(n => {
          const nc = document.createElement("div");
          nc.className = "note-cell";
          nc.style.padding = "4px 6px";
          nc.style.minWidth = "auto";
          nc.style.fontSize = "0.75em";
          nc.innerHTML = `<div class="note" style="font-size:0.85em;">${n}</div>`;
          noteRow.appendChild(nc);
        });
        card.appendChild(noteRow);
      }
    } catch (e) {}
    return card;
  }

  // 切换事件
  btnTonnetz.addEventListener("click", () => {
    currentView = "tonnetz";
    btnTonnetz.classList.add("active");
    btnTonnetz.style.background = "linear-gradient(90deg, var(--accent), var(--accent-2))";
    btnTonnetz.style.color = "#fff";
    btnOcta.classList.remove("active");
    btnOcta.style.background = "rgba(255,255,255,0.08)";
    btnOcta.style.color = "#ccc";
    neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
    neoNodeOffsets = {};
    renderTonnetzMulti();
  });

  btnOcta.addEventListener("click", () => {
    currentView = "octatonic";
    btnOcta.classList.add("active");
    btnOcta.style.background = "linear-gradient(90deg, var(--accent), var(--accent-2))";
    btnOcta.style.color = "#fff";
    btnTonnetz.classList.remove("active");
    btnTonnetz.style.background = "rgba(255,255,255,0.08)";
    btnTonnetz.style.color = "#ccc";
    neoCanvasState = { offsetX: 0, offsetY: 0, scale: 1 };
    neoNodeOffsets = {};
    renderOctatonicMulti();
  });

  // 初始渲染
  if (geometric.Tonnetz_PLRSND && Object.keys(geometric.Tonnetz_PLRSND).length > 0) {
    renderTonnetzMulti();
  } else {
    renderOctatonicMulti();
  }
}

/**
 * 树型布局：根节点顶部，子节点向下展开
 * 类似二叉树/族谱结构，每层水平分布
 */
function buildTreeGraph(rootChord, maxDepth, type) {
  const visited = new Set();
  const nodes = [];
  const edges = [];

  const normalize = (chord) => {
    try {
      const notes = brain.converter._ensureNotesAndRoot(chord);
      if (notes?.length) return [...notes].sort().join(',');
    } catch (e) {}
    return chord;
  };

  const rootNorm = normalize(rootChord);
  visited.add(rootNorm);

  const centerInfo = brain.converter._ensureNotesAndRoot(rootChord, true);
  nodes.push({
    id: 0,
    chord: rootChord,
    notes: centerInfo?.notes || [],
    label: rootChord.length > 8 ? rootChord.slice(0, 7) + ".." : rootChord,
    x: 0,
    y: 0,
    group: "center",
    depth: 0
  });

  let nodeId = 1;
  // BFS: 队列元素 { chord, depth, parentId, operation, childIndex, totalSiblings }
  const queue = [{ chord: rootChord, depth: 0, parentId: null, operation: null }];

  while (queue.length > 0) {
    const { chord, depth, parentId } = queue.shift();
    if (depth >= maxDepth) continue;

    let neighbors = {};
    const geo = brain.nrt.getGeometricNeighbors(chord);

    if (type === "tonnetz" && geo.Tonnetz_PLRSND) {
      // 优先排列基本操作，再排扩展操作
      const primary = [];
      const secondary = [];
      Object.entries(geo.Tonnetz_PLRSND).forEach(([op, result]) => {
        if (result.chord) {
          if (PRIMARY_OPS.has(op)) primary.push([op, result.chord]);
          else secondary.push([op, result.chord]);
        }
      });
      // 基本操作按固定顺序：P, L, R, S, N, D1
      const order = ["P", "L", "R", "S", "N", "D1"];
      primary.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
      const allNeighbors = [...primary, ...secondary];
      allNeighbors.forEach(([op, chord]) => { neighbors[op] = chord; });
    } else if (type === "octatonic" && geo.Octatonic_Tower) {
      geo.Octatonic_Tower.forEach((neighbor, i) => {
        if (neighbor) neighbors[`O${i + 1}`] = neighbor;
      });
    }

    const neighborEntries = Object.entries(neighbors);
    const totalSiblings = neighborEntries.length;
    const parentNode = nodes.find(n => n.id === parentId);
    const parentX = parentNode ? parentNode.x : 0;
    const parentY = parentNode ? parentNode.y : 0;

    // 树的水平展开宽度随深度动态调整
    const levelWidth = neoLayerSpacing * 2 + (depth + 1) * neoLayerSpacing * 0.8;
    const startX = parentX - levelWidth / 2 + levelWidth / (totalSiblings + 1);

    neighborEntries.forEach(([op, neighborChord], idx) => {
      const normNeighbor = normalize(neighborChord);

      // 计算树型位置
      const childX = startX + (idx + 1) * (levelWidth / (totalSiblings + 1));
      const childY = parentY + neoLayerSpacing;

      if (!visited.has(normNeighbor)) {
        visited.add(normNeighbor);

        let notes = [];
        try {
          const parsed = brain.converter._ensureNotesAndRoot(neighborChord, true);
          notes = parsed?.notes || [];
        } catch (e) {}

        const isPrimary = PRIMARY_OPS.has(op);
        const newNode = {
          id: nodeId,
          chord: neighborChord,
          notes: notes,
          label: op,
          operation: op,
          isPrimary: isPrimary,
          x: Math.round(childX),
          y: Math.round(childY),
          group: isPrimary ? "transform" : "secondary",
          depth: depth + 1
        };

        nodes.push(newNode);
        edges.push({
          source: parentId !== null ? parentId : 0,
          target: nodeId,
          label: op,
          depth: depth + 1,
          isPrimary: isPrimary
        });

        queue.push({
          chord: neighborChord,
          depth: depth + 1,
          parentId: nodeId,
          operation: op
        });

        nodeId++;
      } else {
        // 连接到已访问节点
        const existingNode = nodes.find(
          n => normalize(n.chord) === normNeighbor && n.id !== parentId
        );
        if (existingNode && !edges.some(
          e => (e.source === parentId && e.target === existingNode.id) ||
               (e.source === existingNode.id && e.target === parentId)
        )) {
          edges.push({
            source: parentId !== null ? parentId : 0,
            target: existingNode.id,
            label: op,
            depth: Math.max(depth + 1, existingNode.depth),
            isPrimary: PRIMARY_OPS.has(op)
          });
        }
      }
    });
  }

  return { nodes, edges, center: rootChord };
}

/**
 * 连线颜色：浅层偏绿，深层偏蓝紫
 */
function getEdgeColor(depth, maxDepth, isPrimary) {
  const t = maxDepth <= 1 ? 0 : Math.min(1, (depth - 1) / Math.max(1, maxDepth - 1));
  if (isPrimary) {
    const hue = 145 - t * 30;
    const light = 48 - t * 12;
    return `hsla(${hue}, 55%, ${light}%, 0.75)`;
  } else {
    const hue = 180 + t * 80;
    const light = 45 + t * 10;
    return `hsla(${hue}, 45%, ${light}%, 0.55)`;
  }
}

function getNodeLabelColor(isPrimary, depth, maxDepth) {
  if (isPrimary) return "hsl(145, 55%, 55%)";
  const t = maxDepth <= 1 ? 0 : Math.min(1, depth / maxDepth);
  return `hsl(${200 + t * 70}, 50%, 65%)`;
}

/**
 * 树型画布绘制（支持右键拖拽节点）
 */
function drawTreeCanvas(container, graphData, type) {
  const canvas = document.createElement("canvas");
  const containerWidth = container.clientWidth || 600;
  const dpr = 2;
  // 动态高度：层数越多画布越高
  const canvasHeight = Math.max(500, (neoCurrentDepth + 1) * neoLayerSpacing + 200);
  canvas.width = containerWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = containerWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.style.display = "block";
  canvas.style.margin = "0 auto";
  container.appendChild(canvas);

  // 默认将根节点放在画布中上位置
  if (!neoCanvasState._initialized) {
    neoCanvasState.offsetX = 0;
    neoCanvasState.offsetY = -canvasHeight / 3;
    neoCanvasState._initialized = true;
  }

  const maxDepth = Math.max(1, ...graphData.nodes.map(n => n.depth || 0));

  // 右键拖拽状态
  let rightDragNode = null;
  let rightDragStartX = 0;
  let rightDragStartY = 0;
  let rightDragOrigX = 0;
  let rightDragOrigY = 0;

  canvas.addEventListener("contextmenu", (e) => e.preventDefault());

  function render() {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2 + neoCanvasState.offsetX * dpr;
    const cy = h / 2 + neoCanvasState.offsetY * dpr + 100 * dpr; // 根节点偏上
    const scale = neoCanvasState.scale;

    ctx.clearRect(0, 0, w, h);

    const { nodes, edges } = graphData;

    // 应用手动偏移
    const nodePositions = nodes.map(n => {
      const manualOffset = neoNodeOffsets[n.id] || { x: 0, y: 0 };
      return {
        ...n,
        px: Math.round(cx + (n.x + manualOffset.x) * scale * dpr),
        py: Math.round(cy + (n.y + manualOffset.y) * scale * dpr),
      };
    });

    // === 连线 ===
    edges.forEach(edge => {
      const from = nodePositions.find(n => n.id === edge.source);
      const to = nodePositions.find(n => n.id === edge.target);
      if (!from || !to) return;

      const edgeDepth = edge.depth || 1;
      const isPrimary = edge.isPrimary || false;

      // 树型布局的贝塞尔：控制点在垂直中点
      const cpx = from.px;
      const cpy = (from.py + to.py) / 2;

      ctx.beginPath();
      ctx.moveTo(from.px, from.py);
      ctx.quadraticCurveTo(cpx, cpy, to.px, to.py);

      const edgeColor = getEdgeColor(edgeDepth, maxDepth, isPrimary);
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 1.3 * scale;
      ctx.stroke();

      // 连线标签
      if (edge.label && scale > 0.55) {
        const labelColor = getNodeLabelColor(isPrimary, edgeDepth, maxDepth);
        ctx.fillStyle = labelColor;
        ctx.font = `bold ${Math.max(8, 10 * scale)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const labelX = (from.px + to.px) / 2 + 15 * scale * dpr;
        const labelY = (from.py + to.py) / 2;
        // ctx.fillText(edge.label, labelX, labelY);
      }
    });

    // === 节点 ===
    const centerRadius = neoNodeSize * 1.15;
    const normalRadius = neoNodeSize;

    nodePositions.forEach(node => {
      const isCenter = node.group === "center";
      const isTransform = node.group === "transform";
      const radius = (isCenter ? centerRadius : normalRadius) * scale;
      const depth = node.depth || 0;
      const depthFade = Math.max(0.35, 1 - depth * 0.12);

      let glowHue = 200, glowSat = 90;
      if (!isCenter) {
        glowHue = isTransform ? 145 : 260;
        glowSat = isTransform ? 60 : 55;
      }

      // 光晕
      const glowR = radius * 2;
      const glow = ctx.createRadialGradient(node.px, node.py, radius * 0.3, node.px, node.py, glowR);
      glow.addColorStop(0, `hsla(${glowHue}, ${glowSat}%, 50%, ${0.5 * depthFade})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.px, node.py, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 主体
      ctx.beginPath();
      ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
      const grad = ctx.createLinearGradient(node.px - radius, node.py - radius, node.px + radius, node.py + radius);
      if (isCenter) {
        grad.addColorStop(0, "#4a90d9");
        grad.addColorStop(0.5, "#2563a8");
        grad.addColorStop(1, "#1a3a6e");
      } else if (isTransform) {
        grad.addColorStop(0, "hsl(145, 45%, 35%)");
        grad.addColorStop(0.5, "hsl(145, 40%, 25%)");
        grad.addColorStop(1, "hsl(145, 35%, 15%)");
      } else {
        grad.addColorStop(0, `hsla(260, 40%, ${35 * depthFade}%, ${depthFade})`);
        grad.addColorStop(0.5, `hsla(260, 35%, ${25 * depthFade}%, ${depthFade})`);
        grad.addColorStop(1, `hsla(260, 30%, ${15 * depthFade}%, ${depthFade})`);
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // 边框
      if (isCenter) {
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 2.5 * scale;
      } else if (isTransform) {
        ctx.strokeStyle = "hsla(145, 55%, 55%, 0.7)";
        ctx.lineWidth = 2 * scale;
      } else {
        ctx.strokeStyle = `hsla(260, 50%, 60%, ${0.5 * depthFade})`;
        ctx.lineWidth = 1.5 * scale;
      }
      ctx.stroke();

      // 标签
      const label = node.chord;
      const fontSize = (isCenter ? 10 : 8) * scale;

      if (scale > 0.4) {
        if (isCenter) {
          ctx.fillStyle = "#fff";
          ctx.font = `bold ${Math.max(8, fontSize)}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          if (label.length > 8) {
            ctx.fillText(label.slice(0, 5), node.px, node.py - 3);
            ctx.fillText(label.slice(5, 10), node.px, node.py + 10);
          } else {
            ctx.fillText(label, node.px, node.py);
          }
        } else {
          const labelColor = getNodeLabelColor(!!node.isPrimary, depth, maxDepth);
          ctx.fillStyle = labelColor;
          ctx.font = `bold ${Math.max(7, fontSize)}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, node.px, node.py);

          if (scale > 0.65) {
            ctx.fillStyle = "rgba(255,255,255,0.35)";
            ctx.font = `${Math.max(6, 7 * scale)}px sans-serif`;
            const short = node.label.length > 10 ? node.label.slice(0, 9) + ".." : node.label;
            ctx.fillText(short, node.px, node.py + radius + 8);
          }
        }
      }
    });

    // 图例
    if (scale > 0.5) {
      const legY = h - 14 * dpr;
      ctx.fillStyle = "hsl(145, 55%, 55%)";
      ctx.font = `bold ${8 * dpr}px sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText("● PLRSN D1", 10 * dpr, legY);
      ctx.fillStyle = "hsla(260, 50%, 65%, 0.8)";
      ctx.fillText("● 扩展", 115 * dpr, legY);
      const barX = 190 * dpr, barW = 100 * dpr, barH = 9 * dpr;
      const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      barGrad.addColorStop(0, "hsl(145, 55%, 45%)");
      barGrad.addColorStop(1, "hsl(260, 50%, 55%)");
      ctx.fillStyle = barGrad;
      ctx.fillRect(barX, legY - 4 * dpr, barW, barH);
    }
  }

  // ===== 交互：左键拖拽画布 =====
  let isPanning = false;
  let lastMouseX = 0, lastMouseY = 0;

  canvas.addEventListener("mousedown", (e) => {
    if (e.button === 2) return; // 右键不处理 pan
    if (e.button === 0) {
      isPanning = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      container.style.cursor = "grabbing";
    }
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (rightDragNode) {
      const dx = e.clientX - rightDragStartX;
      const dy = e.clientY - rightDragStartY;
      neoNodeOffsets[rightDragNode.id] = {
        x: rightDragOrigX + dx / (neoCanvasState.scale * dpr),
        y: rightDragOrigY + dy / (neoCanvasState.scale * dpr)
      };
      render();
      return;
    }
    if (!isPanning) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    neoCanvasState.offsetX += dx;
    neoCanvasState.offsetY += dy;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    render();
  });

  window.addEventListener("mouseup", (e) => {
    if (e.button === 2 && rightDragNode) {
      rightDragNode = null;
      container.style.cursor = "grab";
      return;
    }
    if (isPanning) {
      isPanning = false;
      container.style.cursor = "grab";
    }
  });

  // ===== 右键拖拽节点 =====
  canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 2) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const sy = (e.clientY - rect.top) * (canvas.height / rect.height);

    // 查找节点
    const hitNodes = graphData.nodes.map(n => {
      const mo = neoNodeOffsets[n.id] || { x: 0, y: 0 };
      return {
        ...n,
        px: canvas.width / 2 + neoCanvasState.offsetX * dpr + (n.x + mo.x) * neoCanvasState.scale * dpr,
        py: canvas.height / 2 + neoCanvasState.offsetY * dpr + 100 * dpr + (n.y + mo.y) * neoCanvasState.scale * dpr,
      };
    });

    const hit = hitNodes.find(node => {
      const r = ((node.group === "center" ? neoNodeSize * 1.15 : neoNodeSize) * neoCanvasState.scale) + 6;
      return Math.hypot(node.px - sx, node.py - sy) <= r;
    });

    if (hit) {
      rightDragNode = hit;
      rightDragStartX = e.clientX;
      rightDragStartY = e.clientY;
      rightDragOrigX = neoNodeOffsets[hit.id]?.x || 0;
      rightDragOrigY = neoNodeOffsets[hit.id]?.y || 0;
      container.style.cursor = "grabbing";
    }
  });

  // 滚轮缩放
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    neoCanvasState.scale = Math.max(0.25, Math.min(3.0, neoCanvasState.scale * zoomFactor));
    render();
  }, { passive: false });

  // 触摸支持
  canvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isPanning = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: false });
  canvas.addEventListener("touchmove", (e) => {
    if (!isPanning || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseX;
    const dy = e.touches[0].clientY - lastMouseY;
    neoCanvasState.offsetX += dx;
    neoCanvasState.offsetY += dy;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
    render();
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener("touchend", () => { isPanning = false; });

  // 双击重置
  canvas.addEventListener("dblclick", () => {
    neoCanvasState = { offsetX: 0, offsetY: -(canvasHeight) / 3, scale: 1, _initialized: true };
    neoNodeOffsets = {};
    render();
  });

  // 左键点击节点跳转
  canvas.addEventListener("click", (e) => {
    if (isPanning || rightDragNode) return;
    const rect = canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const sy = (e.clientY - rect.top) * (canvas.height / rect.height);

    const hitNodes = graphData.nodes.map(n => {
      const mo = neoNodeOffsets[n.id] || { x: 0, y: 0 };
      return {
        ...n,
        px: canvas.width / 2 + neoCanvasState.offsetX * dpr + (n.x + mo.x) * neoCanvasState.scale * dpr,
        py: canvas.height / 2 + neoCanvasState.offsetY * dpr + 100 * dpr + (n.y + mo.y) * neoCanvasState.scale * dpr,
      };
    });

    const hit = hitNodes.find(node => {
      const r = ((node.group === "center" ? neoNodeSize * 1.15 : neoNodeSize) * neoCanvasState.scale) + 10;
      return Math.hypot(node.px - sx, node.py - sy) <= r;
    });

    if (hit) {
      const neoInput = document.getElementById("neo-input");
      if (neoInput) neoInput.value = hit.chord;
      neoCanvasState = { offsetX: 0, offsetY: -(canvasHeight) / 3, scale: 1, _initialized: true };
      neoNodeOffsets = {};
      updateNeo(container.parentElement, hit.chord);
    }
  });

  // 初始渲染
  render();
}
  // ==================== 和弦音阶速查面板 ====================
  function initRefPanel() {
    const rootSelect = document.getElementById("ref-root-select");
    const scaleSelect = document.getElementById("ref-scale-select");
    const familySelect = document.getElementById("ref-family-select");
    const body = document.getElementById("panel-ref-body");

    // 检查是否已初始化（避免重复填充）
    if (rootSelect.options.length > 0) return;

    const ms = brain.cst; // MusicScale 实例

    // --- 填充根音下拉 ---
    const roots = [
      "C",
      "Db",
      "D",
      "Eb",
      "E",
      "F",
      "Gb",
      "G",
      "Ab",
      "A",
      "Bb",
      "B",
    ];
    roots.forEach((r) => {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      rootSelect.appendChild(opt);
    });

    // --- 填充音阶下拉 ---
    ms.scaleMode.forEach((scale) => {
      const opt = document.createElement("option");
      opt.value = scale.id;
      opt.textContent = scale.scale_name[0]; // 优先第一个名称
      scaleSelect.appendChild(opt);
    });

    // --- 填充和弦家族下拉 ---
    const families = Object.keys(ms.chordFamily);
    families.forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f;
      opt.textContent = f;
      familySelect.appendChild(opt);
    });

    // ============ 音阶查询按钮 ============
    document.getElementById("ref-scale-run").addEventListener("click", () => {
      const root = rootSelect.value;
      const scaleId = scaleSelect.value;

      if (!root || !scaleId) {
        body.innerHTML = `<div class="result-card">${window.__("ref_select_root_first")}</div>`;
        return;
      }

      const scaleInfo = ms.get_scale_by_id(scaleId);
      if (!scaleInfo) {
        body.innerHTML = `<div class="result-card">Scale not found</div>`;
        return;
      }

      renderScaleDetail(body, root, scaleInfo, ms);
    });

    // ============ 和弦家族查询按钮 ============
    document.getElementById("ref-family-run").addEventListener("click", () => {
      const familyName = familySelect.value;

      if (!familyName) {
        body.innerHTML = `<div class="result-card">${window.__("ref_select_family_first")}</div>`;
        return;
      }

      renderFamilyDetail(body, familyName, ms);
    });
  }

  function jumpToScale(root, scaleId) {
    const body = document.getElementById("panel-ref-body");
    if (!body) return;

    showOnlyFeature("ref");
    initRefPanel();

    const rootSelect = document.getElementById("ref-root-select");
    const scaleSelect = document.getElementById("ref-scale-select");
    if (rootSelect && root) rootSelect.value = root;
    if (scaleSelect && scaleId) scaleSelect.value = scaleId;

    const ms = brain.cst;
    const scaleInfo = ms.get_scale_by_id(scaleId);
    if (scaleInfo) {
      renderScaleDetail(
        body,
        root || (rootSelect && rootSelect.value) || "C",
        scaleInfo,
        ms,
      );
    }
  }

  /**
   * 播放音阶（上行+下行）
   * @param {Array} scaleNotes - 音阶音符数组（不含八度信息）
   * @param {number} baseOctave - 基准八度
   * @param {number} noteDuration - 每个音符的时长（秒）
   */
  function playScale(scaleNotes, baseOctave = 3, noteDuration = 0.15) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // 主输出
      const mainOut = ctx.createGain();
      mainOut.gain.setValueAtTime(0.4, now);

      // 混响
      const reverb = createReverb(ctx, noteDuration * scaleNotes.length * 2 + 1);
      const dryGain = ctx.createGain();
      const wetGain = ctx.createGain();

      dryGain.gain.setValueAtTime(0.7, now);
      wetGain.gain.setValueAtTime(0.3, now);

      // 构建完整的上行+下行序列（含八度变化）
      const sequence = [];

      // 上行（从基准八度开始，逐音升高）
      scaleNotes.forEach((note, index) => {
        const semitone = noteToSemitoneValue(note);
        if (semitone === undefined) return;

        // 判断是否需要换八度（当音符值比前一个小，说明到了下一组）
        let octave = baseOctave;
        if (index > 0) {
          const prevSemitone = noteToSemitoneValue(scaleNotes[index - 1]);
          if (semitone <= prevSemitone) {
            // 进入了下一个八度（如从 B 到 C）
            octave = baseOctave + Math.floor(index / scaleNotes.length) +
              (index >= scaleNotes.length ? 1 : 0);
          }
        }

        sequence.push({ freq: semitoneToFreq(semitone, octave), octave });
      });

      // 添加高八度的主音作为顶点
      const rootSemitone = noteToSemitoneValue(scaleNotes[0]);
      sequence.push({ freq: semitoneToFreq(rootSemitone, baseOctave + 1), octave: baseOctave + 1 });

      // 下行（从高八度主音往下回到基准主音）
      for (let i = scaleNotes.length - 1; i >= 0; i--) {
        const semitone = noteToSemitoneValue(scaleNotes[i]);
        if (semitone === undefined) continue;

        let octave = baseOctave;
        if (i === scaleNotes.length - 1) octave = baseOctave + 1;
        else if (semitone >= rootSemitone && i < scaleNotes.length - 1) {
          octave = baseOctave + 1;
        }

        sequence.push({ freq: semitoneToFreq(semitone, octave), octave });
      }

      // 最后回到基准主音
      sequence.push({ freq: semitoneToFreq(rootSemitone, baseOctave), octave: baseOctave });

      // 播放序列
      sequence.forEach(({ freq }, index) => {
        const startTime = now + index * noteDuration;
        const tone = createPianoTone(ctx, freq, startTime, noteDuration * 1.5);

        tone.connect(dryGain);
        tone.connect(wetGain);
      });

      dryGain.connect(mainOut);
      wetGain.connect(reverb);
      reverb.connect(mainOut);
      mainOut.connect(ctx.destination);

    } catch (e) {
      console.warn("play scale failure:", e);
    }
  }

  /**
   * 智能计算音阶序列的八度分配
   * 确保上行时音符逐渐升高，下行时逐渐降低
   */
  function buildScaleSequence(scaleNotes, baseOctave, includeDescending = true) {
    const sequence = [];
    const rootSemitone = noteToSemitoneValue(scaleNotes[0]);

    // 上行
    let currentOctave = baseOctave;
    let prevSemitone = null;

    scaleNotes.forEach((note, index) => {
      const semitone = noteToSemitoneValue(note);
      if (semitone === undefined) return;

      // 如果当前音符比前一个音符小（如 B→C），进入下一个八度
      if (prevSemitone !== null && semitone <= prevSemitone) {
        currentOctave++;
      }

      sequence.push({
        freq: semitoneToFreq(semitone, currentOctave),
        octave: currentOctave,
        note: note
      });

      prevSemitone = semitone;
    });

    // 高点：再升高八度的主音
    sequence.push({
      freq: semitoneToFreq(rootSemitone, currentOctave + 1),
      octave: currentOctave + 1,
      note: scaleNotes[0]
    });

    if (includeDescending) {
      // 下行
      prevSemitone = null;

      sequence.push({
        freq: semitoneToFreq(rootSemitone, currentOctave + 1),
        octave: currentOctave + 1,
        note: scaleNotes[0]
      });
      // currentOctave = currentOctave + 1;

      for (let i = scaleNotes.length - 1; i >= 0; i--) {
        const semitone = noteToSemitoneValue(scaleNotes[i]);
        if (semitone === undefined) continue;

        // 如果当前音符比前一个音符大（如 C→B），进入低一个八度
        if (prevSemitone !== null && semitone > prevSemitone) {
          currentOctave--;
        }

        sequence.push({
          freq: semitoneToFreq(semitone, currentOctave),
          octave: currentOctave,
          note: scaleNotes[i]
        });

        prevSemitone = semitone;
      }
    }

    return sequence;
  }

  /**
   * 播放音阶（使用智能八度分配）
   */
  function playScaleSequence(scaleNotes, baseOctave = 3, noteDuration = 0.15) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const mainOut = ctx.createGain();
      mainOut.gain.setValueAtTime(0.4, now);

      const reverb = createReverb(ctx, noteDuration * scaleNotes.length * 3 + 1);
      const dryGain = ctx.createGain();
      const wetGain = ctx.createGain();

      dryGain.gain.setValueAtTime(0.7, now);
      wetGain.gain.setValueAtTime(0.3, now);

      const sequence = buildScaleSequence(scaleNotes, baseOctave, true);

      sequence.forEach(({ freq }, index) => {
        const startTime = now + index * noteDuration;
        const tone = createPianoTone(ctx, freq, startTime, noteDuration * 1.5);

        // 主音稍微强调
        if (index === 0 || index === scaleNotes.length ||
          index === sequence.length - 1) {
          // 主音音量稍大
          const extraGain = ctx.createGain();
          extraGain.gain.setValueAtTime(1.2, startTime);
          tone.disconnect();
          tone.connect(extraGain);
          extraGain.connect(dryGain);
          extraGain.connect(wetGain);
        } else {
          tone.connect(dryGain);
          tone.connect(wetGain);
        }
      });

      dryGain.connect(mainOut);
      wetGain.connect(reverb);
      reverb.connect(mainOut);
      mainOut.connect(ctx.destination);

    } catch (e) {
      console.warn("scale play failure", e);
    }
  }

  function renderScaleDetail(container, root, scaleInfo, ms) {
    const rootIdx = ms.noteToVal ? ms.noteToVal[root] : conv.noteToIdx[root];
    if (rootIdx === undefined) {
      container.innerHTML = `<div class="result-card">Invalid root: ${root}</div>`;
      return;
    }

    const intervals = scaleInfo.intervals;
    const avoidIds = scaleInfo.avoid_intervals_ids || [];
    const avoidSet = new Set(
      avoidIds.map((i) => intervals[i]).map((v) => (rootIdx + v) % 12),
    );

    // 计算音符 — 必须在播放按钮之前定义
    const noteNames = intervals.map((i) => {
      const val = (rootIdx + i) % 12;
      return { note: conv.idxToNote[val], val, intervalIdx: i };
    });

    // 获取音阶音符列表（纯音符名称数组）
    const scaleNoteNames = noteNames.map(({ note }) => note);

    // 关联音阶
    const strongRelated = (scaleInfo.related_strong || [])
      .map((id) => ms.get_scale_by_id(id))
      .filter((s) => s);
    const weakRelated = (scaleInfo.related_weak || [])
      .map((id) => ms.get_scale_by_id(id))
      .filter((s) => s);

    // 同家族音阶
    const sameFamilyScales = ms.get_scales_by_chord_family(scaleInfo.family);

    // 家族和弦音符
    const familyChordIntervals = ms.chordFamily[scaleInfo.family] || [];
    const familyChordNotes = familyChordIntervals.map(
      (i) => conv.idxToNote[(rootIdx + i) % 12],
    );

    container.innerHTML = "";

    // ---- 标题 ----
    const header = document.createElement("h3");
    header.className = "card-title";
    header.style.margin = "0 0 12px 0";
    header.textContent = `${root} ${scaleInfo.scale_name[0]}`;
    container.appendChild(header);

    const subHeader = document.createElement("div");
    subHeader.className = "small-muted";
    subHeader.textContent = `${window.__("ref_family_title")}: ${scaleInfo.family}`;
    container.appendChild(subHeader);

    // ---- 音阶内音（标注避免音） ----
    const notesSec = document.createElement("div");
    notesSec.style.marginTop = "16px";

    // 音符标题行 + 播放按钮
    const notesHeaderRow = document.createElement("div");
    notesHeaderRow.style.display = "flex";
    notesHeaderRow.style.alignItems = "center";
    notesHeaderRow.style.justifyContent = "space-between";
    notesHeaderRow.style.marginBottom = "8px";

    const notesLabel = document.createElement("div");
    notesLabel.style.fontWeight = "bold";
    notesLabel.textContent = window.__("ref_notes") || "Scale Notes";
    notesHeaderRow.appendChild(notesLabel);

    // 创建播放按钮组
    const playBtnGroup = document.createElement("div");
    playBtnGroup.style.display = "flex";
    playBtnGroup.style.gap = "8px";

    // 上行+下行播放按钮
    const playUpDownBtn = document.createElement("button");
    playUpDownBtn.textContent = window.__("scale_play_title") || "Play";
    playUpDownBtn.style.padding = "6px 12px";
    playUpDownBtn.style.borderRadius = "6px";
    playUpDownBtn.style.border = "1px solid var(--accent-2)";
    playUpDownBtn.style.background = "rgba(0, 181, 173, 0.15)";
    playUpDownBtn.style.color = "var(--accent-2)";
    playUpDownBtn.style.cursor = "pointer";
    playUpDownBtn.style.fontSize = "0.85em";

    playBtnGroup.appendChild(playUpDownBtn);
    notesHeaderRow.appendChild(playBtnGroup);
    notesSec.appendChild(notesHeaderRow);

    // 播放按钮事件
    playUpDownBtn.addEventListener("click", () => {
      playScaleSequence(scaleNoteNames, 3, 0.15);

      // 视觉反馈
      playUpDownBtn.style.background = "rgba(0, 181, 173, 0.3)";
      setTimeout(() => {
        playUpDownBtn.style.background = "rgba(0, 181, 173, 0.15)";
      }, 200);
    });

    // 音符网格
    const noteGrid = document.createElement("div");
    noteGrid.className = "note-grid";
    noteNames.forEach(({ note, val }) => {
      const cell = document.createElement("div");
      cell.className = "note-cell";
      if (avoidSet.has(val)) {
        cell.classList.add("avoid-note");
        cell.style.background = "rgba(255, 80, 80, 0.2)";
        cell.style.borderColor = "rgba(255, 100, 100, 0.6)";
      }
      cell.innerHTML = `<div class="note">${note}</div>`;
      noteGrid.appendChild(cell);
    });

    notesSec.appendChild(noteGrid);

    // 避免音提示
    if (avoidIds.length > 0) {
      let avoidNote = [];
      avoidIds.forEach((avoidId) => {
        avoidNote.push(noteNames[avoidId].note);
      });
      const avoidTip = document.createElement("div");
      avoidTip.className = "small-muted";
      avoidTip.style.marginTop = "6px";
      avoidTip.textContent = `${window.__("ref_avoid")}: ${avoidNote.join(", ")}`;
      notesSec.appendChild(avoidTip);
    }
    container.appendChild(notesSec);

    // ---- 家族和弦 ----
    const familySec = document.createElement("div");
    familySec.style.marginTop = "16px";
    const familyLabel = document.createElement("div");
    familyLabel.style.fontWeight = "bold";
    familyLabel.style.marginBottom = "8px";
    familyLabel.textContent = window.__("ref_family_chord") || "Family Chord";
    familySec.appendChild(familyLabel);

    const familyGrid = document.createElement("div");
    familyGrid.className = "note-grid";
    familyChordNotes.forEach((n) => {
      const cell = document.createElement("div");
      cell.className = "note-cell";
      cell.innerHTML = `<div class="note">${n}</div>`;
      familyGrid.appendChild(cell);
    });
    familySec.appendChild(familyGrid);
    container.appendChild(familySec);

    // ---- 强关联音阶 ----
    if (strongRelated.length > 0) {
      const sec = document.createElement("div");
      sec.style.marginTop = "16px";
      const lbl = document.createElement("div");
      lbl.style.fontWeight = "bold";
      lbl.style.marginBottom = "8px";
      lbl.textContent = window.__("ref_related_strong") || "Strongly Related";
      sec.appendChild(lbl);
      sec.appendChild(makeScaleList(strongRelated, root, ms));
      container.appendChild(sec);
    }

    // ---- 关联音阶 ----
    if (weakRelated.length > 0) {
      const sec = document.createElement("div");
      sec.style.marginTop = "16px";
      const lbl = document.createElement("div");
      lbl.style.fontWeight = "bold";
      lbl.style.marginBottom = "8px";
      lbl.textContent = window.__("ref_related_weak") || "Related";
      sec.appendChild(lbl);
      sec.appendChild(makeScaleList(weakRelated, root, ms));
      container.appendChild(sec);
    }
  }

  /**
   * 从预构建的序列播放音阶
   */
  function playScaleFromSequence(sequence, noteDuration = 0.15) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const mainOut = ctx.createGain();
      mainOut.gain.setValueAtTime(0.4, now);

      const reverb = createReverb(ctx, noteDuration * sequence.length + 0.5);
      const dryGain = ctx.createGain();
      const wetGain = ctx.createGain();

      dryGain.gain.setValueAtTime(0.7, now);
      wetGain.gain.setValueAtTime(0.3, now);

      sequence.forEach(({ freq }, index) => {
        const startTime = now + index * noteDuration;
        const tone = createPianoTone(ctx, freq, startTime, noteDuration * 1.5);

        tone.connect(dryGain);
        tone.connect(wetGain);
      });

      dryGain.connect(mainOut);
      wetGain.connect(reverb);
      reverb.connect(mainOut);
      mainOut.connect(ctx.destination);

    } catch (e) {
      console.warn("play scale failure:", e);
    }
  }

  // ============ 渲染和弦家族详情 ============
  function renderFamilyDetail(container, familyName, ms) {
    const familyIntervals = ms.chordFamily[familyName];
    const scales = ms.get_scales_by_chord_family(familyName);

    if (!familyIntervals) {
      container.innerHTML = `<div class="result-card">Family not found: ${familyName}</div>`;
      return;
    }

    container.innerHTML = "";

    // 标题
    const header = document.createElement("h3");
    header.className = "card-title";
    header.textContent = familyName;
    container.appendChild(header);

    // 家族和弦音（以C为根音展示）
    const notesSec = document.createElement("div");
    notesSec.style.marginTop = "16px";
    const notesLabel = document.createElement("div");
    notesLabel.style.fontWeight = "bold";
    notesLabel.style.marginBottom = "8px";
    notesLabel.textContent =
      window.__("ref_family_chord") || "Family Chord (root C)";
    notesSec.appendChild(notesLabel);

    const noteGrid = document.createElement("div");
    noteGrid.className = "note-grid";
    familyIntervals.forEach((i) => {
      const note = conv.idxToNote[i % 12];
      const cell = document.createElement("div");
      cell.className = "note-cell";
      cell.innerHTML = `<div class="note">${note}</div>`;
      noteGrid.appendChild(cell);
    });
    notesSec.appendChild(noteGrid);
    container.appendChild(notesSec);

    // 该家族下所有音阶
    const scalesSec = document.createElement("div");
    scalesSec.style.marginTop = "16px";
    const scalesLabel = document.createElement("div");
    scalesLabel.style.fontWeight = "bold";
    scalesLabel.style.marginBottom = "8px";
    scalesLabel.textContent = `${window.__("ref_same_family") || "Scales in this family"} (${scales.length})`;
    scalesSec.appendChild(scalesLabel);

    if (scales.length > 0) {
      const scaleGrid = document.createElement("div");
      scaleGrid.style.display = "flex";
      scaleGrid.style.flexWrap = "wrap";
      scaleGrid.style.gap = "8px";

      scales.forEach((s) => {
        const badge = document.createElement("span");
        badge.style.padding = "6px 12px";
        badge.style.borderRadius = "6px";
        badge.style.background = "rgba(255,255,255,0.08)";
        badge.style.fontSize = "0.9em";
        badge.style.cursor = "pointer";
        badge.title = `${s.scale_name[0]} — ${s.id}`;
        badge.textContent = s.scale_name[0];
        badge.addEventListener("click", () => jumpToScale("C", s.id));
        scaleGrid.appendChild(badge);
      });
      scalesSec.appendChild(scaleGrid);
    }
    container.appendChild(scalesSec);
  }

  // ============ 辅助：生成关联音阶小卡片列表 ============
  function makeScaleList(scales, root, ms) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "8px";

    scales.forEach((s) => {
      const card = document.createElement("div");
      card.style.padding = "10px 14px";
      card.style.borderRadius = "8px";
      card.style.background = "rgba(255,255,255,0.05)";
      card.style.border = "1px solid rgba(255,255,255,0.08)";
      card.style.cursor = "pointer";
      card.style.transition = "background 0.2s";
      card.addEventListener("click", () => jumpToScale(root, s.id));
      card.addEventListener(
        "mouseenter",
        () => (card.style.background = "rgba(255,255,255,0.1)"),
      );
      card.addEventListener(
        "mouseleave",
        () => (card.style.background = "rgba(255,255,255,0.05)"),
      );

      // 计算此关联音阶的首个避免音（如果有）
      const avoidIds = s.avoid_intervals_ids || [];
      const intervals = s.intervals || [];

      // 顶部音阶名
      const nameEl = document.createElement("div");
      nameEl.style.fontWeight = "bold";
      nameEl.style.fontSize = "0.9em";
      nameEl.style.marginBottom = "4px";
      nameEl.style.display = "inline-block";
      nameEl.textContent = s.scale_name[0];
      card.appendChild(nameEl);

      // 音符预览（微型网格）
      if (intervals.length > 0) {
        const rootIdx = conv.noteToIdx[root];
        const microGrid = document.createElement("div");
        microGrid.style.display = "flex";
        microGrid.style.gap = "3px";
        microGrid.style.marginTop = "6px";

        const avoidSet = new Set(
          avoidIds.map((i) => intervals[i]).map((v) => (rootIdx + v) % 12),
        );
        intervals.forEach((i) => {
          const val = (rootIdx + i) % 12;
          const n = conv.idxToNote[val];
          const dot = document.createElement("span");
          dot.style.padding = "2px 5px";
          dot.style.borderRadius = "3px";
          dot.style.fontSize = "0.75em";
          if (avoidSet.has(val)) {
            dot.style.background = "rgba(255, 80, 80, 0.25)";
            dot.style.color = "#ff8888";
          } else {
            dot.style.background = "rgba(255,255,255,0.06)";
          }
          dot.textContent = n;
          microGrid.appendChild(dot);
        });
        card.appendChild(microGrid);
      }

      container.appendChild(card);
    });

    return container;
  }
  // ==================== 五度圈面板 ====================

  // 功能名称 — 通过 i18n 动态获取
  function getFuncNames() {
    return {
      tonic: window.__("circle_func_tonic") || "Tonic",
      supertonic: window.__("circle_func_supertonic") || "Supertonic",
      mediant: window.__("circle_func_mediant") || "Mediant",
      subdom: window.__("circle_func_subdominant") || "Subdominant",
      dominant: window.__("circle_func_dominant") || "Dominant",
      submed: window.__("circle_func_submediant") || "Submediant",
      leading: window.__("circle_func_leading") || "Leading Tone",
      subtonic: window.__("circle_func_subtonic") || "Subtonic",
    };
  }

  function buildMajorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.leading,
    ];
  }

  function buildMinorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.subtonic,
    ];
  }

  function buildHarmonicMajorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.leading,
    ];
  }

  function buildHarmonicMinorFuncs() {
    const f = getFuncNames();
    return [
      f.tonic,
      f.supertonic,
      f.mediant,
      f.subdom,
      f.dominant,
      f.submed,
      f.leading,
    ];
  }

  function updateNeoPath(targetEl, chordA, chordB, maxSteps = 8) {
    let paths;
    try {
      paths = brain.nrt.findPath(chordA, chordB, maxSteps);
    } catch (e) {
      targetEl.innerHTML = `<div class="result-card">${e.message}</div>`;
      return;
    }

    targetEl.innerHTML = "";

    if (!paths || paths.length === 0) {
      const noPath = document.createElement("div");
      noPath.className = "result-card";
      noPath.style.textAlign = "center";
      noPath.style.padding = "30px";
      noPath.innerHTML = `
      <div style="font-size:2em; margin-bottom:12px;">✗</div>
      <div class="small-muted">${window.__("neo_path_no_path") || "No connection path found"}</div>
      <div style="margin-top:12px; font-size:1.1em;">
        <span style="color:var(--accent);">${chordA}</span>
        <span style="color:var(--muted); margin:0 8px;">→</span>
        <span style="color:var(--accent-2);">${chordB}</span>
      </div>
      <div class="small-muted" style="margin-top:8px;">(${window.__("neo_path_steps") || "max"}: ${maxSteps} ${window.__("neo_path_steps") || "steps"})</div>
    `;
      targetEl.appendChild(noPath);
      return;
    }

    // 最优路径
    const optimalPath = paths[0];
    renderPathCard(targetEl, optimalPath, chordA, chordB, true);

    // 其他路径
    if (paths.length > 1) {
      const altTitle = document.createElement("h4");
      altTitle.className = "section-title";
      altTitle.style.marginTop = "24px";
      altTitle.style.marginBottom = "12px";
      altTitle.textContent = window.__("neo_path_alternative") || "Alternative Paths";
      targetEl.appendChild(altTitle);

      paths.slice(1, Math.min(6, paths.length)).forEach((p) => {
        renderPathCard(targetEl, p, chordA, chordB, false);
      });
    }
  }

  function renderPathCard(container, pathData, chordA, chordB, isOptimal) {
    const card = document.createElement("div");
    card.className = "result-card";
    card.style.margin = "12px 0";
    card.style.background = isOptimal
      ? "linear-gradient(135deg, hsl(170, 25%, 18%), hsl(170, 20%, 10%))"
      : "linear-gradient(135deg, hsl(260, 12%, 16%), hsl(260, 8%, 9%))";

    if (isOptimal) {
      card.style.border = "1px solid var(--accent-2)";
    }

    // 头部：标题 + 步数徽章
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "14px";

    const title = document.createElement("div");
    title.className = "card-title";
    title.style.margin = "0";
    title.textContent = isOptimal
      ? `${window.__("neo_path_optimal") || "Optimal Path"}`
      : `${window.__("neo_path_alternative") || "Path"}`;

    const stepsBadge = document.createElement("span");
    stepsBadge.className = "spice-badge";
    stepsBadge.style.background = isOptimal ? "var(--accent-2)" : "rgba(255,255,255,0.1)";
    stepsBadge.style.color = "#fff";
    stepsBadge.textContent = `${pathData.steps} ${window.__("neo_path_steps") || "steps"}`;

    header.appendChild(title);
    header.appendChild(stepsBadge);
    card.appendChild(header);

    // 路径流程图
    const flowContainer = document.createElement("div");
    flowContainer.style.display = "flex";
    flowContainer.style.flexWrap = "wrap";
    flowContainer.style.alignItems = "center";
    flowContainer.style.justifyContent = "center";
    flowContainer.style.gap = "4px";
    flowContainer.style.padding = "8px 0";

    pathData.path.forEach((step, i) => {
      // 和弦块
      const chordEl = document.createElement("div");
      chordEl.style.padding = "6px 12px";
      chordEl.style.borderRadius = "6px";
      chordEl.style.background = "rgba(255,255,255,0.08)";
      chordEl.style.fontWeight = "bold";
      chordEl.style.fontSize = "0.9em";
      chordEl.textContent = step.from;
      flowContainer.appendChild(chordEl);

      // 变换操作箭头
      const arrowEl = document.createElement("div");
      arrowEl.style.display = "flex";
      arrowEl.style.flexDirection = "column";
      arrowEl.style.alignItems = "center";
      arrowEl.style.padding = "0 4px";
      arrowEl.innerHTML = `
      <span style="font-size:1em; color:var(--accent);">→</span>
      <span style="font-size:0.65em; color:var(--accent-2); font-weight:bold; white-space:nowrap;">${step.operation}</span>
    `;
      flowContainer.appendChild(arrowEl);

      // 最后一步显示目标和弦（高亮）
      if (i === pathData.path.length - 1) {
        const targetEl = document.createElement("div");
        targetEl.style.padding = "6px 12px";
        targetEl.style.borderRadius = "6px";
        targetEl.style.background = "rgba(0, 181, 173, 0.2)";
        targetEl.style.border = "1px solid var(--accent-2)";
        targetEl.style.fontWeight = "bold";
        targetEl.style.fontSize = "0.9em";
        targetEl.style.color = "var(--accent-2)";
        targetEl.textContent = step.to;
        flowContainer.appendChild(targetEl);
      }
    });

    card.appendChild(flowContainer);

    // 每步和弦的音符展示
    const notesRow = document.createElement("div");
    notesRow.style.display = "flex";
    notesRow.style.flexWrap = "wrap";
    notesRow.style.gap = "10px";
    notesRow.style.marginTop = "14px";

    pathData.chords.forEach((chordName) => {
      try {
        const info = brain.converter._ensureNotesAndRoot(chordName);
        if (info && info.length >= 3) {
          const block = document.createElement("div");
          block.style.textAlign = "center";
          block.style.padding = "6px 8px";
          block.style.borderRadius = "6px";
          block.style.background = "rgba(255,255,255,0.03)";
          block.style.minWidth = "60px";

          const nameDiv = document.createElement("div");
          nameDiv.style.fontWeight = "bold";
          nameDiv.style.fontSize = "0.75em";
          nameDiv.style.marginBottom = "4px";
          nameDiv.style.color = "var(--muted)";
          nameDiv.textContent = chordName;
          block.appendChild(nameDiv);

          const noteRow = document.createElement("div");
          noteRow.style.display = "flex";
          noteRow.style.gap = "3px";
          noteRow.style.justifyContent = "center";
          info.slice(0, 4).forEach((n) => {
            const nc = document.createElement("span");
            nc.style.padding = "1px 5px";
            nc.style.borderRadius = "3px";
            nc.style.background = "rgba(255,255,255,0.1)";
            nc.style.fontSize = "0.72em";
            nc.textContent = n;
            noteRow.appendChild(nc);
          });
          block.appendChild(noteRow);

          // 箭头分隔（最后一个不显示）
          if (chordName !== pathData.chords[pathData.chords.length - 1]) {
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "center";
            wrapper.style.gap = "6px";
            wrapper.appendChild(block);

            const sep = document.createElement("span");
            sep.style.color = "var(--accent)";
            sep.style.fontSize = "0.9em";
            sep.textContent = "→";
            wrapper.appendChild(sep);

            notesRow.appendChild(wrapper);
          } else {
            notesRow.appendChild(block);
          }
        }
      } catch (e) { }
    });

    card.appendChild(notesRow);
    container.appendChild(card);
  }

  // 绑定新里曼运行按钮
  document.getElementById("neo-run").addEventListener("click", () => {
    const target = document.getElementById("panel-neo-body");
    const val = document.getElementById("neo-input").value;
    updateNeo(target, val);
  });

  // 路径查找按钮事件
  const neoPathRunBtn = document.getElementById("neo-path-run");
  if (neoPathRunBtn) {
    neoPathRunBtn.addEventListener("click", () => {
      const target = document.getElementById("panel-neo-body");
      const fromChord = document.getElementById("neo-path-from").value.trim();
      const toChord = document.getElementById("neo-path-to").value.trim();
      const maxSteps = parseInt(document.getElementById("neo-max-steps").value) || 8;

      if (!fromChord || !toChord) {
        target.innerHTML = `<div class="small-muted">${window.__("cannot_parse_input")}</div>`;
        return;
      }

      updateNeoPath(target, fromChord, toChord, maxSteps);
    });

    // 支持回车触发
    document.getElementById("neo-path-to").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        neoPathRunBtn.click();
      }
    });
  }

  // Bind run buttons and inputs per-panel
  document.getElementById("chord-run").addEventListener("click", () => {
    const target = document.getElementById("panel-chord-body");
    const val = document.getElementById("chord-input").value;
    prettyChordRender(target, val);
  });
  document.getElementById("blues-run").addEventListener("click", () => {
    const target = document.getElementById("panel-blues-body");
    const val = document.getElementById("blues-input").value;
    updateBlues(target, val);
  });
  document.getElementById("lcc-run").addEventListener("click", () => {
    const target = document.getElementById("panel-lcc-body");
    const val = document.getElementById("lcc-input").value;
    updateLCC(target, val);
  });
  document.getElementById("cst-run").addEventListener("click", () => {
    const target = document.getElementById("panel-cst-body");
    const val = document.getElementById("cst-input").value;
    updateCST(target, val);
  });
  // add/remove behavior for key center chord inputs
  document
    .getElementById("add-keycenter-chord")
    .addEventListener("click", () => {
      const container = document.getElementById("keycenter-inputs");
      const entry = createKeyCenterEntry("");
      container.insertBefore(
        entry,
        document.getElementById("add-keycenter-chord"),
      );
    });

  document.getElementById("other-run").addEventListener("click", () => {
    const target = document.getElementById("panel-other-body");
    let val;
    if (
      currentOtherMode === "key_center" ||
      currentOtherMode === "progression" ||
      currentOtherMode === "guide"
    ) {
      // 这三种模式都从“可增删”列表收集和弦
      val = getKeyCenterValue();
    } else {
      val = document.getElementById("other-input").value;
    }
    processOther(target, val);
  });

  // 和弦衔接推荐面板 - 按钮事件绑定
  const recRunBtn = document.getElementById("rec-run");
  const recInput = document.getElementById("rec-input");
  const recPanelBody = document.getElementById("panel-rec-body");

  if (recRunBtn && recInput && recPanelBody) {
    recRunBtn.addEventListener("click", () => {
      const inputVal = recInput.value.trim();
      updateRec(recPanelBody, inputVal);
    });

    // 支持回车触发
    recInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        recRunBtn.click();
      }
    });
  }

  // 初始化默认显示第一个面板（保持原有逻辑）
  const defaultFeature =
    navButtons.length > 0 ? navButtons[0].dataset.feature : "chord";
  showOnlyFeature(defaultFeature);

  showOnlyFeature("chord");
});
