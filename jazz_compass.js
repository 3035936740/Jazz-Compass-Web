/**
 * Jazz Compass Core Logic - ES Modules Version
 * 1:1 Translation from Python to JavaScript
 */

export class ChordConverter {
    constructor() {
        this.noteToIdx = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
            'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
            'A#': 10, 'Bb': 10, 'B': 11, 'Cb': 11, 'E#': 5, 'Fb': 4, 'B#': 0
        };
        this.idxToNote = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

        this.chordFormulas = {
            "5": [0, 7], "maj": [0, 4, 7], "major": [0, 4, 7], "M": [0, 4, 7], "minor": [0, 3, 7], "min": [0, 3, 7], "m": [0, 3, 7],
            "aug": [0, 4, 8], "dim": [0, 3, 6], "sus2": [0, 2, 7], "sus4": [0, 5, 7],
            "tri": [0, 4, 7], "mb5": [0, 3, 6], "majB5": [0, 4, 6], "Mb5": [0, 4, 6],
            "6": [0, 4, 7, 9], "m6": [0, 3, 7, 9], "6add9": [0, 4, 7, 9, 14],
            "m6add9": [0, 3, 7, 9, 14], "6sus4": [0, 5, 7, 9],
            "7": [0, 4, 7, 10], "m7": [0, 3, 7, 10], "maj7": [0, 4, 7, 11],
            "M7": [0, 4, 7, 11], "m-maj7": [0, 3, 7, 11], "m-M7": [0, 3, 7, 11],
            "7sus4": [0, 5, 7, 10], "dim7": [0, 3, 6, 9], "m7b5": [0, 3, 6, 10],
            "m7b9": [0, 3, 7, 10, 13], "7b5": [0, 4, 6, 10], "7#5": [0, 4, 8, 10],
            "7b9": [0, 4, 7, 10, 13], "7#9": [0, 4, 7, 10, 15], "7#11": [0, 4, 7, 10, 18],
            "7add11": [0, 4, 7, 10, 17], "7add13": [0, 4, 7, 10, 21], "7#5b9": [0, 4, 8, 10, 13],
            "7#5#9": [0, 4, 8, 10, 15], "7b5b9": [0, 4, 6, 10, 13],
            "9": [0, 4, 7, 10, 14], "m9": [0, 3, 7, 10, 14], "maj9": [0, 4, 7, 11, 14],
            "M9": [0, 4, 7, 11, 14], "m9-maj7": [0, 3, 7, 11, 14], "m9-M7": [0, 3, 7, 11, 14],
            "9sus4": [0, 5, 7, 10, 14], "9b5": [0, 4, 6, 10, 14], "m9b5": [0, 3, 6, 10, 14],
            "9#5": [0, 4, 8, 10, 14], "9#11": [0, 4, 7, 10, 14, 18], "9b13": [0, 4, 7, 10, 14, 20],
            "add9": [0, 4, 7, 14], "madd9": [0, 3, 7, 14],
            "11": [0, 4, 7, 10, 14, 17], "m11": [0, 3, 7, 10, 14, 17], "maj11": [0, 4, 7, 11, 14, 17],
            "M11": [0, 4, 7, 11, 14, 17], "11b9": [0, 4, 7, 10, 13, 17],
            "13": [0, 4, 7, 10, 14, 17, 21], "m13": [0, 3, 7, 10, 14, 17, 21],
            "maj13": [0, 4, 7, 11, 14, 17, 21], "M13": [0, 4, 7, 11, 14, 17, 21],
            "13b9": [0, 4, 7, 10, 13, 17, 21], "13#9": [0, 4, 7, 10, 15, 17, 21],
            "13b5b9": [0, 4, 6, 10, 13, 17, 21],
            "maj7#5": [0, 4, 8, 11], "maj7#11": [0, 4, 7, 11, 18], "maj7b5": [0, 4, 6, 11],
            "maj7add13": [0, 4, 7, 11, 21], "maj9#5": [0, 4, 8, 11, 14], "maj9#11": [0, 4, 7, 11, 14, 18],
            "maj9sus4": [0, 5, 7, 11, 14], "M7#5": [0, 4, 8, 11], "M7#11": [0, 4, 7, 11, 18],
            "M7b5": [0, 4, 6, 11], "M7add13": [0, 4, 7, 11, 21], "M9#5": [0, 4, 8, 11, 14],
            "M9#11": [0, 4, 7, 11, 14, 18], "M9sus4": [0, 5, 7, 11, 14], "m7add11": [0, 3, 7, 10, 17],
            "m7add13": [0, 3, 7, 10, 21], "m-maj7add11": [0, 3, 7, 11, 17], "m-maj7add13": [0, 3, 7, 11, 21],
            "m-maj11": [0, 3, 7, 11, 14, 17], "m-maj13": [0, 3, 7, 11, 14, 17, 21], "m-M7add11": [0, 3, 7, 11, 17],
            "m-M7add13": [0, 3, 7, 11, 21], "m-M11": [0, 3, 7, 11, 14, 17], "m-M13": [0, 3, 7, 11, 14, 17, 21],
            "augsus4": [0, 5, 8],
        };
    }

    parse(inputStr) {
        const result = this.parseAndGetNotes(inputStr);
        return typeof result === 'string' ? result : result.notes;
    }

    parseSlashChord(inputStr) {
        if (!inputStr.includes("/")) return null;
        const [chordPart, bassPart] = inputStr.split("/");
        const upperRes = this.parseAndGetNotes(chordPart);
        if (typeof upperRes === 'string') return upperRes;
        if (!(bassPart in this.noteToIdx)) throw new Error(`Invalid bass note: ${bassPart}`);

        const stdBass = this.idxToNote[this.noteToIdx[bassPart]];
        const otherNotes = upperRes.notes.filter(n => this.idxToNote[this.noteToIdx[n]] !== stdBass);
        const finalNotes = [bassPart, ...otherNotes];
        const finalOffsets = finalNotes.map(n => this.noteToIdx[n]);

        return { chord: inputStr, notes: finalNotes, offsets: finalOffsets, isSlash: true };
    }

    parseAndGetNotes(inputStr) {
        if (inputStr.includes("/")) return this.parseSlashChord(inputStr);
        const match = inputStr.match(/^([A-G][#b]?)(.*)$/);
        if (!match) throw new Error(`Unable to parse: ${inputStr}`);
        return this.getChordNotes(match[1], match[2] || "maj");
    }

    getChordNotes(root, chordType = "maj") {
        if (!(root in this.noteToIdx)) return "Invalid root";
        const rootIdx = this.noteToIdx[root];
        const offsets = this.chordFormulas[chordType] || [0, 4, 7];
        const absIndices = offsets.map(o => (rootIdx + o) % 12);
        const noteNames = absIndices.map(i => this.idxToNote[i]);
        return { chord: `${root}${chordType}`, notes: noteNames, offsets: absIndices, isSlash: false };
    }

    /** 统一处理输入：返回音符列表 */
    _ensureNotes(chordInput) {
        if (typeof chordInput === 'string') {
            const s = chordInput.trim();

            // 支持逗号分隔的音符列表："C, E, G, B"
            if (s.includes(',')) {
                const parts = s.split(',').map(p => p.trim()).filter(p => p.length > 0);
                const valid = parts.every(p => p in this.noteToIdx);
                if (valid) return parts.map(p => this.idxToNote[this.noteToIdx[p]]);
            }

            // 支持以空格分隔的纯音符列表："C E G B"
            const spaceParts = s.split(/\s+/).filter(p => p.length > 0);
            if (spaceParts.length > 1) {
                const validSpace = spaceParts.every(p => p in this.noteToIdx);
                if (validSpace) return spaceParts.map(p => this.idxToNote[this.noteToIdx[p]]);
            }

            // 否则尝试按和弦字符串解析 (如 Cmaj7, Am7 等)
            try {
                const data = this.parseAndGetNotes(s);
                return data.notes;
            } catch (e) {
                return null;
            }
        } else if (Array.isArray(chordInput)) {
            return chordInput;
        }
        return null;
    }
}

class EnhancedChordConverter extends ChordConverter {
    constructor() {
        super();
        this.intervalMap = {
            '1': 0, 'b2': 1, '2b': 1, '2': 2, '#2': 3, '2#': 3, 'b3': 3, '3b': 3, '3': 4,
            '4': 5, '#4': 6, '4#': 6, 'b5': 6, '5b': 6, '5': 7, '#5': 8, '5#': 8, 'b6': 8, '6b': 8,
            '6': 9, 'bb7': 9, '7bb': 9, '#6': 10, '6#': 10, 'b7': 10, '7b': 10, '7': 11, 'maj7': 11, '7maj': 11,
            '9': 14, 'b9': 13, '9b': 13, '#9': 15, '9#': 15, '11': 17, '#11': 18, '11#': 18, '13': 21, 'b13': 20, '13b': 20
        };
    }

    /**
     * 解析和弦字符串并获取音符
     */
    parseAndGetNotes(inputStr) {
        if (inputStr.includes("/")) {
            return this.parseSlashChord(inputStr);
        }

        // 1. 提取根音 (A-G + #/b)
        const rootMatch = inputStr.match(/^([A-G][#b]?)/);
        if (!rootMatch) {
            throw new Error(`Invalid root in: ${inputStr}`);
        }
        
        const root = rootMatch[1];
        const remaining = inputStr.slice(root.length);

        // 2. 提取修饰符 (add/omit)
        // JS 中使用 matchAll 来获取所有匹配项
        const modifierRegex = /(add|omit)\s*([#b]?\d+)/g;
        const modifiers = [...remaining.matchAll(modifierRegex)];
        
        // 3. 确定主和弦类型 (提取 add/omit 之前的部分)
        let mainTypePart = remaining.split(/add|omit/)[0].trim();
        if (!mainTypePart) {
            mainTypePart = "maj";
        }
        
        // 获取初始偏移量 (如果公式不存在，默认大三和弦)
        let offsets = [...(this.chordFormulas[mainTypePart] || [0, 4, 7])];

        // 4. 处理修饰符
        for (const match of modifiers) {
            const action = match[1]; // "add" 或 "omit"
            const interval = match[2]; // 例如 "9" 或 "b7"
            
            const normInterval = this._normalizeInterval(interval);
            const semitone = this.intervalMap[normInterval];
            
            if (semitone === undefined) continue;

            if (action === "add") {
                // 如果该音（八度内）不在当前偏移量中，则添加
                if (!offsets.some(o => o % 12 === semitone % 12)) {
                    offsets.push(semitone);
                }
            } else if (action === "omit") {
                // 移除所有八度内的重复音
                offsets = offsets.filter(o => o % 12 !== semitone % 12);
            }
        }

        return this._buildResult(root, mainTypePart, offsets, inputStr);
    }

    /**
     * 规范化音程格式：将 7b 转换为 b7
     */
    _normalizeInterval(interval) {
        if (interval.length > 1 && (interval.endsWith('#') || interval.endsWith('b'))) {
            return interval.slice(-1) + interval.slice(0, -1);
        }
        return interval;
    }

    /**
     * 构建最终的 JSON 结果
     */
    _buildResult(root, chordType, offsets, originalStr) {
        const rootIdx = this.noteToIdx[root];
        
        // 1. 计算绝对索引并去重 (保持相对于根音的偏移顺序)
        // 我们不直接全局 sort，而是根据 offsets 的原始逻辑或半音程关系排列
        const uniqueOffsets = [...new Set(offsets)].sort((a, b) => a - b);
        
        // 2. 映射为绝对音符索引，并确保根音（偏移量为 0 的音）排在最前
        // 如果 offsets 里没有 0（理论上不会，但为了健壮性考虑），我们手动补上
        const absIndices = uniqueOffsets.map(o => (rootIdx + o) % 12);
        
        // 3. 转换为音符名称
        const noteNames = absIndices.map(i => this.idxToNote[i]);
        
        return {
            "chord": originalStr,
            "notes": noteNames,    // 这里的第一个音现在确定是 root 了
            "offsets": absIndices, // 对应的绝对索引
            "is_slash": false
        };
    }

    /**
     * 统一输入处理：返回音符列表
     */
    _ensureNotesAndRoot(chordInput) {
        if (typeof chordInput === 'string') {
            const data = this.parseAndGetNotes(chordInput);
            return data.notes;
        } else if (Array.isArray(chordInput)) {
            return [...chordInput];
        }
        return null;
    }
}

export class BluesToolkit {
    constructor() {
        this.scaleMetadata = {
            "Minor Blues": { 
                "intervals": [0, 3, 5, 6, 7, 10], 
                "blue_notes": [3, 6, 10] 
            },
            "Major Blues": { 
                "intervals": [0, 2, 3, 4, 7, 9], 
                "blue_notes": [3] 
            },
            "Mixolydian Blues": { 
                "intervals": [0, 2, 3, 4, 5, 7, 9, 10], 
                "blue_notes": [3, 10] 
            },
            "Lydian Dominant": { 
                "intervals": [0, 2, 4, 6, 7, 9, 10], 
                "blue_notes": [6] 
            },
            "Major Pentatonic": { 
                "intervals": [0, 2, 4, 7, 9], 
                "blue_notes": [] 
            },
            "Minor Pentatonic": { 
                "intervals": [0, 3, 5, 7, 10], 
                "blue_notes": [] 
            },
        };
    }

    /**
    * 增强版：计算音阶音符,并标注它们与当前和弦的关系
    */
    _getScaleDetails(root, scaleName, chordOffsets) {
        const converter = new EnhancedChordConverter();
        const meta = this.scaleMetadata[scaleName] || { "intervals": [] };
        const rootIdx = converter.noteToIdx[root];
        
        const detailedNotes = [];
        const intervals = meta["intervals"] || [];
        const blueNotes = meta["blue_notes"] || [];

        for (const i of intervals) {
            // 计算音符名称
            const noteName = converter.idxToNote[(rootIdx + i) % 12];
            const tags = [];
            
            // 标注：蓝调音 (BLUE)
            if (blueNotes.includes(i)) {
                tags.push("BLUE");
            }
            
            // 标注：和弦内音 (CHORD_TONE) 或 张力音 (TENSION)
            if (chordOffsets.has(i)) {
                tags.push("CHORD_TONE");
            } else {
                tags.push("TENSION");
            }
            
            detailedNotes.append({
                "note": noteName,
                "role": tags.join("/")
            });
        }
        return detailedNotes;
    }

    /**
     * 根据根音和音阶名称计算具体的音符名称
     */
    _calculateScaleNotes(root, scaleName) {
        const converter = new EnhancedChordConverter();
        
        // 检查音阶名称是否存在于元数据中
        if (!this.scaleMetadata[scaleName]) {
            return [];
        }

        const rootIdx = converter.noteToIdx[root];
        const intervals = this.scaleMetadata[scaleName].intervals;

        // 将半音程转换为具体的音符名称 (通过取模 12 确保在八度循环内)
        return intervals.map(i => {
            const noteIdx = (rootIdx + i) % 12;
            return converter.idxToNote[noteIdx];
        });
    }

    /**
     * 推荐调性音阶,包括具体的音符
     * 返回格式: [{ name: "音阶名", reason: "推荐原因", notes: [音符列表] }]
     */
    suggestForChord(chordInput) {
        const converter = new EnhancedChordConverter();
        const notes = converter._ensureNotesAndRoot(chordInput);
        if (!notes || notes.length === 0) return [];

        const root = notes[0];
        const rootIdx = converter.noteToIdx[root];
        
        // 计算相对于根音的半音偏移量集合
        const chordOffsets = new Set(notes.map(n => (converter.noteToIdx[n] - rootIdx + 12) % 12));

        // 计算关系小调根音 (减去3个半音)
        const relMinorRootIdx = (rootIdx - 3 + 12) % 12;
        const relMinorRoot = converter.idxToNote[relMinorRootIdx];

        const rawSuggestions = [];

        // 逻辑特征判断
        const hasMajor3rd = chordOffsets.has(4);
        const hasB7 = chordOffsets.has(10);
        const hasMinor3rd = chordOffsets.has(3);

        if (hasMajor3rd && hasB7) {
            // 属七和弦的情况 (Dominant 7th)
            rawSuggestions.push([root, "Mixolydian Blues", "Parallel: Classic jazz-blues sound"]);
            rawSuggestions.push([root, "Minor Blues", "Parallel: 'Blue' tension over major chord"]);
            rawSuggestions.push([relMinorRoot, "Minor Pentatonic", "Relative: Sweet country-blues color"]);
        } else if (hasMinor3rd) {
            // 小调和弦的情况 (Minor chord)
            rawSuggestions.push([root, "Minor Blues", "Parallel: Standard minor blues"]);
            rawSuggestions.push([root, "Minor Pentatonic", "Parallel: Pure minor sound"]);
        } else {
            // 其他情况 (默认大调/中性)
            rawSuggestions.push([root, "Major Pentatonic", "Neutral: Bright and open"]);
        }

        // 封装最终结果,包含音符预览
        return rawSuggestions.map(([sRoot, sType, reason]) => {
            const scaleNotes = this._calculateScaleNotes(sRoot, sType);
            return {
                "name": `${sRoot} ${sType}`,
                "reason": reason,
                "notes": scaleNotes
            };
        });
    }

    /**
     * 进阶建议：在基础推荐的基础上,增加“进阶替代”五声音阶
     * 例如：在 Cmaj7 上推荐 G 大调五声音阶以获取 Lydian (#11) 色彩
     */
    suggestAdvanced(chordInput) {
        const converter = new EnhancedChordConverter();
        const notes = converter._ensureNotesAndRoot(chordInput);
        if (!notes || notes.length === 0) return [];

        const root = notes[0];
        const rootIdx = converter.noteToIdx[root];
        
        // 计算偏移量集合
        const chordOffsets = new Set(notes.map(n => (converter.noteToIdx[n] - rootIdx + 12) % 12));
        
        // 获取现有的基础推荐
        let recommendations = this.suggestForChord(chordInput);

        // --- 添加进阶爵士五声音阶替代逻辑 ---

        // 1. 大七和弦 (Major 7th chord)
        if (chordOffsets.has(11)) {
            // 推荐从五级开始的大调五声音阶 (如 Cmaj7 弹 G Pent) -> 产生 9, #11, 13 效果
            const gRootIdx = (rootIdx + 7) % 12;
            const gRoot = converter.idxToNote[gRootIdx];
            recommendations.push({
                "name": `${gRoot} Major Pentatonic`,
                "reason": "Substitution: Provides Lydian (#11) color",
                "notes": this._calculateScaleNotes(gRoot, "Major Pentatonic")
            });
        }

        // 2. 小七和弦 (Minor 7th chord)
        else if (chordOffsets.has(3) && chordOffsets.has(10)) {
            // 推荐从三级开始的大调五声音阶 (如 Am7 弹 C Pent) -> 产生自然小调 (Aeolian) 质感
            const b3RootIdx = (rootIdx + 3) % 12;
            const b3Root = converter.idxToNote[b3RootIdx];
            recommendations.push({
                "name": `${b3Root} Major Pentatonic`,
                "reason": "Substitution: Smooth Aeolian texture",
                "notes": this._calculateScaleNotes(b3Root, "Major Pentatonic")
            });
        }

        return recommendations;
    }

    /**
     * 分析音阶在特定和弦上的听感风格
     * @param {Array} scaleNotes - 推荐音阶中的音符列表
     * @param {Array} chordNotes - 当前和弦中的音符列表
     */
    analyzeImprovFeel(scaleNotes, chordNotes) {
        const scaleSet = new Set(scaleNotes);
        const chordSet = new Set(chordNotes);
        
        // 1. 识别音阶中的“张力音”(不在和弦内的音符)
        const tensions = [...scaleSet].filter(note => !chordSet.has(note));
        
        // 2. 计算张力得分
        const tensionScore = tensions.length;
        
        // 3. 评价逻辑
        let feeling = "";
        let description = "";
        let descriptionId = 0;

        if (tensionScore <= 1) {
            feeling = "Safe & Sweet";
            description = "Consonant and sweet — well suited for pop and folk-blues.";
            descriptionId = 1;
        } else if (tensionScore <= 3) {
            feeling = "Soulful & Balanced";
            description = "Classic blues character — tension and resolution are well balanced.";
            descriptionId = 2;
        } else if (tensionScore <= 5) {
            feeling = "Spicy & Jazzy";
            description = "Higher tension — evokes bebop and modern jazz-blues characteristics.";
            descriptionId = 3;
        } else {
            feeling = "Experimental / Outside";
            description = "Highly dissonant and edgy — creates strong outside colors and tension.";
            descriptionId = 4;
        }

        return {
            "feeling": feeling,
            "spiciness_level": tensionScore,
            "description": description,
            "descriptionId": descriptionId,
            "tension_notes": tensions
        };
    }

    /**
     * 带有感知分析的完整推荐
     * @param {string|Array} chordInput - 和弦输入
     */
    suggestWithFeel(chordInput) {
        const converter = new EnhancedChordConverter();
        const notes = converter._ensureNotesAndRoot(chordInput);
        if (!notes || notes.length === 0) return [];
        
        const root = notes[0];
        
        // 假设这里我们推荐几种不同风格的音阶
        const suggestions = [
            [root, "Major Pentatonic"],
            [root, "Minor Blues"],
            [root, "Lydian Dominant"]
        ];
        
        const report = [];
        for (const [sRoot, sName] of suggestions) {
            if (this.scaleMetadata[sName]) {
                const sNotes = this._calculateScaleNotes(sRoot, sName);
                const feel = this.analyzeImprovFeel(sNotes, notes);
                
                report.push({
                    "scale": `${sRoot} ${sName}`,
                    "notes": sNotes,
                    "feel": feel
                });
            }
        }
        return report;
    }
}

export class CSTAnalyzer {
    constructor() {
        this.handleNotes = { "Cb": "B", "C#": "Db", "D#": "Eb", "E#": "F", "Fb": "E", "F#": "Gb", "G#": "Ab", "A#": "Bb", "B#": "C" };
        this.notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
        this.noteToVal = Object.fromEntries(this.notes.map((n, i) => [n, i]));
        this.circleOfFifths = ['Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B'];

        this.scaleDefinitions = {
            "Ionian (Major)": [0, 2, 4, 5, 7, 9, 11], "Dorian": [0, 2, 3, 5, 7, 9, 10], "Phrygian": [0, 1, 3, 5, 7, 8, 10],
            "Lydian": [0, 2, 4, 6, 7, 9, 11], "Mixolydian": [0, 2, 4, 5, 7, 9, 10], "Aeolian (Minor)": [0, 2, 3, 5, 7, 8, 10],
            "Locrian": [0, 1, 3, 5, 6, 8, 10], "Neapolitan Major": [0, 1, 3, 5, 7, 9, 11], "Harmonic Major": [0, 2, 4, 5, 7, 8, 11],
            "Melodic Major (Desc)": [0, 2, 4, 5, 7, 8, 10], "Neapolitan Minor": [0, 1, 3, 5, 7, 8, 11], "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
            "Melodic Minor": [0, 2, 3, 5, 7, 9, 11], "Phrygian Dominant": [0, 1, 4, 5, 7, 8, 10], "Altered (Super Locrian)": [0, 1, 3, 4, 6, 8, 10],
            "Lydian Dominant": [0, 2, 4, 6, 7, 9, 10], "Lydian Augmented": [0, 2, 4, 6, 8, 9, 11], "Diminished (H-W)": [0, 1, 3, 4, 6, 7, 9, 10],
            "Dominant Diminished (W-H)": [0, 2, 3, 5, 6, 8, 9, 11], "Whole Tone": [0, 2, 4, 6, 8, 10], "Blues Major": [0, 3, 5, 6, 7, 10],
            "Blues Minor": [0, 2, 3, 4, 7, 9], "Bebop Dominant": [0, 2, 4, 5, 7, 9, 10, 11], "Bebop Major": [0, 2, 4, 5, 7, 8, 9, 11],
            "Gong Mode (Gong)": [0, 2, 4, 7, 9], "Shang Mode (Shang)": [0, 2, 5, 7, 10], "Jue Mode (Jue)": [0, 3, 5, 8, 10],
            "Zhi Mode (Zhi)": [0, 2, 5, 7, 9], "Yu Mode (Yu)": [0, 3, 5, 7, 10], "Japan Major": [0, 1, 5, 7, 10],
            "Japan Minor": [0, 2, 3, 7, 8], "Hungarian Minor": [0, 2, 3, 6, 7, 8, 11], "Egypt Scale": [0, 1, 3, 4, 7, 8, 10]
        };
    }

    scaleNotes(...args) {
        let root, scaleName;
        if (args.length === 1) [root, scaleName] = args[0].split(/ (.*)/).filter(item => item !== "");
        else [root, scaleName] = args;

        if (!(scaleName in this.scaleDefinitions)) throw new Error(`Scale ${scaleName} not found`);
        return this.getScaleNotes(root, this.scaleDefinitions[scaleName]);
    }

    _getRelativeFifthsPos(root, note) {
        const r = this.handleNotes[root] || root;
        const n = this.handleNotes[note] || note;
        return this.circleOfFifths.indexOf(n) - this.circleOfFifths.indexOf(r);
    }

    getScaleNotes(root, intervals) {
        const rootIdx = this.notes.indexOf(root);
        return new Set(intervals.map(i => this.notes[(rootIdx + i) % 12]));
    }

    analyzeTensions(chordNotes, scaleFullName) {
        const sNotes = this.scaleNotes(scaleFullName);
        const chordVals = chordNotes.map(n => this.noteToVal[this.handleNotes[n] || n]);
        const results = { tensions: [], avoid: [] };

        sNotes.forEach(sNote => {
            if (chordNotes.includes(sNote)) return;
            const sVal = this.noteToVal[this.handleNotes[sNote] || sNote];
            const isAvoid = chordVals.some(cVal => (sVal - cVal + 12) % 12 === 1);
            if (isAvoid) results.avoid.push(sNote);
            else results.tensions.push(sNote);
        });
        return results;
    }

    calculateBrightness(root, scaleNotes) {
        let totalPos = 0, hasMajor3rd = false;
        const rootVal = this.noteToVal[this.handleNotes[root] || root];
        scaleNotes.forEach(n => {
            totalPos += this._getRelativeFifthsPos(root, n);
            if ((this.noteToVal[this.handleNotes[n] || n] - rootVal + 12) % 12 === 4) hasMajor3rd = true;
        });
        let score = totalPos / scaleNotes.size;
        if (hasMajor3rd) score += 5.0;
        return Number(score.toFixed(2));
    }

    analyzeCST(chordNotes) {
        const normalizedChord = chordNotes.map(n => this.handleNotes[n] || n);
        const chordSet = new Set(normalizedChord);
        const results = [];
        this.notes.forEach(root => {
            Object.entries(this.scaleDefinitions).forEach(([name, intervals]) => {
                const sNotes = this.getScaleNotes(root, intervals);
                if ([...chordSet].every(n => sNotes.has(n))) results.push(`${root} ${name}`);
            });
        });
        return results;
    }
}

export class LCCAnalyzer {
    constructor() {
        this.handleNotes = { "Cb": "B", "C#": "Db", "D#": "Eb", "E#": "F", "Fb": "E", "F#": "Gb", "G#": "Ab", "A#": "Bb", "B#": "C" };
        this.notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
        this.noteToVal = Object.fromEntries(this.notes.map((n, i) => [n, i]));
        this.fifthsOrder = ['Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B'];
        
        // LCC 核心音阶定义
        this.lccScales = {
            "Lydian (Fundamental)": [0, 2, 4, 6, 7, 9, 11],
            "Lydian Augmented": [0, 2, 4, 6, 8, 9, 11],
            "Lydian Diminished": [0, 2, 3, 6, 7, 9, 11],
            "Lydian b7 (Dominant)": [0, 2, 4, 6, 7, 9, 10],
            "Aux. Augmented (Whole Tone)": [0, 2, 4, 6, 8, 10],
            "Aux. Diminished": [0, 1, 3, 4, 6, 7, 9, 10],
            "Aux. Dim. Blues": [0, 1, 3, 4, 6, 7, 9, 10]
        };
    }

    /**
     * 补全的功能：1:1 还原 Python 的 scale_notes
     * 支持两种调用：
     * 1. scaleNotes("C Lydian (Fundamental)")
     * 2. scaleNotes("C", "Lydian (Fundamental)")
     */
    scaleNotes(...args) {
        let parent, scaleName;

        if (args.length === 1) {
            // 模仿 Python 的 split(" ", 1)
            // 找到第一个空格的位置,只切分一次
            const firstSpaceIndex = args[0].indexOf(" ");
            if (firstSpaceIndex === -1) {
                throw new Error("Invalid input format. Please use 'root scale_name' format");
            }
            parent = args[0].substring(0, firstSpaceIndex);
            scaleName = args[0].substring(firstSpaceIndex + 1);
        } else if (args.length === 2) {
            [parent, scaleName] = args;
        } else {
            throw new TypeError("scaleNotes() takes 1 or 2 positional arguments");
        }

        // 获取 Lydian 主音的索引值
        if (!(parent in this.noteToVal)) {
            // 尝试处理一下可能的异名同音(如 C# -> Db)
            parent = this.handleNotes[parent] || parent;
        }
        
        const pVal = this.noteToVal[parent];
        if (pVal === undefined) throw new Error(`Invalid parent note: ${parent}`);

        // 从 LCC 库中获取偏移量
        const intervals = this.lccScales[scaleName];
        if (!intervals) {
            throw new Error(`Not found in LCC scale library: ${scaleName}`);
        }

        // 返回转换后的音名数组 (JS 中用 Array 代替 Tuple)
        return intervals.map(i => this.notes[(pVal + i) % 12]);
    }

    _getFifthsDistance(n1, n2) {
        const idx1 = this.fifthsOrder.indexOf(this.handleNotes[n1] || n1);
        const idx2 = this.fifthsOrder.indexOf(this.handleNotes[n2] || n2);
        const dist = Math.abs(idx1 - idx2);
        return Math.min(dist, 12 - dist);
    }

    analyzeLCC(chordNotes) {
        const processed = chordNotes.map(n => this.handleNotes[n] || n);
        const chordRoot = processed[0];
        const results = [];

        this.notes.forEach(parentKey => {
            const pVal = this.noteToVal[parentKey];
            Object.entries(this.lccScales).forEach(([name, intervals]) => {
                const sVals = new Set(intervals.map(i => (pVal + i) % 12));
                if (processed.every(n => sVals.has(this.noteToVal[this.handleNotes[n] || n]))) {
                    results.push({
                        parent: parentKey,
                        scale: name,
                        degree_from_parent: (this.noteToVal[chordRoot] - pVal + 12) % 12,
                        gravity: this._getFifthsDistance(parentKey, chordRoot)
                    });
                }
            });
        });
        return results.sort((a, b) => a.gravity - b.gravity);
    }
}

export class JazzBrain {
    constructor() {
        this.converter = new EnhancedChordConverter();
        this.cst = new CSTAnalyzer();
        this.lcc = new LCCAnalyzer();
        this.blt = new BluesToolkit();
    }

    /**
     * 分析和弦进行 (功能性分析)
     * 识别 ii-V-I 以及基于五度循环的强功能进行
     */
    analyzeProgression(progression) {
        if (!Array.isArray(progression)) return [];
        
        const results = [];
        
        for (let i = 0; i < progression.length - 1; i++) {
            const current = progression[i];
            const nextChord = progression[i + 1];

            // 提取根音
            const currentNotes = this.converter._ensureNotes(current);
            const nextNotes = this.converter._ensureNotes(nextChord);
            
            if (!currentNotes || !nextNotes) continue;

            const rootCurrent = currentNotes[0];
            const rootNext = nextNotes[0];

            // 获取根音在半音阶中的索引
            const r1 = this.converter.noteToIdx[rootCurrent];
            const r2 = this.converter.noteToIdx[rootNext];

            /**
             * 逻辑：判断是否为强功能进行 (Dominant Motion)
             * (r2 - r1 + 12) % 12 === 5 意味着向上移动了 5 个半音(纯四度)
             * 比如 D (2) -> G (7)： (7 - 2) = 5
             * 比如 G (7) -> C (0)： (0 - 7 + 12) = 5
             */
            if ((r2 - r1 + 12) % 12 === 5) {
                results.push(`${current} -> ${nextChord}: Strong functional progression (Dominant Motion)`);
            }
        }
        
        return results;
    }

    /** 核心方法：获取即兴建议报告 */
    getAdvice(chordInput) {
        const notes = this.converter._ensureNotes(chordInput);
        if (!notes) return "Invalid input";

        const chordStr = typeof chordInput === 'string' ? chordInput : "Custom Chord";
        const chordRoot = notes[0];

        // 1. CST 分析 (按亮度排序)
        const cstResults = this.cst.analyzeCST(notes);
        
        // 2. LCC 分析 (按引力排序)
        const lccResults = this.lcc.analyzeLCC(notes);

        // 3. 生成报告
        console.log(`--- Suggested improv approaches for ${chordStr} ---`);
        const topCST = cstResults[0];
        const cstScaleNotes = this.cst.scaleNotes(topCST);
        const brightness = this.cst.calculateBrightness(chordRoot, cstScaleNotes);

        console.log(`Most stable (CST): ${topCST} (brightness: ${brightness})`);
        console.log(`Most modern (LCC): ${lccResults[0].parent} ${lccResults[0].scale} (gravity: ${lccResults[0].gravity})`);
        
        return { cstResults, lccResults };
    }

    /** 自动和弦排列 (Voicing Generator) */
    getVoicing(chord, type = "shell") {
        const notes = this.converter._ensureNotes(chord);
        if (type === "shell") {
            // Root + 3rd + 7th
            return [notes[0], notes[1], notes[notes.length > 2 ? 2 : notes.length - 1]];
        }
        if (type === "drop2" && notes.length >= 4) {
            // 简化 Drop 2: 将倒数第二个音降低(此处用位置模拟)
            return [notes[notes.length - 2], notes[0], notes[1], notes[notes.length - 1]];
        }
        return notes;
    }

    /**
     * 和弦替代建议 (Substitution Suggestions)
     * 基于和弦音程结构(而非仅靠字符串名称)提供替代方案
     */
    getSubstitutions(chordInput) {
        // 1. 统一解析音符并提取根音
        const notes = this.converter._ensureNotes(chordInput);
        if (!notes || notes.length === 0) return [];

        const root = notes[0];
        const rootIdx = this.converter.noteToIdx[root];

        // 2. 计算相对于根音的半音偏移量(用于判断和弦属性)
        const offsets = new Set(notes.map(n => 
            (this.converter.noteToIdx[n] - rootIdx + 12) % 12
        ));

        const subs = [];

        // 确定特征音
        const hasMajor3rd = offsets.has(4);
        const hasMinor3rd = offsets.has(3);
        const hasB7 = offsets.has(10);
        const hasMaj7 = offsets.has(11);

        // --- 三全音替代 (Tritone Substitution) ---
        // 逻辑：必须包含三全音特征(属七和弦特征：大三度 + 小七度)
        if (hasMajor3rd && hasB7) {
            const tritoneRootIdx = (rootIdx + 6) % 12;
            const tritoneRoot = this.converter.idxToNote[tritoneRootIdx];
            subs.push({ 
                name: `${tritoneRoot}7`, 
                type: "Tritone Sub", 
                description: "Substitute using the same tritone interval, commonly found in ii-V-I resolutions" ,
                descriptionId: 1
            });
        }

        // --- 关系大小调替代 (Relative Major/Minor Substitution) ---
        // 逻辑：如果是小和弦,推荐其关系大调
        if (hasMinor3rd) {
            const relRootIdx = (rootIdx + 3) % 12;
            const relRoot = this.converter.idxToNote[relRootIdx];
            subs.push({ 
                name: `${relRoot}maj7`, 
                type: "Relative Major Sub", 
                description: "Shares many common notes, providing a brighter color" ,
                descriptionId: 2
            });
        }
        // 逻辑：如果是大和弦,推荐其关系小调
        else if (hasMajor3rd) {
            const relRootIdx = (rootIdx - 3 + 12) % 12;
            const relRoot = this.converter.idxToNote[relRootIdx];
            subs.push({ 
                name: `${relRoot}m7`, 
                type: "Relative Minor Sub", 
                description: "Share many of the same notes, resulting in a softer or more melancholic color.",
                descriptionId: 3
            });
        }

        return subs;
    }

    /** 专业调性中心识别 (The Heavy Lifter) */
    findKeyCenterPro(progression, returnAll = false) {
        const allNotes = new Set();
        const roots = [];
        const chordNames = [];

        progression.forEach(c => {
            const notes = this.converter._ensureNotes(c);
            if (notes) {
                notes.forEach(n => allNotes.add(n));
                roots.push(notes[0]);
                chordNames.push(typeof c === 'string' ? c : "");
            }
        });

        // 调性系统权重配置
        const systems = {
            "Ionian (Major)": { intervals: [0, 2, 4, 5, 7, 9, 11], priority: 2.5 },
            "Jazz Minor": { intervals: [0, 2, 3, 5, 7, 9, 11], priority: 2.0 },
            "Harmonic Minor": { intervals: [0, 2, 3, 5, 7, 8, 11], priority: 1.5 }
        };

        let results = [];

        this.cst.notes.forEach(keyRoot => {
            const keyIdx = this.converter.noteToIdx[keyRoot];

            Object.entries(systems).forEach(([sysName, config]) => {
                const scaleNotes = this.cst.getScaleNotes(keyRoot, config.intervals);
                const scaleSet = new Set(scaleNotes);
                
                // 基础匹配分
                let intersectCount = 0;
                allNotes.forEach(n => { if (scaleSet.has(n)) intersectCount++; });
                let score = intersectCount + config.priority;

                // 功能性加分 (ii-V-I 识别)
                roots.forEach((r, i) => {
                    const relIdx = (this.converter.noteToIdx[r] - keyIdx + 12) % 12;
                    const name = chordNames[i].toLowerCase();

                    if (sysName === "Ionian (Major)") {
                        if (relIdx === 2 && name.includes("m")) score += 4.0; // iim7
                        if (relIdx === 7 && name.includes("7") && !name.includes("maj")) {
                            score += (i === roots.length - 1) ? 5.0 : 2.0; // V7
                        }
                        if (relIdx === 0 && name.includes("maj")) score += 4.0; // Imaj7
                    }
                });

                // 惩罚项：如果属七和弦被识别为 Tonic (I)
                if (sysName === "Ionian (Major)" && keyRoot === roots[roots.length - 1] && chordNames[chordNames.length - 1].includes("7")) {
                    score -= 10.0;
                }

                results.push({ name: `${keyRoot} ${sysName}`, score: parseFloat(score.toFixed(2)) });
            });
        });

        results.sort((a, b) => b.score - a.score);
        return returnAll ? results : `Recommended Key: ${results[0].name}`;
    }

    /** 负和声转换 (Negative Harmony) */
    toNegative(chordInput, axis = "C") {
        // C-G 轴在半音阶中的中心点是 3.5 (E/Eb 之间)
        const axisVal = this.converter.noteToIdx[axis] + 3.5;
        const notes = this.converter._ensureNotes(chordInput);
        
        return notes.map(n => {
            const val = this.converter.noteToIdx[n];
            const negVal = Math.round((2 * axisVal - val + 12) % 12);
            return this.converter.idxToNote[negVal];
        });
    }

    /**
     * 节奏伴奏生成 (Rhythmic Comping)
     * 将和弦音符与特定的爵士律动结合
     */
    getRhythmicVoicing(chordInput, style = "Charleston") {
        const notes = this.converter._ensureNotes(chordInput);
        if (!notes) return [];

        // 获取 Shell Voicing 作为节奏伴奏的基础音底
        const voicing = this.getVoicing(chordInput, "shell");

        // 爵士经典节奏模式定义 (1nd = 1拍, 0.5 = 半拍)
        const patterns = {
            "Charleston": [
                { time: "1.0", duration: "dotted-quarter" }, // 第1拍
                { time: "2.5", duration: "eighth" }          // 第2拍的后半拍 (Off-beat)
            ],
            "Red Garland": [
                { time: "1.5", duration: "eighth" },         // 1的后半拍
                { time: "2.5", duration: "eighth" },         // 2的后半拍
                { time: "3.5", duration: "eighth" },         // 3的后半拍
                { time: "4.5", duration: "eighth" }          // 4的后半拍
            ],
            "Four on the Floor": [
                { time: "1.0", duration: "quarter" },
                { time: "2.0", duration: "quarter" },
                { time: "3.0", duration: "quarter" },
                { time: "4.0", duration: "quarter" }
            ]
        };

        const selectedPattern = patterns[style] || patterns["Charleston"];

        return {
            chord: chordInput,
            voicing: voicing,
            patternName: style,
            rhythm: selectedPattern
        };
    }
    
    /**
     * 计算和弦进行中各和弦的导音（Guide Tones）路径。
     * 导音通常指和弦中的 3音和 7音，是体现爵士乐和声连接（Voice Leading）的关键。
     * @param {Array} progression - 和弦进行列表 (例如: ["Dm7", "G7", "Cmaj7"])
     * @returns {Array} 导音路径列表 (例如: [["F", "C"], ["F", "B"], ["E", "B"]])
     */
    getGuideTonePath(progression) {
        const path = [];
        
        for (const c of progression) {
            // 使用内部转换器解析出音符列表
            const notes = this.converter._ensureNotes(c);
            
            // 导音分析通常需要至少包含根音、三音和五音/七音
            if (notes && notes.length >= 3) {
                /**
                 * 爵士导音逻辑：
                 * notes[1] 通常是三音 (3rd)
                 * 如果是七和弦，notes[3] 是七音 (7th)
                 * 如果是三和弦，则取最后一个音作为替代
                 */
                const guide = [
                    notes[1], 
                    notes.length > 3 ? notes[3] : notes[notes.length - 1]
                ];
                path.push(guide);
            }
        }
        return path;
    }

    /**
     * 生成完整的爵士乐理分析报告
     * 整合了可视化、和弦排列、替代方案以及 CST/LCC 即兴建议
     */
    getFullReport(chordStr) {
        // 1. 获取基础音符
        const notes = this.converter._ensureNotes(chordStr);
        if (!notes) return null;

        console.log(`=== ${chordStr} Jazz Report ===`);
        
        // 2. 调用可视化 (终端/控制台输出)
        this.drawPiano(notes);

        // 3. 获取声部建议 (Voicings)
        const shellVoicing = this.getVoicing(chordStr, "shell");
        const drop2Voicing = this.getVoicing(chordStr, "drop2");

        // 4. 获取替代和弦 (Substitutions)
        const subs = this.getSubstitutions(chordStr);

        // 5. 获取即兴建议 (CST & LCC)
        // 注意：getAdvice 内部已经打印了 Most Stable / Most Modern
        const advice = this.getAdvice(chordStr);

        // 返回一个对象,方便前端 UI 渲染
        return {
            chordName: chordStr,
            notes: notes,
            voicings: {
                shell: shellVoicing,
                drop2: drop2Voicing,
                rhythmic1: this.getRhythmicVoicing(chordStr, "Charleston"),
                rhythmic2: this.getRhythmicVoicing(chordStr, "Red Garland"),
                rhythmic3: this.getRhythmicVoicing(chordStr, "Four on the Floor")
            },
            substitutions: subs,
            cstAdvice: advice.cstResults,
            lccAdvice: advice.lccResults
        };
    }

    /** 简易键盘可视化 (控制台输出) */
    drawPiano(notes) {
        const noteIndices = new Set(notes.map(n => this.converter.noteToIdx[n]));
        let keys = "";
        let labels = "";
        this.cst.notes.forEach((n, i) => {
            keys += noteIndices.has(i) ? " ● " : " - ";
            labels += n.padEnd(3, " ");
        });
        console.log("\nPiano Visualization:");
        console.log(labels);
        console.log(keys);
    }
}