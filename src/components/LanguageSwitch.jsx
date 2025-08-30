import React, { useContext, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import LanguageContext from '../i18n/LanguageContext'; // Adjusted path assuming src/components/LanguageSwitch.jsx

// Animation variants for the toggle thumb
const thumbVariants = {
  en: { x: 0 },
  hi: { x: 24 }, // Matches translate-x-6 (24px) for 48px-wide toggle
};

const LanguageSwitch = memo(() => {
  // Fallback if LanguageContext is unavailable
  let language = 'en';
  let setLanguage = () => console.warn('LanguageContext not available');
  try {
    const context = useContext(LanguageContext);
    language = context.language;
    setLanguage = context.setLanguage;
  } catch (error) {
    console.error('Error accessing LanguageContext:', error);
  }

  const handleToggle = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);

  return (
    <div className="flex items-center p-2" role="radiogroup" aria-label="Language selector">
      <div className="flex items-center space-x-2">
        <span
          className={`text-sm font-medium ${
            language === 'en' ? 'text-yellow-500' : 'text-gray-400'
          }`}
          aria-hidden="true"
        >
          EN
        </span>
        <button
          onClick={handleToggle}
          className="relative w-12 h-6 bg-gray-700 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-amber-50"
          aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
          role="radio"
          aria-checked={language === 'en'}
        >
          <motion.div
            className="w-4 h-4 bg-yellow-500 rounded-full shadow-md"
            variants={thumbVariants}
            animate={language}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            layout
          />
        </button>
        <span
          className={`text-sm font-medium ${
            language === 'hi' ? 'text-yellow-500' : 'text-gray-400'
          }`}
          aria-hidden="true"
        >
          HI
        </span>
      </div>
    </div>
  );
});

export default LanguageSwitch;