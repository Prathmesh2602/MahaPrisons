const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const blocks = await prisma.contentBlock.findMany();
  let c = 0;
  for (const b of blocks) {
    if(JSON.stringify(b).includes('a??') || JSON.stringify(b).includes('a?+')) {
      console.log('CB', b.id);
      c++;
    }
  }
  const settings = await prisma.siteSetting.findMany();
  for (const s of settings) {
    if(JSON.stringify(s).includes('a??') || JSON.stringify(s).includes('a?+')) {
      console.log('SS', s.id);
      c++;
    }
  }
  const pages = await prisma.pageNode.findMany();
  for (const p of pages) {
    if(JSON.stringify(p).includes('a??') || JSON.stringify(p).includes('a?+')) {
      console.log('PN', p.id);
      c++;
    }
  }
  const menus = await prisma.menuItem.findMany();
  for (const m of menus) {
    if(JSON.stringify(m).includes('a??') || JSON.stringify(m).includes('a?+')) {
      console.log('MI', m.id);
      c++;
    }
  }
  console.log('Total corrupted:', c);
  prisma.$disconnect();
}
check();
