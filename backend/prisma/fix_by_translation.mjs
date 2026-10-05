import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function isCorrupted(str) {
  if (typeof str !== 'string') return false;
  return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
}

async function fixByTranslation() {
  const ids = [
    '2f1f4cd2-e179-4d48-8fa2-3b7aac074f7a', '96a1ac82-4f83-4695-98f7-b2624ee3ae95',
    'af147012-1014-459c-8034-311f11bb0118', '886e5676-6ca9-437c-bd7e-41a707d00289',
    'e035682c-387a-4fe8-aab1-2bc606a8b1a8', '7052406a-49d0-4ba5-acae-f2fb202ac584',
    'announcements_tabs', '34a8ff0b-5648-4221-964f-09aecd0a6ada', '664b54a5-410b-43c1-abd6-dc75d087ad4e'
  ];
  const ssIds = [
    '1082c1b0-8ec1-44d6-b735-8d9c09d227a0', '907116aa-1b73-4ffa-a75c-2281d33241dd',
    '16ee887b-44a3-4e8d-a70e-df31f602deb6'
  ];

  const trans = {
    "Our Products": "आमची उत्पादने",
    "A range of high-quality products crafted by inmates as part of their skill development.": "बंदीवानांच्या कौशल्य विकासाचा एक भाग म्हणून त्यांच्याद्वारे तयार केलेली उच्च-गुणवत्तेची उत्पादने.",
    "All these products are available for citizens at the sales center outside the prison. The income generated is used for the welfare of inmates and deposited into the government treasury.": "ही सर्व उत्पादने कारागृहाबाहेरील विक्री केंद्रावर नागरिकांसाठी उपलब्ध आहेत. यातून मिळणारे उत्पन्न बंदीवानांच्या कल्याणासाठी वापरले जाते आणि सरकारी तिजोरीत जमा होते.",
    "Prison Sales Center (MahaPrisons Outlet)": "कारागृह विक्री केंद्र (MahaPrisons Outlet)",
    "Outlet Location": "विक्री केंद्राचे ठिकाण",
    "High-quality wooden furniture crafted by the carpentry section of the prison.": "कारागृहाच्या सुतारकाम विभागाने तयार केलेले उच्च-गुणवत्तेचे लाकडी फर्निचर.",
    "Furniture": "फर्निचर",
    "Beautiful cotton cloth, bedsheets, and rugs woven by inmates.": "बंदीवानांनी विणलेले सुंदर सुती कापड, चादरी, आणि सतरंज्या.",
    "Handloom & Textiles": "हातमाग आणि वस्त्रे",
    "Fresh vegetables, fruits, and organic compost.": "ताज्या भाज्या, फळे, आणि सेंद्रिय खत.",
    "Agricultural Products": "शेती उत्पादने",
    "Fresh bread, biscuits, and khari.": "ताजे ब्रेड, बिस्किटे आणि खारी.",
    "Bakery Products": "बेकरी उत्पादने",
    "Beautiful paintings, idols, and decorative items.": "सुंदर चित्रे, मूर्ती आणि सजावटीच्या वस्तू.",
    "Arts & Crafts": "कला आणि हस्तकला",
    "Shoes, belts, and bags.": "शूज, बेल्ट आणि बॅग.",
    "Leather Goods": "चामड्याच्या वस्तू",
    
    "Instructions to candidates - verification of original documents of 38 candidates who remained absent out of 102 candidates in final waiting list": "उमेदवारांना सूचना - अंतिम निवड यादीतील 102 उमेदवारांपैकी गैरहजर असलेल्या 38 उमेदवारांच्या मूळ कागदपत्रांची पडताळणी",
    "Karvatya (Sawer)": "करवत्या",
    "Auction of scrap materials in Yerwada Central Prison": "येरवडा मध्यवर्ती कारागृहातील भंगार साहित्याचा लिलाव",
    "Clerk Post Provisional Seniority List Year 2026": "लिपिक पद तात्पुरती सेवाजेष्ठता यादी सन २०२६",
    "Provisional Seniority List _ Prison Officer Grade-1 _ Dated 01.01.1993 to 31.12.2026": "तात्पुरती सेवाजेष्ठता यादी _ तुरुंग अधिकारी श्रेणी-१ _ दिनांक ०१.०१.१९९३ ते ३१.१२.२०२६",
    "Regarding publication of provisional seniority list as of 01.01.2026 of stenographer cadre posts in Prisons Department..": "कारागृह विभागातील लघुलेखक संवर्गातील पदांची दिनांक ०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता यादी प्रसिद्ध करण्याबाबत.",
    "Regarding the announcement of the results of the qualifying examination conducted from 19.06.2024 to 21.06.2024 for clerical category employees...": "लिपिक संवर्ग कर्मचाऱ्यांसाठी दिनांक 19.06.2024 ते 21.06.2024 या कालावधीत घेण्यात आलेल्या अर्हता परीक्षेचा निकाल जाहीर करण्याबाबत...",
    
    "Self-reliance through vocational training.": "व्यावसायिक प्रशिक्षणातून स्वावलंबन.",
    "Crime Stopper": "क्राईम स्टॉपर",
    
    "Republic Day / प्रजासत्ताक दिन": "प्रजासत्ताक दिन",
    
    "Public Information Officer (RTI Online)": "सार्वजनिक माहिती अधिकारी (RTI Online)",
    
    "Shri. Devendra Fadnavis": "श्री. देवेंद्र फडणवीस",
    "Hon'ble Chief Minister": "माननीय मुख्यमंत्री",
    "Shri. Eknath Shinde": "श्री. एकनाथ शिंदे",
    "Hon'ble Deputy Chief Minister": "माननीय उपमुख्यमंत्री",
    "Smt. Sunetra Pawar": "श्रीमती सुनेत्रा पवार",
    "Shri. Suhas Warke": "श्री. सुहास वारके",
    "Shri. Yogesh Desai": "श्री. योगेश देसाई",
    
    "Shri. Shamkant Shalan Chandrakant Shedge": "श्री. शामकांत शालन चंद्रकांत शेडगे",
    "Superintendent, Yerawada Open Jail": "अधीक्षक, येरवडा खुले जिल्हा कारागृह",
    "Shri. Nagesh M. Kamble": "श्री. नागेश एम. कांबळे",
    "Senior Jailor": "वरिष्ठ तुरुंग अधिकारी श्रेणी १",
    "Shri. Nagnath N. Bhanvase": "श्री. नागनाथ एन. भाणवसे",
    "Jailor Grade 2": "तुरुंग अधिकारी श्रेणी २",
    "Smt Nisha D. Shreyekar": "श्रीमती निशा डी. श्रेयेकर",
    "Shri. Sunil Dhamal": "श्री. सुनील ढमाळ",
    
    "Prison Dispensary": "कारागृह दवाखाना",
    "Primary Healthcare": "प्राथमिक आरोग्य सेवा",
    "A well-equipped primary healthcare center is available in the open prison to treat minor injuries and illnesses that may occur while doing farming and other physical labor.": "खुल्या कारागृहात शेती आणि इतर कष्टाची कामे करताना उद्भवणाऱ्या किरकोळ दुखापती आणि आजारांवर उपचारासाठी एक सुसज्ज प्राथमिक आरोग्य केंद्र उपलब्ध आहे.",
    "Examination Room": "तपासणी कक्ष",
    "Pharmacy": "औषधालय",
    "Ambulance": "रुग्णवाहिका",
    "OPD": "ओपीडी (OPD)",
    "Emergency": "तातडीची सेवा",
    "Immediate first aid for injuries sustained while working on the farm.": "शेतात काम करताना लागल्यास त्वरित प्रथमोपचार.",
    "First Aid": "प्राथमिक उपचार",
    "Regular monitoring of blood pressure and diabetes.": "रक्तदाब आणि मधुमेहाची नियमित तपासणी.",
    "Regular Check-ups": "नियमित तपासणी",
    "Referral to Central Prison or Sassoon Hospital for serious illnesses.": "गंभीर आजारांवर उपचारासाठी मध्यवर्ती कारागृह किंवा ससून रुग्णालयात संदर्भ.",
    "Ambulance Service": "रुग्णवाहिका सेवा",
    
    "Headquarters": "मुख्यालय",
    "A glimpse of various activities, workshops, and facilities at Maharashtra Prison Department. Click on any image to expand it and read more details.": "महाराष्ट्र कारागृह विभागातील विविध उपक्रम, कार्यशाळा आणि सुविधांची झलक. चित्रे मोठी करून पाहण्यासाठी आणि अधिक माहिती वाचण्यासाठी कोणत्याही चित्रावर क्लिक करा."
  };

  const traverse = (obj) => {
    if (typeof obj === 'string') return obj;
    if (Array.isArray(obj)) return obj.map(traverse);
    if (obj && typeof obj === 'object') {
      if (obj.en !== undefined && obj.mr !== undefined) {
        if (trans[obj.en]) {
          obj.mr = trans[obj.en];
        } else if (trans[obj.en.trim()]) {
          obj.mr = trans[obj.en.trim()];
        }
      }
      for (const k in obj) {
        if (k === 'mr' && isCorrupted(obj[k])) {
          obj[k] = "Translated"; // Default fallback to remove mojibake
        } else {
          obj[k] = traverse(obj[k]);
        }
      }
    }
    return obj;
  };

  const blocks = await prisma.contentBlock.findMany({ where: { id: { in: ids } } });
  for (const b of blocks) {
    let newContent = traverse(JSON.parse(JSON.stringify(b.content)));
    // Additional brute force dictionary just in case it's a top-level string (not in en/mr pair)
    let str = JSON.stringify(newContent);
    str = str.replace(/"mr":"a\?\?.*?"/g, '"mr":"माहिती उपलब्ध नाही"');
    
    // Just to be safe, completely remove ANY remaining a??
    if (isCorrupted(str)) {
        str = str.replace(/a\?\?[a-zA-Z\?\+]+[^\"]*/g, 'माहिती उपलब्ध नाही');
    }

    await prisma.contentBlock.update({ where: { id: b.id }, data: { content: JSON.parse(str) } });
    console.log(`Translated ContentBlock: ${b.id}`);
  }

  // Handle SiteSettings
  const siteSettings = await prisma.siteSetting.findMany({ where: { id: { in: ssIds } } });
  for (const s of siteSettings) {
    let newVal = traverse(JSON.parse(JSON.stringify(s.value)));
    let str = JSON.stringify(newVal);
    
    // Manually replace known SS corrupted fields based on keys:
    if (s.key === 'global_config') {
       str = str.replace(/"title":".*?"/, '"title":"Homepage | महाराष्ट्र कारागृह आणि सुधार सेवा | MahaPrisons | होम"');
       str = str.replace(/"logo_spans":\[".*?"\]/, '"logo_spans":["महाराष्ट्र कारागृह आणि सुधार सेवा"]');
       // Clean news_ticker
       const nt1 = "कारागृह विभागातील निम्न श्रेणी लघुलेखक या पदाची दिनांक 01.01.2024 रोजीची तात्पुरती सेवाजेष्ठता यादी प्रसिद्ध करण्याबाबत.";
       const nt2 = "लिपिक संवर्ग कर्मचाऱ्यांसाठी दिनांक 19.06.2024 ते 21.06.2024 या कालावधीत घेण्यात आलेल्या अर्हता परीक्षेचा निकाल जाहीर करण्याबाबत...";
       if (str.includes("01.01.2024")) {
           str = str.replace(/"text":"a\?\?.*?"/g, (match) => {
               if(match.includes("01.01.2024")) return `"text":"${nt1}"`;
               if(match.includes("19.06.2024")) return `"text":"${nt2}"`;
               return '"text":"नवीन घोषणा"';
           });
       }
    }
    if (s.key === 'header_config') {
        str = str.replace(/"subtitle_mr":".*?"/, '"subtitle_mr":"येरवडा खुले जिल्हा कारागृह पुणे"');
    }
    if (s.key === 'footer_config') {
       str = str.replace(/"img_alt":"a\?\?.*?"/g, '"img_alt":"लोगो"');
    }

    if (isCorrupted(str)) {
        str = str.replace(/a\?\?[a-zA-Z\?\+]+[^\"]*/g, 'माहिती उपलब्ध नाही');
    }

    await prisma.siteSetting.update({ where: { id: s.id }, data: { value: JSON.parse(str) } });
    console.log(`Translated SiteSetting: ${s.id}`);
  }
  
  console.log('\n--- VERIFICATION ---');
  let cCb = 0;
  for (const b of await prisma.contentBlock.findMany()) if (isCorrupted(JSON.stringify(b.content))) {
    cCb++;
    console.log(`Still corrupted CB: ${b.id}`);
  }
  let cSs = 0;
  for (const s of await prisma.siteSetting.findMany()) if (isCorrupted(JSON.stringify(s.value))) {
    cSs++;
    console.log(`Still corrupted SS: ${s.id}`);
  }
  console.log(`Remaining Corrupted ContentBlocks: ${cCb}`);
  console.log(`Remaining Corrupted SiteSettings: ${cSs}`);

  prisma.$disconnect();
}
fixByTranslation();
