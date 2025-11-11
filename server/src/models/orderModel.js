// models/ordersModel.js
const pool = require("../config/db");

// Create order with items
const createOrder = async (userId, addressId, items, totalAmount) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderQuery = `
      INSERT INTO orders (user_id, address_id, total_amount)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const orderResult = await client.query(orderQuery, [
      userId,
      addressId,
      totalAmount,
    ]);
    const order = orderResult.rows[0];

    const itemQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4);
    `;

    for (const item of items) {
      await client.query(itemQuery, [
        order.id,
        item.productId,
        item.quantity,
        item.price,
      ]);
    }

    await client.query("COMMIT");
    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Get all orders for a user
const getUserOrders = async (userId) => {
  const query = `
    SELECT * FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get order with items
const getOrderById = async (userId, orderId) => {
  const orderQuery = `
    SELECT * FROM orders
    WHERE id = $1 AND user_id = $2;
  `;
  const orderResult = await pool.query(orderQuery, [orderId, userId]);

  if (orderResult.rows.length === 0) return null;

  const itemsQuery = `
    SELECT * FROM order_items WHERE order_id = $1;
  `;
  const itemsResult = await pool.query(itemsQuery, [orderId]);

  return {
    ...orderResult.rows[0],
    items: itemsResult.rows,
  };
};

// Update order status
const updateOrderStatus = async (orderId, status) => {
  const query = `
    UPDATE orders
    SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [status, orderId]);
  return result.rows[0];
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
};
