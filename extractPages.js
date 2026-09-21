const fs = require('fs');
const path = require('path');

function parsePages(dir) {
  const files = fs.readdirSync(dir);
  let map = {};
  for (const file of files) {
    if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const match = content.match(/import (\w+) from '.*?templates\/\w+'/);
      if (match) {
        const template = match[1];
        const idMatch = content.match(/dataId=["']([^"']+)["']/);
        if (idMatch) {
          map[idMatch[1]] = template;
        } else {
          map[file.replace('.jsx', '').replace('.tsx', '')] = template;
        }
      }
    }
  }
  return map;
}

const fMap = parsePages('web/src/pages/facilities');
const sMap = parsePages('web/src/pages/social');

// Since we can't easily require ES modules dynamically in CJS without warnings/errors sometimes,
// we'll just read the JS file and extract the objects, or better, just rename them.
// Wait, I already created temp_facilities.js and temp_social.js in backend/scripts!

const { facilitiesData } = require('./backend/scripts/temp_facilities.js');
const { socialActivitiesData } = require('./backend/scripts/temp_social.js');

const finalData = [];

for (const [id, data] of Object.entries(facilitiesData)) {
  if (fMap[id]) {
    finalData.push({ slug: 'facilities/' + id, layoutType: fMap[id], data });
  } else {
    // If not found by dataId, fallback to title casing or manual match if needed.
    // e.g. prisoner-interview -> PrisonerInterviewPage -> mapped?
    // Let's just log missing ones
    console.log('Missing mapping for facility:', id);
  }
}

for (const [id, data] of Object.entries(socialActivitiesData)) {
  if (sMap[id]) {
    finalData.push({ slug: 'social/' + id, layoutType: sMap[id], data });
  } else {
    console.log('Missing mapping for social:', id);
  }
}

fs.writeFileSync('backend/scripts/extracted_pages.json', JSON.stringify(finalData, null, 2));
console.log('Extracted ' + finalData.length + ' pages');
