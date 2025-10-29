<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
// import Slider from '../components/Slider.vue'
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
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
let firstName = ref('John')
let lastName = ref('Doe')
const imagsSlider = reactive([
  'https://front.satjapan.info/assets/images/new-bannars/homepage-4.webp',
  'https://front.satjapan.info/assets/images/new-bannars/homepage-one.webp',
  'https://front.satjapan.info/assets/images/new-bannars/homepage-3.webp',
])
const CommonModal = defineAsyncComponent({
  loader: () => import('../components/Modals/CommonModal.vue'),
  loadingComponent: LoadingSpinner,
  // errorComponent: () => import('./ErrorMessage.vue'),
  delay: 200, // wait 200ms before showing loading component
  timeout: 5000, // fail after 5s
})
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

const fullname = computed(() => {
  console.log('Recomputing fullname')
  return `${firstName.value} ${lastName.value}`
})
onBeforeMount(() => {
  console.log('on beforemount called')
})
onMounted(() => {
  console.log('on Mounted called')
  cartStore.loadCart()
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

const isModalOpen = ref(false)

function closeModal() {
  isModalOpen.value = false
}

function confirmAction(fullname) {
  firstName.value = fullname.split(' ')[0]
  lastName.value = fullname.split(' ')[1] || ''
  closeModal()
}
</script>

<template>
  <div>
    <section class="container py-3">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="box mt-2">
          <!-- <h1 class="title">{{ fullname }}</h1> -->
          <Slider :fullname="fullname" :Images="imagsSlider" />
        </div>
      </div>
      <div class="box mt-2 mb-0">
        <button class="button is-primary" @click="isModalOpen = true">Open Modal</button>
      </div>
    </section>
    <ProductCard />
    <CommonModal
      v-if="isModalOpen"
      :is-modal-open="isModalOpen"
      @close-modal="closeModal"
      @confirm-action="confirmAction"
    />
  </div>
</template>
