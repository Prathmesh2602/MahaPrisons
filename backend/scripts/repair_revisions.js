const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function repair() {
  console.log("Repairing revisions...");

  // 1. Repair gallery revision b9f28bcd-bc73-47e3-a029-eaa12b235db3
  const galleryRev = await prisma.revision.findUnique({
    where: { id: 'b9f28bcd-bc73-47e3-a029-eaa12b235db3' }
  });

  if (galleryRev) {
    const liveBlock = await prisma.contentBlock.findUnique({
      where: { id: galleryRev.recordId }
    });

    let proposedData = galleryRev.proposedData;
    if (liveBlock && liveBlock.content && liveBlock.content.gallery) {
      // Synchronize clean Marathi text while keeping whatever proposed fields were there
      if (proposedData.gallery && Array.isArray(proposedData.gallery)) {
        proposedData.gallery = proposedData.gallery.map((item, idx) => {
          const liveItem = liveBlock.content.gallery[idx];
          if (liveItem) {
            return {
              ...item,
              title: liveItem.title,
              desc: liveItem.desc
            };
          }
          return item;
        });
      }
      if (liveBlock.content.header) {
        proposedData.header = liveBlock.content.header;
      }
    }

    const cleanSummary = "'श्रृंखला उपहारगृह - येरवडा खुले कारागृह, पुणे' img changed in Gallery page";

    await prisma.revision.update({
      where: { id: galleryRev.id },
      data: {
        changeSummary: cleanSummary,
        proposedData: proposedData
      }
    });

    console.log("Successfully repaired Gallery revision:", galleryRev.id);
  }

  // 2. Check and repair any other revisions whose proposedData contains corrupted text
  const allRevisions = await prisma.revision.findMany();
  for (const rev of allRevisions) {
    if (rev.id === 'b9f28bcd-bc73-47e3-a029-eaa12b235db3') continue;

    const str = JSON.stringify(rev.proposedData || {});
    if (str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â')) {
      if (rev.modelName === 'ContentBlock' && rev.recordId) {
        const liveBlock = await prisma.contentBlock.findUnique({ where: { id: rev.recordId } });
        if (liveBlock) {
          await prisma.revision.update({
            where: { id: rev.id },
            data: { proposedData: liveBlock.content }
          });
          console.log(`Repaired proposedData for ContentBlock revision ${rev.id}`);
        }
      } else if (rev.modelName === 'SiteSetting' && rev.recordId) {
        const liveSetting = await prisma.siteSetting.findUnique({ where: { key: rev.recordId } });
        if (liveSetting) {
          await prisma.revision.update({
            where: { id: rev.id },
            data: { proposedData: liveSetting.value }
          });
          console.log(`Repaired proposedData for SiteSetting revision ${rev.id}`);
        }
      }
    }
  }

  console.log("Finished all revision repairs.");
}

repair()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
