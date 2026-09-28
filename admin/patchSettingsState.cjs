const fs = require('fs');
let content = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');

content = content.replace("type TabType = 'DASHBOARD' | 'HEADER' | 'FOOTER' | 'WALLPAPER';", "type TabType = 'DASHBOARD' | 'HEADER' | 'FOOTER' | 'WALLPAPER' | 'LOGIN';");

content = content.replace('const DEFAULT_WALLPAPER_CONFIG = {', "const DEFAULT_LOGIN_CONFIG = { backgroundImage: '' };\n\nconst DEFAULT_WALLPAPER_CONFIG = {");

content = content.replace('const [wallpaperConfig, setWallpaperConfig] = useState<any>(DEFAULT_WALLPAPER_CONFIG);', "const [wallpaperConfig, setWallpaperConfig] = useState<any>(DEFAULT_WALLPAPER_CONFIG);\n  const [loginConfig, setLoginConfig] = useState<any>(DEFAULT_LOGIN_CONFIG);");

content = content.replace('const [savedWallpaperConfig, setSavedWallpaperConfig] = useState<any>(DEFAULT_WALLPAPER_CONFIG);', "const [savedWallpaperConfig, setSavedWallpaperConfig] = useState<any>(DEFAULT_WALLPAPER_CONFIG);\n  const [savedLoginConfig, setSavedLoginConfig] = useState<any>(DEFAULT_LOGIN_CONFIG);");

fs.writeFileSync('src/pages/SettingsEditor.tsx', content);
