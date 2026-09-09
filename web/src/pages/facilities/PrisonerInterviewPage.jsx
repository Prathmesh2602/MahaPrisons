import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Users, Video, Clock, Monitor, MapPin, Mail, Phone } from 'lucide-react';

const iconMap = { Users, Video, Clock, Monitor };

const PrisonerInterviewPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['prisoner-interview'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-gray-50 dark-mode:bg-gray-900 font-poppins flex flex-col md:flex-row">
      
      {/* Left: Sticky Image Half */}
      <div className="w-full md:w-1/2 md:h-screen md:sticky top-0 relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={data.heroImage} alt={getTranslation(data.title)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40 mix-blend-multiply" />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white z-10 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full border border-blue-300/50 bg-blue-500/30 backdrop-blur-md mb-4 text-sm font-semibold tracking-wide uppercase"
          >
            {language === 'mr' ? 'भेट व संपर्क' : 'Visit & Contact'}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
          >
            {getTranslation(data.title)}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-blue-100 max-w-lg"
          >
            {getTranslation(data.subtitle)}
          </motion.p>
        </div>
      </div>

      {/* Right: Scrollable Content Half */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 xl:p-24 bg-white dark-mode:bg-gray-950 text-gray-800 dark-mode:text-gray-200">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="prose prose-lg dark-mode:prose-invert max-w-none mb-16"
        >
          <p className="text-xl leading-relaxed text-gray-600 dark-mode:text-gray-300">
            {getTranslation(data.description)}
          </p>
        </motion.div>

        {/* Stats Flex */}
        <div className="flex flex-wrap gap-4 mb-16">
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <motion.div 
                key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="flex-1 min-w-[140px] p-5 rounded-2xl bg-blue-50 dark-mode:bg-blue-900/20 border border-blue-100 dark-mode:border-blue-800/50"
              >
                <Icon className="w-6 h-6 text-blue-600 dark-mode:text-blue-400 mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark-mode:text-white mb-1">{stat.value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600/70 dark-mode:text-blue-400/70">
                  {getTranslation(stat.label)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Features List */}
        <h3 className="text-2xl font-bold text-gray-900 dark-mode:text-white mb-8 border-b-2 border-blue-500 inline-block pb-2">
          {language === 'mr' ? 'सुविधेचे प्रकार' : 'Types of Facilities'}
        </h3>
        
        <div className="space-y-8 mb-16">
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || Users;
            return (
              <motion.div 
                key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
                className="flex items-start gap-5"
              >
                <div className="p-3 bg-white dark-mode:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark-mode:border-gray-700 flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark-mode:text-gray-100 mb-2">{getTranslation(func.title)}</h4>
                  <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Minimal */}
        <div className="bg-gray-50 dark-mode:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark-mode:border-gray-800">
          <h4 className="text-lg font-bold text-gray-900 dark-mode:text-white mb-6">
            {language === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-gray-600 dark-mode:text-gray-300">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{getTranslation(data.contactInfo.address)}</span>
            </li>
            <li className="flex items-center gap-4 text-gray-600 dark-mode:text-gray-300">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{data.contactInfo.phone}</span>
            </li>
            <li className="flex items-center gap-4 text-gray-600 dark-mode:text-gray-300">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{data.contactInfo.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrisonerInterviewPage;
