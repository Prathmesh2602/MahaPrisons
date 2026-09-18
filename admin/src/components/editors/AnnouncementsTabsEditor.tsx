import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Send, Save, Plus, FileText, Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

const AnnouncementItemBlock = ({
  tabIndex, itemIndex, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onTranslate,
  isExpanded, onToggle, onMediaOpen
}: any) => {
  const defaultItem = { text: { mr: "", en: "" }, date: new Date().toLocaleDateString('en-GB'), isNew: true, href: "#" };

  const itemHist = useBlockHistory(
    defaultItem,
    itemData,
    (newItemData) => onUpdateFull(itemIndex, newItemData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newItem[parent]) newItem[parent] = {};
      newItem[parent][child] = value;
    } else {
      newItem[key] = value;
    }
    itemHist.update(newItem);
  };

  const currentItem = itemHist.value;

  return (
    <div className="border border-slate-200 rounded bg-slate-50">
      <EditorBlockHeader
        title={`${currentItem.text?.mr?.substring(0, 30) || 'New Item'}...`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        className="bg-transparent py-2 px-2 border-b-0"
        rightAction={
          <div className="flex items-center border border-slate-200 rounded overflow-hidden bg-white">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowUp size={12} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowDown size={12} /></button>
            <button onClick={onRemove} className="p-1 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 transition-colors"><Trash2 size={12} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-2 border-t border-slate-200 space-y-2 bg-white">
          <div className="space-y-1">
            <PhoneticInput multiline label="Notice Text (Marathi)" value={currentItem.text?.mr} onChange={(val) => handleLocalUpdate('text.mr', val)} onTranslate={(text) => onTranslate(text, (val: string) => handleLocalUpdate('text.en', val))} />
            <PhoneticInput multiline label="Notice Text (English)" transliterate={false} value={currentItem.text?.en} onChange={(val) => handleLocalUpdate('text.en', val)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Date (DD/MM/YYYY)</label>
              <input type="text" className="w-full text-sm border border-slate-300 rounded p-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" value={currentItem.date} onChange={(e) => handleLocalUpdate('date', e.target.value)} />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" id={`isNew-${tabIndex}-${itemIndex}`} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" checked={currentItem.isNew} onChange={(e) => handleLocalUpdate('isNew', e.target.checked)} />
              <label htmlFor={`isNew-${tabIndex}-${itemIndex}`} className="text-xs font-medium text-slate-700 select-none cursor-pointer">Show "New" Badge</label>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Link / URL (Optional)</label>
            <div className="flex items-center gap-2">
              {currentItem.href && currentItem.href.toLowerCase().endsWith('.pdf') && (
                <div className="shrink-0 p-1.5 bg-red-50 text-red-500 rounded border border-red-100" title="PDF Document Attached">
                  <FileText size={16} />
                </div>
              )}
              <input type="text" placeholder="https://..." className="w-full text-sm border border-slate-300 rounded p-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" value={currentItem.href} onChange={(e) => handleLocalUpdate('href', e.target.value)} />
              <Button variant="outline" className="shrink-0 h-[34px] px-2" onClick={onMediaOpen} icon={<Upload size={14} />}>Upload File</Button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">If the link ends with .pdf, a download icon will be shown.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const TabBlock = ({
  tabIndex, tabData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onTranslate,
  isExpanded, onToggle, expandedItem, setExpandedItem, onMediaOpen
}: any) => {
  const defaultTab = { title: { mr: "नवीन टॅब", en: "New Tab" }, items: [] };

  const tabHist = useBlockHistory(
    defaultTab,
    tabData,
    (newTabData) => onUpdateFull(tabIndex, newTabData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newTab = JSON.parse(JSON.stringify(tabHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newTab[parent]) newTab[parent] = {};
      newTab[parent][child] = value;
    } else {
      newTab[key] = value;
    }
    tabHist.update(newTab);
  };

  const updateItemFull = (itemIndex: number, newItemData: any) => {
    const newTab = JSON.parse(JSON.stringify(tabHist.value));
    newTab.items[itemIndex] = newItemData;
    tabHist.update(newTab);
  };

  const handleAddItem = () => {
    const newTab = JSON.parse(JSON.stringify(tabHist.value));
    if (!newTab.items) newTab.items = [];
    newTab.items.push({
      text: { mr: "", en: "" },
      date: new Date().toLocaleDateString('en-GB'),
      isNew: true,
      href: "#"
    });
    tabHist.update(newTab);
  };

  const handleRemoveItem = (itemIndex: number) => {
    const newTab = JSON.parse(JSON.stringify(tabHist.value));
    newTab.items.splice(itemIndex, 1);
    tabHist.update(newTab);
  };

  const handleMoveItem = (itemIndex: number, direction: 'up' | 'down') => {
    const newTab = JSON.parse(JSON.stringify(tabHist.value));
    if (direction === 'up' && itemIndex > 0) {
      [newTab.items[itemIndex - 1], newTab.items[itemIndex]] = [newTab.items[itemIndex], newTab.items[itemIndex - 1]];
    } else if (direction === 'down' && itemIndex < newTab.items.length - 1) {
      [newTab.items[itemIndex + 1], newTab.items[itemIndex]] = [newTab.items[itemIndex], newTab.items[itemIndex + 1]];
    }
    tabHist.update(newTab);
  };

  const currentTab = tabHist.value;

  return (
    <div className="border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
      <EditorBlockHeader
        title={currentTab.title?.mr || `Tab ${tabIndex + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={tabHist}
        className="bg-slate-50 border-b-0 p-2"
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Up">
              <ArrowUp size={14} />
            </button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Down">
              <ArrowDown size={14} />
            </button>
            <button onClick={onRemove} className="p-1 text-red-600 hover:bg-red-50 disabled:opacity-30" title="Remove">
              <Trash2 size={14} />
            </button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="space-y-1 mb-2 border-l-4 border-l-blue-500 pl-3">
            <PhoneticInput label="Tab Title (Marathi)" value={currentTab.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} onTranslate={(text) => onTranslate(text, (val: string) => handleLocalUpdate('title.en', val))} />
            <PhoneticInput label="Tab Title (English)" transliterate={false} value={currentTab.title?.en} onChange={(val) => handleLocalUpdate('title.en', val)} />
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-semibold text-slate-700">Notices / Documents</h4>
            <Button onClick={handleAddItem} variant="secondary" size="sm" className="h-7 text-xs px-2"><Plus size={12} className="mr-1" /> Add Item</Button>
          </div>
          
          <div className="space-y-2">
            {currentTab.items?.map((item: any, itemIndex: number) => {
              const itemKey = `${tabIndex}-${itemIndex}`;
              const isItemExpanded = expandedItem === itemKey;
              return (
                <AnnouncementItemBlock
                  key={itemIndex}
                  tabIndex={tabIndex}
                  itemIndex={itemIndex}
                  itemData={item}
                  onUpdateFull={updateItemFull}
                  onRemove={() => handleRemoveItem(itemIndex)}
                  onMoveUp={() => handleMoveItem(itemIndex, 'up')}
                  onMoveDown={() => handleMoveItem(itemIndex, 'down')}
                  isFirst={itemIndex === 0}
                  isLast={itemIndex === currentTab.items.length - 1}
                  onTranslate={onTranslate}
                  isExpanded={isItemExpanded}
                  onToggle={() => setExpandedItem(isItemExpanded ? null : itemKey)}
                  onMediaOpen={() => onMediaOpen(tabIndex, itemIndex)}
                />
              );
            })}
            {(!currentTab.items || currentTab.items.length === 0) && (
              <div className="text-center p-2 text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-300 rounded">No items added to this tab.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const AnnouncementsTabsEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const defaultTabs = [
    { title: { mr: "भरती", en: "Recruitment" }, items: [] },
    { title: { mr: "निविदा", en: "Tenders" }, items: [] },
    { title: { mr: "कागदपत्रे", en: "Documents" }, items: [] }
  ];

  const safeData = (Array.isArray(initialData) && initialData.length > 0) ? initialData : defaultTabs;

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

  const [expandedTab, setExpandedTab] = useState<number | null>(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [editingMediaContext, setEditingMediaContext] = useState<{ tabIndex: number; itemIndex: number } | null>(null);

  const openMediaLibrary = (tabIndex: number, itemIndex: number) => {
    setEditingMediaContext({ tabIndex, itemIndex });
    setIsMediaLibraryOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    if (editingMediaContext) {
      const { tabIndex, itemIndex } = editingMediaContext;
      const newData = JSON.parse(JSON.stringify(data));
      if (newData[tabIndex] && newData[tabIndex].items[itemIndex]) {
        newData[tabIndex].items[itemIndex].href = url;
        updateHistoryState(newData);
      }
    }
    setIsMediaLibraryOpen(false);
  };

  const updateTabFull = (tabIndex: number, fullTabData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[tabIndex] = fullTabData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateTabField = (tabIndex: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData[tabIndex][parent]) newData[tabIndex][parent] = {};
      newData[tabIndex][parent][child] = value;
    } else {
      newData[tabIndex][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addTab = () => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.push({ title: { mr: "नवीन टॅब", en: "New Tab" }, items: [] });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeTab = (tabIndex: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.splice(tabIndex, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveTab = (tabIndex: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && tabIndex > 0) {
      [newData[tabIndex - 1], newData[tabIndex]] = [newData[tabIndex], newData[tabIndex - 1]];
    } else if (direction === 'down' && tabIndex < newData.length - 1) {
      [newData[tabIndex + 1], newData[tabIndex]] = [newData[tabIndex], newData[tabIndex + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };

  // Item updates are now handled locally within TabBlock and passed up via updateTabFull

  const handleTranslate = async (text: string, onTranslateSuccess: (translated: string) => void) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) onTranslateSuccess(translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  const tabsData = Array.isArray(data) ? data : defaultTabs;

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Announcements & Tabs"
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
        {tabsData.map((tab: any, tabIndex: number) => (
          <TabBlock
            key={tabIndex}
            tabIndex={tabIndex}
            tabData={tab}
            onUpdateFull={updateTabFull}
            onRemove={() => removeTab(tabIndex)}
            onMoveUp={() => moveTab(tabIndex, 'up')}
            onMoveDown={() => moveTab(tabIndex, 'down')}
            isFirst={tabIndex === 0}
            isLast={tabIndex === tabsData.length - 1}
            onTranslate={handleTranslate}
            isExpanded={expandedTab === tabIndex}
            onToggle={() => setExpandedTab(expandedTab === tabIndex ? null : tabIndex)}
            expandedItem={expandedItem}
            setExpandedItem={setExpandedItem}
            onMediaOpen={openMediaLibrary}
          />
        ))}
      </div>
      
      <Button onClick={addTab} variant="secondary" className="w-full">
        <Plus size={14} className="mr-2" /> Add New Tab
      </Button>

      <MediaLibraryPopup
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={handleMediaSelect}
      />
    </div>
  );
};
