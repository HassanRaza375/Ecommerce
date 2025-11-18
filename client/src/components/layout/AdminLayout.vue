<template>
  <div class="admin-layout">
    <!-- Admin Sidebar -->
    <aside class="admin-sidebar">
      <ul>
        <li><RouterLink to="/admin/">Dashboard</RouterLink></li>
        <li><RouterLink to="/admin/products">Products</RouterLink></li>
        <!-- <li><RouterLink to="/admin/orders">Orders</RouterLink></li>
        <li><RouterLink to="/admin/users">Users</RouterLink></li> -->
      </ul>
    </aside>

    <!-- Main content -->
    <main class="admin-content">
      <header class="admin-header">
        <h2>Admin Panel</h2>
      </header>

      <!-- Admin page content -->
      <RouterView />
    </main>
  </div>
</template>

<style>
.admin-layout {
  display: flex;
  height: 100vh;
}

.admin-sidebar {
  width: 250px;
  background: #2d2d2d;
  color: white;
  padding: 20px;
}

.admin-content {
  flex: 1;
  background: #f4f4f4;
  padding: 20px;
}

.admin-header {
  background: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
}
</style>
