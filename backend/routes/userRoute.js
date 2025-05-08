const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js");

const router = express.Router();

// Protected profile route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "You are authorized", userId: req.user.userId });
});

module.exports = router;
