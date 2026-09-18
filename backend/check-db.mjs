import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  try {
    const qsBlocks = await prisma.contentBlock.findMany({
      where: { blockType: 'quick_services' }
    });

    if (qsBlocks.length === 0) {
      console.log('No quick_services block found');
      return;
    }

    for (const block of qsBlocks) {
      const content = typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
      
      let updated = false;
      const getLegacyIcon = (idx) => {
        switch (idx) {
          case 0: return 'UserCheck';
          case 1: return 'ShieldAlert';
          case 2: return 'Shield';
          case 3: return 'ShieldAlert';
          case 4: return 'HeartHandshake';
          case 5: return 'HelpCircle';
          default: return 'Phone';
        }
      };

      if (content.helplines && Array.isArray(content.helplines)) {
        content.helplines = content.helplines.map((h, idx) => {
          if (!h.icon || h.icon === 'Phone') {
            updated = true;
            return { ...h, icon: getLegacyIcon(idx) };
          }
          return h;
        });

        if (updated) {
          await prisma.contentBlock.update({
            where: { id: block.id },
            data: { content: content }
          });
          console.log("Fixed helplines icons in the database for block", block.id);
        }
      }
    }
    
    // Also fix any pending Revisions (drafts)
    const drafts = await prisma.revision.findMany({
      where: { modelName: 'ContentBlock', status: 'PENDING_REVIEW' }
    });
    
    for (const draft of drafts) {
      const proposedData = typeof draft.proposedData === 'string' ? JSON.parse(draft.proposedData) : draft.proposedData;
      let draftUpdated = false;
      
      if (proposedData.helplines && Array.isArray(proposedData.helplines)) {
        const getLegacyIcon = (idx) => {
          switch (idx) {
            case 0: return 'UserCheck';
            case 1: return 'ShieldAlert';
            case 2: return 'Shield';
            case 3: return 'ShieldAlert';
            case 4: return 'HeartHandshake';
            case 5: return 'HelpCircle';
            default: return 'Phone';
          }
        };

        proposedData.helplines = proposedData.helplines.map((h, idx) => {
          if (!h.icon || h.icon === 'Phone') {
            draftUpdated = true;
            return { ...h, icon: getLegacyIcon(idx) };
          }
          return h;
        });

        if (draftUpdated) {
          await prisma.revision.update({
            where: { id: draft.id },
            data: { proposedData: proposedData }
          });
          console.log("Fixed draft revision in the database for revision", draft.id);
        }
      }
    }
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(console.dir);
