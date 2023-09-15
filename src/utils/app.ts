import i18next from 'i18next';

export const changeLanguage = (language: string) => {
  void i18next.changeLanguage(language);
};

export const getCurrentLanguage = () => {
  return i18next.language;
}

export const isCurrentLanguageEnglish = () => {
  return getCurrentLanguage() === 'en';
}
