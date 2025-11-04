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
  if (result.rows.length === 0) return [];
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
const search = async (filters) => {
  const {
    query,
    category,
    min_price,
    max_price,
    min_stock,
    max_stock,
    sort_by = "created_at",
    sort_order = "desc",
    page = 1,
    limit = 12,
  } = filters;

  const offset = (page - 1) * limit;

  let where = [];
  let params = [];
  let i = 1;

  // TEXT SEARCH
  if (query) {
    where.push(`(name ILIKE $${i} OR description ILIKE $${i})`);
    params.push(`%${query}%`);
    i++;
  }

  // CATEGORY FILTER
  if (category) {
    where.push(`category = $${i}`);
    params.push(category);
    i++;
  }

  // PRICE FILTERS
  if (min_price) {
    where.push(`price >= $${i}`);
    params.push(min_price);
    i++;
  }
  if (max_price) {
    where.push(`price <= $${i}`);
    params.push(max_price);
    i++;
  }

  // STOCK FILTERS
  if (min_stock) {
    where.push(`stock >= $${i}`);
    params.push(min_stock);
    i++;
  }
  if (max_stock) {
    where.push(`stock <= $${i}`);
    params.push(max_stock);
    i++;
  }

  const whereQuery = where.length > 0 ? "WHERE " + where.join(" AND ") : "";

  const sql = `
    SELECT * FROM products
    ${whereQuery}
    ORDER BY ${sort_by} ${sort_order}
    LIMIT ${limit} OFFSET ${offset}
  `;

  const result = await db.query(sql, params);
  return result.rows;
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  search,
};
