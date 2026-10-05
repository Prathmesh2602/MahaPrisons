const fs = require('fs');
const path = require('path');

function replaceInFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Next.js uses @/ alias usually, but let's just fix the relative paths.
  content = content.replace(/'\.\.\/\.\.\/\.\.\/utils\/apiConfig'/g, "'../../utils/apiConfig'");
  content = content.replace(/'\.\.\/\.\.\/utils\/apiConfig'/g, "'../utils/apiConfig'");
  content = content.replace(/'\.\.\/utils\/apiConfig'/g, "'./utils/apiConfig'"); // Wait, this might be wrong for src/components

  // Let's use absolute alias if possible, but Next.js tsconfig might not have it.
  // Instead, just replace all utils imports with the correct depth based on dirname
  const dirDepth = path.dirname(filepath).split(path.sep).length - path.resolve(__dirname, '../../web/src').split(path.sep).length;
  const prefix = dirDepth === 0 ? './' : '../'.repeat(dirDepth);
  
  content = content.replace(/import \{ API_URL \} from '.*utils\/apiConfig';/g, `import { API_URL } from '${prefix}utils/apiConfig';`);
  content = content.replace(/import \{ getImageUrl \} from '.*utils\/imageUrlResolver';/g, `import { getImageUrl } from '${prefix}utils/imageUrlResolver';`);

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log('Fixed import in:', filepath);
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
