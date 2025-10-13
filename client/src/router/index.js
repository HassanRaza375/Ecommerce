import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { AuthService } from '../middleware/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/Todo',
      name: 'Todo',
      component: () => import('../views/Task/TodoTasks.vue'),
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/user/auth/LoginAuth.vue'),
    },
    {
      path: '/ForgotPassword/:id?',
      name: 'ForgotPassword',
      component: () => import('../views/user/auth/ForgotPassword.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/user/auth/SignupAuth.vue'),
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: () => import('../views/cart/index.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/Localization',
      name: 'Localization',
      component: () => import('../views/LocalizationView.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/DynmaicComponent',
      name: 'DynmaicComponent',
      component: () => import('../views/dynamicComponent.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/categories/:slug/products',
      name: 'CategoryProducts',
      component: () => import('../views/category/CategoryProducts.vue'),
      props: true,
    },
    {
      path: '/dashboard/users',
      name: 'Users',
      component: () => import('../views/dashboard/allUsers.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/dashboard/profile/:id?',
      name: 'profile',
      component: () => import('../views/dashboard/profileUser.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/dashboard/addressBook/:id?',
      name: 'AddressBook',
      component: () => import('../views/dashboard/adressBook.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/dashboard/wishList/:id?',
      name: 'wishList',
      component: () => import('../views/dashboard/wishList.vue'),
      meta: { requiresAuth: true }, // Protected
    },
  ],
})

// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = AuthService.isAuthenticated()

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' }) // Redirect to login if not authenticated
  } else {
    next() // Proceed to route
  }
})

export default router
