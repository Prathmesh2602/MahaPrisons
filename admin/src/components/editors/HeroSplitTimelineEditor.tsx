import React, { useState } from 'react';
import { GeneralSettingsBlock } from './shared/GeneralSettingsBlock';
import { EditorBlockHeader } from '../EditorLayout';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useBlockHistory } from '../../hooks/useBlockHistory';

interface TemplateDEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const ProtocolEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultProtocol = { title: { mr: '', en: '' }, desc: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultProtocol, itemData, (newItemData) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Protocol ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Remove"><Trash2 size={14} /></button>
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
              placeholder="Protocol title"
              englishValue={currentItem.title?.en || ''}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput
              value={currentItem.desc?.mr || ''}
              onChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, en: val })}
              placeholder="Protocol description"
              englishValue={currentItem.desc?.en || ''}
              multiline
            />
          </div>
        </div>
      )}
    </div>
  );
};

const InfrastructureEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const defaultInfra = { image: '', name: { mr: '', en: '' }, details: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultInfra, itemData, (newItemData) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.name?.mr || `Infrastructure ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Image</label>
            <div
              className="w-32 h-24 bg-slate-200 rounded border border-slate-300 overflow-hidden relative group cursor-pointer mt-1"
              onClick={() => setIsMediaPopupOpen(true)}
            >
              {currentItem.image ? (
                <img 
                  src={currentItem.image.startsWith('http') ? currentItem.image : `http://localhost:3000${currentItem.image.startsWith('/') ? '' : '/'}${currentItem.image}`} 
                  className="w-full h-full object-cover" 
                  alt="Preview"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <span className="text-[10px]">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
            <MediaLibraryPopup
              isOpen={isMediaPopupOpen}
              onClose={() => setIsMediaPopupOpen(false)}
              onSelect={(url) => { handleLocalUpdate('image', url); setIsMediaPopupOpen(false); }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
            <PhoneticInput
              value={currentItem.name?.mr || ''}
              onChange={(val) => handleLocalUpdate('name', { ...currentItem.name, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('name', { ...currentItem.name, en: val })}
              placeholder="Name"
              englishValue={currentItem.name?.en || ''}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Details</label>
            <PhoneticInput
              value={currentItem.details?.mr || ''}
              onChange={(val) => handleLocalUpdate('details', { ...currentItem.details, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('details', { ...currentItem.details, en: val })}
              placeholder="Details"
              englishValue={currentItem.details?.en || ''}
              multiline
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const HeroSplitTimelineEditor: React.FC<TemplateDEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = expandedSection || 'general';

  const safeData = {
    title: { mr: '', en: '' },
    description: { mr: '', en: '' },
    heroImage: '',
    alertMessage: { mr: '', en: '' },
    coreProtocols: [],
    infrastructure: [],
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: 'coreProtocols' | 'infrastructure', index: number, newItemData: any) => {
    const newArray = [...safeData[field]];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: 'coreProtocols' | 'infrastructure', index: number) => {
    handleChange(field, safeData[field].filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: 'coreProtocols' | 'infrastructure', index: number, direction: 1 | -1) => {
    if (index + direction < 0 || index + direction >= safeData[field].length) return;
    const newArray = [...safeData[field]];
    const temp = newArray[index];
    newArray[index] = newArray[index + direction];
    newArray[index + direction] = temp;
    handleChange(field, newArray);
    if (expandedItemIndex === index) setExpandedItemIndex(index + direction);
    else if (expandedItemIndex === index + direction) setExpandedItemIndex(index);
  };

  const addArrayItem = (field: 'coreProtocols' | 'infrastructure', defaultItem: any) => {
    handleChange(field, [...safeData[field], defaultItem]);
    setExpandedItemIndex(safeData[field].length);
  };

  if (activeSection === 'general') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Security & Infrastructure)</label>
          <PhoneticInput
            value={safeData.labels?.security?.mr || 'सुरक्षा व पायाभूत सुविधा'}
            onChange={(val) => updateData({ ...safeData, labels: { ...(safeData.labels || {}), security: { ...(safeData.labels?.security || {}), mr: val } } })}
            englishValue={safeData.labels?.security?.en || 'Security & Infrastructure'}
            onEnglishChange={(val) => updateData({ ...safeData, labels: { ...(safeData.labels || {}), security: { ...(safeData.labels?.security || {}), en: val } } })}
            placeholder="e.g. Security & Infrastructure"
          />
        </div>
        <GeneralSettingsBlock
          title="General Settings"
          description="Main title, description, and hero image for the page."
          isExpanded={true}
          onToggle={() => {}}
          data={{ title: safeData.title, subtitle: {mr: '', en: ''}, description: safeData.description, image: safeData.heroImage }}
          onChange={(gData: any) => updateData({ ...safeData, title: gData.title, description: gData.description, heroImage: gData.image })}
        />
      </div>
    );
  }

  if (activeSection === 'coreProtocols') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Core Protocols)</label>
          <PhoneticInput
            value={safeData.labels?.protocols?.mr || 'मुख्य प्रोटोकॉल'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, protocols: { ...(safeData.labels?.protocols || {}), mr: val } })}
            englishValue={safeData.labels?.protocols?.en || 'Core Protocols'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, protocols: { ...(safeData.labels?.protocols || {}), en: val } })}
            placeholder="e.g. Core Protocols"
          />
        </div>
        <div className="space-y-2">
        {(safeData.coreProtocols || []).map((protocol: any, index: number) => (
          <ProtocolEditorItem
            key={`proto-${index}`} index={index} itemData={protocol}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('coreProtocols', i, newD)}
            onRemove={() => removeArrayItem('coreProtocols', index)}
            onMoveUp={() => moveArrayItem('coreProtocols', index, -1)}
            onMoveDown={() => moveArrayItem('coreProtocols', index, 1)}
            isFirst={index === 0} isLast={index === safeData.coreProtocols.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('coreProtocols', { title: { mr: '', en: '' }, desc: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Protocol
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'infrastructure') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Infrastructure)</label>
          <PhoneticInput
            value={safeData.labels?.infrastructure?.mr || 'पायाभूत सुविधा'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, infrastructure: { ...(safeData.labels?.infrastructure || {}), mr: val } })}
            englishValue={safeData.labels?.infrastructure?.en || 'Infrastructure'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, infrastructure: { ...(safeData.labels?.infrastructure || {}), en: val } })}
            placeholder="e.g. Infrastructure"
          />
        </div>
        <div className="space-y-2">
        {(safeData.infrastructure || []).map((infra: any, index: number) => (
          <InfrastructureEditorItem
            key={`infra-${index}`} index={index} itemData={infra}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('infrastructure', i, newD)}
            onRemove={() => removeArrayItem('infrastructure', index)}
            onMoveUp={() => moveArrayItem('infrastructure', index, -1)}
            onMoveDown={() => moveArrayItem('infrastructure', index, 1)}
            isFirst={index === 0} isLast={index === safeData.infrastructure.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('infrastructure', { image: '', name: { mr: '', en: '' }, details: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Infrastructure
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'alertMessage') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Important Notice)</label>
          <PhoneticInput
            value={safeData.labels?.notice?.mr || 'महत्त्वाची सूचना'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, notice: { ...(safeData.labels?.notice || {}), mr: val } })}
            englishValue={safeData.labels?.notice?.en || 'Important Notice'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, notice: { ...(safeData.labels?.notice || {}), en: val } })}
            placeholder="e.g. Important Notice"
          />
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-6">
        <h3 className="text-lg font-semibold text-slate-800">Important Notice</h3>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Alert message</label>
          <PhoneticInput
            value={safeData.alertMessage?.mr || ''}
            onChange={(val) => handleChange('alertMessage', { ...safeData.alertMessage, mr: val })}
            onEnglishChange={(val) => handleChange('alertMessage', { ...safeData.alertMessage, en: val })}
            placeholder="Alert message..."
            englishValue={safeData.alertMessage?.en || ''}
            multiline
          />
        </div>
      </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
