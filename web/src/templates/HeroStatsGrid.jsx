"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { administrativeData } from '../data/administrativeData';
import { CheckCircle, Apple, Sparkles, CreditCard, Tag, Receipt, Video, Armchair, Phone, Stethoscope, Brain, Ambulance, Clock, Star, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap = {
  CheckCircle, Apple, Sparkles, CreditCard, Tag, Receipt, Video, Armchair, Phone, Stethoscope, Brain, Ambulance, Clock, Star, Image: ImageIcon
};

const HeroStatsGrid = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 300;
      galleryRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

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
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en;
  };

  return (
    <div className="w-full bg-[#fdfaf6] dark-mode:bg-slate-900 pb-20 font-poppins min-h-screen">
      {/* Friendly Hero with soft curves */}
      <div data-block-type="template_hero" className="pt-16 pb-24 px-6 relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 dark-mode:from-slate-800 dark-mode:to-slate-900 rounded-2xl border-b border-amber-200/50 dark-mode:border-slate-800 shadow-sm">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-6 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/50 dark-mode:bg-amber-900/30 text-amber-800 dark-mode:text-amber-400 text-sm font-semibold mb-6"
            >
              {(() => {
                const IconName = data.sectionHeaders?.category?.icon;
                const CustomIcon = IconName ? iconMap[IconName] : null;
                return CustomIcon ? <CustomIcon className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
              })()}
              {data.sectionHeaders?.category?.title ? getTranslation(data.sectionHeaders.category.title) : (language === 'mr' ? 'दैनंदिन सुविधा' : 'Daily Facilities')}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark-mode:text-white mb-6 leading-tight"
            >
              {getTranslation(data.hero?.title)}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-base text-slate-600 dark-mode:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {getTranslation(data.hero?.description)}
            </motion.p>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7, type: 'spring' }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark-mode:border-slate-800"
            >
              <img src={data.hero?.heroImage} alt={getTranslation(data.hero?.title)} className="w-full h-auto aspect-video object-cover" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Features Grid */}
          <div className="lg:col-span-8 min-w-0 overflow-hidden">
            <div data-block-type="template_features" className="bg-white/40 dark-mode:bg-slate-800/40 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 dark-mode:border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 dark-mode:bg-amber-400/2 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber-100 dark-mode:bg-slate-800 text-amber-600 dark-mode:text-amber-400 rounded-lg">
                  {(() => {
                    const IconName = data.sectionHeaders?.features?.icon;
                    const CustomIcon = IconName ? iconMap[IconName] : null;
                    return CustomIcon ? <CustomIcon className="w-5 h-5" /> : <Star className="w-5 h-5" />;
                  })()}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark-mode:text-white">
                  {data.sectionHeaders?.features?.title ? getTranslation(data.sectionHeaders.features.title) : (language === 'mr' ? 'वैशिष्ट्ये आणि सुविधा' : 'Features & Facilities')}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              {(data.features || []).map((feature, idx) => {
                const Icon = iconMap[feature.icon] || CheckCircle;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    key={idx} className="bg-white dark-mode:bg-slate-800 rounded-2xl p-6 shadow-sm border border-amber-100 dark-mode:border-slate-700 hover:-translate-y-1 hover:shadow-md transition-all group"
                  >
                    <div className="w-6 h-6 bg-orange-50 dark-mode:bg-orange-900/20 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-slate-800 dark-mode:text-white mb-3">{getTranslation(feature.title)}</h4>
                    <p className="text-slate-600 dark-mode:text-slate-400 leading-relaxed">{getTranslation(feature.desc)}</p>
                  </motion.div>
                );
              })}
            </div>

            </div>

            {/* Gallery Strip */}
            <div data-block-type="template_gallery" className="w-full">
              <div className="flex items-center justify-between mb-8 mt-16 ml-2 pr-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark-mode:bg-slate-800 text-amber-600 dark-mode:text-amber-400 rounded-lg">
                    {(() => {
                      const IconName = data.sectionHeaders?.gallery?.icon;
                      const CustomIcon = IconName ? iconMap[IconName] : null;
                      return CustomIcon ? <CustomIcon className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark-mode:text-white">
                    {data.sectionHeaders?.gallery?.title ? getTranslation(data.sectionHeaders.gallery.title) : (language === 'mr' ? 'छायाचित्रे' : 'Gallery')}
                  </h3>
                </div>
                {/* Subtle Manual Scroll Buttons */}
                <div className="flex items-center gap-2">
                  <button onClick={() => scrollGallery('left')} className="p-1.5 md:p-2 rounded-full border border-slate-200/60 dark-mode:border-slate-700/50 text-slate-400 hover:text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark-mode:hover:text-white dark-mode:hover:bg-slate-800 transition-all bg-white shadow-sm dark-mode:bg-transparent">
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button onClick={() => scrollGallery('right')} className="p-1.5 md:p-2 rounded-full border border-slate-200/60 dark-mode:border-slate-700/50 text-slate-400 hover:text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark-mode:hover:text-white dark-mode:hover:bg-slate-800 transition-all bg-white shadow-sm dark-mode:bg-transparent">
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
              <div ref={galleryRef} className="flex overflow-x-auto pb-8 gap-6 snap-x scroll-smooth hide-scrollbar px-4 w-full">
              {(data.gallery || []).map((item, idx) => (
                <div key={idx} className="w-[280px] md:w-[320px] shrink-0 snap-center">
                  <div className="rounded-2xl overflow-hidden shadow-sm mb-3">
                    <img src={item.image} alt={getTranslation(item.caption)} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-center text-slate-600 dark-mode:text-slate-400 font-medium">{getTranslation(item.caption)}</p>
                </div>
              ))}
                <div className="w-[24px] shrink-0 h-1" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Timings Sidebar */}
          <div className="lg:col-span-4" data-block-type="template_timings">
            <div className="bg-white dark-mode:bg-slate-800 rounded-2xl p-6 shadow-xl border border-orange-100 dark-mode:border-slate-700 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 dark-mode:bg-amber-900/50 text-amber-600 dark-mode:text-amber-400 rounded-xl">
                  {(() => {
                    const IconName = data.sectionHeaders?.timings?.icon;
                    const CustomIcon = IconName ? iconMap[IconName] : null;
                    return CustomIcon ? <CustomIcon className="w-6 h-6" /> : <Clock className="w-6 h-6" />;
                  })()}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark-mode:text-white">
                  {data.sectionHeaders?.timings?.title ? getTranslation(data.sectionHeaders.timings.title) : (language === 'mr' ? 'वेळापत्रक' : 'Timings')}
                </h3>
              </div>
              
              <div className="space-y-6">
                {(data.timings || []).map((timing, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-slate-100 dark-mode:border-slate-700 pb-4 last:border-0 gap-4">
                    <span className="font-medium text-slate-700 dark-mode:text-slate-300 shrink-0 mt-1">{getTranslation(timing.day)}</span>
                    <span className="text-amber-600 dark-mode:text-amber-400 font-semibold bg-amber-50 dark-mode:bg-amber-900/20 px-3 py-1.5 rounded-lg text-sm text-right leading-relaxed">{getTranslation(timing.hours)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-orange-50 dark-mode:bg-slate-700/50 p-4 rounded-xl text-sm text-slate-600 dark-mode:text-slate-400 italic text-center">
                {data.timingsNote 
                  ? getTranslation(data.timingsNote) 
                  : (language === 'mr' 
                    ? 'टीप: वेळेत प्रशासकीय कारणास्तव बदल होऊ शकतो.' 
                    : 'Note: Timings are subject to change due to administrative reasons.')}
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

export default HeroStatsGrid;
