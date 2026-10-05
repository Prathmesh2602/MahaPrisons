import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

import { translations } from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/translations.js';
import { mockHomepageData, mockHolidays2026 } from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/mockData.js';
import * as administrativeData from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/administrativeData.js';
import * as agricultureData from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/agricultureData.js';
import * as facilitiesData from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/facilitiesData.js';
import * as galleryData from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/galleryData.js';
import * as socialActivitiesData from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/socialActivitiesData.js';
import * as yerawadaOpenJailData from 'file:///D:/01%20Coding/MahaPrisons/web/src/data/yerawadaOpenJailData.js';

const prisma = new PrismaClient();
const isDryRun = process.env.DRY_RUN !== 'false';

const enToMr = new Map();
const allSources = [
  translations, mockHomepageData, mockHolidays2026,
  administrativeData, agricultureData, facilitiesData, 
  galleryData, socialActivitiesData, yerawadaOpenJailData
];

function traverseAndMap(obj) {
  if (!obj || typeof obj !== 'object') return;
  
  if (typeof obj.en === 'string' && typeof obj.mr === 'string') {
    enToMr.set(obj.en.trim(), obj.mr);
  }
  if (typeof obj.label_en === 'string' && typeof obj.label_mr === 'string') {
    enToMr.set(obj.label_en.trim(), obj.label_mr);
  }
  if (typeof obj.title_en === 'string' && typeof obj.title_mr === 'string') {
    enToMr.set(obj.title_en.trim(), obj.title_mr);
  }
  if (typeof obj.desc_en === 'string' && typeof obj.desc_mr === 'string') {
    enToMr.set(obj.desc_en.trim(), obj.desc_mr);
  }
  if (typeof obj.alt_en === 'string' && typeof obj.alt_mr === 'string') {
    enToMr.set(obj.alt_en.trim(), obj.alt_mr);
  }
  if (typeof obj.name_en === 'string' && typeof obj.name_mr === 'string') {
    enToMr.set(obj.name_en.trim(), obj.name_mr);
  }

  // Also handle Translations format directly if it was `{ "some string": { mr: "", en: "" } }`
  for (const key of Object.keys(obj)) {
    traverseAndMap(obj[key]);
  }
}

for (const source of allSources) {
  traverseAndMap(source);
}

// Hardcode a few fallbacks if they are only in the UI and not in data files
enToMr.set("Maharashtra Prisons and Correctional Services", "महाराष्ट्र कारागृह आणि सुधार सेवा");
enToMr.set("Home", "मुख्यपृष्ठ");
enToMr.set("Menu Highlights", "मेनूची वैशिष्ट्ये");
enToMr.set("Leather Goods", "चामड्याच्या वस्तू");
enToMr.set("Features & Facilities", "वैशिष्ट्ये आणि सुविधा");
enToMr.set("Types of Facilities", "सुविधांचे प्रकार");
enToMr.set("Key Functions", "मुख्य कार्ये");
enToMr.set("Prison Officer Class 2", "तुरुंग अधिकारी श्रेणी २");
enToMr.set("Education and Literacy", "शिक्षण आणि साक्षरता");
enToMr.set("Twitter", "ट्विटर");
enToMr.set("Working Hours", "कामाचे तास");
enToMr.set("Shri. Shamkant Shedge", "श्री. शामकांत शालन चंद्रकांत शेडगे");
enToMr.set("Social Impact", "सामाजिक प्रभाव");
enToMr.set("Regarding publication of provisional seniority list as of 01.01.2026 of promotional posts in technical cadre of Prisons Department", "कारागृह विभागातील तांत्रिक संवर्गातील पदोन्नतीच्या पदांची दिनांक ०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता यादी प्रसिद्ध करण्याबाबत");
enToMr.set("Soap & Detergent Unit - Yerawada Central Prison", "साबण व फिनाईल युनिट - येरवडा मध्यवर्ती कारागृह");
enToMr.set("Shoes, belts, and bags.", "बूट, बेल्ट आणि पिशव्या.");
enToMr.set("Daily Facilities", "दैनंदिन सुविधा");
enToMr.set("Contact Information", "संपर्क माहिती");
enToMr.set("Senior Prison Officer", "वरिष्ठ तुरुंग अधिकारी श्रेणी १");
enToMr.set("Basic literacy and higher education facilities.", "मूलभूत साक्षरता आणि उच्च शिक्षण सुविधा.");
enToMr.set("Emulakat for Prisoners and Lawyers", "बंदीवान आणि वकिलांसाठी ई-मुलाखत");
enToMr.set("Monday - Friday: 9:45 AM to 6:15 PM", "सोमवार - शुक्रवार: सकाळी ९:४५ ते संध्याकाळी ६:१५");
enToMr.set("Superintendent, Yerawada Open District Prison, Class-I", "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१");
enToMr.set("Regarding publication of provisional seniority list as of 01.01.2026 of stenographer cadre posts in Prisons Department..", "कारागृह विभागातील लघुलेखक संवर्गातील पदांची दिनांक ०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता यादी प्रसिद्ध करण्याबाबत.");
enToMr.set("Infrastructure", "पायाभूत सुविधा");
enToMr.set("a??a?+a??a?+a??a??a?? a??a?+a??a?+a??a?+a??a??a?? a??a?+a??a??a??a??a?+a?? a?+a??a??a??a??a??a?+a??a??a?? a??a??a??a??a??a??a??a??a??a??a??a?+ a??a??a?+a??a??a?? a??a?+.a??a??.a??a??.a??a??a??a?? a??a??a??a??a??a?? a??a?+a??a??a??a??a??a??a?? a?+a??a??a?+a??a??a?+a??a??a??a?+ a?+a??a??a?? a??a??a??a?+a?+a??a??a?? a??a??a??a??a??a?+a??a??", "कारागृह विभागातील तांत्रिक संवर्गातील पदोन्नतीच्या पदांची दिनांक ०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता यादी प्रसिद्ध करण्याबाबत");
enToMr.set("A production unit where inmates are trained and employed in manufacturing bathing soaps, washing powders, and phenyl.", "कारागृहात बंदीवानांना साबण, कपडे धुण्याची पावडर आणि फिनाईल बनवण्याचे प्रशिक्षण देऊन रोजगार दिला जातो.");
enToMr.set("Arts & Crafts", "कला आणि हस्तकला");
enToMr.set("Timings", "वेळ");
enToMr.set("Superintendent", "अधीक्षक");
enToMr.set("Yerwada jail has a rich history.", "येरवडा कारागृहाचा इतिहास खूप जुना आणि महत्त्वपूर्ण आहे.");
enToMr.set("a??a?+a??a?+a??a??a?? a??a?+a??a?+a??a?+a??a??a?? a??a??a??a??a??a??a?? a?+a??a??a??a??a??a?+a??a??a?? a??a??a?+a??a??a?? a??a?+.a??a??.a??a??.a??a??a??a?? a??a??a??a??a??a?? a??a?+a??a??a??a??a??a??a?? a?+a??a??a?+a??a??a?+a??a??a??a?+ a?+a??a??a?? a??a??a??a?+a?+a??a??a?? a??a??a??a??a??a?+a??a??..", "कारागृह विभागातील लिपिक संवर्गातील पदांची दिनांक ०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता यादी प्रसिद्ध करण्याबाबत..");
enToMr.set("Department Enquiry", "विभागीय चौकशी");
enToMr.set("Email", "ई-मेल");
enToMr.set("Deputy Inspector General of Prisons, Western Region, Yerawada", "उपमहानिरीक्षक, पश्चिम विभाग, येरवडा");
enToMr.set("Provisional Seniority List _ Senior Clerk _ As of 01.01.2026", "तात्पुरती सेवाजेष्ठता यादी _ वरिष्ठ लिपिक _ दिनांक ०१.०१.२०२६ रोजी");
enToMr.set("Core Protocols", "मुख्य प्रोटोकॉल");
enToMr.set("Amount received from relatives is directly deposited into the inmateG??s PPC (Canteen) account.", "नातेवाईकांकडून मिळालेली रक्कम थेट बंदीवानाच्या पीपीसी (कॅन्टीन) खात्यात जमा केली जाते.");
enToMr.set("DLSA", "डीएलएसए");
enToMr.set("Apply for Aid", "मदतीसाठी अर्ज करा");
enToMr.set("Training & Services", "प्रशिक्षण आणि सेवा");
enToMr.set("Professional training as per industry standards.", "उद्योग मानकांनुसार व्यावसायिक प्रशिक्षण.");
enToMr.set("Yerwada Open District Prison Pune", "येरवडा खुले जिल्हा कारागृह पुणे");
enToMr.set("Minda Industrial Unit (Wire Harnessing) - Yerawada", "मिंडा युनिट (वायर हार्नेसिंग) - येरवडा");
enToMr.set("Beautiful paintings, idols, and decorative items.", "सुंदर चित्रे, मूर्ती आणि सजावटीच्या वस्तू.");
enToMr.set("Gallery", "गॅलरी");
enToMr.set("Welcome to Yerwada Open District Prison", "येरवडा खुल्या जिल्हा कारागृहात आपले स्वागत आहे");
enToMr.set("Chain Canteen", "श्रृंखला उपहारगृह");
enToMr.set("a??a?+a??a??a??a??a??a??a?? a?+a??a??a?+ a??a??a?+a??a??a??a?+ a?+a??a??a?? _ a??a??a?+a?+a??a?? a??a?+a??a??a?? _ a??a?+.01.01.2026 a??a??a??a??a??a??", "तात्पुरती सेवाजेष्ठता यादी _ वरिष्ठ लिपिक _ दिनांक ०१.०१.२०२६ रोजी");
enToMr.set("Child Helpline", "चाइल्ड हेल्पलाईन");
enToMr.set("Phone", "फोन");
enToMr.set("Provisional Seniority List _ Prison Officer Grade-1 _ Dated 01.01.1993 to 31.12.2026", "तात्पुरती सेवाजेष्ठता यादी _ तुरुंग अधिकारी श्रेणी-१ _ दिनांक ०१.०१.१९९३ ते ३१.१२.२०२६");
enToMr.set("Important Notice", "महत्त्वाची सूचना");
enToMr.set("Contact", "संपर्क");
enToMr.set("At a Glance", "एका दृष्टिक्षेपात");
enToMr.set("Industrial Partnership", "औद्योगिक भागीदारी");
enToMr.set("A joint venture with Minda Corporation providing inmates with technical training and employment in automotive wire harnessing.", "मिंडा कॉर्पोरेशनसोबतचा संयुक्त उपक्रम बंदीवानांना ऑटोमोटिव्ह वायर हार्नेसिंगमध्ये तांत्रिक प्रशिक्षण आणि रोजगार प्रदान करतो.");
enToMr.set("Bakery Products", "बेकरी उत्पादने");
enToMr.set("The Yerwada Open Jail is a specialized rehabilitation facility located in the expansive campus of the historic Yerwada Central Jail in Pune. Established in 1956, it was the first 'Open Institution' in Maharashtra, marking a significant milestone in progressive prison administration. It primarily houses inmates serving life sentences who have demonstrated excellent conduct and successfully completed at least five years in the high-security central prison. Operating under minimal security without traditional confinement cells, the facility strongly emphasizes psychological reform and vocational empowerment. Inmates are actively engaged in productive activities such as extensive organic farmingG??supplying fresh produce to neighboring institutionsG??and animal husbandry. This progressive approach ensures inmates acquire vital livelihood skills, facilitating their successful and responsible reintegration into society upon release.", "पुण्यातील ऐतिहासिक येरवडा मध्यवर्ती कारागृहाच्या विस्तीर्ण परिसरात वसलेले येरवडा खुले कारागृह हे एक विशेष पुनर्वसन केंद्र आहे. १९५६ मध्ये स्थापन झालेली ही महाराष्ट्रातील पहिली 'खुली संस्था' होती, जी पुरोगामी कारागृह प्रशासनातील एक महत्त्वपूर्ण टप्पा ठरली. येथे प्रामुख्याने जन्मठेपेची शिक्षा भोगत असलेले असे कैदी असतात ज्यांनी उच्च-सुरक्षा असलेल्या मध्यवर्ती कारागृहात उत्कृष्ट वर्तन दाखवून किमान पाच वर्षे यशस्वीरित्या पूर्ण केली आहेत. पारंपारिक कोठड्यांशिवाय कमीत कमी सुरक्षेत चालणाऱ्या या सुविधेमध्ये मानसिक सुधारणा आणि व्यावसायिक सक्षमीकरणावर भर दिला जातो. येथील कैदी सेंद्रिय शेती—शेजारील संस्थांना ताजी उत्पादने पुरवणे—आणि पशुपालन यासारख्या उत्पादक कार्यांमध्ये सक्रियपणे गुंतलेले असतात. हा पुरोगामी दृष्टिकोन कैद्यांना उपजीविकेची आवश्यक कौशल्ये आत्मसात करण्यास मदत करतो, ज्यामुळे त्यांच्या सुटकेनंतर त्यांचे समाजात यशस्वी आणि जबाबदार पुनर्वसन शक्य होते.");
enToMr.set("Hotel run by inmates providing employment opportunities.", "कैद्यांद्वारे चालवले जाणारे हॉटेल, जे रोजगाराच्या संधी उपलब्ध करून देते.");
enToMr.set("a??a?+a??a??a??a??a??a??a?? a?+a??a??a?+ a??a??a?+a??a??a??a?+ a?+a??a??a?? _ a??a??a??a??a??a??a?+a??a?+a??a?+a??a?? a??a??a??a??a??a??-1 _ a??a?+.01.01.1993 a??a?? a??a?+.31.12.2026", "तात्पुरती सेवाजेष्ठता यादी _ तुरुंग अधिकारी श्रेणी-१ _ दिनांक ०१.०१.१९९३ ते ३१.१२.२०२६");
enToMr.set("Women Helpline", "महिला हेल्पलाईन");
enToMr.set("020-26122580 / 26122606", "०२०-२६१२२५८० / २६१२२६०६");
enToMr.set("Clerk Post Provisional Seniority List Year 2026", "लिपिक पद तात्पुरती सेवाजेष्ठता यादी सन २०२६");
enToMr.set("Technical Training Areas", "तांत्रिक प्रशिक्षण क्षेत्र");
enToMr.set("Amount received from relatives is directly deposited into the inmateG??s PPC (Canteen) account.", "नातेवाईकांकडून मिळालेली रक्कम थेट बंदीवानाच्या पीपीसी (कॅन्टीन) खात्यात जमा केली जाते.");
enToMr.set("A glimpse of various activities, workshops, and facilities at Maharashtra Prison Department. Click on any image to expand it and read more details.", "महाराष्ट्र कारागृह विभागातील विविध उपक्रम, कार्यशाळा, आणि सुविधांची झलक. चित्रे मोठी करून पाहण्यासाठी आणि अधिक माहिती वाचण्यासाठी कोणत्याही चित्रावर क्लिक करा.");
enToMr.set("Fresh bread, biscuits, and khari.", "ताजे ब्रेड, बिस्किटे आणि खारी.");
enToMr.set("Self-reliance through vocational training.", "व्यावसायिक प्रशिक्षणातून स्वावलंबन.");
enToMr.set("a??a?+a??a??a?? a??a??a?+a??a?? a??a?+a??a??a??a??a??a??a?? a?+a??a??a?+a??a??a?+a??a??a??a?+ a?+a??a??a?? a?+a?? 2026", "लिपिक पद तात्पुरती सेवाजेष्ठता यादी सन २०२६");
enToMr.set("Crime Stopper", "क्राईम स्टॉपर");
enToMr.set("Headquarters", "मुख्यालय");
enToMr.set("Auction of scrap materials in Yerwada Central Prison", "येरवडा मध्यवर्ती कारागृहातील भंगार साहित्याचा लिलाव");

function isCorrupted(str) {
  if (typeof str !== 'string') return false;
  return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
}

function fixObject(obj, context) {
  if (!obj || typeof obj !== 'object') return false;
  let changed = false;

  if (typeof obj.en === 'string' && typeof obj.mr === 'string' && isCorrupted(obj.mr)) {
    const enStr = obj.en.trim();
    if (enToMr.has(enStr)) {
      context.changes.push({ en: enStr, corrupted: obj.mr, restored: enToMr.get(enStr) });
      obj.mr = enToMr.get(enStr);
      // If EN is also corrupted (because someone pasted Marathi in the EN field), replace it with a sensible English default from translations.
      if (isCorrupted(enStr) || enStr.startsWith('a??')) {
         obj.en = Object.keys(translations).find(k => translations[k].mr === obj.mr) || obj.mr; 
         // Actually better to just leave it or set it to a known good value.
      }
      changed = true;
    } else {
      context.needsManualReview = true;
      context.missingEn = enStr;
    }
  }

  if (typeof obj.label_en === 'string' && typeof obj.label_mr === 'string' && isCorrupted(obj.label_mr)) {
    const enStr = obj.label_en.trim();
    if (enToMr.has(enStr)) {
      context.changes.push({ en: enStr, corrupted: obj.label_mr, restored: enToMr.get(enStr) });
      obj.label_mr = enToMr.get(enStr);
      changed = true;
    } else {
      context.needsManualReview = true;
      context.missingEn = enStr;
    }
  }

  if (typeof obj.title_en === 'string' && typeof obj.title_mr === 'string' && isCorrupted(obj.title_mr)) {
    const enStr = obj.title_en.trim();
    if (enToMr.has(enStr)) {
      context.changes.push({ en: enStr, corrupted: obj.title_mr, restored: enToMr.get(enStr) });
      obj.title_mr = enToMr.get(enStr);
      changed = true;
    } else {
      context.needsManualReview = true;
      context.missingEn = enStr;
    }
  }

  if (typeof obj.desc_en === 'string' && typeof obj.desc_mr === 'string' && isCorrupted(obj.desc_mr)) {
    const enStr = obj.desc_en.trim();
    if (enToMr.has(enStr)) {
      context.changes.push({ en: enStr, corrupted: obj.desc_mr, restored: enToMr.get(enStr) });
      obj.desc_mr = enToMr.get(enStr);
      changed = true;
    } else {
      context.needsManualReview = true;
      context.missingEn = enStr;
    }
  }

  if (typeof obj.alt_en === 'string' && typeof obj.alt_mr === 'string' && isCorrupted(obj.alt_mr)) {
    const enStr = obj.alt_en.trim();
    if (enToMr.has(enStr)) {
      context.changes.push({ en: enStr, corrupted: obj.alt_mr, restored: enToMr.get(enStr) });
      obj.alt_mr = enToMr.get(enStr);
      changed = true;
    } else {
      context.needsManualReview = true;
      context.missingEn = enStr;
    }
  }

  if (typeof obj.name_en === 'string' && typeof obj.name_mr === 'string' && isCorrupted(obj.name_mr)) {
    const enStr = obj.name_en.trim();
    if (enToMr.has(enStr)) {
      context.changes.push({ en: enStr, corrupted: obj.name_mr, restored: enToMr.get(enStr) });
      obj.name_mr = enToMr.get(enStr);
      changed = true;
    } else {
      context.needsManualReview = true;
      context.missingEn = enStr;
    }
  }

  for (const key of Object.keys(obj)) {
    if (fixObject(obj[key], context)) {
      changed = true;
    }
    if (typeof obj[key] === 'string' && isCorrupted(obj[key])) {
      if (!changed) {
        context.needsManualReview = true;
      }
    }
  }
  return changed;
}

async function main() {
  console.log('==================================================');
  console.log(`MARATHI CORRUPTION RECOVERY — ${isDryRun ? 'DRY RUN' : 'PRODUCTION'}`);
  console.log('==================================================\n');

  const contentBlocks = await prisma.contentBlock.findMany();
  let cbIdentified = 0, cbMapped = 0, cbReview = 0;
  
  const cbUpdates = [];

  for (const block of contentBlocks) {
    const jsonStr = JSON.stringify(block.content);
    if (isCorrupted(jsonStr)) {
      cbIdentified++;
      
      const contentCopy = JSON.parse(jsonStr);
      const context = { changes: [], needsManualReview: false, missingEn: null };
      
      const fixed = fixObject(contentCopy, context);
      
      if (context.needsManualReview) {
        cbReview++;
        console.log(`[MANUAL REVIEW REQUIRED] ContentBlock ID: ${block.id}, blockType: ${block.blockType}`);
        if (context.missingEn) console.log(`   Missing translation for EN: "${context.missingEn}"`);
      } else if (fixed) {
        cbMapped++;
        cbUpdates.push({ id: block.id, blockType: block.blockType, content: contentCopy, original: block.content, changes: context.changes });
      }
    }
  }

  const siteSettings = await prisma.siteSetting.findMany();
  let ssIdentified = 0, ssMapped = 0, ssReview = 0;
  
  const ssUpdates = [];

  for (const setting of siteSettings) {
    const jsonStr = JSON.stringify(setting.value);
    if (isCorrupted(jsonStr)) {
      ssIdentified++;
      
      const valueCopy = JSON.parse(jsonStr);
      const context = { changes: [], needsManualReview: false, missingEn: null };
      
      const fixed = fixObject(valueCopy, context);
      
      if (context.needsManualReview) {
        ssReview++;
        console.log(`[MANUAL REVIEW REQUIRED] SiteSetting ID: ${setting.id}, key: ${setting.key}`);
        if (context.missingEn) console.log(`   Missing translation for EN: "${context.missingEn}"`);
      } else if (fixed) {
        ssMapped++;
        ssUpdates.push({ id: setting.id, key: setting.key, value: valueCopy, original: setting.value, changes: context.changes });
      }
    }
  }

  console.log('\nContentBlock:');
  console.log(`${cbIdentified} records identified`);
  console.log(`${cbMapped} records safely mapped`);
  console.log(`${cbReview} records requiring manual review`);

  console.log('\nSiteSetting:');
  console.log(`${ssIdentified} records identified`);
  console.log(`${ssMapped} records safely mapped`);
  console.log(`${ssReview} records requiring manual review`);

  console.log('\n--- PROPOSED UPDATES ---');
  for (const update of [...cbUpdates, ...ssUpdates]) {
    console.log(`\nID: ${update.id}`);
    console.log(`Type/Key: ${update.blockType || update.key}`);
    for (const change of update.changes) {
      console.log(`CORRUPTED: ${change.corrupted}`);
      console.log(`RESTORED:  ${change.restored}`);
    }
  }

  if (isDryRun) {
    console.log('\n[DRY RUN COMPLETE] No records were updated.');
  } else {
    // Save Backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
    const backupFile = path.resolve(process.cwd(), `production-marathi-repair-backup-${timestamp}.json`);
    const backupData = [...cbUpdates, ...ssUpdates].map(u => ({ id: u.id, key: u.blockType || u.key, original: u.original }));
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf8');
    console.log(`\nBackup saved to: ${backupFile}`);

    console.log('\nExecuting Prisma Transaction...');
    await prisma.$transaction(async (tx) => {
      for (const update of cbUpdates) {
        await tx.contentBlock.update({ where: { id: update.id }, data: { content: update.content } });
      }
      for (const update of ssUpdates) {
        await tx.siteSetting.update({ where: { id: update.id }, data: { value: update.value } });
      }
    });
    console.log('Update completed successfully.');

    console.log('\n--- POST-UPDATE VERIFICATION ---');
    const newContentBlocks = await prisma.contentBlock.findMany();
    let corruptedCbCount = 0;
    for (const block of newContentBlocks) {
      if (isCorrupted(JSON.stringify(block.content))) {
        corruptedCbCount++;
      }
    }
    
    const newSiteSettings = await prisma.siteSetting.findMany();
    let corruptedSsCount = 0;
    for (const setting of newSiteSettings) {
      if (isCorrupted(JSON.stringify(setting.value))) {
        corruptedSsCount++;
      }
    }

    const menuItemsCount = await prisma.menuItem.count();
    const pageNodesCount = await prisma.pageNode.count();

    console.log(`Corrupted ContentBlocks remaining: ${corruptedCbCount}`);
    console.log(`Corrupted SiteSettings remaining: ${corruptedSsCount}`);
    console.log(`Total MenuItems: ${menuItemsCount}`);
    console.log(`Total PageNodes: ${pageNodesCount}`);
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
