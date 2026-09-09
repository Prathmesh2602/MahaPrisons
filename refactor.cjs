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

        if (content.includes('react-router-dom')) {
            // MegaMenu and others
            if (content.includes("import { Link, useLocation } from 'react-router-dom';")) {
                content = content.replace("import { Link, useLocation } from 'react-router-dom';", "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
                content = content.replace(/useLocation\(\)/g, "usePathname()");
                modified = true;
            }
            if (content.includes("import { useLocation } from 'react-router-dom';")) {
                content = content.replace("import { useLocation } from 'react-router-dom';", "import { usePathname as useLocation } from 'next/navigation';");
                modified = true;
            }
            if (content.includes("import { Link } from 'react-router-dom';")) {
                content = content.replace("import { Link } from 'react-router-dom';", "import Link from 'next/link';");
                modified = true;
            }
            if (content.includes("import { Navigate } from 'react-router-dom';")) {
                content = content.replace("import { Navigate } from 'react-router-dom';", "import { redirect } from 'next/navigation';");
                content = content.replace(/return <Navigate to="\/([^"]*)" replace \/>;/g, 'redirect("/$1");');
                content = content.replace(/return <Navigate to="\/([^"]*)" \/>;/g, 'redirect("/$1");');
                modified = true;
            }
        }

        // Replace <Link to="..."> with <Link href="...">
        if (content.includes('<Link to=')) {
            content = content.replace(/<Link\s+to=/g, '<Link href=');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated: ${file}`);
        }
    }
});
