const fs = require('fs');
let content = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');

// 1. Add fetchConfig('login_config')
content = content.replace("fetchConfig('wallpaper_config');", "fetchConfig('wallpaper_config');\n    fetchConfig('login_config');");
content = content.replace("fetchConfig('wallpaper_config');", "fetchConfig('wallpaper_config');\n    fetchConfig('login_config');"); // Second match for handleReset

// 2. Add if (key === 'login_config') block in fetchConfig
const fetchWallpaperBlock = `} else if (key === 'wallpaper_config') {
          setWallpaperConfig((prev: any) => {
            const newConf = { ...prev, ...res.data };
            setSavedWallpaperConfig(newConf);
            updateHistoryState(headerConfig, footerConfig, newConf);
            return newConf;
          });
        }`;
const fetchLoginBlock = `} else if (key === 'login_config') {
          setLoginConfig((prev: any) => {
            const newConf = { ...prev, ...res.data };
            setSavedLoginConfig(newConf);
            // Ignore history state for now to avoid complexity or adapt updateHistoryState
            return newConf;
          });
        }`;
content = content.replace(fetchWallpaperBlock, fetchWallpaperBlock + ' ' + fetchLoginBlock);

const defaultWallpaperCatch = `} else if (key === 'wallpaper_config') {
        setWallpaperConfig(DEFAULT_WALLPAPER_CONFIG);
        setSavedWallpaperConfig(DEFAULT_WALLPAPER_CONFIG);
        updateHistoryState(headerConfig, footerConfig, DEFAULT_WALLPAPER_CONFIG);
      }`;
const defaultLoginCatch = `} else if (key === 'login_config') {
        setLoginConfig(DEFAULT_LOGIN_CONFIG);
        setSavedLoginConfig(DEFAULT_LOGIN_CONFIG);
      }`;
content = content.replace(defaultWallpaperCatch, defaultWallpaperCatch + ' ' + defaultLoginCatch);
content = content.replace(defaultWallpaperCatch, defaultWallpaperCatch + ' ' + defaultLoginCatch); // There are two catches

// 3. Update handleSave
const savedWallpaperBlock = `} else if (key === 'wallpaper_config') {
        setSavedWallpaperConfig(payload);
      }`;
const savedLoginBlock = `} else if (key === 'login_config') {
        setSavedLoginConfig(payload);
      }`;
content = content.replace(savedWallpaperBlock, savedWallpaperBlock + ' ' + savedLoginBlock);

// 4. Update Tab Rendering
const loginTabButton = `<button
            onClick={() => setActiveTab('LOGIN')}
            className={\`flex-1 py-3 px-4 text-center text-sm font-semibold transition-colors \${activeTab === 'LOGIN' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}\`}
          >
            Login Page
          </button>`;
content = content.replace("Wallpaper\n          </button>", "Wallpaper\n          </button>\n          " + loginTabButton);

// 5. Update Tab Content
const loginTabContent = `{activeTab === 'LOGIN' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Login Page Background</h3>
                <p className="text-sm text-slate-500">Choose a background image for the CMS login screen.</p>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  setMediaTarget('login_bg');
                  setIsMediaPopupOpen(true);
                }}
                className="gap-2"
              >
                <ImagePlus size={16} />
                Select Image
              </Button>
            </div>
            
            {loginConfig.backgroundImage ? (
              <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 aspect-video group">
                <img src={loginConfig.backgroundImage} alt="Login Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="danger" size="sm" onClick={() => setLoginConfig({...loginConfig, backgroundImage: ''})}>Remove</Button>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 aspect-video flex flex-col items-center justify-center text-slate-400">
                <ImagePlus size={32} className="mb-2 opacity-50" />
                <p className="text-sm">No background image selected</p>
              </div>
            )}
            
            <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
              <Button 
                variant="primary"
                onClick={() => handleSave('login_config', loginConfig)}
                disabled={JSON.stringify(loginConfig) === JSON.stringify(savedLoginConfig)}
              >
                {user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
              </Button>
            </div>
          </div>
        )}`;

content = content.replace("{activeTab === 'WALLPAPER' && (", loginTabContent + "\n\n        {activeTab === 'WALLPAPER' && (");

// 6. Handle Image Selection Callback
const setMediaTargetWallpaper = `if (mediaTarget === 'wallpaper') {
      setWallpaperConfig({ ...wallpaperConfig, images: [...wallpaperConfig.images, file.url] });
    }`;
const setMediaTargetLogin = `else if (mediaTarget === 'login_bg') {
      setLoginConfig({ ...loginConfig, backgroundImage: file.url });
    }`;
content = content.replace(setMediaTargetWallpaper, setMediaTargetWallpaper + ' ' + setMediaTargetLogin);

fs.writeFileSync('src/pages/SettingsEditor.tsx', content);
