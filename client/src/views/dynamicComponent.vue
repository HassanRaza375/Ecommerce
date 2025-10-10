<script setup>
import { ref, shallowRef } from 'vue'
import tabOne from '@/components/tabs/tabOne.vue'
import tabTwo from '@/components/tabs/tabTwo.vue'
import tabThree from '@/components/tabs/tabThree.vue'
const selectTab = ref('One')
const tabs = shallowRef({
  One: tabOne,
  Two: tabTwo,
  Three: tabThree,
})
</script>
<template>
  <div class="container py-4">
    <h1>Dynamic Component {{ selectTab }}</h1>
    <div class="is-flex is-gap-2">
      <button class="button is-primary" @click="selectTab = 'One'">Tab One</button>
      <button class="button is-primary" @click="selectTab = 'Two'">Tab Two</button>
      <button class="button is-primary" @click="selectTab = 'Three'">Tab Three</button>
    </div>
    <component :is="tabs[selectTab]"></component>
  </div>
</template>
<style scoped></style>
