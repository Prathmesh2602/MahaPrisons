const fs = require('fs');
const path = require('path');

const editorsDir = path.join(__dirname, 'src/components/editors');
const templatesDir = path.join(__dirname, '../web/src/templates');

// We only process the 17 specific files. We can just loop over all *Editor.tsx except the layout ones.
const skipFiles = ['EditorLayout.tsx', 'TemplateEditorRenderer.tsx', 'PageEditor.tsx', 'HeroFeaturesTimelineLayoutEditor.tsx'];

const files = fs.readdirSync(editorsDir).filter(f => f.endsWith('Editor.tsx') && !skipFiles.includes(f));

for (const file of files) {
  let content = fs.readFileSync(path.join(editorsDir, file), 'utf8');

  // Skip if already refactored
  if (content.includes('if (activeSection === \'general\'') || content.includes('if (activeSection === \'template\'')) {
    console.log('Skipping already refactored editor:', file);
    continue;
  }

  // 1. Remove useState and update activeSection declaration
  content = content.replace(
    /const \[activeSection, setActiveSection\] = useState<string \| null>\(expandedSection \|\| 'template'\);/,
    "const activeSection = (expandedSection || 'template').replace('template_', '');"
  );
  
  // 2. We will just use string splitting based on `<EditorBlockHeader` to find sections
  const exportIdx = content.indexOf('export const ');
  if (exportIdx === -1) {
    console.log('Skipping missing export:', file);
    continue;
  }
  const returnIdx = content.indexOf('  return (\n', exportIdx);
  if (returnIdx === -1) continue;

  let beforeReturn = content.substring(0, returnIdx);
  let afterReturn = content.substring(returnIdx);

  let newReturn = ``;

  // General block
  const gsMatch = afterReturn.match(/<GeneralSettingsBlock[\s\S]*?\/>/);
  if (gsMatch) {
    let gsContent = gsMatch[0];
    // Remove isExpanded and onToggle from GeneralSettingsBlock
    gsContent = gsContent.replace(/\s*isExpanded=\{activeSection === 'template'\}/, '');
    gsContent = gsContent.replace(/\s*onToggle=\{[^\}]+\}/, '');

    newReturn += `  if (activeSection === 'template' || activeSection === 'general') {\n    return (\n      <div className="pb-10">\n        ${gsContent}\n      </div>\n    );\n  }\n\n`;
  }

  // Find all sections. They look like:
  // <EditorBlockHeader ... isExpanded={activeSection?.startsWith('template_XYZ')} ... />
  // ... {activeSection?.startsWith('template_XYZ') && ( <div...> ... </div> )}

  // We can find all occurrences of `isExpanded={activeSection`
  let regex = /isExpanded=\{activeSection\?\.startsWith\('template_(\w+)'\)\}/g;
  let match;
  let sections = [];
  while ((match = regex.exec(afterReturn)) !== null) {
    if (!sections.includes(match[1])) {
      sections.push(match[1]);
    }
  }
  
  // Also check for `isExpanded={activeSection === 'template_contactInfo'}`
  let exactRegex = /isExpanded=\{activeSection === 'template_(\w+)'\}/g;
  while ((match = exactRegex.exec(afterReturn)) !== null) {
    if (!sections.includes(match[1])) {
      sections.push(match[1]);
    }
  }

  for (const section of sections) {
    // Extract the content of this section!
    // It's everything inside {activeSection... && ( ... )}
    // We can use a regex or string manipulation
    // Let's find the start: `{activeSection?.startsWith('template_${section}') && (` or `{activeSection === 'template_${section}' && (`
    let startStr1 = `{activeSection?.startsWith('template_${section}') && (`;
    let startStr2 = `{activeSection === 'template_${section}' && (`;
    let startIdx = afterReturn.indexOf(startStr1);
    if (startIdx === -1) startIdx = afterReturn.indexOf(startStr2);
    
    if (startIdx !== -1) {
      let startOffset = startIdx + (afterReturn.substring(startIdx, startIdx + startStr1.length) === startStr1 ? startStr1.length : startStr2.length);
      
      // Now find the matching closing parenthesis `)}`
      // We need to count brackets/parentheses to find the exact closing `)}`
      let count = 1;
      let endIdx = -1;
      for (let i = startOffset; i < afterReturn.length; i++) {
        if (afterReturn[i] === '(') count++;
        else if (afterReturn[i] === ')') {
          count--;
          if (count === 0 && afterReturn[i+1] === '}') {
            endIdx = i;
            break;
          }
        }
      }
      
      if (endIdx !== -1) {
        let sectionContent = afterReturn.substring(startOffset, endIdx).trim();
        // Remove `setActiveSection` calls inside the section!
        // `onToggle={() => setActiveSection(...)}` -> `onToggle={() => {}}`
        sectionContent = sectionContent.replace(/onToggle=\{.*?setActiveSection.*?\}/g, 'onToggle={() => {}}');
        
        newReturn += `  if (activeSection === '${section}') {\n    return (\n      <div className="pb-10 space-y-4">\n        ${sectionContent}\n      </div>\n    );\n  }\n\n`;
      }
    }
  }

  newReturn += `  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;\n};\n`;

  const newContent = beforeReturn + newReturn;
  fs.writeFileSync(path.join(editorsDir, file), newContent);
  console.log('Refactored Editor:', file);
}

// Now templates!
// In templates, we need to add `data-block-type="template_XYZ"` to the main wrappers of the sections.
// Because the template DOM structure varies wildly, doing this automatically via script is very risky.
// However, since they were generated uniformly, maybe we can find the comments like `{/* Stats Section */}` 
// and insert `data-block-type="template_stats"` ?

const tplFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx') && !skipFiles.includes(f));
for (const file of tplFiles) {
  let content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
  
  if (content.includes('data-block-type="template_')) {
    console.log('Skipping template already has block types:', file);
    continue;
  }

  // Find `<div data-block-type="template"` and change to `<div data-block-type="template_general"` on the hero element.
  // Actually, wait, the root wrapper has data-block-type="template" or "page_template_data".
  // The hero section is usually the first major div inside it.
  
  // We can just print the files we need to modify manually.
}
