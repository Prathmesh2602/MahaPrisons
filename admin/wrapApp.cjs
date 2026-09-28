const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = "import { ErrorBoundary } from './components/ErrorBoundary';\n" + c;
c = c.replace(/<AuthProvider>/g, '<ErrorBoundary><AuthProvider>');
c = c.replace(/<\/AuthProvider>/g, '</AuthProvider></ErrorBoundary>');
fs.writeFileSync('src/App.tsx', c);
console.log('Wrapped App.tsx with ErrorBoundary');
