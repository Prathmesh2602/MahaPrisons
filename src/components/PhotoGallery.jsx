import React, { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { ArrowUpRight, Grid, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotoGallery = () => {
  const { language, t } = useAccessibility();
  const [activePhoto, setActivePhoto] = useState(0);

  const galleryInfo = mockHomepageData.gallery;
  
  // Custom mock photos showing prison craft work, handloom weaving, agricultural training, prison premises
  const galleryItems = [
    {
      img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2025/01/202501222131506397.jpg",
      img_alt: "महाराष्ट्र विभागांचा नकाशा",
      title_mr: "महाराष्ट्र विभागांचा नकाशा",
      title_en: "Maharashtra Administrative Divisions Map",
      desc_mr: "कारागृह प्रशासनाचे प्रादेशिक विभाग दर्शविणारा अधिकृत नकाशा.",
      desc_en: "Official map showing regional divisions of prison administration."
    },
    {
      img_src: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2025/01/202501221085479752.jpg",
      img_alt: "मंत्रालय मुंबई",
      title_mr: "मंत्रालय इमारत, मुंबई",
      title_en: "Mantralaya Building, Mumbai",
      desc_mr: "महाराष्ट्र शासनाचे प्रशासकीय मुख्यालय.",
      desc_en: "Administrative headquarters of the Government of Maharashtra."
    }
  ];

  const handleNext = () => {
    setActivePhoto((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setActivePhoto((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="w-full bg-white dark-mode:bg-gray-950 py-20 px-4 md:px-8 border-b border-gray-200 dark-mode:border-gray-800 smooth-transition">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title & View All action */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 border-b border-gray-100 dark-mode:border-gray-800 pb-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-widest block mb-2">
              {language === 'mr' ? 'दृश्य दालन' : 'Visual Gallery'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari">
              {t("छायाचित्र दालन")}
            </h2>
          </div>

          <a
            href={galleryInfo.view_all_href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#0F3D66] hover:bg-[#0F3D66] hover:text-white dark-mode:border-blue-400 dark-mode:hover:bg-blue-500 dark-mode:hover:text-gray-900 text-[#0F3D66] dark-mode:text-blue-300 rounded-full font-bold text-xs transition-all focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer self-center sm:self-end"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{t("सर्व पहा")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Column 1: Carousel Slider */}
          <div className="lg:col-span-8 relative bg-slate-50 dark-mode:bg-gray-900 border border-gray-200/80 dark-mode:border-gray-850 rounded-3xl overflow-hidden aspect-video shadow-md flex items-center justify-center group">
            
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhoto}
                src={galleryItems[activePhoto].img_src}
                alt={galleryItems[activePhoto].img_alt}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain p-4 rounded-3xl"
              />
            </AnimatePresence>

            {/* Left controller */}
            <button
              onClick={handlePrev}
              className="absolute left-4 w-11 h-11 rounded-full bg-black/40 hover:bg-[#0F3D66] text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right controller */}
            <button
              onClick={handleNext}
              className="absolute right-4 w-11 h-11 rounded-full bg-black/40 hover:bg-[#0F3D66] text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicator Overlay */}
            <div className="absolute top-4 right-4 bg-[#0F3D66]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-sm">
              {activePhoto + 1} / {galleryItems.length}
            </div>
          </div>

          {/* Column 2: Info Card Detail */}
          <div className="lg:col-span-4 flex flex-col justify-center h-full">
            <div className="bg-[#F8FAFC] dark-mode:bg-gray-900 border border-gray-200/80 dark-mode:border-gray-850 rounded-3xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden h-full min-h-[250px]">
              {/* Highlight background corner */}
              <span className="absolute -top-12 -right-12 w-28 h-28 bg-[#0F766E]/5 rounded-full blur-xl" />
              
              <div className="flex items-center gap-2 text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-widest">
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'फोटो वर्णन' : 'Photo Details'}</span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-base font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari mb-2 leading-tight">
                  {language === 'mr' ? galleryItems[activePhoto].title_mr : galleryItems[activePhoto].title_en}
                </h3>
                <p className="text-xs font-semibold text-gray-600 dark-mode:text-gray-450 leading-relaxed font-devanagari">
                  {language === 'mr' ? galleryItems[activePhoto].desc_mr : galleryItems[activePhoto].desc_en}
                </p>
              </div>

              {/* Bullet indicators */}
              <div className="flex gap-1.5 pt-4 border-t border-gray-150 dark-mode:border-gray-800 mt-auto">
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`h-2.5 rounded-full transition-all border border-gray-300 dark-mode:border-gray-700 cursor-pointer ${
                      idx === activePhoto ? 'bg-amber-500 w-6' : 'bg-gray-300 dark-mode:bg-gray-800 w-2.5'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default PhotoGallery;
