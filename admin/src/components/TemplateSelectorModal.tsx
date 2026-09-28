import React, { useState } from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

const templates: TemplateOption[] = [
  { id: 'HeroFeaturesTimelineLayout', name: 'Hero Features Timeline', description: 'Hero section, features grid, and vertical timeline.', image: '/template-previews/HeroFeaturesTimelineLayout.webp' },
  { id: 'HeroStatsGrid', name: 'Hero Stats Grid', description: 'Hero section with statistics and image gallery.', image: '/template-previews/HeroStatsGrid.webp' },
  { id: 'HeroThreeColGrid', name: 'Hero Three Column Grid', description: 'Hero section with 3-column features and gallery.', image: '/template-previews/HeroThreeColGrid.webp' },
  { id: 'HeroSplitTimeline', name: 'Hero Split Timeline', description: 'Hero section with split view and timeline.', image: '/template-previews/HeroSplitTimeline.webp' },
  { id: 'HeroFeatureList', name: 'Hero Feature List', description: 'Hero section with prominent feature list.', image: '/template-previews/HeroFeatureList.webp' },
  { id: 'ContactInfoGrid', name: 'Contact Info Grid', description: 'Detailed contact information and key functions.', image: '/template-previews/ContactInfoGrid.webp' },
  { id: 'ContentWithRightSidebar', name: 'Content with Right Sidebar', description: 'Main content area with right sidebar.', image: '/template-previews/ContentWithRightSidebar.webp' },
  { id: 'ContentWithTabs', name: 'Content with Tabs', description: 'Tabbed content sections.', image: '/template-previews/ContentWithTabs.webp' },
  { id: 'BasicFeatureGrid', name: 'Basic Feature Grid', description: 'Simple grid of features or services.', image: '/template-previews/BasicFeatureGrid.webp' },
  { id: 'CardsAndVerticalTimeline', name: 'Cards and Timeline', description: 'Information cards and vertical timeline.', image: '/template-previews/CardsAndVerticalTimeline.webp' },
  { id: 'IconsListWithTimeline', name: 'Icons List with Timeline', description: 'List of icons with accompanying timeline.', image: '/template-previews/IconsListWithTimeline.webp' },
  { id: 'MinimalIconGrid', name: 'Minimal Icon Grid', description: 'Clean, minimal grid of icons.', image: '/template-previews/MinimalIconGrid.webp' },
  { id: 'HeroBannerWithArticles', name: 'Hero Banner with Articles', description: 'Hero banner followed by article grid.', image: '/template-previews/HeroBannerWithArticles.webp' },
  { id: 'SideBySideListCards', name: 'Side by Side List Cards', description: 'List cards displayed side by side.', image: '/template-previews/SideBySideListCards.webp' },
  { id: 'HeroBannerWithBadges', name: 'Hero Banner with Badges', description: 'Hero banner with highlighted badges.', image: '/template-previews/HeroBannerWithBadges.webp' },
  { id: 'HeroBannerWithMedia', name: 'Hero Banner with Media', description: 'Hero banner with integrated media gallery.', image: '/template-previews/HeroBannerWithMedia.webp' },
  { id: 'ContentWithAccordion', name: 'Content with Accordion', description: 'Main content with collapsible accordions.', image: '/template-previews/ContentWithAccordion.webp' },
  { id: 'ThreeColServiceCards', name: 'Three Column Service Cards', description: 'Services displayed in a 3-column layout.', image: '/template-previews/ThreeColServiceCards.webp' },
  { id: 'TwoColEventCards', name: 'Two Column Event Cards', description: 'Events displayed in a 2-column layout.', image: '/template-previews/TwoColEventCards.webp' },
  { id: 'HeroWithProcessGrid', name: 'Hero with Process Grid', description: 'Hero section followed by a process grid.', image: '/template-previews/HeroWithProcessGrid.webp' },
  { id: 'HeroWithPricingList', name: 'Hero with Pricing List', description: 'Hero section with detailed service pricing.', image: '/template-previews/HeroWithPricingList.webp' },
  { id: 'HeroWithMenuGrid', name: 'Hero with Menu Grid', description: 'Hero section with a menu or options grid.', image: '/template-previews/HeroWithMenuGrid.webp' }
];

interface TemplateSelectorModalProps {
  currentTemplate: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({ currentTemplate, isOpen, onClose, onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  if (!isOpen) {
    if (selectedTemplate) setSelectedTemplate(null);
    return null;
  }

  const handleConfirm = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
    }
  };

  if (selectedTemplate) {
    const templateName = templates.find(t => t.id === selectedTemplate)?.name;
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-amber-50">
            <AlertTriangle className="text-amber-500" size={24} />
            <h2 className="text-lg font-bold text-slate-800">Change Template / टेम्पलेट बदला</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <p className="text-slate-700">
              You are about to change the template to <strong>{templateName}</strong>. 
              The new template will load with blank data fields, but your previous template data will be softly stored and can be reverted until you publish or save changes.
            </p>
            <p className="text-slate-700 font-medium font-marathi border-t border-slate-100 pt-4">
              तुम्ही <strong>{templateName}</strong> मध्ये टेम्पलेट बदलणार आहात.
              नवीन टेम्पलेट रिक्त डेटा फील्डसह लोड होईल, परंतु तुमचा मागील टेम्पलेट डेटा तात्पुरता जतन केला जाईल आणि जोपर्यंत तुम्ही बदल जतन करत नाही किंवा प्रकाशित करत नाही तोपर्यंत तो परत मिळवता येईल.
            </p>
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
            <button onClick={() => setSelectedTemplate(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              Cancel / रद्द करा
            </button>
            <button onClick={handleConfirm} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium">
              Confirm Change / बदल निश्चित करा
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Select Page Template</h2>
            <p className="text-sm text-slate-500 mt-1">Choose the layout that best fits your content structure.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((tpl) => (
              <div 
                key={tpl.id}
                onClick={() => {
                  if (currentTemplate === tpl.id) {
                    onClose();
                  } else {
                    setSelectedTemplate(tpl.id);
                  }
                }}
                className={`relative rounded-xl border-2 cursor-pointer transition-all overflow-hidden group ${currentTemplate === tpl.id ? 'border-blue-500 shadow-md ring-2 ring-blue-500 ring-offset-2' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}
              >
                {currentTemplate === tpl.id && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white p-1 rounded-full z-10 shadow-sm">
                    <Check size={16} />
                  </div>
                )}
                <div className="w-full h-48 overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-200 relative">
                  <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-4 bg-white h-28">
                  <h3 className={`font-bold text-sm mb-1 line-clamp-1 ${currentTemplate === tpl.id ? 'text-blue-700' : 'text-slate-800'}`}>
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{tpl.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
