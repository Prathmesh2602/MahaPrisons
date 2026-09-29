import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';

interface ContactUsLayoutEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const ContactInfoEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { 
    icon: 'MapPin',
    title: { mr: '', en: '' },
    text: { mr: '', en: '' }
  };
  
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  const handleBilingualUpdate = (key: string, lang: 'mr' | 'en', value: string) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    if (!newItem[key]) newItem[key] = { mr: '', en: '' };
    newItem[key][lang] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="border border-slate-200 rounded-lg bg-white mb-3 shadow-sm overflow-hidden">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.title?.en || `Contact Info ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="flex flex-col gap-3 py-3 pr-2 pl-2 bg-white border-t border-slate-200 border-l-[3px] border-l-blue-500">
          <IconPickerInput 
            label="Icon" 
            value={currentItem.icon || 'MapPin'} 
            onChange={(val) => handleLocalUpdate('icon', val)} 
          />
          
          <hr className="border-t border-slate-100 my-1" />
          
          <div className="space-y-1">
            <PhoneticInput 
              label="Title"
              value={currentItem.title?.mr || ''} 
              onChange={(val) => handleBilingualUpdate('title', 'mr', val)} 
              englishValue={currentItem.title?.en || ''}
              onEnglishChange={(val) => handleBilingualUpdate('title', 'en', val)} 
              className="w-full" 
            />
          </div>

          <hr className="border-t border-slate-100 my-1" />

          <div className="space-y-1">
            <PhoneticInput 
              label="Text Details"
              value={currentItem.text?.mr || ''} 
              onChange={(val) => handleBilingualUpdate('text', 'mr', val)} 
              englishValue={currentItem.text?.en || ''}
              onEnglishChange={(val) => handleBilingualUpdate('text', 'en', val)} 
              className="w-full" 
              multiline={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ContactUsLayoutEditor: React.FC<ContactUsLayoutEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const defaultData = {
    title: { en: "Contact Us", mr: "संपर्क साधा" },
    subtitle: { en: "We'd love to hear from you. Please reach out with any inquiries.", mr: "आम्हाला तुमच्याकडून ऐकायला आवडेल. कृपया कोणत्याही चौकशीसाठी संपर्क साधा." },
    contactInfo: [],
    formLabels: {
      name: { en: "Full Name", mr: "पूर्ण नाव" },
      email: { en: "Email Address", mr: "ई-मेल पत्ता" },
      subject: { en: "Subject", mr: "विषय" },
      message: { en: "Your Message", mr: "तुमचा संदेश" },
      submit: { en: "Send Message", mr: "संदेश पाठवा" }
    }
  };

  const history = useBlockHistory(defaultData, data, updateData);
  const currentData = history.value || defaultData;
  
  const displaySection = expandedSection || 'headers';
  const [expandedInfoIndex, setExpandedInfoIndex] = useState<string[]>([]);

  // Sync back defaults if empty
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      updateData(defaultData);
    }
  }, []);

  const handleUpdate = (key: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(currentData));
    if (key.includes('.')) {
      const parts = key.split('.');
      if (parts.length === 3) {
        if (!newData[parts[0]]) newData[parts[0]] = {};
        if (!newData[parts[0]][parts[1]]) newData[parts[0]][parts[1]] = {};
        newData[parts[0]][parts[1]][parts[2]] = value;
      } else {
        if (!newData[parts[0]]) newData[parts[0]] = {};
        newData[parts[0]][parts[1]] = value;
      }
    } else {
      newData[key] = value;
    }
    history.update(newData);
  };

  const handleInfoUpdate = (index: number, newInfo: any) => {
    const newData = JSON.parse(JSON.stringify(currentData));
    if (!newData.contactInfo) newData.contactInfo = [];
    newData.contactInfo[index] = newInfo;
    history.update(newData);
  };

  const handleAddInfo = () => {
    const newData = JSON.parse(JSON.stringify(currentData));
    if (!newData.contactInfo) newData.contactInfo = [];
    newData.contactInfo.unshift({ icon: 'Info', title: { mr: '', en: '' }, text: { mr: '', en: '' } });
    history.update(newData);
    setExpandedInfoIndex(prev => ["0", ...prev.map(i => (parseInt(i) + 1).toString())]);
  };

  const handleRemoveInfo = (index: number) => {
    const newData = JSON.parse(JSON.stringify(currentData));
    if (!newData.contactInfo) return;
    newData.contactInfo.splice(index, 1);
    history.update(newData);
    setExpandedInfoIndex(prev => prev.filter(i => i !== index.toString()).map(i => parseInt(i) > index ? (parseInt(i) - 1).toString() : i));
  };

  const handleMoveInfo = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(currentData));
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newData.contactInfo.length) return;
    
    const temp = newData.contactInfo[index];
    newData.contactInfo[index] = newData.contactInfo[newIndex];
    newData.contactInfo[newIndex] = temp;
    history.update(newData);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Headers Section */}
      {displaySection === 'headers' && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <EditorBlockHeader 
            title="Page Headers" 
            isExpanded={true} 
            onToggle={() => {}} 
            history={history} 
          />
          <div className="flex flex-col gap-3 py-3 pr-2 pl-2 border-t border-slate-200 border-l-[3px] border-l-blue-500">
            <div className="space-y-1">
              <PhoneticInput 
                label="Page Title"
                value={currentData.title?.mr || ''} 
                onChange={(val) => handleUpdate('title.mr', val)} 
                englishValue={currentData.title?.en || ''}
                onEnglishChange={(val) => handleUpdate('title.en', val)} 
                className="w-full" 
              />
            </div>
            
            <hr className="border-t border-slate-100 my-1" />
            
            <div className="space-y-1">
              <PhoneticInput 
                label="Page Subtitle"
                value={currentData.subtitle?.mr || ''} 
                onChange={(val) => handleUpdate('subtitle.mr', val)} 
                englishValue={currentData.subtitle?.en || ''}
                onEnglishChange={(val) => handleUpdate('subtitle.en', val)} 
                className="w-full" 
                multiline={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Items Section */}
      {displaySection === 'info' && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <EditorBlockHeader 
            title="Contact Information Grid" 
            isExpanded={true} 
            onToggle={() => {}} 
            history={history} 
            rightAction={
              <button 
                onClick={handleAddInfo}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-200 transition-colors"
              >
                <Plus size={14} /> Add Info
              </button>
            }
          />
          <div className="flex flex-col gap-3 py-3 pr-2 pl-2 border-t border-slate-200 border-l-[3px] border-l-blue-500">
            {(currentData.contactInfo || []).map((info: any, index: number) => (
              <ContactInfoEditorItem
                key={index}
                index={index}
                itemData={info}
                onUpdateFull={handleInfoUpdate}
                onRemove={() => handleRemoveInfo(index)}
                onMoveUp={() => handleMoveInfo(index, 'up')}
                onMoveDown={() => handleMoveInfo(index, 'down')}
                isFirst={index === 0}
                isLast={index === (currentData.contactInfo?.length || 0) - 1}
                isExpanded={expandedInfoIndex.includes(index.toString())}
                onToggle={() => setExpandedInfoIndex(prev => prev.includes(index.toString()) ? prev.filter(i => i !== index.toString()) : [...prev, index.toString()])}
              />
            ))}
            
            {(!currentData.contactInfo || currentData.contactInfo.length === 0) && (
              <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                No contact information blocks added. Click "Add Info" to begin.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Labels Section */}
      {displaySection === 'forms' && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <EditorBlockHeader 
            title="Contact Form Labels" 
            isExpanded={true} 
            onToggle={() => {}} 
            history={history} 
          />
          <div className="flex flex-col gap-3 py-3 pr-2 pl-2 border-t border-slate-200 border-l-[3px] border-l-blue-500">
            {['name', 'email', 'subject', 'message', 'submit'].map((fieldKey, index) => (
              <React.Fragment key={fieldKey}>
                <div className="space-y-1">
                  <PhoneticInput 
                    label={`${fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)} Label`}
                    value={currentData.formLabels?.[fieldKey]?.mr || ''} 
                    onChange={(val) => handleUpdate(`formLabels.${fieldKey}.mr`, val)} 
                    englishValue={currentData.formLabels?.[fieldKey]?.en || ''}
                    onEnglishChange={(val) => handleUpdate(`formLabels.${fieldKey}.en`, val)} 
                    className="w-full" 
                  />
                </div>
                {index < 4 && <hr className="border-t border-slate-100 my-1" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsLayoutEditor;
