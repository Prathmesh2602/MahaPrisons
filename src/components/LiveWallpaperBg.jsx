import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiveWallpaperBg = () => {
  const [activeImage, setActiveImage] = useState(0);

  // 5 High-Definition, fast-loading Indian Flag & Maharashtra Police themed wallpapers
  const indianThemeImages = [
    "https://images.unsplash.com/photo-1589330273594-fade1ee91647?q=80&w=1200&auto=format&fit=crop", // Waving Tricolor Indian Flag in clear blue sky
    "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=1200&auto=format&fit=crop", // Government HQ Administrative Illumination (patriotic theme)
    "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&auto=format&fit=crop", // Close-up Tricolor Flag close-up details
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop", // India Gate National Memorial Monument
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop" // Gateway of India, Mumbai (Maharashtra heritage theme)
  ];

  // Snappy image rotation - changed from 9 seconds to 4.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % indianThemeImages.length);
    }, 4800);
    return () => clearInterval(interval);
  }, []);

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
    <div className="absolute top-0 left-0 right-0 h-[1150px] overflow-hidden pointer-events-none z-0 select-none bg-gradient-to-b from-[#EEF2F6] via-[#F8FAFC] to-transparent">

      {/* 1. Snappy Indian-Themed Background Slideshow (Opacity 70% with fast crossfade) */}
      <div className="absolute inset-0 z-0 opacity-[0.70] brightness-95 contrast-110">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={indianThemeImages[activeImage]}
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
          className="text-[#0F3D66]/12 font-bold"
        >
          {p.type}
        </motion.div>
      ))}

    </div>
  );
};
export default LiveWallpaperBg;
