import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function finalOverwrite() {
  // Read extracted homepage data
  const homepageData = JSON.parse(fs.readFileSync('../web/src/data/extracted_homepage_data.json', 'utf8'));

  // 1. global_config
  await prisma.siteSetting.update({
    where: { key: 'global_config' },
    data: { value: homepageData.global_config }
  });
  console.log("Fixed global_config");

  // 2. footer_config
  await prisma.siteSetting.update({
    where: { key: 'footer_config' },
    data: { value: homepageData.footer_config }
  });
  console.log("Fixed footer_config");

  // 3. announcements_tabs
  await prisma.contentBlock.update({
    where: { id: 'announcements_tabs' },
    data: { content: homepageData.announcements_tabs }
  });
  await prisma.contentBlock.update({
    where: { id: '96a1ac82-4f83-4695-98f7-b2624ee3ae95' }, // Duplicate announcements_tabs
    data: { content: homepageData.announcements_tabs }
  });
  console.log("Fixed announcements_tabs");

  // 4. holiday_calendar
  await prisma.contentBlock.update({
    where: { id: 'e035682c-387a-4fe8-aab1-2bc606a8b1a8' },
    data: { content: homepageData.holiday_calendar }
  });
  console.log("Fixed holiday_calendar");

  // 5. prison_administration
  await prisma.contentBlock.update({
    where: { id: '34a8ff0b-5648-4221-964f-09aecd0a6ada' },
    data: { content: homepageData.prison_administration }
  });
  console.log("Fixed prison_administration");

  function isCorrupted(str) {
    if (typeof str !== 'string') return false;
    return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
  }

  console.log('\n--- FINAL VERIFICATION ---');
  let cCb = 0;
  for (const b of await prisma.contentBlock.findMany()) if (isCorrupted(JSON.stringify(b.content))) {
    cCb++;
    console.log(`Still corrupted CB: ${b.id}`);
  }
  let cSs = 0;
  for (const s of await prisma.siteSetting.findMany()) if (isCorrupted(JSON.stringify(s.value))) {
    cSs++;
    console.log(`Still corrupted SS: ${s.id}`);
  }
  console.log(`Remaining Corrupted ContentBlocks: ${cCb}`);
  console.log(`Remaining Corrupted SiteSettings: ${cSs}`);

  prisma.$disconnect();
}

finalOverwrite();
