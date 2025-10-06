<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Header from './components/layout/HeaderLayout.vue';
</script>

<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>

<style>
nav a.router-link-exact-active {
  font-weight: bold;
}
/* Dark mode overrides */
body.dark-mode {
  background-color: #1e1e1e;
  color: #f5f5f5;
}

body.dark-mode .navbar,
body.dark-mode .card,
body.dark-mode .box {
  background-color: #2b2b2b;
  color: #f5f5f5;
}

body.dark-mode .button {
  background-color: #444;
  color: #fff;
}

body.dark-mode .button.is-primary {
  background-color: #3273dc;
}
</style>
