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
                :options="
                  categories.map((e) => {
                    return { category: capitalize(e.category), acutalValue: e.category }
                  })
                "
                optionValue="acutalValue"
                optionLabel="category"
                placeholder="Select Category"
              />
            </div>
            <div class="grid-item">
              <label for="Img_url">Image URL</label>
              <InputText id="Img_url" v-model="Item.Img_url" />
            </div>
            <div class="grid-item">
              <label for="Img_url">Image URL</label>
              <FileUpload
                mode="basic"
                @select="onFileSelect"
                customUpload
                auto
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
import { createProduct, getProductsCategories } from '@/services/productService'
import { capitalize } from '@/utils/capitalize'
let categories = ref([])
let toast = useToasterStore()
let loading = ref(false)
let src = ref(null)

let Item = reactive({
  name: '',
  description: '',
  price: null,
  stock: null,
  category: '',
  Img_url: '',
})

function onFileSelect(event) {
  const file = event.files[0]
  const reader = new FileReader()

  reader.onload = async (e) => {
    src.value = e.target.result
  }

  reader.readAsDataURL(file)
}
const submitProduct = async () => {
  try {
    loading.value = true
    if (
      !Item.value.name ||
      !Item.value.description ||
      !Item.value.price ||
      !Item.value.stock ||
      !Item.value.category ||
      !Item.value.Img_url
    ) {
      toast.error('Please fill all the fields.')
      loading.value = false
      return
    }
    console.log('Product Data:', Item.value)
    const { data } = await createProduct(Item.value)
    console.log(data)
    loading.value = false
    toast.error('Product added successfully.')
  } catch (error) {
    toast.error(error)
    loading.value = false
  }
}
// const UploadImage = async () => {
//   const formData = new FormData();
//   formData.append("image", image);
//   if (!image) return null;
//   for (let pair of formData.entries()) {
//     console.log(pair[0], pair[1]); // Should log: "image", <File object>
//   }
//   const res = await axiosInstance.filePost(`uploads/file`, formData);
//   if (res.status === 200) {
//     toast.success(res.data.message);
//     return res.data.url;
//   } else {
//     toast.error(res);
//   }
// };
//   const handleImageChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     setImage(file);
//     // Generate a preview URL for the selected image
//     setPreview(URL.createObjectURL(file));
//   }
// };
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
