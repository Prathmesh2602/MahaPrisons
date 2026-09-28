const fs = require('fs');
const path = require('path');
const normalizerPath = 'src/utils/templateDataNormalizer.js';
const normalizer = fs.readFileSync(normalizerPath, 'utf8');

const templatesDir = 'src/templates';
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
  const templateName = file.replace('.jsx', '');
  
  // Find case block in normalizer
  const caseRegex = new RegExp(`case '${templateName}':([\\s\\S]*?)(?:case |default:)`);
  const match = normalizer.match(caseRegex);
  
  if (match) {
    const normalizerBlock = match[1];
    const exportedKeys = Array.from(normalizerBlock.matchAll(/(\w+):\s*get(Array|Obj)/g)).map(m => m[1]);
    
    // Find expected keys in JSX
    const expectedKeys = new Set();
    const mapRegex = /data\.(\w+)\s*(?:\|\|\s*\[\])?\)\.map/g;
    let mapMatch;
    while ((mapMatch = mapRegex.exec(content)) !== null) {
      expectedKeys.add(mapMatch[1]);
    }
    
    const missing = [...expectedKeys].filter(k => !exportedKeys.includes(k));
    
    if (missing.length > 0) {
      console.log(templateName + ' missing in normalizer: ' + missing.join(', '));
    }
  }
}
