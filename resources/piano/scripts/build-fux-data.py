#!/usr/bin/env python3
"""Convert MarkGotham/species Part I (Fux, Gradus ad Parnassum, two voices) into fux_species_data.js.

Usage: python3 scripts/build-fux-data.py I-Solutions.mxl data.tsv > fux_species_data.js
Source (MIT): https://github.com/MarkGotham/species  (ref:gotham-species)
"""
import csv, json, sys, zipfile
import xml.etree.ElementTree as ET

mxl_path, tsv_path = sys.argv[1], sys.argv[2]
archive = zipfile.ZipFile(mxl_path)
xml_name = next(n for n in archive.namelist() if n.endswith('.xml') and not n.startswith('META-INF'))
root = ET.fromstring(archive.read(xml_name))
parts = root.findall('part')

ALTER = {-2: 'bb', -1: 'b', 0: '', 1: '#', 2: '##'}

def read_part(part):
    measures = {}
    divisions = 1
    for measure in part.findall('measure'):
        number = int(measure.get('number'))
        attributes = measure.find('attributes')
        if attributes is not None and attributes.findtext('divisions'):
            divisions = int(attributes.findtext('divisions'))
        notes = []
        for note in measure.findall('note'):
            if note.find('chord') is not None:
                continue
            quarters = int(note.findtext('duration')) / divisions
            ties = [t.get('type') for t in note.findall('tie')]
            pitch = note.find('pitch')
            name = None
            if pitch is not None:
                alter = int(float(pitch.findtext('alter') or 0))
                name = f"{pitch.findtext('step')}{ALTER[alter]}{pitch.findtext('octave')}"
            item = {'p': name, 'd': quarters}
            if 'stop' in ties:
                item['tieIn'] = True
            if 'start' in ties:
                item['tieOut'] = True
            notes.append(item)
        measures[number] = notes
    return measures

upper, lower = read_part(parts[0]), read_part(parts[1])
exercises = []
with open(tsv_path, newline='') as handle:
    for row in csv.DictReader(handle, delimiter='\t'):
        start, end = int(row['Measure start']), int(row['Measure end'])
        cantus = row['Cantus firmus'].strip().lower()
        cf_part, cp_part = (lower, upper) if cantus == 'lower' else (upper, lower)
        bars = []
        for number in range(start, end + 1):
            cf_notes = [n for n in cf_part[number] if n['p']]
            bars.append({'cf': cf_notes[0]['p'] if cf_notes else None, 'cp': cp_part[number]})
        exercises.append({
            'figure': row['Figure'].strip(),
            'species': int(row['Species']),
            'final': row['Modal final'].strip().upper(),
            'cantus': cantus,
            'bars': bars,
        })

print('// 由 scripts/build-fux-data.py 自动生成，请勿手改。')
print('// Fux《Gradus ad Parnassum》第一部分（二声部）全部 46 个练习的 Fux 本人解答。')
print('// 数据来源：Mark Gotham, MarkGotham/species（MIT License）ref:gotham-species')
print('// 上游版权：Copyright (c) 2026 Mark Gotham；初始转录：Jay Wilson。')
print('// 代码 MIT / 渲染乐谱 CC0，许可范围与转换说明：../../Licenses/README.md')
print('// 图号对应 Norton/Mann 1965 现代版；cp 中 d 为四分音符单位的时值，p 为 null 表示休止。')
print('export const FUX_TWO_VOICE = ' + json.dumps(exercises, ensure_ascii=False, separators=(',', ':')) + ';')
