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
      path: '/aboutold',
      name: 'abouttest',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView_v2.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/searchPage.vue'),
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
      path: '/categories/:slug/:id',
      name: 'CategoryProducts',
      component: () => import('../views/category/productDetail.vue'),
      props: true,
    },
    {
      path: '/categories/:slug/',
      name: 'Category',
      component: () => import('../views/category/singleCategory.vue'),
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
      path: '/dashboard/add/address/:id?',
      name: 'Add Addresses',
      component: () => import('../views/dashboard/addAddresses.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/dashboard/edit/address/:id?',
      name: 'Edit Addresses',
      component: () => import('../views/dashboard/editAdresses.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/dashboard/wishList/:id?',
      name: 'wishList',
      component: () => import('../views/dashboard/wishList.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/users/my-orders',
      name: 'orders',
      component: () => import('../views/user/order/orderPage.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/users/my-orders/:id',
      name: 'my-orders',
      component: () => import('../views/user/order/myOrders.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/users/my-orders/order-detail/:id',
      name: 'order details',
      component: () => import('../views/user/order/OrderDetails.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: () => import('../views/user/order/thankYou.vue'),
      meta: { requiresAuth: true }, // Protected
    },
    {
      path: '/admin',
      component: () => import('../components/layout/AdminLayout.vue'), // <<–– Admin layout used here
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: '', component: () => import('../views/admin/adminDashboard.vue') },
        { path: 'products', component: () => import('../views/admin/adminProducts.vue') },
        // add more...
      ],
    },
  ],
})

//  Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = AuthService.isAuthenticated()
  const user = AuthService.getUser() // contains { id, role, ... }

  // 1. Check if login is required
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Login' })
  }

  // 2. Check admin routes
  if (to.meta.requiresAdmin) {
    if (!isLoggedIn) return next({ name: 'Login' }) // not logged in

    if (user.role !== 'admin') {
      return next({ name: 'Home' }) // redirect normal users
    }
  }

  next()
})

export default router
