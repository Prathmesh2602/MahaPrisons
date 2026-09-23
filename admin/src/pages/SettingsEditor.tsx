import React, { useState, useEffect, useRef } from 'react';
import { useBlockHistory } from '../hooks/useBlockHistory';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { PhoneticInput } from '../components/PhoneticInput';
import { EditorFormHeader, EditorBlock, EditorBlockHeader } from '../components/EditorLayout';
import { MediaLibraryPopup } from '../components/MediaLibraryPopup';
import { Save, Send, Layout, Type, ShieldCheck, ArrowLeft, Image as ImageIcon, Eye, EyeOff, Trash2, X, Monitor } from 'lucide-react';

type TabType = 'DASHBOARD' | 'HEADER' | 'FOOTER' | 'WALLPAPER';

const DEFAULT_WALLPAPER_CONFIG = {
  images: [
    'http://localhost:5000/uploads/wallpaper_1.jpg',
    'http://localhost:5000/uploads/wallpaper_2.jpg',
    'http://localhost:5000/uploads/wallpaper_3.jpg',
    'http://localhost:5000/uploads/wallpaper_4.jpg',
    'http://localhost:5000/uploads/wallpaper_5.jpg'
  ],
  animationTime: 4.8
};

const DEFAULT_HEADER_CONFIG = {
  title_en: 'Yerwada Open District Prison Pune',
  title_mr: 'येरवडा खुले जिल्हा कारागृह, पुणे',
  subtitle_en: 'Yerwada Open District Prison Pune',
  subtitle_mr: 'येरवडा खुले जिल्हा कारागृह, पुणे',
  logo_src: 'http://localhost:5000/uploads/logo.jpeg',
  logo_link: 'https://www.maharashtra.gov.in',
  right_logos: [
    { src: 'http://localhost:5000/uploads/emblem.svg', link: 'https://www.india.gov.in' },
    { src: 'http://localhost:5000/uploads/digital_india.png', link: 'https://digitalindia.gov.in' }
  ]
};

const DEFAULT_FOOTER_CONFIG = {
  copyright_en: 'Contents owned and maintained by Yerawada Open Prison.',
  copyright_mr: 'मालकीची सामग्री येरवडा खुले कारागृह',
  contact: {
    address_en: 'Yerawada Open Prison, Airport Road, Pune, Maharashtra 411006',
    address_mr: 'येरवडा खुले कारागृह, विमानतळ रस्ता, पुणे, महाराष्ट्र ४११००६',
    phone_en: '020-26694051',
    phone_mr: '०२०-२६६९४०५१',
    email: 'yerwadaop-mh@gov.in'
  },
  links: [
    { text_en: 'Home', text_mr: 'मुख्यपृष्ठ', href: '#' },
    { text_en: 'About Us', text_mr: 'आमच्याबद्दल', href: '#' },
    { text_en: 'Activities', text_mr: 'उपक्रम', href: '#' },
    { text_en: 'Website Policies', text_mr: 'वेबसाइट धोरणे', href: '#' },
    { text_en: 'Contact Us', text_mr: 'संपर्क साधा', href: '#' },
    { text_en: 'Feedback', text_mr: 'अभिप्राय', href: '#' }
  ],
  footer_banners: []
};

export const SettingsEditor = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('DASHBOARD');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const baseWidth = 1280;
        setScale(width < baseWidth ? width / baseWidth : 1);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const [expandedFixedBlocks, setExpandedFixedBlocks] = useState<Record<string, boolean>>({
    header_logo: true,
    header_right_logos: true,
    header_title: true,
    header_subtitle: true,
    footer_links: true,
    footer_contact: true,
    footer_banners: true,
    wallpaper_anim: true,
    wallpaper_images: true
  });

  const toggleFixedBlock = (key: string) => {
    setExpandedFixedBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // States for Header
  const [headerConfig, setHeaderConfig] = useState<any>(DEFAULT_HEADER_CONFIG);

  const [footerConfig, setFooterConfig] = useState<any>(DEFAULT_FOOTER_CONFIG);
  const [savedHeaderConfig, setSavedHeaderConfig] = useState<any>(DEFAULT_HEADER_CONFIG);
  const [savedFooterConfig, setSavedFooterConfig] = useState<any>(DEFAULT_FOOTER_CONFIG);

  const [wallpaperConfig, setWallpaperConfig] = useState<any>(DEFAULT_WALLPAPER_CONFIG);
  const [savedWallpaperConfig, setSavedWallpaperConfig] = useState<any>(DEFAULT_WALLPAPER_CONFIG);

  // History for Undo/Redo
  const [history, setHistory] = useState<any[]>([{
    header: headerConfig,
    footer: footerConfig,
    wallpaper: wallpaperConfig
  }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateHistoryState = (hConf: any, fConf: any, wConf: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ header: hConf, footer: fConf, wallpaper: wConf });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const logoHist = useBlockHistory(
    { logo_src: savedHeaderConfig.logo_src, logo_link: savedHeaderConfig.logo_link },
    { logo_src: headerConfig.logo_src, logo_link: headerConfig.logo_link },
    (val) => {
      const newConfig = { ...headerConfig, logo_src: val.logo_src, logo_link: val.logo_link };
      setHeaderConfig(newConfig);
      updateHistoryState(newConfig, footerConfig, wallpaperConfig);
    }
  );

  const rightLogosHist = useBlockHistory(
    savedHeaderConfig.right_logos || [],
    headerConfig.right_logos || [],
    (val) => {
      const newConfig = { ...headerConfig, right_logos: val };
      setHeaderConfig(newConfig);
      updateHistoryState(newConfig, footerConfig, wallpaperConfig);
    }
  );

  const titleHist = useBlockHistory(
    { title_en: savedHeaderConfig.title_en, title_mr: savedHeaderConfig.title_mr },
    { title_en: headerConfig.title_en, title_mr: headerConfig.title_mr },
    (val) => {
      const newConfig = { ...headerConfig, title_en: val.title_en, title_mr: val.title_mr };
      setHeaderConfig(newConfig);
      updateHistoryState(newConfig, footerConfig, wallpaperConfig);
    }
  );

  const subtitleHist = useBlockHistory(
    { subtitle_en: savedHeaderConfig.subtitle_en, subtitle_mr: savedHeaderConfig.subtitle_mr },
    { subtitle_en: headerConfig.subtitle_en, subtitle_mr: headerConfig.subtitle_mr },
    (val) => {
      const newConfig = { ...headerConfig, subtitle_en: val.subtitle_en, subtitle_mr: val.subtitle_mr };
      setHeaderConfig(newConfig);
      updateHistoryState(newConfig, footerConfig, wallpaperConfig);
    }
  );

  const footerLinksHist = useBlockHistory(
    savedFooterConfig.links || [],
    footerConfig.links || [],
    (val) => {
      const newConfig = { ...footerConfig, links: val };
      setFooterConfig(newConfig);
      updateHistoryState(headerConfig, newConfig, wallpaperConfig);
    }
  );

  const contactInfoHist = useBlockHistory(
    savedFooterConfig.contact || {},
    footerConfig.contact || {},
    (val) => {
      const newConfig = { ...footerConfig, contact: val };
      setFooterConfig(newConfig);
      updateHistoryState(headerConfig, newConfig, wallpaperConfig);
    }
  );

  const footerBannersHist = useBlockHistory(
    savedFooterConfig.footer_banners || [],
    footerConfig.footer_banners || [],
    (val) => {
      const newConfig = { ...footerConfig, footer_banners: val };
      setFooterConfig(newConfig);
      updateHistoryState(headerConfig, newConfig, wallpaperConfig);
    }
  );

  const wallpaperImagesHist = useBlockHistory(
    savedWallpaperConfig.images || [],
    wallpaperConfig.images || [],
    (val) => {
      setWallpaperConfig({ ...wallpaperConfig, images: val });
    }
  );

  const wallpaperAnimHist = useBlockHistory(
    savedWallpaperConfig.animationTime || 4.8,
    wallpaperConfig.animationTime || 4.8,
    (val) => {
      setWallpaperConfig({ ...wallpaperConfig, animationTime: val });
    }
  );

  const [isIframeReady, setIsIframeReady] = useState(false);
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<string | null>(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  useEffect(() => {
    fetchConfig('header_config');
    fetchConfig('footer_config');
    fetchConfig('wallpaper_config');

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PREVIEW_READY') {
        setIsIframeReady(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const fetchConfig = async (key: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/settings/${key}`);
      if (res.data && Object.keys(res.data).length > 0) {
        if (key === 'header_config') {
          setHeaderConfig((prev: any) => {
            const newConf = { ...prev, ...res.data };
            setSavedHeaderConfig(newConf);
            updateHistoryState(newConf, footerConfig, wallpaperConfig);
            return newConf;
          });
        } else if (key === 'footer_config') {
          setFooterConfig((prev: any) => {
            const newConf = { ...prev, ...res.data };
            setSavedFooterConfig(newConf);
            updateHistoryState(headerConfig, newConf, wallpaperConfig);
            return newConf;
          });
        } else if (key === 'wallpaper_config') {
          setWallpaperConfig((prev: any) => {
            const newConf = { ...prev, ...res.data };
            setSavedWallpaperConfig(newConf);
            updateHistoryState(headerConfig, footerConfig, newConf);
            return newConf;
          });
        }
      } else {
        if (key === 'header_config') {
          setHeaderConfig(DEFAULT_HEADER_CONFIG);
          setSavedHeaderConfig(DEFAULT_HEADER_CONFIG);
          updateHistoryState(DEFAULT_HEADER_CONFIG, footerConfig, wallpaperConfig);
        } else if (key === 'footer_config') {
          setFooterConfig(DEFAULT_FOOTER_CONFIG);
          setSavedFooterConfig(DEFAULT_FOOTER_CONFIG);
          updateHistoryState(headerConfig, DEFAULT_FOOTER_CONFIG, wallpaperConfig);
        } else if (key === 'wallpaper_config') {
          setWallpaperConfig(DEFAULT_WALLPAPER_CONFIG);
          setSavedWallpaperConfig(DEFAULT_WALLPAPER_CONFIG);
          updateHistoryState(headerConfig, footerConfig, DEFAULT_WALLPAPER_CONFIG);
        }
      }
    } catch (err) {
      console.log('No existing config found for', key);
      if (key === 'header_config') {
        setHeaderConfig(DEFAULT_HEADER_CONFIG);
        setSavedHeaderConfig(DEFAULT_HEADER_CONFIG);
        updateHistoryState(DEFAULT_HEADER_CONFIG, footerConfig, wallpaperConfig);
      } else if (key === 'footer_config') {
        setFooterConfig(DEFAULT_FOOTER_CONFIG);
        setSavedFooterConfig(DEFAULT_FOOTER_CONFIG);
        updateHistoryState(headerConfig, DEFAULT_FOOTER_CONFIG, wallpaperConfig);
      } else if (key === 'wallpaper_config') {
        setWallpaperConfig(DEFAULT_WALLPAPER_CONFIG);
        setSavedWallpaperConfig(DEFAULT_WALLPAPER_CONFIG);
        updateHistoryState(headerConfig, footerConfig, DEFAULT_WALLPAPER_CONFIG);
      }
    }
  };

  const updateHeaderConfig = (key: string, val: string) => {
    const newConfig = { ...headerConfig, [key]: val };
    setHeaderConfig(newConfig);
    updateHistoryState(newConfig, footerConfig, wallpaperConfig);
  };

  const updateRightLogo = (index: number, key: string, val: string) => {
    const newLogos = [...(headerConfig.right_logos || [])];
    newLogos[index] = { ...newLogos[index], [key]: val };
    const newConfig = { ...headerConfig, right_logos: newLogos };
    setHeaderConfig(newConfig);
    updateHistoryState(newConfig, footerConfig, wallpaperConfig);
  };

  const addRightLogo = () => {
    const newLogos = [...(headerConfig.right_logos || []), { src: '', link: '' }];
    const newConfig = { ...headerConfig, right_logos: newLogos };
    setHeaderConfig(newConfig);
    updateHistoryState(newConfig, footerConfig, wallpaperConfig);
  };

  const removeRightLogo = (index: number) => {
    const newLogos = [...(headerConfig.right_logos || [])];
    newLogos.splice(index, 1);
    const newConfig = { ...headerConfig, right_logos: newLogos };
    setHeaderConfig(newConfig);
    updateHistoryState(newConfig, footerConfig, wallpaperConfig);
  };

  const moveRightLogo = (index: number, direction: 'up' | 'down') => {
    const newLogos = [...(headerConfig.right_logos || [])];
    if (direction === 'up' && index > 0) {
      [newLogos[index - 1], newLogos[index]] = [newLogos[index], newLogos[index - 1]];
    } else if (direction === 'down' && index < newLogos.length - 1) {
      [newLogos[index + 1], newLogos[index]] = [newLogos[index], newLogos[index + 1]];
    } else {
      return;
    }
    const newConfig = { ...headerConfig, right_logos: newLogos };
    setHeaderConfig(newConfig);
    updateHistoryState(newConfig, footerConfig, wallpaperConfig);
  };

  const updateFooterConfig = (key: string, val: string) => {
    const newConfig = { ...footerConfig, [key]: val };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const updateFooterContact = (key: string, val: string) => {
    const newConfig = { ...footerConfig, contact: { ...(footerConfig.contact || {}), [key]: val } };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const updateFooterLink = (index: number, key: string, val: string) => {
    const newLinks = [...(footerConfig.links || [])];
    newLinks[index] = { ...newLinks[index], [key]: val };
    const newConfig = { ...footerConfig, links: newLinks };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const addFooterLink = () => {
    const newLinks = [...(footerConfig.links || []), { text_en: 'New Link', text_mr: 'नवीन दुवा', href: '#' }];
    const newConfig = { ...footerConfig, links: newLinks };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const removeFooterLink = (index: number) => {
    const newLinks = [...(footerConfig.links || [])];
    newLinks.splice(index, 1);
    const newConfig = { ...footerConfig, links: newLinks };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const moveFooterLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...(footerConfig.links || [])];
    if (direction === 'up' && index > 0) {
      [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
    } else if (direction === 'down' && index < newLinks.length - 1) {
      [newLinks[index + 1], newLinks[index]] = [newLinks[index], newLinks[index + 1]];
    } else {
      return;
    }
    const newConfig = { ...footerConfig, links: newLinks };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const updateFooterBanner = (index: number, key: string, val: string) => {
    const newBanners = [...(footerConfig.footer_banners || [])];
    newBanners[index] = { ...newBanners[index], [key]: val };
    const newConfig = { ...footerConfig, footer_banners: newBanners };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const addFooterBanner = () => {
    const newBanners = [...(footerConfig.footer_banners || []), { img_src: '', img_alt: '', href: '' }];
    const newConfig = { ...footerConfig, footer_banners: newBanners };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const removeFooterBanner = (index: number) => {
    const newBanners = [...(footerConfig.footer_banners || [])];
    newBanners.splice(index, 1);
    const newConfig = { ...footerConfig, footer_banners: newBanners };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const moveFooterBanner = (index: number, direction: 'up' | 'down') => {
    const newBanners = [...(footerConfig.footer_banners || [])];
    if (direction === 'up' && index > 0) {
      [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
    } else if (direction === 'down' && index < newBanners.length - 1) {
      [newBanners[index + 1], newBanners[index]] = [newBanners[index], newBanners[index + 1]];
    } else {
      return;
    }
    const newConfig = { ...footerConfig, footer_banners: newBanners };
    setFooterConfig(newConfig);
    updateHistoryState(headerConfig, newConfig, wallpaperConfig);
  };

  const updateWallpaperImage = (index: number, val: string) => {
    const newImages = [...(wallpaperConfig.images || [])];
    newImages[index] = val;
    const newConfig = { ...wallpaperConfig, images: newImages };
    setWallpaperConfig(newConfig);
    updateHistoryState(headerConfig, footerConfig, newConfig);
  };

  const addWallpaperImage = () => {
    const newImages = [...(wallpaperConfig.images || []), ''];
    const newConfig = { ...wallpaperConfig, images: newImages };
    setWallpaperConfig(newConfig);
    updateHistoryState(headerConfig, footerConfig, newConfig);
  };

  const removeWallpaperImage = (index: number) => {
    const newImages = [...(wallpaperConfig.images || [])];
    newImages.splice(index, 1);
    const newConfig = { ...wallpaperConfig, images: newImages };
    setWallpaperConfig(newConfig);
    updateHistoryState(headerConfig, footerConfig, newConfig);
  };

  const updateWallpaperAnimationTime = (val: number) => {
    const newConfig = { ...wallpaperConfig, animationTime: val };
    setWallpaperConfig(newConfig);
    updateHistoryState(headerConfig, footerConfig, newConfig);
  };

  const marathiToEnglishDigits = (text: string) => {
    const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return text.split('').map(char => {
      const index = marathiDigits.indexOf(char);
      return index !== -1 ? index : char;
    }).join('');
  };

  const handleCustomTranslate = async (text: string, callback: (translated: string) => void) => {
    if (!text.trim()) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/translate?text=${encodeURIComponent(text)}&source=mr&target=en`);
      if (res.data && res.data.responseData) {
        callback(res.data.responseData.translatedText);
      }
    } catch (err) {
      console.error('Translation failed', err);
    }
  };

  const handleTranslate = async (text: string, englishField: string, isHeader: boolean) => {
    if (!text.trim()) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/translate?text=${encodeURIComponent(text)}&source=mr&target=en`);
      if (res.data && res.data.responseData) {
        if (isHeader) {
          updateHeaderConfig(englishField, res.data.responseData.translatedText);
        } else {
          updateFooterConfig(englishField, res.data.responseData.translatedText);
        }
      }
    } catch (err) {
      console.error('Translation failed', err);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setHeaderConfig(prev.header);
      setFooterConfig(prev.footer);
      setWallpaperConfig(prev.wallpaper || DEFAULT_WALLPAPER_CONFIG);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setHeaderConfig(next.header);
      setFooterConfig(next.footer);
      setWallpaperConfig(next.wallpaper || DEFAULT_WALLPAPER_CONFIG);
    }
  };

  const handleReset = () => {
    fetchConfig('header_config');
    fetchConfig('footer_config');
    fetchConfig('wallpaper_config');
  };

  // Sync to Iframe
  useEffect(() => {
    if (isIframeReady && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'PREVIEW_UPDATE',
          component: activeTab === 'HEADER' ? 'Header' : activeTab === 'FOOTER' ? 'Footer' : activeTab === 'WALLPAPER' ? 'Wallpaper' : 'None',
          payload: { header_config: headerConfig, footer_config: footerConfig, wallpaper_config: wallpaperConfig }
        },
        '*'
      );
    }
  }, [headerConfig, footerConfig, wallpaperConfig, activeTab, isIframeReady]);

  const handleSave = async (key: string, payload: any) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/settings/${key}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (key === 'header_config') {
        setSavedHeaderConfig(payload);
      } else if (key === 'footer_config') {
        setSavedFooterConfig(payload);
      } else if (key === 'wallpaper_config') {
        setSavedWallpaperConfig(payload);
      }

      if (res.data.pendingReview) {
        alert('Changes submitted to Maker queue for review!');
      } else {
        alert('Changes saved and published!');
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.error || err.message || 'Unknown error';
      if (err.response?.status === 401) {
        alert('Session expired or unauthorized. Please log out and log back in.');
      } else {
        alert(`Failed to save settings: ${errMsg}`);
      }
    }
  };

  if (activeTab === 'DASHBOARD') {
    return (
      <div>
        <div className="bg-white border-b border-slate-200 px-6 py-2 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">Settings & Configuration</h1>
        </div>
        <div className="p-8">
          <p className="text-slate-500 mb-8">Select a component to modify its content and live preview the changes.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div
              onClick={() => setActiveTab('HEADER')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Layout size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Header Component</h3>
              <p className="text-sm text-slate-500">Modify titles, logo, and top navigation text.</p>
            </div>

            <div
              onClick={() => setActiveTab('FOOTER')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Type size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Footer Component</h3>
              <p className="text-sm text-slate-500">Update copyright text, emblems, and links.</p>
            </div>

            <div
              onClick={() => setActiveTab('WALLPAPER')}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-amber-300 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Monitor size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Live Wallpaper</h3>
              <p className="text-sm text-slate-500">Manage slideshow images and animation speed.</p>
            </div>

            <div
              onClick={() => setIsProfilePopupOpen(true)}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Profile & Security</h3>
              <p className="text-sm text-slate-500">Update your password and account details.</p>
            </div>
          </div>
        </div>
        <ProfilePasswordPopup isOpen={isProfilePopupOpen} onClose={() => setIsProfilePopupOpen(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-73px)] md:h-[calc(100vh)] min-h-full bg-slate-50">

      {/* LEFT PANE: LIVE PREVIEW */}
      <div className="w-full md:w-[70%] border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-100 overflow-hidden">
        <div className="p-2 border-b border-slate-200 bg-white font-semibold text-sm text-slate-700 flex justify-between items-center shrink-0">
          Live Preview
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full animate-pulse">Syncing...</span>
        </div>
        <div className="flex-1 p-2 overflow-hidden relative" ref={containerRef}>
          <div 
            className="bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden relative origin-top-left"
            style={{ 
              width: '1280px', 
              height: scale > 0 ? `${100 / scale}%` : '100%', 
              transform: `scale(${scale})` 
            }}
          >
            <iframe
              ref={iframeRef}
              src="http://localhost:3000/preview"
              className="w-full h-full border-0"
              title="Live Preview"
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANE: EDITOR CONTROLS */}
      <div className="w-full md:w-[30%] flex flex-col bg-white overflow-y-auto shrink-0 relative">

        {/* STICKY TOP BAR */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]">
          {/* TABS */}
          <div className="flex items-center border-b border-slate-200 p-2 gap-2 bg-slate-50 overflow-x-auto">
            <Button onClick={() => setActiveTab('DASHBOARD')} variant="ghost" size="sm" className="mr-2 text-slate-500 shrink-0" title="Back to Dashboard">
              <ArrowLeft size={18} />
            </Button>
            <button
              onClick={() => setActiveTab('HEADER')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${activeTab === 'HEADER' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}`}
            >
              Header
            </button>
            <button
              onClick={() => setActiveTab('FOOTER')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${activeTab === 'FOOTER' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}`}
            >
              Footer
            </button>
            <button
              onClick={() => setActiveTab('WALLPAPER')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${activeTab === 'WALLPAPER' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}`}
            >
              Wallpaper
            </button>
          </div>

          {/* DYNAMIC HEADER CONTROLS */}
          <div className="px-2 pt-3">
            {activeTab === 'HEADER' && (
              <EditorFormHeader
                className="border-none pb-3"
                title="Header"
                onUndo={handleUndo}
                canUndo={historyIndex > 0}
                onRedo={handleRedo}
                canRedo={historyIndex < history.length - 1}
                onReset={handleReset}
                onSave={() => handleSave('header_config', headerConfig)}
                isSaveDisabled={JSON.stringify(headerConfig) === JSON.stringify(savedHeaderConfig)}
                saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
                saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
              />
            )}
            {activeTab === 'FOOTER' && (
              <EditorFormHeader
                className="border-none pb-3"
                title="Footer"
                onUndo={handleUndo}
                canUndo={historyIndex > 0}
                onRedo={handleRedo}
                canRedo={historyIndex < history.length - 1}
                onReset={handleReset}
                onSave={() => handleSave('footer_config', footerConfig)}
                isSaveDisabled={JSON.stringify(footerConfig) === JSON.stringify(savedFooterConfig)}
                saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
                saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
              />
            )}
            {activeTab === 'WALLPAPER' && (
              <EditorFormHeader
                className="border-none pb-3"
                title="Live Wallpaper"
                onUndo={handleUndo}
                canUndo={historyIndex > 0}
                onRedo={handleRedo}
                canRedo={historyIndex < history.length - 1}
                onReset={handleReset}
                onSave={() => handleSave('wallpaper_config', wallpaperConfig)}
                isSaveDisabled={JSON.stringify(wallpaperConfig) === JSON.stringify(savedWallpaperConfig)}
                saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
                saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
              />
            )}
          </div>
        </div>

        {/* EDITOR BODY */}
        <div className="p-2 flex-1 overflow-x-hidden bg-white">
          {activeTab === 'HEADER' && (

              <div className="space-y-2">

                {/* Main Logo Section */}
                <EditorBlock>
                  <EditorBlockHeader
                    title="Main Logo"
                    icon={<ImageIcon size={16} className="text-blue-500" />}
                    history={logoHist}
                  />

                  {/* Main Logo */}
                  <div className="flex items-center gap-4 mb-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                    <div 
                      className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-md overflow-hidden flex items-center justify-center relative group cursor-pointer shrink-0"
                      onClick={() => { setMediaTarget('logo_src'); setIsMediaPopupOpen(true); }}
                    >
                      {headerConfig.logo_src ? (
                        <img src={headerConfig.logo_src} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <div className="flex flex-col items-center text-slate-400">
                          <ImageIcon size={16} className="mb-1" />
                          <span className="text-[10px]">No Logo</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Change</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-600">Link URL</label>
                        <input
                          type="text"
                          value={headerConfig.logo_link || ''}
                          onChange={(e) => updateHeaderConfig('logo_link', e.target.value)}
                          placeholder="https://..."
                          className="w-full border border-slate-300 rounded-md px-2 py-1.5 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none min-w-0"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Dynamic Right Side Logos */}
                  <EditorBlockHeader
                    title="Right-Side Logos"
                    history={rightLogosHist}
                    rightAction={<Button onClick={addRightLogo} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Logo</Button>}
                    className="mt-6 mb-2"
                  />

                  <div className="space-y-2">
                    {(headerConfig.right_logos || []).map((logo: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm relative pr-10">
                        {/* Order & Remove Controls */}
                        <div className="absolute right-2 top-2 bottom-2 flex flex-col justify-between items-center">
                          <button onClick={() => removeRightLogo(idx)} className="text-slate-400 hover:text-red-500 p-1" title="Remove">
                            <Trash2 size={14} />
                          </button>
                          <div className="flex flex-col gap-1">
                            <button onClick={() => moveRightLogo(idx, 'up')} disabled={idx === 0} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 p-0.5">
                              <span className="text-xs font-bold leading-none">↑</span>
                            </button>
                            <button onClick={() => moveRightLogo(idx, 'down')} disabled={idx === (headerConfig.right_logos?.length || 0) - 1} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 p-0.5">
                              <span className="text-xs font-bold leading-none">↓</span>
                            </button>
                          </div>
                        </div>

                        <div 
                          className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-md overflow-hidden flex items-center justify-center relative group cursor-pointer shrink-0"
                          onClick={() => { setMediaTarget(`right_logo_${idx}`); setIsMediaPopupOpen(true); }}
                        >
                          {logo.src ? (
                            <img src={logo.src} alt={`Logo ${idx + 1}`} className="w-full h-full object-contain" />
                          ) : (
                            <div className="flex flex-col items-center text-slate-400">
                              <ImageIcon size={16} className="mb-1" />
                              <span className="text-[10px]">No Image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-2 min-w-0">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-600">Link URL</label>
                            <input
                              type="text"
                              value={logo.link || ''}
                              onChange={(e) => updateRightLogo(idx, 'link', e.target.value)}
                              placeholder="https://..."
                              className="w-full border border-slate-300 rounded-md px-2 py-1.5 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none min-w-0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!headerConfig.right_logos || headerConfig.right_logos.length === 0) && (
                      <div className="text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No additional logos added.</div>
                    )}
                  </div>
                </EditorBlock>

                {/* Title Section */}
                <EditorBlock className="space-y-2">
                  <EditorBlockHeader
                    title="Main Title"
                    history={titleHist}
                  />
                  <PhoneticInput
                    label="Title (Marathi)"
                    value={headerConfig.title_mr}
                    onChange={(val) => updateHeaderConfig('title_mr', val)}
                    onTranslate={(text) => handleTranslate(text, 'title_en', true)}
                  />
                  <PhoneticInput
                    label="Title (English)"
                    transliterate={false}
                    value={headerConfig.title_en}
                    onChange={(val) => updateHeaderConfig('title_en', val)}
                  />
                </EditorBlock>

                {/* Subtitle Section */}
                <EditorBlock className="space-y-2">
                  <EditorBlockHeader
                    title="Subtitle"
                    history={subtitleHist}
                  />
                  <PhoneticInput
                    label="Subtitle (Marathi)"
                    value={headerConfig.subtitle_mr}
                    onChange={(val) => updateHeaderConfig('subtitle_mr', val)}
                    onTranslate={(text) => handleTranslate(text, 'subtitle_en', true)}
                  />
                  <PhoneticInput
                    label="Subtitle (English)"
                    transliterate={false}
                    value={headerConfig.subtitle_en}
                    onChange={(val) => updateHeaderConfig('subtitle_en', val)}
                  />
                </EditorBlock>
            </div>
          )}

          {activeTab === 'FOOTER' && (
            <div className="space-y-2">

              {/* Dynamic Links Section */}
              <EditorBlock>
                <EditorBlockHeader
                  title="Footer Links"
                  history={footerLinksHist}
                  rightAction={<Button onClick={addFooterLink} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Link</Button>}
                  isExpanded={!!expandedFixedBlocks['footer_links']}
                  onToggle={() => toggleFixedBlock('footer_links')}
                />

                {!!expandedFixedBlocks['footer_links'] && (
                <div className="space-y-2 mt-2">
                  {(footerConfig.links || []).map((link: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 border border-slate-200 rounded-lg relative">
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <button onClick={() => moveFooterLink(idx, 'up')} disabled={idx === 0} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 p-1">
                          <span className="text-sm font-bold leading-none">↑</span>
                        </button>
                        <button onClick={() => moveFooterLink(idx, 'down')} disabled={idx === (footerConfig.links?.length || 0) - 1} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 p-1">
                          <span className="text-sm font-bold leading-none">↓</span>
                        </button>
                        <button onClick={() => removeFooterLink(idx)} className="text-slate-400 hover:text-red-500 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex flex-col gap-2 pr-16 mt-2">
                        <PhoneticInput
                          label="Link Text (Marathi)"
                          value={link.text_mr || ''}
                          onChange={(val) => updateFooterLink(idx, 'text_mr', val)}
                          onTranslate={(text) => handleCustomTranslate(text, (res) => updateFooterLink(idx, 'text_en', res))}
                        />
                        <PhoneticInput
                          label="Link Text (English)"
                          transliterate={false}
                          value={link.text_en || ''}
                          onChange={(val) => updateFooterLink(idx, 'text_en', val)}
                        />
                      </div>
                      <div className="mt-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">URL (Redirection Link)</label>
                        <input
                          type="text"
                          value={link.href || ''}
                          onChange={(e) => updateFooterLink(idx, 'href', e.target.value)}
                          placeholder="e.g. /about or https://..."
                          className="w-full border border-slate-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                  {(!footerConfig.links || footerConfig.links.length === 0) && (
                    <div className="text-center text-slate-500 py-2 text-sm">No links added.</div>
                  )}
                </div>
                )}
              </EditorBlock>

              {/* Contact Info Section */}
              <EditorBlock className="space-y-2">
                <EditorBlockHeader
                  title="Contact Information"
                  history={contactInfoHist}
                  isExpanded={!!expandedFixedBlocks['footer_contact']}
                  onToggle={() => toggleFixedBlock('footer_contact')}
                />

                {!!expandedFixedBlocks['footer_contact'] && (
                <div className="space-y-2 mt-2">
                  <PhoneticInput
                    label="Address (Marathi)"
                    value={footerConfig.contact?.address_mr || ''}
                    onChange={(val) => updateFooterContact('address_mr', val)}
                    onTranslate={(text) => handleCustomTranslate(text, (res) => updateFooterContact('address_en', res))}
                  />
                  <PhoneticInput
                    label="Address (English)"
                    transliterate={false}
                    value={footerConfig.contact?.address_en || ''}
                    onChange={(val) => updateFooterContact('address_en', val)}
                  />

                  <div className="flex flex-col gap-2 mt-2">
                    <PhoneticInput
                      label="Phone Number (Marathi digits)"
                      value={footerConfig.contact?.phone_mr || ''}
                      onChange={(val) => updateFooterContact('phone_mr', val)}
                      onTranslate={(text) => {
                        const translated = marathiToEnglishDigits(text);
                        updateFooterContact('phone_en', translated);
                      }}
                    />
                    <PhoneticInput
                      label="Phone Number (English)"
                      transliterate={false}
                      value={footerConfig.contact?.phone_en || ''}
                      onChange={(val) => updateFooterContact('phone_en', val)}
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={footerConfig.contact?.email || ''}
                      onChange={(e) => updateFooterContact('email', e.target.value)}
                      className="w-full border border-slate-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                )}
              </EditorBlock>

              {/* Footer Banners Section */}
              <EditorBlock className="space-y-2">
                <EditorBlockHeader
                  title="Footer Logos (Banners)"
                  history={footerBannersHist}
                  rightAction={<Button onClick={addFooterBanner} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Logo</Button>}
                  isExpanded={!!expandedFixedBlocks['footer_banners']}
                  onToggle={() => toggleFixedBlock('footer_banners')}
                />
                {!!expandedFixedBlocks['footer_banners'] && (
                  <div className="space-y-2 mt-2">
                    {(footerConfig.footer_banners || []).map((banner: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm relative pr-10">
                        <div className="absolute right-2 top-2 bottom-2 flex flex-col justify-between items-center">
                          <button onClick={() => removeFooterBanner(idx)} className="text-slate-400 hover:text-red-500 p-1" title="Remove">
                            <Trash2 size={14} />
                          </button>
                          <div className="flex flex-col gap-1">
                            <button onClick={() => moveFooterBanner(idx, 'up')} disabled={idx === 0} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 p-0.5">
                              <span className="text-xs font-bold leading-none">↑</span>
                            </button>
                            <button onClick={() => moveFooterBanner(idx, 'down')} disabled={idx === (footerConfig.footer_banners?.length || 0) - 1} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 p-0.5">
                              <span className="text-xs font-bold leading-none">↓</span>
                            </button>
                          </div>
                        </div>

                        <div 
                          className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-md overflow-hidden flex items-center justify-center relative group cursor-pointer shrink-0"
                          onClick={() => { setMediaTarget(`footer_banner_${idx}`); setIsMediaPopupOpen(true); }}
                        >
                          {banner.img_src ? (
                            <img src={banner.img_src} alt={`Banner ${idx + 1}`} className="w-full h-full object-contain" />
                          ) : (
                            <div className="flex flex-col items-center text-slate-400">
                              <ImageIcon size={16} className="mb-1" />
                              <span className="text-[10px]">No Image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-2 min-w-0">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-600">Link URL</label>
                            <input
                              type="text"
                              value={banner.href || ''}
                              onChange={(e) => updateFooterBanner(idx, 'href', e.target.value)}
                              placeholder="https://..."
                              className="w-full border border-slate-300 rounded-md px-2 py-1 text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!footerConfig.footer_banners || footerConfig.footer_banners.length === 0) && (
                      <div className="text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No logos added.</div>
                    )}
                  </div>
                )}
              </EditorBlock>

            </div>
          )}

          {activeTab === 'WALLPAPER' && (
            <div className="space-y-2">

              <EditorBlock className="space-y-2">
                <EditorBlockHeader
                  title="Animation Speed"
                  history={wallpaperAnimHist}
                />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Interval (seconds)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="60"
                    value={wallpaperConfig.animationTime}
                    onChange={(e) => updateWallpaperAnimationTime(parseFloat(e.target.value) || 4.8)}
                    className="w-full border border-slate-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Recommended: between 3 and 10 seconds</p>
                </div>
              </EditorBlock>

              <EditorBlock>
                <EditorBlockHeader
                  title="Slideshow Images"
                  history={wallpaperImagesHist}
                />

                <div className="space-y-2">
                  {(wallpaperConfig.images || []).map((img: string, idx: number) => (
                    <div key={idx} className="bg-white p-4 border border-slate-200 rounded-lg relative">
                      <button onClick={() => removeWallpaperImage(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1">
                        <Trash2 size={16} />
                      </button>
                      <div className="flex flex-col gap-2 w-full">
                        <label className="block text-sm font-medium text-slate-700">Image</label>
                        <div 
                          className="w-full h-32 bg-slate-100 rounded-md overflow-hidden border border-slate-200 flex items-center justify-center relative group cursor-pointer"
                          onClick={() => {
                            setMediaTarget(`wallpaper_${idx}`);
                            setIsMediaPopupOpen(true);
                          }}
                        >
                          {img ? (
                            <img src={img} alt={`Wallpaper ${idx + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center text-slate-400">
                              <ImageIcon className="mb-1" size={24} />
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-medium">Change Image</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addWallpaperImage} variant="outline" className="w-full border-dashed">
                    + Add New Image
                  </Button>
                </div>
              </EditorBlock>

            </div>
          )}
        </div>
      </div>

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          if (mediaTarget) {
            if (mediaTarget.startsWith('right_logo_')) {
              const idx = parseInt(mediaTarget.split('_')[2], 10);
              updateRightLogo(idx, 'src', url);
            } else if (mediaTarget.startsWith('footer_banner_')) {
              const idx = parseInt(mediaTarget.split('_')[2], 10);
              updateFooterBanner(idx, 'img_src', url);
            } else if (mediaTarget.startsWith('wallpaper_')) {
              const idx = parseInt(mediaTarget.split('_')[1], 10);
              updateWallpaperImage(idx, url);
            } else {
              updateHeaderConfig(mediaTarget, url);
            }
          }
        }}
      />
      <ProfilePasswordPopup isOpen={isProfilePopupOpen} onClose={() => setIsProfilePopupOpen(false)} />
    </div>
  );
};


function ProfilePasswordPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    try {
      const res = await axios.put('http://localhost:5000/api/v1/users/profile/password', {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(res.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Password update failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-6 py-2 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-lg text-slate-800">Change Password</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleChangePassword} className="p-6 space-y-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-2 pr-10 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="h-px bg-slate-200 my-2"></div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-2 pr-10 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-2 pr-10 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Update Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
