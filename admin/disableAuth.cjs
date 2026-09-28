const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace(/<RequireAuth>/g, '<>');
c = c.replace(/<\/RequireAuth>/g, '</>');
fs.writeFileSync('src/App.tsx', c);
console.log('Disabled RequireAuth');
