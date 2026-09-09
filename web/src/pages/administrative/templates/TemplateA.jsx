import React, { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { administrativeData } from '../../../data/administrativeData';
import { Users, FileText, GitMerge, Briefcase, PieChart, Network, GraduationCap, Heart, UserPlus, BookOpen, CreditCard, Scale, Clock, ShieldCheck, FileSignature, Gavel, ClipboardList, MapPin, Mail, Phone } from 'lucide-react';

const iconMap = {
  Users, FileText, GitMerge, Briefcase, PieChart, Network, GraduationCap, Heart, UserPlus, BookOpen, CreditCard, Scale, Clock, ShieldCheck, FileSignature, Gavel, ClipboardList
};

const TemplateA = ({ dataId }) => {
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
      <div className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={getTranslation(data.title)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl border-l-4 border-blue-500 pl-8">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {getTranslation(data.title)}
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-blue-200 font-medium mb-6"
            >
              {getTranslation(data.subtitle)}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 leading-relaxed max-w-2xl text-lg"
            >
              {getTranslation(data.description)}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-20">
        {/* Stats Section */}
        <motion.div 
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || FileText;
            return (
              <motion.div key={idx} variants={itemVariants} className="bg-white dark-mode:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark-mode:border-slate-700 flex items-center gap-6">
                <div className="p-4 bg-blue-50 dark-mode:bg-blue-900/30 text-blue-600 dark-mode:text-blue-400 rounded-lg">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 dark-mode:text-slate-100">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark-mode:text-slate-400 font-medium mt-1 uppercase tracking-wider">{getTranslation(stat.label)}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Functions */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-800 dark-mode:text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              {language === 'mr' ? 'प्रमुख कार्ये' : 'Key Functions'}
            </h3>
            <div className="space-y-6">
              {data.keyFunctions.map((func, idx) => {
                const Icon = iconMap[func.icon] || FileText;
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
                        <h4 className="text-xl font-semibold text-slate-800 dark-mode:text-slate-100 mb-2">{getTranslation(func.title)}</h4>
                        <p className="text-slate-600 dark-mode:text-slate-400 leading-relaxed">{getTranslation(func.desc)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Contact & Info Sidebar */}
          <div>
            <div className="bg-blue-600 rounded-xl p-8 text-white shadow-xl sticky top-32">
              <h3 className="text-xl font-bold mb-6 border-b border-blue-500/50 pb-4">
                {language === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-50 leading-snug">{getTranslation(data.contactInfo.address)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <p className="text-blue-50 font-medium">{data.contactInfo.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <p className="text-blue-50 text-sm break-all">{data.contactInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateA;
