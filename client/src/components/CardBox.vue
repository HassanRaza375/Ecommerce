<script setup></script>

<template>
  <div class="container">
    <div class="box">
      <slot name="default"></slot>
      <slot name="header"></slot>
      <slot name="footer"></slot>
      <slot name="scopedSlot"></slot>
    </div>
  </div>
</template>

<style scoped>
.box {
  border: 1px solid red;
}
</style>
