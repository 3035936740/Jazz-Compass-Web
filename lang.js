const i18n = {
    title: { zh: "爵士指南", ja: "ジャズコンパス", en: "Jazz Compass" },
    header_h1: { zh: "爵士指南", ja: "ジャズコンパス", en: "Jazz Compass" },
    subtitle: { zh: "Modern Jazz Tools · 即时乐理与即兴建议", ja: "モダンジャズツール · 即時理論と即興提案", en: "Modern Jazz Tools · Instant Theory & Improv" },
    nav_chord: { zh: "和弦转换", ja: "コード変換", en: "Chord Converter" },
    nav_blues: { zh: "布鲁斯工具箱", ja: "ブルース・ツール", en: "Blues Toolkit" },
    nav_lcc: { zh: "LCC调性分析", ja: "LCCリディアン解析", en: "LCC Analysis" },
    nav_cst: { zh: "CST旋律关联", ja: "CSTスケール対応", en: "CST Analysis" },
    nav_other: { zh: "其他工具", ja: "その他ツール", en: "Other Tools" },

    label_chord_example: { zh: "示例和弦（单独）：", ja: "サンプルコード(個別)：", en: "Example chord (single):" },
    label_blues_example: { zh: "示例和弦（布鲁斯）：", ja: "サンプルコード(ブルース)：", en: "Example chord (blues):" },
    label_lcc_example: { zh: "示例和弦（LCC）：", ja: "サンプルコード(LCC)：", en: "Example chord (LCC):" },
    label_cst_example: { zh: "示例和弦（CST）：", ja: "サンプルコード(CST)：", en: "Example chord (CST):" },
    label_other_example: { zh: "示例和弦（其他）：", ja: "サンプルコード(その他)：", en: "Example chord (other):" },

    btn_parse: { zh: "解析", ja: "解析", en: "Parse" },
    btn_analyze: { zh: "分析", ja: "解析", en: "Analyze" },

    chord_run_btn: { zh: "解析", ja: "解析", en: "Parse" },
    blues_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    lcc_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    cst_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    other_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },

    // Blues panel buttons
    blues_basic: { zh: "建议音阶 (Basic)", ja: "提案スケール (Basic)", en: "Suggest Scales (Basic)" },
    blues_advanced: { zh: "高级建议 (Advanced)", ja: "高度な提案 (Advanced)", en: "Advanced Suggestions (Advanced)" },
    blues_feel: { zh: "听感分析 (Improv Feel)", ja: "フィール分析 (Improv Feel)", en: "Improv Feel" },

    // common messages
    cannot_parse_input: { zh: "无法解析输入", ja: "入力を解析できません", en: "Unable to parse input" },
    cannot_parse_chord: { zh: "无法解析和弦", ja: "コードを解析できません", en: "Unable to parse chord" },

    // result headers with placeholders {count}
    header_basic: { zh: "当前操作：建议音阶 (Basic) — {count} 个建议", ja: "操作：提案スケール (Basic) — {count} 件", en: "Action: Suggest Scales (Basic) — {count} results" },
    header_advanced: { zh: "当前操作：高级建议 (Advanced) — {count} 个建议", ja: "操作：高度な提案 (Advanced) — {count} 件", en: "Action: Advanced Suggestions (Advanced) — {count} results" },
    header_improv: { zh: "当前操作：听感分析 (Improv Feel) — {count} 个音阶", ja: "操作：フィール分析 (Improv Feel) — {count} スケール", en: "Action: Improv Feel — {count} scales" },
    header_cst: { zh: "当前操作：CST — {count} 个匹配音阶", ja: "操作：CST — {count} マッチ", en: "Action: CST — {count} matches" },
    header_lcc: { zh: "当前操作：LCC — {count} 个建议", ja: "操作：LCC — {count} 件", en: "Action: LCC — {count} results" },

    chord_parse_heading: { zh: "和弦解析: {input}", ja: "コード解析: {input}", en: "Chord Parse: {input}" },
    chord_parse_error: { zh: "和弦解析错误", ja: "コード解析エラー", en: "Chord parse error" },
    root_label: { zh: "根音", ja: "ルート", en: "Root" },
    // slash_label: { zh: "斜杠和弦", ja: "スラッシュコード", en: "Slash chord" },

    other_report: { zh: "和弦分析报告", ja: "コード分析レポート", en: "Chord Analysis Report" },
    no_data_available: { zh: "未找到分析数据", ja: "分析データが見つかりません", en: "No analysis data found." },
    voicings_label: { zh: "和弦排列", ja: "ボイシング", en: "Voicings" },
    voicings_shell: { zh: "壳类排列", ja: "シェル・ボイシング", en: "Shell" },
    voicings_drop2: { zh: "Drop 2 排列", ja: "ドロップ2", en: "Drop 2" },
    rhythmic_label: { zh: "节奏型", ja: "リズムパターン", en: "Rhythmic" },
    substitutions_label: { zh: "代理和弦", ja: "代理コード", en: "Substitutions" },
    motion_dominant_label: { zh: "强功能进行 (属倾向)", ja: "強い機能的進行 (ドミナント・モーション)", en: "Strong Functional Progression (Dominant Motion)" },

    neg_harmony_title: { 
    "zh": "负和弦分析", 
    "ja": "ネガティブ・コード分析", 
    "en": "Negative Harmony Analysis" 
    },
    neg_axis: { 
        "zh": "镜像轴", 
        "ja": "軸 (Axis)", 
        "en": "Axis" 
    },
    neg_original: { 
        "zh": "原和弦", 
        "ja": "元のコード", 
        "en": "Original" 
    },
    neg_negative: { 
        "zh": "负和弦", 
        "ja": "ネガティブ・コード", 
        "en": "Negative" 
    },

    voice_leading_label: {
        "zh": "声部连接",
        "ja": "ヴォイス・リーディング",
        "en": "Voice Leading"
    },

    // 代理和弦类型名称
    sub_type_name_1: { zh: "三全音代理", ja: "裏コード (トライトーン代理)", en: "Tritone Sub" },
    sub_type_name_2: { zh: "关系大调代理", ja: "平行大調代理", en: "Relative Major Sub" },
    sub_type_name_3: { zh: "关系小调代理", ja: "平行小調代理", en: "Relative Minor Sub" },

    // 代理和弦详细描述
    sub_type_desc_1: { zh: "使用相同的三全音音程进行替换，常用于 ii-V-I 解决。", ja: "同じ三全音（トライトーン）の間隔を使用して置き換えます。ii-V-Iの解決によく使われます。", en: "Substitute using the same tritone interval, commonly found in ii-V-I resolutions" },
    sub_type_desc_2: { zh: "共享大量相同音符，提供更明亮的色彩。", ja: "多くの共通音を持ち、より明るい色彩を与えます。", en: "Shares many common notes, providing a brighter color" },
    sub_type_desc_3: { zh: "共享大量相同音符，产生更柔和或更忧郁的色彩。", ja: "多くの共通音を持ち、より柔らかく、あるいは哀愁のある色彩を与えます。", en: "Share many of the same notes, resulting in a softer or more melancholic color." },

    other_error: { zh: "其他工具错误", ja: "その他ツールのエラー", en: "Other Tools - Error" },

    // other panel mode buttons
    other_mode_key_center: { zh: "调性中心", ja: "調性センター", en: "Key Center" },
    other_mode_report: { zh: "和弦报告", ja: "コードレポート", en: "Chord Report" },
    other_mode_progression: { zh: "进行分析", ja: "進行解析", en: "Progression" },
    other_mode_negative: { zh: "负和声", ja: "ネガティブハーモニー", en: "Negative Harmony" },
    other_mode_guide: { zh: "导音路径", ja: "ガイドトーン経路", en: "Guide Tone Path" },

    key_center_detected: { 
    zh: "检测到的调性中心", 
    ja: "検出された調性センター", 
    en: "Detected Key Center" 
    },

    // 针对 "Score"
    key_center_match_score: { 
        zh: "匹配得分", 
        ja: "マッチ度スコア", 
        en: "Score" 
    },

    // input labels for other modes (fallback to default if absent)
    label_other_example_key_center: { zh: "示例和弦（数组）：", ja: "サンプルコード(配列):", en: "Example chords (array):" },
    label_other_example_report: { zh: "示例和弦：", ja: "サンプルコード：", en: "Example chord:" },
    label_other_example_progression: { zh: "示例进行：", ja: "サンプル進行：", en: "Example progression:" },
    label_other_example_negative: { zh: "示例和弦,轴：", ja: "サンプルコード, 軸:", en: "Example chord, axis:" },
    label_other_example_guide: { zh: "示例进行：", ja: "サンプル進行：", en: "Example progression:" },

    // LCC labels
    parent_label: { zh: "Parent", ja: "親", en: "Parent" },
    position_label: { zh: "位置", ja: "位置", en: "Position" },
    semitones_label: { zh: "半音", ja: "半音", en: "semitones" },
    gravity_label: { zh: "引力", ja: "重力", en: "Gravity" },
    brightness_label: { zh: "亮度", ja: "明るさ", en: "Brightness" },
    info_label: { zh: "信息", ja: "情報", en: "Info" },
    tension_source_label: { zh: "张力来源", ja: "テンション元", en: "Tension Source" },
    tensions_label: { zh: "张力音", ja: "テンション音", en: "Tensions" },
    avoid_label: { zh: "避免音", ja: "避ける音", en: "Avoid" },
    feel_label: { zh: "听感", ja: "フィール", en: "Feel" },
    spiciness_label: { zh: "辣度", ja: "スパイシー度", en: "Spiciness" },
    lcc_parent_prefix: { zh: "父音：", ja: "親：", en: "Parent:" },
    lcc_position_prefix: { zh: "位置：", ja: "位置：", en: "Position:" },
    lcc_gravity_prefix: { zh: "引力：", ja: "重力：", en: "Gravity:" },

    // reasons used in blues suggestions and fallbacks
    reason_parallel_classic: { zh: "平行：经典爵士布鲁斯音色", ja: "パラレル：クラシックジャズブルースサウンド", en: "Parallel: Classic jazz-blues sound" },
    reason_blue_tension: { zh: "平行：大调和弦上的“布鲁斯”张力", ja: "パラレル：メジャーコード上の“ブルース”テンション", en: "Parallel: 'Blue' tension over major chord" },
    reason_relative_country: { zh: "关系：甜美乡村布鲁斯色彩", ja: "リレート：甘いカントリーブルースカラー", en: "Relative: Sweet country-blues color" },
    reason_parallel_standard_minor: { zh: "平行：标准小调布鲁斯", ja: "パラレル：標準的なマイナーブルース", en: "Parallel: Standard minor blues" },
    reason_neutral_bright: { zh: "中性：明亮而开阔", ja: "ニュートラル：明るく開放的", en: "Neutral: Bright and open" },
    reason_sub_lydian11: { zh: "替代：提供利迪亚(#11)色彩", ja: "サブスティテューション：リディアン(#11)カラー", en: "Substitution: Provides Lydian (#11) color" },
    reason_sub_aeolian: { zh: "替代：平滑的爱奥利亚质感", ja: "サブスティテューション：スムーズなアイオリアンテクスチャ", en: "Substitution: Smooth Aeolian texture" },
    reason_classic_major_blues: { zh: "经典大调布鲁斯", ja: "クラシックメジャーブルース", en: "Classic major blues" },
    reason_sharp11_dominant: { zh: "#11主和弦色彩", ja: "シャープ11ドミナントカラー", en: "Sharp 11 dominant color" },
    reason_common_pentatonic: { zh: "常见五声音阶风味", ja: "一般的ペンタトニックフレーバー", en: "Common pentatonic flavor" },
    // Improv Feel names and descriptions (localized)
    improv_feel_name_1: { zh: "平和/甜美", ja: "安全でスイート", en: "Safe & Sweet" },
    improv_feel_desc_1: { zh: "协和的听感，非常适合流行和民谣蓝调。", ja: "協和的でスイート — ポップやフォークブルースに適しています。", en: "Consonant and sweet — well suited for pop and folk-blues." },
    improv_feel_name_2: { zh: "灵魂感/平衡", ja: "ソウルフルでバランス", en: "Soulful & Balanced" },
    improv_feel_desc_2: { zh: "经典的蓝调味，张力与解决感平衡。", ja: "クラシックなブルース感 — 緊張と解決のバランスが良い。", en: "Classic blues character — tension and resolution are well balanced." },
    improv_feel_name_3: { zh: "辛辣/爵士化", ja: "スパイシーでジャジー", en: "Spicy & Jazzy" },
    improv_feel_desc_3: { zh: "较高张力，带有波普与现代爵士蓝调特征。", ja: "高めのテンション — ビバップやモダンジャズブルースの特徴を持つ。", en: "Higher tension — evokes bebop and modern jazz-blues characteristics." },
    improv_feel_name_4: { zh: "实验/Outside", ja: "実験的 / アウトサイド", en: "Experimental / Outside" },
    improv_feel_desc_4: { zh: "强烈不协和，适合创造激烈的离调色彩。", ja: "非常に不協和でエッジが効いている — 強いアウトサイドの色彩を作る。", en: "Highly dissonant and edgy — creates strong outside colors and tension." },
};

// determine language: zh (中文), ja (日本語), otherwise en
let lang = 'en';
const navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
if (navLang.startsWith('zh')) lang = 'zh';
else if (navLang.startsWith('ja')) lang = 'ja';
else lang = 'en';

// expose helper and set elements
window.__i18n = i18n;
window.__lang = lang;

window.__ = function (k, def) {
    const map = i18n[k];
    if (!map) return def ?? '';
    return map[lang] ?? map.en ?? def ?? '';
};

// formatted replace for placeholders like {count} or {input}
window.__f = function (k, params) {
    let s = window.__(k, '');
    if (!s) return '';
    for (const p in (params || {})) {
        s = s.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
    }
    return s;
};

document.title = i18n.title[window.__lang] || i18n.title.en || 'Jazz Compass';

// apply translations to any elements already in DOM
function applyTranslations() {
    for (let key in i18n) {
        const el = document.getElementById(key);
        if (!el) continue;
        if (key === 'title') {
            document.title = window.__(key);
            continue;
        }
        el.innerHTML = window.__(key);
    }
}

// if DOM already loaded, apply immediately, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslations);
} else {
    applyTranslations();
}

