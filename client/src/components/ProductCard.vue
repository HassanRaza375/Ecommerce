<script setup>
import { capitalize } from '@/utils/capitalize'
import { useToasterStore } from '@/stores/toaster'
import { useCartStore } from '@/stores/cart'
import { useCommonStore } from '@/stores/common'
import { useRouter } from 'vue-router'
import { removeSpaces } from '@/utils/removeSpaces'
import { createWishList, deleteWishListById, getWishList } from '../services/wishList'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
let { t } = useI18n()
const useToast = useToasterStore()
const cartStore = useCartStore()
const commonStore = useCommonStore()
const router = useRouter()
const props = defineProps({
  data: { type: Object, required: true },
  minimal: { type: Boolean, default: false },
  is_loading: { type: Boolean, default: true },
  count: { type: Number, default: 6 },
})

let userId = JSON.parse(localStorage.getItem('userId'))
console.log(commonStore.wishListIds)

const showDetail = (category, id) => {
  let filterCategory = removeSpaces(category)
  router.push(`/categories/${filterCategory}/${id}`)
}
const addToWishList = async (product) => {
  try {
    const { data } = await createWishList(userId, { productId: product.id })
    commonStore.addWishListId(product.id)
    useToast.success(data.message)
  } catch (error) {
    useToast.error(error?.response?.data?.message)
  }
}

const removeItem = async (product) => {
  try {
    await deleteWishListById(userId, { productId: product.id })
    commonStore.removeWishListId(product.id)
    useToast.success('Item removed from wishlist')
  } catch (err) {
    useToast.error(err?.response?.data?.message)
  }
}

const fetchWishlist = async () => {
  try {
    const { data } = await getWishList(userId)
    commonStore.addWishListId(data.map((item) => item.product_id))
  } catch (err) {
    console.error(err)
  }
}

const HandleWishList = (product) => {
  if (commonStore.wishListIds.includes(product.id)) {
    removeItem(product)
  } else {
    addToWishList(product)
  }
}

onMounted(async () => {
  if (userId) {
    await fetchWishlist()
  }
})
</script>
<template>
  <div v-if="props.is_loading">
    <div class="product-section">
      <div class="skeleton-title"></div>
      <div class="product-grid">
        <div class="product-card-skeleton" v-for="i in count" :key="i">
          <div class="image-wrapper-skeleton skeleton"></div>
          <div class="wishlist-skeleton skeleton"></div>

          <div class="product-info-skeleton">
            <div class="skeleton-line name skeleton"></div>
            <div class="skeleton-line desc skeleton"></div>
            <div class="skeleton-line desc short skeleton"></div>
            <div class="skeleton-line skeleton"></div>
            <div class="skeleton-line small skeleton"></div>

            <div class="button-row">
              <div class="skeleton-button skeleton"></div>
              <div class="skeleton-button skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <section class="product-section container" v-for="product in props.data" :key="product.title">
      <h2 class="section-title">{{ capitalize(product.title) }}</h2>
      <div class="product-grid">
        <!-- Product Card -->
        <div class="product-card" v-for="productCard in product.productList" :key="productCard.id">
          <div class="image-wrapper">
            <img :src="productCard.image_url" alt="Product Image" class="product-image" />
            <button
              :class="[
                'wishlist-icon',
                commonStore.wishListIds.includes(productCard.id) ? 'active' : '',
              ]"
              @click="HandleWishList(productCard)"
            >
              <i
                :class="[
                  'pi',
                  commonStore.wishListIds.includes(productCard.id) ? 'pi-heart-fill' : 'pi-heart',
                ]"
              ></i>
            </button>
          </div>

          <div class="product-info">
            <h3 class="product-name">{{ productCard.name || '' }}</h3>
            <p class="product-description">{{ productCard.description || '' }}</p>
            <p class="product-category"><strong>Category:</strong> {{ productCard.category }}</p>
            <p class="product-price">{{ productCard.price || '0' }}</p>
            <p class="product-stock">{{ productCard.stock }}</p>
            <div class="product-buttons">
              <button class="btn add-cart" @click="cartStore.addItem(productCard)">
                {{ t('addToCart') }}
              </button>
              <button class="btn view-detail" @click="showDetail(product.title, productCard.id)">
                {{ t('viewDetails') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-card-skeleton {
  opacity: 0;
  transform: translateY(10px);
  animation: staggerFade 0.4s forwards;
  animation-delay: calc(var(--i) * 0.08s);
}
/* Skeleton Base */
.skeleton {
  background: #e2e2e2;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Container */
.product-card-skeleton {
  background: #fff;
  border-radius: 10px;
  padding-bottom: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Image */
.image-wrapper-skeleton {
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
}
.image-wrapper-skeleton.skeleton {
  background: #dcdcdc;
}

/* Wishlist Icon */
.wishlist-skeleton {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 12px;
  right: 12px;
}

/* Product Info */
.product-info-skeleton {
  padding: 15px;
}

/* Lines */
.skeleton-line {
  height: 14px;
  margin: 10px 0;
}

.skeleton-line.small {
  width: 60%;
}

.skeleton-line.name {
  width: 80%;
  height: 18px;
}

.skeleton-line.desc {
  width: 100%;
}

.skeleton-line.desc.short {
  width: 70%;
}

/* Buttons */
.button-row {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.skeleton-button {
  flex: 1;
  height: 40px;
  border-radius: 6px;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .skeleton {
    background: #3a3a3a;
  }
  .product-card-skeleton {
    background: #1c1c1c;
  }
}

@keyframes staggerFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-wrapper {
  position: relative;
}

.wishlist-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}
.wishlist-icon.active i {
  color: red;
  transform: scale(1.2);
  transition:
    transform 0.2s,
    color 0.2s;
}

.wishlist-icon:hover {
  transform: scale(1.1);
}

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
@media (prefers-color-scheme: dark) {
  .section-title {
    color: #e9ecef;
  }

  .product-card {
    background: #1a1a1a;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  }

  .product-card:hover {
    box-shadow: 0 8px 16px rgba(255, 255, 255, 0.08);
  }

  .product-info {
    color: #e6e6e6;
  }

  .product-name {
    color: #ffffff;
  }

  .product-description {
    color: #cccccc;
  }

  .product-price {
    color: #80cbc4;
  }

  .wishlist-icon {
    background: #2a2a2a;
    color: white;
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
  }

  .wishlist-icon:hover {
    transform: scale(1.1);
  }

  /* Buttons */
  .add-cart {
    background-color: #2a9d8f;
    color: white;
  }
  .add-cart:hover {
    background-color: #23867d;
  }

  .view-detail {
    background-color: #35586c;
    color: white;
  }
  .view-detail:hover {
    background-color: #254050;
  }
}
</style>
