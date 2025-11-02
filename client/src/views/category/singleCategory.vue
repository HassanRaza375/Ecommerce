<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { capitalize } from '@/utils/capitalize'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { removeSpaces } from '@/utils/removeSpaces'
import { getProducts } from '@/services/productService'
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
let productData = ref({})
let filteredCategories=ref([])
const getProductData = async (category) => {
  const { data } = await getProducts()
  let categories = []
  if (data.length === 0) {
    productData.value = []
    return
  }
  data.forEach((e) => {
    categories.push(e.category)
  })
  filteredCategories = [...new Set(categories)]
  let filteredProducts = []
  filteredCategories.forEach((e) => {
    let p = data.filter((p) => p.category === e)
    let object = { title: e, productList: [...p] }
    filteredProducts.push(object)
  })
debugger
  productData.value = filteredProducts?.filter(
    (categoryItem) => removeSpaces(categoryItem.title) === removeSpaces(category)
  )
  console.log(category)
  console.log(productData.value)
}
onMounted(async () => {
let category = route.params.slug
 await getProductData(category)
  console.log('on Mounted called')
})
const showDetail = (category, id) => {
  let filterCategory = removeSpaces(category)
  router.push(`/categories/${filterCategory}/${id}`)
}
</script>
<template>
  <div>
    <section class="product-section container" v-for="product in productData" :key="product.title">
      <h2 class="section-title">{{ capitalize(product.title) }}</h2>
      <div class="product-grid">
        <!-- Product Card -->
        <div class="product-card" v-for="productCard in product.productList" :key="productCard.id">
          <img :src="productCard.image_url" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3 class="product-name">{{ productCard.name || '' }}</h3>
            <p class="product-description">{{ productCard.description || '' }}</p>
            <p class="product-category"><strong>Category:</strong> {{ productCard.category }}</p>
            <p class="product-price">{{ productCard.price || '0' }}</p>
            <p class="product-stock">{{ productCard.stock }}</p>
            <div class="product-buttons">
              <button class="btn add-cart" @click="cartStore.addItem(productCard)">
                Add to Cart
              </button>
              <button class="btn view-detail" @click="showDetail(product.title, productCard.id)">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-section {
  padding: 20px 0;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
  color: #222;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.product-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.product-info {
  padding: 15px 20px;
}

.product-name {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #111;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 276px;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-category,
.product-price,
.product-stock {
  font-size: 0.9rem;
  margin: 3px 0;
}

.product-price {
  font-weight: bold;
  color: #2a9d8f;
}

.product-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.add-cart {
  background-color: #2a9d8f;
  color: white;
}

.add-cart:hover {
  background-color: #23867d;
}

.view-detail {
  background-color: #264653;
  color: white;
}

.view-detail:hover {
  background-color: #1b323e;
}
</style>
