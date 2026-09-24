import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface HeroWithPricingListEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const ServicesEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { name: { mr: '', en: '' }, icon: 'Check' };
  const itemHist = useBlockHistory(defaultItem, { ...itemData, icon: itemData?.icon || 'Check' }, (newItemData: any) => onUpdateFull(index, newItemData));
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
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
            <PhoneticInput value={currentItem.name?.mr || ''} onChange={(val) => handleLocalUpdate('name', { ...currentItem.name, mr: val })} onEnglishChange={(val) => handleLocalUpdate('name', { ...currentItem.name, en: val })} englishValue={currentItem.name?.en || ''} />
          </div>
        </div>
      )}
    </div>
  );
};

const ImpactEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { value: '', label: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: 'Users' };
  const itemHist = useBlockHistory(defaultItem, { ...itemData, icon: itemData?.icon || 'Users' }, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.label?.mr || `Item ${index + 1}`}
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
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <input type="text" value={currentItem.value || ''} onChange={(e) => handleLocalUpdate('value', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" placeholder="100+" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Label</label>
            <PhoneticInput value={currentItem.label?.mr || ''} onChange={(val) => handleLocalUpdate('label', { ...currentItem.label, mr: val })} onEnglishChange={(val) => handleLocalUpdate('label', { ...currentItem.label, en: val })} englishValue={currentItem.label?.en || ''} />
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



export const HeroWithPricingListEditor: React.FC<HeroWithPricingListEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = (expandedSection || 'hero').replace('template_', '');

  const [expandedFixedBlocks, setExpandedFixedBlocks] = useState<Record<string, boolean>>({
    hero_content: true,
    services_header: true,
    about_content: true,
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

  const updateArrayItemFull = (field: string, index: number, newItemData: any) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    const newArray = [...arr];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: string, index: number) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    handleChange(field, arr.filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: string, index: number, direction: number) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
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
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    handleChange(field, [...arr, defaultItem]);
    setExpandedItemIndex(arr.length);
  };

  const heroHist = useBlockHistory(
    {
      badgeTitle: { mr: 'व्यावसायिक प्रशिक्षण', en: 'Vocational Training' },
      badgeIcon: '',
      title: { mr: '', en: '' },
      subtitle: { mr: '', en: '' },
      heroImage: ''
    },
    {
      badgeTitle: safeData.sectionHeaders?.training?.title?.mr ? safeData.sectionHeaders.training.title : { mr: 'व्यावसायिक प्रशिक्षण', en: 'Vocational Training' },
      badgeIcon: safeData.sectionHeaders?.training?.icon || 'Scissors',
      title: safeData.hero?.title || { mr: '', en: '' },
      subtitle: safeData.hero?.subtitle || { mr: '', en: '' },
      heroImage: safeData.hero?.heroImage || ''
    },
    (newCombined: any) => {
      handleChange('hero', {
        ...safeData.hero,
        title: newCombined.title,
        subtitle: newCombined.subtitle,
        heroImage: newCombined.heroImage
      });
      handleChange('sectionHeaders', {
        ...safeData.sectionHeaders,
        training: {
          ...(safeData.sectionHeaders?.training || {}),
          title: newCombined.badgeTitle,
          icon: newCombined.badgeIcon
        }
      });
    }
  );
  const currentHero = heroHist.value;
  const updateHero = (key: string, value: any) => {
    heroHist.update({ ...currentHero, [key]: value });
  };

  const aboutHist = useBlockHistory(
    {
      aboutTitle: { mr: 'उपक्रमाविषयी', en: 'About the Initiative' },
      aboutIcon: '',
      description: { mr: '', en: '' }
    },
    {
      aboutTitle: safeData.sectionHeaders?.about?.title?.mr ? safeData.sectionHeaders.about.title : { mr: 'उपक्रमाविषयी', en: 'About the Initiative' },
      aboutIcon: safeData.sectionHeaders?.about?.icon || 'Star',
      description: safeData.hero?.description || { mr: '', en: '' }
    },
    (newAbout: any) => {
      handleChange('hero', {
        ...safeData.hero,
        description: newAbout.description
      });
      handleChange('sectionHeaders', {
        ...safeData.sectionHeaders,
        about: {
          ...(safeData.sectionHeaders?.about || {}),
          title: newAbout.aboutTitle,
          icon: newAbout.aboutIcon
        }
      });
    }
  );
  const currentAbout = aboutHist.value;
  const updateAbout = (key: string, value: any) => {
    aboutHist.update({ ...currentAbout, [key]: value });
  };

  const servicesHeaderHist = useBlockHistory(
    { title: { mr: 'प्रशिक्षण व सेवा', en: 'Training & Services' } },
    { title: safeData.sectionHeaders?.services?.title?.mr ? safeData.sectionHeaders.services.title : (safeData.sectionHeaders?.impact?.title?.mr ? safeData.sectionHeaders.impact.title : { mr: 'प्रशिक्षण व सेवा', en: 'Training & Services' }) },
    (newHeader: any) => {
      handleChange('sectionHeaders', {
        ...safeData.sectionHeaders,
        services: {
          ...(safeData.sectionHeaders?.services || {}),
          title: newHeader.title
        }
      });
    }
  );
  const currentServicesHeader = servicesHeaderHist.value;

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Hero Section Configuration" 
            isExpanded={!!expandedFixedBlocks['hero_content']} 
            onToggle={() => toggleFixedBlock('hero_content')} 
            history={heroHist}
          />
          {!!expandedFixedBlocks['hero_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Badge Icon" 
                value={currentHero.badgeIcon || ''} 
                onChange={(val) => updateHero('badgeIcon', val)} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Title</label>
                <PhoneticInput 
                  value={currentHero.badgeTitle?.mr || ''} 
                  onChange={(val) => updateHero('badgeTitle', { ...currentHero.badgeTitle, mr: val })} 
                  onEnglishChange={(val) => updateHero('badgeTitle', { ...currentHero.badgeTitle, en: val })} 
                  englishValue={currentHero.badgeTitle?.en || ''} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput 
                  value={currentHero.title?.mr || ''} 
                  onChange={(val) => updateHero('title', { ...currentHero.title, mr: val })} 
                  onEnglishChange={(val) => updateHero('title', { ...currentHero.title, en: val })} 
                  englishValue={currentHero.title?.en || ''} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput 
                  value={currentHero.subtitle?.mr || ''} 
                  onChange={(val) => updateHero('subtitle', { ...currentHero.subtitle, mr: val })} 
                  onEnglishChange={(val) => updateHero('subtitle', { ...currentHero.subtitle, en: val })} 
                  englishValue={currentHero.subtitle?.en || ''} 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {currentHero.heroImage ? (
                    <>
                      <img
                        src={currentHero.heroImage.startsWith('http') ? currentHero.heroImage : `http://localhost:5000${currentHero.heroImage.startsWith('/') ? '' : '/'}${currentHero.heroImage}`}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Click to change</span>
                      </div>
                    </>
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
                  onSelect={(url: string) => { updateHero('heroImage', url); setMediaOpen_heroImage(false); }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'about') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="About the Initiative" 
            isExpanded={!!expandedFixedBlocks['about_content']} 
            onToggle={() => toggleFixedBlock('about_content')} 
            history={aboutHist}
          />
          {!!expandedFixedBlocks['about_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Section Icon" 
                value={currentAbout.aboutIcon || ''} 
                onChange={(val) => updateAbout('aboutIcon', val)} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={currentAbout.aboutTitle?.mr || ''} 
                  onChange={(val) => updateAbout('aboutTitle', { ...currentAbout.aboutTitle, mr: val })} 
                  onEnglishChange={(val) => updateAbout('aboutTitle', { ...currentAbout.aboutTitle, en: val })} 
                  englishValue={currentAbout.aboutTitle?.en || ''} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">About Description</label>
                <PhoneticInput 
                  value={currentAbout.description?.mr || ''} 
                  onChange={(val) => updateAbout('description', { ...currentAbout.description, mr: val })} 
                  onEnglishChange={(val) => updateAbout('description', { ...currentAbout.description, en: val })} 
                  englishValue={currentAbout.description?.en || ''} 
                  multiline 
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Impact Stats</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(Array.isArray(safeData.impact) ? safeData.impact : (safeData.impact ? [safeData.impact] : [])).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(Array.isArray(safeData.impact) ? safeData.impact : (safeData.impact ? [safeData.impact] : [])).map((item: any, index: number) => (
            <ImpactEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('impact', i, newD)}
              onRemove={() => removeArrayItem('impact', index)}
              onMoveUp={() => moveArrayItem('impact', index, -1)}
              onMoveDown={() => moveArrayItem('impact', index, 1)}
              isFirst={index === 0} isLast={index === (Array.isArray(safeData.impact) ? safeData.impact : (safeData.impact ? [safeData.impact] : [])).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('impact', { value: '', label: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Impact Stat
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'services') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Services Section Header" 
            isExpanded={!!expandedFixedBlocks['services_header']} 
            onToggle={() => toggleFixedBlock('services_header')} 
            history={servicesHeaderHist}
          />
          {!!expandedFixedBlocks['services_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={currentServicesHeader.title?.mr || ''} 
                  onChange={(val) => servicesHeaderHist.update({ ...currentServicesHeader, title: { ...currentServicesHeader.title, mr: val } })} 
                  onEnglishChange={(val) => servicesHeaderHist.update({ ...currentServicesHeader, title: { ...currentServicesHeader.title, en: val } })} 
                  englishValue={currentServicesHeader.title?.en || ''} 
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Services List</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.services || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.services || []).map((item: any, index: number) => (
            <ServicesEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('services', i, newD)}
              onRemove={() => removeArrayItem('services', index)}
              onMoveUp={() => moveArrayItem('services', index, -1)}
              onMoveDown={() => moveArrayItem('services', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.services || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('services', { name: { mr: '', en: '' }, icon: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Services Item
          </button>
        </div>
      </div>
    );
  }



  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
