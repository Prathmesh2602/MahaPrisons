import { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Send, Save } from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useAuth } from '../../context/AuthContext';

const HeroCarouselSlide = ({
  index, slideData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onMediaSelect, onTranslate,
  isExpanded, onToggle
}: any) => {
  const defaultSlide = { 
    img_src: "", category: { mr: "", en: "" }, title: { mr: "", en: "" }, 
    statement: { mr: "", en: "" }, description: { mr: "", en: "" }, 
    cta1: { mr: "", en: "", href: "" }, cta2: null 
  };

  const slideHist = useBlockHistory(
    defaultSlide,
    slideData,
    (newSlideData) => {
      onUpdateFull(index, newSlideData);
    }
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newSlide = JSON.parse(JSON.stringify(slideHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newSlide[parent]) newSlide[parent] = {};
      newSlide[parent][child] = value;
    } else {
      newSlide[key] = value;
    }
    slideHist.update(newSlide);
  };

  const currentSlide = slideHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentSlide.title?.mr || `Slide ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={slideHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />

      {isExpanded && (
      <div className="space-y-2 pt-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">1. Media</label>
          <div className="flex flex-col gap-1 p-2 bg-white border border-slate-200 rounded-md shadow-sm border-l-4 border-l-slate-400">
            <div
              className="w-full h-32 bg-slate-200 rounded border border-slate-300 overflow-hidden relative group cursor-pointer mt-1"
              onClick={() => onMediaSelect(index)}
            >
              {currentSlide.img_src ? (
                <img 
                  src={currentSlide.img_src.startsWith('http') ? currentSlide.img_src : `http://localhost:3000${currentSlide.img_src.startsWith('/') ? '' : '/'}${currentSlide.img_src}`} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon size={24} className="mb-1" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">2. Headings</label>
          <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-md shadow-sm border-l-4 border-l-blue-400">
            <div className="space-y-1">
              <PhoneticInput label="Category " value={currentSlide.category?.mr} onChange={(val) => handleLocalUpdate('category.mr', val)} englishValue={currentSlide.category?.en} onEnglishChange={(val) => handleLocalUpdate('category.en', val)} />
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="space-y-1">
              <PhoneticInput label="Title " value={currentSlide.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} englishValue={currentSlide.title?.en} onEnglishChange={(val) => handleLocalUpdate('title.en', val)} />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">3. Content Body</label>
          <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-md shadow-sm border-l-4 border-l-emerald-400">
            <div className="space-y-1">
              <PhoneticInput label="Statement " value={currentSlide.statement?.mr} onChange={(val) => handleLocalUpdate('statement.mr', val)} englishValue={currentSlide.statement?.en} onEnglishChange={(val) => handleLocalUpdate('statement.en', val)} />
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="space-y-1">
              <PhoneticInput multiline label="Description " value={currentSlide.description?.mr} onChange={(val) => handleLocalUpdate('description.mr', val)} englishValue={currentSlide.description?.en} onEnglishChange={(val) => handleLocalUpdate('description.en', val)} />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">4. Actions</label>
          <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-md shadow-sm border-l-4 border-l-amber-400">
            <div className="space-y-1">
              <PhoneticInput label="Primary CTA " value={currentSlide.cta1?.mr} onChange={(val) => handleLocalUpdate('cta1.mr', val)} englishValue={currentSlide.cta1?.en} onEnglishChange={(val) => handleLocalUpdate('cta1.en', val)} />
              <PhoneticInput label="Primary CTA Link" transliterate={false} value={currentSlide.cta1?.href} onChange={(val) => handleLocalUpdate('cta1.href', val)} placeholder="https://" />
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id={`cta2-enable-${index}`} checked={!!currentSlide.cta2} onChange={(e) => handleLocalUpdate('cta2', e.target.checked ? { mr: "", en: "", href: "#" } : null)} />
              <label htmlFor={`cta2-enable-${index}`} className="text-xs font-semibold text-slate-600">Enable Secondary CTA</label>
            </div>
            {currentSlide.cta2 && (
              <div className="space-y-1 pl-4 border-l-2 border-slate-200">
                <PhoneticInput label="Secondary CTA " value={currentSlide.cta2.mr} onChange={(val) => handleLocalUpdate('cta2.mr', val)} englishValue={currentSlide.cta2.en} onEnglishChange={(val) => handleLocalUpdate('cta2.en', val)} />
                <PhoneticInput label="Secondary CTA Link" transliterate={false} value={currentSlide.cta2.href} onChange={(val) => handleLocalUpdate('cta2.href', val)} placeholder="https://" />
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

const DirectorMessageBlock = ({ messageData, onUpdateFull, onMediaSelect, onTranslate, isExpanded, onToggle }: any) => {
  const defaultMessage = {
    name: { mr: "", en: "" },
    designation: { mr: "", en: "" },
    quote: { mr: "", en: "" },
    image: "",
    link: ""
  };

  const msgHist = useBlockHistory(
    defaultMessage,
    messageData,
    (newData) => onUpdateFull(newData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newMsg = JSON.parse(JSON.stringify(msgHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newMsg[parent]) newMsg[parent] = {};
      newMsg[parent][child] = value;
    } else {
      newMsg[key] = value;
    }
    msgHist.update(newMsg);
  };

  const data = msgHist.value;

  return (
    <div className="space-y-1">
      <EditorBlockHeader
        title="Leadership Message"
        className="mb-1"
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={msgHist}
      />
      
      {isExpanded && (
      <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-t-4 border-t-purple-500">
        <div className="flex gap-2">
          <div className="w-24 h-24 shrink-0 rounded-md border border-slate-200 bg-slate-50 overflow-hidden relative group cursor-pointer" onClick={onMediaSelect}>
            {data.image ? (
              <img 
                src={data.image.startsWith('http') ? data.image : `http://localhost:3000${data.image.startsWith('/') ? '' : '/'}${data.image}`} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <ImageIcon size={24} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-[10px] font-medium text-center px-1">Change Image</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <PhoneticInput label="Name " value={data.name?.mr} onChange={(val) => handleLocalUpdate('name.mr', val)} englishValue={data.name?.en} onEnglishChange={(val) => handleLocalUpdate('name.en', val)} />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <PhoneticInput label="Designation " value={data.designation?.mr} onChange={(val) => handleLocalUpdate('designation.mr', val)} englishValue={data.designation?.en} onEnglishChange={(val) => handleLocalUpdate('designation.en', val)} />
        </div>

        <div className="space-y-1">
          <PhoneticInput multiline label="Quote " value={data.quote?.mr} onChange={(val) => handleLocalUpdate('quote.mr', val)} englishValue={data.quote?.en} onEnglishChange={(val) => handleLocalUpdate('quote.en', val)} />
        </div>

        <div className="space-y-1">
          <PhoneticInput label="Message Link / URL" transliterate={false} value={data.link} onChange={(val) => handleLocalUpdate('link', val)} placeholder="https://" />
        </div>
      </div>
      )}
    </div>
  );
};

export const HeroCarouselEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const defaultSlides = [
    {
      img_src: "http://localhost:5000/uploads/rehab_hero.png",
      img_alt: "येरवडा खुले कारागृह",
      category: { mr: "पुनर्वसन", en: "Rehabilitation" },
      title: { mr: "येरवडा खुले कारागृह", en: "Yerawada Open Prison" },
      statement: { mr: "श्रमातून परिवर्तनाची वाट.", en: "Path of transformation through labor." },
      description: { mr: "शिस्त, कौशल्य, श्रम आणि स्वावलंबनाच्या माध्यमातून पुनर्वसनाची नवी दिशा.", en: "A new direction in rehabilitation through discipline, skills, labor, and self-reliance." },
      cta1: { mr: "आमचा प्रवास", en: "Our Journey", href: "#" },
      cta2: { mr: "उपक्रम पहा", en: "View Initiatives", href: "#" }
    },
    {
      img_src: "http://localhost:5000/uploads/farming_hero.png",
      img_alt: "शेती उपक्रम",
      category: { mr: "शेती", en: "Agriculture" },
      title: { mr: "मातीशी नातं", en: "Bond with Soil" },
      statement: { mr: "स्वावलंबनाकडे वाटचाल.", en: "Stepping towards self-reliance." },
      description: { mr: "कारागृहातील शेती उपक्रमातून बंदीवानांना शेतीचे धडे आणि उत्पादकतेची सवय.", en: "Teaching inmates farming and productivity through prison agricultural programs." },
      cta1: { mr: "शेती उपक्रम", en: "Farming Initiatives", href: "#" },
      cta2: null
    }
  ];

  const defaultDirectorMessage = {
    name: { mr: "श्री. सुहास वारके", en: "Shri. Suhas Warke" },
    designation: { mr: "अपर पोलीस महासंचालक व महानिरीक्षक", en: "ADG & Director General" },
    quote: { mr: "सुरक्षितता, सुधारणा आणि पुनर्वसन ही आमची मुख्य सूत्रे आहेत. आम्ही बंदीवानांना कौशल्यपूर्ण प्रशिक्षण देऊन समाजाचा एक उपयुक्त घटक बनविण्यासाठी कटिबद्ध आहोत.", en: "Security, correction, and rehabilitation are our guiding pillars. We are committed to equipping inmates with skills to make them productive members of society." },
    image: "http://localhost:5000/uploads/adg_sir.jpeg",
    link: "#"
  };

  // Default data handling if empty
  let safeData = initialData && initialData.slides ? initialData : { slides: Array.isArray(initialData) ? initialData : [], directorMessage: initialData?.directorMessage || {} };
  
  // Clone to avoid mutating props directly
  safeData = JSON.parse(JSON.stringify(safeData));

  if (!safeData.slides || safeData.slides.length === 0) {
    safeData.slides = defaultSlides;
  }
  
  if (!safeData.directorMessage || Object.keys(safeData.directorMessage).length === 0) {
    safeData.directorMessage = defaultDirectorMessage;
  }

  const {
    data,
    setData,
    historyIndex,
    historyLength,
    updateHistoryState,
    handleUndo,
    handleRedo,
    handleReset,
    handleSave,
    hasChanges
  } = useBlockEditorState(blockId, safeData, onPreviewUpdate);

  const [expandedBlock, setExpandedBlock] = useState<string | null>('leadership');
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [mediaTargetIndex, setMediaTargetIndex] = useState<number | null>(null);

  const updateSlideFull = (index: number, fullSlideData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.slides[index] = fullSlideData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateSlideField = (index: number, key: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.slides[index][parent]) newData.slides[index][parent] = {};
      newData.slides[index][parent][child] = value;
    } else {
      newData.slides[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const updateDirectorMessageFull = (newDirectorMessageData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.directorMessage = newDirectorMessageData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateDirectorMessageField = (key: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.directorMessage) newData.directorMessage = {};
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.directorMessage[parent]) newData.directorMessage[parent] = {};
      newData.directorMessage[parent][child] = value;
    } else {
      newData.directorMessage[key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addSlide = () => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.slides.push({
      img_src: "", img_alt: "",
      category: { mr: "", en: "" },
      title: { mr: "", en: "" },
      statement: { mr: "", en: "" },
      description: { mr: "", en: "" },
      cta1: { mr: "", en: "", href: "#" },
      cta2: null
    });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeSlide = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.slides.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData.slides[index - 1], newData.slides[index]] = [newData.slides[index], newData.slides[index - 1]];
    } else if (direction === 'down' && index < newData.slides.length - 1) {
      [newData.slides[index + 1], newData.slides[index]] = [newData.slides[index], newData.slides[index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslate = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', {
        params: { text, source: 'mr', target: 'en' }
      });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) {
        if (index === -1) {
          updateDirectorMessageField(targetKey, translatedText);
        } else {
          updateSlideField(index, targetKey, translatedText);
        }
      }
    } catch (err) {
      console.error('Translation failed', err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Hero Carousel & Leadership"
        onUndo={handleUndo}
        canUndo={historyIndex > 0}
        onRedo={handleRedo}
        canRedo={historyIndex < historyLength - 1}
        onReset={handleReset}
        onSave={handleSave}
        isSaveDisabled={!hasChanges}
        saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
        saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
      />

      <div className="w-full flex flex-col gap-2">
        
        <DirectorMessageBlock 
          messageData={data.directorMessage || {}}
          onUpdateFull={updateDirectorMessageFull}
          onMediaSelect={() => { setMediaTargetIndex(-1); setIsMediaPopupOpen(true); }}
          onTranslate={(text: string, targetKey: string) => handleTranslate(text, -1, targetKey)}
          isExpanded={expandedBlock === 'leadership'}
          onToggle={() => setExpandedBlock(expandedBlock === 'leadership' ? null : 'leadership')}
        />

        <hr className="border-t border-dashed border-slate-200 my-2" />

        <div className="w-full flex flex-col gap-2">
          <EditorBlockHeader
            title="Hero Carousel"
            rightAction={<Button onClick={addSlide} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Slide</Button>}
            className="mb-0"
          />

          <div className="w-full space-y-2">
            {data.slides?.map((slide: any, index: number) => (
              <HeroCarouselSlide
                key={index}
                index={index}
                slideData={slide}
                onUpdateFull={updateSlideFull}
                onRemove={() => removeSlide(index)}
                onMoveUp={() => moveSlide(index, 'up')}
                onMoveDown={() => moveSlide(index, 'down')}
                isFirst={index === 0}
                isLast={index === data.slides.length - 1}
                onMediaSelect={(idx: number) => { setMediaTargetIndex(idx); setIsMediaPopupOpen(true); }}
                onTranslate={handleTranslate}
                isExpanded={expandedBlock === `slide-${index}`}
                onToggle={() => setExpandedBlock(expandedBlock === `slide-${index}` ? null : `slide-${index}`)}
              />
            ))}
            {(!data.slides || data.slides.length === 0) && (
              <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No slides added.</div>
            )}
          </div>
        </div>
      </div>

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          if (mediaTargetIndex === -1) {
            updateDirectorMessageField('image', url);
          } else if (mediaTargetIndex !== null) {
            updateSlideField(mediaTargetIndex, 'img_src', url);
          }
          setIsMediaPopupOpen(false);
          setMediaTargetIndex(null);
        }}
      />
    </div>
  );
};
