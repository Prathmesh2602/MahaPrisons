const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixMenus() {
  const translations = {
    'Hero Section': 'मुख्य पृष्ठ',
    'Minister Profiles': 'मंत्र्यांचे प्रोफाईल',
    'About Us': 'आमच्याबद्दल',
    'Jail Insights': 'कारागृहाची माहिती',
    'Announcements': 'घोषणा',
    'Holiday Calendar': 'सुट्ट्यांचे कॅलेंडर',
    'Quick Services': 'नागरी सुविधा',
    'New Menu': 'नवीन मेनू',
    
    'Administrative Departments': 'प्रशासकीय विभाग',
    'Administration & Staff': 'प्रशासन आणि कर्मचारी',
    'Daily Amenities': 'दैनंदिन सुविधा',
    'Production & Activities': 'उत्पादन आणि उपक्रम',
    'Security & Infrastructure': 'सुरक्षा आणि पायाभूत सुविधा',
    
    'Facilities & Amenities': 'सोयी-सुविधा',
    'Visit & Contact': 'भेट आणि संपर्क',
    'Legal & Administrative': 'कायदेशीर आणि प्रशासकीय',
    'Health & Daily Utilities': 'आरोग्य आणि दैनंदिन सुविधा',
    'Education & Development': 'शिक्षण आणि विकास',
    
    'Cultural Activities': 'सांस्कृतिक उपक्रम',
    'Awareness & Enlightenment': 'जागृती आणि प्रबोधन',
    'Training & Personality Dev': 'प्रशिक्षण आणि व्यक्तिमत्व विकास',
    'Yoga & Spiritual Activities': 'योग आणि आध्यात्मिक उपक्रम',
    
    'Tours & Visits': 'दौरे व भेटी',
    'Study Visits': 'अभ्यास भेटी',
    'Administrative Tours': 'प्रशासकीय दौरे'
  };

  const menus = await prisma.menuItem.findMany();
  for (const m of menus) {
    let changed = false;
    
    if (m.label_en && translations[m.label_en]) {
      const isCorrupted = m.label_mr && (m.label_mr.includes('a??') || m.label_mr.includes('a?+'));
      if (isCorrupted) {
        m.label_mr = translations[m.label_en];
        changed = true;
      }
    }
    
    if (m.groups && Array.isArray(m.groups)) {
      for (const group of m.groups) {
        if (group.groupTitle_en && translations[group.groupTitle_en]) {
          const isCorrupted = group.groupTitle_mr && (group.groupTitle_mr.includes('a??') || group.groupTitle_mr.includes('a?+'));
          if (isCorrupted) {
            group.groupTitle_mr = translations[group.groupTitle_en];
            changed = true;
          }
        }
      }
    }
    
    if (changed) {
      await prisma.menuItem.update({
        where: { id: m.id },
        data: {
          label_mr: m.label_mr,
          groups: m.groups
        }
      });
      console.log('Fixed MenuItem:', m.id);
    }
  }

  let c = 0;
  for (const m of await prisma.menuItem.findMany()) {
    if(JSON.stringify(m).includes('a??') || JSON.stringify(m).includes('a?+')) c++;
  }
  console.log('Remaining corrupted MenuItems:', c);
  prisma.$disconnect();
}
fixMenus();
