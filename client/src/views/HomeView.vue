<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import Slider from '../components/Slider.vue'
import { ref } from 'vue'

const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
const isModalOpen = ref(false)

function closeModal() {
  isModalOpen.value = false
}

function confirmAction() {
  alert('Confirmed!')
  closeModal()
}
</script>

<template>
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
      <Slider />
    </div>
  </div>
  <div class="modal" :class="{ 'is-active': isModalOpen }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal Title</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        This is a simple Bulma modal using Vue!
        <div class="control is-loading">
          <input class="input" type="text" placeholder="Loading input" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="confirmAction">Confirm</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>
