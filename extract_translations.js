const fs = require('fs');
const lines = fs.readFileSync('web/src/data/translations.js', 'utf8').split('\n');
const terms = ['Prisoner Interview', 'Establishment', 'Judicial Department', 'Ration', 'Interview', 'Hospital', 'Factory', 'Industry', 'Internal Security', 'Construction'];
terms.forEach(term => {
  const matchLine = lines.find(l => l.includes(`en: "${term}"`) || l.includes(`en: '${term}'`));
  if (matchLine) {
    const prevLine = lines[lines.indexOf(matchLine)-1];
    console.log(`${term} -> ${prevLine.trim()}`);
  } else {
    console.log(`${term} -> NOT FOUND`);
  }
});
