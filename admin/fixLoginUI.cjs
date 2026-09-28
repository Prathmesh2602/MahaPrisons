const fs = require('fs');
let content = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');

const iframeSrcRegex = /src="http:\/\/localhost:3000\/preview"/;
content = content.replace(iframeSrcRegex, "src={activeTab === 'LOGIN' ? '/login' : 'http://localhost:3000/preview'}");

const loginTabBlockRegex = /\{\s*activeTab === 'LOGIN' && \(\s*<div className="space-y-6">[\s\S]*?<\/div>\s*\)\}/;
const loginTabBlockMatch = content.match(loginTabBlockRegex);

if (loginTabBlockMatch) {
  // We remove it from the sticky header region
  content = content.replace(loginTabBlockMatch[0], '');
  
  // Insert the EditorFormHeader into the sticky header region (just before the WALLPAPER EditorFormHeader)
  const wallpaperHeaderRegex = /\{activeTab === 'WALLPAPER' && \(\s*<EditorFormHeader[\s\S]*?\)\}/;
  const loginHeader = `{activeTab === 'LOGIN' && (
              <EditorFormHeader
                className="border-none pb-3"
                title="Login Page Background"
                onUndo={handleUndo}
                canUndo={historyIndex > 0}
                onRedo={handleRedo}
                canRedo={historyIndex < history.length - 1}
                onReset={handleReset}
                onSave={() => handleSave('login_config', loginConfig)}
                isSaveDisabled={JSON.stringify(loginConfig) === JSON.stringify(savedLoginConfig)}
                saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
                saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
              />
            )}`;
  content = content.replace(wallpaperHeaderRegex, loginHeader + '\n            $&');
  
  // Clean up the extracted block (remove the redundant Save button at the bottom since EditorFormHeader handles it)
  let cleanLoginBlock = loginTabBlockMatch[0];
  const redundantSaveButtonRegex = /<div className="pt-6 border-t border-slate-200 flex justify-end gap-3">[\s\S]*?<\/div>/;
  cleanLoginBlock = cleanLoginBlock.replace(redundantSaveButtonRegex, '');
  
  // Insert the clean block into the main content region
  const mainWallpaperContentRegex = /\{activeTab === 'WALLPAPER' && \(\s*<div className="space-y-2">[\s\S]*?<\/div>\s*\)\}/;
  content = content.replace(mainWallpaperContentRegex, cleanLoginBlock + '\n\n          $&');
  
  fs.writeFileSync('src/pages/SettingsEditor.tsx', content);
  console.log('Fixed UI layout successfully!');
} else {
  console.log('Failed to match login tab block');
}
