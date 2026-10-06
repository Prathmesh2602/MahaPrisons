import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fixLocalhostUrls() {
  console.log('Replacing http://localhost:5000 with relative paths...');

  // Fix ContentBlocks
  const blocks = await prisma.contentBlock.findMany();
  let blocksUpdated = 0;
  for (const block of blocks) {
    const jsonStr = JSON.stringify(block.content);
    if (jsonStr.includes('http://localhost:5000')) {
      const fixedStr = jsonStr.replace(/http:\/\/localhost:5000/g, '');
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: JSON.parse(fixedStr) }
      });
      blocksUpdated++;
    }
  }

  // Fix SiteSettings
  const settings = await prisma.siteSetting.findMany();
  let settingsUpdated = 0;
  for (const setting of settings) {
    const jsonStr = JSON.stringify(setting.value);
    if (jsonStr.includes('http://localhost:5000')) {
      const fixedStr = jsonStr.replace(/http:\/\/localhost:5000/g, '');
      await prisma.siteSetting.update({
        where: { id: setting.id },
        data: { value: JSON.parse(fixedStr) }
      });
      settingsUpdated++;
    }
  }

  // Fix MenuItems just in case
  const menus = await prisma.menuItem.findMany();
  let menusUpdated = 0;
  for (const menu of menus) {
    if (menu.groups) {
      const jsonStr = JSON.stringify(menu.groups);
      if (jsonStr.includes('http://localhost:5000')) {
        const fixedStr = jsonStr.replace(/http:\/\/localhost:5000/g, '');
        await prisma.menuItem.update({
          where: { id: menu.id },
          data: { groups: JSON.parse(fixedStr) }
        });
        menusUpdated++;
      }
    }
  }

  console.log(`Updated ${blocksUpdated} ContentBlocks.`);
  console.log(`Updated ${settingsUpdated} SiteSettings.`);
  console.log(`Updated ${menusUpdated} MenuItems.`);
  
  await prisma.$disconnect();
}

fixLocalhostUrls().catch(console.error);
