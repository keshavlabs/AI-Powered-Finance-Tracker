const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middlewares/middlewares");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", protect, (req, res) => {
  res.json({ message: "Access granted", userId: req.user });
});

module.exports = router;
