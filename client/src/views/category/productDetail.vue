<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { getProductById } from '../../services/productService'

const cartStore = useCartStore()
const route = useRoute()

let product = ref(null)
let loading = ref(true)
let qty = ref(1)

// image preview
let activeImage = ref('')

onMounted(async () => {
  const { data } = await getProductById(route.params.id)
  product.value = data

  activeImage.value = data.image_url

  loading.value = false
})

function increaseQty() {
  qty.value++
}

function decreaseQty() {
  if (qty.value > 1) qty.value--
}

function addToCart() {
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: Number(product.value.price),
    qty: qty.value,
    image: product.value.image_url,
  })

  added.value = true
  setTimeout(() => (added.value = false), 800)
}

let added = ref(false)
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns is-variable is-6">
        <template v-if="loading">
          <div class="column is-6">
            <div class="skeleton-img"></div>
          </div>
          <div class="column is-6">
            <div class="skeleton-text title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text small"></div>
            <div class="skeleton-text small"></div>
          </div>
        </template>

        <template v-else>
          <div class="column is-6">
            <figure class="image is-3by2 main-image-wrapper">
              <img :src="activeImage" :alt="product.name" class="product-image" />
            </figure>

            <div class="thumbs mt-3">
              <img
                :src="product.image_url"
                class="thumb"
                :class="{ active: activeImage === product.image_url }"
                @click="activeImage = product.image_url"
              />
            </div>
          </div>

          <div class="column is-6">
            <h1 class="title is-3">{{ product.name }}</h1>

            <p class="subtitle is-4 has-text-success">${{ Number(product.price).toFixed(2) }}</p>

            <p class="description">
              {{ product.description }}
            </p>

            <p class="has-text-grey mb-3"><strong>Category:</strong> {{ product.category }}</p>

            <p class="has-text-grey mb-5"><strong>In Stock:</strong> {{ product.stock }}</p>

            <div class="field has-addons mb-4">
              <p class="control">
                <button class="button is-light" @click="decreaseQty">-</button>
              </p>
              <p class="control">
                <input class="input qty-input" type="number" v-model="qty" min="1" />
              </p>
              <p class="control">
                <button class="button is-light" @click="increaseQty">+</button>
              </p>
            </div>

            <button class="button is-primary is-medium" @click="addToCart">
              <i class="pi pi-shopping-cart mr-2"></i>
              {{ added ? 'Added!' : 'Add to Cart' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-image-wrapper {
  overflow: hidden;
  border-radius: 8px;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 500px;
  transition: transform 0.4s ease;
  cursor: zoom-in;
}

.product-image:hover {
  transform: scale(1.1);
}

.thumbs {
  display: flex;
  gap: 10px;
}

.thumb {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumb.active {
  border-color: #3273dc;
}

.qty-input {
  width: 60px;
  text-align: center;
}

button.is-primary.is-medium {
  transition: 0.2s;
}

button.is-primary.is-medium:active {
  transform: scale(0.95);
}

.skeleton-img {
  width: 100%;
  height: 400px;
  background: #eee;
  border-radius: 8px;
}

.skeleton-text {
  height: 20px;
  background: #eee;
  margin-bottom: 12px;
  border-radius: 4px;
}

.skeleton-text.small {
  width: 60%;
}

.skeleton-text.title {
  height: 32px;
  width: 50%;
}
</style>
