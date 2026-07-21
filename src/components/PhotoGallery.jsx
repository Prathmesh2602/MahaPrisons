import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { ZoomIn, X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotoGallery = () => {
  const { language, t } = useAccessibility();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const images = [
    { src: "/gallary/1.jpeg", alt: "Prison Gallery Image 1", title_mr: "कारागृह परिसर आणि सुधार कार्य - १", title_en: "Prison Premises & Reform Initiatives - 1" },
    { src: "/gallary/2.jpeg", alt: "Prison Gallery Image 2", title_mr: "कारागृह परिसर आणि सुधार कार्य - २", title_en: "Prison Premises & Reform Initiatives - 2" },
    { src: "/gallary/3.jpeg", alt: "Prison Gallery Image 3", title_mr: "कारागृह परिसर आणि सुधार कार्य - ३", title_en: "Prison Premises & Reform Initiatives - 3" },
    { src: "/gallary/4.jpeg", alt: "Prison Gallery Image 4", title_mr: "कारागृह परिसर आणि सुधार कार्य - ४", title_en: "Prison Premises & Reform Initiatives - 4" },
    { src: "/gallary/5.jpeg", alt: "Prison Gallery Image 5", title_mr: "कारागृह परिसर आणि सुधार कार्य - ५", title_en: "Prison Premises & Reform Initiatives - 5" },
    { src: "/gallary/6.jpeg", alt: "Prison Gallery Image 6", title_mr: "कारागृह परिसर आणि सुधार कार्य - ६", title_en: "Prison Premises & Reform Initiatives - 6" },
    { src: "/gallary/7.jpeg", alt: "Prison Gallery Image 7", title_mr: "कारागृह परिसर आणि सुधार कार्य - ७", title_en: "Prison Premises & Reform Initiatives - 7" },
    { src: "/gallary/8.jpeg", alt: "Prison Gallery Image 8", title_mr: "कारागृह परिसर आणि सुधार कार्य - ८", title_en: "Prison Premises & Reform Initiatives - 8" },
    { src: "/gallary/9.jpeg", alt: "Prison Gallery Image 9", title_mr: "कारागृह परिसर आणि सुधार कार्य - ९", title_en: "Prison Premises & Reform Initiatives - 9" },
    { src: "/gallary/10.jpeg", alt: "Prison Gallery Image 10", title_mr: "कारागृह परिसर आणि सुधार कार्य - १०", title_en: "Prison Premises & Reform Initiatives - 10" },
    { src: "/gallary/11.jpeg", alt: "Prison Gallery Image 11", title_mr: "कारागृह परिसर आणि सुधार कार्य - ११", title_en: "Prison Premises & Reform Initiatives - 11" },
    { src: "/gallary/12.jpeg", alt: "Prison Gallery Image 12", title_mr: "कारागृह परिसर आणि सुधार कार्य - १२", title_en: "Prison Premises & Reform Initiatives - 12" },
    { src: "/gallary/13.jpeg", alt: "Prison Gallery Image 13", title_mr: "कारागृह परिसर आणि सुधार कार्य - १३", title_en: "Prison Premises & Reform Initiatives - 13" },
    { src: "/gallary/14.jpeg", alt: "Prison Gallery Image 14", title_mr: "कारागृह परिसर आणि सुधार कार्य - १४", title_en: "Prison Premises & Reform Initiatives - 14" },
    { src: "/gallary/15.jpeg", alt: "Prison Gallery Image 15", title_mr: "कारागृह परिसर आणि सुधार कार्य - १५", title_en: "Prison Premises & Reform Initiatives - 15" },
    { src: "/gallary/16.jpeg", alt: "Prison Gallery Image 16", title_mr: "कारागृह परिसर आणि सुधार कार्य - १६", title_en: "Prison Premises & Reform Initiatives - 16" },
    { src: "/gallary/17.jpeg", alt: "Prison Gallery Image 17", title_mr: "कारागृह परिसर आणि सुधार कार्य - १७", title_en: "Prison Premises & Reform Initiatives - 17" },
    { src: "/gallary/WhatsApp Image 2026-07-20 at 19.57.30.jpeg", alt: "Prison Gallery Image 18", title_mr: "कारागृह परिसर आणि सुधार कार्य - १८", title_en: "Prison Premises & Reform Initiatives - 18" }
  ];

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const displayedImages = showAll ? images : images.slice(0, 8);

  return (
    <div className="w-full bg-white dark-mode:bg-gray-950 py-20 px-4 md:px-8 border-b border-gray-200 dark-mode:border-gray-800 smooth-transition">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title & Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-widest block mb-2">
            {language === 'mr' ? 'दृश्य दालन' : 'Visual Gallery'}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari relative inline-block pb-3">
            {t("छायाचित्र दालन")}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full" />
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedImages.map((image, idx) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: showAll ? 0 : idx * 0.05 }}
                onClick={() => setSelectedImage(idx)}
                className="group relative aspect-video sm:aspect-square overflow-hidden rounded-3xl bg-gray-100 dark-mode:bg-gray-900 border border-gray-200/60 dark-mode:border-gray-800 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Micro title at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[11px] font-bold text-white line-clamp-1">
                    {language === 'mr' ? image.title_mr : image.title_en}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#0F3D66] dark-mode:border-blue-400 text-[#0F3D66] dark-mode:text-blue-300 hover:bg-[#0F3D66] hover:text-white dark-mode:hover:bg-blue-500 dark-mode:hover:text-gray-900 rounded-full font-bold text-xs transition-all focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer shadow-md"
          >
            <Grid className="w-4 h-4" />
            <span>{showAll ? (language === 'mr' ? 'कमी पहा' : 'Show Less') : (language === 'mr' ? 'पहा अधिक' : 'Show More')}</span>
          </button>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 z-50"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-4 md:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 z-50"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-4 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 z-50"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main Content Area */}
              <motion.div
                key={selectedImage}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />

                {/* Subtitle Card */}
                <div className="mt-4 text-center max-w-xl">
                  <p className="text-sm font-bold text-white font-devanagari">
                    {language === 'mr' ? images[selectedImage].title_mr : images[selectedImage].title_en}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 font-semibold">
                    {selectedImage + 1} / {images.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default PhotoGallery;
