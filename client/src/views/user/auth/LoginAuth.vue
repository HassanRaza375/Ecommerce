<script setup>
import LoginFrom from '@/components/auth/LoginFrom.vue'
const formValidation = (data) => {
  console.log('Form Validated', data)
}
</script>
<template>
  <div>
    <LoginFrom @formValidation="formValidation" />
  </div>
</template>
<style scoped></style>
