
export const mockHomepageData = {
  title: "Homepage | महाराष्ट्र कारागृह विभाग | MahaPrisons | भारत",
  logo_h1: "Maharashtra Prisons and Correctional Services",
  logo_spans: ["महाराष्ट्र कारागृह आणि सुधार सेवा"],
  topbar_links: [
    { text: "Accessibility Options", href: "#accessibility-toolbar", title: "Accessibility Options" },
    { text: "महाराष्ट्र शासन", href: "https://www.maharashtra.gov.in", title: "महाराष्ट्र शासन" },
    { text: "Government of Maharashtra", href: "https://www.maharashtra.gov.in", title: "Government of Maharashtra" }
  ],
  navigation_menu: [
    {
      text: "मुख्यपृष्ठ",
      icon: "Home",
      href: "/",
      title: "मुख्यपृष्ठ",
      children: [
        { text: "परिचय", href: "/#about", title: "About", children: [] },
        { text: "घोषणा आणि निविदा", href: "/#announcements", title: "Announcements", children: [] },
        { text: "सुट्ट्यांचे कॅलेंडर", href: "/#calendar", title: "Calendar", children: [] },
        { text: "फोटो गॅलरी", href: "/#gallery", title: "Gallery", children: [] },
        { text: "जलद सेवा", href: "/#services", title: "Services", children: [] }
      ]
    },
    {
      text: "कारागृह व्यवस्था",
      icon: "Shield",
      href: "/yerawada-open-jail",
      title: "कारागृह व्यवस्था",
      children: []
    },
    {
      text: "प्रशासकीय विभाग",
      icon: "Briefcase",
      href: "#",
      title: "प्रशासकीय विभाग",
      isMegaMenu: true,
      groups: [
        {
          groupTitle: "प्रशासन व कर्मचारी",
          children: [
            { text: "प्रशासन", href: "/administrative/administration", title: "प्रशासन", children: [] },
            { text: "आस्थापना", href: "/administrative/establishment", title: "आस्थापना", children: [] },
            { text: "न्याय विभाग", href: "/administrative/judicial", title: "न्याय विभाग", children: [] }
          ]
        },
        {
          groupTitle: "दैनंदिन सुविधा",
          children: [
            { text: "रेशन", href: "/administrative/ration", title: "रेशन", children: [] },
            { text: "उपाहारगृह", href: "/administrative/canteen", title: "उपाहारगृह", children: [] },
            { text: "मुलाखत", href: "/administrative/interview", title: "मुलाखत", children: [] },
            { text: "दवाखाना", href: "/administrative/hospital", title: "दवाखाना", children: [] }
          ]
        },
        {
          groupTitle: "उत्पादन व उपक्रम",
          children: [
            { text: "कारखाना", href: "/administrative/factory", title: "कारखाना", children: [] },
            { text: "शेती", href: "/administrative/agriculture", title: "शेती", children: [] },
            { text: "उद्योग", href: "/administrative/industry", title: "उद्योग", children: [] }
          ]
        },
        {
          groupTitle: "सुरक्षा व पायाभूत सुविधा",
          children: [
            { text: "अंतर्गत सुरक्षा", href: "/administrative/internal-security", title: "अंतर्गत सुरक्षा", children: [] },
            { text: "बांधकाम", href: "/administrative/construction", title: "बांधकाम", children: [] }
          ]
        }
      ]
    },
    {
      text: "शेती व पूरक व्यवसाय",
      icon: "Sprout",
      href: "#",
      title: "शेती व पूरक व्यवसाय",
      children: [
        { text: "रोपवाटिका", href: "/agriculture/nursery", title: "रोपवाटिका", children: [] },
        { text: "कुक्कुटपालन", href: "/agriculture/poultry-farming", title: "कुक्कुटपालन", children: [] },
        { text: "दुग्धव्यवसाय", href: "/agriculture/dairy-farming", title: "दुग्धव्यवसाय", children: [] },
        { text: "शेळीपालन", href: "/agriculture/goat-farming", title: "शेळीपालन", children: [] },
        { text: "मशरूम प्रकल्प", href: "/agriculture/mushroom-project", title: "मशरूम प्रकल्प", children: [] },
        { text: "गांडूळखत प्रकल्प", href: "/agriculture/vermicompost-project", title: "गांडूळखत प्रकल्प", children: [] },
        { text: "नाविन्यपूर्ण उपक्रम व उत्पादने", href: "/agriculture/innovative-activities", title: "नाविन्यपूर्ण उपक्रम व उत्पादने", children: [] }
      ]
    },
    {
      text: "सामाजिक उपक्रम",
      icon: "HeartHandshake",
      href: "#",
      title: "सामाजिक उपक्रम",
      children: [
        { text: "केशकर्तनालय", href: "/social/salon", title: "केशकर्तनालय", children: [] },
        { text: "धुलाईगृह", href: "/social/laundry", title: "धुलाईगृह", children: [] },
        { text: "श्रृंखला उपाहारगृह", href: "/social/shrinkhala-canteen", title: "श्रृंखला उपाहारगृह", children: [] },
        { text: "के. के. मंगल लॉन", href: "/social/mangal-lawn", title: "के. के. मंगल लॉन", children: [] },
        { text: "मिंडा युनिट", href: "/social/minda-unit", title: "मिंडा युनिट", children: [] }
      ]
    },
    {
      text: "सोयी-सुविधा",
      icon: "LayoutGrid",
      href: "#",
      title: "सोयी-सुविधा",
      isMegaMenu: true,
      groups: [
        {
          groupTitle: "भेट व संपर्क",
          children: [
            {
              text: "बंदी मुलाखत", href: "/facilities/prisoner-interview", title: "बंदी मुलाखत", children: [
                { text: "प्रत्यक्ष मुलाखत", href: "/facilities/prisoner-interview", title: "प्रत्यक्ष मुलाखत", children: [] },
                { text: "ई-मुलाखत", href: "/facilities/prisoner-interview", title: "ई-मुलाखत", children: [] }
              ]
            },
            {
              text: "ॲलेन स्मार्ट कार्ड फोन सुविधा", href: "/facilities/smart-card-phone", title: "ॲलेन स्मार्ट कार्ड फोन सुविधा", children: [
                { text: "ऑडिओ", href: "/facilities/smart-card-phone", title: "ऑडिओ", children: [] },
                { text: "व्हिडिओ", href: "/facilities/smart-card-phone", title: "व्हिडिओ", children: [] }
              ]
            },
            { text: "पत्रव्यवहार व मनीऑर्डर सुविधा", href: "/facilities/correspondence", title: "पत्रव्यवहार व मनीऑर्डर सुविधा", children: [] }
          ]
        },
        {
          groupTitle: "कायदेशीर व प्रशासकीय सुविधा",
          children: [
            { text: "मोफत कायदेशीर मदत", href: "/facilities/free-legal-aid", title: "मोफत कायदेशीर मदत", children: [] },
            { text: "जिल्हा विधी सेवा प्राधिकरण", href: "/facilities/district-legal-services", title: "जिल्हा विधी सेवा प्राधिकरण", children: [] },
            { text: "संचित व अभिवाचन रजा", href: "/facilities/furlough-parole", title: "संचित व अभिवाचन रजा", children: [] },
            { text: "माफी", href: "/facilities/remission", title: "माफी", children: [] }
          ]
        },
        {
          groupTitle: "आरोग्य व दैनंदिन सुविधा",
          children: [
            { text: "हिरकणी कक्ष", href: "/facilities/hirkani-room", title: "हिरकणी कक्ष", children: [] },
            { text: "व्यायामशाळा", href: "/facilities/gymnasium", title: "व्यायामशाळा", children: [] },
            { text: "वेट कॅन्टीन", href: "/facilities/wet-canteen", title: "वेट कॅन्टीन", children: [] }
          ]
        },
        {
          groupTitle: "शिक्षण व विकास",
          children: [
            { text: "शैक्षणिक सुविधा", href: "/facilities/education", title: "शैक्षणिक सुविधा", children: [] },
            { text: "ग्रंथालय", href: "/facilities/library", title: "ग्रंथालय", children: [] }
          ]
        }
      ]
    },
    {
      text: "सांस्कृतिक उपक्रम",
      icon: "Palette",
      href: "#",
      title: "सांस्कृतिक उपक्रम",
      isMegaMenu: true,
      groups: [
        {
          groupTitle: "प्रबोधन व जनजागृती",
          children: [
            { text: "प्रबोधन कार्यक्रम", href: "#", title: "प्रबोधन कार्यक्रम", children: [] },
            { text: "व्यसनमुक्ती कार्यक्रम", href: "#", title: "व्यसनमुक्ती कार्यक्रम", children: [] }
          ]
        },
        {
          groupTitle: "प्रशिक्षण व व्यक्तिमत्त्व विकास",
          children: [
            { text: "व्यावसायिक प्रशिक्षण", href: "#", title: "व्यावसायिक प्रशिक्षण", children: [] }
          ]
        },
        {
          groupTitle: "योग व आध्यात्मिक उपक्रम",
          children: [
            { text: "योग, ध्यान व धारणा", href: "#", title: "योग, ध्यान व धारणा", children: [] },
            { text: "प्राणिक हीलिंग", href: "#", title: "प्राणिक हीलिंग", children: [] },
            { text: "कीर्तन व भजन", href: "#", title: "कीर्तन व भजन", children: [] }
          ]
        }
      ]
    },
    {
      text: "उल्लेखनीय कार्य",
      icon: "Award",
      href: "#",
      title: "उल्लेखनीय कार्य",
      children: [
        { text: "उल्लेखनीय उपक्रम", href: "#", title: "उल्लेखनीय उपक्रम", children: [] },
        { text: "महत्त्वपूर्ण प्रकल्प", href: "#", title: "महत्त्वपूर्ण प्रकल्प", children: [] },
        { text: "पुरस्कार व गौरव", href: "#", title: "पुरस्कार व गौरव", children: [] },
        { text: "उत्कृष्ट कार्यपद्धती", href: "#", title: "उत्कृष्ट कार्यपद्धती", children: [] },
        { text: "परिणाम व यशोगाथा", href: "#", title: "परिणाम व यशोगाथा", children: [] }
      ]
    },
    {
      text: "दौरे व भेटी",
      icon: "Map",
      href: "#",
      title: "दौरे व भेटी",
      isMegaMenu: true,
      groups: [
        {
          groupTitle: "अभ्यासभेटी",
          children: [
            { text: "शैक्षणिक अभ्यासभेट", href: "#", title: "शैक्षणिक अभ्यासभेट", children: [] },
            { text: "संस्थात्मक अभ्यासभेट", href: "#", title: "संस्थात्मक अभ्यासभेट", children: [] }
          ]
        },
        {
          groupTitle: "प्रशासकीय दौरे",
          children: [
            { text: "अधिकारी दौरे", href: "#", title: "अधिकारी दौरे", children: [] },
            { text: "मान्यवर भेटी", href: "#", title: "मान्यवर भेटी", children: [] },
            { text: "निरीक्षण दौरे", href: "#", title: "निरीक्षण दौरे", children: [] },
            { text: "विभागीय भेटी", href: "#", title: "विभागीय भेटी", children: [] }
          ]
        }
      ]
    },
    {
      text: "आमची उत्पादने",
      icon: "Package",
      href: "/our-products",
      title: "आमची उत्पादने",
      children: []
    },
    {
      text: "संपर्क",
      icon: "PhoneCall",
      href: "#",
      title: "संपर्क",
      children: []
    }
  ],
  news_ticker: [
    {
      text: "कारागृह विभागातील निम्न श्रेणी या पदाची दिनांक 01.01.2024 रोजीची तात्पुरती सेवाज्येष्ठता सूची प्रसिध्द करणेबाबत.नवीन",
      href: "https://mahaprisons.gov.in/document/regarding-publication-of-provisional-service-merit-list-dated-01-01-2024-for-the-post-of-lower-grade-in-the-prisons-department/"
    },
    {
      text: "लिपीक संवर्गीय कर्मचारी यांची दि. १९/०६/२०२४ ते २१/०६/२०२४ या कालावधीत घेण्यात अलेल्या अर्हताकारी परीक्षेचा निकाल जाहीर करणेबाबत.नवीन",
      href: "https://mahaprisons.gov.in/notice/regarding-the-announcement-of-the-results-of-the-qualifying-examination-conducted-from-19-06-2024-to-21-06-2024-for-clerical-category-employees/"
    }
  ],
  hero_carousel: [
    {
      img_src: "/gallary/rehab_hero.png",
      img_alt: "येरवडा खुले कारागृह",
      category: { mr: "पुनर्वसन", en: "Rehabilitation" },
      title: { mr: "येरवडा खुले कारागृह", en: "Yerawada Open Prison" },
      statement: { mr: "श्रमातून परिवर्तनाची वाट.", en: "Path of transformation through labor." },
      description: { mr: "शिस्त, कौशल्य, श्रम आणि स्वावलंबनाच्या माध्यमातून पुनर्वसनाची नवी दिशा.", en: "A new direction in rehabilitation through discipline, skills, labor, and self-reliance." },
      cta1: { mr: "आमचा प्रवास", en: "Our Journey", href: "#" },
      cta2: { mr: "उपक्रम पहा", en: "View Initiatives", href: "#" }
    },
    {
      img_src: "/gallary/farming_hero.png",
      img_alt: "शेती उपक्रम",
      category: { mr: "शेती", en: "Agriculture" },
      title: { mr: "मातीशी नातं", en: "Bond with Soil" },
      statement: { mr: "स्वावलंबनाकडे वाटचाल.", en: "Stepping towards self-reliance." },
      description: { mr: "शेती आणि पूरक उपक्रमांच्या माध्यमातून कौशल्य आणि जबाबदारीची जडणघडण.", en: "Building skills and responsibility through farming and allied activities." },
      cta1: { mr: "शेती उपक्रम", en: "Farming Activities", href: "#" },
      cta2: null
    },
    {
      img_src: "/gallary/skills_hero.png",
      img_alt: "कौशल्य विकास केंद्र",
      category: { mr: "कौशल्य विकास", en: "Skill Development" },
      title: { mr: "कौशल्यातून आत्मनिर्भरतेकडे", en: "Self-reliance through Skills" },
      statement: { mr: "नव्या संधींची तयारी.", en: "Preparing for new opportunities." },
      description: { mr: "व्यावसायिक प्रशिक्षण आणि उत्पादनाच्या माध्यमातून नव्या संधींची तयारी.", en: "Empowerment through vocational training and productive activities." },
      cta1: { mr: "प्रशिक्षण पहा", en: "View Training", href: "#" },
      cta2: null
    },
    {
      img_src: "/gallary/industry_hero.png",
      img_alt: "उद्योग विभाग",
      category: { mr: "उत्पादन व उद्योग", en: "Production & Industry" },
      title: { mr: "श्रमाला संधी, भविष्याला दिशा.", en: "Opportunity for Labor, Direction for Future." },
      statement: { mr: "शिस्त आणि आत्मविश्वासाचा विकास.", en: "Developing discipline and confidence." },
      description: { mr: "उत्पादक कामातून कौशल्य, शिस्त आणि आत्मविश्वासाचा विकास.", en: "Fostering skill, discipline, and self-belief through productive work." },
      cta1: { mr: "उद्योग उपक्रम", en: "Industrial Activities", href: "#" },
      cta2: null
    },
    {
      img_src: "/gallary/reintegration_hero.png",
      img_alt: "पुनर्वसन उपक्रम",
      category: { mr: "पुनर्वसन", en: "Reintegration" },
      title: { mr: "नव्या आयुष्याची तयारी", en: "Preparing for a New Life" },
      statement: { mr: "समाजात पुनर्स्थापना.", en: "Reintegration into society." },
      description: { mr: "जबाबदारी आणि स्वावलंबनाच्या माध्यमातून समाजात पुनर्स्थापनेची तयारी.", en: "Getting ready for reintegration into society through responsibility and self-sufficiency." },
      cta1: { mr: "आमची उत्पादने", en: "Our Products", href: "#" },
      cta2: null
    }
  ],
  minister_profiles: [
    {
      img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2025/01/2025012261249385.jpg",
      img_alt: "श्री. देवेंद्र फडणवीस",
      name: "श्री. देवेंद्र फडणवीस",
      desg: "माननीय मुख्यमंत्री महोदय"
    },
    {
      img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2025/01/202501221097700001.jpg",
      img_alt: "श्री. एकनाथ शिंदे",
      name: "श्री. एकनाथ शिंदे",
      desg: "माननीय उपमुख्यमंत्री"
    },
    {
      img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/02/202602091228963919.jpg",
      img_alt: "श्रीमती. सुनेत्रा पवार",
      name: "श्रीमती.सुनेत्रा पवार",
      desg: "माननीय उपमुख्यमंत्री"
    },
    {
      img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg",
      img_alt: "ADG Suhas Warke (IPS)",
      name: "श्री. सुहास वारके",
      desg: "Director General of Prisons and Correctional Services"
    },
    {
      img_src: "/gallary/yogesh%20desai.png",
      img_alt: "Yogesh Desai",
      name: "श्री. योगेश देसाई",
      desg: "विशेष कारागृह महानिरीक्षक, महाराष्ट्र राज्य"
    },
    {
      img_src: "/gallary/Sunil%20Dhamal.png",
      img_alt: "Sunil Dhamal",
      name: "श्री. सुनील ढमाळ",
      desg: "कारागृह उपमहानिरीक्षक, पश्चिम विभाग, येरवडा"
    },
    {
      img_src: "/gallary/Shamkant%20shedge.png",
      img_alt: "Shamkant Shedge",
      name: "श्री. शामकांत शालन चंद्रकांत शेडगे",
      desg: "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१"
    }
  ],
  helpline_services: [
    { text: "Citizen’s Call center:155300", href: "#", img_src: "", img_alt: "" },
    { text: "Emergency Police:100", href: "#", img_src: "", img_alt: "" },
    { text: "Emergency Helpline:112", href: "#", img_src: "", img_alt: "" },
    { text: "Crime Stopper:1090", href: "#", img_src: "", img_alt: "" },
    { text: "Women Helpline:1091", href: "#", img_src: "", img_alt: "" },
    { text: "Child Helpline:1098", href: "#", img_src: "", img_alt: "" }
  ],
  gallery: {
    items: [
      {
        img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2025/01/202501222131506397.jpg",
        img_alt: "महाराष्ट्र विभागांचा नकाशा",
        href: "https://mahaprisons.gov.in/wp-content/uploads/2025/01/202501222131506397.jpg"
      }
    ],
    view_all_href: "http://preview.s3waas.gov.in/photo-gallery/"
  },
  important_links: [
    { text: "National Portal of India", href: "https://www.india.gov.in/", title: "National Portal of India" },
    { text: "महाराष्ट्र शासन", href: "https://www.maharashtra.gov.in/", title: "महाराष्ट्र शासन" },
    { text: "महाराष्ट्र पर्यटन", href: "https://maharashtratourism.gov.in/", title: "महाराष्ट्र पर्यटन" },
    { text: "Aaple Sarkar", href: "https://aaplesarkar.mahaonline.gov.in", title: "Aaple Sarkar" },
    { text: "RTI Online", href: "https://rtionline.maharashtra.gov.in", title: "RTI Online" },
    { text: "Maharashtra E-Tender", href: "http://maharashtra.etenders.in/", title: "Maharashtra E-Tender" },
    { text: "Department Enquiry", href: "http://departmentalinquirymarathi.blogspot.com/", title: "Department Enquiry" },
    { text: "Emulakat for Prisoners and Lawyers", href: "https://eprisons.nic.in/NPIP/public/MyVisitRegistration", title: "Emulakat for Prisoners and Lawyers" },
    { text: "ट्विटर", href: "https://x.com/mahaprison", title: "ट्विटर" },
    { text: "Instagram", href: "https://www.instagram.com/themaharashtraprison/", title: "Instagram" },
    { text: "फेसबुक", href: "https://www.facebook.com/mahaprisondepartment/", title: "फेसबुक" }
  ],
  announcements_tabs: [
    {
      tab_title: "भरती",
      items: [
        {
          text: "उमेदवारांना सूचना – अंतिम प्रतिक्षा यादीतील १०२ उमेदवारांपैकी गैरहजर राहीलेल्या ३८ उमेदवारांचे मूळ दस्तऐवज पडताळणीबाबत",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%89%e0%a4%ae%e0%a5%87%e0%a4%a6%e0%a4%b5%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%82%e0%a4%a8%e0%a4%be-%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%85%e0%a4%82%e0%a4%a4%e0%a4%bf%e0%a4%ae/",
          date: "03 Jul 2026"
        },
        {
          text: "करवत्या",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%95%e0%a4%b0%e0%a4%b5%e0%a4%a4%e0%a5%8d%e0%a4%af%e0%a4%be/",
          date: "02 Jul 2026"
        },
        {
          text: "कागदपत्रे पडताळणी – कारागृह शिपाई भरती – पश्चिम विभाग, पुणे",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%95%e0%a4%be%e0%a4%97%e0%a4%a6%e0%a4%aa%e0%a4%a4%e0%a5%8d%e0%a4%b0%e0%a5%87-%e0%a4%aa%e0%a4%a1%e0%a4%a4%e0%a4%be%e0%a4%b3%e0%a4%a3%e0%a5%80-%e0%a4%95%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%97/",
          date: "30 Jun 2026"
        },
        {
          text: "कातारी",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%95%e0%a4%be%e0%a4%a4%e0%a4%be%e0%a4%b0%e0%a5%80/",
          date: "25 Jun 2026"
        },
        {
          text: "कारागृह शिपाई भरती – कागदपत्र पडताळणीसाठी शेवटची संधी-छ. संभाजीनगर",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%95%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%97%e0%a5%83%e0%a4%b9-%e0%a4%b6%e0%a4%bf%e0%a4%aa%e0%a4%be%e0%a4%88-%e0%a4%ad%e0%a4%b0%e0%a4%a4%e0%a5%80-%e0%a4%95%e0%a4%be%e0%a4%97%e0%a4%a6-2/",
          date: "20 Jun 2026"
        },
        {
          text: "कारागृह शिपाई भरती – छ. संभाजीनगर – मूळ कागदपत्र तपासणी करीता गैरहजर उदेमवारांना तिसरी व अंतिम नोटीस",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%95%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%97%e0%a5%83%e0%a4%b9-%e0%a4%b6%e0%a4%bf%e0%a4%aa%e0%a4%be%e0%a4%88-%e0%a4%ad%e0%a4%b0%e0%a4%a4%e0%a5%80-%e0%a4%b5%e0%a5%8d%e0%a4%af%e0%a4%be%e0%a4%b9-%e0%a4%ad%e0%a4%b0%e0%a4%a4%e0%a5%80/",
          date: "18 Jun 2026"
        },
        {
          text: "कारागृह शिपाई भरती सन २०२२-२३ या भरती प्रक्रियेतील अंतिम प्रतिक्षा यादीतील ०७ उमेदवारांना मूळ दस्तऐवज पडताळणीकरीता उपस्थित राहणेबाबत…",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%95%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%97%e0%a5%83%e0%a4%b9-%e0%a4%b6%e0%a4%bf%e0%a4%aa%e0%a4%be%e0%a4%88-%e0%a4%ad%e0%a4%b0%e0%a4%a4%e0%a5%80-%e0%a4%b8%e0%a4%a8-%e0%a5%a8%e0%a5%a6%e0%a5%a8/",
          date: "15 Jun 2026"
        }
      ]
    },
    {
      tab_title: "निविदा",
      items: [
        {
          text: "येरवडा मध्यवर्ती कारागृह _स्क्रॅप लिलाव_फोटो",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%af%e0%a5%87%e0%a4%b0%e0%a4%b5%e0%a4%a1%e0%a4%be-%e0%a4%ae%e0%a4%a7%e0%a5%8d%e0%a4%af%e0%a4%b5%e0%a4%b0%e0%a5%8d%e0%a4%a4%e0%a5%80-%e0%a4%95%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%97%e0%a5%83-4/",
          date: "10 Jun 2026"
        },
        {
          text: "येरवडा मध्यवर्ती कारागृह _स्क्रॅप साहित्य_स्क्रॅप आयटम_वजन_किंमत_फोटो_विवरण",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%af%e0%a5%87%e0%a4%b0%e0%a4%b5%e0%a4%a1%e0%a4%be-%e0%a4%ae%e0%a4%a7%e0%a5%8d%e0%a4%af%e0%a4%b5%e0%a4%b0%e0%a5%8d%e0%a4%a4%e0%a5%80-%e0%a4%95%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%97%e0%a5%83-3/",
          date: "08 Jun 2026"
        },
        {
          text: "लिलावात सहभागी होण्यासाठी पात्रता निकष",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%b2%e0%a4%bf%e0%a4%b2%e0%a4%be%e0%a4%b5%e0%a4%be%e0%a4%a4-%e0%a4%b8%e0%a4%b9%e0%a4%ad%e0%a4%be%e0%a4%97%e0%a5%80-%e0%a4%b9%e0%a5%8b%e0%a4%a3%e0%a5%8d%e0%a4%af%e0%a4%be%e0%a4%b8%e0%a4%be%e0%a4%a0/",
          date: "05 Jun 2026"
        },
        {
          text: "विक्री_नोंदणी _येरवडा मध्यवर्ती कारागृह _तपशील",
          href: "https://mahaprisons.gov.in/notice/auction_tender_yerwada-central-prison_detail/",
          date: "02 Jun 2026"
        },
        {
          text: "येरवडा मध्यवर्ती कारागृहांतील भंगार सामग्रीचा लिलाव",
          href: "https://mahaprisons.gov.in/notice/%e0%a4%af%e0%a5%87%e0%a4%b0%e0%a4%b5%e0%a4%a1%e0%a4%be-%e0%a4%ae%e0%a4%a7%e0%a5%8d%e0%a4%af%e0%a4%b5%e0%a4%b0%e0%a5%8d%e0%a4%a4%e0%a5%80-%e0%a4%95%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%97%e0%a5%83-2/",
          date: "01 Jun 2026"
        }
      ]
    },
    {
      tab_title: "कागदपत्रे",
      items: [
        {
          text: "लिपीक पदाची तात्पुरती सेवाजेष्ठता सुची सन 2026",
          href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/03/202603241442150231.pdf",
          date: "24 Mar 2026"
        },
        {
          text: "तात्पुरती सेवा जेष्ठता सुची _ तुरुंगाधिकारी श्रेणी-1 _ दि.01.01.1993 ते दि.31.12.2026",
          href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/03/202603122014464002.pdf",
          date: "12 Mar 2026"
        },
        {
          text: "तात्पुरती सेवा जेष्ठता सुची _ वरिष्ठ लिपीक _ दि.01.01.2026 रोजीची",
          href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/03/20260312305773862.pdf",
          date: "12 Mar 2026"
        },
        {
          text: "कारागृह विभागातील लघुलेखक संवर्गातील पदांची दि.०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता सूची प्रसिद्ध करणेबाबत..",
          href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/02/202602231371509840.pdf",
          date: "23 Feb 2026"
        },
        {
          text: "कारागृह विभागातील तांत्रिक संवर्गातील पदोन्नतीच्या पदांची दि.०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता सूची प्रसिद्ध करणेबाबत",
          href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/02/202602231238232966.pdf",
          date: "23 Feb 2026"
        }
      ]
    }
  ],
  all_pdf_downloads: [
    { text: "लिपीक पदाची तात्पुरती सेवाजेष्ठता सुची सन 2026", href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/03/202603241442150231.pdf", title: "डाउनलोड" },
    { text: "तात्पुरती सेवा जेष्ठता सुची _ तुरुंगाधिकारी श्रेणी-1 _ दि.01.01.1993 ते दि.31.12.2026", href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/03/202603122014464002.pdf", title: "डाउनलोड" },
    { text: "तात्पुरती सेवा जेष्ठता सुची _ वरिष्ठ लिपीक _ दि.01.01.2026 रोजीची", href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/03/20260312305773862.pdf", title: "डाउनलोड" },
    { text: "कारागृह विभागातील लघुलेखक संवर्गातील पदांची दि.०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता सूची प्रसिद्ध करणेबाबत..", href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/02/202602231371509840.pdf", title: "डाउनलोड" },
    { text: "कारागृह विभागातील तांत्रिक संवर्गातील पदोन्नतीच्या पदांची दि.०१.०१.२०२६ रोजीची तात्पुरती सेवाजेष्ठता सूची प्रसिद्ध करणेबाबत", href: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/02/202602231238232966.pdf", title: "डाउनलोड" }
  ],
  footer_banners: [
    { img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/03/2019032275.png", img_alt: "ओपन गव्हर्नमेंट डेटा (OGD) प्लॅटफॉर्म इंडिया", href: "https://data.gov.in/" },
    { img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/03/2019032259.png", img_alt: "मेक इन इंडिया बॅनर", href: "http://www.makeinindia.com/" },
    { img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/03/2019032251.png", img_alt: "अविश्वसनीय भारत", href: "https://incredibleindia.org/" },
    { img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/04/202604061557347410.png", img_alt: "भारताचे राष्ट्रीय पोर्टल", href: "https://www.india.gov.in/" },
    { img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/05/2019052265.png", img_alt: "डिजिटल भारत", href: "http://www.digitalindia.gov.in/" },
    { img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/03/2019032217.png", img_alt: "भारताचे पंतप्रधान", href: "https://www.pmindia.gov.in/" },
    { img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/04/2019041050.png", img_alt: "मायगव्ह", href: "https://www.mygov.in/" }
  ],
  footer_links: [
    { text: "अभिप्राय", href: "https://mahaprisons.gov.in/%e0%a4%85%e0%a4%ad%e0%a4%bf%e0%a4%aa%e0%a5%8d%e0%a4%b0%e0%a4%be%e0%a4%af/", title: "अभिप्राय" },
    { text: "वेबसाइट धोरणे", href: "https://mahaprisons.gov.in/%e0%a4%b5%e0%a5%87%e0%a4%ac%e0%a4%b8%e0%a4%be%e0%a4%87%e0%a4%9f-%e0%a4%a7%e0%a5%8b%e0%a4%b0%e0%a4%a3%e0%a5%87/", title: "वेबसाइट धोरणे" },
    { text: "आमच्याशी संपर्क साधा", href: "https://mahaprisons.gov.in/%e0%a4%86%e0%a4%ae%e0%a4%9a%e0%a5%8d%e0%a4%af%e0%a4%be%e0%a4%b6%e0%a5%80-%e0%a4%b8%e0%a4%82%e0%a4%aa%e0%a4%b0%e0%a5%8d%e0%a4%95-%e0%a4%b8%e0%a4%be%e0%a4%a7%e0%a4%be/", title: "आमच्याशी संपर्क साधा" },
    { text: "मदत", href: "https://mahaprisons.gov.in/%e0%a4%ae%e0%a4%a6%e0%a4%a4/", title: "मदत" },
    { text: "वेब माहिती व्यवस्थापक", href: "https://mahaprisons.gov.in/%e0%a4%b5%e0%a5%87%e0%a4%ac-%e0%a4%ae%e0%a4%be%e0%a4%b9%e0%a4%bf%e0%a4%a4%e0%a5%80-%e0%a4%b5%e0%a5%8d%e0%a4%af%e0%a4%b5%e0%a4%b8%e0%a5%8d%e0%a4%a5%e0%a4%be%e0%a4%aa%e0%a4%95/", title: "वेब माहिती व्यवस्थापक" },
    { text: "अभ्यागत सारांश", href: "https://mahaprisons.gov.in/%e0%a4%85%e0%a4%ad%e0%a5%8d%e0%a4%af%e0%a4%be%e0%a4%97%e0%a4%a4-%e0%a4%b8%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%82%e0%a4%b6/", title: "अभ्यागत सारांश" },
    { text: "राष्ट्रीय माहिती विज्ञान केंद्र", href: "http://www.nic.in/", title: "राष्ट्रीय माहिती विज्ञान केंद्र" },
    { text: "भारत सरकारचे इलेक्ट्रॉनिक्स आणि माहिती तंत्रज्ञान मंत्रालय", href: "http://meity.gov.in/", title: "भारत सरकारचे इलेक्ट्रॉनिक्स आणि माहिती तंत्रज्ञान मंत्रालय" }
  ],
  copyrights_text: "मालकीची सामग्री महाराष्ट्र कारागृह विभाग. राष्ट्रीय माहिती विज्ञान केंद्र, भारत सरकारचे इलेक्ट्रॉनिक्स आणि माहिती तंत्रज्ञान मंत्रालयद्वारे विकसित आणि होस्ट केलेले. शेवटचे अद्यावत: जुलै ०३, २०२६"
};
export const mockHolidays2026 = [
  { date: '2026-01-26', type: 'gazetted', title: 'Republic Day / प्रजासत्ताक दिन' },
  { date: '2026-02-19', type: 'gazetted', title: 'Chhatrapati Shivaji Maharaj Jayanti / छत्रपती शिवाजी महाराज जयंती' },
  { date: '2026-02-26', type: 'gazetted', title: 'Mahashivratri / महाशिवरात्री' },
  { date: '2026-03-14', type: 'gazetted', title: 'Holi / होळी' },
  { date: '2026-03-19', type: 'gazetted', title: 'Gudi Padwa / गुढीपाडवा' },
  { date: '2026-03-28', type: 'gazetted', title: 'Ram Navami / रामनवमी' },
  { date: '2026-04-14', type: 'gazetted', title: 'Dr. Babasaheb Ambedkar Jayanti / डॉ. बाबासाहेब आंबेडकर जयंती' },
  { date: '2026-04-03', type: 'gazetted', title: 'Good Friday / गुड फ्रायडे' },
  { date: '2026-05-01', type: 'gazetted', title: 'Maharashtra Day / महाराष्ट्र दिन' },
  { date: '2026-05-26', type: 'restricted', title: 'Buddha Purnima / बुद्ध पौर्णिमा' },
  { date: '2026-06-25', type: 'restricted', title: 'Bakri Eid / बकरी ईद' },
  { date: '2026-07-26', type: 'restricted', title: 'Moharram / मोहरम' },
  { date: '2026-08-15', type: 'gazetted', title: 'Independence Day / स्वातंत्र्य दिन' },
  { date: '2026-08-28', type: 'restricted', title: 'Raksha Bandhan / रक्षाबंधन' },
  { date: '2026-09-15', type: 'gazetted', title: 'Ganesh Chaturthi / गणेश चतुर्थी' },
  { date: '2026-09-25', type: 'restricted', title: 'Anant Chaturdashi / अनंत चतुर्दशी' },
  { date: '2026-10-02', type: 'gazetted', title: 'Mahatma Gandhi Jayanti / महात्मा गांधी जयंती' },
  { date: '2026-10-21', type: 'gazetted', title: 'Dussehra / दसरा' },
  { date: '2026-11-08', type: 'gazetted', title: 'Diwali (Laxmi Pujan) / दिवाळी लक्ष्मीपूजन' },
  { date: '2026-11-09', type: 'gazetted', title: 'Diwali Balipratipada / दिवाळी बलिप्रतिपदा' },
  { date: '2026-11-10', type: 'gazetted', title: 'Bhaubeej / भाऊबीज' },
  { date: '2026-11-23', type: 'restricted', title: 'Guru Nanak Jayanti / गुरु नानक जयंती' },
  { date: '2026-12-25', type: 'gazetted', title: 'Christmas / नाताळ' }
];
