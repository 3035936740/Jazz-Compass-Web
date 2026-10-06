// 旋律大小调按方向显示七声音阶与其三和弦。
// 旋律小调：ref:omt2e-minor；旋律大调：ref:wiki-major-scale。
export function melodicCircleScale(quality, direction) {
  const intervals = quality === 'major'
    ? direction === 'descending' ? [0, 2, 4, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11]
    : direction === 'descending' ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 3, 5, 7, 9, 11];
  const types = { '4,7': 'maj', '3,7': 'm', '3,6': 'dim', '4,8': 'aug' };
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const chordTypes = intervals.map((root, i) => {
    const offsets = [2, 4].map((offset) => (intervals[(i + offset) % 7] - root + 12) % 12);
    return types[offsets.join(',')];
  });
  const degreeNums = chordTypes.map((type, i) => type === 'maj' ? romans[i] : type === 'aug' ? `${romans[i]}+` : `${romans[i].toLowerCase()}${type === 'dim' ? '°' : ''}`);
  return { intervals, chordTypes, degreeNums };
}
