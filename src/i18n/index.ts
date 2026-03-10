import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import heroEN from "./locales/en/home/hero.json";
import heroAR from "./locales/ar/home/hero.json";

import navbarEN from "./locales/en/common/navbar.json";
import navbarAR from "./locales/ar/common/navbar.json";

import topbarEN from "./locales/en/common/topbar.json";
import topbarAR from "./locales/ar/common/topbar.json";

import profileEN from "./locales/en/profile/profile.json";
import profileAR from "./locales/ar/profile/profile.json";

import footerEN from "./locales/en/common/footer.json";
import footerAR from "./locales/ar/common/footer.json";

import bookingsEn from "./locales/en/bookings/bookings.json";  
import bookingsAr from "./locales/ar/bookings/bookings.json";

import titleSectionEN from "./locales/en/common/titleSection.json";
import tileSectionAR from "./locales/ar/common/titleSection.json";

import featuresEN from "./locales/en/home/features.json";
import featuresAR from "./locales/ar/home/features.json";

import chooseUsEN from "./locales/en/home/chooseUs.json";
import chooseUsAR from "./locales/ar/home/chooseUs.json";

import faqEN from "./locales/en/home/faq.json";
import faqAR from "./locales/ar/home/faq.json";

import ctaEN from "./locales/en/common/cta.json";
import ctaAR from './locales/ar/common/cta.json'

import sharedHeroEN from './locales/en/common/sharedHero.json';
import sharedHeroAR from './locales/ar/common/sharedHero.json';

import supportEN from './locales/en/contact/support.json';
import supportAR from './locales/ar/contact/support.json';

import contactFromEN from './locales/en/contact/contactForm.json';
import contactFromAR from './locales/ar/contact/contactForm.json';

import loginEN from './locales/en/auth/login.json';
import loginAR from './locales/ar/auth/login.json';

import registerEN from './locales/en/auth/register.json';
import registerAR from './locales/ar/auth/register.json';

import authFormEN from './locales/en/auth/authForm.json';
import authFormAR from './locales/ar/auth/authForm.json';

import sharedHeroPropertiesEN from './locales/en/properties/sharedHero.json';
import sharedHeroPropertiesAR from './locales/ar/properties/sharedHero.json';

import filterEN from './locales/en/properties/filter.json';
import filterAR from './locales/ar/properties/filter.json';

import propertiesEN from "./locales/en/properties/property.json";
import propertiesAR from './locales/ar/properties/property.json';
i18n.use(initReactI18next).init({
  resources: {
    en: {
      hero: heroEN,
      navbar: navbarEN,
      topbar: topbarEN,
      profile: profileEN,
      footer: footerEN,
      bookings: bookingsEn,
      titleSection: titleSectionEN,
      features: featuresEN,
      chooseUs: chooseUsEN,
      faq:faqEN,
      cta:ctaEN,
      sharedHero: sharedHeroEN,
      support: supportEN,
      contactForm: contactFromEN,
      login: loginEN,
      authForm: authFormEN,
      register: registerEN,
      sharedHeroProperties: sharedHeroPropertiesEN,
      filter: filterEN,
      properties: propertiesEN
    },
    ar: {
      hero: heroAR,
      navbar: navbarAR,
      topbar: topbarAR,
      profile: profileAR,
      footer: footerAR,
      bookings: bookingsAr,
      titleSection: tileSectionAR,
      features: featuresAR,
      chooseUs: chooseUsAR,
      faq:faqAR,
      cta:ctaAR,
      sharedHero: sharedHeroAR,
      support: supportAR,
      contactForm: contactFromAR,
      login: loginAR,
      authForm: authFormAR,
      register: registerAR,
      sharedHeroProperties: sharedHeroPropertiesAR,
      filter: filterAR,
      properties: propertiesAR
    }
  },

  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;