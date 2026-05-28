const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getChats,
  getChatById,
  deleteChatById,
} = require("../controllers/aiController");
const protect = require("../middlewares/middlewares");
const rateLimit = require("express-rate-limit");

const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/chat", protect, aiLimiter, sendMessage);
router.get("/chats", protect, getChats);
router.get("/chat/:id", protect, getChatById);
router.delete("/chat/:id", protect, deleteChatById);

module.exports = router;
