"use client";
import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

import AccessibilityToolbar from './AccessibilityToolbar';
import Header from './Header';
import MegaMenu from './MegaMenu';
import Footer from './Footer';
import LiveWallpaperBg from './LiveWallpaperBg';
import ScrollToTopButton from './ScrollToTopButton';

export const Layout = () => {
  // Scroll transforms for bottom section orbs
  const { scrollY } = useScroll();
  const yBlob3 = useTransform(scrollY, [0, 1800], [0, -120]);
  const yBlob4 = useTransform(scrollY, [0, 1800], [0, 80]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F8FAFC] dark-mode:bg-[#080B11] smooth-transition relative font-poppins">
      {/* GRAPHICAL LIVE WALLPAPER BACKGROUND */}
      <LiveWallpaperBg />

      {/* Bottom section decorative parallax blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          style={{ y: yBlob3 }}
          className="glow-orb w-[600px] h-[600px] bg-indigo-400/5 bottom-[300px] -left-80 pointer-events-none"
        />
        <motion.div
          style={{ y: yBlob4 }}
          className="glow-orb w-80 h-80 bg-amber-400/5 bottom-20 -right-20 pointer-events-none"
        />
      </div>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Premium Title Branding Header */}
      <Header />

      {/* Desktop Light Gray / Sticky Accordion mega menu */}
      <MegaMenu />

      {/* Main Content Body Slot - Rendered by React Router */}
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none relative z-10">
        <Outlet />
      </main>

      {/* NIC copyright footer list */}
      <Footer />

      {/* Global Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;

