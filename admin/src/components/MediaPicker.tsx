import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { apiFetch } from '../utils/api';

export const MediaPicker = ({ onSelect, label = 'Image', value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/v1/upload');
      setMediaList(data);
    } catch (error) {
      console.error('Failed to fetch media', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('altEn', file.name);
    formData.append('altMr', file.name);

    setIsUploading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.url) {
        onSelect(data.url);
        setIsOpen(false);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Upload failed');
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-700 mb-2">{label}</label>
      
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
            <img src={value.startsWith('http') ? value : `http://localhost:5173${value}`} alt="Selected" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-white text-xs px-2 py-1 bg-blue-600 rounded"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <ImageIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Select</span>
          </button>
        )}
        

      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Media Library</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {isUploading ? 'Uploading...' : 'Upload New Image'}
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
              />
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center p-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : mediaList.length === 0 ? (
                <div className="text-center p-12 text-gray-500">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No media uploaded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {mediaList.map((media) => (
                    <div 
                      key={media.id}
                      onClick={() => {
                        onSelect(media.url);
                        setIsOpen(false);
                      }}
                      className="aspect-square rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer overflow-hidden bg-gray-100 relative group"
                    >
                      <img src={media.url.startsWith('http') ? media.url : `http://localhost:5173${media.url}`} alt={media.filename} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
