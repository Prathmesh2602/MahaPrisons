import React from 'react';
import { FormGroup, LanguageInput, ArrayEditor } from './FormElements';
import { MediaPicker } from '../../MediaPicker';
import { Image as ImageIcon } from 'lucide-react';

export const FullGalleryForm = ({ data, onChange }) => {
  const title = data?.title || { en: '', mr: '' };
  const subtitle = data?.subtitle || { en: '', mr: '' };

  return (
    <div className="space-y-6">
      <div className="bg-white p-1">
        <FormGroup label="Page Title">
          <LanguageInput 
            value={title} 
            onChange={(val) => onChange({ ...data, title: val })} 
          />
        </FormGroup>

        <FormGroup label="Page Subtitle">
          <LanguageInput 
            isTextArea 
            value={subtitle} 
            onChange={(val) => onChange({ ...data, subtitle: val })} 
          />
        </FormGroup>
      </div>

      <ArrayEditor
        title="Gallery Items"
        items={data?.items || []}
        onChange={(newItems) => onChange({ ...data, items: newItems })}
        newItemTemplate={{ img_src: '', img_alt: '', title_en: '', title_mr: '', desc_en: '', desc_mr: '' }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <MediaPicker 
              label="Image"
              value={item.img_src}
              onSelect={(val) => updateItem({ ...item, img_src: val })}
              fallbackIcon={<ImageIcon className="w-10 h-10 text-gray-400" />}
            />

            <div className="space-y-4">
              <FormGroup label="Title">
                <LanguageInput 
                  value={{ en: item.title_en || '', mr: item.title_mr || '' }}
                  onChange={(val) => updateItem({ ...item, title_en: val.en, title_mr: val.mr })}
                />
              </FormGroup>

              <FormGroup label="Description">
                <div className="relative">
                  <LanguageInput 
                    isTextArea
                    value={{ en: item.desc_en || '', mr: item.desc_mr || '' }}
                    onChange={(val) => updateItem({ ...item, desc_en: val.en, desc_mr: val.mr })}
                  />
                  {item.img_src && (
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={async () => {
                          try {
                            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
                            const res = await fetch(`${apiUrl}/ai/describe-image`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ imageUrl: item.img_src })
                            });
                            const data = await res.json();
                            if (data.description) {
                              updateItem({ ...item, desc_en: data.description.en, desc_mr: data.description.mr });
                            } else {
                              alert('AI generation failed: ' + (data.error || 'Unknown error'));
                            }
                          } catch (err) {
                            alert('Network error while calling AI service');
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 rounded-full text-xs font-semibold shadow-sm transition-all"
                        title="Generate description based on image"
                      >
                        <span className="text-sm">✨</span> {(item.desc_en || item.desc_mr) ? 'Recreate using AI' : 'AI Generate Description'}
                      </button>
                    </div>
                  )}
                </div>
              </FormGroup>
            </div>
            
            <FormGroup label="Image Alt Text (SEO)">
              <input
                type="text"
                value={item.img_alt}
                onChange={(e) => updateItem({ ...item, img_alt: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Alternative text for image..."
              />
            </FormGroup>
          </div>
        )}
      />
    </div>
  );
};
