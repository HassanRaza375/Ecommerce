<script setup>
import { ref } from 'vue'
const showPassword = ref(true)
const isloading = ref(false)
const sumbitForm = () => {
  isloading.value = true
  setTimeout(() => {
    isloading.value = false
  }, 2000)
}
</script>
<template>
  <div class="is-flex is-justify-content-center is-align-items-center hero is-fullheight">
    <div class="box">
      <div class="mb-2">
        <h1 class="title has-text-centered">Sign Up</h1>
      </div>
      <div class="mb-2">
        <input class="input" type="text" placeholder="Name" />
      </div>
      <div class="field mb-2">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email" />
          <span class="icon is-small is-left">
            <i class="icon-svg is-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </i>
          </span>
        </p>
      </div>
      <div class="field mb-2">
        <p class="control has-icons-left has-icons-right">
          <input class="input" :type="showPassword ? 'text' : 'password'" placeholder="Password" />
          <span class="icon is-small is-left" @click="showPassword = !showPassword">
            <i class="icon-svg is-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </i>
          </span>
          <span class="icon is-small is-right is-clickable" @click="showPassword = !showPassword">
            <i class="icon-svg is-flex" v-if="!showPassword">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </i>

            <i class="icon-svg is-flex" v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </i>
          </span>
        </p>
      </div>
      <div class="is-flex is-justify-content-center is-gap-2">
        <button :class="isloading === true ? 'is-loading button is-primary' : 'button is-primary'" @click="sumbitForm">Sign In</button>
        <button class="button is-info">Go Back</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.box {
  max-width: 500px;
  width: 100%;
}
.icon-svg svg {
  height: 20px;
  width: 20px;
}
.icon.is-clickable {
  pointer-events: auto;
  cursor: pointer;
}
.icon.is-clickable:hover .icon-svg {
  color: hsl(221deg, 14%, 48%);
}
</style>
