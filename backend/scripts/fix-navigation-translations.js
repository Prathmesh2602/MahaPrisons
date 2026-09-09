const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

async function fix() {
  try {
    const filePath = path.join(__dirname, '../../web/src/data/translations.js');
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace('export const translations =', 'translations =');
    let translations;
    eval(content);

    const menus = await prisma.menuItem.findMany();
    let updatedCount = 0;

    for (const menu of menus) {
      let match = translations[menu.labelMr] || translations[menu.labelEn];
      
      if (!match) {
        match = Object.values(translations).find(t => 
          (t.en && t.en.toLowerCase().trim() === menu.labelEn?.toLowerCase().trim()) || 
          (t.mr && t.mr.trim() === menu.labelMr?.trim())
        );
      }

      if (match) {
        // Only update if there is an actual change
        if (menu.labelEn !== match.en || menu.labelMr !== match.mr) {
          await prisma.menuItem.update({
            where: { id: menu.id },
            data: {
              labelEn: match.en,
              labelMr: match.mr
            }
          });
          console.log(`Updated "${menu.labelEn}" -> EN: "${match.en}", MR: "${match.mr}"`);
          updatedCount++;
        }
      } else {
        console.log(`No translation match found for menu item: "${menu.labelEn}" / "${menu.labelMr}"`);
      }
    }

    console.log(`\nFinished! Updated ${updatedCount} menu items.`);
  } catch (error) {
    console.error("Error fixing translations:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fix();
