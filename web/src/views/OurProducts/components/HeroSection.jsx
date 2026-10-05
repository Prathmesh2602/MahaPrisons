"use client";
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useAccessibility } from '../../../hooks/useAccessibility';

const HeroSection = ({ data }) => {
  const { language } = useAccessibility();

  if (!data) return null;
  
  const Icon = data?.icon && LucideIcons[data.icon] ? LucideIcons[data.icon] : LucideIcons.ShoppingBag;

  return (
    <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={data?.image || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80"} 
          alt="Products Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 dark-mode:bg-black/80"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <div className="inline-flex items-center justify-center p-3 bg-amber-500 rounded-full mb-6 text-white shadow-lg">
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
          {data?.title?.[language] || data?.title?.en}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-medium">
          {data?.subtitle?.[language] || data?.subtitle?.en}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
