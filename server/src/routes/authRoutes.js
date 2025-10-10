// src/routes/authRoutes.js
const express = require("express");
const { register, login, AllUsers } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", AllUsers);

module.exports = router;
