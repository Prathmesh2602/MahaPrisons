const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

async function seed() {
  try {
    const filePath = path.join(__dirname, '../../web/src/data/translations.js');
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Convert ES Module export to a variable assignment so we can eval it
    content = content.replace('export const translations =', 'translations =');
    
    let translations;
    // Safely evaluate the JS object
    eval(content);

    console.log(`Found ${Object.keys(translations).length} translations. Seeding to database...`);
    
    let count = 0;
    for (const [key, val] of Object.entries(translations)) {
      await prisma.translation.upsert({
        where: { key: key },
        update: { mr: val.mr, en: val.en },
        create: { key: key, mr: val.mr, en: val.en, namespace: 'global' }
      });
      count++;
      if (count % 10 === 0) {
        console.log(`Seeded ${count}...`);
      }
    }
    console.log(`Successfully seeded ${count} translations!`);
  } catch (error) {
    console.error("Error seeding translations:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
