const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'web/src/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx'));

const replacements = [
  { pattern: /(?<!-)text-8xl/g, replacement: 'text-5xl' },
  { pattern: /(?<!-)text-7xl/g, replacement: 'text-5xl' },
  { pattern: /(?<!-)text-6xl/g, replacement: 'text-4xl' },
  { pattern: /(?<!-)text-5xl/g, replacement: 'text-3xl' },
  { pattern: /(?<!-)text-4xl/g, replacement: 'text-2xl' },
  { pattern: /(?<!-)text-3xl/g, replacement: 'text-2xl' }
];

let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  for (const { pattern, replacement } of replacements) {
    newContent = newContent.replace(pattern, replacement);
  }

  // Cleanup potential redundant classes (e.g. text-2xl md:text-2xl -> text-2xl)
  newContent = newContent.replace(/text-2xl md:text-2xl/g, 'text-2xl');
  newContent = newContent.replace(/text-3xl md:text-3xl/g, 'text-3xl');
  newContent = newContent.replace(/text-4xl md:text-4xl/g, 'text-4xl');
  newContent = newContent.replace(/text-5xl md:text-5xl/g, 'text-5xl');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    totalChanges++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Successfully updated fonts in ${totalChanges} templates.`);
