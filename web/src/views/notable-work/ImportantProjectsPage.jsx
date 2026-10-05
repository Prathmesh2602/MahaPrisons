"use client";
import React from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';

const ImportantProjectsPage = () => {
  const { language } = useAccessibility();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark-mode:bg-gray-900 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-400 dark-mode:text-gray-600 mb-4 text-center">
        {language === 'mr' ? 'पृष्ठ लवकरच येत आहे...' : 'Page coming soon...'}
      </h1>
      <p className="text-gray-400 dark-mode:text-gray-500">
        {language === 'mr' ? 'महत्त्वपूर्ण प्रकल्प' : 'ImportantProjectsPage'}
      </p>
    </div>
  );
};

export default ImportantProjectsPage;
