'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AccessibilityProvider } from '../../hooks/useAccessibility';
import { PageRenderer } from '../../components/PageRenderer';

const mockData = {
  title: { en: "Sample Mock Title", mr: "नमुना शीर्षक" },
  subtitle: { en: "Experience the premium mock subtitle that is fully responsive and elegant.", mr: "प्रतिसाद देणारा आणि मोहक असा प्रीमियम नमुना उपशीर्षक अनुभवा." },
  description: { en: "This is a detailed mock description for the template preview. It contains enough text to wrap across multiple lines and properly test the layout's typography and spacing.", mr: "हे टेम्पलेट पूर्वावलोकनासाठी एक तपशीलवार नमुना वर्णन आहे. यात एकाधिक ओळी ओलांडण्यासाठी आणि लेआउटचे टायपोग्राफी आणि स्पेसिंग तपासण्यासाठी पुरेसा मजकूर आहे." },
  heroImage: "https://images.unsplash.com/photo-1541888082405-eb8402db27d5?q=80&w=1470&auto=format&fit=crop",
  hero: {
    heroImage: "https://images.unsplash.com/photo-1541888082405-eb8402db27d5?q=80&w=1470&auto=format&fit=crop",
    title: { en: "Sample Mock Title", mr: "नमुना शीर्षक" },
    subtitle: { en: "Experience the premium mock subtitle that is fully responsive and elegant.", mr: "प्रतिसाद देणारा आणि मोहक असा प्रीमियम नमुना उपशीर्षक अनुभवा." },
    description: { en: "This is a detailed mock description for the template preview.", mr: "हे टेम्पलेट पूर्वावलोकनासाठी एक तपशीलवार नमुना वर्णन आहे." }
  },
  sectionHeaders: {
    hero: { title: { en: "Header", mr: "शीर्षक" }, icon: "Star" },
    stats: { title: { en: "Statistics", mr: "आकडेवारी" }, icon: "BarChart" },
    features: { title: { en: "Features", mr: "वैशिष्ट्ये" }, icon: "Check" },
    services: { title: { en: "Services", mr: "सेवा" }, icon: "Check" },
    keyFunctions: { title: { en: "Key Functions", mr: "प्रमुख कार्ये" }, icon: "List" },
    contactInfo: { title: { en: "Contact Information", mr: "संपर्क माहिती" }, icon: "Phone" },
    impact: { title: { en: "Impact", mr: "प्रभाव" }, icon: "Users" },
    training: { title: { en: "Training", mr: "प्रशिक्षण" }, icon: "Check" }
  },
  stats: [
    { label: { en: "Active Users", mr: "सक्रिय वापरकर्ते" }, value: "50,000+", icon: "Users" },
    { label: { en: "Success Rate", mr: "यशाचा दर" }, value: "98.5%", icon: "Star" },
    { label: { en: "Projects", mr: "प्रकल्प" }, value: "1,200", icon: "Check" },
    { label: { en: "Awards", mr: "पुरस्कार" }, value: "15", icon: "Award" }
  ],
  features: [
    { title: { en: "Premium Quality", mr: "प्रीमियम गुणवत्ता" }, desc: { en: "Ensuring the highest standards in all our deliverables.", mr: "आमच्या सर्व डिलिव्हरेबल्समध्ये सर्वोच्च मानके सुनिश्चित करणे." }, icon: "Star" },
    { title: { en: "Fast Support", mr: "जलद समर्थन" }, desc: { en: "24/7 dedicated support team ready to assist you.", mr: "तुम्हाला मदत करण्यासाठी 24/7 समर्पित समर्थन संघ तयार आहे." }, icon: "Phone" },
    { title: { en: "Secure Platform", mr: "सुरक्षित प्लॅटफॉर्म" }, desc: { en: "Enterprise-grade security for your peace of mind.", mr: "तुमच्या मनःशांतीसाठी एंटरप्राइज-ग्रेड सुरक्षा." }, icon: "Shield" }
  ],
  services: [
    { name: { en: "Web Development", mr: "वेब विकास" }, icon: "Code" },
    { name: { en: "UI/UX Design", mr: "UI/UX डिझाइन" }, icon: "PenTool" },
    { name: { en: "Marketing", mr: "मार्केटिंग" }, icon: "TrendingUp" }
  ],
  keyFunctions: [
    { title: { en: "Consulting", mr: "सल्लागार" }, desc: { en: "Expert advice tailored for you.", mr: "तुमच्यासाठी तयार केलेला तज्ञांचा सल्ला." }, icon: "Users" },
    { title: { en: "Strategy", mr: "धोरण" }, desc: { en: "Long term strategic planning.", mr: "दीर्घकालीन धोरणात्मक नियोजन." }, icon: "Target" },
    { title: { en: "Execution", mr: "अंमलबजावणी" }, desc: { en: "Flawless execution of plans.", mr: "योजनांची निर्दोष अंमलबजावणी." }, icon: "Play" }
  ],
  contactInfo: [
    { text: { en: "123 Business Avenue, Tech Park", mr: "123 बिझनेस अव्हेन्यू, टेक पार्क" }, icon: "MapPin" },
    { text: { en: "+1 (555) 123-4567", mr: "+1 (555) 123-4567" }, icon: "Phone" },
    { text: { en: "contact@example.com", mr: "contact@example.com" }, icon: "Mail" }
  ],
  impact: [
    { label: { en: "Lives Touched", mr: "स्पर्श केलेले जीवन" }, value: "1M+", desc: { en: "Across 50 cities", mr: "50 शहरांमध्ये" }, icon: "Users" },
    { label: { en: "Communities", mr: "समुदाय" }, value: "500", desc: { en: "Actively engaged", mr: "सक्रियपणे व्यस्त" }, icon: "Target" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1374&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop"
  ],
  // Include specific fields used by some templates
  timeline: [
    { year: "2020", title: { en: "Foundation", mr: "पायाभरणी" }, description: { en: "The journey began.", mr: "प्रवास सुरू झाला." } },
    { year: "2022", title: { en: "Expansion", mr: "विस्तार" }, description: { en: "Reached 10+ cities.", mr: "10+ शहरांपर्यंत पोहोचलो." } }
  ],
  introBlocks: [
    { title: { en: "Our Vision", mr: "आमची दृष्टी" }, description: { en: "To be the best.", mr: "सर्वोत्कृष्ट होण्यासाठी." } },
    { title: { en: "Our Mission", mr: "आमचे ध्येय" }, description: { en: "Empowering everyone.", mr: "सर्वांना सक्षम करणे." } }
  ],
  tabs: [
    { id: 'tab1', title: { en: "First Tab", mr: "पहिली टॅब" }, content: { en: "Content for first tab.", mr: "पहिल्या टॅबसाठी सामग्री." } },
    { id: 'tab2', title: { en: "Second Tab", mr: "दुसरी टॅब" }, content: { en: "Content for second tab.", mr: "दुसऱ्या टॅबसाठी सामग्री." } }
  ],
  accordions: [
    { title: { en: "Question 1", mr: "प्रश्न 1" }, content: { en: "Answer 1", mr: "उत्तर 1" } },
    { title: { en: "Question 2", mr: "प्रश्न 2" }, content: { en: "Answer 2", mr: "उत्तर 2" } }
  ]
};

function PreviewContent() {
  const searchParams = useSearchParams();
  const templateName = searchParams?.get('t');

  if (!templateName) return <div className="p-10">No template specified via '?t=' parameter.</div>;

  return (
    <PageRenderer 
      slug="mock" 
      layoutType={templateName}
      pageData={{
        contentBlocks: [
          { blockType: 'page_template_data', content: mockData }
        ]
      }}
    />
  );
}

export default function TemplatePreviewPage() {
  return (
    <AccessibilityProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <PreviewContent />
      </Suspense>
    </AccessibilityProvider>
  );
}
