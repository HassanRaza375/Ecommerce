<template>
  <!-- {{props.fullname||"slider 1"}} -->
  <Swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="1"
    :loop="true"
    :pagination="{ clickable: true }"
    :navigation="true"
    class="mySwiper"
  >
    <SwiperSlide v-for="img in props.Images" :key="img">
      <div class="slider-item">
        <img
          :src="img"
          class="img-fluid"
          :alt="props.fullname || 'slider image'"
          height="310"
          width="1266"
          loading="eager"
        />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const props = defineProps({
  fullname: {
    type: String,
    required: false,
    default: '',
  },
  Images: {
    type: Array,
    required: false,
    default: () => [],
  },
})
</script>
<style scoped>
/* .slider-item {
  background-color: #3273dc;
  padding: 40px;
  color: white;
} */
.img-fluid {
  width: 100%;
  height: auto;
}
.swiper-button-prev,
.swiper-button-next {
  color: #ffffff;
}
.swiper-pagination-bullet-active {
  background: white;
}
</style>
