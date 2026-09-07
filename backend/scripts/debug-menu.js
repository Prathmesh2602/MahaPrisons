const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menuItems = await prisma.menuItem.findMany({
    include: { page: true }
  });
  console.log("Menu Items:");
  menuItems.forEach(mi => {
    if (mi.page && mi.page.length > 0) {
      console.log(`Menu: ${mi.labelEn}, Href: ${mi.href}, Pages:`, mi.page.map(p => p.slug));
    } else {
      console.log(`Menu: ${mi.labelEn}, Href: ${mi.href}, No associated pages`);
    }
  });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
