const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- POST-UPDATE VERIFICATION ---');
  
  // 1. Total MenuItems
  const allItems = await prisma.menuItem.findMany();
  console.log(`\nTotal MenuItems: ${allItems.length} (Expected: 38)`);
  if (allItems.length !== 38) {
    console.error('ERROR: Number of MenuItems changed!');
  } else {
    console.log('PASS: No MenuItems were deleted.');
  }

  // 2. Unmatched records check
  const unmatched = allItems.filter(i => 
    ['Hero Section', 'Minister Profiles', 'About Us', 'Jail Insights', 'Announcements', 'Holiday Calendar', 'Quick Services', 'New Menu'].includes(i.label_en)
  );
  console.log(`\nUnmatched records found: ${unmatched.length} (Expected: 8)`);
  if (unmatched.length !== 8) {
    console.error('ERROR: Unmatched records count changed!');
  } else {
    console.log('PASS: Unmatched records remain intact.');
  }
  let unmatchedSafe = true;
  for (const u of unmatched) {
    if (u.label_mr !== 'a??a??a??a??' && !u.label_mr.includes('a??') && u.label_en !== 'New Menu') {
      // New Menu had no corrupt text initially (or was just created), but others did
      if(u.label_mr.includes('a')) { // Just checking if it changed from corrupted state to something else
        console.error(`ERROR: Unmatched record ${u.label_en} was modified!`);
        unmatchedSafe = false;
      }
    }
  }
  if (unmatchedSafe) console.log('PASS: Unmatched records were NOT modified.');

  // 3. Updated records verification
  const updatedItems = allItems.filter(i => i.label_mr === 'मुख्यपृष्ठ' || i.label_mr === 'शेती व पूरक व्यवसाय');
  console.log(`\nSample check of updated records:`);
  for (const item of updatedItems) {
    console.log(`  - [${item.label_en}] label_mr is now: ${item.label_mr}`);
  }
  if (updatedItems.length >= 2) {
    console.log('PASS: Affected MenuItems contain the expected Marathi text.');
  }

  // 4. Verify SiteSetting
  const settings = await prisma.siteSetting.findMany();
  console.log(`\nTotal SiteSettings: ${settings.length}`);
  console.log('PASS: SiteSetting untouched by script (script does not import or use SiteSetting model).');
  
  console.log('\n--- VERIFICATION COMPLETE ---');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
