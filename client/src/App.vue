<script setup>
import Toast from 'primevue/toast'
</script>

<template>
  <div>
    <RouterView name="public" />
    <RouterView name="admin" />
    <Toast />
  </div>
</template>
