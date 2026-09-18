import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from './Button';
import { X, Upload, Image as ImageIcon, Search, Trash2, Loader2, FileText } from 'lucide-react';

interface MediaLibraryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface MediaItem {
  id: string;
  filename: string;
  url: string;
}

export const MediaLibraryPopup: React.FC<MediaLibraryPopupProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/media');
      setMediaList(res.data);
    } catch (err) {
      console.error('Failed to fetch media:', err);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const res = await axios.post('http://localhost:5000/api/v1/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Prepend to list
      setMediaList(prev => [res.data, ...prev]);
      setSelectedImg(`http://localhost:5000${res.data.url}`);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Upload failed');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/v1/media/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMediaList(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-800">
            <ImageIcon className="text-blue-500" size={20} />
            <h2 className="font-bold text-lg">Media Library</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search media..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
              />
            </div>
            
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
              <Button onClick={handleUploadClick} variant="outline" disabled={isUploading} icon={isUploading ? <Loader2 className="animate-spin" size={16}/> : <Upload size={16} />}>
                {isUploading ? 'Uploading...' : 'Upload New'}
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {mediaList.length === 0 && !isUploading && (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p>No media files found. Upload some!</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaList.map((item) => {
                const fullUrl = `http://localhost:5000${item.url}`;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedImg(fullUrl)}
                    className={`group relative aspect-square bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImg === fullUrl ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {fullUrl.toLowerCase().endsWith('.pdf') ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50">
                        <FileText size={40} className="text-red-500 mb-2" />
                        <span className="text-[10px] text-center font-medium text-slate-700 leading-tight break-all line-clamp-3" title={item.filename}>
                          {item.filename}
                        </span>
                      </div>
                    ) : (
                      <img src={fullUrl} alt={item.filename} className="w-full h-full object-contain p-2" />
                    )}
                    
                    {/* Delete Button (visible on hover) */}
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="absolute top-2 left-2 bg-red-500 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>

                    {selectedImg === fullUrl && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-sm">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            disabled={!selectedImg}
            onClick={() => {
              if (selectedImg) {
                onSelect(selectedImg);
                onClose();
              }
            }}
          >
            Insert Media
          </Button>
        </div>
      </div>
    </div>
  );
};

