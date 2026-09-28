const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const page = await prisma.pageNode.findFirst({ where: { slug: 'facilities/free-legal-aid' } });
  if (page) {
    const blocks = await prisma.contentBlock.findMany({ where: { pageNodeId: page.id } });
    console.log(JSON.stringify(blocks.map(b => b.content), null, 2));
  }
}
main().then(() => prisma.$disconnect());
