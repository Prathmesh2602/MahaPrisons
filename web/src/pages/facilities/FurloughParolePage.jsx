import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { CalendarDays, FileText, TrendingUp, Home, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';

const iconMap = { CalendarDays, FileText, TrendingUp, Home, AlertCircle };

const FurloughParolePage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['furlough-parole'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-slate-100 dark-mode:bg-slate-900 font-poppins pb-20">
      
      {/* Centered Minimal Header */}
      <div className="bg-white dark-mode:bg-slate-950 py-16 px-4 text-center shadow-sm">
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl font-black text-slate-800 dark-mode:text-slate-100 mb-4 tracking-tight">
          {getTranslation(data.title)}
        </motion.h1>
        <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-slate-500 font-medium">
          {getTranslation(data.subtitle)}
        </motion.p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        
        <div className="bg-white dark-mode:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-200 dark-mode:border-slate-700 mb-16 text-center">
          <p className="text-xl text-slate-700 dark-mode:text-slate-300 leading-relaxed font-poppins">
            {getTranslation(data.description)}
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-4 border-slate-300 dark-mode:border-slate-700 ml-6 md:ml-12 space-y-16 pb-16">
          
          {/* Key Functions (Timeline Items) */}
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || CalendarDays;
            return (
              <motion.div key={idx} initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="relative pl-10 md:pl-16">
                <div className="absolute -left-[26px] top-0 w-12 h-12 bg-white dark-mode:bg-slate-800 border-4 border-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="bg-white dark-mode:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark-mode:border-slate-700">
                  <h3 className="text-2xl font-bold text-slate-800 dark-mode:text-slate-100 mb-4 font-poppins">{getTranslation(func.title)}</h3>
                  <p className="text-slate-600 dark-mode:text-slate-400 text-lg font-poppins">{getTranslation(func.desc)}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Stats (Timeline Items) */}
          <div className="relative pl-10 md:pl-16">
            <div className="absolute -left-[14px] top-6 w-6 h-6 bg-slate-300 dark-mode:bg-slate-700 border-4 border-slate-100 dark-mode:border-slate-900 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.stats.map((stat, idx) => {
                const Icon = iconMap[stat.icon] || TrendingUp;
                return (
                  <div key={idx} className="bg-white dark-mode:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark-mode:border-slate-700 flex flex-col items-center text-center font-poppins">
                    <Icon className="w-8 h-8 text-indigo-500 mb-3" />
                    <div className="text-3xl font-black text-slate-800 dark-mode:text-white mb-1">{stat.value}</div>
                    <div className="text-sm font-bold text-slate-500 uppercase">{getTranslation(stat.label)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact (Timeline Item) */}
          <div className="relative pl-10 md:pl-16">
            <div className="absolute -left-[14px] top-6 w-6 h-6 bg-slate-300 dark-mode:bg-slate-700 border-4 border-slate-100 dark-mode:border-slate-900 rounded-full" />
            <div className="bg-indigo-50 dark-mode:bg-indigo-900/20 border border-indigo-100 dark-mode:border-indigo-800/50 p-6 rounded-2xl font-poppins flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-indigo-500" />
                <span className="font-semibold text-slate-800 dark-mode:text-slate-200">{getTranslation(data.contactInfo.address)}</span>
              </div>
              <div className="flex gap-6">
                <span className="flex items-center gap-2 text-slate-700 dark-mode:text-slate-300 font-medium"><Phone className="w-4 h-4 text-indigo-500"/> {data.contactInfo.phone}</span>
                <span className="flex items-center gap-2 text-slate-700 dark-mode:text-slate-300 font-medium"><Mail className="w-4 h-4 text-indigo-500"/> {data.contactInfo.email}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FurloughParolePage;
