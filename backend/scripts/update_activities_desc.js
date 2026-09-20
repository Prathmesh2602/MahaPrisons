const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pageNode = await prisma.pageNode.findUnique({
    where: { slug: 'yerawada-open-jail' }
  });

  if (!pageNode) return console.log('PageNode not found');

  const overviewBlock = await prisma.contentBlock.findFirst({
    where: { pageNodeId: pageNode.id, blockType: 'prison_overview' }
  });

  const activitiesBlock = await prisma.contentBlock.findFirst({
    where: { pageNodeId: pageNode.id, blockType: 'prison_activities' }
  });

  if (overviewBlock && activitiesBlock) {
    const desc = overviewBlock.content.description;
    
    // update activities content to include desc
    const newContent = {
      ...activitiesBlock.content,
      description: desc
    };

    await prisma.contentBlock.update({
      where: { id: activitiesBlock.id },
      data: { content: newContent }
    });

    console.log('Updated prison_activities block with description!');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
