const fs = require('fs');
let content = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');

const regex = /<div\s+onClick=\{\(\) => setActiveTab\('WALLPAPER'\)\}[\s\S]*?<Monitor size=\{32\} \/>\s*<\/div>\s*<h3[\s\S]*?<\/div>/;
const match = content.match(regex);
if (match) {
  const loginCard = match[0].replace(/'WALLPAPER'/g, "'LOGIN'").replace('bg-amber-50 text-amber-600', 'bg-orange-50 text-orange-600').replace('hover:border-amber-300', 'hover:border-orange-300').replace('Live Wallpaper', 'Login Page').replace('Manage slideshow images and animation speed.', 'Change the CMS login background.');
  
  content = content.replace(match[0], match[0] + '\n\n' + loginCard);
  content = content.replace('grid-cols-1 md:grid-cols-4', 'grid-cols-1 md:grid-cols-5');
  fs.writeFileSync('src/pages/SettingsEditor.tsx', content);
  console.log('Replaced via regex');
} else {
  console.log('Regex did not match');
}
