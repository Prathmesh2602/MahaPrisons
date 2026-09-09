const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding templates...');
  
  await prisma.template.upsert({
    where: { key: 'HOME_PAGE' },
    update: {
      allowedBlockTypes: ['HERO_CAROUSEL', 'ABOUT_SECTION', 'JAIL_INSIGHTS', 'ANNOUNCEMENTS', 'CALENDAR', 'GALLERY', 'QUICK_SERVICES'],
    },
    create: {
      key: 'HOME_PAGE',
      name: 'Home Page Template',
      allowedBlockTypes: ['HERO_CAROUSEL', 'ABOUT_SECTION', 'JAIL_INSIGHTS', 'ANNOUNCEMENTS', 'CALENDAR', 'GALLERY', 'QUICK_SERVICES'],
    }
  });

  await prisma.template.upsert({
    where: { key: 'BLANK_PAGE' },
    update: {
      allowedBlockTypes: ['RICH_TEXT', 'HERO_CAROUSEL', 'GALLERY', 'IMAGE', 'PDF_VIEWER', 'CONTACT_FORM'],
    },
    create: {
      key: 'BLANK_PAGE',
      name: 'Blank Modular Page',
      allowedBlockTypes: ['RICH_TEXT', 'HERO_CAROUSEL', 'GALLERY', 'IMAGE', 'PDF_VIEWER', 'CONTACT_FORM'],
    }
  });

  console.log('Templates seeded successfully.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
