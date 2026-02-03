const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("name _id");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


