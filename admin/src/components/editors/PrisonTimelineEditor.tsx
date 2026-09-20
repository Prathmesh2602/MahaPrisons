import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Send, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const GeneralSettingsBlock = ({ settingsData, onUpdateFull, onTranslate, isExpanded, onToggle }: any) => {
  const defaultSettings = { 
    title: { mr: "", en: "" }
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
        title="Section Title"
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={settingsHist}
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-blue-500 mt-2">
          <div className="space-y-1">
            <PhoneticInput label="Title " value={currentData.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} englishValue={currentData.title?.en} onEnglishChange={(val) => handleLocalUpdate('title.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

const EventBlock = ({ index, eventData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onTranslate, isExpanded, onToggle }: any) => {
  const defaultEvent = { year: "", title: { mr: "", en: "" }, desc: { mr: "", en: "" } };

  const eventHist = useBlockHistory(
    defaultEvent,
    eventData,
    (newData) => onUpdateFull(index, newData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newEvent = JSON.parse(JSON.stringify(eventHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newEvent[parent]) newEvent[parent] = {};
      newEvent[parent][child] = value;
    } else {
      newEvent[key] = value;
    }
    eventHist.update(newEvent);
  };

  const currentEvent = eventHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentEvent.year ? `${currentEvent.year} - ${currentEvent.title?.mr || 'Unnamed'}` : `Event ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={eventHist}
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
            <PhoneticInput label="Year" transliterate={false} value={currentEvent.year} onChange={(val) => handleLocalUpdate('year', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput label="Title " value={currentEvent.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} englishValue={currentEvent.title?.en} onEnglishChange={(val) => handleLocalUpdate('title.en', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput multiline label="Description " value={currentEvent.desc?.mr} onChange={(val) => handleLocalUpdate('desc.mr', val)} englishValue={currentEvent.desc?.en} onEnglishChange={(val) => handleLocalUpdate('desc.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const PrisonTimelineEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const safeData = initialData || {
    title: { mr: "", en: "" },
    events: []
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

  const updateRootFull = (newSettingsData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.title = newSettingsData.title;
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

  const updateEventFull = (index: number, fullEventData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.events) newData.events = [];
    newData.events[index] = fullEventData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateEventField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.events) newData.events = [];
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.events[index][parent]) newData.events[index][parent] = {};
      newData.events[index][parent][child] = value;
    } else {
      newData.events[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addEvent = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.events) newData.events = [];
    newData.events.push({ year: "", title: { mr: "", en: "" }, desc: { mr: "", en: "" } });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeEvent = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.events.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveEvent = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData.events[index - 1], newData.events[index]] = [newData.events[index], newData.events[index - 1]];
    } else if (direction === 'down' && index < newData.events.length - 1) {
      [newData.events[index + 1], newData.events[index]] = [newData.events[index], newData.events[index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };



  const handleTranslateEvent = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateEventField(index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Prison Timeline Section"
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
          title: data.title || { mr: "", en: "" }
        }}
        onUpdateFull={updateRootFull}
        onTranslate={handleTranslateGeneral}
        isExpanded={expandedBlock === 'general'}
        onToggle={() => setExpandedBlock(expandedBlock === 'general' ? null : 'general')}
      />

      <hr className="border-t border-dashed border-slate-200 my-2" />

      <div className="w-full flex flex-col gap-2">
        <EditorBlockHeader
          title="Timeline Events"
          rightAction={<Button onClick={addEvent} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Event</Button>}
          className="mb-0"
        />

        <div className="w-full space-y-2">
          {data.events?.map((event: any, index: number) => (
            <EventBlock
              key={index}
              index={index}
              eventData={event}
              onUpdateFull={updateEventFull}
              onRemove={() => removeEvent(index)}
              onMoveUp={() => moveEvent(index, 'up')}
              onMoveDown={() => moveEvent(index, 'down')}
              isFirst={index === 0}
              isLast={index === data.events.length - 1}
              onTranslate={handleTranslateEvent}
              isExpanded={expandedBlock === `event-${index}`}
              onToggle={() => setExpandedBlock(expandedBlock === `event-${index}` ? null : `event-${index}`)}
            />
          ))}
          {(!data.events || data.events.length === 0) && (
            <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No events added.</div>
          )}
        </div>
      </div>
    </div>
  );
};
