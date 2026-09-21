import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Send, Save, Image as ImageIcon } from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useAuth } from '../../context/AuthContext';

const GeneralSettingsBlock = ({ settingsData, onUpdateFull, onTranslate, isExpanded, onToggle }: any) => {
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

const ActivityBlock = ({ index, activityData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onMediaSelect, onTranslate, isExpanded, onToggle }: any) => {
  const defaultActivity = { id: "", image: "", imagePosition: "left", title: { mr: "", en: "" }, desc: { mr: "", en: "" } };

  const activityHist = useBlockHistory(
    defaultActivity,
    activityData,
    (newData) => onUpdateFull(index, newData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newActivity = JSON.parse(JSON.stringify(activityHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newActivity[parent]) newActivity[parent] = {};
      newActivity[parent][child] = value;
    } else {
      newActivity[key] = value;
    }
    activityHist.update(newActivity);
  };

  const currentActivity = activityHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentActivity.title?.mr || `Activity ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={activityHist}
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
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Image</label>
            <div
              className="w-full h-32 bg-slate-200 rounded border border-slate-300 overflow-hidden relative group cursor-pointer mt-1"
              onClick={() => onMediaSelect(index)}
            >
              {currentActivity.image ? (
                <img 
                  src={currentActivity.image.startsWith('http') ? currentActivity.image : `http://localhost:3000${currentActivity.image.startsWith('/') ? '' : '/'}${currentActivity.image}`} 
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
          
          <div className="space-y-1 mt-2 mb-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Image Position</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLocalUpdate('imagePosition', 'left')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium border transition-colors ${currentActivity.imagePosition === 'left' || !currentActivity.imagePosition ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-300'}`}
              >
                ◀ Left
              </button>
              <button
                type="button"
                onClick={() => handleLocalUpdate('imagePosition', 'right')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium border transition-colors ${currentActivity.imagePosition === 'right' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-300'}`}
              >
                Right ▶
              </button>
            </div>
          </div>
          

          <div className="space-y-1">
            <PhoneticInput label="Title " value={currentActivity.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} englishValue={currentActivity.title?.en} onEnglishChange={(val) => handleLocalUpdate('title.en', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput multiline label="Description " value={currentActivity.desc?.mr} onChange={(val) => handleLocalUpdate('desc.mr', val)} englishValue={currentActivity.desc?.en} onEnglishChange={(val) => handleLocalUpdate('desc.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const PrisonActivitiesEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const safeData = initialData || {
    title: { mr: "", en: "" },
    description: { mr: "", en: "" },
    list: []
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

  const updateActivityFull = (index: number, fullActivityData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.list) newData.list = [];
    newData.list[index] = fullActivityData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateActivityField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.list) newData.list = [];
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.list[index][parent]) newData.list[index][parent] = {};
      newData.list[index][parent][child] = value;
    } else {
      newData.list[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addActivity = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.list) newData.list = [];
    newData.list.push({ id: "", image: "", imagePosition: "left", title: { mr: "", en: "" }, desc: { mr: "", en: "" } });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeActivity = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.list.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveActivity = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData.list[index - 1], newData.list[index]] = [newData.list[index], newData.list[index - 1]];
    } else if (direction === 'down' && index < newData.list.length - 1) {
      [newData.list[index + 1], newData.list[index]] = [newData.list[index], newData.list[index + 1]];
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

  const handleTranslateActivity = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateActivityField(index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Prison Activities Section"
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

      <GeneralSettingsBlock 
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
          title="Activities List"
          rightAction={<Button onClick={addActivity} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Activity</Button>}
          className="mb-0"
        />

        <div className="w-full space-y-2">
          {data.list?.map((activity: any, index: number) => (
            <ActivityBlock
              key={index}
              index={index}
              activityData={activity}
              onUpdateFull={updateActivityFull}
              onRemove={() => removeActivity(index)}
              onMoveUp={() => moveActivity(index, 'up')}
              onMoveDown={() => moveActivity(index, 'down')}
              isFirst={index === 0}
              isLast={index === data.list.length - 1}
              onMediaSelect={(idx: number) => { setMediaTargetIndex(idx); setIsMediaPopupOpen(true); }}
              onTranslate={handleTranslateActivity}
              isExpanded={expandedBlock === `activity-${index}`}
              onToggle={() => setExpandedBlock(expandedBlock === `activity-${index}` ? null : `activity-${index}`)}
            />
          ))}
          {(!data.list || data.list.length === 0) && (
            <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No activities added.</div>
          )}
        </div>
      </div>

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          if (mediaTargetIndex !== null) updateActivityField(mediaTargetIndex, 'image', url);
          setIsMediaPopupOpen(false);
          setMediaTargetIndex(null);
        }}
      />
    </div>
  );
};
