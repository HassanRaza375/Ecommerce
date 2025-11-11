// services/paymentsService.js
import api from './api'

// Create payment (stripe, cod, etc)
export const createPayment = (data) => api.post('/payments', data)

// Update payment status (after gateway callback)
export const updatePaymentStatus = (data) => api.put('/payments', data)

// Get payment details by order ID
export const getPaymentByOrder = (orderId) => api.get(`/payments/${orderId}`)
