<template>
  <div class="grid">
    <div class="col-12 mb-3">
      <Card>
        <template #title>Add New Product</template>
        <template #content>
          <div class="flex justify-content-end">
            <Button label="Add New" icon="pi pi-check" :loading="loading" @click="submitProduct" />
          </div>
        </template>
      </Card>
    </div>
    <div class="col-12 mb-3">
      <Card>
        <template #content>
          <div class="flex align-items-center justify-content-center">
            <Image :src="src" alt="Image" width="250" preview />
          </div>
        </template>
      </Card>
    </div>
    <div class="col-12">
      <Card>
        <template #content>
          <div class="grid-form">
            <div class="grid-item">
              <label for="name">Product Name</label>
              <InputText id="name" v-model="Item.name" />
            </div>
            <div class="grid-item">
              <label for="price">Price</label>
              <InputNumber id="price" v-model="Item.price" />
            </div>
            <div class="grid-item">
              <label for="stock">Stock</label>
              <InputNumber id="stock" v-model="Item.stock" />
            </div>
            <div class="grid-item">
              <label for="category">Category</label>
              <Dropdown
                v-model="Item.category"
                :options="categories"
                optionValue="id"
                optionLabel="name"
                placeholder="Select Category"
              />
            </div>
            <div class="grid-item">
              <label for="Img_url">Image URL</label>
              <InputText id="Img_url" v-model="Item.Img_url" disabled />
            </div>
            <div class="grid-item">
              <label for="Img_url">Image URL</label>
              <FileUpload
                mode="basic"
                @select="onFileSelect"
                :customUpload="true"
                :auto="true"
                @upload="UploadImage"
                severity="secondary"
                class="p-button-outlined"
              />
            </div>
          </div>
          <div class="grid-item mt-3">
            <label for="description">Description</label>
            <Textarea v-model="Item.description" rows="5" fluid />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Image from 'primevue/image'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import { useToasterStore } from '@/stores/toaster'
import { createProduct, getProductsCategories, uploadProductImage } from '@/services/productService'
let categories = ref([])
let toast = useToasterStore()
let loading = ref(false)
let src = ref(null)
const image = ref(null)

let Item = reactive({
  name: '',
  description: '',
  price: null,
  stock: null,
  category: '',
  Img_url: '',
})
// When user selects file
const onFileSelect = async (event) => {
  const file = event.files[0]
  image.value = file // store file for upload

  const reader = new FileReader()
  reader.onload = (e) => {
    src.value = e.target.result // preview
  }
  reader.readAsDataURL(file)
  Item.Img_url = await UploadImage()
}
const submitProduct = async () => {
  try {
    loading.value = true
    console.log(Item)
    if (
      !Item.name ||
      !Item.description ||
      !Item.price ||
      !Item.stock ||
      !Item.category ||
      !Item.Img_url
    ) {
      toast.error('Please fill all the fields.')
      loading.value = false
      return
    }
    console.log('Product Data:', Item)
    const { data } = await createProduct(Item)
    console.log(data)
    loading.value = false
    toast.error('Product added successfully.')
  } catch (error) {
    toast.error(error)
    loading.value = false
  }
}
// Upload function
const UploadImage = async () => {
  if (!image.value) {
    toast.error('No image selected')
    return null
  }

  const formData = new FormData()
  formData.append('image', image.value)

  // Debug log
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1])
  }

  try {
    const res = await uploadProductImage(formData)
    if (res.status === 200) {
      toast.success(res.data.message)
      return res.data.url
    } else {
      toast.error('Upload failed')
    }
  } catch (err) {
    console.error(err)
    toast.error('Upload error')
  }
}
const getAllCatgories = async () => {
  const { data } = await getProductsCategories()
  categories.value = data
}
onMounted(async () => {
  await getAllCatgories()
})
</script>

<style scoped>
.grid-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.grid-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
