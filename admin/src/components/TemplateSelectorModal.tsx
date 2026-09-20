import React from 'react';
import { X, Check } from 'lucide-react';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

const templates: TemplateOption[] = [
  {
    id: 'HeroFeaturesTimelineLayout',
    name: 'Hero Features Timeline',
    description: 'Best for departments focusing on functions and sequential details (e.g. Administration, Establishment).',
    image: '/templates/HeroFeaturesTimelineLayout.jpg'
  },
  {
    id: 'HeroStatsGrid',
    name: 'Hero Stats Grid',
    description: 'Best for facilities with daily schedules and visual galleries (e.g. Canteen, Hospital).',
    image: '/templates/HeroStatsGrid.jpg'
  },
  {
    id: 'HeroThreeColGrid',
    name: 'Hero Three Column Grid',
    description: 'Best for production-oriented departments showcasing active projects (e.g. Factory, Agriculture).',
    image: '/templates/HeroThreeColGrid.jpg'
  },
  {
    id: 'HeroSplitTimeline',
    name: 'Hero Split Timeline',
    description: 'Best for infrastructural departments highlighting protocols and facilities (e.g. Security, Construction).',
    image: '/templates/HeroSplitTimeline.jpg'
  },
  {
    id: 'HeroFeatureList',
    name: 'Hero Feature List',
    description: 'Hero section with features and highlights.',
    image: '/templates/HeroFeatureList.jpg'
  }
];

interface TemplateSelectorModalProps {
  currentTemplate: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({ currentTemplate, isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
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
                onClick={() => onSelect(tpl.id)}
                className={`relative rounded-xl border-2 cursor-pointer transition-all overflow-hidden group ${currentTemplate === tpl.id ? 'border-emerald-500 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}
              >
                {currentTemplate === tpl.id && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full z-10 shadow-sm">
                    <Check size={16} />
                  </div>
                )}
                <div className="w-full aspect-[9/16] overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-200">
                  <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-90" />
                </div>
                <div className="p-4 bg-white">
                  <h3 className={`font-bold text-sm mb-1 ${currentTemplate === tpl.id ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-500">{tpl.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
