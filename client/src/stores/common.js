// src/store/cart.js
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    async Login(token) {
      this.isLoggedIn = true
      localStorage.setItem('token', token)
    },
    async LogOut() {
      this.isLoggedIn = false
      localStorage.removeItem('token')
    },
  },
})
