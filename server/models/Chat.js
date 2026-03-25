const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const chatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ user: 1, updatedAt: -1 });
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
