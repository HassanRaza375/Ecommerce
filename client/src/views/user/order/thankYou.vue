<template>
  <div class="thankyou-container">
    <div class="card">
      <div class="icon-wrapper">
        <div class="checkmark">&#10003;</div>
      </div>

      <h1>Thank You!</h1>
      <p class="subtitle">Your order has been successfully placed.</p>

      <div class="order-info">
        <p><strong>Order Number:</strong> {{ orderId }}</p>
        <p><strong>Estimated Delivery:</strong> {{ deliveryDate }}</p>
      </div>

      <button class="primary-btn" @click="goToOrders">
        View My Orders
      </button>

      <button class="secondary-btn" @click="continueShopping">
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const userId = JSON.parse(localStorage.getItem("userId"))
const orderId = "ORD-827361";
const deliveryDate = "Nov 20, 2025";

const goToOrders = () => {
  router.push(`/users/my-orders/${userId}`);
};

const continueShopping = () => {
  router.push("/");
};
</script>

<style scoped>
.thankyou-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
  background: #f6f8fb;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  max-width: 420px;
  width: 100%;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: #4caf50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

.checkmark {
  color: white;
  font-size: 42px;
  font-weight: bold;
}

h1 {
  margin: 10px 0;
  font-size: 28px;
  color: #2c3e50;
}

.subtitle {
  color: #64748b;
  margin-bottom: 20px;
}

.order-info {
  background: #f0f4f8;
  padding: 15px;
  border-radius: 12px;
  margin: 20px 0;
  text-align: left;
  font-size: 15px;
}

.primary-btn {
  width: 100%;
  padding: 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: 0.2s ease;
}

.primary-btn:hover {
  background: #4338ca;
}

.secondary-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.secondary-btn:hover {
  background: #eef2ff;
}
</style>
