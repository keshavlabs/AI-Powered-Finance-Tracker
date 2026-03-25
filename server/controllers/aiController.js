const Chat = require("../models/Chat");
const {
  generateChatTitle,
  generateAIResponse,
} = require("../services/aiService");

const sendMessage = async (req, res) => {
  try {
    const { chatId, message, month, year } = req.body;
    const userId = req.user;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    let chat;

    if (chatId) {
      chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }
    } else {
      const title = await generateChatTitle(message);

      chat = await Chat.create({
        user: userId,
        title,
        messages: [],
      });
    }

    // Add user message
    chat.messages.push({
      role: "user",
      content: message,
    });

    // Last 10 messages for context
    const chatHistory = chat.messages.slice(-10).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate AI reply
    const aiReply = await generateAIResponse(
      userId,
      month,
      year,
      message,
      chatHistory
    );

    // Add AI response
    chat.messages.push({
      role: "assistant",
      content: aiReply,
    });

    // ✅ FIXED
    await chat.save();

    res.status(200).json({
      chatId: chat._id,
      reply: aiReply,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getChats = async (req, res) => {
  try {
    const userId = req.user;

    const allChats = await Chat.find({ user: userId })
      .sort({ updatedAt: -1 })
      .select("_id title updatedAt");

    res.status(200).json({
      allChats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getChatById = async (req, res) => {
  try {
    const chatId = req.params.id;

    if (!chatId) {
      return res.status(400).json({
        message: "ChatId is required",
      });
    }

    const chat = await Chat.findOne({
      _id: chatId,
      user: req.user,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    res.status(200).json({
      title: chat.title,
      messages: chat.messages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteChatById = async (req, res) => {
  try {
    const chatId = req.params.id;

    if (!chatId) {
      return res.status(400).json({
        message: "ChatId is required",
      });
    }

    const deleteChat = await Chat.findOneAndDelete({
      _id: chatId,
      user: req.user,
    });

    // ✅ FIXED
    if (!deleteChat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { sendMessage, getChats, getChatById, deleteChatById };
