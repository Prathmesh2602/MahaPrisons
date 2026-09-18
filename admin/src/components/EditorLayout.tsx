import type { ReactNode } from 'react';
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
  saveIcon,
  className = ''
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
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-4 pb-4 border-b border-slate-200 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-bold text-slate-800 break-words leading-tight flex-1">{title}</h2>
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shrink-0">
          <button type="button" onClick={onUndo} disabled={!canUndo} className="px-2 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent border-r border-slate-200 transition-colors" title="Undo"><Undo size={14} /></button>
          <button type="button" onClick={onRedo} disabled={!canRedo} className="px-2 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent border-r border-slate-200 transition-colors" title="Redo"><Redo size={14} /></button>
          <button type="button" onClick={onReset} className="px-2 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors" title="Reset to Live DB"><RefreshCcw size={14} /></button>
        </div>
      </div>
      <Button
        onClick={onSave}
        variant="primary"
        disabled={isSaveDisabled}
        className="w-full justify-center px-4 py-2 text-sm font-semibold"
        icon={saveIcon}
      >
        {saveText}
      </Button>
    </div>
  );
};

export const EditorBlock = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`bg-slate-50 border border-slate-100 rounded-lg p-2 ${className}`}>
      {children}
    </div>
  );
};

export const EditorBlockHeader = ({
  title,
  icon,
  history,
  rightAction,
  className = 'p-2',
  isExpanded,
  onToggle
}: {
  title: string;
  icon?: ReactNode;
  history?: { undo: () => void, redo: () => void, reset: () => void, canUndo: boolean, canRedo: boolean };
  rightAction?: ReactNode;
  className?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}) => {
  return (
    <div className={`flex justify-between items-center gap-3 w-full ${className}`}>
      <h3 
        className={`flex-1 min-w-0 text-sm font-semibold text-slate-800 flex items-center gap-2 ${onToggle ? 'cursor-pointer select-none hover:text-blue-600 transition-colors' : ''}`}
        onClick={onToggle}
        title={title}
      >
        {onToggle && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className={`shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="truncate">{title}</span>
      </h3>
      
      <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
        {history && (
          <div className="flex items-center bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
            <button type="button" onClick={history.undo} disabled={!history.canUndo} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 border-r border-slate-200 transition-colors" title="Undo">
              <Undo size={14} />
            </button>
            <button type="button" onClick={history.redo} disabled={!history.canRedo} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 border-r border-slate-200 transition-colors" title="Redo">
              <Redo size={14} />
            </button>
            <button type="button" onClick={history.reset} className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors" title="Reset">
              <RefreshCcw size={14} />
            </button>
          </div>
        )}
        {rightAction}
      </div>
    </div>
  );
};
