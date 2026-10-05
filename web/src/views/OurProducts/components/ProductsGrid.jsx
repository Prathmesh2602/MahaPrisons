"use client";
import React from 'react';
import { ShoppingBag, Star, Package, CheckCircle2, Circle } from 'lucide-react';
import { useAccessibility } from '../../../hooks/useAccessibility';

const ICONS = {
  ShoppingBag: ShoppingBag,
  Star: Star,
  Package: Package,
  CheckCircle2: CheckCircle2,
};

const ProductsGrid = ({ data }) => {
  const { language } = useAccessibility();

  const productsList = data || [];

  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark-mode:text-white mb-4">
          {language === 'mr' ? 'उत्पादनांची श्रेणी' : 'Product Categories'}
        </h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsList.map((product, index) => {
          const Icon = ICONS[product.icon] || Circle;
          return (
            <div 
              key={product.id || index} 
              className="group bg-white dark-mode:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark-mode:border-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title?.[language] || product.title?.en} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="bg-amber-500 p-2 rounded-lg text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">
                    {product.title?.[language] || product.title?.en}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark-mode:text-gray-300 leading-relaxed">
                  {product.desc?.[language] || product.desc?.en}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 dark-mode:border-gray-700 flex justify-between items-center">
                  <span className="text-sm font-semibold text-amber-600 dark-mode:text-amber-400 uppercase tracking-wider">
                    {language === 'mr' ? 'अधिक माहिती' : 'Learn More'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 dark-mode:bg-gray-700 flex items-center justify-center text-amber-600 dark-mode:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductsGrid;
