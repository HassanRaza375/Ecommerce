<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToasterStore } from '@/stores/toaster'
import { getUsersAdressesById } from '@/services/authService'
import { createOrder } from '@/services/orderService'

import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Divider from 'primevue/divider'
import { useRouter } from 'vue-router'
const router = useRouter()
const cartStore = useCartStore()
const toast = useToasterStore()

const userId = localStorage.getItem('userId')

const addresses = ref([])
const selectedAddress = ref(null)
const paymentMethod = ref(null)

const paymentOptions = [
  { label: 'Cash on Delivery', value: 'COD' },
  { label: 'Stripe', value: 'Stripe' },
  { label: 'PayPal', value: 'PayPal' },
  { label: 'Easypaisa', value: 'Easypaisa' },
]

const cart = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.totalPrice)
const tax = computed(() => subtotal.value * 0.07)
const shipping = computed(() => (cart.value.length > 0 ? 5 : 0))
const total = computed(() => subtotal.value + tax.value + shipping.value)

async function loadAddresses() {
  const res = await getUsersAdressesById(userId)
  addresses.value = res.data.addresses?.map((e) => [
    { address: e.address_line1 , id: e.id},
    { address: e.address_line2 , id: e.id},
  ])[0]
  console.log(
    addresses.value.map((e) => [{ address: e.address_line1 ,id: e.id }, { address: e.address_line2,id:e.id }])[0],
  )
}

async function placeOrder() {
  if (!selectedAddress.value) {
    toast.error('Please select a delivery address.')
    return
  }
  if (!paymentMethod.value) {
    toast.error('Please choose a payment method.')
    return
  }
  if (cart.value.length === 0) {
    toast.error('Your cart is empty.')
    return
  }

  const items = cart.value.map((item) => ({
    productId: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }))

  const payload = {
    addressId: selectedAddress.value.id,
    items,
    totalAmount: total.value,
    paymentMethod: paymentMethod.value,
  }

  try {
    const res = await createOrder(payload)
    console.log(res)

    toast.success('Order placed successfully!')
    cartStore.clearCart()
    router.push('/thank-you')
  } catch (error) {
    toast.error(error)
  }
}

onMounted(() => {
  cartStore.init()
  loadAddresses()
})
</script>

<template>
  <section class="order-container">
    <h1><b>Checkout</b></h1>
    <div class="grid-layout">
      <div class="left">
        <div class="section-card">
          <h1><b>Delivery Address</b></h1>
          <div v-if="addresses.length > 0">
            <Dropdown
              v-model="selectedAddress"
              :options="addresses"
              optionLabel="address"
              placeholder="Select Address"
              style="width: 100%"
            />
          </div>

          <div v-else class="text-muted">No saved addresses found.</div>
        </div>

        <Divider />

        <div class="section-card">
          <h1>Payment Method</h1>

          <div class="payment-options">
            <div class="payment-row" v-for="opt in paymentOptions" :key="opt.value">
              <RadioButton v-model="paymentMethod" :value="opt.value" inputId="opt.value" />
              <label>{{ opt.label }}</label>
            </div>
          </div>
        </div>

        <Divider />

        <div class="section-card">
          <h1><b>Order Items</b></h1>
          <div v-for="item in cart" :key="item.id" class="item-row">
            <img :src="item.image_url" />
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="qty">Qty: {{ item.quantity }}</div>
            </div>
            <div class="price">${{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>

          <div v-if="!cart.length" class="text-muted">Your cart is empty.</div>
        </div>
      </div>

      <div class="right">
        <div class="summary-card">
          <h1>Order Summary</h1>

          <div class="line">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>

          <div class="line">
            <span>Tax (7%)</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>

          <div class="line">
            <span>Shipping</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>

          <Divider />

          <div class="total">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>

          <Button label="Place Order" class="w-full mt-3" @click="placeOrder" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.order-container {
  max-width: 1100px;
  margin: 30px auto;
  padding: 15px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.section-card {
  margin-bottom: 20px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-row {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-row img {
  width: 70px;
  height: 55px;
  border-radius: 6px;
  object-fit: cover;
}

.item-row .info {
  flex: 1;
}

.item-row .name {
  font-weight: 600;
}

.summary-card .line,
.summary-card .total {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}

.total {
  font-weight: 700;
  font-size: 1.1rem;
}

.text-muted {
  color: #6b7280;
  font-size: 14px;
}

.right {
  position: sticky;
  height: fit-content;
  top: 20px;
}

@media (max-width: 900px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
  .right {
    position: static;
  }
}
</style>
