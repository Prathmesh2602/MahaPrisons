const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../web/src');
const oldPagesDir = path.join(srcDir, 'pages');
const newViewsDir = path.join(srcDir, 'views');

if (fs.existsSync(oldPagesDir)) {
  fs.renameSync(oldPagesDir, newViewsDir);
  console.log('Renamed src/pages to src/views');
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  // Replace imports like: from '../pages/...' or from '../../pages/...' or from './pages/...'
  content = content.replace(/from\s+['"]([^'"]*)\/pages\/([^'"]*)['"]/g, "from '$1/views/$2'");
  
  // Specifically for dynamic imports like import('../pages/...')
  content = content.replace(/import\(['"]([^'"]*)\/pages\/([^'"]*)['"]\)/g, "import('$1/views/$2')");
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated imports in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
