import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowUp, ArrowDown, Plus, Edit2, Trash2, ChevronRight, ChevronDown, LayoutGrid, X } from 'lucide-react';
import * as icons from 'lucide-react';
import { MenuEditorForm } from '../components/MenuEditorForm';

type EditPath = {
  rootIndex: number;
  childIndex?: number;
  groupIndex?: number;
  groupChildIndex?: number;
};

type ItemType = 'root' | 'child' | 'groupHeader' | 'groupChild';

export const MenuEditor = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [history, setHistory] = useState<any[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const updateItems = (newItems: any[]) => {
    // Keep history up to current index and add new state
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(JSON.parse(JSON.stringify(newItems))); // Deep copy
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setItems(newItems);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setItems(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setItems(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const handleReset = () => {
    if (history.length > 0) {
      setHistoryIndex(0);
      setItems(JSON.parse(JSON.stringify(history[0])));
      setHistory([history[0]]); // Optional: clear redo history on reset
    }
  };

  // Edit Pane State
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editingPath, setEditingPath] = useState<EditPath | null>(null);
  const [editingItemType, setEditingItemType] = useState<ItemType>('root');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/menu').then(res => {
      const data = res.data;
      setItems(data);
      setHistory([JSON.parse(JSON.stringify(data))]);
      setHistoryIndex(0);
      if (data.length > 0) {
        setExpandedNodes(new Set([data[0].id || data[0].label_en, data[1]?.id || data[1]?.label_en]));
      }
    });
  }, []);

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedNodes);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedNodes(newSet);
  };

  const moveItem = (path: EditPath, direction: -1 | 1) => {
    const newItems = [...items];
    const { rootIndex, childIndex, groupIndex, groupChildIndex } = path;

    if (groupIndex !== undefined) {
      if (groupChildIndex !== undefined) {
        // Move MegaGroupChild
        const arr = newItems[rootIndex].groups[groupIndex].children;
        if (groupChildIndex + direction < 0 || groupChildIndex + direction >= arr.length) return;
        const temp = arr[groupChildIndex];
        arr[groupChildIndex] = arr[groupChildIndex + direction];
        arr[groupChildIndex + direction] = temp;
      } else {
        // Move MegaGroupHeader
        const arr = newItems[rootIndex].groups;
        if (groupIndex + direction < 0 || groupIndex + direction >= arr.length) return;
        const temp = arr[groupIndex];
        arr[groupIndex] = arr[groupIndex + direction];
        arr[groupIndex + direction] = temp;
      }
    } else if (childIndex !== undefined) {
      // Move Child
      const arr = newItems[rootIndex].children;
      if (childIndex + direction < 0 || childIndex + direction >= arr.length) return;
      const temp = arr[childIndex];
      arr[childIndex] = arr[childIndex + direction];
      arr[childIndex + direction] = temp;
    } else {
      // Move Root
      if (rootIndex + direction < 0 || rootIndex + direction >= newItems.length) return;
      const temp = newItems[rootIndex];
      newItems[rootIndex] = newItems[rootIndex + direction];
      newItems[rootIndex + direction] = temp;
    }
    updateItems(newItems);
  };

  const deleteItem = (path: EditPath) => {
    const newItems = [...items];
    const { rootIndex, childIndex, groupIndex, groupChildIndex } = path;

    if (groupIndex !== undefined) {
      if (groupChildIndex !== undefined) {
        newItems[rootIndex].groups[groupIndex].children.splice(groupChildIndex, 1);
      } else {
        newItems[rootIndex].groups.splice(groupIndex, 1);
      }
    } else if (childIndex !== undefined) {
      newItems[rootIndex].children.splice(childIndex, 1);
    } else {
      newItems.splice(rootIndex, 1);
    }
    updateItems(newItems);

    if (
      editingPath?.rootIndex === rootIndex &&
      editingPath?.childIndex === childIndex &&
      editingPath?.groupIndex === groupIndex &&
      editingPath?.groupChildIndex === groupChildIndex
    ) {
      setEditingItem(null);
      setEditingPath(null);
    }
  };

  const openEditPane = (item: any, path: EditPath, type: ItemType) => {
    setEditingItem({ ...item });
    setEditingPath(path);
    setEditingItemType(type);
  };

  const saveEditPane = (updatedItem: any) => {
    if (!editingPath) return;
    const newItems = [...items];
    const { rootIndex, childIndex, groupIndex, groupChildIndex } = editingPath;

    if (groupIndex !== undefined) {
      if (groupChildIndex !== undefined) {
        newItems[rootIndex].groups[groupIndex].children[groupChildIndex] = { 
          ...newItems[rootIndex].groups[groupIndex].children[groupChildIndex], 
          ...updatedItem 
        };
      } else {
        if (updatedItem.isGroupHeader === false) {
          const group = newItems[rootIndex].groups[groupIndex];
          newItems[rootIndex].groups.splice(groupIndex, 1);
          if (!newItems[rootIndex].children) newItems[rootIndex].children = [];
          newItems[rootIndex].children.push({
            label_en: updatedItem.groupTitle_en || group.groupTitle_en,
            label_mr: updatedItem.groupTitle_mr || group.groupTitle_mr,
            href: updatedItem.href || '#'
          });
        } else {
          newItems[rootIndex].groups[groupIndex] = { 
            ...newItems[rootIndex].groups[groupIndex], 
            ...updatedItem 
          };
        }
      }
    } else if (childIndex !== undefined) {
      if (updatedItem.isGroupHeader === true) {
        const child = newItems[rootIndex].children[childIndex];
        newItems[rootIndex].children.splice(childIndex, 1);
        if (!newItems[rootIndex].groups) newItems[rootIndex].groups = [];
        newItems[rootIndex].groups.push({
          groupTitle_en: updatedItem.groupTitle_en || child.label_en,
          groupTitle_mr: updatedItem.groupTitle_mr || child.label_mr,
          children: []
        });
      } else {
        newItems[rootIndex].children[childIndex] = { 
          ...newItems[rootIndex].children[childIndex], 
          ...updatedItem 
        };
      }
    } else {
      newItems[rootIndex] = { ...newItems[rootIndex], ...updatedItem };
    }
    
    updateItems(newItems);
    setEditingItem(null);
    setEditingPath(null);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await axios.put('http://localhost:5000/api/v1/menu', items);
      if (user?.role === 'MAKER') {
        alert('Changes sent for review');
      } else {
        alert('Menu updated successfully');
      }
    } catch (error) {
      alert('Failed to update menu');
    } finally {
      setIsSaving(false);
    }
  };

  const addRootItem = () => {
    const newItem = { label_en: 'New Menu', label_mr: 'नवीन मेनू', href: '/new-menu', children: [] };
    const newItems = [...items, newItem];
    updateItems(newItems);
    openEditPane(newItem, { rootIndex: newItems.length - 1 }, 'root');
  };

  const addChildItem = (rootIndex: number) => {
    const newItems = [...items];
    if (!newItems[rootIndex].children) newItems[rootIndex].children = [];
    const newChild = { label_en: 'New Subitem', label_mr: 'नवीन उप-घटक' };
    newItems[rootIndex].children.push(newChild);
    updateItems(newItems);
    setExpandedNodes(new Set(expandedNodes).add(newItems[rootIndex].id || newItems[rootIndex].label_en));
    openEditPane(newChild, { rootIndex, childIndex: newItems[rootIndex].children.length - 1 }, 'child');
  };

  const addGroupHeader = (rootIndex: number) => {
    const newItems = [...items];
    if (!newItems[rootIndex].groups) newItems[rootIndex].groups = [];
    const newGroup = { groupTitle_en: 'New Group', groupTitle_mr: 'नवीन गट', children: [] };
    newItems[rootIndex].groups.push(newGroup);
    updateItems(newItems);
    setExpandedNodes(new Set(expandedNodes).add(newItems[rootIndex].id || newItems[rootIndex].label_en));
    openEditPane(newGroup, { rootIndex, groupIndex: newItems[rootIndex].groups.length - 1 }, 'groupHeader');
  };

  const addGroupChild = (rootIndex: number, groupIndex: number) => {
    const newItems = [...items];
    if (!newItems[rootIndex].groups[groupIndex].children) newItems[rootIndex].groups[groupIndex].children = [];
    const newChild = { label_en: 'New Link', label_mr: 'नवीन लिंक', href: '#' };
    newItems[rootIndex].groups[groupIndex].children.push(newChild);
    updateItems(newItems);
    openEditPane(newChild, { rootIndex, groupIndex, groupChildIndex: newItems[rootIndex].groups[groupIndex].children.length - 1 }, 'groupChild');
  };

  const renderRow = (item: any, path: EditPath, type: ItemType, depth: number = 0) => {
    const isRoot = type === 'root';
    const isMegaGroup = isRoot && (item.isMegaGroup || (item.groups && item.groups.length > 0));
    const hasChildren = (item.children && item.children.length > 0) || (item.groups && item.groups.length > 0);
    const nodeId = type === 'groupHeader' ? `${item.groupTitle_en}-${path.groupIndex}` : (item.id || item.label_en);
    const isExpanded = (isRoot || type === 'groupHeader') && expandedNodes.has(nodeId);
    
    const isEditingThis = 
      editingPath?.rootIndex === path.rootIndex && 
      editingPath?.childIndex === path.childIndex &&
      editingPath?.groupIndex === path.groupIndex &&
      editingPath?.groupChildIndex === path.groupChildIndex;

    const label_mr = type === 'groupHeader' ? item.groupTitle_mr : item.label_mr;
    const label_en = type === 'groupHeader' ? item.groupTitle_en : item.label_en;

    const isHome = isRoot && (item.href === '/' || item.label_en === 'Home' || item.label_mr === 'मुख्यपृष्ठ');
    
    return (
      <div
        key={`${path.rootIndex}-${path.childIndex}-${path.groupIndex}-${path.groupChildIndex}`}
        className={`flex items-center justify-between py-3 border-b pr-4 transition-colors ${isEditingThis
            ? 'bg-blue-50/60 border-l-4 border-l-blue-500 border-b-gray-100 shadow-sm pl-[-4px]'
            : 'border-b-gray-100 hover:bg-gray-50 border-l-4 border-l-transparent'
          }`}
      >
        <div className="flex items-center gap-3" style={{ paddingLeft: `${(depth * 2) + 1}rem` }}>
          {isRoot || type === 'groupHeader' ? (
            <button onClick={(e) => { e.stopPropagation(); toggleExpand(nodeId); }} className={`text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded focus:outline-none w-6 h-6 flex items-center justify-center transition-colors ${isHome ? 'invisible' : ''}`}>
              {(hasChildren || isMegaGroup) && !isHome ? (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />) : <span className="w-4" />}
            </button>
          ) : (
            <span className="w-6 h-6 flex items-center justify-center text-gray-300"></span>
          )}

          {(() => {
            if (item.icon) {
              const IconComp = (icons as any)[item.icon];
              return IconComp ? <IconComp size={16} className="text-purple-500 shrink-0" /> : <LayoutGrid size={16} className="text-purple-400 shrink-0" />;
            }
            if (type === 'groupHeader') return <icons.Columns size={16} className="text-amber-500 shrink-0" />;
            if (type === 'groupChild') return <icons.Link2 size={16} className="text-blue-400 shrink-0" />;
            return !isRoot ? <icons.FileText size={16} className="text-gray-400 shrink-0" /> : <span className="w-4 shrink-0" />;
          })()}

          <span className="font-medium text-gray-800 text-sm">{label_mr || 'New Item'}</span>
          <span className="text-gray-500 text-sm">({label_en || 'English'})</span>
          {isMegaGroup && <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded">MEGA</span>}
        </div>

        <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); moveItem(path, -1); }} className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded p-1.5 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); moveItem(path, 1); }} className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded p-1.5 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          
          {isRoot && !isMegaGroup && !isHome && (
            <button onClick={(e) => { e.stopPropagation(); addChildItem(path.rootIndex); }} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded p-1.5 transition-colors" title="Add Subitem"><Plus size={14} /></button>
          )}
          {isRoot && isMegaGroup && !isHome && (
            <button onClick={(e) => { e.stopPropagation(); addGroupHeader(path.rootIndex); }} className="text-amber-500 hover:text-amber-700 hover:bg-amber-50 rounded p-1.5 transition-colors" title="Add Group Column"><Plus size={14} /></button>
          )}
          {type === 'groupHeader' && (
            <button onClick={(e) => { e.stopPropagation(); addGroupChild(path.rootIndex, path.groupIndex!); }} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded p-1.5 transition-colors" title="Add Mega Menu Link"><Plus size={14} /></button>
          )}

          {item.href && item.href !== '#' && (
            <button onClick={(e) => { e.stopPropagation(); navigate(`/page-editor?slug=${item.href}`); }} className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded p-1.5 transition-colors" title="Edit Page Content"><LayoutGrid size={14} /></button>
          )}

          <button onClick={(e) => { e.stopPropagation(); openEditPane(item, path, type); }} className="text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded p-1.5 transition-colors" title="Edit"><Edit2 size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); deleteItem(path); }} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1.5 transition-colors" title="Delete"><Trash2 size={14} /></button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Navigation</h1>
      </div>

      <div className="p-6 md:p-8 flex-1 bg-slate-50">
        <div className="flex flex-col md:flex-row gap-6 max-w-[1400px] mx-auto items-start">
          <div className="flex-[3] w-full bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="bg-white border-b border-gray-100 rounded-t-lg overflow-hidden flex flex-col">
              
              {/* Top Row: Title (Left) and Buttons (Right) */}
              <div className="px-5 py-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
                
                {/* Top Left: Title */}
                <h1 className="text-xl font-bold text-slate-800 shrink-0">Navigation Manager</h1>
                
                {/* Top Right: All Buttons */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:justify-end">
                  
                  {/* Undo/Redo/Reset Group (Icons Only) */}
                  <div className="flex items-center bg-gray-50 rounded-md p-1 border border-gray-200 shadow-sm">
                    <button 
                      onClick={handleUndo} 
                      disabled={historyIndex <= 0}
                      className="p-1.5 rounded text-gray-600 hover:bg-white hover:text-slate-900 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                      title="Undo"
                    >
                      <icons.Undo2 size={16} />
                    </button>
                    <button 
                      onClick={handleRedo} 
                      disabled={historyIndex >= history.length - 1}
                      className="p-1.5 rounded text-gray-600 hover:bg-white hover:text-slate-900 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                      title="Redo"
                    >
                      <icons.Redo2 size={16} />
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button 
                      onClick={handleReset} 
                      disabled={historyIndex <= 0}
                      className="p-1.5 rounded text-gray-600 hover:bg-white hover:text-red-600 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:shadow-none transition-all"
                      title="Reset to Original"
                    >
                      <icons.RotateCcw size={16} />
                    </button>
                  </div>

                  {/* Add New Menu */}
                  <button onClick={addRootItem} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm flex items-center gap-2">
                    <Plus size={16} className="text-slate-500" /> New Menu
                  </button>

                  {/* Save & Publish */}
                  <button onClick={handleSaveAll} disabled={isSaving || historyIndex <= 0} className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none flex items-center gap-2">
                    {isSaving ? <icons.Loader2 size={16} className="animate-spin" /> : <icons.Save size={16} />}
                    {isSaving ? 'Processing...' : user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
                  </button>
                </div>
              </div>

              {/* Bottom Row: Tip filling left to right attached to bottom */}
              <div className="px-5 py-1.5 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2 text-xs text-emerald-800 w-full">
                <icons.Info size={15} className="text-emerald-600 shrink-0" />
                <span>Tip: Use the <strong>up and down arrows</strong> on each item to reorder them vertically.</span>
              </div>

            </div>

            <div className="flex-1 bg-white pb-4">
              {items.map((rootItem, i) => {
                const isHomeItem = rootItem.href === '/' || rootItem.label_en === 'Home' || rootItem.label_mr === 'मुख्यपृष्ठ';
                return (
                <React.Fragment key={rootItem.id || i}>
                  {renderRow(rootItem, { rootIndex: i }, 'root', 0)}
                  
                  {expandedNodes.has(rootItem.id || rootItem.label_en) && !isHomeItem && (
                    <>
                      {/* Standard Children */}
                      {!(rootItem.isMegaGroup || (rootItem.groups && rootItem.groups.length > 0)) && rootItem.children?.map((child: any, j: number) => (
                        renderRow(child, { rootIndex: i, childIndex: j }, 'child', 1)
                      ))}
                      
                      {/* Mega Groups */}
                      {(rootItem.isMegaGroup || (rootItem.groups && rootItem.groups.length > 0)) && rootItem.groups?.map((group: any, gIdx: number) => (
                        <React.Fragment key={`group-${gIdx}`}>
                          {renderRow(group, { rootIndex: i, groupIndex: gIdx }, 'groupHeader', 1)}
                          {expandedNodes.has(`${group.groupTitle_en}-${gIdx}`) && group.children?.map((gChild: any, gcIdx: number) => (
                            renderRow(gChild, { rootIndex: i, groupIndex: gIdx, groupChildIndex: gcIdx }, 'groupChild', 2)
                          ))}
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="flex-[2] w-full sticky top-6">
            {editingItem ? (
              <MenuEditorForm 
                item={editingItem} 
                itemType={editingItemType}
                onSave={saveEditPane} 
                onCancel={() => { setEditingItem(null); setEditingPath(null); }} 
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[300px]">
                <div className="grid grid-cols-2 gap-1.5 w-12 mx-auto mb-5 opacity-20">
                  <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                  <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                  <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                  <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                </div>
                <p className="text-gray-400 text-sm text-center">Select an item from the tree to edit its properties,<br />or add a new one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
