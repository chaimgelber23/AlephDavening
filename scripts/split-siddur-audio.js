/**
 * Split Siddur Audio compound recordings into individual prayer files.
 *
 * These recordings cover multiple prayers in sequence. We estimate split points
 * based on relative text length (word count) of each prayer, then use ffmpeg
 * to extract segments.
 *
 * The split points are estimates — they can be manually refined later by editing
 * the SPLIT_MAPS below. Each entry has { prayerId, label, startPct, endPct }
 * where startPct/endPct are percentages of the total recording duration.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FFMPEG = path.join(__dirname, '..', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const SRC_BASE = path.join(__dirname, '..', 'public', 'audio', 'sources', 'sidduraudio');
const DEST_BASE = path.join(__dirname, '..', 'public', 'audio', 'prayers');

/**
 * Split maps define what prayers are in each compound recording.
 * startPct / endPct are rough % of total duration.
 * These are educated estimates based on prayer text lengths and traditional order.
 * Fine-tune by listening and adjusting percentages.
 */
const SPLIT_MAPS = {
  // --- WEEKDAY SHACHARIT PART 1 (9:06 = 546s) ---
  // Birkot HaShachar section
  'weekday/weekday-shachrit1.mp3': [
    { prayerId: 'modeh-ani', label: 'Modeh Ani', startPct: 0, endPct: 5 },
    { prayerId: 'netilat-yadayim', label: 'Netilat Yadayim', startPct: 5, endPct: 9 },
    { prayerId: 'asher-yatzar', label: 'Asher Yatzar', startPct: 9, endPct: 17 },
    { prayerId: 'elokai-neshama', label: 'Elokai Neshama', startPct: 17, endPct: 25 },
    { prayerId: 'birchos-hatorah', label: 'Birchos HaTorah', startPct: 25, endPct: 40 },
    { prayerId: 'birchos-hashachar', label: 'Birchos HaShachar', startPct: 40, endPct: 100 },
  ],

  // --- PESUKEI D'ZIMRA PART 1 (5:57 = 357s) ---
  'weekday/pesikey1.mp3': [
    { prayerId: 'baruch-sheamar', label: 'Baruch She\'amar', startPct: 0, endPct: 30 },
    { prayerId: 'hodu', label: 'Hodu', startPct: 30, endPct: 65 },
    { prayerId: 'mizmor-ltodah', label: 'Mizmor L\'Todah', startPct: 65, endPct: 100 },
  ],

  // --- PESUKEI D'ZIMRA PART 2 (6:23 = 383s) ---
  'weekday/pesikey2.mp3': [
    { prayerId: 'ashrei', label: 'Ashrei (Pesukei)', startPct: 0, endPct: 40 },
    { prayerId: 'az-yashir', label: 'Az Yashir', startPct: 40, endPct: 80 },
    { prayerId: 'yishtabach', label: 'Yishtabach', startPct: 80, endPct: 100 },
  ],

  // --- SHACHARIT PART 2 (10:39 = 639s) ---
  // Shema and brachot + beginning of Amidah
  'weekday/weekday-shachrit2.mp3': [
    { prayerId: 'yotzer-or', label: 'Yotzer Or', startPct: 0, endPct: 18 },
    { prayerId: 'ahavah-rabbah', label: 'Ahavah Rabbah', startPct: 18, endPct: 30 },
    { prayerId: 'shema', label: 'Shema', startPct: 30, endPct: 50 },
    { prayerId: 'emet-vyatziv', label: 'Emet V\'Yatziv', startPct: 50, endPct: 65 },
    { prayerId: 'shemoneh-esrei', label: 'Shemoneh Esrei (beginning)', startPct: 65, endPct: 100 },
  ],

  // --- SHACHARIT PART 3 (5:28 = 328s) ---
  'weekday/weekday-shachrit3.mp3': [
    { prayerId: 'tachanun', label: 'Tachanun', startPct: 0, endPct: 55 },
    { prayerId: 'uva-ltzion', label: 'Uva L\'Tzion', startPct: 55, endPct: 100 },
  ],

  // --- SHACHARIT PART 4 (3:08 = 188s) ---
  'weekday/weekday-shachrit4.mp3': [
    { prayerId: 'aleinu', label: 'Aleinu', startPct: 0, endPct: 100 },
  ],

  // --- WEEKDAY MINCHA (5:51 = 351s) ---
  'weekday/weekday-mincha.mp3': [
    { prayerId: 'ashrei', label: 'Ashrei (Mincha)', startPct: 0, endPct: 35, suffix: '-mincha' },
    { prayerId: 'shemoneh-esrei', label: 'Shemoneh Esrei (Mincha)', startPct: 35, endPct: 85, suffix: '-mincha' },
    { prayerId: 'aleinu', label: 'Aleinu (Mincha)', startPct: 85, endPct: 100, suffix: '-mincha' },
  ],

  // --- WEEKDAY MAARIV (6:57 = 417s) ---
  'weekday/weekday-maariv.mp3': [
    { prayerId: 'shema', label: 'Shema (Maariv)', startPct: 0, endPct: 40, suffix: '-maariv' },
    { prayerId: 'shemoneh-esrei', label: 'Shemoneh Esrei (Maariv)', startPct: 40, endPct: 85, suffix: '-maariv' },
    { prayerId: 'aleinu', label: 'Aleinu (Maariv)', startPct: 85, endPct: 100, suffix: '-maariv' },
  ],
};

function getDuration(filePath) {
  const out = execSync(
    `"${FFMPEG}" -i "${filePath}" 2>&1`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  ).toString();
  // Will be in stderr, but execSync with encoding catches it
  return out;
}

function getDurationSeconds(filePath) {
  try {
    const result = execSync(
      `"${FFMPEG}" -i "${filePath}" 2>&1 || true`,
      { encoding: 'utf8' }
    );
    const match = result.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseFloat(match[3]);
    }
  } catch (e) {
    const match = e.stdout?.match(/Duration: (\d+):(\d+):(\d+\.\d+)/) ||
                  e.stderr?.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseFloat(match[3]);
    }
  }
  return 0;
}

function splitFile(srcRelPath, segments) {
  const srcPath = path.join(SRC_BASE, srcRelPath);

  if (!fs.existsSync(srcPath)) {
    console.log(`SKIP: ${srcRelPath} not found`);
    return;
  }

  const totalDuration = getDurationSeconds(srcPath);
  if (totalDuration === 0) {
    console.log(`SKIP: ${srcRelPath} - could not get duration`);
    return;
  }

  console.log(`\nSplitting ${srcRelPath} (${totalDuration.toFixed(1)}s):`);

  for (const seg of segments) {
    const startSec = (seg.startPct / 100) * totalDuration;
    const endSec = (seg.endPct / 100) * totalDuration;
    const duration = endSec - startSec;

    const destDir = path.join(DEST_BASE, seg.prayerId);
    fs.mkdirSync(destDir, { recursive: true });

    const suffix = seg.suffix || '';
    const destFile = path.join(destDir, `${seg.prayerId}${suffix}-sidduraudio.mp3`);

    if (fs.existsSync(destFile)) {
      console.log(`  SKIP ${seg.label} (exists)`);
      continue;
    }

    try {
      execSync(
        `"${FFMPEG}" -i "${srcPath}" -ss ${startSec.toFixed(2)} -t ${duration.toFixed(2)} -c copy "${destFile}" -y`,
        { stdio: 'pipe' }
      );
      const stats = fs.statSync(destFile);
      console.log(`  ${seg.label}: ${startSec.toFixed(1)}s - ${endSec.toFixed(1)}s (${duration.toFixed(1)}s) -> ${(stats.size / 1024).toFixed(0)}KB`);
    } catch (err) {
      console.log(`  FAILED ${seg.label}: ${err.message}`);
    }
  }
}

// Run splits
console.log('=== Splitting Siddur Audio compound recordings ===\n');
for (const [srcFile, segments] of Object.entries(SPLIT_MAPS)) {
  splitFile(srcFile, segments);
}

console.log('\n=== Done ===');
