import i18next from 'i18next';

export const changeLanguage = (language: string) => {
  void i18next.changeLanguage(language);
};