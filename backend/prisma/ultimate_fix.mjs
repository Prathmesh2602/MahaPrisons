import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function ultimateFix() {
  const calendar = [
    { "date": "2026-01-26", "type": "gazetted", "title": "Republic Day / प्रजासत्ताक दिन" },
    { "date": "2026-02-19", "type": "gazetted", "title": "Chhatrapati Shivaji Maharaj Jayanti / छत्रपती शिवाजी महाराज जयंती" },
    { "date": "2026-02-26", "type": "gazetted", "title": "Mahashivratri / महाशिवरात्री" },
    { "date": "2026-03-14", "type": "gazetted", "title": "Holi / होळी" },
    { "date": "2026-03-19", "type": "gazetted", "title": "Gudi Padwa / गुढीपाडवा" },
    { "date": "2026-03-28", "type": "gazetted", "title": "Ram Navami / राम नवमी" },
    { "date": "2026-04-14", "type": "gazetted", "title": "Dr. Babasaheb Ambedkar Jayanti / डॉ. बाबासाहेब आंबेडकर जयंती" },
    { "date": "2026-04-03", "type": "gazetted", "title": "Good Friday / गुड फ्रायडे" },
    { "date": "2026-05-01", "type": "gazetted", "title": "Maharashtra Day / महाराष्ट्र दिन" },
    { "date": "2026-05-26", "type": "restricted", "title": "Buddha Purnima / बुद्ध पौर्णिमा" },
    { "date": "2026-06-25", "type": "restricted", "title": "Bakri Eid / बकरी ईद" },
    { "date": "2026-07-26", "type": "restricted", "title": "Moharram / मोहर्रम" },
    { "date": "2026-08-15", "type": "gazetted", "title": "Independence Day / स्वातंत्र्य दिन" },
    { "date": "2026-08-28", "type": "restricted", "title": "Raksha Bandhan / रक्षाबंधन" },
    { "date": "2026-09-14", "type": "gazetted", "title": "Ganesh Chaturthi / गणेश चतुर्थी" },
    { "date": "2026-09-25", "type": "restricted", "title": "Anant Chaturdashi / अनंत चतुर्दशी" },
    { "date": "2026-10-02", "type": "gazetted", "title": "Mahatma Gandhi Jayanti / महात्मा गांधी जयंती" },
    { "date": "2026-10-21", "type": "gazetted", "title": "Dussehra / दसरा" },
    { "date": "2026-11-08", "type": "gazetted", "title": "Diwali (Laxmi Pujan) / दिवाळी (लक्ष्मीपूजन)" },
    { "date": "2026-11-09", "type": "gazetted", "title": "Diwali Balipratipada / दिवाळी (बलिप्रतिपदा)" },
    { "date": "2026-11-10", "type": "gazetted", "title": "Bhaubeej / भाऊबीज" },
    { "date": "2026-11-23", "type": "restricted", "title": "Guru Nanak Jayanti / गुरुनानक जयंती" },
    { "date": "2026-12-25", "type": "gazetted", "title": "Christmas / नाताळ" }
  ];

  await prisma.contentBlock.update({ 
    where: { id: 'e035682c-387a-4fe8-aab1-2bc606a8b1a8' }, 
    data: { content: calendar } 
  });
  
  console.log('Fixed holiday_calendar');

  function isCorrupted(str) {
    if (typeof str !== 'string') return false;
    return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
  }

  let cCb = 0;
  for (const b of await prisma.contentBlock.findMany()) if (isCorrupted(JSON.stringify(b.content))) cCb++;
  let cSs = 0;
  for (const s of await prisma.siteSetting.findMany()) if (isCorrupted(JSON.stringify(s.value))) cSs++;
  
  console.log(`Remaining Corrupted ContentBlocks: ${cCb}`);
  console.log(`Remaining Corrupted SiteSettings: ${cSs}`);

  prisma.$disconnect();
}
ultimateFix();
