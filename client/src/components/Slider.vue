<template>
  <Swiper :slides-per-view="1" :loop="true" class="mySwiper">
    <SwiperSlide><div class="slider-item">Slide 1</div></SwiperSlide>
    <SwiperSlide><div class="slider-item">Slide 2</div></SwiperSlide>
    <SwiperSlide><div class="slider-item">Slide 3</div></SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
</script>
<style scoped>
.slider-item {
  background-color: #3273dc;
  padding: 40px;
  color: white;
}
</style>
