<script setup>
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
      <div class="block box">
        <nav>
          <RouterLink to="/about" class="button is-link is-outlined">About</RouterLink>
          <RouterLink to="/" class="button is-link is-outlined">Home</RouterLink>
          <RouterLink to="/Todo" class="button is-link is-outlined">Task</RouterLink>
          <RouterLink to="/Login" class="button is-link is-outlined">Login</RouterLink>
          <RouterLink to="/SignUp" class="button is-link is-outlined">SignUp</RouterLink>
          <RouterLink to="/Cart" class="button is-link is-outlined">Cart</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style>
nav a.router-link-exact-active {
  color: red;
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
