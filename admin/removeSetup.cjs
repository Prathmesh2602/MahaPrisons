const fs = require('fs');
let content = fs.readFileSync('src/pages/Login.tsx', 'utf8');

const handleSetupStart = content.indexOf('const handleSetup = async () => {');
const handleSetupEnd = content.indexOf('};', handleSetupStart) + 2;
content = content.slice(0, handleSetupStart) + content.slice(handleSetupEnd);

const buttonContainerStart = content.indexOf('<div className="mt-8 pt-6 border-t border-slate-100 text-center">');
const buttonContainerEnd = content.indexOf('</button>', buttonContainerStart) + '</button>'.length + '\n          </div>'.length;
content = content.slice(0, buttonContainerStart) + content.slice(buttonContainerEnd);

fs.writeFileSync('src/pages/Login.tsx', content);
