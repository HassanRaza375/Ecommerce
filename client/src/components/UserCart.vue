<script setup>
defineProps({
  isCartOpen: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['isCartOpen'])
</script>
<template>
  <div>
    <div :class="['offcanvas', { 'is-active': isCartOpen }]">
      <div class="offcanvas-content box">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <h2 class="title is-4">Cart</h2>
          <i class="pi pi-times pointer" @click="emit('isCartOpen')"></i>
        </div>
        <ul>
          <li v-for="item in [1, 2, 3, 4]" :key="item">
            <a href="#">item{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Optional overlay -->
    <div v-if="isCartOpen" class="offcanvas-overlay" @click="emit('isCartOpen')"></div>
  </div>
</template>

<style scoped>
.offcanvas {
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100vh;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: right 0.3s ease;
  z-index: 200;
}

.offcanvas.is-active {
  right: 0;
}

.offcanvas-overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
</style>
