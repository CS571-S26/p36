import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const exists = await User.findOne({ username });
  if (exists) {
    res.status(400).json({ message: "Username already taken."});
    return;
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  // Create user in database
  const user = await User.create({ username, password: hashed});

  // Create JWT token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  // Send success response to frontend
  res.status(201).json({ token, username: user.username });
})

// Login