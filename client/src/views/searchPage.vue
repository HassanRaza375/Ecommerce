<template>
  <div class="container py-3 px-2">
    <h1 class="my-2 is-bold">
      <b>Product Search ({{ TotalProducts || 0 }})</b>
    </h1>

    <div class="filters">
      <InputText v-model="filters.query" placeholder="Search for products" />

      <Dropdown
        v-model="filters.category"
        :options="
          categories.map((e) => {
            return { category: capitalize(e.category), acutalValue: e.category }
          })
        "
        optionValue="acutalValue"
        optionLabel="category"
        placeholder="Select Category"
      />

      <InputNumber
        v-model="filters.min_price"
        :min="0"
        :max="1000"
        mode="decimal"
        placeholder="Min Price"
      />

      <InputNumber
        v-model="filters.max_price"
        :min="0"
        :max="1000"
        mode="decimal"
        placeholder="Max Price"
      />
      <InputNumber
        v-model="filters.min_stock"
        :min="0"
        :max="1000"
        mode="decimal"
        placeholder="Min Stock"
      />
      <InputNumber
        v-model="filters.max_stock"
        :min="0"
        :max="1000"
        mode="decimal"
        placeholder="Max Stock"
      />

      <Button label="Search" @click="searchProductQuery" />
      <Button label="Reset" @click="RestSearch" />
    </div>

    <ProductCard :data="productData" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { getProductsCategories, searchProducts } from '../services/productService'
import LoadingSpinner from '../components/layout/LoadingSpinner.vue'
import { capitalize } from '@/utils/capitalize'
import { useRouter, useRoute } from 'vue-router'
import { useToasterStore } from '@/stores/toaster'
const useToast = useToasterStore()
const router = useRouter()
const route = useRoute()
const ProductCard = defineAsyncComponent({
  loader: () => import('../components/ProductCard.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 5000,
})
// Reactive state
let restBool = ref(false)
const filters = ref({
  query: null,
  category: null,
  min_price: null,
  max_price: null,
  min_stock: null,
  max_stock: null,
  sort_by: 'created_at',
  sort_order: 'desc',
  page: null,
  limit: null,
})

let productData = ref([])
let filteredCategories = ref([])
let TotalProducts = ref(0)
const categories = ref([])

// Methods
async function searchProductQuery() {
  try {
    if(filters.value.query === null && filters.value.category === null && filters.value.min_price === null && filters.value.max_price === null && filters.value.min_stock === null && filters.value.max_stock === null){
      useToast.error('Please fill at least one field.')
    }
    const { data } = await searchProducts({ params: filters.value })
    getProductData(data)
    if (!restBool.value) {
      router.replace({
        name: 'search',
        query: { ...filters.value },
      })
    }
    restBool.value = false
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const getProductData = (data) => {
  let categories = []
  TotalProducts.value = 0
  if (data.length === 0) {
    productData.value = []
    return
  }
  data.forEach((e) => {
    categories.push(e.category)
  })
  filteredCategories.value = [...new Set(categories)]
  let filteredProducts = []
  filteredCategories.value.forEach((e) => {
    let p = data.filter((p) => p.category === e)
    let object = { title: e, productList: [...p] }
    TotalProducts.value += p.length
    filteredProducts.push(object)
  })
  console.log(filteredProducts)
  productData.value = filteredProducts
}
const getAllCatgories = async () => {
  const { data } = await getProductsCategories()
  categories.value = data
}
const RestSearch = () => {
  filters.value = {
    query: null,
    category: null,
    min_price: null,
    max_price: null,
    min_stock: null,
    max_stock: null,
    sort_by: 'created_at',
    sort_order: 'desc',
    page: null,
    limit: null,
  }
  restBool.value = true
  router.replace({ query: {} })
  searchProductQuery()
}
function buildFiltersFromQuery(query) {
  return {
    query: query.query || null,
    category: query.category || null,
    min_price: query.min_price ? Number(query.min_price) : 0,
    max_price: query.max_price ? Number(query.max_price) : null,
    min_stock: query.min_stock ? Number(query.min_stock) : 1,
    max_stock: query.max_stock ? Number(query.max_stock) : null,
    sort_by: query.sort_by || 'created_at',
    sort_order: query.sort_order || 'desc',
    page: query.page ? Number(query.page) : null,
    limit: query.limit ? Number(query.limit) : null,
  }
}

onMounted(async () => {
  // await getProductData()
  filters.value = buildFiltersFromQuery(route.query)
  await getAllCatgories()
  searchProductQuery()
})
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.product-list {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
}
.p-select {
  min-width: 300px;
}
</style>
