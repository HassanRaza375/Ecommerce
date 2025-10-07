<script setup>
import LoginFrom from '@/components/auth/LoginFrom.vue'
const formValidation = (data) => {
  console.log('Form Validated', data)
}
</script>
<template>
  <div class="bg">
    <div class="container">
      <LoginFrom @formValidation="formValidation" />
    </div>
  </div>
</template>
<style scoped>
.bg {
  background-color: rebeccapurple;
}
</style>
