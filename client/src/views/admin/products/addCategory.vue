<template>
  <div class="grid">
    <div class="col-12 mb-3">
      <Card>
        <template #content>
          <div class="flex justify-content-between align-items-center">
            <h2 class="m-0 title">Add New Category</h2>
            <Button
              label="Add New Category"
              icon="pi pi-check"
              :loading="loading"
              @click="visible = !visible"
            />
          </div>
        </template>
      </Card>
    </div>
    <div class="col-12">
      <Card>
        <template #content>
          <CommonDataTable
            :value="categories"
            :columns="categoryColumns"
            :loading="loading"
            @add="onAdd"
            @edit="onEdit"
            @delete="onDelete"
            :url="url"
            :showAdd="false"
          />
        </template>
      </Card>
    </div>
    <div class="col-12">
      <Dialog
        modal
        v-model:visible="visible"
        maximizable
        header="Add Category"
        :style="{ width: '30vw' }"
      >
        <div class="grid-form">
          <div class="grid-item span-2">
            <label for="categoryName">Category Name</label>
            <InputText id="categoryName" v-model="Item.name" type="text" />
          </div>
          <div class="grid-item span-2">
            <label for="categoryName">Category Name</label>
            <Dropdown
              v-model="Item.parent_id"
              :options="categories"
              optionValue="id"
              optionLabel="name"
              placeholder="Select Category"
            />
          </div>
          <div class="grid-item span-2">
            <label for="categoryName">Category Name</label>
            <Textarea id="categoryName" v-model="Item.slug" rows="5" />
          </div>
        </div>
        <template #footer>
          <Button label="Save" icon="pi pi-check" :loading="loading" @click="submitCategory" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useToasterStore } from '@/stores/toaster'
import { createProductCategory, getProductsCategories } from '@/services/productService'
import CommonDataTable from '@/components/dataTable.vue'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import { capitalize } from '@/utils/capitalize'

let categories = ref([])
let toast = useToasterStore()
let loading = ref(false)
let visible = ref(false)

const categoryColumns = [
  { field: 'id', header: 'ID', style: 'width: 80px' },
  { field: 'name', header: 'Category' },
  { field: 'parent_id', header: 'Parent ID' },
  { field: 'slug', header: 'Slug' },
]
let url = ref('/admin/products/add')

let Item = reactive({
  name: '',
  slug: '',
  parent_id: null,
})

const submitCategory = async () => {
  try {
    loading.value = true
    if (!Item.name) {
      toast.error('Please fill field.')
      loading.value = false
      return
    }
    console.log('Category Data:', Item)
    const { data } = await createProductCategory(Item)
    console.log(data)
    Item.name = ''
    Item.slug = ''
    Item.parent_id = null
    loading.value = false
    toast.success('Category added successfully.')
    await getAllCatgories()
  } catch (error) {
    toast.error(error)
    loading.value = false
  }
}
const getAllCatgories = async () => {
  try {
    loading.value = true
    const { data } = await getProductsCategories()
    categories.value = data.map((e) => ({ ...e, name: capitalize(e.name) }))
    loading.value = false
  } catch (error) {
    toast.error(error)
  }
}
const onAdd = () => {
  console.log('Add new category')
}
const onEdit = (row) => {
  console.log('Edit:', row)
}
const onDelete = (row) => {
  console.log('Delete:', row)
}
onMounted(async () => {
  await getAllCatgories()
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
