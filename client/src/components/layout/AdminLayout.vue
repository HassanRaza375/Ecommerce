<template>
  <div class="admin-layout">
    <!-- Admin Sidebar -->
    <aside class="admin-sidebar" :class="isSidebarOpen ? 'open' : 'close'">
      <PanelMenu :model="items" class="w-full md:w-80">
        <template #item="{ item }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple class="cursor-pointer px-4 py-2" :href="href" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            class="cursor-pointer px-4 py-2"
            :href="item.url"
            :target="item.target"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
          </a>
        </template>
      </PanelMenu>
    </aside>

    <!-- Main content -->
    <main class="admin-content" :class="isSidebarOpen ? '' : 'sidebar-hidden'">
      <header class="admin-header">
        <button class="burger-btn" @click="isSidebarOpen = !isSidebarOpen">
          <i class="pi pi-bars"></i>
        </button>
        <h2>Admin Panel</h2>
      </header>
      <!-- Page content -->
      <div class="page-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PanelMenu from 'primevue/panelmenu'
import { useCommonStore } from '@/stores/common'
const commonStore = useCommonStore()
const isMobile = ref(false)
const isSidebarOpen = ref(true)
onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})
const checkScreen = () => {
  isMobile.value = window.innerWidth < 1200
  if (isMobile.value) {
    isSidebarOpen.value = false
  } else {
    isSidebarOpen.value = true
  }
}
const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/admin',
  },

  {
    label: 'Orders',
    icon: 'pi pi-shopping-cart',
    items: [
      { icon: 'pi pi-shopping-cart', label: 'All Orders', route: '/admin/orders/' },
      { icon: 'pi pi-shopping-cart', label: 'Pending Orders', route: '/admin/orders/pending' },
      { icon: 'pi pi-shopping-cart', label: 'Processing', route: '/admin/orders/processing' },
      { icon: 'pi pi-shopping-cart', label: 'Completed', route: '/admin/orders/completed' },
      {
        icon: 'pi pi-shopping-cart',
        label: 'Cancelled / Refunded',
        route: '/admin/orders/cancelled',
      },
    ],
  },

  {
    label: 'Products',
    icon: 'pi pi-box',
    items: [
      { icon: 'pi pi-box', label: 'All Products', route: '/admin/products' },
      { icon: 'pi pi-box', label: 'Add Product', route: '/admin/products/add' },
      { icon: 'pi pi-box', label: 'Categories', route: '/admin/categories' },
      { icon: 'pi pi-box', label: 'Attributes', route: '/admin/attributes' },
      { icon: 'pi pi-box', label: 'Inventory', route: '/admin/inventory' },
    ],
  },

  {
    label: 'Customers',
    icon: 'pi pi-users',
    items: [
      { icon: 'pi pi-users', label: 'All Customers', route: '/admin/customers' },
      { icon: 'pi pi-users', label: 'Customer Groups', route: '/admin/customers/groups' },
    ],
  },

  {
    label: 'Marketing',
    icon: 'pi pi-megaphone',
    items: [
      { icon: 'pi pi-megaphone', label: 'Coupons / Discounts', route: '/admin/coupons' },
      { icon: 'pi pi-megaphone', label: 'Banners', route: '/admin/banners' },
      { icon: 'pi pi-megaphone', label: 'Email Campaigns', route: '/admin/campaigns' },
    ],
  },

  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',
    items: [
      { icon: 'pi pi-chart-bar', label: 'Sales Reports', route: '/admin/reports/sales' },
      { icon: 'pi pi-chart-bar', label: 'Product Reports', route: '/admin/reports/products' },
      { icon: 'pi pi-chart-bar', label: 'Customer Reports', route: '/admin/reports/customers' },
      { icon: 'pi pi-chart-bar', label: 'Abandoned Carts', route: '/admin/reports/abandoned' },
    ],
  },

  {
    label: 'Content',
    icon: 'pi pi-file',
    items: [
      { icon: 'pi pi-file', label: 'Pages', route: '/admin/cms/pages' },
      { icon: 'pi pi-file', label: 'Blog / Articles', route: '/admin/cms/blog' },
      { icon: 'pi pi-file', label: 'Media Library', route: '/admin/cms/media' },
    ],
  },

  {
    label: 'Shipping',
    icon: 'pi pi-send',
    items: [
      { icon: 'pi pi-send', label: 'Shipping Methods', route: '/admin/shipping/methods' },
      { icon: 'pi pi-send', label: 'Warehouses', route: '/admin/shipping/warehouses' },
    ],
  },

  {
    label: 'Settings',
    icon: 'pi pi-cog',
    items: [
      { icon: 'pi pi-cog', label: 'Store Settings', route: '/admin/settings/store' },
      { icon: 'pi pi-cog', label: 'Taxes', route: '/admin/settings/taxes' },
      { icon: 'pi pi-cog', label: 'Payments', route: '/admin/settings/payments' },
      { icon: 'pi pi-cog', label: 'Users & Roles', route: '/admin/settings/users' },
    ],
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => commonStore.LogOut(),
    style: 'margin-top: 20px; color: red;',
  },
])
</script>
<style>
.burger-btn i{
  font-size: 1.5rem;
}
.admin-layout {
  display: flex;
  height: 100vh;
}
.admin-sidebar {
  width: 250px;
  background: #2d2d2d;
  color: white;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  transition: left 0.3s ease;
  z-index: 999;
  overflow-y: auto;
  scrollbar-width: thin;
}
.admin-sidebar.open {
  left: 0;
}
.admin-sidebar.close {
  left: -250px;
}
.admin-header {
  background: white;
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  gap: 10px;
}
.admin-header h2 {
  font-size: 1.25rem;
  color: #000;
  font-weight: 600;
}
.admin-content {
  flex: 1;
  background: #f4f4f4;
  margin-left: 250px;
  transition: left 0.2s ease;
}
.admin-content.sidebar-hidden {
  margin-left: 0;
}
.page-content {
  padding: 20px;
}
.p-panelmenu-header-content a {
  display: flex;
  align-items: center;
  color: #000;
  font: 16px;
  font-weight: bold;
}
.p-panelmenu-item-content a {
  display: flex;
  align-items: center;
  color: #000;
  font-size: 14px;
  font-weight: 500;
}
</style>
