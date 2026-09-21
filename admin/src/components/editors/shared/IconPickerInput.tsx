import React, { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Search, X } from "lucide-react";

const COMMON_ICONS = [
  "Activity", "AlertCircle", "Ambulance", "Apple", "Armchair", "Award",
  "Book", "BookOpen", "Brain", "Briefcase", "Building", "Building2",
  "Calendar", "CalendarDays", "CheckCircle", "CheckCircle2", "ClipboardList",
  "Clock", "Coffee", "CreditCard", "Dumbbell",
  "FileSignature", "FileText", "Flag", "Flower2",
  "Gavel", "GitMerge", "GraduationCap",
  "Handshake", "Heart", "HeartHandshake", "Home",
  "IndianRupee", "LayoutGrid", "Leaf", "Library",
  "Mail", "MailOpen", "MapPin", "Monitor",
  "Network", "Newspaper",
  "Palette", "Pencil", "Phone", "PhoneCall", "PieChart", "Puzzle",
  "Razor", "Receipt",
  "Scale", "School", "Scissors", "ShieldCheck", "ShieldAlert",
  "Smile", "Sparkles", "Sprout", "Stethoscope",
  "Tag", "TrendingUp", "Trophy",
  "UserCheck", "UserPlus", "Users",
  "Video", "Wheat", "Wrench", "Zap"
];

const ALL_ICON_NAMES = Object.keys(LucideIcons).filter(
  (k) => k[0] === k[0].toUpperCase() && k !== "createLucideIcon" && typeof (LucideIcons as any)[k] === "function"
);

interface IconPickerInputProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

export const IconPickerInput: React.FC<IconPickerInputProps> = ({ value, onChange, label = "Icon" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const IconComponent = value ? (LucideIcons as any)[value] : null;

  const filteredIcons = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return COMMON_ICONS;
    return ALL_ICON_NAMES.filter((name) => name.toLowerCase().includes(q)).slice(0, 60);
  }, [search]);

  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-slate-500 uppercase">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-md text-sm bg-white hover:bg-slate-50 hover:border-emerald-400 transition-colors w-full text-left"
        >
          {IconComponent ? (
            <>
              <IconComponent size={16} className="text-emerald-600 shrink-0" />
              <span className="text-slate-800 font-medium">{value}</span>
            </>
          ) : (
            <span className="text-slate-400 italic">Click to select an icon...</span>
          )}
          <span className="ml-auto text-slate-400 text-xs">{isOpen ? "?" : "?"}</span>
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md border border-slate-200 transition-colors"
            title="Clear icon"
          >
            <X size={14} />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="border border-slate-200 rounded-lg bg-white shadow-lg overflow-hidden relative">
          <div className="p-2 border-b border-slate-100 flex items-center gap-2">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="flex-1 text-sm outline-none text-slate-700"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                <X size={12} />
              </button>
            )}
          </div>
          {!search && (
            <div className="px-3 pt-2 pb-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Common Icons</p>
            </div>
          )}
          <div className="p-2 grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
            {filteredIcons.map((name) => {
              const Ic = (LucideIcons as any)[name];
              if (!Ic) return null;
              const isSelected = value === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => { onChange(name); setIsOpen(false); setSearch(""); }}
                  title={name}
                  className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md text-center transition-colors ${
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : "hover:bg-emerald-50 hover:text-emerald-600 text-slate-600"
                  }`}
                >
                  <Ic size={18} />
                  <span className="text-[8px] leading-none truncate w-full text-center">{name}</span>
                </button>
              );
            })}
            {filteredIcons.length === 0 && (
              <div className="col-span-5 py-4 text-center text-xs text-slate-400">No icons found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
