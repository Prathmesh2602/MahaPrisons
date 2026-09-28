const fs = require('fs');
const path = require('path');
const dir = 'src/templates';
const files = fs.readdirSync(dir);
files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');
    let modified = false;
    
    // Replace {stat.value} with {typeof stat.value === 'object' ? getTranslation(stat.value) : stat.value}
    if (content.includes('{stat.value}')) {
      content = content.replace(/\{stat\.value\}/g, '{typeof stat.value === "object" ? getTranslation(stat.value) : stat.value}');
      modified = true;
    }
    
    // Check if there are other un-translated object renders.
    // For example, {item.year} in HeroFeaturesTimelineLayout.jsx
    if (content.includes('{item.year}')) {
      content = content.replace(/\{item\.year\}/g, '{typeof item.year === "object" ? getTranslation(item.year) : item.year}');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(fp, content);
      console.log('Updated ' + file);
    }
  }
});
