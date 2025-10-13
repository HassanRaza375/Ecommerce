<script setup>
import { onMounted, ref } from 'vue'
import { userById, deleteById } from '../../services/authService'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
const $route = useRoute()
const $router = useRouter()
const id = ref(null)
const userData = ref({})
id.value = $route.params.id || JSON.parse(localStorage.getItem('userId'))

onMounted(async () => {
  try {
    const { data } = await userById(id.value)
    if (data.count > 0) {
      userData.value = data.rows[0]
      console.log('userData:', userData.value)
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})
const DeleteAccount = async (userId) => {
  const { data } = await deleteById(userId)
  if (data.message === 'user deleted') {
    alert('Account Deleted Successfully')
    $router.push('/dashboard/users')
  }
}
</script>
<template>
  <div>
    <div class="container py-4">
      <div class="box mt-2" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <h2 class="subtitle">ID: {{ userData.id }}</h2>
        <h2 class="subtitle">Name: {{ userData.name }}</h2>
        <h2 class="subtitle">Email: {{ userData.email }}</h2>
        <h2 class="subtitle">Role: {{ userData.role }}</h2>
        <h2 class="subtitle">
          Date Created: {{ moment(userData?.created_at).format('DD MMM YY') || '-' }}
        </h2>
      </div>
      <div class="box mt-2" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="is-flex is-justify-content-end is-gap-2">
          <button class="button is-danger has-text-white" @click="DeleteAccount(userData.id)">
            <i class="pi pi-trash mr-1"></i> Delete Account
          </button>
          <button
            class="button is-success has-text-white"
            @click="$router.push(`/ForgotPassword/${userData.id}`)"
          >
            <i class="pi pi-file-edit mr-1"></i>
            Change Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
