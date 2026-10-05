const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importRegex = /import\s+(?:[^"']+)\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const dir = path.dirname(filePath);
      const targetPathNoExt = path.join(dir, importPath);
      
      // Check extensions
      let resolved = false;
      const exts = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx', '/index.ts', '/index.tsx', '.css'];
      for (const ext of exts) {
        const testPath = targetPathNoExt + ext;
        if (fs.existsSync(testPath)) {
          // Now check case sensitivity by reading the parent directory
          const targetDir = path.dirname(testPath);
          const targetFile = path.basename(testPath);
          if (fs.existsSync(targetDir)) {
            const files = fs.readdirSync(targetDir);
            if (!files.includes(targetFile)) {
              console.log(`CASE MISMATCH in ${filePath}:\n  Imported: ${importPath}\n  Expected file: ${targetFile}\n  Found in dir: ${files.find(f => f.toLowerCase() === targetFile.toLowerCase())}`);
            }
          }
          resolved = true;
          break;
        }
      }
      if (!resolved) {
        console.log(`NOT FOUND in ${filePath}:\n  Imported: ${importPath}`);
      }
    }
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      checkFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, '../../web/src'));
