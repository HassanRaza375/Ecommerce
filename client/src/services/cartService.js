// src/services/cartService.js
import api from './api'

export const getCart = () => api.get('/cart')

export const addToCart = (productId, quantity = 1) => api.post('/cart', { productId, quantity })

export const updateCartItem = (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity })

export const removeFromCart = (itemId) => api.delete(`/cart/${itemId}`)

export const clearCart = () => api.delete('/cart')
