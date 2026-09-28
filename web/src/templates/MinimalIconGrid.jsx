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

const MinimalIconGrid = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="relative min-h-screen bg-[#FFF5F7] dark-mode:bg-[#2A1B1F] font-poppins text-gray-800 dark-mode:text-gray-200 overflow-hidden">
      
      {/* Soft Organic Header Background */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-[#FFE4E8] dark-mode:bg-[#3D262B] rounded-b-[50%] md:rounded-b-[100%] transform scale-x-150 origin-top -z-10" />

      <div data-block-type="template_hero" className="container mx-auto px-4 py-16 max-w-5xl relative z-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-16 h-16 bg-white dark-mode:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-rose-500">
          {(() => {
            const HeroIcon = getIcon(data.sectionHeaders?.hero?.icon, 'Heart');
            return <HeroIcon className="w-8 h-8 fill-current" />;
          })()}
        </motion.div>
        
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 dark-mode:text-rose-300 mb-4 tracking-tight">
          {data.sectionHeaders?.hero?.title ? getTranslation(data.sectionHeaders.hero.title) : getTranslation(data.hero?.title)}
        </motion.h1>
        
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-rose-700 dark-mode:text-rose-400 font-medium">
          {getTranslation(data.hero?.subtitle)}
        </motion.p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pb-24">
        
        <div data-block-type="template_description" className="flex flex-col lg:flex-row items-center gap-6 mb-16 relative">
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-full lg:w-1/2">
            <div className="bg-white dark-mode:bg-[#1E1416] p-8 md:p-10 rounded-3xl rounded-tl-none shadow-xl border border-rose-100 dark-mode:border-rose-900/30">
              <p className="text-lg leading-relaxed text-gray-700 dark-mode:text-gray-300 font-medium">
                {getTranslation(data.hero?.description)}
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="w-full lg:w-1/2 relative">
             <div className="absolute inset-0 bg-rose-200 dark-mode:bg-rose-900/50 rounded-3xl rounded-br-none transform translate-x-4 translate-y-4" />
             <img src={data.hero?.heroImage} alt={getTranslation(data.hero?.title) || "Image"} className="relative z-10 w-full h-[400px] object-cover rounded-3xl rounded-br-none shadow-lg" />
          </motion.div>
        </div>

        {/* Stats Circles */}
        <div data-block-type="template_stats" className="mb-16 relative">
          {data.sectionHeaders?.stats?.title && (
            <h3 className="text-2xl font-bold text-center text-rose-900 dark-mode:text-rose-300 mb-8 flex items-center justify-center gap-2">
              {(() => {
                const StatsIcon = getIcon(data.sectionHeaders.stats.icon, 'Heart');
                return <StatsIcon className="w-6 h-6 text-rose-500" />;
              })()}
              {getTranslation(data.sectionHeaders.stats.title)}
            </h3>
          )}
          <div className="flex flex-wrap justify-center gap-6">
            {(data.stats || []).map((stat, idx) => {
              const Icon = getIcon(stat.icon, 'Heart');
              return (
                <motion.div key={idx} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, type: "spring" }} className="w-48 h-48 bg-white dark-mode:bg-[#1E1416] rounded-full flex flex-col items-center justify-center text-center shadow-lg border-8 border-[#FFF5F7] dark-mode:border-[#2A1B1F]">
                  <Icon className="w-8 h-8 text-rose-500 mb-2" />
                  <div className="text-lg font-bold text-gray-900 dark-mode:text-white mb-1">{typeof stat.value === "object" ? getTranslation(stat.value) : stat.value}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase">{getTranslation(stat.label)}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key Features (Soft Cards) */}
        <div data-block-type="template_keyFunctions" className="mb-16 relative">
          {data.sectionHeaders?.keyFunctions?.title && (
            <h3 className="text-2xl font-bold text-center text-rose-900 dark-mode:text-rose-300 mb-8 flex items-center justify-center gap-2">
              {(() => {
                const KeyFuncIcon = getIcon(data.sectionHeaders.keyFunctions.icon, 'List');
                return <KeyFuncIcon className="w-6 h-6 text-rose-500" />;
              })()}
              {getTranslation(data.sectionHeaders.keyFunctions.title)}
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(data.keyFunctions || []).map((func, idx) => {
              const Icon = getIcon(func.icon, 'Heart');
              return (
                <motion.div key={idx} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white dark-mode:bg-[#1E1416] rounded-3xl p-8 shadow-sm border border-rose-50 dark-mode:border-rose-900/20 hover:shadow-xl transition-shadow flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-rose-100 dark-mode:bg-rose-900/40 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-rose-600 dark-mode:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark-mode:text-gray-100 mb-3">{getTranslation(func.title)}</h3>
                    <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed text-sm md:text-base">{getTranslation(func.desc)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Contact Pill */}
        <div data-block-type="template_contactInfo" className="relative">
          {data.sectionHeaders?.contactInfo?.title && (
            <h3 className="text-xl font-bold text-center text-rose-900 dark-mode:text-rose-300 mb-6 flex items-center justify-center gap-2">
              {(() => {
                const ContactIcon = getIcon(data.sectionHeaders.contactInfo.icon, 'Phone');
                return <ContactIcon className="w-6 h-6 text-rose-500" />;
              })()}
              {getTranslation(data.sectionHeaders.contactInfo.title)}
            </h3>
          )}
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="bg-rose-100 dark-mode:bg-rose-900/30 rounded-3xl md:rounded-full py-6 px-12 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 border border-rose-200 dark-mode:border-rose-900/50 max-w-4xl mx-auto shadow-sm">
            {(Array.isArray(data.contactInfo) ? data.contactInfo : (
              [
                data.contactInfo?.address && { icon: 'MapPin', value: data.contactInfo.address },
                data.contactInfo?.phone && { icon: 'Phone', value: { en: data.contactInfo.phone, mr: data.contactInfo.phone } },
                data.contactInfo?.email && { icon: 'Mail', value: { en: data.contactInfo.email, mr: data.contactInfo.email } }
              ].filter(Boolean)
            )).map((info, idx) => {
              const Icon = getIcon(info.icon, 'Info');
              return (
                <div key={idx} className="flex items-center gap-3 text-rose-900 dark-mode:text-rose-200 font-medium text-center">
                  <Icon className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>{getTranslation(info.value)}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default MinimalIconGrid;
