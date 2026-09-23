const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'web/src/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx'));

const replacements = [
  // 1. Border Radius
  { pattern: /rounded-\[3rem\]/g, replacement: 'rounded-2xl' },
  { pattern: /rounded-\[2rem\]/g, replacement: 'rounded-2xl' },
  { pattern: /rounded-3xl/g, replacement: 'rounded-2xl' },

  // 2. Vertical Section Spacing
  { pattern: /py-24/g, replacement: 'py-10' },
  { pattern: /py-20/g, replacement: 'py-10' },
  { pattern: /mb-32/g, replacement: 'mb-12' },
  { pattern: /mb-24/g, replacement: 'mb-10' },
  { pattern: /mt-24/g, replacement: 'mt-10' },
  { pattern: /mt-20/g, replacement: 'mt-10' },

  // 3. Inner Container Padding
  { pattern: /lg:p-24/g, replacement: 'lg:p-12' },
  { pattern: /p-16/g, replacement: 'p-8' },
  { pattern: /p-12/g, replacement: 'p-8' },
  { pattern: /p-8/g, replacement: 'p-6' },
  
  // 4. Grid and Flex Gaps
  { pattern: /lg:gap-20/g, replacement: 'lg:gap-10' },
  { pattern: /gap-16/g, replacement: 'gap-8' },
  { pattern: /gap-12/g, replacement: 'gap-8' },

  // 5. Hero Section Heights
  { pattern: /h-\[80vh\]/g, replacement: 'h-[60vh]' },
  { pattern: /h-\[75vh\]/g, replacement: 'h-[60vh]' },
  { pattern: /h-\[70vh\]/g, replacement: 'h-[50vh]' },
  { pattern: /min-h-\[600px\]/g, replacement: 'min-h-[400px]' },
  { pattern: /min-h-\[500px\]/g, replacement: 'min-h-[400px]' },

  // 6. Icon Sizes
  { pattern: /w-20 h-20/g, replacement: 'w-12 h-12' },
  { pattern: /w-16 h-16/g, replacement: 'w-10 h-10' },
  { pattern: /w-14 h-14/g, replacement: 'w-10 h-10' },
  { pattern: /w-12 h-12/g, replacement: 'w-8 h-8' },
  { pattern: /w-10 h-10/g, replacement: 'w-6 h-6' },

  // 7. Fonts (Strict Ladder)
  // We use lookbehind to avoid matching something like text-8xl replacing the "8xl" part of a larger word, though Tailwind uses exact matches.
  // Note: Since we are running sequentially, we must go from smallest to largest to avoid double-replacing!
  // Wait, if we replace text-xl -> text-base, then text-2xl -> text-xl, we would double replace!
  // To avoid this, we replace everything with a temporary token!
  { pattern: /(?<!-)text-xl/g, replacement: 'TMP_BASE' },
  { pattern: /(?<!-)text-2xl/g, replacement: 'TMP_LG' },
  { pattern: /(?<!-)text-3xl/g, replacement: 'TMP_XL' },
  { pattern: /(?<!-)text-4xl/g, replacement: 'TMP_2XL' },
  { pattern: /(?<!-)text-5xl/g, replacement: 'TMP_3XL' },
  { pattern: /(?<!-)text-6xl/g, replacement: 'TMP_4XL' },
  { pattern: /(?<!-)text-7xl/g, replacement: 'TMP_5XL' },
  { pattern: /(?<!-)text-8xl/g, replacement: 'TMP_6XL' },

  // Now replace the tokens
  { pattern: /TMP_BASE/g, replacement: 'text-base' },
  { pattern: /TMP_LG/g, replacement: 'text-lg' },
  { pattern: /TMP_XL/g, replacement: 'text-xl' },
  { pattern: /TMP_2XL/g, replacement: 'text-2xl' },
  { pattern: /TMP_3XL/g, replacement: 'text-3xl' },
  { pattern: /TMP_4XL/g, replacement: 'text-4xl' },
  { pattern: /TMP_5XL/g, replacement: 'text-5xl' },
  { pattern: /TMP_6XL/g, replacement: 'text-6xl' },

  // Cleanup redundant responsive classes if they occur
  // Example: text-base md:text-base -> text-base
  { pattern: /text-base md:text-base/g, replacement: 'text-base' },
  { pattern: /text-lg md:text-lg/g, replacement: 'text-lg' },
  { pattern: /text-xl md:text-xl/g, replacement: 'text-xl' },
  { pattern: /text-2xl md:text-2xl/g, replacement: 'text-2xl' },
  { pattern: /text-3xl md:text-3xl/g, replacement: 'text-3xl' },
  { pattern: /text-4xl md:text-4xl/g, replacement: 'text-4xl' },
  { pattern: /text-5xl md:text-5xl/g, replacement: 'text-5xl' },
  
  { pattern: /md:text-base lg:text-base/g, replacement: 'md:text-base' },
  { pattern: /md:text-lg lg:text-lg/g, replacement: 'md:text-lg' },
  { pattern: /md:text-xl lg:text-xl/g, replacement: 'md:text-xl' },
  { pattern: /md:text-2xl lg:text-2xl/g, replacement: 'md:text-2xl' },
  { pattern: /md:text-3xl lg:text-3xl/g, replacement: 'md:text-3xl' },
  { pattern: /md:text-4xl lg:text-4xl/g, replacement: 'md:text-4xl' },
  { pattern: /md:text-5xl lg:text-5xl/g, replacement: 'md:text-5xl' },
];

let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  for (const { pattern, replacement } of replacements) {
    newContent = newContent.replace(pattern, replacement);
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    totalChanges++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Successfully refactored layouts, fonts, and icons in ${totalChanges} templates.`);
