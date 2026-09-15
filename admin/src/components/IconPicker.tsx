import React, { useState } from 'react';
import * as icons from 'lucide-react';

interface IconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
}

// Common icons suitable for CMS navigation
const COMMON_ICONS = [
  'Home', 'Shield', 'Briefcase', 'Sprout', 'HeartHandshake', 'LayoutGrid', 'Palette', 
  'Award', 'Map', 'Package', 'PhoneCall', 'Image', 'Users', 'FileText', 'Settings',
  'Bell', 'Calendar', 'Camera', 'Book', 'File', 'Folder', 'Info', 'Lock', 'Mail',
  'MessageSquare', 'Monitor', 'Paperclip', 'PieChart', 'Search', 'Send', 'Share2',
  'Star', 'ThumbsUp', 'Trash', 'TrendingUp', 'User', 'Video', 'Globe', 'Compass',
  'Activity', 'AlertCircle', 'AlertTriangle', 'Anchor', 'Archive', 'ArrowRight',
  'Battery', 'Bluetooth', 'Bookmark', 'Box', 'Briefcase', 'Camera', 'Cast', 'Check',
  'CheckCircle', 'ChevronRight', 'Clipboard', 'Clock', 'Cloud', 'Code', 'Coffee',
  'Command', 'Compass', 'Copy', 'CornerUpRight', 'Cpu', 'CreditCard', 'Crosshair',
  'Database', 'Download', 'Edit', 'Eye', 'Feather', 'FileText', 'Filter', 'Flag',
  'Folder', 'Gift', 'Globe', 'Grid', 'Hash', 'Headphones', 'Heart', 'HelpCircle',
  'Image', 'Inbox', 'Info', 'Key', 'Layers', 'Layout', 'LifeBuoy', 'Link', 'List',
  'Lock', 'Map', 'MapPin', 'Maximize', 'MessageCircle', 'Mic', 'Monitor', 'Moon',
  'MoreHorizontal', 'Move', 'Music', 'Navigation', 'Package', 'Paperclip', 'Pause',
  'PenTool', 'Phone', 'PieChart', 'Play', 'Power', 'Printer', 'Radio', 'RefreshCw',
  'Repeat', 'Save', 'Search', 'Send', 'Settings', 'Share', 'Shield', 'ShoppingBag',
  'ShoppingCart', 'Shuffle', 'SkipBack', 'SkipForward', 'Slack', 'Sliders',
  'Smartphone', 'Smile', 'Speaker', 'Star', 'StopCircle', 'Sun', 'Sunrise', 'Sunset',
  'Tablet', 'Tag', 'Target', 'Terminal', 'Thermometer', 'ThumbsDown', 'ThumbsUp',
  'ToggleLeft', 'ToggleRight', 'Trash', 'Trash2', 'TrendingDown', 'TrendingUp',
  'Triangle', 'Truck', 'Tv', 'Twitter', 'Umbrella', 'Unlock', 'Upload', 'UploadCloud',
  'User', 'UserCheck', 'UserMinus', 'UserPlus', 'Users', 'Video', 'Voicemail',
  'Volume', 'Volume1', 'Volume2', 'VolumeX', 'Watch', 'Wifi', 'Wind', 'X', 'XCircle',
  'XSquare', 'Youtube', 'Zap', 'ZoomIn', 'ZoomOut'
];

export const IconPicker: React.FC<IconPickerProps> = ({ isOpen, onClose, onSelect, selectedIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredIcons = COMMON_ICONS.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-slate-800">Select an Icon</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <icons.X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100 bg-slate-50/50">
          <div className="relative">
            <icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm bg-white"
              autoFocus
            />
          </div>
        </div>

        {/* Icon Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <icons.Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No icons found for "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
              {filteredIcons.map((iconName) => {
                const IconComponent = (icons as any)[iconName];
                if (!IconComponent) return null;
                
                const isSelected = selectedIcon === iconName;

                return (
                  <button
                    key={iconName}
                    onClick={() => {
                      onSelect(iconName);
                      onClose();
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-500' 
                        : 'border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm text-slate-600'
                    }`}
                    title={iconName}
                  >
                    <IconComponent size={24} strokeWidth={isSelected ? 2.5 : 2} />
                    <span className="mt-2 text-[10px] text-center font-medium truncate w-full opacity-70">
                      {iconName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
