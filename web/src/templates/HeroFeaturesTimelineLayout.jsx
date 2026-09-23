"use client";
import React, { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { administrativeData } from '../data/administrativeData';
import * as Icons from 'lucide-react';

const HeroFeaturesTimelineLayout = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = originalStyle;
  }, []);

  const data = dynamicData || administrativeData[dataId];

  if (!data) redirect("/");

  const getTranslation = (obj) => {
    if (!obj) return '';
    return obj[language] || obj.en;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full bg-slate-50 dark-mode:bg-slate-900 pb-20 font-poppins min-h-screen">
      {/* Corporate Hero */}
      <div data-block-type="template_hero" className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={data.hero?.heroImage} alt={getTranslation(data.hero?.title)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl border-l-4 border-blue-500 pl-8">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              {getTranslation(data.hero?.title)}
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-blue-200 font-medium mb-6"
            >
              {getTranslation(data.hero?.subtitle)}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 leading-relaxed max-w-2xl text-lg"
            >
              {getTranslation(data.hero?.description)}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-20">
        {/* Stats Section */}
        <motion.div 
          data-block-type="template_stats"
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {(data.stats || []).map((stat, idx) => {
            const Icon = Icons[stat.icon] || Icons.FileText;
            return (
              <motion.div key={idx} variants={itemVariants} className="bg-white dark-mode:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark-mode:border-slate-700 flex items-center gap-6">
                <div className="p-4 bg-blue-50 dark-mode:bg-blue-900/30 text-blue-600 dark-mode:text-blue-400 rounded-lg">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-800 dark-mode:text-slate-100">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark-mode:text-slate-400 font-medium mt-1 uppercase tracking-wider">{getTranslation(stat.label)}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Functions */}
          <div className="lg:col-span-2" data-block-type="template_keyFunctions">
            <h3 className="text-lg font-bold text-slate-800 dark-mode:text-white mb-8 flex items-center gap-3">
              {data.sectionHeaders?.keyFunctions?.icon ? (
                React.createElement(Icons[data.sectionHeaders.keyFunctions.icon] || Icons.FileText, { className: "w-6 h-6 text-blue-500" })
              ) : (
                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              )}
              {data.sectionHeaders?.keyFunctions?.title ? getTranslation(data.sectionHeaders.keyFunctions.title) : (language === 'mr' ? 'प्रमुख कार्ये' : 'Key Functions')}
            </h3>
            <div className="space-y-6">
              {(data.keyFunctions || []).map((func, idx) => {
                const Icon = Icons[func.icon] || Icons.FileText;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    key={idx} className="bg-white dark-mode:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark-mode:border-slate-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-5">
                      <div className="mt-1 flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-800 dark-mode:text-slate-100 mb-2">{getTranslation(func.title)}</h4>
                        <p className="text-slate-600 dark-mode:text-slate-400 leading-relaxed">{getTranslation(func.desc)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Contact & Info Sidebar */}
          <div data-block-type="template_contactInfo">
            <div className="bg-blue-600 rounded-xl p-6 text-white shadow-xl sticky top-32">
              <h3 className="text-base font-bold mb-6 border-b border-blue-500/50 pb-4 flex items-center gap-2">
                {data.sectionHeaders?.contactInfo?.icon && React.createElement(Icons[data.sectionHeaders.contactInfo.icon] || Icons.MapPin, { className: "w-5 h-5" })}
                {data.sectionHeaders?.contactInfo?.title ? getTranslation(data.sectionHeaders.contactInfo.title) : (language === 'mr' ? 'संपर्क माहिती' : 'Contact Information')}
              </h3>
              <div className="space-y-6">
                {data.contactList && data.contactList.length > 0 ? (
                  data.contactList.map((contact, idx) => {
                    const Icon = Icons[contact.icon] || Icons.MapPin;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <Icon className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                        <p className="text-blue-50 leading-snug break-words whitespace-pre-wrap flex-1">{getTranslation(contact.text)}</p>
                      </div>
                    );
                  })
                ) : (
                  <>
                    {data.contactInfo?.address && (
                      <div className="flex items-start gap-4">
                        <Icons.MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                        <p className="text-blue-50 leading-snug">{getTranslation(data.contactInfo.address)}</p>
                      </div>
                    )}
                    {data.contactInfo?.phone && (
                      <div className="flex items-center gap-4">
                        <Icons.Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                        <p className="text-blue-50 font-medium">{data.contactInfo.phone}</p>
                      </div>
                    )}
                    {data.contactInfo?.email && (
                      <div className="flex items-center gap-4">
                        <Icons.Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                        <p className="text-blue-50 text-sm break-all">{data.contactInfo.email}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFeaturesTimelineLayout;
