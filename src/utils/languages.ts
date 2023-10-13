import i18next from 'i18next';

import { getLanguages } from '@/model';

import { LanguageSwitcherDirection } from '@/types';

const languages = getLanguages();

export const getDefaultLanguage = () => {
  return languages[0];
};

export const getCurrentLanguage = () => {
  return i18next.language;
};

export const getCurrentLanguageIndex = () => {
  const currentLanguage = getCurrentLanguage();

  return languages.findIndex((language) => language === currentLanguage);
};

export const getNearestLanguage = (direction: LanguageSwitcherDirection) => {
  const currentLanguageIndex = getCurrentLanguageIndex();

  const lastLanguageIndex = languages.length - 1;

  let newLanguageIndex: number;

  switch (direction) {
    case 'previous':
      newLanguageIndex =
        currentLanguageIndex - 1 >= 0
          ? currentLanguageIndex - 1
          : lastLanguageIndex;
      break;
    case 'next':
      newLanguageIndex =
        currentLanguageIndex + 1 <= lastLanguageIndex
          ? currentLanguageIndex + 1
          : 0;
      break;
  }

  return languages[newLanguageIndex];
};

export const isCurrentLanguageN = (language: string) => {
  return getCurrentLanguage() === language;
};

export const setLanguage = (language: string) => {
  void i18next.changeLanguage(language);
};
