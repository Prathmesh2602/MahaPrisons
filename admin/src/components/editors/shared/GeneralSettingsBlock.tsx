import React from 'react';
import { PhoneticInput } from '../../PhoneticInput';
import { EditorBlockHeader } from '../../EditorLayout';
import { Image as ImageIcon } from 'lucide-react';
import { MediaLibraryPopup } from '../../MediaLibraryPopup';
import { useState } from 'react';

export const GeneralSettingsBlock = ({ title, data, onChange, isExpanded: externalIsExpanded, onToggle: externalOnToggle }: any) => {
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [internalIsExpanded, setInternalIsExpanded] = useState(true);

  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;
  const onToggle = externalOnToggle || (() => setInternalIsExpanded(!internalIsExpanded));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <EditorBlockHeader
        title={title}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      {isExpanded && (
        <div className="p-5">
          <div className="flex flex-col gap-4 bg-white">
          <div className="space-y-1 mb-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Background / Hero Image</label>
            <div
              className="w-full h-40 bg-slate-100 rounded border border-slate-300 overflow-hidden relative group cursor-pointer mt-1"
              onClick={() => setIsMediaPopupOpen(true)}
            >
              {data.image ? (
                <img 
                  src={data.image.startsWith('http') ? data.image : `http://localhost:3000${data.image.startsWith('/') ? '' : '/'}${data.image}`} 
                  className="w-full h-full object-cover" 
                  alt="Hero"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon size={24} className="mb-1" />
                  <span className="text-xs">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
              <PhoneticInput 
                label="Title"
                value={data.title?.mr || ''} 
                onChange={(val) => onChange({ ...data, title: { ...data.title, mr: val } })} 
                englishValue={data.title?.en || ''} 
                onEnglishChange={(val) => onChange({ ...data, title: { ...data.title, en: val } })}
                placeholder="Title"
              />
            </div>
            

            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
              <PhoneticInput 
                label="Description"
                multiline 
                value={data.description?.mr || ''} 
                onChange={(val) => onChange({ ...data, description: { ...data.description, mr: val } })} 
                englishValue={data.description?.en || ''} 
                onEnglishChange={(val) => onChange({ ...data, description: { ...data.description, en: val } })}
                placeholder="Description"
              />
            </div>
          </div>
        </div>
        </div>
      )}

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          onChange({ ...data, image: url });
          setIsMediaPopupOpen(false);
        }}
      />
    </div>
  );
};
