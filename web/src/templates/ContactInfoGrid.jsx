"use client";
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { facilitiesData } from '../data/facilitiesData';
import * as LucideIcons from 'lucide-react';
import { getImageUrl } from '../utils/imageUrlResolver';

const getIcon = (iconName, fallbackName) => {
  if (iconName && LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  return LucideIcons[fallbackName] || LucideIcons.HelpCircle;
};

const ContactInfoGrid = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark-mode:bg-[#1A1A1A] font-poppins text-gray-800 dark-mode:text-gray-200">
      
      {/* Top Banner Theme */}
      <div data-block-type="template_hero" className="relative h-[45vh] min-h-[350px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-amber-800 dark-mode:bg-gray-900 z-0">
          <img src={getImageUrl(data.hero?.heroImage || data.heroImage)} alt={getTranslation(data.hero?.title || data.title)} className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFCF8] dark-mode:to-[#1A1A1A] z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto -mt-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            {(() => {
              const HeaderIcon = getIcon(data.sectionHeaders?.hero?.icon, 'Send');
              return <HeaderIcon className="w-8 h-8 text-amber-500 mx-auto mb-6 opacity-80" />;
            })()}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-amber-900 dark-mode:text-amber-500 mb-4 tracking-tight drop-shadow-sm">
              {getTranslation(data.hero?.title || data.title)}
            </h1>
            <h2 className="text-base md:text-lg italic text-amber-700/80 dark-mode:text-amber-400/80 font-medium">
              {getTranslation(data.hero?.subtitle || data.subtitle)}
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-30 -mt-10 md:-mt-10 pb-24">
        {/* Central Overlapping Card */}
        <motion.div 
          data-block-type="template_details"
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-white dark-mode:bg-[#252525] p-6 md:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark-mode:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm border-t-[12px] border-amber-600 max-w-5xl mx-auto relative"
        >
          {/* Decorative stamp element */}
          {getTranslation(data.hero?.stampText) !== 'none' && (
            <div className="absolute top-6 right-8 w-16 h-20 border-2 border-dashed border-gray-300 dark-mode:border-gray-600 opacity-50 hidden md:block">
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 text-center leading-tight p-1 break-words">
                {getTranslation(data.hero?.stampText) || "STAMP"}
              </div>
            </div>
          )}

          <div>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 dark-mode:text-gray-300 mb-12 font-medium max-w-3xl">
              {getTranslation(data.hero?.description || data.description)}
            </p>
          </div>

          <div className="mb-12">
            {data.sectionHeaders?.stats?.title && (
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const Icon = getIcon(data.sectionHeaders.stats.icon, 'BarChart2');
                  return <Icon className="w-5 h-5 text-amber-600" />;
                })()}
                <h3 className="text-xl font-bold text-gray-800 dark-mode:text-gray-100">{getTranslation(data.sectionHeaders.stats.title)}</h3>
              </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min((data.stats || []).length || 1, 3)} gap-6 border-t border-b border-gray-100 dark-mode:border-gray-800 py-8`}>
              {(data.stats || []).map((stat, idx) => {
                const Icon = getIcon(stat.icon, 'Mail');
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-amber-50 dark-mode:bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-amber-600 dark-mode:text-amber-500" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark-mode:text-white">{typeof stat.value === "object" ? getTranslation(stat.value) : stat.value}</div>
                      <div className="text-sm text-gray-500 uppercase tracking-widest">{getTranslation(stat.label)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-16">
            {data.sectionHeaders?.keyFunctions?.title && (
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const Icon = getIcon(data.sectionHeaders.keyFunctions.icon, 'List');
                  return <Icon className="w-5 h-5 text-amber-600" />;
                })()}
                <h3 className="text-xl font-bold text-gray-800 dark-mode:text-gray-100">{getTranslation(data.sectionHeaders.keyFunctions.title)}</h3>
              </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min((data.keyFunctions || []).length || 1, 3)} gap-10`}>
              {(data.keyFunctions || []).map((func, idx) => {
                const Icon = getIcon(func.icon, 'Mail');
                return (
                  <div key={idx} className="bg-[#FAF9F6] dark-mode:bg-[#1E1E1E] p-6 rounded-sm shadow-inner border border-gray-100 dark-mode:border-gray-800">
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className="w-8 h-8 text-amber-700 dark-mode:text-amber-500" />
                      <h3 className="text-base font-bold text-gray-800 dark-mode:text-gray-100">{getTranslation(func.title)}</h3>
                    </div>
                    <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed font-poppins">
                      {getTranslation(func.desc)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 bg-amber-50 dark-mode:bg-amber-900/10 p-6 rounded-sm font-poppins border border-amber-100 dark-mode:border-amber-900/50">
            {data.sectionHeaders?.contactInfo?.title && (
              <div className="flex items-center gap-3 mb-6 border-b border-amber-200 dark-mode:border-amber-800/50 pb-4">
                {(() => {
                  const Icon = getIcon(data.sectionHeaders.contactInfo.icon, 'Phone');
                  return <Icon className="w-5 h-5 text-amber-700 dark-mode:text-amber-500" />;
                })()}
                <h3 className="text-lg font-bold text-amber-900 dark-mode:text-amber-500">{getTranslation(data.sectionHeaders.contactInfo.title)}</h3>
              </div>
            )}
            <div className="flex flex-col md:flex-row flex-wrap gap-6 items-center justify-between">
              {(() => {
                let infoArray = [];
                if (Array.isArray(data.contactInfo)) {
                  infoArray = data.contactInfo;
                } else if (data.contactInfo) {
                  if (data.contactInfo.address?.mr || data.contactInfo.address?.en || typeof data.contactInfo.address === 'string') infoArray.push({ icon: 'MapPin', text: data.contactInfo.address });
                  if (data.contactInfo.phone) infoArray.push({ icon: 'Phone', text: { mr: data.contactInfo.phone, en: data.contactInfo.phone } });
                  if (data.contactInfo.email) infoArray.push({ icon: 'Mail', text: { mr: data.contactInfo.email, en: data.contactInfo.email } });
                }
                
                return infoArray.map((info, idx) => {
                  const Icon = getIcon(info.icon, 'Info');
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-amber-600" />
                      <span className="text-gray-700 dark-mode:text-gray-300 font-medium">{getTranslation(info.text) || info.text}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactInfoGrid;
