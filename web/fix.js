const fs = require('fs');
const path = 'd:/01 Coding/MahaPrisons/web/src/utils/templatePlaceholders.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/value:\s*\{\s*en:\s*'1,234',\s*mr:\s*'.*?'\s*\}/g, "value: '1,234'");
content = content.replace(/value:\s*\{\s*en:\s*'85%',\s*mr:\s*'.*?'\s*\}/g, "value: '85%'");
content = content.replace(/value:\s*\{\s*en:\s*'42',\s*mr:\s*'.*?'\s*\}/g, "value: '42'");
fs.writeFileSync(path, content);
