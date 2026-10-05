const fs = require('fs');
const path = require('path');

function replaceInFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Replace literal string
  content = content.replace(/process\.env\.NEXT_PUBLIC_API_URL\s*\|\|\s*'http:\/\/localhost:5000'/g, 'API_URL');
  content = content.replace(/process\.env\.NEXT_PUBLIC_API_URL\s*\|\|\s*"http:\/\/localhost:5000"/g, 'API_URL');

  // Add import if API_URL is used and not imported
  if (content.includes('API_URL') && !content.includes("import { API_URL }")) {
    const depth = filepath.split(path.sep).length - path.resolve(__dirname, '../../web/src').split(path.sep).length;
    const prefix = depth === 0 ? './' : '../'.repeat(depth);
    
    // Find last import statement to insert after
    const imports = content.match(/^import.*$/gm);
    if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        content = content.replace(lastImport, `${lastImport}\nimport { API_URL } from '${prefix}utils/apiConfig';`);
    } else {
        content = `import { API_URL } from '${prefix}utils/apiConfig';\n${content}`;
    }
  }

  // Same for getImageUrl
  if (content.includes('getImageUrl') && !content.includes('const getImageUrl') && !content.includes("import { getImageUrl }")) {
    const depth = filepath.split(path.sep).length - path.resolve(__dirname, '../../web/src').split(path.sep).length;
    const prefix = depth === 0 ? './' : '../'.repeat(depth);
    const imports = content.match(/^import.*$/gm);
    if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        content = content.replace(lastImport, `${lastImport}\nimport { getImageUrl } from '${prefix}utils/imageUrlResolver';`);
    } else {
        content = `import { getImageUrl } from '${prefix}utils/imageUrlResolver';\n${content}`;
    }
  }

  // Remove local definitions of getImageUrl
  content = content.replace(/const getImageUrl = \(url\) => {[\s\S]*?};\n/g, '');

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log('Updated:', filepath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath);
    } else if (filepath.endsWith('.jsx') || filepath.endsWith('.js') || filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      replaceInFile(filepath);
    }
  }
}

walk(path.resolve(__dirname, '../../web/src'));
