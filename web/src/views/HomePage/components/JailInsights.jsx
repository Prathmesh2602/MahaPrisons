"use client";
import React from 'react';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { translations } from '../../../data/translations';
import * as LucideIcons from 'lucide-react';

const JailInsights = ({ data }) => {
  const { language } = useAccessibility();
  const lang = language;
  const t = (text) => translations[text]?.[lang] || text;
  
  const d = data || {};
  const youtubeUrl = d.youtubeUrl || "https://www.youtube.com/@CShamkant";
  const cards = d.cards || [
    { title: { mr: "सुधारणा आणि पुनर्वसन", en: "Reform and Rehabilitation" }, desc: { mr: "कैद्यांच्या सर्वांगीण विकासासाठी आणि त्यांना समाजाच्या मुख्य प्रवाहात आणण्यासाठी विशेष प्रयत्न.", en: "Special efforts for overall development of inmates." } },
    { title: { mr: "शेती आणि वृक्षारोपण", en: "Agriculture and Plantation" }, desc: { mr: "मोकळ्या जागेचा वापर करून शेती आणि पर्यावरण संवर्धनासाठी मोठ्या प्रमाणावर वृक्षारोपण.", en: "Farming in open spaces and large-scale plantation." } },
    { title: { mr: "कौशल्य विकास कार्यक्रम", en: "Skill Development" }, desc: { mr: "वेल्डिंग, सुतारकाम आणि अन्न प्रक्रिया यांसारख्या व्यावसायिक प्रशिक्षणातून स्वावलंबन.", en: "Self-reliance through vocational training." } },
    { title: { mr: "शृंखला उपहारगृह", en: "Chain Canteen" }, desc: { mr: "कैद्यांमार्फत चालवले जाणारे हॉटेल, जिथे त्यांना रोजगार आणि कौशल्य विकासाची संधी मिळते.", en: "Hotel run by inmates providing employment opportunities." } },
    { title: { mr: "ऐतिहासिक वारसा", en: "Historical Heritage" }, desc: { mr: "येरवडा कारागृहाला मोठा इतिहास लाभला असून, येथे महात्मा गांधी आणि इतर स्वातंत्र्यसैनिकांना ठेवण्यात आले होते.", en: "Yerwada jail has a rich history." } },
    { title: { mr: "शिक्षण आणि साक्षरता", en: "Education and Literacy" }, desc: { mr: "कैद्यांसाठी मूलभूत साक्षरता आणि मुक्त विद्यापीठांमार्फत उच्च शिक्षणाच्या सुविधा.", en: "Basic literacy and higher education facilities." } }
  ];

  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-gray-50 to-[#F1F5F9] dark-mode:from-gray-900 dark-mode:to-gray-900 overflow-hidden relative border-b border-gray-200/60 dark-mode:border-gray-850" data-block-type="jail_insights">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 dark-mode:bg-blue-900/10 blur-[100px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-100/40 dark-mode:bg-amber-900/10 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-semibold uppercase tracking-widest block mb-1">
              {d.subheading?.[lang] || d.subheading?.mr || t("अधिक माहितीसाठी")}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0F3D66] dark-mode:text-blue-300 font-poppins pb-2 relative inline-block">
              {d.heading?.[lang] || d.heading?.mr || t("येरवडा खुले कारागृह: एक दृष्टिक्षेप")}
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-amber-500 rounded-full" />
            </h2>
          </div>
          <a 
            href={youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-white dark-mode:bg-gray-800 border border-gray-200 dark-mode:border-gray-700 hover:border-red-500/50 hover:shadow-md hover:shadow-red-500/10 px-5 py-2.5 rounded-full text-sm font-semibold text-gray-700 dark-mode:text-gray-200 transition-all duration-300"
          >
            <LucideIcons.PlayCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            <span>{t("Youtube चॅनेलला भेट द्या")}</span>
            <LucideIcons.ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-min">
          
          {cards.map((card, index) => {
            const styles = [
              {
                span: "lg:col-span-2",
                icon: LucideIcons.HeartHandshake,
                gradientMain: "from-teal-400/20",
                gradientHover: "group-hover:bg-teal-400/30",
                iconColor: "text-teal-500",
                iconBg: "from-teal-500 to-emerald-600",
                shadowColor: "shadow-teal-500/20",
                isRow: true,
                rotateIcon: "-rotate-12",
                iconHoverRotate: "group-hover:-rotate-3"
              },
              {
                span: "lg:col-span-1",
                icon: LucideIcons.Sprout,
                gradientMain: "from-green-400/20",
                gradientHover: "group-hover:bg-green-400/30",
                iconColor: "text-green-500",
                iconBg: "from-green-500 to-emerald-600",
                shadowColor: "shadow-green-500/20",
                isRow: false,
                rotateIcon: "rotate-12",
                iconHoverRotate: "group-hover:-rotate-3"
              },
              {
                span: "lg:col-span-1",
                icon: LucideIcons.Wrench,
                gradientMain: "from-amber-400/20",
                gradientHover: "group-hover:bg-amber-400/30",
                iconColor: "text-amber-500",
                iconBg: "from-amber-500 to-orange-600",
                shadowColor: "shadow-amber-500/20",
                isRow: false,
                rotateIcon: "-rotate-12",
                iconHoverRotate: "group-hover:rotate-3"
              },
              {
                span: "lg:col-span-1 md:col-span-1",
                icon: LucideIcons.Utensils,
                gradientMain: "from-rose-400/20",
                gradientHover: "group-hover:bg-rose-400/30",
                iconColor: "text-rose-500",
                iconBg: "from-rose-500 to-pink-600",
                shadowColor: "shadow-rose-500/20",
                isRow: false,
                rotateIcon: "rotate-12",
                iconHoverRotate: "group-hover:-rotate-3"
              },
              {
                span: "lg:col-span-2 md:col-span-2",
                icon: LucideIcons.Landmark,
                gradientMain: "from-indigo-400/20",
                gradientHover: "group-hover:bg-indigo-400/30",
                iconColor: "text-indigo-500",
                iconBg: "from-indigo-500 to-purple-600",
                shadowColor: "shadow-indigo-500/20",
                isRow: true,
                rotateIcon: "-rotate-12",
                iconHoverRotate: "group-hover:-rotate-3"
              },
              {
                span: "lg:col-span-1",
                icon: LucideIcons.BookOpen,
                gradientMain: "from-cyan-400/20",
                gradientHover: "group-hover:bg-cyan-400/30",
                iconColor: "text-cyan-500",
                iconBg: "from-cyan-500 to-blue-600",
                shadowColor: "shadow-cyan-500/20",
                isRow: false,
                rotateIcon: "rotate-12",
                iconHoverRotate: "group-hover:rotate-3"
              }
            ];

            const style = styles[index % styles.length];
            const Icon = (card.icon && LucideIcons[card.icon]) ? LucideIcons[card.icon] : style.icon;

            return (
              <div key={index} className={`group ${style.span} relative bg-white/70 dark-mode:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/50 dark-mode:border-gray-700/50 shadow shadow-gray-200/40 dark-mode:shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1`}>
                <div className={`absolute top-0 right-0 ${style.isRow ? 'w-64 h-64 blur-3xl -mr-20 -mt-20' : 'w-48 h-48 blur-2xl -mr-16 -mt-16'} bg-gradient-to-bl ${style.gradientMain} to-transparent rounded-full pointer-events-none ${style.gradientHover} transition-colors`}></div>
                
                <Icon className={`absolute ${style.isRow ? '-bottom-10 -right-10 w-48 h-48' : '-bottom-6 -right-6 w-36 h-36'} ${style.iconColor} opacity-5 ${style.rotateIcon} pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700`} />
                
                <div className={`relative z-10 ${style.isRow ? 'flex flex-col md:flex-row gap-4 items-start md:items-center h-full' : ''}`}>
                  <div className={`${style.isRow ? 'shrink-0 w-12 h-12' : 'w-10 h-10 mb-4'} rounded-xl bg-gradient-to-br ${style.iconBg} flex items-center justify-center text-white shadow-sm ${style.shadowColor} group-hover:scale-110 ${style.iconHoverRotate} transition-transform duration-500`}>
                    <Icon className={style.isRow ? 'w-6 h-6' : 'w-5 h-5'} />
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold text-gray-900 dark-mode:text-white font-poppins ${style.isRow ? 'mb-1' : 'mb-2'}`}>
                      {card.title?.[lang] || card.title?.mr}
                    </h3>
                    <p className={`text-gray-600 dark-mode:text-gray-400 text-xs md:text-sm leading-relaxed ${style.isRow ? 'max-w-2xl' : ''}`}>
                      {card.desc?.[lang] || card.desc?.mr}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
};

export default JailInsights;
