#!/usr/bin/env python3
"""Build set_classes_data.js from the raw wikitext of Wikipedia's "List of set classes".

Usage: curl "https://en.wikipedia.org/w/index.php?title=List_of_set_classes&action=raw" > list.txt
       python3 scripts/build-set-classes.py list.txt > set_classes_data.js
Source: https://en.wikipedia.org/wiki/List_of_set_classes  (CC BY-SA 4.0)  ref:wiki-set-classes
"""
import json, re, sys

text = open(sys.argv[1], encoding='utf-8').read()
start = text.index('== List ==')
rows = text[start:].split('\n|-')
PC = {'T': 10, 'E': 11}

def pcs(s):
    return [PC.get(x.strip(), None) if x.strip() in PC else int(x) for x in s.split(',') if x.strip() != '']

entries = []
last_vector = None
for row in rows:
    m = re.search(r"\{\{Visible anchor\|([0-9]+-Z?[0-9]+[AB]?)\}\}", row)
    if not m:
        continue
    name = m.group(1)
    prime = re.search(r"\{\{Mono\|\[([0-9TE,]*)\]\}\}", row)
    forte_alt = re.search(r"\{\{efn\|Forte [^:]+: \{\{Small\|\{\{Mono\|\[([0-9TE,]*)\]\}\}\}\}\}\}", row)
    vectors = re.findall(r"\{\{Mono\|<([0-9TEC,]+)>\}\}", row)
    if vectors:
        # 表中向量用 T = 10、E = 11、C = 12
        last_vector = [{'T': 10, 'E': 11, 'C': 12}.get(v, None) if v in 'TEC' else int(v) for v in vectors[0].split(',')]
    entry = {'name': name, 'prime': pcs(prime.group(1)) if prime else [], 'vector': last_vector}
    if forte_alt:
        entry['fortePrime'] = pcs(forte_alt.group(1))
    entries.append(entry)

print('// 由 scripts/build-set-classes.py 从维基百科「List of set classes」原始 wikitext 生成，请勿手改。')
print('// 原型用 Rahn 写法；两种方法结果不同处，fortePrime 为 Forte 写法。A/B 后缀表示原型与其倒影。ref:wiki-set-classes')
print('export const SET_CLASSES = ' + json.dumps(entries, separators=(',', ':')) + ';')
