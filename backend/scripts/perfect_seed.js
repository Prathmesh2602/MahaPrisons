const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const path = require('path');
const url = require('url');

const bilingualMap = {
  // Important Links
  "National Portal of India": { mr: "भारताचे राष्ट्रीय पोर्टल", en: "National Portal of India" },
  "महाराष्ट्र शासन": { mr: "महाराष्ट्र शासन", en: "Government of Maharashtra" },
  "महाराष्ट्र पर्यटन": { mr: "महाराष्ट्र पर्यटन", en: "Maharashtra Tourism" },
  "Aaple Sarkar": { mr: "आपले सरकार", en: "Aaple Sarkar" },
  "RTI Online": { mr: "माहिती अधिकार ऑनलाईन (RTI Online)", en: "RTI Online" },
  "Maharashtra E-Tender": { mr: "महाराष्ट्र ई-टेंडर", en: "Maharashtra E-Tender" },
  "Department Enquiry": { mr: "विभागीय चौकशी", en: "Department Enquiry" },
  "Emulakat for Prisoners and Lawyers": { mr: "कैदी आणि वकिलांसाठी ई-मुलाकात", en: "Emulakat for Prisoners and Lawyers" },
  "ट्विटर": { mr: "ट्विटर", en: "Twitter" },
  "Instagram": { mr: "इन्स्टाग्राम", en: "Instagram" },
  "फेसबुक": { mr: "फेसबुक", en: "Facebook" },
  
  // Helplines
  "Citizen’s Call center": { mr: "नागरिक कॉल सेंटर", en: "Citizen’s Call center" },
  "Emergency Police": { mr: "आपत्कालीन पोलीस", en: "Emergency Police" },
  "Emergency Helpline": { mr: "आपत्कालीन हेल्पलाइन", en: "Emergency Helpline" },
  "Crime Stopper": { mr: "क्राईम स्टॉपर", en: "Crime Stopper" },
  "Women Helpline": { mr: "महिला हेल्पलाइन", en: "Women Helpline" },
  "Child Helpline": { mr: "चाइल्ड हेल्पलाइन", en: "Child Helpline" },
};

function getBilingualText(text) {
  if (!text) return { mr: "", en: "" };
  const clean = text.trim();
  if (bilingualMap[clean]) {
    return bilingualMap[clean];
  }
  // Fallback if no explicit translation exists
  return { mr: clean, en: clean };
}

async function reseed() {
  await p.contentBlock.deleteMany();

  const { mockHomepageData, mockHolidays2026 } = await import(url.pathToFileURL(path.resolve(__dirname, '../../web/src/data/mockData.js')).href);
  const { galleryItems } = await import(url.pathToFileURL(path.resolve(__dirname, '../../web/src/data/galleryData.js')).href);

  // Map important_links using translation map
  const importantLinks = mockHomepageData.important_links.map(link => ({
    title: getBilingualText(link.title || link.text),
    href: link.href
  }));

  // Map helpline_services using translation map
  const helplines = mockHomepageData.helpline_services.map(hl => {
    let title = hl.text;
    let phone = "";
    if (hl.text && hl.text.includes(':')) {
      const parts = hl.text.split(':');
      title = parts[0].trim();
      phone = parts[1].trim();
    }
    return {
      title: getBilingualText(title),
      phone: phone,
      desc: { mr: "", en: "" }
    };
  });

  const announcementsTabs = mockHomepageData.announcements_tabs.map(tab => {
    let enTitle = "";
    if (tab.tab_title.includes("भरती")) enTitle = "Recruitment";
    else if (tab.tab_title.includes("निविदा")) enTitle = "Tenders";
    else if (tab.tab_title.includes("कागदपत्रे")) enTitle = "Documents";
    else enTitle = tab.tab_title;

    return {
      title: { mr: tab.tab_title, en: enTitle },
      items: tab.items.map(item => ({
        // Notices are purely Marathi in original data, so we leave it identical unless we do an API translation
        title: { mr: item.text, en: item.text },
        url: item.href,
        date: item.date
      }))
    };
  });

  const blocksToSeed = [
    { type: 'hero_carousel', order: 0, content: mockHomepageData.hero_carousel || { slides: [], directorMessage: {} } },
    { type: 'minister_profiles', order: 1, content: mockHomepageData.minister_profiles || [] },
    { type: 'about_section', order: 2, content: { 
      aboutText: {
        mr: "येरवडा खुले कारागृह हे पुण्याच्या ऐतिहासिक येरवडा मध्यवर्ती कारागृहाच्या विस्तीर्ण ५१२ एकर परिसरात वसलेले एक विशेष पुनर्वसन आणि सुधार केंद्र आहे. १९५६ मध्ये स्थापित झालेले हे महाराष्ट्रातील पहिले 'खुले कारागृह' होते, जे प्रगतशील कारागृह प्रशासनातील एक महत्त्वाचे पाऊल मानले जाते. येथे प्रामुख्याने जन्मठेपेची शिक्षा भोगत असलेल्या, चांगली वर्तणूक असलेल्या आणि मध्यवर्ती कारागृहात किमान ५ वर्षे पूर्ण केलेल्या बंदीवानांना ठेवले जाते. हे कारागृह पारंपारिक बंदिस्त कोठड्यांविना, कमीत कमी सुरक्षिततेवर चालते. येथे बंदीवानांच्या मानसिक सुधारणेवर आणि व्यावसायिक सक्षमीकरणावर विशेष भर दिला जातो. बंदीवानांना सेंद्रिय शेती आणि पशुपालन यांसारख्या उत्पादक कामांमध्ये सक्रियपणे गुंतवले जाते; येथील सेंद्रिय शेतीतून इतर कारागृहांनाही ताज्या भाज्यांचा पुरवठा केला जातो. या प्रगतशील दृष्टिकोनामुळे बंदीवानांना उपजीविकेचे महत्त्वपूर्ण कौशल्य प्राप्त होते, ज्यामुळे त्यांची समाजात एक जबाबदार नागरिक म्हणून यशस्वीपणे पुनर्रचना होण्यास मदत होते.",
        en: "The Yerwada Open Jail is a specialized rehabilitation facility located in the expansive campus of the historic Yerwada Central Jail in Pune. Established in 1956, it was the first 'Open Institution' in Maharashtra, marking a significant milestone in progressive prison administration. It primarily houses inmates serving life sentences who have demonstrated excellent conduct and successfully completed at least five years in the high-security central prison. Operating under minimal security without traditional confinement cells, the facility strongly emphasizes psychological reform and vocational empowerment. Inmates are actively engaged in productive activities such as extensive organic farming—supplying fresh produce to neighboring institutions—and animal husbandry. This progressive approach ensures inmates acquire vital livelihood skills, facilitating their successful and responsible reintegration into society upon release."
      },
      welcomeTitle: {
        mr: "येरवडा खुले जिल्हा कारागृह मध्ये आपले स्वागत आहे",
        en: "Welcome to Yerwada Open District Prison"
      },
      openJailOfficers: [
        { name: { mr: "श्री. शामकांत शालन चंद्रकांत शेडगे", en: "Shri. Shamkant Shedge" }, desg: { mr: "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१", en: "Superintendent" }, img: "http://localhost:5000/uploads/Shamkant_shedge.png" },
        { name: { mr: "श्री. नागेश एम. कांबळे", en: "Shri. Nagesh M. Kamble" }, desg: { mr: "वरिष्ठ तुरुंग अधिकारी श्रेणी १", en: "Senior Prison Officer" }, img: "http://localhost:5000/uploads/Nagesh_Kamble.png" },
        { name: { mr: "श्री. नागनाथ एन. भाणवसे", en: "Shri. Nagnath N. Bhanvase" }, desg: { mr: "तुरुंग अधिकारी श्रेणी २", en: "Prison Officer Class 2" }, img: "" },
        { name: { mr: "श्रीमती निशा डी. श्रेयेकर", en: "Smt. Nisha D. Shreyekar" }, desg: { mr: "तुरुंग अधिकारी श्रेणी २", en: "Prison Officer Class 2" }, img: "http://localhost:5000/uploads/nisha_shreyekar.png" }
      ]
    }},
    { type: 'jail_insights', order: 3, content: { 
      youtubeUrl: "https://www.youtube.com/@CShamkant",
      cards: [
        { title: { mr: "सुधारणा आणि पुनर्वसन", en: "Reform and Rehabilitation" }, desc: { mr: "कैद्यांच्या सर्वांगीण विकासासाठी आणि त्यांना समाजाच्या मुख्य प्रवाहात आणण्यासाठी विशेष प्रयत्न.", en: "Special efforts for overall development of inmates." } },
        { title: { mr: "शेती आणि वृक्षारोपण", en: "Agriculture and Plantation" }, desc: { mr: "मोकळ्या जागेचा वापर करून शेती आणि पर्यावरण संवर्धनासाठी मोठ्या प्रमाणावर वृक्षारोपण.", en: "Farming in open spaces and large-scale plantation." } },
        { title: { mr: "कौशल्य विकास कार्यक्रम", en: "Skill Development" }, desc: { mr: "वेल्डिंग, सुतारकाम आणि अन्न प्रक्रिया यांसारख्या व्यावसायिक प्रशिक्षणातून स्वावलंबन.", en: "Self-reliance through vocational training." } },
        { title: { mr: "शृंखला उपहारगृह", en: "Chain Canteen" }, desc: { mr: "कैद्यांमार्फत चालवले जाणारे हॉटेल, जिथे त्यांना रोजगार आणि कौशल्य विकासाची संधी मिळते.", en: "Hotel run by inmates providing employment opportunities." } },
        { title: { mr: "ऐतिहासिक वारसा", en: "Historical Heritage" }, desc: { mr: "येरवडा कारागृहाला मोठा इतिहास लाभला असून, येथे महात्मा गांधी आणि इतर स्वातंत्र्यसैनिकांना ठेवण्यात आले होते.", en: "Yerwada jail has a rich history." } },
        { title: { mr: "शिक्षण आणि साक्षरता", en: "Education and Literacy" }, desc: { mr: "कैद्यांसाठी मूलभूत साक्षरता आणि मुक्त विद्यापीठांमार्फत उच्च शिक्षणाच्या सुविधा.", en: "Basic literacy and higher education facilities." } }
      ]
    }},
    { type: 'announcements_tabs', order: 4, content: announcementsTabs },
    { type: 'holiday_calendar', order: 5, content: mockHolidays2026 || [] },
    { type: 'photo_gallery', order: 6, content: { items: galleryItems } },
    { type: 'quick_services', order: 7, content: { important_links: importantLinks, helplines: helplines } }
  ];

  let page = await p.pageNode.findUnique({ where: { slug: '/' } });
  if (!page) {
    page = await p.pageNode.create({
      data: {
        title: 'Home Page',
        slug: '/',
        status: 'PUBLISHED',
      }
    });
  }

  for (const blockData of blocksToSeed) {
    await p.contentBlock.create({
      data: {
        pageNodeId: page.id,
        blockType: blockData.type,
        order: blockData.order,
        content: blockData.content,
        isActive: true
      }
    });
  }

  console.log('All blocks reseeded perfectly!');
  await p.$disconnect();
}

reseed().catch(console.error);
