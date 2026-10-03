#!/usr/bin/env python3
"""Build instrument_ranges_data.js from Wikipedia's "Vocal and instrumental pitch ranges" timeline template.

Usage: curl "https://en.wikipedia.org/w/index.php?title=Template:Vocal_and_instrumental_pitch_ranges&action=raw" > tpl.txt
       python3 scripts/build-instrument-ranges.py tpl.txt > instrument_ranges_data.js
Source: https://en.wikipedia.org/wiki/Template:Vocal_and_instrumental_pitch_ranges  (CC BY-SA 4.0)  ref:wiki-pitch-ranges

The template draws bars between named positions ($c1 = middle C, 72 units per octave, 6 per semitone).
Only natural notes are defined there, so every range is an approximation to the nearest natural note.
"""
import json, re, sys

text = open(sys.argv[1], encoding='utf-8').read()
defs = {m.group(1): int(m.group(2)) for m in re.finditer(r'Define \$(\w+)\s*=\s*(\d+)', text)}
MIDDLE_C = defs['c1']
NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

def midi(position):
    units = defs[position] - MIDDLE_C
    assert units % 6 == 0, position
    return 60 + units // 6

ranges = {}
for m in re.finditer(r'color:b\s+from:\$(\w+)\s+till:\$(\w+)\s+text:(.*)', text):
    low, high, label = m.groups()
    label = re.sub(r'\[\[([^|\]]*\|)?([^\]]*)\]\]', r'\2', label).strip().rstrip('*')
    ranges[label] = [midi(low), midi(high)]

print('// 由 scripts/build-instrument-ranges.py 生成，请勿手改')
print('// 来源：维基百科 Template:Vocal and instrumental pitch ranges（CC BY-SA 4.0） ref:wiki-pitch-ranges')
print('// 实际发音的音域，[最低 MIDI, 最高 MIDI]；该图只标到自然音，因此是近似值')
print('export const PITCH_RANGES = ' + json.dumps(ranges, ensure_ascii=False, indent=0).replace('\n', ' ') + ';')
