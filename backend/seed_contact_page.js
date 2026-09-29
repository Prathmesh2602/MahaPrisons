const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const defaultData = {
    title: { en: "Contact Us", mr: "संपर्क साधा" },
    subtitle: { en: "We'd love to hear from you. Please reach out with any inquiries.", mr: "आम्हाला तुमच्याकडून ऐकायला आवडेल. कृपया कोणत्याही चौकशीसाठी संपर्क साधा." },
    contactInfo: [
      { 
        icon: 'MapPin', 
        title: { en: "Headquarters", mr: "मुख्यालय" },
        text: { en: "Maharashtra Prison Department, Old Central Building, Pune - 411001", mr: "महाराष्ट्र कारागृह विभाग, जुनी मध्यवर्ती इमारत, पुणे - ४११००१" } 
      },
      { 
        icon: 'Phone', 
        title: { en: "Phone", mr: "दूरध्वनी" },
        text: { en: "020-26122580 / 26122606", mr: "०२०-२६१२२५८० / २६१२२६०६" } 
      },
      { 
        icon: 'Mail', 
        title: { en: "Email", mr: "ई-मेल" },
        text: { en: "addg.mahaprisons@mahagov.in", mr: "addg.mahaprisons@mahagov.in" } 
      },
      { 
        icon: 'Clock', 
        title: { en: "Working Hours", mr: "कामाचे तास" },
        text: { en: "Monday - Friday: 9:45 AM to 6:15 PM", mr: "सोमवार - शुक्रवार: सकाळी ९:४५ ते सायंकाळी ६:१५" } 
      }
    ],
    formLabels: {
      name: { en: "Full Name", mr: "पूर्ण नाव" },
      email: { en: "Email Address", mr: "ई-मेल पत्ता" },
      subject: { en: "Subject", mr: "विषय" },
      message: { en: "Your Message", mr: "तुमचा संदेश" },
      submit: { en: "Send Message", mr: "संदेश पाठवा" }
    }
  };

  const existing = await prisma.pageNode.findUnique({ where: { slug: 'contact' } });
  
  if (existing) {
    await prisma.pageNode.update({
      where: { slug: 'contact' },
      data: {
        layoutType: 'ContactUsLayout',
        title: 'Contact Us',
        contentBlocks: {
          deleteMany: {},
          create: [{ blockType: 'page_template_data', content: defaultData, order: 0 }]
        }
      }
    });
    console.log('Updated existing contact page in DB');
  } else {
    await prisma.pageNode.create({
      data: {
        slug: 'contact',
        title: 'Contact Us',
        layoutType: 'ContactUsLayout',
        isActive: true,
        contentBlocks: {
          create: [{ blockType: 'page_template_data', content: defaultData, order: 0 }]
        }
      }
    });
    console.log('Created new contact page in DB');
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
