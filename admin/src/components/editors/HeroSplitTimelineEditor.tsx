import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface HeroSplitTimelineEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const CoreProtocolsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { title: { mr: '', en: '' }, desc: { mr: '', en: '' } };
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput value={currentItem.title?.mr || ''} onChange={(val) => handleLocalUpdate('title', { ...currentItem.title, mr: val })} onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem.title, en: val })} englishValue={currentItem.title?.en || ''} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput value={currentItem.desc?.mr || ''} onChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, mr: val })} onEnglishChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, en: val })} englishValue={currentItem.desc?.en || ''} multiline />
          </div>
        </div>
      )}
    </div>
  );
};

const InfrastructureEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { image: '', name: { mr: '', en: '' }, details: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;
  const [mediaOpen_image, setMediaOpen_image] = useState(false);

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
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Image</label>
            <div
              className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
              onClick={() => setMediaOpen_image(true)}
            >
              {currentItem.image ? (
                <img
                  src={currentItem.image.startsWith('http') ? currentItem.image : `http://localhost:5000${currentItem.image.startsWith('/') ? '' : '/'}${currentItem.image}`}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <span className="text-2xl mb-1">🖼</span>
                  <span className="text-xs">Click to select image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
            <MediaLibraryPopup
              isOpen={mediaOpen_image}
              onClose={() => setMediaOpen_image(false)}
              onSelect={(url: string) => { handleLocalUpdate('image', url); setMediaOpen_image(false); }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
            <PhoneticInput value={currentItem.name?.mr || ''} onChange={(val) => handleLocalUpdate('name', { ...currentItem.name, mr: val })} onEnglishChange={(val) => handleLocalUpdate('name', { ...currentItem.name, en: val })} englishValue={currentItem.name?.en || ''} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Details</label>
            <PhoneticInput value={currentItem.details?.mr || ''} onChange={(val) => handleLocalUpdate('details', { ...currentItem.details, mr: val })} onEnglishChange={(val) => handleLocalUpdate('details', { ...currentItem.details, en: val })} englishValue={currentItem.details?.en || ''} multiline />
          </div>
        </div>
      )}
    </div>
  );
};

export const HeroSplitTimelineEditor: React.FC<HeroSplitTimelineEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = (expandedSection || 'hero').replace('template_', '');

  const [expandedFixedBlocks, setExpandedFixedBlocks] = useState<Record<string, boolean>>({
    hero_content: true,
    motto_content: true,
    contactInfo_content: true,
    category_header: true,
    general_header: true,
    production_header: true,
    partnership_header: true,
    training_header: true,
    organization_header: true,
    [`${activeSection}_header`]: true
  });

  const toggleFixedBlock = (key: string) => {
    setExpandedFixedBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setExpandedItemIndex(0);
  }, [activeSection]);

  const [mediaOpen_heroImage, setMediaOpen_heroImage] = useState(false);

  const safeData = {
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const heroContentHist = useBlockHistory(
    { title: { mr: '', en: '' }, subtitle: { mr: '', en: '' }, description: { mr: '', en: '' }, heroImage: '' },
    safeData.hero || {},
    (newVal: any) => handleChange('hero', newVal)
  );

  const securityHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.security || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, security: newVal })
  );

  const noticeHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.notice || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, notice: newVal })
  );

  const alertMessageHist = useBlockHistory(
    { mr: '', en: '' },
    typeof safeData.alertMessage === 'object' ? safeData.alertMessage : { mr: safeData.alertMessage || '', en: safeData.alertMessage || '' },
    (newVal: any) => handleChange('alertMessage', newVal)
  );

  const protocolsHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.protocols || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, protocols: newVal })
  );

  const infrastructureHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.infrastructure || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, infrastructure: newVal })
  );

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

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Hero Content" 
            isExpanded={!!expandedFixedBlocks['hero_content']} 
            onToggle={() => toggleFixedBlock('hero_content')} 
            history={{
              canUndo: heroContentHist.canUndo || securityHeaderHist.canUndo,
              undo: () => {
                if (heroContentHist.canUndo) heroContentHist.undo();
                if (securityHeaderHist.canUndo) securityHeaderHist.undo();
              },
              isModified: heroContentHist.isModified || securityHeaderHist.isModified
            }}
          />
          {!!expandedFixedBlocks['hero_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div className="mb-6 p-4 border border-emerald-100 bg-emerald-50/50 rounded-lg space-y-4">
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Badge Configuration</h4>
                <IconPickerInput 
                  label="Badge Icon" 
                  value={securityHeaderHist.value.icon || ''} 
                  onChange={(val) => { const n = { ...securityHeaderHist.value, icon: val }; securityHeaderHist.update(n); }} 
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Title</label>
                  <PhoneticInput 
                    value={securityHeaderHist.value.title?.mr || ''} 
                    onChange={(val) => { const n = { ...securityHeaderHist.value, title: { ...securityHeaderHist.value.title, mr: val } }; securityHeaderHist.update(n); }} 
                    onEnglishChange={(val) => { const n = { ...securityHeaderHist.value, title: { ...securityHeaderHist.value.title, en: val } }; securityHeaderHist.update(n); }} 
                    englishValue={securityHeaderHist.value.title?.en || ''} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={heroContentHist.value.title?.mr || ''} onChange={(val) => { const n = { ...heroContentHist.value, title: { ...heroContentHist.value.title, mr: val } }; heroContentHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroContentHist.value, title: { ...heroContentHist.value.title, en: val } }; heroContentHist.update(n); }} englishValue={heroContentHist.value.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={heroContentHist.value.subtitle?.mr || ''} onChange={(val) => { const n = { ...heroContentHist.value, subtitle: { ...heroContentHist.value.subtitle, mr: val } }; heroContentHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroContentHist.value, subtitle: { ...heroContentHist.value.subtitle, en: val } }; heroContentHist.update(n); }} englishValue={heroContentHist.value.subtitle?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={heroContentHist.value.description?.mr || ''} onChange={(val) => { const n = { ...heroContentHist.value, description: { ...heroContentHist.value.description, mr: val } }; heroContentHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroContentHist.value, description: { ...heroContentHist.value.description, en: val } }; heroContentHist.update(n); }} englishValue={heroContentHist.value.description?.en || ''} multiline />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {heroContentHist.value.heroImage ? (
                    <img
                      src={heroContentHist.value.heroImage.startsWith('http') ? heroContentHist.value.heroImage : `http://localhost:5000${heroContentHist.value.heroImage.startsWith('/') ? '' : '/'}${heroContentHist.value.heroImage}`}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <span className="text-2xl mb-1">🖼</span>
                      <span className="text-xs">Click to select image</span>
                    </div>
                  )}
                </div>
                <MediaLibraryPopup
                  isOpen={mediaOpen_heroImage}
                  onClose={() => setMediaOpen_heroImage(false)}
                  onSelect={(url: string) => { const n = { ...heroContentHist.value, heroImage: url }; heroContentHist.update(n); setMediaOpen_heroImage(false); }}
                />
              </div>
            </div>
          )}
        </div>
        
      </div>
    );
  }

  if (activeSection === 'coreProtocols') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['coreProtocols_header']} 
            onToggle={() => toggleFixedBlock('coreProtocols_header')} 
            history={protocolsHeaderHist}
          />
          {!!expandedFixedBlocks['coreProtocols_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Section Icon" 
                value={protocolsHeaderHist.value.icon || ''} 
                onChange={(val) => { const n = { ...protocolsHeaderHist.value, icon: val }; protocolsHeaderHist.update(n); }} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={protocolsHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => { const n = { ...protocolsHeaderHist.value, title: { ...protocolsHeaderHist.value.title, mr: val } }; protocolsHeaderHist.update(n); }} 
                  onEnglishChange={(val) => { const n = { ...protocolsHeaderHist.value, title: { ...protocolsHeaderHist.value.title, en: val } }; protocolsHeaderHist.update(n); }} 
                  englishValue={protocolsHeaderHist.value.title?.en || ''} 
                />
              </div>
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Core Protocols</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.coreProtocols || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.coreProtocols || []).map((item: any, index: number) => (
            <CoreProtocolsEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('coreProtocols', i, newD)}
              onRemove={() => removeArrayItem('coreProtocols', index)}
              onMoveUp={() => moveArrayItem('coreProtocols', index, -1)}
              onMoveDown={() => moveArrayItem('coreProtocols', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.coreProtocols || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('coreProtocols', { title: { mr: '', en: '' }, desc: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Core Protocols Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'infrastructure') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['infrastructure_header']} 
            onToggle={() => toggleFixedBlock('infrastructure_header')} 
            history={infrastructureHeaderHist}
          />
          {!!expandedFixedBlocks['infrastructure_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Section Icon" 
                value={infrastructureHeaderHist.value.icon || ''} 
                onChange={(val) => { const n = { ...infrastructureHeaderHist.value, icon: val }; infrastructureHeaderHist.update(n); }} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={infrastructureHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => { const n = { ...infrastructureHeaderHist.value, title: { ...infrastructureHeaderHist.value.title, mr: val } }; infrastructureHeaderHist.update(n); }} 
                  onEnglishChange={(val) => { const n = { ...infrastructureHeaderHist.value, title: { ...infrastructureHeaderHist.value.title, en: val } }; infrastructureHeaderHist.update(n); }} 
                  englishValue={infrastructureHeaderHist.value.title?.en || ''} 
                />
              </div>
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Infrastructure</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.infrastructure || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.infrastructure || []).map((item: any, index: number) => (
            <InfrastructureEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('infrastructure', i, newD)}
              onRemove={() => removeArrayItem('infrastructure', index)}
              onMoveUp={() => moveArrayItem('infrastructure', index, -1)}
              onMoveDown={() => moveArrayItem('infrastructure', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.infrastructure || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('infrastructure', { image: '', name: { mr: '', en: '' }, details: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Infrastructure Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'alertMessage') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Notice Header Configuration" 
            isExpanded={!!expandedFixedBlocks['alertMessage_header']} 
            onToggle={() => toggleFixedBlock('alertMessage_header')}
            history={noticeHeaderHist} 
          />
          {!!expandedFixedBlocks['alertMessage_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Section Icon" 
                value={noticeHeaderHist.value.icon || ''} 
                onChange={(val) => { const n = { ...noticeHeaderHist.value, icon: val }; noticeHeaderHist.update(n); }} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={noticeHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => { const n = { ...noticeHeaderHist.value, title: { ...noticeHeaderHist.value.title, mr: val } }; noticeHeaderHist.update(n); }} 
                  onEnglishChange={(val) => { const n = { ...noticeHeaderHist.value, title: { ...noticeHeaderHist.value.title, en: val } }; noticeHeaderHist.update(n); }} 
                  englishValue={noticeHeaderHist.value.title?.en || ''} 
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Alert Message Content" 
            isExpanded={expandedFixedBlocks['alertMessage_content'] !== false} 
            onToggle={() => toggleFixedBlock('alertMessage_content')}
            history={alertMessageHist} 
          />
          {expandedFixedBlocks['alertMessage_content'] !== false && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Message</label>
                <PhoneticInput 
                  value={alertMessageHist.value.mr || ''} 
                  onChange={(val) => { const n = { ...alertMessageHist.value, mr: val }; alertMessageHist.update(n); }} 
                  onEnglishChange={(val) => { const n = { ...alertMessageHist.value, en: val }; alertMessageHist.update(n); }} 
                  englishValue={alertMessageHist.value.en || ''} 
                  multiline
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
