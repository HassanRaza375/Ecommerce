<!-- components/CommonDataTable.vue -->
<template>
  <div>
    <!-- 🔍 Search & Add -->
    <div class="mb-3 flex justify-between items-center gap-2">
      <InputText v-model="internalFilters.global.value" placeholder="Search..." class="w-64" />

      <Button
        v-if="showAdd"
        label="Add New"
        icon="pi pi-plus"
        class="p-button-primary"
        @click="$emit('add')"
      />
    </div>

    <!-- 🔷 Reusable DataTable -->
    <DataTable
      :value="value"
      :paginator="true"
      :rows="rows"
      :filters="internalFilters"
      :loading="loading"
      :rowsPerPageOptions="rowsPerPageOptions"
      :sortField="sortField"
      :sortOrder="sortOrder"
      @sort="onSort"
      scrollable
      scrollHeight="400px"
      responsiveLayout="scroll"
      class="shadow-md"
    >
      <!-- 🟩 Dynamic Columns -->
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable !== false"
        :style="col.style"
      />

      <!-- 🔥 Actions Column -->
      <Column header="Actions" style="width: 140px" v-if="showActions">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            class="p-button-text p-button-sm"
            @click="$emit('edit', data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-text p-button-danger p-button-sm"
            @click="$emit('delete', data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps({
  value: Array, // table data
  columns: Array, // column definitions
  loading: Boolean,

  // UI options
  rows: { type: Number, default: 10 },
  rowsPerPageOptions: { type: Array, default: () => [5, 10, 20, 50] },

  // Actions
  showActions: { type: Boolean, default: true },
  showAdd: { type: Boolean, default: true },
})

// Sorting
const sortField = ref(null)
const sortOrder = ref(null)
const onSort = (e) => {
  sortField.value = e.sortField
  sortOrder.value = e.sortOrder
}

// Filters (internal)
const internalFilters = ref({
  global: { value: null, matchMode: 'contains' },
})
</script>
