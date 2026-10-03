// 每个工具面板对应的入口关卡（工具顶部的"看不懂？玩教程"按钮）。
// 单独放在一个小文件里：首屏只需要这张表，不必先把全部关卡内容下载下来（learn_content.js 很大）。
export const FEATURE_UNIT = {
  staff: 'staff', chord: 'voicing', classical: 'roman', figured: 'figured', neo: 'neoriemann', circle: 'circle',
  blues: 'blues', cst: 'chordscale', jazzmore: 'jazzvoicing', lcc: 'lcc',
  counterpoint: 'counterpoint', nonchord: 'nonchord', harmonize: 'functions',
  form: 'form', rhythm: 'rhythm', progression: 'cadences', ear: 'intervals', instruments: 'instruments', fretboard: 'fretboard',
  chinese: 'heptatonic', micro: 'micro', temperaments: 'temperaments', world: 'world',
  posttonal: 'posttonal', chordsymbols: 'symbols', ref: 'modes', other: 'keycenter',
};
