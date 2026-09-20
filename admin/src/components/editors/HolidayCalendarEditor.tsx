import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Send, Save, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const HolidayBlock = ({
  index, holidayData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onTranslate,
  isExpanded, onToggle
}: any) => {
  const defaultHoliday = { date: new Date().toISOString().split('T')[0], type: 'gazetted', title_en: '', title_mr: '' };

  // Handle migration of legacy data
  let initialHolidayData = { ...holidayData };
  if (initialHolidayData.title && (!initialHolidayData.title_en || !initialHolidayData.title_mr)) {
    const parts = initialHolidayData.title.split('/');
    initialHolidayData.title_en = parts[0]?.trim() || initialHolidayData.title;
    initialHolidayData.title_mr = parts[1]?.trim() || initialHolidayData.title;
    // Don't delete title yet, just to be safe
  }

  const holidayHist = useBlockHistory(
    defaultHoliday,
    initialHolidayData,
    (newHolidayData) => onUpdateFull(index, newHolidayData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newHoliday = JSON.parse(JSON.stringify(holidayHist.value));
    newHoliday[key] = value;
    holidayHist.update(newHoliday);
  };

  const currentHoliday = holidayHist.value;
  const displayTitle = currentHoliday.title_mr || currentHoliday.title_en || currentHoliday.title || 'New Holiday';

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={displayTitle}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={holidayHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />

      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm mt-2 border-l-4 border-l-rose-500">
          <div className="flex flex-col gap-2">
            <PhoneticInput label="Title " value={currentHoliday.title_mr || ''} onChange={(val) => handleLocalUpdate('title_mr', val)} englishValue={currentHoliday.title_en || ''} onEnglishChange={(val) => handleLocalUpdate('title_en', val)} />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Date</label>
              <input type="date" className="w-full text-sm border border-slate-300 rounded p-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" value={currentHoliday.date} onChange={(e) => handleLocalUpdate('date', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Type</label>
              <select className="w-full text-sm border border-slate-300 rounded p-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" value={currentHoliday.type} onChange={(e) => handleLocalUpdate('type', e.target.value)}>
                <option value="gazetted">Gazetted (Red)</option>
                <option value="restricted">Restricted (Orange)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const HolidayCalendarEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const defaultHolidays = [
    { date: '2026-01-26', type: 'gazetted', title: 'Republic Day / प्रजासत्ताक दिन' }
  ];

  const safeData = initialData || defaultHolidays;

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

  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  const updateHolidayFull = (index: number, fullHolidayData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[index] = fullHolidayData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateHolidayField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[index][key] = value;
    setData(newData);
    updateHistoryState(newData);
  };

  const addHoliday = () => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.push({
      date: new Date().toISOString().split('T')[0],
      type: 'gazetted',
      title_en: '',
      title_mr: ''
    });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeHoliday = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveHoliday = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
    } else if (direction === 'down' && index < newData.length - 1) {
      [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslate = async (text: string, index: number, isEnglish: boolean) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: isEnglish ? 'en' : 'mr', target: isEnglish ? 'mr' : 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) {
        updateHolidayField(index, isEnglish ? 'title_mr' : 'title_en', translatedText);
      }
    } catch (err) { console.error('Translation failed', err); }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Holiday Calendar"
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

      <div className="w-full space-y-2">
        {data.map((holiday: any, index: number) => (
          <HolidayBlock
            key={index}
            index={index}
            holidayData={holiday}
            onUpdateFull={updateHolidayFull}
            onRemove={() => removeHoliday(index)}
            onMoveUp={() => moveHoliday(index, 'up')}
            onMoveDown={() => moveHoliday(index, 'down')}
            isFirst={index === 0}
            isLast={index === data.length - 1}
            onTranslate={handleTranslate}
            isExpanded={expandedBlock === index}
            onToggle={() => setExpandedBlock(expandedBlock === index ? null : index)}
          />
        ))}
        {(!data || data.length === 0) && (
          <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No holidays added.</div>
        )}
      </div>
      
      <Button onClick={addHoliday} variant="secondary" className="w-full">
        <Plus size={14} className="mr-2" /> Add Holiday
      </Button>
    </div>
  );
};
