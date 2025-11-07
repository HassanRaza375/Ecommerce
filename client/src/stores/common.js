// src/store/cart.js
import { defineStore } from 'pinia'
export const useCommonStore = defineStore('common', {
  state: () => ({
    isLoggedIn: localStorage.getItem('token') ? true : false,
    wishListIds: [50],
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
    addWishListId(ids) {
      // Handle both array and single ID
      if (Array.isArray(ids)) {
        this.wishListIds = [...new Set([...this.wishListIds, ...ids])]
      } else {
        this.wishListIds = [...new Set([...this.wishListIds, ids])]
      }
    },
    removeWishListId(id) {
      this.wishListIds = this.wishListIds.filter((i) => i !== id)
    },
  },
})
