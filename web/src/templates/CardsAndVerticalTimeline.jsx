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

const CardsAndVerticalTimeline = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-slate-100 dark-mode:bg-slate-900 font-poppins pb-20">
      
      {/* Centered Minimal Header */}
      <div data-block-type="template_hero" className="bg-white dark-mode:bg-slate-950 py-16 px-4 text-center shadow-sm relative">
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl md:text-3xl font-black text-slate-800 dark-mode:text-slate-100 mb-4 tracking-tight flex items-center justify-center gap-3">
          {(() => {
            const HeroIcon = getIcon(data.sectionHeaders?.hero?.icon, 'Calendar');
            return <HeroIcon className="w-8 h-8 text-indigo-500" />;
          })()}
          {data.sectionHeaders?.hero?.title ? getTranslation(data.sectionHeaders.hero.title) : getTranslation(data.hero?.title)}
        </motion.h1>
        <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-base text-slate-500 font-medium">
          {getTranslation(data.hero?.subtitle)}
        </motion.p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        
        <div data-block-type="template_description" className="bg-white dark-mode:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark-mode:border-slate-700 mb-16 text-center relative">
          <p className="text-base text-slate-700 dark-mode:text-slate-300 leading-relaxed font-poppins">
            {getTranslation(data.hero?.description)}
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-4 border-slate-300 dark-mode:border-slate-700 ml-6 md:ml-12 space-y-16 pb-16">
          
          {/* Key Functions (Timeline Items) */}
          <div data-block-type="template_keyFunctions" className="relative space-y-16">
          {(data.keyFunctions || []).map((func, idx) => {
            const Icon = getIcon(func.icon, 'CalendarDays');
            return (
              <motion.div key={idx} initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="relative pl-10 md:pl-16">
                <div className="absolute -left-[26px] top-0 w-8 h-8 bg-white dark-mode:bg-slate-800 border-4 border-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="bg-white dark-mode:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark-mode:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-800 dark-mode:text-slate-100 mb-4 font-poppins">{getTranslation(func.title)}</h3>
                  <p className="text-slate-600 dark-mode:text-slate-400 text-lg font-poppins">{getTranslation(func.desc)}</p>
                </div>
              </motion.div>
            );
          })}
          </div>

          {/* Stats (Timeline Items) */}
          <div data-block-type="template_stats" className="relative pl-10 md:pl-16">
            <div className="absolute -left-[14px] top-6 w-6 h-6 bg-slate-300 dark-mode:bg-slate-700 border-4 border-slate-100 dark-mode:border-slate-900 rounded-full" />
            
            {data.sectionHeaders?.stats?.title && (
              <h3 className="text-xl font-bold text-slate-800 dark-mode:text-slate-100 mb-6 flex items-center gap-2">
                {(() => {
                  const StatsIcon = getIcon(data.sectionHeaders.stats.icon, 'TrendingUp');
                  return <StatsIcon className="w-6 h-6 text-indigo-500" />;
                })()}
                {getTranslation(data.sectionHeaders.stats.title)}
              </h3>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-${Math.min((data.stats || []).length, 3)} gap-6`}>
              {(data.stats || []).map((stat, idx) => {
                const Icon = getIcon(stat.icon, 'TrendingUp');
                return (
                  <div key={idx} className="bg-white dark-mode:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark-mode:border-slate-700 flex flex-col items-center text-center font-poppins">
                    <Icon className="w-8 h-8 text-indigo-500 mb-3" />
                    <div className="text-xl font-black text-slate-800 dark-mode:text-white mb-1">{typeof stat.value === "object" ? getTranslation(stat.value) : stat.value}</div>
                    <div className="text-sm font-bold text-slate-500 uppercase">{getTranslation(stat.label)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact (Timeline Item) */}
          <div data-block-type="template_contactInfo" className="relative pl-10 md:pl-16">
            <div className="absolute -left-[14px] top-6 w-6 h-6 bg-slate-300 dark-mode:bg-slate-700 border-4 border-slate-100 dark-mode:border-slate-900 rounded-full" />
            
            {data.sectionHeaders?.contactInfo?.title && (
              <h3 className="text-xl font-bold text-slate-800 dark-mode:text-slate-100 mb-6 flex items-center gap-2">
                {(() => {
                  const ContactIcon = getIcon(data.sectionHeaders.contactInfo.icon, 'Phone');
                  return <ContactIcon className="w-6 h-6 text-indigo-500" />;
                })()}
                {getTranslation(data.sectionHeaders.contactInfo.title)}
              </h3>
            )}

            <div className="bg-indigo-50 dark-mode:bg-indigo-900/20 border border-indigo-100 dark-mode:border-indigo-800/50 p-6 rounded-2xl font-poppins flex flex-col md:flex-row gap-6 justify-between items-center">
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
                    <Icon className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span className="font-semibold text-slate-800 dark-mode:text-slate-200 text-sm md:text-base leading-snug">{getTranslation(info.value)}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CardsAndVerticalTimeline;
