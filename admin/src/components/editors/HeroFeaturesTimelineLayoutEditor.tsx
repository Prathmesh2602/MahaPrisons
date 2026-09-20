import React, { useState } from 'react';
import { GeneralSettingsBlock } from './shared/GeneralSettingsBlock';
import { EditorBlockHeader } from '../EditorLayout';
import { PhoneticInput } from '../PhoneticInput';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import * as icons from 'lucide-react';
import { IconPicker } from '../IconPicker';

interface TemplateAEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const StatEditorItem = ({
  index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle
}: any) => {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const defaultStat = { label: { mr: '', en: '' }, value: '', icon: '' };
  
  const itemHist = useBlockHistory(
    defaultStat,
    itemData,
    (newItemData) => {
      onUpdateFull(index, newItemData);
    }
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  const currentItem = itemHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.label?.mr || `Statistic ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />

      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Label</label>
              <PhoneticInput
                value={currentItem.label?.mr || ''}
                onChange={(val) => handleLocalUpdate('label', { ...currentItem.label, mr: val })}
                onEnglishChange={(val) => handleLocalUpdate('label', { ...currentItem.label, en: val })}
                placeholder="e.g. कर्मचारी"
                englishValue={currentItem.label?.en || ''}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value</label>
              <PhoneticInput
                value={currentItem.value?.mr || currentItem.value || ''}
                onChange={(val) => handleLocalUpdate('value', { mr: val, en: currentItem.value?.en || val })}
                onEnglishChange={(val) => handleLocalUpdate('value', { ...currentItem.value, en: val })}
                placeholder="e.g. 50+"
                englishValue={currentItem.value?.en || currentItem.value || ''}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Icon</label>
            <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-md border border-slate-200 text-blue-500 shrink-0">
                  {currentItem.icon && (icons as any)[currentItem.icon] ? 
                    React.createElement((icons as any)[currentItem.icon], { size: 20 }) : 
                    <icons.CheckCircle size={20} />
                  }
                </div>
                <button type="button" onClick={() => setIsIconPickerOpen(true)} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-medium rounded hover:bg-slate-50">
                  Change Icon
                </button>
              </div>
              <IconPicker 
                isOpen={isIconPickerOpen} 
                onClose={() => setIsIconPickerOpen(false)} 
                selectedIcon={currentItem.icon}
                onSelect={(iconName) => handleLocalUpdate('icon', iconName)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FunctionEditorItem = ({
  index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle
}: any) => {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const defaultFunc = { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' };
  
  const itemHist = useBlockHistory(
    defaultFunc,
    itemData,
    (newItemData) => {
      onUpdateFull(index, newItemData);
    }
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  const currentItem = itemHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Function ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />

      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput
              value={currentItem.title?.mr || ''}
              onChange={(val) => handleLocalUpdate('title', { ...currentItem.title, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem.title, en: val })}
              placeholder="Title"
              englishValue={currentItem.title?.en || ''}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput
              value={currentItem.desc?.mr || ''}
              onChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, en: val })}
              placeholder="Description"
              englishValue={currentItem.desc?.en || ''}
              multiline
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Icon</label>
            <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-md border border-slate-200 text-blue-500 shrink-0">
                  {currentItem.icon && (icons as any)[currentItem.icon] ? 
                    React.createElement((icons as any)[currentItem.icon], { size: 20 }) : 
                    <icons.CheckCircle size={20} />
                  }
                </div>
                <button type="button" onClick={() => setIsIconPickerOpen(true)} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-medium rounded hover:bg-slate-50">
                  Change Icon
                </button>
              </div>
              <IconPicker 
                isOpen={isIconPickerOpen} 
                onClose={() => setIsIconPickerOpen(false)} 
                selectedIcon={currentItem.icon}
                onSelect={(iconName) => handleLocalUpdate('icon', iconName)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export const HeroFeaturesTimelineLayoutEditor: React.FC<TemplateAEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  
  const activeSection = expandedSection || 'general';

  // Ensure default structure
  const safeData = {
    title: { mr: '', en: '' },
    subtitle: { mr: '', en: '' },
    description: { mr: '', en: '' },
    heroImage: '',
    stats: [],
    keyFunctions: [],
    contactInfo: {
      email: '',
      phone: '',
      address: { mr: '', en: '' }
    },
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: 'stats' | 'keyFunctions', index: number, newItemData: any) => {
    const newArray = [...safeData[field]];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: 'stats' | 'keyFunctions', index: number) => {
    handleChange(field, safeData[field].filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: 'stats' | 'keyFunctions', index: number, direction: 1 | -1) => {
    if (index + direction < 0 || index + direction >= safeData[field].length) return;
    const newArray = [...safeData[field]];
    const temp = newArray[index];
    newArray[index] = newArray[index + direction];
    newArray[index + direction] = temp;
    handleChange(field, newArray);
    if (expandedItemIndex === index) setExpandedItemIndex(index + direction);
    else if (expandedItemIndex === index + direction) setExpandedItemIndex(index);
  };

  const addArrayItem = (field: 'stats' | 'keyFunctions', defaultItem: any) => {
    handleChange(field, [...safeData[field], defaultItem]);
    setExpandedItemIndex(safeData[field].length);
  };

  if (activeSection === 'general') {
    return (
      <div className="pb-10">
        <GeneralSettingsBlock 
          title="General Settings" 
          data={{ ...safeData, image: safeData.heroImage }} 
          onChange={(gData: any) => updateData({ ...safeData, title: gData.title, subtitle: gData.subtitle, description: gData.description, heroImage: gData.image })}
        />
      </div>
    );
  }

  if (activeSection === 'stats') {
    return (
      <div className="pb-10 space-y-2">
        {(safeData.stats || []).map((stat: any, index: number) => (
          <StatEditorItem
            key={`stat-${index}`}
            index={index}
            itemData={stat}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('stats', i, newD)}
            onRemove={() => removeArrayItem('stats', index)}
            onMoveUp={() => moveArrayItem('stats', index, -1)}
            onMoveDown={() => moveArrayItem('stats', index, 1)}
            isFirst={index === 0}
            isLast={index === safeData.stats.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button
          onClick={() => addArrayItem('stats', { label: { mr: '', en: '' }, value: { mr: '', en: '' }, icon: '' })}
          className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2"
        >
          <Plus size={16} /> Add Statistic
        </button>
      </div>
    );
  }

  if (activeSection === 'keyFunctions') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Key Functions)</label>
          <PhoneticInput
            value={safeData.labels?.keyFunctions?.mr || 'प्रमुख कार्ये'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, keyFunctions: { ...(safeData.labels?.keyFunctions || {}), mr: val } })}
            englishValue={safeData.labels?.keyFunctions?.en || 'Key Functions'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, keyFunctions: { ...(safeData.labels?.keyFunctions || {}), en: val } })}
            placeholder="e.g. Key Functions"
          />
        </div>
        <div className="space-y-2">
        {(safeData.keyFunctions || []).map((func: any, index: number) => (
          <FunctionEditorItem
            key={`func-${index}`}
            index={index}
            itemData={func}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('keyFunctions', i, newD)}
            onRemove={() => removeArrayItem('keyFunctions', index)}
            onMoveUp={() => moveArrayItem('keyFunctions', index, -1)}
            onMoveDown={() => moveArrayItem('keyFunctions', index, 1)}
            isFirst={index === 0}
            isLast={index === safeData.keyFunctions.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button
          onClick={() => addArrayItem('keyFunctions', { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' })}
          className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2"
        >
          <Plus size={16} /> Add Function
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'contactInfo') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Contact Information)</label>
          <PhoneticInput
            value={safeData.labels?.contactInfo?.mr || 'संपर्क माहिती'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, contactInfo: { ...(safeData.labels?.contactInfo || {}), mr: val } })}
            englishValue={safeData.labels?.contactInfo?.en || 'Contact Information'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, contactInfo: { ...(safeData.labels?.contactInfo || {}), en: val } })}
            placeholder="e.g. Contact Information"
          />
        </div>
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-6">
        <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
            <input
              type="email"
              value={safeData.contactInfo.email || ''}
              onChange={(e) => handleChange('contactInfo', { ...safeData.contactInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone</label>
            <input
              type="text"
              value={safeData.contactInfo.phone || ''}
              onChange={(e) => handleChange('contactInfo', { ...safeData.contactInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Address</label>
          <PhoneticInput
            value={safeData.contactInfo.address?.mr || ''}
            onChange={(val) => handleChange('contactInfo', { ...safeData.contactInfo, address: { ...safeData.contactInfo.address, mr: val } })}
            onEnglishChange={(val) => handleChange('contactInfo', { ...safeData.contactInfo, address: { ...safeData.contactInfo.address, en: val } })}
            placeholder="Address"
            englishValue={safeData.contactInfo.address?.en || ''}
            multiline
          />
        </div>
      </div>
      </div>
    );
  }

  // Fallback for unknown section
  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
