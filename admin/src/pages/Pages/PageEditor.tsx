import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { Save, Send, AlertTriangle } from 'lucide-react';

export default function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) fetchPage();
  }, [id]);

  const fetchPage = async () => {
    try {
      const data = await apiClient(`/pages/${id}`);
      setPage(data);
      setBlocks(data.blocks || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load page');
      navigate('/pages');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockChange = (index: number, value: string) => {
    const newBlocks = [...blocks];
    try {
      newBlocks[index].data = JSON.parse(value);
      newBlocks[index].parseError = false;
    } catch (e) {
      newBlocks[index].rawData = value;
      newBlocks[index].parseError = true;
    }
    setBlocks(newBlocks);
  };

  const handleSubmitReview = async () => {
    if (blocks.some(b => b.parseError)) {
      alert('Please fix JSON parsing errors in blocks before submitting.');
      return;
    }

    setSaving(true);
    try {
      await apiClient(`/pages/${id}/submit-for-review`, {
        method: 'POST',
        body: JSON.stringify({ blocks })
      });
      alert('Submitted for review successfully! A Checker will review your changes.');
      navigate('/pages');
    } catch (err: any) {
      alert(err.message || 'Error submitting');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{id ? `Editing: ${page?.titleMr} (${page?.titleEn})` : 'Create New Page'}</h2>
          <p className="text-gray-500 font-mono text-sm mt-1">/{page?.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button
            onClick={handleSubmitReview}
            disabled={saving || !id}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-2 shadow-sm disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" /> {saving ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-800">Content Blocks</h3>
          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium">Template: {page?.templateId}</span>
        </div>
        
        {blocks.length === 0 && <p className="text-gray-500 text-sm italic p-4 text-center">No blocks found. Add blocks to build the page.</p>}
        
        <div className="space-y-4">
          {blocks.map((block, idx) => (
            <div key={block.id || idx} className={`p-4 bg-slate-50 border ${block.parseError ? 'border-red-300' : 'border-slate-200'} rounded-lg transition-colors`}>
              <div className="flex justify-between mb-3 items-center">
                <span className="font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-md text-xs shadow-sm">
                  {block.blockType}
                </span>
                {block.parseError && (
                  <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                    <AlertTriangle className="w-3 h-3" /> Invalid JSON
                  </span>
                )}
              </div>
              <textarea
                className={`w-full font-mono text-sm p-3 border rounded-md shadow-inner outline-none transition-colors ${
                  block.parseError 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500 text-red-900' 
                    : 'border-slate-300 bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900'
                }`}
                rows={8}
                defaultValue={block.rawData || JSON.stringify(block.data, null, 2)}
                onChange={(e) => handleBlockChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 font-medium hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center gap-2">
          Add New Block
        </button>
      </div>
    </div>
  );
}
