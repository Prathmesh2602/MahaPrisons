import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixMarathiData() {
  console.log('Fixing Marathi translations in prison_administration...');

  const block = await prisma.contentBlock.findFirst({
    where: { blockType: 'prison_administration' }
  });

  if (block) {
    const data = block.content;
    
    // Correct mappings
    const corrections = {
      'Shri. Shamkant Shalan Chandrakant Shedge': 'श्री. शामकांत शालन चंद्रकांत शेडगे',
      'Shri. Nagesh M. Kamble': 'श्री. नागेश एम. कांबळे',
      'Shri. Nagnath N. Bhanvase': 'श्री. नागनाथ एन. भाणवसे',
      'Smt. Nisha D. Shreyakar': 'श्रीमती निशा डी. श्रेयेकर',
      'Smt. Nita Uke': 'श्रीमती नीता उके',
      'Smt. Sneha Dalal': 'श्रीमती स्नेहा दलाल',
      'Shri. Govind Gawade': 'श्री. गोविंद गावडे',
      'Shri. Pravin Khuspe': 'श्री. प्रवीण खुस्पे',
      'Shri. Sunil Gayakwad': 'श्री. सुनील गायकवाड',
      'Shri. Balaji Sawant': 'श्री. बालाजी सावंत',
      'Shri. Datta Chavan': 'श्री. दत्ता चव्हाण',
      'Shri. Chandrakant Khandve': 'श्री. चंद्रकांत खांडवे'
    };

    const roleCorrections = {
      'Superintendent, Yerawada Open Jail': 'अधीक्षक, येरवडा खुले जिल्हा कारागृह',
      'Senior Jailor': 'वरिष्ठ तुरुंग अधिकारी श्रेणी १',
      'Jailor Grade 2': 'तुरुंग अधिकारी श्रेणी २',
      'Office Superintendent': 'कार्यालयीन अधीक्षक',
      'Senior Clerk': 'वरिष्ठ लिपिक',
      'Clerk': 'लिपिक',
      'Subhedar': 'सुभेदार'
    };

    if (data && data.staff) {
      data.staff.forEach(member => {
        if (member.name?.en && corrections[member.name.en]) {
          member.name.mr = corrections[member.name.en];
        }
        if (member.role?.en && roleCorrections[member.role.en]) {
          member.role.mr = roleCorrections[member.role.en];
        }
      });

      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: data }
      });
      console.log('Fixed DB successfully!');
    }
  }

  await prisma.$disconnect();
}

fixMarathiData().catch(console.error);
