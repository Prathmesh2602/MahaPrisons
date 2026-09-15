---
name: Editor Guidelines
description: Design and structure rules for all CMS Editor forms and Settings Editors.
---

# Editor Guidelines

This rule defines the strict structure and pattern for any CMS editor forms built in this project (e.g., `SettingsEditor.tsx`, `HomepageEditor.tsx`).

## 1. Block-Level Undo/Redo Engine
All editor components must implement isolated, block-level undo/redo in addition to the global page save state. 
- Use the `useBlockHistory` hook (located at `admin/src/hooks/useBlockHistory.ts`) for every distinct conceptual block.
- For example, if a page has a "Main Logo" section and a "Contact Info" section, each must have its own instance of `useBlockHistory` tracking its specific state.

## 2. Standardized Toolbar UI
Every section/block header must include a standardized inline toolbar for the `useBlockHistory` actions.
- The toolbar must be positioned on the right side of the block header.
- Use native HTML `<button>` elements (not the custom `Button` component, to avoid padding clashes) inside a boxed-in div.
- **Strict UI Pattern:**
```tsx
<div className="flex justify-between items-center mb-4 flex-wrap gap-2">
  <div className="flex items-center gap-3">
    <h3 className="text-sm font-semibold text-slate-800">Section Title</h3>
    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md px-1 py-0.5 shadow-sm">
      <button onClick={hist.undo} disabled={!hist.canUndo} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 rounded transition-colors" title="Undo"><Undo size={14} /></button>
      <button onClick={hist.redo} disabled={!hist.canRedo} className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 rounded transition-colors" title="Redo"><Redo size={14} /></button>
      <div className="w-px h-4 bg-slate-300 mx-0.5"></div>
      <button onClick={hist.reset} className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Reset"><RefreshCcw size={14} /></button>
    </div>
  </div>
</div>
```

## 3. Deletion Icons
- Never use the generic `X` (cross) icon to delete or remove an item from a list or editor form.
- **ALWAYS use the `Trash2` icon from `lucide-react`.**
- Example: `<Trash2 size={16} />` for all delete/remove actions.

## 4. Typography and Casing
- Block titles and sub-headers must use standard Title Casing (e.g., "Additional Right-Side Logos").
- NEVER use ALL CAPS (e.g., no `uppercase` utility classes) for headers to maintain a clean, modern aesthetic.
