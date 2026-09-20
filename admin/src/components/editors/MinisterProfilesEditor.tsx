import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Send, Save } from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useAuth } from '../../context/AuthContext';

const MinisterProfileBlock = ({
  index, section, profileData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onMediaSelect, onTranslate,
  isExpanded, onToggle
}: any) => {
  const defaultProfile = { name: { mr: "", en: "" }, desg: { mr: "", en: "" }, img_src: "" };

  const profileHist = useBlockHistory(
    defaultProfile,
    profileData,
    (newProfileData) => onUpdateFull(section, index, newProfileData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newProfile = JSON.parse(JSON.stringify(profileHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newProfile[parent]) newProfile[parent] = {};
      newProfile[parent][child] = value;
    } else {
      newProfile[key] = value;
    }
    profileHist.update(newProfile);
  };

  const currentProfile = profileHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={`${currentProfile.name?.mr || 'Unnamed'}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={profileHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />

      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm mt-2 border-l-4 border-l-blue-500">
          <div className="flex gap-2">
            <div 
              className="w-24 h-24 shrink-0 rounded-md border border-slate-200 bg-slate-50 overflow-hidden relative group cursor-pointer" 
              onClick={() => onMediaSelect(section, index)}
            >
              {(currentProfile.img || currentProfile.img_src) ? (
                <img src={(currentProfile.img || currentProfile.img_src).startsWith('http') ? (currentProfile.img || currentProfile.img_src) : `http://localhost:3000${(currentProfile.img || currentProfile.img_src).startsWith('/') ? '' : '/'}${(currentProfile.img || currentProfile.img_src)}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon size={24} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-[10px] font-medium text-center px-1">Change Image</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <PhoneticInput label="Name " value={currentProfile.name?.mr} onChange={(val) => handleLocalUpdate('name.mr', val)} englishValue={currentProfile.name?.en} onEnglishChange={(val) => handleLocalUpdate('name.en', val)} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <PhoneticInput label="Designation " value={currentProfile.desg?.mr} onChange={(val) => handleLocalUpdate('desg.mr', val)} englishValue={currentProfile.desg?.en} onEnglishChange={(val) => handleLocalUpdate('desg.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const MinisterProfilesEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  // Format legacy array to structure
  let safeData = initialData;
  if (Array.isArray(safeData)) {
    safeData = {
      ministers: safeData.slice(0, 4),
      seniorOfficers: safeData.slice(4)
    };
  } else if (!safeData) {
    safeData = { ministers: [], seniorOfficers: [] };
  } else if (typeof safeData === 'object' && !safeData.ministers) {
     safeData = { ministers: [], seniorOfficers: [] };
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

  const [expandedBlock, setExpandedBlock] = useState<{section: string, index: number} | null>(null);
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<{section: string, index: number} | null>(null);

  const updateProfileFull = (section: string, index: number, fullProfileData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[section][index] = fullProfileData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateProfileField = (section: string, index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData[section][index][parent]) newData[section][index][parent] = {};
      newData[section][index][parent][child] = value;
    } else {
      newData[section][index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addProfile = (section: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData[section]) newData[section] = [];
    newData[section].push({
      name: { mr: "", en: "" },
      desg: { mr: "", en: "" },
      img_src: ""
    });
    setData(newData);
    updateHistoryState(newData);
    setExpandedBlock({ section, index: newData[section].length - 1 });
  };

  const removeProfile = (section: string, index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[section].splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveProfile = (section: string, index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData[section][index - 1], newData[section][index]] = [newData[section][index], newData[section][index - 1]];
    } else if (direction === 'down' && index < newData[section].length - 1) {
      [newData[section][index + 1], newData[section][index]] = [newData[section][index], newData[section][index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslate = async (text: string, section: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', {
        params: { text, source: 'mr', target: 'en' }
      });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) {
        updateProfileField(section, index, targetKey, translatedText);
      }
    } catch (err) {
      console.error('Translation failed', err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Minister Profiles"
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

      <div className="w-full flex flex-col gap-6">
        
        {/* Ministers Section */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">Ministers</h3>
          <div className="space-y-2">
            {data?.ministers?.map((profile: any, index: number) => (
              <MinisterProfileBlock
                key={`ministers-${index}`}
                section="ministers"
                index={index}
                profileData={profile}
                onUpdateFull={updateProfileFull}
                onRemove={() => removeProfile('ministers', index)}
                onMoveUp={() => moveProfile('ministers', index, 'up')}
                onMoveDown={() => moveProfile('ministers', index, 'down')}
                isFirst={index === 0}
                isLast={index === data.ministers.length - 1}
                onMediaSelect={(sec: string, idx: number) => { setMediaTarget({section: sec, index: idx}); setIsMediaPopupOpen(true); }}
                onTranslate={handleTranslate}
                isExpanded={expandedBlock?.section === 'ministers' && expandedBlock?.index === index}
                onToggle={() => setExpandedBlock(expandedBlock?.section === 'ministers' && expandedBlock?.index === index ? null : { section: 'ministers', index })}
              />
            ))}
          </div>
          <Button onClick={() => addProfile('ministers')} variant="secondary" className="w-full mt-2">
            + Add Minister Profile
          </Button>
        </div>

        {/* Senior Officers Section */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">Senior Officers</h3>
          <div className="space-y-2">
            {data?.seniorOfficers?.map((profile: any, index: number) => (
              <MinisterProfileBlock
                key={`officers-${index}`}
                section="seniorOfficers"
                index={index}
                profileData={profile}
                onUpdateFull={updateProfileFull}
                onRemove={() => removeProfile('seniorOfficers', index)}
                onMoveUp={() => moveProfile('seniorOfficers', index, 'up')}
                onMoveDown={() => moveProfile('seniorOfficers', index, 'down')}
                isFirst={index === 0}
                isLast={index === data.seniorOfficers.length - 1}
                onMediaSelect={(sec: string, idx: number) => { setMediaTarget({section: sec, index: idx}); setIsMediaPopupOpen(true); }}
                onTranslate={handleTranslate}
                isExpanded={expandedBlock?.section === 'seniorOfficers' && expandedBlock?.index === index}
                onToggle={() => setExpandedBlock(expandedBlock?.section === 'seniorOfficers' && expandedBlock?.index === index ? null : { section: 'seniorOfficers', index })}
              />
            ))}
          </div>
          <Button onClick={() => addProfile('seniorOfficers')} variant="secondary" className="w-full mt-2">
            + Add Senior Officer Profile
          </Button>
        </div>

      </div>
      
      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          if (mediaTarget !== null) {
             updateProfileField(mediaTarget.section, mediaTarget.index, 'img_src', url);
          }
          setIsMediaPopupOpen(false);
          setMediaTarget(null);
        }}
      />
    </div>
  );
};
