import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Send, Save, ArrowUp, ArrowDown, Trash2, Plus, Edit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../Button';
import { IconPicker } from '../IconPicker';
import * as lucideIcons from 'lucide-react';

const GeneralSettingsBlock = ({ settingsData, onUpdateFull, onTranslate, isExpanded, onToggle }: any) => {
  const defaultSettings = { 
    youtubeUrl: "https://www.youtube.com/@CShamkant",
    heading: { mr: "येरवडा खुले कारागृह: एक दृष्टिक्षेप", en: "Yerawada Open Prison: A Glance" },
    subheading: { mr: "अधिक माहितीसाठी", en: "For More Information" }
  };
  
  const settingsHist = useBlockHistory(
    defaultSettings,
    settingsData,
    (newData) => onUpdateFull(newData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newSettings = JSON.parse(JSON.stringify(settingsHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newSettings[parent]) newSettings[parent] = {};
      newSettings[parent][child] = value;
    } else {
      newSettings[key] = value;
    }
    settingsHist.update(newSettings);
  };

  const currentData = settingsHist.value;

  return (
    <div className="space-y-1">
      <EditorBlockHeader
        title="General Settings"
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={settingsHist}
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-red-500">
          <div className="space-y-1">
            <PhoneticInput label="Subheading (Marathi)" value={currentData.subheading?.mr} onChange={(val) => handleLocalUpdate('subheading.mr', val)} onTranslate={(text) => onTranslate(text, 'subheading.en')} />
            <PhoneticInput label="Subheading (English)" transliterate={false} value={currentData.subheading?.en} onChange={(val) => handleLocalUpdate('subheading.en', val)} />
          </div>
          <div className="space-y-1">
            <PhoneticInput label="Heading (Marathi)" value={currentData.heading?.mr} onChange={(val) => handleLocalUpdate('heading.mr', val)} onTranslate={(text) => onTranslate(text, 'heading.en')} />
            <PhoneticInput label="Heading (English)" transliterate={false} value={currentData.heading?.en} onChange={(val) => handleLocalUpdate('heading.en', val)} />
          </div>
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <PhoneticInput label="YouTube Channel URL" transliterate={false} value={currentData.youtubeUrl} onChange={(val) => handleLocalUpdate('youtubeUrl', val)} placeholder="https://youtube.com/..." />
          </div>
        </div>
      )}
    </div>
  );
};

const InsightCardBlock = ({
  index, cardData, onUpdateFull, onTranslate, isExpanded, onToggle,
  isFirst, isLast, onMoveUp, onMoveDown, onRemove
}: any) => {
  const defaultCard = { title: { mr: "", en: "" }, desc: { mr: "", en: "" }, icon: "" };
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const cardHist = useBlockHistory(
    defaultCard,
    cardData,
    (newCardData) => onUpdateFull(index, newCardData)
  );

  const handleLocalUpdate = (key: string, value: string) => {
    const newCard = JSON.parse(JSON.stringify(cardHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newCard[parent]) newCard[parent] = {};
      newCard[parent][child] = value;
    } else {
      newCard[key] = value;
    }
    cardHist.update(newCard);
  };

  const currentCard = cardHist.value;
  const defaultIcons = ["HeartHandshake", "Sprout", "Wrench", "Utensils", "Landmark", "BookOpen"];
  const fallbackIconName = defaultIcons[index % defaultIcons.length];
  const iconNameToRender = currentCard.icon || fallbackIconName;
  const SelectedIcon = (lucideIcons as any)[iconNameToRender] || lucideIcons.Image;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentCard.title?.mr || `Card ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={cardHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Up">
              <ArrowUp size={14} />
            </button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Down">
              <ArrowDown size={14} />
            </button>
            <button onClick={onRemove} className="p-1 text-red-600 hover:bg-red-50 disabled:opacity-30" title="Remove Card">
              <Trash2 size={14} />
            </button>
          </div>
        }
      />
      {isExpanded && (
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm mt-2 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-md border border-slate-200 text-blue-500 shrink-0">
              <SelectedIcon size={20} />
            </div>
            <Button size="sm" variant="outline" onClick={() => setIsIconPickerOpen(true)} className="h-8 text-xs py-0">
              Change Icon
            </Button>
          </div>
          
          <IconPicker 
            isOpen={isIconPickerOpen} 
            onClose={() => setIsIconPickerOpen(false)} 
            selectedIcon={currentCard.icon}
            onSelect={(iconName) => handleLocalUpdate('icon', iconName)} 
          />

          <div className="space-y-1">
            <PhoneticInput label="Title (Marathi)" value={currentCard.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} onTranslate={(text) => onTranslate(text, index, 'title.en')} />
            <PhoneticInput label="Title (English)" transliterate={false} value={currentCard.title?.en} onChange={(val) => handleLocalUpdate('title.en', val)} />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput multiline label="Description (Marathi)" value={currentCard.desc?.mr} onChange={(val) => handleLocalUpdate('desc.mr', val)} onTranslate={(text) => onTranslate(text, index, 'desc.en')} />
            <PhoneticInput multiline label="Description (English)" transliterate={false} value={currentCard.desc?.en} onChange={(val) => handleLocalUpdate('desc.en', val)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const JailInsightsEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const defaultCards = [
    { title: { mr: "सुधारणा आणि पुनर्वसन", en: "Reform and Rehabilitation" }, desc: { mr: "कैद्यांच्या सर्वांगीण विकासासाठी आणि त्यांना समाजाच्या मुख्य प्रवाहात आणण्यासाठी विशेष प्रयत्न.", en: "Special efforts for overall development of inmates." } },
    { title: { mr: "शेती आणि वृक्षारोपण", en: "Agriculture and Plantation" }, desc: { mr: "मोकळ्या जागेचा वापर करून शेती आणि पर्यावरण संवर्धनासाठी मोठ्या प्रमाणावर वृक्षारोपण.", en: "Farming in open spaces and large-scale plantation." } },
    { title: { mr: "कौशल्य विकास कार्यक्रम", en: "Skill Development" }, desc: { mr: "वेल्डिंग, सुतारकाम आणि अन्न प्रक्रिया यांसारख्या व्यावसायिक प्रशिक्षणातून स्वावलंबन.", en: "Self-reliance through vocational training." } },
    { title: { mr: "शृंखला उपहारगृह", en: "Chain Canteen" }, desc: { mr: "कैद्यांमार्फत चालवले जाणारे हॉटेल, जिथे त्यांना रोजगार आणि कौशल्य विकासाची संधी मिळते.", en: "Hotel run by inmates providing employment opportunities." } },
    { title: { mr: "ऐतिहासिक वारसा", en: "Historical Heritage" }, desc: { mr: "येरवडा कारागृहाला मोठा इतिहास लाभला असून, येथे महात्मा गांधी आणि इतर स्वातंत्र्यसैनिकांना ठेवण्यात आले होते.", en: "Yerwada jail has a rich history." } },
    { title: { mr: "शिक्षण आणि साक्षरता", en: "Education and Literacy" }, desc: { mr: "कैद्यांसाठी मूलभूत साक्षरता आणि मुक्त विद्यापीठांमार्फत उच्च शिक्षणाच्या सुविधा.", en: "Basic literacy and higher education facilities." } }
  ];

  const safeData = initialData || {
    youtubeUrl: "https://www.youtube.com/@CShamkant",
    cards: defaultCards
  };

  const {
    data,
    setData,
    historyIndex,
    historyLength,
    updateHistoryState,
    handleUndo,
    handleRedo,
    handleReset,
    handleSave,
    hasChanges
  } = useBlockEditorState(blockId, safeData, onPreviewUpdate);

  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const updateRootFull = (newSettingsData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.youtubeUrl = newSettingsData.youtubeUrl;
    newData.heading = newSettingsData.heading;
    newData.subheading = newSettingsData.subheading;
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslateGeneral = async (text: string, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) {
        const newData = JSON.parse(JSON.stringify(data));
        if (targetKey.includes('.')) {
          const [parent, child] = targetKey.split('.');
          if (!newData[parent]) newData[parent] = {};
          newData[parent][child] = translatedText;
        } else {
          newData[targetKey] = translatedText;
        }
        setData(newData);
        updateHistoryState(newData);
      }
    } catch (err) { console.error('Translation failed', err); }
  };

  const updateRootField = (key: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[key] = value;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateCardFull = (index: number, fullCardData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.cards) newData.cards = defaultCards;
    newData.cards[index] = fullCardData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateCardField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.cards) newData.cards = defaultCards;
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.cards[index][parent]) newData.cards[index][parent] = {};
      newData.cards[index][parent][child] = value;
    } else {
      newData.cards[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslateCard = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateCardField(index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  const handleMoveCardUp = (index: number) => {
    if (index === 0) return;
    const newData = JSON.parse(JSON.stringify(data));
    const temp = newData.cards[index];
    newData.cards[index] = newData.cards[index - 1];
    newData.cards[index - 1] = temp;
    setData(newData);
    updateHistoryState(newData);
  };

  const handleMoveCardDown = (index: number) => {
    if (index === data.cards.length - 1) return;
    const newData = JSON.parse(JSON.stringify(data));
    const temp = newData.cards[index];
    newData.cards[index] = newData.cards[index + 1];
    newData.cards[index + 1] = temp;
    setData(newData);
    updateHistoryState(newData);
  };

  const handleRemoveCard = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.cards.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const handleAddCard = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.cards) newData.cards = defaultCards;
    newData.cards.push({ title: { mr: "", en: "" }, desc: { mr: "", en: "" }, icon: "" });
    setData(newData);
    updateHistoryState(newData);
    setExpandedBlock(`card-${newData.cards.length - 1}`);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Jail Insights"
        onUndo={handleUndo}
        canUndo={historyIndex > 0}
        onRedo={handleRedo}
        canRedo={historyIndex < historyLength - 1}
        onReset={handleReset}
        onSave={handleSave}
        isSaveDisabled={!hasChanges}
        saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
        saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
      />

      <GeneralSettingsBlock 
        settingsData={{ 
          youtubeUrl: data.youtubeUrl || "https://www.youtube.com/@CShamkant",
          heading: data.heading || { mr: "येरवडा खुले कारागृह: एक दृष्टिक्षेप", en: "Yerawada Open Prison: A Glance" },
          subheading: data.subheading || { mr: "अधिक माहितीसाठी", en: "For More Information" }
        }}
        onUpdateFull={updateRootFull}
        onTranslate={handleTranslateGeneral}
        isExpanded={expandedBlock === 'general'}
        onToggle={() => setExpandedBlock(expandedBlock === 'general' ? null : 'general')}
      />

      <hr className="border-t border-dashed border-slate-200 my-2" />

      <div className="w-full flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-slate-700">Insight Cards</h3>
        <div className="w-full space-y-2">
          {(data.cards || defaultCards).map((card: any, index: number) => (
            <InsightCardBlock
              key={index}
              index={index}
              cardData={card}
              onUpdateFull={updateCardFull}
              onTranslate={handleTranslateCard}
              isExpanded={expandedBlock === `card-${index}`}
              onToggle={() => setExpandedBlock(expandedBlock === `card-${index}` ? null : `card-${index}`)}
              isFirst={index === 0}
              isLast={index === (data.cards || defaultCards).length - 1}
              onMoveUp={() => handleMoveCardUp(index)}
              onMoveDown={() => handleMoveCardDown(index)}
              onRemove={() => handleRemoveCard(index)}
            />
          ))}
          <Button variant="outline" onClick={handleAddCard} className="w-full justify-center border-dashed border-2 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 py-2" icon={<Plus size={16} />}>
            Add Insight Card
          </Button>
        </div>
      </div>
    </div>
  );
};
