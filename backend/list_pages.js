const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const pages = await prisma.pageNode.findMany();
  console.log(pages.map(p => ({ slug: p.slug, title: p.title })));
}
main().then(() => prisma.$disconnect());
