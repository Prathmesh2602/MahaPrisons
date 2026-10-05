const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function inspectJson(obj, path = '', results = { valid: 0, corrupted: 0, empty: 0, missingMr: 0, englishOnly: 0 }) {
  if (obj === null || obj === undefined) return;

  if (typeof obj === 'string') {
    if (obj.includes('a??') || obj.includes('a?+')) {
      results.corrupted++;
    } else if (obj.trim() === '') {
      results.empty++;
    } else if (/[अ-ज्ञ]/.test(obj)) {
      results.valid++;
    }
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      inspectJson(obj[i], `${path}[${i}]`, results);
    }
  } else if (typeof obj === 'object') {
    // Check for en/mr pattern
    if ('en' in obj || 'mr' in obj) {
      if (!('mr' in obj)) {
        results.missingMr++;
        if (obj.en) results.englishOnly++;
      } else {
        if (obj.mr === null || obj.mr === '') {
          results.empty++;
          if (obj.en) results.englishOnly++;
        } else if (typeof obj.mr === 'string' && (obj.mr.includes('a??') || obj.mr.includes('a?+'))) {
          results.corrupted++;
        } else {
          results.valid++;
        }
      }
      // Inspect english string for corruption just in case
      if (typeof obj.en === 'string' && (obj.en.includes('a??') || obj.en.includes('a?+'))) {
         results.corrupted++;
      }
    } else {
      for (const [key, value] of Object.entries(obj)) {
        inspectJson(value, `${path}.${key}`, results);
      }
    }
  }
  return results;
}

async function runAudit() {
  console.log("=== PHASE 1: DATABASE AUDIT ===\n");
  
  const results = {
    ContentBlock: { total: 0, valid: 0, corrupted: 0, empty: 0, missingMr: 0, englishOnly: 0 },
    SiteSetting: { total: 0, valid: 0, corrupted: 0, empty: 0, missingMr: 0, englishOnly: 0 },
    MenuItem: { total: 0, valid: 0, corrupted: 0, empty: 0, missingMr: 0, englishOnly: 0 }
  };

  const blocks = await prisma.contentBlock.findMany();
  results.ContentBlock.total = blocks.length;
  for (const block of blocks) {
    if (block.content) {
      const res = inspectJson(block.content);
      results.ContentBlock.valid += res.valid;
      results.ContentBlock.corrupted += res.corrupted;
      results.ContentBlock.empty += res.empty;
      results.ContentBlock.missingMr += res.missingMr;
      results.ContentBlock.englishOnly += res.englishOnly;
    }
  }

  const settings = await prisma.siteSetting.findMany();
  results.SiteSetting.total = settings.length;
  for (const setting of settings) {
    if (setting.value) {
      const res = inspectJson(setting.value);
      results.SiteSetting.valid += res.valid;
      results.SiteSetting.corrupted += res.corrupted;
      results.SiteSetting.empty += res.empty;
      results.SiteSetting.missingMr += res.missingMr;
      results.SiteSetting.englishOnly += res.englishOnly;
    }
  }

  const menus = await prisma.menuItem.findMany();
  results.MenuItem.total = menus.length;
  for (const menu of menus) {
    let valid = 0, corrupted = 0, empty = 0, missingMr = 0, englishOnly = 0;
    
    if (!menu.titleMr) {
      missingMr++;
      if (menu.titleEn) englishOnly++;
      empty++;
    } else if (menu.titleMr.includes('a??') || menu.titleMr.includes('a?+')) {
      corrupted++;
    } else {
      valid++;
    }

    results.MenuItem.valid += valid;
    results.MenuItem.corrupted += corrupted;
    results.MenuItem.empty += empty;
    results.MenuItem.missingMr += missingMr;
    results.MenuItem.englishOnly += englishOnly;
  }

  console.log(JSON.stringify(results, null, 2));
  
  const pages = await prisma.pageNode.findMany({ include: { contentBlocks: true }});
  console.log("\nPageNode total:", pages.length);

  const media = await prisma.media.findMany();
  console.log("Media total:", media.length);

  await prisma.$disconnect();
}

runAudit().catch(e => { console.error(e); process.exit(1); });
