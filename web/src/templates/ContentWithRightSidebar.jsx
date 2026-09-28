"use client";
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { facilitiesData } from '../data/facilitiesData';
import * as LucideIcons from 'lucide-react';

const getIcon = (iconName, fallbackName) => {
  if (iconName && LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  return LucideIcons[fallbackName] || LucideIcons.HelpCircle;
};

const ContentWithRightSidebar = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  const ChevronRight = getIcon('ChevronRight', 'ChevronRight');

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark-mode:bg-gray-950 font-poppins py-12 md:py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header section outside grid */}
        <div data-block-type="template_hero" className="text-center mb-12 relative p-2 rounded-xl transition-all">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark-mode:bg-emerald-900/30 text-emerald-700 dark-mode:text-emerald-400 font-bold tracking-wide text-sm mb-6">
            {(() => {
              const CustomIcon = getIcon(data.sectionHeaders?.hero?.icon, 'Scale');
              return <CustomIcon className="w-4 h-4" />;
            })()}
            {data.sectionHeaders?.hero?.title ? getTranslation(data.sectionHeaders.hero.title) : (language === 'mr' ? 'डीएलएसए' : 'DLSA')}
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark-mode:text-white mb-4">
            {getTranslation(data.hero?.title)}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-base text-gray-600 dark-mode:text-gray-400 max-w-2xl mx-auto">
            {getTranslation(data.hero?.subtitle)}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          
          {/* Main Large Image Block */}
          <motion.div data-block-type="template_description" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden relative shadow-lg">
            <img src={data.hero?.heroImage || data.heroImage} alt="DLSA" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <p className="text-white text-lg md:text-base font-medium leading-relaxed drop-shadow-md">
                "{getTranslation(data.hero?.description || data.description)}"
              </p>
            </div>
          </motion.div>

          {/* Right Side 4 Cards Section (Stats + Contact) */}
          <div data-block-type="template_sidebar" className="md:col-span-1 lg:col-span-2 md:row-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 contents">
            {(data.stats || []).map((stat, idx) => {
              const Icon = getIcon(stat.icon, 'Activity');
              return (
                <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + (idx * 0.1) }} className="bg-white dark-mode:bg-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg border border-gray-100 dark-mode:border-gray-700 hover:bg-emerald-50 dark-mode:hover:bg-emerald-900/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark-mode:bg-emerald-900/40 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-emerald-600 dark-mode:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900 dark-mode:text-white mb-1">{typeof stat.value === "object" ? getTranslation(stat.value) : stat.value}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{getTranslation(stat.label)}</div>
                  </div>
                </motion.div>
              );
            })}
            </div>

          {/* Contact Block (takes up 2 columns in some layouts) */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="md:col-span-3 lg:col-span-1 rounded-2xl bg-emerald-600 p-6 text-white flex flex-col justify-center shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              {(() => {
                const ContactIconBg = getIcon(data.sectionHeaders?.contactInfo?.icon, 'Phone');
                return <ContactIconBg className="w-40 h-40" />;
              })()}
            </div>
            <h3 className="text-lg font-bold mb-6 relative z-10">{data.sectionHeaders?.contactInfo?.title ? getTranslation(data.sectionHeaders.contactInfo.title) : (language === 'mr' ? 'संपर्क' : 'Contact')}</h3>
            <div className="space-y-4 relative z-10">
              {(Array.isArray(data.contactInfo) ? data.contactInfo : (
                [
                  data.contactInfo?.address && { icon: 'MapPin', value: data.contactInfo.address },
                  data.contactInfo?.phone && { icon: 'Phone', value: { en: data.contactInfo.phone, mr: data.contactInfo.phone } },
                  data.contactInfo?.email && { icon: 'Mail', value: { en: data.contactInfo.email, mr: data.contactInfo.email } }
                ].filter(Boolean)
              )).map((info, idx) => {
                const Icon = getIcon(info.icon, 'Info');
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 opacity-80 shrink-0 mt-0.5" /> 
                    <span className="text-sm leading-snug">{getTranslation(info.value)}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
          </div>

          {/* Key Functions Blocks (wide) */}
          <div data-block-type="template_keyFunctions" className="md:col-span-3 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(data.keyFunctions || []).map((func, idx) => {
            const Icon = getIcon(func.icon, 'Gavel');
            return (
              <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 + (idx * 0.1) }} className="bg-white dark-mode:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark-mode:border-gray-700 flex flex-col justify-center">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-4 bg-gray-50 dark-mode:bg-gray-700 rounded-2xl group-hover:bg-emerald-100 dark-mode:group-hover:bg-emerald-900/30 transition-colors">
                    <Icon className="w-8 h-8 text-gray-700 dark-mode:text-gray-300 group-hover:text-emerald-600 dark-mode:group-hover:text-emerald-400" />
                  </div>
                  <div className="w-6 h-6 rounded-full border border-gray-200 dark-mode:border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white dark-mode:bg-gray-800">
                    <ChevronRight className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark-mode:text-white mb-2">{getTranslation(func.title)}</h3>
                <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
              </motion.div>
            );
          })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContentWithRightSidebar;
