import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const englishTranslations = {
  0: [
    "Instructions to candidates - verification of original documents of 38 candidates who remained absent out of 102 candidates in final waiting list",
    "Karvatya (Sawer)",
    "Document Verification - Prison Sepoy Recruitment - Western Region, Pune",
    "Katari (Turner)",
    "Prison Sepoy Recruitment - Last chance for document verification - Ch. Sambhajinagar",
    "Prison Sepoy Recruitment - Ch. Sambhajinagar - Third and final notice to absent candidates for original document verification",
    "Prison Sepoy Recruitment Year 2022-23 - attendance of 07 candidates in final waiting list for original document verification..."
  ],
  1: [
    "Yerwada Central Jail _ Scrap Auction _ Photos",
    "Yerwada Central Jail _ Scrap Materials _ Scrap Item _ Weight _ Price _ Photo _ Description",
    "Eligibility criteria for participating in the auction",
    "Sale Registration _ Yerwada Central Jail _ Details",
    "Auction of scrap materials in Yerwada Central Prison"
  ],
  2: [
    "Clerk Post Provisional Seniority List Year 2026",
    "Provisional Seniority List _ Prison Officer Grade-1 _ Dated 01.01.1993 to 31.12.2026",
    "Provisional Seniority List _ Senior Clerk _ As of 01.01.2026",
    "Regarding publication of provisional seniority list as of 01.01.2026 of stenographer cadre posts in Prisons Department..",
    "Regarding publication of provisional seniority list as of 01.01.2026 of promotional posts in technical cadre of Prisons Department"
  ]
};

async function fixAnnouncements() {
  console.log('Fetching announcements_tabs block...');

  const blocks = await prisma.contentBlock.findMany({
    where: { blockType: 'announcements_tabs' }
  });

  for (const block of blocks) {
    let content = block.content;
    let modified = false;

    if (Array.isArray(content)) {
      content = content.map((tab, tabIdx) => {
        if (tab.items && Array.isArray(tab.items)) {
          tab.items = tab.items.map((item, itemIdx) => {
            if (item.text && typeof item.text === 'object') {
              const mrText = (item.text.mr || '').trim();
              const enText = (item.text.en || '').trim();

              // If English text is identical to Marathi, or empty
              if (enText === mrText || enText === '') {
                // Try to get hardcoded English translation
                if (englishTranslations[tabIdx] && englishTranslations[tabIdx][itemIdx]) {
                  item.text.en = englishTranslations[tabIdx][itemIdx];
                  modified = true;
                  console.log(`Fixed translation for: ${mrText.substring(0, 30)}...`);
                } else if (enText === mrText) {
                  // If we don't have a hardcoded translation, clear it so it doesn't show Marathi in English field
                  item.text.en = "";
                  modified = true;
                  console.log(`Cleared copied Marathi text for: ${mrText.substring(0, 30)}...`);
                }
              }
            }
            return item;
          });
        }
        return tab;
      });
    }

    if (modified) {
      console.log(`Updating block ID: ${block.id}...`);
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: content }
      });
      console.log('Block updated successfully!');
    } else {
      console.log('No fixes needed for this block.');
    }
  }

  console.log('Done!');
  await prisma.$disconnect();
}

fixAnnouncements().catch(console.error);
