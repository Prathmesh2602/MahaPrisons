const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'web/src/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Pattern 1: data.labels?.xxx ? getTranslation(data.labels.xxx) : (language === 'mr' ? '...' : '...')
  // We'll replace data.labels with data.sectionHeaders
  content = content.replace(
    /data\.labels\?\.\s*([a-zA-Z0-9_]+)\s*\?\s*getTranslation\(\s*data\.labels\.([a-zA-Z0-9_]+)\s*\)/g,
    "data.sectionHeaders?.$1?.title ? getTranslation(data.sectionHeaders.$1.title)"
  );

  // Pattern 2: We need to find places where language === 'mr' is used, and find the nearest data-block-type="template_XXX" ABOVE it
  const lines = content.split('\n');
  let currentBlockType = null;

  for (let i = 0; i < lines.length; i++) {
    const blockMatch = lines[i].match(/data-block-type="template_([^"]+)"/);
    if (blockMatch) {
      currentBlockType = blockMatch[1];
    }

    // If we find language === 'mr' ? 'Marathi' : 'English'
    // And it doesn't already have data.sectionHeaders
    if (currentBlockType && currentBlockType !== 'hero' && lines[i].includes("language === 'mr'") && !lines[i].includes("data.sectionHeaders") && !lines[i].includes("data.labels")) {
      
      // Match {language === 'mr' ? 'A' : 'B'}
      // We will replace it with {data.sectionHeaders?.BLOCK?.title ? getTranslation(data.sectionHeaders.BLOCK.title) : (language === 'mr' ? 'A' : 'B')}
      lines[i] = lines[i].replace(
        /\{language\s*===\s*'mr'\s*\?\s*'([^']+)'\s*:\s*'([^']+)'\}/g,
        `{data.sectionHeaders?.${currentBlockType}?.title ? getTranslation(data.sectionHeaders.${currentBlockType}.title) : (language === 'mr' ? '$1' : '$2')}`
      );
    }
  }

  content = lines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});

console.log(`Finished refactoring. Updated ${updatedCount} files.`);
