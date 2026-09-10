"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Temporarily disable smooth scrolling to allow instant jump to top
    document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Re-enable smooth scrolling after the jump
    setTimeout(() => {
      document.documentElement.style.removeProperty('scroll-behavior');
    }, 10);
  }, [pathname]);

  return null;
}
