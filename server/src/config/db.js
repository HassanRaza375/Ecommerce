// src/config/db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
pool
  .connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL from index.js");
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection error in index.js:", err.message);
    process.exit(1); // Optional: Stop server if DB fails to connect
  });
module.exports = pool;
