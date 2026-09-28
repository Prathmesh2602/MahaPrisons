const fs = require('fs');
let content = fs.readFileSync('src/pages/Login.tsx', 'utf8');

const leftSideRegex = /({\/\* Left Form Side \*\/}[\s\S]*?)(?={\/\* Right Image Side \*\/})/m;
const rightSideRegex = /({\/\* Right Image Side \*\/}[\s\S]*?)(?=    <\/div>\s*\);\s*};)/m;

const leftMatch = content.match(leftSideRegex);
const rightMatch = content.match(rightSideRegex);

if (leftMatch && rightMatch) {
  let newContent = content.replace(leftMatch[0], '').replace(rightMatch[0], rightMatch[0] + '\n      ' + leftMatch[0].replace('Left Form Side', 'Right Form Side'));
  
  // Also fix the shadow direction
  newContent = newContent.replace('shadow-[10px_0_30px_rgba(0,0,0,0.05)]', 'shadow-[-20px_0_40px_rgba(0,0,0,0.1)]').replace('Right Image Side', 'Left Image Side');
  
  // Fix the decorative elements to originate from the right instead of the left
  newContent = newContent.replace('absolute -left-32 -bottom-32 w-64 h-64', 'absolute -right-32 -bottom-32 w-64 h-64');
  
  // Change image overlay gradient to face the other way
  newContent = newContent.replace('bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent', 'bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent');
  
  // Move branding to the bottom left since image is now on the left
  newContent = newContent.replace('absolute bottom-12 left-12 right-12 z-10', 'absolute bottom-12 left-12 right-12 z-10 text-left');

  fs.writeFileSync('src/pages/Login.tsx', newContent);
  console.log('Swapped successfully');
} else {
  console.log('Failed to match');
}
