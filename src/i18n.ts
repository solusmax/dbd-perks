import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import languagesJson from '@/data/languages.json';

void i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    ns: ['app', 'characters', 'perks', 'sides'],
    preload: languagesJson.map((language) => language.value),
    defaultNS: 'app',
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
