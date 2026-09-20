'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LiveWallpaperBg from '../../components/LiveWallpaperBg';
import { AccessibilityProvider } from '../../hooks/useAccessibility';
import Layout from '../../components/Layout';
import { PageRenderer } from '../../components/PageRenderer';

export default function PreviewPage() {
  const [componentType, setComponentType] = useState<string | null>(null);
  const [settingsData, setSettingsData] = useState<any>(null);
  
  // Global states for layout rendering
  const [globalSettings, setGlobalSettings] = useState<any>(null);
  const [menuData, setMenuData] = useState<any>([]);

  useEffect(() => {
    // Fetch global data for the Page layout preview
    const fetchGlobalData = async () => {
      try {
        const [menuRes, settingsRes] = await Promise.all([
          fetch('http://localhost:5000/api/v1/menu'),
          fetch('http://localhost:5000/api/v1/settings')
        ]);
        if (menuRes.ok) setMenuData(await menuRes.json());
        if (settingsRes.ok) setGlobalSettings(await settingsRes.json());
      } catch (err) {
        console.error('Failed to fetch global data for preview:', err);
      }
    };
    fetchGlobalData();

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

  // Global click listener to capture block clicks for editing
  useEffect(() => {
    if (componentType !== 'Page') return;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-block-type]');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        const blockType = target.getAttribute('data-block-type');
        window.parent.postMessage({ type: 'BLOCK_SELECTED', blockType }, '*');
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [componentType]);

  if (!componentType) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 text-slate-400">
        Waiting for preview data...
      </div>
    );
  }

  // If editing the full Page, use the layout to display Header/Footer identically to frontend
  if (componentType === 'Page') {
    return (
      <AccessibilityProvider>
        <style dangerouslySetInnerHTML={{__html: `
          [data-block-type] {
            position: relative;
            transition: all 0.2s;
          }
          [data-block-type]:hover {
            cursor: pointer;
          }
          [data-block-type]:hover::after {
            content: '';
            position: absolute;
            inset: 0;
            outline: 4px dashed #3b82f6;
            outline-offset: -4px;
            background: rgba(59, 130, 246, 0.05);
            z-index: 99999;
            pointer-events: none;
          }
        `}} />
        <Layout menuData={menuData} settingsData={globalSettings}>
          <PageRenderer 
            slug={settingsData?.slug} 
            layoutType={settingsData?.layoutType} 
            pageData={{ contentBlocks: settingsData?.blocks || [] }} 
          />
        </Layout>
      </AccessibilityProvider>
    );
  }

  // Legacy isolated preview logic for individual components
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
