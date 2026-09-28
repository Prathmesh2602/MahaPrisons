"use client";
import React, { useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { facilitiesData } from '../data/facilitiesData';
import * as LucideIcons from 'lucide-react';

const getIcon = (iconName, fallbackName) => {
  if (iconName && LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  return LucideIcons[fallbackName] || LucideIcons.HelpCircle;
};

const HeroBannerWithBadges = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-white dark-mode:bg-black text-gray-900 dark-mode:text-white font-poppins overflow-hidden">
      
      {/* Parallax Hero */}
      <div data-block-type="template_hero" className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
          <img src={data.hero?.heroImage} alt={getTranslation(data.hero?.title) || "Hero Image"} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white dark-mode:to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-24 h-24 mx-auto border-4 border-yellow-400 rounded-full flex items-center justify-center backdrop-blur-md bg-black/20 mb-8 shadow-[0_0_50px_rgba(250,204,21,0.3)]">
            {(() => {
              const HeroIcon = getIcon(data.sectionHeaders?.hero?.icon, 'Award');
              return <HeroIcon className="w-8 h-8 text-yellow-400" />;
            })()}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-2xl">
            {data.sectionHeaders?.hero?.title ? getTranslation(data.sectionHeaders.hero.title) : getTranslation(data.hero?.title)}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg text-yellow-100 font-light max-w-2xl mx-auto drop-shadow-lg">
            {getTranslation(data.hero?.subtitle)}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pb-24">
        
        <div data-block-type="template_description" className="text-center max-w-3xl mx-auto -mt-10 mb-10 bg-white dark-mode:bg-gray-900 p-6 md:p-6 rounded-2xl shadow-2xl border border-gray-100 dark-mode:border-gray-800">
          <p className="text-base md:text-lg leading-relaxed text-gray-700 dark-mode:text-gray-300 font-medium">
            {getTranslation(data.hero?.description)}
          </p>
        </div>

        {/* Big Numbers Stats */}
        <div data-block-type="template_stats" className="mb-24">
          {data.sectionHeaders?.stats?.title && (
            <h3 className="text-2xl font-black text-center text-gray-900 dark-mode:text-white mb-12 flex items-center justify-center gap-3">
              {(() => {
                const StatsIcon = getIcon(data.sectionHeaders.stats.icon, 'TrendingUp');
                return <StatsIcon className="w-8 h-8 text-yellow-500" />;
              })()}
              {getTranslation(data.sectionHeaders.stats.title)}
            </h3>
          )}
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min((data.stats || []).length, 3)} gap-6`}>
            {(data.stats || []).map((stat, idx) => {
              const Icon = getIcon(stat.icon, 'Award');
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2, duration: 0.7 }} className="text-center">
                  <Icon className="w-8 h-8 text-yellow-500 mx-auto mb-6" />
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 dark-mode:text-white mb-4 tracking-tighter">
                    {typeof stat.value === "object" ? getTranslation(stat.value) : stat.value}
                  </div>
                  <div className="text-lg font-bold text-gray-500 dark-mode:text-gray-400 uppercase tracking-widest border-t border-gray-200 dark-mode:border-gray-800 pt-4 w-1/2 mx-auto">
                    {getTranslation(stat.label)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Diagonal Cards for Key Functions */}
        <div data-block-type="template_keyFunctions" className="space-y-32">
          {data.sectionHeaders?.keyFunctions?.title && (
            <h3 className="text-3xl font-black text-center text-gray-900 dark-mode:text-white mb-16 flex items-center justify-center gap-4">
              {(() => {
                const KeyFuncIcon = getIcon(data.sectionHeaders.keyFunctions.icon, 'Briefcase');
                return <KeyFuncIcon className="w-10 h-10 text-yellow-500" />;
              })()}
              {getTranslation(data.sectionHeaders.keyFunctions.title)}
            </h3>
          )}
          {(data.keyFunctions || []).map((func, idx) => {
            const Icon = getIcon(func.icon, 'Briefcase');
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`}>
                <motion.div initial={{ opacity: 0, x: isEven ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full md:w-1/2 relative">
                  <div className={`absolute inset-0 bg-yellow-400/20 rounded-2xl transform ${isEven ? 'rotate-3' : '-rotate-3'} scale-105`} />
                  <div className="bg-white dark-mode:bg-gray-800 p-6 rounded-2xl shadow-xl relative border border-gray-100 dark-mode:border-gray-700">
                     <Icon className="w-6 h-6 text-yellow-500 mb-8" />
                     <h3 className="text-2xl font-bold mb-6 text-gray-900 dark-mode:text-white">{getTranslation(func.title)}</h3>
                     <p className="text-base text-gray-600 dark-mode:text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
                  </div>
                </motion.div>
                <div className="w-full md:w-1/2 flex justify-center text-gray-100 dark-mode:text-gray-900 opacity-50 select-none">
                  <div className="text-[200px] font-black leading-none">{idx + 1}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple elegant footer contact */}
        <div data-block-type="template_contactInfo" className="mt-32 border-t-2 border-gray-100 dark-mode:border-gray-800 pt-16 flex flex-col items-center">
          {data.sectionHeaders?.contactInfo?.title && (
            <h3 className="text-2xl font-black text-center text-gray-900 dark-mode:text-white mb-8 flex items-center justify-center gap-3">
              {(() => {
                const ContactIcon = getIcon(data.sectionHeaders.contactInfo.icon, 'Phone');
                return <ContactIcon className="w-8 h-8 text-yellow-500" />;
              })()}
              {getTranslation(data.sectionHeaders.contactInfo.title)}
            </h3>
          )}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-500 dark-mode:text-gray-400 font-medium">
            {(Array.isArray(data.contactInfo) ? data.contactInfo : (
              [
                data.contactInfo?.address && { icon: 'MapPin', value: data.contactInfo.address },
                data.contactInfo?.phone && { icon: 'Phone', value: { en: data.contactInfo.phone, mr: data.contactInfo.phone } },
                data.contactInfo?.email && { icon: 'Mail', value: { en: data.contactInfo.email, mr: data.contactInfo.email } }
              ].filter(Boolean)
            )).map((info, idx) => {
              const Icon = getIcon(info.icon, 'Info');
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span className="leading-snug">{getTranslation(info.value)}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBannerWithBadges;
