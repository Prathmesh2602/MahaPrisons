import React from 'react';
import { EditorFormHeader } from '../EditorLayout';
import { Info, Save } from 'lucide-react';

export const PhotoGalleryEditor = ({ blockId }: any) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Photo Gallery"
        onUndo={() => {}}
        canUndo={false}
        onRedo={() => {}}
        canRedo={false}
        onReset={() => {}}
        onSave={() => {}}
        isSaveDisabled={true}
        saveText="Auto Managed"
        saveIcon={<Save size={14} />}
      />
      
      <div className="p-8 text-center bg-blue-50/50 border border-blue-100 rounded-lg mt-4 flex flex-col items-center justify-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <Info size={24} className="text-blue-600" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">Automated Section</h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Images for the Homepage Photo Gallery (छायाचित्र दालन) are automatically loaded from the main gallery page. No manual editing is required here.
        </p>
      </div>
    </div>
  );
};
