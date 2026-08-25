export const facilitiesData = {
  'prisoner-interview': {
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80',
    title: { mr: 'बंदी मुलाखत', en: 'Prisoner Interview / Meeting' },
    subtitle: { mr: 'प्रत्यक्ष आणि ई-मुलाखत सुविधा', en: 'Physical and E-Meeting Facilities' },
    description: {
      mr: 'कैद्यांना त्यांच्या नातेवाईकांशी आणि वकिलांशी संवाद साधता यावा यासाठी प्रत्यक्ष मुलाखत आणि व्हिडिओ कॉन्फरन्सिंगद्वारे ई-मुलाखतीची सुविधा उपलब्ध करून देण्यात आली आहे.',
      en: 'To enable inmates to communicate with their relatives and lawyers, facilities for physical meetings and e-meetings via video conferencing have been made available.'
    },
    stats: [
      { label: { mr: 'दैनिक मुलाखती', en: 'Daily Meetings' }, value: '50+', icon: 'Users' },
      { label: { mr: 'ई-मुलाखत कक्ष', en: 'E-Meeting Rooms' }, value: '5', icon: 'Video' },
      { label: { mr: 'वेळ मर्यादा', en: 'Time Limit' }, value: '20 Min', icon: 'Clock' }
    ],
    keyFunctions: [
      {
        title: { mr: 'प्रत्यक्ष मुलाखत', en: 'Physical Meeting' },
        desc: { mr: 'नातेवाईकांसाठी पूर्वनियोजित वेळेनुसार प्रत्यक्ष भेटीची सुविधा.', en: 'Facility for physical meetings for relatives as per pre-scheduled timings.' },
        icon: 'Users'
      },
      {
        title: { mr: 'ई-मुलाखत', en: 'E-Meeting' },
        desc: { mr: 'दूरवर राहणाऱ्या नातेवाईकांसाठी ऑनलाइन व्हिडिओ कॉलची सुविधा.', en: 'Online video call facility for relatives living far away.' },
        icon: 'Monitor'
      }
    ],
    contactInfo: {
      email: 'interview@mahaprisons.gov.in',
      phone: '020-26681234',
      address: { mr: 'मुलाखत कक्ष, मुख्य प्रवेशद्वार, येरवडा कारागृह', en: 'Interview Room, Main Gate, Yerawada Prison' }
    }
  },
  'smart-card-phone': {
    heroImage: 'https://images.unsplash.com/photo-1520697830682-8f170eb82084?auto=format&fit=crop&q=80',
    title: { mr: 'ॲलेन स्मार्ट कार्ड फोन सुविधा', en: 'Allen Smart Card Phone Facility' },
    subtitle: { mr: 'आधुनिक आणि सुरक्षित संवाद', en: 'Modern and Secure Communication' },
    description: {
      mr: 'कैद्यांना त्यांच्या कुटुंबाशी नियमित संपर्क ठेवता यावा यासाठी स्मार्ट कार्ड आधारित फोन सुविधा उपलब्ध आहे. यात ऑडिओ आणि व्हिडिओ कॉलिंगचे पर्याय आहेत.',
      en: 'A smart card-based phone facility is available to allow inmates to maintain regular contact with their families. This includes both audio and video calling options.'
    },
    stats: [
      { label: { mr: 'कॉल मर्यादा', en: 'Call Limit' }, value: '10 Min', icon: 'Clock' },
      { label: { mr: 'नोंदणीकृत क्रमांक', en: 'Reg. Numbers' }, value: '3/Inmate', icon: 'Phone' },
      { label: { mr: 'सुरक्षा', en: 'Security' }, value: 'Monitored', icon: 'ShieldCheck' }
    ],
    keyFunctions: [
      {
        title: { mr: 'ऑडिओ कॉलिंग', en: 'Audio Calling' },
        desc: { mr: 'स्मार्ट कार्डद्वारे नोंदणीकृत मोबाईल किंवा लँडलाईनवर संवाद साधण्याची सुविधा.', en: 'Facility to communicate on registered mobile or landline using a smart card.' },
        icon: 'PhoneCall'
      },
      {
        title: { mr: 'व्हिडिओ कॉलिंग', en: 'Video Calling' },
        desc: { mr: 'विशेष व्हिडिओ कॉलिंग बूथद्वारे कुटुंबाशी समोरासमोर बोलण्याची संधी.', en: 'Opportunity to speak face-to-face with family through special video calling booths.' },
        icon: 'Video'
      }
    ],
    contactInfo: {
      email: 'communications@mahaprisons.gov.in',
      phone: '020-26681235',
      address: { mr: 'फोन बूथ विभाग, येरवडा कारागृह', en: 'Phone Booth Section, Yerawada Prison' }
    }
  },
  'correspondence': {
    heroImage: 'https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&q=80',
    title: { mr: 'पत्रव्यवहार व मनीऑर्डर सुविधा', en: 'Correspondence & Money Order Facility' },
    subtitle: { mr: 'सुरक्षित आणि पारदर्शक व्यवहार', en: 'Secure and Transparent Transactions' },
    description: {
      mr: 'कैद्यांना त्यांच्या नातेवाईकांकडून पत्रे आणि आर्थिक मदत (मनीऑर्डर) प्राप्त करण्यासाठी आणि पाठवण्यासाठी स्वतंत्र कक्ष स्थापित करण्यात आला आहे.',
      en: 'A separate cell has been established for inmates to receive and send letters and financial assistance (money orders) from their relatives.'
    },
    stats: [
      { label: { mr: 'मासिक पत्रे', en: 'Monthly Letters' }, value: '1000+', icon: 'Mail' },
      { label: { mr: 'मनीऑर्डर मर्यादा', en: 'Money Order Limit' }, value: '₹5000/Mo', icon: 'IndianRupee' },
      { label: { mr: 'तपासणी', en: 'Screening' }, value: '100%', icon: 'Search' }
    ],
    keyFunctions: [
      {
        title: { mr: 'पत्रव्यवहार तपासणी', en: 'Correspondence Screening' },
        desc: { mr: 'सुरक्षेच्या दृष्टीने सर्व पत्रांची तपासणी करूनच ती कैद्यांना दिली जातात.', en: 'All letters are screened for security reasons before being handed over to inmates.' },
        icon: 'MailOpen'
      },
      {
        title: { mr: 'कॅन्टीन खाते जमा', en: 'Canteen Account Deposit' },
        desc: { mr: 'नातेवाईकांकडून आलेली रक्कम थेट कैद्याच्या पीपीसी (कॅन्टीन) खात्यात जमा होते.', en: 'Amount received from relatives is directly deposited into the inmate’s PPC (Canteen) account.' },
        icon: 'CreditCard'
      }
    ],
    contactInfo: {
      email: 'postmaster.jail@mahaprisons.gov.in',
      phone: '020-26681236',
      address: { mr: 'पत्रव्यवहार कक्ष, येरवडा कारागृह', en: 'Correspondence Cell, Yerawada Prison' }
    }
  },
  'free-legal-aid': {
    heroImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
    title: { mr: 'मोफत कायदेशीर मदत', en: 'Free Legal Aid' },
    subtitle: { mr: 'न्यायाचा हक्क सर्वांसाठी', en: 'Right to Justice for All' },
    description: {
      mr: 'आर्थिकदृष्ट्या दुर्बल असलेल्या कैद्यांना त्यांच्या खटल्यांसाठी मोफत कायदेशीर सल्ला आणि वकिलांची मदत उपलब्ध करून दिली जाते.',
      en: 'Economically weaker inmates are provided with free legal advice and the assistance of lawyers for their cases.'
    },
    stats: [
      { label: { mr: 'लाभार्थी', en: 'Beneficiaries' }, value: '500+', icon: 'Users' },
      { label: { mr: 'कायदेशीर शिबिरे', en: 'Legal Camps' }, value: 'Monthly', icon: 'Calendar' },
      { label: { mr: 'यशस्वी खटले', en: 'Successful Cases' }, value: '150+', icon: 'Scale' }
    ],
    keyFunctions: [
      {
        title: { mr: 'मोफत वकील नेमणूक', en: 'Free Lawyer Appointment' },
        desc: { mr: 'गरजू कैद्यांना न्यायालयात बाजू मांडण्यासाठी मोफत वकिलांची सुविधा.', en: 'Facility of free lawyers for needy inmates to represent them in court.' },
        icon: 'Scale'
      },
      {
        title: { mr: 'कायदेशीर साक्षरता', en: 'Legal Literacy' },
        desc: { mr: 'कैद्यांना त्यांच्या अधिकारांची माहिती देण्यासाठी कायदेशीर साक्षरता शिबिरे.', en: 'Legal literacy camps to inform inmates about their rights.' },
        icon: 'BookOpen'
      }
    ],
    contactInfo: {
      email: 'legalaid@mahaprisons.gov.in',
      phone: '020-26681237',
      address: { mr: 'विधी मदत कक्ष, येरवडा कारागृह', en: 'Legal Aid Cell, Yerawada Prison' }
    }
  },
  'district-legal-services': {
    heroImage: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80',
    title: { mr: 'जिल्हा विधी सेवा प्राधिकरण', en: 'District Legal Services Authority' },
    subtitle: { mr: 'DLSA समन्वय', en: 'DLSA Coordination' },
    description: {
      mr: 'जिल्हा विधी सेवा प्राधिकरणाच्या (DLSA) समन्वयाने कारागृहात नियमित लोकअदालत आणि कायदेशीर मदत क्लिनिक चालवले जाते.',
      en: 'In coordination with the District Legal Services Authority (DLSA), regular Lok Adalats and legal aid clinics are operated within the prison.'
    },
    stats: [
      { label: { mr: 'लोकअदालत', en: 'Lok Adalat' }, value: 'Quarterly', icon: 'Scale' },
      { label: { mr: 'तडजोड प्रकरणे', en: 'Settled Cases' }, value: '50+', icon: 'Handshake' },
      { label: { mr: 'विधी स्वयंसेवक', en: 'Legal Volunteers' }, value: '10', icon: 'Users' }
    ],
    keyFunctions: [
      {
        title: { mr: 'कारागृह लोकअदालत', en: 'Prison Lok Adalat' },
        desc: { mr: 'किरकोळ गुन्ह्यांच्या खटल्यांमध्ये तडजोड करण्यासाठी कारागृहातच लोकअदालत.', en: 'Lok Adalat held within the prison to settle minor offenses.' },
        icon: 'Gavel'
      },
      {
        title: { mr: 'विधी मदत क्लिनिक', en: 'Legal Aid Clinic' },
        desc: { mr: 'दर आठवड्याला विधी स्वयंसेवक आणि वकिलांद्वारे कैद्यांच्या शंकांचे निरसन.', en: 'Resolution of inmates\' queries by legal volunteers and lawyers every week.' },
        icon: 'HeartHandshake'
      }
    ],
    contactInfo: {
      email: 'dlsa.pune@mahaprisons.gov.in',
      phone: '020-26681238',
      address: { mr: 'DLSA क्लिनिक, येरवडा कारागृह', en: 'DLSA Clinic, Yerawada Prison' }
    }
  },
  'furlough-parole': {
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80',
    title: { mr: 'संचित व अभिवाचन रजा', en: 'Furlough & Parole Leave' },
    subtitle: { mr: 'कौटुंबिक आणि सामाजिक बांधिलकी', en: 'Familial and Social Ties' },
    description: {
      mr: 'कैद्यांचे कुटुंबाशी असलेले नाते टिकवून ठेवण्यासाठी आणि समाजात पुन्हा मिसळण्याच्या तयारीसाठी नियमानुसार संचित (Furlough) आणि अभिवाचन (Parole) रजा मंजूर केली जाते.',
      en: 'To maintain inmates\' ties with their families and prepare them for reintegration into society, Furlough and Parole leaves are granted as per regulations.'
    },
    stats: [
      { label: { mr: 'वार्षिक संचित रजा', en: 'Annual Furlough' }, value: '21 Days', icon: 'CalendarDays' },
      { label: { mr: 'अभिवाचन रजा', en: 'Parole' }, value: 'As per Rule', icon: 'FileText' },
      { label: { mr: 'मंजुरी दर', en: 'Approval Rate' }, value: 'High', icon: 'TrendingUp' }
    ],
    keyFunctions: [
      {
        title: { mr: 'संचित रजा (Furlough)', en: 'Furlough' },
        desc: { mr: 'पात्र कैद्यांना दरवर्षी ठराविक दिवसांसाठी कुटुंबाला भेटण्याची रजा.', en: 'Leave granted to eligible inmates every year for a certain number of days to visit their family.' },
        icon: 'Home'
      },
      {
        title: { mr: 'अभिवाचन रजा (Parole)', en: 'Parole' },
        desc: { mr: 'कुटुंबातील गंभीर आजारपण, विवाह किंवा मृत्यू अशा विशेष कारणांसाठी रजा.', en: 'Leave granted for special reasons like serious family illness, marriage, or death.' },
        icon: 'AlertCircle'
      }
    ],
    contactInfo: {
      email: 'parole@mahaprisons.gov.in',
      phone: '020-26681239',
      address: { mr: 'रजा विभाग, येरवडा कारागृह', en: 'Leave Department, Yerawada Prison' }
    }
  },
  'remission': {
    heroImage: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80',
    title: { mr: 'माफी (Remission)', en: 'Remission' },
    subtitle: { mr: 'चांगल्या वर्तनाचे बक्षीस', en: 'Reward for Good Behavior' },
    description: {
      mr: 'कारागृहातील कैद्यांच्या चांगल्या वर्तणुकीला आणि कामाला प्रोत्साहन देण्यासाठी त्यांना शिक्षेमध्ये विशेष माफी दिली जाते.',
      en: 'To encourage good behavior and work among inmates in the prison, they are granted special remission in their sentence.'
    },
    stats: [
      { label: { mr: 'सामान्य माफी', en: 'Ordinary Remission' }, value: 'Var.', icon: 'Clock' },
      { label: { mr: 'विशेष माफी', en: 'Special Remission' }, value: '30 Days/Yr', icon: 'Award' },
      { label: { mr: 'रक्तदान माफी', en: 'Blood Donation' }, value: '15 Days', icon: 'Heart' }
    ],
    keyFunctions: [
      {
        title: { mr: 'सामान्य माफी', en: 'Ordinary Remission' },
        desc: { mr: 'कारखान्यातील काम आणि चांगल्या वर्तनासाठी दरमहा मिळणारी माफी.', en: 'Remission earned monthly for factory work and good behavior.' },
        icon: 'Briefcase'
      },
      {
        title: { mr: 'विशेष शासकीय माफी', en: 'Special State Remission' },
        desc: { mr: 'राष्ट्रीय सण किंवा विशेष प्रसंगी शासनाकडून दिली जाणारी माफी.', en: 'Remission granted by the government on national festivals or special occasions.' },
        icon: 'Flag'
      }
    ],
    contactInfo: {
      email: 'remission@mahaprisons.gov.in',
      phone: '020-26681240',
      address: { mr: 'न्याय विभाग, येरवडा कारागृह', en: 'Judicial Department, Yerawada Prison' }
    }
  },
  'hirkani-room': {
    heroImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80',
    title: { mr: 'हिरकणी कक्ष', en: 'Hirkani Room' },
    subtitle: { mr: 'महिला कैदी आणि बालकांसाठी विशेष कक्ष', en: 'Special Room for Female Inmates and Children' },
    description: {
      mr: 'महिला कैद्यांसोबत असलेल्या लहान मुलांच्या स्तनपानासाठी आणि खेळण्यासाठी कारागृहात एक सुरक्षित आणि आरामदायी \'हिरकणी कक्ष\' तयार करण्यात आला आहे.',
      en: 'A safe and comfortable \'Hirkani Room\' has been created in the prison for breastfeeding and playing for the young children living with female inmates.'
    },
    stats: [
      { label: { mr: 'खेळणी', en: 'Toys' }, value: 'Available', icon: 'Smile' },
      { label: { mr: 'आरोग्य तपासणी', en: 'Health Check' }, value: 'Weekly', icon: 'Stethoscope' },
      { label: { mr: 'पोषण आहार', en: 'Nutrition' }, value: 'Daily', icon: 'Coffee' }
    ],
    keyFunctions: [
      {
        title: { mr: 'स्तनपान सुविधा', en: 'Breastfeeding Facility' },
        desc: { mr: 'मातांना त्यांच्या मुलांना सुरक्षित वातावरणात स्तनपान करण्यासाठी खाजगी जागा.', en: 'A private space for mothers to breastfeed their children in a safe environment.' },
        icon: 'Heart'
      },
      {
        title: { mr: 'बालविकास व खेळ', en: 'Child Development & Play' },
        desc: { mr: 'लहान मुलांसाठी खेळणी, चित्रे आणि मनोरंजनाची साधने.', en: 'Toys, pictures, and entertainment tools for young children.' },
        icon: 'Puzzle'
      }
    ],
    contactInfo: {
      email: 'womensprison@mahaprisons.gov.in',
      phone: '020-26681241',
      address: { mr: 'महिला कारागृह विभाग, येरवडा', en: 'Women\'s Prison Department, Yerawada' }
    }
  },
  'gymnasium': {
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80',
    title: { mr: 'व्यायामशाळा', en: 'Gymnasium' },
    subtitle: { mr: 'शारीरिक व मानसिक स्वास्थ्य', en: 'Physical and Mental Health' },
    description: {
      mr: 'कैद्यांच्या शारीरिक तंदुरुस्तीसाठी आणि मानसिक आरोग्य चांगले राहण्यासाठी कारागृहात आधुनिक उपकरणांसह व्यायामशाळा उपलब्ध करून देण्यात आली आहे.',
      en: 'A gymnasium with modern equipment has been made available in the prison for the physical fitness and mental well-being of the inmates.'
    },
    stats: [
      { label: { mr: 'उपकरणे', en: 'Equipments' }, value: '20+', icon: 'Dumbbell' },
      { label: { mr: 'दैनिक वेळ', en: 'Daily Timing' }, value: '2 Hrs', icon: 'Clock' },
      { label: { mr: 'प्रशिक्षक', en: 'Trainers' }, value: 'Available', icon: 'UserCheck' }
    ],
    keyFunctions: [
      {
        title: { mr: 'शारीरिक तंदुरुस्ती', en: 'Physical Fitness' },
        desc: { mr: 'विविध व्यायामाच्या मशिन्स आणि वजने (Weights) उपलब्ध.', en: 'Various exercise machines and weights available.' },
        icon: 'Dumbbell'
      },
      {
        title: { mr: 'क्रीडा स्पर्धा', en: 'Sports Competitions' },
        desc: { mr: 'कैद्यांमध्ये सांघिक भावना निर्माण करण्यासाठी क्रीडा स्पर्धांचे आयोजन.', en: 'Organizing sports competitions to build team spirit among inmates.' },
        icon: 'Trophy'
      }
    ],
    contactInfo: {
      email: 'sports@mahaprisons.gov.in',
      phone: '020-26681242',
      address: { mr: 'व्यायामशाळा, येरवडा कारागृह', en: 'Gymnasium, Yerawada Prison' }
    }
  },
  'wet-canteen': {
    heroImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
    title: { mr: 'वेट कॅन्टीन', en: 'Wet Canteen' },
    subtitle: { mr: 'चहा, नाश्ता आणि ताजे खाद्यपदार्थ', en: 'Tea, Snacks, and Fresh Food' },
    description: {
      mr: 'कैद्यांना त्यांच्या वैयक्तिक पैशातून (PPC) चहा, कॉफी आणि ताजे नाश्त्याचे पदार्थ खरेदी करता यावेत यासाठी वेट कॅन्टीन चालवले जाते.',
      en: 'A wet canteen is operated to allow inmates to purchase tea, coffee, and fresh snacks using their personal money (PPC).'
    },
    stats: [
      { label: { mr: 'दैनंदिन उलाढाल', en: 'Daily Turn.' }, value: 'High', icon: 'TrendingUp' },
      { label: { mr: 'मेनू आयटम', en: 'Menu Items' }, value: '15+', icon: 'Coffee' },
      { label: { mr: 'स्वच्छता', en: 'Hygiene' }, value: '100%', icon: 'ShieldCheck' }
    ],
    keyFunctions: [
      {
        title: { mr: 'ताजा नाश्ता', en: 'Fresh Snacks' },
        desc: { mr: 'रोज सकाळी आणि संध्याकाळी गरम चहा, पोहे, उपमा इत्यादींची सुविधा.', en: 'Hot tea, Poha, Upma etc. available every morning and evening.' },
        icon: 'Coffee'
      },
      {
        title: { mr: 'कॅशलेस व्यवहार', en: 'Cashless Transactions' },
        desc: { mr: 'कॅन्टीनमध्ये सर्व व्यवहार स्मार्ट कार्ड किंवा टोकन सिस्टमद्वारे केले जातात.', en: 'All transactions in the canteen are done via smart cards or token systems.' },
        icon: 'CreditCard'
      }
    ],
    contactInfo: {
      email: 'canteen@mahaprisons.gov.in',
      phone: '020-26681243',
      address: { mr: 'वेट कॅन्टीन, येरवडा कारागृह', en: 'Wet Canteen, Yerawada Prison' }
    }
  },
  'education': {
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80',
    title: { mr: 'शैक्षणिक सुविधा', en: 'Educational Facilities' },
    subtitle: { mr: 'साक्षरता आणि उच्च शिक्षण', en: 'Literacy and Higher Education' },
    description: {
      mr: 'अशिक्षित कैद्यांना साक्षर करण्यासाठी आणि शिकण्याची इच्छा असलेल्या कैद्यांना पदवी/पदव्युत्तर शिक्षण घेण्यासाठी (उदा. YCMOU किंवा IGNOU मार्फत) सुविधा उपलब्ध आहे.',
      en: 'Facilities are available to make illiterate inmates literate and to provide degree/post-graduate education (e.g. through YCMOU or IGNOU) to those willing to learn.'
    },
    stats: [
      { label: { mr: 'साक्षरता वर्ग', en: 'Literacy Classes' }, value: 'Daily', icon: 'BookOpen' },
      { label: { mr: 'विद्यार्थी कैदी', en: 'Student Inmates' }, value: '200+', icon: 'GraduationCap' },
      { label: { mr: 'अभ्यास केंद्रे', en: 'Study Centers' }, value: '2', icon: 'School' }
    ],
    keyFunctions: [
      {
        title: { mr: 'मूलभूत साक्षरता', en: 'Basic Literacy' },
        desc: { mr: 'निरक्षर कैद्यांना लिहायला आणि वाचायला शिकवणे.', en: 'Teaching illiterate inmates how to read and write.' },
        icon: 'Pencil'
      },
      {
        title: { mr: 'मुक्त विद्यापीठ शिक्षण', en: 'Open University Education' },
        desc: { mr: 'YCMOU आणि IGNOU च्या माध्यमातून पदवी शिक्षण घेण्याची संधी.', en: 'Opportunity to pursue degree courses through YCMOU and IGNOU.' },
        icon: 'GraduationCap'
      }
    ],
    contactInfo: {
      email: 'education@mahaprisons.gov.in',
      phone: '020-26681244',
      address: { mr: 'शिक्षण विभाग, येरवडा कारागृह', en: 'Education Department, Yerawada Prison' }
    }
  },
  'library': {
    heroImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80',
    title: { mr: 'ग्रंथालय', en: 'Library' },
    subtitle: { mr: 'वाचनातून परिवर्तन', en: 'Transformation through Reading' },
    description: {
      mr: 'कैद्यांच्या बौद्धिक विकासासाठी कारागृहात अद्ययावत ग्रंथालय आहे. यामध्ये विविध कादंबऱ्या, आत्मचरित्रे, धार्मिक ग्रंथ आणि शैक्षणिक पुस्तके उपलब्ध आहेत.',
      en: 'An updated library is available in the prison for the intellectual development of inmates. It contains various novels, autobiographies, religious texts, and educational books.'
    },
    stats: [
      { label: { mr: 'एकूण पुस्तके', en: 'Total Books' }, value: '10,000+', icon: 'Book' },
      { label: { mr: 'दैनिक वर्तमानपत्रे', en: 'Daily Newspapers' }, value: '15', icon: 'Newspaper' },
      { label: { mr: 'वाचक', en: 'Readers' }, value: '500+', icon: 'Users' }
    ],
    keyFunctions: [
      {
        title: { mr: 'पुस्तकांची देवघेव', en: 'Book Lending' },
        desc: { mr: 'कैद्यांना त्यांच्या बॅरेकवर वाचण्यासाठी पुस्तके दिली जातात.', en: 'Books are issued to inmates to read in their barracks.' },
        icon: 'BookOpen'
      },
      {
        title: { mr: 'वाचनालय कक्ष', en: 'Reading Room' },
        desc: { mr: 'शांतपणे बसून वर्तमानपत्रे आणि पुस्तके वाचण्यासाठी प्रशस्त वाचनालय.', en: 'A spacious reading room to sit quietly and read newspapers and books.' },
        icon: 'Library'
      }
    ],
    contactInfo: {
      email: 'library@mahaprisons.gov.in',
      phone: '020-26681245',
      address: { mr: 'मध्यवर्ती ग्रंथालय, येरवडा कारागृह', en: 'Central Library, Yerawada Prison' }
    }
  }
};
