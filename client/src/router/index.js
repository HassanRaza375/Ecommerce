import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/Todo',
      name: 'Todo',
      component: () => import('../views/Task/Todo.vue'),
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/user/auth/login.vue'),
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/user/auth/signup.vue'),
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: () => import('../views/cart/index.vue'),
    },
    {
      path: '/categories/:slug/products',
      name: 'CategoryProducts',
      component: () => import('../views/category/CategoryProducts.vue'),
      props: true, // 👈 Pass slug as a prop to component
    },
  ],
})

export default router
