"use client";
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAccessibility } from '../../../hooks/useAccessibility';

const LightboxModal = ({ selectedImageIndex, setSelectedImageIndex, nextImage, prevImage, items = [] }) => {
  const { language } = useAccessibility();

  if (typeof window === 'undefined') return null;

  return createPortal(
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
              src={items[selectedImageIndex]?.image}
              alt={items[selectedImageIndex]?.title?.en || 'Gallery Image'}
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
                {language === 'mr' ? items[selectedImageIndex]?.title?.mr : items[selectedImageIndex]?.title?.en}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                {language === 'mr' ? items[selectedImageIndex]?.desc?.mr : items[selectedImageIndex]?.desc?.en}
              </p>
              <div className="mt-3 text-gray-500 text-xs">
                {selectedImageIndex + 1} / {items.length}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LightboxModal;
