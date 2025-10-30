// src/stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    async loadCart() {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
      this.items = localCart
    },

    addItem(product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantity < product.stock) {
          existing.quantity++
        } else {
          // Optional: notify the user
          alert(`Only ${product.stock} in stock.`)
        }
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },

    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
      this.saveCart()
    },

    decreaseQuantity(productId) {
      const item = this.items.find((i) => i.id === productId)
      if (!item) return
      if (item.quantity > 1) item.quantity--
      else this.removeItem(productId)
      this.saveCart()
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },
  },
})
