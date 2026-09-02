const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting legacy data migration...');

  // 1. Seed Templates
  console.log('Seeding Templates...');
  const templates = [
    { key: 'TemplateA', name: 'Standard Layout A', allowedBlockTypes: ['richtext', 'officer_list', 'gallery'] },
    { key: 'TemplateB', name: 'Standard Layout B', allowedBlockTypes: ['richtext', 'table', 'cta'] },
    { key: 'TemplateC', name: 'Standard Layout C', allowedBlockTypes: ['richtext', 'stat_grid'] },
    { key: 'TemplateD', name: 'Standard Layout D', allowedBlockTypes: ['richtext', 'gallery'] },
    { key: 'Homepage', name: 'Homepage Layout', allowedBlockTypes: ['hero_carousel', 'about_section', 'announcements_tabs', 'holiday_calendar', 'quick_services', 'minister_profiles', 'jail_insights_stats', 'photo_gallery'] },
  ];

  for (const t of templates) {
    await prisma.template.upsert({
      where: { key: t.key },
      update: {},
      create: {
        key: t.key,
        name: t.name,
        allowedBlockTypes: t.allowedBlockTypes,
      },
    });
  }

  // To truly parse ES module .js files dynamically in CJS Node environment without 
  // transpilation, we can read the file and evaluate it (safe since it's our own code).
  const loadLegacyFile = (filename, varName) => {
    try {
      const filePath = path.join(__dirname, '../../web/src/data', filename);
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/export const/g, 'const');
      content += `\nreturn ${varName};`;
      const func = new Function(content);
      return func();
    } catch (err) {
      console.warn(`Could not load ${filename}: ${err.message}`);
      return null;
    }
  };

  // 2. Seed Translations
  console.log('Seeding Translations...');
  const translations = loadLegacyFile('translations.js', 'translations');
  if (translations) {
    for (const [key, val] of Object.entries(translations)) {
      await prisma.translation.upsert({
        where: { key },
        update: { mr: val.mr, en: val.en },
        create: { key, mr: val.mr, en: val.en },
      });
    }
  }

  // 3. Seed Menu Items
  // ... (Further implementation for mockData.js navigation_menu)

  console.log('Legacy data migration completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
