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

const users = ref([])
const loading = ref(false)

const userColumns = [
  { field: 'id', header: 'ID', style: 'width: 80px' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Emails' },
]

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    users.value = [
      { id: 1, name: 'John Doe', email: 'john@gmail.com' },
      { id: 2, name: 'Sarah Parker', email: 'sarah@example.com' },
      { id: 3, name: 'Mike Johnson', email: 'mike@mail.com' },
    ]
    loading.value = false
  }, 700)
})

// actions
const onAdd = () => console.log("Add User")
const onEdit = (row) => console.log("Edit:", row)
const onDelete = (row) => console.log("Delete:", row)
</script>
