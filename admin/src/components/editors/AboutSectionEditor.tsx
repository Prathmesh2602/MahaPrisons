import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Send, Save, User } from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useAuth } from '../../context/AuthContext';

const IntroDescriptionBlock = ({ introData, onUpdateFull, onTranslateRoot, isExpanded, onToggle }: any) => {
  const defaultIntro = { aboutText: { mr: "", en: "" }, welcomeTitle: { mr: "", en: "" } };
  
  const introHist = useBlockHistory(
    defaultIntro,
    introData,
    (newData) => onUpdateFull(newData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newIntro = JSON.parse(JSON.stringify(introHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newIntro[parent]) newIntro[parent] = {};
      newIntro[parent][child] = value;
    } else {
      newIntro[key] = value;
    }
    introHist.update(newIntro);
  };

  const currentData = introHist.value;

  return (
    <div className="space-y-1">
      <EditorBlockHeader
        title="Intro & Description"
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={introHist}
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-blue-500">
          <div className="space-y-1">
            <PhoneticInput label="Welcome Title (Marathi)" value={currentData.welcomeTitle?.mr} onChange={(val) => handleLocalUpdate('welcomeTitle.mr', val)} onTranslate={(text) => onTranslateRoot(text, 'welcomeTitle.en')} />
            <PhoneticInput label="Welcome Title (English)" transliterate={false} value={currentData.welcomeTitle?.en} onChange={(val) => handleLocalUpdate('welcomeTitle.en', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput multiline label="About Text (Marathi)" value={currentData.aboutText?.mr} onChange={(val) => handleLocalUpdate('aboutText.mr', val)} onTranslate={(text) => onTranslateRoot(text, 'aboutText.en')} />
            <PhoneticInput multiline label="About Text (English)" transliterate={false} value={currentData.aboutText?.en} onChange={(val) => handleLocalUpdate('aboutText.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

const OfficerProfileBlock = ({
  index, officerData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onMediaSelect, onTranslate,
  isExpanded, onToggle
}: any) => {
  const defaultOfficer = { name: { mr: "", en: "" }, desg: { mr: "", en: "" }, img: "" };

  const officerHist = useBlockHistory(
    defaultOfficer,
    officerData,
    (newOfficerData) => onUpdateFull(index, newOfficerData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newOfficer = JSON.parse(JSON.stringify(officerHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newOfficer[parent]) newOfficer[parent] = {};
      newOfficer[parent][child] = value;
    } else {
      newOfficer[key] = value;
    }
    officerHist.update(newOfficer);
  };

  const currentOfficer = officerHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentOfficer.name?.mr || 'Unnamed'}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={officerHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm mt-2 border-l-4 border-l-emerald-500">
          <div className="flex gap-2">
            <div className="w-20 h-20 shrink-0 rounded-full border-[3px] border-white shadow-sm bg-slate-100 overflow-hidden relative group cursor-pointer flex items-center justify-center" onClick={() => onMediaSelect(index)}>
              {currentOfficer.img ? (
                <img src={currentOfficer.img} className="w-full h-full object-cover object-top" />
              ) : (
                <User className="w-10 h-10 text-slate-400" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-[10px] font-medium text-center px-1">Change</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <PhoneticInput label="Name (Marathi)" value={currentOfficer.name?.mr} onChange={(val) => handleLocalUpdate('name.mr', val)} onTranslate={(text) => onTranslate(text, index, 'name.en')} />
                <PhoneticInput label="Name (English)" transliterate={false} value={currentOfficer.name?.en} onChange={(val) => handleLocalUpdate('name.en', val)} />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <PhoneticInput label="Designation (Marathi)" value={currentOfficer.desg?.mr} onChange={(val) => handleLocalUpdate('desg.mr', val)} onTranslate={(text) => onTranslate(text, index, 'desg.en')} />
            <PhoneticInput label="Designation (English)" transliterate={false} value={currentOfficer.desg?.en} onChange={(val) => handleLocalUpdate('desg.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const AboutSectionEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const safeData = initialData || {
    aboutText: { mr: "", en: "" },
    welcomeTitle: { mr: "", en: "" },
    openJailOfficers: []
  };

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

  const [expandedBlock, setExpandedBlock] = useState<string | null>('intro');
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [mediaTargetIndex, setMediaTargetIndex] = useState<number | null>(null);

  const updateRootFull = (newIntroData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.aboutText = newIntroData.aboutText;
    newData.welcomeTitle = newIntroData.welcomeTitle;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateRootField = (key: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData[parent]) newData[parent] = {};
      newData[parent][child] = value;
    } else {
      newData[key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const updateOfficerFull = (index: number, fullOfficerData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.openJailOfficers) newData.openJailOfficers = [];
    newData.openJailOfficers[index] = fullOfficerData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateOfficerField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.openJailOfficers) newData.openJailOfficers = [];
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.openJailOfficers[index][parent]) newData.openJailOfficers[index][parent] = {};
      newData.openJailOfficers[index][parent][child] = value;
    } else {
      newData.openJailOfficers[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addOfficer = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.openJailOfficers) newData.openJailOfficers = [];
    newData.openJailOfficers.push({
      name: { mr: "", en: "" },
      desg: { mr: "", en: "" },
      img: ""
    });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeOfficer = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.openJailOfficers.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveOfficer = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData.openJailOfficers[index - 1], newData.openJailOfficers[index]] = [newData.openJailOfficers[index], newData.openJailOfficers[index - 1]];
    } else if (direction === 'down' && index < newData.openJailOfficers.length - 1) {
      [newData.openJailOfficers[index + 1], newData.openJailOfficers[index]] = [newData.openJailOfficers[index], newData.openJailOfficers[index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslateRoot = async (text: string, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateRootField(targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  const handleTranslateOfficer = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateOfficerField(index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit About Section"
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

      <IntroDescriptionBlock 
        introData={{ aboutText: data.aboutText, welcomeTitle: data.welcomeTitle }}
        onUpdateFull={updateRootFull}
        onTranslateRoot={handleTranslateRoot}
        isExpanded={expandedBlock === 'intro'}
        onToggle={() => setExpandedBlock(expandedBlock === 'intro' ? null : 'intro')}
      />

      <hr className="border-t border-dashed border-slate-200 my-2" />

      <div className="w-full flex flex-col gap-2">
        <EditorBlockHeader
          title="Officer Profiles"
          rightAction={<Button onClick={addOfficer} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Officer</Button>}
          className="mb-0"
        />

        <div className="w-full space-y-2">
          {data.openJailOfficers?.map((officer: any, index: number) => (
            <OfficerProfileBlock
              key={index}
              index={index}
              officerData={officer}
              onUpdateFull={updateOfficerFull}
              onRemove={() => removeOfficer(index)}
              onMoveUp={() => moveOfficer(index, 'up')}
              onMoveDown={() => moveOfficer(index, 'down')}
              isFirst={index === 0}
              isLast={index === data.openJailOfficers.length - 1}
              onMediaSelect={(idx: number) => { setMediaTargetIndex(idx); setIsMediaPopupOpen(true); }}
              onTranslate={handleTranslateOfficer}
              isExpanded={expandedBlock === `officer-${index}`}
              onToggle={() => setExpandedBlock(expandedBlock === `officer-${index}` ? null : `officer-${index}`)}
            />
          ))}
          {(!data.openJailOfficers || data.openJailOfficers.length === 0) && (
            <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No officers added.</div>
          )}
        </div>
      </div>

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          if (mediaTargetIndex !== null) updateOfficerField(mediaTargetIndex, 'img', url);
          setIsMediaPopupOpen(false);
          setMediaTargetIndex(null);
        }}
      />
    </div>
  );
};
