import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BlockFormRenderer } from '../components/VisualBuilder/BlockFormRenderer';

export const VisualBuilder = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [page, setPage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const iframeRef = useRef(null);

  // Fetch page and blocks
  const fetchPageData = async () => {
    setLoading(true);
    try {
      const [pageRes, blocksRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/admin/pages/${pageId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/admin/pages/${pageId}/blocks`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      if (pageRes.ok) setPage(await pageRes.json());
      if (blocksRes.ok) setBlocks(await blocksRes.json());
    } catch (err) {
      console.error('Failed to load page data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageId) fetchPageData();
  }, [pageId, token]);

  // Listen for iframe messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'BLOCK_SELECTED') {
        setSelectedBlockId(event.data.payload.blockId);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Sync blocks to iframe when they change
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_PREVIEW_BLOCKS',
        payload: { blocks }
      }, '*');
    }
  }, [blocks]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/pages/${pageId}/blocks`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ blocks })
      });
      if (res.ok) alert('Page saved successfully!');
      else alert('Failed to save page.');
    } catch (err) {
      console.error(err);
      alert('Error saving page.');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all unsaved changes?')) {
      setSelectedBlockId(null);
      fetchPageData();
    }
  };

  const addBlock = () => {
    const newBlock = {
      id: `new-${Date.now()}`,
      blockType: 'RICH_TEXT',
      data: { html: '<h2>New Text Block</h2><p>Click to edit...</p>' }
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateSelectedBlock = (newData) => {
    setBlocks(blocks.map(b => b.id === selectedBlockId ? { ...b, data: newData } : b));
  };

  if (loading) return <div className="p-8">Loading Visual Builder...</div>;
  if (!page) return <div className="p-8 text-red-500">Page not found</div>;

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* LEFT PANE: Iframe Preview */}
      <div className="flex-1 flex flex-col relative border-r border-gray-200 bg-white">
        {/* Topbar */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/navigation')} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">{page.titleMr} <span className="text-xs font-normal text-gray-500 ml-1">({page.titleEn})</span></span>
              <span className="text-[10px] text-gray-500 font-mono">/{page.slug}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDiscard}
              className="px-3 py-1.5 flex items-center gap-1.5 text-gray-600 hover:text-red-600 bg-transparent rounded hover:bg-red-50 transition-colors text-sm font-medium"
            >
              Discard Changes
            </button>
            <button 
              onClick={addBlock}
              className="px-3 py-1.5 flex items-center gap-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium"
            >
              <Plus size={16} /> Add Block
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 flex items-center gap-2 bg-amber-500 text-white rounded hover:bg-amber-600 disabled:opacity-50 text-sm font-medium"
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save Page'}
            </button>
          </div>
        </div>

        {/* Live Iframe */}
        <div className="flex-1 bg-gray-200 p-4">
          <div className="w-full h-full bg-white rounded-lg shadow-inner overflow-hidden border border-gray-300 mx-auto max-w-screen-xl">
            <iframe
              ref={iframeRef}
              src={`http://localhost:5173/preview?previewSlug=${page.slug}&preview=true`}
              className="w-full h-full border-none"
              title="Visual Preview"
              onLoad={() => {
                // Initial sync when iframe loads
                if (iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage({
                    type: 'UPDATE_PREVIEW_BLOCKS',
                    payload: { blocks }
                  }, '*');
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Properties */}
      <div className="w-[500px] bg-white flex flex-col h-full z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.05)]">
        <div className="h-14 border-b border-gray-200 flex items-center px-4 bg-gray-50 shrink-0">
          <h2 className="font-semibold text-gray-800">Properties</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {!selectedBlockId ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg mb-3 flex items-center justify-center text-gray-300">
                <Plus size={24} />
              </div>
              <p className="text-sm">Click any component in the preview to edit its properties.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Block Type</label>
                <div className="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded border border-blue-100 inline-block">
                  {selectedBlock?.blockType}
                </div>
              </div>

              <div className="flex-1">
                <BlockFormRenderer
                  blockType={selectedBlock?.blockType}
                  data={selectedBlock?.data || {}}
                  onChange={(newData) => updateSelectedBlock(newData)}
                />
              </div>
              
              <button 
                onClick={() => {
                  setBlocks(blocks.filter(b => b.id !== selectedBlockId));
                  setSelectedBlockId(null);
                }}
                className="w-full px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-medium transition-colors text-sm"
              >
                Delete Block
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
