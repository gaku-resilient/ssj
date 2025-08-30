import { useContext } from 'react';
import LanguageContext from './LanguageContext';
import en from './translations/en.json';
import hi from './translations/hi.json';

const translations = { en, hi };

const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (!result) {
        console.warn(`Translation missing: ${key} (${language})`);
        return key;
      }
    }
    return result;
  };

  return { t, language };
};

export default useTranslation;