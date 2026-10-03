# Music Theory Toolbox

**An Instant Music Theory Engine & Improvisation Guide for Modern Jazz.**

Music Theory Toolbox is a lightweight, high-performance web tool for musicians, composers, and students. It translates harmonic concepts, from classical functional harmony and Lydian Chromatic Theory to negative harmony, into practical visual tools.

## Key Features

### 1. Chord Intelligence

* **Universal Chord Converter**: Input any chord symbol (e.g., `C13#11`, `Dbm9/E`) to instantly see its note composition and semitone offsets.
* **Visual Keyboard**: Integrated mini-keyboard display for immediate voicing visualization.

* **Staff**: A small notation editor — grand staff (default) or treble/bass/alto/tenor clef, key and time signatures, whole to sixteenth notes, dots, rests, ties, chords, accidentals (incl. double sharps/flats) and cent offsets; notes that cross a barline are split and tied, eighths and sixteenths are beamed by beat, accidentals last to the end of the bar; playback at any BPM, undo and MIDI export. Also: one note in four clefs, clef mnemonics and a note-reading drill.

* **Progression library (套路和弦进行速查)**: a tab in the progression player with 107 structured entries — the user's list, three reference images (original text and feel kept verbatim, normalisations explained) and textbook schemas (doo-wop, singer/songwriter, hopscotch, royal road, Canon, lament/Andalusian, modal, borrowed, jazz, blues). Search by digits (`4361`, `4-3-6-1`), Roman numerals (`IV iii vi I`) or chord names (`F Em Am C`, which returns several possible keys); triad / seventh versions with context rules; operations A–O (sevenths, colours, inversions, substitutions, applied chords, tritone subs, ii–V, backdoor, mixture, passing diminished, bass lines, rotation, harmonic rhythm, dim7 reinterpretation, requality) with undo and A/B; real inversions in playback, smooth or strict four-part voicing, 3/4 and 4/4 arpeggios from the real bass; melody compatibility check; staff; send to the player, the staff or the form tool (where the progression becomes the main sections and the contrasting sections are still generated). Interface and explanations in Chinese, Japanese and English (original image text and suggested feel stay in the original Chinese).
* **Four-part checker**: parallel and direct fifths/octaves, crossing, overlap, ranges, spacing, doubling, leading-tone and seventh resolution, marked on the staff (staff panel and classical panel).
* **Staff editor extras**: MusicXML import (.musicxml / .xml / compressed .mxl; piano scores read the two staves of the first part), whole-score transposition by interval with letter-correct spelling and key-signature change, copy / paste / delete of whole bars, and MIDI-keyboard input (keys held together become a chord).
* **Review box for tools**: wrong answers in dictation, the progression-ID quiz and four-part-checker errors become review questions (with sound or the chords on a grand staff) in Theory Quest's spaced review.
* **Printable worksheets**: every Theory Quest unit, chapter test, EX chapter test, final and EX final (a fresh random draw at full length — listening questions are replaced) and the progression library (current filter) print as worksheets with a separate answer page and the sources; the library also prints a reference sheet.
* **Interface language**: chosen in the sidebar (中文 / 日本語 / English); "Browser default" follows the browser as before.
* **Melody, rhythm and form tools**: motif development (sequence, inversion, retrograde, enlargement, contraction, displacement, interval change, embellishment, fragmentation) and sentence / period generation with expansions and A/B comparison (form panel); polyrhythm grids and metric-modulation tempo calculator (rhythm panel); imitation and canon with an interval checker (counterpoint panel); rhythm, melody (rhythm + pitch, entered with on-screen keys or a MIDI keyboard), bass-line and progression dictation with partial replay and answer comparison, plus a progression-ID quiz that loops a library progression and asks for the progression or its bass line (ear panel); reharmonizing a fixed melody in classical, jazz and blues styles with melody-note roles (harmonize panel).

### 2. Theoretical Analysis Engines

* **LCC (Lydian Chromatic Concept)**: Analyzes tonal gravity and "tonal color" based on George Russell's landmark theory.
* **CST (Chord Scale Theory)**: Automatically suggests the most appropriate modes (Most Stable vs. Most Modern) for any given chord.
* **Key Center Detection**: Intelligent calculation of the tonal center with match scoring.

### 3. Improvisation Tools

* **Blues Toolkit**: Specialized advice for blues progressions, categorized by "Improv Feel" (from *Safe & Sweet* to *Experimental/Outside*).
* **Guide Tone Paths**: Visualizes the internal logic of a progression by tracing the voice leading of 3rds and 7ths.
* **Negative Harmony**: Perform mirror-image transformations of chords and melodies across the C-G axis.

## Technical Architecture

* **Zero Dependencies**: Built with pure Vanilla JS (ES6+), CSS3, and HTML5. No heavy frameworks, no build steps—just speed.
* **Modular Design**:
* `jazz_compass.js`: The core mathematical engine for music theory.
* `script.js`: Handles reactive UI and dynamic DOM rendering.
* `lang.js`: A robust i18n system supporting **English, Chinese (Simplified), and Japanese**.

## Quick Start

Because this project uses **ES Modules** (`type="module"`), it cannot be run by simply opening the `index.html` file in your browser via the `file://` protocol. **You must serve it via a local web server.**

### Option A: Using VS Code (Easiest)

1. Install the **Live Server** extension.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option B: Using Python (No install needed)

Open your terminal in the project folder and run:

```bash
# Python 3.x
python -m http.server 8000

```

Then visit `http://localhost:8000`.

### Option C: Using Node.js

```bash
npx serve .

```

### Install / offline use

When opened over **https** or **http://localhost**, the toolbox registers a service worker (`sw.js`) and a web manifest, so the browser can install it as an app and use it offline: pages, scripts and data are fetched network-first with a cached fallback, and piano samples are cached the first time they play. Opening it via a LAN IP address or `file://` skips this (browsers only allow service workers in secure contexts); everything else still works.

### Testing

`npm test` runs the logic tests (Node 18+, no dependencies). Browser-level checks are not part of the suite.

Theory Quest also has 17 side quests (支线大关卡) beside their parent units (cadences 2, meter 2, dictation, modes 2, pentatonic harmony, voice-leading rules, schemas 1–2, Rule of the Octave, chord symbols vs Roman numerals, motif development, phrase structure 2, sequences and distant modulation, canon, blues 2, reharmonization, turnarounds). A side quest opens after its parent unit is completely cleared (main level, advanced 1–4 and the mixed test); it does not count toward the main route or the normal final (44 main + 6 advanced questions), but the EX final (45 advanced incl. side quests + 5 main) requires all of them. Each of the six chapters ends with a chapter test (20 random questions: 18 main + 2 advanced, no side quests; opens after the chapter's main levels) and an EX chapter test (30: 25 advanced incl. the chapter's side quests + 5 main; opens after every level of the chapter, its side quests and the chapter test). On the map the chapter test ends each chapter's path and the trail continues from it to the next chapter's first level (the last chapter leads to the final); the EX chapter test hangs beside it as a branch, like a side quest. The four exams look different: chapter test = rounded square in the chapter colour with a dashed ring and a flag; EX chapter test = the same square in a deeper shade with a white inner ring, a solid outer ring, a slowly turning medal-like toothed edge and a summit icon; final = large gold circle with a trophy; EX final = the largest, deeper gold with the same rings and toothed edge and a crown.

Theory Quest has a debug mode for testing: open the browser console and run `class_debug(true)` (and `class_debug(false)` to leave). It unlocks every level including the EX final, adds skip / answer-correctly / answer-wrongly buttons to each card, and puts a panel on the map to set a whole section to 1–3 stars, clear everything with 3 stars, or erase all records. The setting is stored in `localStorage` (`jc-learn-debug`).

## Technical Architecture

* **Pure Vanilla JS (ES6+)**: Zero dependencies. Modular architecture using ES Modules.
* **i18n Support**: A robust system supporting **English, Chinese, and Japanese** via `lang.js`.
* **Themed UI**: One token-based stylesheet (`app.css`) with light and dark themes, a fixed tool rail on desktop and a scrolling tab bar on mobile.

## File Structure

```text
├── index.html            # Application entry point
├── script.js             # Panel wiring and the legacy panels (classical, blues, LCC, chord-scale reference…); tool panels, the tutorial, the circle and neo panels are loaded on first use (dynamic import), so the first load only fetches ~27 modules
├── learn_feature_unit.js # The small tool → tutorial-unit map used by every panel’s tutorial button
├── circle_panel.js       # Circle of fifths panel: key tables, axis colours, multi-mode circle and function ring
├── neo_panel.js          # Neo-Riemannian panel: tree, Tonnetz, octatonic tower, connection wheel, shortest paths
├── chord_convert_panel.js # Chord conversion result: tones, degrees, spelled staff, frequencies
├── about_page.js         # About page (tool list, tips, ramble, credits, all references)
├── classical_staff.js    # Grand staff for the classical chord chain (labels, playback hit areas, SATB marks)
├── prog_library.js, prog_library_data.js, prog_library_ui.js # Progression library: parsing, versions, operations A–O, voicing, search; 107 entries
├── prog_library_ja.js    # Japanese explanations for the library entries
├── motif_phrase.js, motif_phrase_ui.js # Motif development and sentence / period builder (form panel)
├── poly_meter.js, poly_meter_ui.js     # Polyrhythm and metric modulation (rhythm panel)
├── canon.js, canon_ui.js               # Imitation and canon with interval checking (counterpoint panel)
├── dictation.js, dictation_ui.js       # Rhythm, melody, bass-line and progression dictation (ear panel)
├── prog_quiz.js, prog_quiz_ui.js       # Progression-ID quiz built from the progression library (ear panel)
├── tool_review.js        # Puts tool mistakes into the Theory Quest review box
├── worksheet.js          # Printable worksheets with an answer page and sources
├── reharm.js, reharm_ui.js             # Reharmonizing a fixed melody in three styles (harmonize panel)
├── tool_staff.js         # Shared single-line / multi-voice staff helper for the tools above
├── sub_pages.js          # Sub-page tabs when a panel hosts two tools (form, rhythm, counterpoint, harmonize, ear)
├── satb_check.js, satb_marks.js        # Four-part voice-leading checker and its staff marks
├── staff_musicxml.js, staff_handoff.js # MusicXML export and "send to staff" from other panels
├── staff_edit.js         # Staff editor whole-score operations: MusicXML / .mxl import, transposition, bar copy / paste / delete
├── site_search.js        # Ctrl+K site search (tools, levels, chord symbols, progression numbers)
├── audio_engine.js       # Web Audio buses, sampled piano with synth fallback, volume and stop
├── app_shell.js          # Global stop/volume, MIDI input, PWA registration, score export, shortcuts
├── note_frequency.js     # Note-name ↔ frequency helpers
├── jazz_compass.js       # Chord parsing, LCC, chord-scale and Sposobin harmony logic
├── *_ui.js / *.js        # One logic module + one UI module per tool (counterpoint, harmonize, …)
├── learn_engine.js, learn_ui.js, learn.css # Theory Quest: game-style levels (guide, choice, fill-in, matching)
├── learn_content.js, learn_units_*.js # 63 main levels by section, from notation and modes to microtonal harmony; each card cites its source
├── learn_units_side*.js  # Side quests (支线大关卡) with their own picture tours
├── learn_branches_*.js   # 4 advanced levels per main level (plus a generated mixed test); the final and EX final challenges each draw 50 random questions
├── learn_decoys.js       # Fourth options for three-option questions (wrong answers, a few of them jokes) and fourth real pairs for matching questions, keyed by question content
├── learn_generators.js   # Question generators (scales, keys, chords, PLR, axis system, negative harmony, set theory, LΛMPLIGHT…) built from the cited definitions
├── learn_visuals.js      # Tutorial diagrams (keyboard, staff with four clefs, note values, circle of fifths, pitch-class clock, rings, beats, blocks, cents ruler, strings); every part can be circled and labelled
├── learn_tours.js        # Opening guide of every main level: which part of the picture each step circles
├── staff_reading.js, staff_reading_ui.js # Staff tool: notation rules (clefs, key signatures, measures, ties, accidentals, cents) and the editor UI
├── staff_diagram.js      # Shared SVG staff drawing (path-drawn clefs, noteheads, ledger lines, brace)
├── neo_views.js          # Harmonic connections: Tonnetz lattice (PLR / S·N·H), octatonic tower, chords on a staff
├── learn_sfx.js          # Tutorial answer sounds (synthesized right/wrong chimes, mute toggle stored in localStorage)
├── ui_icons.js           # Inline SVG icons used instead of emoji
├── scripts/annotate-learn.mjs # Regenerates the tutorial’s ref lists and references.js usedIn
├── module_kit.js         # Shared UI helpers (tabs, citations, cross-links, MIDI export button)
├── pitch_spelling.js     # Letter-based spelling (intervals, transposition, heptatonic scales)
├── staff_svg.js          # SVG staff notation
├── midi_export.js        # Standard MIDI File writer and PNG/SVG score export
├── references.js         # Every cited source; feeds the About page and this README
├── lang.js               # Internationalization (zh / ja / en); manual language choice stored as jc-lang
├── sw.js, manifest.webmanifest, icon.svg   # Installable / offline use
├── app.css               # Design tokens, layout and shared components (light/dark)
└── *.css                 # Per-module styles that read the tokens from app.css
```

---

## Acknowledgements / 致谢

Thanks to every author below. Music-theory content in this toolbox follows these published sources; each use is marked in the code with a `ref:<id>` comment, and the list is generated from `references.js` (`node scripts/sync-references.mjs`). If a sample cannot be loaded, that note falls back to a synthesized piano.

感谢以下所有作者与项目。工具箱中的乐理内容均依据这些公开资料，代码中用 `ref:<id>` 注释标出每一处引用；本列表由 `references.js` 自动生成。

<!-- references:start -->

**Classical harmony & voice leading / 古典和声与声部连接**

- [Huaishu61/Sposobin](https://github.com/Huaishu61/Sposobin) — Huaishu61 — MIT. Four-part voice-leading rules and Sposobin harmony data（四部和声声部规则与斯波索宾和声数据）. Accessed 2026-09-21.
- [Open Music Theory 2e — 1.12 Major Scales, Scale Degrees, and Key Signatures](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.12%3A_Major_Scales_Scale_Degrees_and_Key_Signatures) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Scale degrees 1–7 (degree n lies a generic nth above the tonic) — used to spell heptatonic scales by letter（音阶级数 1–7 的编号（第 n 级与主音相距 n 度），用于七声音阶按音级拼写）. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.18 Inversion and Figured Bass](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.18%3A_Inversion_and_Figured_Bass) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Figured bass: intervals above the bass, full and abbreviated figures, accidentals（数字低音：低音之上的音程、三和弦与七和弦各位置的数字与简写、变音记号）. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.19 Roman Numerals and SATB Chord Construction](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.19%3A_Roman_Numerals_and_SATB_Chord_Construction) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Roman-numeral case and the ° + ø symbols; never doubling the leading tone or chordal seventh（罗马数字的大小写与 ° + ø 记号；四部写作中导音与和弦七音不重复）. Accessed 2026-10-02.
- [Open Music Theory — Triads and seventh chords](https://openmusictheory.github.io/triads.html) — Open Music Theory (Shaffer, Hughes, Moseley et al.) — CC BY-SA 4.0. Interval recipes of the four triads and five seventh chords; practising chord qualities by ear（四种三和弦与五种七和弦的音程构成；通过弹奏练习听辨和弦性质）. Accessed 2026-10-02.
- [Chord notation](https://en.wikipedia.org/wiki/Chord_notation) — Wikipedia — CC BY-SA 4.0. The many spellings of chord symbols (triad, seventh, ninth–thirteenth, added and suspended chord tables), the ambiguity of Δ, roles of added and extended tones（和弦标记的各种写法（三和弦、七和弦、九/十一/十三和弦、加音与挂留和弦表）、Δ 的歧义、加音与延伸音的作用）. Accessed 2026-10-02.
- [Dominant seventh chord](https://en.wikipedia.org/wiki/Dominant_seventh_chord) — Wikipedia — CC BY-SA 4.0. Role of the dominant seventh (V7, the tritone)（属七和弦的作用（V7 推向主和弦、三全音））. Accessed 2026-10-02.
- [Major seventh chord](https://en.wikipedia.org/wiki/Major_seventh_chord) — Wikipedia — CC BY-SA 4.0. Major seventh chord (Forte’s IV7, Satie)（大七和弦（Forte 的 IV7、萨蒂的例子））. Accessed 2026-10-02.
- [Minor seventh chord](https://en.wikipedia.org/wiki/Minor_seventh_chord) — Wikipedia — CC BY-SA 4.0. Where minor sevenths occur; the ii7 of ii–V–I（小七和弦出现的音级与 ii–V–I 中的 ii7）. Accessed 2026-10-02.
- [Minor major seventh chord](https://en.wikipedia.org/wiki/Minor_major_seventh_chord) — Wikipedia — CC BY-SA 4.0. Minor-major seventh on the harmonic-minor tonic（和声小调主和弦上的小大七和弦）. Accessed 2026-10-02.
- [Half-diminished seventh chord](https://en.wikipedia.org/wiki/Half-diminished_seventh_chord) — Wikipedia — CC BY-SA 4.0. Where the half-diminished seventh occurs; its instability（半减七和弦出现的音级与不稳定性）. Accessed 2026-10-02.
- [Diminished seventh chord](https://en.wikipedia.org/wiki/Diminished_seventh_chord) — Wikipedia — CC BY-SA 4.0. Dominant function and symmetry of the diminished seventh; Cdim sometimes meaning dim7（减七和弦的属功能、对称性；Cdim 有时指减七）. Accessed 2026-10-02.
- [Augmented triad](https://en.wikipedia.org/wiki/Augmented_triad) — Wikipedia — CC BY-SA 4.0. Uses of the augmented triad (V with minor seventh, III+ substitute dominant, I with major seventh)（增三和弦的用法（V 上加小七度、III+ 代理属、I 上可含大七度））. Accessed 2026-10-02.
- [Augmented seventh chord](https://en.wikipedia.org/wiki/Augmented_seventh_chord) — Wikipedia — CC BY-SA 4.0. The augmented seventh resolving as a dominant（增七和弦作属和弦解决到下方五度）. Accessed 2026-10-02.
- [Suspended chord](https://en.wikipedia.org/wiki/Suspended_chord) — Wikipedia — CC BY-SA 4.0. Origin of suspended chords (4–3 suspension) and unresolved pop usage（挂留和弦的来源（4–3 挂留）与流行音乐中不解决的用法）. Accessed 2026-10-02.
- [Sixth chord](https://en.wikipedia.org/wiki/Sixth_chord) — Wikipedia — CC BY-SA 4.0. Added sixth chords (Rameau’s sixte ajoutée) and their double reading（加六和弦（拉莫的 sixte ajoutée）与其双重解读）. Accessed 2026-10-02.
- [Added tone chord](https://en.wikipedia.org/wiki/Added_tone_chord) — Wikipedia — CC BY-SA 4.0. Construction and use of add9 / add2 chords（加九/加二和弦的构成与用途）. Accessed 2026-10-02.
- [Power chord](https://en.wikipedia.org/wiki/Power_chord) — Wikipedia — CC BY-SA 4.0. Role of power chords in rock and their clarity under distortion（强力和弦在摇滚中的作用与失真下的清晰度）. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.5 Half Steps, Whole Steps, and Accidentals](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.05%3A_Half_Steps_Whole_Steps_and_Accidentals) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Half and whole steps, accidentals and enharmonics (tutorial basics)（半音、全音、升降号与同音异名（教程入门关））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.9 Simple Meter and Time Signatures](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.09%3A_Simple_Meter_and_Time_Signatures) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Beat, duple/triple/quadruple, simple meter and time signatures (tutorial)（拍、二/三/四拍子、单拍子与拍号（教程节拍关））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.10 Compound Meter and Time Signatures](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.10%3A_Compound_Meter_and_Time_Signatures) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Compound meter: beats divide in three; the top number counts divisions (tutorial)（复拍子：每拍分成三份、拍号上方表示分份数（教程节拍关））. Accessed 2026-10-02.
- [Open Music Theory 2e — 5.7 Reinterpreting Diminished Seventh Chords](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.07%3A_Reinterpreting_Diminished_Seventh_Chords) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. A diminished seventh can be respelled with any note as root and resolve to four targets（减七和弦可把任一个音当根音重新拼写 解决到四个不同的目标）. Accessed 2026-10-03.
- [Wikipedia — Circle progression](https://en.wikipedia.org/wiki/Circle_progression) — Wikipedia contributors — CC BY-SA 4.0. The circle progression in major and minor; I–vi–ii–V（五度链 I–IV–vii°–iii–vi–ii–V–I 与小调 i–iv–VII–III–VI–ii°–V–i；I–vi–ii–V）. Accessed 2026-10-03.
- [Wikipedia — Pachelbel’s Canon](https://en.wikipedia.org/wiki/Pachelbel%27s_Canon) — Wikipedia contributors — CC BY-SA 4.0. The eight chords of the Canon I–V–vi–iii–IV–I–IV–V (Romanesca)（卡农低音隐含的八个和弦 I–V–vi–iii–IV–I–IV–V（Romanesca））. Accessed 2026-10-03.
- [Wikipedia — Harmonization](https://en.wikipedia.org/wiki/Harmonization) — Wikipedia contributors — CC BY-SA 4.0. Reharmonization: same melody, new chords; a melody note can be root, third, ninth…; semitone / minor-ninth clashes（再和声：保留旋律换和弦；同一旋律音可作根音 三音 九音等；半音 / 小九度摩擦）. Accessed 2026-10-03.
- [Open Music Theory 2e — 5.10 Chromatic Sequences](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.10%3A_Chromatic_Sequences) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Diatonic and chromatic sequences: descending fifths, applied-chord sequences（自然音模进与半音模进：下行五度模进、副属装饰的模进）. Accessed 2026-10-03.
- [Open Music Theory 2e — 1.2 Notation of Notes, Clefs, and Ledger Lines](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.02%3A_Notation_of_Notes_Clefs_and_Ledger_Lines) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Staff, notes, clefs and ledger lines (tutorial)（五线谱、音符、谱号与加线（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.3 Reading Clefs](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.03%3A_Reading_Clefs) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The looping letter names and what each clef is for (tutorial)（七个音名循环、各谱号的用途（教程））. Accessed 2026-10-02.
- [Wikipedia — Clef](https://en.wikipedia.org/wiki/Clef) — Wikipedia contributors — CC BY-SA 4.0. The exact pitch each clef fixes: treble G4 on line 2, bass F3 on line 4, alto/tenor middle C on line 3/4 (staff tool)（各谱号标出的具体音高：高音谱号第二线 G4、低音谱号第四线 F3、中音 / 次中音谱号第三 / 第四线为中央 C（五线谱工具））. Accessed 2026-10-02.
- [Open Music Theory 2e — 4.2 Strengthening Endings with V7](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.02%3A_Strengthening_Endings_with_V7) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. V7–I: ti resolves up, an inner-voice ti may drop to sol, incomplete V7 (four-part checker)（V7–I 的导音上行解决、内声部导音可下跳到 sol、不完整 V7 三倍根音（四部和声检查））. Accessed 2026-10-03.
- [Open Music Theory 2e — 4.13 Predominant Seventh Chords](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.13%3A_Predominant_Seventh_Chords) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The chordal seventh resolves down by step and is usually approached by step or common tone (four-part checker)（和弦七音往下级进解决、通常由级进或共同音进入（四部和声检查））. Accessed 2026-10-03.
- [W3C Music Notation Community Group — MusicXML 4.0 (tutorial and element reference)](https://www.w3.org/2021/06/musicxml40/) — W3C Music Notation Community Group — W3C Community Final Specification Agreement. MusicXML structure: divisions, chord, tie/tied, multi-staff backup/forward, staff and voice, decimal alter for microtones, the .mxl container.xml (staff import and export)（MusicXML 文件结构：divisions、和弦 chord、连音线 tie/tied、多行谱表 backup / forward、staff 与 voice、小数 alter 表示微分音、.mxl 压缩包的 container.xml（五线谱导入与导出））. Accessed 2026-10-03.
- [Wikipedia — Key signature](https://en.wikipedia.org/wiki/Key_signature) — Wikipedia contributors — CC BY-SA 4.0. Key signatures at the start of each line and in every octave; usual bass-clef places of A♯ and F♭ (staff tool)（调号写在每行开头、对所有八度有效；低音谱号 A♯、F♭ 的常规位置（五线谱工具））. Accessed 2026-10-02.
- [Wikipedia — Accidental (music)](https://en.wikipedia.org/wiki/Accidental_(music)) — Wikipedia contributors — CC BY-SA 4.0. Accidentals last to the end of the bar and carry over only through ties (staff tool)（临时记号作用到小节结束，连音线连过小节线时继续有效（五线谱工具））. Accessed 2026-10-02.
- [Wikipedia — Cent (music)](https://en.wikipedia.org/wiki/Cent_(music)) — Wikipedia contributors — CC BY-SA 4.0. Definition of the cent: 1200 per octave, f2 = f1 × 2^(c/1200) (staff tool cent offsets)（音分的定义：八度 1200 音分、f2 = f1 × 2^(c/1200)（五线谱工具的音分偏移））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.4 The Keyboard and the Grand Staff](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.04%3A_The_Keyboard_and_the_Grand_Staff) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Black-key groups, finding C and F, the grand staff and middle C (tutorial)（黑键分组、C 与 F 的位置、大谱表与中央 C（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.6 American Standard Pitch Notation (ASPN)](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.06%3A_American_Standard_Pitch_Notation_(ASPN)) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Pitch labels like C4; pitch versus pitch class (tutorial)（音高记号 C4、音高与音级的区别（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.8 Notating Rhythm](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.08%3A_Notating_Rhythm) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Note values, dots and ties (tutorial)（音符时值、附点与连音线（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.11 Other Rhythmic Essentials](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.11%3A_Other_Rhythmic_Essentials) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Triplets, duplets and syncopation (tutorial)（三连音、二连音与切分（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.15 Intervals](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.15%3A_Intervals) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Interval size and quality, augmented/diminished, compound intervals and inversion (tutorial)（音程的度数与性质、增减、复音程与转位（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.16 Triads](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.16%3A_Triads) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Root, third and fifth; the four triad qualities (tutorial)（三和弦的根音、三音、五音与四种性质（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.17 Seventh Chords](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.17%3A_Seventh_Chords) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The five common seventh chords and their other names (tutorial)（五种常见七和弦及其别名（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 4.5 Strengthening Endings with Cadential 6/4](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.05%3A_Strengthening_Endings_with_Cadential_6_4) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Cadential 6/4: 6 to 5 and 4 to 3 (tutorial)（终止四六和弦：6 到 5、4 到 3（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 4.9 6/4 Chords as Forms of Prolongation](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.09%3A_6_4_Chords_as_Forms_of_Prolongation) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Passing, neighbour and arpeggiating 6/4 chords (tutorial)（经过、辅助与琶音四六和弦（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 5.1 Modal Mixture](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.01%3A_Modal_Mixture) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Modal mixture: chords borrowed from the parallel minor (tutorial)（调式混合：从同主音小调借来的和弦（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 5.2 Neapolitan 6th (♭II6)](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.02%3A_Neapolitan_6th_(II6)) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The Neapolitan sixth ♭II6 (tutorial)（那不勒斯六和弦 ♭II6（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 5.3 Augmented Sixth Chords](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.03%3A_Augmented_Sixth_Chords) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Italian, French and German augmented sixth chords (tutorial)（意大利、法国、德国增六和弦（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 5.4 Common-Tone Chords (CTo7 and CT+6)](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.04%3A_Common-Tone_Chords_(CT7_and_CT6)) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Common-tone diminished sevenths (tutorial)（共同音减七和弦（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 5.14 Neo-Riemannian Triadic Progressions](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.14%3A_Neo-Riemannian_Triadic_Progressions) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Neo-Riemannian transformations P, R, L, S, N, H (tutorial)（新黎曼变换 P、R、L、S、N、H（教程））. Accessed 2026-10-02.
- [Wikipedia — Metre (music)](https://en.wikipedia.org/wiki/Metre_(music)) — Wikipedia contributors — CC BY-SA 4.0. Simple and compound meter, asymmetric (additive) meters like 2+2+3, changing meter (tutorial)（单/复拍子、不对称（加法）拍子 2+2+3、变拍子（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 8.1 Twentieth-Century Rhythmic Techniques](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/08%3A_20th-_and_21st-Century_Techniques/8.01%3A_Twentieth-Century_Rhythmic_Techniques) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Asymmetrical and changing meter, polymeter, metric modulation (tutorial)（不对称拍子、变拍子、复合拍子（polymeter）、节拍转换（教程））. Accessed 2026-10-02.
- [Dodecatonic Cycles and Parsimonious Voice-Leading in the Mystic-Wozzeck Genus (arXiv:1805.11087)](https://arxiv.org/abs/1805.11087) — Vaibhav Mohanty. Boretz spiders (a diminished seventh with four dominant and four half-diminished sevenths) and the octatonic regions joining them; Power Towers is similar (octatonic tower view)（Boretz 蜘蛛（减七 + 4 个属七 + 4 个半减七）与连接相邻蜘蛛的八声区域；Power Towers 与之相似（八音塔视图））. Accessed 2026-10-02.
- [Transformations in Tonal Jazz: ii–V Space (Music Theory Online 23.1)](https://mtosmt.org/issues/mto.17.23.1/mto.17.23.1.mcclimon.html) — Michael McClimon — MTO (copyright the author). Douthett & Steinbach’s Power Towers: parsimonious links among minor, dominant, half-diminished and diminished sevenths (tutorial)（Douthett 与 Steinbach 的 Power Towers：小七、属七、半减七、减七之间的节约声部进行（教程））. Accessed 2026-10-02.
- [Wikipedia — Augmented sixth chord](https://en.wikipedia.org/wiki/Augmented_sixth_chord) — Wikipedia contributors — CC BY-SA 4.0. Spelling of the Italian, French and German sixths (iv6 with ♯4; French adds 2, German adds ♭3) (tutorial)（意大利、法国、德国增六和弦的组成（iv6 升高第 4 级；法国加 2 级，德国加降 3 级）（教程））. Accessed 2026-10-02.

**Counterpoint / 对位法**

- [Open Music Theory — Intervals (consonance and dissonance)](https://openmusictheory.github.io/intervals.html) — Open Music Theory (Hybrid Pedagogy Publishing) — CC BY-SA 4.0. Harmonic and melodic consonance and dissonance classes（和声与旋律中的协和、不协和音程分类）. Accessed 2026-10-01.
- [Open Music Theory — Composing a cantus firmus](https://openmusictheory.github.io/cantusFirmus.html) — Open Music Theory (Hybrid Pedagogy Publishing) — CC BY-SA 4.0. Cantus firmus length, beginning and ending, range, climax and leap rules（定旋律的长度、起止、音域、高点与跳进规则）. Accessed 2026-10-01.
- [Open Music Theory — First-species counterpoint](https://openmusictheory.github.io/firstSpecies.html) — Open Music Theory (Hybrid Pedagogy Publishing) — CC BY-SA 4.0. First species: openings and cadences, parallel and direct perfect intervals, voice crossing（第一类对位：开始与结束、平行与直接完全协和、声部交叉）. Accessed 2026-10-01.
- [Open Music Theory — Second-species counterpoint](https://openmusictheory.github.io/secondSpecies.html) — Open Music Theory (Hybrid Pedagogy Publishing) — CC BY-SA 4.0. Second species: consonant downbeats, weak-beat passing tones, downbeat-to-downbeat motion（第二类对位：强拍协和、弱拍经过音、强拍间的进行）. Accessed 2026-10-01.
- [Open Music Theory — Third-species counterpoint](https://openmusictheory.github.io/thirdSpecies.html) — Open Music Theory (Hybrid Pedagogy Publishing) — CC BY-SA 4.0. Third species: passing, neighbour and double-neighbour tones and the nota cambiata（第三类对位：经过音、辅助音、双辅助音与换音）. Accessed 2026-10-01.
- [Open Music Theory — Fourth-species counterpoint](https://openmusictheory.github.io/fourthSpecies.html) — Open Music Theory (Hybrid Pedagogy Publishing) — CC BY-SA 4.0. Fourth species: preparing and resolving suspensions and the permitted types（第四类对位：挂留的预备与解决、允许的挂留类型）. Accessed 2026-10-01.
- [Open Music Theory 2e — Introduction to Species Counterpoint](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/02%3A_Counterpoint_and_Galant_Schemas/2.01%3A_Introduction_to_Species_Counterpoint) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Introduction: consonance classes, the four kinds of motion, stepwise arrival at the final（类别对位导论：协和分类、四种声部进行、以级进到达终止）. Accessed 2026-10-01.
- [Open Music Theory 2e — Fifth-Species Counterpoint](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/02%3A_Counterpoint_and_Galant_Schemas/2.06%3A_Fifth-Species_Counterpoint) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Fifth (florid) species: mixing species, paired eighth notes, decorated suspensions（第五类（华彩）对位：各类混合、成对的八分音符、装饰挂留）. Accessed 2026-10-01.
- [Open Music Theory 2e — Gradus ad Parnassum Exercises](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/02%3A_Counterpoint_and_Galant_Schemas/2.07%3A_Gradus_ad_Parnassum_Exercises) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. The cantus firmi Fux uses for each modal final（Fux 各终止音所用的定旋律一览）. Accessed 2026-10-01.
- [MarkGotham/species — Fux, Gradus ad Parnassum exercises and solutions](https://github.com/MarkGotham/species) — Mark Gotham — MIT. Fux’s own solutions to the 46 two-voice exercises (figure numbers of the 1965 Norton/Mann edition)（Fux《Gradus ad Parnassum》二声部 46 个练习的原书解答（Norton/Mann 1965 版图号））. Accessed 2026-10-01.
- [Wikipedia — Canon (music)](https://en.wikipedia.org/wiki/Canon_(music)) — Wikipedia contributors — CC BY-SA 4.0. Canon: leader and follower, rounds, strict and free canons, inversion, retrograde and mensuration canons（卡农：导句与答句、轮唱、严格与自由卡农、倒影卡农、逆行与扩大卡农）. Accessed 2026-10-03.
- [Open Music Theory 2e — 2.13 Galant Schemas: The Rule of the Octave and Harmonizing the Scale with Sequences](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/02%3A_Counterpoint_and_Galant_Schemas/2.13%3A_Galant_schemas__The_Rule_of_the_Octave_and_Harmonizing_the_Scale_with_Sequences) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The Rule of the Octave (close to Fenaroli 1775), built in four steps from parallel sixths; harmonizing the scale with sequences（八度法则：每个低音音级配一个和弦（接近 Fenaroli 1775）；从平行六和弦到原位、属、七和弦的四步；用模进配音阶）. Accessed 2026-10-03.

**Melody & harmony / 旋律与和声**

- [Open Music Theory 2e — Embellishing Tones](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.04%3A_Embellishing_Tones) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Definitions of passing, neighbour, appoggiatura, escape, suspension, retardation, anticipation and pedal tones（经过音、辅助音、倚音、逃音、延留音、上行延留音、先现音与持续音的定义）. Accessed 2026-10-01.
- [Open Music Theory — Embellishing tones](https://openmusictheory.github.io/embellishingTones.html) — Open Music Theory (Hybrid Pedagogy Publishing) — CC BY-SA 4.0. Complete, double and incomplete neighbour tones（完全辅助音、双辅助音与不完全辅助音的定义）. Accessed 2026-10-01.
- [和弦外音](https://zh.wikipedia.org/zh-hans/%E5%92%8C%E5%BC%A6%E5%A4%96%E9%9F%B3) — 维基百科 — CC BY-SA 4.0. Chinese names of the embellishing tones（和弦外音的中文名称（邻音、逃音、够音、环音、延留音等））. Accessed 2026-10-01.
- [非和声音](https://ja.wikipedia.org/wiki/%E9%9D%9E%E5%92%8C%E5%A3%B0%E9%9F%B3) — ウィキペディア — CC BY-SA 4.0. Japanese names of the embellishing tones（和弦外音的日文名称）. Accessed 2026-10-01.
- [Open Music Theory 2e — 4.1 Introduction to Harmony, Cadences, and Phrase Endings](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.01%3A_Introduction_to_Harmony_Cadences_and_Phrase_Endings) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Tonic and dominant chords; conditions for PAC, IAC and HC（主、属功能的和弦，PAC、IAC、HC 的判定条件）. Accessed 2026-10-01.
- [Open Music Theory — Four-Chord Schemas](https://viva.pressbooks.pub/openmusictheory/chapter/4-chord-schemas/) — Bryn Hughes, Megan Lavengood — CC BY-SA 4.0. Doo-wop, singer/songwriter and hopscotch schemas, rotations, substitutions, tonal ambiguity（doo-wop、singer/songwriter、hopscotch 四和弦套路 旋转与代理 调性模糊（套路和弦进行速查））. Accessed 2026-10-03.
- [Open Music Theory — Classical Schemas (in a Pop Context)](https://viva.pressbooks.pub/openmusictheory/chapter/classical-schemas/) — Bryn Hughes, Kris Shaffer — CC BY-SA 4.0. The lament schema and the circle-of-fifths schema in pop（lament 型 I–♭VII–♭VI–V 与五度链套路在流行音乐里的用法）. Accessed 2026-10-03.
- [Open Music Theory — Modal Schemas](https://viva.pressbooks.pub/openmusictheory/chapter/modal-schemas/) — Megan Lavengood — CC BY-SA 4.0. Double plagal, subtonic shuttle, aeolian shuttle and cadence, dorian shuttle, lydian shuttle and cadence; flat signs on ♭VI ♭VII（双重变格 subtonic shuttle aeolian shuttle / cadence dorian shuttle lydian shuttle / cadence；♭VI ♭VII 写平行大调参照的变音记号）. Accessed 2026-10-03.
- [Open Music Theory — Puff Schemas](https://viva.pressbooks.pub/openmusictheory/chapter/puff-schemas/) — Bryn Hughes — CC BY-SA 4.0. The puff schema I–iii–IV and I–III♯–IV（puff 套路 I–iii–IV 与 I–III♯–IV）. Accessed 2026-10-03.
- [Wikipedia — I–V–vi–IV progression](https://en.wikipedia.org/wiki/I%E2%80%93V%E2%80%93vi%E2%80%93IV_progression) — Wikipedia contributors — CC BY-SA 4.0. The Axis progression and its rotations（Axis 进行 I–V–vi–IV 与四种旋转 I–V–ii–IV 变体）. Accessed 2026-10-03.
- [Wikipedia — ’50s progression](https://en.wikipedia.org/wiki/%2750s_progression) — Wikipedia contributors — CC BY-SA 4.0. The ’50s (doo-wop) progression I–vi–IV–V（’50s（doo-wop）进行 I–vi–IV–V）. Accessed 2026-10-03.
- [Wikipedia — Royal road progression](https://en.wikipedia.org/wiki/Royal_road_progression) — Wikipedia contributors — CC BY-SA 4.0. The royal road progression and its variants（王道进行 IVM7–V7–iii7–vi 三和弦形 IV–V–iii–vi 及其变体）. Accessed 2026-10-03.
- [Open Music Theory — The Basics of Sight-Singing and Dictation](https://viva.pressbooks.pub/openmusictheory/chapter/the-basics-of-sight-singing-and-dictation/) — Samuel Brady — CC BY-SA 4.0. Dictation: dot grids and slashes for rhythm; for melody write the rhythm first, then pitches (contour lines, leap marks, solmization); clef, tonic and meter are enough to notate it（听写：节奏用点格与斜线；旋律先写节奏再加音高（轮廓线、跳进记号、唱名），已知谱号、主音和拍号就能写成谱）. Accessed 2026-10-03.
- [Open Music Theory 2e — 7.13 Pentatonic Harmony](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/07%3A_Popular_Music/7.13%3A_Pentatonic_Harmony) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Pentatonic harmony: scale notes as chord roots of any quality; scale-degree conflicts（五声和声：五声音阶的音作和弦根音 和弦性质可以不同 出现音级交错）. Accessed 2026-10-03.
- [Open Music Theory 2e — 4.3 Strengthening Endings with Strong Predominants](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.03%3A_Strengthening_Endings_with_Strong_Predominants) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Strong predominants ii6 and IV; ii follows IV, never precedes it（强下属 ii6 与 IV；ii 在 IV 之后、从不在其前）. Accessed 2026-10-01.
- [Open Music Theory 2e — 4.6 Prolonging Tonic at Phrase Beginnings with V6 and Inverted V7s](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.06%3A_Prolonging_Tonic_at_Phrase_Beginnings_with_V6_and_Inverted_V7s) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Prolonging tonic at phrase beginnings with V6 and inverted V7s（乐句开头用 V6 与转位 V7 延长主和弦）. Accessed 2026-10-01.
- [Open Music Theory 2e — 4.7 Performing Harmonic Analysis Using the Phrase Model](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.07%3A_Performing_Harmonic_Analysis_Using_the_Phrase_Model) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. The phrase model Tb–PD–D–Te and ending phrases with cadences（乐句模型 Tb–PD–D–Te 与以终止式结束乐句）. Accessed 2026-10-01.
- [Open Music Theory 2e — 4.8 Prolongation at Phrase Beginnings using the Leading-Tone Chord](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.08%3A_Prolongation_at_Phrase_Beginnings_using_the_Leading-Tone_Chord) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. The vii° triad is always used as vii°6 and can stand in for an inverted V（vii° 三和弦总用第一转位 vii°6，可代替相应低音的 V 转位）. Accessed 2026-10-01.
- [Open Music Theory 2e — 4.10 Plagal Motion as a Form of Prolongation](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.10%3A_Plagal_Motion_as_a_Form_of_Prolongation) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. IV–I prolongs tonic at a phrase beginning or after an authentic cadence（IV–I 在乐句开头或正格终止之后延长主和弦）. Accessed 2026-10-01.
- [Open Music Theory 2e — 4.11 La (Scale Degree 6) in the Bass](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.11%3A_La_(Scale_Degree_6)_in_the_Bass_at_Beginnings_Middles_and_Endings) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. vi connects tonic to strong predominants; V–vi deceptive motion（vi 连接主和弦区与强下属；V–vi 阻碍进行）. Accessed 2026-10-01.
- [Open Music Theory 2e — 4.12 The Mediant Harmonizing Mi (Scale Degree 3) in the Bass](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.12%3A_The_Mediant_Harmonizing_Mi_(Scale_Degree_3)_in_the_Bass) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. iii as a weak predominant moving through strong predominants to V（iii 作为弱下属，经由强下属走向 V）. Accessed 2026-10-01.

**Form, phrases & modulation / 曲式、乐句与转调**

- [Wikipedia — Cadence](https://en.wikipedia.org/wiki/Cadence) — Wikipedia contributors — CC BY-SA 4.0. Phrygian half cadence, Picardy third, accented / unaccented cadences (old masculine / feminine names), turnaround, dim7 half-step cadence (Cadences 2 side quest)（弗里吉亚半终止、皮卡迪三度、重音 / 非重音终止（阳性 / 阴性的旧称）、turnaround、减七半音终止（终止式 2 支线））. Accessed 2026-10-03.
- [Wikipedia — Andalusian cadence](https://en.wikipedia.org/wiki/Andalusian_cadence) — Wikipedia contributors — CC BY-SA 4.0. The Andalusian progression i–♭VII–♭VI–V; not a true cadence, usually an ostinato（安达卢西亚进行 i–♭VII–♭VI–V，不是真正的终止、多作固定音型）. Accessed 2026-10-03.
- [Cadences you haven’t heard of (ThinkSpace blog)](https://thinkspace.ac.uk/blog/cadences-you-havent-heard-of/) — Tom Janes — Cited for facts only. "Pathetic cadence": a Neapolitan sixth before a perfect cadence, an outdated term（"悲怆终止"（Pathetic cadence）：那不勒斯六之后接正格终止，已过时的说法）. Accessed 2026-10-03.
- [Wikipedia — Polyrhythm](https://en.wikipedia.org/wiki/Polyrhythm) — Wikipedia contributors — CC BY-SA 4.0. Polyrhythm: simultaneous rhythms not derived from one meter（复节奏：两种以上不能看作同一拍子简单派生的节奏同时进行）. Accessed 2026-10-03.
- [Wikipedia — Metric modulation](https://en.wikipedia.org/wiki/Metric_modulation) — Wikipedia contributors — CC BY-SA 4.0. The formula for the new tempo in a metric modulation（节拍调制的新速度公式：新速度 / 旧速度 = 新旧小节里枢纽时值个数之比）. Accessed 2026-10-03.
- [Wikipedia — Motif (music)](https://en.wikipedia.org/wiki/Motif_(music)) — Wikipedia contributors — CC BY-SA 4.0. Motif: the smallest structural unit with thematic identity, developed by alteration, repetition and sequence（动机：最小的、有主题特征的结构单位；通过变化、重复、模进展开）. Accessed 2026-10-03.
- [Wikipedia — Sequence (music)](https://en.wikipedia.org/wiki/Sequence_(music)) — Wikipedia contributors — CC BY-SA 4.0. Sequence: a passage restated at a different pitch（模进：同一段旋律或和声移到别的音高上重复）. Accessed 2026-10-03.
- [Open Music Theory 2e — 3.4 Expansion and Contraction at the Phrase Level](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/03%3A_Form/3.04%3A_Expansion_and_Contraction_at_the_Phrase_Level) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Phrase expansion: repetition, stretching, one-more-time, alternative paths, prefixes and suffixes（乐句扩充：重复 拉长 再来一次 另辟路径 前缀与后缀）. Accessed 2026-10-03.
- [Open Music Theory 2e — 5.6 Chromatic Modulation](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/05%3A_Chromaticism/5.06%3A_Chromatic_Modulation) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Chromatic modulation: common-tone modulation to chromatic mediants, enharmonic reinterpretation (V7 = Ger+6)（半音化转调：共同音转调与半音关系的三度调、同音异名重释（属七 = 德国增六））. Accessed 2026-10-03.
- [Open Music Theory — Modulation](https://openmusictheory.github.io/Modulation.html) — Open Music Theory. Modulation types in the form templates（曲式模板中的转调方式）. Accessed 2026-09-21.
- [musictheory.net — Phrases and Cadences](https://www.musictheory.net/lessons/55) — Ricci Adams. Phrases and cadences（乐句与终止式）. Accessed 2026-09-21.
- [Open Music Theory — Thematic function in rondo](https://openmusictheory.github.io/thematicFunctionInRondo.html) — Open Music Theory. Five- and seven-part rondo forms（五部与七部回旋曲式）. Accessed 2026-09-21.
- [Open Music Theory 2e — 1.20 Texture](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.20%3A_Texture) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Monophony, heterophony, homophony and polyphony (tutorial)（单声部、支声、主调与复调织体（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 3.1 Foundational Concepts for Phrase-Level Forms](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/03%3A_Form/3.01%3A_Foundational_Concepts_for_Phrase-Level_Forms) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The hierarchy of form and motives (tutorial)（曲式的层级与动机（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 3.2 The Phrase, Archetypes, and Unique Forms](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/03%3A_Form/3.02%3A_The_Phrase_Archetypes_and_Unique_Forms) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Phrase, period (antecedent and consequent) and sentence (presentation and continuation) (tutorial)（乐句、乐段（前句与后句）与句子式（呈示与展开）（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 3.6 Binary Form](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/03%3A_Form/3.06%3A_Binary_Form) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Binary form: two reprises, simple and rounded (tutorial)（二部曲式：两个反复段、单纯与再现（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 3.7 Ternary Form](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/03%3A_Form/3.07%3A_Ternary_Form) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Ternary form ABA (tutorial)（三部曲式 ABA（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 3.8 Sonata Form](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/03%3A_Form/3.08%3A_Sonata_Form) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Sonata form: exposition, development, recapitulation (tutorial)（奏鸣曲式：呈示部、发展部、再现部（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 4.14 Tonicization](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.14%3A_Tonicization) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Tonicization and applied chords such as V/ii (tutorial)（离调与副属和弦 V/x 的读法（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 4.15 Extended Tonicization and Modulation to Closely Related Keys](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/04%3A_Diatonic_Harmony_Tonicization_and_Modulation/4.15%3A_Extended_Tonicization_and_Modulation_to_Closely_Related_Keys) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Modulation: direct and pivot-chord (tutorial)（转调：直接转调与共同和弦转调（教程））. Accessed 2026-10-02.

**Circle of fifths & modes / 五度圈与多调性**

- [色彩和声工作室 Color Harmony Studio](https://space.bilibili.com/24728563) — 色彩和声工作室. Functional data and theory behind the multi-mode circle（多调性模式的功能数据与理论支持）. Accessed 2026-10-01.
- [Open Music Theory 2e — 1.13 Minor Scales, Scale Degrees, and Key Signatures](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.13%3A_Minor_Scales_Scale_Degrees_and_Key_Signatures) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The three minor scales; relative and parallel keys (tutorial)（三种小调音阶、关系调与同主音调（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 1.14 Introduction to Diatonic Modes and the Chromatic Scale](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/01%3A_Fundamentals/1.14%3A_Introduction_to_Diatonic_Modes_and_the_Chromatic_Scale) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The seven diatonic modes from bright to dark, their colour notes, the chromatic scale (tutorial)（七种自然音调式的明暗顺序与特征音、半音阶（教程））. Accessed 2026-10-02.
- [Wikipedia — Circle of fifths](https://en.wikipedia.org/wiki/Circle_of_fifths) — Wikipedia contributors — CC BY-SA 4.0. Circle of fifths: clockwise up fifths, counterclockwise up fourths, neighbours differ by one accidental, relative minors (tutorial)（五度圈：顺时针上行五度、逆时针上行四度、相邻调号差一个升降号、内圈关系小调（教程））. Accessed 2026-10-02.
- [Wikipedia — Axis system](https://en.wikipedia.org/wiki/Axis_system) — Wikipedia contributors — CC BY-SA 4.0. Lendvai’s axis system: four notes a minor third and tritone apart share an axis and can substitute (tutorial)（轴心体系（Lendvai）：相隔小三度与三全音的四个音同属一轴，可互相代替（教程））. Accessed 2026-10-02.
- [Wikipedia — Closely related key](https://en.wikipedia.org/wiki/Closely_related_key) — Wikipedia contributors — CC BY-SA 4.0. Closely related keys: ii, iii, IV, V, vi and the parallel minor (tutorial)（近关系调：ii、iii、IV、V、vi 与同主音小调（教程））. Accessed 2026-10-02.

**Chinese modes / 中国民族调式**

- [中国民族调式——五声性调式（乐理精品课程课件）](https://www.sccm.edu.cn/course/yueli/look/ylmd.pdf) — 四川音乐学院. Five principal tones and four auxiliary tones, the nine degree names, structure and colour of the five pentatonic modes, and identifying the Gong system by the Gong–Jue major third（五声正音与四个偏音、九声阶名、五种五声调式的结构与色彩、宫角大三度判断宫系统）. Accessed 2026-10-01.
- [七声调式](https://zh.wikipedia.org/zh-cn/%E4%B8%83%E8%81%B2%E8%AA%BF%E5%BC%8F) — 维基百科（引李重光《基本乐理》等） — CC BY-SA 4.0. The Qingyue, Yayue and Yanyue seven-tone scales and their other names（清乐、雅乐、燕乐三种七声音阶及别名）. Accessed 2026-10-01.
- [中国五声音阶](https://zh.wikipedia.org/zh-cn/%E4%B8%AD%E5%9C%8B%E4%BA%94%E8%81%B2%E9%9F%B3%E9%9A%8E) — 维基百科 — CC BY-SA 4.0. Gong–Shang–Jue–Zhi–Yu and their movable-do syllables（宫商角徵羽与首调唱名的对应）. Accessed 2026-10-01.
- [什么是变宫、变徵：古代七声音阶入门](https://www.tcpc.org.cn/22271.html) — 中国传统文化促进会. Pitch positions of Biangong, Bianzhi, Qingjue and Run（变宫、变徵、清角、闰的音高位置）. Accessed 2026-10-01.
- [中国民族调式](http://www.dreampu.com/staff/330.html) — 寒玉（梦谱五线谱网）. Mode naming (e.g. "D Shang mode"), the ten hexatonic and fifteen heptatonic modes（调式命名（如 D 商调式）、六声调式十种与七声调式十五种）. Accessed 2026-10-01.
- [中国传统音乐中"即兴"的文化与哲学思辨](https://www.huain.com/article/zonghe/2024/1225/2977.html) — 陈畅（华音网）. Xuangong (Book of Rites: "the five tones … take turns as Gong") and modulation within or across Gong systems（旋宫（《礼记·礼运》"五声六律十二管旋相为宫"）与同宫、异宫转调）. Accessed 2026-10-01.
- [十二律](https://zh.wikipedia.org/zh-cn/%E5%8D%81%E4%BA%8C%E5%BE%8B) — 维基百科 — CC BY-SA 4.0. The twelve lü names from Huangzhong to Yingzhong (Huangzhong = C)（黄钟至应钟十二律名（以黄钟为 C 的对照））. Accessed 2026-10-01.
- [中国音阶及民族调式问题（上）](https://www.shcmusic.edu.cn/2019/0923/c1547a21621/page.htm) — 贺绿汀（上海音乐学院经典文献）. Judging the mode from the melodic centre and the final note（依据旋律的活动中心与结束音判断调式）. Accessed 2026-10-01.

**Blues / 布鲁斯**

- [Open Music Theory — Blues Harmony](https://viva.pressbooks.pub/openmusictheory/chapter/blues-harmony/) — Megan Lavengood — CC BY-SA 4.0. 12-bar blues in dominant sevenths, minor blues, jazz blues, turnarounds（12 小节布鲁斯全部属七 变格收束 小调布鲁斯 爵士布鲁斯 turnaround）. Accessed 2026-10-03.
- [乐理笔记 — 蓝调](https://music-theory.aizcutei.com/post/%E6%97%8B%E5%BE%8B%E7%AF%87/24-%E8%93%9D%E8%B0%83) — music-theory.aizcutei.com. Blue notes and blues scales（蓝调音与布鲁斯音阶）. Accessed 2026-10-01.
- [Berklee Online — Blues Guitar](https://online.berklee.edu/courses/blues-guitar) — Berklee Online. 12-bar blues forms（12 小节布鲁斯曲式）. Accessed 2026-10-01.
- [Open Music Theory 2e — 6.8 Blues Harmony](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.08%3A_Blues_Harmony) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Dominant sevenths in the blues and common variants (tutorial)（布鲁斯里的属七和弦与常见变体（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 6.9 Blues Melodies and the Blues Scale](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.09%3A_Blues_Melodies_and_the_Blues_Scale) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. The blues scale, the major blues scale and aab lyrics (tutorial)（布鲁斯音阶、大调布鲁斯音阶与 aab 歌词（教程））. Accessed 2026-10-02.

**Jazz harmony & improvisation / 爵士和声与即兴**

- [Blackadder Chord](https://soundquest.jp/quest/chord/chord-mv8/blackadder-chord/) — yuta（SoundQuest）. Definition of the Blackadder chord ([0,2,6,10] over the bass), its readings and functions; the passing I → I+ → IV use of aug（Blackadder 和弦的定义（aug + 根音全音之上的低音，自低音起 [0,2,6,10]）、各种读法与在进行中的作用；I → I+ → IV 的经过用法）. Accessed 2026-10-02.
- [Altered chord](https://en.wikipedia.org/wiki/Altered_chord) — Wikipedia — CC BY-SA 4.0. The common altered dominants (♭5, ♯5, ♯9)（常见的变化属和弦（降五、升五、升九））. Accessed 2026-10-02.
- [Altered scale](https://en.wikipedia.org/wiki/Altered_scale) — Wikipedia — CC BY-SA 4.0. The alt chord: 7alt replacing C7♯5♭9♯9♯11 etc.; root, major third and minor seventh kept, all else altered（alt 和弦：7alt 代替 C7♯5♭9♯9♯11 等写法；保留根音、大三度、小七度，其余音变化（♭9、♯9、♭5／♯11、♯5／♭13））. Accessed 2026-10-02.
- [Open Music Theory — Substitutions](https://viva.pressbooks.pub/openmusictheory/chapter/substitutions/) — Megan Lavengood — CC BY-SA 4.0. Applied-chord, mixture (la → le) and tritone substitutions（副属替代 调式混合替代（la → le） 三全音替代（共享三全音 半音下行解决））. Accessed 2026-10-03.
- [Wikipedia — Turnaround (music)](https://en.wikipedia.org/wiki/Turnaround_(music)) — Wikipedia contributors — CC BY-SA 4.0. Typical turnarounds I–vi–ii–V, I–VI–ii–V, iii–VI–ii–V, ii–♭II–I（turnaround 的常见写法 I–vi–ii–V、I–VI–ii–V、iii–VI–ii–V、ii–♭II–I）. Accessed 2026-10-03.
- [Wikipedia — Ragtime progression](https://en.wikipedia.org/wiki/Ragtime_progression) — Wikipedia contributors — CC BY-SA 4.0. The ragtime progression V7/vi–V7/ii–V7/V–V7–I（ragtime 进行 V7/vi–V7/ii–V7/V–V7–I）. Accessed 2026-10-03.
- [Lesson #6: Minor Line Cliche (DjangoBooks)](https://www.djangobooks.com/blog/lesson_6_minor_line_clich/) — Michael Horowitz — Cited for facts only. The minor line cliché m, m(maj7), m7, m6（小调 line cliché：m、m(maj7)、m7、m6 主音半音下行）. Accessed 2026-10-03.
- [Berklee Online — Reharmonization Techniques](https://online.berklee.edu/courses/reharmonization-techniques) — Berklee Online. Blues chord colors and reharmonization（布鲁斯和弦配色与重配和声）. Accessed 2026-10-01.
- [乐理笔记 — 和弦篇](https://music-theory.aizcutei.com/) — music-theory.aizcutei.com. Jazz toolbox chapters, mode map and mode tree（爵士工具箱章节、调式地图与调式树）. Accessed 2026-10-01.
- [Open Music Theory 2e — 6.6 Substitutions](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.06%3A_Substitutions) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Tritone substitution, applied-chord substitution and mode mixture（三全音替代、副属替代与调式交替）. Accessed 2026-10-02.
- [Open Music Theory 2e — 6.2 Chord Symbols](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.02%3A_Chord_Symbols) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Default intervals in chord symbols, 9/11/13 as compound intervals, the meaning of ♭9/♯11 — used to spell chord tones by letter（和弦符号的默认音程（七度为小、延伸音为大/纯）、9/11/13 为复音程、♭9/♯11 等变化音的含义——用于按音级拼写和弦音）. Accessed 2026-10-02.
- [Open Music Theory 2e — 6.3 Jazz Voicings](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.03%3A_Jazz_Voicings) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Third-and-seventh upper voices with the fifth omitted（上方声部用三音与七音、省略五音的配置）. Accessed 2026-10-02.
- [Backdoor progression](https://en.wikipedia.org/wiki/Backdoor_progression) — Wikipedia (citing Coker 1997; Berg 2005; Juusela 2015; Lavengood 2021) — CC BY-SA 4.0. The backdoor progression iv7–♭VII7–I（后门进行 iv7–♭VII7–I）. Accessed 2026-10-02.
- [Coltrane changes](https://en.wikipedia.org/wiki/Coltrane_changes) — Wikipedia (citing Porter 2000; Demsey) — CC BY-SA 4.0. Coltrane changes applied to ii–V–I（Coltrane 和弦进行对 ii–V–I 的替代）. Accessed 2026-10-02.
- [Voicing (music)](https://en.wikipedia.org/wiki/Voicing_(music)) — Wikipedia — CC BY-SA 4.0. Drop 2: lowering the second voice an octave（drop 2：第二声部降低八度）. Accessed 2026-10-02.
- [Jazz — drop 3 and drop 2 voicings](https://www.guitar-chord.org/articles/jazz-drop-3-voicings.html) — guitar-chord.org. Drop 3: lowering the third note from the top an octave（drop 3：从上往下数第三个音降低八度）. Accessed 2026-10-02.
- [So What chord](https://en.wikipedia.org/wiki/So_What_chord) — Wikipedia (citing Levine, The Jazz Piano Book; Mantooth) — CC BY-SA 4.0. Construction and use of the So What chord（So What 和弦的音程构成与用法）. Accessed 2026-10-02.
- [Upper structure](https://en.wikipedia.org/wiki/Upper_structure) — Wikipedia (citing Levine, The Jazz Piano Book ch. 14; Ellenberger) — CC BY-SA 4.0. Upper-structure triads over a dominant seventh（属七和弦上的高结构三和弦表）. Accessed 2026-10-02.
- [Bebop scale](https://en.wikipedia.org/wiki/Bebop_scale) — Wikipedia (citing David Baker; Roni Ben-Hur) — CC BY-SA 4.0. The four bebop scales and Barry Harris’s sixth-diminished scales（四种 bebop 音阶与 Barry Harris 的六度减音阶）. Accessed 2026-10-02.
- [The Major Sixth Diminished Scale](https://www.jazz-guitar-licks.com/pages/guitar-scales-modes/other-scales/the-major-sixth-diminished-scale-guitar-diagrams-and-theory.html) — Stef Ramin（Jazz Guitar Licks）. Harmonizing the sixth-diminished scale with alternating 6 and °7 chords（六度减音阶的和声化：大六与减七和弦交替）. Accessed 2026-10-02.
- [Chromatic Enclosure](https://jenslarsen.nl/tag/chromatic-enclosure/) — Jens Larsen. Chromatic enclosure: approaching a target from above and below（半音包围：从上方与下方接近目标音）. Accessed 2026-10-02.
- [Twelve-bar blues](https://en.wikipedia.org/wiki/Twelve-bar_blues) — Wikipedia (citing Benward & Saker 2003; McCumber 2006; Spitzer 2001) — CC BY-SA 4.0. Basic, quick-change, bebop and minor blues charts（基本、quick change、bebop 与小调布鲁斯的和弦表）. Accessed 2026-10-02.
- [Blues for Alice](https://en.wikipedia.org/wiki/Blues_for_Alice) — Wikipedia (citing The Real Book; Lawn & Hellmer 1996) — CC BY-SA 4.0. The Bird-blues changes of Blues for Alice（Bird 布鲁斯（Blues for Alice）的和弦表）. Accessed 2026-10-02.
- [Rhythm changes](https://en.wikipedia.org/wiki/Rhythm_changes) — Wikipedia (citing Spitzer 2001; Holbrook 2008) — CC BY-SA 4.0. Rhythm changes A sections (with common substitutions) and the Sears Roebuck bridge（Rhythm changes 的 A 段（含常见替代）与 Sears Roebuck 桥段）. Accessed 2026-10-02.
- [Open Music Theory 2e — 6.1 Swing Rhythms](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.01%3A_Swing_Rhythms) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Swing eighths and backbeat (tutorial)（摇摆八分音符与反拍重音（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 6.4 ii–V–I](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.04%3A_iiVI) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Chord qualities of ii–V–I in major and minor (tutorial)（大调与小调的 ii–V–I 和弦性质（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 6.5 Embellishing Chords](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.05%3A_Embellishing_Chords) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Applied ii chords and common-tone diminished sevenths (tutorial)（附加 ii 与共同音减七（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 6.7 Chord-Scale Theory](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/06%3A_Jazz/6.07%3A_Chord-Scale_Theory) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Chord–scale relationships and which mode fits each chord (tutorial)（和弦—音阶对应、各级和弦用哪个调式（教程））. Accessed 2026-10-02.
- [Wikipedia — Jazz minor scale](https://en.wikipedia.org/wiki/Jazz_minor_scale) — Wikipedia contributors — CC BY-SA 4.0. The jazz minor scale and the names of its seven modes (tutorial)（旋律小调（爵士小调）及其七个调式的名称（教程））. Accessed 2026-10-02.
- [Wikipedia — Harmonic minor scale](https://en.wikipedia.org/wiki/Harmonic_minor_scale) — Wikipedia contributors — CC BY-SA 4.0. The harmonic minor scale, its augmented second and its seven modes (tutorial)（和声小调、增二度及其七个调式（教程））. Accessed 2026-10-02.
- [Wikipedia — Harmonic major scale](https://en.wikipedia.org/wiki/Harmonic_major_scale) — Wikipedia contributors — CC BY-SA 4.0. The harmonic major scale: major with a lowered sixth (tutorial)（和声大调：降低第六级的大调（教程））. Accessed 2026-10-02.
- [Wikipedia — Neapolitan scale](https://en.wikipedia.org/wiki/Neapolitan_scale) — Wikipedia contributors — CC BY-SA 4.0. The Neapolitan major and minor scales (tutorial)（那不勒斯大调与小调音阶（教程））. Accessed 2026-10-02.
- [Wikipedia — Negative harmony](https://en.wikipedia.org/wiki/Negative_harmony) — Wikipedia contributors — CC BY-SA 4.0. Negative harmony: reflection across the tonic–dominant midpoint; from Ernst Levy, named by Steve Coleman (tutorial)（负和声：以主音–属音中点为轴的镜像；源自 Ernst Levy，Steve Coleman 命名（教程））. Accessed 2026-10-02.

**Lydian Chromatic Concept / 利迪亚半音概念**

- [George Russell — The Lydian Chromatic Concept of Tonal Organization](https://georgerussell.com/lydian-chromatic-concept) — George Russell. Lydian parent scales and tonal order（Lydian 父本音阶与音调顺序）. Accessed 2026-10-01.
- [乐理笔记 — Lydian Chromatic Concept](https://music-theory.aizcutei.com/post/%E5%92%8C%E5%BC%A6%E7%AF%87/65-Lydian-Chromatic-Concept) — music-theory.aizcutei.com. Chinese introduction to LCC（LCC 中文介绍）. Accessed 2026-10-01.

**Post-tonal techniques / 二十世纪技法**

- [Open Music Theory 2e — 8.4 Pitch-Class Sets, Normal Order, and Transformations](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/08%3A_20th-_and_21st-Century_Techniques/8.04%3A_Pitch-Class_Sets_Normal_Order_and_Transformations) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Finding normal order; Tn and In（标准序的求法与 Tn、In 运算）. Accessed 2026-10-02.
- [Open Music Theory 2e — 8.5 Set Class and Prime Form](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/08%3A_20th-_and_21st-Century_Techniques/8.05%3A_Set_Class_and_Prime_Form) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Set classes and finding the prime form（集合类与原型的求法）. Accessed 2026-10-02.
- [Open Music Theory 2e — 8.6 Interval-Class Vectors](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/08%3A_20th-_and_21st-Century_Techniques/8.06%3A_Interval-Class_Vectors) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Computing interval-class vectors（音程级向量的计算）. Accessed 2026-10-02.
- [List of set classes](https://en.wikipedia.org/wiki/List_of_set_classes) — Wikipedia (citing Forte 1973; Rahn 1980; Straus 1990) — CC BY-SA 4.0. Forte numbers, Rahn and Forte prime forms, vectors and Z-relations of all 352 set classes（352 个集合类的 Forte 编号、原型（Rahn 与 Forte 写法）、音程级向量与 Z 关系）. Accessed 2026-10-02.
- [Open Music Theory 2e — 8.9 Collections](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/08%3A_20th-_and_21st-Century_Techniques/8.09%3A_Collections) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Whole-tone, octatonic, hexatonic, pentatonic and acoustic collections（全音、八音、六音、五声与原音音集）. Accessed 2026-10-02.
- [Mode of limited transposition](https://en.wikipedia.org/wiki/Mode_of_limited_transposition) — Wikipedia (citing Messiaen, The Technique of my Musical Language, trans. Satterfield, 1956, p. 58) — CC BY-SA 4.0. Intervals, transpositions and modes of Messiaen’s seven modes（梅西安七种有限移位调式的音程、移位数与调式数）. Accessed 2026-10-02.
- [Open Music Theory 2e — 9.2 Naming Conventions for Rows](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/09%3A_Twelve-Tone_Music/9.02%3A_Naming_Conventions_for_Rows) — Mark Gotham, Kyle Gullings, Chelsey Hamm, Bryn Hughes, Brian Jarvis, Megan Lavengood, John Peterson — CC BY-SA 4.0. Row-form names, fixed and moveable zero, matrix layout（P、I、R、RI 的命名与固定零、移动零两种下标约定，矩阵排法）. Accessed 2026-10-02.
- [List of tone rows and series](https://en.wikipedia.org/wiki/List_of_tone_rows_and_series) — Wikipedia (citing Hunter & von Hippel 2003; Bailey 1991; et al.) — CC BY-SA 4.0. The rows of Webern’s Op. 21 and Op. 24 and their hexachord classes（Webern Op. 21、Op. 24 的音列及其六音组集合类）. Accessed 2026-10-02.
- [Open Music Theory 2e — 8.2 Pitch and Pitch Class](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/08%3A_20th-_and_21st-Century_Techniques/8.02%3A_Pitch_and_Pitch_Class) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Pitch class and integer notation C = 0 (tutorial)（音级与整数记法 C = 0（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 8.3 Intervals in Integer Notation](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/08%3A_20th-_and_21st-Century_Techniques/8.03%3A_Intervals_in_Integer_Notation) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Ordered and unordered intervals; interval classes (tutorial)（有序/无序音程与音程级（教程））. Accessed 2026-10-02.
- [Open Music Theory 2e — 9.1 Basics of Twelve-Tone Theory](https://human.libretexts.org/Bookshelves/Music/Music_Theory/Open_Music_Theory_2e_(Gotham_et_al.)/09%3A_Twelve-Tone_Music/9.01%3A_Basics_of_Twelve-Tone_Theory) — Gotham, Gullings, Hamm, Hughes, Jarvis, Lavengood, Peterson — CC BY-SA 4.0. Twelve-tone rows and T, I, R, RI (tutorial)（十二音序列与 T、I、R、RI（教程））. Accessed 2026-10-02.
- [Wikipedia — Whole-tone scale](https://en.wikipedia.org/wiki/Whole-tone_scale) — Wikipedia contributors — CC BY-SA 4.0. The whole-tone scale, its symmetry and augmented triads (tutorial)（全音音阶的对称性与增三和弦（教程））. Accessed 2026-10-02.
- [Wikipedia — Octatonic scale](https://en.wikipedia.org/wiki/Octatonic_scale) — Wikipedia contributors — CC BY-SA 4.0. The octatonic / diminished scale, its two modes and jazz usage (tutorial)（八声音阶 / 减音阶的两种排列与爵士用法（教程））. Accessed 2026-10-02.

**Microtonality & tuning / 微分音与律学**

- [Pythagorean tuning](https://en.wikipedia.org/wiki/Pythagorean_tuning) — Wikipedia (citing Benward & Saker et al.) — CC BY-SA 4.0. Pythagorean tuning: chain of pure fifths, E♭–G#, the wolf, interval sizes（毕达哥拉斯律：纯五度链、E♭ 至 G# 的 12 音与狼五度；音程大小表）. Accessed 2026-10-02.
- [Meantone temperament](https://en.wikipedia.org/wiki/Meantone_temperament) — Wikipedia (citing Zarlino 1571; Barbour; et al.) — CC BY-SA 4.0. Quarter-comma meantone: fifths narrowed by 1/4 comma, pure thirds, wolf at G#–E♭（四分之一音差中庸全音律：五度缩窄 1/4 音差、纯大三度、狼五度在 G#–E♭）. Accessed 2026-10-02.
- [Werckmeister temperament](https://en.wikipedia.org/wiki/Werckmeister_temperament) — Wikipedia — CC BY-SA 4.0. Construction and cents table of Werckmeister III（Werckmeister III 的构造与各音音分表）. Accessed 2026-10-02.
- [Vallotti temperament](https://en.wikipedia.org/wiki/Vallotti_temperament) — Wikipedia (citing Donahue 2005; Barbieri 1987) — CC BY-SA 4.0. The common modern Vallotti: six fifths narrowed by 1/6 Pythagorean comma（今日通行的 Vallotti 律：六个五度缩窄 1/6 毕达哥拉斯音差）. Accessed 2026-10-02.
- [lamplight — chalaxata](https://lamplight0.sakura.ne.jp/en/a/music/chalaxata.php?mode=%E5%B9%B3%E5%9D%87%E5%BE%8B) — lamplight. Integer-ratio harmony configurations and names（整数频率比和声构型与命名）. Accessed 2026-10-01.
- [lamplight — requests](https://lamplight0.sakura.ne.jp/a/requests.php) — lamplight. Answers on naming the harmony configurations（和声构型命名的问答说明）. Accessed 2026-10-01.
- [MrZ626/shasavistic-chord-diagram-editor](https://github.com/MrZ626/shasavistic-chord-diagram-editor) — MrZ626. Chord diagram editor（和声构型图编辑器）. Accessed 2026-10-01.
- [Rtt398/nafchanaphata](https://github.com/Rtt398/nafchanaphata) — Rtt398. Microtonal sequencer（微分音音序器）. Accessed 2026-10-01.
- [HaleyHalcyon — notes (gist)](https://gist.github.com/HaleyHalcyon/9507005979ce6bbd4e93bdd298cb5d5e) — HaleyHalcyon. Note naming notes（音名记法笔记）. Accessed 2026-10-01.
- [Wikipedia — Harmonic series (music)](https://en.wikipedia.org/wiki/Harmonic_series_(music)) — Wikipedia contributors — CC BY-SA 4.0. The harmonic series: integer multiples, overtones and timbre (tutorial)（泛音列：基频的整数倍、泛音与音色（教程））. Accessed 2026-10-02.
- [Wikipedia — Neutral third](https://en.wikipedia.org/wiki/Neutral_third) — Wikipedia contributors — CC BY-SA 4.0. The neutral third (11:9, about 347 cents; 350 in 24-TET) and the neutral triad (tutorial)（中立三度（11:9、约 347 音分；24 平均里 350 音分）与中立三和弦（教程））. Accessed 2026-10-02.

**World modal systems / 世界调式体系**

- [MaqamWorld — Maqam index (Rast, Bayati, Hijaz, Saba, Sikah, Nahawand, ‘Ajam, Kurd)](https://www.maqamworld.com/en/maqam.php) — Johnny Farraj (© 2001–2018 MaqamWorld). Which ajnas build eight maqamat, on which degrees, the alternative upper ajnas; note-by-note transcriptions; the frequencies of the on-page note player（八个木卡姆由哪些 jins 构成、各在第几级、可替换的上方 jins；记谱图逐音转录；页面音符播放器的频率）. Accessed 2026-10-02.
- [MaqamWorld — Ajnas](https://www.maqamworld.com/en/jins.php) — Johnny Farraj (© 2001–2018 MaqamWorld). Intervals (1, ¾, ½, 1½), sizes and ghammaz of the nine basic ajnas（九个基本 jins 的音程（1、¾、½、1½）、大小与主导音）. Accessed 2026-10-02.
- [Arabic maqam](https://en.wikipedia.org/wiki/Arabic_maqam) — Wikipedia (citing Touma 1996; et al.) — CC BY-SA 4.0. 24-TET quarter tones as a notational convention with varying real intonation; the Bayati tone row（24 平均四分之一音只是记谱惯例、实际音高因地区和年代而异；Bayati 音列）. Accessed 2026-10-02.
- [Thaat](https://en.wikipedia.org/wiki/Thaat) — Wikipedia (citing Bhatkhande, Hindustani Sangeet Paddhati; Grove Music Online; Jairazbhoy 1995) — CC BY-SA 4.0. The ten thaats with their notes, eponymous ragas, Carnatic melakartas, Western equivalents and distinguishing notes; the 32 combinations and the rules for thaats（十个 thaat 的音、同名拉格、卡纳提克 melakarta、西方对应与区别特征；32 种组合与 thaat 的规则）. Accessed 2026-10-02.
- [Turkish makam](https://en.wikipedia.org/wiki/Turkish_makam) — Wikipedia (Arel-Ezgi-Uzdilek system) — CC BY-SA 4.0. The 53-comma system, names and comma positions of the 24 tones, interval names; the notes of the Çârgâh, Rast and Bûselik makams（53 koma 体系、24 个音的音名与 koma 位置、音程名称；Çârgâh、Rast、Bûselik makam 的音）. Accessed 2026-10-02.
- [Wikipedia — Double harmonic scale](https://en.wikipedia.org/wiki/Double_harmonic_scale) — Wikipedia contributors — CC BY-SA 4.0. The double harmonic scale (“Arabic” in this toolbox) (tutorial)（双和声音阶（本工具中的 Arabic 音阶）（教程））. Accessed 2026-10-02.

**Instruments & orchestration / 乐器与配器**

- [List of transposing instruments](https://en.wikipedia.org/wiki/List_of_transposing_instruments) — Wikipedia — CC BY-SA 4.0. The sounding pitch of a written C4 on each instrument（各乐器书写 C4 时实际发出的音）. Accessed 2026-10-02.
- [Transposing instrument](https://en.wikipedia.org/wiki/Transposing_instrument) — Wikipedia (citing Harvard Dictionary of Music) — CC BY-SA 4.0. Octave-transposing instruments; trombone and tuba at concert pitch; the British brass band exception（八度移调乐器；长号、大号按实音记谱；英式铜管乐队的长号记谱）. Accessed 2026-10-02.
- [Inquiry-Based Music Theory — 12a Instrumental Transpositions and Ranges](https://smbutterfield.github.io/ibmt17-18/12-reading-scores/a2-ex-insttransandrange.html) — Inquiry-Based Music Theory (S. M. Butterfield et al.) — CC BY-SA. Non-transposing instruments, each transposition’s interval and direction, converting in the opposite direction, worked examples（不移调乐器清单、各移调乐器的音程与方向、实音与书写音的反向换算及例题）. Accessed 2026-10-02.
- [Template:Vocal and instrumental pitch ranges](https://en.wikipedia.org/wiki/Template:Vocal_and_instrumental_pitch_ranges) — Wikipedia — CC BY-SA 4.0. Approximate sounding ranges of voices and instruments (generated from the chart source by a script)（人声与乐器实际发音的大致音域（由脚本从图表源码生成））. Accessed 2026-10-02.
- [Orchestral Instrument Ranges & Transposition](https://octatone.com/orchestral-ranges-transposition/) — BJ Brooks (© 2015 octatone.com). Further reading: written ranges and transpositions (the sheet IBMT uses)（推荐延伸阅读：各乐器书写音域与移调一览（IBMT 采用的参考表））. Accessed 2026-10-02.
- [CAGED System for Guitar](https://appliedguitartheory.com/lessons/caged-guitar-theory-system/) — Applied Guitar Theory. The five CAGED open shapes with interval labels, moving them, the C→A→G→E→D connection order and examples（CAGED 五个开放和弦形及音程标注、平移规则、C→A→G→E→D 的相接顺序与例子）. Accessed 2026-10-02.
- [Standard tuning](https://en.wikipedia.org/wiki/Standard_tuning) — Wikipedia — CC BY-SA 4.0. Standard tunings of guitar, bass, mandolin and ukulele（吉他、贝斯、曼陀林、尤克里里的标准调弦）. Accessed 2026-10-02.

**Sound & assets / 音色与素材**

- [Salamander Grand Piano V3 (Yamaha C5)](https://freepats.zenvoid.org/Piano/acoustic-grand-piano.html) — Alexander Holm — CC BY 3.0. Piano samples, one every minor third A0–C8（钢琴音色采样（A0–C8 每小三度一个））. Accessed 2026-10-01.
- [sfzinstruments/SalamanderGrandPiano](https://github.com/sfzinstruments/SalamanderGrandPiano) — Alexander Holm; SFZ mapping by kinwie — CC BY 3.0. Sample license and recording notes（采样授权与录音说明）. Accessed 2026-10-01.
- [Tone.js — hosted Salamander MP3 set](https://tonejs.github.io/audio/salamander/) — Tone.js. Where the MP3 files were downloaded from（采样 MP3 文件的下载来源）. Accessed 2026-10-01.

<!-- references:end -->

### Contributing

If you're a developer with a passion for jazz, feel free to submit Pull Requests for new voicing algorithms or specialized scale mappings!

**Keep Swings!**
