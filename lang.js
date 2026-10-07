const i18n = {
    navgroup_harmony: { zh: "和声", ja: "和声", en: "Harmony" },
    navgroup_jazz: { zh: "爵士与即兴", ja: "ジャズと即興", en: "Jazz & improv" },
    navgroup_compose: { zh: "创作", ja: "作曲", en: "Compose" },
    navgroup_voice: { zh: "对位与旋律", ja: "対位法と旋律", en: "Counterpoint & melody" },
    nav_counterpoint: { zh: "类别对位", ja: "類別対位法", en: "Species Counterpoint" },
    intro_counterpoint: { zh: "按第一至第五类的规则检查二声部对位，并对照 Fux 原书的解答", ja: "第一類から第五類の規則で二声の対位を検査し、フックスの原典解答と比べる", en: "Check two-voice counterpoint against first to fifth species rules and compare with Fux’s own solutions" },
    nav_nonchord: { zh: "和弦外音", ja: "非和声音", en: "Embellishing Tones" },
    intro_nonchord: { zh: "按进入方式、离开方式与拍位识别旋律中的经过音、辅助音、倚音、逃音、延留音等", ja: "入り方・離れ方・拍の位置から経過音・刺繍音・倚音・逸音・掛留音などを判別", en: "Identify passing, neighbour, appoggiatura, escape and suspension tones from approach, departure and metre" },
    nav_harmonize: { zh: "旋律配和声", ja: "旋律の和声付け", en: "Harmonize a Melody" },
    intro_harmonize: { zh: "按乐句模型 Tb–PD–D–Te 为旋律配上三和弦，比较几种配法并写成四部和声", ja: "フレーズ・モデル Tb–PD–D–Te に沿って旋律に三和音を付け、四声体にする", en: "Harmonize a melody with triads along the phrase model Tb–PD–D–Te and realise it in four parts" },
    nav_figured: { zh: "数字低音", ja: "数字付き低音", en: "Figured Bass" },
    intro_figured: { zh: "解读数字低音，得出每个和弦的组成与罗马数字，并写成四部和声", ja: "数字付き低音を読み、各和音の構成とローマ数字を求めて四声体にする", en: "Read a figured bass, find each chord and its Roman numeral, and realise it in four parts" },
    nav_jazzmore: { zh: "爵士进阶", ja: "ジャズ発展", en: "Jazz, Further" },
    intro_jazzmore: { zh: "重配和声、七和弦配置、bebop 语汇与常用曲式的和弦表", ja: "リハーモナイズ、七の和音のヴォイシング、ビバップ語法、定番フォーム", en: "Reharmonization, seventh-chord voicings, bebop vocabulary and common forms" },
    nav_posttonal: { zh: "二十世纪技法", ja: "20 世紀の技法", en: "Post-tonal Techniques" },
    intro_posttonal: { zh: "音级集合分析、十二音矩阵与有限移位调式", ja: "ピッチクラス・セット、12 音マトリクス、移調の限られた旋法", en: "Pitch-class set analysis, twelve-tone matrices and modes of limited transposition" },
    nav_temperaments: { zh: "历史律制", ja: "歴史的音律", en: "Historical Temperaments" },
    intro_temperaments: { zh: "比较毕达哥拉斯律、中庸全音律、Werckmeister 与 Vallotti 的音分、狼五度与大三度，并对照试听", ja: "ピタゴラス・ミーントーン・ヴェルクマイスター・ヴァロッティを比べて聴く", en: "Compare Pythagorean, meantone, Werckmeister and Vallotti tunings by cents, wolves and thirds, and listen" },
    nav_world: { zh: "世界调式体系", ja: "世界の旋法体系", en: "World Modal Systems" },
    intro_world: { zh: "阿拉伯木卡姆与 jins、印度斯坦十个 thaat、土耳其 53 koma 体系的音阶构造与试听", ja: "アラブのマカームとジンス、インドの 10 のタート、トルコの 53 コンマ体系を聴く", en: "Arabic maqam and ajnas, the ten Hindustani thaats and the Turkish 53-comma system, with playback" },
    nav_instruments: { zh: "移调乐器与音域", ja: "移調楽器と音域", en: "Transposing Instruments" },
    intro_instruments: { zh: "实音与书写音换算、调号换算、各乐器的移调音程与大致音域", ja: "実音と記譜音の換算、調号の換算、各楽器の移調と音域", en: "Convert between concert and written pitch and keys; transpositions and approximate ranges" },
    nav_fretboard: { zh: "指板与 CAGED", ja: "指板と CAGED", en: "Fretboard & CAGED" },
    intro_fretboard: { zh: "吉他 CAGED 五个把位的大三和弦，以及吉他、贝斯、曼陀林、尤克里里的指板音名", ja: "ギターの CAGED 五つのポジションと、各弦楽器の指板の音名", en: "The five CAGED positions of a major chord, and fretboard notes for guitar, bass, mandolin and ukulele" },
    nav_progression: { zh: "和弦进行播放器", ja: "コード進行プレーヤー", en: "Progression Player" },
    intro_progression: { zh: "输入和弦进行，按速度与织体循环播放，可移调", ja: "コード進行をテンポと伴奏型でループ再生、移調も可能", en: "Loop a chord progression at any tempo and texture, and transpose it" },
    nav_ear: { zh: "练耳", ja: "聴音トレーニング", en: "Ear Training" },
    intro_ear: { zh: "听辨音程、三和弦与七和弦，记录正确率", ja: "音程・三和音・七の和音を聴き分け、正答率を記録", en: "Identify intervals, triads and seventh chords by ear, with a running score" },
    nav_chordsymbols: { zh: "和弦标记查询", ja: "コード表記の検索", en: "Chord Symbol Lookup" },
    intro_chordsymbols: { zh: "任意写法的和弦标记 → 标准写法、其他写法、组成音、五线谱与作用；含 Blackadder（Cblk）", ja: "どんな書き方のコード表記も標準表記・別表記・構成音・譜例・役割に。ブラックアダー（Cblk）にも対応", en: "Any chord-symbol spelling → canonical symbol, alternatives, tones, staff and role; includes the Blackadder (Cblk)" },
    nav_staff: { zh: "五线谱", ja: "五線譜", en: "Staff" },
    intro_staff: { zh: "小小的记谱编辑器：大谱表与四种谱号、调号拍号、各种时值与附点、休止、连音线、和弦、临时记号与音分偏移，按 BPM 播放并导出 MIDI；还有读谱练习", ja: "小さな記譜エディター：大譜表と 4 つの音部記号、調号と拍子、音価と付点、休符、タイ、和音、臨時記号とセント、BPM で再生して MIDI 書き出し。読譜練習も", en: "A small notation editor: grand staff and four clefs, key and time signatures, durations and dots, rests, ties, chords, accidentals and cent offsets, playback at any BPM and MIDI export — plus a note-reading drill" },
    nav_learn: { zh: "乐理闯关", ja: "音楽理論チャレンジ", en: "Theory Quest" },
    intro_learn: { zh: "像玩游戏一样学乐理：从简到难，每一关几分钟，对应工具箱的每个功能", ja: "ゲーム感覚で音楽理論：やさしい所から、1 ステージ数分。各ツールに対応", en: "Learn theory like a game: easy to hard, a few minutes per level, one for every tool" },
    return_tutorial: { zh: "回到教程", ja: "チュートリアルに戻る", en: "Back to tutorial" },
    return_sideb: { zh: "回到 Side-B", ja: "Side-B に戻る", en: "Back to Side-B" },
    return_sideb_title: { zh: "回到 Side-B 没做完的关卡：{code} {title}（{part}）", ja: "Side-B の途中のステージに戻る：{code} {title}（{part}）", en: "Return to your unfinished Side-B level: {code} {title} ({part})" },
    return_tutorial_title: { zh: "回到没做完的关卡：{title}（第 {n} / {m} 题）", ja: "途中のステージに戻る：{title}（{n} / {m} 問目）", en: "Return to your unfinished level: {title} (question {n} / {m})" },
    learn_confirm_title: { zh: "你还有一关没做完", ja: "途中のステージがあります", en: "You have an unfinished level" },
    learn_confirm_body: { zh: "「{title}」做到第 {n} / {m} 题。打开新的教程会放弃这一关的进度。想回到之前那一关，请选「回到之前的关卡」。", ja: "「{title}」は {n} / {m} 問目まで進んでいます。新しいチュートリアルを開くとこの進み具合は失われます。前のステージに戻るなら「前のステージに戻る」を選んでください。", en: "“{title}” is at question {n} / {m}. Opening a new tutorial discards that progress. To go back to it, choose “Back to my level”." },
    learn_confirm_back: { zh: "回到之前的关卡", ja: "前のステージに戻る", en: "Back to my level" },
    learn_confirm_new: { zh: "放弃并打开新教程", ja: "破棄して新しく開く", en: "Discard and open the new one" },
    learn_confirm_cancel: { zh: "取消", ja: "キャンセル", en: "Cancel" },
    tutorial_link: { zh: "看不懂？玩教程", ja: "わからない？チュートリアル", en: "Confused? Play the tutorial" },
    navgroup_world: { zh: "民族与律学", ja: "民族音楽と音律", en: "World & tuning" },
    nav_chinese: { zh: "中国民族调式", ja: "中国の民族旋法", en: "Chinese Modes" },
    intro_chinese: { zh: "五声、六声、七声调式，同宫系统与旋宫，以及按结束音识别调式", ja: "五声・六声・七声の旋法、同宮系統と旋宮、終止音による旋法の判別", en: "Pentatonic to heptatonic modes, Gong systems, Xuangong and identifying a mode from its final note" },
    navgroup_lab: { zh: "实验与参考", ja: "ラボと資料", en: "Lab & reference" },
    label_theme: { zh: "界面", ja: "表示", en: "Theme" },
    ui_nav_tools: { zh: "工具", ja: "ツール", en: "Tools" },
    ui_sound: { zh: "声音", ja: "音量", en: "Sound" },
    ui_volume: { zh: "音量", ja: "音量", en: "Volume" },
    ui_stop_all: { zh: "停止所有播放（Esc）", ja: "すべての再生を停止（Esc）", en: "Stop all playback (Esc)" },
    ui_theme: { zh: "界面主题", ja: "表示テーマ", en: "Theme" },
    ui_notation: { zh: "音名记法", ja: "音名の表記", en: "Note-name spelling" },
    ui_share_title: { zh: "复制指向当前面板的链接", ja: "現在のパネルへのリンクをコピー", en: "Copy a link to this panel" },
    ui_add_chord: { zh: "添加和弦", ja: "コードを追加", en: "Add chord" },
    neo_depth_label: { zh: "展开层数", ja: "展開する階層", en: "Depth" },
    neo_apply: { zh: "应用", ja: "適用", en: "Apply" },
    neo_spacing: { zh: "间距", ja: "間隔", en: "Spacing" },
    neo_node_size: { zh: "节点大小", ja: "ノードの大きさ", en: "Node size" },
    neo_legend_basic: { zh: "PLRSN D1（基本）", ja: "PLRSN D1（基本）", en: "PLRSN D1 (basic)" },
    neo_legend_extended: { zh: "扩展变换", ja: "拡張変換", en: "Extended transforms" },
    neo_pan_hint: { zh: "左键拖拽画布 · 右键拖拽节点 · 滚轮缩放 · 双击重置", ja: "左ドラッグで移動 · 右ドラッグでノード移動 · ホイールで拡大縮小 · ダブルクリックでリセット", en: "Drag to pan · right-drag a node · scroll to zoom · double-click to reset" },
    neo_reset_view: { zh: "↺ 重置视图", ja: "↺ 表示をリセット", en: "↺ Reset view" },
    neo_reset_positions: { zh: "⟲ 重置位置", ja: "⟲ 配置をリセット", en: "⟲ Reset positions" },
    circle_multi_mode: { zh: "多调性模式", ja: "多旋法モード", en: "Multi-mode view" },
    circle_multi_hint: { zh: "调式：点击卡片选择 色条表示温度 深浅表示张力", ja: "旋法：カードをクリックして選択。色は温度、濃さは緊張度", en: "Modes: click a card. Colour shows temperature, shade shows tension" },
    circle_multi_expand: { zh: "展开调式", ja: "旋法を表示", en: "Show modes" },
    circle_multi_collapse: { zh: "收起调式", ja: "旋法を閉じる", en: "Hide modes" },
    circle_mode_search: { zh: "搜索调式", ja: "旋法を検索", en: "Search modes" },
    circle_filter_normal: { zh: "仅常规调式", ja: "通常の旋法のみ", en: "Common modes only" },
    circle_filter_natural: { zh: "仅自然音阶", ja: "自然音階のみ", en: "Natural scales only" },
    circle_sort: { zh: "排序", ja: "並べ替え", en: "Sort" },
    circle_sort_tension_short: { zh: "张力", ja: "緊張度", en: "Tension" },
    circle_sort_temp_short: { zh: "温度", ja: "温度", en: "Temperature" },
    circle_sort_tension_opt: { zh: "空间张力等级(1-10 越大越暗)", ja: "空間の緊張度（1–10、大きいほど暗い）", en: "Spatial tension (1–10, higher is darker)" },
    circle_sort_temp_opt: { zh: "空间温度等级 -8 到 8 负值冷色 正值暖色", ja: "空間の温度（−8〜8、負は寒色・正は暖色）", en: "Spatial temperature (−8 to 8, negative cool, positive warm)" },
    circle_apply: { zh: "应用", ja: "適用", en: "Apply" },
    circle_multi_play_func_seq: { zh: "播放序列", ja: "進行を再生", en: "Play sequence" },
    circle_multi_back_to_start: { zh: "回到起点", ja: "最初に戻る", en: "Back to the start" },
    circle_multi_func_seq_hint: { zh: "功能名按五度圈内圈定位 · 点击节点可单独播放 · T–S–D–T → I–IV–V–I", ja: "機能名は五度圏の内側の位置 · ノードをクリックで個別に再生 · T–S–D–T → I–IV–V–I", en: "Function names follow the inner ring · click a node to play it · T–S–D–T → I–IV–V–I" },
    circle_multi_replace: { zh: "功能替代", ja: "機能の代理", en: "Function substitute" },
    circle_multi_empty_seq: { zh: "暂无功能序列", ja: "機能進行はありません", en: "No function sequence" },
    circle_multi_play_scale: { zh: "播放音阶", ja: "音階を再生", en: "Play scale" },
    circle_multi_anti: { zh: "反功能", ja: "反機能", en: "Anti-functional" },
    circle_multi_mode_chip: { zh: "调式", ja: "旋法", en: "Mode" },
    circle_multi_mode_label: { zh: "调式", ja: "旋法", en: "Mode" },
    circle_multi_sort_tension: { zh: "张力 {val}", ja: "緊張度 {val}", en: "Tension {val}" },
    circle_multi_sort_temp: { zh: "温度 {val}", ja: "温度 {val}", en: "Temperature {val}" },
    circle_multi_table_hint: { zh: "点击行播放和弦", ja: "行をクリックしてコードを再生", en: "Click a row to play the chord" },
    ack_color_harmony_studio: { zh: "特别感谢色彩和声工作室提供的特性进行数据", ja: "特性進行のデータは色彩和声工作室のご提供です", en: "Characteristic-progression data courtesy of Color Harmony Studio" },
    circle_multi_no_match: { zh: "没有匹配的调式", ja: "該当する旋法はありません", en: "No matching modes" },
    circle_multi_search_placeholder: { zh: "搜索调式", ja: "旋法を検索", en: "Search modes" },
    circle_multi_filter_normal: { zh: "仅常规调式", ja: "通常の旋法のみ", en: "Common modes only" },
    circle_multi_filter_natural: { zh: "仅自然音阶", ja: "自然音階のみ", en: "Natural scales only" },
    parse_error: { zh: "解析失败：", ja: "解析できません：", en: "Could not parse: " },
    source_label: { zh: "来源", ja: "出典", en: "Source" },
    no_key_recommended: { zh: "没有推荐的调", ja: "推奨される調はありません", en: "No key recommended" },
    neo_zoom_out: { zh: "缩小", ja: "縮小", en: "Zoom out" },
    neo_zoom_in: { zh: "放大", ja: "拡大", en: "Zoom in" },
    neo_fit: { zh: "适应画布", ja: "全体を表示", en: "Fit to view" },
    neo_canvas_aria: { zh: "{center} 和声连接图 下方提供可选择的和弦列表", ja: "{center} の和声連結図（下に選択できるコードの一覧があります）", en: "Harmony network around {center}; a selectable chord list follows below" },
    neo_caption: { zh: "{n} 个和弦 / {d} 层", ja: "{n} 個のコード / {d} 階層", en: "{n} chords / {d} levels" },
    neo_family_tonnetz: { zh: "音网图", ja: "トネッツ", en: "Tonnetz" },
    neo_family_octatonic: { zh: "八音塔", ja: "オクタトニック塔", en: "Octatonic tower" },
    neo_family_harmony: { zh: "和弦连接网", ja: "コード連結網", en: "Chord network" },
    neo_click_explore: { zh: "点击和弦继续探索", ja: "コードをクリックしてさらに探索", en: "Click a chord to keep exploring" },
    neo_start_chord: { zh: "起始和弦", ja: "開始コード", en: "Start chord" },
    neo_list_count: { zh: "{depth}层, {n}个和弦", ja: "{depth} 階層・{n} 個のコード", en: "{depth} levels, {n} chords" },
    neo_level: { zh: "第 {depth} 层", ja: "第 {depth} 階層", en: "Level {depth}" },
    cl_resolve_secondary: { zh: "解决到 {target}（{degree}） 保留共同音 临时导音上行解决", ja: "{target}（{degree}）へ解決。共通音を保ち、臨時の導音は上行解決", en: "Resolve to {target} ({degree}); keep common tones and resolve the applied leading tone upward" },
    cl_mode_major_generic: { zh: "大调(不分)", ja: "長調（区別なし）", en: "Major (any form)" },
    cl_mode_minor_generic: { zh: "小调(不分)", ja: "短調（区別なし）", en: "Minor (any form)" },
    cl_mode_major: { zh: "自然大调", ja: "自然長音階", en: "Natural major" },
    cl_mode_harmonic_major: { zh: "和声大调", ja: "和声的長音階", en: "Harmonic major" },
    cl_mode_melodic_major: { zh: "旋律大调", ja: "旋律的長音階", en: "Melodic major" },
    cl_mode_minor: { zh: "自然小调", ja: "自然短音階", en: "Natural minor" },
    cl_mode_harmonic_minor: { zh: "和声小调", ja: "和声的短音階", en: "Harmonic minor" },
    cl_mode_melodic_minor: { zh: "旋律小调", ja: "旋律的短音階", en: "Melodic minor" },
    cl_mode_all: { zh: "/ (列出全部可能性)", ja: "/（すべての可能性を表示）", en: "/ (list every possibility)" },
    cl_play: { zh: "播放", ja: "再生", en: "Play" },
    cl_play_this_chord: { zh: "播放此和弦", ja: "このコードを再生", en: "Play this chord" },
    cl_chain_title: { zh: "连续和声连接", ja: "連続した和声連結", en: "Chord chain" },
    cl_play_button: { zh: "► 播放", ja: "► 再生", en: "► Play" },
    cl_play_sequence: { zh: "► 播放序列", ja: "► 進行を再生", en: "► Play sequence" },
    cl_stop: { zh: "■ 停止", ja: "■ 停止", en: "■ Stop" },
    cl_back: { zh: "↶ 回退", ja: "↶ 戻る", en: "↶ Undo" },
    cl_clear: { zh: "× 清空", ja: "× クリア", en: "× Clear" },
    cl_chain_empty: { zh: "输入当前和弦 或从功能库选择起点", ja: "現在のコードを入力するか、機能一覧から始点を選んでください", en: "Enter a chord or pick a starting point from the function library" },
    cl_playback_settings: { zh: "播放设置", ja: "再生設定", en: "Playback" },
    cl_tempo: { zh: "速度", ja: "テンポ", en: "Tempo" },
    cl_tempo_aria: { zh: "播放速度", ja: "再生テンポ", en: "Playback tempo" },
    cl_bpm_aria: { zh: "BPM 数值", ja: "BPM の値", en: "BPM value" },
    cl_meter_aria: { zh: "播放拍号", ja: "拍子", en: "Meter" },
    cl_mode_aria: { zh: "序列播放方式", ja: "再生方法", en: "Playback style" },
    cl_block: { zh: "柱式和声", ja: "和音（ブロック）", en: "Block chords" },
    cl_arpeggio: { zh: "琶音 1-3-5", ja: "アルペジオ 1-3-5", en: "Arpeggio 1-3-5" },
    cl_satb_checked: { zh: "四部连接已校验 B / T / A / S 固定声部 与转位低音", ja: "四声体の連結を検証済み：B / T / A / S の声部と転回形のバス", en: "Four-part connection checked: fixed B / T / A / S voices and inversion basses" },
    cl_voicing_fallback: { zh: "这种写法不对：{reason}（违反：{issues}）。仍按顺序播放，也可以送入五线谱，在那里改正。", ja: "この書き方は正しくない：{reason}（違反：{issues}）。順番どおり再生でき、五線譜へ送って直すこともできます。", en: "This is not correct part-writing: {reason} (breaks: {issues}). It still plays in order and can be sent to the staff to fix." },
    cl_paths_title: { zh: "连续建议路线", ja: "推奨される進行ルート", en: "Suggested routes" },
    cl_steps: { zh: "{n} 步", ja: "{n} 手", en: "{n} steps" },
    cl_mod_need_chord: { zh: "先输入当前和弦或点击功能组 再选择这里的转调方案", ja: "まず現在のコードを入力するか機能グループを選び、ここで転調案を選んでください", en: "Enter a chord or pick a function group first, then choose a modulation here" },
    cl_mod_same_key: { zh: "目标调与当前调相同 不需要转调", ja: "目標の調は現在の調と同じなので転調は不要です", en: "The target key is the current key — no modulation needed" },
    cl_pivot: { zh: "枢纽 {chord} · 四部连接已校验", ja: "ピボット {chord} · 四声体を検証済み", en: "Pivot {chord} · four-part voice leading checked" },
    cl_mod_no_pivot: { zh: "当前调性与目标调性之间没有找到可用的共同和弦枢纽", ja: "現在の調と目標の調の間に使える共通和音（ピボット）が見つかりません", en: "No usable pivot chord was found between the current and target keys" },
    cl_mod_title: { zh: "转调候选 · 到 {target}", ja: "転調の候補 · {target} へ", en: "Modulation options · to {target}" },
    cl_mod_hint: { zh: "点击下面的方案才会把转调路线加入连续和声连接 上方选项只负责指定目标调", ja: "下の案をクリックすると転調ルートが連結に加わります。上の選択肢は目標の調を指定するだけです", en: "Click an option below to add the modulation to the chain; the selectors above only set the target key" },
    cl_group_tonic: { zh: "主功能组(T / DT)", ja: "主機能群（T / DT）", en: "Tonic group (T / DT)" },
    cl_group_subdominant: { zh: "下属功能组(S / TSVI / VII)", ja: "下属機能群（S / TSVI / VII）", en: "Subdominant group (S / TSVI / VII)" },
    cl_group_dominant: { zh: "属功能组(D / K)", ja: "属機能群（D / K）", en: "Dominant group (D / K)" },
    cl_group_leading: { zh: "导功能组(Dᵥᵢᵢ)", ja: "導音機能群（Dᵥᵢᵢ）", en: "Leading-tone group (Dᵥᵢᵢ)" },
    cl_group_altered: { zh: "变和弦组(N / +6)", ja: "変化和音群（N / +6）", en: "Altered chords (N / +6)" },
    cl_group_dd: { zh: "重属功能组(DD)", ja: "ドッペルドミナント群（DD）", en: "Double dominant (DD)" },
    cl_palette_title: { zh: "Sposobin 功能组", ja: "スポソービンの機能群", en: "Sposobin function groups" },
    cl_tonicization_title: { zh: "离调与变音体系", ja: "一時的転調と変化和音", en: "Tonicization and chromatic chords" },
    cl_to_degree: { zh: "至 {degree} 级", ja: "{degree} 度へ", en: "to {degree}" },
    cl_secondary: { zh: "副属和弦", ja: "副属和音", en: "Secondary dominants" },
    cl_function: { zh: "功能", ja: "機能", en: "Function" },
    cl_bass: { zh: "低音", ja: "バス", en: "Bass" },
    cl_inversion: { zh: "转位", ja: "転回", en: "Inversion" },
    cl_root_position: { zh: "根位", ja: "基本形", en: "root position" },
    cl_summary_empty: { zh: "请选择或输入一个和弦 开始查看连续连接建议", ja: "コードを選ぶか入力すると、続く連結の提案が表示されます", en: "Choose or enter a chord to see what can follow" },
    cl_recommendations: { zh: "推荐衔接", ja: "推奨される連結", en: "Recommended next chords" },
    cl_add_to_chain_aria: { zh: "将 {chord} 加入连续和声连接", ja: "{chord} を連結に追加", en: "Add {chord} to the chain" },
    cl_add_to_chain: { zh: "加入连续和声连接", ja: "連結に追加", en: "Add to the chain" },
    cl_common_tones: { zh: "共同音", ja: "共通音", en: "Common tones" },
    cl_voice_distance: { zh: "声部距离", ja: "声部の移動量", en: "Voice motion" },
    cl_play_chord: { zh: "播放和弦", ja: "コードを再生", en: "Play chord" },
    cl_play_satb: { zh: "► 试听四部连接", ja: "► 四声体の連結を試聴", en: "► Hear four-part connection" },
    cl_tab_recommendations: { zh: "推荐", ja: "推奨", en: "Suggestions" },
    cl_tab_paths: { zh: "路线", ja: "ルート", en: "Routes" },
    cl_tab_modulations: { zh: "转调", ja: "転調", en: "Modulation" },
    cl_tab_palette: { zh: "功能库", ja: "機能一覧", en: "Library" },
    cl_variant_incomplete: { zh: "不完全", ja: "不完全", en: " (incomplete)" },
    cl_variant_deceptive: { zh: "（阻碍进行）", ja: "（偽進行）", en: " (deceptive)" },
    cl_variant_minor: { zh: "（小调）", ja: "（短調）", en: " (minor)" },
    cl_variant_doubled_third: { zh: "双三", ja: "（第3音重複）", en: " (doubled 3rd)" },
    cl_input_placeholder: { zh: "输入和弦或点击功能组", ja: "コードを入力するか機能群をクリック", en: "Enter a chord or click a function group" },
    cl_modulate_to: { zh: "转调到", ja: "転調先", en: "Modulate to" },
    cl_target_mode: { zh: "目标调式", ja: "目標の旋法", en: "Target mode" },
    label_audio: { zh: "声音", ja: "音量", en: "Sound" },
    audio_stop: { zh: "■ 停止", ja: "■ 停止", en: "■ Stop" },
    shortcut_title: { zh: "键盘快捷键", ja: "キーボード・ショートカット", en: "Keyboard shortcuts" },
    shortcut_stop: { zh: "停止所有播放", ja: "すべての再生を停止", en: "Stop all playback" },
    shortcut_focus: { zh: "聚焦当前面板的输入框", ja: "現在のパネルの入力欄へ移動", en: "Focus the current panel’s input" },
    shortcut_panels: { zh: "上一个 / 下一个面板", ja: "前 / 次のパネル", en: "Previous / next panel" },
    shortcut_nav: { zh: "在侧栏中移动（焦点在侧栏时）", ja: "サイドバー内を移動（フォーカス時）", en: "Move within the sidebar (when focused)" },
    shortcut_mute: { zh: "静音 / 取消静音", ja: "ミュート / 解除", en: "Mute / unmute" },
    shortcut_help: { zh: "显示 / 关闭本说明", ja: "この一覧の表示 / 非表示", en: "Show / hide this list" },
    shortcut_open: { zh: "快捷键 ?", ja: "ショートカット ?", en: "Shortcuts ?" },
    shortcut_close: { zh: "关闭", ja: "閉じる", en: "Close" },
    midi_connect: { zh: "连接 MIDI 键盘", ja: "MIDI キーボードを接続", en: "Connect MIDI keyboard" },
    midi_ready: { zh: "MIDI 已连接", ja: "MIDI 接続済み", en: "MIDI connected" },
    midi_waiting: { zh: "未检测到 MIDI 设备，请插入后重试", ja: "MIDI 機器が見つかりません", en: "No MIDI device found — plug one in" },
    midi_unavailable: { zh: "此浏览器不支持 Web MIDI", ja: "このブラウザは Web MIDI に非対応です", en: "This browser doesn’t support Web MIDI" },
    midi_denied: { zh: "MIDI 访问被拒绝", ja: "MIDI へのアクセスが拒否されました", en: "MIDI access was denied" },
    midi_micro: { zh: "微分音面板使用自己的 MIDI 处理", ja: "微分音パネルは独自に MIDI を処理します", en: "The microtonal panel handles MIDI itself" },
    staff_export_hint: { zh: "下载这份谱例（白底，适合打印）", ja: "この譜例をダウンロード（白背景・印刷向け）", en: "Download this score (white background, print-ready)" },
    alt_random_note: { zh: "alt 的和弦音不固定，每次识别随机选取变化音", ja: "alt の構成音は固定されず、認識するたびに変化音を選び直します", en: "alt has no fixed tones — each run picks a new set of altered tensions" },
    blk_name: { zh: "Blackadder 和弦", ja: "ブラックアダー・コード", en: "Blackadder chord" },
    share_link: { zh: "复制链接", ja: "リンクをコピー", en: "Copy link" },
    share_copied: { zh: "已复制", ja: "コピーしました", en: "Copied" },
    share_failed: { zh: "请手动复制", ja: "手動でコピーしてください", en: "Copy it manually" },
    share_prompt: { zh: "浏览器不允许自动复制，请手动复制这个链接：", ja: "自動コピーできません。このリンクをコピーしてください：", en: "Automatic copy isn’t allowed here — copy this link:" },
    theme_light: { zh: "浅色", ja: "ライト", en: "Light" },
    label_language: { zh: "语言", ja: "言語", en: "Language" },
    lang_auto: { zh: "自动", ja: "自動", en: "Auto" },
    ui_lang_auto_title: { zh: "跟随浏览器语言", ja: "ブラウザーの言語に合わせる", en: "Follow the browser language" },
    ui_language: { zh: "界面语言", ja: "表示言語", en: "Interface language" },
    ui_loading: { zh: "正在加载…", ja: "読み込み中…", en: "Loading…" },
    theme_dark: { zh: "深色", ja: "ダーク", en: "Dark" },
    label_notation: { zh: "音名记法", ja: "音名表記", en: "Notation" },
    notation_flats: { zh: "♭ 降号", ja: "♭ フラット", en: "♭ Flats" },
    notation_sharps: { zh: "♯ 升号", ja: "♯ シャープ", en: "♯ Sharps" },
    nav_form: { zh: "曲式结构", ja: "楽式構造", en: "Musical Form" },
    nav_rhythm: { zh: "节奏型工具箱", ja: "リズム", en: "Rhythm Toolbox" },
    intro_form: { zh: "从乐段到完整结构 比较和声 调性与终止", ja: "楽節から構造を作る", en: "Explore sections harmony keys and cadences" },
    intro_rhythm: { zh: "听见强弱与留白 在格子中改写节奏", ja: "拍とリズムを編集する", en: "Edit accents durations and rests" },
    play_chord: { zh: "播放和弦", ja: "コードを再生", en: "Play chord" },
    chord_to_staff: { zh: "送到五线谱（接在后面）", ja: "五線譜へ送る（後ろに追加）", en: "Send to staff (append)" },
    identified_chord: { zh: "识别结果", ja: "識別結果", en: "IDENTIFIED CHORD" },
    note_count_unit: { zh: "个组成音", ja: "構成音", en: "notes" },
    piano_title: { zh: "听听这个和弦", ja: "コードを聴く", en: "Hear the voicing" },
    piano_hint: { zh: "点击琴键试听单音", ja: "鍵盤をクリックして試聴", en: "Select a key to hear each note" },
    bass_tone: { zh: "低音", ja: "ベース音", en: "Bass" },
    chord_tone: { zh: "和弦音", ja: "コード音", en: "Chord tone" },
    chord_input_error: { zh: "请输入有效和弦或音符 如 Cmaj7 或 C E G", ja: "Cmaj7 などのコードを入力してください", en: "Enter a chord or notes such as Cmaj7 or C E G" },
    'chord-input-help': { zh: "试试看", ja: "試す", en: "Try" },
    'workspace-footer-note': { zh: "让理论回到音乐", ja: "理論から音楽へ", en: "From theory to music" },
    intro_chord: { zh: "从一个和弦开始 探索音符之间的关系", ja: "コードから音のつながりを探る", en: "Start with a chord and explore the notes within" },
    intro_classical: { zh: "连接和声功能 寻找下一个和弦", ja: "和声機能をつなぎ 次のコードを探す", en: "Follow harmonic functions to your next chord" },
    intro_blues: { zh: "从12小节、蓝调音、问答乐句和和弦配色探索布鲁斯", ja: "12小節、ブルーノート、フレーズとコードカラーを探る", en: "Explore 12-bar forms, blue notes, phrases and chord colors" },
    intro_lcc: { zh: "不依赖和弦探索Lydian父本、音调顺序、色彩与派生调式", ja: "コードなしでリディアンの親音階・音調順序・カラーを探る", en: "Explore Lydian parents, tonal order, colors and derived modes without a chord" },
    intro_cst: { zh: "从和弦音阶、进行代理、延伸音与配置，走进爵士即兴", ja: "コードスケール、進行、テンションとボイシングを探る", en: "Explore chord scales, progressions, tensions and voicings" },
    intro_neo: { zh: "比较新里曼变换、八音塔与和弦连接网，并在同一图中追踪连接", ja: "ネオ・リーマン変換、オクタトニック、コード接続網を比較", en: "Compare Neo-Riemannian, octatonic and functional chord connections" },
    intro_micro: { zh: "用整数频率比探索纯律、平均律与微分音和声", ja: "整数比で純正律・平均律・微分音和声を探る", en: "Explore just intonation, equal temperaments and microtonal harmony through frequency ratios" },
    intro_ref: { zh: "查阅音阶组成与和弦家族", ja: "音階とコードファミリーを調べる", en: "Look up scales and chord families" },
    intro_circle: { zh: "沿着五度关系 探索调性与调式", ja: "五度の関係から調性を探る", en: "Explore keys and modes through fifth relationships" },
    intro_other: { zh: "分析进行 探索负和声与导向音", ja: "進行とネガティブハーモニーを探る", en: "Explore progressions, negative harmony and guide tones" },
    intro_about: { zh: "为学习 作曲与即兴而做", ja: "学習と作曲と即興のために", en: "Made for learning, composing and improvising" },
    title: { zh: "乐理工具箱", ja: "音楽理論ツールボックス", en: "Music Theory Toolbox" },
    header_h1: { zh: "乐理工具箱", ja: "音楽理論ツールボックス", en: "Music Theory Toolbox" },
    subtitle: { zh: "和弦 音阶 与即兴", ja: "コード 音階 即興", en: "Chords, scales & improvisation" },
    nav_chord: { zh: "和弦转换", ja: "コード変換", en: "Chord Converter" },
    cl_send_staff: { zh: "送到五线谱", ja: "五線譜へ送る", en: "Send to staff" },
    cl_staff_title: { zh: "四部和声谱例", ja: "4 声体の譜例", en: "Four-part score" },
    cl_staff_hint: { zh: "女高、女中写在高音谱表，男高、男低写在低音谱表，声部按播放时同一套四部规则排列。每个和弦下面依次是功能记号、级数、和弦名、和弦音和功能组；每段开头标出 |Key=…|。点一列试听这个和弦，点下面的标注让和弦链退回到那里；超过 8 个和弦时可以左右滚动。", ja: "ソプラノ・アルトはト音譜表、テノール・バスはヘ音譜表。声部は再生と同じ 4 声の規則で配置。各和音の下は機能記号・度数・和音名・構成音・機能グループ、各区間の始めに |Key=…|。列をクリックで試聴、下の表示をクリックでそこまで戻ります。8 和音を超えると横スクロール。", en: "Soprano and alto on the treble staff, tenor and bass on the bass staff, voiced by the same four-part rules as playback. Under each chord: function symbol, Roman numeral, chord name, chord tones and function group; each key section starts with |Key=…|. Click a column to hear it, click its labels to step the chain back there; beyond 8 chords the staff scrolls sideways." },
    nav_classical: { zh: "古典和声", ja: "古典和声接続", en: "Classical Harmony" },
    nav_blues: { zh: "布鲁斯工具箱", ja: "ブルース・ツール", en: "Blues Toolkit" },
    nav_lcc: { zh: "LCC概念实验室", ja: "LCCコンセプト実験室", en: "LCC Concept Lab" },
    nav_cst: { zh: "爵士工具箱", ja: "ジャズ・ツールボックス", en: "Jazz Toolbox" },
    nav_other: { zh: "其他工具", ja: "その他ツール", en: "Other Tools" },
    nav_about: { zh: "关于", ja: "について", en: "About" },
    nav_micro: { zh: "微分音工具箱", ja: "微分音ツールボックス", en: "Microtonal Lab" },

    sort_title: { zh: "排序方式", ja: "ソート方式", en: "Sort By" },
    sort_score: { zh: "评分", ja: "スコア", en: "Score" },
    sort_stability: { zh: "稳定性", ja: "安定性", en: "Stability" },
    sort_tension: { zh: "紧张度", ja: "緊張度", en: "Tension" },
    sort_brightness: { zh: "明亮度", ja: "明るさ", en: "Brightness" },
    sort_asc: { zh: "升序", ja: "昇順", en: "Ascending" },
    sort_desc: { zh: "降序", ja: "降順", en: "Descending" },

    label_chord_example: { zh: "和弦或音符", ja: "コードまたは音符", en: "Chord or notes" },
    label_classical_key: { zh: "调性", ja: "調", en: "Key" },
    label_classical_mode: { zh: "调式", ja: "旋法", en: "Mode" },
    label_classical_chord: { zh: "当前和弦", ja: "現在の和音", en: "Current chord" },
    classical_run_btn: { zh: "推荐衔接", ja: "接続を提案", en: "Recommend" },
    label_blues_example: { zh: "布鲁斯和弦", ja: "コード(ブルース): ", en: "Blues chord" },
    label_lcc_example: { zh: "分析和弦", ja: "コード(LCC): ", en: "Chord" },
    label_cst_example: { zh: "和弦", ja: "コード", en: "Chord" },
    label_other_example: { zh: "和弦", ja: "コード(その他): ", en: "Chord" },

    remove_chord: { zh: "移除和弦", ja: "コードを削除", en: "Remove Chord" },
    
    // 在 neo_octatonic_title 附近添加
    neo_extended: { zh: "(扩展)", ja: "(拡張)", en: "(Extended)" },
    neo_chord_depth_heading: { zh: "第 {depth} 层", ja: "第 {depth} 階層", en: "Layer {depth}" },
    neo_layer_chords_info: { zh: "{depth}层, {chords_count}个和弦", ja: "{depth}階層, コード{chords_count}個", en: "{depth} Layer, {chords_count} Chords" },
    neo_original_chord: { zh: "原始和弦", ja: "元のコード", en: "Original Chord" },
    neo_no_transform: { zh: "该和弦没有可用的三和弦变换", ja: "このコードには利用可能な三和音変換がありません。", en: "No triad transformations available." },
    neo_no_octatonic: { zh: "该和弦没有八度音阶塔邻居", ja: "このコードにはオクタトニック隣接がありません。", en: "No octatonic neighbors found for this chord." },
    neo_octatonic_neighbors: { zh: "八度音阶邻居", ja: "オクタトニック隣接", en: "Octatonic Neighbors" },
    neo_legend_tonnetz: { zh: "● 主变换  ● 扩展变换  — 音网 (Tonnetz)", ja: "● 主変換  ● 拡張変換  — 音網 (Tonnetz)", en: "● Main  ● Extended  — Tonnetz" },
    neo_legend_octatonic: { zh: "八度音阶塔 (Octatonic Tower)", ja: "オクタトニック・タワー", en: "Octatonic Tower" },

    // 路径查找相关
    label_neo_path_from: { zh: "从", ja: "から: ", en: "From:" },
    label_neo_path_to: { zh: "到", ja: "へ: ", en: "To:" },
    label_neo_max_steps: { zh: "最大步数", ja: "最大ステップ: ", en: "Max Steps:" },
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
    neo_tree_view: { zh: "树状图", ja: "ツリー", en: "Tree" },
    neo_tonnetz_view: { zh: "音网图", ja: "トーンネッツ", en: "Tonnetz" },
    nav_neo: { zh: "和声连接论", ja: "和声接続論", en: "Harmonic Connections" },
    neo_sublevel: { zh: "新里曼理论", ja: "ネオ・リーマン理論", en: "Neo-Riemannian Theory" },
    neo_harmony_title: { zh: "和弦连接网", ja: "コード接続網", en: "Chord Connection Wheel" },
    neo_all_title: { zh: "全部连接", ja: "すべての接続", en: "All Connections" },
    neo_all_chords: { zh: "个和弦", ja: "コード", en: "chords" },
    neo_all_no_neighbors: { zh: "当前和弦没有该体系的邻接节点", ja: "この体系の隣接コードはありません", en: "No neighbors in this system" },
    neo_harmony_intro: { zh: "按你提供的图补齐五度环、相邻大小调、ii–V、属七到减和弦及中心减和弦大三度循环。点击节点可突出它的所有连线。", ja: "提供画像に沿って五度圏、長短調、ii–V、属七と減和音、中心の長三度循環を結びます。", en: "The supplied wheel's fifth cycle, neighboring major/minor, ii–V, dominant-to-diminished and inner major-third cycles. Select a node to highlight every incident link." },
    neo_harmony_nodes: { zh: "个节点", ja: "ノード", en: "nodes" },
    neo_harmony_links: { zh: "条连接", ja: "接続", en: "links" },
    neo_harmony_graph_alt: { zh: "可选择节点的和弦连接网，旁边有原图参考", ja: "選択できるコード接続網と参考画像", en: "Selectable chord connection wheel with the supplied reference image beside it" },
    neo_harmony_reference_alt: { zh: "用户提供的和弦连接网原图", ja: "ユーザー提供のコード接続網", en: "User-provided chord connection reference" },
    neo_harmony_reference_caption: { zh: "你提供的原图；点击图片查看大图。", ja: "提供された原図。クリックして拡大。", en: "Your reference image. Click to open full size." },
    neo_harmony_caveat: { zh: "交互图按原图反复出现的结构向 12 个调生成无方向连线；每条连接都可双向探索。属七与减和弦连接不是新里曼 P/L/R 变换。", ja: "画像の反復構造を12調へ展開した無方向の接続です。すべての接続を双方向に探索できます。属七と減和音はP/L/Rではありません。", en: "Links are transposed to all 12 keys from repeated structures in the image. Every link is undirected and can be explored in either direction. Dominant/diminished links are not P/L/R transformations." },
    neo_harmony_select: { zh: "选择和弦", ja: "コードを選ぶ", en: "Select chord" },
    neo_harmony_rel_fifth: { zh: "五度邻接", ja: "五度の隣接", en: "Fifth neighbor" },
    neo_harmony_rel_relative: { zh: "关系大小调", ja: "平行長短調", en: "Relative major/minor" },
    neo_harmony_rel_ii: { zh: "大调–ii小调", ja: "長調–ii短調", en: "Major–ii minor" },
    neo_harmony_rel_relative_dominant: { zh: "转向关系小调的属七", ja: "平行短調の属七", en: "Dominant of relative minor" },
    neo_harmony_rel_ii_v: { zh: "ii→V7", ja: "ii→V7", en: "ii→V7" },
    neo_harmony_rel_third_diminished: { zh: "共享三度的减和弦", ja: "三度を共有する減和音", en: "Third-related diminished" },
    neo_harmony_rel_upper_diminished: { zh: "属七上三音的减和弦", ja: "属七の上三音", en: "Upper-three diminished" },
    neo_harmony_rel_fifth_diminished: { zh: "属七五度／七度共享", ja: "属七の五度・七度を共有", en: "Dominant fifth/seventh overlap" },
    neo_harmony_rel_dim_cycle: { zh: "中心大三度循环", ja: "中心の長三度循環", en: "Inner major-third cycle" },
    neo_harmony_rel_dominant: { zh: "属七→大调", ja: "属七→長調", en: "V7→I" },
    neo_harmony_rel_minor_dominant: { zh: "属七→小调", ja: "属七→短調", en: "V7→i" },
    neo_harmony_rel_diminished: { zh: "导音减和弦→大调", ja: "導音減和音→長調", en: "vii°→I" },
    neo_harmony_no_match: { zh: "该和弦不在原图的四类节点中", ja: "このコードは参考図の四つの種類にありません", en: "Chord is outside the four families in the reference" },
    neo_harmony_major: { zh: "大三和弦", ja: "長三和音", en: "Major triads" },
    neo_harmony_minor: { zh: "小三和弦", ja: "短三和音", en: "Minor triads" },
    neo_harmony_dominant: { zh: "属七和弦", ja: "属七", en: "Dominant sevenths" },
    neo_harmony_diminished: { zh: "减三和弦", ja: "減三和音", en: "Diminished triads" },
    label_neo_example: { zh: "起始和弦", ja: "コード(ネオ・リーマン): ", en: "Starting chord" },
    neo_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },
    neo_triad_title: { zh: "音网变换 (PLRNSD)", ja: "トネッツ変換 (PLRNSD)", en: "Tonnetz (PLRNSD)" },
    neo_octatonic_title: { zh: "八度音阶塔", ja: "オクタトニック・タワー", en: "Octatonic Tower" },

    nav_ref: { zh: "和弦音阶速查", ja: "コード・スケール辞典", en: "Chord & Scale Ref" },
    label_ref_root: { zh: "根音", ja: "ルート: ", en: "Root:" },
    label_ref_scale: { zh: "音阶", ja: "スケール: ", en: "Scale:" },
    label_ref_family: { zh: "和弦家族", ja: "コードファミリー: ", en: "Chord Family:" },
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
    circle_add_seventh: { zh: "加七音（调内）", ja: "第 7 音を加える（調内）", en: "Add diatonic seventh" },
    circle_restore_triads: { zh: "恢复三和弦默认状态", ja: "三和音の基本形に戻す", en: "Reset to root-position triads" },
    circle_invert_up: { zh: "上转位：最低音升高八度", ja: "上へ転回：最低音を 1 オクターブ上げる", en: "Invert up: raise the lowest note an octave" },
    circle_invert_down: { zh: "下转位：最高音降低八度", ja: "下へ転回：最高音を 1 オクターブ下げる", en: "Invert down: lower the highest note an octave" },
    circle_upper_tonic: { zh: "高八度", ja: "1 オクターブ上", en: "Octave above" },
    circle_default_octave: { zh: "默认八度", ja: "基準のオクターブ", en: "Default octave" },
    circle_octave_unit: { zh: "八度", ja: "オクターブ", en: "octave(s)" },
    circle_major_natural: { zh: "自然大调", ja: "ナチュラルメジャー", en: "Natural Major" },
    circle_major_harmonic: { zh: "和声大调", ja: "ハーモニックメジャー", en: "Harmonic Major" },
    circle_major_melodic: { zh: "旋律大调", ja: "メロディックメジャー", en: "Melodic Major" },
    circle_minor_melodic: { zh: "旋律小调", ja: "メロディックマイナー", en: "Melodic Minor" },
    circle_ascending: { zh: "上行", ja: "上行", en: "Ascending" },
    circle_descending: { zh: "下行", ja: "下行", en: "Descending" },
    circle_melodic_major_note: { zh: "旋律大调上行同自然大调，下行降低第六、七级。表中显示所选方向的音符与调内三和弦。", ja: "旋律的長音階は上行で自然長音階、下行で第 6・7 音を半音下げます。表は選んだ方向の音と三和音です。", en: "Melodic major uses natural major ascending and lowers degrees 6 and 7 descending. The table shows notes and triads for the selected direction." },
    circle_melodic_minor_note: { zh: "古典旋律小调上行升高自然小调的第六、七级，下行恢复自然小调；爵士旋律小调两个方向都用上行形式。", ja: "古典の旋律的短音階は上行で自然短音階の第 6・7 音を上げ、下行で戻します。ジャズでは両方向に上行形を使います。", en: "Classical melodic minor raises natural minor's degrees 6 and 7 ascending and restores them descending; jazz melodic minor uses the ascending form both ways." },
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
    cst_run_btn: { zh: "查看", ja: "表示", en: "Explore" },
    other_run_btn: { zh: "分析", ja: "解析", en: "Analyze" },

    nav_rec: { zh: "和弦衔接", ja: "コード・コネクション", en: "Chord Connection" },
    nav_rec_example: { zh: "和弦 (衔接)", ja: "コード (コネクション)", en: "Chord (Connection)" },
    rec_count: { zh: "为 {input1} 推荐 {input2} 个衔接和弦", ja: "{input1} に {input2} 個の接続コードを推薦する", en: "Recommend {input2} connecting chords for {input1}" },
    label_rec_input: { zh: "起始和弦", ja: "開始コード: ", en: "Start Chord:" },
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
    sub_type_desc_1: { zh: "使用相同的三全音音程进行替换 常用于 ii-V-I 解决", ja: "同じ三全音(トライトーン)の間隔を使用して置き換えます。ii-V-Iの解決によく使われます。", en: "Substitute using the same tritone interval, commonly found in ii-V-I resolutions" },
    sub_type_desc_2: { zh: "共享大量相同音符 提供更明亮的色彩", ja: "多くの共通音を持ち、より明るい色彩を与えます。", en: "Shares many common notes, providing a brighter color" },
    sub_type_desc_3: { zh: "共享大量相同音符 产生更柔和或更忧郁的色彩", ja: "多くの共通音を持ち、より柔らかく、あるいは哀愁のある色彩を与えます。", en: "Share many of the same notes, resulting in a softer or more melancholic color." },

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
    label_other_example_key_center: { zh: "和弦(可增删)", ja: "コード(増減可):", en: "Chords (add/remove):" },
    label_other_example_report: { zh: "和弦", ja: "コード: ", en: "Chord:" },
    label_other_example_progression: { zh: "进行", ja: "進行: ", en: "progression:" },
    label_other_example_negative: { zh: "和弦", ja: "コード:", en: "Chord:" },
    label_other_example_guide: { zh: "进行", ja: "進行: ", en: "progression:" },

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
    lcc_parent_prefix: { zh: "父音", ja: "親: ", en: "Parent:" },
    lcc_position_prefix: { zh: "位置", ja: "位置: ", en: "Position:" },
    lcc_gravity_prefix: { zh: "引力", ja: "重力: ", en: "Gravity:" },

    // reasons used in blues suggestions and fallbacks
    reason_0: { zh: "平行: 标准小调布鲁斯", ja: "パラレル: 標準的なマイナーブルース", en: "Parallel: Standard minor blues" },
    reason_1: { zh: "平行: 纯净小调音色", ja: "パラレル: 純粋なマイナーサウンド", en: "Parallel: Pure minor sound" },
    reason_2: { zh: "中性: 明亮而开阔", ja: "ニュートラル: 明るく開放的", en: "Neutral: Bright and open" },
    reason_3: { zh: "关系: 甜美乡村布鲁斯色彩", ja: "リレート: 甘いカントリーブルースカラー", en: "Relative: Sweet country-blues color" },
    reason_4: { zh: "平行: 大调和弦上的布鲁斯张力", ja: "パラレル: メジャーコード上の“ブルース”テンション", en: "Parallel: 'Blue' tension over major chord" },
    reason_5: { zh: "平行: 经典爵士布鲁斯音色", ja: "パラレル: クラシックジャズブルースサウンド", en: "Parallel: Classic jazz-blues sound" },
    reason_6: { zh: "替代: 提供利迪亚(#11)色彩", ja: "サブスティテューション: リディアン(#11)カラー", en: "Substitution: Provides Lydian (#11) color" },
    reason_7: { zh: "替代: 平滑的爱奥利亚质感", ja: "サブスティテューション: スムーズなアイオリアンテクスチャ", en: "Substitution: Smooth Aeolian texture" },

    // Improv Feel names and descriptions (localized)
    improv_feel_name_1: { zh: "平和/甜美", ja: "安全でスイート", en: "Safe & Sweet" },
    improv_feel_desc_1: { zh: "协和的听感 非常适合流行和民谣蓝调", ja: "協和的でスイート — ポップやフォークブルースに適しています。", en: "Consonant and sweet — well suited for pop and folk-blues." },
    improv_feel_name_2: { zh: "灵魂感/平衡", ja: "ソウルフルでバランス", en: "Soulful & Balanced" },
    improv_feel_desc_2: { zh: "经典的蓝调味 张力与解决感平衡", ja: "クラシックなブルース感 — 緊張と解決のバランスが良い。", en: "Classic blues character — tension and resolution are well balanced." },
    improv_feel_name_3: { zh: "辛辣/爵士化", ja: "スパイシーでジャジー", en: "Spicy & Jazzy" },
    improv_feel_desc_3: { zh: "较高张力 带有波普与现代爵士蓝调特征", ja: "高めのテンション — ビバップやモダンジャズブルースの特徴を持つ。", en: "Higher tension — evokes bebop and modern jazz-blues characteristics." },
    improv_feel_name_4: { zh: "实验/Outside", ja: "実験的 / アウトサイド", en: "Experimental / Outside" },
    improv_feel_desc_4: { zh: "强烈不协和 适合创造激烈的离调色彩", ja: "非常に不協和でエッジが効いている — 強いアウトサイドの色彩を作る。", en: "Highly dissonant and edgy — creates strong outside colors and tension." },

    // About page
    about_title: { zh: "关于乐理工具箱", ja: "音楽理論ツールボックスについて", en: "About Music Theory Toolbox" },
    about_desc: {
      zh: "乐理工具箱是一个开在浏览器里的乐理百宝箱：从五线谱、音程、大小调，到古典和声、数字低音、类别对位，再到爵士的和弦音阶、Voicing、LCC、负和声，以及中国民族调式、世界调式、历史律制、二十世纪技法和微分音。每个工具都能弹出声音、画出谱例，看不懂的地方点一下\"看不懂？玩教程\"，就能去乐理闯关里用几分钟玩懂它。",
      ja: "音楽理論ツールボックスは、ブラウザで開く音楽理論の道具箱です。五線譜・音程・長短調から、古典和声・数字付き低音・類別対位法、ジャズのコード・スケール、ボイシング、LCC、ネガティブ・ハーモニー、さらに中国の民族旋法・世界の旋法・歴史的音律・20 世紀の技法・微分音まで。どのツールも音を鳴らし、譜例を描きます。わからないときは「看不懂？玩教程（チュートリアル）」を押せば、音楽理論チャレンジで数分遊ぶうちにわかるはずです。",
      en: "Music Theory Toolbox is a music-theory kit that lives in your browser: from the staff, intervals and keys, through classical harmony, figured bass and species counterpoint, to jazz chord–scales, voicings, the LCC and negative harmony, plus Chinese modes, world modal systems, historical temperaments, twentieth-century techniques and microtonality. Every tool plays sound and draws notation; when something does not make sense, the tutorial button takes you to a few-minute Theory Quest level that explains it.",
    },
    about_more: {
      zh: "不用安装，打开网页就能用；支持中文、日文、英文；在 https 下可以\"安装\"成应用离线使用。乐理内容都是查了公开资料再写的，每一处引用都在代码里标注，出处列在本页最下面。",
      ja: "インストール不要で、ページを開けばすぐ使えます。日本語・中国語・英語に対応し、https ではアプリとしてインストールしてオフラインでも使えます。理論の内容はすべて公開資料を調べてから書き、引用箇所はコードに明記、出典はこのページの下にまとめています。",
      en: "Nothing to install — just open the page. Available in Chinese, Japanese and English, and installable as an offline app over https. All theory content was written from published sources; every citation is marked in the code and listed at the bottom of this page.",
    },
    about_tools_title: { zh: "都有些什么", ja: "なにがあるか", en: "What’s inside" },
    about_tips_title: { zh: "用起来顺手的小技巧", ja: "使いこなしのコツ", en: "Handy tips" },
    about_tips: {
      zh: ["每个工具顶部的\"看不懂？玩教程\"会直接跳到对应的闯关关卡；做到一半去工具里看看，再点\"回到教程\"就能回到原来那一题。", "\"复制链接\"会把当前面板和输入一起放进网址，发给别人打开就是同一个画面。", "按 ? 看全部快捷键；Esc 或侧栏的\"停止\"能马上让所有声音停下。", "插上 MIDI 键盘、点\"连接 MIDI 键盘\"，弹下的和弦会自动识别。", "乐理闯关的进度只存在你自己的浏览器里，换浏览器或清缓存会重来——不是 bug，是我懒得做账号系统。"],
      ja: ["各ツール上部のチュートリアルボタンで対応ステージへ。途中でツールを見に行っても、「チュートリアルに戻る」で同じ問題に戻れます。", "「リンクをコピー」で今のパネルと入力が URL に入るので、送った相手も同じ画面を開けます。", "? でショートカット一覧、Esc かサイドバーの「停止」ですべての音が止まります。", "MIDI キーボードをつないで「MIDI キーボードを接続」を押すと、弾いたコードを自動で判定します。", "チャレンジの進み具合はあなたのブラウザにだけ保存されます。ブラウザを替えたりキャッシュを消したりすると最初から——バグではなく、作者がアカウント機能を作るのを面倒がっただけです。"],
      en: ["The tutorial button at the top of each tool jumps to the matching Theory Quest level; if you pop out to a tool midway, “Back to tutorial” returns you to the same question.", "“Copy link” puts the current panel and input into the URL, so whoever opens it sees the same screen.", "Press ? for all shortcuts; Esc or the sidebar’s Stop silences everything at once.", "Plug in a MIDI keyboard and click “Connect MIDI keyboard” — the chords you play are named automatically.", "Theory Quest progress lives only in your own browser; switching browsers or clearing data starts you over. Not a bug — the author just couldn’t be bothered to build accounts."],
    },
    about_ramble_title: { zh: "作者的碎碎念", ja: "作者のひとりごと", en: "The author rambles" },
    about_ramble: {
      zh: ["先坦白：我的乐理水平真的一般。做这个工具箱，一半是想帮别人，另一半是想逼自己把没弄懂的东西弄懂。很多内容是一边查资料一边写的，写着写着才发现，自己以前有好几样东西理解错了好多年。", "所以这里每一条乐理都标了出处——不是因为我多严谨，是因为我实在不敢相信自己的记忆。如果你发现哪里写错了，那大概率是我抄错了，不是原作者的锅，欢迎来 GitHub 指出来（温柔一点）。", "吐槽时间：同一个小三和弦能写成 Cm、C-、Cmin、Cmi……写和弦解析器的那几天我是真的怀疑人生。还有，C♭ 大调居然真的存在，七个降号，谁会用啊（会有人用的，我错了）。", "再吐槽：十六分音符的符杠、跨小节的连音线、谱号的形状……记谱这件事比我想象的难太多了，向所有打谱软件的作者致敬。", "微分音那部分越挖越深，挖完才发现八度不一定只切 12 份，可我的钢琴只有 12 份。", "这个项目没有广告，也不赚钱，纯粹是因为喜欢。它要是能让你少翻几页书、少卡在某个概念上一会儿，我就很开心了。", "最后，乐理不是规定，是前人听音乐听出来的经验总结。这个工具箱只是一张地图，路还得用自己的耳朵去走。"],
      ja: ["最初に白状すると、作者の音楽理論の腕前はたいしたことありません。このツールボックスは、半分は誰かの役に立ちたくて、もう半分はわかっていなかったことを自分にわからせるために作りました。資料を調べながら書いているうちに、何年も勘違いしていたことがいくつも見つかりました。", "だからここの理論にはすべて出典をつけています。几帳面だからではなく、自分の記憶がまったく信用できないからです。間違いを見つけたら、たぶん作者の写し間違いで、原典のせいではありません。GitHub で（やさしく）教えてください。", "ぼやきタイム：同じマイナー・トライアドが Cm、C-、Cmin、Cmi……と書けるせいで、コード解析を書いていた数日間は本気で人生を疑いました。それに C♭ 長調は本当にあるんです。フラット 7 つ。誰が使うの？（使う人はいます。ごめんなさい）", "もうひとつ：16 分音符の連桁、小節をまたぐタイ、音部記号の形……記譜は想像よりずっと難しかった。楽譜ソフトの作者の皆さんに敬礼。", "微分音のところは掘れば掘るほど深くて、掘り終わってからオクターヴは 12 等分とは限らないと知りました。うちのピアノは 12 等分しかないのに。", "このプロジェクトには広告もなく、お金にもなりません。ただ好きだから作っています。本を何ページか開かずに済んだり、ある概念で詰まる時間が少し減ったりしたなら、それで十分うれしいです。", "最後に。音楽理論は決まりごとではなく、先人が音楽を聴いてまとめた経験です。このツールボックスは地図にすぎません。道は自分の耳で歩いてください。"],
      en: ["Confession first: my music theory is honestly pretty average. Half of this toolbox exists to help other people; the other half exists to force me to finally understand the things I didn’t. A lot of it was written while reading up, and along the way I found several things I had been getting wrong for years.", "That’s why every bit of theory here cites a source — not because I’m rigorous, but because I really don’t trust my own memory. If you spot a mistake, it’s most likely my copying error and not the original author’s fault. Please point it out on GitHub (gently).", "Complaint corner: the same minor triad can be written Cm, C-, Cmin, Cmi… the days I spent on the chord parser made me question my life choices. Also, C♭ major really exists. Seven flats. Who uses that? (Someone does. I’m sorry.)", "Another one: beams on sixteenth notes, ties across barlines, the shape of a clef… notation is far harder than I imagined. Hats off to everyone who writes notation software.", "The microtonal part kept getting deeper, and only at the end did I learn that the octave doesn’t have to be cut into 12. My piano only has 12.", "There are no ads here and no money in it — I made it because I like this stuff. If it saves you a few pages of reading, or a little time stuck on some concept, that makes me very happy.", "Finally: music theory isn’t a set of rules; it’s what people before us learned by listening. This toolbox is only a map — you still have to walk the road with your own ears."],
    },
    about_credits_title: { zh: "致谢与授权", ja: "謝辞とライセンス", en: "Credits & licences" },
    about_links_title: { zh: "源代码", ja: "ソースコード", en: "Source code" },
    about_github: { zh: "GitHub仓库", ja: "GitHubリポジトリ", en: "GitHub Repositories" },
    about_github_web: { zh: "Web版本(JavaScript)", ja: "Web版(JavaScript)", en: "Web Version (JavaScript)" },
    about_github_py: { zh: "Python版本", ja: "Python版", en: "Python Version" },
    about_acknowledgement: {
      zh: "特别感谢<a href=\"https://space.bilibili.com/24728563\" target=\"_blank\" rel=\"noopener noreferrer\">色彩和声工作室</a>(<a href=\"https://space.bilibili.com/24728563\" target=\"_blank\" rel=\"noopener noreferrer\">https://space.bilibili.com/24728563</a>)提供的特性进行数据与理论",
      ja: "特別感謝: <a href=\"https://space.bilibili.com/24728563\" target=\"_blank\" rel=\"noopener noreferrer\">Color Harmony Studio</a>（<a href=\"https://space.bilibili.com/24728563\" target=\"_blank\" rel=\"noopener noreferrer\">https://space.bilibili.com/24728563</a>）が機能データと理論を提供しています。",
      en: "Special thanks to <a href=\"https://space.bilibili.com/24728563\" target=\"_blank\" rel=\"noopener noreferrer\">Color Harmony Studio</a> (<a href=\"https://space.bilibili.com/24728563\" target=\"_blank\" rel=\"noopener noreferrer\">https://space.bilibili.com/24728563</a>) for providing functional data and theoretical support.",
    },
    about_references: { zh: "参考资料与致谢", ja: "参考資料と謝辞", en: "References & acknowledgements" },
    about_references_intro: { zh: "工具箱中的乐理内容依据以下公开资料编写，代码中每一处引用都有标注。感谢所有作者。", ja: "本ツールの音楽理論は以下の公開資料に基づいており、コード内の各引用箇所に出典を記しています。すべての著者に感謝します。", en: "The theory in this toolbox follows the published sources below, and every use is marked in the code. Thanks to all of the authors." },
    about_piano_samples: {
      zh: "钢琴音色采样来自 Alexander Holm 录制的 <a href=\"https://archive.org/details/SalamanderGrandPianoV3\" target=\"_blank\" rel=\"noopener noreferrer\">Salamander Grand Piano</a>，以 <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY 3.0</a> 协议授权。",
      ja: "ピアノ音源は Alexander Holm 録音の <a href=\"https://archive.org/details/SalamanderGrandPianoV3\" target=\"_blank\" rel=\"noopener noreferrer\">Salamander Grand Piano</a>（<a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY 3.0</a>）を使用しています。",
      en: "Piano sound: <a href=\"https://archive.org/details/SalamanderGrandPianoV3\" target=\"_blank\" rel=\"noopener noreferrer\">Salamander Grand Piano</a> by Alexander Holm, licensed under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY 3.0</a>."
    },
    about_sposobin: {
      zh: "特别感谢 <a href=\"https://github.com/Huaishu61/Sposobin\" target=\"_blank\" rel=\"noopener noreferrer\">Huaishu61/Sposobin</a> 项目 本项目参考其内容 并将相关资料转换为 JavaScript 版本 Sposobin 以 MIT 协议发布",
      ja: "<a href=\"https://github.com/Huaishu61/Sposobin\" target=\"_blank\" rel=\"noopener noreferrer\">Huaishu61/Sposobin</a> プロジェクトに感謝します。本プロジェクトでは関連資料を JavaScript 版へ変換して利用しています。Sposobin は MIT ライセンスで公開されています。",
      en: "Special thanks to the <a href=\"https://github.com/Huaishu61/Sposobin\" target=\"_blank\" rel=\"noopener noreferrer\">Huaishu61/Sposobin</a> project. This project references its materials and converts the relevant data into a JavaScript implementation. Sposobin is released under the MIT License.",
    },
    about_footer: { zh: "© 2026 Music Theory Toolbox 项目 所有内容仅供教育和音乐学习之用", ja: "© 2026 Music Theory Toolbox プロジェクト。すべてのコンテンツは教育と音楽学習目的でのみ使用されます。", en: "© 2026 Music Theory Toolbox Project. All content is for educational and musical learning purposes." },
};

// determine language: 手动选过的（侧栏"语言"，存在 localStorage）优先；"跟随浏览器"时按浏览器：zh (中文), ja (日本語), otherwise en
const LANG_KEY = 'jc-lang';
let langPref = 'auto';
try { const saved = localStorage.getItem(LANG_KEY); if (['zh', 'ja', 'en'].includes(saved)) langPref = saved; } catch (_) { /* 无痕模式等 */ }
let lang = 'en';
const navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
if (navLang.startsWith('zh')) lang = 'zh';
else if (navLang.startsWith('ja')) lang = 'ja';
else lang = 'en';
if (langPref !== 'auto') lang = langPref;
window.__langPref = langPref;

// expose helper and set elements
window.__i18n = i18n;
window.__lang = lang;
document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

/** 某个键的全部语言（全站搜索用来匹配别的语言的工具名） */
window.__all = function (k) { return i18n[k] || null; };

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
    // data-i18n="key"：替换文字；data-i18n-attr="title:key;aria-label:key2"：替换属性（含 placeholder）
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const text = window.__(el.getAttribute('data-i18n'));
        if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        el.getAttribute('data-i18n-attr').split(';').forEach((pair) => {
            const [attr, key] = pair.split(':').map((part) => part.trim());
            const text = attr && key ? window.__(key) : '';
            if (text) el.setAttribute(attr, text);
        });
    });
}

// 桌面与移动端共用语言下拉框；保存选择并重新载入，让每个工具按新语言重新挂载。
function bindLanguageSelect() {
    const trigger = document.getElementById('language-select');
    const menu = document.getElementById('language-options');
    if (!trigger || !menu) return;
    const options = [...menu.querySelectorAll('[data-lang-value]')];
    options.forEach((option) => {
        option.setAttribute('aria-selected', String(option.dataset.langValue === langPref));
        option.setAttribute('aria-label', option.textContent);
    });
    document.getElementById('language-current').textContent = options.find((option) => option.dataset.langValue === langPref)?.textContent || window.__('lang_auto');
    if (trigger.getAttribute('data-bound')) return;
    trigger.setAttribute('data-bound', '1');
    const close = (focus = false) => {
        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (focus) trigger.focus();
    };
    const open = () => {
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        options.find((option) => option.dataset.langValue === langPref)?.focus();
    };
    trigger.addEventListener('click', () => menu.hidden ? open() : close());
    trigger.addEventListener('keydown', (event) => {
        if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        open();
    });
    options.forEach((option) => option.addEventListener('click', () => {
        const chosen = option.dataset.langValue;
        close(true);
        if (chosen === langPref) return;
        try {
            if (chosen === 'auto') localStorage.removeItem(LANG_KEY);
            else localStorage.setItem(LANG_KEY, chosen);
        } catch (_) { /* ignore */ }
        location.reload();
    }));
    menu.addEventListener('keydown', (event) => {
        const index = options.indexOf(document.activeElement);
        if (event.key === 'Escape') { event.preventDefault(); close(true); }
        else if (event.key === 'Tab') close();
        else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
            options[next].focus();
        }
    });
    document.addEventListener('pointerdown', (event) => { if (!trigger.parentElement.contains(event.target)) close(); });
    document.addEventListener('focusin', (event) => { if (!trigger.parentElement.contains(event.target)) close(); });
}

// if DOM already loaded, apply immediately, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { applyTranslations(); bindLanguageSelect(); });
} else {
    applyTranslations();
    bindLanguageSelect();
}
