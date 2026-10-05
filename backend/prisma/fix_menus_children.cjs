const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixMenusChildren() {
  const translations = {
    // e20b36bb
    'Administration': 'प्रशासन',
    'Factory Staff': 'कारखाना कर्मचारी',
    'Guards': 'रक्षक',
    'Officers': 'अधिकारी',
    'Clothing & Bedding': 'कपडे आणि अंथरूण',
    'Food Supply': 'अन्न पुरवठा',
    'Sanitation': 'स्वच्छता',
    'Water Supply': 'पाणी पुरवठा',
    'Agriculture': 'शेती',
    'Bakery': 'बेकरी',
    'Carpentry': 'सुतारकाम',
    'Handloom': 'हातमाग',
    'CCTV Monitoring': 'सीसीटीव्ही मॉनिटरिंग',
    'Electricity': 'वीज',
    'Security Walls': 'सुरक्षा भिंती',
    'Watch Towers': 'वॉच टॉवर',

    // 5710dce2
    'Canteen': 'कॅन्टीन',
    'Family Visit': 'कौटुंबिक भेट',
    'Allen Smart Card Phone': 'अॅलन स्मार्ट कार्ड फोन',
    'Correspondence & Money Order': 'पत्रव्यवहार आणि मनीऑर्डर',
    'Free Legal Aid': 'मोफत कायदेशीर मदत',
    'District Legal Services (DLSA)': 'जिल्हा विधी सेवा प्राधिकरण',
    'Furlough & Parole Leave': 'फर्लो आणि पॅरोल रजा',
    'Remission': 'सवलत (Remission)',
    'Hirkani Room': 'हिरकणी कक्ष',
    'Gymnasium': 'व्यायामशाळा',
    'Wet Canteen': 'वेट कॅन्टीन',
    'Educational Facilities': 'शैक्षणिक सुविधा',
    'Library': 'ग्रंथालय',

    // 2c7d1c56
    'Enlightenment Program': 'प्रबोधन कार्यक्रम',
    'De-addiction Program': 'व्यसनमुक्ती कार्यक्रम',
    'Vocational Training': 'व्यावसायिक प्रशिक्षण',
    'Yoga & Meditation': 'योग आणि ध्यान',
    'Pranic Healing': 'प्राणिक हीलिंग',
    'Kirtan & Bhajan': 'कीर्तन आणि भजन',

    // a96b1787
    'Educational Study Visit': 'शैक्षणिक अभ्यास भेट',
    'Institutional Study Visit': 'संस्थात्मक अभ्यास भेट',
    'Officer Tours': 'अधिकारी दौरे',
    'Dignitary Visits': 'मान्यवर भेटी',
    'Inspection Tours': 'तपासणी दौरे',
    'Departmental Visits': 'विभागीय भेटी'
  };

  const menus = await prisma.menuItem.findMany();
  for (const m of menus) {
    let changed = false;
    
    if (m.groups && Array.isArray(m.groups)) {
      for (const group of m.groups) {
        if (group.children && Array.isArray(group.children)) {
            for (const child of group.children) {
                if (child.label_en && translations[child.label_en]) {
                    const isCorrupted = child.label_mr && (child.label_mr.includes('a??') || child.label_mr.includes('a?+'));
                    if (isCorrupted) {
                        child.label_mr = translations[child.label_en];
                        if(child.title && (child.title.includes('a??') || child.title.includes('a?+'))) {
                            child.title = translations[child.label_en];
                        }
                        changed = true;
                    }
                } else if (child.label_mr && (child.label_mr.includes('a??') || child.label_mr.includes('a?+'))) {
                    child.label_mr = "माहिती उपलब्ध नाही";
                    if(child.title && (child.title.includes('a??') || child.title.includes('a?+'))) {
                        child.title = "माहिती उपलब्ध नाही";
                    }
                    changed = true;
                }
            }
        }
      }
    }
    
    if (changed) {
      await prisma.menuItem.update({
        where: { id: m.id },
        data: { groups: m.groups }
      });
      console.log('Fixed MenuItem Children:', m.id);
    }
  }

  let c = 0;
  for (const m of await prisma.menuItem.findMany()) {
    if(JSON.stringify(m).includes('a??') || JSON.stringify(m).includes('a?+')) c++;
  }
  console.log('Remaining corrupted MenuItems:', c);
  prisma.$disconnect();
}
fixMenusChildren();
