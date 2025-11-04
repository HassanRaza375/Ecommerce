<template>
  <div class="container py-3 px-2">
    <h1>Product Search</h1>

    <div class="filters">
      <InputText v-model="searchQuery" placeholder="Search for products" />

      <Dropdown
        v-model="selectedCategory"
        :options="categories"
        optionLabel="name"
        placeholder="Select Category"
      />

      <InputNumber
        v-model="priceRange.min"
        :min="0"
        :max="1000"
        mode="decimal"
        placeholder="Min Price"
      />

      <InputNumber
        v-model="priceRange.max"
        :min="0"
        :max="1000"
        mode="decimal"
        placeholder="Max Price"
      />

      <Button label="Search" @click="searchProducts" />
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
import { getProducts,getProductsCategories } from '../services/productService'
import LoadingSpinner from '../components/layout/LoadingSpinner.vue'

const ProductCard = defineAsyncComponent({
  loader: () => import('../components/ProductCard.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 5000,
})
// Reactive state
const searchQuery = ref('')
const selectedCategory = ref(null)
const priceRange = ref({ min: 0, max: 1000 })
let productData = ref([])
let filteredCategories = ref([])
const categories = ref ([
  { name: 'Fragrances', code: 'fragrances' },
  { name: 'Skincare', code: 'skincare' },
])

// Methods
async function searchProducts() {
  try {
    const { data } = await getProducts({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchQuery: searchQuery.value,
        selectedCategory: selectedCategory.value,
        priceRange: priceRange.value,
      }),
    })

    productData.value = data.products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const getProductData = async () => {
  const { data } = await getProducts()
  let categories = []
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
    filteredProducts.push(object)
  })

  productData.value = filteredProducts
  console.log(productData.value)
}
const getAllCatgories = async ()=>{
  const {data} = await getProductsCategories()
  debugger
  categories.value = data
}
onMounted(async () => {
  await getProductData()
  await getAllCatgories()
})


// const products = ref([]);
// const total = ref(0);

// const filters = ref({
//   query: "",
//   category: "",
//   min_price: null,
//   max_price: null,
//   page: 0
// });

// const categories = [
//   { label: "All", value: "" },
//   { label: "Fragrances", value: "fragrances" },
//   { label: "Shoes", value: "shoes" },
//   { label: "Electronics", value: "electronics" }
// ];

// const search = async () => {
//   const res = await axios.get("/products/search", { params: filters.value });
//   products.value = res.data;
// };

// const resetFilters = () => {
//   filters.value = { query: "", category: "", min_price: null, max_price: null, page: 0 };
//   search();
// };

// onMounted(search);
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
</style>
