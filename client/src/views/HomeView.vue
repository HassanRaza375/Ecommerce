<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  defineAsyncComponent,
} from 'vue'
import LoadingSpinner from '../components/layout/LoadingSpinner.vue'
import { getProducts } from '../services/productService'
import { useToasterStore } from '@/stores/toaster'
const toast = useToasterStore()
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
let is_loading = ref(false)
let productData = ref({})
let filteredCategories=ref([])
const getProductData = async () => {
  is_loading.value = true
  try{
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
  }catch(err){
    toast.error(err)
    is_loading.value = false
  }finally{
    is_loading.value = false
  }
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
      <!-- v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" -->
      <div>
        <div class="box mt-2">
          <!-- <Slider :fullname="fullname" :Images="imagsSlider" /> -->
           <section class="hero-dark">
            <div class="overlay"></div>
            <div class="hero-content">
              <h1>Luxury Meets Affordability</h1>
              <p>Premium products curated specially for you.</p>
              <button class="btn shop">Start Shopping</button>
            </div>
          </section>
        </div>
      </div>
      <!-- tabs -->
      <div class="box mt-2 mb-0">
        <CategoryTabs :categories="filteredCategories"/>
      </div>
    </section>
    <section class="container">
      <ProductCard :data="productData" :is_loading="is_loading"/>
    </section>
  </div>
</template>
<style scoped>
.hero-dark {
  position: relative;
  height: 70vh;
  background-image: url('https://front.satjapan.info/assets/images/new-bannars/homepage-5.webp');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 40px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
}

.hero-content {
  position: relative;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.btn.shop {
  padding: 12px 25px;
  background: #e9c46a;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  color: #000;
}

.btn.shop:hover {
  background: #d4a74e;
}
</style>
