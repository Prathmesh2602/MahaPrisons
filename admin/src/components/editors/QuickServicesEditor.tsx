import React, { useState } from 'react';
import axios from 'axios';
import { Phone, ArrowUp, ArrowDown, Trash2, Plus, RefreshCcw, Save, Undo, Redo, Upload, FileText, Link2, Send } from 'lucide-react';
import * as icons from 'lucide-react';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { IconPicker } from '../IconPicker';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { useAuth } from '../../context/AuthContext';

const ImportantLinkBlock = ({
  index, linkData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onTranslate,
  isExpanded, onToggle
}: any) => {
  const defaultLink = { title: { mr: "", en: "" }, href: "" };

  const linkHist = useBlockHistory(
    defaultLink,
    linkData,
    (newLinkData) => onUpdateFull(index, newLinkData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newLink = JSON.parse(JSON.stringify(linkHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newLink[parent]) newLink[parent] = {};
      newLink[parent][child] = value;
    } else {
      newLink[key] = value;
    }
    linkHist.update(newLink);
  };

  const currentLink = linkHist.value;

  return (
    <div className="border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        className="p-2"
        title={currentLink.title?.mr || 'Unnamed'}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={linkHist}
        rightAction={
          <div className="flex items-center border border-slate-200 rounded overflow-hidden bg-white">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowUp size={12} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowDown size={12} /></button>
            <button onClick={onRemove} className="p-1 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 transition-colors"><Trash2 size={12} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col space-y-2 border-l-4 border-l-blue-500 rounded-b-lg">
          <PhoneticInput label="Title (Marathi)" value={currentLink.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} onTranslate={(text) => onTranslate(text, index, 'title.en')} />
          <PhoneticInput label="Title (English)" transliterate={false} value={currentLink.title?.en} onChange={(val) => handleLocalUpdate('title.en', val)} />
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">URL</label>
            <input type="text" placeholder="https://..." className="w-full text-sm border border-slate-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" value={currentLink.href} onChange={(e) => handleLocalUpdate('href', e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
};

const HelplineBlock = ({
  index, helpData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onTranslate,
  isExpanded, onToggle
}: any) => {
  const defaultHelp = { title: { mr: "", en: "" }, phone: "", desc: { mr: "", en: "" } };

  const helpHist = useBlockHistory(
    defaultHelp,
    helpData,
    (newHelpData) => onUpdateFull(index, newHelpData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newHelp = JSON.parse(JSON.stringify(helpHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newHelp[parent]) newHelp[parent] = {};
      newHelp[parent][child] = value;
    } else {
      newHelp[key] = value;
    }
    helpHist.update(newHelp);
  };

  const currentHelp = helpHist.value;
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const IconComponent = (icons as any)[currentHelp.icon || 'Phone'];

  return (
    <div className="border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        className="p-2"
        title={currentHelp.title?.mr || 'Unnamed'}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={helpHist}
        rightAction={
          <div className="flex items-center border border-slate-200 rounded overflow-hidden bg-white">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowUp size={12} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowDown size={12} /></button>
            <button onClick={onRemove} className="p-1 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 transition-colors"><Trash2 size={12} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col space-y-2 border-l-4 border-l-rose-500 rounded-b-lg">
          <PhoneticInput label="Title (Marathi)" value={currentHelp.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} onTranslate={(text) => onTranslate(text, index, 'title.en')} />
          <PhoneticInput label="Title (English)" transliterate={false} value={currentHelp.title?.en} onChange={(val) => handleLocalUpdate('title.en', val)} />
          
          <PhoneticInput label="Phone Number" transliterate={false} value={currentHelp.phone} onChange={(val) => handleLocalUpdate('phone', val)} />
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Icon</label>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border border-slate-300 flex items-center justify-center bg-slate-50 text-slate-600">
                {IconComponent ? <IconComponent size={20} /> : <icons.Phone size={20} />}
              </div>
              <Button
                variant="outline"
                onClick={() => setIsIconPickerOpen(true)}
                className="h-10 px-4"
              >
                Change Icon
              </Button>
            </div>
            
            <IconPicker
              isOpen={isIconPickerOpen}
              onClose={() => setIsIconPickerOpen(false)}
              selectedIcon={currentHelp.icon || 'Phone'}
              onSelect={(iconName) => {
                handleLocalUpdate('icon', iconName);
                setIsIconPickerOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};


const HeaderBlock = ({ headerData, onUpdateFull, onTranslate, isExpanded, onToggle }: any) => {
  const defaultHeader = { 
    title: { mr: "जलद सेवा आणि महत्त्वाच्या लिंक्स", en: "Quick Services & Important Links" }, 
    subtitle: { mr: "नागरिकांच्या सुविधेसाठी महत्त्वाचे संपर्क क्रमांक आणि संबंधित शासकीय संकेतस्थळांच्या लिंक्स खालीलप्रमाणे उपलब्ध आहेत.", en: "Important contact numbers and related government website links are available below for the convenience of citizens." } 
  };

  const headerHist = useBlockHistory(
    defaultHeader,
    headerData,
    (newHeaderData) => onUpdateFull(newHeaderData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newHeader = JSON.parse(JSON.stringify(headerHist.value));
    const [parent, child] = key.split('.');
    if (!newHeader[parent]) newHeader[parent] = {};
    newHeader[parent][child] = value;
    headerHist.update(newHeader);
  };

  const currentHeader = headerHist.value;

  return (
    <div className="border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        className="p-2"
        title="Section Header"
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={headerHist}
      />
      {isExpanded && (
        <div className="p-2 bg-white border-t border-slate-200 border-l-4 border-l-indigo-500">
          <div className="flex flex-col space-y-2">
            <PhoneticInput label="Title (Marathi)" value={currentHeader.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} onTranslate={(text) => onTranslate(text, 'title.en')} />
            <PhoneticInput label="Title (English)" transliterate={false} value={currentHeader.title?.en} onChange={(val) => handleLocalUpdate('title.en', val)} />
            
            <PhoneticInput multiline label="Subtitle (Marathi)" value={currentHeader.subtitle?.mr} onChange={(val) => handleLocalUpdate('subtitle.mr', val)} onTranslate={(text) => onTranslate(text, 'subtitle.en')} />
            <PhoneticInput multiline label="Subtitle (English)" transliterate={false} value={currentHeader.subtitle?.en} onChange={(val) => handleLocalUpdate('subtitle.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const QuickServicesEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const defaultImportantLinks = [
    { title: { mr: "राष्ट्रीय ई-प्रिझन पोर्टल", en: "National e-Prison Portal" }, href: "https://eprisons.nic.in/" }
  ];

  const defaultHelplines = [
    { title: { mr: "तक्रार निवारण", en: "Grievance Redressal" }, phone: "1800-233-0000", icon: "Phone" }
  ];

  const getLegacyIcon = (idx: number) => {
    switch (idx) {
      case 0: return 'UserCheck';
      case 1: return 'ShieldAlert';
      case 2: return 'Shield';
      case 3: return 'ShieldAlert';
      case 4: return 'HeartHandshake';
      case 5: return 'HelpCircle';
      default: return 'Phone';
    }
  };

  const processedHelplines = initialData?.helplines 
    ? initialData.helplines.map((h: any, idx: number) => ({
        ...h,
        icon: h.icon || getLegacyIcon(idx)
      }))
    : defaultHelplines;

  const safeData = {
    header: initialData?.header || { 
      title: { mr: "जलद सेवा आणि महत्त्वाच्या लिंक्स", en: "Quick Services & Important Links" }, 
      subtitle: { mr: "नागरिकांच्या सुविधेसाठी महत्त्वाचे संपर्क क्रमांक आणि संबंधित शासकीय संकेतस्थळांच्या लिंक्स खालीलप्रमाणे उपलब्ध आहेत.", en: "Important contact numbers and related government website links are available below for the convenience of citizens." } 
    },
    important_links: initialData?.important_links || defaultImportantLinks,
    helplines: processedHelplines
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

  const [expandedLink, setExpandedLink] = useState<number | null>(null);
  const [expandedHelpline, setExpandedHelpline] = useState<number | null>(null);
  const [expandedHeader, setExpandedHeader] = useState(true);

  const updateItemFull = (category: 'important_links' | 'helplines', index: number, fullItemData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData[category]) newData[category] = category === 'important_links' ? defaultImportantLinks : defaultHelplines;
    newData[category][index] = fullItemData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateItemField = (category: 'important_links' | 'helplines', index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData[category]) newData[category] = category === 'important_links' ? defaultImportantLinks : defaultHelplines;
    
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData[category][index][parent]) newData[category][index][parent] = {};
      newData[category][index][parent][child] = value;
    } else {
      newData[category][index][key] = value;
    }
    
    setData(newData);
    updateHistoryState(newData);
  };

  const updateHeaderFull = (fullHeaderData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.header = fullHeaderData;
    setData(newData);
    updateHistoryState(newData);
  };

  const handleHeaderTranslate = async (text: string, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) {
        const newData = JSON.parse(JSON.stringify(data));
        if (!newData.header) newData.header = { title: { mr: "", en: "" }, subtitle: { mr: "", en: "" } };
        const [parent, child] = targetKey.split('.');
        if (!newData.header[parent]) newData.header[parent] = {};
        newData.header[parent][child] = translatedText;
        updateHeaderFull(newData.header);
      }
    } catch (err) { console.error('Translation failed', err); }
  };

  const addItem = (category: 'important_links' | 'helplines') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData[category]) newData[category] = [];
    if (category === 'important_links') {
      newData[category].push({ title: { mr: "", en: "" }, href: "" });
    } else {
      newData[category].push({ title: { mr: "", en: "" }, phone: "", icon: "Phone" });
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const removeItem = (category: 'important_links' | 'helplines', index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[category].splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveItem = (category: 'important_links' | 'helplines', index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    const items = newData[category];
    if (direction === 'up' && index > 0) {
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index + 1], items[index]] = [items[index], items[index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslate = async (text: string, category: 'important_links' | 'helplines', index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateItemField(category, index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  const linksList = data.important_links || defaultImportantLinks;
  const helplinesList = data.helplines || defaultHelplines;

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Quick Services & Links"
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

      {/* Header Section */}
      <div className="w-full">
        <HeaderBlock
          headerData={data.header}
          onUpdateFull={updateHeaderFull}
          onTranslate={(text: string, targetKey: string) => handleHeaderTranslate(text, targetKey)}
          isExpanded={expandedHeader}
          onToggle={() => setExpandedHeader(!expandedHeader)}
        />
      </div>

      {/* Helplines Section */}
      <div className="w-full">
        <h3 className="text-sm font-semibold text-slate-700 mb-2 border-b pb-2">Helpline Services</h3>
        <div className="space-y-2">
          {helplinesList.map((help: any, index: number) => (
            <HelplineBlock
              key={index}
              index={index}
              helpData={help}
              onUpdateFull={(idx: number, newHelpData: any) => updateItemFull('helplines', idx, newHelpData)}
              onRemove={() => removeItem('helplines', index)}
              onMoveUp={() => moveItem('helplines', index, 'up')}
              onMoveDown={() => moveItem('helplines', index, 'down')}
              isFirst={index === 0}
              isLast={index === helplinesList.length - 1}
              onTranslate={(text: string, idx: number, targetKey: string) => handleTranslate(text, 'helplines', idx, targetKey)}
              isExpanded={expandedHelpline === index}
              onToggle={() => setExpandedHelpline(expandedHelpline === index ? null : index)}
            />
          ))}
          <Button onClick={() => addItem('helplines')} variant="secondary" className="w-full text-xs h-8"><Plus size={12} className="mr-2" /> Add Helpline</Button>
        </div>
      </div>

      <hr className="border-t border-dashed border-slate-200 my-2" />

      {/* Important Links Section */}
      <div className="w-full">
        <h3 className="text-sm font-semibold text-slate-700 mb-2 border-b pb-2">Important Links</h3>
        <div className="space-y-2">
          {linksList.map((link: any, index: number) => (
            <ImportantLinkBlock
              key={index}
              index={index}
              linkData={link}
              onUpdateFull={(idx: number, newLinkData: any) => updateItemFull('important_links', idx, newLinkData)}
              onRemove={() => removeItem('important_links', index)}
              onMoveUp={() => moveItem('important_links', index, 'up')}
              onMoveDown={() => moveItem('important_links', index, 'down')}
              isFirst={index === 0}
              isLast={index === linksList.length - 1}
              onTranslate={(text: string, idx: number, targetKey: string) => handleTranslate(text, 'important_links', idx, targetKey)}
              isExpanded={expandedLink === index}
              onToggle={() => setExpandedLink(expandedLink === index ? null : index)}
            />
          ))}
          <Button onClick={() => addItem('important_links')} variant="secondary" className="w-full text-xs h-8"><Plus size={12} className="mr-2" /> Add Link</Button>
        </div>
      </div>

    </div>
  );
};
