// src/store/cart.js
import { defineStore } from 'pinia'
export const useCommonStore = defineStore('common', {
  state: () => ({
    isLoggedIn: localStorage.getItem('token') ? true : false,
  }),
  actions: {
    async Login(token) {
      this.isLoggedIn = true
      localStorage.setItem('token', token)
    },
    async LogOut() {
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
    },
  },
})
