import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import languagesJson from '@/data/languages.json';

import { getDefaultLanguage } from '@/utils';

void i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    detection: {
      convertDetectedLanguage: (lng) => lng.replace(/-.+/, ''),
    },
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    ns: ['app', 'characters', 'perks', 'player-sides'],
    preload: languagesJson.map((language) => language.value),
    defaultNS: 'app',
    fallbackLng: getDefaultLanguage(),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
