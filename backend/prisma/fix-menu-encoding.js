const { PrismaClient } = require('@prisma/client');
const path = require('path');
const url = require('url');

const prisma = new PrismaClient();

async function main() {
  const isDryRun = process.env.DRY_RUN !== 'false';
  
  console.log('====================================================');
  console.log('   MENU ENCODING RECOVERY SCRIPT (label_mr ONLY)');
  console.log('====================================================');
  if (isDryRun) {
    console.log('MODE: DRY RUN (No database changes will be made)');
    console.log('To run for real, set DRY_RUN=false in the environment.');
  } else {
    console.log('MODE: LIVE UPDATE (Database WILL be modified)');
  }
  console.log('----------------------------------------------------\n');

  // 1 & 2: Load the original data
  const mockDataPath = path.resolve(__dirname, '../../web/src/data/mockData.js');
  const translationsPath = path.resolve(__dirname, '../../web/src/data/translations.js');
  
  const { mockHomepageData } = await import(url.pathToFileURL(mockDataPath).href);
  const { translations } = await import(url.pathToFileURL(translationsPath).href);

  // 3. Build a mapping of label_en -> label_mr
  const expectedMappings = new Map();
  const duplicateChecks = new Set();
  let hasAmbiguities = false;

  const addToMapping = (enText, mrText) => {
    if (expectedMappings.has(enText)) {
      if (expectedMappings.get(enText) !== mrText) {
        console.error(`AMBIGUOUS MATCH ERROR: label_en '${enText}' maps to both '${expectedMappings.get(enText)}' and '${mrText}'`);
        hasAmbiguities = true;
      }
    } else {
      expectedMappings.set(enText, mrText);
    }
  };

  const navItems = mockHomepageData.navigation_menu || [];
  for (const item of navItems) {
    const en = translations[item.text]?.en || item.text;
    addToMapping(en, item.text);

    if (item.children && Array.isArray(item.children)) {
      for (const child of item.children) {
        const childEn = translations[child.text]?.en || child.text;
        addToMapping(childEn, child.text);
      }
    }
  }

  if (hasAmbiguities) {
    console.error('Aborting due to ambiguous mappings in the source data.');
    process.exit(1);
  }

  // 4. Read existing MenuItem records
  const dbMenuItems = await prisma.menuItem.findMany();
  
  // Track statistics
  const stats = {
    totalFound: dbMenuItems.length,
    matched: 0,
    requiringUpdate: 0,
    unchanged: 0,
    unmatched: 0,
    updated: 0
  };

  const actions = [];
  const unmatchedDbItems = [];
  const matchedSourceKeys = new Set();

  console.log('--- ANALYSIS ---');
  // 5 & 6. Match and plan updates
  for (const dbItem of dbMenuItems) {
    const expectedMr = expectedMappings.get(dbItem.label_en);
    
    if (expectedMr) {
      stats.matched++;
      matchedSourceKeys.add(dbItem.label_en);
      
      const isCorrupted = dbItem.label_mr !== expectedMr;
      
      if (isCorrupted) {
        stats.requiringUpdate++;
        actions.push({
          id: dbItem.id,
          expectedMr: expectedMr,
          currentMr: dbItem.label_mr
        });
        
        console.log(`[MATCHED - NEEDS UPDATE] ID: ${dbItem.id}`);
        console.log(`  label_en: ${dbItem.label_en}`);
        console.log(`  href: ${dbItem.href}`);
        console.log(`  current label_mr: ${dbItem.label_mr}`);
        console.log(`  proposed label_mr: ${expectedMr}`);
      } else {
        stats.unchanged++;
        console.log(`[MATCHED - UNCHANGED] ID: ${dbItem.id} | label_en: ${dbItem.label_en} (Already correct)`);
      }
    } else {
      stats.unmatched++;
      unmatchedDbItems.push(dbItem);
      console.log(`[UNMATCHED DB ITEM] ID: ${dbItem.id} | label_en: ${dbItem.label_en} | href: ${dbItem.href}`);
    }
  }

  const unmatchedSourceItems = Array.from(expectedMappings.entries())
    .filter(([en]) => !matchedSourceKeys.has(en))
    .map(([en, mr]) => ({ en, mr }));

  if (unmatchedSourceItems.length > 0) {
    console.log('\n[UNMATCHED SOURCE ITEMS] (In mockData.js but not in DB):');
    unmatchedSourceItems.forEach(item => {
      console.log(`  label_en: ${item.en} | label_mr: ${item.mr}`);
    });
  }

  // Execute update
  if (!isDryRun) {
    console.log('\n--- EXECUTING UPDATES ---');
    if (actions.length > 0) {
      // 11. Prisma transaction
      try {
        await prisma.$transaction(
          actions.map(action => 
            prisma.menuItem.update({
              where: { id: action.id },
              data: { label_mr: action.expectedMr }
            })
          )
        );
        stats.updated = actions.length;
        console.log('Transaction committed successfully.');
      } catch (err) {
        console.error('Transaction failed. No changes were saved.', err);
      }
    } else {
      console.log('No items require updating.');
    }
  }

  // 12. Final summary
  console.log('\n====================================================');
  console.log('                   FINAL SUMMARY');
  console.log('====================================================');
  console.log(`MenuItems found:       ${stats.totalFound}`);
  console.log(`MenuItems matched:     ${stats.matched}`);
  console.log(`Requiring update:      ${stats.requiringUpdate}`);
  console.log(`Unchanged (correct):   ${stats.unchanged}`);
  console.log(`Unmatched (ignored):   ${stats.unmatched}`);
  console.log(`Ambiguous matches:     0`); // Handled by pre-check
  console.log(`Updated successfully:  ${stats.updated}`);
  console.log('====================================================\n');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
