"use client";
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { socialActivitiesData } from '../data/socialActivitiesData';
import { Scissors, Sparkles, ShieldCheck, Check, Star, Users } from 'lucide-react';

const iconMap = {
  Scissors, Sparkles, ShieldCheck, Razor: Scissors // fallback
};

const HeroWithPricingList = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || socialActivitiesData[dataId];

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = originalStyle;
  }, []);

  const getTranslation = (obj) => {
    if (!obj) return '';
    return obj[language] || obj.en;
  };

  return (
    <div data-block-type="template" className="min-h-screen bg-gray-50 dark-mode:bg-gray-950 text-gray-900 dark-mode:text-gray-100">
      
      {/* Full Width Hero with Overlay */}
      <div data-block-type="template_hero" className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={data.hero?.heroImage} alt="Salon Unit" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 -mt-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs uppercase tracking-widest font-semibold mb-6"
            >
              {(() => {
                const IconName = data.sectionHeaders?.training?.icon;
                const CustomIcon = IconName ? iconMap[IconName] : null;
                return CustomIcon ? <CustomIcon className="w-3 h-3" /> : <Scissors className="w-3 h-3" />;
              })()}
              {data.sectionHeaders?.training?.title ? getTranslation(data.sectionHeaders.training.title) : (language === 'mr' ? 'व्यावसायिक प्रशिक्षण' : 'Vocational Training')}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight"
            >
              {getTranslation(data.hero?.title)}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300 font-medium mb-8"
            >
              {getTranslation(data.hero?.subtitle)}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 lg:px-12 py-10 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Description Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8 bg-white dark-mode:bg-gray-900 rounded-2xl p-6 md:p-6 shadow-xl border border-gray-100 dark-mode:border-gray-800"
          >
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3 border-b border-gray-100 dark-mode:border-gray-800 pb-4">
              <Star className="w-6 h-6 text-yellow-500" />
              {language === 'mr' ? 'उपक्रमाविषयी' : 'About the Initiative'}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark-mode:text-gray-400 mb-8">
              {getTranslation(data.hero?.description)}
            </p>

            <div data-block-type="template_impact" className="bg-gray-50 dark-mode:bg-gray-950 p-6 rounded-xl border border-gray-100 dark-mode:border-gray-800">
              <div className="flex items-center gap-4 mb-2">
                <Users className="w-8 h-8 text-blue-600 dark-mode:text-blue-400" />
                <span className="text-xl font-black text-gray-900 dark-mode:text-white">{data.impact.value}</span>
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{getTranslation(data.impact.label)}</div>
              <p className="text-sm text-gray-600 dark-mode:text-gray-400">{getTranslation(data.impact.desc)}</p>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-lg font-bold mb-6 px-2">
              {data.sectionHeaders?.impact?.title ? getTranslation(data.sectionHeaders.impact.title) : (language === 'mr' ? 'प्रशिक्षण व सेवा' : 'Training & Services')}
            </h3>
            
            <div data-block-type="template_services" className="flex flex-col gap-4">
              {data.services.map((service, idx) => {
                const Icon = iconMap[service.icon] || Check;
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                    key={idx} className="group bg-white dark-mode:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-100 dark-mode:border-gray-800 hover:border-blue-500 dark-mode:hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-5"
                  >
                    <div className="w-8 h-8 bg-gray-50 dark-mode:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-50 dark-mode:group-hover:bg-blue-900/30 transition-colors">
                      <Icon className="w-6 h-6 text-gray-500 group-hover:text-blue-600 dark-mode:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="font-semibold text-lg text-gray-800 dark-mode:text-gray-200">
                      {getTranslation(service.name)}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default HeroWithPricingList;

