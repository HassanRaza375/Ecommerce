<template>
  <div class="order-details-page" v-if="!loading">
    <h1>Order #{{ order.id }}</h1>

    <!-- Status + Date -->
    <div class="order-status-box">
      <span class="status" :class="order.status">
        {{ order.status }}
      </span>
      <p class="date">Placed on: {{ formatDate(order.created_at) }}</p>
    </div>

    <!-- Timeline -->
    <div class="timeline">
      <div class="step" :class="{ active: isStepActive('placed') }">Placed</div>

      <div class="step" :class="{ active: isStepActive('processing') }">Processing</div>

      <div class="step" :class="{ active: isStepActive('shipped') }">Shipped</div>

      <div class="step" :class="{ active: isStepActive('delivered') }">Delivered</div>
    </div>

    <!-- Items -->
    <div class="section">
      <h2>Items in this order</h2>
      <div v-for="item in order.items" :key="item.product_id" class="item-card">
        <img :src="item.image_url" alt="" />

        <div class="item-info">
          <h3>{{ item.product_name }}</h3>
          <p class="qty">Qty: {{ item.quantity }}</p>
          <p class="price">Price: ${{ item.price }}</p>
        </div>
      </div>
    </div>

    <!-- Shipping Address -->
    <div class="section">
      <h2>Shipping Address</h2>
      <div class="address-box">
        <p>
          <strong>{{ order.full_name }}</strong>
        </p>
        <p>{{ order.address_line1 }}</p>
        <p>{{ order.address_line2 }}</p>
        <p>{{ order.city }}, {{ order.state }} {{ order.postal_code }}</p>
        <p>{{ order.country }}</p>
        <p>Phone: {{ order.phone }}</p>
      </div>
    </div>

    <!-- Cost Summary -->
    <div class="section">
      <h2>Payment Summary</h2>
      <div class="summary">
        <p><strong>Subtotal:</strong> ${{ subtotal }}</p>
        <p><strong>Total:</strong> ${{ subtotal }}</p>
      </div>
    </div>

    <button class="back-btn" @click="goBack">Back to My Orders</button>
  </div>

  <div v-else class="loading">Loading order details...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getOrderById } from '@/services/orderService'

const route = useRoute()
const router = useRouter()

const order = ref(null)
const loading = ref(true)
const subtotal = ref(0)

onMounted(async () => {
  try {
    const { data } = await getOrderById(route.params.id)
    let ids = []
    let uniqueOrders = []
    data.forEach((e) => {
      ids.push(e.id)
    })
    ids = [...new Set(ids)]
    ids.forEach((e) => {
      let orderItems = data.filter((order) => order.id === e)
      let orderObject = {
        id: orderItems[0].id,
        status: orderItems[0].status,
        basePrice: orderItems[0].price,
        created_at: orderItems[0].created_at,
        full_name: orderItems[0].full_name,
        phone: orderItems[0].phone,
        address_line1: orderItems[0].address_line1,
        address_line2: orderItems[0].address_line2,
        city: orderItems[0].city,
        state: orderItems[0].state,
        postal_code: orderItems[0].postal_code,
        country: orderItems[0].country,
        total_amount: orderItems
          .reduce((a, b) => {
            return a + +b.price
          }, 0)
          .toFixed(2),
        items: orderItems.map((item) => ({
          id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          image_url: item.image_url,
        })),
      }
      uniqueOrders.push(orderObject)
    })
    order.value = uniqueOrders[0]
    // Calculate total
    subtotal.value = uniqueOrders[0].total_amount
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const formatDate = (date) => new Date(date).toLocaleDateString()

const goBack = () => {
  router.push('/orders')
}

// Timeline logic
function isStepActive(step) {
  const statusOrder = ['placed', 'processing', 'shipped', 'delivered']
  return statusOrder.indexOf(step) <= statusOrder.indexOf(order.value.status)
}
</script>

<style scoped>
.order-details-page {
  max-width: 850px;
  margin: auto;
  padding: 30px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.order-status-box {
  margin-bottom: 25px;
}

.status {
  padding: 4px 10px;
  border-radius: 8px;
  color: #fff;
  text-transform: capitalize;
  font-size: 13px;
}

.status.placed,
.status.pending {
  background: #f59e0b;
}
.status.processing {
  background: #2563eb;
}
.status.shipped {
  background: #10b981;
}
.status.delivered {
  background: #22c55e;
}
.status.cancelled {
  background: #ef4444;
}

.date {
  color: #475569;
  margin-top: 6px;
}

.timeline {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 40px;
  padding: 20px;
  background: #f1f5f9;
  border-radius: 10px;
}

.timeline .step {
  width: 100%;
  text-align: center;
  padding: 8px 0;
  border-bottom: 3px solid #cbd5e1;
  color: #64748b;
}

.timeline .step.active {
  border-color: #4f46e5;
  font-weight: 600;
  color: #1e293b;
}

.section {
  margin-bottom: 35px;
}

.section h2 {
  margin-bottom: 14px;
}

.item-card {
  display: flex;
  gap: 15px;
  background: #fff;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
}

.item-card img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info h3 {
  margin: 0;
  font-size: 18px;
}

.qty,
.price {
  color: #475569;
  margin-top: 4px;
}

.address-box {
  background: #f8fafc;
  padding: 18px;
  border-radius: 10px;
  line-height: 1.5;
}

.summary {
  background: #f8fafc;
  padding: 18px;
  border-radius: 10px;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 18px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 40px;
}
</style>
