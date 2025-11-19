<template>
  <div class="p-4">
    <!-- 🔍 Search Bar -->
    <div class="mb-3 flex justify-between items-center">
      <InputText v-model="filters.global.value" placeholder="Search..." class="w-64" />
      <Button label="Add New" icon="pi pi-plus" class="p-button-primary" @click="onAdd" />
    </div>

    <!-- 🟦 USERS / PRODUCTS TABLE -->
    <DataTable
      :value="data"
      :paginator="true"
      :rows="10"
      :filters="filters"
      :loading="loading"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :sortField="sortField"
      :sortOrder="sortOrder"
      @sort="onSort"
      responsiveLayout="scroll"
      class="shadow-md"
    >
      <!-- Columns -->
      <Column field="id" header="ID" sortable style="width: 80px" />

      <Column field="name" header="Name" sortable />

      <Column field="email" header="Email" sortable v-if="type === 'user'" />

      <Column field="price" header="Price" sortable v-if="type === 'product'" />

      <!-- ACTIONS -->
      <Column header="Actions" style="width: 140px">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-text p-button-sm"
            @click="onEdit(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-text p-button-danger p-button-sm"
            @click="onDelete(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

// props: type = "user" OR "product"
const props = defineProps({
  type: { type: String, default: 'user' },
})

// table data
const data = ref([])
const loading = ref(false)

// sorting
const sortField = ref(null)
const sortOrder = ref(null)
const onSort = (event) => {
  sortField.value = event.sortField
  sortOrder.value = event.sortOrder
}

// search filters
const filters = ref({
  global: { value: null, matchMode: 'contains' },
})

onMounted(() => {
  loadData()
})

// simulate loading data (replace API call here)
const loadData = () => {
  loading.value = true

  setTimeout(() => {
    if (props.type === 'user') {
      data.value = [
        { id: 1, name: 'John Doe', email: 'john@gmail.com' },
        { id: 2, name: 'Sarah Parker', email: 'sarah@example.com' },
        { id: 3, name: 'Mike Johnson', email: 'mike@mail.com' },
      ]
    } else {
      data.value = [
        { id: 1, name: 'Smart Watch', price: '$199' },
        { id: 2, name: 'Bluetooth Speaker', price: '$59' },
        { id: 3, name: 'Laptop', price: '$999' },
      ]
    }
    loading.value = false
  }, 700)
}

// actions
const onEdit = (row) => {
  console.log('Edit:', row)
  // router.push(`/admin/users/edit/${row.id}`)
}

const onDelete = (row) => {
  console.log('Delete:', row)
  // show modal → confirm → delete API call
}

const onAdd = () => {
  console.log('Add new item')
  // router.push("/admin/products/add")
}
</script>

<style scoped></style>
