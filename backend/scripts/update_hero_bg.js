const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pageNode = await prisma.pageNode.findUnique({
    where: { slug: 'yerawada-open-jail' }
  });

  if (!pageNode) return console.log('PageNode not found');

  const heroBlock = await prisma.contentBlock.findFirst({
    where: { pageNodeId: pageNode.id, blockType: 'prison_hero' }
  });

  if (heroBlock) {
    // update hero content to include bgImage
    const newContent = {
      ...heroBlock.content,
      bgImage: heroBlock.content.bgImage || "http://localhost:5000/uploads/rehab_hero.png"
    };

    await prisma.contentBlock.update({
      where: { id: heroBlock.id },
      data: { content: newContent }
    });

    console.log('Updated prison_hero block with bgImage!');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
