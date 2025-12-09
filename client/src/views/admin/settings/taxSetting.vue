<template>
  <div class="grid">
    <div class="col-12 mb-3">
      <Card>
        <template #content>
          <div class="flex justify-content-between align-items-center">
            <h2 class="m-0 title">Tax Setting</h2>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-12">
      <Card>
        <template #content>
          <CommonDataTable
            :value="taxes"
            :columns="userColumns"
            :loading="loading"
            @add="onAdd"
            @edit="onEdit"
            @delete="onDelete"
            :url="url"
          />
        </template>
      </Card>
      <Dialog modal v-model:visible="visible" maximizable header="Tax" :style="{ width: '30vw' }">
        <div class="grid-form">
          <div class="grid-item">
            <label for="Tax Name">Tax Name</label>
            <InputText id="Tax Name" v-model="Item.tax_name" type="text" />
          </div>
          <div class="grid-item">
            <label for="is_active">Is Active</label>
            <ToggleSwitch v-model="Item.is_active" />
          </div>
          <div class="grid-item">
            <label for="tax_rate">Tax Rate</label>
            <InputText id="tax_rate" v-model="Item.tax_rate" type="number" />
          </div>
          <div class="grid-item">
            <label for="tax_type">Tax Type</label>
            <InputText id="tax_type" v-model="Item.tax_type" type="text" />
          </div>
          <div class="grid-item">
            <label for="country_code">Tax Code</label>
            <InputText id="country_code" v-model="Item.country_code" type="text" />
          </div>
          <div class="grid-item">
            <label for="state_code">Status Code</label>
            <InputText id="state_code" v-model="Item.state_code" type="text" />
          </div>
        </div>
        <template #footer>
          <Button
            label="Save"
            icon="pi pi-check"
            :loading="loading"
            @click="Item.tax_id ? onEdit(null, true) : addTax()"
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import Card from 'primevue/card'
import CommonDataTable from '@/components/dataTable.vue'
import { useToasterStore } from '@/stores/toaster'
import { getTax, deleteTaxById, createTax, editTax } from '@/services/taxService'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ToggleSwitch from 'primevue/toggleswitch'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const toast = useToasterStore()
let loading = ref(false)
let visible = ref(false)
let taxes = ref([{}, {}])
const url = ref('/admin/products/add')
// tax_name, tax_rate, tax_type, country_code, state_code, is_active
const userColumns = [
  { field: 'tax_id', header: 'ID', style: 'width: 80px' },
  { field: 'tax_name', header: 'Tax Name' },
  { field: 'tax_rate', header: 'Tax Rate' },
  { field: 'tax_type', header: 'Tax Type' },
  { field: 'country_code', header: 'Country Code' },
  { field: 'state_code', header: 'Status' },
  { field: 'is_active', header: 'Active' },
]
let Item = reactive({
  tax_id: '',
  tax_name: '',
  tax_rate: 0.0,
  tax_type: null,
  country_code: null,
  state_code: null,
  is_active: false,
})
const onAdd = () => {
  visible.value = !visible.value
}
const onEdit = async (row, bool) => {
  if (bool) {
    try {
      loading.value = true
      const obj = {
        tax_id: Item.tax_id,
        tax_name: Item.tax_name,
        tax_rate: Item.tax_rate,
        tax_type: Item.tax_type,
        country_code: Item.country_code || '',
        state_code: Item.state_code || '',
        is_active: Item.is_active || false,
      }
      if (!Item.tax_name || !Item.tax_rate || !Item.tax_type)
        return toast.error('fill the required fields')
      let { data } = await editTax(obj.tax_id, obj)
      Item.tax_id = ''
      Item.tax_name = ''
      Item.tax_rate = 0.0
      Item.tax_type = ''
      Item.country_code = ''
      Item.state_code = ''
      Item.is_active = false
      loading.value = false
      await getTaxes()
      toast.success(data.message)
      visible.value = !visible.value
    } catch (err) {
      toast.err(err)
      Item.is_active = false
      loading.value = false
    }
  } else {
    Item.tax_id = row.tax_id
    Item.tax_name = row.tax_name
    Item.tax_rate = row.tax_rate
    Item.tax_type = row.tax_type
    Item.country_code = row.country_code
    Item.state_code = row.state_code
    Item.is_active = row.is_active
    visible.value = !visible.value
  }
}
const addTax = async () => {
  try {
    const obj = {
      tax_name: Item.tax_name,
      tax_rate: Item.tax_rate,
      tax_type: Item.tax_type,
      country_code: Item.country_code || '',
      state_code: Item.state_code || '',
      is_active: Item.is_active || false,
    }
    if (!Item.tax_name || !Item.tax_rate || !Item.tax_type)
      return toast.error('fill the required fields')
    let { data } = await createTax(obj)
    Item.tax_id = ''
    Item.tax_name = ''
    Item.tax_rate = 0.0
    Item.tax_type = ''
    Item.country_code = ''
    Item.state_code = ''
    Item.is_active = false
    await getTaxes()
    toast.success(data.message)
    visible.value = !visible.value
  } catch (err) {
    toast.err(err)
  }
}
const onDelete = async (row) => {
  try {
    loading.value = true
    let { data } = await deleteTaxById(row.tax_id)
    toast.success(data.message)
    loading.value = false
    await getTaxes()
  } catch (err) {
    toast.error(err)
    loading.value = false
  }
}
const getTaxes = async () => {
  try {
    loading.value = true
    let { data } = await getTax()
    taxes.value = data
    toast.success('Taxes Fetched Successfully')
    loading.value = false
  } catch (err) {
    toast.error(err)
  }
}
onMounted(async () => {
  await getTaxes()
})
</script>

<style scoped>
.grid-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.grid-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.span-2 {
  grid-column: span 2;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
