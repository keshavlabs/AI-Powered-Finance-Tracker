const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getChats,
  getChatById,
  deleteChatById,
} = require("../controllers/aiController");
const protect = require("../middlewares/middlewares");

router.post("/chat", protect, sendMessage);
router.get("/chats", protect, getChats);
router.get("/chat/:id", protect, getChatById);
router.delete("/chat/:id", protect, deleteChatById);

module.exports = router;
