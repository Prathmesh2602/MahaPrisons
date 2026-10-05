"use client";
import React, { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

const ContactUsLayout = ({ data: dynamicData }: { data?: any }) => {
  const { language } = useAccessibility();
  
  // Static dummy data for the design review phase (fallback)
  const defaultData = {
    title: { en: "Contact Us", mr: "संपर्क साधा" },
    subtitle: { en: "We'd love to hear from you. Please reach out with any inquiries.", mr: "आम्हाला तुमच्याकडून ऐकायला आवडेल. कृपया कोणत्याही चौकशीसाठी संपर्क साधा." },
    contactInfo: [
      { 
        icon: 'MapPin', 
        title: { en: "Headquarters", mr: "मुख्यालय" },
        text: { en: "Maharashtra Prison Department, Old Central Building, Pune - 411001", mr: "महाराष्ट्र कारागृह विभाग, जुनी मध्यवर्ती इमारत, पुणे - ४११००१" } 
      },
      { 
        icon: 'Phone', 
        title: { en: "Phone", mr: "दूरध्वनी" },
        text: { en: "020-26122580 / 26122606", mr: "०२०-२६१२२५८० / २६१२२६०६" } 
      },
      { 
        icon: 'Mail', 
        title: { en: "Email", mr: "ई-मेल" },
        text: { en: "addg.mahaprisons@mahagov.in", mr: "addg.mahaprisons@mahagov.in" } 
      },
      { 
        icon: 'Clock', 
        title: { en: "Working Hours", mr: "कामाचे तास" },
        text: { en: "Monday - Friday: 9:45 AM to 6:15 PM", mr: "सोमवार - शुक्रवार: सकाळी ९:४५ ते सायंकाळी ६:१५" } 
      }
    ],
    formLabels: {
      name: { en: "Full Name", mr: "पूर्ण नाव" },
      email: { en: "Email Address", mr: "ई-मेल पत्ता" },
      subject: { en: "Subject", mr: "विषय" },
      message: { en: "Your Message", mr: "तुमचा संदेश" },
      submit: { en: "Send Message", mr: "संदेश पाठवा" }
    }
  };

  const data = dynamicData || defaultData;

  const getTranslation = (obj: any) => (obj ? obj[language] || obj.en : '');

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-white dark-mode:bg-[#121212] font-poppins text-gray-800 dark-mode:text-gray-200">
      
      {/* Subtle Hero Section */}
      <div data-block-type="template_headers" className="w-full bg-slate-50 dark-mode:bg-[#1a1a1a] border-b border-slate-100 dark-mode:border-gray-800 pt-16 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h1 className="text-3xl font-semibold text-slate-800 dark-mode:text-slate-100 mb-3 tracking-tight">
              {getTranslation(data.title)}
            </h1>
            <p className="text-sm text-slate-500 dark-mode:text-slate-400 font-light max-w-2xl mx-auto">
              {getTranslation(data.subtitle)}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            data-block-type="template_info"
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            {data.contactInfo.map((info: any, idx: number) => {
              const icons: { [key: string]: any } = { MapPin, Phone, Mail, Clock };
              const Icon = icons[info.icon] || Mail;
              
              return (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark-mode:bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-100 dark-mode:border-slate-800 transition-colors group-hover:bg-blue-50 dark-mode:group-hover:bg-blue-900/20 group-hover:border-blue-100 dark-mode:group-hover:border-blue-900/30">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 dark-mode:text-slate-200 mb-1">
                      {getTranslation(info.title)}
                    </h4>
                    <p className="text-sm text-slate-500 dark-mode:text-slate-400 font-light leading-relaxed">
                      {getTranslation(info.text)}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            data-block-type="template_forms"
            initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white dark-mode:bg-[#1a1a1a] p-8 rounded-xl shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 dark-mode:border-slate-800/60"
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[13px] font-medium text-slate-600 dark-mode:text-slate-300 mb-1.5">{getTranslation(data.formLabels.name)}</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 dark-mode:bg-[#222] border border-slate-200 dark-mode:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-600 dark-mode:text-slate-300 mb-1.5">{getTranslation(data.formLabels.email)}</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 dark-mode:bg-[#222] border border-slate-200 dark-mode:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-600 dark-mode:text-slate-300 mb-1.5">{getTranslation(data.formLabels.subject)}</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 dark-mode:bg-[#222] border border-slate-200 dark-mode:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-600 dark-mode:text-slate-300 mb-1.5">{getTranslation(data.formLabels.message)}</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 dark-mode:bg-[#222] border border-slate-200 dark-mode:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light resize-none"
                  placeholder="Type your message here..."
                />
              </div>
              <button 
                type="submit"
                className="w-full mt-2 py-3 bg-[#1e293b] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>{getTranslation(data.formLabels.submit)}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default ContactUsLayout;
