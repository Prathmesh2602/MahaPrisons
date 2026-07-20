import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { ChevronLeft, ChevronRight, FileText, ArrowRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroCarousel = () => {
  const { language, t } = useAccessibility();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = mockHomepageData.hero_carousel;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Welcome quote for the DG card
  const dgQuote = language === 'mr'
    ? "सुरक्षितता, सुधारणा आणि पुनर्वसन ही आमची मुख्य सूत्रे आहेत. आम्ही बंदीवानांना कौशल्यपूर्ण प्रशिक्षण देऊन समाजाचा एक उपयुक्त घटक बनविण्यासाठी कटिबद्ध आहोत."
    : "Security, correction, and rehabilitation are our guiding pillars. We are committed to equipping inmates with skills to make them productive members of society.";

  return (
    <div className="w-full bg-transparent py-10 px-4 md:px-8 border-b border-gray-200/40 dark-mode:border-gray-850/45 smooth-transition relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Trendy Ken Burns Carousel (8 cols) */}
        <div 
          className="lg:col-span-8 relative h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-md border border-gray-200/50 dark-mode:border-gray-800 flex flex-col justify-end group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-roledescription="carousel"
          aria-label="Government Banners"
        >
          {/* Active Banner Image with Ken Burns animation */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <img
                  src={slides[currentSlide].img_src}
                  alt={slides[currentSlide].img_alt}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
          </div>

          {/* Controls - Left Chevron */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 z-20 border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Controls - Right Chevron */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 z-20 border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Indicators - Dots */}
          <div className="absolute top-4 right-4 z-20 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? 'bg-amber-400 w-5' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentSlide ? "true" : "false"}
              />
            ))}
          </div>

          {/* Glassmorphic Slide Caption */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 z-20">
            <div className="max-w-2xl">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-md text-left inline-block max-w-full shadow-lg"
              >
                <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-widest block mb-1">
                  {language === 'mr' ? 'विशेष योजना व उपक्रम' : 'Featured Scheme'}
                </span>
                <h2 className="text-xs md:text-sm font-extrabold font-devanagari tracking-wide text-white leading-snug">
                  {language === 'mr' 
                    ? slides[currentSlide].caption
                    : currentSlide === 0 
                      ? "Punyasloke Ahilyadevi Holkar Farmer Debt Relief Scheme" 
                      : "Mantralaya, Mumbai Head Office Official Banners"}
                </h2>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial DG Welcome Card (4 cols) */}
        <div className="lg:col-span-4 bg-white dark-mode:bg-gray-900 border border-gray-200/80 dark-mode:border-gray-800 rounded-3xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle design grid pattern overlay */}
          <span className="absolute -top-12 -right-12 w-28 h-28 bg-[#1E5AA8]/5 rounded-full blur-xl transition-all duration-300 group-hover:bg-[#1E5AA8]/10" />

          {/* Dignitary Profile details */}
          <div className="flex items-center gap-4">
            <img 
              src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg" 
              alt="ADG Suhas Warke" 
              className="w-16 h-16 rounded-2xl object-cover object-top border border-gray-150 dark-mode:border-gray-700 shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-[9px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-wider mb-0.5">
                {language === 'mr' ? 'संचालक संदेश' : "Director's Message"}
              </span>
              <h3 className="text-sm font-extrabold font-devanagari text-gray-850 dark-mode:text-gray-100">
                {t("श्री. सुहास वारके")}
              </h3>
              <p className="text-[10px] font-semibold text-gray-500 dark-mode:text-gray-400 leading-tight">
                {language === 'mr' ? 'अपर पोलीस महासंचालक व महानिरीक्षक' : 'ADG & Director General'}
              </p>
            </div>
          </div>

          {/* Editorial quote block */}
          <div className="my-5 relative flex-1 flex items-center">
            <Quote className="absolute -top-1 -left-2 w-8 h-8 text-amber-500/10 dark-mode:text-amber-500/5 rotate-180" />
            <p className="text-xs font-semibold text-gray-600 dark-mode:text-gray-300 leading-relaxed font-devanagari relative pl-4 border-l border-amber-500/35">
              {dgQuote}
            </p>
          </div>

          {/* Action Links */}
          <div className="border-t border-gray-100 dark-mode:border-gray-800 pt-4 flex flex-col gap-2">
            <a
              href="https://mahaprisons.gov.in/directors-message/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-bold text-[#0F3D66] dark-mode:text-blue-300 hover:text-[#1E5AA8] transition-colors focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 group/btn cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#1E5AA8]" />
                <span>{language === 'mr' ? 'पूर्ण संदेश वाचा' : 'Read Full Message'}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
export default HeroCarousel;
