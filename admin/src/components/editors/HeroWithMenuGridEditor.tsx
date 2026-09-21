import React, { useState, useEffect } from 'react';
import { GeneralSettingsBlock } from './shared/GeneralSettingsBlock';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';

interface HeroWithMenuGridEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const MenuHighlightsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { mr: '', en: '' };
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;


  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.label?.mr || currentItem.name?.mr || currentItem.mr || `Item ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Marathi</label>
            <input type="text" value={currentItem.mr || ''} onChange={(e) => handleLocalUpdate('mr', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">English</label>
            <input type="text" value={currentItem.en || ''} onChange={(e) => handleLocalUpdate('en', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export const HeroWithMenuGridEditor: React.FC<HeroWithMenuGridEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = (expandedSection || 'general').replace('template_', '');

  useEffect(() => {
    setExpandedItemIndex(0);
  }, [activeSection]);

  const safeData = {
    title: { mr: '', en: '' },
    subtitle: { mr: '', en: '' },
    description: { mr: '', en: '' },
    heroImage: '',
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: string, index: number, newItemData: any) => {
    const newArray = [...(safeData[field] || [])];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: string, index: number) => {
    const arr = safeData[field] || [];
    handleChange(field, arr.filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: string, index: number, direction: number) => {
    const arr = safeData[field] || [];
    if (index + direction < 0 || index + direction >= arr.length) return;
    const newArray = [...arr];
    const temp = newArray[index];
    newArray[index] = newArray[index + direction];
    newArray[index + direction] = temp;
    handleChange(field, newArray);
    if (expandedItemIndex === index) setExpandedItemIndex(index + direction);
    else if (expandedItemIndex === index + direction) setExpandedItemIndex(index);
  };

  const addArrayItem = (field: string, defaultItem: any) => {
    const arr = safeData[field] || [];
    handleChange(field, [...arr, defaultItem]);
    setExpandedItemIndex(arr.length);
  };

  if (activeSection === 'general' || activeSection === 'template') {
    return (
      <div className="pb-10">
        <GeneralSettingsBlock
          title="General Settings"
          isExpanded={true}
          onToggle={() => {}}
          data={{ title: safeData.title, subtitle: safeData.subtitle, description: safeData.description, image: safeData.heroImage }}
          onChange={(gData: any) => updateData({ ...safeData, title: gData.title, subtitle: gData.subtitle, description: gData.description, heroImage: gData.image })}
        />
      </div>
    );
  }

  if (activeSection === 'menuHighlights') {
    return (
      <div className="pb-10 space-y-4">
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Menu Highlights</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.menuHighlights || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.menuHighlights || []).map((item: any, index: number) => (
            <MenuHighlightsEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('menuHighlights', i, newD)}
              onRemove={() => removeArrayItem('menuHighlights', index)}
              onMoveUp={() => moveArrayItem('menuHighlights', index, -1)}
              onMoveDown={() => moveArrayItem('menuHighlights', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.menuHighlights || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('menuHighlights', { mr: '', en: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Menu Highlights Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'motto') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-2">Motto / Tagline</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Marathi</label>
            <input type="text" value={safeData.motto?.mr || ''} onChange={(e) => handleChange('motto', { ...safeData.motto, mr: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">English</label>
            <input type="text" value={safeData.motto?.en || ''} onChange={(e) => handleChange('motto', { ...safeData.motto, en: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
          </div>
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
