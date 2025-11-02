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
      const desiredQty = product.quantity ?? 1

      if (existing) {
        if (existing.quantity + desiredQty <= product.stock) {
          existing.quantity += desiredQty
        } else {
          alert(`Only ${product.stock} in stock.`)
        }
      } else {
        if (desiredQty <= product.stock) {
          this.items.push({ ...product, quantity: desiredQty })
          alert('Product added to cart.')
        } else {
          debugger
          alert(`Only ${product.stock} in stock.`)
        }
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
