<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
// import { getProductsByCategory } from '@/services/productService'

const route = useRoute()
const products = ref([])
const loading = ref(true)

// const fetchProducts = async () => {
//   loading.value = true
//   try {
//     const { data } = await getProductsByCategory(route.params.slug)
//     products.value = data
//   } catch (error) {
//     console.error('Failed to fetch products:', error)
//   } finally {
//     loading.value = false
//   }
// }

// Load when page opens
// onMounted(fetchProducts)

// Watch for slug changes (when user clicks another category)
watch(
  () => route.params.slug,
//   () => fetchProducts(),
)
</script>

<template>
  <div>
    <h1>Products in "{{ route.params.slug }}"</h1>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <div v-if="products.length === 0">No products found.</div>

      <div v-else class="product-list">
        <div v-for="product in products" :key="product.id">
          {{ product.name }} - ${{ product.price }}
        </div>
      </div>
    </div>
  </div>
</template>
