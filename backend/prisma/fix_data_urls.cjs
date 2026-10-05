const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath);
    } else if (filepath.endsWith('.js') || filepath.endsWith('.jsx')) {
      let content = fs.readFileSync(filepath, 'utf8');
      if (content.includes('http://localhost:5000')) {
        content = content.replace(/http:\/\/localhost:5000/g, '');
        fs.writeFileSync(filepath, content);
        console.log('Fixed:', filepath);
      }
    }
  }
}

walk(path.resolve(__dirname, '../../web/src/data'));
