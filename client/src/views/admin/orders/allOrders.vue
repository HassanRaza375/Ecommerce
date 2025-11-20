<template>
  <div class="container">
    <CommonDataTable
      :value="users"
      :columns="tableColumns"
      :loading="loading"
      @add="onAdd"
      @edit="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonDataTable from '@/components/dataTable.vue'
import { getUserOrders } from '@/services/orderService.js'
const users = ref([])
const loading = ref(false)

const tableColumns = [
  { field: 'order_id', header: 'Order ID', style: 'width: 80px' },
  { field: 'user_id', header: 'User ID' },
  { field: 'order_item_id', header: 'Order Item ID' },
  { field: 'payment_id', header: 'Payment ID' },
  { field: 'order_status', header: 'Order Status' },
  { field: 'payment_status', header: 'Payment Status' },
  { field: 'product_id', header: 'Product ID' },
  { field: 'quantity', header: 'Quantity' },
  { field: 'item_price', header: 'Price' },
  { field: 'total_amount', header: 'Total Amount' },
  { field: 'payment_method', header: 'Payment Method' },
]

onMounted(async () => {
  loading.value = true
  const { data } = await getUserOrders()
  users.value = data
  loading.value = false
})

// actions
const onAdd = () => console.log('Add User')
const onEdit = (row) => console.log('Edit:', row)
const onDelete = (row) => console.log('Delete:', row)
</script>
