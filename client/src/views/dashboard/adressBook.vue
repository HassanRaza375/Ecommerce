<template>
  <div class="container py-4">
    <div class="box">
      <div class="is-flex is-align-center is-justify-content-space-between">
        <h1 class="title mb-0">Addresses</h1>
        <button class="button is-primary has-text-white is-flex is-align-center">
          <i class="pi pi-plus mr-2"></i> Add Address
        </button>
      </div>
    </div>

    <div class="box" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
      <div class="table-container">
        <div class="card">
          <table class="table is-striped table is-hoverable table is-fullwidth">
            <thead>
              <tr>
                <th width="10%">Address Id</th>
                <th width="10%">User Id</th>
                <th width="10%">Name</th>
                <th width="30%">Email</th>
                <th width="20%">Main Address</th>
                <th width="20%">Date</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="users.length < 1">
                <td colspan="100%" align="center"><b>No Record Found</b></td>
              </tr>
              <tr v-else v-for="(user, i) in users" :key="i">
                <td>{{ user.id || '-' }}</td>
                <td>{{ user.user_id || '-' }}</td>
                <td>{{ user.name || '-' }}</td>
                <td>{{ user.email || '-' }}</td>
                <td>{{ user.address_line1 || '-' }}</td>
                <td>{{ moment(user?.created_at).format('DD MMM YY') || '-' }}</td>
                <td>
                  <div class="is-flex is-gap-2">
                    <div>
                      <i
                        class="pi pi-trash has-text-danger pointer"
                        @click="deleteAddress(user.id)"
                      ></i>
                    </div>
                    <div>
                      <i
                        class="pi pi-user-edit has-text-primary pointer"
                        @click="goToUrl(user.id)"
                      ></i>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import { onMounted, ref } from 'vue'
import { getAllUsersAdresses, deleteAddressById } from '../../services/authService'
import { useRouter } from 'vue-router'
const router = useRouter()
const users = ref([])
onMounted(async () => {
  await getAddresses()
})
const goToUrl = (id) => {
  router.push(`/dashboard/add/address/${id ? id : ''}`)
}
const getAddresses = async () => {
  const { data } = await getAllUsersAdresses()
  users.value = data.addresses.length > 0 ? data.addresses : []
}
const deleteAddress = async (userId) => {
  const { data } = await deleteAddressById(userId)
  if (data.message === 'user addresses deleted') {
    alert('User Address Deleted Successfully')
    await getAddresses()
  }
}
</script>

<style scoped></style>
