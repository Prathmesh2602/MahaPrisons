const fs = require('fs');
let content = fs.readFileSync('src/pages/SettingsEditor.tsx', 'utf8');

// Fix the syntax error
content = content.replace(/\} \} else if/g, '} else if');

// Remove duplicate block if any
const duplicate = `} else if (key === 'login_config') {
        setLoginConfig(DEFAULT_LOGIN_CONFIG);
        setSavedLoginConfig(DEFAULT_LOGIN_CONFIG);
      } else if (key === 'login_config') {
        setLoginConfig(DEFAULT_LOGIN_CONFIG);
        setSavedLoginConfig(DEFAULT_LOGIN_CONFIG);
      }`;
const duplicateFixed = `} else if (key === 'login_config') {
        setLoginConfig(DEFAULT_LOGIN_CONFIG);
        setSavedLoginConfig(DEFAULT_LOGIN_CONFIG);
      }`;
content = content.replace(duplicate, duplicateFixed);

fs.writeFileSync('src/pages/SettingsEditor.tsx', content);
