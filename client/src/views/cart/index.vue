<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

// --- Initialize store
const cartStore = useCartStore()

// --- Computed values
const cart = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.totalItems)
const subtotal = computed(() => cartStore.totalPrice)
const tax = computed(() => subtotal.value * 0.07)
const shippingLabel = computed(() => (cart.value.length === 0 ? '$0.00' : '$5.00'))
const total = computed(() => subtotal.value + tax.value + (cart.value.length > 0 ? 5 : 0))
// --- Methods
function increase(item) {
  cartStore.addItem(item)
}

function decrease(item) {
  cartStore.decreaseQuantity(item.id)
}

function remove(id) {
  cartStore.removeItem(id)
}

function checkout() {
  if (!cart.value.length) {
    alert('Your cart is empty.')
    return
  }

  // Example: simulate checkout process
  alert('Checkout successful! 🎉')
  cartStore.clearCart()
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Shopping Cart</h1>
      <div class="meta">{{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}</div>
    </header>

    <section class="cart-list" v-if="cart.length">
      <article v-for="item in cart" :key="item.id" class="cart-item">
        <div class="thumb">
          <img :src="item.image_url" :alt="item.name" />
        </div>

        <div class="info">
          <div class="title">{{ item.name }}</div>
          <div class="desc">{{ item.description }}</div>
          <div class="meta-row">
            <span class="badge">{{ item.category }}</span>
            <span>•</span>
            <span class="stock">Stock: {{ item.stock }}</span>
          </div>
        </div>

        <div class="controls">
          <div class="price">\${{ Number(item.price).toFixed(2) }}</div>

          <div class="qty">
            <button @click="decrease(item)">−</button>
            <div class="num">{{ item.quantity }}</div>
            <button @click="increase(item)">+</button>
          </div>

          <div class="total">
            Total: <strong>\${{ (item.price * item.quantity).toFixed(2) }}</strong>
          </div>

          <button class="remove-btn" @click="remove(item.id)">Remove</button>
        </div>
      </article>
    </section>

    <div class="empty" v-else>
      <strong>Your cart is empty</strong>
      <div>Browse products and add them to your cart.</div>
    </div>

    <aside class="summary" :class="cart.length === 0 ? 'grid-span-2' : ''">
      <h2>Order Summary</h2>
      <div class="line">
        <span>Items</span><span>{{ totalItems }}</span>
      </div>
      <div class="line">
        <span>Subtotal</span><span>\${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="line">
        <span>Tax (7%)</span><span>\${{ tax.toFixed(2) }}</span>
      </div>
      <div class="line">
        <span>Shipping</span><span>{{ shippingLabel }}</span>
      </div>
      <div class="total">
        <span>Total</span><span>\${{ total.toFixed(2) }}</span>
      </div>
      <button class="checkout" @click="checkout">Proceed to Checkout</button>
    </aside>
  </div>
</template>

<style scoped>
.grid-span-2 {
  grid-column: 1 / span 2;
}
.container {
  max-width: 1100px;
  margin: 36px auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
}
header {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-list {
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr 140px;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #eef2f7;
}
.thumb img {
  width: 120px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
}
.info .title {
  font-weight: 600;
  font-size: 15px;
}
.info .desc {
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
}
.meta-row {
  font-size: 13px;
  color: #777;
  display: flex;
  gap: 8px;
  align-items: center;
}
.badge {
  background: #eef6ff;
  color: #0c66d0;
  padding: 3px 8px;
  border-radius: 999px;
}
.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.price {
  font-weight: 700;
}
.qty {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e6edf7;
  padding: 6px;
  border-radius: 8px;
}
.qty button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.qty .num {
  width: 24px;
  text-align: center;
  font-weight: 600;
}
.remove-btn {
  background: none;
  border: none;
  color: #d64545;
  cursor: pointer;
  font-size: 13px;
}
.summary {
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  height: fit-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 24px;
}
.summary h2 {
  margin: 0 0 10px;
  font-size: 16px;
}
.summary .line {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  color: #555;
}
.summary .total {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: 700;
}
.checkout {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #0c66d0;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #777;
}
@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }
  .cart-item {
    grid-template-columns: 90px 1fr;
  }
  .controls {
    align-items: flex-start;
  }
}
</style>
