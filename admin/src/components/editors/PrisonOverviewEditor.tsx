import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Send, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { IconPicker } from '../IconPicker';
import * as lucideIcons from 'lucide-react';

const StatBlock = ({ index, statData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onTranslate, isExpanded, onToggle }: any) => {
  const defaultStat = { label: { mr: "", en: "" }, value: { mr: "", en: "" }, icon: "" };
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const statHist = useBlockHistory(
    defaultStat,
    statData,
    (newData) => onUpdateFull(index, newData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newStat = JSON.parse(JSON.stringify(statHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newStat[parent]) newStat[parent] = {};
      newStat[parent][child] = value;
    } else {
      newStat[key] = value;
    }
    statHist.update(newStat);
  };

  const currentStat = statHist.value;
  const defaultIcons = ["MapPin", "CheckCircle2", "Award"];
  const fallbackIconName = defaultIcons[index % defaultIcons.length];
  const iconNameToRender = currentStat.icon || fallbackIconName;
  const SelectedIcon = (lucideIcons as any)[iconNameToRender] || lucideIcons.Info;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentStat.label?.mr || `Stat ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={statHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm mt-2 border-l-4 border-l-amber-500">
          
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-md border border-slate-200 text-blue-500 shrink-0">
              <SelectedIcon size={20} />
            </div>
            <Button size="sm" variant="outline" onClick={() => setIsIconPickerOpen(true)} className="h-8 text-xs py-0">
              Change Icon
            </Button>
          </div>
          
          <IconPicker 
            isOpen={isIconPickerOpen} 
            onClose={() => setIsIconPickerOpen(false)} 
            selectedIcon={currentStat.icon}
            onSelect={(iconName) => handleLocalUpdate('icon', iconName)} 
          />

          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput label="Label " value={currentStat.label?.mr} onChange={(val) => handleLocalUpdate('label.mr', val)} englishValue={currentStat.label?.en} onEnglishChange={(val) => handleLocalUpdate('label.en', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput label="Value " value={currentStat.value?.mr} onChange={(val) => handleLocalUpdate('value.mr', val)} englishValue={currentStat.value?.en} onEnglishChange={(val) => handleLocalUpdate('value.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const PrisonOverviewEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const safeData = initialData || {
    title: { mr: "", en: "" },
    description: { mr: "", en: "" },
    stats: []
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

  const updateStatFull = (index: number, fullStatData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.stats) newData.stats = [];
    newData.stats[index] = fullStatData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateStatField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.stats) newData.stats = [];
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.stats[index][parent]) newData.stats[index][parent] = {};
      newData.stats[index][parent][child] = value;
    } else {
      newData.stats[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addStat = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.stats) newData.stats = [];
    newData.stats.push({ label: { mr: "", en: "" }, value: { mr: "", en: "" } });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeStat = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.stats.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveStat = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData.stats[index - 1], newData.stats[index]] = [newData.stats[index], newData.stats[index - 1]];
    } else if (direction === 'down' && index < newData.stats.length - 1) {
      [newData.stats[index + 1], newData.stats[index]] = [newData.stats[index], newData.stats[index + 1]];
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

  const handleTranslateStat = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateStatField(index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Prison Overview Section"
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
        <EditorBlockHeader
          title="Stats"
          rightAction={<Button onClick={addStat} variant="secondary" size="sm" className="whitespace-nowrap shrink-0">+ Add Stat</Button>}
          className="mb-0"
        />

        <div className="w-full space-y-2">
          {data.stats?.map((stat: any, index: number) => (
            <StatBlock
              key={index}
              index={index}
              statData={stat}
              onUpdateFull={updateStatFull}
              onRemove={() => removeStat(index)}
              onMoveUp={() => moveStat(index, 'up')}
              onMoveDown={() => moveStat(index, 'down')}
              isFirst={index === 0}
              isLast={index === data.stats.length - 1}
              onTranslate={handleTranslateStat}
              isExpanded={expandedBlock === `stat-${index}`}
              onToggle={() => setExpandedBlock(expandedBlock === `stat-${index}` ? null : `stat-${index}`)}
            />
          ))}
          {(!data.stats || data.stats.length === 0) && (
            <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No stats added.</div>
          )}
        </div>
      </div>
    </div>
  );
};
