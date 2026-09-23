import React from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { useState } from 'react';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { Send, Save, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

const HeroContentBlock = ({ settingsData, onUpdateFull, onTranslate, onMediaOpen, isExpanded, onToggle }: any) => {
  const defaultSettings = { 
    title: { mr: "", en: "" },
    subtitle: { mr: "", en: "" },
    description: { mr: "", en: "" },
    bgImage: ""
  };
  
  const settingsHist = useBlockHistory(
    defaultSettings,
    settingsData,
    (newData) => onUpdateFull(newData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newSettings = JSON.parse(JSON.stringify(settingsHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newSettings[parent]) newSettings[parent] = {};
      newSettings[parent][child] = value;
    } else {
      newSettings[key] = value;
    }
    settingsHist.update(newSettings);
  };

  const currentData = settingsHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title="Hero Content"
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={settingsHist}
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-blue-500 mt-2">
          <div className="space-y-1 mb-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Background Image</label>
            <div
              className="w-full h-40 bg-slate-200 rounded border border-slate-300 overflow-hidden relative group cursor-pointer mt-1"
              onClick={onMediaOpen}
            >
              {currentData.bgImage ? (
                <img 
                  src={currentData.bgImage.startsWith('http') ? currentData.bgImage : `http://localhost:3000${currentData.bgImage.startsWith('/') ? '' : '/'}${currentData.bgImage}`} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon size={24} className="mb-1" />
                  <span className="text-xs">No Background Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
          </div>
          <hr className="border-t border-slate-100 my-1" />

          <div className="space-y-1">
            <PhoneticInput label="Title " value={currentData.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} englishValue={currentData.title?.en} onEnglishChange={(val) => handleLocalUpdate('title.en', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput label="Subtitle " value={currentData.subtitle?.mr} onChange={(val) => handleLocalUpdate('subtitle.mr', val)} englishValue={currentData.subtitle?.en} onEnglishChange={(val) => handleLocalUpdate('subtitle.en', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput multiline label="Description " value={currentData.description?.mr} onChange={(val) => handleLocalUpdate('description.mr', val)} englishValue={currentData.description?.en} onEnglishChange={(val) => handleLocalUpdate('description.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const PrisonHeroEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const safeData = initialData || {
    title: { mr: "", en: "" },
    subtitle: { mr: "", en: "" },
    description: { mr: "", en: "" },
    bgImage: ""
  };

  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState<string | null>('general');

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

  const updateRootFull = (newSettingsData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.title = newSettingsData.title;
    newData.subtitle = newSettingsData.subtitle;
    newData.description = newSettingsData.description;
    newData.bgImage = newSettingsData.bgImage;
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslateGeneral = async (text: string, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) {
        const newData = JSON.parse(JSON.stringify(data));
        if (targetKey.includes('.')) {
          const [parent, child] = targetKey.split('.');
          if (!newData[parent]) newData[parent] = {};
          newData[parent][child] = translatedText;
        } else {
          newData[targetKey] = translatedText;
        }
        setData(newData);
        updateHistoryState(newData);
      }
    } catch (err) { console.error('Translation failed', err); }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Prison Hero Section"
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

      <HeroContentBlock 
        settingsData={data}
        onUpdateFull={updateRootFull}
        onTranslate={handleTranslateGeneral}
        onMediaOpen={() => setIsMediaPopupOpen(true)}
        isExpanded={expandedBlock === 'general'}
        onToggle={() => setExpandedBlock(expandedBlock === 'general' ? null : 'general')}
      />

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          const newData = JSON.parse(JSON.stringify(data));
          newData.bgImage = url;
          setData(newData);
          updateHistoryState(newData);
          setIsMediaPopupOpen(false);
        }}
      />
    </div>
  );
};
