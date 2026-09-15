"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiveWallpaperBg = ({ settingsData }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [wallpaperImages, setWallpaperImages] = useState([
    "http://localhost:5000/uploads/wallpaper_1.jpg",
    "http://localhost:5000/uploads/wallpaper_2.jpg",
    "http://localhost:5000/uploads/wallpaper_3.jpg",
    "http://localhost:5000/uploads/wallpaper_4.jpg",
    "http://localhost:5000/uploads/wallpaper_5.jpg"
  ]);
  const [animationTime, setAnimationTime] = useState(4.8);

  useEffect(() => {
    if (settingsData && settingsData.wallpaper_config) {
      if (settingsData.wallpaper_config.images && settingsData.wallpaper_config.images.length > 0) {
        setWallpaperImages(settingsData.wallpaper_config.images);
      }
      if (settingsData.wallpaper_config.animationTime) {
        setAnimationTime(Number(settingsData.wallpaper_config.animationTime));
      }
    } else {
      // Fetch live wallpaper settings from backend
      fetch('http://localhost:5000/api/v1/settings/wallpaper_config')
        .then(res => res.json())
        .then(data => {
          if (data && data.images && data.images.length > 0) {
            setWallpaperImages(data.images);
          }
          if (data && data.animationTime) {
            setAnimationTime(Number(data.animationTime));
          }
        })
        .catch(err => console.error('Failed to load wallpaper config', err));
    }
  }, [settingsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % wallpaperImages.length);
    }, animationTime * 1000);
    return () => clearInterval(interval);
  }, [wallpaperImages, animationTime]);

  // Floating particle/crosshair configurations
  const particles = [
    { id: 1, type: '+', size: 14, x: '10%', y: '20%', duration: 10, delay: 0 },
    { id: 2, type: '○', size: 10, x: '80%', y: '15%', duration: 12, delay: 1 },
    { id: 3, type: '+', size: 12, x: '50%', y: '40%', duration: 14, delay: 0.5 },
    { id: 4, type: '⌖', size: 16, x: '30%', y: '75%', duration: 11, delay: 2 },
    { id: 5, type: '○', size: 8, x: '70%', y: '65%', duration: 13, delay: 0 },
    { id: 6, type: '+', size: 10, x: '90%', y: '80%', duration: 12, delay: 1.5 },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 h-[750px] overflow-hidden pointer-events-none z-0 select-none bg-gradient-to-b from-[#EEF2F6] via-[#F8FAFC] to-transparent">

      {/* 1. Snappy Indian-Themed Background Slideshow (Opacity 70% with fast crossfade) */}
      <div className="absolute inset-0 z-0 opacity-[0.70] brightness-95 contrast-110">
        <AnimatePresence mode="wait">
          {wallpaperImages.length > 0 && (
            <motion.img
              key={activeImage}
              src={wallpaperImages[activeImage]}
              alt="Indian / Police Theme Wallpaper"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 1.2 }
              }}
              exit={{
                opacity: 0,
                scale: 0.99,
                transition: { duration: 0.8 }
              }}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>

      {/* 2. Shifting Glowing Mesh Blobs (Sped up loops for active live-wallpaper look) */}
      <motion.div
        animate={{
          x: [-40, 60, -40],
          y: [-30, 40, -30],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12, // Sped up from 25s
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-blue-400/8 blur-3xl"
      />

      <motion.div
        animate={{
          x: [40, -60, 40],
          y: [30, -45, 30],
          scale: [1.15, 0.95, 1.15],
        }}
        transition={{
          duration: 14, // Sped up from 28s
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[200px] right-[-100px] w-[450px] h-[450px] rounded-full bg-teal-400/6 blur-3xl"
      />

      <motion.div
        animate={{
          x: [-20, 30, -20],
          y: [40, -30, 40],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 10, // Sped up from 22s
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[50px] left-[20%] w-[380px] h-[380px] rounded-full bg-indigo-400/6 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8, // Sped up from 15s
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[80px] left-[45%] w-[250px] h-[250px] rounded-full bg-amber-400/4 blur-3xl"
      />

      {/* 3. Blueprint technical grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,61,102,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,61,102,0.025)_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* 4. Floating live particle layers (Slate blue tint) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.1, y: 30 }}
          animate={{
            y: [-15, 20, -15],
            x: [-10, 15, -10],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            fontSize: p.size,
          }}
          className="text-[#0F3D66]/12 font-medium"
        >
          {p.type}
        </motion.div>
      ))}

    </div>
  );
};
export default LiveWallpaperBg;
