import { FormGroup, LanguageInput, ArrayEditor, TextField } from './FormElements';
import { MediaPicker } from '../../MediaPicker';

export const PhotoGalleryForm = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded p-4 bg-white">
        <FormGroup label="Section Title">
          <LanguageInput 
            value={data?.title || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, title: val })} 
          />
        </FormGroup>
        
        <FormGroup label="Album Title (Optional)">
          <LanguageInput 
            value={data?.albumTitle || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, albumTitle: val })} 
          />
        </FormGroup>

        <FormGroup label="View All Link">
          <TextField 
            value={data?.gallery?.view_all_href || ''} 
            onChange={(val) => onChange({ ...data, gallery: { ...data.gallery, view_all_href: val } })} 
            placeholder="e.g. /gallery"
          />
        </FormGroup>
      </div>

      <ArrayEditor
        title="Gallery Images"
        items={data?.gallery?.items || []}
        onChange={(newItems) => onChange({ ...data, gallery: { ...data.gallery, items: newItems } })}
        newItemTemplate={{ img_src: '', img_alt: {en:'', mr:''}, href: '' }}
        renderItem={(item, updateItem) => (
          <div className="space-y-4">
            <MediaPicker 
              label="Photo"
              value={item.img_src}
              onSelect={(val) => updateItem({ ...item, img_src: val, href: val })}
            />
            
            <FormGroup label="Image Alt Text (Description)">
              <LanguageInput 
                value={item.img_alt || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, img_alt: val })} 
              />
            </FormGroup>
          </div>
        )}
      />
    </div>
  );
};
