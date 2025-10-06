<template>
  <div>
    <div class="container py-3">
      <div class="columns">
        <div class="column">
          <div class="box">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In eius doloribus explicabo
            impedit quos vel cumque voluptate ullam veniam esse laboriosam dolorem distinctio, eum,
            saepe, repudiandae quidem at dolor minima.
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
            <div class="box">
              <div>
                <transition name="fade">
                  <p v-if="show">Hello World</p>
                </transition>
                <button class="button is-link is-outlined" @click="show = !show">Toggle</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>
<style scoped>
.icons-caption {
  width: 2rem;
  height: 2rem;
  color: #3273dc;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
