import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, PlusCircle, MinusCircle, Info } from 'lucide-react';

interface ReviewDiffViewerProps {
  revisionId: string;
}

export const ReviewDiffViewer: React.FC<ReviewDiffViewerProps> = ({ revisionId }) => {
  const [diffData, setDiffData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiff = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/review/${revisionId}/diff`);
        setDiffData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load diff');
      } finally {
        setLoading(false);
      }
    };
    if (revisionId) fetchDiff();
  }, [revisionId]);

  if (loading) return <div className="p-4 text-gray-500 animate-pulse">Calculating changes...</div>;
  if (error) return <div className="p-4 text-red-500 bg-red-50 rounded-md">Error: {error}</div>;
  if (!diffData) return null;

  const { modelName, oldData, newData } = diffData;

  const getFriendlyFieldName = (key: string) => {
    const map: Record<string, string> = {
      label_en: 'Label (English)',
      label_mr: 'Label (Marathi)',
      href: 'Link URL',
      icon: 'Icon',
      order: 'Display Order',
      visible: 'Visible',
      isGroupHeader: 'Is Group Header',
      site_title_en: 'Site Title (English)',
      site_title_mr: 'Site Title (Marathi)',
      contact_email: 'Contact Email',
      contact_phone: 'Contact Phone'
    };
    return map[key] || key;
  };

  const formatValue = (val: any) => {
    if (val === null || val === undefined) return 'None';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  const renderSiteSettingDiff = () => {
    // oldData is array of {key, value}, newData is array of {key, value}
    const changes: any[] = [];
    
    // Find what changed
    newData.forEach((newSetting: any) => {
      const oldSetting = oldData?.find((s: any) => s.key === newSetting.key);
      if (!oldSetting) {
        changes.push({ key: newSetting.key, old: null, new: newSetting.value, type: 'added' });
      } else if (JSON.stringify(oldSetting.value) !== JSON.stringify(newSetting.value)) {
        changes.push({ key: newSetting.key, old: oldSetting.value, new: newSetting.value, type: 'modified' });
      }
    });

    if (changes.length === 0) {
      return <div className="text-gray-500 italic p-4">No settings were changed.</div>;
    }

    return (
      <div className="space-y-4">
        {changes.map((change, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium text-gray-700">
              {getFriendlyFieldName(change.key)}
            </div>
            <div className="p-4">
              {change.type === 'added' ? (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded">
                  <PlusCircle size={16} /> 
                  <span className="font-semibold">{formatValue(change.new)}</span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-red-50 text-red-700 p-2 rounded line-through opacity-70">
                    {formatValue(change.old)}
                  </div>
                  <ArrowRight size={20} className="text-gray-400 shrink-0" />
                  <div className="flex-1 bg-green-50 text-green-700 p-2 rounded font-semibold border border-green-100">
                    {formatValue(change.new)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMenuDiff = () => {
    const changes: any[] = [];
    
    const flattenTree = (tree: any[], parentPath = '') => {
      let flat: any[] = [];
      tree.forEach(item => {
        const path = parentPath ? `${parentPath} > ${item.label_en}` : item.label_en;
        flat.push({ ...item, _path: path });
        if (item.children && item.children.length > 0) {
          flat = flat.concat(flattenTree(item.children, path));
        }
      });
      return flat;
    };

    const oldFlat = flattenTree(oldData || []);
    const newFlat = flattenTree(newData || []);

    // 1. Find Added and Modified
    newFlat.forEach(newItem => {
      const oldItem = oldFlat.find(old => old._path === newItem._path);
      if (!oldItem) {
        changes.push({ path: newItem._path, type: 'added', new: newItem });
      } else {
        const modifiedFields: any[] = [];
        ['label_mr', 'href', 'icon', 'isGroupHeader'].forEach(field => {
          if (newItem[field] !== oldItem[field]) {
             modifiedFields.push({ field, old: oldItem[field], new: newItem[field] });
          }
        });
        if (modifiedFields.length > 0) {
          changes.push({ path: newItem._path, type: 'modified', fields: modifiedFields });
        }
      }
    });

    // 2. Find Removed
    oldFlat.forEach(oldItem => {
      const newItem = newFlat.find(newI => newI._path === oldItem._path);
      if (!newItem) {
        changes.push({ path: oldItem._path, type: 'removed', old: oldItem });
      }
    });

    if (changes.length === 0) {
      return <div className="text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-200">No menu items were changed.</div>;
    }

    return (
      <div className="space-y-4">
        {changes.map((change, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium text-gray-700 flex justify-between items-center">
              <span>{change.path}</span>
              {change.type === 'added' && <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded border border-green-200 uppercase font-bold">Added</span>}
              {change.type === 'removed' && <span className="bg-red-100 text-red-700 px-2 py-0.5 text-xs rounded border border-red-200 uppercase font-bold">Removed</span>}
              {change.type === 'modified' && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs rounded border border-blue-200 uppercase font-bold">Modified</span>}
            </div>
            
            <div className="p-4">
              {change.type === 'added' && (
                <div className="text-sm text-gray-600">
                  <div><strong>Marathi:</strong> {change.new.label_mr}</div>
                  {change.new.href && <div><strong>URL:</strong> {change.new.href}</div>}
                  {change.new.isGroupHeader && <div className="text-blue-600 mt-1">Set as Group Header</div>}
                </div>
              )}
              
              {change.type === 'removed' && (
                <div className="text-sm text-gray-400 line-through">
                  <div><strong>Marathi:</strong> {change.old.label_mr}</div>
                  {change.old.href && <div><strong>URL:</strong> {change.old.href}</div>}
                </div>
              )}
              
              {change.type === 'modified' && (
                <div className="space-y-3">
                  {change.fields.map((f: any, fIdx: number) => (
                    <div key={fIdx} className="text-sm">
                      <div className="font-semibold text-gray-600 mb-1">{getFriendlyFieldName(f.field)}</div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-red-50 text-red-700 p-2 rounded line-through opacity-70">
                          {formatValue(f.old)}
                        </div>
                        <ArrowRight size={16} className="text-gray-400 shrink-0" />
                        <div className="flex-1 bg-green-50 text-green-700 p-2 rounded font-semibold border border-green-100">
                          {formatValue(f.new)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {modelName === 'SiteSetting' && renderSiteSettingDiff()}
      {modelName === 'Menu' && renderMenuDiff()}
      {modelName !== 'SiteSetting' && modelName !== 'Menu' && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
          Diff view for {modelName} is not yet implemented.
        </div>
      )}
    </div>
  );
};
