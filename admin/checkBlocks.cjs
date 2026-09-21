const fs = require('fs');
const path = require('path');
const dir = 'd:/01 Coding/MahaPrisons/web/src/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const matches = [...content.matchAll(/data-block-type=\"template_([^\"]+)\"/g)];
  if (matches.length > 0) {
    const blocks = matches.map(m => m[1]);
    console.log(file.replace('.jsx', '') + ' -> ' + blocks.join(', '));
  }
}
