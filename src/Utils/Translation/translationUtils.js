// src/utils/translationUtils.js

// Hook version - must be used inside React components
export const useTranslation = () => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  
  const getTranslation = (translations, key, defaultText) => {
    if (!translations || !selectedLanguage) return defaultText;
    
    const translationArray = translations[key];
    if (!translationArray) return defaultText;
    
    const translation = translationArray.find(
      (item) => item.lang_code === selectedLanguage?.lang_code
    );
    return translation ? translation.value : defaultText;
  };

  return { getTranslation };
};

// Regular function version - can be used anywhere
export const getTranslation = (translations, selectedLanguage, key, defaultText) => {
  if (!translations || !selectedLanguage) return defaultText;
  
  const translationArray = translations[key];
  if (!translationArray) return defaultText;
  
  const translation = translationArray.find(
    (item) => item.lang_code === selectedLanguage?.lang_code
  );
  return translation ? translation.value : defaultText;
};