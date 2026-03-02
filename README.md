# Jazz Compass

**An Instant Music Theory Engine & Improvisation Guide for Modern Jazz.**

Jazz Compass is a lightweight, high-performance web tool designed for jazz musicians, composers, and students. It translates complex harmonic concepts—from Lydian Chromatic Theory to Negative Harmony—into actionable, visual data.

## Key Features

### 1. Chord Intelligence

* **Universal Chord Converter**: Input any chord symbol (e.g., `C13#11`, `Dbm9/E`) to instantly see its note composition and semitone offsets.
* **Visual Keyboard**: Integrated mini-keyboard display for immediate voicing visualization.

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

## Technical Architecture

* **Pure Vanilla JS (ES6+)**: Zero dependencies. Modular architecture using ES Modules.
* **i18n Support**: A robust system supporting **English, Chinese, and Japanese** via `lang.js`.
* **Glassmorphism UI**: A modern, dark-themed interface optimized for both desktop and mobile.

## File Structure

```text
├── index.html          # Application entry point
├── jazz_compass.js     # Core logic (Chord parsing, LCC, CST, Negative Harmony)
├── script.js           # UI logic and event handling
├── lang.js             # Internationalization (i18n) dictionary
└── style.css           # Custom dark-mode styles & layout
```

---

### Contributing

If you're a developer with a passion for jazz, feel free to submit Pull Requests for new voicing algorithms or specialized scale mappings!

**Keep Swings!**