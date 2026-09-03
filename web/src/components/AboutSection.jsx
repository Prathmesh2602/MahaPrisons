import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../hooks/useAccessibility';
import { ArrowRight, User } from 'lucide-react';

export const AboutSection = ({ data }) => {
  const { language, t } = useAccessibility();
  const lang = language;

  // Bilingual paragraph content about the department
  const aboutText = data?.content?.[lang] || (lang === 'mr'
    ? "येरवडा खुले कारागृह हे पुण्याच्या ऐतिहासिक येरवडा मध्यवर्ती कारागृहाच्या विस्तीर्ण ५१२ एकर परिसरात वसलेले एक विशेष पुनर्वसन आणि सुधार केंद्र आहे. १९५६ मध्ये स्थापित झालेले हे महाराष्ट्रातील पहिले 'खुले कारागृह' होते, जे प्रगतशील कारागृह प्रशासनातील एक महत्त्वाचे पाऊल मानले जाते. येथे प्रामुख्याने जन्मठेपेची शिक्षा भोगत असलेल्या, चांगली वर्तणूक असलेल्या आणि मध्यवर्ती कारागृहात किमान ५ वर्षे पूर्ण केलेल्या बंदीवानांना ठेवले जाते. हे कारागृह पारंपारिक बंदिस्त कोठड्यांविना, कमीत कमी सुरक्षिततेवर चालते. येथे बंदीवानांच्या मानसिक सुधारणेवर आणि व्यावसायिक सक्षमीकरणावर विशेष भर दिला जातो. बंदीवानांना सेंद्रिय शेती आणि पशुपालन यांसारख्या उत्पादक कामांमध्ये सक्रियपणे गुंतवले जाते; येथील सेंद्रिय शेतीतून इतर कारागृहांनाही ताज्या भाज्यांचा पुरवठा केला जातो. या प्रगतशील दृष्टिकोनामुळे बंदीवानांना उपजीविकेचे महत्त्वपूर्ण कौशल्य प्राप्त होते, ज्यामुळे त्यांची समाजात एक जबाबदार नागरिक म्हणून यशस्वीपणे पुनर्रचना होण्यास मदत होते."
    : "The Yerwada Open Jail is a specialized rehabilitation facility located in the expansive campus of the historic Yerwada Central Jail in Pune. Established in 1956, it was the first 'Open Institution' in Maharashtra, marking a significant milestone in progressive prison administration. It primarily houses inmates serving life sentences who have demonstrated excellent conduct and successfully completed at least five years in the high-security central prison. Operating under minimal security without traditional confinement cells, the facility strongly emphasizes psychological reform and vocational empowerment. Inmates are actively engaged in productive activities such as extensive organic farming—supplying fresh produce to neighboring institutions—and animal husbandry. This progressive approach ensures inmates acquire vital livelihood skills, facilitating their successful and responsible reintegration into society upon release.");

  const welcomeTitle = data?.heading?.[lang] || (lang === 'mr'
    ? "येरवडा खुले जिल्हा कारागृह मध्ये आपले स्वागत आहे"
    : "Welcome to Yerwada Open District Prison");

  const openJailOfficers = [
    {
      name: "श्री. शामकांत शालन चंद्रकांत शेडगे",
      desg: "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१",
      img: "/gallary/Shamkant%20shedge.png"
    },
    {
      name: "श्री. नागेश एम. कांबळे",
      desg: "वरिष्ठ तुरुंग अधिकारी (प्रशासकीय व इतर) श्रेणी १",
      img: "/gallary/Nagesh%20Kamble.png"
    },
    {
      name: "श्री. नागनाथ एन. भाणवसे",
      desg: "तुरुंग अधिकारी श्रेणी २",
      img: ""
    },
    {
      name: "श्रीमती निशा डी. श्रेयेकर",
      desg: "तुरुंग अधिकारी श्रेणी २",
      img: "/gallary/nisha%20shreyekar.png"
    }
  ];

  return (
    <div className="w-full py-8 px-4 md:px-8 bg-[#F8FAFC] dark-mode:bg-[#080B11] relative overflow-hidden">

      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-teal-500/5 dark-mode:bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-amber-500/5 dark-mode:bg-amber-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main "Dashboard" Container */}
        <div className="bg-white dark-mode:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark-mode:border-gray-800 p-6 md:p-8 relative overflow-hidden">

          {/* Subtle inner top gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-teal-600 to-[#0F3D66] opacity-80" />

          {/* Split Layout: Info on Left, Profiles on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left Side: Info & CTA */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">

              {/* Header: Logo + Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6">
                <img
                  src="/logo.jpeg"
                  alt={t("कारागृह लोगो")}
                  className="w-16 md:w-20 h-auto object-contain mix-blend-multiply dark-mode:mix-blend-screen shrink-0"
                />
                <div className="flex flex-col text-center sm:text-left pt-1">
                  <span className={`text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-semibold uppercase block mb-1 ${lang === 'mr' ? '' : 'tracking-widest'}`}>
                    {t("येरवडा खुल्या कारागृहाविषयी")}
                  </span>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0F3D66] dark-mode:text-blue-300 font-poppins leading-tight">
                    {welcomeTitle}
                  </h2>
                </div>
              </div>

              {/* Body Text */}
              <div className="mb-8">
                <p className="text-[13px] md:text-sm lg:text-[15px] text-gray-600 dark-mode:text-gray-300 font-medium leading-relaxed font-poppins text-center sm:text-left">
                  {aboutText}
                </p>
              </div>

              {/* Read More button */}
              <div className="flex justify-center sm:justify-start">
                <Link
                  to="/yerawada-open-jail"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#0F3D66] hover:bg-[#1E5AA8] text-white rounded-full font-medium text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer"
                >
                  <span>{t("अधिक वाचा …")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>


            {/* Right Side: Officer Profiles */}
            <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100 dark-mode:border-gray-800 pt-8 lg:pt-0 lg:pl-8 xl:pl-12">
              <h3 className="text-xs font-semibold text-gray-400 dark-mode:text-gray-500 uppercase tracking-widest mb-6 text-center">
                {lang === 'mr' ? 'प्रभारी अधिकारी' : 'Officers In Charge'}
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {openJailOfficers.map((officer, idx) => (
                  <div key={idx} className="flex flex-col items-center p-2 hover:-translate-y-1 transition-transform duration-300 group">

                    {/* Avatar with ring effect */}
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-teal-500 rounded-full blur opacity-10 group-hover:opacity-40 transition-opacity duration-300 scale-110" />
                      {officer.img ? (
                        <img src={officer.img} alt={t(officer.name)} className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-top border-[3px] border-white dark-mode:border-gray-800 shadow-sm relative z-10 group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-white dark-mode:border-gray-800 shadow-sm relative z-10 group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center">
                          <User className="w-10 h-10 md:w-12 md:h-12 text-[#94A3B8]" strokeWidth={2} />
                        </div>
                      )}
                    </div>

                    {/* Name & Designation */}
                    <span className="text-[13px] md:text-[14px] font-semibold text-[#0F3D66] dark-mode:text-blue-300 text-center mb-1 leading-tight">{t(officer.name)}</span>
                    <span className="text-[10px] md:text-[11px] text-gray-500 dark-mode:text-gray-400 text-center leading-snug px-1 font-medium">{t(officer.desg)}</span>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutSection;
