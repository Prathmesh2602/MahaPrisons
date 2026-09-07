const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.page.findMany({
    include: {
      blocks: true
    }
  });
  console.log("All pages:");
  pages.forEach(p => {
    console.log(`- id: ${p.id}, slug: ${p.slug}, titleEn: ${p.titleEn}, blocks: ${p.blocks.length}`);
  });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
