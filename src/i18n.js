import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "es";

// src/i18n.js
const resources = {
  en: {
    translation: {
      "bestiary": "BESTIARY",
      "home": "HOME",
      "favorites": "FAVORITES",
      "skin_creator": "SKIN CREATOR",
      "footer_text": "Faculty of Informatics - Advanced Web Programming - TP 2 REACT 2026",
      "role_pm": "Scrum Master / PM",
      "role_dev": "Developer"
    }
  },
  es: {
    translation: {
      "bestiary": "BESTIARIO",
      "home": "INICIO",
      "favorites": "FAVORITOS",
      "skin_creator": "CREADOR DE SKINS",
      "footer_text": "Facultad de Informática - Programación Web Avanzada - TP 2 REACT 2026",
      "role_pm": "Scrum Master / PM",
      "role_dev": "Desarrolladora"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
