// 四部和声检查的结果：文字说明（中日英）和画在谱面上的红色标记
// 规则本身见 satb_check.js（出处也在那里）
const SVG_NS = 'http://www.w3.org/2000/svg';
export const PART_NAMES = {
  zh: { soprano: '女高', alto: '女中', tenor: '男高', bass: '男低' },
  ja: { soprano: 'ソプラノ', alto: 'アルト', tenor: 'テノール', bass: 'バス' },
  en: { soprano: 'soprano', alto: 'alto', tenor: 'tenor', bass: 'bass' },
};
export const RULES = {
  zh: { range: '超出音域', crossing: '声部交叉', spacing: '间距太大', 'doubled-leading': '重复了导音', 'doubled-seventh': '重复了和弦七音', 'parallel-5': '平行五度', 'parallel-8': '平行八度（或同度）', direct: '外声部同向进入完全协和（直接五八度，提醒）', overlap: '声部超越', 'leading-tone': '导音没有解决到主音', seventh: '七音没有往下级进解决' },
  ja: { range: '音域外', crossing: '声部の交差', spacing: '間隔が広すぎる', 'doubled-leading': '導音の重複', 'doubled-seventh': '第 7 音の重複', 'parallel-5': '連続 5 度', 'parallel-8': '連続 8 度（同度）', direct: '外声の並達 5・8 度（注意）', overlap: '声部の超越', 'leading-tone': '導音が主音へ解決していない', seventh: '第 7 音が順次下行で解決していない' },
  en: { range: 'out of range', crossing: 'voice crossing', spacing: 'spacing too wide', 'doubled-leading': 'doubled leading tone', 'doubled-seventh': 'doubled chordal seventh', 'parallel-5': 'parallel fifths', 'parallel-8': 'parallel octaves (or unisons)', direct: 'outer voices move into a perfect interval by similar motion (direct 5th/8ve, warning)', overlap: 'voice overlap', 'leading-tone': 'leading tone does not resolve to the tonic', seventh: 'seventh does not resolve down by step' },
};
const TEXT = {
  zh: { ok: '没有发现平行五八度、声部交叉、间距、重复或解决上的问题。', chord: (n) => `第 ${n} 个和弦`, between: (a, b) => `第 ${a}→${b} 个和弦` },
  ja: { ok: '連続 5・8 度、交差、間隔、重複、解決の問題は見つかりませんでした。', chord: (n) => `第 ${n} 和音`, between: (a, b) => `第 ${a}→${b} 和音` },
  en: { ok: 'No parallels, crossing, spacing, doubling or resolution problems found.', chord: (n) => `chord ${n}`, between: (a, b) => `chords ${a}→${b}` },
};

/** 问题列表（HTML 元素）；cite(id) 返回引用链接 */
export function issueList(issues, lang = 'zh', cite = null) {
  const doc = globalThis.document;
  const box = doc.createElement('div');
  box.className = 'satb-issues';
  const t = TEXT[lang] || TEXT.zh; const r = RULES[lang] || RULES.zh; const names = PART_NAMES[lang] || PART_NAMES.zh;
  if (!issues.length) { const p = doc.createElement('p'); p.className = 'satb-ok'; p.textContent = t.ok; box.appendChild(p); return box; }
  const list = doc.createElement('ol');
  issues.forEach((issue) => {
    const li = doc.createElement('li');
    li.className = `satb-issue is-${issue.severity}`;
    const where = issue.to !== undefined ? t.between(issue.at + 1, issue.to + 1) : t.chord(issue.at + 1);
    li.textContent = `${where} · ${issue.parts.map((p) => names[p]).join(lang === 'en' ? ' & ' : '、')} · ${r[issue.rule] || issue.rule} `;
    if (cite) li.appendChild(cite(issue.ref));
    list.appendChild(li);
  });
  box.appendChild(list);
  return box;
}

/**
 * 在谱面上画标记：headAt(和弦序号, 声部序号 0=男低…3=女高) 返回 {x, y}（找不到返回 null）
 * 两个和弦之间的问题（平行、导音、七音……）画连线；单个和弦的问题画圆圈
 */
export function drawIssueMarks(svg, issues, headAt) {
  svg.querySelector('.satb-marks')?.remove();
  const layer = globalThis.document.createElementNS(SVG_NS, 'g');
  layer.setAttribute('class', 'satb-marks');
  const PART_INDEX = { bass: 0, tenor: 1, alto: 2, soprano: 3 };
  const make = (tag, attrs) => { const el = globalThis.document.createElementNS(SVG_NS, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v))); layer.appendChild(el); return el; };
  issues.forEach((issue) => {
    issue.parts.forEach((part) => {
      const a = headAt(issue.at, PART_INDEX[part]);
      if (!a) return;
      if (issue.to !== undefined) {
        const b = headAt(issue.to, PART_INDEX[part]);
        if (b) make('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: `satb-line is-${issue.severity}` });
      } else {
        make('circle', { cx: a.x, cy: a.y, r: 9, class: `satb-ring is-${issue.severity}` });
      }
    });
  });
  svg.appendChild(layer);
  return layer;
}
