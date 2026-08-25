import React, { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { administrativeData } from '../../../data/administrativeData';
import { CheckCircle, Apple, Sparkles, CreditCard, Tag, Receipt, Video, Armchair, Phone, Stethoscope, Brain, Ambulance, Clock } from 'lucide-react';

const iconMap = {
  CheckCircle, Apple, Sparkles, CreditCard, Tag, Receipt, Video, Armchair, Phone, Stethoscope, Brain, Ambulance
};

const TemplateB = ({ dataId }) => {
  const { language } = useAccessibility();

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = originalStyle;
  }, []);

  const data = administrativeData[dataId];

  if (!data) return <Navigate to="/" replace />;

  const getTranslation = (obj) => {
    if (!obj) return '';
    return obj[language] || obj.en;
  };

  return (
    <div className="w-full bg-[#fdfaf6] dark-mode:bg-slate-900 pb-20 font-poppins min-h-screen">
      {/* Friendly Hero with soft curves */}
      <div className="pt-16 pb-24 px-6 relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 dark-mode:from-slate-800 dark-mode:to-slate-900 rounded-b-[3rem] border-b border-amber-200/50 dark-mode:border-slate-800 shadow-sm">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/50 dark-mode:bg-amber-900/30 text-amber-800 dark-mode:text-amber-400 text-sm font-semibold mb-6"
            >
              <Clock className="w-4 h-4" />
              {language === 'mr' ? 'दैनंदिन सुविधा' : 'Daily Facilities'}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark-mode:text-white mb-6 leading-tight"
            >
              {getTranslation(data.title)}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark-mode:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {getTranslation(data.description)}
            </motion.p>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7, type: 'spring' }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark-mode:border-slate-800"
            >
              <img src={data.heroImage} alt={getTranslation(data.title)} className="w-full h-auto aspect-video object-cover" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Features Grid */}
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-bold text-slate-800 dark-mode:text-white mb-8 ml-2">
              {language === 'mr' ? 'वैशिष्ट्ये आणि सुविधा' : 'Features & Facilities'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.features.map((feature, idx) => {
                const Icon = iconMap[feature.icon] || CheckCircle;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    key={idx} className="bg-white dark-mode:bg-slate-800 rounded-[2rem] p-8 shadow-sm border border-amber-100 dark-mode:border-slate-700 hover:-translate-y-1 hover:shadow-md transition-all group"
                  >
                    <div className="w-14 h-14 bg-orange-50 dark-mode:bg-orange-900/20 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 dark-mode:text-white mb-3">{getTranslation(feature.title)}</h4>
                    <p className="text-slate-600 dark-mode:text-slate-400 leading-relaxed">{getTranslation(feature.desc)}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Gallery Strip */}
            <h3 className="text-2xl font-bold text-slate-800 dark-mode:text-white mb-8 mt-16 ml-2">
              {language === 'mr' ? 'छायाचित्रे' : 'Gallery'}
            </h3>
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
              {data.gallery.map((item, idx) => (
                <div key={idx} className="min-w-[280px] md:min-w-[320px] snap-center">
                  <div className="rounded-2xl overflow-hidden shadow-sm mb-3">
                    <img src={item.image} alt={getTranslation(item.caption)} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-center text-slate-600 dark-mode:text-slate-400 font-medium">{getTranslation(item.caption)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timings Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white dark-mode:bg-slate-800 rounded-[2rem] p-8 shadow-xl border border-orange-100 dark-mode:border-slate-700 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 dark-mode:bg-amber-900/50 text-amber-600 dark-mode:text-amber-400 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark-mode:text-white">
                  {language === 'mr' ? 'वेळापत्रक' : 'Timings'}
                </h3>
              </div>
              
              <div className="space-y-6">
                {data.timings.map((timing, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark-mode:border-slate-700 pb-4 last:border-0">
                    <span className="font-medium text-slate-700 dark-mode:text-slate-300">{getTranslation(timing.day)}</span>
                    <span className="text-amber-600 dark-mode:text-amber-400 font-semibold bg-amber-50 dark-mode:bg-amber-900/20 px-3 py-1 rounded-lg text-sm">{timing.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-orange-50 dark-mode:bg-slate-700/50 p-4 rounded-xl text-sm text-slate-600 dark-mode:text-slate-400 italic text-center">
                {language === 'mr' 
                  ? 'टीप: वेळेत प्रशासकीय कारणास्तव बदल होऊ शकतो.' 
                  : 'Note: Timings are subject to change due to administrative reasons.'}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Hide scrollbar utility for gallery */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default TemplateB;
