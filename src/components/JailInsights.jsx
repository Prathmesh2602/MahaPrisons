import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { translations } from '../data/translations';
import { 
  HeartHandshake, 
  Utensils, 
  Sprout, 
  Wrench, 
  PlayCircle,
  ArrowRight,
  BookOpen,
  Landmark
} from 'lucide-react';

const JailInsights = () => {
  const { language } = useAccessibility();
  const t = (text) => translations[text]?.[language] || text;

  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-gray-50 to-[#F1F5F9] dark-mode:from-gray-900 dark-mode:to-gray-900 overflow-hidden relative border-b border-gray-200/60 dark-mode:border-gray-850">
      
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
              {t("अधिक माहितीसाठी")}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0F3D66] dark-mode:text-blue-300 font-poppins pb-2 relative inline-block">
              {t("येरवडा खुले कारागृह: एक दृष्टिक्षेप")}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full" />
            </h2>
          </div>
          <a 
            href="https://www.youtube.com/@CShamkant" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-white dark-mode:bg-gray-800 border border-gray-200 dark-mode:border-gray-700 hover:border-red-500/50 hover:shadow-md hover:shadow-red-500/10 px-5 py-2.5 rounded-full text-sm font-semibold text-gray-700 dark-mode:text-gray-200 transition-all duration-300"
          >
            <PlayCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            <span>{t("Youtube चॅनेलला भेट द्या")}</span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-min">
          
          {/* Card 1: Main Focus (Spans 2 columns on lg) */}
          <div className="group lg:col-span-2 relative bg-white/70 dark-mode:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/50 dark-mode:border-gray-700/50 shadow shadow-gray-200/40 dark-mode:shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-blue-400/30 transition-colors"></div>
            {/* Blended Background Graphic */}
            <HeartHandshake className="absolute -bottom-8 -right-8 w-48 h-48 text-blue-500 opacity-5 -rotate-12 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-sm shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark-mode:text-white font-poppins mb-2">
                  {t("सुधारणा आणि पुनर्वसन")}
                </h3>
                <p className="text-gray-600 dark-mode:text-gray-300 leading-relaxed max-w-xl text-sm">
                  {t("कैद्यांच्या सर्वांगीण विकासासाठी आणि त्यांना समाजाच्या मुख्य प्रवाहात आणण्यासाठी विशेष प्रयत्न.")}
                </p>
              </div>
              
              <div className="mt-6 inline-flex">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark-mode:text-blue-400 bg-blue-50 dark-mode:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark-mode:border-blue-800">
                  रिforM.....
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Agriculture (Spans 1 column) */}
          <div className="group lg:col-span-1 relative bg-white/70 dark-mode:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/50 dark-mode:border-gray-700/50 shadow shadow-gray-200/40 dark-mode:shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-green-400/20 to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:bg-green-400/30 transition-colors"></div>
            {/* Blended Background Graphic */}
            <Sprout className="absolute -bottom-6 -right-6 w-36 h-36 text-green-500 opacity-5 rotate-12 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-sm shadow-green-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark-mode:text-white font-poppins mb-2">
                {t("शेती आणि वृक्षारोपण")}
              </h3>
              <p className="text-gray-600 dark-mode:text-gray-400 text-xs md:text-sm leading-relaxed">
                {t("मोकळ्या जागेचा वापर करून शेती आणि पर्यावरण संवर्धनासाठी मोठ्या प्रमाणावर वृक्षारोपण.")}
              </p>
            </div>
          </div>

          {/* Card 3: Skills (Spans 1 column) */}
          <div className="group lg:col-span-1 relative bg-white/70 dark-mode:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/50 dark-mode:border-gray-700/50 shadow shadow-gray-200/40 dark-mode:shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:bg-amber-400/30 transition-colors"></div>
            {/* Blended Background Graphic */}
            <Wrench className="absolute -bottom-6 -right-6 w-36 h-36 text-amber-500 opacity-5 -rotate-12 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mb-4 shadow-sm shadow-amber-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark-mode:text-white font-poppins mb-2">
                {t("कौशल्य विकास कार्यक्रम")}
              </h3>
              <p className="text-gray-600 dark-mode:text-gray-400 text-xs md:text-sm leading-relaxed">
                {t("वेल्डिंग, सुतारकाम आणि अन्न प्रक्रिया यांसारख्या व्यावसायिक प्रशिक्षणातून स्वावलंबन.")}
              </p>
            </div>
          </div>

          {/* Card 4: Restaurant (Spans 1 column) */}
          <div className="group lg:col-span-1 md:col-span-1 relative bg-white/70 dark-mode:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/50 dark-mode:border-gray-700/50 shadow shadow-gray-200/40 dark-mode:shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-400/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-rose-400/30 transition-colors"></div>
            {/* Blended Background Graphic */}
            <Utensils className="absolute -bottom-6 -right-6 w-36 h-36 text-rose-500 opacity-5 rotate-12 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-sm shadow-rose-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark-mode:text-white font-poppins mb-2">
                {t("शृंखला उपहारगृह")}
              </h3>
              <p className="text-gray-600 dark-mode:text-gray-400 text-xs md:text-sm leading-relaxed">
                {t("कैद्यांमार्फत चालवले जाणारे हॉटेल, जिथे त्यांना रोजगार आणि कौशल्य विकासाची संधी मिळते.")}
              </p>
            </div>
          </div>

          {/* Card 5: Historical Heritage (Spans 2 columns on lg, 2 on md) */}
          <div className="group lg:col-span-2 md:col-span-2 relative bg-white/70 dark-mode:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/50 dark-mode:border-gray-700/50 shadow shadow-gray-200/40 dark-mode:shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-400/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-indigo-400/30 transition-colors"></div>
            {/* Blended Background Graphic */}
            <Landmark className="absolute -bottom-10 -right-10 w-48 h-48 text-indigo-500 opacity-5 -rotate-12 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center h-full">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark-mode:text-white font-poppins mb-1">
                  {t("ऐतिहासिक वारसा")}
                </h3>
                <p className="text-gray-600 dark-mode:text-gray-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                  {t("येरवडा कारागृहाला मोठा इतिहास लाभला असून, येथे महात्मा गांधी आणि इतर स्वातंत्र्यसैनिकांना ठेवण्यात आले होते.")}
                </p>
              </div>
            </div>
          </div>

          {/* Card 6: Education (Spans 1 column) */}
          <div className="group lg:col-span-1 relative bg-white/70 dark-mode:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/50 dark-mode:border-gray-700/50 shadow shadow-gray-200/40 dark-mode:shadow-black/20 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:bg-cyan-400/30 transition-colors"></div>
            {/* Blended Background Graphic */}
            <BookOpen className="absolute -bottom-6 -right-6 w-36 h-36 text-cyan-500 opacity-5 rotate-12 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-sm shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark-mode:text-white font-poppins mb-2">
                {t("शिक्षण आणि साक्षरता")}
              </h3>
              <p className="text-gray-600 dark-mode:text-gray-400 text-xs md:text-sm leading-relaxed">
                {t("कैद्यांसाठी मूलभूत साक्षरता आणि मुक्त विद्यापीठांमार्फत उच्च शिक्षणाच्या सुविधा.")}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default JailInsights;
