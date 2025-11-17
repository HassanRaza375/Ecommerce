// src/i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    signup: 'Signup',
    home: 'Home',
    about: 'About',
    search: 'Search',
    cart: 'Cart',
    localization: 'Task Localization',
    startShopping: 'Start Shopping',
    myOrders: 'My Orders',
    profile: 'Profile',
    allUsers: 'All Users',
    wishlist: 'Wishlist',
    logout: 'Logout',
    fillThese: 'Fill these fields',
  },
  fr: {
    login: 'Connexion',
    email: 'Email',
    password: 'Mot de passe',
    signup: 'Inscription',
    home: 'Accueil',
    about: 'À propos',
    search: 'Rechercher',
    cart: 'Panier',
    localization: 'Localisation',
    startShopping: 'Commencer vos achats',
    myOrders: 'Mes commandes',
    profile: 'Profil',
    allUsers: 'Tous les utilisateurs',
    wishlist: 'Liste de souhaits',
    logout: 'Se déconnecter',
    fillThese: 'Remplissez ces champs',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
