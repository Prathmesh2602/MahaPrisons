import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';




const AccessibilityContext = createContext(undefined);

export const AccessibilityProvider = ({ children }) => {
  const [language, setLanguage] = useState('mr');
  const [contrast, setContrast] = useState('normal');
  const [fontSize, setFontSize] = useState(0);
  const [invertColors, setInvertColors] = useState(false);
  const [bhashiniVoiceActive, setBhashiniVoiceActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply contrast settings to html/body elements
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('high-contrast', 'dark-mode');
    
    if (contrast === 'high-contrast') {
      root.classList.add('high-contrast');
    } else if (contrast === 'dark-mode') {
      root.classList.add('dark-mode');
    }
  }, [contrast]);

  // Apply font size adjustment class
  useEffect(() => {
    const root = document.documentElement;
    // Base font sizes: standard is 18px (which is 112.5% of browser 16px default)
    // Let's adjust root font size by setting style inline
    const sizeMultiplier = 1.125 + fontSize * 0.1; // 10% change per step
    root.style.fontSize = `${sizeMultiplier * 100}%`;
  }, [fontSize]);

  // Apply color inversion style
  useEffect(() => {
    const root = document.documentElement;
    if (invertColors) {
      root.style.filter = 'invert(1) hue-rotate(180deg)';
    } else {
      root.style.filter = 'none';
    }
  }, [invertColors]);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 4));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, -2));
  const resetFontSize = () => setFontSize(0);

  // Translation helper function
  const t = (key) => {
    const cleanKey = key.trim();
    if (translations[cleanKey]) {
      return translations[cleanKey][language];
    }
    // Return key if no translation found
    return key;
  };

  // Text to Speech logic
  const speak = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    // Auto-detect voice language based on text characters
    // Simple devanagari detection
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    utterance.lang = hasDevanagari ? 'hi-IN' : 'en-IN'; // hi-IN works well for Marathi text narration in standard speech synthesizers
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        setLanguage,
        contrast,
        setContrast,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        invertColors,
        setInvertColors,
        bhashiniVoiceActive,
        setBhashiniVoiceActive,
        t,
        speak,
        stopSpeaking,
        isSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
