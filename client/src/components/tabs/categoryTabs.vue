<script setup>
import { useRouter } from 'vue-router'
import { capitalize } from '@/utils/capitalize'
const router = useRouter()
defineProps({
  categories: {
    type: Array,
    required: true,
  },
})
const redirectCategory = (category) => {
  router.push(`/categories/${category.trim()}/`)
  console.log('Redirecting to category:', category)
}
</script>

<template>
  <div class="tabs-container">
    <template v-if="categories.length">
      <span class="tab" v-for="item in categories" @click="redirectCategory(item)" :key="item">
        {{ capitalize(item) }}
      </span>
    </template>

    <!-- Skeleton when empty -->
    <template v-else>
      <div class="tab-skeleton" v-for="n in 6" :key="n"></div>
    </template>
  </div>
</template>

<style scoped>
.tabs-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1rem;
}

.tab {
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.tab:hover {
  color: #222;
}

.tab::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
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
.tab-skeleton {
  width: 80px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(200, 200, 200, 0.2),
    rgba(200, 200, 200, 0.35),
    rgba(200, 200, 200, 0.2)
  );
  animation: shine 1.4s infinite ease-in-out;
}

@keyframes shine {
  0% {
    background-position: -120px;
  }
  100% {
    background-position: 120px;
  }
}

@media (prefers-color-scheme: dark) {
  .tab {
    color: #bbbbbb;
  }

  .tab:hover {
    color: #ffffff;
  }

  .tab.active {
    color: #ffffff;
  }

  .tab::after {
    background: #818cf8;
  }
  .tab-skeleton {
    background: linear-gradient(
      90deg,
      rgba(80, 80, 80, 0.25),
      rgba(120, 120, 120, 0.35),
      rgba(80, 80, 80, 0.25)
    );
  }
}
</style>
