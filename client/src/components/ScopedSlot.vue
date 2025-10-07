<script setup>
import { ref } from 'vue'

const name = ref('ali')
</script>

<template>
  <div class="box my-5">
    <slot :nm="name" :age="20"></slot>
  </div>
</template>
