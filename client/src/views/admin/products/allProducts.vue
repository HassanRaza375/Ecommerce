<template>
  <CommonDataTable
    :value="users"
    :columns="userColumns"
    :loading="loading"
    @add="onAdd"
    @edit="onEdit"
    @delete="onDelete"
    :url="url"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonDataTable from '@/components/dataTable.vue'
import { getProducts } from '@/services/productService'
import { useToasterStore } from '@/stores/toaster'
import { useRouter } from 'vue-router'
const router = useRouter()
const toast = useToasterStore()
const users = ref([])
const loading = ref(false)
const url = ref('/admin/products/add')
// id, name, description, price, stock, category, image_url, created_at
const userColumns = [
  { field: 'id', header: 'ID', style: 'width: 80px' },
  { field: 'name', header: 'Name' },
  { field: 'price', header: 'Price' },
  { field: 'stock', header: 'Stock' },
  { field: 'category', header: 'Category' },
  { field: 'image_url', header: 'Image' },
  { field: 'created_at', header: 'Created At' },
]

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await getProducts()
    users.value = data
    loading.value = false
    toast.success('Products loaded successfully')
  } catch (err) {
    toast.error(err)
    loading.value = false
  }
})

// actions
const onAdd = () => {
  router.push('/admin/products/add')
}
const onEdit = (row) => console.log('Edit:', row)
const onDelete = (row) => console.log('Delete:', row)
</script>
