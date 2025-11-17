<template>
  <div class="orders-page">
    <h1>My Orders</h1>

    <div v-if="loading" class="orders-list">
  <div v-for="n in 3" :key="n" class="order-card skeleton-card">
    <div class="order-header">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-status"></div>
    </div>

    <div class="order-body">
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>

      <div class="items-preview">
        <div class="skeleton skeleton-item" v-for="i in 2" :key="i"></div>
      </div>
    </div>

    <div class="order-footer">
      <div class="skeleton skeleton-btn"></div>
    </div>
  </div>
</div>

    <div v-else-if="orders.length === 0" class="empty">
      <p>You have no orders yet.</p>
      <button @click="goShopping">Start Shopping</button>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <h2>Order #{{ order.id }}</h2>
          <span class="status" :class="order.status">{{ order.status }}</span>
        </div>

        <div class="order-body">
          <p><strong>Placed On:</strong> {{ formatDate(order.created_at) }}</p>
          <p><strong>Total:</strong> ${{ order.total_amount }}</p>

          <div class="items-preview">
            <p><strong>Items:</strong></p>
            <ul>
              <li v-for="item in order.items" :key="item.id">
                <div class="is-flex is-gap-2 is-align-items-center">
                  <img :src="item.image_url" loading="lazy" height="50" width="50" alt="" />
                  {{ item.product_name }} × {{ item.quantity }}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-footer">
          <button class="view-btn" @click="viewOrder(order.id)">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserOrders } from '@/services/orderService'
import { useToasterStore } from '@/stores/toaster'
const toast = useToasterStore()
const router = useRouter()
const orders = ref([])
const loading = ref(true)

const fetchOrders = async () => {
  try {
    const { data } = await getUserOrders()
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
    orders.value = uniqueOrders
  } catch (err) {
    toast.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})

const viewOrder = (id) => {
  router.push(`/users/my-orders/order-detail/${id}`)
}

const goShopping = () => {
  router.push('/shop')
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
/* Skeleton base */
.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 37%, #e0e0e0 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 8px;
}

/* Keyframes */
@keyframes skeleton-loading {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

/* Card skeleton layout */
.skeleton-card .order-header,
.skeleton-card .order-body,
.skeleton-card .order-footer {
  pointer-events: none;
}

/* Title */
.skeleton-title {
  width: 160px;
  height: 20px;
}

/* Status badge */
.skeleton-status {
  width: 80px;
  height: 18px;
  border-radius: 20px;
}

/* Text lines */
.skeleton-text {
  height: 16px;
  width: 70%;
  margin: 10px 0;
}

.skeleton-text.short {
  width: 40%;
}

/* Items */
.skeleton-item {
  height: 50px;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
}

/* Button */
.skeleton-btn {
  height: 34px;
  width: 120px;
  border-radius: 10px;
  margin-left: auto;
}

.orders-page {
  padding: 30px;
  max-width: 800px;
  margin: auto;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}

.empty {
  text-align: center;
  margin-top: 40px;
}

.empty button {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  background: #4f46e5;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin-top: 12px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.order-card {
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: 0.2s ease;
  border-left: 5px solid #4f46e5;
}

.order-card:hover {
  transform: translateY(-2px);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-header h2 {
  margin: 0;
  font-size: 20px;
}

.status {
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: capitalize;
  color: white;
}

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

.order-body {
  margin-top: 12px;
  color: #475569;
}

.items-preview ul {
  padding-left: 16px;
  margin: 4px 0 0;
}

.order-footer {
  margin-top: 18px;
  text-align: right;
}

.view-btn {
  padding: 8px 14px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s ease;
}

.view-btn:hover {
  background: #4338ca;
}
</style>
