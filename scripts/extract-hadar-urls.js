const fs = require('fs');
const path = require('path');

const file = path.join(process.env.USERPROFILE, 'AppData/Local/Temp/hadar_shema.json');
const d = fs.readFileSync(file, 'utf8');

// URLs are escaped with \/ in JSON
const re = /https:\\\/\\\/mechonhadar\.s3\.amazonaws\.com\\\/mh_tefillah_files_type1\\\/[^"\\]+\.mp3/g;
const urls = new Set();
let m;
while ((m = re.exec(d)) !== null) {
  let url = m[0].replace(/\\\//g, '/');
  urls.add(url);
}
urls.forEach(u => console.log(u));
