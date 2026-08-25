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
  const slideDuration = 6000;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, slideDuration);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Director Quote from existing project
  const dgQuote = language === 'mr'
    ? "सुरक्षितता, सुधारणा आणि पुनर्वसन ही आमची मुख्य सूत्रे आहेत. आम्ही बंदीवानांना कौशल्यपूर्ण प्रशिक्षण देऊन समाजाचा एक उपयुक्त घटक बनविण्यासाठी कटिबद्ध आहोत."
    : "Security, correction, and rehabilitation are our guiding pillars. We are committed to equipping inmates with skills to make them productive members of society.";

  return (
    <div className="w-full bg-transparent pt-4 pb-0 px-4 md:px-8 border-gray-200/40 dark-mode:border-gray-850/45 smooth-transition relative z-10">
      <div className="max-w-7xl mx-auto w-full relative group">

        {/* Immersive Hero Wrapper */}
        <div
          className="relative w-full h-[600px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 dark-mode:border-gray-800 flex flex-col justify-end bg-gray-900"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-roledescription="carousel"
          aria-label="Storytelling Banners"
        >
          {/* Top Overlapping Cinematic Strip */}
          <div className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/80 via-black/30 to-transparent pt-4 pb-16 flex justify-center pointer-events-none">
            <div className="flex items-center gap-3 md:gap-5">
              {['श्रम', 'कौशल्य', 'जबाबदारी', 'पुनर्वसन'].map((word, idx) => (
                <React.Fragment key={word}>
                  <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-white/95 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {language === 'mr' ? word : ['LABOR', 'SKILL', 'RESPONSIBILITY', 'REHABILITATION'][idx]}
                  </span>
                  {idx < 3 && (
                    <span className="text-amber-400/80 text-[8px] md:text-[10px] drop-shadow-md">♦</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Background Images with Crossfade */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={slides[currentSlide].img_src}
                  alt={slides[currentSlide].img_alt}
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full object-cover ${currentSlide === 0 ? 'object-bottom' : 'object-center'}`}
                />
                {/* Subtle Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent z-10 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent z-10 md:hidden" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Hero Content Container */}
          <div className="absolute inset-0 z-20 flex flex-col md:flex-row p-6 md:p-12 lg:p-16 justify-between h-full">

            {/* Left Side: Dynamic Story Content */}
            <div className="w-full md:w-[50%] lg:w-[45%] flex flex-col justify-end md:justify-center h-full pb-12 md:pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col text-white"
                >
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-medium uppercase tracking-widest backdrop-blur-md">
                      {language === 'mr' ? 'महाराष्ट्र कारागृह व सुधार सेवा' : 'Maharashtra Prisons & Correctional Services'}
                    </span>
                  </div>

                  {/* Eyebrow Category */}
                  <span className="text-sm font-semibold text-gray-300 mb-1 tracking-wide uppercase">
                    {slides[currentSlide].category[language]}
                  </span>

                  {/* Semantic H1 */}
                  <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold font-poppins text-white mb-3 drop-shadow-md leading-tight">
                    {slides[currentSlide].title[language]}
                  </h1>

                  <p className="text-xl md:text-2xl font-medium text-amber-400 mb-4 drop-shadow-sm">
                    {slides[currentSlide].statement[language]}
                  </p>

                  <p className="text-sm md:text-base text-gray-200 mb-8 max-w-md leading-relaxed drop-shadow-sm font-medium">
                    {slides[currentSlide].description[language]}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {slides[currentSlide].cta1 && (
                      <a href={slides[currentSlide].cta1.href} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm font-medium rounded-lg transition-colors shadow-lg cursor-pointer">
                        {slides[currentSlide].cta1[language]}
                      </a>
                    )}
                    {slides[currentSlide].cta2 && (
                      <a href={slides[currentSlide].cta2.href} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-medium rounded-lg transition-all backdrop-blur-md cursor-pointer">
                        {slides[currentSlide].cta2[language]}
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: Static Floating Leadership Message */}
            <div className="hidden md:flex w-[320px] lg:w-[380px] flex-col justify-center h-full z-30">
              <div className="bg-white/10 dark-mode:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark-mode:border-gray-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                {/* Subtle design grid pattern overlay */}
                <span className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                {/* Dignitary Profile details */}
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <img
                    src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg"
                    alt="ADG Suhas Warke"
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-white/30 shadow-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-amber-400 font-semibold uppercase tracking-widest mb-0.5">
                      {language === 'mr' ? 'संचालक संदेश' : "Director's Message"}
                    </span>
                    <h3 className="text-sm font-semibold font-poppins text-white">
                      {t("श्री. सुहास वारके")}
                    </h3>
                    <p className="text-[10px] font-semibold text-gray-300 leading-tight">
                      {language === 'mr' ? 'अपर पोलीस महासंचालक व महानिरीक्षक' : 'ADG & Director General'}
                    </p>
                  </div>
                </div>

                {/* Editorial quote block */}
                <div className="my-5 relative flex-1 flex items-center">
                  <Quote className="absolute -top-2 -left-1 w-6 h-6 text-white/10 rotate-180" />
                  <p className="text-xs font-semibold text-gray-100 leading-relaxed font-poppins relative pl-3">
                    {dgQuote}
                  </p>
                </div>

                {/* Action Links */}
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="https://mahaprisons.gov.in/directors-message/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 group/btn cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      <span>{language === 'mr' ? 'पूर्ण संदेश वाचा' : 'Read Full Message'}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Controls - Minimal Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 px-1 md:px-2 flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 border border-white/10 backdrop-blur-md transition-all cursor-pointer pointer-events-auto"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white flex items-center justify-center focus:outline focus:outline-2 focus:outline-amber-500 border border-white/10 backdrop-blur-md transition-all cursor-pointer pointer-events-auto"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Premium Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
            <div className="text-white font-mono font-medium text-xs tracking-[0.2em] drop-shadow-md">
              {String(currentSlide + 1).padStart(2, '0')} <span className="text-white/50">/ {String(slides.length).padStart(2, '0')}</span>
            </div>

            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative h-1 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-16 bg-white/30' : 'w-4 bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx === currentSlide && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{ duration: slideDuration / 1000, ease: "linear" }}
                      className="absolute top-0 left-0 h-full bg-amber-400 rounded-full"
                      style={{
                        animationPlayState: isPaused ? 'paused' : 'running'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Director Panel (Stacked below on small screens) */}
        <div className="md:hidden w-full mt-4 bg-white dark-mode:bg-gray-900 border border-gray-200 dark-mode:border-gray-800 rounded-3xl p-6 shadow-md relative">
          <div className="flex items-center gap-4 border-b border-gray-100 dark-mode:border-gray-800 pb-4">
            <img
              src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg"
              alt="ADG Suhas Warke"
              className="w-14 h-14 rounded-full object-cover object-top border border-gray-200 dark-mode:border-gray-700 shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-[9px] text-[#0F3D66] dark-mode:text-blue-400 font-semibold uppercase tracking-widest mb-0.5">
                {language === 'mr' ? 'संचालक संदेश' : "Director's Message"}
              </span>
              <h3 className="text-sm font-semibold font-poppins text-gray-900 dark-mode:text-white">
                {t("श्री. सुहास वारके")}
              </h3>
              <p className="text-[10px] font-semibold text-gray-500 dark-mode:text-gray-400 leading-tight">
                {language === 'mr' ? 'अपर पोलीस महासंचालक व महानिरीक्षक' : 'ADG & Director General'}
              </p>
            </div>
          </div>
          <div className="my-5 relative flex-1 flex items-center">
            <Quote className="absolute -top-2 -left-1 w-6 h-6 text-gray-100 dark-mode:text-gray-800 rotate-180" />
            <p className="text-xs font-semibold text-gray-700 dark-mode:text-gray-300 leading-relaxed font-poppins relative pl-3">
              {dgQuote}
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://mahaprisons.gov.in/directors-message/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-medium text-[#0F3D66] dark-mode:text-blue-400 hover:text-[#1E5AA8] transition-colors focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 group/btn cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
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
