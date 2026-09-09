import React from 'react';
import { useAccessibility } from '../../../hooks/useAccessibility';

const GalleryHeader = () => {
  const { language, t } = useAccessibility();

  return (
    <div className="mb-8 border-l-4 border-amber-500 pl-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F3D66] dark-mode:text-blue-300 font-poppins">
        {t('फोटो गॅलरी')}
      </h1>
      <p className="mt-2 text-gray-600 dark-mode:text-gray-300 max-w-3xl text-sm sm:text-base">
        {language === 'mr' 
          ? 'महाराष्ट्र कारागृह विभागातील विविध उपक्रम, कार्यशाळा, आणि सुविधांची झलक. चित्रे मोठी करून पाहण्यासाठी आणि अधिक माहिती वाचण्यासाठी क्लिक करा.' 
          : 'A glimpse of various activities, workshops, and facilities at Maharashtra Prison Department. Click on any image to expand it and read more details.'}
      </p>
    </div>
  );
};

export default GalleryHeader;
