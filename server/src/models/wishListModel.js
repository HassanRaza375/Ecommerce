const pool = require("../config/db");

// 🔹 Get or create a cart for a user
async function getOrCreateCart(userId) {
  const result = await pool.query("SELECT id FROM carts WHERE user_id = $1", [
    userId,
  ]);

  if (result.rows.length === 0) {
    const newCart = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING id",
      [userId]
    );
    return newCart.rows[0].id;
  }

  return result.rows[0].id;
}

// 🔹 Add or update a cart item
async function addItem(cartId, productId, quantity) {
  const existing = await pool.query(
    "SELECT id FROM cart_items WHERE cart_id = $1 AND product_id = $2",
    [cartId, productId]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      "UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3",
      [quantity, cartId, productId]
    );
  } else {
    await pool.query(
      "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
      [cartId, productId, quantity]
    );
  }
}

// 🔹 Get cart items with product details
async function getCartItems(cartId) {
  const result = await pool.query(
    `SELECT ci.product_id, ci.quantity, 
            p.name, p.price, (ci.quantity * p.price) AS total
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = $1`,
    [cartId]
  );
  return result.rows;
}

// 🔹 Update quantity
async function updateQuantity(cartId, productId, quantity) {
  await pool.query(
    "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3",
    [quantity, cartId, productId]
  );
}

// 🔹 Remove product from cart
async function removeItem(cartId, productId) {
  await pool.query(
    "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2",
    [cartId, productId]
  );
}

// 🔹 Clear cart
async function clearCart(cartId) {
  await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);
}

module.exports = {
  getOrCreateCart,
  addItem,
  getCartItems,
  updateQuantity,
  removeItem,
  clearCart,
};
