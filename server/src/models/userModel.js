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
const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users where id = $1", [id]);
  return result;
};
const changeUserPasswordById = async (id, hashedPassword) => {
  const result = await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [hashedPassword, id]
  );
  return result;
};
const deleteUserById = async (id) => {
  const result = await pool.query("DELETE FROM users where id = $1", [id]);
  return result;
};
const getUserAddressesById = async (id) => {
  const result = await pool.query(
    `
    SELECT users.*, addresses.*
    FROM users
    LEFT JOIN addresses ON users.id = addresses.user_id
    WHERE users.id = $1
  `,
    [id]
  );
  return result.rows;
};

const getUserAddresses = async () => {
  const result = await pool.query(`
    SELECT users.*, addresses.*
    FROM users
    RIGHT JOIN addresses ON users.id = addresses.user_id
  `);
  return result.rows;
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUserById,
  changeUserPasswordById,
  deleteUserById,
  getUserAddressesById,
  getUserAddresses,
};
