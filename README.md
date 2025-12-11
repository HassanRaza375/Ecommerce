# Ecommerce

# .env
# PORT='5000'
# DB_USER='postgres'
# DB_HOST='localhost'
# DB_NAME='Ecommerce' 
# DB_PASS='5121472'
# DB_PORT='5432'
# JWT_SECRET='f1e2a4d8c9b7e6a1d3f5b6c7d9e8f1a2c3d4b5a6f7e8d9c0b1a2d3e4f5b6c7d8'


# db.js
# // src/config/db.js
# const { Pool } = require("pg");
# require("dotenv").config();

# const pool = new Pool({
#  user: process.env.DB_USER,
#  host: process.env.DB_HOST,
#  database: process.env.DB_NAME,
#  password: process.env.DB_PASS,
#  port: process.env.DB_PORT,
# });
# pool
#  .connect()
#  .then(() => {
#    console.log("✅ Connected to PostgreSQL from index.js");
#  })
#  .catch((err) => {
#    console.error("❌ PostgreSQL connection error in index.js:", err.message);
#    process.exit(1); // Optional: Stop server if DB fails to connect
#  });
# module.exports = pool;

<!-- For live db -->
<!-- src/config/db.js -->
<!-- const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Required for Render PostgreSQL
  },
});

pool
  .connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL (Render)");
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection error:", err.message);
    process.exit(1);
  });

module.exports = pool; -->


<!-- Username
ecommerce_version_1_user

Password
PEr98lzX6GD61lXp5EWgXGZA9jtzhOtW

Host
dpg-d4bc8rur433s7399bk2g-a.oregon-postgres.render.com

Port
5432

Database name
ecommerce_version_1 -->