import React, { useState } from 'react';
import { GeneralSettingsBlock } from './shared/GeneralSettingsBlock';
import { EditorBlockHeader } from '../EditorLayout';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useBlockHistory } from '../../hooks/useBlockHistory';

interface TemplateCEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const ProductionStatEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultStat = { label: { mr: '', en: '' }, value: '', unit: '' };
  const itemHist = useBlockHistory(defaultStat, itemData, (newItemData) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.label?.mr || `Stat ${index + 1}`}
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Label</label>
            <PhoneticInput
              value={currentItem.label?.mr || ''}
              onChange={(val) => handleLocalUpdate('label', { ...currentItem.label, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('label', { ...currentItem.label, en: val })}
              placeholder="e.g. वार्षिक उलाढाल"
              englishValue={currentItem.label?.en || ''}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value</label>
              <input
                type="text"
                value={currentItem.value || ''}
                onChange={(e) => handleLocalUpdate('value', e.target.value)}
                placeholder="e.g. 100"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Unit</label>
              <input
                type="text"
                value={currentItem.unit || ''}
                onChange={(e) => handleLocalUpdate('unit', e.target.value)}
                placeholder="e.g. कोटी"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ActiveProjectEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const defaultProject = { image: '', title: { mr: '', en: '' }, desc: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultProject, itemData, (newItemData) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Project ${index + 1}`}
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
        </div>
      )}
    </div>
  );
};

export const HeroThreeColGridEditor: React.FC<TemplateCEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = expandedSection || 'general';

  const safeData = {
    title: { mr: '', en: '' },
    description: { mr: '', en: '' },
    heroImage: '',
    productionStats: [],
    activeProjects: [],
    impactStatement: { mr: '', en: '' },
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: 'productionStats' | 'activeProjects', index: number, newItemData: any) => {
    const newArray = [...safeData[field]];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: 'productionStats' | 'activeProjects', index: number) => {
    handleChange(field, safeData[field].filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: 'productionStats' | 'activeProjects', index: number, direction: 1 | -1) => {
    if (index + direction < 0 || index + direction >= safeData[field].length) return;
    const newArray = [...safeData[field]];
    const temp = newArray[index];
    newArray[index] = newArray[index + direction];
    newArray[index + direction] = temp;
    handleChange(field, newArray);
    if (expandedItemIndex === index) setExpandedItemIndex(index + direction);
    else if (expandedItemIndex === index + direction) setExpandedItemIndex(index);
  };

  const addArrayItem = (field: 'productionStats' | 'activeProjects', defaultItem: any) => {
    handleChange(field, [...safeData[field], defaultItem]);
    setExpandedItemIndex(safeData[field].length);
  };

  if (activeSection === 'general') {
    return (
      <div className="pb-10">
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

  if (activeSection === 'productionStats') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Production & Activities)</label>
          <PhoneticInput
            value={safeData.labels?.production?.mr || 'उत्पादन व उपक्रम'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, production: { ...(safeData.labels?.production || {}), mr: val } })}
            englishValue={safeData.labels?.production?.en || 'Production & Activities'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, production: { ...(safeData.labels?.production || {}), en: val } })}
            placeholder="e.g. Production & Activities"
          />
        </div>
        <div className="space-y-2">
        {(safeData.productionStats || []).map((stat: any, index: number) => (
          <ProductionStatEditorItem
            key={`stat-${index}`} index={index} itemData={stat}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('productionStats', i, newD)}
            onRemove={() => removeArrayItem('productionStats', index)}
            onMoveUp={() => moveArrayItem('productionStats', index, -1)}
            onMoveDown={() => moveArrayItem('productionStats', index, 1)}
            isFirst={index === 0} isLast={index === safeData.productionStats.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('productionStats', { label: { mr: '', en: '' }, value: '', unit: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Stat
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'activeProjects') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Social Impact)</label>
          <PhoneticInput
            value={safeData.labels?.impact?.mr || 'सामाजिक प्रभाव'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, impact: { ...(safeData.labels?.impact || {}), mr: val } })}
            englishValue={safeData.labels?.impact?.en || 'Social Impact'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, impact: { ...(safeData.labels?.impact || {}), en: val } })}
            placeholder="e.g. Social Impact"
          />
        </div>
        <div className="space-y-2">
        {(safeData.activeProjects || []).map((project: any, index: number) => (
          <ActiveProjectEditorItem
            key={`proj-${index}`} index={index} itemData={project}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('activeProjects', i, newD)}
            onRemove={() => removeArrayItem('activeProjects', index)}
            onMoveUp={() => moveArrayItem('activeProjects', index, -1)}
            onMoveDown={() => moveArrayItem('activeProjects', index, 1)}
            isFirst={index === 0} isLast={index === safeData.activeProjects.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('activeProjects', { image: '', title: { mr: '', en: '' }, desc: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Project
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'impactStatement') {
    return (
      <div className="pb-10 bg-white border border-slate-200 rounded-lg p-5 space-y-6">
        <h3 className="text-lg font-semibold text-slate-800">Social Impact Statement</h3>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Statement</label>
          <PhoneticInput
            value={safeData.impactStatement?.mr || ''}
            onChange={(val) => handleChange('impactStatement', { ...safeData.impactStatement, mr: val })}
            onEnglishChange={(val) => handleChange('impactStatement', { ...safeData.impactStatement, en: val })}
            placeholder="Impact statement..."
            englishValue={safeData.impactStatement?.en || ''}
            multiline
          />
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
