<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import Slider from '../components/Slider.vue'
import CommonModal from '../components/Modals/CommonModal.vue'
import { ref,computed } from 'vue'

const isOpen = ref(false)
let firstName = ref('John')
let lastName = ref('Doe')

const fullname = computed(()=>{
  console.log('Recomputing fullname')
  return `${firstName.value} ${lastName.value}`
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
        <h1 class="title">{{fullname}}</h1>
        <Slider :fullname="fullname"/>
      </div>
    </div>
    <CommonModal :is-modal-open="isModalOpen"  @close-modal="closeModal" @confirm-action="confirmAction" />
  </section>
</template>
