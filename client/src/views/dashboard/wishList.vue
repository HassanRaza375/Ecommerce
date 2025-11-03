<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="wishlist-header">
      <h1 class="title">WishList</h1>
         <div class="card">
      <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Button label="Clear Wishlist" severity="danger" @click="clearWishListItem" />
      </div>
    </div>
    </div>

    <!-- Empty state -->
    <div v-if="wishlist.length === 0" class="empty-state">
      <i class="pi pi-heart text-xl"></i>
      <p>Your wishlist is empty.</p>
    </div>

    <!-- Wishlist Grid -->
    <div v-else class="wishlist-grid">
      <div v-for="item in wishlist" :key="item.id" class="wishlist-card">
        <!-- Image -->
        <div class="image-wrapper">
          <img :src="item.image_url" class="product-image" />

          <!-- Remove Icon -->
          <button class="remove-btn" @click="removeItem(item.product_id)">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <!-- Product Info -->
        <div class="info">
          <h3 class="name">{{ item.name }}</h3>
          <p class="price">{{ item.price }}</p>

          <p class="quantity" v-if="item.quantity">
            <strong>Quantity:</strong> {{ item.quantity }}
          </p>

          <button class="button is-primary w-100 mt-2" @click="addToCart(item)">
            <i class="pi pi-shopping-cart mr-2"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { getWishList, deleteWishListById, clearWishList } from '@/services/wishList'
import Button from 'primevue/button';

let userId = JSON.parse(localStorage.getItem('userId'))
const toast = useToast()
const wishlist = ref([])

const fetchWishlist = async () => {
  try {
    const { data } = await getWishList(userId)
    wishlist.value = data
  } catch (err) {
    console.error(err)
  }
}

const removeItem = async (productId) => {
  try {
    const res = await deleteWishListById(userId, { productId })
    console.log(res)
    fetchWishlist()
    toast.add({
      severity: 'success',
      summary: 'Removed Item removed from wishlist',
      detail: 'Item removed from wishlist',
      life: 2000,
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: `${err?.response?.data?.message} Removed`,
      detail: 'Item removed from wishlist',
      life: 2000,
    })
  }
}
const clearWishListItem = async () => {
  try {
    const res = await clearWishList(userId)
    console.log(res)
    fetchWishlist()
    toast.add({
      severity: 'success',
      summary: 'Wishlist Cleared',
      detail: 'All items removed from wishlist',
      life: 2000,
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: `${err?.response?.data?.message} Removed`,
      detail: 'Failed to clear wishlist',
      life: 2000,
    })
  }
}
const addToCart = (item) => {
  // your cart store logic
  // cartStore.addItem(item);

  toast.add({
    severity: 'info',
    summary: 'Added to Cart',
    detail: `${item.name} added to cart`,
    life: 2000,
  })
}

onMounted(async () => {
  await fetchWishlist()
})
</script>

<style scoped>
.wishlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wishlist-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.wishlist-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: 0.2s;
}

.wishlist-card:hover {
  transform: translateY(-3px);
}

.image-wrapper {
  position: relative;
  height: 200px;
  background: #fafafa;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.remove-btn:hover {
  background: #e63946;
  color: white;
}

.info {
  padding: 15px;
}

.name {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.price {
  color: #2a9d8f;
  font-weight: bold;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  font-size: 1.2rem;
  opacity: 0.7;
}
</style>
