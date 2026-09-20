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

  if (overviewBlock) {
    const stats = overviewBlock.content.stats;
    if (stats && stats.length === 3) {
      stats[0].icon = "MapPin";
      stats[1].icon = "CheckCircle2";
      stats[2].icon = "Award";
    }

    // update activities content to include desc
    const newContent = {
      ...overviewBlock.content,
      stats: stats
    };

    await prisma.contentBlock.update({
      where: { id: overviewBlock.id },
      data: { content: newContent }
    });

    console.log('Updated prison_overview block with icons!');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
