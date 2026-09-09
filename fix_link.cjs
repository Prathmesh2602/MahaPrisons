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

        // Replace `<Link ... to=` with `<Link ... href=`
        // Since Link might have attributes and newlines, we can use a more robust regex or just replace `to=` inside Link context.
        // Actually, since Next.js Link uses href, we can just replace `to=` with `href=` if it's right after `<Link` and spaces/newlines/attributes.
        
        let newContent = content.replace(/<Link([\s\S]*?)\bto=/g, '<Link$1href=');
        if (newContent !== content) {
            content = newContent;
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated (Link href): ${file}`);
        }
    }
});
