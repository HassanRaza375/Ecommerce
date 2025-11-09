import { defineStore } from 'pinia'
import { useToasterStore } from '@/stores/toaster'
import { useCommonStore } from '@/stores/common'

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart as apiClearCart,
} from '@/services/cartService'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((s, i) => s + i.price_at_added * i.quantity, 0),
  },

  actions: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    // ✅ Load cart from backend after login
    async loadCartFromApi() {
      const commonStore = useCommonStore()
      if (!commonStore.isLoggedIn) return

      try {
        const { data } = await getCart()
        this.items = data
        this.saveCart()
      } catch (err) {
        console.error(err)
      }
    },

    // ✅ Add item
    async addItem(product) {
      const commonStore = useCommonStore()
      const useToast = useToasterStore()
      const desiredQty = product.quantity ?? 1

      // ✅ Guest user
      if (!commonStore.isLoggedIn) {
        const existing = this.items.find(
          (i) => i.product_id === product.product_id || i.product_id === product.id,
        )

        if (existing) {
          existing.quantity += desiredQty
        } else {
          this.items.push({
            product_id: product.product_id || product.id,
            name: product.name,
            price_at_added: product.price,
            quantity: desiredQty,
          })
        }

        this.saveCart()
        useToast.success('Added to cart.')
        return
      }

      // ✅ Logged-in user
      try {
        const { data } = await addToCart(product.product_id || product.id, desiredQty)

        const existing = this.items.find((i) => i.product_id === data.product_id)

        if (existing) existing.quantity = data.quantity
        else this.items.push(data)

        this.saveCart()
        useToast.success('Added to cart.')
      } catch (err) {
        useToast.error(err.response?.data?.message || 'Failed to add.')
      }
    },

    // ✅ Update quantity
    async updateQuantity(productId, quantity) {
      const commonStore = useCommonStore()

      // ✅ Guest user
      if (!commonStore.isLoggedIn) {
        const item = this.items.find((i) => i.product_id === productId)
        if (item) item.quantity = quantity
        this.saveCart()
        return
      }

      // ✅ Logged-in
      const { data } = await updateCartItem(productId, quantity)

      const item = this.items.find((i) => i.product_id === productId)
      if (item) item.quantity = data.quantity

      this.saveCart()
    },

    // ✅ Remove item
    async removeItem(productId) {
      const commonStore = useCommonStore()

      // ✅ Guest
      if (!commonStore.isLoggedIn) {
        this.items = this.items.filter((i) => i.product_id !== productId)
        this.saveCart()
        return
      }

      // ✅ Logged-in
      await removeFromCart(productId)
      this.items = this.items.filter((i) => i.product_id !== productId)
      this.saveCart()
    },

    // ✅ Clear cart
    async clearCart() {
      const commonStore = useCommonStore()

      // ✅ Guest
      if (!commonStore.isLoggedIn) {
        this.items = []
        this.saveCart()
        return
      }

      // ✅ Logged-in
      await apiClearCart()
      this.items = []
      this.saveCart()
    },
  },
})
