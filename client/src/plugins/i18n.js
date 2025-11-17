// src/i18n.js
import { addToCart } from '@/services/cartService'
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
    localization: 'Localization',
    startShopping: 'Start Shopping',
    myOrders: 'My Orders',
    profile: 'Profile',
    allUsers: 'All Users',
    wishlist: 'Wishlist',
    logout: 'Logout',
    fillThese: 'Fill these fields',
    dynmaiccomponent: 'Dynamic Component',
    addressBook: 'Address Book',
    task: 'Task',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
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
    dynmaiccomponent: 'Composant dynamique',
    addressBook: 'Carnet d\'adresses',
    task: 'Tâche',
    addToCart: 'Ajouter au panier',
    viewDetails: 'Voir les détails',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
