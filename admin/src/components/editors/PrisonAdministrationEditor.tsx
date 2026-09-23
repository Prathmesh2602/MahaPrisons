import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Send, Save, User } from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useAuth } from '../../context/AuthContext';

const AdministrationIntroBlock = ({ settingsData, onUpdateFull, onTranslate, isExpanded, onToggle }: any) => {
  const defaultSettings = { 
    title: { mr: "", en: "" },
    description: { mr: "", en: "" }
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
        title="Section Title & Description"
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={settingsHist}
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-blue-500 mt-2">
          <div className="space-y-1">
            <PhoneticInput label="Title " value={currentData.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} englishValue={currentData.title?.en} onEnglishChange={(val) => handleLocalUpdate('title.en', val)} />
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

const StaffBlock = ({ index, staffData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onMediaSelect, onTranslate, isExpanded, onToggle }: any) => {
  const defaultStaff = { name: { mr: "", en: "" }, role: { mr: "", en: "" }, img: "" };

  const staffHist = useBlockHistory(
    defaultStaff,
    staffData,
    (newData) => onUpdateFull(index, newData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newStaff = JSON.parse(JSON.stringify(staffHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newStaff[parent]) newStaff[parent] = {};
      newStaff[parent][child] = value;
    } else {
      newStaff[key] = value;
    }
    staffHist.update(newStaff);
  };

  const currentStaff = staffHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentStaff.name?.mr || `Staff ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={staffHist}
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
              {currentStaff.img ? (
                <img src={currentStaff.img} className="w-full h-full object-cover object-top" />
              ) : (
                <User className="w-10 h-10 text-slate-400" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-[10px] font-medium text-center px-1">Change</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <PhoneticInput label="Name " value={currentStaff.name?.mr} onChange={(val) => handleLocalUpdate('name.mr', val)} englishValue={currentStaff.name?.en} onEnglishChange={(val) => handleLocalUpdate('name.en', val)} />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <PhoneticInput label="Role " value={currentStaff.role?.mr} onChange={(val) => handleLocalUpdate('role.mr', val)} englishValue={currentStaff.role?.en} onEnglishChange={(val) => handleLocalUpdate('role.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const PrisonAdministrationEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const safeData = initialData || {
    title: { mr: "", en: "" },
    description: { mr: "", en: "" },
    staff: []
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

  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [mediaTargetIndex, setMediaTargetIndex] = useState<number | null>(null);

  const updateRootFull = (newSettingsData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.title = newSettingsData.title;
    newData.description = newSettingsData.description;
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

  const updateStaffFull = (index: number, fullStaffData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.staff) newData.staff = [];
    newData.staff[index] = fullStaffData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateStaffField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.staff) newData.staff = [];
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.staff[index][parent]) newData.staff[index][parent] = {};
      newData.staff[index][parent][child] = value;
    } else {
      newData.staff[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addStaff = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.staff) newData.staff = [];
    newData.staff.push({ name: { mr: "", en: "" }, role: { mr: "", en: "" }, img: "" });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeStaff = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.staff.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveStaff = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData.staff[index - 1], newData.staff[index]] = [newData.staff[index], newData.staff[index - 1]];
    } else if (direction === 'down' && index < newData.staff.length - 1) {
      [newData.staff[index + 1], newData.staff[index]] = [newData.staff[index], newData.staff[index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };



  const handleTranslateStaff = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateStaffField(index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Prison Administration Section"
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

      <AdministrationIntroBlock 
        settingsData={{ 
          title: data.title || { mr: "", en: "" },
          description: data.description || { mr: "", en: "" }
        }}
        onUpdateFull={updateRootFull}
        onTranslate={handleTranslateGeneral}
        isExpanded={expandedBlock === 'general'}
        onToggle={() => setExpandedBlock(expandedBlock === 'general' ? null : 'general')}
      />

      <hr className="border-t border-dashed border-slate-200 my-2" />

      <div className="w-full flex flex-col gap-2">
        <EditorBlockHeader
          title="Staff Members"
          rightAction={<Button onClick={addStaff} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Staff</Button>}
          className="mb-0"
        />

        <div className="w-full space-y-2">
          {data.staff?.map((staffItem: any, index: number) => (
            <StaffBlock
              key={index}
              index={index}
              staffData={staffItem}
              onUpdateFull={updateStaffFull}
              onRemove={() => removeStaff(index)}
              onMoveUp={() => moveStaff(index, 'up')}
              onMoveDown={() => moveStaff(index, 'down')}
              isFirst={index === 0}
              isLast={index === data.staff.length - 1}
              onMediaSelect={(idx: number) => { setMediaTargetIndex(idx); setIsMediaPopupOpen(true); }}
              onTranslate={handleTranslateStaff}
              isExpanded={expandedBlock === `staff-${index}`}
              onToggle={() => setExpandedBlock(expandedBlock === `staff-${index}` ? null : `staff-${index}`)}
            />
          ))}
          {(!data.staff || data.staff.length === 0) && (
            <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No staff added.</div>
          )}
        </div>
      </div>

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          if (mediaTargetIndex !== null) updateStaffField(mediaTargetIndex, 'img', url);
          setIsMediaPopupOpen(false);
          setMediaTargetIndex(null);
        }}
      />
    </div>
  );
};
