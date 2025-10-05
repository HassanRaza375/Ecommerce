<template>
  <Swiper :slides-per-view="1" :loop="true" class="mySwiper">
    <SwiperSlide><div class="slider-item">{{props.fullname||"slider 1"}}</div></SwiperSlide>
    <SwiperSlide><div class="slider-item">{{props.fullname||"slider 1"}}</div></SwiperSlide>
    <SwiperSlide><div class="slider-item">{{props.fullname||"slider 1"}}</div></SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const props = defineProps({
  fullname: {
    type: String,
    required: false,
    default: ''
  }
})
</script>
<style scoped>
.slider-item {
  background-color: #3273dc;
  padding: 40px;
  color: white;
}
</style>
