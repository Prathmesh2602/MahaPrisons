const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Migrating MenuItems to have attached Pages...');
  
  const adminUser = await prisma.user.findFirst();
  if (!adminUser) {
    console.error('No admin user found, skipping...');
    return;
  }

  const menuItems = await prisma.menuItem.findMany();

  for (const item of menuItems) {
    if (!item.isMegaGroup) {
      // Check if page already exists for this menu
      const existingPage = await prisma.page.findFirst({ where: { menuItemId: item.id } });
      if (!existingPage) {
        let templateKey = 'BLANK_PAGE';
        let slug = item.href === '/' ? 'home' : item.href.replace(/^\//, '');
        if (!slug || slug === '#') slug = `page-${item.id}`;
        
        // If it's the home page
        if (item.href === '/') {
          templateKey = 'HOME_PAGE';
        }

        // We might get a unique constraint error on slug if there are duplicates.
        // Let's ensure uniqueness.
        const slugExists = await prisma.page.findUnique({ where: { slug } });
        if (slugExists) {
          slug = `${slug}-${Date.now()}`;
        }

        const page = await prisma.page.create({
          data: {
            slug: slug,
            menuItemId: item.id,
            templateKey: templateKey,
            titleEn: item.labelEn,
            titleMr: item.labelMr,
            createdBy: adminUser.id,
            updatedBy: adminUser.id,
            status: 'PUBLISHED'
          }
        });
        
        // Update MenuItem with pageId just in case
        await prisma.menuItem.update({
          where: { id: item.id },
          data: { pageId: page.id }
        });
        console.log(`Created page ${slug} for menu ${item.labelEn}`);
      }
    }
  }

  console.log('Migration complete.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
