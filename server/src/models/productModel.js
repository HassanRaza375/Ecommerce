// src/models/productModel.js
const pool = require("../config/db");

const createProduct = async (
  name,
  description,
  price,
  stock,
  category,
  image_url
) => {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, stock, category, image_url) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [name, description, price, stock, category, image_url]
  );
  return result.rows[0];
};

const getAllProducts = async () => {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY created_at DESC"
  );
  if(result.rows.length === 0) return "No products found";
  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

const updateProduct = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.length === 0) return null;

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const query = `UPDATE products SET ${setClause} WHERE id = $${
    keys.length + 1
  } RETURNING *`;

  const result = await pool.query(query, [...values, id]);
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
