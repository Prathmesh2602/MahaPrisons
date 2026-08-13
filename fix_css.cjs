const fs = require('fs');
const content = fs.readFileSync('src/index.css', 'utf8');
const goodTop = `@import "tailwindcss";

@theme {
  --color-primary: #0F3D66;
  --color-secondary: #1E5AA8;
  --color-accent: #0F766E;
  --color-success: #16A34A;
  --color-warning: #F59E0B;
  --color-danger: #DC2626;
  --color-app-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-border-custom: #E5E7EB;
  --color-text-primary: #111827;
  --color-text-secondary: #374151;

  --font-poppins: "Poppins", sans-serif;
  --font-devanagari: "Mukta", "Noto Sans Devanagari", "Mangal", "Kokila", "Arial Unicode MS", sans-serif;
  --font-mukta: "Mukta", "Mangal", "Arial Unicode MS", sans-serif;
}

html {
  font-size: 18px;
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-app-bg);
  color: var(--color-text-primary);
  font-family: var(--font-devanagari);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* --- PREMIUM MODERN 2026 UI DESIGN SYSTEM --- */

/* Glassmorphism card helper classes */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 4px 30px rgba(15, 61, 102, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-mode .glass-card {
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(55, 65, 81, 0.45);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}`;

const startIdx = content.indexOf('/* Hover elevation helper */');
if (startIdx !== -1) {
  fs.writeFileSync('src/index.css', goodTop + '\n\n' + content.substring(startIdx));
}
