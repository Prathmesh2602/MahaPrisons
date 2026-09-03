import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMenuTree, createMenuItem, updateMenuItem, deleteMenuItem, reorderMenuItems } from '../api/menu';
import type { MenuItem } from '../api/menu';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, Edit2, 
  ChevronRight, ChevronDown, Save, X, LayoutGrid, AlertCircle, PenTool
} from 'lucide-react';
import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';

export default function Navigation() {
  const [tree, setTree] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const loadTree = async () => {
    try {
      setLoading(true);
      const data = await getMenuTree();
      setTree(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTree();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      if (editingItem.id) {
        await updateMenuItem(editingItem.id, editingItem);
      } else {
        await createMenuItem(editingItem);
      }
      setEditingItem(null);
      loadTree();
    } catch (err) {
      console.error(err);
      alert('Failed to save menu item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will delete all sub-items as well.')) return;
    try {
      await deleteMenuItem(id);
      loadTree();
    } catch (err) {
      console.error(err);
      alert('Failed to delete item');
    }
  };

  const handleMove = async (items: MenuItem[], index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === items.length - 1)
    ) return;

    const newItems = [...items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap items in array
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];

    // Rebuild orders
    const payload = newItems.map((item, idx) => ({
      id: item.id,
      order: idx,
      parentId: item.parentId
    }));

    try {
      await reorderMenuItems(payload);
      loadTree();
    } catch (err) {
      console.error(err);
      alert('Failed to reorder');
    }
  };

  const renderTree = (items: MenuItem[], level: number = 0) => {
    return items.map((item, index) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedNodes[item.id] || false;

      return (
        <div key={item.id} className="select-none">
          <div 
            className={`flex items-center justify-between py-2 px-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
              editingItem?.id === item.id ? 'bg-amber-50 border-amber-200' : ''
            }`}
            style={{ paddingLeft: `${(level * 1.5) + 0.75}rem` }}
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <button 
                onClick={() => toggleExpand(item.id)}
                className={`p-1 rounded text-gray-400 hover:bg-gray-200 ${!hasChildren && 'invisible'}`}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              <span title="Mega Menu Group">
                {item.isMegaGroup && <LayoutGrid size={14} className="text-purple-500" />}
              </span>
              
              <span className="font-medium text-gray-800 truncate" title={`${item.labelMr} (${item.labelEn})`}>
                {item.labelMr} <span className="text-gray-500 text-sm font-normal ml-1">({item.labelEn})</span>
              </span>
              <span className="text-xs text-gray-400 truncate hidden md:inline-block">
                {item.href}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-4">
              <button onClick={() => handleMove(items, index, 'up')} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded disabled:opacity-30">
                <ArrowUp size={14} />
              </button>
              <button onClick={() => handleMove(items, index, 'down')} disabled={index === items.length - 1} className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded disabled:opacity-30">
                <ArrowDown size={14} />
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <button 
                onClick={() => setEditingItem({ parentId: item.id, isMegaGroup: false, visible: true, labelEn: '', labelMr: '', href: '#' })}
                title="Add Child"
                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
              >
                <Plus size={16} />
              </button>
              <button 
                onClick={() => setEditingItem(item)}
                title="Edit"
                className="p-1.5 text-amber-600 hover:bg-amber-100 rounded"
              >
                <Edit2 size={16} />
              </button>
              {!item.isMegaGroup && item.pageId && (
                <Link
                  to={`/builder/${item.pageId}`}
                  title="Design Page"
                  className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded"
                >
                  <PenTool size={16} />
                </Link>
              )}
              <button 
                onClick={() => handleDelete(item.id)}
                title="Delete"
                className="p-1.5 text-red-600 hover:bg-red-100 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="flex flex-col w-full">
              {renderTree(item.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading Menu Tree...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
      
      {/* LEFT: Tree View */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Navigation Manager</h1>
            <p className="text-xs text-gray-500">Drag and reorder is disabled. Use arrows.</p>
          </div>
          <button 
            onClick={() => setEditingItem({ parentId: null, isMegaGroup: false, visible: true, labelEn: '', labelMr: '', href: '#' })}
            className="flex items-center gap-2 bg-[#0F3D66] text-white px-3 py-1.5 rounded text-sm hover:bg-[#0b2d4c] transition-colors"
          >
            <Plus size={16} /> Add Top Level
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white p-2">
          {tree.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No menu items found.</div>
          ) : (
            renderTree(tree)
          )}
        </div>
      </div>

      {/* RIGHT: Editor Panel */}
      <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-fit sticky top-6">
        {editingItem ? (
          <form onSubmit={handleSave} className="flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-amber-50 rounded-t-xl">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Edit2 size={18} className="text-amber-600" /> 
                {editingItem.id ? 'Edit Item' : 'New Item'}
              </h2>
              <button type="button" onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              {/* Note about Mega Menu */}
              <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex gap-2 items-start">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <p>If "Is Mega Group" is true, this node will act as a column header in the dropdown and not as a clickable link.</p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">Label (Marathi)</label>
                  <button 
                    type="button"
                    onClick={async () => {
                      if (!editingItem.labelMr) return;
                      try {
                        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=mr&tl=en&dt=t&q=${encodeURIComponent(editingItem.labelMr)}`);
                        const data = await res.json();
                        if (data && data[0]) {
                          const translated = data[0].map((item: any) => item[0]).join('');
                          setEditingItem({...editingItem, labelEn: translated});
                        }
                      } catch(e) {}
                    }}
                    className="text-[10px] text-blue-600 font-medium hover:underline"
                  >
                    Auto Translate to EN
                  </button>
                </div>
                <ReactTransliterate
                  renderComponent={(props) => <input {...props} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-amber-500" />}
                  value={editingItem.labelMr || ''} 
                  onChangeText={text => setEditingItem({...editingItem, labelMr: text})}
                  lang="mr"
                  placeholder="e.g. मुख्यपृष्ठ"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Label (English)</label>
                <input 
                  type="text" 
                  required
                  value={editingItem.labelEn || ''} 
                  onChange={e => setEditingItem({...editingItem, labelEn: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-amber-500"
                  placeholder="e.g. Home"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Link URL</label>
                <input 
                  type="text" 
                  value={editingItem.href || '#'} 
                  onChange={e => setEditingItem({...editingItem, href: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-amber-500 font-mono"
                  placeholder="/"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Icon (Lucide Name)</label>
                <input 
                  type="text" 
                  value={editingItem.icon || ''} 
                  onChange={e => setEditingItem({...editingItem, icon: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-amber-500"
                  placeholder="e.g. Home, Shield (Top level only)"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="isMegaGroup" 
                  checked={editingItem.isMegaGroup || false}
                  onChange={e => setEditingItem({...editingItem, isMegaGroup: e.target.checked})}
                  className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <label htmlFor="isMegaGroup" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Is Mega Group Header
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="visible" 
                  checked={editingItem.visible !== false}
                  onChange={e => setEditingItem({...editingItem, visible: e.target.checked})}
                  className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <label htmlFor="visible" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Visible in Menu
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button 
                type="button" 
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex items-center gap-2 bg-[#0F3D66] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#0b2d4c] transition-colors shadow-sm"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 min-h-[400px]">
            <LayoutGrid size={48} className="mb-4 opacity-20" />
            <p className="text-sm">Select an item from the tree to edit its properties, or add a new one.</p>
          </div>
        )}
      </div>

    </div>
  );
}
