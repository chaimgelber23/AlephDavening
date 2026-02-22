const fs = require('fs');
const path = require('path');
const https = require('https');

const DEST_BASE = path.join(__dirname, '..', 'public', 'audio', 'sources', 'hadar');

// Per-prayer Hadar recordings mapped to our prayer IDs
// Using Weiss recordings as primary (most complete coverage)
const DOWNLOADS = {
  // Shema & Brachot
  'shema': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-ShemaSH.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-Shema.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-ShemaS.mp3', artist: 'diamond' },
  ],
  'ahavah-rabbah': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-AhavahRabbah.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-AhavahRabbah.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-AhavahRabbah.mp3', artist: 'diamond' },
  ],
  'yotzer-or': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-Barukh...YotzeirOr_0.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-BarukhYotzeirOr.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-Barukh...YotzeirOr.mp3', artist: 'diamond' },
  ],
  'emet-vyatziv': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-AdonaiElokeichemEmet.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-AdonaiEloheichemEmet.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-AdonaiEloheikhemEmetS.mp3', artist: 'diamond' },
  ],
  // Amidah sections
  'shemoneh-esrei-avot': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-AvotSH.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-Avot.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-Avot.mp3', artist: 'diamond' },
  ],
  'shemoneh-esrei-gevurot': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-GevurotSH.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-Gevurot.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-Gevurot.mp3', artist: 'diamond' },
  ],
  'shemoneh-esrei-kedusha': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-N%27kadeish%28Kedushah%29SH.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-NkadeishKedushah.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-N%27kadeishKedushah.mp3', artist: 'diamond' },
  ],
  // Kaddish variants
  'kaddish-half': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-ChatziKaddishSH.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Richman-ChatziKaddish.mp3', artist: 'richman' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-ChatziKaddishBarekhu.mp3', artist: 'diamond' },
  ],
  'kaddish-drabbanan': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Rosenbaum-KaddishDRabbanan.mp3', artist: 'rosenbaum' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-KaddishD%27Rabbanan.mp3', artist: 'diamond' },
  ],
  'kaddish-mourners': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-Mourner%27sKaddishSH.mp3', artist: 'weiss' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Rosenbaum-MournersKaddish.mp3', artist: 'rosenbaum' },
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Diamond-Mourner%27sKaddish.mp3', artist: 'diamond' },
  ],
  // V'ahavta
  'shema-vahavta': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Weiss-Ve%27Ahavta%281stParagraph%29.mp3', artist: 'weiss' },
  ],
  // Full service recordings
  '_full-weekday-shacharit-nusach': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Shacharit-Weiss-Fullnusachonly.mp3', artist: 'weiss' },
  ],
  '_full-weekday-shacharit-melodies': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Weekday-Shacharit-Weiss-Fullwithmelodies.mp3', artist: 'weiss' },
  ],
  '_full-shabbat-shacharit': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Shabbat-Shacharit-Richman-Full.mp3', artist: 'richman' },
  ],
  '_full-shabbat-maariv': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Shabbat-Ma%27ariv-Weiss-Full.mp3', artist: 'weiss' },
  ],
  '_full-shabbat-kabbalat-shabbat': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/Shabbat-KaballatShabbat-Weiss-Full.mp3', artist: 'weiss' },
  ],
  '_full-weekday-maariv': [
    { url: 'https://mechonhadar.s3.amazonaws.com/mh_tefillah_files_type1/dena%20weekday%20arvit.mp3', artist: 'weiss' },
  ],
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { fs.unlinkSync(dest); reject(err); });
    }).on('error', (err) => { fs.unlinkSync(dest); reject(err); });
  });
}

async function main() {
  let total = 0;
  let success = 0;
  let failed = 0;

  for (const [prayerId, files] of Object.entries(DOWNLOADS)) {
    const dir = path.join(DEST_BASE, prayerId);
    fs.mkdirSync(dir, { recursive: true });

    for (const { url, artist } of files) {
      total++;
      const filename = `${artist}.mp3`;
      const dest = path.join(dir, filename);

      if (fs.existsSync(dest)) {
        console.log(`  SKIP ${prayerId}/${filename} (exists)`);
        success++;
        continue;
      }

      try {
        process.stdout.write(`  Downloading ${prayerId}/${filename}...`);
        await download(url, dest);
        const stats = fs.statSync(dest);
        console.log(` OK (${(stats.size / 1024).toFixed(0)}KB)`);
        success++;
      } catch (err) {
        console.log(` FAILED: ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\nDone: ${success}/${total} downloaded, ${failed} failed`);
}

main().catch(console.error);
