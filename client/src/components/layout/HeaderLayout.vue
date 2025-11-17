<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useCommonStore } from '../../stores/common'
import { useCartStore } from '../../stores/cart'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const router = useRouter()
const store = useCommonStore()
const cartStore = useCartStore()
const isCartOpen = ref(false)
const toggleUserCart = () => {
  isCartOpen.value = !isCartOpen.value
  isOpen.value = false
}
const isOpen = ref(false)
const currentLang = ref(locale.value)
const userId = JSON.parse(localStorage.getItem('userId')) || ''
const links = computed(() => [
  { name: 'home', path: '/', show: 'customer' },
  { name: 'about', path: '/about', show: 'customer' },
  { name: 'search', path: '/search', show: 'customer' },
  { name: `Cart(${cartStore.totalItems})`, path: '/cart', show: 'customer' },
  { name: 'task', path: '/Todo', show: 'admin' },
  { name: 'localization', path: '/Localization', show: 'admin' },
  { name: 'dynmaiccomponent', path: '/DynmaicComponent', show: 'admin' },
])
const UserCart = defineAsyncComponent({
  loader: () => import('../../components/UserCart.vue'),
  delay: 200,
  timeout: 5000,
})
const Logout = () => {
  store.LogOut()
  toggleDropdown()
  router.push('/Login')
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
const changeLanguage = () => {
  locale.value = currentLang.value
}
const isBurgerOpen = ref(false)

const toggleBurger = () => {
  isBurgerOpen.value = !isBurgerOpen.value
  toggleDropdown()
}
</script>
<template>
  <header>
    <div>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <RouterLink class="navbar-item" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="360"
              height="80"
              viewBox="0 0 360 80"
              role="img"
              aria-labelledby="title desc"
            >
              <title id="title">E-Shop Logo</title>
              <desc id="desc">
                A shopping cart with a box inside and the word "E-Shop" — modern e-commerce logo.
              </desc>
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stop-color="#4f46e5" />
                  <stop offset="1" stop-color="#06b6d4" />
                </linearGradient>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.12" />
                </filter>
              </defs>
              <g transform="translate(10,10)">
                <rect
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  rx="12"
                  fill="url(#g)"
                  filter="url(#shadow)"
                />
                <g transform="translate(10,12)" fill="#fff">
                  <path d="M6 2h24l-3 12H9z" opacity="0.95" />
                  <rect
                    x="8"
                    y="3"
                    width="8"
                    height="6"
                    rx="1"
                    fill="#fff"
                    stroke="rgba(0,0,0,0.06)"
                    stroke-width="0.6"
                  />
                  <path
                    d="M2 2 L4 2 L8 16"
                    stroke="#fff"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                  />
                  <circle cx="12" cy="22" r="3" fill="#fff" />
                  <circle cx="26" cy="22" r="3" fill="#fff" />
                </g>
              </g>
              <g transform="translate(90,44)">
                <text
                  x="0"
                  y="-8"
                  font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                  font-size="28"
                  font-weight="700"
                  fill="#111827"
                >
                  E-Shop
                </text>
                <text
                  x="0"
                  y="16"
                  font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                  font-size="12"
                  fill="#6b7280"
                >
                  modern online store
                </text>
              </g>
            </svg>
          </RouterLink>

          <a
            role="button"
            class="navbar-burger"
            :class="{ 'is-active': isBurgerOpen }"
            aria-label="menu"
            aria-expanded="false"
            @click="toggleBurger"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isBurgerOpen }">
          <div class="navbar-start">
            <RouterLink
              v-for="(item, i) in links.filter(
                (e) => store.role === e.show || e.show === 'customer',
              )"
              class="navbar-item"
              :to="item.path"
              :key="i"
              @click="isBurgerOpen = false"
              >{{ item.name.includes('Cart(') ? item.name : t(item.name) }}
            </RouterLink>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field mb-0">
                <p class="control has-icons-left">
                  <span class="select">
                    <select v-model="currentLang" @change="changeLanguage">
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </span>
                  <span class="icon is-small is-left">
                    <i class="pi pi-globe"></i>
                  </span>
                </p>
              </div>
              <div class="buttons" v-if="!store.isLoggedIn">
                <RouterLink class="button is-primary" to="/Login">Login</RouterLink>
                <RouterLink class="button is-light" to="/SignUp"
                  ><strong>Sign up</strong></RouterLink
                >
              </div>
              <div class="buttons" v-else>
                <div :class="['dropdown', { 'is-active': isOpen }]">
                  <div class="dropdown-trigger">
                    <button class="button is-primary has-text-white" @click="toggleDropdown">
                      <span class="is-flex is-align-items-center"
                        ><i class="pi pi-database mr-2"></i> Dashboard</span
                      >
                    </button>
                  </div>
                  <div class="dropdown-menu">
                    <div class="dropdown-content">
                      <RouterLink
                        class="dropdown-item is-flex is-justify-content-start is-align-items-center is-gap-1"
                        :to="`/dashboard/wishList/${userId}`"
                        @click="toggleDropdown"
                        ><i class="pi pi-list-check"></i>{{ t('wishlist') }}</RouterLink
                      >
                      <RouterLink
                        class="dropdown-item is-flex is-justify-content-start is-align-items-center is-gap-1"
                        :to="`/dashboard/addressBook/${userId}`"
                        @click="toggleDropdown"
                        ><i class="pi pi-building-columns"></i>{{ t('addressBook') }}</RouterLink
                      >
                      <RouterLink
                        v-if="store.role === 'admin'"
                        class="dropdown-item is-flex is-justify-content-start is-align-items-center is-gap-1"
                        to="/dashboard/users"
                        @click="toggleDropdown"
                        ><i class="pi pi-users"></i>{{ t('allUsers') }}</RouterLink
                      >
                      <RouterLink
                        class="dropdown-item is-flex is-justify-content-start is-align-items-center is-gap-1"
                        :to="`/users/my-orders/${userId}`"
                        @click="toggleDropdown"
                        ><i class="pi pi-users"></i>{{ t('myOrders') }}</RouterLink
                      >
                      <RouterLink
                        class="dropdown-item is-flex is-justify-content-start is-align-items-center is-gap-1"
                        to="/dashboard/profile"
                        @click="toggleDropdown"
                        ><i class="pi pi-user"></i> {{ t('profile') }}</RouterLink
                      >
                      <hr class="dropdown-divider" />
                      <div
                        class="dropdown-item is-flex is-justify-content-start is-align-items-center is-gap-1 pointer"
                        @click="toggleUserCart"
                      >
                        <i class="pi pi-shopping-cart" style="font-size: 1rem"></i> {{ t('cart') }}
                      </div>
                      <a
                        class="dropdown-item is-flex is-justify-content-start is-align-items-center is-gap-1"
                        @click="Logout"
                        ><i class="pi pi-spin pi-cog" style="font-size: 1rem"></i>
                        {{ t('logout') }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <UserCart @isCartOpen="toggleUserCart" :isCartOpen="isCartOpen" />
  </header>
</template>

<style scoped>
header {
  padding-bottom: 5px;
  border-bottom: 1px solid rebeccapurple;
}
header {
  position: relative;
  z-index: 2000;
}
.dropdown-menu {
  position: absolute;
  z-index: 1000;
}
.navbar {
  z-index: unset;
}
header {
  z-index: unset;
}
.navbar-item img,
.navbar-item svg {
  max-height: 50px;
  max-width: 180px;
}
</style>
