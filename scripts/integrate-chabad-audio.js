/**
 * Copy Chabad audio files from Downloads to the proper project directories.
 * Maps Chabad filenames to our prayer IDs.
 */

const fs = require('fs');
const path = require('path');

const DOWNLOADS = path.join('C:', 'Users', 'chaim', 'Downloads');
const AUDIO_BASE = path.join(__dirname, '..', 'public', 'audio', 'prayers');

// Map Chabad filenames to our prayer IDs
// Format: partial filename match -> prayer ID
const CHABAD_MAP = {
  // Brachos (morning blessings)
  'Brachos_1_Modeh_Ani': 'modeh-ani',
  'Brachos_5_Yehi_Ratzon': 'birchos-hashachar', // part of morning brachot
  'Brachos_8_Eilu_Devarim': 'birchos-hatorah',   // part of torah brachot section

  // Pesukei D'Zimra
  'Tefillah_23_Hodu': 'hodu',
  'Tefillah_24_Mizmar_Shir': 'mizmor-ltodah',
  'Tefillah_25_Hashem_Melech': null, // no direct match in our prayers
  'Tefillah_26_Hoshieinu': null, // no direct match
  'Tefillah_27_Lamnatzeiach': null, // no direct match (Psalm 67)
  'Tefillah_28_Lsheim_Yichud': null, // no direct match
  'Tefillah_29_Baruch_Sheamar': 'baruch-sheamar',
  'Tefillah_30_Mizmar_Lsodah': 'mizmor-ltodah', // alternate name
  'Tefillah_31_Yehi_Chvod': null, // yehi kavod - part of pesukei d'zimra
  'Tefillah_32_Ashrei': 'ashrei',
  'Tefillah_33_Halelukah_Haleli': null, // Psalm 146 - pesukei d'zimra
  'Tefillah_34_Halelukah_Ki_Tov': null, // Psalm 147
  'Tefillah_35_Halelukah_Halelu_Es': null, // Psalm 148
  'Tefillah_36_Halelukah_Shiru': null, // Psalm 149
  'Tefillah_37_Halelukah_Halelu_Keil': null, // Psalm 150
  'Tefillah_38_Baruch_Hashem_LeOlam': null, // end of pesukei d'zimra
  'Tefillah_39_Vayivorech_Dovid': null, // pesukei d'zimra
  'Tefillah_40_Vcharos': null, // pesukei d'zimra
  'Tefillah_41_VaYosha': null, // pesukei d'zimra - az yashir intro
  'Tefillah_42_Az_Yashir': 'az-yashir',
  'Tefillah_43_Yishtabach': 'yishtabach',

  // Birchos Kriyas Shema
  'Tefillah_44_Baruch_Yotzeir': 'yotzer-or', // yotzer or bracha
  'Tefillah_45_Hameiir_LaAretz': 'yotzer-or', // continuation - skip if already have yotzer-or
  'Tefillah_46_Tisbareich': null, // kedushah d'yotzer
  'Tefillah_47_Es_Shem_HaKel': null, // part of yotzer
  'Tefillah_48_Kadosh': null, // kedushah
  'Tefillah_49_LaKeil_Baruch': null, // part of yotzer
  'Tefillah_50_Ahavas_Olam': 'ahavah-rabbah', // ahavat olam = nusach ashkenaz for ahavah rabbah
  'Tefillah_51_Shema_Yisrael': 'shema',
  'Tefillah_52_VeHayah': 'shema', // v'haya - 2nd paragraph of shema (skip - duplicate prayer)
  'Tefillah_53_VaYomer': 'shema', // vayomer - 3rd paragraph (skip - duplicate)
  'Tefillah_54_Vyatziv': 'emet-vyatziv',
  'Tefillah_55_Al_HaRishonim': 'emet-vyatziv', // continuation (skip if already mapped)
  'Tefillah_56_Ezras_Avoseinu': 'emet-vyatziv', // continuation (skip if already mapped)
  'Tefillah_57_Shirah_Chadashah': null, // end of emet v'yatziv/geulah bracha

  // Shemoneh Esrei
  'Tefillah_58_Shmoneh_Esrei': 'shemoneh-esrei',

  // Post-Shemoneh Esrei
  'Tefillah_68_Ashrei': 'ashrei', // Ashrei before Uva L'tziyon (skip - dup)
  'Tefillah_69_Lamnatzeach_yaancha': null, // Psalm 20
  'Tefillah_70_Uvuh_Letziyon': 'uva-ltzion',
  'Tefillah_73_Sunday_Shir_Shel_Hom': null, // shir shel yom
  'Tefillah_73_Monday_Shir_Shel_Yom': null, // shir shel yom
  'Tefillah_73_Tuesday_Shir_Shel_Yom': null, // shir shel yom
  'Tefillah_73_Wednesday_Shir_Shel_Yom': null, // shir shel yom
  'Tefillah_73_Thursday_Shir_Shel_Yom': null, // shir shel yom
  'Tefillah_73_Friday_Shir_Shel_Yom': null, // shir shel yom
  'Tefillah_76_Aleinu': 'aleinu',
  'Tefillah_89_Lamnatzeach_yaancha': null, // duplicate
  'Tefillah_92_Ashrei': 'ashrei', // mincha ashrei (skip - dup)

  // Maariv
  'Maariv_1_vHu_Rachum': null, // intro to maariv - no direct match
  'Maariv_2_Asher_Bidvaro': null, // maariv bracha - no standalone prayer
  'Maariv_3_Ahavas_Olam': 'ahavah-rabbah', // maariv version (skip if have shacharit)
  'Maariv_4_Shema': 'shema', // maariv shema (skip if have shacharit)
  'Maariv_5_VeEmunah': 'emet-vyatziv', // maariv version (skip if have shacharit)
  'Maariv_6_Mi_Chamochah': null, // part of geulah bracha
  'Maariv_7_Hashkiveinu': null, // maariv-only bracha - no standalone prayer
};

// Track which prayer IDs we've already copied (avoid duplicates)
const copied = new Set();
let copyCount = 0;

// Get all Chabad files
const files = fs.readdirSync(DOWNLOADS).filter(f =>
  f.endsWith('.mp3') && (f.includes('Tefillah_') || f.includes('Brachos_'))
);

console.log(`Found ${files.length} Chabad audio files\n`);

for (const file of files) {
  // Skip duplicate downloads (files ending with " (1).mp3")
  if (file.match(/\(\d+\)\.mp3$/)) {
    console.log(`  SKIP (duplicate download): ${file}`);
    continue;
  }

  // Find matching prayer ID
  let prayerId = null;
  for (const [pattern, id] of Object.entries(CHABAD_MAP)) {
    if (file.includes(pattern)) {
      prayerId = id;
      break;
    }
  }

  if (!prayerId) {
    console.log(`  SKIP (no match): ${file}`);
    continue;
  }

  // Skip if we already copied this prayer (e.g., Shema has 3 paragraphs)
  // Exception: keep the first one we find for each prayer
  if (copied.has(prayerId)) {
    console.log(`  SKIP (already have ${prayerId}): ${file}`);
    continue;
  }

  // Special case: Tefillah_45 is continuation of yotzer-or, skip if we have 44
  if (file.includes('Tefillah_45') && copied.has('yotzer-or')) {
    console.log(`  SKIP (already have yotzer-or): ${file}`);
    continue;
  }
  // Skip emet-vyatziv continuations
  if ((file.includes('Tefillah_55') || file.includes('Tefillah_56')) && copied.has('emet-vyatziv')) {
    console.log(`  SKIP (already have emet-vyatziv): ${file}`);
    continue;
  }
  // Skip shema duplicates (paragraphs 2 and 3)
  if ((file.includes('Tefillah_52') || file.includes('Tefillah_53')) && copied.has('shema')) {
    console.log(`  SKIP (already have shema): ${file}`);
    continue;
  }
  // Skip duplicate ashrei
  if ((file.includes('Tefillah_68') || file.includes('Tefillah_92')) && copied.has('ashrei')) {
    console.log(`  SKIP (already have ashrei): ${file}`);
    continue;
  }
  // Tefillah_30 is duplicate of mizmor-ltodah (already have 24)
  if (file.includes('Tefillah_30') && copied.has('mizmor-ltodah')) {
    console.log(`  SKIP (already have mizmor-ltodah): ${file}`);
    continue;
  }

  // Create target directory
  const targetDir = path.join(AUDIO_BASE, prayerId);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy file
  const targetFile = path.join(targetDir, `${prayerId}-chabad.mp3`);
  const sourceFile = path.join(DOWNLOADS, file);
  fs.copyFileSync(sourceFile, targetFile);
  copied.add(prayerId);
  copyCount++;

  const sizeMB = (fs.statSync(sourceFile).size / 1024 / 1024).toFixed(2);
  console.log(`  COPY: ${file} -> ${prayerId}/${prayerId}-chabad.mp3 (${sizeMB} MB)`);
}

console.log(`\nCopied ${copyCount} files to prayer directories.`);
console.log('Prayer IDs with Chabad audio:', [...copied].sort().join(', '));
