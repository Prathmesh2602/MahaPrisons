const fs = require('fs');
const path = require('path');

const templateMap = {
  "BasicFeatureGrid": {
    "stats": { "mr": "दृष्टिक्षेपात", "en": "At a Glance" },
    "contactInfo": { "mr": "संपर्क साधा", "en": "Contact Us" },
    "applyAction": { "mr": "मदतीसाठी अर्ज करा", "en": "Apply for Aid" }
  },
  "ContentWithRightSidebar": {
    "contactInfo": { "mr": "संपर्क", "en": "Contact" }
  },
  "HeroBannerWithArticles": {
    "contactInfo": { "mr": "संपर्क माहिती", "en": "Contact Information" }
  },
  "HeroFeaturesTimelineLayout": {
    "keyFunctions": { "mr": "प्रमुख कार्ये", "en": "Key Functions" },
    "contactInfo": { "mr": "संपर्क माहिती", "en": "Contact Information" }
  },
  "HeroSplitTimeline": {
    "security": { "mr": "सुरक्षा व पायाभूत सुविधा", "en": "Security & Infrastructure" },
    "protocols": { "mr": "मुख्य प्रोटोकॉल", "en": "Core Protocols" },
    "infrastructure": { "mr": "पायाभूत सुविधा", "en": "Infrastructure" },
    "notice": { "mr": "महत्त्वाची सूचना", "en": "Important Notice" }
  },
  "HeroStatsGrid": {
    "category": { "mr": "दैनंदिन सुविधा", "en": "Daily Facilities" },
    "features": { "mr": "वैशिष्ट्ये आणि सुविधा", "en": "Features & Facilities" },
    "gallery": { "mr": "छायाचित्रे", "en": "Gallery" },
    "timings": { "mr": "वेळापत्रक", "en": "Timings" }
  },
  "HeroThreeColGrid": {
    "production": { "mr": "उत्पादन व उपक्रम", "en": "Production & Activities" },
    "impact": { "mr": "सामाजिक प्रभाव", "en": "Social Impact" }
  },
  "HeroWithPricingList": {
    "impact": { "mr": "प्रशिक्षण व सेवा", "en": "Training & Services" }
  },
  "HeroWithProcessGrid": {
    "stats": { "mr": "तांत्रिक प्रशिक्षण क्षेत्रे", "en": "Technical Training Areas" },
    "technicalFocus": { "mr": "उद्योग मानकांनुसार व्यावसायिक प्रशिक्षण.", "en": "Professional training as per industry standards." }
  },
  "SideBySideListCards": {
    "keyFunctions": { "mr": "सुविधेचे प्रकार", "en": "Types of Facilities" },
    "contactInfo": { "mr": "संपर्क माहिती", "en": "Contact Information" }
  }
};

const templatesDir = path.join(__dirname, 'web/src/templates');

let updatedFiles = 0;

for (const [templateName, blocks] of Object.entries(templateMap)) {
  const filePath = path.join(templatesDir, `${templateName}.jsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [blockName, { mr, en }] of Object.entries(blocks)) {
      // Look for the exact hardcoded string
      const searchStr = `language === 'mr' ? '${mr}' : '${en}'`;
      // Replace it with the dynamic logic
      const replaceStr = `data.sectionHeaders?.${blockName}?.title ? getTranslation(data.sectionHeaders.${blockName}.title) : (language === 'mr' ? '${mr}' : '${en}')`;

      // Make sure we haven't already replaced it
      if (content.includes(searchStr) && !content.includes(`data.sectionHeaders?.${blockName}?.title`)) {
        content = content.replace(searchStr, replaceStr);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Restored dynamic headers in ${templateName}.jsx`);
      updatedFiles++;
    }
  }
}

console.log(`Successfully restored dynamic section headers in ${updatedFiles} templates.`);
