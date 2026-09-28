const fs = require('fs');
let content = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');

// 1. Update postMessage
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

content = content.replace(oldPostMessage, newPostMessage);

// 2. Refactor LOGIN tab in Editor Body
const oldLoginTab = /{activeTab === 'LOGIN' && \([\s\S]*?No background image selected<\/p>\s*<\/div>\s*\)\}\s*<\/div>\s*\)\}/;

const newLoginTab = `{activeTab === 'LOGIN' && (
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

content = content.replace(oldLoginTab, newLoginTab);

fs.writeFileSync('src/pages/SettingsEditor.tsx', content);
