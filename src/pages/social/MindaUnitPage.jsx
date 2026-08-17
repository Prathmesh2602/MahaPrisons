import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { socialActivitiesData } from '../../data/socialActivitiesData';
import { Settings, Zap, CheckCircle2, Factory, TrendingUp } from 'lucide-react';

const MindaUnitPage = () => {
  const { language } = useAccessibility();
  const data = socialActivitiesData.mindaUnit;

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
    <div className="min-h-screen bg-slate-50 dark-mode:bg-slate-950 text-slate-800 dark-mode:text-slate-200">
      
      {/* Corporate Hero Banner */}
      <div className="relative bg-white dark-mode:bg-slate-900 border-b border-slate-200 dark-mode:border-slate-800">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark-mode:bg-blue-900/30 text-blue-700 dark-mode:text-blue-400 rounded-lg text-sm font-bold tracking-wider uppercase mb-6"
            >
              <Factory className="w-4 h-4" />
              {language === 'mr' ? 'औद्योगिक भागीदारी' : 'Industrial Partnership'}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark-mode:text-white mb-6 leading-tight"
            >
              {getTranslation(data.title)}
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 dark-mode:text-slate-400 font-medium mb-8"
            >
              {getTranslation(data.subtitle)}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-slate-600 dark-mode:text-slate-400 leading-relaxed max-w-2xl"
            >
              {getTranslation(data.description)}
            </motion.p>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark-mode:border-slate-800"
            >
              <img src={data.heroImage} alt="Minda Unit" className="w-full h-[400px] object-cover" />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </motion.div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white dark-mode:bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-100 dark-mode:border-slate-700 hidden md:flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 dark-mode:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark-mode:text-green-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-slate-500 dark-mode:text-slate-400 font-semibold uppercase">{language === 'mr' ? 'कौशल्य विकास' : 'Skill Development'}</div>
                <div className="text-xl font-bold text-slate-800 dark-mode:text-slate-100">100% Practical</div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Key Metrics / Stats */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark-mode:text-white mb-6 border-b border-slate-200 dark-mode:border-slate-800 pb-4">
              {language === 'mr' ? 'प्रकल्पाची ठळक वैशिष्ट्ये' : 'Project Highlights'}
            </h3>
            {data.stats.map((stat, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={idx} className="bg-white dark-mode:bg-slate-900 p-6 rounded-xl border border-slate-200 dark-mode:border-slate-800 shadow-sm flex items-center justify-between"
              >
                <span className="text-slate-600 dark-mode:text-slate-400 font-medium">{getTranslation(stat.label)}</span>
                <span className="text-lg font-bold text-blue-600 dark-mode:text-blue-400">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Technical Focus Grid */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-800 dark-mode:text-white mb-6 border-b border-slate-200 dark-mode:border-slate-800 pb-4 flex items-center gap-3">
              <Settings className="w-6 h-6 text-slate-500" />
              {language === 'mr' ? 'तांत्रिक प्रशिक्षण क्षेत्रे' : 'Technical Training Areas'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.technicalFocus.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={idx} className="bg-white dark-mode:bg-slate-900 p-8 rounded-xl border border-slate-200 dark-mode:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 dark-mode:text-slate-100">{getTranslation(item)}</h4>
                      <p className="text-sm text-slate-500 dark-mode:text-slate-400 mt-2">
                        {language === 'mr' ? 'उद्योग मानकांनुसार व्यावसायिक प्रशिक्षण.' : 'Professional training as per industry standards.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

export default MindaUnitPage;
