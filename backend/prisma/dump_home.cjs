const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const page = await prisma.pageNode.findUnique({where: {slug: 'home'}, include: {contentBlocks: true}});
  console.log(JSON.stringify(page.contentBlocks.find(b => b.blockType === 'page_template_data')?.content, null, 2));
  prisma.$disconnect();
}
run();
