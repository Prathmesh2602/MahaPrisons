const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

// A simplified parser to grab facilitiesData
const facilitiesDataRaw = fs.readFileSync(path.join(__dirname, '../web/src/data/facilitiesData.js'), 'utf8');
let match = facilitiesDataRaw.match(/export const facilitiesData = (\{[\s\S]*?\n\});/);

async function main() {
  if (!match) {
    console.log("Could not parse facilitiesData.js");
    return;
  }
  
  // Dangerously evaluate the object
  const facilitiesDataStr = match[1].replace(/export const/g, 'const').replace(/export default/g, '');
  let facilitiesData;
  try {
    eval('facilitiesData = ' + facilitiesDataStr);
  } catch (e) {
    console.log("Eval error", e);
    return;
  }

  const pagesToUpdate = Object.keys(facilitiesData);
  for (const rawSlug of pagesToUpdate) {
    const slug = `facilities/${rawSlug}`;
    const page = await prisma.pageNode.findFirst({ where: { slug } });
    if (!page) {
      console.log(`Page ${slug} not found in DB.`);
      continue;
    }

    const blocks = await prisma.contentBlock.findMany({ where: { pageNodeId: page.id } });
    const gridBlock = blocks.find(b => b.blockType === 'page_template_data' && (b.content.templateId === 'BasicFeatureGrid' || b.content.template === 'BasicFeatureGrid'));
    if (!gridBlock) {
      console.log(`Grid block not found for ${slug}`);
      continue;
    }

    const fileData = facilitiesData[rawSlug];
    const dbData = gridBlock.content || {};
    
    let updated = false;
    
    if (fileData.keyFunctions && (!dbData.keyFunctions || dbData.keyFunctions.length === 0)) {
      dbData.keyFunctions = fileData.keyFunctions;
      updated = true;
    }
    
    if (fileData.stats && (!dbData.stats || dbData.stats.length === 0)) {
      dbData.stats = fileData.stats;
      updated = true;
    }
    
    if (fileData.contactInfo && (!dbData.contactInfo || Object.keys(dbData.contactInfo).length === 0 || Array.isArray(dbData.contactInfo) && dbData.contactInfo.length === 0)) {
      dbData.contactInfo = fileData.contactInfo;
      updated = true;
    }

    if (updated) {
      await prisma.contentBlock.update({
        where: { id: gridBlock.id },
        data: { content: dbData }
      });
      console.log(`Migrated array data into DB for ${slug}`);
    } else {
      console.log(`No migration needed for ${slug}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
