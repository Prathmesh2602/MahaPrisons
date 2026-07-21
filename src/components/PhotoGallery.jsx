import React, { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { ArrowUpRight, Grid, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotoGallery = () => {
  const { language, t } = useAccessibility();
  const [activePhoto, setActivePhoto] = useState(0);

  const galleryInfo = mockHomepageData.gallery;

  // Custom mock photos showing Yerawada Open Prison units, statistics, and training programs
  const galleryItems = [
    {
      img_src: "/gallary/1.jpeg",
      img_alt: "Shrinkhala Restaurant - Yerawada Open Prison, Pune",
      title_mr: "श्रृंखला उपहारगृह - येरवडा खुले कारागृह, पुणे",
      title_en: "Shrinkhala Restaurant - Yerawada Open Prison, Pune",
      desc_mr: "येरवडा खुल्या कारागृहातील बंदीवानांद्वारे संचालित 'श्रृंखला उपहारगृह', जिथे ग्राहकांसाठी बंदीवानांनी तयार केलेले रुचकर व दर्जेदार अन्नपदार्थ उपलब्ध करून दिले जातात.",
      desc_en: "Operated by inmates of Yerawada Open Prison, Pune, 'Shrinkhala Restaurant' offers delicious, high-quality food prepared by inmates, promoting culinary skills."
    },
    {
      img_src: "/gallary/2.jpeg",
      img_alt: "Yerawada Open Prison Statistics",
      title_mr: "कारागृह सांख्यिकी आणि वैशिष्ट्ये",
      title_en: "Prison Statistics & Key Features",
      desc_mr: "येरवडा खुल्या कारागृहाची महत्त्वाची आकडेवारी - अधिकृत क्षमता ४०० बंदीवान, सद्य बंदी संख्या २३० आणि २६५ एकरचा विस्तीर्ण परिसर सुधारणा व पुनर्वसनासाठी कार्यरत.",
      desc_en: "Key figures of Yerawada Open Prison featuring an authorized capacity of 400 inmates, 230 current population, and a vast 265-acre campus focusing on rehabilitation."
    },
    {
      img_src: "/gallary/3.jpeg",
      img_alt: "Maharashtra Prison Department Institutions",
      title_mr: "महाराष्ट्रातील खुल्या सुधारक संस्थांची रचना",
      title_en: "Open Correctional Facilities in Maharashtra",
      desc_mr: "महाराष्ट्र कारागृह विभागांतर्गत असलेल्या खुल्या सुधारक संस्थांचे वर्गीकरण - ५ खुली कारागृहे, १२ निम-खुली कारागृहे, २ महिला खुली कारागृहे आणि १ खुली वसाहत.",
      desc_en: "Overview of Maharashtra Prison Department's open facilities including 5 Open Jails, 12 Semi-Open Jails, 2 Female Open Jails, and 1 Open Colony."
    },
    {
      img_src: "/gallary/4.jpeg",
      img_alt: "Agriculture Section - Yerawada Open Prison",
      title_mr: "कृषी विभाग - येरवडा खुले कारागृह",
      title_en: "Agriculture Section - Yerawada Open Prison",
      desc_mr: "खुली कारागृहातील बंदीवान शेती क्षेत्रात विविध पिके आणि भाजीपाला लागवड करतात. याद्वारे त्यांना आधुनिक कृषी तंत्रज्ञान व सेंद्रिय शेतीचे प्रत्यक्ष शिक्षण मिळते.",
      desc_en: "Inmates of Yerawada Open Prison engaged in farming activities, learning modern agricultural methods, organic crop production, and harvesting on farmlands."
    },
    {
      img_src: "/gallary/5.jpeg",
      img_alt: "K. K. Mangal Lawn - Yerawada Open Prison",
      title_mr: "के.के. मंगल लॉन - येरवडा खुले कारागृह",
      title_en: "K. K. Mangal Lawn - Yerawada Open Prison",
      desc_mr: "येरवडा खुल्या कारागृहातील बंदीवानांद्वारे व्यवस्थापित आणि देखरेख केले जाणारे के.के. मंगल लॉन. याद्वारे बंदीवानांना लँडस्केप डिझाईन व बागकामाचे प्रशिक्षण दिले जाते.",
      desc_en: "K. K. Mangal Lawn is a spacious wedding and event venue managed and maintained by Yerawada Open Prison inmates, providing landscaping and gardening training."
    },
    {
      img_src: "/gallary/6.jpeg",
      img_alt: "Press Section - Maharashtra Prison Industry",
      title_mr: "प्रेस (इस्त्री) विभाग - महाराष्ट्र कारागृह उद्योग",
      title_en: "Press Section - Maharashtra Prison Industry",
      desc_mr: "येरवडा खुले व जिल्हा कारागृहात बंदीवानांसाठी चालवला जाणारा आधुनिक प्रेस (इस्त्री) विभाग, जिथे कपड्यांची स्वच्छता व इस्त्री सेवा कौशल्याचे धडे दिले जातात.",
      desc_en: "A professional ironing and laundry service department operated by inmates at Yerawada, training them in commercial laundry operations and garment care."
    },
    {
      img_src: "/gallary/7.jpeg",
      img_alt: "Salon Unit - Yerawada Open & District Prison",
      title_mr: "सलून विभाग - येरवडा खुले व जिल्हा कारागृह",
      title_en: "Salon Unit - Yerawada Open & District Prison",
      desc_mr: "बंदीवानांना स्वावलंबी बनवण्यासाठी सुरू केलेला सलून विभाग. येथे बंदीवानांना केशरचना, दाढी करणे व त्वचा निगा यांचे प्रत्यक्ष व्यावसायिक प्रशिक्षण दिले जाते.",
      desc_en: "A vocational salon unit operated by inmates providing professional training in haircutting, grooming, and personal care services for self-reliance."
    },
    {
      img_src: "/gallary/8.jpeg",
      img_alt: "Nursery Section - Yerawada Open Prison",
      title_mr: "रोपवाटिका (नर्सरी) विभाग - येरवडा खुले कारागृह",
      title_en: "Nursery Section - Yerawada Open Prison",
      desc_mr: "येरवडा कारागृहातील आधुनिक रोपवाटिका विभाग. येथे विविध प्रकारची फुले, फळे व वनस्पतींचे वैज्ञानिक पद्धतीने संवर्धन केले जाते आणि बंदीवानांना फलोत्पादन शिकवले जाते.",
      desc_en: "A greenhouse nursery program where inmates are trained in scientific horticulture, composting, and cultivating quality plants for a greener environment."
    },
    {
      img_src: "/gallary/9.jpeg",
      img_alt: "Masonry Unit - Yerawada Open Prison",
      title_mr: "गवंडी काम आणि बांधकाम विभाग - येरवडा खुले कारागृह",
      title_en: "Masonry Unit - Yerawada Open Prison",
      desc_mr: "गवंडी काम आणि बांधकामाचे व्यावसायिक प्रशिक्षण देणारा विभाग, जेथे बंदीवानांना वीटकाम आणि प्लास्टरिंगचे कौशल्य शिकवले जाते.",
      desc_en: "Inmates undergoing vocational training in bricklaying, cement mixing, and masonry construction to build vocational skills."
    },
    {
      img_src: "/gallary/10.jpeg",
      img_alt: "Cattle Farming & Dairy Unit",
      title_mr: "गोपालन आणि दुग्धव्यवसाय विभाग - येरवडा खुले कारागृह",
      title_en: "Cattle Farming & Dairy Unit - Yerawada Open Prison",
      desc_mr: "बंदीवानांना दुग्धव्यवसाय, गोवंश संगोपन आणि दूध उत्पादन तसेच पशुधनाचे व्यवस्थापन शिकवणारा विभाग.",
      desc_en: "Inmates learning dairy farming, cattle care, milk production, and livestock management, supporting self-sustainability."
    },
    {
      img_src: "/gallary/11.jpeg",
      img_alt: "Poultry Farming",
      title_mr: "कुक्कुटपालन विभाग - येरवडा खुले कारागृह",
      title_en: "Poultry Farming - Yerawada Open Prison",
      desc_mr: "बंदीवानांना व्यावसायिक कुक्कुटपालनाचे धडे, ज्यामध्ये कोंबड्यांचे संगोपन, आहार आणि शेड व्यवस्थापनाचा समावेश आहे.",
      desc_en: "Training in poultry farming, including feeding, care, disease control, and poultry farm management for inmates."
    },
    {
      img_src: "/gallary/12.jpeg",
      img_alt: "Laundry Unit - Yerawada Central Prison",
      title_mr: "कपडे धुलाई आणि इस्त्री केंद्र - येरवडा मध्यवर्ती कारागृह",
      title_en: "Laundry Unit - Yerawada Central Prison",
      desc_mr: "येरवडा मध्यवर्ती कारागृहातील कपडे धुलाई आणि इस्त्री केंद्र, जेथे बंदीवानांच्या मदतीने स्वच्छता आणि व्यावसायिक कौशल्यांवर भर दिला जातो.",
      desc_en: "A commercial-grade laundry facility at Yerawada Central Jail, providing garment washing and ironing services with focus on hygiene and dignity."
    },
    {
      img_src: "/gallary/13.jpeg",
      img_alt: "Minda Industrial Unit (Wire Harnessing)",
      title_mr: "मिंडा उद्योग विभाग (वायर हार्नेसिंग) - येरवडा खुले कारागृह",
      title_en: "Minda Industrial Unit (Wire Harnessing) - Yerawada Open Prison",
      desc_mr: "मिंडा इंडस्ट्रीजच्या सहकार्याने सुरू असलेला विभाग, जेथे बंदीवानांना ऑटोमोबाईल वायर हार्नेसिंग असेंब्लीचे तांत्रिक प्रशिक्षण दिले जाते.",
      desc_en: "An industrial collaboration with Minda Industries, where inmates are trained in automotive wire harnessing assembly, promoting advanced industrial skills."
    },
    {
      img_src: "/gallary/14.jpeg",
      img_alt: "Factory & Power Loom Unit",
      title_mr: "कारखाना आणि यंत्रमाग विभाग - येरवडा खुले कारागृह",
      title_en: "Factory & Power Loom Unit - Yerawada Open Prison",
      desc_mr: "कारागृहातील यंत्रमाग कारखाना जेथे बंदीवानांच्या साहाय्याने कापड निर्मिती केली जाते, ज्यामुळे त्यांना वस्त्रोद्योगातील मोठे तांत्रिक कौशल्य प्राप्त होते.",
      desc_en: "An industrial power loom factory where inmates produce fabrics for government use, developing advanced textile manufacturing and operations skills."
    },
    {
      img_src: "/gallary/15.jpeg",
      img_alt: "Shrinkhala Canteen - Yerawada Open Prison",
      title_mr: "श्रृंखला उपाहारगृह (कॅन्टीन) - येरवडा खुले कारागृह",
      title_en: "Shrinkhala Canteen - Yerawada Open Prison",
      desc_mr: "येरवडा खुल्या कारागृहातील बंदीवानांद्वारे चालवले जाणारे लोकप्रिय कॅन्टीन, जेथे लोकांना रुचकर आणि सात्विक भोजन रास्त दरात दिले जाते.",
      desc_en: "A popular open-air canteen serving delicious, home-style meals prepared under strict hygiene standards by Yerawada Open Jail inmates."
    },
    {
      img_src: "/gallary/16.jpeg",
      img_alt: "Traditional Wedding Art & Wall Painting",
      title_mr: "भिंतीवरील पारंपारिक चित्रकला - के.के. मंगल लॉन",
      title_en: "Traditional Wedding Art & Wall Painting - K.K. Mangal Lawn",
      desc_mr: "के.के. मंगल लॉनच्या भिंतीवर बंदीवानांनी साकारलेले लग्नघटिका दर्शविणारे सुंदर चित्र, जे त्यांच्यातील कलागुणांना आणि सुधारणेला वाव देते.",
      desc_en: "A beautiful wedding-themed mural painted on the wall of K. K. Mangal Lawn by talented prison inmates, highlighting their artistic reform."
    },
    {
      img_src: "/gallary/17.jpeg",
      img_alt: "Inmate Gym & Fitness Center",
      title_mr: "व्यायामशाळा आणि फिटनेस केंद्र - येरवडा खुले कारागृह",
      title_en: "Inmate Gym & Fitness Center - Yerawada Open Prison",
      desc_mr: "बंदीवानांना निरोगी, सुदृढ आणि सक्रिय जीवनशैली राखण्यासाठी प्रोत्साहित करणारे कारागृहातील सुसज्ज व्यायामशाळा (जिम) केंद्र.",
      desc_en: "A fully equipped indoor gym facility inside the prison premises to encourage physical fitness, strength training, and active health among inmates."
    },
    {
      img_src: "/gallary/WhatsApp Image 2026-07-20 at 19.57.30.jpeg",
      img_alt: "Inmate Fitness & Gym Center (Alternate View)",
      title_mr: "कारागृह व्यायामशाळा विभाग (दुसरे दृश्य)",
      title_en: "Inmate Fitness & Gym Center (Alternate View)",
      desc_mr: "कारागृहातील व्यायामशाळेचे दुसरे दृश्य, जेथे बंदीवानांना शारीरिक बळकटपणा आणि नियमित व्यायामासाठी विविध साधने उपलब्ध आहेत.",
      desc_en: "An alternate view of the gym facility, displaying additional strength training stations and setup designed for the physical well-being of inmates."
    }
  ];

  const handleNext = () => {
    setActivePhoto((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setActivePhoto((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="w-full bg-white dark-mode:bg-gray-950 py-20 px-4 md:px-8 border-b border-gray-200 dark-mode:border-gray-800 smooth-transition">
      <div className="max-w-7xl mx-auto">

        {/* Section title & View All action */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 border-b border-gray-100 dark-mode:border-gray-800 pb-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-widest block mb-2">
              {language === 'mr' ? 'दृश्य दालन' : 'Visual Gallery'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari">
              {t("छायाचित्र दालन")}
            </h2>
          </div>

          <a
            href={galleryInfo.view_all_href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#0F3D66] hover:bg-[#0F3D66] hover:text-white dark-mode:border-blue-400 dark-mode:hover:bg-blue-500 dark-mode:hover:text-gray-900 text-[#0F3D66] dark-mode:text-blue-300 rounded-full font-bold text-xs transition-all focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer self-center sm:self-end"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{t("सर्व पहा")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Column 1: Carousel Slider */}
          <div className="lg:col-span-8 relative bg-gray-900 border border-gray-200/80 dark-mode:border-gray-850 rounded-3xl overflow-hidden aspect-video shadow-md flex items-center justify-center group">

            <AnimatePresence>
              <motion.div
                key={activePhoto}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background image without blur */}
                <img
                  src={galleryItems[activePhoto].img_src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-110 opacity-40"
                />
                {/* Foreground image */}
                <motion.img
                  src={galleryItems[activePhoto].img_src}
                  alt={galleryItems[activePhoto].img_alt}
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-contain object-center z-10"
                />
              </motion.div>
            </AnimatePresence>

            {/* Left controller */}
            <button
              onClick={handlePrev}
              className="absolute left-4 w-11 h-11 rounded-full bg-black/40 hover:bg-[#0F3D66] text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg z-20"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right controller */}
            <button
              onClick={handleNext}
              className="absolute right-4 w-11 h-11 rounded-full bg-black/40 hover:bg-[#0F3D66] text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg z-20"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicator Overlay */}
            <div className="absolute top-4 right-4 bg-[#0F3D66]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-sm z-20">
              {activePhoto + 1} / {galleryItems.length}
            </div>
          </div>

          {/* Column 2: Info Card Detail */}
          <div className="lg:col-span-4 flex flex-col justify-center h-full">
            <div className="bg-[#F8FAFC] dark-mode:bg-gray-900 border border-gray-200/80 dark-mode:border-gray-850 rounded-3xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden h-full min-h-[250px]">
              {/* Highlight background corner */}
              <span className="absolute -top-12 -right-12 w-28 h-28 bg-[#0F766E]/5 rounded-full blur-xl" />

              <div className="flex items-center gap-2 text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-widest">
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'फोटो वर्णन' : 'Photo Details'}</span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-base font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari mb-2 leading-tight">
                  {language === 'mr' ? galleryItems[activePhoto].title_mr : galleryItems[activePhoto].title_en}
                </h3>
                <p className="text-xs font-semibold text-gray-600 dark-mode:text-gray-450 leading-relaxed font-devanagari">
                  {language === 'mr' ? galleryItems[activePhoto].desc_mr : galleryItems[activePhoto].desc_en}
                </p>
              </div>

              {/* Bullet indicators */}
              <div className="flex gap-1.5 flex-wrap pt-4 border-t border-gray-150 dark-mode:border-gray-800 mt-auto">
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`h-2.5 rounded-full transition-all border border-gray-300 dark-mode:border-gray-700 cursor-pointer ${idx === activePhoto ? 'bg-amber-500 w-6' : 'bg-gray-300 dark-mode:bg-gray-800 w-2.5'
                      }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default PhotoGallery;
