const fs = require('fs');
const path = require('path');

// ============================================================
// BLOCK FIELD DEFINITIONS  (derived from actual DB data)
// ============================================================
const BLOCK_FIELDS = {
  stats: [
    { key: 'value', type: 'text',     label: 'Value' },
    { key: 'label', type: 'phonetic', label: 'Label' },
    { key: 'icon',  type: 'icon',     label: 'Icon' }
  ],
  keyFunctions: [
    { key: 'title', type: 'phonetic',           label: 'Title' },
    { key: 'desc',  type: 'phonetic_multiline', label: 'Description' },
    { key: 'icon',  type: 'icon',               label: 'Icon' }
  ],
  features: [
    { key: 'title', type: 'phonetic',           label: 'Title' },
    { key: 'desc',  type: 'phonetic_multiline', label: 'Description' },
    { key: 'icon',  type: 'icon',               label: 'Icon' }
  ],
  highlights: [
    { key: 'title', type: 'phonetic',           label: 'Title' },
    { key: 'desc',  type: 'phonetic_multiline', label: 'Description' },
    { key: 'icon',  type: 'icon',               label: 'Icon' }
  ],
  contentSections: [
    { key: 'image',         type: 'image_preview',      label: 'Image' },
    { key: 'imagePosition', type: 'position_toggle',    label: 'Image Position' },
    { key: 'title',         type: 'phonetic',           label: 'Title' },
    { key: 'description',   type: 'phonetic_multiline', label: 'Description' }
  ],
  gallery: [
    { key: 'image',   type: 'image_preview', label: 'Image' },
    { key: 'caption', type: 'phonetic',       label: 'Caption' }
  ],
  timings: [
    { key: 'day',   type: 'phonetic', label: 'Day' },
    { key: 'hours', type: 'phonetic', label: 'Hours' }
  ],
  productionStats: [
    { key: 'value', type: 'text',     label: 'Value' },
    { key: 'label', type: 'phonetic', label: 'Label' },
    { key: 'unit',  type: 'text',     label: 'Unit' }
  ],
  activeProjects: [
    { key: 'image', type: 'image_preview',              label: 'Image' },
    { key: 'title', type: 'phonetic',           label: 'Title' },
    { key: 'desc',  type: 'phonetic_multiline', label: 'Description' }
  ],
  impactStatement: [
    { key: 'image', type: 'image_preview',              label: 'Image' },
    { key: 'title', type: 'phonetic',           label: 'Title' },
    { key: 'desc',  type: 'phonetic_multiline', label: 'Description' }
  ],
  coreProtocols: [
    { key: 'title', type: 'phonetic',           label: 'Title' },
    { key: 'desc',  type: 'phonetic_multiline', label: 'Description' }
  ],
  infrastructure: [
    { key: 'image',   type: 'image_preview',              label: 'Image' },
    { key: 'name',    type: 'phonetic',           label: 'Name' },
    { key: 'details', type: 'phonetic_multiline', label: 'Details' }
  ],
  menuHighlights: [
    { key: 'mr', type: 'text', label: 'Marathi' },
    { key: 'en', type: 'text', label: 'English' }
  ],
  services: [
    { key: 'name', type: 'phonetic', label: 'Name' },
    { key: 'icon', type: 'icon',     label: 'Icon' }
  ],
  impact: [
    { key: 'title', type: 'phonetic',           label: 'Title' },
    { key: 'desc',  type: 'phonetic_multiline', label: 'Description' },
    { key: 'icon',  type: 'icon',               label: 'Icon' }
  ],
  technicalFocus: [
    { key: 'mr', type: 'text', label: 'Marathi' },
    { key: 'en', type: 'text', label: 'English' }
  ],
  processStats: [
    { key: 'value',  type: 'text',     label: 'Value' },
    { key: 'label',  type: 'phonetic', label: 'Label' },
    { key: 'isText', type: 'bool',     label: 'Is Text?' }
  ],
  venueFeatures: [
    { key: 'title', type: 'phonetic', label: 'Title' },
    { key: 'icon',  type: 'icon',     label: 'Icon' }
  ]
};

const DEFAULT_FIELDS = [
  { key: 'title', type: 'phonetic',           label: 'Title' },
  { key: 'desc',  type: 'phonetic_multiline', label: 'Description' },
  { key: 'icon',  type: 'icon',               label: 'Icon' }
];

// Templates - blocks with { object: true } are single objects not arrays
const templates = [
  { name: 'BasicFeatureGrid',           blocks: ['keyFunctions', 'stats'] },
  { name: 'CardsAndVerticalTimeline',   blocks: ['keyFunctions', 'stats'] },
  { name: 'ContactInfoGrid',            blocks: ['stats', 'keyFunctions', { name: 'contactInfo', object: true }] },
  { name: 'ContentWithAccordion',       blocks: ['keyFunctions', 'stats'] },
  { name: 'ContentWithRightSidebar',    blocks: ['stats', 'keyFunctions'] },
  { name: 'ContentWithTabs',            blocks: ['keyFunctions', 'stats'] },
  { name: 'HeroBannerWithArticles',     blocks: ['keyFunctions', 'stats'] },
  { name: 'HeroBannerWithBadges',       blocks: ['stats', 'keyFunctions'] },
  { name: 'HeroBannerWithMedia',        blocks: ['stats', 'keyFunctions'] },
  { name: 'HeroFeatureList',            blocks: ['highlights', 'contentSections'] },
  { name: 'HeroFeaturesTimelineLayout', blocks: ['stats', 'keyFunctions', { name: 'contactInfo', object: true }] },
  { name: 'HeroSplitTimeline',          blocks: ['coreProtocols', 'infrastructure'] },
  { name: 'HeroStatsGrid',              blocks: ['features', 'gallery', 'timings'] },
  { name: 'HeroThreeColGrid',           blocks: ['productionStats', 'activeProjects', 'impactStatement'] },
  { name: 'HeroWithMenuGrid',           blocks: ['menuHighlights', { name: 'motto', object: true }] },
  { name: 'HeroWithPricingList',        blocks: ['services', 'impact'] },
  { name: 'HeroWithProcessGrid',        blocks: [{ name: 'stats', fieldOverride: 'processStats' }, 'technicalFocus'] },
  { name: 'IconsListWithTimeline',      blocks: ['stats', 'keyFunctions'] },
  { name: 'MinimalIconGrid',            blocks: ['stats', 'keyFunctions'] },
  { name: 'SideBySideListCards',        blocks: ['stats', 'keyFunctions'] },
  { name: 'TwoColEventCards',           blocks: ['venueFeatures'] }
];

const toTitle = (s) => s.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()).trim();

const renderField = ({ key, type, label }) => {
  if (type === 'text') return `
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">${label}</label>
            <input type="text" value={currentItem.${key} || ''} onChange={(e) => handleLocalUpdate('${key}', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>`;
  if (type === 'phonetic') return `
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">${label}</label>
            <PhoneticInput value={currentItem.${key}?.mr || ''} onChange={(val) => handleLocalUpdate('${key}', { ...currentItem.${key}, mr: val })} onEnglishChange={(val) => handleLocalUpdate('${key}', { ...currentItem.${key}, en: val })} englishValue={currentItem.${key}?.en || ''} />
          </div>`;
  if (type === 'phonetic_multiline') return `
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">${label}</label>
            <PhoneticInput value={currentItem.${key}?.mr || ''} onChange={(val) => handleLocalUpdate('${key}', { ...currentItem.${key}, mr: val })} onEnglishChange={(val) => handleLocalUpdate('${key}', { ...currentItem.${key}, en: val })} englishValue={currentItem.${key}?.en || ''} multiline />
          </div>`;
  if (type === 'icon') return `
          <IconPickerInput label="${label}" value={currentItem.${key} || ''} onChange={(val) => handleLocalUpdate('${key}', val)} />`;
  if (type === 'image') return `
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">${label}</label>
            <input type="text" value={currentItem.${key} || ''} onChange={(e) => handleLocalUpdate('${key}', e.target.value)} placeholder="/uploads/..." className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>`;
  if (type === 'image_preview') return `
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">${label}</label>
            <div
              className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
              onClick={() => setMediaOpen_${key}(true)}
            >
              {currentItem.${key} ? (
                <img
                  src={currentItem.${key}.startsWith('http') ? currentItem.${key} : \`http://localhost:5000\${currentItem.${key}.startsWith('/') ? '' : '/'}\${currentItem.${key}}\`}
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
              isOpen={mediaOpen_${key}}
              onClose={() => setMediaOpen_${key}(false)}
              onSelect={(url: string) => { handleLocalUpdate('${key}', url); setMediaOpen_${key}(false); }}
            />
          </div>`;
  if (type === 'position_toggle') return `
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">${label}</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLocalUpdate('${key}', 'left')}
                className={\`flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-colors \${currentItem.${key} === 'left' || !currentItem.${key} ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-300'}\`}
              >
                ◀ Left
              </button>
              <button
                type="button"
                onClick={() => handleLocalUpdate('${key}', 'right')}
                className={\`flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-colors \${currentItem.${key} === 'right' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-300'}\`}
              >
                Right ▶
              </button>
            </div>
          </div>`;
  if (type === 'bool') return `
          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" checked={!!currentItem.${key}} onChange={(e) => handleLocalUpdate('${key}', e.target.checked)} className="w-4 h-4 accent-emerald-600" />
            <label className="text-xs font-semibold text-slate-500 uppercase">${label}</label>
          </div>`;
  return '';
};

const getItemComponent = (blockName, fields) => {
  const compName = blockName.charAt(0).toUpperCase() + blockName.slice(1) + 'EditorItem';
  const defaultItem = `{ ${fields.map(f => {
    if (f.type === 'phonetic' || f.type === 'phonetic_multiline') return `${f.key}: { mr: '', en: '' }`;
    if (f.type === 'bool') return `${f.key}: false`;
    return `${f.key}: ''`;
  }).join(', ')} }`;
  const renderedFields = fields.map(f => renderField(f)).join('');
  // Collect all image_preview keys - each needs its own media popup state
  const imagePreviewKeys = fields.filter(f => f.type === 'image_preview').map(f => f.key);
  const hasMediaPopup = imagePreviewKeys.length > 0;

  const mediaStateDeclarations = imagePreviewKeys.map(k => `  const [mediaOpen_${k}, setMediaOpen_${k}] = useState(false);`).join('\n');
  const mediaImport = hasMediaPopup ? `\nimport { MediaLibraryPopup } from '../MediaLibraryPopup';` : '';

  return `
const ${compName} = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = ${defaultItem};
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;
${mediaStateDeclarations}

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.label?.mr || currentItem.name?.mr || currentItem.mr || \`Item \${index + 1}\`}
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
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">${renderedFields}
        </div>
      )}
    </div>
  );
};
`;
};

const CONTACT_INFO_SECTION = `
  if (activeSection === 'contactInfo') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-700 border-b border-slate-200 pb-2">Contact Information</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Address</label>
            <PhoneticInput value={safeData.contactInfo?.address?.mr || ''} onChange={(val) => handleChange('contactInfo', { ...safeData.contactInfo, address: { ...safeData.contactInfo?.address, mr: val } })} onEnglishChange={(val) => handleChange('contactInfo', { ...safeData.contactInfo, address: { ...safeData.contactInfo?.address, en: val } })} englishValue={safeData.contactInfo?.address?.en || ''} multiline />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone</label>
              <input type="text" value={safeData.contactInfo?.phone || ''} onChange={(e) => handleChange('contactInfo', { ...safeData.contactInfo, phone: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
              <input type="text" value={safeData.contactInfo?.email || ''} onChange={(e) => handleChange('contactInfo', { ...safeData.contactInfo, email: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
`;

const MOTTO_SECTION = `
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
`;

for (const t of templates) {
  const normalizedBlocks = t.blocks.map(b => typeof b === 'string' ? { name: b } : b);
  const arrayBlocks = normalizedBlocks.filter(b => !b.object);

  // Detect if any block needs MediaLibraryPopup
  const needsMediaPopup = arrayBlocks.some(block => {
    const fieldDef = BLOCK_FIELDS[block.fieldOverride || block.name] || DEFAULT_FIELDS;
    return fieldDef.some(f => f.type === 'image_preview');
  });

  let fileContent = `import React, { useState, useEffect } from 'react';
import { GeneralSettingsBlock } from './shared/GeneralSettingsBlock';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';${needsMediaPopup ? "\nimport { MediaLibraryPopup } from '../MediaLibraryPopup';" : ''}

interface ${t.name}EditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}
`;

  for (const block of arrayBlocks) {
    const fieldDef = BLOCK_FIELDS[block.fieldOverride || block.name] || DEFAULT_FIELDS;
    fileContent += getItemComponent(block.name, fieldDef);
  }

  fileContent += `
export const ${t.name}Editor: React.FC<${t.name}EditorProps> = ({ data, updateData, blockId, expandedSection }) => {
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
`;

  for (const block of normalizedBlocks) {
    if (block.object && block.name === 'contactInfo') {
      fileContent += CONTACT_INFO_SECTION;
    } else if (block.object && block.name === 'motto') {
      fileContent += MOTTO_SECTION;
    } else if (!block.object) {
      const compName = block.name.charAt(0).toUpperCase() + block.name.slice(1) + 'EditorItem';
      const title = toTitle(block.name);
      const fieldDef = BLOCK_FIELDS[block.fieldOverride || block.name] || DEFAULT_FIELDS;
      const defaultItem = `{ ${fieldDef.map(f => {
        if (f.type === 'phonetic' || f.type === 'phonetic_multiline') return `${f.key}: { mr: '', en: '' }`;
        if (f.type === 'bool') return `${f.key}: false`;
        return `${f.key}: ''`;
      }).join(', ')} }`;

      fileContent += `
  if (activeSection === '${block.name}') {
    return (
      <div className="pb-10 space-y-4">
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">${title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.${block.name} || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.${block.name} || []).map((item: any, index: number) => (
            <${compName}
              key={\`item-\${index}\`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('${block.name}', i, newD)}
              onRemove={() => removeArrayItem('${block.name}', index)}
              onMoveUp={() => moveArrayItem('${block.name}', index, -1)}
              onMoveDown={() => moveArrayItem('${block.name}', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.${block.name} || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('${block.name}', ${defaultItem})} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add ${title} Item
          </button>
        </div>
      </div>
    );
  }
`;
    }
  }

  fileContent += `
  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
`;

  fs.writeFileSync(path.join(__dirname, 'src/components/editors', t.name + 'Editor.tsx'), fileContent);
  console.log('Generated', t.name + 'Editor.tsx');
}