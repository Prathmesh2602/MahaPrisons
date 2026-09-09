"use client";
import { useEffect } from 'react';
import { usePathname as useLocation } from 'next/navigation';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}
