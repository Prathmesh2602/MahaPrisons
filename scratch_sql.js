const fs = require('fs');
const content = fs.readFileSync('cms_build_supabase.sql', 'utf8');
const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('COPY public."MenuItem"'));
console.log(lines.slice(startIndex, startIndex + 20).join('\n'));
