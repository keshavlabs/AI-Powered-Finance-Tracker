const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tags: [String],
    paymentMethod: {
      type: String,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "INR",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
