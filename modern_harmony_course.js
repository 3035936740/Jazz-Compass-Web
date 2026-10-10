// ref:koozin-planing
// Original teaching examples; definitions checked against the sources below.
// ref:rubin-nonfunctional ref:arndt-tonality ref:ircam-spectral ref:ircam-spectrum ref:gann-ji ref:gann-ji-reasons
// 背景与概念（modern_harmony_concepts.js）：ref:koozin-planing ref:wiki-parallel-harmony ref:wiki-chromatic-mediant ref:wiki-polytonality ref:wiki-petrushka-chord ref:wiki-octatonic ref:wiki-atonality ref:omt2e-normal-order ref:wiki-spectral-music ref:wiki-limit ref:wiki-neutral-third
export const t = (zh, ja, en) => ({ zh, ja, en });
export const cents = (ratio) => 1200 * Math.log2(ratio);
export const midiForHz = (hz) => 69 + 12 * Math.log2(hz / 440);
export const chord = (...notes) => ({ bpm: 60, events: [{ at: 0, notes, beats: 1.5 }] });
export const chain = (...groups) => ({ bpm: 90, events: groups.map((notes, i) => ({ at: i * 1.5, notes: [].concat(notes), beats: 1.3 })) });
export const frequencies = (...hz) => chord(...hz.map(midiForHz));
export const layers = (low, high) => ({ bpm: 100, events: [...low.map((n, i) => ({ at: i * 2, notes: [n], beats: 1.8, layer: 'low' })), ...high.map((n, i) => ({ at: i, notes: [n], beats: .85, layer: 'high' }))].sort((a, b) => a.at - b.at) });
import { makeModernStages } from './modern_harmony_guides.js?v=20261008-beginner2';
import { MODERN_CONCEPTS, conceptVisual, conceptTour } from './modern_harmony_concepts.js?v=20261010-talk1';
const stages = makeModernStages({ t, chord, chain, frequencies, layers, midiForHz });
for (const id of ['spectralharmony','microtonalharmony']) stages[id].forEach(stage => { stage.frequencyDiagram = true; });
export const TOPICS = [
  {
    "id": "nonfunctional",
    "b": "B6-6",
    "feature": "nonfunctional",
    "icon": "∥",
    "ref": [
      "rubin-nonfunctional",
      "arndt-tonality",
      "koozin-planing"
    ],
    "title": {
      "zh": "非功能和声",
      "ja": "非機能和声",
      "en": "Nonfunctional harmony"
    },
    "blurb": {
      "zh": "先听连接，再分清中心与功能",
      "ja": "つながりを聴き、中心と機能を分ける",
      "en": "Hear connections; separate centre from function"
    }
  },
  {
    "id": "polytonality",
    "b": "B6-7",
    "feature": "polytonality",
    "icon": "⊕",
    "ref": [
      "arndt-tonality"
    ],
    "title": {
      "zh": "多调性",
      "ja": "多調性",
      "en": "Polytonality"
    },
    "blurb": {
      "zh": "同时听见各层的中心",
      "ja": "各層の中心を同時に聴く",
      "en": "Hear the centres of simultaneous layers"
    }
  },
  {
    "id": "atonality",
    "b": "B6-8",
    "feature": "atonality",
    "icon": "∅",
    "ref": [
      "arndt-tonality"
    ],
    "title": {
      "zh": "无调性",
      "ja": "無調性",
      "en": "Atonality"
    },
    "blurb": {
      "zh": "没有主音，也能有清楚的组织",
      "ja": "主音がなくても組織はある",
      "en": "Organisation without a tonic"
    }
  },
  {
    "id": "spectralharmony",
    "b": "B6-9",
    "feature": "spectralharmony",
    "icon": "ƒ",
    "ref": [
      "ircam-spectral",
      "ircam-spectrum",
      "gann-ji"
    ],
    "title": {
      "zh": "频谱和声",
      "ja": "スペクトル和声",
      "en": "Spectral harmony"
    },
    "blurb": {
      "zh": "从频率模型到和声与音色",
      "ja": "周波数モデルから和声と音色へ",
      "en": "From frequency models to harmony and timbre"
    }
  },
  {
    "id": "microtonalharmony",
    "b": "B6-10",
    "feature": "microtonalharmony",
    "icon": "±",
    "ref": [
      "gann-ji",
      "gann-ji-reasons"
    ],
    "title": {
      "zh": "微分音和声：配置与连接",
      "ja": "微分音和声：配置と連結",
      "en": "Microtonal harmony: voicing and connections"
    },
    "blurb": {
      "zh": "把比例、平均律和共同音写成方案",
      "ja": "比・平均律・共通音を設計にする",
      "en": "Design with ratios, EDOs and common tones"
    }
  }
].map(topic => ({ ...topic, stages: stages[topic.id] }));
// These listening/application lessons revisit skills already taught in the core route.
// Keep IDs and all advanced/mixed slots so existing records and tool links still work.
export const MODERN_SIDE_PARENTS = { atonality: 'pitchclass', spectralharmony: 'micro', microtonalharmony: 'microharmony' };
export const A_MODERN_ORDER = ['nonfunctional','polytonality','posttonal','pitchclass','collections','setclass','twelvetone','micro','microharmony'];
export const B_MODERN_ORDER = ['B6-6','B6-7','B6-1','B6-8','B6-2','B6-3','B6-4','B6-5','B6-9','B6-10'];
export const generatorOf = (topic) => ({ nonfunctional: 'modernPlaning', polytonality: 'modernLayers', atonality: 'modernMotive', spectralharmony: 'spectralPartial', microtonalharmony: 'microChord' })[topic.id];
export function stageVisual(stage) {
  return { kind: 'modern', rows: stage.labels.map((label, i) => ({ label, frequencies: Boolean(stage.frequencyDiagram), events: stage.sounds[i].events.filter(e => e.targets?.includes('c'+i+'-0')).map(e => ({at:e.at,notes:e.notes,beats:e.beats,layer:e.layer})) })) };
}
export function stageGuide(topic, index) {
  const stage = topic.stages[index];
  return { type: 'guide', beginner: true, ref: topic.ref, title: stage.title, steps: stage.steps, visual: stageVisual(stage),
    tour: stage.steps.map((_, i) => [{ at: [...new Set(stage.sounds[i].events.flatMap(e => e.targets))], label: stage.labels[i] }]),
    demo: stage.sounds[0], stepDemos: stage.steps.map((_, i) => stage.sounds[Math.min(i, stage.sounds.length - 1)]), tool: { feature: topic.feature } };
}
/** 背景与概念讲解卡：关键词图（每步一行），讲到哪一步圈出哪一行 */
function conceptGuide(topic) {
  const card = MODERN_CONCEPTS[topic.id].guide;
  return { ...card, visual: conceptVisual(topic.id), tour: conceptTour(topic.id), tool: { feature: topic.feature } };
}
const G = (topic, stage, count) => ({ type: 'gen', gen: generatorOf(topic), params: { stage }, count, ref: topic.ref });
const ALL_MODERN_UNITS = TOPICS.map((topic) => ({ id: topic.id, section: 'modern', feature: topic.feature, icon: topic.icon, title: topic.title, blurb: topic.blurb,
  // 追加在原有题卡之后（保持原题号，Boss 战与续玩记录按题号引用）：背景与概念讲解卡 + 概念题（modern_harmony_concepts.js）
  cards: [stageGuide(topic, 0), ...[0,1,2,3].map(() => G(topic, 0, 1)), conceptGuide(topic), ...MODERN_CONCEPTS[topic.id].main] }));
export const MODERN_BRANCHES = Object.fromEntries(TOPICS.map((topic) => [topic.id, topic.stages.slice(1).map((stage, i) => ({ title: stage.title, cards: [stageGuide(topic, i + 1), G(topic, i + 1, 4), ...MODERN_CONCEPTS[topic.id].branches[i]] }))]));

export const MODERN_UNITS = ALL_MODERN_UNITS.filter(unit => !MODERN_SIDE_PARENTS[unit.id]);
export const MODERN_SIDES = ALL_MODERN_UNITS.filter(unit => MODERN_SIDE_PARENTS[unit.id]).map(unit => ({
  ...unit, parent: MODERN_SIDE_PARENTS[unit.id],
  prerequisites: { atonality: ['posttonal'], spectralharmony: ['harmonics'], microtonalharmony: ['micro'] }[unit.id],
  branch: MODERN_BRANCHES[unit.id],
}));
