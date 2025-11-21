<template>
  <CommonDataTable
    :value="users"
    :columns="userColumns"
    :loading="loading"
    @add="onAdd"
    @edit="onEdit"
    @delete="onDelete"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonDataTable from '@/components/dataTable.vue'
import { allusers } from '@/services/authService'
import { useToasterStore } from '@/stores/toaster'
const toast = useToasterStore()
const users = ref([])
const loading = ref(false)

const userColumns = [
  { field: 'id', header: 'ID', style: 'width: 80px' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
  { field: 'role', header: 'role' },
  { field: 'created_at', header: 'Created At' },
]

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await allusers()
    users.value = data.rows
    loading.value = false
    toast.success('Users loaded successfully')
  } catch (err) {
    toast.error(err)
    loading.value = false
    toast.error('Users loaded successfully')
  }
})

// actions
const onAdd = () => console.log('Add User')
const onEdit = (row) => console.log('Edit:', row)
const onDelete = (row) => console.log('Delete:', row)
</script>
