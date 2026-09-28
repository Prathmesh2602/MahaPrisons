const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blocks = await prisma.contentBlock.findMany();
  let updatedCount = 0;
  for (const block of blocks) {
    let changed = false;
    let contentStr = JSON.stringify(block.content);
    
    const badUrl = 'https://images.unsplash.com/photo-1520697830682-8f170eb82084?auto=format&fit=crop&q=80';
    if (contentStr.includes(badUrl)) {
      contentStr = contentStr.split(badUrl).join('/uploads/smart_card_phone.jpg');
      changed = true;
    }
    
    if (changed) {
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: JSON.parse(contentStr) }
      });
      updatedCount++;
    }
  }
  console.log(`Updated ${updatedCount} ContentBlock(s).`);
  
  // also check Revisions just in case
  const revisions = await prisma.revision.findMany();
  let revCount = 0;
  for (const rev of revisions) {
    let contentStr = JSON.stringify(rev.proposedData);
    const badUrl = 'https://images.unsplash.com/photo-1520697830682-8f170eb82084?auto=format&fit=crop&q=80';
    if (contentStr.includes(badUrl)) {
      contentStr = contentStr.split(badUrl).join('/uploads/smart_card_phone.jpg');
      await prisma.revision.update({
        where: { id: rev.id },
        data: { proposedData: JSON.parse(contentStr) }
      });
      revCount++;
    }
  }
  console.log(`Updated ${revCount} Revision(s).`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
