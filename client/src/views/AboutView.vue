<script setup>
import { ref } from 'vue'

const removeNotification = ref(true)
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="notification is-danger is-light" v-if="removeNotification">
      <button class="delete" @click="removeNotification = false"></button>
      Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.
      <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum
      rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
      <a>felis venenatis</a> efficitur.
    </div>
  </div>
</template>

<style></style>
