const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'web', 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(directoryPath);

files.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.ts')) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Add "use client" if it contains hooks and doesn't have it already
        if (!content.includes('"use client"') && !content.includes("'use client'")) {
            if (content.includes('useState') || 
                content.includes('useEffect') || 
                content.includes('useLayoutEffect') ||
                content.includes('usePathname') || 
                content.includes('useAccessibility') || 
                content.includes('useScroll') || 
                content.includes('useTransform') || 
                content.includes('useRef') ||
                content.includes('framer-motion')) {
                content = '"use client";\n' + content;
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated (use client): ${file}`);
        }
    }
});
