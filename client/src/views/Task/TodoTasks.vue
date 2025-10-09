<script setup>
import ButtonCommon from '@/components/layout/ButtonCommon.vue'
import { useMouse } from '@/composables/mouse'
import { ref } from 'vue'
const show = ref(true)
const { x, y } = useMouse()
</script>
<template>
  <div>
    <div class="container my-5">
      <div class="columns">
        <div class="column">
          <div class="box">x{{ x }} y{{ y }}</div>
        </div>
      </div>
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
                <transition name="slide-fade">
                  <p v-if="show">Hello World</p>
                </transition>
                <ButtonCommon class="button is-link is-outlined" @click="show = !show" />
                <!-- <button class="button is-link is-outlined" @click="show = !show">Toggle</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
            <div class="box">
              <div class="is-flex is-justify-content-center">
                <img
                  src="../../assets/logo.svg"
                  height="100"
                  width="100"
                  loading="eager"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
