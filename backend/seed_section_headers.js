const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // 1. Build a map of templateName -> { blockName: { mr: '', en: '' } }
  const templateMap = {};
  const templatesDir = path.join(__dirname, '../web/src/templates');
  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx'));

  for (const file of files) {
    const templateName = file.replace('.jsx', '');
    templateMap[templateName] = {};

    const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
    
    // Regex to match: {data.sectionHeaders?.BLOCKNAME?.title ? getTranslation(data.sectionHeaders.BLOCKNAME.title) : (language === 'mr' ? 'MR' : 'EN')}
    const regex = /data\.sectionHeaders\?\.([a-zA-Z0-9_]+)\?\.title \? getTranslation\([^)]+\) : \(language === 'mr' \? '([^']+)' : '([^']+)'\)/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
      const blockName = match[1];
      const titleMr = match[2];
      const titleEn = match[3];
      templateMap[templateName][blockName] = { mr: titleMr, en: titleEn };
    }
  }

  console.log("Found default headers for templates:", JSON.stringify(templateMap, null, 2));

  // 2. Update all page_template_data blocks based on the Page layoutType
  const pages = await prisma.pageNode.findMany({
    include: {
      contentBlocks: {
        where: { blockType: 'page_template_data' }
      }
    }
  });
  let updatedCount = 0;

  for (const page of pages) {
    const templateName = page.layoutType;
    const block = page.contentBlocks[0];

    if (templateName && block && templateMap[templateName]) {
      const content = block.content || {};
      let needsUpdate = false;
      const newContent = { ...content };
      if (!newContent.sectionHeaders) newContent.sectionHeaders = {};

      const globalDefaults = {
        organization: { mr: "डीएलएसए", en: "DLSA" },
        training: { mr: "व्यावसायिक प्रशिक्षण", en: "Vocational Training" },
        partnership: { mr: "औद्योगिक भागीदारी", en: "Industrial Partnership" },
        impact: { mr: "प्रशिक्षण व सेवा", en: "Training & Services" },
        stats: { mr: "तांत्रिक प्रशिक्षण क्षेत्रे", en: "Technical Training Areas" },
        technicalFocus: { mr: "उद्योग मानकांनुसार व्यावसायिक प्रशिक्षण.", en: "Professional training as per industry standards." }
      };

      const defaultHeaders = {
        ...globalDefaults,
        ...(templateMap[templateName] || {})
      };
      
      const defaultIcons = {
        stats: 'Activity',
        contactInfo: 'Phone',
        applyAction: 'MousePointerClick',
        keyFunctions: 'Briefcase',
        security: 'Shield',
        protocols: 'ClipboardList',
        infrastructure: 'Building',
        notice: 'AlertCircle',
        category: 'Clock',
        features: 'CheckCircle',
        gallery: 'Image',
        timings: 'Clock',
        production: 'Zap',
        impact: 'Heart',
        technicalFocus: 'Settings',
        services: 'CheckCircle',
        general: 'Sprout',
        organization: 'Scale',
        training: 'Scissors',
        partnership: 'Factory'
      };

      for (const [blockName, titles] of Object.entries(defaultHeaders)) {
        if (!newContent.sectionHeaders[blockName]) {
          newContent.sectionHeaders[blockName] = {};
        }
        
        // Only seed if title is missing
        if (!newContent.sectionHeaders[blockName].title) {
          newContent.sectionHeaders[blockName].title = titles;
          needsUpdate = true;
        }

        // Only seed if icon is missing
        if (!newContent.sectionHeaders[blockName].icon && defaultIcons[blockName]) {
          newContent.sectionHeaders[blockName].icon = defaultIcons[blockName];
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        await prisma.contentBlock.update({
          where: { id: block.id },
          data: { content: newContent }
        });
        updatedCount++;
      }
    }
  }

  console.log(`Successfully seeded default section headers into ${updatedCount} blocks.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
