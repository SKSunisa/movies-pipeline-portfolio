import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationTH from './locales/th.json';
import translationEN from './locales/en.json';
import translationZH from './locales/ch.json';

const resources = {
  th: {
    translation: translationTH
  },
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'th',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;