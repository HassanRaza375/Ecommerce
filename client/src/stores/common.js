import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    isLoggedIn: localStorage.getItem('token') ? true : false,
    wishListIds: JSON.parse(localStorage.getItem('wishListIds') || '[]'),
    role: 'customer',
    user: null,
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
      localStorage.removeItem('wishListIds')
      this.user = null
      this.role = 'customer'
      this.wishListIds = []
    },

    addWishListId(ids) {
      if (Array.isArray(ids)) {
        this.wishListIds = [...new Set([...this.wishListIds, ...ids])]
      } else {
        this.wishListIds = [...new Set([...this.wishListIds, ids])]
      }
      localStorage.setItem('wishListIds', JSON.stringify(this.wishListIds))
    },

    removeWishListId(id) {
      this.wishListIds = this.wishListIds.filter((i) => i !== id)
      localStorage.setItem('wishListIds', JSON.stringify(this.wishListIds))
    },
    setUser(data) {
      this.user = data
      this.role = data.role
    },
  },
})
