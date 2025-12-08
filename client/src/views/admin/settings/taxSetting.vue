<template>
  <div class="grid">
    <div class="col-12 mb-3">
      <Card>
        <template #content>
          <div class="flex justify-content-between align-items-center">
            <h2 class="m-0 title">Tax Setting</h2>
            <Button
              label="Add Tax"
              icon="pi pi-check"
              :loading="loading"
              @click="visible = !visible"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
let loading = ref(false)
let visible = ref(false)
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
