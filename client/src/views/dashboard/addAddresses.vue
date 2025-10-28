<template>
  <div class="container py-4">
    <div class="box" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
      <div class="is-flex is-align-center is-justify-content-space-between">
        <h1 class="title mb-0">Add Addresses</h1>
        <div class="is-flex is-gap-2">
          <button class="button is-dark" @click="goToUrl('/dashboard/addressBook/')">Back</button>
          <button
            :class="
              isloading === true
                ? 'is-loading button is-primary has-text-white'
                : 'has-text-white button is-primary'
            "
            @click="sumbitForm"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <div class="box" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
      <div class="columns is-multiline">
        <div class="column is-half">
          <div class="field">
            <label class="label">Full Name</label>
            <div class="control">
              <input v-model="Item.full_name" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Phone#</label>
            <div class="control">
              <input v-model="Item.phone" class="input" type="number" placeholder="Text input" />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Address 1</label>
            <div class="control">
              <input
                v-model="Item.address_line1"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Address 2</label>
            <div class="control">
              <input
                v-model="Item.address_line2"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Country</label>
            <div class="control">
              <input v-model="Item.country" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">City</label>
            <div class="control">
              <input v-model="Item.city" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">State</label>
            <div class="control">
              <input v-model="Item.state" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Postal Code</label>
            <div class="control">
              <input
                v-model="Item.postal_code"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="is-flex is-align-items-end is-fullheight">
            <label class="checkbox">
              <input type="checkbox" v-model="Item.is_default" />
              Is Default Address
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import moment from 'moment'
import { ref, onMounted } from 'vue'
import { addAddressById } from '../../services/authService'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const Item = ref({
  full_name: '',
  phone: '',
  address_line1: '',
  address_line2: '',
  country: '',
  city: '',
  state: '',
  postal_code: '',
  is_default: false,
})
const u_id = ref(JSON.parse(localStorage.getItem('user')).id)
console.log('User ID:', u_id.value)
const isloading = ref(false)
const sumbitForm = async () => {
  try {
    isloading.value = true
    const obj = { ...Item.value }
    const { data } = await addAddressById(u_id.value, obj)
    if(Object.keys(data).length === 0){
      alert('Address Not Added')
    }else{
      alert('Address added Successfully')
    }
    isloading.value = false
  } catch (err) {
    console.log('Error', err)
    alert('Error Submitting Form')
    isloading.value = false
  }
}
// onMounted(async () => {
//   await getData()
// })
const goToUrl = (url) => {
  router.push(`${url}`)
}
</script>

<style scoped>
.is-fullheight {
  height: 100%;
}
</style>
