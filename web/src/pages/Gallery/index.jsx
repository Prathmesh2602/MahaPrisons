import React, { useState, useEffect, useCallback } from 'react';
import GalleryHeader from './components/GalleryHeader';
import MasonryGrid from './components/MasonryGrid';
import LightboxModal from './components/LightboxModal';
import { galleryItems } from '../../data/galleryData';

const GalleryPage = () => {
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
        <GalleryHeader />
        <MasonryGrid setSelectedImageIndex={setSelectedImageIndex} />
      </div>

      <LightboxModal 
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        nextImage={nextImage}
        prevImage={prevImage}
      />
    </div>
  );
};

export default GalleryPage;
