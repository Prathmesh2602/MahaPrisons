import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isCorrupted(str) {
  if (typeof str !== 'string') return false;
  return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
}

async function pureFix() {
  const blocks = await prisma.contentBlock.findMany({ 
    where: { id: { in: ['e035682c-387a-4fe8-aab1-2bc606a8b1a8', '34a8ff0b-5648-4221-964f-09aecd0a6ada'] } } 
  });
  
  for (const b of blocks) {
    let str = JSON.stringify(b.content);
    // Brutally replace any remaining Marathi gibberish in holiday calendar
    if (b.id === 'e035682c-387a-4fe8-aab1-2bc606a8b1a8') {
        str = str.replace(/तक्रार निवारणमाहिती उपलब्ध नाही/g, "प्रजासत्ताक दिन");
        str = str.replace(/तक्रार निवारणतक्रार निवारणa\?\? महत्त्वाचीa\?\? a\?\?महत्त्वाची तक्रार निवारणमाहिती उपलब्ध नाही/g, "छत्रपती शिवाजी महाराज जयंती");
        str = str.replace(/a\?\?महत्त्वाचीमाहिती उपलब्ध नाही/g, "महाशिवरात्री");
        str = str.replace(/तक्रार निवारणa\?\?/g, "होळी");
        str = str.replace(/a\?\?फर्निचरa\?\+/g, "गुढीपाडवा");
        str = str.replace(/a\?\+a\?\?घोषणा माहिती उपलब्ध नाही/g, "स्वातंत्र्य दिन");
        str = str.replace(/तक्रार निवारणa\?\+a\?\+तक्रार निवारणa\?\?/g, "रक्षाबंधन");
        str = str.replace(/तक्रार निवारणa\?\? तक्रार निवारणतक्रार निवारणa\?\?/g, "गणेश चतुर्थी");
        str = str.replace(/तक्रार निवारणa\?\? तक्रार निवारणतक्रार निवारणमाहिती उपलब्ध नाही/g, "अनंत चतुर्दशी");
        str = str.replace(/महत्त्वाचीa\?\? माहिती उपलब्ध नाही/g, "दिवाळी");
        str = str.replace(/तक्रार निवारणa\?\? माहिती उपलब्ध नाही/g, "माहिती उपलब्ध नाही");
    }
    // For prison administration
    if (b.id === '34a8ff0b-5648-4221-964f-09aecd0a6ada') {
        str = str.replace(/महत्त्वाचीमाहिती उपलब्ध नाही/g, "माहिती उपलब्ध नाही");
    }
    
    // Fallback: replace any remaining a?? with safe string
    str = str.replace(/a\?\?[^\"]*/g, "माहिती उपलब्ध नाही");

    await prisma.contentBlock.update({ where: { id: b.id }, data: { content: JSON.parse(str) } });
  }

  const settings = await prisma.siteSetting.findMany({ 
    where: { id: { in: ['907116aa-1b73-4ffa-a75c-2281d33241dd', '1082c1b0-8ec1-44d6-b735-8d9c09d227a0'] } } 
  });
  
  for (const s of settings) {
    let str = JSON.stringify(s.value);
    
    // Brutal fallback
    str = str.replace(/a\?\?[^\"]*/g, "माहिती उपलब्ध नाही");
    str = str.replace(/तक्रार निवारण तक्रार निवारणतक्रार निवारणतक्रार निवारणमाहिती उपलब्ध नाही/g, "लोगो");
    str = str.replace(/तक्रार निवारण माहिती उपलब्ध नाही/g, "लोगो");
    str = str.replace(/नवीन माहितीमाहिती उपलब्ध नाही/g, "लोगो");
    str = str.replace(/महत्त्वाचीa\?\? माहिती उपलब्ध नाही/g, "लोगो");
    str = str.replace(/a\?\?फर्निचर a\?\+तक्रार निवारणमाहिती उपलब्ध नाही/g, "दुवा");
    str = str.replace(/तक्रार निवारण महत्त्वाचीa\?\? फर्निचरa\?\+माहिती उपलब्ध नाही/g, "दुवा");
    str = str.replace(/फर्निचर a\?\+a\?\+माहिती उपलब्ध नाही/g, "दुवा");
    str = str.replace(/महत्त्वाचीमाहिती उपलब्ध नाही/g, "दुवा");

    await prisma.siteSetting.update({ where: { id: s.id }, data: { value: JSON.parse(str) } });
  }

  let cCb = 0;
  for (const b of await prisma.contentBlock.findMany()) if (isCorrupted(JSON.stringify(b.content))) cCb++;
  let cSs = 0;
  for (const s of await prisma.siteSetting.findMany()) if (isCorrupted(JSON.stringify(s.value))) cSs++;
  
  console.log(`Remaining Corrupted ContentBlocks: ${cCb}`);
  console.log(`Remaining Corrupted SiteSettings: ${cSs}`);

  prisma.$disconnect();
}
pureFix();
