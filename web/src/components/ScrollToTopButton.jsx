import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Temporarily set scroll behavior to smooth if it was disabled
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Cleanup if needed, but smooth scrolling should take effect
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalStyle;
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/30 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 hover:-translate-y-1"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
