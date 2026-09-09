"use client";
import React from 'react';
import { ZoomIn } from 'lucide-react';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { galleryItems } from '../../../data/galleryData';

const MasonryGrid = ({ setSelectedImageIndex }) => {
  const { language } = useAccessibility();

  return (
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
  );
};

export default MasonryGrid;
