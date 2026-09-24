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

const SideBySideListCards = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-gray-50 dark-mode:bg-gray-900 font-poppins flex flex-col md:flex-row">
      
      {/* Left: Sticky Image Half */}
      <div data-block-type="template_hero" className="w-full md:w-1/2 md:h-screen md:sticky top-0 relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={data.hero?.heroImage || data.heroImage} alt={getTranslation(data.hero?.title || data.title)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40 mix-blend-multiply" />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-6 text-white z-10 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full border border-blue-300/50 bg-blue-500/30 backdrop-blur-md mb-4 text-sm font-semibold tracking-wide uppercase"
          >
            {data.sectionHeaders?.heroBadge?.title ? getTranslation(data.sectionHeaders.heroBadge.title) : (language === 'mr' ? 'भेट व संपर्क' : 'Visit & Contact')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight"
          >
            {getTranslation(data.hero?.title || data.title)}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-lg md:text-base text-blue-100 max-w-lg"
          >
            {getTranslation(data.hero?.subtitle || data.subtitle)}
          </motion.p>
        </div>
      </div>

      {/* Right: Scrollable Content Half */}
      <div className="w-full md:w-1/2 p-6 md:p-6 lg:p-6 xl:p-24 bg-white dark-mode:bg-gray-950 text-gray-800 dark-mode:text-gray-200">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="prose prose-lg dark-mode:prose-invert max-w-none mb-16"
        >
          <p className="text-base leading-relaxed text-gray-600 dark-mode:text-gray-300">
            {getTranslation(data.hero?.description || data.description)}
          </p>
        </motion.div>

        {/* Stats Flex */}
        <div data-block-type="template_stats" className="flex flex-wrap gap-4 mb-16">
          {(data.stats || []).map((stat, idx) => {
            const Icon = getIcon(stat.icon, 'Users');
            return (
              <motion.div 
                key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="flex-1 min-w-[140px] p-5 rounded-2xl bg-blue-50 dark-mode:bg-blue-900/20 border border-blue-100 dark-mode:border-blue-800/50"
              >
                <Icon className="w-6 h-6 text-blue-600 dark-mode:text-blue-400 mb-3" />
                <div className="text-lg font-bold text-gray-900 dark-mode:text-white mb-1">{stat.value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600/70 dark-mode:text-blue-400/70">
                  {getTranslation(stat.label)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Features List */}
        <div data-block-type="template_keyFunctions" className="mb-16">
          <h3 className="text-lg font-bold text-gray-900 dark-mode:text-white mb-8 border-b-2 border-blue-500 inline-flex items-center gap-3 pb-2">
            {(() => {
              const HeaderIcon = getIcon(data.sectionHeaders?.keyFunctions?.icon, 'List');
              return <HeaderIcon className="w-5 h-5 text-blue-500" />;
            })()}
            {data.sectionHeaders?.keyFunctions?.title ? getTranslation(data.sectionHeaders.keyFunctions.title) : (language === 'mr' ? 'सुविधेचे प्रकार' : 'Types of Facilities')}
        </h3>
        
          <div className="space-y-8">
          {(data.keyFunctions || []).map((func, idx) => {
            const Icon = getIcon(func.icon, 'Users');
            return (
              <motion.div 
                key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
                className="flex items-start gap-5"
              >
                <div className="p-3 bg-white dark-mode:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark-mode:border-gray-700 flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-800 dark-mode:text-gray-100 mb-2">{getTranslation(func.title)}</h4>
                  <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>

        {/* Contact Minimal */}
        <div data-block-type="template_contactInfo" className="bg-gray-50 dark-mode:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark-mode:border-gray-800">
          <h4 className="text-lg font-bold text-gray-900 dark-mode:text-white mb-6 flex items-center gap-3">
            {(() => {
              const ContactIcon = getIcon(data.sectionHeaders?.contactInfo?.icon, 'Phone');
              return <ContactIcon className="w-5 h-5 text-blue-500" />;
            })()}
            {data.sectionHeaders?.contactInfo?.title ? getTranslation(data.sectionHeaders.contactInfo.title) : (language === 'mr' ? 'संपर्क माहिती' : 'Contact Information')}
          </h4>
          <ul className="space-y-4">
            {(() => {
              let infoArray = [];
              if (Array.isArray(data.contactInfo)) {
                infoArray = data.contactInfo;
              } else if (data.contactInfo) {
                if (data.contactInfo.address?.mr || data.contactInfo.address?.en) infoArray.push({ icon: 'MapPin', text: data.contactInfo.address });
                if (data.contactInfo.phone) infoArray.push({ icon: 'Phone', text: { mr: data.contactInfo.phone, en: data.contactInfo.phone } });
                if (data.contactInfo.email) infoArray.push({ icon: 'Mail', text: { mr: data.contactInfo.email, en: data.contactInfo.email } });
              }
              
              return infoArray.map((info, idx) => {
                const Icon = getIcon(info.icon, 'Info');
                return (
                  <li key={idx} className="flex items-center gap-4 text-gray-600 dark-mode:text-gray-300">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <span>{getTranslation(info.text)}</span>
                  </li>
                );
              });
            })()}












          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBySideListCards;

