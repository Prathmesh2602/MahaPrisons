"use client";
import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProductsGrid from './components/ProductsGrid';
import OutletSection from './components/OutletSection';

const OurProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark-mode:bg-gray-900 transition-colors duration-300">
      <HeroSection />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ProductsGrid />
        <OutletSection />
      </div>
    </div>
  );
};

export default OurProductsPage;
