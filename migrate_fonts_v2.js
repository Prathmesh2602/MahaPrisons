const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'web/src/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx'));

// Only target excessively large fonts to preserve existing hierarchy
const replacements = [
  { pattern: /(?<!-)text-8xl/g, replacement: 'text-6xl' },
  { pattern: /(?<!-)text-7xl/g, replacement: 'text-5xl' },
  { pattern: /(?<!-)text-6xl/g, replacement: 'text-5xl' },
];

let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  for (const { pattern, replacement } of replacements) {
    newContent = newContent.replace(pattern, replacement);
  }

  // Cleanup redundant responsive classes if they occur
  newContent = newContent.replace(/md:text-5xl lg:text-5xl/g, 'md:text-5xl');
  newContent = newContent.replace(/text-5xl md:text-5xl/g, 'text-5xl');
  newContent = newContent.replace(/md:text-6xl lg:text-6xl/g, 'md:text-6xl');
  newContent = newContent.replace(/text-6xl md:text-6xl/g, 'text-6xl');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    totalChanges++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Successfully updated excessively large fonts in ${totalChanges} templates.`);
