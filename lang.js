const i18n = {
    title: { zh: "乐理工具箱", ja: "音楽理論ツールボックス", en: "Music Theory Toolbox" },
    header_h1: { zh: "乐理工具箱", ja: "音楽理論ツールボックス", en: "Music Theory Toolbox" },
    subtitle: { zh: "音阶和弦・调式和声实用工具箱", ja: "音階和音・旋法和声 実用ツールボックス", en: "Scale & Chord · Mode & Harmony Practical Toolkit" },
    nav_chord: { zh: "和弦转换", ja: "コード変換", en: "Chord Converter" },
    nav_blues: { zh: "布鲁斯工具箱", ja: "ブルース・ツール", en: "Blues Toolkit" },
    nav_lcc: { zh: "LCC调性分析", ja: "LCCリディアン解析", en: "LCC Analysis" },
    nav_cst: { zh: "CST旋律关联", ja: "CSTスケール対応", en: "CST Analysis" },
    nav_other: { zh: "其他工具", ja: "その他ツール", en: "Other Tools" },
    nav_about: { zh: "关于", ja: "について", en: "About" },

    sort_title: { zh: "排序方式", ja: "ソート方式", en: "Sort By" },
    sort_score: { zh: "评分", ja: "スコア", en: "Score" },
    sort_stability: { zh: "稳定性", ja: "安定性", en: "Stability" },
    sort_tension: { zh: "紧张度", ja: "緊張度", en: "Tension" },
    sort_brightness: { zh: "明亮度", ja: "明るさ", en: "Brightness" },
    sort_asc: { zh: "升序", ja: "昇順", en: "Ascending" },
    sort_desc: { zh: "降序", ja: "降順", en: "Descending" },

    label_chord_example: { zh: "和弦(单独): ", ja: "コード(個別): ", en: "Chord (single):" },
    label_blues_example: { zh: "和弦(布鲁斯): ", ja: "コード(ブルース): ", en: "Chord (blues):" },
    label_lcc_example: { zh: "和弦(LCC): ", ja: "コード(LCC): ", en: "Chord (LCC):" },
    label_cst_example: { zh: "和弦(CST): ", ja: "コード(CST): ", en: "Chord (CST):" },
    label_other_example: { zh: "和弦(其他): ", ja: "コード(その他): ", en: "Chord (other):" },

    remove_chord: { zh: "移除和弦", ja: "コードを削除", en: "Remove Chord" },
    
    // 在 neo_octatonic_title 附近添加
    neo_extended: { zh: "(扩展)", ja: "(拡張)", en: "(Extended)" },
    neo_chord_depth_heading: { zh: "第 {depth} 层", ja: "第 {depth} 階層", en: "Layer {depth}" },
    neo_layer_chords_info: { zh: "{depth}层, {chords_count}个和弦", ja: "{depth}階層, コード{chords_count}個", en: "{depth} Layer, {chords_count} Chords" },
    neo_original_chord: { zh: "原始和弦", ja: "元のコード", en: "Original Chord" },
    neo_no_transform: { zh: "该和弦没有可用的三和弦变换。", ja: "このコードには利用可能な三和音変換がありません。", en: "No triad transformations available." },
    neo_no_octatonic: { zh: "该和弦没有八度音阶塔邻居。", ja: "このコードにはオクタトニック隣接がありません。", en: "No octatonic neighbors found for this chord." },
    neo_octatonic_neighbors: { zh: "八度音阶邻居", ja: "オクタトニック隣接", en: "Octatonic Neighbors" },
    neo_legend_tonnetz: { zh: "● 主变换  ● 扩展变换  — 音网 (Tonnetz)", ja: "● 主変換  ● 拡張変換  — 音網 (Tonnetz)", en: "● Main  ● Extended  — Tonnetz" },
    neo_legend_octatonic: { zh: "八度音阶塔 (Octatonic Tower)", ja: "オクタトニック・タワー", en: "Octatonic Tower" },

    // 路径查找相关
    label_neo_path_from: { zh: "从: ", ja: "から: ", en: "From:" },
    label_neo_path_to: { zh: "到: ", ja: "へ: ", en: "To:" },
    label_neo_max_steps: { zh: "最大步数: ", ja: "最大ステップ: ", en: "Max Steps:" },
    neo_path_run_btn: { zh: "查找路径", ja: "パス検索", en: "Find Path" },
    neo_path_title: { zh: "和弦连接路径", ja: "コード接続パス", en: "Chord Connection Path" },
    neo_path_optimal: { zh: "最优路径", ja: "最適パス", en: "Optimal Path" },
    neo_path_alternative: { zh: "其他路径", ja: "その他パス", en: "Alternative Paths" },
    neo_path_steps: { zh: "步", ja: "ステップ", en: "steps" },
    neo_path_no_path: { zh: "未找到连接路径", ja: "接続パスが見つかりません", en: "No connection path found" },

    scale_play_title: {
        zh: "播放音阶",
        ja: "スケール",
        en: "Play Scale"
    },
    nav_neo: { zh: "新里曼理论", ja: "ネオ・リーマン理論", en: "Neo-Riemannian" },
    label_neo_example: { zh: "和弦(新里曼): ", ja: "コード(ネオ・リーマン): ", en: "Chord (Neo-Riemannian):" },
    neo_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    neo_triad_title: { zh: "音网变换 (PLRNSD)", ja: "トネッツ変換 (PLRNSD)", en: "Tonnetz (PLRNSD)" },
    neo_octatonic_title: { zh: "八度音阶塔", ja: "オクタトニック・タワー", en: "Octatonic Tower" },

    nav_ref: { zh: "和弦音阶速查", ja: "コード・スケール辞典", en: "Chord & Scale Ref" },
    label_ref_root: { zh: "根音: ", ja: "ルート: ", en: "Root:" },
    label_ref_scale: { zh: "音阶: ", ja: "スケール: ", en: "Scale:" },
    label_ref_family: { zh: "和弦家族: ", ja: "コードファミリー: ", en: "Chord Family:" },
    ref_scale_run_btn: { zh: "查询音阶", ja: "スケール検索", en: "Lookup Scale" },
    ref_family_run_btn: { zh: "查询家族", ja: "ファミリー検索", en: "Lookup Family" },
    ref_scale_title: { zh: "音阶详情", ja: "スケール詳細", en: "Scale Details" },
    ref_family_title: { zh: "和弦家族详情", ja: "ファミリー詳細", en: "Chord Family Details" },
    ref_notes: { zh: "音阶内音", ja: "スケールノート", en: "Scale Notes" },
    ref_avoid: { zh: "避免音", ja: "アボイドノート", en: "Avoid Notes" },
    ref_family_chord: { zh: "家族和弦", ja: "ファミリーコード", en: "Family Chord" },
    ref_related_strong: { zh: "强关联音阶", ja: "強関連スケール", en: "Strongly Related" },
    ref_related_weak: { zh: "关联音阶", ja: "関連スケール", en: "Related Scales" },
    ref_same_family: { zh: "同家族音阶", ja: "同一ファミリーのスケール", en: "Scales in Same Family" },
    ref_select_root_first: { zh: "请选择根音和音阶", ja: "ルートとスケールを選択してください", en: "Select root and scale" },
    ref_select_family_first: { zh: "请选择和弦家族", ja: "ファミリーを選択してください", en: "Select a chord family" },

    circle_col_degree: { zh: "音级", ja: "度数", en: "Degree" },
    circle_col_chord: { zh: "和弦", ja: "コード", en: "Chord" },
    circle_col_function: { zh: "功能", ja: "機能", en: "Function" },
    circle_col_notes: { zh: "音符", ja: "ノート", en: "Notes" },
    circle_major_natural: { zh: "自然大调", ja: "ナチュラルメジャー", en: "Natural Major" },
    circle_major_harmonic: { zh: "和声大调", ja: "ハーモニックメジャー", en: "Harmonic Major" },
    circle_minor_natural: { zh: "自然小调", ja: "ナチュラルマイナー", en: "Natural Minor" },
    circle_minor_harmonic: { zh: "和声小调", ja: "ハーモニックマイナー", en: "Harmonic Minor" },
    circle_func_tonic: { zh: "主音", ja: "トニック", en: "Tonic" },
    circle_func_supertonic: { zh: "上主音", ja: "スーパートニック", en: "Supertonic" },
    circle_func_mediant: { zh: "中音", ja: "メディアント", en: "Mediant" },
    circle_func_subdominant: { zh: "下属音", ja: "サブドミナント", en: "Subdominant" },
    circle_func_dominant: { zh: "属音", ja: "ドミナント", en: "Dominant" },
    circle_func_submediant: { zh: "下中音", ja: "サブメディアント", en: "Submediant" },
    circle_func_leading: { zh: "导音", ja: "導音", en: "Leading Tone" },
    circle_func_subtonic: { zh: "下主音", ja: "サブトニック", en: "Subtonic" },

    nav_circle: { zh: "五度圈", ja: "五度圏", en: "Circle of 5ths" },
    circle_instruction: { zh: "点击外环或内环扇区查看调性详情", ja: "外側(メジャー)または内側(マイナー)をクリックしてキー詳細を表示", en: "Click outer (major) or inner (minor) ring to view key details" },
    circle_major_title: { zh: "大调音级", ja: "メジャーキー度数", en: "Major Scale Degrees" },
    circle_minor_title: { zh: "小调音级", ja: "マイナーキー度数", en: "Minor Scale Degrees" },
    circle_degree_I: { zh: "I", ja: "I", en: "I" },
    circle_degree_II: { zh: "II", ja: "II", en: "II" },
    circle_degree_III: { zh: "III", ja: "III", en: "III" },
    circle_degree_IV: { zh: "IV", ja: "IV", en: "IV" },
    circle_degree_V: { zh: "V", ja: "V", en: "V" },
    circle_degree_VI: { zh: "VI", ja: "VI", en: "VI" },
    circle_degree_VII: { zh: "VII", ja: "VII", en: "VII" },
    circle_func_tonic: { zh: "主音", ja: "トニック", en: "Tonic" },
    circle_func_supertonic: { zh: "上主音", ja: "スーパートニック", en: "Supertonic" },
    circle_func_mediant: { zh: "中音", ja: "メディアント", en: "Mediant" },
    circle_func_subdominant: { zh: "下属音", ja: "サブドミナント", en: "Subdominant" },
    circle_func_dominant: { zh: "属音", ja: "ドミナント", en: "Dominant" },
    circle_func_submediant: { zh: "下中音", ja: "サブメディアント", en: "Submediant" },
    circle_func_leading: { zh: "导音", ja: "導音", en: "Leading Tone" },
    circle_func_subtonic: { zh: "下主音", ja: "サブトニック", en: "Subtonic" },

    btn_parse: { zh: "解析", ja: "解析", en: "Parse" },
    btn_analyze: { zh: "分析", ja: "解析", en: "Analyze" },

    chord_run_btn: { zh: "解析", ja: "解析", en: "Parse" },
    blues_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    lcc_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    cst_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    other_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },

    nav_rec: { zh: "和弦衔接", ja: "コード・コネクション", en: "Chord Connection" },
    nav_rec_example: { zh: "和弦 (衔接)", ja: "コード (コネクション)", en: "Chord (Connection)" },
    rec_count: { zh: "为 {input1} 推荐 {input2} 个衔接和弦", ja: "{input1} に {input2} 個の接続コードを推薦する", en: "Recommend {input2} connecting chords for {input1}" },
    label_rec_input: { zh: "起始和弦: ", ja: "開始コード: ", en: "Start Chord:" },
    stat_stability: { zh: "稳定性", ja: "安定性", en: "Stability" },
    stat_tension: { zh: "紧张度", ja: "緊張度", en: "Tension" },
    stat_brightness: { zh: "明亮度", ja: "明るさ", en: "Brightness" },

    // Blues panel buttons
    blues_basic: { zh: "标准推荐", ja: "標準提案", en: "Standard Suggestions" },
    blues_advanced: { zh: "替代推荐", ja: "代替提案", en: "Alternative Suggestions" },
    blues_feel: { zh: "听感分析", ja: "フィール分析", en: "Improv Feel" },

    // common messages
    cannot_parse_input: { zh: "无法解析输入", ja: "入力を解析できません", en: "Unable to parse input" },
    cannot_parse_chord: { zh: "无法解析和弦", ja: "コードを解析できません", en: "Unable to parse chord" },

    // result headers with placeholders {count}
    header_basic: { zh: "当前操作: 标准推荐 — {count} 个建议", ja: "操作: 標準提案 — {count} 件", en: "Action: Standard Suggestions — {count} results" },
    header_advanced: { zh: "当前操作: 替代推荐 — {count} 个建议", ja: "操作: 代替提案 — {count} 件", en: "Action: Alternative Suggestions — {count} results" },
    header_improv: { zh: "当前操作: 听感分析 — {count} 个音阶", ja: "操作: フィール分析 — {count} スケール", en: "Action: Improv Feel — {count} scales" },
    header_cst: { zh: "当前操作: CST — {count} 个匹配音阶", ja: "操作: CST — {count} マッチ", en: "Action: CST — {count} matches" },
    header_lcc: { zh: "当前操作: LCC — {count} 个建议", ja: "操作: LCC — {count} 件", en: "Action: LCC — {count} results" },

    chord_parse_heading: { zh: "和弦解析: {input}", ja: "コード解析: {input}", en: "Chord Parse: {input}" },
    chord_parse_error: { zh: "和弦解析错误", ja: "コード解析エラー", en: "Chord parse error" },
    root_label: { zh: "根音", ja: "ルート", en: "Root" },
    chord_label: { zh: "和弦", ja: "コード", en: "Chord" },
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
    sub_type_desc_1: { zh: "使用相同的三全音音程进行替换，常用于 ii-V-I 解决。", ja: "同じ三全音(トライトーン)の間隔を使用して置き換えます。ii-V-Iの解決によく使われます。", en: "Substitute using the same tritone interval, commonly found in ii-V-I resolutions" },
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
    label_other_example_key_center: { zh: "和弦(可增删): ", ja: "コード(増減可):", en: "Chords (add/remove):" },
    label_other_example_report: { zh: "和弦: ", ja: "コード: ", en: "Chord:" },
    label_other_example_progression: { zh: "进行: ", ja: "進行: ", en: "progression:" },
    label_other_example_negative: { zh: "和弦: ", ja: "コード:", en: "Chord:" },
    label_other_example_guide: { zh: "进行: ", ja: "進行: ", en: "progression:" },

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
    lcc_parent_prefix: { zh: "父音: ", ja: "親: ", en: "Parent:" },
    lcc_position_prefix: { zh: "位置: ", ja: "位置: ", en: "Position:" },
    lcc_gravity_prefix: { zh: "引力: ", ja: "重力: ", en: "Gravity:" },

    // reasons used in blues suggestions and fallbacks
    reason_0: { zh: "平行: 标准小调布鲁斯", ja: "パラレル: 標準的なマイナーブルース", en: "Parallel: Standard minor blues" },
    reason_1: { zh: "平行: 纯净小调音色", ja: "パラレル: 純粋なマイナーサウンド", en: "Parallel: Pure minor sound" },
    reason_2: { zh: "中性: 明亮而开阔", ja: "ニュートラル: 明るく開放的", en: "Neutral: Bright and open" },
    reason_3: { zh: "关系: 甜美乡村布鲁斯色彩", ja: "リレート: 甘いカントリーブルースカラー", en: "Relative: Sweet country-blues color" },
    reason_4: { zh: "平行: 大调和弦上的“布鲁斯”张力", ja: "パラレル: メジャーコード上の“ブルース”テンション", en: "Parallel: 'Blue' tension over major chord" },
    reason_5: { zh: "平行: 经典爵士布鲁斯音色", ja: "パラレル: クラシックジャズブルースサウンド", en: "Parallel: Classic jazz-blues sound" },
    reason_6: { zh: "替代: 提供利迪亚(#11)色彩", ja: "サブスティテューション: リディアン(#11)カラー", en: "Substitution: Provides Lydian (#11) color" },
    reason_7: { zh: "替代: 平滑的爱奥利亚质感", ja: "サブスティテューション: スムーズなアイオリアンテクスチャ", en: "Substitution: Smooth Aeolian texture" },

    // Improv Feel names and descriptions (localized)
    improv_feel_name_1: { zh: "平和/甜美", ja: "安全でスイート", en: "Safe & Sweet" },
    improv_feel_desc_1: { zh: "协和的听感，非常适合流行和民谣蓝调。", ja: "協和的でスイート — ポップやフォークブルースに適しています。", en: "Consonant and sweet — well suited for pop and folk-blues." },
    improv_feel_name_2: { zh: "灵魂感/平衡", ja: "ソウルフルでバランス", en: "Soulful & Balanced" },
    improv_feel_desc_2: { zh: "经典的蓝调味，张力与解决感平衡。", ja: "クラシックなブルース感 — 緊張と解決のバランスが良い。", en: "Classic blues character — tension and resolution are well balanced." },
    improv_feel_name_3: { zh: "辛辣/爵士化", ja: "スパイシーでジャジー", en: "Spicy & Jazzy" },
    improv_feel_desc_3: { zh: "较高张力，带有波普与现代爵士蓝调特征。", ja: "高めのテンション — ビバップやモダンジャズブルースの特徴を持つ。", en: "Higher tension — evokes bebop and modern jazz-blues characteristics." },
    improv_feel_name_4: { zh: "实验/Outside", ja: "実験的 / アウトサイド", en: "Experimental / Outside" },
    improv_feel_desc_4: { zh: "强烈不协和，适合创造激烈的离调色彩。", ja: "非常に不協和でエッジが効いている — 強いアウトサイドの色彩を作る。", en: "Highly dissonant and edgy — creates strong outside colors and tension." },

    // About page
    about_title: { zh: "关于乐理工具箱", ja: "音楽理論ツールボックスについて", en: "About Music Theory Toolbox" },
    about_desc: { zh: "乐理工具箱是一个现代爵士音乐理论和即兴工具集合，为音乐家提供快速的乐理查询和实用的即兴建议。", ja: "音楽理論ツールボックスはモダンジャズ音楽理論と即興ツールのコレクションで、ミュージシャンに即座の理論クエリと実用的な即興提案を提供します。", en: "Music Theory Toolbox is a collection of modern jazz music theory and improvisation tools designed to provide musicians with quick theoretical insights and practical approach suggestions." },
    about_features: { zh: "主要功能", ja: "主な機能", en: "Key Features" },
    about_feature_chord: { zh: "和弦转换: 立即识别和弦名称、音符和声部", ja: "コード変換: コード名、ノート、ボイシングを即座に識別", en: "Chord Converter: Instantly identify chord names, notes, and voicings" },
    about_feature_blues: { zh: "布鲁斯工具箱: 蓝调进行分析和即兴音阶建议", ja: "ブルース・ツール: ブルースの進行分析と即興スケール提案", en: "Blues Toolkit: Blues progression analysis and improvisation scale suggestions" },
    about_feature_lcc: { zh: "LCC分析: 基于重力和张力的调性分析", ja: "LCC解析: 重力と張力に基づく調性分析", en: "LCC Analysis: Tonality analysis based on gravity and tension" },
    about_feature_cst: { zh: "CST分析: 基于亮度和张力的音阶推荐", ja: "CST解析: 明るさと張力に基づくスケール推奨", en: "CST Analysis: Scale recommendations based on brightness and tension" },
    about_github: { zh: "GitHub仓库", ja: "GitHubリポジトリ", en: "GitHub Repositories" },
    about_github_web: { zh: "Web版本(JavaScript)", ja: "Web版(JavaScript)", en: "Web Version (JavaScript)" },
    about_github_py: { zh: "Python版本", ja: "Python版", en: "Python Version" },
    about_footer: { zh: "© 2026 Music Theory Toolbox 项目。所有内容仅供教育和音乐学习之用。", ja: "© 2024 Music Theory Toolbox プロジェクト。すべてのコンテンツは教育と音楽学習目的でのみ使用されます。", en: "© 2024 Music Theory Toolbox Project. All content is for educational and musical learning purposes." },
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

document.title = i18n.title[window.__lang] || i18n.title.en || 'Music Theory Toolbox';

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

