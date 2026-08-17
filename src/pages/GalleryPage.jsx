import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAccessibility } from '../hooks/useAccessibility';
import { galleryItems } from '../data/galleryData';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
  const { language, t } = useAccessibility();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  }, []);

  // Make sure we load the page from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark-mode:bg-[#080B11] min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-2 md:mt-4">
        
        {/* Header Section */}
        <div className="mb-8 border-l-4 border-amber-500 pl-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F3D66] dark-mode:text-blue-300 font-poppins">
            {t('फोटो गॅलरी')}
          </h1>
          <p className="mt-2 text-gray-600 dark-mode:text-gray-300 max-w-3xl text-sm sm:text-base">
            {language === 'mr' 
              ? 'महाराष्ट्र कारागृह विभागातील विविध उपक्रम, कार्यशाळा, आणि सुविधांची झलक. चित्रे मोठी करून पाहण्यासाठी आणि अधिक माहिती वाचण्यासाठी क्लिक करा.' 
              : 'A glimpse of various activities, workshops, and facilities at Maharashtra Prison Department. Click on any image to expand it and read more details.'}
          </p>
        </div>

        {/* Masonry Grid Collage */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid relative group bg-gray-50 dark-mode:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark-mode:border-gray-700 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImageIndex(idx)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedImageIndex(idx)}
              role="button"
              aria-label={`View larger image of ${language === 'mr' ? item.title_mr : item.title_en}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.img_src} 
                  alt={item.img_alt} 
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                </div>
              </div>
              
              {/* Short Description */}
              <div className="p-4 border-t border-gray-100 dark-mode:border-gray-700">
                <h3 className="font-medium text-gray-900 dark-mode:text-gray-100 mb-1 text-sm">
                  {language === 'mr' ? item.title_mr : item.title_en}
                </h3>
                <p className="text-xs text-gray-600 dark-mode:text-gray-400 line-clamp-3">
                  {language === 'mr' ? item.desc_mr : item.desc_en}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
              onClick={() => setSelectedImageIndex(null)}
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
                aria-label="Close preview"
              >
                <X className="w-6 h-6" />
              </button>
  
              {/* Previous Button */}
              <button 
                className="absolute left-2 sm:left-8 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
  
              {/* Next Button */}
              <button 
                className="absolute right-2 sm:right-8 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
  
              {/* Image Container */}
              <div 
                className="relative max-w-5xl w-full max-h-[100vh] py-8 flex flex-col items-center justify-center overflow-y-auto custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={galleryItems[selectedImageIndex].img_src}
                  alt={galleryItems[selectedImageIndex].img_alt}
                  className="max-w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain rounded-md shadow-2xl shrink-0"
                />
                
                {/* Caption */}
                <motion.div 
                  key={`caption-${selectedImageIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 sm:mt-6 text-center max-w-3xl shrink-0 pb-4"
                >
                  <h3 className="text-white font-medium text-base mb-1">
                    {language === 'mr' ? galleryItems[selectedImageIndex].title_mr : galleryItems[selectedImageIndex].title_en}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    {language === 'mr' ? galleryItems[selectedImageIndex].desc_mr : galleryItems[selectedImageIndex].desc_en}
                  </p>
                  <div className="mt-3 text-gray-500 text-xs">
                    {selectedImageIndex + 1} / {galleryItems.length}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default GalleryPage;
