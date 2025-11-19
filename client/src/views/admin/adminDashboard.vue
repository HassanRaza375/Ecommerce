<template>
  <div class="flex flex-column gap-5">
    <div class="grid-temp-4">
      <Card class="shadow-md">
        <template #title>Revenue</template>
        <template #content>
          <h2 class="text-2xl font-bold text-green-600">$24,520</h2>
          <p class="text-sm text-gray-500">Last 30 days</p>
        </template>
      </Card>

      <Card class="shadow-md">
        <template #title>Orders</template>
        <template #content>
          <h2 class="text-2xl font-bold text-blue-600">1,280</h2>
          <p class="text-sm text-gray-500">Total orders</p>
        </template>
      </Card>

      <Card class="shadow-md">
        <template #title>Customers</template>
        <template #content>
          <h2 class="text-2xl font-bold text-purple-600">540</h2>
          <p class="text-sm text-gray-500">New customers</p>
        </template>
      </Card>

      <Card class="shadow-md">
        <template #title>Products</template>
        <template #content>
          <h2 class="text-2xl font-bold text-orange-600">320</h2>
          <p class="text-sm text-gray-500">In stock</p>
        </template>
      </Card>
    </div>

    <Card class="shadow-md">
      <template #title>Sales Overview</template>
      <template #content>
        <Chart type="line" :data="salesData" :options="chartOptions" class="w-full" />
      </template>
    </Card>

    <Card class="shadow-md">
      <template #title>Best Selling Products</template>
      <template #content>
        <DataTable :value="bestProducts" tableStyle="min-width: 100%">
          <Column field="name" header="Product Name"></Column>
          <Column field="sold" header="Units Sold"></Column>
          <Column field="revenue" header="Revenue"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales ($)',
      data: [4200, 3800, 5100, 5900, 6200, 7000],
      borderColor: '#42A5F5',
      tension: 0.4,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

const bestProducts = [
  { name: 'Wireless Headphones', sold: 320, revenue: '$6,400' },
  { name: 'Smart Watch', sold: 280, revenue: '$5,200' },
  { name: 'Bluetooth Speaker', sold: 220, revenue: '$4,400' },
]
</script>

<style scoped>
.grid-temp-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
