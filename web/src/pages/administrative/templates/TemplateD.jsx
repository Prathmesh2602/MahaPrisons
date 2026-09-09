import React, { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { administrativeData } from '../../../data/administrativeData';
import { ShieldAlert, Target, Shield } from 'lucide-react';

const TemplateD = ({ dataId }) => {
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
    <div className="w-full bg-[#111111] dark-mode:bg-black pb-24 min-h-screen text-gray-300">
      
      {/* Strict Minimalist Hero */}
      <div className="relative pt-24 pb-16 px-6 border-b border-red-900/50 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-10 items-end">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-red-500 mb-6"
            >
              <Shield className="w-6 h-6" />
              <span className="uppercase tracking-[0.2em] text-sm font-bold">
                {language === 'mr' ? 'सुरक्षा व पायाभूत सुविधा' : 'Security & Infrastructure'}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 uppercase"
            >
              {getTranslation(data.title)}
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-gray-500"
            >
              // {getTranslation(data.subtitle)}
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="w-full md:w-1/3 border border-gray-800 p-2 bg-[#111]"
          >
            <img src={data.heroImage} alt={getTranslation(data.title)} className="w-full h-48 object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6 mt-12">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 max-w-3xl mb-16 leading-relaxed border-l-2 border-gray-700 pl-6"
        >
          {getTranslation(data.description)}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Core Protocols (Left) */}
          <div>
            <h3 className="text-2xl font-bold text-gray-100 mb-8 uppercase tracking-widest flex items-center gap-3">
              <Target className="w-6 h-6 text-red-500" />
              {language === 'mr' ? 'मुख्य प्रोटोकॉल' : 'Core Protocols'}
            </h3>
            
            <div className="space-y-6">
              {data.coreProtocols.map((protocol, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  key={idx} className="bg-[#1a1a1a] border border-gray-800 p-6 hover:border-red-900/50 transition-colors"
                >
                  <h4 className="text-xl font-bold text-gray-200 mb-2">[{String(idx + 1).padStart(2, '0')}] {getTranslation(protocol.title)}</h4>
                  <p className="text-gray-500">{getTranslation(protocol.desc)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Infrastructure (Right) */}
          <div>
            <h3 className="text-2xl font-bold text-gray-100 mb-8 uppercase tracking-widest text-right">
              {language === 'mr' ? 'पायाभूत सुविधा' : 'Infrastructure'}
            </h3>
            
            <div className="space-y-6">
              {data.infrastructure.map((infra, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  key={idx} className="group relative overflow-hidden border border-gray-800 bg-[#1a1a1a] h-32 flex items-center"
                >
                  <img src={infra.image} alt={getTranslation(infra.name)} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
                  <div className="relative z-10 p-6">
                    <h4 className="text-lg font-bold text-gray-100 mb-1">{getTranslation(infra.name)}</h4>
                    <p className="text-sm text-gray-400">{getTranslation(infra.details)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-red-950/20 border border-red-900 p-8 flex flex-col md:flex-row items-center gap-6"
        >
          <ShieldAlert className="w-12 h-12 text-red-500 flex-shrink-0" />
          <div>
            <h4 className="text-red-500 font-bold uppercase tracking-widest mb-2">
              {language === 'mr' ? 'महत्त्वाची सूचना' : 'Important Notice'}
            </h4>
            <p className="text-red-200/80 text-lg">
              {getTranslation(data.alertMessage)}
            </p>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default TemplateD;
