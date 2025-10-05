<script setup>
import { ref } from 'vue'
import {reactive} from 'vue'
const removeNotification = ref(true)
const attributes ={
  id:'test_id',
  class:'test_class',
  style:'color:red',
}
const num = reactive({value:0,names:['ali','ahmad','mushtaq'],human:true})
setTimeout(() => {
  num.value=5
  num.names.push('new name')
  num.human=false
}, 2000);
</script>
<template>
  <div class="about">
    <h1 v-bind="attributes">This is an about page {{ num.value }}</h1>
    <ul>
    <li v-for="(name,i) in num.names" :key="i">
      {{ name }}
    </li>
    </ul>
    <p v-if="num.human">You are a human</p>
    <div class="my-5">
      <button class="button" @click="num.value++">Increment</button>
    </div>
    <div class="notification is-danger is-light" v-if="removeNotification">
      <button class="delete" @click="removeNotification = false"></button>
      Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.
      <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum
      rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
      <a>felis venenatis</a> efficitur.
    </div>
  </div>
</template>

<style></style>
