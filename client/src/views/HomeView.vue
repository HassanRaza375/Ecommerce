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
} from 'vue'

const isOpen = ref(false)
let firstName = ref('John')
let lastName = ref('Doe')

const fullname = computed(() => {
  console.log('Recomputing fullname')
  return `${firstName.value} ${lastName.value}`
})
onBeforeMount(() => {
  console.log('on beforemount called')
})
onMounted(() => {
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
const CommonModal = defineAsyncComponent({
  loader: () => import('../components/Modals/CommonModal.vue'),
  loadingComponent: () => import('../components/layout/LoadingSpinner.vue'),
  // errorComponent: () => import('./ErrorMessage.vue'),
  delay: 200,  // wait 200ms before showing loading component
  timeout: 5000 // fail after 5s
})
const Slider = defineAsyncComponent({
  loader: () => import('../components/Slider.vue'),
  loadingComponent: () => import('../components/layout/LoadingSpinner.vue'),
  // errorComponent: () => import('./ErrorMessage.vue'),
  delay: 200,  // wait 200ms before showing loading component
  timeout: 5000 // fail after 5s
})
function toggleDropdown() {
  isOpen.value = !isOpen.value
}
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
  <section class="container py-3">
    <div class="box mt-2 mb-0">
      <button class="button is-primary" @click="isModalOpen = true">Open Modal</button>
      <div :class="['dropdown', { 'is-active': isOpen }]">
        <div class="dropdown-trigger">
          <button class="button" @click="toggleDropdown">
            <span>Dropdown</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <a class="dropdown-item">Dashboard</a>
            <a class="dropdown-item">Profile</a>
            <hr class="dropdown-divider" />
            <a class="dropdown-item">Logout</a>
          </div>
        </div>
      </div>
    </div>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
      <div class="box mt-2">
        <h1 class="title">{{ fullname }}</h1>
        <Slider :fullname="fullname" />
      </div>
    </div>
    <CommonModal
      v-if="isModalOpen"
      :is-modal-open="isModalOpen"
      @close-modal="closeModal"
      @confirm-action="confirmAction"
    />
  </section>
</template>
