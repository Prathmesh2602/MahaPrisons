const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function fixMenuItems() {
  const menus = await prisma.menuItem.findMany();
  for (const m of menus) {
    if(JSON.stringify(m).includes('a??') || JSON.stringify(m).includes('a?+')) {
      console.log('--- MI ---', m.id);
      console.log(JSON.stringify(m, null, 2));
    }
  }
  prisma.$disconnect();
}
fixMenuItems();
