const fs = require('fs');
let content = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');

// 1. Add Login card to Dashboard
const wallpaperCardRegex = /<div\s*onClick=\{\(\) => setActiveTab\('WALLPAPER'\)\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const wallpaperCardMatch = content.match(wallpaperCardRegex);
if (wallpaperCardMatch) {
  // We matched up to a closing div. Let's make sure we only duplicate the inner card correctly.
  // Actually, simpler to just replace manually:
}

// Safer approach: Find the closing div of the WALLPAPER card and insert the LOGIN card.
const wallpaperCard = `            <div
              onClick={() => setActiveTab('WALLPAPER')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Image size={24} />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Wallpaper</h3>
              <p className="text-xs text-slate-500">Manage site background images</p>
            </div>`;
const loginCard = `            <div
              onClick={() => setActiveTab('LOGIN')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-orange-300 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Image size={24} />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Login Page</h3>
              <p className="text-xs text-slate-500">Change CMS login background</p>
            </div>`;
content = content.replace(wallpaperCard, wallpaperCard + '\n\n' + loginCard);

// 2. Add Login button to top Tab bar
const wallpaperTab = `            <button
              onClick={() => setActiveTab('WALLPAPER')}
              className={\`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 \${activeTab === 'WALLPAPER' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}\`}
            >
              Wallpaper
            </button>`;
const loginTab = `            <button
              onClick={() => setActiveTab('LOGIN')}
              className={\`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 \${activeTab === 'LOGIN' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}\`}
            >
              Login Page
            </button>`;
content = content.replace(wallpaperTab, wallpaperTab + '\n' + loginTab);

fs.writeFileSync('src/pages/SettingsEditor.tsx', content);
