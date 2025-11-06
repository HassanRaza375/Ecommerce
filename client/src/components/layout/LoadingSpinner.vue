<template>
  <div class="loading-wrapper">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p class="loading-text">Loading, please wait...</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f6f8fa;
}

.loader {
  display: flex;
  gap: 8px;
}

.loader span {
  width: 12px;
  height: 12px;
  background: #4c84ff;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  from {
    transform: translateY(0);
    opacity: 0.5;
  }
  to {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.loading-text {
  margin-top: 14px;
  font-size: 16px;
  color: #555;
}
</style>
