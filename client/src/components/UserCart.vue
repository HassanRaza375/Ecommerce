<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()

defineProps({
  isCartOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['isCartOpen'])
</script>

<template>
  <div>
    <div :class="['offcanvas', { 'is-active': isCartOpen }]">
      <div class="offcanvas-content box">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <h2 class="title is-4">Cart ({{ cartStore.totalItems }})</h2>
          <i class="pi pi-times pointer" @click="emit('isCartOpen')"></i>
        </div>

        <!-- Updated Cart UI -->
        <ul class="cart-list">
          <li
            v-for="item in cartStore.items"
            :key="item.id"
            class="cart-item is-flex is-justify-content-space-between is-align-items-center"
          >
            <div>
              <strong>{{ item.name }}</strong
              ><br />
              <small>{{ item.quantity }} × ${{ item.price }}</small>
            </div>

            <i class="pi pi-trash pointer" @click="cartStore.removeItem(item.id)"></i>
          </li>
        </ul>

        <!-- Total Amount -->
        <div class="total mt-4"><strong>Total:</strong> ${{ (cartStore.totalPrice).toFixed(2) }}</div>
      </div>
    </div>

    <div v-if="isCartOpen" class="offcanvas-overlay" @click="emit('isCartOpen')"></div>
  </div>
</template>

<style scoped>
.cart-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.offcanvas {
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100vh;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: right 0.3s ease;
  z-index: 200;
}
.offcanvas.is-active {
  right: 0;
}
.offcanvas-overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
</style>
