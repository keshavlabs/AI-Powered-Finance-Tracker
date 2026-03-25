const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    limitAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

BudgetSchema.index(
  {
    user: 1,
    category: 1,
    month: 1,
    year: 1,
    deletedAt: 1,
  },
  { unique: true }
);

const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;
