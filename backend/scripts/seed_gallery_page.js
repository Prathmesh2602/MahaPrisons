const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Gallery Page...");
  

  
  // We can't use standard dynamic import if it's not a module, but let's just write the data statically here for safety
  const galleryItems = [
    {
      img_src: "http://localhost:5000/uploads/1.jpeg",
      img_alt: "Shrinkhala Restaurant - Yerawada Open Prison, Pune",
      title_mr: "श्रृंखला उपहारगृह - येरवडा खुले कारागृह, पुणे",
      title_en: "Shrinkhala Restaurant - Yerawada Open Prison, Pune",
      desc_mr: "येरवडा खुल्या कारागृहातील बंदीवानांद्वारे संचालित 'श्रृंखला उपहारगृह', जिथे ग्राहकांसाठी बंदीवानांनी तयार केलेले रुचकर व दर्जेदार अन्नपदार्थ उपलब्ध करून दिले जातात.",
      desc_en: "Operated by inmates of Yerawada Open Prison, Pune, 'Shrinkhala Restaurant' offers delicious, high-quality food prepared by inmates, promoting culinary skills."
    },
    {
      img_src: "http://localhost:5000/uploads/2.jpeg",
      img_alt: "Yerawada Open Prison Statistics",
      title_mr: "कारागृह सांख्यिकी आणि वैशिष्ट्ये",
      title_en: "Prison Statistics & Key Features",
      desc_mr: "येरवडा खुल्या कारागृहाची महत्त्वाची आकडेवारी - अधिकृत क्षमता ४०० बंदीवान, सद्य बंदी संख्या २३० आणि २६५ एकरचा विस्तीर्ण परिसर सुधारणा व पुनर्वसनासाठी कार्यरत.",
      desc_en: "Key figures of Yerawada Open Prison featuring an authorized capacity of 400 inmates, 230 current population, and a vast 265-acre campus focusing on rehabilitation."
    },
    {
      img_src: "http://localhost:5000/uploads/3.jpeg",
      img_alt: "Maharashtra Prison Department Institutions",
      title_mr: "महाराष्ट्रातील खुल्या सुधारक संस्थांची रचना",
      title_en: "Open Correctional Facilities in Maharashtra",
      desc_mr: "महाराष्ट्र कारागृह विभागांतर्गत असलेल्या खुल्या सुधारक संस्थांचे वर्गीकरण - ५ खुली कारागृहे, १२ निम-खुली कारागृहे, २ महिला खुली कारागृहे आणि १ खुली वसाहत.",
      desc_en: "Overview of Maharashtra Prison Department's open facilities including 5 Open Jails, 12 Semi-Open Jails, 2 Female Open Jails, and 1 Open Colony."
    },
    {
      img_src: "http://localhost:5000/uploads/4.jpeg",
      img_alt: "Agriculture Section - Yerawada Open Prison",
      title_mr: "कृषी विभाग - येरवडा खुले कारागृह",
      title_en: "Agriculture Section - Yerawada Open Prison",
      desc_mr: "खुली कारागृहातील बंदीवान शेती क्षेत्रात विविध पिके आणि भाजीपाला लागवड करतात. याद्वारे त्यांना आधुनिक कृषी तंत्रज्ञान व सेंद्रिय शेतीचे प्रत्यक्ष शिक्षण मिळते.",
      desc_en: "Inmates of Yerawada Open Prison engaged in farming activities, learning modern agricultural methods, organic crop production, and harvesting on farmlands."
    },
    {
      img_src: "http://localhost:5000/uploads/5.jpeg",
      img_alt: "K. K. Mangal Lawn - Yerawada Open Prison",
      title_mr: "के.के. मंगल लॉन - येरवडा खुले कारागृह",
      title_en: "K. K. Mangal Lawn - Yerawada Open Prison",
      desc_mr: "येरवडा खुल्या कारागृहातील बंदीवानांद्वारे व्यवस्थापित आणि देखरेख केले जाणारे के.के. मंगल लॉन. याद्वारे बंदीवानांना लँडस्केप डिझाईन व बागकामाचे प्रशिक्षण दिले जाते.",
      desc_en: "K. K. Mangal Lawn is a spacious wedding and event venue managed and maintained by Yerawada Open Prison inmates, providing landscaping and gardening training."
    },
    {
      img_src: "http://localhost:5000/uploads/6.jpeg",
      img_alt: "Press Section - Maharashtra Prison Industry",
      title_mr: "प्रेस (इस्त्री) विभाग - महाराष्ट्र कारागृह उद्योग",
      title_en: "Press Section - Maharashtra Prison Industry",
      desc_mr: "येरवडा खुले व जिल्हा कारागृहात बंदीवानांसाठी चालवला जाणारा आधुनिक प्रेस (इस्त्री) विभाग, जिथे कपड्यांची स्वच्छता व इस्त्री सेवा कौशल्याचे धडे दिले जातात.",
      desc_en: "A professional ironing and laundry service department operated by inmates at Yerawada, training them in commercial laundry operations and garment care."
    },
    {
      img_src: "http://localhost:5000/uploads/7.jpeg",
      img_alt: "Salon Unit - Yerawada Open & District Prison",
      title_mr: "सलून विभाग - येरवडा खुले व जिल्हा कारागृह",
      title_en: "Salon Unit - Yerawada Open & District Prison",
      desc_mr: "बंदीवानांना स्वावलंबी बनवण्यासाठी सुरू केलेला सलून विभाग. येथे बंदीवानांना केशरचना, दाढी करणे व त्वचा निगा यांचे प्रत्यक्ष व्यावसायिक प्रशिक्षण दिले जाते.",
      desc_en: "A vocational salon unit operated by inmates providing professional training in haircutting, grooming, and personal care services for self-reliance."
    },
    {
      img_src: "http://localhost:5000/uploads/8.jpeg",
      img_alt: "Nursery Section - Yerawada Open Prison",
      title_mr: "रोपवाटिका (नर्सरी) विभाग - येरवडा खुले कारागृह",
      title_en: "Nursery Section - Yerawada Open Prison",
      desc_mr: "येरवडा कारागृहातील आधुनिक रोपवाटिका विभाग. येथे विविध प्रकारची फुले, फळे व वनस्पतींचे वैज्ञानिक पद्धतीने संवर्धन केले जाते आणि बंदीवानांना फलोत्पादन शिकवले जाते.",
      desc_en: "A greenhouse nursery program where inmates are trained in scientific horticulture, composting, and cultivating quality plants for a greener environment."
    },
    {
      img_src: "http://localhost:5000/uploads/9.jpeg",
      img_alt: "Masonry Unit - Yerawada Open Prison",
      title_mr: "गवंडी काम आणि बांधकाम विभाग - येरवडा खुले कारागृह",
      title_en: "Masonry Unit - Yerawada Open Prison",
      desc_mr: "गवंडी काम आणि बांधकामाचे व्यावसायिक प्रशिक्षण देणारा विभाग, जेथे बंदीवानांना वीटकाम आणि प्लास्टरिंगचे कौशल्य शिकवले जाते.",
      desc_en: "Inmates undergoing vocational training in bricklaying, cement mixing, and masonry construction to build vocational skills."
    },
    {
      img_src: "http://localhost:5000/uploads/10.jpeg",
      img_alt: "Cattle Farming & Dairy Unit",
      title_mr: "गोपालन आणि दुग्धव्यवसाय विभाग - येरवडा खुले कारागृह",
      title_en: "Cattle Farming & Dairy Unit - Yerawada Open Prison",
      desc_mr: "बंदीवानांना दुग्धव्यवसाय, गोवंश संगोपन आणि दूध उत्पादन तसेच पशुधनाचे व्यवस्थापन शिकवणारा विभाग.",
      desc_en: "Inmates learning dairy farming, cattle care, milk production, and livestock management, supporting self-sustainability."
    },
    {
      img_src: "http://localhost:5000/uploads/11.jpeg",
      img_alt: "Poultry Farming",
      title_mr: "कुक्कुटपालन विभाग - येरवडा खुले कारागृह",
      title_en: "Poultry Farming - Yerawada Open Prison",
      desc_mr: "बंदीवानांना व्यावसायिक कुक्कुटपालनाचे धडे, ज्यामध्ये कोंबड्यांचे संगोपन, आहार आणि शेड व्यवस्थापनाचा समावेश आहे.",
      desc_en: "Training in poultry farming, including feeding, care, disease control, and poultry farm management for inmates."
    },
    {
      img_src: "http://localhost:5000/uploads/12.jpeg",
      img_alt: "Laundry Unit - Yerawada Central Prison",
      title_mr: "कपडे धुलाई आणि इस्त्री केंद्र - येरवडा मध्यवर्ती कारागृह",
      title_en: "Laundry Unit - Yerawada Central Prison",
      desc_mr: "येरवडा मध्यवर्ती कारागृहातील कपडे धुलाई आणि इस्त्री केंद्र, जेथे बंदीवानांच्या मदतीने स्वच्छता आणि व्यावसायिक कौशल्यांवर भर दिला जातो.",
      desc_en: "A commercial-grade laundry facility at Yerawada Central Jail, providing garment washing and ironing services with focus on hygiene and dignity."
    },
    {
      img_src: "http://localhost:5000/uploads/13.jpeg",
      img_alt: "Minda Industrial Unit (Wire Harnessing)",
      title_mr: "मिंडा युनिट (वायर हार्नेसिंग) - येरवडा खुले कारागृह",
      title_en: "Minda Industrial Unit (Wire Harnessing) - Yerawada",
      desc_mr: "मिंडा कॉर्पोरेशन लिमिटेड सोबत संयुक्त उपक्रम, जिथे बंदीवानांना वाहनांसाठी वायर हार्नेसिंग तयार करण्याचे तांत्रिक प्रशिक्षण व रोजगार दिला जातो.",
      desc_en: "A joint venture with Minda Corporation providing inmates with technical training and employment in automotive wire harnessing."
    },
    {
      img_src: "http://localhost:5000/uploads/14.jpeg",
      img_alt: "Washing Soap & Detergent Unit",
      title_mr: "साबण व डिटर्जंट उत्पादन केंद्र - येरवडा मध्यवर्ती कारागृह",
      title_en: "Soap & Detergent Unit - Yerawada Central Prison",
      desc_mr: "बंदीवानांना कपडे धुण्याचा साबण, अंघोळीचा साबण, फिनाईल आणि डिटर्जंट पावडर तयार करण्याचे प्रशिक्षण व रोजगार मिळवून देणारा विभाग.",
      desc_en: "A production unit where inmates are trained and employed in manufacturing bathing soaps, washing powders, and phenyl."
    }
  ];

  // Map to unified editor format
  const mappedGalleryItems = galleryItems.map(item => ({
    image: item.img_src,
    title: { mr: item.title_mr, en: item.title_en },
    desc: { mr: item.desc_mr, en: item.desc_en }
  }));

  // Create or Update Page
  let page = await prisma.pageNode.findUnique({
    where: { slug: 'gallery' }
  });

  if (!page) {
    page = await prisma.pageNode.create({
      data: {
        slug: 'gallery',
        title: 'Gallery',
        layoutType: 'GalleryLayout',
        isActive: true
      }
    });
  } else {
    await prisma.pageNode.update({
      where: { id: page.id },
      data: { layoutType: 'GalleryLayout' }
    });
    // clear existing blocks
    await prisma.contentBlock.deleteMany({
      where: { pageNodeId: page.id }
    });
  }

  // Create block
  await prisma.contentBlock.create({
    data: {
      pageNodeId: page.id,
      blockType: 'page_template_data',
      order: 1,
      content: {
        header: {
          title: { mr: 'फोटो गॅलरी', en: 'Photo Gallery' },
          desc: {
            mr: 'महाराष्ट्र कारागृह विभागातील विविध उपक्रम, कार्यशाळा, आणि सुविधांची झलक. चित्रे मोठी करून पाहण्यासाठी आणि अधिक माहिती वाचण्यासाठी क्लिक करा.',
            en: 'A glimpse of various activities, workshops, and facilities at Maharashtra Prison Department. Click on any image to expand it and read more details.'
          }
        },
        gallery: mappedGalleryItems
      }
    }
  });

  console.log("Successfully seeded Gallery page!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
