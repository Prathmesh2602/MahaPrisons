import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  const { language, t } = useAccessibility();
  const lang = language;

  // Bilingual paragraph content about the department
  const aboutText = lang === 'mr'
    ? "महाराष्ट्र कारागृह विभाग हा राज्यातील कायदा व सुव्यवस्था राखण्यात अत्यंत महत्त्वाची भूमिका बजावतो. गुन्हेगारांचे सुरक्षित अभिरक्षण करणे आणि त्याच वेळी त्यांच्या सुधारणेसाठी व पुनर्वसनासाठी विविध उपक्रम राबविणे हे विभागाचे मुख्य ध्येय आहे. राज्यात विविध श्रेणींमधील एकूण ६० कारागृहे आहेत, ज्यामध्ये मध्यवर्ती, जिल्हा, खुले आणि महिला काराकृहांचा समावेश होतो. आधुनिक तंत्रज्ञानाचा वापर करून पारदर्शकता वाढविणे आणि बंदीवानांमध्ये व्यावसायिक कौशल्ये निर्माण करून त्यांना समाजाचे जबाबदार नागरिक बनविणे यावर विभागाचा भर आहे."
    : "The Maharashtra Prisons Department plays a vital role in maintaining law and order in the state. Secure custody of offenders, coupled with correctional initiatives for their reform and rehabilitation, forms the core mission. With 60 prisons of various categories including central, district, open, and women's prisons across the state, the department leverages modern technology to foster transparency. We focus on vocational training and psychological rehabilitation to transform inmates into responsible citizens.";

  const welcomeTitle = lang === 'mr'
    ? "महाराष्ट्र कारागृह आणि सुधार सेवांमध्ये आपले स्वागत आहे"
    : "Welcome to Maharashtra Prisons & Correctional Services";

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-[#F1F5F9] to-[#F8FAFC] dark-mode:from-gray-900 dark-mode:to-gray-950 border-y border-gray-200 dark-mode:border-gray-800 smooth-transition relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Prison Logo column */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative p-6 bg-white dark-mode:bg-gray-850 border border-gray-200/50 dark-mode:border-gray-800 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 group max-w-sm">
              {/* Highlight gradient borders */}
              <span className="absolute inset-0 bg-gradient-to-tr from-[#0F3D66]/5 to-[#0F766E]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
              <img
                src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/01/20260109374693913.jpg"
                alt={t("कारागृह लोगो")}
                className="w-44 h-auto mx-auto rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-inner"
              />
            </div>
          </div>

          {/* About text column */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className={`text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase block mb-2 ${lang === 'mr' ? '' : 'tracking-widest'}`}>
              {t("विभागाविषयी")}
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 mb-4 font-devanagari leading-snug">
              {welcomeTitle}
            </h2>
            <p className="text-sm md:text-base text-gray-700 dark-mode:text-gray-300 font-medium leading-relaxed mb-6 font-devanagari max-w-3xl">
              {aboutText}
            </p>
            
            {/* Read More button */}
            <a
              href="https://mahaprisons.gov.in/about-department/%e0%a4%aa%e0%a4%b0%e0%a4%bf%e0%a4%9a%e0%a4%af/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#0F3D66] hover:bg-[#1E5AA8] text-white rounded-full font-bold text-xs shadow-md hover:shadow-lg transition-all group focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer"
            >
              <span>{t("अधिक वाचा …")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
export default AboutSection;
