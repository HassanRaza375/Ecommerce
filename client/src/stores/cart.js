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
    cartId: null,
    items: [],
    cartTotal: 0,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((s, i) => s + Number(i.quantity), 0),
    totalPrice: (state) =>
      state.items.reduce((s, i) => s + Number(i.price_at_added) * i.quantity, 0),
  },

  actions: {
    init() {
      const saved = JSON.parse(localStorage.getItem('cart'))
      if (saved) {
        this.cartId = saved.cartId
        this.items = saved.items || []
        this.cartTotal = saved.cartTotal || 0
      }
    },
    saveCart() {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cartId: this.cartId,
          items: this.items,
          cartTotal: this.totalPrice,
        }),
      )
    },

    async loadCartFromApi() {
      const commonStore = useCommonStore()
      if (!commonStore.isLoggedIn) return
      try {
        const { data } = await getCart()

        this.cartId = data.cartId
        this.items = data.items
        this.cartTotal = data.cartTotal

        this.saveCart()
      } catch (err) {
        console.error(err)
      }
    },

    async addItem(product) {
      const commonStore = useCommonStore()
      const useToast = useToasterStore()
      const desiredQty = product.quantity ?? 1

      // Guest user
      if (!commonStore.isLoggedIn) {
        const existing = this.items.find(
          (i) => i.product_id === product.product_id || i.product_id === product.id,
        )

        if (existing) {
          existing.quantity += desiredQty
        } else {
          this.items.push({
            cart_item_id: crypto.randomUUID(),
            product_id: product.product_id || product.id,
            name: product.name,
            price_at_added: product.price,
            quantity: desiredQty,
            total: product.price * desiredQty,
          })
        }

        this.saveCart()
        useToast.success('Added to cart.')
        return
      }

      // Logged-in
      try {
        const { data } = await addToCart(product.product_id || product.id, desiredQty)

        const existing = this.items.find((i) => i.product_id === data.product_id)

        if (existing) {
          existing.quantity = data.quantity
        } else {
          this.items.push(data)
        }

        this.saveCart()
        useToast.success('Added to cart.')
      } catch (err) {
        useToast.error(err.response?.data?.message || 'Failed to add.')
      }
    },

    async updateQuantity(productId, quantity) {
      const commonStore = useCommonStore()

      // Guest
      if (!commonStore.isLoggedIn) {
        const item = this.items.find((i) => i.product_id === productId)
        if (item) item.quantity = quantity
        this.saveCart()
        return
      }

      // Logged-in
      const { data } = await updateCartItem(productId, quantity)
      console.log(data)
      const item = this.items.find((i) => i.product_id === productId)
      if (item) item.quantity = data.quantity

      this.saveCart()
    },

    async removeItem(productId) {
      const commonStore = useCommonStore()

      // Guest
      if (!commonStore.isLoggedIn) {
        this.items = this.items.filter((i) => i.product_id !== productId)
        this.saveCart()
        return
      }

      // Logged-in
      await removeFromCart(productId)
      this.items = this.items.filter((i) => i.product_id !== productId)
      this.saveCart()
    },

    async clearCart() {
      const commonStore = useCommonStore()

      // Guest
      if (!commonStore.isLoggedIn) {
        this.items = []
        this.saveCart()
        return
      }

      // Logged-in
      await apiClearCart()
      this.items = []
      this.cartId = null
      this.cartTotal = 0
      this.saveCart()
    },
  },
})
