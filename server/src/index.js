// src/index.js
const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
