// src/controllers/productController.js
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image_url } = req.body;
    const product = await createProduct(
      name,
      description,
      price,
      stock,
      category,
      image_url
    );
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addProduct,
  fetchProducts,
  fetchProduct,
  editProduct,
  removeProduct,
};
