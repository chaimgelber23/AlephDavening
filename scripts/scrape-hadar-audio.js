const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = 'https://www.hadar.org/hadar_core/content';
const TMPDIR = path.join(process.env.USERPROFILE, 'AppData/Local/Temp');

// Key prayer elements from Hadar weekday shacharit - mapped to our prayer IDs
const ELEMENTS = {
  // Birkot HaShachar section
  '6752': 'kaddish-drabbanan',
  // Pesukei D'Zimra
  '6655': 'baruch-sheamar',
  '6660': 'ashrei-pesukei',
  '6665': 'hodu-section',
  '6680': 'az-yashir-section',
  '6798': 'hatzi-kaddish',
  '6694': 'yishtabach',
  // Shema & Brachot
  '6703': 'yotzer-or',
  '6714': 'ahavah-rabbah',
  '6719': 'shema',
  '6720': 'vahavta',
  '6721': 'vhayah',
  '6722': 'vayomer',
  '6723': 'emet-vyatziv',
  // Amidah
  '6735': 'amidah-avot',
  '6737': 'amidah-gevurot',
  '6739': 'amidah-kedusha',
  '6741': 'amidah-ata-chonen',
  '6756': 'mourners-kaddish',
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const results = {};
  const ids = Object.keys(ELEMENTS);

  // Process in batches of 5
  for (let i = 0; i < ids.length; i += 5) {
    const batch = ids.slice(i, i + 5);
    const promises = batch.map(async (id) => {
      const name = ELEMENTS[id];
      try {
        const data = await fetch(`${BASE}/${id}`);
        const re = /https:\\\/\\\/mechonhadar\.s3\.amazonaws\.com\\\/mh_tefillah_files_type1\\\/[^"\\]+\.mp3/g;
        const urls = [];
        let m;
        while ((m = re.exec(data)) !== null) {
          urls.push(m[0].replace(/\\\//g, '/'));
        }

        // Also extract titles
        const titleRe = /data-file-title=\\?"([^"\\]+)\\?"/g;
        const titles = [];
        while ((m = titleRe.exec(data)) !== null) {
          titles.push(m[1]);
        }

        results[name] = { id, urls, titles };
        if (urls.length > 0) {
          console.log(`${name}: ${urls.length} recordings`);
          urls.forEach((u, j) => console.log(`  ${titles[j] || '?'}: ${u}`));
        } else {
          console.log(`${name}: no audio found`);
        }
      } catch (err) {
        console.log(`${name}: ERROR - ${err.message}`);
      }
    });
    await Promise.all(promises);
  }

  // Save results
  const outPath = path.join(TMPDIR, 'hadar-audio-urls.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved to ${outPath}`);
}

main().catch(console.error);
