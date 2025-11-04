<script setup>
import {
  ref,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  defineAsyncComponent,
  reactive,
} from 'vue'
import LoadingSpinner from '../components/layout/LoadingSpinner.vue'
import { getProducts } from '../services/productService'
let firstName = ref('John')
let lastName = ref('Doe')
const imagsSlider = reactive([
  'https://front.satjapan.info/assets/images/new-bannars/homepage-5.webp',
  'https://front.satjapan.info/assets/images/new-bannars/homepage-one.webp',
  'https://front.satjapan.info/assets/images/new-bannars/homepage-3.webp',
])
const Slider = defineAsyncComponent({
  loader: () => import('../components/Slider.vue'),
  loadingComponent: LoadingSpinner,
  // errorComponent: () => import('./ErrorMessage.vue'),
  delay: 200, // wait 200ms before showing loading component
  timeout: 5000, // fail after 5s
})
const ProductCard = defineAsyncComponent({
  loader: () => import('../components/ProductCard.vue'),
  loadingComponent: LoadingSpinner,
  // errorComponent: () => import('./ErrorMessage.vue'),
  delay: 200, // wait 200ms before showing loading component
  timeout: 5000, // fail after 5s
})
const CategoryTabs = defineAsyncComponent({
  loader: () => import('../components/tabs/categoryTabs.vue'),
  loadingComponent: LoadingSpinner,
  // errorComponent: () => import('./ErrorMessage.vue'),
  delay: 200, // wait 200ms before showing loading component
  timeout: 5000, // fail after 5s
})

const fullname = computed(() => {
  console.log('Recomputing fullname')
  return `${firstName.value} ${lastName.value}`
})

let productData = ref({})
let filteredCategories=ref([])
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

onBeforeMount(() => {
  console.log('on beforemount called')
})
onMounted(async () => {
 await getProductData()
  console.log('on Mounted called')
})
onBeforeUpdate(() => {
  console.log('on BeforeUpdated called')
})
onUpdated(() => {
  console.log('on onUpdated called')
})
onBeforeUnmount(() => {
  console.log('on BeforeUnmount called')
})
</script>

<template>
  <div>
    <section class="container py-3">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="box mt-2">
          <Slider :fullname="fullname" :Images="imagsSlider" />
        </div>
      </div>
      <!-- tabs -->
      <div class="box mt-2 mb-0">
        <CategoryTabs :categories="filteredCategories"/>
      </div>
    </section>
    <ProductCard :data="productData"/>
  </div>
</template>
