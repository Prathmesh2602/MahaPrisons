import React, { useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { yerawadaOpenJailData } from '../data/yerawadaOpenJailData';
import { Activity, MapPin, CheckCircle2, History, Award, User, ChevronRight } from 'lucide-react';

export const YerawadaOpenJailPage = () => {
  const { language } = useAccessibility();
  const data = yerawadaOpenJailData;

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

  const getTranslation = (obj) => obj[language] || obj.en;

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
    <div className="w-full bg-[#F8FAFC] dark-mode:bg-[#080B11] pb-24 font-poppins overflow-hidden">
      
      {/* Hero Section with Parallax */}
      <section className="relative h-[75vh] overflow-hidden flex items-center justify-center bg-[#0F3D66] dark-mode:bg-gray-950">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Using a linear gradient overlay over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#0F3D66]/60 to-[#0F3D66]/80 dark-mode:from-[#080B11] dark-mode:via-gray-900/80 dark-mode:to-gray-900/90 z-10" />
          <img src="/gallary/rehab_hero.png" alt="Rehabilitation" className="w-full h-full object-cover opacity-60 dark-mode:opacity-40" />
        </motion.div>
        <div className="container mx-auto px-4 md:px-8 relative z-20 text-center max-w-5xl text-white mt-4 pb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-black/20 mb-8"
          >
            <Activity className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-50">
              {language === 'mr' ? 'सुधारणा आणि पुनर्वसन' : 'Correction & Rehabilitation'}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            {getTranslation(data.hero.title)}
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-medium text-amber-400 mb-8 drop-shadow-md"
          >
            {getTranslation(data.hero.subtitle)}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-blue-50/90 max-w-4xl mx-auto leading-relaxed font-light"
          >
            {getTranslation(data.hero.description)}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-30">
        
        {/* Overview Stats Cards */}
        <section className="mb-20">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {data.overview.stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpVariant}
                className="bg-white/80 dark-mode:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-900/10 dark-mode:shadow-black/40 border border-white/50 dark-mode:border-gray-700 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500 hover:bg-white dark-mode:hover:bg-gray-800"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark-mode:bg-blue-900/30 flex items-center justify-center text-blue-600 dark-mode:text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all duration-500 shadow-inner">
                  {idx === 0 ? <MapPin className="w-8 h-8" /> : idx === 1 ? <CheckCircle2 className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                </div>
                <h4 className="text-xs font-bold text-gray-400 dark-mode:text-gray-500 uppercase tracking-widest mb-2">
                  {getTranslation(stat.label)}
                </h4>
                <p className="text-2xl font-bold text-[#0F3D66] dark-mode:text-white">
                  {getTranslation(stat.value)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* History Timeline */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 dark-mode:bg-gray-800 dark-mode:text-amber-500 mb-6 shadow-sm"
            >
              <History className="w-8 h-8" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-semibold text-[#0F3D66] dark-mode:text-white mb-6">{getTranslation(data.timeline.title)}</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-amber-200 to-blue-100 dark-mode:from-gray-800 dark-mode:via-amber-900/30 dark-mode:to-gray-800 md:-translate-x-1/2 rounded-full" />

            <div className="space-y-12">
              {data.timeline.events.map((event, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end md:hidden">
                    {/* Mobile spacing */}
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white dark-mode:bg-gray-900 border-4 border-amber-500 shadow-lg shadow-amber-500/20 z-10 flex items-center justify-center" />

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0">
                    <div className={`p-8 rounded-3xl bg-white dark-mode:bg-gray-850 shadow-xl shadow-blue-900/5 dark-mode:shadow-black/20 border border-gray-100 dark-mode:border-gray-800 hover:shadow-2xl hover:border-amber-200 dark-mode:hover:border-amber-900/50 transition-all duration-300 group ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark-mode:bg-gray-800 text-blue-700 dark-mode:text-amber-400 font-bold text-sm mb-4 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        {event.year}
                      </span>
                      <h4 className="text-xl font-semibold text-gray-900 dark-mode:text-gray-100 mb-3 group-hover:text-[#0F3D66] transition-colors">
                        {getTranslation(event.title)}
                      </h4>
                      <p className="text-sm text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                        {getTranslation(event.desc)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Administration Section */}
        <section className="mb-20">
          <div className="bg-white dark-mode:bg-gray-850 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-blue-900/5 dark-mode:shadow-black/20 border border-gray-100 dark-mode:border-gray-800">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#0F3D66] dark-mode:text-white mb-6">{getTranslation(data.administration.title)}</h3>
              <p className="text-base text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                {getTranslation(data.administration.description)}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* First Row: 4 Cards */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {data.administration.staff.slice(0, 4).map((member, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeUpVariant}
                    className="bg-gray-50 dark-mode:bg-gray-800 rounded-2xl p-6 text-center group hover:bg-[#0F3D66] dark-mode:hover:bg-gray-700 transition-colors duration-300 flex flex-col items-center"
                  >
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full shadow-md flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 overflow-hidden border-[3px] border-white dark-mode:border-gray-700 ${!member.img ? 'bg-white dark-mode:bg-gray-700' : ''}`}>
                      {member.img ? (
                        <img src={member.img} alt={getTranslation(member.name)} className="w-full h-full object-cover object-top" />
                      ) : (
                        <User className="w-8 h-8 text-gray-400 dark-mode:text-gray-500 group-hover:text-amber-400" />
                      )}
                    </div>
                    <h5 className="text-lg font-semibold text-gray-900 dark-mode:text-white mb-1 group-hover:text-white">
                      {getTranslation(member.name)}
                    </h5>
                    <p className="text-[10px] sm:text-xs font-medium text-amber-600 dark-mode:text-amber-400 uppercase tracking-wider group-hover:text-amber-300 leading-snug">
                      {getTranslation(member.role)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Second Row: 5 Cards */}
              {data.administration.staff.length > 4 && (
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6"
                >
                  {data.administration.staff.slice(4).map((member, idx) => (
                    <motion.div 
                      key={`row2-${idx}`}
                      variants={fadeUpVariant}
                      className="bg-gray-50 dark-mode:bg-gray-800 rounded-2xl p-6 text-center group hover:bg-[#0F3D66] dark-mode:hover:bg-gray-700 transition-colors duration-300 flex flex-col items-center"
                    >
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full shadow-md flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 overflow-hidden border-[3px] border-white dark-mode:border-gray-700 ${!member.img ? 'bg-white dark-mode:bg-gray-700' : ''}`}>
                        {member.img ? (
                          <img src={member.img} alt={getTranslation(member.name)} className="w-full h-full object-cover object-top" />
                        ) : (
                          <User className="w-8 h-8 text-gray-400 dark-mode:text-gray-500 group-hover:text-amber-400" />
                        )}
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900 dark-mode:text-white mb-1 group-hover:text-white">
                        {getTranslation(member.name)}
                      </h5>
                      <p className="text-[10px] sm:text-xs font-medium text-amber-600 dark-mode:text-amber-400 uppercase tracking-wider group-hover:text-amber-300 leading-snug">
                        {getTranslation(member.role)}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Activities & Rehabilitation (Media Rich) */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#0F3D66] dark-mode:text-white mb-6">{getTranslation(data.activities.title)}</h3>
            <p className="text-base text-gray-600 dark-mode:text-gray-400 max-w-2xl mx-auto">{getTranslation(data.overview.description)}</p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto px-4 md:px-12 lg:px-24">
            {data.activities.list.map((activity, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-900/10 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img 
                      src={activity.image} 
                      alt={getTranslation(activity.title)} 
                      className="w-full h-[260px] md:h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                  <div className="max-w-lg">
                    <div className="w-10 h-1 bg-amber-500 rounded-full mb-4" />
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark-mode:text-white mb-4 leading-tight">
                      {getTranslation(activity.title)}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600 dark-mode:text-gray-400 leading-relaxed mb-6">
                      {getTranslation(activity.desc)}
                    </p>
                    <button className="inline-flex items-center gap-2 text-sm text-blue-600 dark-mode:text-amber-400 font-semibold hover:gap-3 transition-all focus:outline-none">
                      {language === 'mr' ? 'अधिक जाणून घ्या' : 'Learn more'} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default YerawadaOpenJailPage;
