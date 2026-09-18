import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearQueue() {
  try {
    const deleted = await prisma.revision.deleteMany({});
    console.log(`Successfully cleared ${deleted.count} items from the review queue.`);
  } catch (error) {
    console.error('Error clearing queue:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearQueue();
