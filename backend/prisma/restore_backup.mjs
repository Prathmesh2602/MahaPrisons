import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isCorrupted(str) {
  if (typeof str !== 'string') return false;
  return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
}

async function restore() {
  const backup = JSON.parse(fs.readFileSync('production-marathi-repair-backup-2026-10-05T18-50.json', 'utf8'));

  const idsToRestore = [
    '2f1f4cd2-e179-4d48-8fa2-3b7aac074f7a', '96a1ac82-4f83-4695-98f7-b2624ee3ae95',
    'af147012-1014-459c-8034-311f11bb0118', '886e5676-6ca9-437c-bd7e-41a707d00289',
    'e035682c-387a-4fe8-aab1-2bc606a8b1a8', '7052406a-49d0-4ba5-acae-f2fb202ac584',
    'announcements_tabs', '34a8ff0b-5648-4221-964f-09aecd0a6ada', '664b54a5-410b-43c1-abd6-dc75d087ad4e'
  ];
  const ssIdsToRestore = [
    '1082c1b0-8ec1-44d6-b735-8d9c09d227a0', '907116aa-1b73-4ffa-a75c-2281d33241dd',
    '16ee887b-44a3-4e8d-a70e-df31f602deb6'
  ];

  let cbCount = 0;
  let ssCount = 0;
  for (const item of backup) {
    if (idsToRestore.includes(item.id)) {
      await prisma.contentBlock.update({ where: { id: item.id }, data: { content: item.original } });
      cbCount++;
    } else if (ssIdsToRestore.includes(item.id)) {
      await prisma.siteSetting.update({ where: { id: item.id }, data: { value: item.original } });
      ssCount++;
    }
  }

  console.log(`Restored ${cbCount} ContentBlocks and ${ssCount} SiteSettings from backup.`);
  prisma.$disconnect();
}
restore();
