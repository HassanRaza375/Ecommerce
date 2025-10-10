// src/models/userModel.js
const pool = require("../config/db");

const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role",
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result;
};

module.exports = { createUser, findUserByEmail, getAllUsers };
