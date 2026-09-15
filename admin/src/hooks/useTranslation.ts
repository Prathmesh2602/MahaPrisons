import { useState, useEffect } from 'react';

type Language = 'en' | 'mr';

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('admin_lang') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'mr' : 'en';
    setLanguage(newLang);
    localStorage.setItem('admin_lang', newLang);
  };

  const t = (en: string, mr: string) => {
    return language === 'en' ? en : mr;
  };

  return { language, setLanguage, toggleLanguage, t };
};
