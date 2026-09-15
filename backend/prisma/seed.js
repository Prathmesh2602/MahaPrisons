const { PrismaClient } = require('@prisma/client');
const path = require('path');
const url = require('url');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Dynamically import ES Modules
  const mockDataPath = path.resolve(__dirname, '../../web/src/data/mockData.js');
  const translationsPath = path.resolve(__dirname, '../../web/src/data/translations.js');
  const { mockHomepageData } = await import(url.pathToFileURL(mockDataPath).href);
  const { translations } = await import(url.pathToFileURL(translationsPath).href);

  // 1. Seed Site Settings
  const settings = {
    title: mockHomepageData.title,
    logo_h1: mockHomepageData.logo_h1,
    logo_spans: mockHomepageData.logo_spans,
    topbar_links: mockHomepageData.topbar_links,
    footer_banners: mockHomepageData.footer_banners,
    footer_links: mockHomepageData.footer_links,
    news_ticker: mockHomepageData.news_ticker,
    contactInfo: mockHomepageData.contactInfo
  };

  await prisma.siteSetting.upsert({
    where: { key: 'global_config' },
    update: { value: settings },
    create: { key: 'global_config', value: settings }
  });
  console.log('Site settings seeded.');

  // 2. Seed Menu
  const menu = await prisma.menu.upsert({
    where: { name: 'main_navigation' },
    update: {},
    create: { name: 'main_navigation' }
  });

  // Clear existing items
  await prisma.menuItem.deleteMany({
    where: { menuId: menu.id }
  });

  const navItems = mockHomepageData.navigation_menu || [];
  
  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i];
    
    const rootItem = await prisma.menuItem.create({
      data: {
        menuId: menu.id,
        label_mr: item.text,
        label_en: translations[item.text]?.en || item.text,
        href: item.href,
        icon: item.icon,
        order: i,
        groups: item.isMegaMenu && item.groups ? item.groups.map(group => ({
          groupTitle_mr: group.groupTitle,
          groupTitle_en: translations[group.groupTitle]?.en || group.groupTitle,
          children: group.children ? group.children.map(child => ({
            label_mr: child.text,
            label_en: translations[child.text]?.en || child.text,
            href: child.href,
            title: child.title || child.text
          })) : []
        })) : null,
      }
    });

    if (item.children && item.children.length > 0) {
      for (let j = 0; j < item.children.length; j++) {
        const child = item.children[j];
        await prisma.menuItem.create({
          data: {
            menuId: menu.id,
            parentId: rootItem.id,
            label_mr: child.text,
            label_en: translations[child.text]?.en || child.text,
            href: child.href,
            icon: child.icon,
            order: j
          }
        });
      }
    }
  }
  console.log('Navigation menu seeded.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
