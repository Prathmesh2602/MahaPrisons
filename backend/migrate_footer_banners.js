const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const globalConf = await prisma.siteSetting.findUnique({ where: { key: 'global_config' } });
  const footerConf = await prisma.siteSetting.findUnique({ where: { key: 'footer_config' } });

  if (globalConf && globalConf.value && globalConf.value.footer_banners) {
    const footerData = footerConf ? footerConf.value : {};
    
    // Only migrate if not already there
    if (!footerData.footer_banners) {
      footerData.footer_banners = globalConf.value.footer_banners;
      await prisma.siteSetting.upsert({
        where: { key: 'footer_config' },
        update: { value: footerData },
        create: { key: 'footer_config', value: footerData }
      });
      console.log('Successfully migrated footer_banners to footer_config.');
    } else {
      console.log('footer_banners already exists in footer_config.');
    }
  } else {
    console.log('No footer_banners found in global_config to migrate.');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
