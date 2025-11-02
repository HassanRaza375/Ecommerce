<script setup>
import { useRouter } from 'vue-router';
import { capitalize } from '@/utils/capitalize';
const router = useRouter();
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
const redirectCategory = (category) => {
    router.push(`/categories/${category.trim()}/`)
    console.log('Redirecting to category:', category)
}
</script>

<template>
  <div class="tabs-container">
    <span
      class="tab"
      v-for="item in categories"
      @click="redirectCategory(item)"
      :key="item"
    >
      {{ capitalize(item) }}
    </span>
  </div>
</template>

<style scoped>
.tabs-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tab {
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  transition: color 0.3s ease;
}

.tab:hover {
  color: #222;
}

.tab::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: #4f46e5; /* purple-ish */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease-out;
}

.tab:hover::after {
  transform: scaleX(1);
}

.tab.active {
  color: #000;
}

.tab.active::after {
  transform: scaleX(1);
}
</style>
