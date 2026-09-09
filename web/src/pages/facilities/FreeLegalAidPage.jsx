import React, { useLayoutEffect } from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Users, Calendar, Scale, BookOpen, MapPin, Phone, Mail, Shield } from 'lucide-react';

const iconMap = { Users, Calendar, Scale, BookOpen };

const FreeLegalAidPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['free-legal-aid'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark-mode:bg-gray-900 font-poppins text-gray-800 dark-mode:text-gray-200 py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Header Title */}
        <div className="mb-10 border-b border-gray-200 dark-mode:border-gray-800 pb-8 flex items-center gap-6">
          <div className="p-4 bg-indigo-100 dark-mode:bg-indigo-900/30 rounded-2xl">
            <Scale className="w-10 h-10 text-indigo-700 dark-mode:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark-mode:text-white tracking-tight mb-2">
              {getTranslation(data.title)}
            </h1>
            <p className="text-xl text-indigo-600 dark-mode:text-indigo-400 font-medium">
              {getTranslation(data.subtitle)}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3">
            <div className="rounded-3xl overflow-hidden shadow-lg mb-10">
              <img src={data.heroImage} alt="Legal Aid" className="w-full h-[400px] object-cover" />
            </div>

            <div className="prose prose-lg dark-mode:prose-invert max-w-none mb-12 text-gray-700 dark-mode:text-gray-300">
              <p className="text-xl leading-relaxed">{getTranslation(data.description)}</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark-mode:text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-indigo-500" />
              {language === 'mr' ? 'प्रमुख वैशिष्ट्ये' : 'Key Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.keyFunctions.map((func, idx) => {
                const Icon = iconMap[func.icon] || Scale;
                return (
                  <div key={idx} className="bg-white dark-mode:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark-mode:border-gray-700 hover:shadow-md transition-shadow">
                    <Icon className="w-8 h-8 text-indigo-600 dark-mode:text-indigo-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark-mode:text-gray-100 mb-3">{getTranslation(func.title)}</h3>
                    <p className="text-gray-600 dark-mode:text-gray-400">{getTranslation(func.desc)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full lg:w-1/3 space-y-8">
            
            {/* Stats Widget */}
            <div className="bg-white dark-mode:bg-gray-800 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark-mode:border-gray-700">
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-400 mb-6 border-b border-gray-100 dark-mode:border-gray-700 pb-3">
                {language === 'mr' ? 'दृष्टिक्षेपात' : 'At a Glance'}
              </h3>
              <div className="space-y-6">
                {data.stats.map((stat, idx) => {
                  const Icon = iconMap[stat.icon] || Users;
                  return (
                    <div key={idx} className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-indigo-50 dark-mode:bg-indigo-900/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-indigo-600 dark-mode:text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark-mode:text-white">{stat.value}</div>
                        <div className="text-sm text-gray-500 font-medium">{getTranslation(stat.label)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Widget */}
            <div className="bg-indigo-600 rounded-3xl p-8 shadow-xl text-white sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                {language === 'mr' ? 'संपर्क साधा' : 'Contact Us'}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-indigo-200 mt-1 flex-shrink-0" />
                  <p className="text-indigo-50 leading-relaxed">{getTranslation(data.contactInfo.address)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-indigo-200 flex-shrink-0" />
                  <p className="text-indigo-50 font-medium">{data.contactInfo.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-indigo-200 flex-shrink-0" />
                  <p className="text-indigo-50 text-sm">{data.contactInfo.email}</p>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-white text-indigo-700 rounded-xl font-bold shadow-md hover:bg-indigo-50 transition-colors">
                {language === 'mr' ? 'मदतीसाठी अर्ज करा' : 'Apply for Aid'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeLegalAidPage;
