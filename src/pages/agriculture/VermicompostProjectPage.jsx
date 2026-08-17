import React, { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { agricultureData } from '../../data/agricultureData';
import { Sprout, Award, LayoutGrid, HeartHandshake, CheckCircle2, Activity, MapPin } from 'lucide-react';

const iconMap = {
  Sprout, Award, LayoutGrid, HeartHandshake, CheckCircle2, Activity, MapPin
};

export const VermicompostProjectPage = () => {
  const { language } = useAccessibility();

  useLayoutEffect(() => {
    // Disable smooth scrolling temporarily
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // Restore it after scroll
    document.documentElement.style.scrollBehavior = originalStyle;
  }, []);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  const getTranslation = (obj) => {
    if (!obj) return '';
    return obj[language] || obj.en;
  };

  const data = agricultureData['vermicompost-project'];

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] dark-mode:bg-[#080B11] pb-24 font-poppins overflow-hidden min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-[65vh] overflow-hidden flex items-center justify-center bg-[#0F3D66] dark-mode:bg-gray-950">
        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Linear gradient overlay over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#0F3D66]/70 to-[#0F3D66]/80 dark-mode:from-[#080B11] dark-mode:via-gray-900/80 dark-mode:to-gray-900/90 z-10" />
          <img src={data.heroImage} alt={getTranslation(data.title)} className="w-full h-full object-cover opacity-60 dark-mode:opacity-40" />
        </motion.div>
        <div className="container mx-auto px-4 md:px-8 relative z-20 text-center max-w-4xl text-white mt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-black/20 mb-6"
          >
            <Sprout className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-green-50">
              {language === 'mr' ? 'शेती व पूरक व्यवसाय' : 'Agriculture & Allied Activities'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            {getTranslation(data.title)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-blue-50/90 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {getTranslation(data.description)}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 -mt-16 relative z-30">
        {/* Highlights Cards */}
        <section className="mb-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {data.highlights.map((highlight, idx) => {
              const IconComponent = highlight.icon && iconMap[highlight.icon] ? iconMap[highlight.icon] : CheckCircle2;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  className="bg-white/90 dark-mode:bg-gray-800/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl shadow-blue-900/5 dark-mode:shadow-black/30 border border-white/50 dark-mode:border-gray-700/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-20 h-20 rounded-3xl bg-green-50 dark-mode:bg-green-900/20 flex items-center justify-center text-green-600 dark-mode:text-green-400 mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all duration-500 shadow-inner">
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F3D66] dark-mode:text-white mb-3 group-hover:text-amber-600 dark-mode:group-hover:text-amber-400 transition-colors">
                    {getTranslation(highlight.title)}
                  </h3>
                  <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                    {getTranslation(highlight.desc)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Details Section (Image Left, Text Right) */}
        {data.detailsSection && (
          <section className="mb-20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img src={data.detailsSection.image} alt={getTranslation(data.detailsSection.title)} className="w-full h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2"
              >
                <div className="w-12 h-1.5 bg-amber-500 rounded-full mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F3D66] dark-mode:text-white mb-6 leading-tight">
                  {getTranslation(data.detailsSection.title)}
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                  {getTranslation(data.detailsSection.description)}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Impact Section (Text Left, Image Right) */}
        {data.impactSection && (
          <section className="mb-20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16 bg-white/50 dark-mode:bg-gray-850/50 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark-mode:border-gray-800">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img src={data.impactSection.image} alt={getTranslation(data.impactSection.title)} className="w-full h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2"
              >
                <div className="w-12 h-1.5 bg-green-500 rounded-full mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F3D66] dark-mode:text-white mb-6 leading-tight">
                  {getTranslation(data.impactSection.title)}
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                  {getTranslation(data.impactSection.description)}
                </p>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VermicompostProjectPage;
