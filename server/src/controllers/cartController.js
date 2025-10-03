const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // comes from JWT middleware
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid product or quantity" });
    }

    const cartId = await Cart.getOrCreateCart(userId);
    await Cart.addItem(cartId, productId, quantity);

    res.json({ message: "Product added to cart successfully" });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartId = await Cart.getOrCreateCart(userId);

    const items = await Cart.getCartItems(cartId);
    const cartTotal = items.reduce((sum, item) => sum + Number(item.total), 0);

    res.json({
      cartId,
      items,
      cartTotal,
    });
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid product or quantity" });
    }

    const cartId = await Cart.getOrCreateCart(userId);
    await Cart.updateQuantity(cartId, productId, quantity);

    res.json({ message: "Cart item updated successfully" });
  } catch (err) {
    console.error("Update Cart Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cartId = await Cart.getOrCreateCart(userId);
    await Cart.removeItem(cartId, productId);

    res.json({ message: "Product removed from cart" });
  } catch (err) {
    console.error("Remove Cart Item Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartId = await Cart.getOrCreateCart(userId);

    await Cart.clearCart(cartId);

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Clear Cart Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { addToCart, getCart, updateItem, removeItem, clearCart };
