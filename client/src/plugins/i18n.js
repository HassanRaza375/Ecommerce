// src/i18n.js
import { createI18n } from 'vue-i18n'

// Define your translations
const messages = {
  en: {
    welcome: 'Welcome',
    hello: 'Hello {name}!',
    cancel: 'Cancel',
    confirm: 'Confirm',
    profile: 'Profile',
    logout: 'Logout',
  },
  fr: {
    welcome: 'Bienvenue',
    hello: 'Bonjour {name} !',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    profile: 'Profil',
    logout: 'Se déconnecter',
  },
}

// Create the i18n instance
const i18n = createI18n({
  legacy: false, // use Composition API
  locale: 'en', // default language
  fallbackLocale: 'en',
  messages,
})

export default i18n
