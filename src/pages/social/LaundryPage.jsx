import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { socialActivitiesData } from '../../data/socialActivitiesData';
import { Droplets, Wind, ShieldCheck } from 'lucide-react';

const LaundryPage = () => {
  const { language } = useAccessibility();
  const data = socialActivitiesData.laundry;

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

  const icons = [Droplets, Wind, ShieldCheck];

  return (
    <div className="min-h-screen bg-[#F0F7FF] dark-mode:bg-[#081B2E] font-poppins text-slate-800 dark-mode:text-slate-200">
      
      {/* Abstract Waves Header */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden bg-white dark-mode:bg-slate-900 border-b border-blue-100 dark-mode:border-blue-900/30">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 dark-mode:opacity-10 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto text-blue-100 fill-current">
            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30 rotate-3"
          >
            <Wind className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#0F3D66] dark-mode:text-blue-300 mb-6 tracking-tight"
          >
            {getTranslation(data.title)}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-600 dark-mode:text-blue-400 font-medium mb-8"
          >
            {getTranslation(data.subtitle)}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-slate-600 dark-mode:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {getTranslation(data.description)}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6 py-20">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {data.features.map((feature, idx) => {
            const Icon = icons[idx] || Droplets;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx} className="bg-white dark-mode:bg-slate-800 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-blue-50 dark-mode:border-slate-700 group"
              >
                <div className="w-16 h-16 bg-blue-50 dark-mode:bg-blue-900/40 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-blue-500 dark-mode:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark-mode:text-slate-100 mb-3">
                  {getTranslation(feature.title)}
                </h3>
                <p className="text-slate-600 dark-mode:text-slate-400 leading-relaxed">
                  {getTranslation(feature.desc)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dual Image Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white dark-mode:border-slate-800"
          >
            <img src={data.heroImage1} alt="Laundry Facilities" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white dark-mode:border-slate-800 mt-10 md:mt-20"
          >
            <img src={data.heroImage2} alt="Pressing Section" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LaundryPage;
