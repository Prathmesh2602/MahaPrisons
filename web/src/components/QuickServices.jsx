import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Phone, Shield, ShieldAlert, HeartHandshake, UserCheck, HelpCircle, Link2, ArrowRight } from 'lucide-react';

export const QuickServices = ({ data }) => {
  const { language, t } = useAccessibility();

  // Safely grab links from backend data or fall back to mock
  const links = data?.links?.length > 0 ? data.links : mockHomepageData.important_links;
  const helplines = data?.helplines?.length > 0 ? data.helplines : mockHomepageData.helpline_services;

  // Helper function to return relevant Lucide Icons for government services
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return <UserCheck className="w-5 h-5 text-teal-600 dark-mode:text-teal-400" />;
      case 1: return <ShieldAlert className="w-5 h-5 text-red-600 dark-mode:text-red-400" />;
      case 2: return <Shield className="w-5 h-5 text-blue-600 dark-mode:text-blue-400" />;
      case 3: return <ShieldAlert className="w-5 h-5 text-amber-600 dark-mode:text-amber-400" />;
      case 4: return <HeartHandshake className="w-5 h-5 text-pink-650 dark-mode:text-pink-400" />;
      case 5: return <HelpCircle className="w-5 h-5 text-indigo-600 dark-mode:text-indigo-400" />;
      default: return <Phone className="w-5 h-5 text-gray-600" />;
    }
  };

  const getIconBg = (idx) => {
    switch (idx) {
      case 0: return 'bg-teal-50 dark-mode:bg-teal-950/25 border-teal-100 dark-mode:border-teal-900/40';
      case 1: return 'bg-red-50 dark-mode:bg-red-950/25 border-red-100 dark-mode:border-red-900/40';
      case 2: return 'bg-blue-50 dark-mode:bg-blue-950/25 border-blue-100 dark-mode:border-blue-900/40';
      case 3: return 'bg-amber-50 dark-mode:bg-amber-950/25 border-amber-100 dark-mode:border-amber-900/40';
      case 4: return 'bg-pink-50 dark-mode:bg-pink-950/25 border-pink-100 dark-mode:border-pink-900/40';
      case 5: return 'bg-indigo-50 dark-mode:bg-indigo-950/25 border-indigo-100 dark-mode:border-indigo-900/40';
      default: return 'bg-gray-50 border-gray-150';
    }
  };

  const getGradientBg = (idx, seed = 0) => {
    const gradients = [
      'bg-gradient-to-br from-blue-100 to-indigo-50 dark-mode:from-blue-900/40 dark-mode:to-indigo-900/20',
      'bg-gradient-to-br from-emerald-100 to-teal-50 dark-mode:from-emerald-900/40 dark-mode:to-teal-900/20',
      'bg-gradient-to-br from-rose-100 to-pink-50 dark-mode:from-rose-900/40 dark-mode:to-pink-900/20',
      'bg-gradient-to-br from-amber-100 to-orange-50 dark-mode:from-amber-900/40 dark-mode:to-orange-900/20',
      'bg-gradient-to-br from-fuchsia-100 to-purple-50 dark-mode:from-fuchsia-900/40 dark-mode:to-purple-900/20',
      'bg-gradient-to-br from-sky-100 to-cyan-50 dark-mode:from-sky-900/40 dark-mode:to-cyan-900/20',
      'bg-gradient-to-br from-lime-100 to-green-50 dark-mode:from-lime-900/40 dark-mode:to-green-900/20',
    ];
    const pseudoRandomIndex = (idx * 5 + seed) % gradients.length;
    return gradients[pseudoRandomIndex];
  };

  return (
    <div className="w-full py-10 px-4 md:px-8 bg-gradient-to-b from-white to-[#F8FAFC] dark-mode:from-gray-950 dark-mode:to-gray-900 smooth-transition relative overflow-hidden border-b border-gray-200/60 dark-mode:border-gray-850">
      {/* Decorative background blur objects */}
      <span className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <span className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0F3D66] dark-mode:text-blue-300 font-poppins relative inline-block pb-3">
            {t("जलद सेवा आणि महत्त्वाच्या लिंक्स")}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-sm" />
          </h2>
          <p className="mt-2 text-gray-600 dark-mode:text-gray-400 text-xs md:text-sm max-w-2xl mx-auto">
            {t("नागरिकांच्या सुविधेसाठी महत्त्वाचे संपर्क क्रमांक आणि संबंधित शासकीय संकेतस्थळांच्या लिंक्स खालीलप्रमाणे उपलब्ध आहेत.")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Helplines Container */}
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark-mode:border-gray-800 pb-2">
              <Phone className="w-5 h-5 text-[#0F766E] dark-mode:text-teal-400" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800 dark-mode:text-gray-200">
                {t("मदत केंद्र (Helplines)")}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helplines.map((service, idx) => {
                const parts = service.text.split(':');
                const number = parts[1] ? parts[1].trim() : '';
                const translatedTitle = t(service.text).split(':')[0];
                const translatedNumber = t(service.text).split(':')[1] || number;

                return (
                  <a
                    key={idx}
                    href={`tel:${number}`}
                    className={`group relative ${getGradientBg(idx, 1)} border border-white/60 rounded-xl p-3 md:p-3.5 hover:border-[#0F766E]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 dark-mode:border-gray-800 dark-mode:hover:border-teal-900/50 flex items-center gap-3 focus:outline focus:outline-2 focus:outline-[#0F766E] overflow-hidden`}
                  >
                    <span className="absolute -top-12 -right-12 w-24 h-24 bg-[#0F766E]/5 group-hover:bg-[#0F766E]/10 rounded-full blur-xl transition-all duration-500" />
                    
                    <div className={`w-10 h-10 rounded-xl border shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ${getIconBg(idx)}`}>
                      {getIcon(idx)}
                    </div>

                    <div className="flex flex-col overflow-hidden">
                      <span className={`text-[10px] md:text-[11px] font-semibold text-gray-500 dark-mode:text-gray-400 group-hover:text-[#0F766E] transition-colors uppercase truncate ${language === 'mr' ? '' : 'tracking-wider'}`}>
                        {translatedTitle}
                      </span>
                      <span className="text-lg md:text-xl font-semibold text-gray-800 dark-mode:text-gray-200 font-poppins tracking-tight leading-snug mt-0.5 truncate">
                        {translatedNumber}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Important Links Container */}
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark-mode:border-gray-800 pb-2">
              <Link2 className="w-5 h-5 text-[#0F3D66] dark-mode:text-blue-400" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800 dark-mode:text-gray-200">
                {t("महत्त्वाच्या लिंक्स (Important Links)")}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {links.map((link, idx) => {
                return (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative ${getGradientBg(idx, 7)} border border-white/60 rounded-md p-2 hover:border-[#0F3D66]/40 hover:shadow-sm transition-all duration-300 dark-mode:border-gray-800 dark-mode:hover:border-blue-900/50 flex items-center justify-between gap-1 focus:outline focus:outline-2 focus:outline-amber-500 overflow-hidden`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F3D66]/[0.02] dark-mode:to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center gap-2 relative z-10 overflow-hidden">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-gray-400 group-hover:bg-[#0F3D66] group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100 dark-mode:border-gray-700 flex-shrink-0">
                        <Link2 className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-[11px] md:text-xs font-medium text-gray-700 dark-mode:text-gray-300 group-hover:text-[#0F3D66] dark-mode:group-hover:text-blue-400 transition-colors leading-tight truncate">
                        {t(link.text)}
                      </span>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0F3D66] dark-mode:text-gray-600 dark-mode:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 relative z-10" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuickServices;
