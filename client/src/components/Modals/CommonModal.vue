<script setup>
import { ref, defineEmits } from 'vue'
defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['close-modal', 'confirm-action'])
const inputText = ref('')
</script>
<template>
  <div>
    <div v-if="isModalOpen" class="modal is-active">
      <div class="modal-background" @click="emit('close-modal')"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal Title</p>
          <button class="delete" aria-label="close" @click="emit('close-modal')"></button>
        </header>
        <section class="modal-card-body">
          <div class="control is-loading">
            <input v-model="inputText" class="input" type="text" placeholder="Loading input" />
          </div>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-center is-gap-2">
          <button class="button is-success" @click="emit('confirm-action', inputText)">
            Confirm
          </button>
          <button class="button" @click="emit('close-modal')">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
