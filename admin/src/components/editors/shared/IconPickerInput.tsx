import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Trash2 } from "lucide-react";
import { IconPicker } from "../../IconPicker";

interface IconPickerInputProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

export const IconPickerInput: React.FC<IconPickerInputProps> = ({ value, onChange, label = "Icon" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-slate-500 uppercase">{label}</label>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center text-slate-600">
          {(() => {
            if (!value) return <span className="text-[10px] text-gray-400 font-medium">None</span>;
            const IconComp = (LucideIcons as any)[value];
            return IconComp ? <IconComp size={20} className="text-blue-500" /> : <span className="text-xs text-red-400">?</span>;
          })()}
        </div>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
          className="px-3 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
        >
          {value ? 'Change Icon' : 'Select Icon'}
        </button>
        {value && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onChange(''); }}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            title="Remove Icon"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      
      <IconPicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={(iconName) => onChange(iconName)}
        selectedIcon={value}
      />
    </div>
  );
};
