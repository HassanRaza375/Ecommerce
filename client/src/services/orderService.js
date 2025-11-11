// services/ordersService.js
import api from './api'
export const createOrder = (data) => api.post('/orders', data)
// Get all orders of logged-in user
export const getUserOrders = () => api.get('/orders')
// Get single order by ID
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`)
// Update order status (admin usage)
export const updateOrderStatus = (data) => api.put('/orders/status', data)
