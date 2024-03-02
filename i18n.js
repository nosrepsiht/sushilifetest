// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// i18n
//   .use(initReactI18next)
//   .init({
//     lng: 'en',
//     resources: {
//       en: {
//         translation: require('./locales/en.json'),
//       },
//       ru: {
//         translation: require('./locales/ru.json'),
//       },
//     },
//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   });

// export default i18n;

// working script

// import i18n from 'i18next';
// import Backend from 'i18next-node-fs-backend';
// import { initReactI18next } from 'react-i18next';

// i18n
//   .use(Backend)
//   .use(initReactI18next)
//   .init({
//     backend: {
//       loadPath: './locales/{{lng}}.json',
//     },
//     lng: 'en',
//     fallbackLng: 'en',
//     debug: true,
//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     },
//   });

// export default i18n;