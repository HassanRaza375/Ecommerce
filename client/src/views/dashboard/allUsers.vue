<script setup>
import moment from 'moment'
import { onMounted, ref } from 'vue'
import { allusers } from '../../services/authService'

const users = ref([{}])
onMounted(async () => {
  const { data } = await allusers()
  users.value = data.count > 0 ? data.rows : [{}]
})
</script>
<template>
  <div>
    <div
      class="container py-4"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
    >
      <div class="table-container">
        <div class="card">
          <table class="table is-striped table is-hoverable table is-fullwidth">
            <thead>
              <tr>
                <th width="10%">#Sr</th>
                <th width="10%">Name</th>
                <th width="30%">Email</th>
                <th width="20%">Role</th>
                <th width="20%">Date</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, i) in users" :key="i">
                <td>{{ ++i }}</td>
                <td>{{ user.name || '-' }}</td>
                <td>{{ user.email || '-' }}</td>
                <td>{{ user.role || '-' }}</td>
                <td>{{ moment(user?.created_at).format('DD MMM YY') || '-' }}</td>
                <td>
                  <div class="is-flex is-gap-2">
                    <div>
                      <i class="pi pi-trash has-text-danger pointer"></i>
                    </div>
                    <div>
                      <i class="pi pi-user-edit has-text-primary pointer"></i>
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
<style scoped></style>
