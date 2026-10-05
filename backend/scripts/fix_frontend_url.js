const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  // Replace direct string usage like 'http://localhost:5000/api/...'
  // We need to carefully handle quotes.
  
  // 1. fetch('http://localhost:5000...') -> fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}...`)
  content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}$1`");
  
  // 2. Double quotes: "http://localhost:5000..." -> `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}...`
  content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}$1`");

  // 3. Template literals: `http://localhost:5000...` -> `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}...`
  content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}$1`");
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file) && !fullPath.includes('data')) {
      // Exclude the static 'data' directory files since they are just mocks
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, '../../web/src'));
