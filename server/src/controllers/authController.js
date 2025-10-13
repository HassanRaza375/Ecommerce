// src/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUserById,
  changeUserPasswordById,
  deleteUserById,
} = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const AllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ rows: [...users.rows], count: users.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "No User Found" });
    res.json({ rows: [...user.rows], count: user.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const ChangePassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await changeUserPasswordById(user.id, hashedPassword);

    res.status(200).json({
      message: "Password updated successfully",
      rowCount: updatedUser.rowCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const DeleteAccount = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (user.rows.length === 0)
      return res.status(404).json({ message: "user not found" });
    const userDel = await deleteUserById(req.params.id);
    res.json({ message: "user deleted", userDel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  AllUsers,
  getUser,
  ChangePassword,
  DeleteAccount,
};
