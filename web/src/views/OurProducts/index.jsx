"use client";
import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProductsGrid from './components/ProductsGrid';
import OutletSection from './components/OutletSection';

const OurProductsPage = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark-mode:bg-gray-900 transition-colors duration-300">
      <div data-block-type="template_hero">
        <HeroSection data={data?.hero} />
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div data-block-type="template_products">
          <ProductsGrid data={data?.products} />
        </div>
        <div data-block-type="template_outlet" className="mt-16">
          <OutletSection data={data?.outlet} />
        </div>
      </div>
    </div>
  );
};

export default OurProductsPage;
