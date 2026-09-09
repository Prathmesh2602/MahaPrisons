import React, { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { administrativeData } from '../../../data/administrativeData';
import { Activity, Zap, Factory } from 'lucide-react';

const TemplateC = ({ dataId }) => {
  const { language } = useAccessibility();
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

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
    <div className="w-full bg-[#080B11] pb-24 font-poppins overflow-hidden min-h-screen text-slate-200">
      {/* Full Width Parallax Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-black/60 to-transparent z-10" />
          <img src={data.heroImage} alt={getTranslation(data.title)} className="w-full h-full object-cover opacity-70" />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-20 text-center max-w-5xl mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium uppercase tracking-widest text-sm mb-6"
          >
            <Zap className="w-4 h-4" />
            {language === 'mr' ? 'उत्पादन व उपक्रम' : 'Production & Activities'}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl"
          >
            {getTranslation(data.title)}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-emerald-100/90 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {getTranslation(data.description)}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 relative z-30 -mt-10">
        {/* Production Impact Stats (Floating) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-5xl mx-auto">
          {data.productionStats.map((stat, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
              key={idx} className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center shadow-2xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-emerald-400 font-bold text-5xl mb-2 flex items-baseline justify-center gap-1">
                {stat.value}
                <span className="text-xl text-emerald-500/70 font-medium">{stat.unit}</span>
              </div>
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-sm">
                {getTranslation(stat.label)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Projects (Alternating Layout) */}
        <div className="max-w-6xl mx-auto space-y-24 mb-24">
          {data.activeProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)] group">
                    <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                    <img src={project.image} alt={getTranslation(project.title)} className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="w-16 h-1 bg-emerald-500 mb-8 rounded-full" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {getTranslation(project.title)}
                  </h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    {getTranslation(project.desc)}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Impact Statement Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-900/40 to-slate-800/80 border border-emerald-500/20 rounded-3xl p-10 text-center relative overflow-hidden"
        >
          <Factory className="absolute -top-10 -right-10 w-40 h-40 text-emerald-500/5 rotate-12" />
          <h3 className="text-2xl text-emerald-300 font-semibold mb-6 flex items-center justify-center gap-3">
            <Activity className="w-6 h-6" />
            {language === 'mr' ? 'सामाजिक प्रभाव' : 'Social Impact'}
          </h3>
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed italic">
            "{getTranslation(data.impactStatement)}"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateC;
