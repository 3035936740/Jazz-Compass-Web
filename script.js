import { midiName } from './classical_voicing.js';
import { initAppShell } from "./app_shell.js?v=20261004-r26";
import { noteToFrequency, noteToSemitoneValue, semitoneToFreq, semitoneToMidi, resolveRootOctave, chordNotesToFrequencies } from "./note_frequency.js?v=20261002-split";
import { getAudioContext, interruptPlayback, interruptIfActive, connectOutput, suppressQueued, playChord, createHeldPianoVoice, createPianoTone, createSimpleTone } from "./audio_engine.js?v=20261003-a3";
import { parsePitch } from "./pitch_spelling.js";
import { mountSubPages } from "./sub_pages.js?v=20261003-u2";
import { FEATURE_UNIT } from "./learn_feature_unit.js?v=20261003-f1";
import { mountSiteSearch } from "./site_search.js?v=20261003-s4";
import { satbToVoices, sendToStaff } from "./staff_handoff.js?v=20261003-h1";
import { loadResume, clearResume } from "./learn_engine.js?v=20261004-s4";
import { EnhancedChordConverter, JazzBrain, ClassicalHarmonyConnector } from "./jazz_compass.js?v=20261002-no";
import * as lang from "./lang.js?v=20261004-r44";
import { drawClassicalStaff } from "./classical_staff.js?v=20261004-a2";
import { renderChordConversion } from "./chord_convert_panel.js?v=20261003-v3";

/**
 * 按需载入：各个工具面板的代码第一次用到时才下载（手机上首屏只下载必要的代码，打开快很多）。
 * 返回的函数和原来的 mount 函数用法一样，只是返回一个 Promise：模块载入、mount 执行完以后才 resolve。
 */
function lazy(load, name, { hostOf = null } = {}) {
  let pending = null;
  let loaded = false;
  return (...args) => {
    // 第一个参数是面板容器（或 hostOf 指定容器）时：下载超过 150 毫秒就在里面显示"正在加载"，免得以为卡住了
    const host = hostOf ? hostOf() : args[0]?.nodeType === 1 ? args[0] : null;
    let note = null;
    const timer = !loaded && host ? setTimeout(() => { note = loadingNote(); host.appendChild(note); }, 150) : null;
    pending ||= load().then((m) => { loaded = true; return m; });
    return pending
      .then((m) => { clearTimeout(timer); note?.remove(); return m[name](...args); })
      .catch((error) => { clearTimeout(timer); note?.remove(); pending = null; console.error(error); });
  };
}
/** 面板里的加载提示（五根跳动的竖条 + 文字） */
function loadingNote() {
  const box = document.createElement('div');
  box.className = 'panel-loading';
  box.setAttribute('role', 'status');
  box.innerHTML = '<div class="eq-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>';
  const text = document.createElement('span');
  text.textContent = window.__?.('ui_loading') || 'Loading…';
  box.appendChild(text);
  return box;
}
const load_composition_ui = () => import("./composition_ui.js?v=20261003-c4");
const mountComposition = lazy(load_composition_ui, 'mountComposition');
const mountRhythm = lazy(load_composition_ui, 'mountRhythm');
const load_microtonal_ui = () => import("./microtonal_ui.js?v=20261004-m1");
const mountMicrotonal = lazy(load_microtonal_ui, 'mountMicrotonal');
const load_chinese_modes_ui = () => import("./chinese_modes_ui.js?v=20261002-tour");
const mountChineseModes = lazy(load_chinese_modes_ui, 'mountChineseModes');
const load_counterpoint_ui = () => import("./counterpoint_ui.js?v=20261004-w1");
const mountCounterpoint = lazy(load_counterpoint_ui, 'mountCounterpoint');
const load_nonchord_ui = () => import("./nonchord_ui.js?v=20261002-quest");
const mountNonChordTones = lazy(load_nonchord_ui, 'mountNonChordTones');
const load_harmonize_ui = () => import("./harmonize_ui.js?v=20261002-quest");
const mountHarmonizer = lazy(load_harmonize_ui, 'mountHarmonizer');
const load_figured_bass_ui = () => import("./figured_bass_ui.js?v=20261002-quest");
const mountFiguredBass = lazy(load_figured_bass_ui, 'mountFiguredBass');
const load_jazz_more_ui = () => import("./jazz_more_ui.js?v=20261002-quest");
const mountJazzMore = lazy(load_jazz_more_ui, 'mountJazzMore');
const load_post_tonal_ui = () => import("./post_tonal_ui.js?v=20261002-quest");
const mountPostTonal = lazy(load_post_tonal_ui, 'mountPostTonal');
const load_temperaments_ui = () => import("./temperaments_ui.js?v=20261002-quest");
const mountTemperaments = lazy(load_temperaments_ui, 'mountTemperaments');
const load_world_modes_ui = () => import("./world_modes_ui.js?v=20261002-quest");
const mountWorldModes = lazy(load_world_modes_ui, 'mountWorldModes');
const load_instruments_ui = () => import("./instruments_ui.js?v=20261002-quest");
const mountInstruments = lazy(load_instruments_ui, 'mountInstruments');
const load_fretboard_ui = () => import("./fretboard_ui.js?v=20261002-quest");
const mountFretboard = lazy(load_fretboard_ui, 'mountFretboard');
const load_progression_ui = () => import("./progression_ui.js?v=20261003-p5");
const mountProgression = lazy(load_progression_ui, 'mountProgression');
const load_motif_phrase_ui = () => import("./motif_phrase_ui.js?v=20261003-t3");
const mountMotifPhrase = lazy(load_motif_phrase_ui, 'mountMotifPhrase');
const load_poly_meter_ui = () => import("./poly_meter_ui.js?v=20261004-w5");
const mountPolyMeter = lazy(load_poly_meter_ui, 'mountPolyMeter');
const load_canon_ui = () => import("./canon_ui.js?v=20261003-t3");
const mountCanon = lazy(load_canon_ui, 'mountCanon');
const load_dictation_ui = () => import("./dictation_ui.js?v=20261003-t4");
const mountDictation = lazy(load_dictation_ui, 'mountDictation');
const load_prog_quiz_ui = () => import("./prog_quiz_ui.js?v=20261003-q1");
const mountProgQuiz = lazy(load_prog_quiz_ui, 'mountProgQuiz');
const load_reharm_ui = () => import("./reharm_ui.js?v=20261003-t3");
const mountReharm = lazy(load_reharm_ui, 'mountReharm');
const load_ear_training_ui = () => import("./ear_training_ui.js?v=20261002-quest");
const mountEarTraining = lazy(load_ear_training_ui, 'mountEarTraining');
const load_chord_symbols_ui = () => import("./chord_symbols_ui.js?v=20261003-r32");
const mountChordSymbols = lazy(load_chord_symbols_ui, 'mountChordSymbols');
const load_staff_reading_ui = () => import("./staff_reading_ui.js?v=20261004-w5");
const mountStaffReading = lazy(load_staff_reading_ui, 'mountStaffReading');
const load_learn_ui = () => import("./learn_ui.js?v=20261004-w5");
const mountLearn = lazy(load_learn_ui, 'mountLearn');
const load_lcc_ui = () => import("./lcc_ui.js?v=20261002-i18n");
const mountLccExplorer = lazy(load_lcc_ui, 'mountLccExplorer');
const load_jazz_toolbox_ui = () => import("./jazz_toolbox_ui.js?v=20261002-i18n");
const mountJazzToolbox = lazy(load_jazz_toolbox_ui, 'mountJazzToolbox');
const load_blues_ui = () => import("./blues_ui.js?v=20261002-i18n");
const mountBluesToolbox = lazy(load_blues_ui, 'mountBluesToolbox');
const load_about_page = () => import("./about_page.js?v=20261004-w5");
const showAbout = lazy(load_about_page, 'showAbout', { hostOf: () => document.getElementById('panel-about-body') });
const load_neo_panel = () => import("./neo_panel.js?v=20261003-n1");
const initNeoPanel = lazy(load_neo_panel, 'initNeoPanel');
const load_circle_panel = () => import("./circle_panel.js?v=20261003-c5");
const createCirclePanel = lazy(load_circle_panel, 'createCirclePanel');

// Canvas colours come from the CSS theme tokens so drawings follow light/dark.
function canvasPalette() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
  return {
    disc: token("--canvas-disc", "rgba(0,0,0,0.04)"),
    line: token("--canvas-line", "rgba(0,0,0,0.15)"),
    fill: token("--canvas-fill", "rgba(0,0,0,0.06)"),
    fillSoft: token("--canvas-fill-soft", "rgba(0,0,0,0.03)"),
    text: token("--canvas-text", "#151a2d"),
    textSoft: token("--canvas-text-soft", "rgba(0,0,0,0.74)"),
    textDim: token("--canvas-text-dim", "rgba(0,0,0,0.46)"),
    accent: token("--theme-accent", "#2b45c4"),
    brass: token("--brass", "#9c650d"),
    font: token("--font-ui", "sans-serif"),
    display: token("--font-display", "sans-serif"),
  };
}

// 在 script.js 顶部（DOMContentLoaded 之外或内部）添加
let modesData = null;
let funcGroupData = null;

function loadJsonFiles() {
  return Promise.all([
    fetch('modes.json').then(res => res.json()).catch(err => { console.warn('modes.json load failed', err); return []; }),
    fetch('funcGroup.json').then(res => res.json()).catch(err => { console.warn('funcGroup.json load failed', err); return {}; })
  ]).then(([modes, funcGroup]) => {
    modesData = modes;
    funcGroupData = funcGroup;
    console.log('Loaded modes:', modesData?.length);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // modes.json（约 240 KB）只给五度圈的多调式模式用：第一次打开五度圈时和面板代码一起载入（见 createCirclePanelNow）


  let circle = null; // 五度圈面板（circle_panel.js），初始化后才有


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
    // 按音级拼写的 Cb、E#、Fb、B#、重升重降等
    const parsed = parsePitch(`${normalized}4`);
    if (parsed) return parsed.pc;
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
  let notationMode = localStorage.getItem("jazz-compass-notation") || "flats";
  const flatNoteNames = [
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
  const sharpNoteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const allNotes = flatNoteNames;
  const noteToIdx = Object.fromEntries(allNotes.map((n, i) => [n, i]));
  let idxToNote = [...flatNoteNames];

  function applyNotationToConverters() {
    idxToNote = [...(notationMode === "sharps" ? sharpNoteNames : flatNoteNames)];
    [
      typeof conv !== "undefined" ? conv : null,
      typeof brain !== "undefined" ? brain?.converter : null,
      typeof classical !== "undefined" ? classical?.converter : null,
      circle?.multiModeConverter(),
    ]
      .filter(Boolean)
      .forEach((converter) => {
        if (converter.idxToNote) converter.idxToNote.splice(0, converter.idxToNote.length, ...idxToNote);
      });
  }

  function rerenderActivePanel() {
    const active = document.querySelector(".feature-btn.active")?.dataset.feature;
  const runMap = { chord: "chord-run", classical: "classical-run", blues: "blues-run", lcc: "lcc-run", cst: "cst-run", other: "other-run", neo: "neo-run" };
    const button = runMap[active] && document.getElementById(runMap[active]);
    if (button) button.click();
    if (active === "circle") circle?.redraw();
    if (active === "ref") initRefPanel();
  }

  function setNotation(mode) {
    notationMode = mode === "sharps" ? "sharps" : "flats";
    localStorage.setItem("jazz-compass-notation", notationMode);
    applyNotationToConverters();
    document.querySelectorAll(".notation-btn").forEach((button) => {
      const active = button.dataset.notation === notationMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    rerenderActivePanel();
  }

  function setTheme(mode) {
    const theme = mode === "light" ? "light" : "dark";
    const changed = document.documentElement.dataset.theme !== theme;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("jazz-compass-theme", theme);
    document.querySelectorAll(".theme-btn").forEach((button) => {
      const active = button.dataset.themeValue === theme;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (changed) requestAnimationFrame(rerenderActivePanel);
  }



  const navButtons = Array.from(document.querySelectorAll(".feature-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  let compositionTimer = null;
  let compositionMarks = [];
  const compositionAudio = {
    stop() {
      const wasPlaying = compositionTimer !== null || compositionMarks.length > 0;
      clearInterval(compositionTimer); compositionTimer = null;
      compositionMarks.forEach(clearTimeout); compositionMarks = [];
      if (wasPlaying) interruptIfActive();
    },
    play(events, bpm, duration, highlight) {
      this.stop(); stopClassicalSequencePlayback();
      const ctx = getAudioContext();
      interruptPlayback(ctx);
      ctx.resume();
      const start = ctx.currentTime + .08, seconds = 60 / bpm;
      const sorted = [...events].sort((a,b) => a.beat-b.beat);
      let index = 0, lastMarker = -1;
      const schedule = () => {
        while (index < sorted.length && start + sorted[index].beat * seconds < ctx.currentTime + .15) {
          const event = sorted[index++], time = start + event.beat * seconds;
          const tone = createPianoTone(ctx, 440 * 2 ** ((event.midi-69)/12), time, event.duration * seconds);
          const gain = ctx.createGain(); gain.gain.value = event.velocity;
          tone.connect(gain); connectOutput(gain);
          const marker = event.bar ?? event.step;
          if (marker !== lastMarker) {
            lastMarker = marker;
            compositionMarks.push(setTimeout(() => highlight(event), Math.max(0,(time-ctx.currentTime)*1000)));
          }
        }
        if (ctx.currentTime > start + duration * seconds + .2) { clearInterval(compositionTimer); compositionTimer = null; }
      };
      schedule(); compositionTimer = setInterval(schedule,25);
    }
  };

  /** 全局停止：结束各模块的排程与正在发声的音 */
  function stopAllPlayback() {
    compositionAudio.stop();
    stopClassicalSequencePlayback();
    document.getElementById('panel-blues-body')?.stopBluesPlayback?.();
    document.querySelectorAll('.panel, .panel-body').forEach((node) => node.dispatchEvent(new Event('toolbox-stop')));
    interruptIfActive();
    suppressQueued();
  }


  initAppShell({ stopAllPlayback, navButtons, noteName: (pc) => idxToNote[pc], reverseFormulas: () => conv.reverseFormulas });
  // 全站搜索（Ctrl+K）：工具与乐理闯关的关卡
  mountSiteSearch({
    tools: () => navButtons.map((b) => b.dataset.feature).filter((id) => id !== 'about').map((id) => ({
      id, name: window.__(`nav_${id}`) || id, intro: window.__(`intro_${id}`) || '',
      allNames: Object.values(window.__all?.(`nav_${id}`) || {}).join(' '),
    })),
    units: () => import("./learn_content.js?v=20261004-w3").then((m) => [...m.UNITS, ...m.SIDES]), lang: window.__lang, anchor: document.getElementById('share-link'),
  });

  const conv = new EnhancedChordConverter();
  const brain = new JazzBrain();
  const classical = new ClassicalHarmonyConnector();
  // ===================== 五度圈面板（circle_panel.js，第一次打开五度圈时才载入） =====================
  const createCirclePanelNow = () => { const json = loadJsonFiles(); return createCirclePanel({
    canvas, tableContainer, resetBtn, conv, resizeCanvas, canvasPalette, noteToSemitone, semitoneToNote, noteToIdx, circleData,
    majorScaleIntervals, minorScaleIntervals, harmonicMajorIntervals, harmonicMinorIntervals,
    majorChordTypes, minorChordTypes, harmonicMajorChordTypes, harmonicMinorChordTypes,
    majorDegreeNums, minorDegreeNums, harmonicMajorDegreeNums, harmonicMinorDegreeNums,
    live: {
      get notationMode() { return notationMode; },
      get idxToNote() { return idxToNote; },
      get modesData() { return modesData; },
      get funcGroupData() { return funcGroupData; },
    },
  }).then((panel) => {
    circle = panel;
    // 多调式五度圈要等 modes.json：和面板代码同时下载，到了再初始化
    return json.then(() => circle.initMultiModeCircle());
  }); };
  let classicalChain = [];
  let classicalSegments = [];
  let classicalLastKey = null;
  let classicalLastMode = null;
  let classicalActiveView = "recommendations";
  let classicalPendingChain = null;
  let classicalSequencePlaybackId = 0;
  let classicalSequenceTimers = [];
  const CLASSICAL_PLAYBACK_STORAGE_KEY = "jazz-compass-classical-playback";
  const DEFAULT_CLASSICAL_PLAYBACK = { bpm: 80, meter: "4/4", mode: "block" };

  function stopClassicalSequencePlayback() {
    const wasPlaying = classicalSequenceTimers.length > 0;
    classicalSequencePlaybackId += 1;
    classicalSequenceTimers.forEach(timer => clearTimeout(timer));
    classicalSequenceTimers = [];
    if (wasPlaying) interruptIfActive();
  }

  function loadClassicalPlaybackSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(CLASSICAL_PLAYBACK_STORAGE_KEY) || "{}");
      return {
        bpm: Math.max(40, Math.min(640, Math.round(Number(saved.bpm) || DEFAULT_CLASSICAL_PLAYBACK.bpm))),
        meter: ["4/4", "3/4", "6/8", "8/8", "12/16", "16/16"].includes(saved.meter) ? saved.meter : DEFAULT_CLASSICAL_PLAYBACK.meter,
        mode: ["block", "arpeggio"].includes(saved.mode) ? saved.mode : DEFAULT_CLASSICAL_PLAYBACK.mode,
      };
    } catch (_) {
      return { ...DEFAULT_CLASSICAL_PLAYBACK };
    }
  }

  function saveClassicalPlaybackSettings(settings) {
    localStorage.setItem(CLASSICAL_PLAYBACK_STORAGE_KEY, JSON.stringify(settings));
  }
  document.querySelectorAll(".theme-btn").forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.themeValue));
  });
  setTheme(document.documentElement.dataset.theme || "light");
  document.querySelectorAll(".notation-btn").forEach((button) => {
    button.addEventListener("click", () => setNotation(button.dataset.notation));
  });
  applyNotationToConverters();
  document.querySelectorAll(".notation-btn").forEach((button) => {
    const active = button.dataset.notation === notationMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  // state for "other" panel mode
  let currentOtherMode = "report";

  // 本地化负和声轴标签
  const axisLabelEl = document.getElementById("label_other_axis");
  if (axisLabelEl && window.__) {
    axisLabelEl.textContent = window.__("neg_axis") || "Axis";
  }

  /** "看不懂？玩教程"要打开的关卡；"其他工具"按当前模式区分（进行分析、和弦报告直接进对应的进阶关） */
  const OTHER_MODE_UNIT = { key_center: 'keycenter', progression: 'keycenter:2', negative: 'negharmony', guide: 'guidetone', report: 'guidetone:3' };
  /** 面板第一次挂载时，把链接里的 ?q= 交给它（如 #counterpoint?q=@sub:canon） */
  /** 面板第一次打开时挂载一次：异步载入期间不会重复挂载；返回挂载完成的 Promise */
  const mounting = new WeakMap();
  function mountOnce(host, run) {
    if (!host) return Promise.resolve();
    if (mounting.has(host)) return mounting.get(host);
    if (host.children.length) return Promise.resolve();
    const done = Promise.resolve(run());
    mounting.set(host, done);
    return done;
  }
  /** 等面板挂载完（没在挂载的话立刻） */
  const whenMounted = (host) => (host && mounting.get(host)) || Promise.resolve();
  const isFirstMount = (host) => Boolean(host) && !mounting.has(host) && !host.children.length;
  // 打开面板时地址栏里的链接参数：showOnlyFeature 一开始就记下来（随后 rememberFeature 会把地址栏改成不带参数的形式）
  let hashAtShow = { feature: null, q: null };
  let initialHashForShow = null; // 初始化时先点了 chord-run，地址栏已被改写：第一次 showOnlyFeature 用一开始读到的链接参数
  function dispatchInitialQuery(feature, hostId) {
    const { feature: hashFeature, q } = hashAtShow;
    const host = document.getElementById(hostId);
    if (hashFeature === feature && q) whenMounted(host).then(() => host?.dispatchEvent(new CustomEvent('toolbox-query', { detail: q })));
  }
  function tutorialUnitFor(feature) {
    if (feature === 'other') return OTHER_MODE_UNIT[currentOtherMode] || FEATURE_UNIT.other;
    return FEATURE_UNIT[feature];
  }

  function showOnlyFeature(feature) {
    hashAtShow = initialHashForShow || parseLocationHash();
    initialHashForShow = null;
    if (feature !== 'blues') document.getElementById('panel-blues-body')?.stopBluesPlayback?.();
    if (feature !== 'classical') stopClassicalSequencePlayback();
    document.querySelectorAll('#panel-form, #panel-rhythm').forEach(panel => { if (panel.dataset.feature !== feature) panel.dispatchEvent(new Event('toolbox-stop')); });
    ['chinese', 'counterpoint', 'nonchord', 'harmonize', 'figured', 'jazzmore', 'posttonal', 'temperaments', 'world', 'instruments', 'fretboard', 'progression', 'ear', 'chordsymbols', 'staff', 'learn'].forEach((id) => { if (feature !== id) document.getElementById(`panel-${id}-body`)?.dispatchEvent(new Event('toolbox-stop')); });
    if (isFeature(feature)) rememberFeature(feature);
    const featureButton = navButtons.find(button => button.dataset.feature === feature);
    const groupLabel = featureButton?.closest('.nav-group')?.querySelector('.nav-group-label');
    document.getElementById('workspace-index').textContent = groupLabel?.textContent.trim() || '';
    document.getElementById('workspace-title').textContent = window.__(`nav_${feature}`);
    document.getElementById('workspace-description').textContent = window.__(`intro_${feature}`);
    navButtons.forEach((b) => {
      const active = b.dataset.feature === feature;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", String(active));
      b.setAttribute("tabindex", active ? "0" : "-1");
    });
    panels.forEach((p) => {
      const f = p.dataset.feature;
      if (f === feature) {
        p.classList.add("active");
        p.style.display = "block";
        p.setAttribute("aria-hidden", "false");
      } else {
        p.classList.remove("active");
        p.style.display = "none";
        p.setAttribute("aria-hidden", "true");
      }
    });
    // 只在导航条自己里面横向滚动，把选中的按钮移到中间；不用 scrollIntoView，以免整页被横向带偏
    const activeNavButton = document.querySelector(`.feature-btn[data-feature="${feature}"]`);
    const featureNav = activeNavButton?.closest(".feature-nav");
    if (activeNavButton && featureNav && featureNav.scrollWidth > featureNav.clientWidth + 1) {
      const navBox = featureNav.getBoundingClientRect();
      const buttonBox = activeNavButton.getBoundingClientRect();
      const target = featureNav.scrollLeft + (buttonBox.left - navBox.left) - (featureNav.clientWidth - buttonBox.width) / 2;
      featureNav.scrollTo?.({ left: Math.max(0, target), behavior: "smooth" });
    }
    // special handling for about panel
    if (feature === "about") {
      showAbout();
    }
    if (feature === "circle") {
      circle?.drawCircle(null, null);
    }
    if (feature === "ref") {
      initRefPanel();
    }
    if (feature === "classical" && !document.getElementById("panel-classical-body")?.children.length) {
      document.getElementById("classical-run")?.click();
    }
    if (feature === 'neo' && !neoReady) {
      neoReady = initNeoPanel({ brain }).then(() => { if (!document.getElementById('panel-neo-body')?.children.length) document.getElementById('neo-run')?.click(); });
    }
    if (feature === 'circle' && !circleReady) circleReady = createCirclePanelNow();
    if (feature === 'micro' && !microReady) microReady = mountMicrotonal(playChord, createHeldPianoVoice);
    // 和弦音阶、LCC、布鲁斯：第一次打开时才计算（它们的代码也是这时才下载）
    if (['cst', 'lcc', 'blues'].includes(feature) && !ranOnShow.has(feature)) { ranOnShow.add(feature); document.getElementById(`${feature}-run`)?.click(); }
    if (feature === 'form' && isFirstMount(document.getElementById('panel-form'))) {
      // 两个子页面：曲式生成 / 动机与乐句（曲式面板本身没有内边距，新工具的子页面自己加）
      mountSubPages(document.getElementById('panel-form'), [
        { id: 'compose', label: { zh: '曲式生成', ja: '楽式の生成', en: 'Form generator' }, mount: (box) => mountComposition(box, compositionAudio), accepts: (q) => q === '@import' },
        { id: 'motif', label: { zh: '动机与乐句', ja: '動機とフレーズ', en: 'Motif & phrase' }, padded: true, mount: (box) => mountMotifPhrase(box, compositionAudio) },
      ], { padded: true });
      dispatchInitialQuery('form', 'panel-form');
    }
    if (feature === 'rhythm' && isFirstMount(document.getElementById('panel-rhythm'))) {
      mountSubPages(document.getElementById('panel-rhythm'), [
        { id: 'patterns', label: { zh: '节奏型', ja: 'リズム・パターン', en: 'Rhythm patterns' }, mount: (box) => mountRhythm(box, compositionAudio) },
        { id: 'poly', label: { zh: '复节奏与节拍调制', ja: 'ポリリズムとメトリック・モジュレーション', en: 'Polyrhythm & metric modulation' }, padded: true, mount: (box) => mountPolyMeter(box, compositionAudio), accepts: (q) => /^@lab:poly-/.test(q) },
      ], { padded: true });
      dispatchInitialQuery('rhythm', 'panel-rhythm');
    }
    if (feature === 'chinese') { const el = document.getElementById('panel-chinese-body'); mountOnce(el, () => mountChineseModes(el, { playChord })); }
    if (feature === 'counterpoint' && isFirstMount(document.getElementById('panel-counterpoint-body'))) {
      mountSubPages(document.getElementById('panel-counterpoint-body'), [
        { id: 'species', label: { zh: '类别对位', ja: '類別対位法', en: 'Species counterpoint' }, mount: (box) => mountCounterpoint(box, { playChord }) },
        { id: 'canon', label: { zh: '模仿与卡农', ja: '模倣とカノン', en: 'Imitation & canon' }, mount: (box) => mountCanon(box, compositionAudio) },
      ]);
      dispatchInitialQuery('counterpoint', 'panel-counterpoint-body');
    }
    if (feature === 'nonchord') { const el = document.getElementById('panel-nonchord-body'); mountOnce(el, () => mountNonChordTones(el, { playChord, conv })); }
    if (feature === 'harmonize' && isFirstMount(document.getElementById('panel-harmonize-body'))) {
      mountSubPages(document.getElementById('panel-harmonize-body'), [
        { id: 'harmonize', label: { zh: '旋律配和声', ja: '旋律の和声付け', en: 'Harmonize a melody' }, mount: (box) => mountHarmonizer(box, { playChord }) },
        { id: 'reharm', label: { zh: '固定旋律再和声', ja: '固定旋律のリハーモナイズ', en: 'Reharmonization' }, mount: (box) => mountReharm(box, compositionAudio) },
      ]);
      dispatchInitialQuery('harmonize', 'panel-harmonize-body');
    }
    if (feature === 'figured') { const el = document.getElementById('panel-figured-body'); mountOnce(el, () => mountFiguredBass(el, { playChord })); }
    if (feature === 'jazzmore') { const el = document.getElementById('panel-jazzmore-body'); mountOnce(el, () => mountJazzMore(el, { playChord })); }
    if (feature === 'posttonal') { const el = document.getElementById('panel-posttonal-body'); mountOnce(el, () => mountPostTonal(el, { playChord })); }
    if (feature === 'temperaments') { const el = document.getElementById('panel-temperaments-body'); mountOnce(el, () => mountTemperaments(el, { playChord })); }
    if (feature === 'world') { const el = document.getElementById('panel-world-body'); mountOnce(el, () => mountWorldModes(el, { playChord })); }
    if (feature === 'instruments') { const el = document.getElementById('panel-instruments-body'); mountOnce(el, () => mountInstruments(el, { playChord })); }
    if (feature === 'fretboard') { const el = document.getElementById('panel-fretboard-body'); mountOnce(el, () => mountFretboard(el, { playChord })); }
    if (feature === 'progression' && isFirstMount(document.getElementById('panel-progression-body'))) {
      const el = document.getElementById('panel-progression-body');
      mountOnce(el, () => mountProgression(el, { playChord, conv }));
      dispatchInitialQuery('progression', 'panel-progression-body');
    }
    if (feature === 'ear' && isFirstMount(document.getElementById('panel-ear-body'))) {
      mountSubPages(document.getElementById('panel-ear-body'), [
        { id: 'ear', label: { zh: '听辨练习', ja: '聴き取り練習', en: 'Ear training' }, mount: (box) => mountEarTraining(box, { playChord }) },
        { id: 'dictation', label: { zh: '听写', ja: '聴音（書き取り）', en: 'Dictation' }, mount: (box) => mountDictation(box, compositionAudio) },
        { id: 'schema', label: { zh: '套路听辨', ja: '定番進行の聴き取り', en: 'Progression ID' }, mount: (box) => mountProgQuiz(box, compositionAudio) },
      ]);
      dispatchInitialQuery('ear', 'panel-ear-body');
    }
    if (feature === 'chordsymbols') { const el = document.getElementById('panel-chordsymbols-body'); mountOnce(el, () => mountChordSymbols(el, { playChord, conv })); }
    if (feature === 'staff' && isFirstMount(document.getElementById('panel-staff-body'))) {
      const el = document.getElementById('panel-staff-body');
      mountOnce(el, () => mountStaffReading(el, { playChord }));
      dispatchInitialQuery('staff', 'panel-staff-body');
    }
    if (feature === 'learn') { const el = document.getElementById('panel-learn-body'); mountOnce(el, () => mountLearn(el, { playChord })); }
    // 每个工具顶部的"看不懂？玩教程"：跳到对应的闯关关卡
    const tutorialButton = document.getElementById('tutorial-link');
    if (tutorialButton) {
      const unit = tutorialUnitFor(feature);
      tutorialButton.hidden = !unit;
      tutorialButton.dataset.unit = unit || '';
    }
    currentLearnFeature = feature;
    updateReturnTutorial();
  }

  // "回到教程"：有没做完的关卡（学习记录）时显示（在乐理闯关页面里不显示）；通关或退出关卡后记录清除，按钮随之消失
  var currentLearnFeature = null;
  function updateReturnTutorial() {
    const button = document.getElementById('return-tutorial');
    if (!button) return;
    const record = anyResume();
    button.hidden = !record || currentLearnFeature === 'learn';
    if (record) button.title = window.__f('return_tutorial_title', { title: record.title, n: (record.position ?? 0) + 1, m: record.total ?? '?' });
    // Side-B 有没做完的关卡（包括去工具里做实操的时候）：显示"回到 Side-B"
    const sideb = document.getElementById('return-sideb');
    if (sideb) {
      const b = sidebResume();
      sideb.hidden = !b || currentLearnFeature === 'learn';
      if (b) {
        const pick = (v) => (typeof v === 'string' ? v : v?.[window.__lang] ?? v?.en ?? '');
        sideb.title = window.__f('return_sideb_title', { code: b.levelId, title: pick(b.title), part: pick(b.part) });
      }
    }
  }
  /** Side-B 的学习记录（sideb_engine 的 jc-sideb-resume；不在这里引入 Side-B 模块，保持首屏轻量） */
  function sidebResume() {
    try {
      const record = JSON.parse(globalThis.localStorage?.getItem('jc-sideb-resume') || 'null');
      return record?.levelId && record.session ? record : null;
    } catch (_) { return null; }
  }
  window.addEventListener('learn-resume-change', updateReturnTutorial);
  /** 任何没做完的关卡（含平时的自动保存）：显示"回到教程"，误点"看不懂？玩教程"时先提示 */
  function anyResume() {
    const record = loadResume();
    return record?.session && record.key ? record : null;
  }

  /** 有学习记录时误点"看不懂？玩教程"：先提示，可以回到之前的关卡、放弃并打开新教程，或取消 */
  function confirmTutorialSwitch(record, onBack, onNew) {
    document.querySelector('.learn-confirm-layer')?.remove();
    const layer = document.createElement('div');
    layer.className = 'learn-confirm-layer';
    layer.setAttribute('role', 'alertdialog');
    layer.setAttribute('aria-modal', 'true');
    const card = document.createElement('div');
    card.className = 'learn-confirm';
    const title = document.createElement('strong');
    title.textContent = window.__('learn_confirm_title');
    const body = document.createElement('p');
    body.textContent = window.__f('learn_confirm_body', { title: record.title, n: (record.position ?? 0) + 1, m: record.total ?? '?' });
    const row = document.createElement('div');
    row.className = 'learn-confirm-actions';
    const make = (key, cls, action) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = cls;
      b.textContent = window.__(key);
      b.addEventListener('click', () => { layer.remove(); action?.(); });
      return b;
    };
    const back = make('learn_confirm_back', 'learn-confirm-back', onBack);
    row.append(back, make('learn_confirm_new', 'learn-confirm-new', onNew), make('learn_confirm_cancel', 'learn-confirm-cancel', null));
    card.append(title, body, row);
    layer.appendChild(card);
    layer.addEventListener('click', (event) => { if (event.target === layer) layer.remove(); });
    layer.addEventListener('keydown', (event) => { if (event.key === 'Escape') layer.remove(); });
    document.body.appendChild(layer);
    back.focus?.();
  }

  /** 和弦转换面板的结果（chord_convert_panel.js） */
  const prettyChordRender = (targetEl, inputValue) => renderChordConversion(conv, targetEl, inputValue);

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
    mountBluesToolbox(targetEl, inputValue, { brain, conv, playChord, semitoneToFreq });
  }

  function updateCST(targetEl, inputValue) {
    mountJazzToolbox(targetEl, inputValue, { conv, playChord, semitoneToFreq });
  }

  function updateLCC(targetEl, inputValue) {
    mountLccExplorer(targetEl, inputValue, { brain, conv, playChord, semitoneToFreq });
  }

  function updateRec(targetEl, inputValue) {
    const v = inputValue.trim();
    if (!v) {
      targetEl.innerHTML = `<div class="result-card">${window.__("cannot_parse_input") || "无法解析输入 请输入有效和弦（如 C7、Am9）"}</div>`;
      return;
    }

    // 调用 JazzBrain 的和弦推荐方法
    let recommendations = [];
    try {
      recommendations = brain.getChordRecommendations(v);
    } catch (e) {
      console.error("get chord scale failure:", e);
      targetEl.innerHTML = `<div class="result-card">${window.__("parse_error") || "解析失败 "}${e.message}</div>`;
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
    const make = (tag, className, text) => {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (text !== undefined) el.textContent = text;
      return el;
    };
    const noteGrid = (notes, decorate) => {
      const grid = make("div", "note-grid");
      (notes || []).forEach((n, i) => {
        const cell = make("div", "note-cell");
        cell.appendChild(make("div", "note", n));
        decorate?.(cell, i);
        grid.appendChild(cell);
      });
      return grid;
    };
    try {
      switch (currentOtherMode) {
        case "key_center": {
          // 1. 获取输入并分析
          const arr = parseChordList(v);
          const results = brain.findKeyCenterPro(arr, true);

          if (Array.isArray(results) && results.length) {
            results.forEach(function (result) {
              const parts = result.name.split(" ");
              const root = parts[0];
              const sysName = parts.slice(1).join(" ").trim();

              let notes = [];
              try {
                notes = brain.cst.scaleNotes(root, sysName);
              } catch (e) {
                notes = [];
              }

              // 2. 卡片：调名 + 匹配分数 + 音阶
              const card = make("div", "result-card key-center-card");
              const title = make("div", "card-title");
              title.appendChild(make("span", "", result.name));
              title.appendChild(make("span", "spice-badge", `${window.__("key_center_match_score") || "Score"}: ${Math.round(result.score)}`));
              card.appendChild(title);
              card.appendChild(make("div", "small-muted", `${window.__("key_center_detected") || "Detected Key Center"}`));
              card.appendChild(noteGrid(notes));
              targetEl.appendChild(card);
            });
          } else {
            targetEl.innerHTML = `<div class="small-muted">${window.__("no_key_recommended") || "no key recommended"}</div>`;
          }
          break;
        }
        case "report": {
          const card = make("div", "result-card");

          // 1. 获取完整的分析报告数据
          const report = brain.getFullReport(v);

          card.appendChild(make("p", "small-muted", window.__("other_report") || "Chord Analysis Report"));

          if (report) {
            card.appendChild(renderReport(report));
          } else {
            card.appendChild(make("div", "small-muted", window.__("no_data_available") || "No analysis data found."));
          }
          targetEl.appendChild(card);
          break;
        }
        case "progression": {
          const prog = parseChordList(v);
          const analysis = brain.analyzeProgression(prog); // 假设返回的是字符串数组

          targetEl.innerHTML = ""; // 清空容器
          const container = make("div", "progression-stepper");

          if (Array.isArray(analysis) && analysis.length > 0) {
            analysis.forEach((step, index) => {
              // 提取 "Cmaj7 -> Fmaj7" 这种核心部分加粗
              const parts = step.split(":");
              const flow = parts[0] || "";
              const desc = parts[1] || "";

              const row = make("div", "progression-step");
              row.appendChild(make("div", "step-badge", String(index + 1)));
              row.appendChild(make("div", "step-flow", flow));
              row.appendChild(make("p", "small-muted step-desc", window.__("motion_dominant_label") || desc.trim()));
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

          const card = make("div", "result-card negative-card");

          // 头部：标题与镜像轴
          const header = make("div", "negative-head");
          header.appendChild(make("div", "small-muted", window.__("neg_harmony_title")));
          const axisLine = make("div", "negative-axis", `${window.__("neg_axis") || "Axis"}: `);
          axisLine.appendChild(make("strong", "", `${axis} / ${brain.converter.idxToNote[(brain.converter.noteToIdx[axis] + 7) % 12]}`));
          header.appendChild(axisLine);
          card.appendChild(header);

          // 镜像对比区域
          const comparison = make("div", "negative-compare");
          const createNoteColumn = (title, chordName, notes, isNegative = false) => {
            const col = make("div", `negative-col${isNegative ? " is-negative" : ""}`);
            col.appendChild(make("div", "small-muted", title));
            col.appendChild(make("div", "negative-name", chordName));
            col.appendChild(noteGrid(notes, isNegative ? cell => cell.classList.add("is-mirrored") : null));
            return col;
          };

          comparison.appendChild(createNoteColumn(window.__("neg_original") || "Original", chord, chord_keys));
          comparison.appendChild(make("div", "negative-mirror", "⇄"));
          comparison.appendChild(createNoteColumn(window.__("neg_negative") || "Negative", neg_name, neg_notes, true));

          card.appendChild(comparison);
          targetEl.appendChild(card);
          break;
        }
        case "guide": {
          const prog = parseChordList(v);
          const path = brain.getGuideTonePath(prog); // 假设返回 [[3, 7], [3, 7]...]

          targetEl.innerHTML = "";
          const container = make("div", "guide-tone-path");

          path.forEach((tones, index) => {
            const chordName = prog[index] || `Chord ${index + 1}`;
            const row = make("div", "result-card guide-row");
            row.appendChild(make("div", "guide-chord", chordName));

            // 导音对 (通常是 3音 和 7音)
            const tonesGrid = make("div", "guide-tones");
            tones.forEach((note, i) => {
              const cell = make("div", `note-cell ${i === 0 ? "is-third" : "is-seventh"}`);
              cell.appendChild(make("div", "note", note));
              cell.appendChild(make("small", "", i === 0 ? "3rd" : "7th"));
              tonesGrid.appendChild(cell);
            });
            row.appendChild(tonesGrid);
            container.appendChild(row);

            // 连接箭头 (除了最后一个)
            if (index < path.length - 1) {
              container.appendChild(make("div", "guide-link", `↓ ${window.__("voice_leading_label") || "Voice Leading"}`));
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

    const input = document.createElement("input");
    input.type = "text";
    input.className = "kc-chord";
    input.value = value;
    input.spellcheck = false;
    input.autocomplete = "off";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kc-remove-btn";
    btn.textContent = "×";
    btn.title = window.__("remove_chord") || "Remove Chord";
    btn.setAttribute("aria-label", btn.title);
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
  navButtons.forEach((button, index) => {
    button.setAttribute('role', 'tab');
    button.id = `tab-${button.dataset.feature}`;
    button.setAttribute('aria-controls', `panel-${button.dataset.feature}`);
    document.getElementById(`panel-${button.dataset.feature}`).setAttribute('aria-labelledby', button.id);
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % navButtons.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + navButtons.length) % navButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = navButtons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      navButtons[next].focus();
      navButtons[next].click();
    });
  });
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
      // "其他工具"的每个模式对应不同的教程关卡
      const tutorialButton = document.getElementById('tutorial-link');
      if (tutorialButton && currentLearnFeature === 'other') tutorialButton.dataset.unit = tutorialUnitFor('other');
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

  // ===================== 新里曼面板（neo_panel.js） =====================
  // 新里曼面板第一次打开时才载入、绑定按钮（见 showOnlyFeature）
  let neoReady = null;
  let circleReady = null;
  let microReady = null;
  const ranOnShow = new Set();
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
  function playNoteSequence(frequencies, noteDuration = 0.15) {
    try {
      const ctx = getAudioContext();
      interruptPlayback(ctx);
      const now = ctx.currentTime;
      const dur = Math.max(0.08, noteDuration);

      frequencies.forEach((freq, index) => {
        const startTime = now + index * dur;
        const tone = createSimpleTone(ctx, freq, startTime, dur * 1.1, 0.1);
        connectOutput(tone, { wet: false });
      });
    } catch (e) {
      console.warn("playNoteSequence failure:", e);
    }
  }

  function scaleNoteNamesToFreqs(noteNames) {
    let lastRootMidi = null;
    const freqs = [];
    noteNames.forEach((name) => {
      const { freqs: f, rootMidi } = chordNotesToFrequencies(
        [name],
        4,
        false,
        lastRootMidi,
      );
      if (f.length) freqs.push(f[0]);
      if (rootMidi != null) lastRootMidi = rootMidi;
    });
    return freqs;
  }

  function classicalPlaybackNotes(entry) {
    return entry?.voicing?.length ? entry.voicing : (entry?.notes || []);
  }

  const classicalMidiFreqs = entry => (entry?.midiVoicing || []).map(n => 440 * 2 ** ((n - 69) / 12));

  function buildMultiModeDegreeFreqs(rows) {
    let lastRootMidi = null;
    return rows.map((row) => {
      const names = circle.parseMultiModeNotes(row.notes);
      const { freqs, rootMidi } = chordNotesToFrequencies(
        names,
        4,
        false,
        lastRootMidi,
      );
      if (rootMidi != null) lastRootMidi = rootMidi;
      return freqs;
    });
  }

  function playMultiModeScale(noteNames) {
    if (!noteNames?.length) return;
    playNoteSequence(scaleNoteNamesToFreqs(noteNames), 0.18);
  }

  function playMultiModeFuncSequence(funcSteps) {
    if (!funcSteps?.length) return;
    try {
      const ctx = getAudioContext();
      interruptPlayback(ctx);
      const now = ctx.currentTime;
      let t = now;
      let lastRootMidi = null;
      funcSteps.forEach((step) => {
        const names = circle.parseMultiModeNotes(step.notes);
        if (!names.length) {
          t += 0.4;
          return;
        }
        const { freqs, rootMidi } = chordNotesToFrequencies(
          names,
          4,
          false,
          lastRootMidi,
          { voiceLeading: "nearest" },
        );
        if (rootMidi != null) lastRootMidi = rootMidi;
        freqs.forEach((freq, i) => {
          const noteTime = t + i * 0.012;
          const tone = createPianoTone(ctx, freq, noteTime, 0.85);
          connectOutput(tone);
        });
        t += 0.95;
      });
    } catch (e) {
      console.warn("playMultiModeFuncSequence failure:", e);
    }
  }

  function wireMultiModeDisplayAudio(displayEl, payload) {
    if (!payload || displayEl.dataset.audioWired === "1") return;
    displayEl.dataset.audioWired = "1";

    const degreeFreqs = buildMultiModeDegreeFreqs(payload.degreeRows || []);

    displayEl.addEventListener("click", (e) => {
      const target = e.target.closest("[data-multi-play]");
      if (!target) return;
      if (target.closest(".func-seq-arrow")) return;

      const kind = target.dataset.multiPlay;

      if (kind === "scale") {
        playMultiModeScale(payload.scaleNoteNames);
        return;
      }

      if (kind === "func-seq") {
        playMultiModeFuncSequence(payload.funcSteps);
        return;
      }

      if (kind === "scale-note") {
        const note = target.dataset.note;
        if (note) {
          const { freqs } = chordNotesToFrequencies([note], 4, false, null);
          playChord(freqs, 0.5);
        }
        return;
      }

      if (kind === "degree") {
        const idx = parseInt(target.dataset.degreeIndex, 10);
        if (!Number.isNaN(idx) && degreeFreqs[idx]?.length) {
          playChord(degreeFreqs[idx]);
        }
        return;
      }

      if (kind === "func-node") {
        const idx = parseInt(target.dataset.funcIndex, 10);
        const step = payload.funcSteps?.[idx];
        if (!step) return;
        const names = circle.parseMultiModeNotes(step.notes);
        if (!names.length) return;
        let lastRootMidi = null;
        if (idx > 0) {
          for (let j = 0; j < idx; j++) {
            const prev = circle.parseMultiModeNotes(payload.funcSteps[j].notes);
            if (!prev.length) continue;
            const { rootMidi } = chordNotesToFrequencies(
              prev,
              4,
              false,
              lastRootMidi,
              { voiceLeading: "nearest" },
            );
            if (rootMidi != null) lastRootMidi = rootMidi;
          }
        }
        const { freqs } = chordNotesToFrequencies(
          names,
          4,
          false,
          lastRootMidi,
          { voiceLeading: "nearest" },
        );
        playChord(freqs);
      }
    });

    displayEl.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const target = e.target.closest("[data-multi-play]");
      if (!target || target.tagName === "BUTTON") return;
      e.preventDefault();
      target.click();
    });
  }

  window.jazzCompassAudio = {
    wireDisplay: wireMultiModeDisplayAudio,
    playScale: playMultiModeScale,
    playFuncSequence: playMultiModeFuncSequence,
    chordNotesToFrequencies,
    parseMultiModeNotes: (text) => circle.parseMultiModeNotes(text),
  };

  function playScale(scaleNotes, baseOctave = 3, noteDuration = 0.15) {
    const sequence = buildScaleSequence(scaleNotes, baseOctave, true);
    playNoteSequence(
      sequence.map((s) => s.freq),
      noteDuration,
    );
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
    playScale(scaleNotes, baseOctave, noteDuration);
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

    // 家族和弦音符
    const familyChordIntervals = ms.chordFamily[scaleInfo.family] || [];
    const familyChordNotes = familyChordIntervals.map(
      (i) => conv.idxToNote[(rootIdx + i) % 12],
    );

    const section = (label) => {
      const sec = document.createElement("div");
      sec.className = "ref-section";
      const lbl = document.createElement("div");
      lbl.className = "ref-section-label";
      lbl.textContent = label;
      sec.appendChild(lbl);
      return { sec, lbl };
    };

    container.innerHTML = "";

    // ---- 标题 ----
    const header = document.createElement("h3");
    header.className = "ref-title";
    header.textContent = `${root} ${scaleInfo.scale_name[0]}`;
    container.appendChild(header);

    const subHeader = document.createElement("div");
    subHeader.className = "small-muted";
    subHeader.textContent = `${window.__("ref_family_title")}: ${scaleInfo.family}`;
    container.appendChild(subHeader);

    // ---- 音阶内音（标注避免音） ----
    const { sec: notesSec, lbl: notesLabel } = section(window.__("ref_notes") || "Scale Notes");
    const notesHeaderRow = document.createElement("div");
    notesHeaderRow.className = "ref-section-head";
    notesSec.insertBefore(notesHeaderRow, notesLabel);
    notesHeaderRow.appendChild(notesLabel);

    // 上行+下行播放按钮
    const playUpDownBtn = document.createElement("button");
    playUpDownBtn.type = "button";
    playUpDownBtn.className = "btn btn-secondary btn-sm ref-play-btn";
    playUpDownBtn.textContent = `► ${window.__("scale_play_title") || "Play"}`;
    notesHeaderRow.appendChild(playUpDownBtn);

    playUpDownBtn.addEventListener("click", () => {
      playScaleSequence(scaleNoteNames, 3, 0.15);
      playUpDownBtn.classList.add("is-flash");
      setTimeout(() => playUpDownBtn.classList.remove("is-flash"), 180);
    });

    // 音符网格
    const noteGrid = document.createElement("div");
    noteGrid.className = "note-grid";
    noteNames.forEach(({ note, val }) => {
      const cell = document.createElement("div");
      cell.className = "note-cell";
      if (avoidSet.has(val)) cell.classList.add("avoid-note");
      cell.innerHTML = `<div class="note">${note}</div>`;
      noteGrid.appendChild(cell);
    });
    notesSec.appendChild(noteGrid);

    // 避免音提示
    if (avoidIds.length > 0) {
      const avoidNote = avoidIds.map((avoidId) => noteNames[avoidId].note);
      const avoidTip = document.createElement("div");
      avoidTip.className = "small-muted";
      avoidTip.textContent = `${window.__("ref_avoid")}: ${avoidNote.join(", ")}`;
      notesSec.appendChild(avoidTip);
    }
    container.appendChild(notesSec);

    // ---- 家族和弦 ----
    const { sec: familySec } = section(window.__("ref_family_chord") || "Family Chord");
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
      const { sec } = section(window.__("ref_related_strong") || "Strongly Related");
      sec.appendChild(makeScaleList(strongRelated, root, ms));
      container.appendChild(sec);
    }

    // ---- 关联音阶 ----
    if (weakRelated.length > 0) {
      const { sec } = section(window.__("ref_related_weak") || "Related");
      sec.appendChild(makeScaleList(weakRelated, root, ms));
      container.appendChild(sec);
    }
  }

  /**
   * 从预构建的序列播放音阶
   */
  function playScaleFromSequence(sequence, noteDuration = 0.15) {
    const dur = Math.max(0.08, noteDuration);
    playNoteSequence(
      sequence.map((s) => (typeof s === "number" ? s : s.freq)),
      dur,
    );
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
    header.className = "ref-title";
    header.textContent = familyName;
    container.appendChild(header);

    // 家族和弦音（以C为根音展示）
    const notesSec = document.createElement("div");
    notesSec.className = "ref-section";
    const notesLabel = document.createElement("div");
    notesLabel.className = "ref-section-label";
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
    scalesSec.className = "ref-section";
    const scalesLabel = document.createElement("div");
    scalesLabel.className = "ref-section-label";
    scalesLabel.textContent = `${window.__("ref_same_family") || "Scales in this family"} (${scales.length})`;
    scalesSec.appendChild(scalesLabel);

    if (scales.length > 0) {
      const scaleGrid = document.createElement("div");
      scaleGrid.className = "ref-scale-list";

      scales.forEach((s) => {
        const badge = document.createElement("button");
        badge.type = "button";
        badge.className = "ref-scale-badge";
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
    container.className = "ref-scale-list";

    scales.forEach((s) => {
      const card = document.createElement("div");
      card.className = "ref-scale-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.addEventListener("click", () => jumpToScale(root, s.id));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); jumpToScale(root, s.id); }
      });

      // 计算此关联音阶的首个避免音（如果有）
      const avoidIds = s.avoid_intervals_ids || [];
      const intervals = s.intervals || [];

      // 顶部音阶名
      const nameEl = document.createElement("div");
      nameEl.className = "ref-scale-card-name";
      nameEl.textContent = s.scale_name[0];
      card.appendChild(nameEl);

      // 音符预览（微型网格）
      if (intervals.length > 0) {
        const rootIdx = conv.noteToIdx[root];
        const microGrid = document.createElement("div");

        const avoidSet = new Set(
          avoidIds.map((i) => intervals[i]).map((v) => (rootIdx + v) % 12),
        );
        intervals.forEach((i) => {
          const val = (rootIdx + i) % 12;
          const n = conv.idxToNote[val];
          const dot = document.createElement("span");
          dot.className = `mini-note${avoidSet.has(val) ? " is-avoid" : ""}`;
          dot.textContent = n;
          microGrid.appendChild(dot);
        });
        card.appendChild(microGrid);
      }

      container.appendChild(card);
    });

    return container;
  }


  // Bind run buttons and inputs per-panel
  /** 古典和声面板的界面文字（键值见 lang.js 的 cl_*） */
  function clt(key, params) { return params ? window.__f(key, params) : window.__(key); }

  function localizeClassicalText(text) {
    if (window.__lang !== "zh") return text;
    const exact = {
      "Classical tertian harmony: triads and seventh chords; only the dominant may use a ninth.": "古典三度叠置和声 以三和弦 七和弦为主 仅属功能允许使用九和弦 ",
      "diatonic triad": "调内三和弦",
      "diatonic seventh": "调内七和弦",
      "diatonic ninth": "调内九和弦",
      "cadential six-four": "终止四六和弦",
      "dominant ninth": "属九和弦",
      "Neapolitan sixth": "那不勒斯六和弦",
      "double dominant": "重属和弦",
      "secondary dominant": "离调属和弦",
      "Italian augmented sixth": "意大利增六和弦",
      "French augmented sixth": "法国增六和弦",
      "German augmented sixth": "德国增六和弦",
      "tonic group": "主功能组",
      "subdominant group": "下属功能组",
      "dominant group": "属功能组",
      "leading-tone group": "导功能组",
      "altered chord group": "变和弦组",
      "Sposobin functional DNA: recommendations follow the reference project's next-chord graph.": "基于斯波索宾功能和声连接规则生成推荐 ",
      "unclassified": "未分类",
      "Continue by functional contrast or common-tone prolongation.": "通过功能对比继续 或用共同音延长当前功能 ",
      "Resolve toward the tonic; raise the leading tone in minor.": "向主功能解决 小调中须使用升高的导音 ",
      "Bass remains on scale degree 5; 6-5 and 4-3 resolve into V or V7.": "低音保持在属音 外声部按 6-5、4-3 解决到 V 或 V7。",
      "Use first inversion (N6), then move to K64 or V; double the bass is usually preferred.": "采用第一转位 N6 随后连接 K64 或 V 通常优先重复低音 ",
      "Resolve the augmented sixth outward by semitone to scale degree 5, then continue to V.": "增六音程向外半音解决到属音 再进入 V。",
      "Resolve through K64 to avoid parallel fifths, then continue to V.": "先经过 K64 以规避平行五度 再进入 V。",
      "Resolve the seventh downward and the leading tone upward; the ninth resolves downward.": "七音下行 导音上行 九音下行解决 ",
    };
    if (exact[text]) return exact[text];
    const secondary = text.match(/^Resolve to ([^(]+) \(([^)]+)\); retain common tones and resolve the temporary leading tone upward\.$/);
    if (secondary) return clt("cl_resolve_secondary", { target: secondary[1].trim(), degree: secondary[2] });
    return text;
  }

  function classicalModeLabel(mode = "major") {
    return {
      "all-generic": "/",
      "major-generic": clt("cl_mode_major_generic"),
      "minor-generic": clt("cl_mode_minor_generic"),
      major: clt("cl_mode_major"),
      "harmonic-major": clt("cl_mode_harmonic_major"),
      "melodic-major": clt("cl_mode_melodic_major"),
      minor: clt("cl_mode_minor"),
      "harmonic-minor": clt("cl_mode_harmonic_minor"),
      "melodic-minor": clt("cl_mode_melodic_minor"),
    }[mode] || mode;
  }

  function comparableClassicalMode(mode = "major") {
    if (mode === "major-generic") return "major";
    if (mode === "minor-generic") return "minor";
    return mode;
  }

  function concreteClassicalModes(mode = "major") {
    const majorModes = ["major", "harmonic-major", "melodic-major"];
    const minorModes = ["minor", "harmonic-minor", "melodic-minor"];
    if (mode === "all-generic") return [...majorModes, ...minorModes];
    if (mode === "major-generic") return majorModes;
    if (mode === "minor-generic") return minorModes;
    return [mode];
  }

  /**
   * 和弦链写成四部和声的大谱表：女高、女中在高音谱表，男高、男低在低音谱表；
   * 每个和弦下面标三行：级数（罗马数字）、功能记号（T、S、D……）、和弦音
   * 声部用 classical.voiceSequence 解出的配置（和播放时同一套规则），音名按该和弦的拼写写出
   */
  /**
   * "连续和声连接"就画在大谱表上：女高、女中在高音谱表，男高、男低在低音谱表（声部用 classical.voiceSequence 解出，和播放同一套规则）
   * 每个和弦下面：功能记号、级数、和弦名、和弦音、功能组；每段开头在谱表上方标 |Key=…|
   * 点一列 = 试听这个和弦；点下面的标注 = 和弦链退回到这个和弦。不到 8 个和弦按 8 个的长度画，超过 8 个出现横向滚动条
   * 返回 true 表示谱表画出来了（这时上面那排和弦卡片就不用再显示）
   */
  let classicalLastSatb = null;
  function renderClassicalStaff(container, displaySymbol = (x) => x, after = null, opts = {}) {
    const result = drawClassicalStaff({ classical, segments: classicalSegments, settings: loadClassicalPlaybackSettings(), modeLabel: classicalModeLabel, localize: localizeClassicalText, text: clt, lang: window.__lang || "zh" }, container, displaySymbol, after, opts);
    classicalLastSatb = result.satb;
    return result.drawn;
  }
  /** 和弦链里第几个和弦（跨各段连续编号，只算调色板里认得的和弦，和谱例的列一致） */
  function classicalGlobalIndex(segmentIndex, chainIndex) {
    let index = 0;
    for (let s = 0; s < classicalSegments.length; s += 1) {
      const palette = new Set(classical.getPalette(classicalSegments[s].key, classicalSegments[s].mode).map((entry) => entry.symbol));
      for (let c = 0; c < classicalSegments[s].symbols.length; c += 1) {
        if (!palette.has(classicalSegments[s].symbols[c])) continue;
        if (s === segmentIndex && c === chainIndex) return index;
        index += 1;
      }
    }
    return -1;
  }
  /** 播放时在谱例上点亮正在响的那一列（column < 0 时全部熄灭） */
  function highlightClassicalStaff(root, column) {
    root.querySelectorAll(".classical-chain-staff .is-playing").forEach((n) => n.classList.remove("is-playing"));
    if (column >= 0) root.querySelectorAll(`.classical-chain-staff [data-col="${column}"]`).forEach((n) => n.classList.add("is-playing"));
  }

  function updateClassicalHarmony(targetEl) {
    compositionAudio.stop();
    stopClassicalSequencePlayback();
    const key = document.getElementById("classical-key")?.value || "C";
    const mode = document.getElementById("classical-mode")?.value || "major";
     const modulationKey = document.getElementById("classical-mod-key")?.value || "G";
     const modulationMode = document.getElementById("classical-mod-mode")?.value || "major";
     let input = document.getElementById("classical-input")?.value.trim() || "";
     const hasInput = Boolean(input);
     const modeIsMinor = mode.includes("minor");
    if (hasInput && classicalLastKey !== null && classicalLastKey !== key) {
      input = modeIsMinor ? "t" : "T";
      document.getElementById("classical-input").value = input;
      classicalSegments.push({ key, mode, symbols: [input] });
     } else if (hasInput && classicalLastMode !== null && classicalLastMode !== mode) {
      input = modeIsMinor ? "t" : "T";
      document.getElementById("classical-input").value = input;
       classicalSegments = [{ key, mode, symbols: [input] }];
     }
     if (classicalPendingChain && classicalPendingChain.key === key && classicalPendingChain.mode === mode) {
       const segment = classicalSegments[classicalSegments.length - 1] || { key, mode, symbols: [] };
       segment.key = key;
       segment.mode = mode;
       segment.symbols = classicalPendingChain.symbols.slice();
       if (!classicalSegments.length) classicalSegments.push(segment);
       classicalPendingChain = null;
     }
    classicalLastKey = key;
    classicalLastMode = mode;
    if (hasInput && !classicalSegments.length) classicalSegments = [{ key, mode, symbols: [input] }];
    classicalChain = classicalSegments.length ? classicalSegments[classicalSegments.length - 1].symbols : [];
    try {
      const report = hasInput ? classical.recommend(input, key, mode, 16) : null;
      targetEl.innerHTML = "";

      const workbench = document.createElement("div");
      workbench.className = "classical-workbench";
      const pickerPane = document.createElement("aside");
      pickerPane.className = "classical-picker-pane";
      const resultPane = document.createElement("div");
      resultPane.className = "classical-result-pane";

      const chainBar = document.createElement("div");
      chainBar.className = "classical-chain result-card";
      // 斯波索宾数据里的符号带中文变体名（如 T不完全、T双三），只在显示时翻译，内部仍用原符号
      const displayClassicalSymbol = symbol => String(symbol)
        .replace(/不完全/g, clt("cl_variant_incomplete"))
        .replace(/双三/g, clt("cl_variant_doubled_third"));
       if (report) {
         const activeSegment = classicalSegments[classicalSegments.length - 1];
         if (!activeSegment) {
           classicalSegments = [{ key, mode, symbols: [report.current.symbol] }];
         } else if (!activeSegment.symbols.length) {
           activeSegment.symbols = [report.current.symbol];
         } else if (activeSegment.symbols.length === 1) {
           // Keep a chain built by clicking recommendations. The raw input
           // may be an alias (e.g. K64 vs K₆₄), so normalize only its final
           // node instead of replacing the entire sequence.
           const lastValue = activeSegment.symbols[0];
           if (lastValue === input || lastValue === report.current.symbol || lastValue === report.current.baseSymbol) activeSegment.symbols[0] = report.current.symbol;
         }
         classicalChain = classicalSegments[classicalSegments.length - 1].symbols;
       }
      const chainButtons = classicalChain.map((symbol, index) => `<button type="button" class="classical-chain-node" data-chain-index="${index}">${symbol}</button>${index < classicalChain.length - 1 ? "<span class=\"classical-chain-arrow\">→</span>" : ""}`).join("");
      const segmentFlow = classicalSegments.map((segment, segmentIndex) => {
        const segmentPalette = classical.getPalette(segment.key, segment.mode);
        const entries = new Map(segmentPalette.map(entry => [entry.symbol, entry]));
        const nodes = segment.symbols.map((symbol, index) => {
          const entry = entries.get(symbol);
          const categoryLabel = entry ? localizeClassicalText(entry.category) : "";
          const labels = entry
            ? `<span class="classical-chain-function">${entry.symbol}</span><span class="classical-chain-roman">${entry.roman}</span><span class="classical-chain-chord">${entry.chord}</span><span class="classical-chain-category">${categoryLabel}</span>`
            : `<span class="classical-chain-function">${symbol}</span>`;
          return `<span class="classical-chain-node-wrap"><button type="button" class="classical-chain-node" data-symbol="${symbol}" data-segment-index="${segmentIndex}" data-chain-index="${index}" title="${entry ? `${entry.symbol} / ${entry.roman} / ${entry.chord} / ${categoryLabel}` : symbol}">${labels}</button><button type="button" class="classical-chain-single-play" data-single-segment-index="${segmentIndex}" data-single-chain-index="${index}" aria-label="${clt("cl_play")} ${entry ? `${entry.symbol} ${entry.chord}` : symbol}" title="${clt("cl_play_this_chord")}">►</button></span>${index < segment.symbols.length - 1 ? "<span class=\"classical-chain-arrow\">→</span>" : ""}`;
        }).join("");
        const keyLabelClass = segmentIndex ? "classical-chain-divider" : "classical-chain-key-start";
        return `<span class="${keyLabelClass}">│ Key=${segment.key} ${classicalModeLabel(segment.mode)} │</span>${nodes}`;
      }).join("");
      const playbackSettings = loadClassicalPlaybackSettings();
      chainBar.innerHTML = `<div class="classical-chain-head"><strong>${clt("cl_chain_title")}</strong><div class="classical-chain-primary-actions"><button type="button" class="classical-chain-play" ${classicalChain.length ? "" : "disabled"}>${clt("cl_play_button")}</button><button type="button" class="classical-chain-back" ${classicalChain.length < 2 ? "disabled" : ""}>${clt("cl_back")}</button><button type="button" class="classical-chain-reset">${clt("cl_clear")}</button></div></div><div class="classical-chain-flow">${segmentFlow || `<span class="small-muted">${clt("cl_chain_empty")}</span>`}</div><details class="classical-playback-settings"><summary>${clt("cl_playback_settings")} · ${playbackSettings.bpm} BPM · ${playbackSettings.meter}</summary><div class="classical-chain-controls"><label class="classical-chain-bpm">${clt("cl_tempo")} <input class="classical-chain-tempo" type="range" min="40" max="640" step="1" value="${playbackSettings.bpm}" aria-label="${clt("cl_tempo_aria")}"><input class="classical-chain-tempo-value" type="number" min="40" max="640" step="1" value="${playbackSettings.bpm}" aria-label="${clt("cl_bpm_aria")}"> BPM</label><select class="classical-chain-meter" aria-label="${clt("cl_meter_aria")}"><option value="4/4" ${playbackSettings.meter === "4/4" ? "selected" : ""}>4/4</option><option value="3/4" ${playbackSettings.meter === "3/4" ? "selected" : ""}>3/4</option><option value="6/8" ${playbackSettings.meter === "6/8" ? "selected" : ""}>6/8</option><option value="8/8" ${playbackSettings.meter === "8/8" ? "selected" : ""}>8/8</option><option value="12/16" ${playbackSettings.meter === "12/16" ? "selected" : ""}>12/16</option><option value="16/16" ${playbackSettings.meter === "16/16" ? "selected" : ""}>16/16</option></select><select class="classical-chain-play-mode" aria-label="${clt("cl_mode_aria")}"><option value="block" ${playbackSettings.mode === "block" ? "selected" : ""}>${clt("cl_block")}</option><option value="arpeggio" ${playbackSettings.mode === "arpeggio" ? "selected" : ""}>${clt("cl_arpeggio")}</option></select></div></details>`;
      const clampClassicalBpm = value => Math.max(40, Math.min(640, Math.round(Number(value) || 80)));
      const tempoSlider = chainBar.querySelector(".classical-chain-tempo");
      const tempoValue = chainBar.querySelector(".classical-chain-tempo-value");
      const meterSelect = chainBar.querySelector(".classical-chain-meter");
      const modeSelect = chainBar.querySelector(".classical-chain-play-mode");
      const syncClassicalTempo = value => {
        const bpm = clampClassicalBpm(value);
        if (tempoSlider) tempoSlider.value = String(bpm);
        if (tempoValue) tempoValue.value = String(bpm);
        saveClassicalPlaybackSettings({
          bpm,
          meter: meterSelect?.value || DEFAULT_CLASSICAL_PLAYBACK.meter,
          mode: modeSelect?.value || DEFAULT_CLASSICAL_PLAYBACK.mode,
        });
        return bpm;
      };
      tempoSlider?.addEventListener("input", event => syncClassicalTempo(event.currentTarget.value));
      tempoValue?.addEventListener("change", event => syncClassicalTempo(event.currentTarget.value));
      meterSelect?.addEventListener("change", () => {
        saveClassicalPlaybackSettings({
          bpm: clampClassicalBpm(tempoValue?.value || tempoSlider?.value),
          meter: meterSelect.value,
          mode: modeSelect?.value || DEFAULT_CLASSICAL_PLAYBACK.mode,
        });
        redrawClassicalStaff();
      });
      modeSelect?.addEventListener("change", () => {
        saveClassicalPlaybackSettings({
          bpm: clampClassicalBpm(tempoValue?.value || tempoSlider?.value),
          meter: meterSelect?.value || DEFAULT_CLASSICAL_PLAYBACK.meter,
          mode: modeSelect.value,
        });
        redrawClassicalStaff();
      });
      chainBar.querySelectorAll(".classical-chain-single-play").forEach(button => button.addEventListener("click", event => {
        compositionAudio.stop();
        event.stopPropagation();
        const segmentIndex = Number(button.dataset.singleSegmentIndex);
        const chainIndex = Number(button.dataset.singleChainIndex);
        const segment = classicalSegments[segmentIndex];
        const symbol = segment?.symbols?.[chainIndex];
        const entry = symbol ? classical.getPalette(segment.key, segment.mode).find(item => item.symbol === symbol) : null;
        if (!entry?.notes?.length) return;
        stopClassicalSequencePlayback();
        chainBar.querySelectorAll(".classical-chain-node.is-playing").forEach(node => node.classList.remove("is-playing"));
        chainBar.querySelector(`[data-segment-index="${segmentIndex}"][data-chain-index="${chainIndex}"]`)?.classList.add("is-playing");
        highlightClassicalStaff(chainBar, classicalGlobalIndex(segmentIndex, chainIndex));
        playChord(classicalMidiFreqs(entry), 1.4);
        setTimeout(() => { chainBar.querySelector(`[data-segment-index="${segmentIndex}"][data-chain-index="${chainIndex}"]`)?.classList.remove("is-playing"); highlightClassicalStaff(chainBar, -1); }, 1450);
      }));
      chainBar.querySelector(".classical-chain-play")?.addEventListener("click", event => {
        compositionAudio.stop();
        const playButton = event.currentTarget;
        if (playButton.dataset.playing === "true") {
          stopClassicalSequencePlayback();
          chainBar.querySelectorAll(".classical-chain-node.is-playing").forEach(node => node.classList.remove("is-playing"));
          highlightClassicalStaff(chainBar, -1);
          playButton.dataset.playing = "false";
          playButton.textContent = clt("cl_play_sequence");
          return;
        }
        const sequence = [];
        let lastRootMidi = null;
        const playbackMode = chainBar.querySelector(".classical-chain-play-mode")?.value || "block";
        const meter = chainBar.querySelector(".classical-chain-meter")?.value || "4/4";
        const beatCount = Math.max(1, Number(meter.split("/")[0]) || 4);
        const bpm = syncClassicalTempo(chainBar.querySelector(".classical-chain-tempo-value")?.value ?? chainBar.querySelector(".classical-chain-tempo")?.value);
        const beatMs = 60000 / bpm;
        const barMs = beatMs * beatCount;
        const sequenceEntries = [];
        classicalSegments.forEach((segment, segmentIndex) => {
          const entries = new Map(classical.getPalette(segment.key, segment.mode).map(entry => [entry.symbol, entry]));
          segment.symbols.forEach((symbol, chainIndex) => {
            const entry = entries.get(symbol);
            if (!entry) return;
            sequenceEntries.push(entry);
            sequence.push({ segmentIndex, chainIndex, mode: playbackMode, column: sequence.length });
          });
        });
        if (!sequence.length) return;
        const solved = classical.voiceSequence(sequenceEntries);
        let status = chainBar.querySelector('.classical-voicing-status');
        if (!status) { status = document.createElement('div'); status.className = 'classical-voicing-status'; status.setAttribute('role', 'status'); chainBar.append(status); }
        if (!solved.ok) { status.textContent = solved.reason; return; }
        status.textContent = clt("cl_satb_checked");
        sequence.forEach((step, i) => { step.freqs = solved.voices[i].map(n => 440 * 2 ** ((n - 69) / 12)); });
        const voiceTable = document.createElement('div'); voiceTable.className = 'classical-voice-table';
        solved.voices.forEach((v,i) => { const row = document.createElement('div'); row.textContent = `${sequenceEntries[i].symbol}   ${v.map(midiName).join(' / ')}`; voiceTable.append(row); });
        status.append(voiceTable);
        stopClassicalSequencePlayback();
        const playbackId = classicalSequencePlaybackId;
        playButton.dataset.playing = "true";
        playButton.textContent = clt("cl_stop");
        let eventIndex = 0;
        sequence.forEach(step => {
          const arpSource = step.freqs;
          const frequencies = step.mode === "arpeggio"
            ? Array.from({ length: beatCount }, (_, index) => arpSource[index % arpSource.length]).filter(Boolean)
            : [step.freqs];
          frequencies.forEach((frequency, frequencyIndex) => {
            classicalSequenceTimers.push(setTimeout(() => {
            if (playbackId !== classicalSequencePlaybackId) return;
            chainBar.querySelectorAll(".classical-chain-node.is-playing").forEach(node => node.classList.remove("is-playing"));
            chainBar.querySelector(`[data-segment-index="${step.segmentIndex}"][data-chain-index="${step.chainIndex}"]`)?.classList.add("is-playing");
            highlightClassicalStaff(chainBar, step.column);
            playChord(step.mode === "arpeggio" ? [frequency] : frequency, step.mode === "arpeggio" ? 0.55 : Math.max(0.8, barMs / 1000 * 0.9), { interrupt: frequencyIndex === 0 || step.mode !== "arpeggio" });
          }, eventIndex++ * (step.mode === "arpeggio" ? beatMs : barMs)));
          });
        });
        const stepDuration = playbackMode === "arpeggio" ? beatMs : barMs;
        classicalSequenceTimers.push(setTimeout(() => {
          if (playbackId !== classicalSequencePlaybackId) return;
          chainBar.querySelectorAll(".classical-chain-node.is-playing").forEach(node => node.classList.remove("is-playing"));
          highlightClassicalStaff(chainBar, -1);
          playButton.dataset.playing = "false";
          playButton.textContent = clt("cl_play_sequence");
          classicalSequenceTimers = [];
        }, eventIndex * stepDuration + 180));
      });
      chainBar.querySelector(".classical-chain-back")?.addEventListener("click", () => {
        if (classicalChain.length < 2) return;
        classicalChain.pop();
        document.getElementById("classical-input").value = classicalChain[classicalChain.length - 1];
        updateClassicalHarmony(targetEl);
      });
      chainBar.querySelector(".classical-chain-reset")?.addEventListener("click", () => {
        classicalSegments = [];
        classicalChain = [];
        document.getElementById("classical-input").value = "";
        updateClassicalHarmony(targetEl);
      });
      chainBar.querySelectorAll(".classical-chain-node[data-chain-index]").forEach(button => button.addEventListener("click", () => {
        const segmentIndex = Number(button.dataset.segmentIndex);
        classicalSegments = classicalSegments.slice(0, segmentIndex + 1);
        classicalSegments[segmentIndex].symbols = classicalSegments[segmentIndex].symbols.slice(0, Number(button.dataset.chainIndex) + 1);
        classicalChain = classicalSegments[segmentIndex].symbols;
        document.getElementById("classical-input").value = button.dataset.symbol;
        updateClassicalHarmony(targetEl);
      }));
      targetEl.appendChild(workbench);
      workbench.append(resultPane);
      resultPane.appendChild(chainBar);
      // "连续和声连接"直接画在大谱表上（谱表画得出来时，原来那排和弦卡片就不再显示）
      function redrawClassicalStaff() {
        chainBar.querySelector(".classical-chain-staff")?.remove();
        const chainFlow = chainBar.querySelector(".classical-chain-flow");
        const staffDrawn = renderClassicalStaff(chainBar, displayClassicalSymbol, chainFlow, {
          onPlay: (column, segmentIndex, chainIndex) => chainBar.querySelector(`.classical-chain-single-play[data-single-segment-index="${segmentIndex}"][data-single-chain-index="${chainIndex}"]`)?.click(),
          onPick: (segmentIndex, chainIndex) => chainBar.querySelector(`.classical-chain-node[data-segment-index="${segmentIndex}"][data-chain-index="${chainIndex}"]`)?.click(),
        });
        if (chainFlow) chainFlow.hidden = Boolean(staffDrawn);
      }
      redrawClassicalStaff();
      // 送到五线谱：把四部和声交给五线谱工具继续编辑
      const sendButton = document.createElement("button");
      sendButton.type = "button";
      sendButton.className = "classical-chain-send";
      sendButton.textContent = clt("cl_send_staff");
      sendButton.addEventListener("click", () => {
        if (!classicalLastSatb) return;
        sendToStaff({ clef: "grand", key: classicalLastSatb.key, meter: [4, 4], bpm: 72, voices: satbToVoices(classicalLastSatb.chords, 4) });
      });
      chainBar.querySelector(".classical-chain-primary-actions")?.appendChild(sendButton);

      // The picker stays near the current sequence so users do not have to
      // scroll past recommendation cards just to choose the next function.
      const recommendationSection = document.createElement("section");
      recommendationSection.className = "classical-recommendations";

      const paths = hasInput ? classical.findPaths(input, key, mode, 4, 8) : [];
      const pathBar = document.createElement("section");
      pathBar.className = "classical-paths result-card";
      pathBar.innerHTML = `<div class="classical-palette-title">${clt("cl_paths_title")}</div><div class="classical-path-list">${paths.map((path, index) => `<button type="button" class="classical-path" data-path-index="${index}"><span>${path.symbols.join(" → ")}</span><small>${clt("cl_steps", { n: path.symbols.length - 1 })} · ${path.score.toFixed(1)}</small></button>`).join("")}</div>`;
      pathBar.querySelectorAll("[data-path-index]").forEach(button => button.addEventListener("click", () => {
        const selected = paths[Number(button.dataset.pathIndex)];
        classicalChain = selected.symbols;
        classicalSegments[classicalSegments.length - 1].symbols = classicalChain;
        document.getElementById("classical-input").value = selected.symbols[selected.symbols.length - 1];
        classicalActiveView = "recommendations";
        updateClassicalHarmony(targetEl);
      }));

      const modulationBar = document.createElement("section");
      modulationBar.className = "classical-modulations result-card";
      let modulationRoutes = [];
      const targetModeIsSpecific = concreteClassicalModes(modulationMode).length === 1;
      const targetMatchesCurrent = targetModeIsSpecific && modulationKey === key && comparableClassicalMode(mode) === modulationMode;
      if (hasInput && !targetMatchesCurrent) {
        modulationRoutes = concreteClassicalModes(modulationMode).flatMap(targetMode =>
          classical.suggestModulations(input, key, mode, modulationKey, targetMode, 6)
        );
      }
      const modulationTargetLabel = `${modulationKey} ${classicalModeLabel(modulationMode)}`;
      const modulationBody = !hasInput
        ? `<div class="small-muted">${clt("cl_mod_need_chord")}</div>`
        : targetMatchesCurrent
          ? `<div class="small-muted">${clt("cl_mod_same_key")}</div>`
          : modulationRoutes.length
            ? modulationRoutes.map((route, index) => `<button type="button" class="classical-path modulation-path" data-modulation-index="${index}"><span>${route.sourceSymbols.join(" → ")} <b>│ Key=${route.targetKey} ${classicalModeLabel(route.targetMode)} │</b> ${route.targetSymbols.join(" → ")}</span><small>${clt("cl_pivot", { chord: route.pivot.chord })}</small></button>`).join("")
            : `<div class="small-muted">${clt("cl_mod_no_pivot")}</div>`;
      modulationBar.innerHTML = `<div class="classical-palette-title">${clt("cl_mod_title", { target: modulationTargetLabel })}</div><div class="small-muted classical-modulation-hint">${clt("cl_mod_hint")}</div><div class="classical-path-list">${modulationBody}</div>`;
      modulationBar.querySelectorAll("[data-modulation-index]").forEach(button => button.addEventListener("click", () => {
        const selected = modulationRoutes[Number(button.dataset.modulationIndex)];
        const sourceSegment = classicalSegments[classicalSegments.length - 1];
        sourceSegment.symbols = [...sourceSegment.symbols, ...selected.sourceSymbols.slice(1)];
        document.getElementById("classical-key").value = selected.targetKey;
        document.getElementById("classical-mode").value = selected.targetMode;
        classicalLastKey = selected.targetKey;
        classicalLastMode = selected.targetMode;
        classicalSegments.push({ key: selected.targetKey, mode: selected.targetMode, symbols: selected.targetSymbols });
        document.getElementById("classical-input").value = selected.targetSymbols[selected.targetSymbols.length - 1];
        classicalActiveView = "recommendations";
        updateClassicalHarmony(targetEl);
      }));

      // The reference Sposobin UI exposes the whole functional DNA as a
      // palette. Clicking a symbol makes it the current chord and refreshes
      // the exact next-chord recommendations for that node.
      const palette = classical.getPalette(key, mode);
      const paletteWrap = document.createElement("section");
      paletteWrap.className = "classical-palette result-card";
      const groups = [
        ["tonic group", clt("cl_group_tonic")],
        ["subdominant group", clt("cl_group_subdominant")],
        ["dominant group", clt("cl_group_dominant")],
        ["leading-tone group", clt("cl_group_leading")],
        ["altered chord group", clt("cl_group_altered")],
        ["double dominant", clt("cl_group_dd")]
      ];
      const grouped = new Map(groups.map(([id, label]) => [id, { label, entries: [] }]));
      const tonicized = new Map();
      palette.forEach(entry => {
        if (entry.symbol.includes("/")) {
          const target = entry.symbol.split("/")[1];
          if (!tonicized.has(target)) tonicized.set(target, []);
          tonicized.get(target).push(entry);
        } else if (grouped.has(entry.category)) grouped.get(entry.category).entries.push(entry);
      });
      const makeGroup = (label, entries, extraClass = "") => {
        if (!entries.length) return "";
        const buttons = entries.map(entry => `<button type="button" class="classical-palette-btn ${extraClass}" data-classical-symbol="${entry.symbol}"><span>${displayClassicalSymbol(entry.symbol)}</span><small>${entry.roman || ""}${entry.chord ? ` · ${entry.chord}` : ""}</small></button>`).join("");
        return `<div class="classical-palette-group"><h4>${label}</h4><div class="classical-palette-grid">${buttons}</div></div>`;
      };
      const availableGroups = groups.filter(([id]) => grouped.get(id)?.entries.length);
      paletteWrap.innerHTML = `<div class="classical-palette-title">${clt("cl_palette_title")}</div><div class="classical-function-tabs">${availableGroups.map(([id]) => `<button type="button" class="classical-function-tab" data-function-group="${id}">${grouped.get(id).label.replace(/[（(].*$/, "")} <span>${grouped.get(id).entries.length}</span></button>`).join("")}</div><div class="classical-function-list"></div><div class="classical-palette-tonicization"><h4>${clt("cl_tonicization_title")}</h4><div class="classical-tonicization-tabs">${["II", "III", "IV", "V", "VI"].map(target => `<button type="button" class="classical-tonicization-tab" data-tonic-target="${target}">${clt("cl_to_degree", { degree: target })} <span>${(tonicized.get(target) || []).length}</span></button>`).join("")}</div><div class="classical-tonicization-list"></div></div>`;
      const appendClassicalSymbol = symbol => {
        const activeSegment = classicalSegments[classicalSegments.length - 1] || { key, mode, symbols: [] };
        if (!classicalSegments.length) classicalSegments.push(activeSegment);
        activeSegment.symbols.push(symbol);
        classicalChain = activeSegment.symbols;
        document.getElementById("classical-input").value = symbol;
        classicalActiveView = "recommendations";
        updateClassicalHarmony(targetEl);
      };
      const bindClassicalSymbolButtons = root => {
        root.querySelectorAll("[data-classical-symbol]").forEach(button => button.addEventListener("click", () => {
          appendClassicalSymbol(button.dataset.classicalSymbol);
        }));
      };
      const functionList = paletteWrap.querySelector(".classical-function-list");
      const renderFunctionGroup = id => {
        const group = grouped.get(id);
        if (!group) return;
        paletteWrap.querySelectorAll(".classical-function-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.functionGroup === id));
        functionList.innerHTML = makeGroup(group.label, group.entries);
        bindClassicalSymbolButtons(functionList);
      };
      paletteWrap.querySelectorAll(".classical-function-tab").forEach(button => button.addEventListener("click", () => {
        renderFunctionGroup(button.dataset.functionGroup);
      }));
      const tonicList = paletteWrap.querySelector(".classical-tonicization-list");
      const renderTonicization = target => {
        tonicList.innerHTML = makeGroup(`${clt("cl_secondary")} · ${clt("cl_to_degree", { degree: target })}`, tonicized.get(target) || [], "classical-tonicization-btn");
        bindClassicalSymbolButtons(tonicList);
      };
      paletteWrap.querySelectorAll(".classical-tonicization-tab").forEach(button => button.addEventListener("click", () => {
        paletteWrap.querySelectorAll(".classical-tonicization-tab").forEach(tab => tab.classList.remove("active"));
        button.classList.add("active");
        renderTonicization(button.dataset.tonicTarget);
      }));
      if (availableGroups.length) renderFunctionGroup(availableGroups[0][0]);
      pickerPane.appendChild(paletteWrap);

      const summary = document.createElement("div");
      summary.className = "classical-summary result-card";
      const modeLabel = classicalModeLabel(mode);
      summary.innerHTML = report
        ? `<div class="classical-summary-title">${key} ${modeLabel} · ${displayClassicalSymbol(report.current.symbol || input, true)}</div><div class="small-muted">${localizeClassicalText(report.constraints)}</div><div class="classical-current-meta">${localizeClassicalText(report.current.category || "unclassified")} · ${clt("cl_function")} ${report.current.function || "—"} · ${clt("cl_bass")} ${report.current.bass || report.current.notes?.[0] || "—"}</div>`
        : `<div class="classical-summary-title">${key} ${modeLabel}</div><div class="small-muted">${clt("cl_summary_empty")}</div>`;
      resultPane.appendChild(summary);

      const heading = document.createElement("div");
      heading.className = "classical-list-heading";
      heading.textContent = report ? `${clt("cl_recommendations")} · ${report.recommendations.length}` : clt("cl_recommendations");
      recommendationSection.appendChild(heading);

      const list = document.createElement("div");
      list.className = "classical-rec-list";
      (report?.recommendations || []).forEach((item) => {
        const card = document.createElement("article");
        card.className = "classical-rec-card result-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", clt("cl_add_to_chain_aria", { chord: `${item.symbol} ${item.roman} ${item.chord}` }));
        card.title = clt("cl_add_to_chain");
        const toneButtons = (item.notes || []).map(note => `<button type="button" class="classical-note" data-classical-note="${note}">${note}</button>`).join("");
        card.innerHTML = `<div class="classical-rec-top"><div><strong>${item.symbol}</strong><span class="classical-roman-name">${item.roman || item.symbol}</span><span class="classical-chord-name">${item.chord}</span></div><div class="classical-rec-actions"><span class="classical-score">${item.score.toFixed(1)}</span><span class="classical-add" aria-hidden="true">+</span></div></div><div class="classical-tags"><span>${localizeClassicalText(item.category)}</span><span>${clt("cl_function")} ${item.function}</span><span>${clt("cl_inversion")} ${item.figuredBass || clt("cl_root_position")}</span><span>${clt("cl_bass")} ${item.bass || "—"}</span></div><div class="classical-notes">${toneButtons}</div><div class="classical-meta">${clt("cl_common_tones")} ${item.commonTones} · ${clt("cl_voice_distance")} ${item.voiceLeading}</div><button type="button" class="classical-play" title="${clt("cl_play_chord")}">${clt("cl_play_button")}</button>`;
        const appendRecommendation = () => {
          const activeSegment = classicalSegments[classicalSegments.length - 1] || { key, mode, symbols: [] };
          if (!classicalSegments.length) classicalSegments.push(activeSegment);
          // Always mutate the segment that is rendered, not a stale alias.
          // This preserves K64 → D6 and longer recommendation chains.
          if (!activeSegment.symbols.length) activeSegment.symbols.push(input || report?.current?.symbol || item.symbol);
          activeSegment.symbols.push(item.symbol);
          classicalChain = activeSegment.symbols;
          classicalPendingChain = { key, mode, symbols: activeSegment.symbols.slice() };
          document.getElementById("classical-input").value = item.symbol;
          classicalActiveView = "recommendations";
          updateClassicalHarmony(targetEl);
        };
        card.addEventListener("click", event => {
          if (event.target.closest("button")) return;
          appendRecommendation();
        });
        card.addEventListener("keydown", event => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          appendRecommendation();
        });
        card.querySelector(".classical-play")?.addEventListener("click", () => {
          stopClassicalSequencePlayback();
          if (item.previousVoicing?.length) {
            const events = [item.previousVoicing, item.midiVoicing].flatMap((v,i) => v.map(midi => ({midi,beat:i*2,duration:1.8,velocity:.65})));
            compositionAudio.play(events,90,4,()=>{});
          } else playChord(classicalMidiFreqs(item));
        });
        const voiceLabel = document.createElement('div'); voiceLabel.className = 'classical-meta'; voiceLabel.textContent = `B / T / A / S  ${(item.midiVoicing || []).map(midiName).join(' / ')}`; card.append(voiceLabel);
        card.querySelector('.classical-play').textContent = clt("cl_play_satb");
        card.querySelectorAll("[data-classical-note]").forEach(button => button.addEventListener("click", () => {
          playChord([noteToFrequency(button.dataset.classicalNote)], 0.7);
        }));
        list.appendChild(card);
      });
      recommendationSection.appendChild(list);

      const viewTabs = document.createElement("div");
      viewTabs.className = "classical-view-tabs";
      viewTabs.setAttribute("role", "tablist");
      const viewDefinitions = [
        ["recommendations", clt("cl_tab_recommendations"), report?.recommendations?.length || 0],
        ["paths", clt("cl_tab_paths"), paths.length],
        ["modulations", clt("cl_tab_modulations"), modulationRoutes.length],
        ["palette", clt("cl_tab_palette"), palette.length],
      ];
      viewTabs.innerHTML = viewDefinitions.map(([id, label, count]) => `<button type="button" class="classical-view-tab" data-classical-view="${id}" role="tab"><span>${label}</span><small>${count}</small></button>`).join("");

      const viewStage = document.createElement("div");
      viewStage.className = "classical-view-stage";
      const viewPanels = new Map();
      viewDefinitions.forEach(([id]) => {
        const panel = document.createElement("div");
        panel.className = "classical-view-panel";
        panel.dataset.classicalViewPanel = id;
        panel.setAttribute("role", "tabpanel");
        viewPanels.set(id, panel);
        viewStage.appendChild(panel);
      });
      viewPanels.get("recommendations").appendChild(recommendationSection);
      viewPanels.get("paths").appendChild(pathBar);
      viewPanels.get("modulations").appendChild(modulationBar);
      viewPanels.get("palette").appendChild(paletteWrap);
      resultPane.append(viewTabs, viewStage);

      const setClassicalView = view => {
        classicalActiveView = viewPanels.has(view) ? view : "recommendations";
        viewTabs.querySelectorAll("[data-classical-view]").forEach(button => {
          const active = button.dataset.classicalView === classicalActiveView;
          button.classList.toggle("active", active);
          button.setAttribute("aria-selected", String(active));
        });
        viewPanels.forEach((panel, id) => {
          panel.hidden = id !== classicalActiveView;
        });
      };
      viewTabs.querySelectorAll("[data-classical-view]").forEach(button => button.addEventListener("click", () => {
        setClassicalView(button.dataset.classicalView);
      }));
      setClassicalView(hasInput ? classicalActiveView : "palette");
    } catch (error) {
      targetEl.innerHTML = `<div class="result-card classical-error">${error.message}</div>`;
    }
  }

  document.getElementById("classical-run")?.addEventListener("click", () => {
    classicalActiveView = "recommendations";
    updateClassicalHarmony(document.getElementById("panel-classical-body"));
  });
  document.getElementById("classical-input")?.addEventListener("keydown", event => {
    if (event.key === "Enter") document.getElementById("classical-run")?.click();
  });
  document.getElementById("classical-key")?.addEventListener("change", () => {
    updateClassicalHarmony(document.getElementById("panel-classical-body"));
  });
  document.getElementById("classical-mode")?.addEventListener("change", () => {
    updateClassicalHarmony(document.getElementById("panel-classical-body"));
  });
  document.getElementById("classical-mod-key")?.addEventListener("change", () => {
    updateClassicalHarmony(document.getElementById("panel-classical-body"));
  });
  document.getElementById("classical-mod-mode")?.addEventListener("change", () => {
    updateClassicalHarmony(document.getElementById("panel-classical-body"));
  });

  document.getElementById("chord-run").addEventListener("click", () => {
    const target = document.getElementById("panel-chord-body");
    const val = document.getElementById("chord-input").value;
    try {
      if (!val.trim()) throw new Error('empty');
      prettyChordRender(target, val);
      document.getElementById('chord-input').removeAttribute('aria-invalid');
    } catch {
      target.innerHTML = `<p class="input-error" role="alert">${window.__("chord_input_error")}</p>`;
      document.getElementById('chord-input').setAttribute('aria-invalid', 'true');
    }
  });
  document.getElementById('chord-input').addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); document.getElementById('chord-run').click(); }
  });
  document.querySelectorAll('[data-chord-example]').forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById('chord-input').value = button.dataset.chordExample;
      document.getElementById('chord-run').click();
    });
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

  // ===================== 记住状态与链接分享 =====================
  // 地址栏形如 #cst?q=Dm7：打开对应面板并填入输入框；上次打开的面板与输入保存在 localStorage
  var FEATURE_STORAGE_KEY = "jc-feature";
  var INPUT_STORAGE_KEY = "jc-inputs";
  var PRIMARY_INPUTS = { chord: "chord-input", blues: "blues-input", lcc: "lcc-input", cst: "cst-input" };
  // 用函数声明：showOnlyFeature 可能早于这里被调用
  function isFeature(id) { return navButtons.some((button) => button.dataset.feature === id); }
  function readStored(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } }
  function writeStored(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { } }
  function parseLocationHash() {
    const raw = location.hash.slice(1);
    const split = raw.indexOf("?");
    const feature = decodeURIComponent(split < 0 ? raw : raw.slice(0, split));
    return { feature, q: split < 0 ? null : new URLSearchParams(raw.slice(split + 1)).get("q") };
  }
  function shareableHash(feature) {
    const input = PRIMARY_INPUTS[feature] && document.getElementById(PRIMARY_INPUTS[feature]);
    const value = input?.value.trim();
    return `#${feature}${value ? `?q=${encodeURIComponent(value)}` : ""}`;
  }
  function rememberFeature(feature) {
    if (!FEATURE_STORAGE_KEY) return; // 初始化完成前不记录
    writeStored(FEATURE_STORAGE_KEY, feature);
    try { history.replaceState(null, "", shareableHash(feature)); } catch (_) { }
  }
  Object.entries(PRIMARY_INPUTS).forEach(([feature, inputId]) => {
    document.getElementById(`${feature}-run`)?.addEventListener("click", () => {
      writeStored(INPUT_STORAGE_KEY, { ...readStored(INPUT_STORAGE_KEY, {}), [inputId]: document.getElementById(inputId).value });
      if (document.querySelector(`.feature-btn.active`)?.dataset.feature === feature) rememberFeature(feature);
    });
  });
  /**
   * 复制文字：navigator.clipboard 只在安全上下文（https 或 localhost）可用；
   * 通过局域网 IP 或 file:// 打开时退回到 execCommand('copy')，仍失败则交给调用方弹出可手动复制的对话框
   */
  async function copyText(text) {
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* 继续尝试旧方法 */ }
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    let ok = false;
    try { area.select(); ok = document.execCommand("copy"); } catch (_) { ok = false; }
    area.remove();
    return ok;
  }
  const shareButton = document.getElementById("share-link");
  shareButton?.addEventListener("click", async () => {
    const feature = document.querySelector(".feature-btn.active")?.dataset.feature;
    if (feature) rememberFeature(feature);
    const label = document.getElementById("share_link");
    const copied = await copyText(location.href);
    label.textContent = window.__(copied ? "share_copied" : "share_failed");
    if (!copied) window.prompt(window.__("share_prompt"), location.href);
    setTimeout(() => { label.textContent = window.__("share_link"); }, 1600);
  });
  /** #learn?q=<关卡 id>：打开乐理闯关并直接进入该关 */
  function openLearnUnit(unitId) {
    showOnlyFeature("learn");
    const panel = document.getElementById("panel-learn-body");
    whenMounted(panel).then(() => {
      if (unitId === "@resume") { panel?.resume?.(); return; }
      if (unitId) panel?.openUnit?.(unitId);
    });
  }
  document.getElementById("tutorial-link")?.addEventListener("click", (event) => {
    const unitId = event.currentTarget.dataset.unit;
    if (!unitId) return;
    const record = anyResume();
    const go = () => { location.hash = `#learn?q=${encodeURIComponent(unitId)}`; };
    // 学习记录正是这一关时直接回去；否则先确认，避免误触丢掉进度
    const sameLevel = record && (unitId.includes(":") ? record.key === unitId : record.key.split(":")[0] === unitId);
    if (sameLevel) { location.hash = "#learn?q=%40resume"; return; }
    if (record) { confirmTutorialSwitch(record, () => { location.hash = "#learn?q=%40resume"; }, () => { clearResume(); updateReturnTutorial(); go(); }); return; }
    go();
  });
  document.getElementById("return-tutorial")?.addEventListener("click", () => {
    if (location.hash === "#learn?q=%40resume") openLearnUnit("@resume");
    else location.hash = "#learn?q=%40resume";
  });
  document.getElementById("return-sideb")?.addEventListener("click", () => {
    if (location.hash === "#learn?q=%40sideb-resume") openLearnUnit("@sideb-resume");
    else location.hash = "#learn?q=%40sideb-resume";
  });
  window.addEventListener("hashchange", () => {
    const { feature, q } = parseLocationHash();
    if (!isFeature(feature)) return;
    if (feature === "learn") { openLearnUnit(q); return; }
    // 模块面板的链接参数（如 #staff?q=bass）：面板已经打开过就直接交给它
    // 曲式结构、节奏面板没有 -body 容器，直接发给面板本身
    if (q !== null && !PRIMARY_INPUTS[feature]) {
      const host = document.getElementById(`panel-${feature}-body`) || document.getElementById(`panel-${feature}`);
      whenMounted(host).then(() => host?.dispatchEvent(new CustomEvent("toolbox-query", { detail: q })));
    }
    if (q !== null && PRIMARY_INPUTS[feature]) {
      document.getElementById(PRIMARY_INPUTS[feature]).value = q;
      document.getElementById(`${feature}-run`)?.click();
    }
    showOnlyFeature(feature);
  });

  // 初始化：先按保存的输入与链接参数填好输入框，再渲染各面板
  const storedInputs = readStored(INPUT_STORAGE_KEY, {});
  Object.values(PRIMARY_INPUTS).forEach((inputId) => {
    if (typeof storedInputs[inputId] === "string" && storedInputs[inputId].trim()) document.getElementById(inputId).value = storedInputs[inputId];
  });
  const initialHash = parseLocationHash();
  if (initialHash.q !== null && PRIMARY_INPUTS[initialHash.feature]) document.getElementById(PRIMARY_INPUTS[initialHash.feature]).value = initialHash.q;
  document.getElementById('chord-run').click();
  const storedFeature = readStored(FEATURE_STORAGE_KEY, null);
  initialHashForShow = initialHash;
  showOnlyFeature(isFeature(initialHash.feature) ? initialHash.feature : isFeature(storedFeature) ? storedFeature : "chord");
  if (initialHash.feature === "learn" && initialHash.q) openLearnUnit(initialHash.q);
  // 初始化完成：首屏加载动画淡出（index.html 里的 #page-loading）
  const pageLoading = document.getElementById('page-loading');
  if (pageLoading) { pageLoading.classList.add('is-done'); setTimeout(() => pageLoading.remove(), 450); }
});
