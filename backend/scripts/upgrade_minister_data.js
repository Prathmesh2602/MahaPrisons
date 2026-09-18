const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function upgradeMinisterProfiles() {
  try {
    const block = await prisma.contentBlock.findFirst({
      where: { blockType: 'minister_profiles' }
    });

    if (block && block.content && Array.isArray(block.content)) {
      const newContent = block.content.map(profile => {
        // Only upgrade if it's currently a string
        const nameMr = typeof profile.name === 'string' ? profile.name : (profile.name?.mr || "");
        const desgMr = typeof profile.desg === 'string' ? profile.desg : (profile.desg?.mr || "");

        // Basic English mapping based on the Marathi string
        let nameEn = "";
        let desgEn = "";

        if (nameMr === "श्री. देवेंद्र फडणवीस") nameEn = "Shri. Devendra Fadnavis";
        else if (nameMr === "श्री. एकनाथ शिंदे") nameEn = "Shri. Eknath Shinde";
        else if (nameMr === "श्रीमती.सुनेत्रा पवार") nameEn = "Smt. Sunetra Pawar";
        else if (nameMr === "श्री. सुहास वारके") nameEn = "Shri. Suhas Warke";
        else if (nameMr === "श्री. योगेश देसाई") nameEn = "Shri. Yogesh Desai";
        else if (nameMr === "श्री. सुनील ढमाळ") nameEn = "Shri. Sunil Dhamal";
        else if (nameMr === "श्री. शामकांत शालन चंद्रकांत शेडगे") nameEn = "Shri. Shamkant Shedge";
        else nameEn = nameMr;

        if (desgMr === "माननीय मुख्यमंत्री महोदय") desgEn = "Hon'ble Chief Minister";
        else if (desgMr === "माननीय उपमुख्यमंत्री") desgEn = "Hon'ble Deputy Chief Minister";
        else if (desgMr === "Director General of Prisons and Correctional Services") {
           desgEn = desgMr;
           // The mr is actually in english in mockData!
           // desgMr = "अपर पोलीस महासंचालक व महानिरीक्षक"; 
        }
        else if (desgMr === "विशेष कारागृह महानिरीक्षक, महाराष्ट्र राज्य") desgEn = "Special Inspector General of Prisons, Maharashtra State";
        else if (desgMr === "कारागृह उपमहानिरीक्षक, पश्चिम विभाग, येरवडा") desgEn = "Deputy Inspector General of Prisons, Western Region, Yerawada";
        else if (desgMr === "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१") desgEn = "Superintendent, Yerawada Open District Prison, Class-I";
        else desgEn = desgMr;

        return {
          ...profile,
          name: { mr: nameMr, en: nameEn },
          desg: { mr: desgMr, en: desgEn },
          img: profile.img || profile.img_src, // make sure it's accessible as img or img_src
          img_src: profile.img_src || profile.img
        };
      });

      console.log('Upgrading minister_profiles block to bilingual format...');
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: newContent }
      });
      console.log('Minister Profiles block upgraded successfully to bilingual data!');
    }
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

upgradeMinisterProfiles();
