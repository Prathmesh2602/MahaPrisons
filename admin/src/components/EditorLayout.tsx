import React, { ReactNode } from 'react';
import { Undo, Redo, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

export const EditorFormHeader = ({
  title,
  onUndo,
  canUndo,
  onRedo,
  canRedo,
  onReset,
  onSave,
  isSaveDisabled,
  saveText,
  saveIcon
}: {
  title: string;
  onUndo: () => void;
  canUndo: boolean;
  onRedo: () => void;
  canRedo: boolean;
  onReset: () => void;
  onSave: () => void;
  isSaveDisabled: boolean;
  saveText: string;
  saveIcon: ReactNode;
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-1 mb-6 overflow-hidden">
      <h2 className="text-sm font-bold text-slate-800 truncate">{title}</h2>

      <div className="flex items-center gap-1.5 shrink-0">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shrink-0">
          <button onClick={onUndo} disabled={!canUndo} className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent border-r border-slate-200 transition-colors" title="Undo"><Undo size={14} /></button>
          <button onClick={onRedo} disabled={!canRedo} className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent border-r border-slate-200 transition-colors" title="Redo"><Redo size={14} /></button>
          <button onClick={onReset} className="px-2.5 py-1.5 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors" title="Reset to Live DB"><RefreshCcw size={14} /></button>
        </div>
        <Button
          onClick={onSave}
          variant="primary"
          disabled={isSaveDisabled}
          className="shrink-0 px-2.5 py-1.5 text-xs whitespace-nowrap"
          icon={saveIcon}
        >
          {saveText}
        </Button>
      </div>
    </div>
  );
};

export const EditorBlock = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`bg-slate-50 border border-slate-100 rounded-lg px-3 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const EditorBlockHeader = ({
  title,
  icon,
  history,
  rightAction,
  className = 'mb-4'
}: {
  title: string;
  icon?: ReactNode;
  history?: { undo: () => void, redo: () => void, reset: () => void, canUndo: boolean, canRedo: boolean };
  rightAction?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex justify-between items-center flex-wrap gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          {icon} {title}
        </h3>
        {history && (
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md px-1 py-0.5 shadow-sm">
            <button onClick={history.undo} disabled={!history.canUndo} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 rounded transition-colors" title="Undo">
              <Undo size={14} />
            </button>
            <button onClick={history.redo} disabled={!history.canRedo} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 rounded transition-colors" title="Redo">
              <Redo size={14} />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-0.5"></div>
            <button onClick={history.reset} className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Reset">
              <RefreshCcw size={14} />
            </button>
          </div>
        )}
      </div>
      {rightAction}
    </div>
  );
};
