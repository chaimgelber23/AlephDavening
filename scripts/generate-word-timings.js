/**
 * Generate word-level timing data for prayer sections.
 *
 * For each prayer section that has a corresponding audio file,
 * this script:
 * 1. Gets the actual audio duration via ffmpeg
 * 2. Splits the Hebrew text into words
 * 3. Distributes the duration proportionally by consonant count
 * 4. Outputs a TypeScript file with WordTiming[] per section ID
 *
 * Usage: node scripts/generate-word-timings.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FFMPEG = path.join(__dirname, '..', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const AUDIO_BASE = path.join(__dirname, '..', 'public', 'audio', 'prayers');
const PRAYERS_FILE = path.join(__dirname, '..', 'src', 'lib', 'content', 'prayers.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'lib', 'content', 'word-timings.ts');

/**
 * Get audio duration in milliseconds.
 */
function getDurationMs(filePath) {
  try {
    const result = execSync(
      `"${FFMPEG}" -i "${filePath}" 2>&1 || true`,
      { encoding: 'utf8' }
    );
    const match = result.match(/Duration: (\d+):(\d+):(\d+\.?\d*)/);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const seconds = parseFloat(match[3]);
      return Math.round((hours * 3600 + minutes * 60 + seconds) * 1000);
    }
  } catch (e) {
    const output = (e.stdout || '') + (e.stderr || '');
    const match = output.match(/Duration: (\d+):(\d+):(\d+\.?\d*)/);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const seconds = parseFloat(match[3]);
      return Math.round((hours * 3600 + minutes * 60 + seconds) * 1000);
    }
  }
  return 0;
}

/**
 * Count Hebrew consonants in a word (proxy for syllable weight).
 * Strips nikkud (vowel marks) and maqaf, counts remaining chars.
 */
function hebrewConsonantCount(word) {
  // Hebrew consonants: \u05D0-\u05EA
  // Nikkud: \u05B0-\u05BD, \u05BF, \u05C1-\u05C2, \u05C4-\u05C5, \u05C7
  // Strip everything that's not a consonant
  const consonants = word.replace(/[^\u05D0-\u05EA]/g, '');
  // Minimum weight of 1 for any word (even single-char)
  return Math.max(consonants.length, 1);
}

/**
 * Generate word timings for a set of Hebrew words over a given duration.
 * Uses consonant count as weight for proportional distribution.
 * Adds a small leading buffer for natural speech onset.
 */
function generateTimings(words, totalDurationMs) {
  if (words.length === 0) return [];

  // Leading silence buffer (speech doesn't start at 0)
  const leadingBuffer = Math.min(200, totalDurationMs * 0.03);
  // Trailing buffer
  const trailingBuffer = Math.min(150, totalDurationMs * 0.02);
  // Usable speaking time
  const speakingTime = totalDurationMs - leadingBuffer - trailingBuffer;

  if (speakingTime <= 0) {
    // Audio too short — even split
    const msPerWord = totalDurationMs / words.length;
    return words.map((word, i) => ({
      word,
      startMs: Math.round(i * msPerWord),
      endMs: Math.round((i + 1) * msPerWord),
    }));
  }

  // Calculate weights based on consonant count
  const weights = words.map(w => hebrewConsonantCount(w));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  // Small inter-word gap (5% of each word's time)
  const timings = [];
  let cursor = leadingBuffer;

  for (let i = 0; i < words.length; i++) {
    const wordDuration = (weights[i] / totalWeight) * speakingTime;
    const gap = wordDuration * 0.05; // tiny gap between words
    const effectiveDuration = wordDuration - gap;

    timings.push({
      word: words[i],
      startMs: Math.round(cursor),
      endMs: Math.round(cursor + effectiveDuration),
    });

    cursor += wordDuration;
  }

  // Ensure last word extends to near the end
  if (timings.length > 0) {
    timings[timings.length - 1].endMs = Math.round(totalDurationMs - trailingBuffer);
  }

  return timings;
}

/**
 * Parse prayers.ts to extract section IDs and Hebrew text.
 * Uses regex to find section blocks — not a full TS parser but
 * good enough for our structured format.
 */
function parsePrayerSections(content) {
  const sections = [];

  // Match each section object: { id: '...', ... hebrewText: '...', ... }
  // Sections are inside sections: [...] arrays
  const sectionRegex = /\{\s*id:\s*'([^']+)',\s*sortOrder:\s*\d+,\s*hebrewText:\s*'((?:[^'\\]|\\.)*)'/g;
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const id = match[1];
    // Unescape any escaped single quotes in the Hebrew text
    const hebrewText = match[2].replace(/\\'/g, "'");
    sections.push({ id, hebrewText });
  }

  return sections;
}

/**
 * Find the best matching audio file for a section.
 * Priority: exact section file > full-prayer siddur audio
 */
function findAudioFile(sectionId) {
  // Extract prayer ID from section ID (e.g., 'modeh-ani-1' -> 'modeh-ani')
  // Handle various patterns:
  // modeh-ani-1, ashrei-intro-1, ashrei-aleph, birchos-hashachar-3
  const prayerDir = path.join(AUDIO_BASE);

  // Try exact section match: {sectionId}.mp3
  const dirs = fs.readdirSync(prayerDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const dir of dirs) {
    const exactPath = path.join(prayerDir, dir, `${sectionId}.mp3`);
    if (fs.existsSync(exactPath)) {
      return exactPath;
    }
  }

  return null;
}

// --- Main ---
function main() {
  console.log('=== Generating Word Timings ===\n');

  // Read prayers.ts
  const prayersContent = fs.readFileSync(PRAYERS_FILE, 'utf8');
  const sections = parsePrayerSections(prayersContent);
  console.log(`Found ${sections.length} prayer sections\n`);

  const timingsMap = {};
  let matched = 0;
  let unmatched = 0;

  for (const section of sections) {
    const audioFile = findAudioFile(section.id);

    if (!audioFile) {
      unmatched++;
      continue;
    }

    const durationMs = getDurationMs(audioFile);
    if (durationMs === 0) {
      console.log(`  SKIP ${section.id} — could not get audio duration`);
      unmatched++;
      continue;
    }

    const words = section.hebrewText.split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) {
      continue;
    }

    const timings = generateTimings(words, durationMs);
    timingsMap[section.id] = timings;
    matched++;

    const durationSec = (durationMs / 1000).toFixed(1);
    console.log(`  ${section.id}: ${words.length} words, ${durationSec}s audio`);
  }

  console.log(`\nMatched: ${matched}, Unmatched: ${unmatched}\n`);

  // Generate TypeScript output
  const tsLines = [
    "import type { WordTiming } from '@/types';",
    '',
    '/**',
    ' * Auto-generated word timing data for prayer sections.',
    ' * Generated from actual audio file durations with proportional',
    ' * distribution weighted by Hebrew consonant count.',
    ' *',
    ' * To regenerate: node scripts/generate-word-timings.js',
    ' */',
    '',
    'export const WORD_TIMINGS: Record<string, WordTiming[]> = {',
  ];

  for (const [sectionId, timings] of Object.entries(timingsMap)) {
    tsLines.push(`  '${sectionId}': [`);
    for (const t of timings) {
      // Escape single quotes in word text
      const escapedWord = t.word.replace(/'/g, "\\'");
      tsLines.push(`    { word: '${escapedWord}', startMs: ${t.startMs}, endMs: ${t.endMs} },`);
    }
    tsLines.push('  ],');
  }

  tsLines.push('};');
  tsLines.push('');

  // Helper function
  tsLines.push('/**');
  tsLines.push(' * Get word timings for a prayer section, if available.');
  tsLines.push(' */');
  tsLines.push('export function getWordTimings(sectionId: string): WordTiming[] | undefined {');
  tsLines.push('  return WORD_TIMINGS[sectionId];');
  tsLines.push('}');
  tsLines.push('');

  fs.writeFileSync(OUTPUT_FILE, tsLines.join('\n'), 'utf8');
  console.log(`Written to ${OUTPUT_FILE}`);
  console.log(`Total sections with timings: ${Object.keys(timingsMap).length}`);
}

main();
