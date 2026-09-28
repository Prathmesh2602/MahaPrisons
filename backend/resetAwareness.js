const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.pageNode.findUnique({ where: { slug: 'cultural/awareness-programs' } });
  if (p) {
    await prisma.pageNode.update({ where: { id: p.id }, data: { layoutType: '' } });
    const blocks = await prisma.contentBlock.findMany({ where: { pageNodeId: p.id } });
    for (const b of blocks) {
      await prisma.contentBlock.update({ where: { id: b.id }, data: { content: {} } });
    }
    console.log('Reset awareness-programs successfully!');
  } else {
    console.log('Page not found');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
