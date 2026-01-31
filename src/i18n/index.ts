import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import heroEN from "./locales/en/hero.json";
import heroAR from "./locales/ar/hero.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        hero: heroEN,
      },
      ar: {
        hero: heroAR,
      },
    },
  });

export default i18n;
