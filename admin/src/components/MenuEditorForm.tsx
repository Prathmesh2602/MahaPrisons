import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, X, Undo, Redo, RotateCcw } from 'lucide-react';
import * as icons from 'lucide-react';
import { PhoneticInput } from './PhoneticInput';
import { IconPicker } from './IconPicker';
import { Button } from './Button';
import axios from 'axios';

interface MenuEditorFormProps {
  item: any;
  itemType?: 'root' | 'child' | 'groupHeader' | 'groupChild';
  onSave: (updatedItem: any) => void;
  onCancel: () => void;
}

export const MenuEditorForm: React.FC<MenuEditorFormProps> = ({ item, itemType = 'root', onSave, onCancel }) => {
  const [formData, setFormData] = useState<any>({ ...item });
  const [history, setHistory] = useState<any[]>([{ ...item }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  // Sync form data if the selected item changes
  useEffect(() => {
    setFormData({ ...item });
    setHistory([{ ...item }]);
    setHistoryIndex(0);
  }, [item]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const newData = { ...prev, [field]: value };

      // Update history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newData);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      return newData;
    });
  };

  const handleTranslate = async (text: string, englishField: string) => {
    if (!text.trim()) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/translate?text=${encodeURIComponent(text)}&source=mr&target=en`);
      if (res.data && res.data.responseData) {
        handleChange(englishField, res.data.responseData.translatedText);
      }
    } catch (err) {
      console.error('Translation failed', err);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setFormData(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setFormData(history[historyIndex + 1]);
    }
  };

  const handleReset = () => {
    setFormData({ ...item });
    setHistory([{ ...item }]);
    setHistoryIndex(0);
  };

  const handleSave = () => {
    onSave(formData);
  };

  const isGroupHeader = itemType === 'groupHeader';
  const isGroupChild = itemType === 'groupChild';
  const isGroup = isGroupHeader || formData.isGroupHeader;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div className="px-5 py-3 border-b border-orange-100 flex justify-between items-center bg-[#fffbf0] rounded-t-lg">
        <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
          <Edit2 size={16} className="text-orange-500" /> 
          {isGroupHeader ? 'Edit Column Group' : isGroupChild ? 'Edit Mega Menu Link' : 'Edit Item'}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex === 0}
            className={`p-1.5 rounded-md transition-colors ${historyIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 cursor-pointer'}`}
            title="Undo"
          >
            <Undo size={16} className={historyIndex === 0 ? 'pointer-events-none' : ''} />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            className={`p-1.5 rounded-md transition-colors ${historyIndex === history.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 cursor-pointer'}`}
            title="Redo"
          >
            <Redo size={16} className={historyIndex === history.length - 1 ? 'pointer-events-none' : ''} />
          </button>
          <div className="w-px h-4 bg-orange-200/50 mx-1"></div>
          <button
            type="button"
            onClick={handleReset}
            disabled={historyIndex === 0}
            className={`p-1.5 rounded-md transition-colors ${historyIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 hover:text-orange-700 hover:bg-orange-100 cursor-pointer'}`}
            title="Reset to Original"
          >
            <RotateCcw size={16} className={historyIndex === 0 ? 'pointer-events-none' : ''} />
          </button>
          <div className="w-px h-4 bg-orange-200/50 mx-1"></div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onCancel(); }}
            className="text-gray-400 hover:text-red-500 cursor-pointer p-1.5 rounded-md hover:bg-red-50 transition-colors"
            title="Close Editor"
          >
            <X size={18} className="pointer-events-none" />
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 space-y-4">
        {isGroup ? (
          <>
            <PhoneticInput
              label="Group Title (Marathi)"
              value={formData.groupTitle_mr || formData.label_mr}
              onChange={(val) => { handleChange('groupTitle_mr', val); handleChange('label_mr', val); }}
              onTranslate={(text) => { handleTranslate(text, 'groupTitle_en'); handleTranslate(text, 'label_en'); }}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Group Title (English)</label>
              <input
                type="text"
                value={formData.groupTitle_en || formData.label_en || ''}
                onChange={e => { handleChange('groupTitle_en', e.target.value); handleChange('label_en', e.target.value); }}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none"
                placeholder="e.g. Administration"
              />
            </div>
          </>
        ) : (
          <>
            <PhoneticInput
              label="Label (Marathi)"
              value={formData.label_mr || formData.groupTitle_mr}
              onChange={(val) => { handleChange('label_mr', val); handleChange('groupTitle_mr', val); }}
              onTranslate={(text) => { handleTranslate(text, 'label_en'); handleTranslate(text, 'groupTitle_en'); }}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Label (English)</label>
              <input
                type="text"
                value={formData.label_en || formData.groupTitle_en || ''}
                onChange={e => { handleChange('label_en', e.target.value); handleChange('groupTitle_en', e.target.value); }}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none"
                placeholder="e.g. Home"
              />
            </div>
          </>
        )}

        {(!isGroup && !isGroupChild) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center text-slate-600">
                {(() => {
                  if (!formData.icon) return <span className="text-[10px] text-gray-400 font-medium">None</span>;
                  const IconComp = (icons as any)[formData.icon];
                  return IconComp ? <IconComp size={20} /> : <span className="text-xs text-red-400">?</span>;
                })()}
              </div>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setIsIconPickerOpen(true); }}
                className="px-3 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
              >
                {formData.icon ? 'Change Icon' : 'Select Icon'}
              </button>
              {formData.icon && (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); handleChange('icon', ''); }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  title="Remove Icon"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        )}
        <div className="pt-2 space-y-3">
          {itemType !== 'root' && itemType !== 'groupChild' && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isGroupHeader !== undefined ? !!formData.isGroupHeader : isGroupHeader}
                onChange={e => handleChange('isGroupHeader', e.target.checked)}
                className="w-4 h-4 text-slate-800 focus:ring-slate-500 border-gray-300 rounded cursor-pointer"
              />
              <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleChange('isGroupHeader', formData.isGroupHeader !== undefined ? !formData.isGroupHeader : !isGroupHeader)}>
                Set Group Header
              </label>
            </div>
          )}
          {(!isGroup) && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.visible !== false}
                onChange={e => handleChange('visible', e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleChange('visible', formData.visible === false ? true : false)}>
                Visible in Menu
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-lg">
        <Button
          type="button"
          onClick={(e: React.MouseEvent) => { e.preventDefault(); onCancel(); }}
          variant="ghost"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={(e: React.MouseEvent) => { e.preventDefault(); handleSave(); }}
          disabled={historyIndex === 0}
          variant="secondary"
          icon={<Edit2 size={14} className={historyIndex === 0 ? 'opacity-40' : 'opacity-70'} />}
        >
          Save Changes
        </Button>
      </div>

      {/* Icon Picker Modal */}
      <IconPicker
        isOpen={isIconPickerOpen}
        onClose={() => setIsIconPickerOpen(false)}
        onSelect={(iconName) => handleChange('icon', iconName)}
        selectedIcon={formData.icon}
      />
    </div>
  );
};
