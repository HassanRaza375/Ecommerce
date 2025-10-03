// src/store/cart.js
import { defineStore } from "pinia";
import { getCart, addToCart, updateCartItem, removeFromCart } from "@/services/cartService";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isLoggedIn: false, // You can get this from auth store
  }),
  actions: {
    async loadCart() {
      if (this.isLoggedIn) {
        const { data } = await getCart();
        this.items = data;
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        this.items = localCart;
      }
    },
    async addItem(product, quantity = 1) {
      if (this.isLoggedIn) {
        await addToCart(product.id, quantity);
        await this.loadCart();
      } else {
        this.items.push({ ...product, quantity });
        localStorage.setItem("cart", JSON.stringify(this.items));
      }
    },
    async removeItem(itemId) {
      if (this.isLoggedIn) {
        await removeFromCart(itemId);
        await this.loadCart();
      } else {
        this.items = this.items.filter(i => i.id !== itemId);
        localStorage.setItem("cart", JSON.stringify(this.items));
      }
    }
  }
});
