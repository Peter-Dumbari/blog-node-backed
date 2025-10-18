const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

exports.register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

  const { username, name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exist" });

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ username, name, email, password: hashed });
    await user.save();

    const token = signToken(user._id);
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.fullname,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error, message: "server error" });
  }
};

exports.login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne(email);
    if (!user) return res.status(404).json({ error: "Invalid Credentials" });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(404).json({ error: "Invalid Credentials" });

    const token = signToken(user._id);
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.fullname,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error, message: "server error" });
  }
};
