'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LiveWallpaperBg from '../../components/LiveWallpaperBg';
import { AccessibilityProvider } from '../../hooks/useAccessibility';

export default function PreviewPage() {
  const [componentType, setComponentType] = useState<string | null>(null);
  const [settingsData, setSettingsData] = useState<any>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // In production, verify event.origin here
      const data = event.data;
      if (data && data.type === 'PREVIEW_UPDATE') {
        setComponentType(data.component);
        setSettingsData(data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Notify parent that preview is ready
    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!componentType) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 text-slate-400">
        Waiting for preview data...
      </div>
    );
  }

  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col relative">
        {componentType === 'Header' && (
          <div className="w-full">
            <Header settingsData={settingsData} />
          </div>
        )}
        {componentType === 'Footer' && (
          <div className="w-full mt-auto">
            <Footer settingsData={settingsData} />
          </div>
        )}
        {componentType === 'Wallpaper' && (
          <div className="absolute inset-0">
            <LiveWallpaperBg settingsData={settingsData} />
          </div>
        )}
      </div>
    </AccessibilityProvider>
  );
}
