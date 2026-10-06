import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const TARGET_IDS = [
  '41754985-27a6-48c8-b6f5-0a261e73aa85', // Administrative Departments
  '3b10c35a-7e0e-47bd-b678-88e75f6ff2b0'  // Facilities & Amenities
];

const TRANSLATIONS = {
  "Prisoner Interview": "बंदी मुलाखत",
  "Establishment": "आस्थापना",
  "Judicial Department": "न्याय विभाग",
  "Ration": "रेशन",
  "Interview": "मुलाखत",
  "Hospital": "दवाखाना",
  "Factory": "कारखाना",
  "Industry": "उद्योग",
  "Internal Security": "अंतर्गत सुरक्षा",
  "Construction": "बांधकाम"
};

const FALLBACK_STR = "माहिती उपलब्ध नाही";

async function repair() {
  console.log('==================================================');
  console.log('MENU ITEM GROUPS REPAIR - PRODUCTION');
  console.log('==================================================');

  // 1. Fetch both MenuItem records
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: TARGET_IDS }
    }
  });

  if (menuItems.length !== 2) {
    console.error(`ABORT: Expected to find 2 records, found ${menuItems.length}`);
    process.exit(1);
  }

  // 2. Save JSON backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
  const backupFile = path.resolve(process.cwd(), `production-menu-repair-backup-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(menuItems, null, 2), 'utf8');
  console.log(`Backup saved to: ${backupFile}`);

  // 3. Inspect and modify
  let foundTargetCount = 0;
  const updates = [];
  const proposedChanges = [];

  for (const item of menuItems) {
    let changed = false;
    const groupsCopy = JSON.parse(JSON.stringify(item.groups));
    
    if (Array.isArray(groupsCopy)) {
      for (const group of groupsCopy) {
        if (Array.isArray(group.children)) {
          for (const child of group.children) {
            if (TRANSLATIONS[child.label_en]) {
              const expectedMr = TRANSLATIONS[child.label_en];
              
              if (child.label_mr !== FALLBACK_STR) {
                 console.error(`ABORT: English label "${child.label_en}" has unexpected label_mr: "${child.label_mr}". Expected "${FALLBACK_STR}".`);
                 process.exit(1);
              }
              
              proposedChanges.push({
                id: item.id,
                groupTitle: group.groupTitle_en || 'Unknown',
                label_en: child.label_en,
                current_label_mr: child.label_mr,
                new_label_mr: expectedMr
              });
              
              child.label_mr = expectedMr;
              
              // Also fix child.title which was corrupted alongside label_mr in fix_menus_children.cjs
              if (child.title === FALLBACK_STR) {
                child.title = expectedMr;
              }
              
              foundTargetCount++;
              changed = true;
            }
          }
        }
      }
    }

    if (changed) {
      updates.push({ id: item.id, groups: groupsCopy });
    }
  }

  // Print proposed changes
  console.log('\n--- PROPOSED CHANGES ---');
  for (const change of proposedChanges) {
    console.log(`ID: ${change.id}`);
    console.log(`Group Title: ${change.groupTitle}`);
    console.log(`Label (EN): ${change.label_en}`);
    console.log(`Current label_mr: ${change.current_label_mr}`);
    console.log(`New label_mr: ${change.new_label_mr}\n`);
  }

  // 4 & 5. Confirm exactly 10 targeted children found
  if (foundTargetCount !== 10) {
    console.error(`ABORT: Expected exactly 10 targeted children, but found ${foundTargetCount}`);
    process.exit(1);
  }

  console.log(`Verified exactly 10 targeted children found.`);
  console.log('\nExecuting Prisma Transaction...');

  try {
    await prisma.$transaction(async (tx) => {
      for (const update of updates) {
        await tx.menuItem.update({
          where: { id: update.id },
          data: { groups: update.groups }
        });
      }
    });
    console.log('Update completed successfully.');
  } catch (error) {
    console.error('ABORT: Transaction failed', error);
    process.exit(1);
  }

  // POST-UPDATE VERIFICATION
  console.log('\n--- POST-UPDATE VERIFICATION ---');
  
  const verifiedItems = await prisma.menuItem.findMany({
    where: {
      id: { in: TARGET_IDS }
    }
  });

  let verifiedCount = 0;
  let remainingFallbackCount = 0;
  
  for (const item of verifiedItems) {
    if (Array.isArray(item.groups)) {
      for (const group of item.groups) {
        if (Array.isArray(group.children)) {
          for (const child of group.children) {
            if (TRANSLATIONS[child.label_en]) {
              if (child.label_mr === TRANSLATIONS[child.label_en]) {
                verifiedCount++;
              }
            }
            if (child.label_mr === FALLBACK_STR && TRANSLATIONS[child.label_en]) {
              remainingFallbackCount++;
            }
          }
        }
      }
    }
  }

  console.log(`Targeted children correctly updated: ${verifiedCount}`);
  console.log(`Remaining targeted children with fallback: ${remainingFallbackCount}`);
  
  const totalMenuItems = await prisma.menuItem.count();
  console.log(`Total MenuItem records: ${totalMenuItems} (Unchanged)`);

  await prisma.$disconnect();
}

repair().catch(e => {
  console.error(e);
  process.exit(1);
});
