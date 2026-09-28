const fs = require('fs');
let currentContent = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');
let originalContent = fs.readFileSync('src/pages/SettingsEditor_original.tsx', 'utf8');

// The cutoff point is just before {/* DYNAMIC HEADER CONTROLS */}
const cutoffRegex = /\{\/\* DYNAMIC HEADER CONTROLS \*\/\}/;
const currentTopHalf = currentContent.substring(0, currentContent.indexOf('{/* DYNAMIC HEADER CONTROLS */}'));
const originalBottomHalf = originalContent.substring(originalContent.indexOf('{/* DYNAMIC HEADER CONTROLS */}'));

let newContent = currentTopHalf + originalBottomHalf;

// 1. Inject LOGIN EditorFormHeader inside DYNAMIC HEADER CONTROLS
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
newContent = newContent.replace(wallpaperHeaderRegex, loginHeader + '\n            $&');

// 2. Inject LOGIN EditorBlock into EDITOR BODY (just before WALLPAPER)
const wallpaperBodyRegex = /\{activeTab === 'WALLPAPER' && \(\s*<div className="space-y-2">/;
const loginBody = `{activeTab === 'LOGIN' && (
          <div className="space-y-4">
            <EditorBlock className="space-y-4">
              <EditorBlockHeader
                title="Background Image"
              />
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Choose a background image for the CMS login screen.</p>
                <Button
                  variant="primary"
                  size="sm"
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
                <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 aspect-video group mt-4">
                  <img src={loginConfig.backgroundImage} alt="Login Background" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="danger" size="sm" onClick={() => setLoginConfig({...loginConfig, backgroundImage: ''})}>Remove</Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 aspect-video flex flex-col items-center justify-center text-slate-400 mt-4">
                  <ImagePlus size={32} className="mb-2 opacity-50" />
                  <p className="text-sm">No background image selected</p>
                </div>
              )}
            </EditorBlock>
          </div>
        )}`;
newContent = newContent.replace(wallpaperBodyRegex, loginBody + '\n\n        $&');

// 3. Update iframe src for Live Preview
const iframeSrcRegex = /src="http:\/\/localhost:3000\/preview"/;
newContent = newContent.replace(iframeSrcRegex, "src={activeTab === 'LOGIN' ? '/login' : 'http://localhost:3000/preview'}");

// 4. Update postMessage payload in Top Half (since it's above DYNAMIC HEADER CONTROLS)
const oldPostMessage = `        iframeRef.current.contentWindow.postMessage(
          {
            type: 'PREVIEW_UPDATE',
            component: activeTab === 'HEADER' ? 'Header' : activeTab === 'FOOTER' ? 'Footer' : activeTab === 'WALLPAPER' ? 'Wallpaper' : 'None',
            payload: { header_config: headerConfig, footer_config: footerConfig, wallpaper_config: wallpaperConfig }
          },
          '*'
        );
      }
    }, [headerConfig, footerConfig, wallpaperConfig, activeTab, isIframeReady]);`;

const newPostMessage = `        iframeRef.current.contentWindow.postMessage(
          {
            type: 'PREVIEW_UPDATE',
            component: activeTab === 'HEADER' ? 'Header' : activeTab === 'FOOTER' ? 'Footer' : activeTab === 'WALLPAPER' ? 'Wallpaper' : activeTab === 'LOGIN' ? 'Login' : 'None',
            payload: { header_config: headerConfig, footer_config: footerConfig, wallpaper_config: wallpaperConfig, login_config: loginConfig }
          },
          '*'
        );
      }
    }, [headerConfig, footerConfig, wallpaperConfig, loginConfig, activeTab, isIframeReady]);`;
newContent = newContent.replace(oldPostMessage, newPostMessage);

fs.writeFileSync('src/pages/SettingsEditor.tsx', newContent);
console.log('Restored and refactored successfully.');
